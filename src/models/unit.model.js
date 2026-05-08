import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const Unit = sequelize.define("Unit", {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true
});

export default Unit;