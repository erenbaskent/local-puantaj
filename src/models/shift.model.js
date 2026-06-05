import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const Shift = sequelize.define("Shift", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        maxlength: 15,
        unique: true
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '#fff'
    }
}, {
    timestamps: true
});

export default Shift;