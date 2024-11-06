import React from "react";
import { GameList } from "../App";

interface HeaderProps {
  user: { id: number; user_name: string } | null;
  favorites: GameList[];
  handleView: () => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleView, handleLogout }) => {
  return (
    <div className="header">
      <h2
        style={{
          position: "absolute",
          right: "10%",
        }}
      >
        Welcome, {user?.user_name}!
      </h2>
      <button
        onClick={handleLogout}
        style={{
          bottom: "0",
        }}
      >
        Logout
      </button>
      <button onClick={handleView}>View My Favorites</button>
    </div>
  );
};

export default Header;
