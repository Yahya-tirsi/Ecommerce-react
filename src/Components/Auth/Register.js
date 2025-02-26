import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [numberphone, setNumberphone] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [erroremail, setErroremail] = useState("");
  const [errornumber, seterrorNnumber] = useState("");
  const [errorconfirmpassword, seterrorconfirmpassword] = useState("");
  const [errorusername, setErrorusername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const phoneRegex = /^(0)([5-7]\d{8})$/;

  function handleSendEmail() {
    try {
      axios.post("http://localhost:5000/api/auth/send-email", {
        to: email,
        subject: "Mr. username",
        text: `Welcome ${username} to your `,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneRegex.test(numberphone)) {
      seterrorNnumber("Veuillez entrer un numéro de téléphone valide.");
      return;
    } else if (password !== confirmpassword) {
      seterrorconfirmpassword("incorect password");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: username,
        email: email,
        number: numberphone,
        password: password,
      });
      handleSendEmail();
      console.log(res.data);
      navigate("/login-user");
    } catch (err) {
      console.error(err);
      if (err.response) {
        const { status, data } = err.response;

        switch (status) {
          case 400:
            if (data.error.includes("username")) {
              setErrorusername("Username is already taken.");
            } else if (data.error.includes("email")) {
              setErroremail("Email is already registered.");
            } else {
              setError(
                "Invalid input. Please check your details and try again."
              );
            }
            break;

          case 500:
            setError(
              "Something went wrong on our end. Please try again later."
            );
            break;

          default:
            setError("Registration failed. Please try again.");
        }
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        {errorusername && <p style={{ color: "red" }}>{errorusername}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Number phone"
          value={numberphone}
          onChange={(e) => setNumberphone(e.target.value)}
          required
          style={styles.input}
        />
        {errornumber && (
          <p style={{ color: "red", fontSize: "15px", marginBottom: "0.5rem" }}>
            {errornumber}
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmpassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        {errorconfirmpassword && (
          <p style={{ color: "red", fontSize: "15px", marginBottom: "0.5rem" }}>
            {errorconfirmpassword}
          </p>
        )}

        <button type="submit" style={styles.button}>
          Register
        </button>
        <p style={{ textAlign: "center", marginTop: "0.5rem" }}>
          Already have an account?{" "}
          <Link to="/login-user" style={{ color: "orangered" }}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    borderRadius: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};
