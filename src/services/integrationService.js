const IntegrationRepository = require('../repositories/integrationRepository');
const db = require('../config/db').pool;
const log = require('../util/log');

function logServiceWrapper(fn, functionName) {
    return async function(...args) {
        const start = Date.now();
        log({
            serviceName: 'IntegrationService',
            functionName,
            level: 'INFO',
            flag: 'START',
            bodyParams: args[0],
            message: `Start ${functionName}`
        });
        try {
            const result = await fn.apply(this, args);
            log({
                serviceName: 'IntegrationService',
                functionName,
                level: 'INFO',
                flag: 'STOP',
                executionTime: Date.now() - start,
                result,
                message: `End ${functionName}`
            });
            return result;
        } catch (error) {
            log({
                serviceName: 'IntegrationService',
                functionName,
                level: 'ERROR',
                flag: 'STOP',
                executionTime: Date.now() - start,
                error: error.message,
                message: `Error in ${functionName}`
            });
            throw error;
        }
    };
}

class IntegrationService {
    constructor() {
        this.integrationRepository = new IntegrationRepository(db);
        this.registerUser = logServiceWrapper(this.registerUser, 'registerUser').bind(this);
        this.checkEligibility = logServiceWrapper(this.checkEligibility, 'checkEligibility').bind(this);
        this.getModules = logServiceWrapper(this.getModules, 'getModules').bind(this);
        this.getModuleById = logServiceWrapper(this.getModuleById, 'getModuleById').bind(this);
        this.editModuleById = logServiceWrapper(this.editModuleById, 'editModuleById').bind(this);
        this.getEligibleDataByModuleId = logServiceWrapper(this.getEligibleDataByModuleId, 'getEligibleDataByModuleId').bind(this);
    }

    async registerUser({ url, userName, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus, eligibleData }) {
        // Now handled in repository: both webview_modules and eligibleData
        return await this.integrationRepository.saveIntegration({ url, userName, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus, eligibleData });
    }

    async checkEligibility(username) {
        const user = await this.integrationRepository.findUser(username);
        if (!user) {
            throw new Error('User not found');
        }
        const integrations = await this.integrationRepository.getIntegrationsByUser(username);
        return { eligible: integrations.length === 0 };
    }

    async getModules(filters) {
        return await this.integrationRepository.getModules(filters);
    }

    async getModuleById(id) {
        return await this.integrationRepository.getModuleById(id);
    }

    async editModuleById(data) {
        return await this.integrationRepository.editModuleById(data);
    }

    async getEligibleDataByModuleId(moduleId) {
        return await this.integrationRepository.getEligibleDataByModuleId(moduleId);
    }
}

module.exports = IntegrationService;