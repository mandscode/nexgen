// src/types/env.d.ts
declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        DB_HOST: string;
        DB_NAME: string;
        DB_USER: string;
        DB_PASS: string;
        DB_PORT?: string;
    }
}