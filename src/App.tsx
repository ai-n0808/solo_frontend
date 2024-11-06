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

function App() {
  const [user, setUser] = useState<{ id: number; user_name: string } | null>(
    null
  );
  const [currentView, setCurrentView] = useState("Login");
  const [gamesList, setGamesList] = useState<GameList[]>([]);
  const [selectedGame, setSelectedGame] = useState<null | GameList>(null);
  const [favorites, setFavorites] = useState<GameList[]>([]);

  //Flip the view
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
    }
  }, [user]);

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
            handleView={handleView}
          />
        )}
        {currentView === "Favorite" && (
          <Favorite
            favorites={favorites}
            handleView={() => handleView("AllGames")}
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
