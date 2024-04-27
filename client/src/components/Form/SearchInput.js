import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
//import { useSearch } from "../../context/search";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  //const [values, setValues] = useSearch();
  const navigate = useNavigate();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await axios.get(
  //         `/api/v1/product/search/${values.keyword}`
  //       );
  //       setValues({ ...values, results: data });
  //       navigate("/search");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <>
      <form
        className="d-flex mx-auto"
        role="search"
        //onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="md:w-52 w-36"
          style={{
            padding: "8px 8px",
            borderRadius: "10px",
            marginRight: "6px",
          }}
          //value={values.keyword}
          //onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          type="submit"
          style={{
            padding: "8px 10px",
            backgroundColor: "#ac3b61",
            fontSize: "14px",
            borderRadius: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "white" }}
          />
        </button>
      </form>
    </>
  );
};

export default SearchInput;
