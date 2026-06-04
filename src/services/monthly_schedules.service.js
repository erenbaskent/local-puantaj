import { Op } from "sequelize";
import { getMonthDateRange } from "../helpers/getMonthDateRange.js";
import mysqldb from "../models/index.js";

export const handleCreateMonhlySchedules = async (data) => {
    const { userId, work_date, shift_code, note } = data;
    const existingUser = await mysqldb.User.findByPk(userId);
    if (!existingUser) throw new Error("Kullanıcı bulunamadı!");
    const existingShift = await mysqldb.Shift.findOne({ where: { code: shift_code } });
    if (!existingShift) throw new Error("Shift bulunamad!");
    const result = await mysqldb.Monthly_Schedules.create({
        userId,
        work_date,
        shift_code,
        note
    });
    return result;
}


export const handleGetMonthlyCalendar = async (year = null, month = null, userId = null) => {
    const where = {};
    if (year && month) {
        const { start, end } = getMonthDateRange(year, month);
        where.work_date = { [Op.between]: [start, end] }
    } else if (year) {
        where.work_date = { [Op.between]: [`${year}-01-01`, `${year}-12-31`] }
    }
    if (userId) {
        where.userId = Number(userId);
        const existingUser = await mysqldb.User.findByPk(userId);
        if (!existingUser) {
            throw new Error("Kullanıcı bulunamadı!");
        }
    }

    const result = await mysqldb.Monthly_Schedules.findAll({
        where,
        include: [
            { model: mysqldb.User, attributes: ["id", "full_name", "username", "email", "psnno"] },
            { model: mysqldb.Shift, attributes: ["code", "name", "start_time", "end_time"] },
        ],
        order: [
            ["work_date", "ASC"],
            ["userId", "ASC"],
        ],
    })
    return result.map((r) => {
        const p = r.get({ plain: true });
        return {
            id: p.id,
            userId: p.userId,
            full_name: p.User?.full_name,
            psnno: p.User?.psnno,
            work_date: p.work_date,
            shift_code: p.shift_code,
            shift_name: p.Shift?.name,
            shift_start: p.Shift?.start_time,
            shift_end: p.Shift?.end_time,
            note: p.note,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
        };
    });
}