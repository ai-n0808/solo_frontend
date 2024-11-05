import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

interface FormData {
  user_name: string;
  password: string;
}

interface LoginProps {
  handleLandingPageView: () => void;
  handleSetCurrentUser: (userData: { id: number; user_name: string }) => void;
}

const Login: React.FC<LoginProps> = ({
  handleLandingPageView,
  handleSetCurrentUser,
}) => {
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    password: "",
  });
  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");

  const user_nameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLogin = async (user_name: string, password: string) => {
    try {
      const loginResponse = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name, password }),
      });

      if (!loginResponse.ok) {
        throw new Error("Failed to login");
      }

      const userData = await loginResponse.json();

      handleSetCurrentUser(userData);
      setGeneralError("");
    } catch (error) {
      console.error(error);
      setGeneralError("Username and password do not match");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserError("");
    setPasswordError("");
    setGeneralError("");

    if (user_nameRef.current && passwordRef.current) {
      const user_name = user_nameRef.current.value;
      const password = passwordRef.current.value;

      if (user_name.trim() === "") {
        setUserError("Username is required");
      } else if (password.trim() === "") {
        setPasswordError("Password is required");
      } else {
        await fetchLogin(user_name, password);
      }
    }
  };

  return (
    <div>
      {/* <img
        src=""
        style={{
          width: "100px",
          height: "auto",
        }}
      /> */}
      <h1
        style={{
          textAlign: "center",
          position: "absolute",
          left: "45%",
          top: "30%",
        }}
      >
        Log in
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          left: "40%",
        }}
      >
        <div className="username-form">
          <label>Username: </label>
          <input
            ref={user_nameRef}
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
          {userError && <p style={{ color: "red" }}>{userError}</p>}
        </div>

        <div className="password-form">
          <label>Password: </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        {generalError && <p style={{ color: "red" }}>{generalError}</p>}

        <button
          className="login-button"
          type="submit"
          style={{
            position: "absolute",
            marginTop: "50px",
            width: "300px",
          }}
        >
          Login
        </button>

        <span>
          <button
            className="signup-button"
            type="button"
            onClick={handleLandingPageView}
            style={{
              position: "absolute",
              marginTop: "100px",
              width: "300px",
            }}
          >
            Create your account here!!
          </button>
        </span>
      </form>
    </div>
  );
};
export default Login;
