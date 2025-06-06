export default async function handler(req, res) {
  const backendURL = "http://43.204.234.191/classify";

  const response = await fetch(backendURL, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json(); // or .json() if your backend returns JSON
  res.status(response.status).json(data);
}
