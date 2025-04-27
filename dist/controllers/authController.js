"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Correct import for User model in userRoutes.ts and authController.ts
const User_1 = __importDefault(require("../models/User")); // Adjust the path if needed
// Signup Controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Logic to save user
    const user = new User_1.default({
        username,
        email,
        password: hashedPassword, // Save the hashed password
    });
    try {
        yield user.save();
        return res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.signup = signup;
// Login Controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Add logic for login (e.g., validate email, check password, generate JWT)
    return res.status(200).json({ message: 'Login successful' });
});
exports.login = login;
