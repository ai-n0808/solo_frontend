import React from "react";
import { GameList } from "../App";

interface HeaderProps {
  user: { id: number; user_name: string } | null;
  favorites: GameList[];
  handleView: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, favorites, handleView }) => {
  return (
    <div className="header">
      <h2>Welcome, {user?.user_name}!</h2>

      <button onClick={handleView}>View My Favorites</button>
    </div>
  );
};

export default Header;
