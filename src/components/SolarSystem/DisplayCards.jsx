import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import AuthModal from '../Modals/AuthModal';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase.config';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import NasaModal from '../Modals/NasaModal';
import AddCommentButton from '../Home/comments/Comments';

const DisplayCards = ({ setShowModal, showModal,  searchQuery  }) => {
  const [results, setResults] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayCount, setDisplayCount] = useState(4); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const { user } = UserAuth();

  const [comments, setComments] = useState({});

  useEffect(() => {
    performSearch();
    if (user) {
      fetchLikedItems();
    }
  }, [user, searchQuery]);

  const performSearch = async () => {
    try {
        const response = await fetch(
            `https://images-api.nasa.gov/search?q=${searchQuery}`
          );
      const data = await response.json();
      const items = data.collection?.items || [];

      const results = await Promise.all(
        items.map(async item => {
          const metadataResponse = await fetch(item.href);
          const metadata = await metadataResponse.json();

          const videoFile = metadata.find(file => file.endsWith('~orig.mp4'));

          return {
            ...item,
            videoFile,
          };
        })
      );

      setResults(results);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  const fetchLikedItems = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setLikedItems(userDoc.data().savedSpaceFavourites);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching liked items:', error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 4); // Increment by 4 for next set of articles
  };

  const handleLikeButton = async item => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        console.log('No such document!');
        return;
      }
      const isLiked = likedItems.includes(item.data[0]?.nasa_id);
      const updatedItems = isLiked
        ? arrayRemove(item.data[0]?.nasa_id)
        : arrayUnion(item.data[0]?.nasa_id);

      await updateDoc(docRef, { savedSpaceFavourites: updatedItems });
      setLikedItems(prevLikedItems =>
        isLiked
          ? prevLikedItems.filter(id => id !== item.data[0]?.nasa_id)
          : [...prevLikedItems, item.data[0]?.nasa_id]
      );
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setShowModal(false);
  };

  const handleCardClick = item => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsSnapshot = await getDocs(collection(db, 'comments'));

      const commentsData = {};
      commentsSnapshot.forEach((doc) => {
        const commentData = doc.data();
        if (!commentsData[commentData.item]) {
          commentsData[commentData.item] = [];
        }
        commentsData[commentData.item].push(commentData.text);
      });

      setComments(commentsData);
    };

    fetchComments();
  }, []);


  const onAddComment = async (item, comment, username) => {
        if (!user) {
            console.log('User is not defined');
            setShowAuthModal(true);
            return;
        }

        if (!item || !comment) {
            console.log('Item or comment is not defined');
            return;
        }

        const commentsRef = collection(db, 'comments');
        const newComment = {
            item: item.data[0]?.nasa_id,
            text: comment,
            user: user.uid,
            username: user.username,
            timestamp: new Date().toISOString(),
            avatar: user.avatar,
        };

        // Save the document reference of the newly added comment
        const docRef = await addDoc(commentsRef, newComment);

        const commentsSnapshot = await getDocs(collection(db, 'comments'));

        const commentsData = {};
        commentsSnapshot.forEach((doc) => {
            const commentData = doc.data();
            if (!commentsData[commentData.item]) {
                commentsData[commentData.item] = [];
            }
            commentsData[commentData.item].push(commentData);
        });

        setComments(prevComments => ({
            ...prevComments,
            [newComment.item]: [
                ...(prevComments[newComment.item] || []),
                newComment,
            ],
        }));

        // Return the id of the newly created comment
        return docRef.id;
    };



    return (
      <div
        className="flex flex-col items-center justify-center  text-white"
        style={{ zIndex: 0 }}
      >
        <div>
          {/* <h2 className="text-4xl font-bold pt-10  text-center text-white">More info</h2> */}
          {/* <p className="text-white text-center mx-auto px-20 pb-3 max-w-[600px] overflow-hidden text-sm font-light">
      <div
        className="flex flex-col items-center justify-center  text-white"
        style={{ zIndex: 0 }}
      >
        <div>
          {/* <h2 className="text-4xl font-bold pt-10  text-center text-white">More info</h2> */}
          {/* <p className="text-white text-center mx-auto px-20 pb-3 max-w-[600px] overflow-hidden text-sm font-light">
          You can find stunning images of galaxies, nebulae, planets, and much more. Additionally, you can explore videos that showcase rocket launches, spacewalks, and scientific discoveries. The possibilities are endless!
        </p> */}
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 pt-10">
          {results.slice(0, displayCount).map((item, index) => (
            <div
              key={index}
              className="w-40 h-60 m-1 bg-gray-800 rounded-md shadow-xl transform hover:translate-y-2 hover:brightness-125 transition-all duration-300  px-3 flex flex-col relative"
            >
              {item.links && item.links[0] && (
                <img
                  className="transition-all rounded-md duration-500 w-full h-full object-cover absolute top-0 left-0"
                  src={item.links[0].href}
                  alt={item.data[0].title}
                />
              )}
              <button
                onClick={() => handleCardClick(item)}
                className="absolute inset-0 bg-transparent"
              >
                <div className="absolute rounded-md inset-0 bg-black opacity-40"></div>
              </button>
              <div className="absolute inset-x-0 top-0 z-10 p-4 text-white text-center transition-all duration-300">
                <h2 className="font-serif text-lg leading-4 overflow-hidden overflow-ellipsis max-h-16">
                  {item.data[0].title}
                </h2>
              </div>
              <button
                onClick={() => handleCardClick(item)}
                className="absolute inset-x-0 bottom-16 z-10 px-4 py-4 font-sans text-xs leading-3 overflow-hidden overflow-ellipsis max-h-20 transition-all  flex-grow-0 h-40 bg-transparent text-white rounded"
              >
                {item.data[0].description}
              </button>
              <div className="absolute inset-x-0 bottom-0 z-10 mt-10 mx-3 text-xs font-sans uppercase transition-all duration-300 text-white flex-grow-0 flex items-center space-x-2">
                <button
                  className={`like-button ${
                    likedItems && likedItems.includes(item.data[0].nasa_id)
                      ? "like-dark"
                      : ""
                  } w-8 h-10 transition-all duration-300 transform hover:scale-125`}
                  onClick={() => handleLikeButton(item)}
                >
                  {likedItems && likedItems.includes(item.data[0].nasa_id) ? (
                    <FaHeart size={21} />
                  ) : (
                    <FaRegHeart size={21} />
                  )}
                </button>
                <AddCommentButton
                  onAddComment={onAddComment}
                  item={item}
                  comments={comments}
                  user={user}
                />
                <button
                  className="w-8 h-10 "
                  onClick={() => onAddComment(item)}
                ></button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {results.length > displayCount && (
          <button onClick={handleLoadMore} className="mt-6 p-1 w-max buttonMain text-2xl">
            Load More
          </button>
        )}

        {/* Auth modal */}
        <AuthModal
          showModal={showAuthModal}
          setShowModal={setShowAuthModal}
          isLoginFormVisible={isLoginFormVisible}
          setIsLoginFormVisible={setIsLoginFormVisible}
          onLogin={handleLogin}
        />

        {/* NasaModal */}
        {showModal && selectedItem && (
          <div className="flex flex-col items-center justify-center pt-7 text-white">
            <NasaModal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedItem={selectedItem}
              likedItems={likedItems}
              handleLikeButton={handleLikeButton}
            />
          </div>
        )}
      </div>
    );
};

export default DisplayCards;
