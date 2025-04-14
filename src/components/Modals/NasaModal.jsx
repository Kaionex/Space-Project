import { FaRegHeart, FaHeart, FaCalendarCheck } from "react-icons/fa";
import { BiCalendarPlus } from "react-icons/bi"; import ReactPlayer from 'react-player';
import AddCommentButton from "../Home/comments/Comments";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase.config";
import { UserAuth } from "@/context/AuthContext";


const NasaModal = ({ fromFutureEvents, showModal, setShowModal, item, selectedItem, likedItems, handleLikeButton, eventItems, handleCalendarButton }) => {
    const [comments, setComments] = useState({});
    const { user } = UserAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        const commentsRef = collection(db, 'comments');
        const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            const commentsData = {};
            snapshot.docs.forEach((doc) => {
                const commentData = doc.data();
                if (!commentsData[commentData.item]) {
                    commentsData[commentData.item] = [];
                }
                commentsData[commentData.item].push(commentData);
            });
            setComments(commentsData);
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, []);

    const onAddComment = async (item, comment) => {
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

    if (!showModal || !selectedItem) {
        return null;
    }


    return (
        <div id="myModal" className="py-5 modal fixed z-10 inset-0 overflow-auto bg-black bg-opacity-50 flex selectedItems-center justify-center rounded" onClick={(e) => { if (e.target.id === 'myModal') setShowModal(false) }} >
            <div className="modal-content p-4 text-white rounded" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 9000 }}>

                <div id="modal-body" className="flex flex-col items-center justify-center h-full font-sans overflow-y-hidden rounded">
                    {selectedItem.data[0].media_type === 'video' ? (
                        <ReactPlayer
                            url={selectedItem.videoFile}
                            controls
                            width="500px"
                            height="auto"
                            playing={true}
                            className="shadow-lg rounded-lg"
                        />
                    ) : (
                        <img src={selectedItem.links[0].href} alt={selectedItem.data[0].title} className="w-full h-64 object-cover shadow-lg rounded-lg" />
                    )}
                    <h2 className="text-xl font-bold mb-2 text-center max-w-lg mx-auto p-4 rounded">{selectedItem.data[0].title}</h2>
                    <hr className="rounded" />
                    <p className="text-sm text-center max-w-lg mx-auto p-4 leading-relaxed rounded">{selectedItem.data[0].description}</p>
                    <hr className="rounded" />
                    <div className="flex">
                        <button className={`like-button ${likedItems.includes(selectedItem.data[0].nasa_id) ? 'like-dark' : ''} inline-block px-3  text-xs font-sans  uppercase transition-all duration-300 hover:scale-x-125 hover:scale-y-125 text-white rounded`} onClick={() => handleLikeButton(selectedItem)}>
                            {likedItems.includes(selectedItem.data[0].nasa_id) ? <FaHeart size={25} className="transition-all  duration-300 transform-gpu hover:scale-120" /> : <FaRegHeart size={25} className="transition-all duration-300 transform-gpu hover:scale-120" />}
                        </button>
                       { fromFutureEvents && <button
                            className={`inline-block px-3  text-xs font-sans  uppercase transition-all duration-300 hover:scale-x-125 hover:scale-y-125 text-white rounded${eventItems.includes(selectedItem.data[0].nasa_id)
                                ? "text-moonstone"
                                : "text-white"
                                }`}
                            onClick={() => handleCalendarButton(selectedItem)}
                        >
                            {eventItems.includes(selectedItem.data[0].nasa_id) ? (
                                <FaCalendarCheck size={30} />
                            ) : (
                                <BiCalendarPlus size={30} />
                            )}
                        </button>}
                        <AddCommentButton onAddComment={onAddComment} item={selectedItem} comments={comments} user={user} />



                    </div>
                </div>
            </div>

        </div>
    );
};

export default NasaModal;