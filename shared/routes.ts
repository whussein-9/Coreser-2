import { z } from "zod";
import { insertContactMessageSchema, contactMessages } from "./schema";

export const api = {
  contact: {
    submit: {
      method: "POST",
      path: "/api/contact",
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
  },
};
