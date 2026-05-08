import oracledb from "oracledb"

oracledb.initOracleClient({ libDir: 'C:\\app\\client\\Administrator\\product\\12.1.0\\client_1\\BIN' });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool;

export const initOraclePool = async () => {
    if (pool) return pool;
    pool = await oracledb.createPool({
        user: process.env.ORACLE_USERNAME,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECT_STRING,
        poolMin: 1,
        poolMax: 10,
        poolIncrement: 1
    });
    return pool;
}

export const closeOraclePool = async () => {
    if(pool) {
        await pool.close(10);
        pool = undefined;
    }
}

