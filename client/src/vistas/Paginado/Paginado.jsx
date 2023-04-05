import React from "react";
import s from "./paginado.css";
const Paginado = ({ gamesPerPage, allGames, paginado }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button
              className="boton_paginado"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;
