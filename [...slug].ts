import type { VercelRequest, VercelResponse } from "@vercel/node";
import { registerStorageProxy } from "../../server/_core/storageProxy";
import express from "express";

// Create an Express app for storage proxy
const app = express();

// Register storage proxy routes
registerStorageProxy(app);

// Handle the request
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request/response to Express-compatible format
  return new Promise<void>((resolve) => {
    app(req as any, res as any, () => {
      resolve();
    });
  });
}
