import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createVideogame, getAllGenres } from "../../redux/action";
import { Link } from "react-router-dom";
import s from "./createGame.css";
const CreateGame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.allGenres);
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    rating: "",
    platforms: "",
    releaseData: "",
    createGenre: "",
    genres: [],
  });

  const [errorsForm, setErrorsForm] = useState({});

  const validate = (input) => {
    let errors = {};

    if (!input.name) {
      errors.name = "Name is required!";
    } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
      errors.name =
        "Only accepts letters, numbers, mid dashes and parenthesis!";
    }

    if (
      input.image.length !== 0 &&
      !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)
    ) {
      errors.image = "Invalid URL!";
    }

    if (!input.description) {
      errors.description = "Description is required!";
    }

    if (!input.rating) {
      errors.rating = "Rating is required!";
    } else if (input.rating > 5) {
      errors.rating = "Rating must be less than 5";
    } else if (input.rating < 0) {
      errors.rating = "Rating cannot be negative";
    }

    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorsForm(validate(input));
    dispatch(createVideogame(input));
    setInput({
      name: "",
      image: "",
      description: "",
      rating: "",
      platforms: "",
      releaseData: "",
      createGenre: "",
      genres: [],
    });
    alert("Game succesfully created!");
  };

  const handleChange = (e) => {
    console.log(input);
    setErrorsForm(validate(input));
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    console.log(input.genres);
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };

  return (
    <div className="container_createGame">
      <form className="createForm">
        <h3 className="create_title">Create your videogame</h3>

        <label>Name</label>
        <input
          className="input_create_name"
          value={input.name}
          name="name"
          onChange={handleChange}
          required
        />

        {errorsForm.name ? (
          <h4>
            <small>{errorsForm.name}</small>
          </h4>
        ) : (
          false
        )}
        <label>Imagen</label>
        <input
          className="input_create_image"
          value={input.image}
          name="image"
          onChange={handleChange}
        />

        <label>Rating {input.rating}</label>
        <input
          className="input_create_rating"
          type="range"
          value={input.rating}
          name="rating"
          onChange={handleChange}
          min="o"
          max="5"
          pattern="[0-9]+"
        />

        {errorsForm.rating ? (
          <h4>
            <small>{errorsForm.rating}</small>
          </h4>
        ) : (
          false
        )}
        <label>Platforms</label>
        <input
          className="input_create_platforms"
          value={input.platforms}
          name="platforms"
          onChange={handleChange}
          required
        />

        <label>Release Data</label>
        <input
          className="input_create_releaseData"
          value={input.releaseData}
          name="releaseData"
          onChange={handleChange}
        />

        <label className="label_description">Description</label>
        <textarea
          className="input_create_description"
          value={input.description}
          name="description"
          onChange={handleChange}
          required
        />
        {errorsForm.description ? (
          <h4>
            <small>{errorsForm.description}</small>
          </h4>
        ) : (
          false
        )}

        <label>Genres</label>
        <select onChange={handleSelect}>
          <option name="Action" key="Action" value="Action">
            Action
          </option>
          <option name="Indie" key="Indie" value="Indie">
            Indie
          </option>
          <option name="Adventure" key="Adventure" value="Adventure">
            Adventure
          </option>
          <option name="RPG" key="RPG" value="RPG">
            RPG
          </option>
          <option name="Strategy" key="Strategy" value="Strategy">
            Strategy
          </option>
          <option name="Shooter" key="Shooter" value="Shooter">
            Shooter
          </option>
          <option name="Casual" key="Casual" value="Casual">
            Casual
          </option>
          <option name="Simulation" key="Simulation" value="Simulation">
            Simulation
          </option>
          <option name="Puzzle" key="Puzzle" value="Puzzle">
            Puzzle
          </option>
          <option name="Arcade" key="Arcade" value="Arcade">
            Arcade
          </option>
          <option name="Platformer" key="Platformer" value="Platformer">
            Platformer
          </option>
          <option name="Racing" key="Racing" value="Racing">
            Racing
          </option>
          <option
            name="Massively Multiplayer"
            key="Massively Multiplayer"
            value="Massively Multiplayer"
          >
            Massively Multiplayer
          </option>
          <option name="Fighting" key="Fighting" value="Fighting">
            Fighting
          </option>
          <option name="Family" key="Family" value="Family">
            Family
          </option>
          <option name="Sports" key="Sports" value="Sports">
            Sports
          </option>
          <option name="Board Games" key="Board Games" value="Board Games">
            Board Games
          </option>
          <option name="Educational" key="Educational" value="Educational">
            Educational
          </option>
          <option name="Card" key="Card" value="Card">
            Card
          </option>
        </select>

        <div className="li_container">
          <ul className="create_li">
            {input.genres.map((e) => (
              <li>{e}</li>
            ))}
          </ul>
        </div>

        <div className="buttons_create">
          <Link to="/home">
            <button className="button_create">Volver</button>
          </Link>
          <button
            className="button_create"
            onClick={submitHandler}
            disabled={
              !input.name ||
              !input.description ||
              !input.rating ||
              input.rating > 5
            }
          >
            Create videogame
          </button>
        </div>
        <div className="createError"></div>
      </form>
    </div>
  );
};

export default CreateGame;
