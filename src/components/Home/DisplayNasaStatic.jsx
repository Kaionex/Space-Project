import { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import AuthModal from '../Modals/AuthModal';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase.config';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, getDoc, collection, addDoc, onSnapshot, } from 'firebase/firestore';
import AddCommentButton from './comments/Comments';
import NasaModal from '../Modals/NasaModal';
import { BiCalendarPlus } from "react-icons/bi";
import { FaCalendarCheck } from 'react-icons/fa'; 
import DownloadTheApp from '../DownloadTheApp';


const DisplayNasaStatic = ({ setShowModal, showModal }) => {
  const [results, setResults] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [eventItems, setEventItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);
  const [comments, setComments] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = UserAuth();
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
 

  useEffect(() => {

    const performSearch = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const url = `https://images-api.nasa.gov/search?media_type=image&year_start=${currentYear}&year_end=${currentYear}`;

        const response = await fetch(url);
        const data = await response.json();
        let items = data.collection?.items || [];

        items.sort((a, b) => new Date(b.data[0].date_created) - new Date(a.data[0].date_created));

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
        console.error('Error:', error);
      }
    };

    performSearch();

    if (user) {
      const fetchLikedItems = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setLikedItems(userDoc.data().savedSpaceFavourites);
        } else {
          console.log('No such document!');
        }
      };
      fetchLikedItems();

      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
        const userData = doc.data();
        setLikedItems(userData.savedSpaceFavourites || []);
        setEventItems(userData.savedCalendarEvents || {});
      });
      return () => unsubscribe();
    }
  }, [user]);


  const handleLikeButton = async item => {
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
        setLikedItems(prevLikedItems => [
          ...prevLikedItems,
          item.data[0]?.nasa_id,
        ]);
      } else {
        await updateDoc(docRef, {
          savedSpaceFavourites: arrayRemove(item.data[0]?.nasa_id),
        });
        setLikedItems(prevLikedItems =>
          prevLikedItems.filter(id => id !== item.data[0]?.nasa_id)
        );
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 4);
  };

  const handleLogin = () => {
    setShowModal(false);
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


  //google calendar



  const handleCalendarButton = async (item) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);
    if (!userDoc.exists()) {
      console.log("No such document!");
      return;
    }

    const isEventAdded = eventItems[item.data[0]?.nasa_id];

    if (isEventAdded) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the event from your Google Calendar?"
      );
      if (confirmDelete) {
        const eventId = eventItems[item.data[0]?.nasa_id];
        console.log(
          "Attempting to delete event from Google Calendar:",
          eventId
        );
        await gapi.client.calendar.events.delete({
          calendarId: "primary",
          eventId: eventId,
        });
        await updateDoc(docRef, {
          [`savedCalendarEvents.${item.data[0]?.nasa_id}`]: null,
        });
        setEventItems((prevEventItems) => {
          const updatedItems = { ...prevEventItems };
          delete updatedItems[item.data[0]?.nasa_id];
          return updatedItems;
        });
      }
    } else {
      const auth2 = gapi.auth2.getAuthInstance();
      if (!auth2.isSignedIn.get()) {
        await auth2.signIn();
      }

      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: {
          summary: item.data[0].title,
          description: item.data[0].description,
          start: { dateTime: new Date().toISOString() },
          end: {
            dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
          },
        },
      });

      const newEventId = response.result.id;
      alert(`Event added to Google Calendar: ${response.result.htmlLink}`);

      await updateDoc(docRef, {
        [`savedCalendarEvents.${item.data[0]?.nasa_id}`]: newEventId,
      });
      setEventItems((prevEventItems) => ({
        ...prevEventItems,
        [item.data[0]?.nasa_id]: newEventId,
      }));
    }
  };


  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center pt-10 text-white">
        <div>
        <h2 className="mt-0 px-10 pb-2 pt-40 bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-center text-5xl font-bold tracking-tight text-transparent md:text-5xl">
          Nasa Today
        </h2>
        <h3 className="text-center text-white text-base md:text-2xl font-normal max-w-2xl pb-6 mx-auto">
          Explore the latest news and updates about space exploration,
          astronomy, and scientific discoveries.
        </h3>
        </div>
        <div className="grid rounded-md grid-cols-3 gap-2 md:grid-cols-3 max-w-3xl grid-auto-flow-dense">
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
              } bg-gray-800 rounded-md shadow-xl transform hover:translate-y-2 hover:brightness-125 transition-all duration-300 flex flex-col relative`}
            >
              {item.links && item.links[0] && (
                <img
                  className="w-full rounded-md h-full object-cover"
                  src={item.links[0].href}
                  alt={item.data[0].title}
                />
              )}
              <div
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                className="absolute inset-0 rounded-md bg-black opacity-40"
              ></div>
              <div
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                className="absolute inset-0 bg-transparent"
              >
                <div className="absolute  inset-x-0 top-0 z-10 p-4 text-white text-center transition-all duration-300 title">
                  <h2 className="font-serif text-lg leading-4 overflow-hidden overflow-ellipsis max-h-16">
                    {item.data[0].title}
                  </h2>
                </div>
                <div className="absolute  inset-x-0 bottom-12 z-10 px-4 py-1 font-sans text-xs leading-3 overflow-hidden overflow-ellipsis max-h-10 transition-all duration-500 flex-grow-0 h-40 bg-transparent text-white rounded img-content">
                  {item.data[0].description}
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 mt-10 mx-3 text-xs font-sans uppercase transition-all duration-300 text-white flex-grow-0 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    className={` like-button ${
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
                  {/* <button
      className="w-8 h-10 "
      onClick={() => onAddComment(item)}
    >
    </button> */}
                </div>

                {/* <button
    className={`text-xs font-sans uppercase w-8 h-10 transition-all duration-300 ${eventItems[item.data[0]?.nasa_id]
      ? "text-moonstone"
      : "text-white"
      }`}
    onClick={() => handleCalendarButton(item)}
  >
    {eventItems[item.data[0]?.nasa_id] ? (
      <FaCalendarCheck
        size={21}
        className="transition-all duration-300 transform hover:scale-125"
      />
    ) : (
      <BiCalendarPlus
        size={21}
        className="transition-all duration-300 transform hover:scale-125"
      />
    )}
  </button> */}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleLoadMore}
          className="mb-20 mt-6 p-1 w-full buttonMain text-2xl"
        >
          Load More
        </button>
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
              eventItems={Object.keys(eventItems)}
              handleCalendarButton={handleCalendarButton}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayNasaStatic;
