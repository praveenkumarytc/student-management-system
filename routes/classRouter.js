const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

// User routes
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/user/:userId", userController.getUserById);
userRouter.put("/user/:userId", userController.updateUser);
userRouter.put("/user/:userId/password", userController.updatePassword);
userRouter.delete("/user/:userId", userController.deleteUser);

module.exports = userRouter;
