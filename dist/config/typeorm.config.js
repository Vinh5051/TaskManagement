"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 6969,
    username: 'postgres',
    password: 'root',
    database: 'nestjsManagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map