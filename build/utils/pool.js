"use strict";
const { Pool } = require('pg');
require('dotenv').config();
class pool {
    constructor(config) { }
    static getInstance() {
        if (!pool._instance) {
            pool._instance = new Pool({
                connectionString: process.env.DATABASE_URL,
                max: 500,
                min: 100,
            });
        }
        return pool._instance;
    }
}
module.exports = pool;
//# sourceMappingURL=pool.js.map