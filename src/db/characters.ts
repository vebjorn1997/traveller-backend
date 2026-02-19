import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  strength: integer("strength").notNull(),
  dexterity: integer("dexterity").notNull(),
  endurance: integer("endurance").notNull(),
  intellect: integer("intellect").notNull(),
  education: integer("education").notNull(),
  social: integer("social").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
