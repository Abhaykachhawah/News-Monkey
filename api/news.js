export default async function handler(req, res) {
  const { country, category, q } = req.query;
  const API_KEY = process.env.REACT_APP_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API Key not found in environment variables" });
  }

  // Construct URL based on search query or category
  const url = q
    ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&apikey=${API_KEY}`
    : `https://gnews.io/api/v4/top-headlines?country=${country || "us"}&lang=en&category=${category || "general"}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch news from GNews" });
  }
}
