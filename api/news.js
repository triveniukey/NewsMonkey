// api/news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { page = 1, country = 'us', category = 'general' } = req.query;
  const apiKey = process.env.VITE_NEWS_API;

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=5`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
