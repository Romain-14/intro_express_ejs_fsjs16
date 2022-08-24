import mysql from 'mysql2/promise';

// on va chercher les variables d'environnement déclarées dans le fichier .env
export const {DB_HOST, DB_NAME, DB_USER, DB_PWD} = process.env;

// configuration pour se connecter à la base de données
const POOL = mysql.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    root: DB_PWD,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit:0,
});

// on est sur de la promesse donc on établi la connexion en chainant on peut avoir la bonne info et catch l'erreur
POOL.getConnection()
    .then(res => {
        console.log(`Connected to ${res.config.database}`)
    })
    .catch(err => console.log('ERROR --->',err))

export default POOL;