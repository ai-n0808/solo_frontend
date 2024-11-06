import React from "react";
import { GameList } from "../App";
import moment from "moment";

interface FavoriteProps {
  favorites: GameList[];
  handleView: () => void;
}

const Favorite: React.FC<FavoriteProps> = ({ favorites, handleView }) => {
  return (
    <div>
      <h2>Your Favorite Games</h2>
      <ul>
        {favorites.map((game) => (
          <li key={game.id}>
            <h3>{game.title}</h3>
            <p>Platform: {game.platform}</p>
            <p>
              Release Date: {moment(game.release_date).format("MMMM Do YYYY")}
            </p>
            <p>Generation: {game.generation}</p>
            <img src={game.image} />
          </li>
        ))}
      </ul>
      <button onClick={() => handleView()}>Back to home</button>
    </div>
  );
};

export default Favorite;
