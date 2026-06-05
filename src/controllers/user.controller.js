import mysqldb from "../models/index.js";
import { getOracleUserData, getUserService, getUsersService, handleChangeRole, handleChangeUserStatus } from "../services/user.service.js";

export const getOracleUsers = async (req, res, next) => {
    const { unitCode } = req.params;
    try {
        if (!unitCode) {
            return res.status(400).json({ ok: false, message: "Birim kodu gereklidir!" });
        }
        const users = await getOracleUserData(unitCode);
        return res.status(200).json({ data: users })
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message })
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService();
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message })
    }
}

export const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ ok: false, message: "Kullanıcı ID gereklidir!" });
        }
        const user = await getUserService(id);
        return res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message })

    }
}

export const changeUserRole = async (req, res, next) => {
    const { id } = req.params;
    const { roleCode } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ ok: false, message: "Kullanıcı bilgisi gereklidir!" });
        }
        if (!roleCode) {
            return res.status(400).json({ ok: false, message: "Rol kodu gereklidir!" });
        }
        const result = await handleChangeRole(id, roleCode);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message })
    }
}

export const changeUserStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ ok: false, message: "Kullanıcı bilgisi gereklidir!" });
        }
        const result = await handleChangeUserStatus(id, status);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}