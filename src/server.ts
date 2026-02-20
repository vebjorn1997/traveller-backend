import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { characterRoutes } from "./routes/character";
import { db } from "./db";

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

server.get("/health", async (request, reply) => {
  try {
    // Try a simple query to test database connection
    await db.execute("SELECT 1");
    return reply.status(200).send({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database connection error:", error);
    return reply.status(503).send({ 
      status: "error", 
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

server.register(characterRoutes, { prefix: "/api/characters" });

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    const host = '0.0.0.0'; // Listen on all network interfaces
        
    console.log("DATABASE_URL is set:", process.env.DATABASE_URL ? "Yes" : "No");
    
    // Test database connection before starting server
    try {
      await db.execute("SELECT 1");
      console.log("Database connection successful!");
    } catch (dbError) {
      console.error("Failed to connect to database:", dbError);
      console.error("Make sure DATABASE_URL is correct in Railway variables");
      process.exit(1);
    }

    // Only run migrations in production
    if (process.env.NODE_ENV === "production") {
      await migrate(db, { migrationsFolder: "./src/db/migrations" });
      console.log("Migrations successful!");
    }
    
    await server.listen({ port, host });
    console.log(`Server listening on ${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    console.log(`Server error, exiting: ${err}`);
    process.exit(1);
  }
};

start();
