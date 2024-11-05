import React from "react";
import { GameList } from "../App";
const apiUrl = import.meta.env.VITE_API_URL;

interface SingleGameProps {
  selectedGame: GameList | null;
  user: { id: number; user_name: string } | null;
  handleView: (view: string) => void;
}

const SingleGame: React.FC<SingleGameProps> = ({
  selectedGame,
  user,
  handleView,
}) => {
  const handleFavorite = async () => {
    try {
      const loginResponse = await fetch(`${apiUrl}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.id, game_id: selectedGame?.id }),
      });

      if (!loginResponse.ok) {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Single game: {selectedGame?.title}</h1>
      <button onClick={() => handleFavorite()}>Add Your Favorite</button>
      <button onClick={() => handleView("AllGames")}>Back to home</button>
    </div>
  );
};

export default SingleGame;
