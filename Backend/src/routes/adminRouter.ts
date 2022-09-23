import { Router } from "express";

import adminController from "../controllers/adminController";

const router = Router();

//#region Field Routes
router.post("/field", adminController.postField);

router.get("/fields", adminController.getFields);

router.get("/field/:id", adminController.getField);

router.put("/field/:id", adminController.putField);

router.delete("/field/:id", adminController.deleteField);
//#endregion

router.post("/event", adminController.postEvent);

router.get("/events", adminController.getEvents);

router.get("/event/:id", adminController.getEvent);

router.put("/event/:id", adminController.putEvent);

router.delete("/event/:id", adminController.deleteEvent);
export default router;
