import React from "react";
import { useState } from "react";

export default function CreateListing() {
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
  } = formData;
  function onChange() {}
  return (
    <main className="max-w-lg px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold ">Create a Listing</h1>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-x-5">
          <button
            type="button"
            id="type"
            value="sell"
            onClick={onChange}
            className={`px-10 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
            value="sell"
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
          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="John Doe"
            maxLength="32"
            minLength={"10"}
            required
            className="w-full rounded px-5 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white mb-6"
          ></input>
        </div>
        <div className="flex gap-6 mb-6">
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
              className="w-full text-gray-700 rounded px-4 py-2 text-lg bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white"
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
              className="w-full text-gray-700 rounded px-4 py-2 text-lg bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white"
            ></input>
          </div>
        </div>

        <p className="text-lg font-semibold">Parking Area</p>
        <div className="flex gap-x-5 mb-6">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`px-10 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
        <div className="flex gap-x-5 mb-6">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`px-10 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Rizal Street, Cebu City, Philippines"
            required
            className="w-full rounded px-5 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white mb-6"
          ></textarea>
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
            className={`px-10 py-3 rounded font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
              className="flex justify-center  px-4 py-2  text-xl text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white"
            />
            {type === "rent" && (
              <p className="w-full flex text-md items-center ml-2 whitespace-nowrap">
                $ / Month
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
                className=" px-4 py-2  text-xl text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white"
              />
              {type === "rent" && (
                <div className="w-full flex text-md items-center ml-2">
                  <p className="text-md w-full whitespace-nowrap ">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="w-full mb-6">
          <p>Images</p>
          <p>The first image will be the cover (max 6)</p>
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
          Create Listing
        </button>
      </form>
    </main>
  );
}
