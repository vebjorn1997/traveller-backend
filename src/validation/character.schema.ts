import { z } from "zod";

export const characterSchema = z.object({
    name: z.string().min(1),
    strength: z.number().min(0),
    dexterity: z.number().min(0),
    endurance: z.number().min(0),
    intellect: z.number().min(0),
    education: z.number().min(0),
    social: z.number().min(0),
});