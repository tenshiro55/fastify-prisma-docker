import Fastify from "fastify";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();
// path สำหรับ upload ไว้ใน /usr/src/app/uploads
// const uploadPath = path.join(__dirname, 'uploads');

// TypeORM setup (example)
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER || "myuser",
  password: process.env.POSTGRES_PASSWORD || "mypassword",
  database: process.env.POSTGRES_DB || "mydb",
  synchronize: true,
  logging: false,
  entities: [],
});

AppDataSource.initialize()
  .then(() => console.log("TypeORM connected"))
  .catch((err) => console.error("TypeORM connection error:", err));

// Fastify route
fastify.get("/", async () => {
  const users = await prisma.user.findMany().catch(() => []);
  return { hello: "world", users };
});
// fastify.get("/",()=>{
//     return { hello: "world" };
// })

// Start server
fastify.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Server running on http://localhost:3000");
});
