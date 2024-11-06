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
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Choose your favorite game
      </h1>
      {gamesList.length &&
        gamesList.map((game) => (
          <div onClick={() => handleSelectedGame(game)}>
            <h2>Game title: {game.title}</h2>
            <img src={game.image} />
            <span>Platform: {game.platform}</span>
          </div>
        ))}
    </div>
  );
};

export default AllGames;
