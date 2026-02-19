CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"strength" integer NOT NULL,
	"dexterity" integer NOT NULL,
	"endurance" integer NOT NULL,
	"intellect" integer NOT NULL,
	"education" integer NOT NULL,
	"social" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
