import express from 'express';
import { findAll } from './db/database.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/', async (req, res) => {
    try {
        const data = await findAll('SELECT * FROM baskent_personel_jguar p where P.OZL_TCKIMLIK_NO= :tc', { tc: '53275513416' });
        return res.status(200).json({ data: data })
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, message: e.message });
    }
    res.send('Local Puantaj API');
});



export default app;