import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { MdEdit } from "react-icons/md";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="m-[10px] relative bg-white flex flex-col justify-between  shadow-md hover:shadow-x1 rounded-md overflow-hidden transition-shadow duration-150 border border-gray-600 text-gray-700">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
        />
        <Moment
          fromNow
          className="absolute top-2 left-2 bg-[#0d5dbe] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="px-2">
          <div className="w-full py-[10px] ">
            <div className="flex items-center space-x-1">
              <MdLocationOn className=" text-red-700  text-xl" />
              <p className=" text-sm mb-[2px]  truncate">{listing.address}</p>
            </div>
          </div>
          <p className="font-semibold  text-xl truncate">{listing.name}</p>
          <p className="text-[#9e1b1b] font-semibold">
            &#8369;&nbsp;
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex mt-[10px] space-x-3 mb-4 items-center">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1 ml-5">
              <p className="font-bold text-xs">
                {listing.bathrooms > 1 ? `${listing.bathrooms} Bath` : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <TbTrash
          className="flex items-center justify-center absolute bottom-3 right-3 text-lg cursor-pointer text-gray-800"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="flex items-center justify-center absolute bottom-3 right-8 text-sm cursor-pointer h-4 w-6"
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}
