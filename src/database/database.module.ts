import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class DatabaseModule {
    static forRootAsync() {
        return MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
                const host = configService.get<string>('DB_HOST');
                const username = configService.get<string>('DB_USERNAME');
                const password = configService.get<string>('DB_PASSWORD');
                const port = configService.get<string>('DB_PORT');
                const db = configService.get<string>('DB_DATABASE');
                return {
                    uri: `mongodb://${username}:${password}@${host}:${port}/${db}`,
                    autoIndex: true,
                    autoCreate: true,
                };
            }
        });
    }
}