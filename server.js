import express from 'express';
const app = express();
//importer la librairie qui permets d'accéder aux variables d'environnement de notre appli'
import 'dotenv/config';

import {PORT} from './lib/index.js';
import POOL from './database/db.js';

// configuration du moteur de rendu ejs
// on spécifie le lieu des pages à afficher
app.set("views", "./views");
// on spécifie l'extension des fichiers utilisée pour le moteur de rendu pour éviter de les ré-écrire
app.set("view engine", "ejs");

/******************/
// __dirname et __filename disponible uniquement en commonJS et PAS en type module
// on doit de fait les créer !!
import {fileURLToPath} from "url";
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname + '/public')));
/******************/

// ROUTES 
// on chaine les méthodes (verbe get ici) sur l'instance de app pour retourner une response de "rendu" qui contiendra la page à afficher à réception de la requête envoyée par le header  
app.get("/", async (req, res, next) =>{
    // en arrivant sur la pag home( le "/" ) on effectue une requête vers la BDD
    // en utilisant cette librairie le résultat est envoyé dans un tableau multiple, on le déstructure pour avoir les données qui nous intéressent
    const [result] = await POOL.execute(`SELECT * FROM productLines`);
    console.log(result);
    // et on transmets via un objet dans notre home ce résultat
    res.render("layout", {template: "home", datas : result});
});

app.get("/blog", (req, res, next) =>{
    res.render("layout", {template: "blog"});
})

// on utilise la méthode listen sur l'instance app pour écouter et lancer notre serveur sur le port 9000
app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`);
});