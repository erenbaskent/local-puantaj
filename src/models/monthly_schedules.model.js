import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const Monthly_Schedules = sequelize.define("Monthly_Schedules", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    work_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    shift_code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Shifts",
            key: "code"
        }
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: true, indexes: [
        {
            unique: true,
            fields: ['userId', 'work_date'],
            name: 'unique_user_daily_schedule'
        },
        {
            fields: ['work_date'],
            name: 'idx_work_date'
        }
    ]
})

export default Monthly_Schedules;