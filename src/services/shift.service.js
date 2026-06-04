import { Op } from "sequelize";
import mysqldb from "../models/index.js";
import { toUpperCase } from "../helpers/toUpperCase.js";
import { parseTime } from "../helpers/parseTime.js";

export const handleCreateShift = async (data) => {
    const { name, code, start_time, end_time } = data;
    const formattedCode = toUpperCase(code);
    const existingShift = await mysqldb.Shift.findOne({
        where: { code: code, start_time: start_time, end_time: end_time }
    })
    if (existingShift) {
        throw new Error("Eklemeye çalıştığınız shift zaten mevcut lütfen shift kodunu ve saatlerinin benzersiz olduğundan emin olun");
    }

    const shift = await mysqldb.Shift.create({
        name,
        code: formattedCode,
        start_time,
        end_time
    })

    return shift;
}

export const handleGetShifts = async () => {
    const shifts = await mysqldb.Shift.findAll();
    return shifts;
}

export const handleGetShift = async (id) => {
    const shift = await mysqldb.Shift.findByPk(id);
    if (!shift) {
        throw new Error("Böyle bir shift bulunamadı!");
    }
    return shift;
}

export const handleUpdateShift = async (id, data) => {
    const { name, code, start_time, end_time } = data;

    const existingShift = await mysqldb.Shift.findByPk(id);
    if (!existingShift) throw new Error("Düzenlenecek shift bulunamadı!");

    if (code) {
        const formattedCode = code.toUpperCase(code);
        const fault = await mysqldb.Shift.findOne({
            where: {
                code: formattedCode,
                id: {
                    [Op.ne]: id
                }
            }
        });

        if (fault) {
            throw new Error("Bu shift kodu zaten kullanımda!");
        }

        existingShift.code = formattedCode;
    }

    if (name) {
        existingShift.name = name;
    }

    if (start_time) {
        const formatterStartTime = parseTime(start_time, "Başlangıç Saati");
        existingShift.start_time = formatterStartTime;
    }

    if (end_time) {
        const formattedEndTime = parseTime(end_time, "Bitiş Saati");
        existingShift.end_time = formattedEndTime;
    }

    await existingShift.save();

    return existingShift;
}

export const handleDeleteShift = async (id) => {
    const existingShift = await mysqldb.Shift.findByPk(id);
    if (!existingShift) {
        throw new Error("Silmek istediğiniz shift bulunamadı!");
    }
    const result = await existingShift.destroy();
    return result;
}
