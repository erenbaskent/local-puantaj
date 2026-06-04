import { handleCreateRole, handleDeleteRole, handleGetRoles, handleUpdateRole } from "../services/role.service.js";

export const createRole = async (req, res, next) => {
    const { name, code, description } = req.body;
    try {
        if (!name || !code) {
            return res.status(400).json({ ok: false, message: "Rol ismi ve rol kodunu boş bırakmadığınızdan emin olun!" });
        }
        const result = await handleCreateRole({ name, code, description });
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const getRoles = async (req, res, next) => {
    try {
        const result = await handleGetRoles();
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const updateRole = async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
        if (!id) return res.status(400).json({ ok: false, message: "Güncellemek istediğiniz rolü belirtmelisiniz!" });
        const result = await handleUpdateRole(id, data);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const deleteRole = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!id) return res.status(400).json({ ok: false, message: "Silmek istediğiniz rolü belirtmelisiniz!" });
        const result = await handleDeleteRole(id);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
}