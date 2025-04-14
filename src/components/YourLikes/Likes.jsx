import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { db } from '../../firebase.config';
import { getDoc, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, addDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import NasaModal from '../Modals/NasaModal';
import AuthModal from '../Modals/AuthModal';
import AddCommentButton from '../Home/comments/Comments';

const LikedItems = () => {
  const { user } = UserAuth();
  const [likedItems, setLikedItems] = useState([]);
  const [comments, setComments] = useState({});
  const [results, setResults] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    const fetchLikedItems = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          return userDoc.data().savedSpaceFavourites;
        } else {
          console.log('No such document!');
          return [];
        }
      }
      return [];
    };
  
    const performSearch = async () => {
      try {
        const likedItems = await fetchLikedItems();
        setLikedItems(likedItems); // Set the liked items to state
        const results = await Promise.all(
          likedItems.map(async (nasa_id) => {
            const url = `https://images-api.nasa.gov/search?q=${nasa_id}`;

            const response = await fetch(url);
            const data = await response.json();
            let items = data.collection?.items || [];

            items.sort((a, b) => new Date(b.data[0].date_created) - new Date(a.data[0].date_created));

            const item = items[0];
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
        console.error('Error:', error);
      }
    };

    performSearch();
  }, [user]);

  
  const handleLikeButton = async (item) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        console.log('No such document!');
        return;
      }
      const isLiked = likedItems.includes(item.data[0]?.nasa_id);
      if (!isLiked) {
        await updateDoc(docRef, {
          savedSpaceFavourites: arrayUnion(item.data[0]?.nasa_id),
        });
        setLikedItems((prevLikedItems) => [
          ...prevLikedItems,
          item.data[0]?.nasa_id,
        ]);
      } else {
        await updateDoc(docRef, {
          savedSpaceFavourites: arrayRemove(item.data[0]?.nasa_id),
        });
        setLikedItems((prevLikedItems) =>
          prevLikedItems.filter((id) => id !== item.data[0]?.nasa_id)
        );
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  const handleLogin = () => {
    setShowModal(false);
  };

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

    setComments((prevComments) => ({
      ...prevComments,
      [newComment.item]: [
        ...(prevComments[newComment.item] || []),
        newComment,
      ],
    }));

    // Return the id of the newly created comment
    return docRef.id;
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

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center pt-7 text-white">
      <div>
        <h2 className="text-4xl font-bold pt-10 pb-3 text-center text-white">
          Your Liked Articles
        </h2>
        <p className="text-white text-center mx-auto px-20 pb-3 max-w-[600px] overflow-hidden text-sm font-light">
          All of the articles you have liked are displayed here. You can click
          on the image to view more details about the article.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-3 max-w-3xl grid-auto-flow-dense">
        {results.slice(0, displayCount).map((item, index) => (
          <div
            key={index}
            className={`${
              index % 10 === 0
                ? "col-span-1 row-span-1"
                : index % 7 === 0
                ? "col-span-1 row-span-1"
                : index % 5 === 0
                ? "col-span-1 row-span-2"
                : index % 3 === 0
                ? "col-span-2 row-span-1"
                : index % 2 === 0
                ? "col-span-1 row-span-1"
                : "col-span-1 row-span-1"
            } bg-gray-800 shadow-xl transform hover:translate-y-2 transition-all duration-300 flex flex-col relative`}
          >
            {item.links && item.links[0] && (
              <img
                className="w-full h-full object-cover"
                src={item.links[0].href}
                alt={item.data[0].title}
              />
            )}
            <div
              onClick={() => {
                setSelectedItem(item);
                setShowModal(true);
              }}
              className="absolute inset-0 bg-black opacity-40"
            ></div>
            <div
              onClick={() => {
                setSelectedItem(item);
                setShowModal(true);
              }}
              className="absolute inset-0 bg-transparent"
            >
              <div className="absolute inset-x-0 top-0 z-10 p-4 text-white text-center transition-all duration-300 title">
                <h2 className="font-serif text-lg leading-4 overflow-hidden overflow-ellipsis max-h-16">
                  {item.data[0].title}
                </h2>
              </div>
              <div className="absolute inset-x-0 bottom-12 z-10 px-4 py-1 font-sans text-xs leading-3 overflow-hidden overflow-ellipsis max-h-10 transition-all duration-500 flex-grow-0 h-40 bg-transparent text-white rounded img-content">
                {item.data[0].description}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 mt-10 mx-3 text-xs font-sans uppercase transition-all duration-300 text-white flex-grow-0 flex items-center space-x-2">
              <button
                className={`like-button ${
                  likedItems.includes(item.data[0].nasa_id) ? "like-dark" : ""
                } w-8 h-10 transition-all duration-300 transform hover:scale-125`}
                onClick={() => handleLikeButton(item)}
              >
                {likedItems.includes(item.data[0].nasa_id) ? (
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
      {results.length > displayCount && (
        <button
          onClick={handleLoadMore}
          className="mt-4 p-1 w-full buttonMain text-2xl"
        >
          Load More
        </button>
      )}
      <div>
        <AuthModal
          showModal={showAuthModal}
          setShowModal={setShowAuthModal}
          isLoginFormVisible={isLoginFormVisible}
          setIsLoginFormVisible={setIsLoginFormVisible}
          onLogin={handleLogin}
        />
      </div>
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

export default LikedItems;