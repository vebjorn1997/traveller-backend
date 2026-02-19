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
    const port = Number(process.env.PORT) || 3001;
    const host = '0.0.0.0'; // Listen on all network interfaces
    
    await server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
