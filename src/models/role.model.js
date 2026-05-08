import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        maxlength: 15,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

export default Role;