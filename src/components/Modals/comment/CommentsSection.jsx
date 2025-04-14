import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

import { AnnotationIcon } from "@heroicons/react/solid";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ReactPlayer from "react-player";
import AuthModal from "@/components/Modals/AuthModal";
import CommentComponent from "@/components/Home/comments/CommentComponent";

const CommentsSection = ({ onAddComment, item, comments, user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [reply, setReply] = useState("");
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [triggerRender, setTriggerRender] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchCommentsForArticle = async (articleId) => {
      const commentsSnapshot = await getDocs(collection(db, "comments"));
      const commentsData = [];

      commentsSnapshot.forEach(async (commentDoc) => {
        const commentData = commentDoc.data();
        if (commentData.item === articleId) {
          const comment = {
            id: commentDoc.id,
            username: commentData.username,
            avatar: commentData.avatar,
            text: commentData.text,

            replies: [],
          };

          const repliesSnapshot = await getDocs(
            collection(commentDoc.ref, "replies")
          );
          repliesSnapshot.forEach(async (replyDoc) => {
            const replyData = replyDoc.data();
            const reply = {
              id: replyDoc.id,
              username: replyData.username,
              avatar: replyData.avatar,
              text: replyData.text,

              replies: [],
            };

            const nestedRepliesSnapshot = await getDocs(
              collection(replyDoc.ref, "replies")
            );
            nestedRepliesSnapshot.forEach((nestedReplyDoc) => {
              const nestedReplyData = nestedReplyDoc.data();
              reply.replies.push({
                id: nestedReplyDoc.id,
                username: nestedReplyData.username,
                avatar: nestedReplyData.avatar,
                text: nestedReplyData.text,
              });
            });

            comment.replies.push(reply);
          });

          commentsData.push(comment);
        }
      });

      setCurrentComments(commentsData);
    };

    if (item && item.data && item.data.length > 0 && item.data[0]?.nasa_id) {
      fetchCommentsForArticle(item.data[0]?.nasa_id);
    }
  }, [item]);

  const handleAddComment = async (item) => {
    if (user) {
      const newComment = {
        username: user.username,
        text: comment,
        avatar: user.avatar,
        replies: [], // Initialize the replies array
      };

      // Get the id of the newly added comment
      const newCommentId = await onAddComment(item, comment, user.username);

      // Add the id to the newComment object
      newComment.id = newCommentId;

      setCurrentComments((prevComments) => {
        const updatedComments = [...prevComments, newComment];
        setComment(""); // Clear the comment state after the currentComments state is updated
        return updatedComments;
      });

      // Toggle the triggerRender state to force a re-render
      setTriggerRender((prev) => !prev);

      // Return the id of the newly created comment
      return newCommentId;
    } else {
      setShowAuthModal(true);
      return;
    }
  };

  const handleEditComment = async (commentId, newCommentText) => {
    const commentToEdit = currentComments.find(
      (comment) => comment.id === commentId
    );
    if (typeof newCommentText !== "string") {
      alert("Invalid comment text.");
      return;
    }
    if (!commentToEdit || commentToEdit.username !== user.username) {
      alert("You can only edit your own comments.");
      return;
    }
    await updateDoc(doc(db, "comments", commentId), {
      text: newCommentText,
    });
    setCurrentComments(
      currentComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, text: newCommentText }
          : comment
      )
    );
  };

  const handleDeleteComment = async (commentId) => {
    const commentToDelete = currentComments.find(
      (comment) => comment.id === commentId
    );

    if (!commentToDelete || commentToDelete.username !== user.username) {
      alert("You can only delete your own comments.");
      return;
    }
    setCurrentComments(
      currentComments.filter((comment) => comment.id !== commentId)
    );

    await deleteDoc(doc(db, "comments", commentId));
  };

  const handleAddReply = async (commentId, replyText) => {
    if (!commentId || !replyText) {
      console.error("Invalid commentId or replyText:", commentId, replyText);
      return;
    }

    const newReply = {
      avatar: user.avatar, // Use the avatar from the user object
      text: replyText,
      user: user.uid, // Use the uid from the user object
      username: user.username, // Use the username from the user object
    };

    const commentRef = doc(db, "comments", commentId);
    const replyRef = collection(commentRef, "replies");
    const replyDoc = await addDoc(replyRef, newReply);

    setCurrentComments(
      currentComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, { id: replyDoc.id, ...newReply }],
            }
          : comment
      )
    );

    // Force a re-render to ensure the state is updated correctly
    setCurrentComments((prevComments) => [...prevComments]);

    setReply("");
  };

  const handleDeleteReply = async (commentId, replyId) => {
    if (!commentId || !replyId) {
      console.error("Invalid commentId or replyId:", commentId, replyId);
      return;
    }

    const commentToDelete = currentComments.find(
      (comment) => comment.id === commentId
    );
    const replyToDelete = commentToDelete?.replies.find(
      (reply) => reply.id === replyId
    );

    if (!replyToDelete || replyToDelete.user !== user.uid) {
      alert("You can only delete your own replies.");
      return;
    }

    const commentRef = doc(db, "comments", commentId);
    const replyRef = doc(commentRef, "replies", replyId);
    await deleteDoc(replyRef);

    setCurrentComments(
      currentComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment
      )
    );

    // Force a re-render to ensure the state is updated correctly
    setCurrentComments((prevComments) => [...prevComments]);
  };

  const handleEditReply = async (commentId, replyId, newReplyText) => {
    if (!commentId || !replyId || typeof newReplyText !== "string") {
      console.error(
        "Invalid commentId, replyId, or newReplyText:",
        commentId,
        replyId,
        newReplyText
      );
      return;
    }

    const commentToEdit = currentComments.find(
      (comment) => comment.id === commentId
    );
    const replyToEdit = commentToEdit?.replies.find(
      (reply) => reply.id === replyId
    );

    if (!replyToEdit || replyToEdit.user !== user.uid) {
      alert("You can only edit your own replies.");
      return;
    }

    const commentRef = doc(db, "comments", commentId);
    const replyRef = doc(commentRef, "replies", replyId);
    await updateDoc(replyRef, { text: newReplyText });

    setCurrentComments(
      currentComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, text: newReplyText } : reply
              ),
            }
          : comment
      )
    );
    setCurrentComments((prevComments) => [...prevComments]);
  };

  const handleLogin = () => {
    setShowModal(false);
  };

  return (
    <div
      id="commentsSection"
      className="fixed z-10 inset-0 overflow-auto bg-black bg-opacity-50 flex items-center justify-center rounded"
    >
      <div
        className="p-4 text-white rounded"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 9000,
        }}
      >
        <div
          id="comments-body"
          className="flex flex-col items-center justify-center h-full font-sans overflow-y-hidden rounded"
        >
          <AuthModal
            showModal={showAuthModal}
            setShowModal={setShowAuthModal}
            isLoginFormVisible={isLoginFormVisible}
            setIsLoginFormVisible={setIsLoginFormVisible}
            onLogin={handleLogin}
          />
          <div className="relative flex justify-between gap-4 ">
            <textarea
              ref={textareaRef}
              className="w-full rounded-sm p-2 mb-4 bg-black backdrop-blur bg-opacity-40 text-white"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                height: "65px",
                resize: "none",
                paddingRight: "95px",
              }}
            />
            <Button
              className="absolute bottom-5 right-2 bg-transparent hover:text-cyan-500"
              color="primary"
              onPress={() => handleAddComment(item)}
              style={{
                zIndex: 1,
              }}
            >
              Submit
            </Button>
          </div>

          <div
            className="p-1 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md rounded space-y-3 overflow-auto text-white"
            style={{
              height: "100%",
              minWidth: "450px",
              maxWidth: "800px",
              overflow: "auto",
            }}
          >
            {currentComments.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                user={user}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
                handleEditComment={handleEditComment}
                handleAddReply={handleAddReply}
                replies={comment.replies}
                handleDeleteReply={handleDeleteReply}
                handleEditReply={handleEditReply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
