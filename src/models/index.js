import Monthly_Schedules from './monthly_schedules.model.js';
import Role from './role.model.js';
import Shift from './shift.model.js';
import Unit from './unit.model.js';
import User from './user.model.js';

const mysqldb = {};

mysqldb.User = User;
mysqldb.Role = Role;
mysqldb.Unit = Unit;
mysqldb.Shift = Shift;
mysqldb.Monthly_Schedules = Monthly_Schedules;

mysqldb.Role.hasMany(mysqldb.User, { foreignKey: 'role_code', sourceKey: 'code' });
mysqldb.User.belongsTo(mysqldb.Role, { foreignKey: 'role_code', targetKey: 'code' });

mysqldb.Shift.hasMany(mysqldb.Monthly_Schedules, { foreignKey: 'shift_code', sourceKey: 'code' });
mysqldb.Monthly_Schedules.belongsTo(mysqldb.Shift, { foreignKey: 'shift_code', targetKey: 'code' });
mysqldb.User.hasMany(mysqldb.Monthly_Schedules, { foreignKey: 'userId' });
mysqldb.Monthly_Schedules.belongsTo(mysqldb.User, { foreignKey: 'userId' });

export default mysqldb;