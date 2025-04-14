import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { avatar as avatarList } from "../components/Nav/avatars";
import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
export const AuthContext = createContext();

// for the user page
// export const updateUsername = (user, newUsername, triggerNavRefresh) => {
//   if (!newUsername || newUsername === user.username) return Promise.resolve(user);
//   return firebaseUpdateProfile(user, { displayName: newUsername })
//     .then(() => {
//       console.log("Username updated successfully");
//       return updateDoc(doc(db, "users", user.uid), { username: newUsername });
//     })
//     .then(() => {
//       triggerNavRefresh();
//       return newUsername;
//     })
//     .catch((error) => {
//       console.error("Error updating username: ", error);
//       throw error;
//     });
// };

export const updateUsername = (user, newUsername, triggerNavRefresh) => {
  if (!newUsername || newUsername === user.username) return Promise.resolve(user);
  return updateDoc(doc(db, "users", user.uid), { username: newUsername })
    .then(() => {
      console.log("Username updated successfully");
      triggerNavRefresh();
      return newUsername;
    })
    
    .catch((error) => {
      console.error("Error updating username: ", error);
      throw error;
    });
};

export const updateAvatar = (user, newAvatar, triggerNavRefresh) => {
  if (!newAvatar || newAvatar === user.avatar) return Promise.resolve(user);
  return updateDoc(doc(db, "users", user.uid), { avatar: newAvatar })
    .then(() => {
      console.log("Avatar updated successfully");
      triggerNavRefresh();
      return newAvatar;
    })
    .catch((error) => {
      console.error("Error updating avatar: ", error);
      throw error;
    });
};




export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  const [refreshNav, setRefreshNav] = useState(false);

  const triggerNavRefresh = () => {
    setRefreshNav(!refreshNav);
  };

  function generateRandomAvatar() {
    const avatarIndex = Math.floor(Math.random() * avatarList.length);
    return avatarList[avatarIndex];
  }

  function signUp(username, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const avatar = generateRandomAvatar();
        return setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          avatar: avatar,
          savedSpaceFavourites: [],
        })
          .then(() => {
            setUser({
              ...user,
              avatar: avatar,
              username: username,
              userBadge: userData.badge,
            });
          })
          .catch((error) => {
            console.error("Error creating user document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error signing up: ", error);
      });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        return getDoc(doc(db, "users", user.uid))
          .then((userDocument) => {
            if (userDocument.exists()) {
              const userData = userDocument.data();
              setUser({
                ...user,
                avatar: userData.avatar,
                username: userData.username,
                userBadge: userData.badge,
              });
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    );
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = doc(db, "users", user.uid);

        return getDoc(userRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // User document already exists, just set the user state
            setUser({
              ...user,
              avatar: docSnapshot.data().avatar,
              username: docSnapshot.data().username,
              userBadge: docSnapshot.badge,
            });
          } else {
            // User document does not exist, create it
            const avatar = generateRandomAvatar();
            setDoc(userRef, {
              username: user.displayName || "New User",
              email: user.email,
              avatar: avatar,
            })
              .then(() => {
                setUser({
                  ...user,
                  avatar: avatar,
                  username: user.displayName || "New User",
                });
              })
              .catch((error) => {
                console.error("Error adding user to Firestore: ", error);
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error with Google sign in: ", error);
      });
  }

  function logOut() {
    return signOut(auth).then(() => {
      setUser(null);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getDoc(doc(db, "users", currentUser.uid))
          .then((userDocument) => {
            if (userDocument.exists()) {
              const userData = userDocument.data();
              setUser({
                ...currentUser,
                avatar: userData.avatar,
                username: userData.username,
                userBadge : userData.badge,
              });
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, refreshNav, triggerNavRefresh, setUser, signUp, logIn, logOut, signInWithGoogle, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}


