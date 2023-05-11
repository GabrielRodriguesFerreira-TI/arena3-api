export const userCreateMock = {
  userComplete: {
    username: "A3on",
    password: "123456",
    email: "gabrielrf@gmail.com",
    firstName: "Gabriel",
    lastName: "Rodrigues",
  },
  userCompleteAdmin: {
    username: "A3on",
    password: "123456",
    email: "gabrielrf@gmail.com",
    firstName: "Gabriel",
    lastName: "Rodrigues",
    isAdmin: true,
  },
  userUniqueEmail: {
    username: "Maltohumor",
    password: "123456",
    email: "gabrielrf@gmail.com",
    firstName: "Antonio",
    lastName: "Santos",
  },
  userUniqueUsername: {
    username: "A3on",
    password: "123456",
    email: "antonio1@gmail.com",
    firstName: "Antonio",
    lastName: "Santos",
  },
  userInvalidBodyType: {
    username: 1234,
    password: 1234,
    email: [],
    firstName: {},
    lastName: true,
  },
  userInvalidKeys: {
    email: "gabrielrf@gmail.com",
    password: "123456",
  },
  userInvalidBody: {
    username: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    password: "123456",
    email: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    firstName: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    lastName: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  },
};
