import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  url: text("url"),
  userId: varchar("user_id"),
  logoUrl: text("logo_url"),
});

export const feedbacks = pgTable("feedback", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }), // Added cascade delete
  userName: text("user_name"),
  userEmail: text("user_email"),
  message: text("message"),
  rating: integer("rating"),
  type: varchar("type", { length: 20 }).default("feedback"), // 'feedback' or 'bug'
  imageUrl: text("image_url"), // URL of uploaded screenshot/image

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ProjectRelation = relations(projects, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const FeedbackRelations = relations(feedbacks, ({ one }) => ({
  project: one(projects, {
    fields: [feedbacks.projectId],
    references: [projects.id],
  }),
}));
