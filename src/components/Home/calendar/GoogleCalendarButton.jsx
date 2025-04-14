import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { gapi } from "gapi-script";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { BiCalendarPlus } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa";

const GoogleCalendarButton = ({ eventDetails, selectedItem }) => {
  const { user } = UserAuth();
  const [eventAdded, setEventAdded] = useState(false);

  const addEventToCalendarAndFirestore = async () => {
    if (!user) return;

    try {
      const auth2 = gapi.auth2.getAuthInstance();
      if (!auth2.isSignedIn.get()) {
        await auth2.signIn();
      }

      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: eventDetails,
      });

      alert(`Event added to Google Calendar: ${response.result.htmlLink}`);
      console.log(
        "Event added to Google Calendar successfully:",
        response.result
      );

      const newEventId = response.result.id;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        [`savedCalendarEvents.${selectedItem.data[0].nasa_id}`]: newEventId,
      });
      setEventAdded(true);
    } catch (error) {
      console.error(
        "Error adding event to Google Calendar or updating Firestore:",
        error
      );
      alert("Failed to add event to Google Calendar.");
    }
  };

  const removeEventFromCalendarAndFirestore = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const eventId =
        userDoc.data().savedCalendarEvents[selectedItem.data[0].nasa_id];

      console.log("Attempting to delete event from Google Calendar:", eventId);
      await gapi.client.calendar.events.delete({
        calendarId: "primary",
        eventId: eventId,
      });

      alert("Event removed from Google Calendar");
      console.log("Event removed from Google Calendar successfully");

      await updateDoc(userRef, {
        [`savedCalendarEvents.${selectedItem.data[0].nasa_id}`]: null,
      });
      setEventAdded(false);
    } catch (error) {
      console.error(
        "Error removing event from Google Calendar or updating Firestore:",
        error
      );
      alert("Failed to remove event from Google Calendar.");
    }
  };

  return user ? (
    <button
      onClick={
        eventAdded
          ? removeEventFromCalendarAndFirestore
          : addEventToCalendarAndFirestore
      }
      className="text-white p-1 transition-transform duration-300 hover:scale-110"
    >
      {eventAdded ? (
        <FaCalendarCheck size={32} className="text-moonstone" />
      ) : (
        <BiCalendarPlus size={32} />
      )}
    </button>
  ) : null;
};

export default GoogleCalendarButton;
