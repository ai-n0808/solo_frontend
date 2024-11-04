import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/Signup";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [user, setUser] = useState<{ id: number; user_name: string } | null>(
    null
  );
  const [loginView, setLoginView] = useState<boolean>(true);

  //Flip the view
  const handleLandingPageView = () => {
    setLoginView((preview) => !preview);
  };

  const handleSetCurrentUser = (
    userData: { id: number; user_name: string } | null
  ) => {
    setUser(userData);
  };

  return (
    <div>
      <h1>All Your Pokémon Games in One Place</h1>

      <div className="login-container">
        {loginView ? (
          <Login
            handleLandingPageView={handleLandingPageView}
            handleSetCurrentUser={handleSetCurrentUser}
          />
        ) : (
          <SignUp handleLandingPageView={handleLandingPageView} />
        )}
      </div>
    </div>
  );
}

export default App;
