import { doc, getDoc } from "firebase/firestore";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getOwner() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error("Could not get the Owner data");
      }
    }
    getOwner();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {owner !== null && (
        <div className="my-6">
          <p>
            Contact <span className="font-semibold">{owner.name}</span> for the{" "}
            {listing.name.toLowerCase()}
          </p>
          <div className="flex">
            <textarea
              name="message"
              id="message"
              rows="3"
              value={message}
              onChange={onChange}
              className="w-full rounded mt-1"
            ></textarea>
          </div>
          <a
            href={`mailto:${owner.email}?Subject=${listing.name} &body=${message}`}
          >
            <button className="bg-blue-700 text-white p-3 font-semibold rounded my-3">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
