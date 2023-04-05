import { Link } from "react-router-dom";
import styles from "./Card_modules.css";
const Card = ({ image, name, genre, id, rating }) => {
  return (
    <div className="card-container tilt-container">
      <img
        className="card-image"
        src={image ? image : "Image not exists"}
        alt=""
      />
      <h3 className="card-titulo">{name ? name : "name not exists"}</h3>
      <br />
      <p className="card-genre">{genre ? genre : "Genre not exists"}</p>
      <span className="card-rating">
        {rating ? rating : "rating not exists"}
      </span>
      <br />
      <Link to={`/${id}`}>
        <button className="card-button">Detail</button>{" "}
      </Link>
    </div>
  );
};

export default Card;
