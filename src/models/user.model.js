import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const User = sequelize.define("User", {
    psnno: {
        type: DataTypes.STRING,
        maxlength: 7,
        allowNull: false
    },
    identity_number: {
        type: DataTypes.STRING,
        maxlength: 11,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_code: {
        type: DataTypes.STRING,
        maxlength: 15,
        allowNull: false,
        defaultValue: "USER",
        references: {
            model: 'Roles',
            key: 'code'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    login_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    last_logout: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
});

export default User;