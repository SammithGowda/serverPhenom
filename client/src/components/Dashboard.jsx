import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "", email: "", id: "" });
  const [topTracks, setTopTracks] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const id = params.get("id");

    if (token) {
      localStorage.setItem("jwt", token); // Store JWT
      setUser({ name, email, id });

      // Fetch top tracks using fetch API
      fetch("http://localhost:3000/top-tracks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch top tracks");
          return res.json();
        })
        .then((data) => {
          setTopTracks(data.tracks || []);
          setMessage(data.message);
        })
        .catch((err) => {
          console.error("Fetch error:", err.message);
        });
    }
  }, [location]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>

      <h2 style={{ marginTop: "2rem" }}>🎧 Top 5 Spotify Tracks</h2>
      {topTracks.length > 0 ? (
        <ol
          style={{ textAlign: "left", maxWidth: "600px", margin: "1rem auto" }}
        >
          {topTracks.map((track, index) => (
            <li key={index}>
              <strong>{track.name}</strong> by{" "}
              {track.artists?.map((a) => a.name).join(", ")}
            </li>
          ))}
        </ol>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Dashboard;
