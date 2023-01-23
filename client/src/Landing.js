import React from "react";

const LoginButton = () => {
  const handleLogin = async () => {
  };
  return (
    <button onClick={handleLogin}>
      Log In
    </button>
  );
};

const LogoutButton = () => {

  return (
    <button onClick=''>
      Logout
    </button>
  );
};

const Profile = () => {

  return ;
};

export default function Landing () {

  return (
    <div className="App">
      <header className="App-header">
        <LoginButton />
      </header>
    </div>
  );
};