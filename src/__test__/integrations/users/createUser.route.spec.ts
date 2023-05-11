import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../../app";
import { userCreateMock } from "../../mocks/users/createUser.route.mock";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";

describe("POST /users", () => {
  const baseUrl: string = "/users";
  let request: supertest.SuperTest<supertest.Test>;
  let server: MongoMemoryServer;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    const uri = server.getUri();
    await mongoose.connect(uri, { autoIndex: true });
    request = supertest(app);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.stop();
  });
});
