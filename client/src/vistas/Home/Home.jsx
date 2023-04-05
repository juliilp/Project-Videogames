import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paginado from "../Paginado/Paginado";
import Card from "../Card/Card";
import SearchBar from "../../componentes/Searchbar";
import Loader from "../Loader/Loader";
import styles from "./Home_modules.css";
import { Link } from "react-router-dom";
import {
  getAllGames,
  getAllGenres,
  FilterByApiyDB,
  filterByName,
  filterByRating,
  actionFilterGenres,
} from "../../redux/action";
const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const allGenres = useSelector((state) => state.allGenres);
  const [refresh, setRefresh] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesperPage, setgamesPerPage] = useState(15);
  const indexofLastGames = currentPage * gamesperPage;
  const indexofFirstGames = indexofLastGames - gamesperPage;
  const currentGames = allGames.slice(indexofFirstGames, indexofLastGames);
  const GamesFilter = allGames;
  allGames.length != 0 ? console.log(allGames) : console.log("nada");
  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  const paginado = (number) => {
    setCurrentPage(number);
  };

  const orderHandlerName = (e) => {
    setCurrentPage(1);
    setRefresh(e.target.value);
    dispatch(filterByName(e.target.value));
  };

  const filterByVideoGamesHandler = (e) => {
    console.log(e.target.value);
    setCurrentPage(1);
    dispatch(FilterByApiyDB(e.target.value));
  };

  const filterRating = (e) => {
    setCurrentPage(1);
    setRefresh(e.target.value);
    dispatch(filterByRating(e.target.value));
  };

  const handlerFilterGenres = (e) => {
    e.preventDefault();
    setRefresh(e.target.value);
    dispatch(actionFilterGenres(e.target.value));
  };

  return (
    <div className="container_home">
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="container_nav">
        <div className="home-navbar-label-select">
          <label>Order by name</label>
          <select
            className="select_home"
            defaultValue="default"
            onChange={(e) => orderHandlerName(e)}
          >
            <option defaultValue="default">Choose an option</option>
            <option value="all">Default</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <div className="home-navbar-label-select">
          <label>Order by rating</label>
          <select className="select_home" onChange={filterRating}>
            <option>Choose an option</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <div className="home-navbar-label-select">
          <label>Custom or original</label>
          <select
            className="select_home"
            onChange={(e) => filterByVideoGamesHandler(e)}
          >
            <option>Choose an option</option>
            <option value="all">All</option>
            <option value="db">Create for me</option>
            <option value="api">Api-key</option>
          </select>
        </div>
        <div className="home-navbar-label-select">
          <label>Filter by genre</label>
          <select className="select_home" onChange={handlerFilterGenres}>
            <option>Choose an option</option>
            <option value="All">All</option>
            {allGenres ? (
              allGenres.map((e) => (
                <option key={e.id} name={e.name} value={e.name}>
                  {e.name}
                </option>
              ))
            ) : (
              <option>No hay Filter by Genre </option>
            )}
          </select>
        </div>
      </div>
      <div className="container-button-home">
        <Link exact to="/creategame">
          <button className="home_button_create">Create your videogame</button>
        </Link>
      </div>

      <div className="container_cards">
        {currentGames.length ? (
          currentGames.map((e) => {
            return (
              <div className="home-cards-container">
                <Card
                  image={e.image}
                  name={e.name}
                  rating={e.rating}
                  genre={
                    e.genres ? e.genres : e.Genres.map((e) => `${e.name}, `)
                  }
                  key={e.name}
                  id={e.id}
                />
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <div className="home-paginado-container">
        <Paginado
          gamesPerPage={gamesperPage}
          allGames={allGames.length}
          paginado={paginado}
          key="Paginado"
        />
      </div>
    </div>
  );
};

export default Home;
