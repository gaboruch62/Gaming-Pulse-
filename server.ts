import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Cache for news data
let newsCache: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function fetchGamingIntel() {
  const now = Date.now();
  if (newsCache.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return newsCache;
  }

  try {
    // Queries for different categories
    const categories = [
      "gaming news",
      "esports tournament",
      "game patch notes",
      "gaming leaks rumors",
      "free games deals"
    ];

    const responses = await Promise.allSettled([
      ...categories.map(q => axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`)),
      axios.get(`https://www.reddit.com/r/Games/top.json?limit=20&t=day`, { headers: { "User-Agent": "GamingPulse/1.0" } }),
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=gaming+review+trailer&type=video&videoEmbeddable=true&key=${process.env.YOUTUBE_API_KEY}`)
    ]);

    let combinedIntel: any[] = [];

    // Process NewsAPI results
    responses.slice(0, categories.length).forEach((res, idx) => {
      if (res.status === "fulfilled") {
        const articles = res.value.data.articles || [];
        const type = categories[idx].split(' ')[1].toUpperCase();
        combinedIntel = [...combinedIntel, ...articles.map((a: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: a.title,
          description: a.description,
          source: a.source.name,
          date: new Date(a.publishedAt).toLocaleDateString(),
          url: a.url,
          image: a.urlToImage || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
          type: type === 'NEWS' ? 'INTEL' : type,
          score: Math.floor(Math.random() * 20) + 75,
          color: "bg-brand-cyan"
        }))];
      }
    });

    // Process Reddit
    const redditResponse = responses[categories.length];
    if (redditResponse.status === "fulfilled") {
      const children = redditResponse.value.data.data.children || [];
      combinedIntel = [...combinedIntel, ...children.map((child: any) => {
        const data = child.data;
        let img = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800";
        if (data.preview?.images?.[0]?.source?.url) {
            img = data.preview.images[0].source.url.replace(/&amp;/g, "&");
        }
        return {
          id: data.id,
          title: data.title,
          description: data.selftext || data.title,
          source: `r/${data.subreddit}`,
          date: "Hot",
          url: `https://reddit.com${data.permalink}`,
          image: img,
          type: "TRENDING",
          score: Math.min(100, 80 + Math.floor(data.ups / 500)),
          color: "bg-brand-red"
        };
      })];
    }

    // Process YouTube
    const youtubeResponse = responses[categories.length + 1];
    if (youtubeResponse.status === "fulfilled") {
      const items = youtubeResponse.value.data.items || [];
      combinedIntel = [...combinedIntel, ...items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        source: item.snippet.channelTitle,
        date: "Video",
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        embed: `https://www.youtube.com/embed/${item.id.videoId}`,
        image: item.snippet.thumbnails.high.url,
        type: "VIDEO",
        score: 98,
        color: "bg-brand-lime"
      }))];
    }

    // Filter and Shuffle
    combinedIntel = combinedIntel.filter(n => n.title && n.image && !n.image.includes("self") && !n.image.includes("default"));
    
    // Sort by "score" or novelty
    newsCache = combinedIntel.sort(() => Math.random() - 0.5);
    lastFetchTime = now;
    return newsCache;
  } catch (error) {
    console.error("Error fetching intel:", error);
    return newsCache;
  }
}

async function startServer() {
  // API Routes
  app.get("/api/news", async (req, res) => {
    const news = await fetchGamingIntel();
    res.json(news);
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
