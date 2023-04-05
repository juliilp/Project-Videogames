// [ ] Input de búsqueda para encontrar videojuegos por nombre

import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterInput } from "../redux/action";
import { BsSearch } from "react-icons/bs";
import s from "./Searchbar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerInput = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handlerSubmit = (e) => {
    dispatch(filterInput(name));
  };

  return (
    <div className={s.searchbar}>
      <input
        className="input-searchbar"
        onChange={(e) => handlerInput(e)}
        placeholder="Find a videogame"
        type="text"
      />
      <BsSearch
        onClick={(e) => handlerSubmit(e)}
        cursor={"pointer"}
        size={"17px"}
      />
    </div>
  );
};

export default SearchBar;
