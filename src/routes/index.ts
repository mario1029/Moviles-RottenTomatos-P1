import Router from "express";
import auth from "./session";
import users from "./users";

const router = Router();

router.use("/session", auth);
router.use("/users", users);

export default router;
