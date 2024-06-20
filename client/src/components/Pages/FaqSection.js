import { useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FaqSection = () => {
  const [selected, setSelected] = useState(null);

  const faqItems = [
    {
      question: "Where is Stars Hollow Bookstore located?",
      answer:
        "Stars Hollow Bookstore is a beloved establishment situated in the charming small town of Stars Hollow, located in New Milford, Connecticut.",
    },
    {
      question: "How do I place an order?",
      answer:
        "To place an order, add the desired book to your cart by clicking the cart button. You can use the search bar to find specific books. Once you have added the books to your cart, click on the cart icon at the top right of your screen, proceed to checkout, and complete your payment.",
    },
    {
      question: "Where do you deliver?",
      answer:
        "Currently, we deliver throughout Connecticut and most major cities in the USA. If you have any specific location inquiries, please contact our customer service for more details.",
    },
    {
      question: "Do you offer gift wrapping services?",
      answer:
        "Absolutely! We love helping you give the perfect gift. On the cart page, you'll find an option in your order summary. Simply click the checkbox next to the gift icon to add gift wrapping for a small additional fee. We use high-quality wrapping paper to make your gift special.",
    },
    {
      question: "Can I request a specific delivery date and time?",
      answer:
        "Unfortunately, we cannot accommodate specific delivery date and time requests as deliveries are handled by third-party courier services. We appreciate your understanding.",
    },
    {
      question: "How do I join the bookclub?",
      answer: (
        <div>
          We have a virtual bookclub at Discord. Click&nbsp;
          <a
            href="https://discord.com/invite/starshollow"
            target="_blank"
            className="underline text-pink-800"
          >
            here
          </a>
          &nbsp;to join the club today!{" "}
        </div>
      ),
    },
    {
      question: "I am an investor. How can I reach out?",
      answer: (
        <div>
          If you are an investor and would like to get in touch with us, please
          send an email to{" "}
          <a
            href="mailto:starshollowb@gmail.com"
            className="text-semibold text-pink-800"
          >
            starshollowb@gmail.com.
          </a>
          &nbsp;Our team will review your inquiry and respond as soon as
          possible. Please include your contact information and a brief
          description of your investment interest or proposal.
          <br />
          <b>Thank you for your interest in Stars Hollow.</b>
        </div>
      ),
    },
  ];

  const toggleDropdown = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="my-24 flex flex-col md:items-center items-stretch">
      <h2 className="londrina-color md:text-4xl text-2xl font-bold mb-6 text-center">
        StarsHollow FAQs
      </h2>
      <div className="md:w-[555px] w-auto">
        {faqItems.map((item, index) => (
          <div key={index} className="py-4 px-3 mb-2 border-b border-pink-900">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              <div
                className={`font-bold text-lg py-3 ${
                  selected === index ? "text-pink-900" : "text-black"
                }`}
              >
                {item.question}
              </div>
              {selected === index ? (
                <FontAwesomeIcon icon={faAngleUp} className="text-pink-800" />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} className="text-pink-800" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                selected === index ? "max-h-[200px]" : "max-h-0"
              }`}
            >
              <div className="font-medium text-lg max-w-[480px] pt-4">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
