const isProduction = true;

export const config = {
    HOST: isProduction ? 'paltek.live': 'localhost',
    CLIENT_PORT: isProduction? 80: 3000,
    MYSQL_HOST: 'paltek.live'
}