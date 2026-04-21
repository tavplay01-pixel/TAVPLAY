import type { VercelRequest, VercelResponse } from "@vercel/node";
import { registerOAuthRoutes } from "../../server/_core/oauth";
import express from "express";

// Create an Express app for OAuth handling
const app = express();

// Register OAuth routes
registerOAuthRoutes(app);

// Handle the request
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request/response to Express-compatible format
  return new Promise<void>((resolve) => {
    app(req as any, res as any, () => {
      resolve();
    });
  });
}
