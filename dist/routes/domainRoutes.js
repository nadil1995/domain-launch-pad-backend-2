"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const domainController_1 = require("../controllers/domainController");
const router = express_1.default.Router();
// Existing routes
router.get('/', (req, res, next) => {
    (0, domainController_1.getDomains)(req, res).catch(next);
});
router.post('/', (req, res, next) => {
    (0, domainController_1.createDomain)(req, res).catch(next);
});
// New routes
router.get('/:id', (req, res, next) => {
    (0, domainController_1.getDomainById)(req, res).catch(next);
});
router.post('/:id/verify', (req, res, next) => {
    (0, domainController_1.verifyDomain)(req, res).catch(next);
});
exports.default = router;
