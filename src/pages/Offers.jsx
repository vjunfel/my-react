import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }
    fetchListings();
  }, []);
  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(5)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch more listing");
    }
  }
  return (
    <div className="w-full px-3 py-3">
      <h1 className="text-center text-3xl font-bold py-3">Offers</h1>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main className="mb-32 sm:mb-20">
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
            {lastFetchedListing && (
              <div className="flex justify-center mt-6 mb-32 sm:mb-6">
                <button
                  onClick={onFetchMoreListings}
                  className="bg-white px-6 py-2 text-slate-700 border border-slate-700 rounded hover:bg-slate-800 hover:text-white transition duration-150 ease-in-out"
                >
                  Load more
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        <p className="mb-24"> There are no current offers yet! </p>
      )}

      <Footer />
    </div>
  );
}
