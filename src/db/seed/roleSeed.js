import Role from "../../models/role.model.js";

export const createRoleSeed = async () => {
    const names = [{name: "Admin", description: "Admin role", code: "ADMIN"}, {name: "User", description: "User role", code: "USER"}, {name: "Super_Admin", description: "Super Admin role", code: "SUPER_ADMIN"}];
    try {
        const roles = await Role.findAll();
        if (roles.length > 0) {
            return;
        }
        const roleData = names.map(name => ({ name: name.name, description: name.description, code: name.code }));
        await Role.bulkCreate(roleData);
        console.log("Role seed eklendi. Oluşturulan role isimleri: " + names.join(", "));
    } catch(error) {
        console.error(error);
        throw error;
    }
}