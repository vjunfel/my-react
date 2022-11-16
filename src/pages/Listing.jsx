import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
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

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
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
    <main>
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

      <div className="m-4 flex item-center justify-center  flex-col md:flex-row max-w-6xl lg:mx-auto gap-4 rounded-lg p-4 shadow-lg bg-white">
        <div className="text-gray-700 w-full  md-[200px]">
          <p className="text-2xl font-bold mb-3 text-blue-900 ">
            {listing.name}
            <p className=" my-3">
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
          </p>
          <p className="flex items-center font-semibold mt-3 ">
            <FaMapMarkerAlt className="text-red-700 mr-1" />
            {listing.address}
          </p>

          <div className="flex  text-white font-semibold mt-3 gap-3 w-[75%] ">
            <p className="w-full  bg-red-800 p-3 rounded-md  text-center shadow-md">
              {listing.type === "rent" ? "For Rent" : "Sale"}
            </p>

            <p className="w-full bg-green-800 p-3 rounded-md text-center shadow-md">
              {listing.offer && (
                <p>
                  &#8369;
                  {+listing.regularPrice - +listing.discountedPrice} Discount
                </p>
              )}
            </p>
          </div>

          <p className="mt-6">
            <span className="font-semibold">Description -</span>
            <span> {listing.description} </span>
          </p>
          <ul className=" flex mt-5 whitespace-nowrap">
            <li className="flex items-center font-semibold text-sm mr-6">
              <FaBed className="mr-1 text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center font-semibold text-sm mr-6">
              <FaBath className="mr-1 text-lg" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center font-semibold text-sm mr-6">
              <FaParking className="mr-1 text-lg" />
              {+listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex items-center font-semibold text-sm ">
              <FaChair className="mr-1 text-lg" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
        </div>

        <div className=" bg-gray-500 text-gray-700 w-full h-[300px] lg-[400px] overflow-hidden">
          sdafsdf
        </div>
      </div>
    </main>
  );
}
