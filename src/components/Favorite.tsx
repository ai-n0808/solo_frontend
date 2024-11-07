import React from "react";
import { GameList } from "../App";
import moment from "moment";

interface FavoriteProps {
  favorites: GameList[];
  handleView: () => void;
  handleRemoveFavorite: (
    gameId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const Favorite: React.FC<FavoriteProps> = ({
  favorites,
  handleView,
  handleRemoveFavorite,
}) => {
  return (
    <div>
      <h2>Your Favorite Games</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <h3>{favorite.title}</h3>
            <p>Platform: {favorite.platform}</p>
            <p>
              Release Date:{" "}
              {moment(favorite.release_date).format("MMMM Do YYYY")}
            </p>
            <p>Generation: {favorite.generation}</p>
            <img src={favorite.image} style={{ width: "50%" }} />
            <div style={{ marginBottom: "50px" }}>
              <button
                type="button"
                onClick={(e) => handleRemoveFavorite(favorite.id, e)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => handleView()} style={{ marginBottom: "10px" }}>
        Back to home
      </button>
    </div>
  );
};

export default Favorite;
