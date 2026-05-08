import dotenv from 'dotenv';
import app from './app.js';
import { closeOraclePool, initOraclePool } from './config/oracle.config.js';
import db from './models/index.js';
import sequelize from './config/mysql.config.js';
import { createRoleSeed } from './db/seed/roleSeed.js';
import { createUnitSeed } from './db/seed/unitSeed.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startApp() {
    try {
        await initOraclePool();
        console.log("Oracle bağlantı havuzu hazır!");

        await sequelize.authenticate();
        console.log("MySQL bağlantısı başarılı!");

        await sequelize.sync({force: false});
        console.log("MySQL tabloları senkronize edildi!");
        await createRoleSeed();
        console.log("Role seed eklendi!");
        await createUnitSeed();
        console.log("Birim seed eklendi!");
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portunda ayakta!`);
        })
    } catch (error) {
        console.error('❌ Sunucu başlatılırken hata oluştu:', error);
        process.exit(1);
    }
}

startApp();

process.on("SIGINT", async () => {
    await closeOraclePool();
    process.exit(0);
})