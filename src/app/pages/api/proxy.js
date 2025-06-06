export default async function handler(req, res) {
  try {
    const backendRes = await fetch("http://43.204.234.191/classify", {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Something went wrong in the proxy" });
  }
}
