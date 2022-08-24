import express from 'express';
const app = express();

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
// on chaine les méthodes (verbe get ici) sur l'instance de app pour retourner une response de "rendu" qui contiendra la page à afficher à réception de la request enovyé par le header  
app.get("/", (req, res, next) =>{
    res.render("layout", {template: "home", data : "jako"});
});

app.get("/blog", (req, res, next) =>{
    res.render("layout", {template: "blog"});
})

app.listen(9000, ()=>{
    console.log(`Listening at http://localhost:9000`);
})