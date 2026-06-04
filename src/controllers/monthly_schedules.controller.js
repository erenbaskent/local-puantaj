import { handleCreateMonhlySchedules, handleGetMonthlyCalendar } from "../services/monthly_schedules.service.js";

export const createMonhlySchedules = async (req, res, next) => {
    const { userId, work_date, shift_code, note } = req.body;
    try {
        if (!userId, !work_date, !shift_code) {
            return res.status(400).json({ ok: false, message: "Kullanıcı, çalışma tarihi ve shift bilgilerini girdiğinizden emin olun!" });
        }
        const result = await handleCreateMonhlySchedules({ userId, work_date, shift_code, note });
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }

}

export const getMonhlyCalendar = async (req, res, next) => {
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const { userId } = req.query;
    try {
        if (!year, !month, !userId) res.status(400).json({ ok: false, message: "Hiç bir seçim yapılmadı (Tarih yada personel)" })
        if (month && !year) res.status(400).json({ ok: false, message: "Sadece ay seçemezsiniz yıl da seçmeniz gerekiyor" });
        const result = await handleGetMonthlyCalendar(year, month, userId);
        return res.status(200).json({
            ok: true,
            meta: { year, month, count: result.length },
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}