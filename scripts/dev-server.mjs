// Lokální server bez Vercel CLI: statické soubory z public/ a /api/lead.
// Spuštění: npm run dev (načte .env, DATABASE_URL se nikde nevypisuje). Port 8765 nebo PORT.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import lead from "../api/lead.js";

const root = fileURLToPath(new URL("../public", import.meta.url));
const port = Number(process.env.PORT) || 8765;
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css",
  ".woff2": "font/woff2", ".pdf": "application/pdf", ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8"
};

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api/lead") return lead(req, res);
  const path = normalize(join(root, url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname));
  if (!path.startsWith(root)) { res.statusCode = 403; return res.end(); }
  try {
    const data = await readFile(path);
    res.setHeader("Content-Type", types[extname(path)] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end("404");
  }
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}`));
