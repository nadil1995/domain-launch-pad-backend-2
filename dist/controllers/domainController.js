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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomain = exports.getDomains = void 0;
const domainModel_1 = require("../models/domainModel");
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
    try {
        const { name, url } = req.body;
        const newDomain = new domainModel_1.Domain({ name, url });
        yield newDomain.save();
        res.status(201).json(newDomain);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create domain' });
    }
});
exports.createDomain = createDomain;
