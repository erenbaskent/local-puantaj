import { initOraclePool } from "../config/oracle.config.js"

export const findAll = async (sql, binds, options = {}) => {
    const p = await initOraclePool();
    const connection = await p.getConnection();
    try {
        const result = await connection.execute(sql, binds, {
            maxRows: options.maxRows ?? 0,
            ...options
        });
        return result.rows ?? [];
    } finally {
        await connection.close();
    }
}

export const findOne = async (sql, binds = {}, options = {}) => {
    const rows = await findAll(sql, binds, { ...options, maxRows: 1 });
    return rows[0] ?? null;
}