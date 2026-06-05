import { findAll } from "../db/database.js"
import mysqldb from "../models/index.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import { getUserEmails } from "./externalApiKey.service.js";

export const getOracleUserData = async (unitCode) => {
    const existUnitCode = await mysqldb.Unit.findOne({ where: { code: unitCode } });
    if (existUnitCode) {
        throw new Error("Birim bulunamadı!");
    }
    const personnels = await findAll("SELECT * FROM baskent_personel_jguar where GOREV_YER_KODU = :unitCode and CALISIYOR_AYRILDI = 1", { unitCode: unitCode });
    if (personnels.length <= 0) {
        throw new Error("Hiç personel bulunamadı!");
    }

    const formattedPersonnels = personnels.map((p) => ({
        username: "",
        full_name: p.OZL_AD + " " + p.OZL_SOYAD,
        email: "",
        title: p.UNVAN_ACIKLAMA,
        unit: p.GOREV_YER_ACIKLAMA,
        identity_number: p.OZL_TCKIMLIK_NO,
        psnno: p.OZL_PSN.padStart(7, "0")
    }));
    const emails = await getUserEmails(null, formattedPersonnels);

    const emailById = new Map(
        emails.map((e) => [String(e.id), e.email])
    );

    const result = formattedPersonnels.map((person) => ({
        ...person,
        email: emailById.get(String(person.identity_number)) ?? person.email,
        username: emailById.get(String(person.identity_number)).split("@")[0] ?? person.username,
    }))
    return result;
}

export const getUsersService = async () => {
    const users = await User.findAll();
    if (!users || users.length <= 0) {
        throw new Error("Hiç personel bulunamadı!");
    }
    return users;
}

export const getUserService = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error("Personel bulunamadı!");
    }
    return user;
}

export const handleChangeRole = async (id, roleCode) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new Error("Kullanıcı bulunamadı!");
    }
    const existingRole = await Role.findOne({ where: { code: roleCode } });
    if (!existingRole) {
        throw new Error("Rol bulunamadı!");
    }
    existingUser.role_code = roleCode;
    await existingUser.save();
    return existingUser;
}

export const handleChangeUserStatus = async (id, status) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new Error("Kullanıcı bulunamadı!");
    }
    if (status == existingUser.status) throw new Error(`Kullanıcınnın statüsü zaten ${status == 1 ? "Aktif" : "Pasif"}`);
    existingUser.status = status;
    await existingUser.save();
    return existingUser;
}