import { getMockReq, getMockRes } from "@jest-mock/express";

import adminController from "../src/controllers/adminController";
import Field from "../src/models/Field";

const fieldSaveSpy = jest.spyOn(Field.prototype, "save").mockImplementationOnce(() => {
  return Promise.resolve();
});

beforeEach(() => {
  // console.log("beforeEach");
});

afterEach(() => {
  // console.log("afterEach");
  // jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Create Field", () => {
  test.concurrent("Should Create Field", async function () {
    const req = getMockReq({
      body: { Title: "Yoga" },
    });
    const { res, next } = getMockRes();

    await adminController.postField(req, res, next);

    expect(res.json).toBeCalled();
    expect(fieldSaveSpy).toBeCalled();
  });

  test.concurrent(
    "Should Be Return Error In Next Function If Title Is Undefined",
    async function () {
      const req = getMockReq({
        body: { Status: "Active" },
      });
      const { res, next } = getMockRes();

      await adminController.postField(req, res, next);

      expect(next).toBeCalled();
    }
  );

  test.concurrent(
    "Should Be Return Error In Next Function If Status Isn't Active | Deactive",
    async function () {
      const req = getMockReq({
        body: { Tile: "Yoga", Status: "Test" },
      });
      const { res, next } = getMockRes();

      await adminController.postField(req, res, next);

      expect(next).toBeCalled();
    }
  );
});
