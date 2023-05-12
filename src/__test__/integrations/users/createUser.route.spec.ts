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

  it("Success: Must be able to create a user - Full body", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userComplete);

    const { password, ...bodyEqual } = userCreateMock.userComplete;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(bodyEqual));
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.body.createdAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body.updatedAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
  });

  it("Success: Must be able to create a user - User 'addmin'", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userCompleteAdmin);

    const { password, ...bodyEqual } = userCreateMock.userComplete;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(bodyEqual));
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        isAdmin: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.body.createdAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body.updatedAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
  });

  it("Error: Must not be able to create a user - Email already exists", async () => {
    const uniqueUser = new User({
      ...userCreateMock.userComplete,
    });
    await uniqueUser.save();

    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userUniqueEmail);

    const expectResult = {
      status: 409,
      bodyMessage: {
        message: 'Email "gabrielrf@gmail.com" already exists',
      },
    };

    expect(response.status).toBe(expectResult.status);
    expect(response.body).toStrictEqual(expectResult.bodyMessage);
  });

  it("Error: Must not be able to create a user - Username already exists", async () => {
    const uniqueUser = new User({
      ...userCreateMock.userComplete,
    });

    await uniqueUser.save();

    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userUniqueUsername);

    const expectResults = {
      status: 409,
      bodyMessage: {
        message: 'Username "A3on" already exists',
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userInvalidBody);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          username: ["String must contain at most 50 character(s)"],
          email: [
            "Invalid email",
            "String must contain at most 50 character(s)",
          ],
          firstName: ["String must contain at most 50 character(s)"],
          lastName: ["String must contain at most 50 character(s)"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid Types", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userInvalidBodyType);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          username: ["Expected string, received number"],
          password: ["Expected string, received number"],
          email: ["Expected string, received array"],
          firstName: ["Expected string, received object"],
          lastName: ["Expected string, received boolean"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body required keys", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userInvalidKeys);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          username: ["Required"],
          firstName: ["Required"],
          lastName: ["Required"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });
});
