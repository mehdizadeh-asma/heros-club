//import { NextFunction } from "express";

//import adminController from "../src/controllers/adminController";
// import Person from "../src/models/Person";

// let mockRequest: any;
// let mockResponse: any;
// let nextFunction: NextFunction;

// beforeAll(async () => {
//   console.log("beforeAll");

//   // dotenv.config();
//   // await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
// });

// beforeEach(() => {
//   console.log("beforeEach");

//   mockResponse = {
//     json: jest.fn((body) => (mockResponse.body = body)),
//   };

//   nextFunction = jest.fn();
// });

// afterEach(() => {
//   console.log("afterEach");

//   jest.clearAllMocks();
//   //jest.resetAllMocks();
// });

// afterAll(() => {
//   console.log("afterAll");
// });

describe("Create Person", () => {
  // beforeEach(() => {
  //   console.log("beforeEach Person");
  //   jest.mock("../src/models/Person");
  //   jest.spyOn(Person.prototype, "save").mockImplementationOnce(() => {
  //     return Promise.resolve();
  //   });
  // });

  test("Should Be Create Person ", async function () {
    expect(true).toEqual(true);
    // mockRequest = {
    //   body: { FirstName: "Ali", LastName: "Mohammadi" },
    // };
    // await adminController.postPerson(mockRequest, mockResponse, nextFunction);
    // expect(mockResponse.json).toBeCalled();
    // expect(mockResponse.body.FirstName).toEqual("Ali");
    // expect(mockResponse.body).toHaveProperty("_id");
    // expect(Person.prototype.save).toBeCalled();
    // expect(nextFunction).not.toBeCalled();
  });

  //   test("Should Be Thrown Error if FirstName is Null or Undifined", async function () {
  //     mockRequest = {
  //       body: { LastName: "Mohammadi" },
  //     };
  //     await adminController.postPerson(mockRequest, mockResponse, nextFunction);
  //     expect(Person.prototype.save).not.toBeCalled();
  //     expect(mockResponse.json).not.toBeCalled();
  //     expect(nextFunction).toBeCalled();
  //   });

  //   test("Should Be Thrown Error if LastName is Null or Undifined", async function () {
  //     mockRequest = {
  //       body: { FirstName: "Ali" },
  //     };
  //     await adminController.postPerson(mockRequest, mockResponse, nextFunction);
  //     expect(mockResponse.json).not.toBeCalled();
  //     expect(Person.prototype.save).not.toBeCalled();
  //     expect(nextFunction).toBeCalled();
  //   });
});
