import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  url: text("url"),
  userId: varchar("user_id"),
});

export const feedbacks = pgTable("feedback", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),
  userName: text("user_name"),
  userEmail: text("user_email"),
  message: text("message"),
});

export const ProjectRelation = relations(Projects, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const FeedbackRelations = relations(feedbacks, ({ one }) => ({
  project: one(Projects, {
    fields: [feedbacks.projectId],
    references: [Projects.id],
  }),
}));
