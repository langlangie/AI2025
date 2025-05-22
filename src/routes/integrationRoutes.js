const express = require('express');
const IntegrationController = require('../controllers/integrationController');
const IntegrationService = require('../services/integrationService');

const router = express.Router();
const integrationService = new IntegrationService();
const integrationController = new IntegrationController(integrationService);

// Define routes directly on the router
router.post('/register', integrationController.registerIntegration.bind(integrationController));
router.get('/check-eligibility/:username', integrationController.checkEligibility.bind(integrationController));
// Endpoint to get list of modules with optional filters and pagination
router.get('/modules', integrationController.getModules.bind(integrationController));
// Endpoint to get detail of a module by id
router.get('/modules/:id', integrationController.getModuleById.bind(integrationController));
// Endpoint to edit a module by id
router.post('/modules/edit', integrationController.editModule.bind(integrationController));

module.exports = router;