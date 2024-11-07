import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Allgames from "./components/Allgames";
import SingleGame from "./components/Singlegame";
import Header from "./components/Header";
import Favorite from "./components/Favorite";
import Review from "./components/Review";
import "./App.css";

const apiUrl = import.meta.env.VITE_API_URL;

export interface GameList {
  id: number;
  title: string;
  platform: string;
  release_date: Date;
  generation: number;
  image: string;
}

export interface ReviewType {
  id: number;
  user_id: number;
  game_id: number;
  rating: number;
  review: string;
  created_at: Date;
}

function App() {
  const [user, setUser] = useState<{ id: number; user_name: string } | null>(
    null
  );
  const [currentView, setCurrentView] = useState("Login");
  const [gamesList, setGamesList] = useState<GameList[]>([]);
  const [selectedGame, setSelectedGame] = useState<null | GameList>(null);
  const [favorites, setFavorites] = useState<GameList[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const handleView = (view: string) => {
    setCurrentView(view);
  };

  const handleSetCurrentUser = (
    userData: { id: number; user_name: string } | null
  ) => {
    setUser(userData);
  };

  const handleSelectedGame = (clickedGame: GameList) => {
    setSelectedGame(clickedGame);
    setCurrentView("SingleGame");
  };

  useEffect(() => {
    if (user) {
      setCurrentView("AllGames");
      fetchAllGames();
      fetchFavorites();
      fetchReviews();
    }
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [selectedGame]);

  const fetchAllGames = async () => {
    try {
      const response = await fetch(`${apiUrl}/games`);
      const allGamesData = await response.json();
      setGamesList(allGamesData);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${apiUrl}/favorites/${user?.id}`);
      const allFavorite = await response.json();
      setFavorites(allFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("Login");
  };

  const handleRemoveFavorite = async (
    gameId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/favorites/${gameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setFavorites(favorites.filter((game) => game.id !== gameId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    if (selectedGame) {
      try {
        const response = await fetch(`${apiUrl}/reviews/${selectedGame.id}`);
        const data = await response.json();
        console.log(data);
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        {currentView === "AllGames" && (
          <Header
            user={user}
            favorites={favorites}
            handleView={() => handleView("Favorite")}
            handleLogout={handleLogout}
          />
        )}
        {currentView === "Login" && (
          <div className="login-container">
            <Login
              handleView={handleView}
              handleSetCurrentUser={handleSetCurrentUser}
            />
          </div>
        )}
        {currentView === "SignUp" && <SignUp handleView={handleView} />}
        {currentView === "AllGames" && (
          <Allgames
            handleSelectedGame={handleSelectedGame}
            gamesList={gamesList}
          />
        )}
        {currentView === "SingleGame" && (
          <SingleGame
            selectedGame={selectedGame}
            user={user}
            reviews={reviews}
            handleView={handleView}
          />
        )}
        {currentView === "Favorite" && (
          <Favorite
            favorites={favorites}
            handleView={() => handleView("AllGames")}
            handleRemoveFavorite={handleRemoveFavorite}
          />
        )}
        {currentView === "Review" && (
          <Review user={user} handleView={handleView} />
        )}
      </div>
    </>
  );
}

export default App;
