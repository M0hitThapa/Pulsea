ALTER TABLE "feedback" ADD COLUMN "type" varchar(20) DEFAULT 'feedback';--> statement-breakpoint
ALTER TABLE "feedback" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "logo_url" text;