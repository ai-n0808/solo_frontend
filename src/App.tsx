import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Allgames from "./components/Allgames";
import SingleGame from "./components/Singlegame";
import Header from "./components/Header";

const apiUrl = import.meta.env.VITE_API_URL;

export interface GameList {
  id: number;
  title: string;
  platform: string;
  release_date: Date;
  generation: number;
}

function App() {
  const [user, setUser] = useState<{ id: number; user_name: string } | null>(
    null
  );
  const [loginView, setLoginView] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState("Login");
  const [gamesList, setGamesList] = useState<GameList[]>([]);
  const [selectedGame, setSelectedGame] = useState<null | GameList>(null);

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
    if (user) setCurrentView("AllGames");
  }, [user]);

  useEffect(() => {
    fetchAllGames();
  }, []);
  const fetchAllGames = async () => {
    try {
      const response = await fetch(`${apiUrl}/games`);
      const allGamesData = await response.json();
      setGamesList(allGamesData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
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
          <SingleGame selectedGame={selectedGame} user={user} />
        )}
      </div>
    </>
  );
}

export default App;
