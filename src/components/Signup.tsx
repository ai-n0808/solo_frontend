import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

interface FormData {
  user_name: string;
  password: string;
}

interface SignupProps {
  handleView: (view: string) => void;
}

const Signup: React.FC<SignupProps> = ({ handleView }) => {
  const [signUpFormData, setSignUpFormData] = useState<FormData>({
    user_name: "",
    password: "",
  });
  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
    setUserError("");
    setPasswordError("");
    setGeneralError("");
  };

  const fetchSignUp = async (signUpFormData: FormData) => {
    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpFormData),
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.error === "Registration failed") {
        setGeneralError(
          "Username is already taken. Please choose a different one."
        );
      } else {
        setGeneralError("An error occurred. Please try again.");
      }
    } else {
      handleView("Login");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signUpFormData.user_name.trim() === "") {
      setUserError("Username is required");
    } else if (signUpFormData.password.trim() === "") {
      setPasswordError("Password is reqired");
    } else {
      fetchSignUp(signUpFormData);
    }
  };

  return (
    <div>
      <div>
        <h1
          style={{
            textAlign: "center",
            position: "absolute",
            top: "0",
          }}
        >
          All Your Pokémon Games in One Place
        </h1>
      </div>
      <h2
        style={{
          textAlign: "center",
          position: "absolute",
          left: "45%",
          top: "30%",
        }}
      >
        Sign up
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          left: "40%",
        }}
      >
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="user_name"
            value={signUpFormData.user_name}
            onChange={handleChange}
          />
          {userError && <p style={{ color: "red" }}>{userError}</p>}
          {generalError && <p style={{ color: "red" }}>{generalError}</p>}
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={signUpFormData.password}
            onChange={handleChange}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        <span>
          <div className="signup-button">
            <button
              type="submit"
              style={{
                position: "absolute",
                marginTop: "50px",
                width: "300px",
              }}
            >
              Create account
            </button>
          </div>
        </span>
      </form>
    </div>
  );
};
export default Signup;
