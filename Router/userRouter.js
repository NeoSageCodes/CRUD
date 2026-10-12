// Loading Express
const express = require('express');

// Importing Controller, Authentication, Validation Middleware
const controller = require('../Controller/user');
const authenticate = require("../Middleware/auth");
const validation = require('../Middleware/validateUser')

// Creating a router object
const router = express.Router();

// Setting Routes and handlers
router.get("/users", authenticate.checkApiKey, controller.allUsers);
router.post(
  "/user",
  authenticate.checkApiKey,
  validation.validate,
  controller.createUser,
);
router.get("/oneUser/:id", authenticate.checkApiKey, controller.oneUser);
router.put(
  "/updateUser/:id",
  authenticate.checkApiKey,
  validation.validate,
  controller.updateUser,
);
router.patch("/patchUser/:id", authenticate.checkApiKey, controller.patchUser);
router.delete("/deleteUser/:id", authenticate.checkApiKey, controller.deleteUser);

// Exporting
module.exports = router;