import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Loginadmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpass, setCheckpass] = useState(false);
  const [checkemail, setCheckemail] = useState(false);
  const [info, setInfo] = useState([]);

  console.log(info);
  
  // navigate to Admin
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/admin")
      .then((response) => response.json())
      .then((data) => {
        setInfo(data);
      });
  }, []);

  // Function to change email
  function handleEmail(newEmail) {
    setEmail(newEmail);
    setCheckemail(false);
  }

  // Function to change password
  function handlePassword(newPassword) {
    setPassword(newPassword);
    setCheckpass(false);
  }

  // Check information correctness
  function handleLogin(e) {
    e.preventDefault();

    const infoEmail = info.find((eo)=> eo.email);
    const infoPassword = info.find((eo)=> eo.password);
    
    let isEmailCorrect = infoEmail.email === email;
    let isPasswordCorrect = infoPassword.password === password;

    setCheckemail(!isEmailCorrect);
    setCheckpass(!isPasswordCorrect);

    if (isEmailCorrect && isPasswordCorrect) {
      localStorage.setItem("isAuthenticated", "true"); 
      navigate("/admin-page", { state: { email: info.email } });
    }
    
  }

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleLogin}>
        <h1 id="h1">Welcome admin</h1>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg
            height={20}
            viewBox="0 0 32 32"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input
            type="text"
            className="input"
            placeholder="Enter your Email"
            onChange={(eo) => handleEmail(eo.target.value)}
          />
          {checkemail && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
          >
              <circle cx="12" cy="12" r="10" fill="none" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
          )}
        </div>
        {checkemail && <p style={{ color: "red" }}>Incorrect email</p>}
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            height={20}
            viewBox="-64 0 512 512"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            onChange={(eo) => handlePassword(eo.target.value)}
          />
          {checkpass && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" fill="none" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
        </svg>)}
        </div>
        {checkpass && <p style={{ color: "red" }}>Incorrect password</p>}
        <div className="flex-row">
          <span className="span">Forgot password?</span>
          </div>
        <button className="button-submit" type="submit">
          Sign In
        </button>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  #h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }
`;

export default Loginadmin;
