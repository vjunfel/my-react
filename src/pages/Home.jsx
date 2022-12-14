import React from "react";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Home() {
  // Most Recent Offers
  const [offerLists, setOfferLists] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");
        // Create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        // Execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferLists(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);

  // Places For Rent
  const [rentLists, setRentLists] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");
        // Create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        // Execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentLists(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);

  // Places for Sale
  const [saleLists, setSaleLists] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");
        // Create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        // Execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleLists(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);

  return (
    <div>
      <Slider />
      <div className="mt-6 mb-36 sm:mb-24 container mx-auto">
        {offerLists && offerLists.length > 0 && (
          <div className="mb-6">
            <h2 className="px-3 py-0 text-2xl mt-5 font-semibold">
              Recent offers
            </h2>
            <Link to="/offers">
              <p className="inline-block px-3 py-2 text-sm text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {offerLists.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentLists && rentLists.length > 0 && (
          <div>
            <h2 className="px-3 py-0 text-2xl mt-5 font-semibold">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <p className="inline-block px-3 py-2 text-sm text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {rentLists.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}

        {saleLists && saleLists.length > 0 && (
          <div>
            <h2 className="px-3 py-0 text-2xl mt-5 font-semibold">
              Places for sale
            </h2>
            <Link to="/category/sale">
              <p className="inline-block px-3 py-2 text-sm text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {saleLists.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
