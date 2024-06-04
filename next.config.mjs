import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env.local') });

/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.js

export default nextConfig;
