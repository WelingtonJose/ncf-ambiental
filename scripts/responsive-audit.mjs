import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const port = 4173;
const outputDirectory = join(process.cwd(), "out");
const screenshotDirectory = join(process.cwd(), "artifacts", "responsive");
const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const executablePath = chromeCandidates.find((candidate) => existsSync(candidate));
if (!executablePath) throw new Error("Chrome ou Edge não encontrado para a auditoria responsiva.");
if (!existsSync(outputDirectory)) throw new Error("Execute `npm run build` antes da auditoria.");

const tests = [
  { name: "home-mobile", path: "/", width: 375, height: 812 },
  { name: "home-tablet", path: "/", width: 768, height: 1024 },
  { name: "home-notebook", path: "/", width: 1366, height: 768 },
  { name: "home-desktop", path: "/", width: 1920, height: 1080 },
  { name: "menu-mobile", path: "/", width: 375, height: 812, action: "mobile-menu" },
  { name: "modal-mobile", path: "/", width: 375, height: 812, action: "quote-modal" },
  {
    name: "cep-vilhena-tablet",
    path: "/",
    width: 768,
    height: 1024,
    action: "coverage",
    cep: "76980010",
    expectedDestination: "Vilhena/RO",
  },
  {
    name: "cep-rolim-tablet",
    path: "/",
    width: 768,
    height: 1024,
    action: "coverage",
    cep: "76940000",
    expectedDestination: "Cacoal/RO",
  },
  {
    name: "menu-comercial-notebook",
    path: "/",
    width: 1366,
    height: 768,
    action: "commercial-menu",
  },
  { name: "sobre-mobile", path: "/sobre/", width: 375, height: 812 },
  { name: "setores-mobile", path: "/comercial/setores/", width: 375, height: 812 },
  { name: "lixeiras-mobile", path: "/residencial/lixeiras/", width: 375, height: 812 },
];

await mkdir(screenshotDirectory, { recursive: true });
const server = createStaticServer(outputDirectory);
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const browser = await chromium.launch({ executablePath, headless: true });
let hasOverflow = false;

try {
  for (const test of tests) {
    const page = await browser.newPage({ viewport: { width: test.width, height: test.height } });
    await page.goto(`http://127.0.0.1:${port}${test.path}`, { waitUntil: "networkidle" });
    await runInteraction(page, test);

    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const overflowingElements = [...document.querySelectorAll("body *")]
        .filter((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.left < -1 || bounds.right > root.clientWidth + 1;
        })
        .slice(0, 5)
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
        }));

      return {
        viewportWidth: root.clientWidth,
        contentWidth: root.scrollWidth,
        overflowingElements,
      };
    });

    const overflow = metrics.contentWidth > metrics.viewportWidth;
    hasOverflow ||= overflow;
    console.log(
      `${test.name}: ${metrics.viewportWidth}px viewport / ${metrics.contentWidth}px conteúdo / overflow=${overflow}`,
    );
    if (metrics.overflowingElements.length) console.log(metrics.overflowingElements);

    await page.screenshot({
      path: join(screenshotDirectory, `${test.name}-${test.width}x${test.height}.png`),
    });
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}

if (hasOverflow) process.exitCode = 1;

async function runInteraction(page, test) {
  const { action } = test;
  if (action === "mobile-menu") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
  }
  if (action === "quote-modal") {
    await page
      .getByRole("button", { name: /Solicitar atendimento/ })
      .first()
      .click();
  }
  if (action === "commercial-menu") {
    await page.getByRole("button", { name: "Comercial" }).click();
  }
  if (action === "coverage") {
    await page.getByLabel(/Digite o CEP/).fill(test.cep);
    await page.getByRole("button", { name: "Verificar cobertura operacional" }).click();
    await page.getByText(test.expectedDestination, { exact: false }).waitFor({ timeout: 20_000 });
  }
}

function createStaticServer(rootDirectory) {
  const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".webp": "image/webp",
    ".woff2": "font/woff2",
  };

  return createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
    const filePath = join(rootDirectory, safePath);

    try {
      const content = readFileSync(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
      });
      response.end(content);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Arquivo não encontrado.");
    }
  });
}
