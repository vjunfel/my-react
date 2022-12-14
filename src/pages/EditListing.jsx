import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing is not exist");
      }
    }
    fetchListing();
  }, [navigate, params.listingId]);

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [auth.currentUser.uid, listing, navigate]);

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price should be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum of 6 images are allowed");
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = doc(db, "listings", params.listingId);

    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing updated");
    Navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-lg px-2 mx-auto container mb-24">
      <h1 className="text-3xl text-center mt-6 font-bold ">Edit Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-x-5">
          <button
            type="button"
            id="type"
            value="sell"
            onClick={onChange}
            className={`px-5 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-blue-900 font-bold"
                : "bg-slate-600"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`px-5 py-2 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sell"
                ? "bg-white text-blue-900 font-bold"
                : "bg-slate-600"
            }`}
          >
            Rent
          </button>
        </div>
        <div>
          <p className="text-lg mt-5 font-semibold">Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="2 Story Modern House"
            maxLength="50"
            minLength={"8"}
            required
            className="w-full rounded px-5 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white mb-5"
          ></input>
        </div>
        <div className="flex gap-6 mb-5">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full text-gray-700 rounded px-5 py-2 text-lg bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white text-center"
            ></input>
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full text-gray-700 rounded px-5 py-2 text-lg bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white text-center"
            ></input>
          </div>
        </div>

        <p className="text-lg font-semibold">Parking Area</p>
        <div className="flex space-x-5 mb-5">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`px-5 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-gray-700 font-bold" : "bg-slate-600"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`px-5 py-2 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-gray-700 font-bold" : "bg-slate-600"
            }`}
          >
            No
          </button>
        </div>

        <p className="text-lg font-semibold">Furnished</p>
        <div className="flex gap-x-5 mb-5">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`px-5 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-gray-700 font-bold" : "bg-slate-600"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`px-5 py-2 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-gray-700 font-bold" : "bg-slate-600"
            }`}
          >
            No
          </button>
        </div>
        <div>
          <p className="text-lg mt-5 font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Rizal Street, Cebu City, Philippines"
            required
            className="w-full rounded px-5 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white mb-5"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full rounded px-5 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white mb-6"
          ></textarea>
        </div>
        <p className="text-lg font-semibold">Offer</p>
        <div className="flex gap-x-5 mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`px-5 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-gray-700 font-bold" : "bg-slate-600"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`px-5 py-2 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-gray-700 font-bold" : "bg-slate-600"
            }`}
          >
            No
          </button>
        </div>
        <div className="w-full">
          <p className="text-lg font-semibold">Regular Price</p>
          <div className="flex  mb-6">
            <input
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onChange}
              min="500"
              max="100000000"
              required
              className="flex justify-center  px-4 py-2  text-xl text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white text-center"
            />
            {type === "rent" && (
              <p className="w-full flex text-md items-center ml-2 whitespace-nowrap">
                Php / Month
              </p>
            )}
          </div>
        </div>

        {offer && (
          <div className="w-full">
            <p className="text-lg font-semibold">Discounted Price</p>
            <div className="flex mb-6">
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onChange}
                min="500"
                max="100000000"
                required={offer}
                className=" px-4 py-2  text-xl text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white text-center"
              />
              {type === "rent" && (
                <div className="w-full flex text-md items-center ml-2">
                  <p className="text-md w-full whitespace-nowrap ">
                    Php / Month
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="w-full mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-sm">The first image will be the cover (max 6)</p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full mb-6 px-4 py-4 bg-blue-600 text-white font-medium uppercase text-sm rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Edit Listing
        </button>
      </form>
    </main>
  );
}
