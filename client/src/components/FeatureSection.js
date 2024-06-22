import OfferCard from "./OfferCard";

import BookImg from "../assets/images/book-genres-1024x914.png";
import GiftImg from "../assets/images/gift.png";
import BookClubImg from "../assets/images/bookclub2.png";

const Feature = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center md:mb-10 ">
      <div className="text-center mt-10">
        <h3 className="bona text-pink-900 md:text-[40px] text-[30px] font-bold">
          What we offer{" "}
        </h3>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 text-center my-6">
        <div className="max-w-[360px] mx-auto">
          <OfferCard
            icon={BookImg}
            title="Curated Book Selection"
            description=" From bestsellers to hidden gems, our collection is carefully selected to cater to diverse tastes and interests."
          />
        </div>
        <div className="max-w-[360px] mx-auto">
          <OfferCard
            icon={GiftImg}
            title="Gift Wrapping Services "
            description="Perfect for any occasion, our gift-wrapping service adds a special touch to your presents."
          />
        </div>
        <div className="max-w-[360px] mx-auto">
          <OfferCard
            icon={BookClubImg}
            title="Community Events"
            description="Join our virtual book club at discord, bringing the spirit of Stars Hollow to your home."
          />
        </div>
      </div>
    </div>
  );
};

export default Feature;
