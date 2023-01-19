import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect({ appState: { targetUrl: window.location.pathname } })}>Login</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};

export default function Landing () {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
        <>
          <Profile />
          <LogoutButton />
        </>
        ) : (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
        )}
      </header>
    </div>
  );
};