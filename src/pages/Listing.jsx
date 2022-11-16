import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAuth } from "firebase/auth";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="mb-36">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[400px] "
              style={{
                background: `url(${listing.imgUrls[index]})  no-repeat center`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 1000);
        }}
        className="fixed top-[10%] right-[2%] z-10 text-white-700  bg-gray-400  border-2 border-gray-500 rounded-full w-12 h-12 cursor-pointer flex items-center justify-center"
      >
        <FaShare className="text-lg" />
      </div>
      {shareLinkCopied && (
        <p className="fixed  top-[10%] right-[5%] z-10 text-slate-600 font-semibold bg-white border-2 rounded p-1">
          Link Copied
        </p>
      )}

      <div className="m-4 flex item-center justify-center  flex-col md:flex-row max-w-7xl lg:mx-auto gap-6 rounded-lg p-4 shadow-lg bg-white">
        <div className="text-gray-700 w-full  md-[200px] ">
          <div>
            <p className="flex justify-center items-start font-semibold mb-3 ">
              <FaMapMarkerAlt className="text-red-700 mt-1 mr-1 text-lg" />
              {listing.address}
            </p>
            <p className=" mb-3 ">
              <span className="flex font-bold text-2xl  text-blue-900 justify-center">
                {listing.name}
              </span>

              <div className="flex justify-evenly items-center text-white font-semibold my-3 gap-3">
                <p className=" my-3 text-red-700 font-semibold text-4xl">
                  &#8369;&nbsp;
                  {listing.offer
                    ? listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === "rent" ? " / month " : ""}
                </p>
              </div>
              <p className="w-full bg-green-800 p-2 rounded-md text-center text-white shadow-md ">
                {listing.offer ? (
                  <span>
                    <p className="line-through">
                      &#8369;
                      {listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </span>
                ) : (
                  <span className="line-through">No Promo</span>
                )}
              </p>
            </p>
          </div>

          <p className=" mt-3 bg-red-800 p-2 px-6 rounded-md text-white font-semibold text-center shadow-md">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>

          <p className="mt-6">
            <span className="font-semibold">Description -</span>
            <span> {listing.description} </span>
          </p>
          <ul className=" flex mt-3 flex-col sm:flex-row gap-1">
            <li className="flex items-center font-semibold text-sm mr-6 whitespace-nowrap">
              <FaBed className="mr-1 text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center font-semibold text-sm mr-6 whitespace-nowrap">
              <FaBath className="mr-1 text-lg" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center font-semibold text-sm mr-6 whitespace-nowrap">
              <FaParking className="mr-1 text-lg" />
              {+listing.parking ? "Park Spot" : "No Parking"}
            </li>
            <li className="flex items-center font-semibold text-sm whitespace-nowrap">
              <FaChair className="mr-1 text-lg" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactOwner && (
            <button
              onClick={() => setContactOwner(true)}
              className="w-full my-8 p-5 bg-blue-600 rounded text-white font-semibold uppercase shadow-lg hover:bg-blue-700 transition duration-150"
            >
              Contact The Owner / Representative
            </button>
          )}
          {contactOwner && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>

        <div className=" bg-gray-500 text-gray-800 w-full h-[400px] lg-[400px] overflow-hidden">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.name} <br />
                {listing.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
