import { ExpressAuth } from "@auth/express";
import Credentials from "@auth/express/providers/credentials";
import express from "express";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import Database from "./infrastructure/db/index.js";

const client = Database.GetClient(process.env.MONGODB_URI!);

const router = express.Router();

router.use(
  "/api/auth/*",
  ExpressAuth({
    adapter: MongoDBAdapter(client),
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null;

          // logic to salt and hash password

          // logic to verify if the user exists

          if (!user) {
            throw new Error("invalid credentials");
          }

          return user;
        },
      }),
    ],
  })
);

export default router;
