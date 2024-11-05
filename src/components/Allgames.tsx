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
      <h1>Here's all of games</h1>
      {gamesList.length &&
        gamesList.map((game) => (
          <div onClick={() => handleSelectedGame(game)}>
            <h2>Game title: {game.title}</h2>
            <span>Platform: {game.platform}</span>
          </div>
        ))}
    </div>
  );
};

export default AllGames;
