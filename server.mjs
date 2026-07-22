import { createReadStream, existsSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

function send(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, { "content-type": contentType });
  res.end(body);
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const absolute = resolve(root, `.${normalized}`);
  return relative(root, absolute).startsWith("..") ? null : absolute;
}

async function worksheetLinks() {
  const base = join(root, "worksheets");
  const links = [];

  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name === "index.html") {
        const href = `/${relative(root, fullPath).replaceAll("\\", "/")}`;
        links.push(`<li><a href="${href}">${href.replace("/worksheets/", "").replace("/index.html", "")}</a></li>`);
      }
    }
  }

  if (existsSync(base)) {
    await walk(base);
  }

  return links.sort().join("\n");
}

async function homePage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Summer Worksheets</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 760px; margin: 3rem auto; padding: 0 1rem; line-height: 1.5; }
      a { color: #165a8f; }
      code { background: #f4f4f4; padding: 0.15rem 0.3rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>Summer Worksheets</h1>
    <p>Printer-friendly HTML worksheets for elementary school summer practice.</p>
    <h2>Worksheets</h2>
    <ul>${await worksheetLinks()}</ul>
    <p>Grade-readiness guidance lives in <code>docs/grade-guides/</code>.</p>
  </body>
</html>`;
}

createServer(async (req, res) => {
  const requested = new URL(req.url || "/", `http://${req.headers.host}`).pathname;

  if (requested === "/") {
    send(res, 200, await homePage(), "text/html; charset=utf-8");
    return;
  }

  const filePath = safePath(requested);
  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    send(res, 404, "Not found");
    return;
  }

  const type = mimeTypes[extname(filePath)] || "application/octet-stream";
  res.writeHead(200, { "content-type": type });
  createReadStream(filePath).pipe(res);
}).listen(port, () => {
  console.log(`Summer Worksheets dev server: http://localhost:${port}`);
});
