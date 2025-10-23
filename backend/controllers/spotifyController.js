const express = require('express');

const emotionToQuery = {
  happy: "happy upbeat positive",
  sad: "sad calm mellow",
  angry: "angry metal hard rock",
  love: "romantic love chill",
  fear: "dark cinematic suspense",
  surprised: "party pop dance",
  neutral: "focus instrumental"
};

const spotifyController = async (req, res) => {
  try {
    const emotion = req.params.emotion;
    if (!emotion) return res.status(400).json({ error: "Emotion is required" });

    const query = emotionToQuery[emotion] || "mood playlist";

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      },
      body: "grant_type=client_credentials"
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(500).json({ error: "Failed to fetch Spotify access token" });
    }

    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`,
      {
        headers: { "Authorization": `Bearer ${accessToken}` }
      }
    );

    const data = await searchResponse.json();

    const playlists = data.playlists.items.map(p => ({
      name: p.name,
      url: p.external_urls.spotify,
      image: p.images?.[0]?.url
    }));

    res.json({ emotion, playlists });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = spotifyController;
