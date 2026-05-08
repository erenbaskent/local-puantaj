import Unit from "../models/unit.model.js";
import { getOracleUserData } from "../services/user.service.js";
import { createUser, handleLogin, handleLogout } from "../services/auth.service.js";

export const register = async (req, res, next) => {
    const { unitCode, roleCode } = req.body;
    if (!unitCode) {
        return res.status(400).json({ ok: false, message: "Birim kodu gereklidir!" });
    }
    try {
        const unit = await Unit.findOne({ where: { code: unitCode } });
        if (!unit) {
            return res.status(404).json({ ok: false, message: "Birim bulunamadı!" });
        }
        const usersData = await getOracleUserData(unitCode);
        const users = await createUser(usersData, roleCode);
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'E-Posta ve şifre alanları boş bırakılamaz!' });
    }

    try {
        const result = await handleLogin(email, password);

        return res.status(200).json({
            success: true,
            ...result
        })
    } catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: "Hatalı e-posta veya şifre." });
        }

        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: "Böyle bir kullanıcı yok." })
        }

        return res.status(500).json({ message: "Sunucu hatası: " + error.message });
    }
}

export const logout = async (req, res, next) => {
    try {
        await handleLogout(req.user.id);
        return res.status(200).json({
            ok: true,
            message: "Çıkış başarılı."
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: error.message });
    }
}