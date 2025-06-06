"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Example route
router.get('/profile', (req, res) => {
    res.send('User routes working!');
});
exports.userRoutes = router; // Exporting the renamed router
exports.default = router;
