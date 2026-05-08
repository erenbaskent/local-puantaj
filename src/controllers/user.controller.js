import { getOracleUserData, getUserService, getUsersService } from "../services/user.service.js";

export const getOracleUsers = async (req, res, next) => {
    try {
        const users = await getOracleUserData("001.01.01.10");
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
        if(!id) {
            return res.status(400).json({ ok: false, message: "Kullanıcı ID gereklidir!" });
        }
        const user = await getUserService(id);
        return res.status(200).json({ data: user });
    } catch(error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message })

    }
}