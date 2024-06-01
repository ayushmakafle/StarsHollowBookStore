import React from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import useAuthor from "../../hooks/UseAuthor";

import DefaultAuthorImage1 from "../../assets/images/defaultauthor.png";
import DefaultAuthorImage2 from "../../assets/images/dafaultauthor2.png";
import DefaultAuthorImage3 from "../../assets/images/defaultauthor3.png";
import DefaultAuthorImage4 from "../../assets/images/defaultauthor4.png";
import DefaultAuthorImage5 from "../../assets/images/defaultauthor5.png";
import DefaultAuthorImage6 from "../../assets/images/defaultauthor6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const AllAuthors = () => {
  const authors = useAuthor();

  const defaultImages = [
    DefaultAuthorImage1,
    DefaultAuthorImage2,
    DefaultAuthorImage3,
    DefaultAuthorImage4,
    DefaultAuthorImage5,
    DefaultAuthorImage6,
  ];
  const shuffledImages = defaultImages.sort(() => Math.random() - 0.5);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <button className="back-button" onClick={goBack}>
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{ color: "#800000", height: "40px", margin: "4px" }}
        />
      </button>
      <div className="w-[60vw] mx-auto">
        <div className="my-10 genres py-5">
          <h4 className="londrina-color text-5xl mb-4"> All Authors</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <Link
                to={`/author/${author.slug}`}
                className="text-xl font-bold text-pink-800 hover:text-pink-600"
              >
                <div key={author._id} className="flex flex-col items-center">
                  <img
                    src={shuffledImages[index % shuffledImages.length]}
                    alt="Author"
                    className="w-32 h-32 rounded-full mb-2"
                  />

                  {author.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllAuthors;
