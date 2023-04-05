import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../redux/action";
import s from "./Detail.css";
// Ruta de detalle de videojuego: debe contener

// [ ] Los campos mostrados en la ruta principal para cada videojuegos (nombre, imagen, y géneros)
// [ ] Descripción X
// [ ] Fecha de lanzamiento ✓
// [ ] Rating ✓
// [ ] Plataformas ✓
// [ ] name ✓
// [ ] imagen ✓
// [ ] generos ✓

const Detail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const DetailState = useSelector((state) => state.gameDetail);
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);
  console.log(DetailState);

  return (
    <div>
      {DetailState ? (
        DetailState.map((vg) => {
          return (
            <div className="container_detail">
              <div className="card_detail">
                <img src={vg.image} className="image_detail"></img>

                <p className="releasedData_detail">{vg.releasedData}</p>
                <p className="rating_detail">
                  Rating <span>{vg.rating}</span>{" "}
                </p>
                <p className="generos_detail">
                  {" "}
                  {vg.genres
                    ? vg.genres.map((e) => e + " ")
                    : vg.Genres.map((g) => `${g.name} + " "`)}
                </p>
                <p className="platforms_detail">
                  {" "}
                  {vg.platforms.map((e) => e + " " + " ")}
                </p>
                <br />
                <Link to="/home">
                  <button className="button_detail">Volver</button>
                </Link>
              </div>
              <div>
                <div className="card_container_detail2">
                  <h3 className="name_detail">{vg.name}</h3>
                  <div className="container_descripcion_detail">
                    <p className="descripcion_detail">
                      {vg.description.replace(/<[^>]*>?/g, "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
