import { Router } from "express";

import adminController from "../controllers/adminController";

const router = Router();

router.post("/field", adminController.postField);

router.get("/fields", adminController.getFields);

router.get("/field/:id", adminController.getField);

router.put("/field/:id", adminController.putField);

router.delete("/field/:id", adminController.deleteField);

export default router;
