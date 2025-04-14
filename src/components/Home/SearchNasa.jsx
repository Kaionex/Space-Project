import { useState, useEffect } from 'react';
import AuthModal from '../Modals/AuthModal';
import { UserAuth } from '../../context/AuthContext';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { db } from "../../firebase.config";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import NasaModal from '../Modals/NasaModal';
import AddCommentButton from './comments/Comments';



const SearchNasa = ({ setShowModal, showModal }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('all');
    const [hasSearched, setHasSearched] = useState(false);
    const [displayCount, setDisplayCount] = useState(8);
    const { user } = UserAuth();
    const [comments, setComments] = useState({});
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    useEffect(() => {
        const fetchLikedItems = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    setLikedItems(userDoc.data().savedSpaceFavourites || []);
                }
            }
        };

        fetchLikedItems();
    }, [user]);


    const performSearch = async () => {
        try {
            const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
            const data = await response.json();
            const items = data.collection?.items || [];

            const results = await Promise.all(items.map(async (item) => {
                const metadataResponse = await fetch(item.href);
                const metadata = await metadataResponse.json();

                const videoFile = metadata.find(file => file.endsWith('~orig.mp4'));

                return {
                    ...item,
                    videoFile,
                };
            }));


            setResults(results);


        } catch (error) {
            console.error('Error:', error);
        }
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

    useEffect(() => {
        const fetchLikedItems = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    setLikedItems(userDoc.data().savedSpaceFavourites || []);
                }
            }
        };

        fetchLikedItems();
    }, [user]);


    const handleSearchInput = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchButton = (event) => {
        event.preventDefault();
        setHasSearched(true);
        performSearch();
    };

    const handleLikeButton = async (item) => {
        if (user) {
            const docRef = doc(db, "users", user.uid); // use user.uid instead of user.email
            const userDoc = await getDoc(docRef);
            if (!userDoc.exists()) {
                console.log('No such document!');
                return;
            }
            const isLiked = likedItems.includes(item.data[0]?.nasa_id);
            if (!isLiked) {
                await updateDoc(docRef, {
                    savedSpaceFavourites: arrayUnion(item.data[0]?.nasa_id)
                });
                setLikedItems(prevLikedItems => [...prevLikedItems, item.data[0]?.nasa_id]);
            } else {
                await updateDoc(docRef, {
                    savedSpaceFavourites: arrayRemove(item.data[0]?.nasa_id)
                });
                setLikedItems(prevLikedItems => prevLikedItems.filter(id => id !== item.data[0]?.nasa_id));
            }
        } else {
            setShowAuthModal(true);
        }
    };

    // this one too for modal
    const handleLogin = () => {
        setShowModal(false);
        // Handle the like button click after the user has logged in
    };
    const filteredResults = results.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'video' && item.videoFile) return true;
        if (filter === 'no-video' && !item.videoFile) return true;
        return false;
    }).slice(0, displayCount);

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 8);
    };

    const onAddReply = async (commentId, replyText, username) => {
      if (!user) {
        console.log('User is not defined');
        setShowAuthModal(true);
        return;
      }
    
      if (!commentId || !replyText) {
        console.log('CommentId or replyText is not defined');
        return;
      }
    
      const commentRef = doc(db, 'comments', commentId);
      const repliesRef = collection(commentRef, 'replies');
      const newReply = {
        text: replyText,
        user: user.uid,
        username: user.username,
        timestamp: new Date().toISOString(),
        avatar: user.avatar,
      };
    
      // Save the document reference of the newly added reply
      const docRef = await addDoc(repliesRef, newReply);
    
      // Return the id of the newly created reply
      return docRef.id;
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
        className="flex flex-col items-center justify-center pt-7  text-white"
        style={{ position: "relative", zIndex: 0 }}
      >
        <div>
          <h2 className="text-6xl font-bold pt-20 pb-3 text-center text-white">
            Need More?
          </h2>
          <h4 className="text-center text-4xl pb-4 text-cyan-500">
            Search Here!
          </h4>
          <p className="text-white text-center mx-auto px-20 pb-3 max-w-4xl overflow-hidden text-xl font-light leading-relaxed">
            Discover breathtaking images of nebulae, galaxies, and planets, each
            more mesmerizing than the last. Dive into videos that capture the
            thrill of rocket launches, the serenity of spacewalks, and the
            groundbreaking scientific discoveries that propel us forward as a
            race.
            <br></br>
            <div className="text-slate-400 pt-6">
              {" "}
              {/* Endless possibilities await you! */}
              {/* To infinity & beyond! */}
            </div>
          </p>
        </div>

        <div className="">
          <form
            onSubmit={handleSearchButton}
            className="flex items-center justify-center mt-4 mb-4"
          >
            <input
              type="text"
              id="searchInput"
              placeholder="Search NASA Here ..."
              onChange={handleSearchInput}
              className="border border-gray-300 bg-gray-800 rounded-lg h-8 p-6 pr-16 text-xl focus:outline-cyan-500 text-white"
            />
            <button
              id="searchButton"
              type="submit"
              className="mx-5 buttonMain rounded-lg text-2xl p-9"
            >
              Search
            </button>
          </form>
        </div>

        {hasSearched && (
          <div className="flex gap-4 pb-6">
            <button
              onClick={() => setFilter("all")}
              className=" buttonSecondary"
            >
              All
            </button>
            <button
              onClick={() => setFilter("video")}
              className="buttonSecondary"
            >
              Video
            </button>
            <button
              onClick={() => setFilter("no-video")}
              className="buttonSecondary"
            >
              No Video
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {filteredResults.slice(0, displayCount).map((item, index) => (
            <div
              key={index}
              className="w-48 h-80 m-1 bg-gray-800 rounded-md shadow-xl transform hover:translate-y-2 hover:brightness-125 transition-all duration-300  flex flex-col relative"
            >
              {item.links && item.links[0] && (
                <img
                  className="transition-all duration-500 w-full h-full object-cover absolute top-0 left-0"
                  src={item.links[0].href}
                  alt={item.data[0].title}
                />
              )}
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                className="absolute inset-0 bg-transparent"
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>
              </button>
              <div className="absolute inset-x-0 top-0 z-10 p-4 text-white text-center transition-all duration-300">
                <h2 className="font-serif text-lg leading-4 overflow-hidden overflow-ellipsis max-h-16">
                  {item.data[0].title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                className="absolute inset-x-0 bottom-16 z-10 px-4 py-4 font-sans text-xs leading-3 overflow-hidden overflow-ellipsis max-h-20 transition-all duration-500 flex-grow-0 h-40 bg-transparent text-white rounded"
              >
                {item.data[0].description}
              </button>
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
          {hasSearched && (
            <button
              onClick={handleShowMore}
              className="col-span-2 md:col-span-4 buttonMain text-2xl"
            >
              Load More
            </button>
          )}
        </div>
        <div>
          <button onClick={handleLikeButton}></button>
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

export default SearchNasa;