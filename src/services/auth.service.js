import { Op } from "sequelize";
import User from "../models/user.model.js";
import { verifyLdapCredentials } from "./ldap.service.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const createUser = async (userData, roleCode) => {
    if (!Array.isArray(userData) || userData.length === 0) {
        throw new Error("Personel listesi boş");
    }

    const effectiveRole = roleCode ?? "USER";
    const created = [];
    const skipped = [];

    for (const row of userData) {
        const { identity_number, psnno, full_name, username, email, title, unit } = row;

        const existingUser = await User.findOne({
            where: { username, email, psnno },
        });

        if (existingUser) {
            skipped.push({ username, email, psnno, reason: "already_exists" });
            continue;
        }

        const user = await User.create({
            identity_number,
            psnno,
            full_name,
            username,
            email,
            role_code: effectiveRole,
            title,
            unit,
        });

        created.push(user);
    }

    return {
        created,
        skipped,
        counts: { created: created.length, skipped: skipped.length },
    };
};

export const handleLogin = async (email, password) => {
    const username = email.includes("@") ? email.split("@")[0] : email;
    const existingUser = await User.findOne({
        where: {
            status: true,
            [Op.or]: [
                { username: username },
                { email: username }
            ]
        }
    })
    if (!existingUser) throw new Error("NOT_FOUND");
    const isLdapValid = await verifyLdapCredentials(username, password);
    if (!isLdapValid) throw new Error("INVALID_CREDENTIALS");

    await existingUser.update({
        last_login: new Date(),
        login_count: existingUser.login_count + 1
    })

    const expiresIn = "8h";

    const token = jwt.sign(
        { id: existingUser?.id, username, role: existingUser.role_code },
        process.env.JWT_SECRET,
        { expiresIn }
    )

    return {
        token,
        expiresIn,
        user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            full_name: existingUser.full_name,
            role_code: existingUser.role_code,
            role: existingUser.role
                ? { code: existingUser.role.code, name: existingUser.role.name }
                : null,
        },
    };
}

export const handleLogout = async (id) => {
    await User.update({
        last_logout: new Date()
    }, { where: { id: id } })
}