import React from "react";

interface LogoutProps {
  handleLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
