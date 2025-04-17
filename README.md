# 🎵 Spotify OAuth Login with Top Tracks Viewer

A full-stack application that allows users to log in with their Spotify account using OAuth 2.0 and view their top 5 Spotify tracks.

---


## 🚀 Tech Stack

- **Client**: React  
- **Server**: Node.js + Express  
- **Authentication**: Spotify OAuth 2.0  
- **Database**: MongoDB (for user and token persistence)  

---

## 📦 Features

✅ Spotify OAuth Login  
✅ Secure JWT Token Generation  
✅ Protected Routes with JWT  
✅ Fetch and Display Top 5 Tracks from Spotify  
✅ MongoDB Persistence  
✅ Easy-to-follow modular code  

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SammithGowda/serverPhenom.git
cd serverPhenom

```
### 2. run server
```bash
cd server
npm install

```

### 3. run client
```bash
cd ../client
npm install

```
### 4. env setup
```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/spotify-auth
```


