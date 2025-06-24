import { Client } from "pg";
import config from "./config";

export async function getClient(): Promise<Client> {
  const client = new Client({
    connectionString: config.POSTGRES_URL,
  });
  await client.connect();
  return client;
}