import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { animalsRouter } from "./route/animal-route.js";
import { cors } from "hono/cors";


dotenv.config();

const app = new Hono();
// CORS korrekt konfigurieren
app.use(
  "*",
  cors({
    origin: "*", // oder spezifische Domains
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.route("/animals", animalsRouter);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`🐾 Server läuft auf http://${info.address}:${info.port}`);
  }
);
