import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";
import { Readable } from "stream";
import { Worker } from "worker_threads";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 3001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const createRandomUser = () => {
  const hobbies = Array.from(
    { length: faker.number.int({ min: 0, max: 10 }) },
    () => faker.word.noun()
  );

  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatarGitHub(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 70 }),
    nationality: faker.location.country(),
    hobbies,
  };
};

const ALL_USERS = Array.from({ length: 1000 }, createRandomUser);

app.use(cors());

app.get("/api/users", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = (req.query.search || "").toLowerCase();
  const nationality = req.query.nationality;
  const hobby = req.query.hobby;

  let users = [...ALL_USERS];

  if (search) {
    users = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search) ||
        user.last_name.toLowerCase().includes(search)
    );
  }

  if (nationality) {
    users = users.filter((user) => user.nationality === nationality);
  }

  if (hobby) {
    users = users.filter((user) => user.hobbies.includes(hobby));
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json({
    totalItems: users.length,
    totalPages: Math.ceil(users.length / limit),
    currentPage: page,
    users: paginatedUsers,
  });
});

app.get("/api/filters", (req, res) => {
  const allHobbies = new Map();
  const allNationalities = new Map();

  ALL_USERS.forEach((user) => {
    allNationalities.set(
      user.nationality,
      (allNationalities.get(user.nationality) || 0) + 1
    );
    user.hobbies.forEach((hobby) => {
      allHobbies.set(hobby, (allHobbies.get(hobby) || 0) + 1);
    });
  });

  const topNationalities = [...allNationalities.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map((item) => item[0]);

  const topHobbies = [...allHobbies.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map((item) => item[0]);

  res.json({
    nationalities: topNationalities,
    hobbies: topHobbies,
  });
});

app.get("/api/stream-text", (req, res) => {
  const longText = faker.lorem.paragraphs(32);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  const textStream = new Readable({
    read() {},
  });

  let i = 0;
  const interval = setInterval(() => {
    if (i < longText.length) {
      textStream.push(longText[i]);
      i++;
    } else {
      textStream.push(null);
      clearInterval(interval);
    }
  }, 5);

  textStream.pipe(res);
});

const worker = new Worker("./worker.js");

worker.on("message", (result) => {
  io.emit("task-result", result);
});

app.get("/api/process-request/:id", (req, res) => {
  const taskId = req.params.id;
  worker.postMessage({ id: taskId });
  res.json({ status: "pending", id: taskId });
});

io.on("connection", (socket) => {
  console.log("A user connected with socket id:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
