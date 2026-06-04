import { toUpperCase } from "../helpers/toUpperCase.js";
import mysqldb from "../models/index.js";


export const handleCreateRole = async (data) => {
    const { name, code, description } = data;
    const existingRole = await mysqldb.Role.findOne({ where: { code: code } });
    if (existingRole) throw new Error("Bu rol koduna sahip bir rol zaten mevcut");
    const upperCode = toUpperCase(code);
    const result = await mysqldb.Role.create({
        name,
        code: upperCode,
        description
    })
    return result;
}

export const handleGetRoles = async () => {
    const roles = await mysqldb.Role.findAll();
    return roles;
}

export const handleGetRole = async (id) => {
    const role = await mysqldb.Role.findByPk(id);
    if(!role) {
        throw new Error("Böyle bir rol bulunamadı!");
    }
    return role;
}

export const handleUpdateRole = async (id, data) => {

    const { name, code, description } = data;

    const existingRole = await mysqldb.Role.findByPk(id);

    if (!existingRole) {
        throw new Error("Düzenlenecek rol bulunamadı!");
    }

    if (code) {

        const formattedCode = code.toUpperCase();

        const fault = await mysqldb.Role.findOne({
            where: {
                code: formattedCode,
                id: {
                    [Op.ne]: id
                }
            }
        });

        if (fault) {
            throw new Error("Bu rol kodu zaten kullanımda!");
        }

        existingRole.code = formattedCode;
    }

    if (name) {
        existingRole.name = name;
    }

    if (description) {
        existingRole.description = description;
    }

    await existingRole.save();

    return existingRole;
}

export const handleDeleteRole = async (id) => {
    const existingRole = await mysqldb.Role.findByPk(id);
    if (!existingRole) {
        throw new Error("Silinecek rol bulunamadı!");
    }
    const result = await existingRole.destroy();
    return result;
}