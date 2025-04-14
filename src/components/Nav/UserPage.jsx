import { useState, useContext, useRef, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { AuthContext, updateUsername, updateAvatar, } from '../../context/AuthContext';
import { avatar as avatarList } from './avatars';

const UserPage = ({ visible, setVisible }) => {
  const node = useRef();
  const auth = getAuth();
  // const firebaseUser = auth.currentUser;
  const { user, setUser, triggerNavRefresh } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Are you sure you want to update your profile?');
    if (!confirmation) {
      return;
    }
    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        if (username && username !== firebaseUser.displayName) {
          await updateUsername(firebaseUser, username, triggerNavRefresh);
          console.log('Username updated successfully');

          const messagesRef = collection(db, 'messages');
          const userMessagesQuery = query(messagesRef, where('uid', '==', firebaseUser.uid));
          const userMessagesSnapshot = await getDocs(userMessagesQuery);

          const messagesUpdatePromises = userMessagesSnapshot.docs.map(async (doc) => {
            const messageData = doc.data();
            console.log(`Updating message: ${doc.id}`);

            if (messageData.uid === firebaseUser.uid) {
              await updateDoc(doc.ref, { displayName: username });
              console.log(`Message ${doc.id} updated with new username: ${username}`);
            }
          });

          await Promise.all(messagesUpdatePromises);


          const commentsRef = collection(db, 'comments');
          const userCommentsQuery = query(commentsRef, where('user', '==', firebaseUser.uid));
          const userCommentsSnapshot = await getDocs(userCommentsQuery);

          const updatePromises = userCommentsSnapshot.docs.map(async (doc) => {
            const commentData = doc.data();
            console.log(`Updating comment: ${doc.id}`);

            if (commentData.user === firebaseUser.uid) {
              await updateDoc(doc.ref, { username });
              console.log(`Comment ${doc.id} updated with new username: ${username}`);
            }

            const repliesRef = collection(db, `comments/${doc.id}/replies`);
            const userRepliesQuery = query(repliesRef, where('user', '==', firebaseUser.uid));
            const userRepliesSnapshot = await getDocs(userRepliesQuery);

            console.log(`Replies snapshot size for comment ${doc.id}: ${userRepliesSnapshot.size}`);

            if (!userRepliesSnapshot.empty) {
              console.log(`Found ${userRepliesSnapshot.size} replies to update for comment: ${doc.id}`);
            } else {
              console.log(`No replies found for comment: ${doc.id}`);
            }

            const repliesUpdatePromises = userRepliesSnapshot.docs.map(async (replyDoc) => {
              const replyData = replyDoc.data();
              console.log(`Updating reply: ${replyDoc.id} of comment: ${doc.id}`);

              if (replyData.user === firebaseUser.uid) {
                await updateDoc(replyDoc.ref, { username });
                console.log(`Reply ${replyDoc.id} updated with new username: ${username}`);
              }
            });

            await Promise.all(repliesUpdatePromises);
          });

          await Promise.all(updatePromises);
        }

        if (avatar && avatar !== firebaseUser.photoURL) {
          await updateAvatar(firebaseUser, avatar, triggerNavRefresh);
          console.log('Avatar updated successfully');

          const messagesRef = collection(db, 'messages');
          const userMessagesQuery = query(messagesRef, where('uid', '==', firebaseUser.uid));
          const userMessagesSnapshot = await getDocs(userMessagesQuery);

          const messagesUpdatePromises = userMessagesSnapshot.docs.map(async (doc) => {
            const messageData = doc.data();
            console.log(`Updating message: ${doc.id}`);

            if (messageData.uid === firebaseUser.uid) {
              await updateDoc(doc.ref, { photoURL: avatar });
              console.log(`Message ${doc.id} updated with new avatar: ${avatar}`);
            }
          });

          await Promise.all(messagesUpdatePromises);


          const commentsRef = collection(db, 'comments');
          const userCommentsQuery = query(commentsRef, where('user', '==', firebaseUser.uid));
          const userCommentsSnapshot = await getDocs(userCommentsQuery);

          const updatePromises = userCommentsSnapshot.docs.map(async (doc) => {
            const commentData = doc.data();
            console.log(`Updating comment: ${doc.id}`);

            if (commentData.user === firebaseUser.uid) {
              await updateDoc(doc.ref, { avatar });
              console.log(`Comment ${doc.id} updated with new avatar: ${avatar}`);
            }

            const repliesRef = collection(db, `comments/${doc.id}/replies`);
            const userRepliesQuery = query(repliesRef, where('user', '==', firebaseUser.uid));
            const userRepliesSnapshot = await getDocs(userRepliesQuery);

            console.log(`Replies snapshot size for comment ${doc.id}: ${userRepliesSnapshot.size}`);

            if (!userRepliesSnapshot.empty) {
              console.log(`Found ${userRepliesSnapshot.size} replies to update for comment: ${doc.id}`);
            } else {
              console.log(`No replies found for comment: ${doc.id}`);
            }

            const repliesUpdatePromises = userRepliesSnapshot.docs.map(async (replyDoc) => {
              const replyData = replyDoc.data();
              console.log(`Updating reply: ${replyDoc.id} of comment: ${doc.id}`);

              if (replyData.user === firebaseUser.uid) {
                await updateDoc(replyDoc.ref, { avatar });
                console.log(`Reply ${replyDoc.id} updated with new avatar: ${avatar}`);
              }
            });

            await Promise.all(repliesUpdatePromises);
          });

          await Promise.all(updatePromises);
        }

        setUser(prevUser => {
          const updatedUser = {
            ...prevUser,
            username: username || prevUser.username,
            avatar: avatar || prevUser.avatar,
          };
          triggerNavRefresh(updatedUser);
          return updatedUser;
        });
      }
    } catch (error) {
      console.error('Error updating user', error);
    }
    setVisible(false);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatar(user.avatar);
    }
  }, [user]);

  return visible ? (
    <form ref={node} onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-0 p-6 rounded-md">
      <label className="block text-white mb-2">
        Please insert a new username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 p-2 block w-full rounded-md bg-gray-800 bg-blur-md border-transparent focus:border-gray-500 focus:bg-black focus:ring-0 text-white"
        />
      </label>
      <p className=' text-white pt-4 mb-2'>Select your new avatar!</p>
      <div className="grid grid-cols-2 gap-4">
        {avatarList.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index}`}
            className={`m-2 w-16 h-16 rounded-full cursor-pointer transform transition duration-500 ease-in-out hover:scale-125 ${avatar === selectedAvatar ? 'border-4 border-white' : ''}`}
            onClick={() => {
              setSelectedAvatar(avatar);
              setAvatar(avatar);
            }}
          />
        ))}
      </div>


      <button type="submit" className=" buttonMain ">Update Profile</button>
    </form>
  ) : null;
};

export default UserPage;