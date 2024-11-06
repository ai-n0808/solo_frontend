import React from "react";
import { GameList } from "../App";

interface AllGamesProps {
  gamesList: GameList[];
  handleSelectedGame: (clickedGame: GameList) => void;
}

const AllGames: React.FC<AllGamesProps> = ({
  gamesList,
  handleSelectedGame,
}) => {
  return (
    <div className="main-content">
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Choose your favorite game
      </h1>
      <div className="games-gallery">
        {gamesList.map((game) => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => handleSelectedGame(game)}
          >
            <img src={game.image} alt={`Cover of ${game.title}`} />
            <h2>{game.title}</h2>
            <span>Platform: {game.platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGames;
