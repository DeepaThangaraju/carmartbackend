import express from "express";
import { authenticate, admin } from "../middleware/authMiddleware.js";
import {
  getVechicals,
  getVechicalById,
  deleteVechical,
  updateVechical,
  createVechical,
  reviewVechical,
  getTopVechical,
} from "../controllers/vechicalControllers.js";
const router = express.Router();

router
  .route("/")
  .get(getVechicals())
  .post(authenticate, admin, createVechical());
router
  .route("/:id")
  .get(getVechicalById())
  .delete(authenticate, admin, deleteVechical())
  .put(authenticate, admin, updateVechical());
router.route("/:id/reviews").post(authenticate, reviewVechical());
router.get("/top",getTopVechical())

export const vechicalRoute = router;
