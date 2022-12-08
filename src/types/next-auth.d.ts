import { type DefaultSession } from "next-auth";
import { type Role } from "./typings.t";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role?: any;
    } & DefaultSession["user"];
  }
}
