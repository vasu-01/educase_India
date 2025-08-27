import { Router } from "express";
import { addSchool, listSchools } from "../controller/school.controller.js";

const router = Router();

router.route("/addSchool").post(addSchool);

router.route("/listSchools").get(listSchools);

export default router;
