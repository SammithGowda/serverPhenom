import React from "react";

const HomePage = () => {

  const handleLogin = () => {
    // Your Express server's Spotify login route
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <React.Fragment>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f2f2f2",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Welcome to My App
        </h1>
        <p
          style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1.5rem" }}
        >
          Please log in using your Spotify account
        </p>
        <button
            onClick={handleLogin}
          style={{
            backgroundColor: "#1DB954",
            color: "#fff",
            padding: "12px 30px",
            border: "none",
            borderRadius: "30px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1ed760")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1DB954")}
        >
          Login with Spotify
        </button>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
