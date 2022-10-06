import { DatabaseType } from "typeorm";

export interface DatabaseConnectionOptions {
    type: DatabaseType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities?: Array<Function | string>;
    synchronize?: boolean;
    logging?: boolean;
    logger?: 'advanced-console' | 'simple-console' | 'file' | 'debug';
    extra?: {
        connectionLimit?: number;
    };
}