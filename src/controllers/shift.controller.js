import { handleCreateShift, handleDeleteShift, handleGetShift, handleGetShifts, handleUpdateShift } from "../services/shift.service.js";

export const createShift = async (req, res, next) => {
    const { name, code, start_time, end_time } = req.body;
    try {
        if (!name || !code || !start_time || !end_time) {
            return res.status(400).json({ ok: false, messsage: 'Shift ismi, shit kodu, başlama ve bitiş saatlerini boş bırakmadığınızdan emin olun!' });
        }
        const result = await handleCreateShift({ name, code, start_time, end_time })
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message })
    }
}

export const getShifts = async (req, res, next) => {
    try {
        const result = await handleGetShifts();
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const getShift = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ ok: false, message: "Sift seçmediniz!" })
        }
        const result = await handleGetShift(id);
        return res.status(200).json({ data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const updateShift = async (req, res, next) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ ok: false, message: "Güncellemek istediğiniz shifti seçmelisiniz!" });
        }
        const result = await handleUpdateShift(id, data);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const deleteShift = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ ok: false, message: "Silmek istediğiniz shifti seçmelisiniz!" });
        }
        const result = await handleDeleteShift(id);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}