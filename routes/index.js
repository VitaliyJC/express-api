import express from "express";
const router = express.Router();
import multer from "multer";
import { UserController } from "../controllers/user-controller.js";
import { PostController } from "../controllers/post-controller.js";
import { authenticateToken } from "../middleware/auth.js";

const uploadDestination = "uploads";

//Показываем где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.get("/", function (req, res) {
  res.send("API Home");
});

// Роуты пользователя
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/users/:id", authenticateToken, UserController.getUserById);
router.put("/users/:id", authenticateToken, UserController.updateUser);

// Роуты посты
router.post("/posts", authenticateToken, PostController.createPost);
router.get("/posts", authenticateToken, PostController.getAllPost);
router.get("/posts/:id", authenticateToken, PostController.getPostById);
router.delete("/posts/:id", authenticateToken, PostController.deletePost);

export default router;
