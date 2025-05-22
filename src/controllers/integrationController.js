const log = require('../util/log');

class IntegrationController {
    constructor(integrationService) {
        this.integrationService = integrationService;
    }

    async registerIntegration(req, res) {
        try {
            const result = await this.integrationService.registerUser({
                url: req.body.url,
                userName: req.body.userName,
                menuName: req.body.menuName,
                subMenuName: req.body.subMenuName,
                integrationStatus: req.body.integrationStatus,
                eligibilityStatus: req.body.eligibilityStatus,
                activeStatus: req.body.activeStatus,
                eligibleData: req.body.eligibleData // Pass eligibleData to service
            });
            if (result === 'success') {
                res.status(201).json({ responseCode: 201, data: { messages: 'Data pengajuan berhasil disimpan' } });
            } else {
                res.status(400).json({ responseCode: 400, data: { messages: 'Pengajuan gagal' } });
            }
        } catch (error) {
            res.status(500).json({ responseCode: 500, data: { messages: error.message } });
        }
    }

    async checkEligibility(req, res) {
        try {
            const eligibility = await this.integrationService.checkEligibility(req.params.userName);
            res.status(200).json({ responseCode: 200, data: { messages: eligibility } });
        } catch (error) {
            res.status(500).json({ responseCode: 500, data: { messages: error.message } });
        }
    }

    async getModules(req, res) {
        try {
            const { activeStatus, integrationStatus, limit, offset } = req.query;
            const filters = {
                activeStatus: activeStatus !== undefined ? activeStatus : undefined,
                integrationStatus: integrationStatus !== undefined ? integrationStatus : undefined,
                limit: limit !== undefined ? parseInt(limit) : undefined,
                offset: offset !== undefined ? parseInt(offset) : undefined
            };
            const modules = await this.integrationService.getModules(filters);
            res.status(200).json({ responseCode: 200, data: { messages: modules } });
        } catch (error) {
            res.status(500).json({ responseCode: 500, data: { messages: error.message } });
        }
    }

    async getModuleById(req, res) {
        try {
            const moduleData = await this.integrationService.getModuleById(req.params.id);
            if (moduleData) {
                // Fetch eligible data for this module
                const eligibleData = await this.integrationService.getEligibleDataByModuleId(req.params.id);
                moduleData.eligibleData = eligibleData || null;
                res.status(200).json({ responseCode: 200, data: { messages: moduleData } });
            } else {
                res.status(404).json({ responseCode: 404, data: { messages: 'Module not found' } });
            }
        } catch (error) {
            res.status(500).json({ responseCode: 500, data: { messages: error.message } });
        }
    }

    async editModule(req, res) {
        try {
            const { id, url, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus } = req.body;
            const result = await this.integrationService.editModuleById({ id, url, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus });
            if (result === 'success') {
                res.status(200).json({ responseCode: 200, data: { message: 'Update success' } });
            } else {
                res.status(400).json({ responseCode: 400, data: { message: 'Update failed' } });
            }
        } catch (error) {
            res.status(500).json({ responseCode: 500, data: { message: error.message } });
        }
    }
}

module.exports = IntegrationController;