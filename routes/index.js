import express from "express";
const router = express.Router();
import multer from "multer";

import { authenticateToken } from "../middleware/auth.js";
import { UserController } from "../controllers/user-controller.js";
import { PostController } from "../controllers/post-controller.js";
import { CommentController } from "../controllers/comment-controller.js";
import { LikeController } from "../controllers/like-controller.js";
import { FollowControllers } from "../controllers/follow-controllers.js";

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

// Роуты комментариев
router.post("/comments", authenticateToken, CommentController.createComment);
router.delete("/comments/:id", authenticateToken, CommentController.deleteComment);

// Роуты лайков
router.post("/likes", authenticateToken, LikeController.likePost);
router.delete("/likes/:id", authenticateToken, LikeController.unlikePost);

// Роуты подписок
router.post("/follow", authenticateToken, FollowControllers.followUser);
router.delete("/unfollow/:id", authenticateToken, FollowControllers.unfollowUser);

export default router;
