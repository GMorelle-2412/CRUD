/*Module*/
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

/* Middleware*/
app.use(express.static('public'));
app.use(express.json());

/* Port */
const port = process.env.PORT;

/*Connexion BDD MySQL*/
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Test connexion BDD
db.connect((err) => {
    if (err) {
        console.log("Erreur connexion MySQL :", err);
    } else {
        console.log("Connecté à MySQL");
    }
});

/*Route*/
//Route principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

/*SELECT*/
app.get("/etudiants", (req, res) => {
    const appreciation = req.query.appreciation;

    const sql = "SELECT * FROM etudiants WHERE note > 15 AND appreciation = ?";

    db.query(sql, [appreciation], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

/*INSERT*/
app.post("/create", (req, res) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const note = req.body.note;
    const appreciation = req.body.appreciation; // attention à l'accent

    const sql = "INSERT INTO etudiants (nom, prenom, email, note, `appreciation`) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nom, prenom, email, note, appreciation], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: "Étudiant ajouté !" });
    });
});

/*UPDATE*/
app.put("/update_etudiant", (req, res) => {

    const id = req.body.id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const note = req.body.note;
    const appreciation = req.body.appreciation; // ← ACCENT OBLIGATOIRE

    const sql = "UPDATE etudiants SET nom = ?, prenom = ?, email = ?, note = ?, `appreciation` = ? WHERE id = ?";

    db.query(sql, [nom, prenom, email, note, appreciation, id], function(err, result) {
        if (err) {
            console.log(err); // ← montre l’erreur SQL exacte
            return res.status(500).json({ error: err });
        }
        res.json({ message: "Étudiant mis à jour !" });
    });
});

/* DELETE */
app.delete("/delete_etudiant", (req, res) => {
    const id = req.body.id;

    const sql = "DELETE FROM etudiants WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Étudiant supprimé !" });
    });
});

/* Lancement */
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});