"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const customers_module_1 = require("./customers/customers.module");
const fs = require("fs");
const isLocal = process.env.NODE_ENV !== 'production';
let localConfig = {};
if (isLocal && fs.existsSync('config.local.json')) {
    localConfig = JSON.parse(fs.readFileSync('config.local.json', 'utf-8'));
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST || localConfig.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT) || localConfig.DATABASE_PORT,
                username: process.env.DATABASE_USER || localConfig.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD || localConfig.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME || localConfig.DATABASE_NAME,
                autoLoadEntities: true,
                synchronize: false,
                ssl: {
                    rejectUnauthorized: false,
                },
                logging: true,
            }),
            customers_module_1.CustomersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map