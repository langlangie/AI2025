class IntegrationRepository {
    constructor(db) {
        this.db = db;
    }

    async saveIntegration({ url, userName, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus, eligibleData }) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            const query = `INSERT INTO webview_modules 
                (url, username, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
            const values = [url, userName, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus];
            const result = await client.query(query, values);
            if (result.rows && result.rows[0]) {
                const moduleId = result.rows[0].id;
                if (eligibleData) {
                    const eligibleQuery = 'INSERT INTO webview_modules_eligible (modules_id, eligibleData) VALUES ($1, $2)';
                    await client.query(eligibleQuery, [moduleId, eligibleData]);
                }
                await client.query('COMMIT');
                return 'success';
            } else {
                await client.query('ROLLBACK');
                return 'failed';
            }
        } catch (err) {
            await client.query('ROLLBACK');
            return 'failed';
        } finally {
            client.release();
        }
    }

    async findUser(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async getIntegrationsByUser(userName) {
        const query = 'SELECT * FROM webview_modules WHERE username = $1';
        const values = [userName];
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getModules({ activeStatus, integrationStatus, limit, offset }) {
        let query = 'SELECT * FROM webview_modules WHERE 1=1';
        const values = [];
        let idx = 1;
        if (activeStatus !== undefined) {
            query += ` AND activeStatus = $${idx++}`;
            values.push(activeStatus);
        }
        if (integrationStatus !== undefined) {
            query += ` AND integrationStatus = $${idx++}`;
            values.push(integrationStatus);
        }
        if (limit !== undefined) {
            query += ` LIMIT $${idx++}`;
            values.push(limit);
        }
        if (offset !== undefined) {
            query += ` OFFSET $${idx++}`;
            values.push(offset);
        }
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getModuleById(id) {
        const query = 'SELECT * FROM webview_modules WHERE id = $1';
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async editModuleById({ id, url, menuName, subMenuName, integrationStatus, eligibilityStatus, activeStatus }) {
        try {
            // Build dynamic query for only provided fields
            const fields = [];
            const values = [];
            let idx = 1;
            if (url !== undefined) { fields.push(`url = $${idx++}`); values.push(url); }
            if (menuName !== undefined) { fields.push(`menuName = $${idx++}`); values.push(menuName); }
            if (subMenuName !== undefined) { fields.push(`subMenuName = $${idx++}`); values.push(subMenuName); }
            if (integrationStatus !== undefined) { fields.push(`integrationStatus = $${idx++}`); values.push(integrationStatus); }
            if (eligibilityStatus !== undefined) { fields.push(`eligibilityStatus = $${idx++}`); values.push(eligibilityStatus); }
            if (activeStatus !== undefined) { fields.push(`activeStatus = $${idx++}`); values.push(activeStatus); }
            if (fields.length === 0) return 'failed';
            values.push(id);
            const query = `UPDATE webview_modules SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
            const result = await this.db.query(query, values);
            if (result.rows && result.rows[0]) {
                return 'success';
            } else {
                return 'failed';
            }
        } catch (err) {
            return 'failed';
        }
    }

    async getEligibleDataByModuleId(moduleId) {
        const query = 'SELECT eligibleData FROM webview_modules_eligible WHERE modules_id = $1';
        const values = [moduleId];
        const result = await this.db.query(query, values);
        return result.rows[0] ? result.rows[0].eligibledata : null;
    }

    async saveEligibleData({ modules_id, eligibleData }) {
        const query = 'INSERT INTO webview_modules_eligible (modules_id, eligibleData) VALUES ($1, $2)';
        const values = [modules_id, eligibleData];
        await this.db.query(query, values);
    }
}

module.exports = IntegrationRepository;