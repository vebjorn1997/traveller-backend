import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

import { characterRoutes } from "./routes/character";

dotenv.config();

const server = Fastify({
  logger: false,
});

server.register(cors, {
  origin: [
    "http://localhost:3000",
    "https://traveller-frontend-production.up.railway.app"
  ],
  credentials: true,
});

server.get("/health", async () => {
  return { status: "ok" };
});

server.register(characterRoutes, { prefix: "/api/characters" });

const start = async () => {
  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
