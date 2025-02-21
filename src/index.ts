import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { animalsRouter } from "./route/animal-route.js";

dotenv.config();

const app = new Hono();

app.route("/animals", animalsRouter)


serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`🐾 Server läuft auf http://${info.address}:${info.port}`);
  }
);
