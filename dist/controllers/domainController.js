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
exports.verifyDomain = exports.getDomainById = exports.createDomain = exports.getDomains = void 0;
const domainModel_1 = require("../models/domainModel");
const mongoose_1 = __importDefault(require("mongoose"));
// GET all domains
const getDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domains = yield domainModel_1.Domain.find();
        res.status(200).json(domains);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch domains' });
    }
});
exports.getDomains = getDomains;
// POST a new domain
const createDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('1. Received create domain request');
    try {
        console.log('2. Request body:', req.body);
        console.log('3. User:', req.user);
        const { name, url } = req.body;
        if (!name || !url) {
            return res.status(400).json({ success: false, message: 'Name and URL are required' });
        }
        const newDomain = new domainModel_1.Domain({
            name,
            url,
            isVerified: false, // Default false
        });
        console.log('4. Saving domain...');
        yield newDomain.save();
        console.log('5. Domain saved successfully.');
        res.status(201).json({ success: true, data: newDomain });
    }
    catch (error) {
        console.error('Error at create domain:', error);
        res.status(500).json({ success: false, message: 'Failed to create domain', error: error.message });
    }
});
exports.createDomain = createDomain;
// Get a single domain by ID
const getDomainById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Ensure the id is a valid ObjectId
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const domain = yield domainModel_1.Domain.findById(id);
        if (!domain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        res.status(200).json(domain);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch domain details' });
    }
});
exports.getDomainById = getDomainById;
// Verify domain
const verifyDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const domain = yield domainModel_1.Domain.findById(id);
        if (!domain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        // Update only the isVerified field
        domain.isVerified = true;
        yield domain.save({ validateModifiedOnly: true }); // Only validate modified fields
        res.status(200).json({ message: 'Domain verified successfully', domain });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to verify domain', error });
    }
});
exports.verifyDomain = verifyDomain;
