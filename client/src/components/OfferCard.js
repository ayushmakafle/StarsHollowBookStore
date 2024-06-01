import React from "react";

const OfferCard = ({ icon, title, description }) => {
  return (
    <div className="border px-4  rounded-lg shadow-xl flex flex-col items-center justify-center gap-4 font-manrope h-full">
      <div className="w-20 h-20">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="text-center">
        <h3 className="text-[22px] font-bold mb-2 text-pink-800">{title}</h3>
        <p className="font-normal text-[15px] text-[#6F7680]">{description}</p>
      </div>
    </div>
  );
};

export default OfferCard;
