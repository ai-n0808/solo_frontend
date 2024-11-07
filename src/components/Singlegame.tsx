import React from "react";
import { GameList, ReviewType } from "../App";
import "../App.css";
const apiUrl = import.meta.env.VITE_API_URL;

interface SingleGameProps {
  selectedGame: GameList | null;
  user: { id: number; user_name: string } | null;
  reviews: ReviewType[];
  handleView: (view: string) => void;
}

const SingleGame: React.FC<SingleGameProps> = ({
  selectedGame,
  user,
  reviews,
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
    <div className="single-game-container">
      <h1
        className="game-title"
        style={{
          textAlign: "center",
          marginLeft: "50%",
        }}
      >
        {selectedGame?.title}
      </h1>
      <img
        className="game-image"
        src={selectedGame?.image}
        style={{
          textAlign: "center",
          width: "50%",
          marginLeft: "50%",
        }}
      />
      <div
        className="game-actions"
        style={{
          marginLeft: "50%",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => handleFavorite()}
          style={{ height: "40%", marginTop: "10px" }}
        >
          Add Your Favorite
        </button>
        <button
          onClick={() => handleView("Review")}
          style={{ marginLeft: "10px", marginTop: "10px", height: "40%" }}
        >
          Write your review
        </button>
        <button
          onClick={() => handleView("AllGames")}
          style={{ marginLeft: "10px", marginTop: "10px", height: "40%" }}
        >
          Back to home
        </button>
        <div className="reviews-section">
          <h2>Reviews</h2>
          {reviews.map((review) => {
            return (
              <div>
                <p>{review.review}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
