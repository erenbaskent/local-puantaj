import Role from './role.model.js';
import Unit from './unit.model.js';
import User from './user.model.js';

const mysqldb = {};

mysqldb.User = User;
mysqldb.Role = Role;
mysqldb.Unit = Unit;

mysqldb.Role.hasMany(mysqldb.User, { foreignKey: 'role_code', sourceKey: 'code' });
mysqldb.User.belongsTo(mysqldb.Role, { foreignKey: 'role_code', targetKey: 'code' });

export default mysqldb;