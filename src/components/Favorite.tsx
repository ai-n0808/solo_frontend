import React from "react";
import { GameList } from "../App";
import moment from "moment";

interface FavoriteProps {
  favorites: GameList[];
  handleView: () => void;
}

const Favorite: React.FC<FavoriteProps> = ({ favorites }) => {
  console.log(favorites[0].release_date);
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
