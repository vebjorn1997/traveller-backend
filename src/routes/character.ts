import { FastifyInstance } from "fastify";
import { db } from "../db";
import { characters } from "../db/characters";
import { characterSchema } from "../validation/character.schema";

export async function characterRoutes(fastify: FastifyInstance) {
    fastify.post('/create', async (request, reply) => {
        const body = characterSchema.parse(request.body);

        const result = await db.insert(characters).values(body).returning();

        return reply.status(201).send(result[0]);
    });

    fastify.get('/get-all', async (request, reply) => {
        const result = await db.select().from(characters);

        return reply.status(200).send(result);
    });
}