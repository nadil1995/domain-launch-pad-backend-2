"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected route example
router.get('/', authMiddleware_1.authMiddleware, (req, res) => {
    const user = req.user;
    res.json({ message: `Welcome, user ${user.id}` });
});
exports.default = router;
