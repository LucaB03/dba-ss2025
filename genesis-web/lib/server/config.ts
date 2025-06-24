import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config = {
  POSTGRES_URL: process.env.POSTGRES_URL,
};

if (!config.POSTGRES_URL) {
  throw new Error("POSTGRES_URL ist nicht gesetzt");
}

export default config;