import { NextFunction } from "express";

import adminController from "../src/controllers/adminController";
import Field from "../src/models/Field";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockRequest: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockResponse: any;
let nextFunction: NextFunction;

beforeAll(async () => {
  console.log("beforeAll");

  // dotenv.config();
  // await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
});

beforeEach(() => {
  console.log("beforeEach");

  mockResponse = {
    json: jest.fn((body) => (mockResponse.body = body)),
    status: jest.fn((statusCode) => {
      mockResponse.statusCode = statusCode;
      return mockResponse;
    }),
  };

  nextFunction = jest.fn();
});

afterEach(() => {
  console.log("afterEach");

  jest.clearAllMocks();
  //jest.resetAllMocks();
});

afterAll(() => {
  console.log("afterAll");
});

describe("Create Field", () => {
  beforeEach(() => {
    console.log("beforeEach Field");

    jest.mock("../src/models/Field");
    jest.spyOn(Field.prototype, "save").mockImplementationOnce(() => {
      return Promise.resolve();
    });
  });

  test("Should Create Field", async function () {
    mockRequest = {
      body: { Title: "Yoga" },
    };
    await adminController.postField(mockRequest, mockResponse, nextFunction);
    expect(mockResponse.json).toBeCalled();
    expect(mockResponse.statusCode).toEqual(201);
    expect(mockResponse.body.Title).toEqual("Yoga");
    expect(mockResponse.body).toHaveProperty("_id");
    expect(Field.prototype.save).toBeCalled();
  });
});
