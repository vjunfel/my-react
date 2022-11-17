import React from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListing() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
      console.log(listings);
    }
    fetchListing();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="w-full h-[400px] overflow-hidden relative"
              >
                <p className="text-white absolute left-0 bottom-5 font-medium bg-slate-800 py-3 px-12 shadow-lg opacity-90">
                  {data.name}
                </p>
                <span className="text-white absolute left-0 top-10 font-medium bg-red-700 py-3 px-5 shadow-lg opacity-90 uppercase">
                  &#8369;
                  {/* {data.discountedPrice ?? data.regularPrice} */}
                  {data.offer
                    ? data.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : data.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {data.type === "rent" && " / month"}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
