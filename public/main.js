function charger() {
    const appreciation = document.getElementById("appreciation").value;

    fetch("/etudiants?appreciation=" + appreciation, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {

            const liste = document.getElementById("liste");
            liste.innerHTML = "";

            for (let i = 0; i < data.length; i++) {
                const etudiant = data[i];

                const li = document.createElement("li");
                li.textContent =
                    etudiant.nom + " " +
                    etudiant.prenom + " - Note : " +
                    etudiant.note + " - appreciation : " +
                    etudiant["appreciation"];

                liste.appendChild(li);
            }
        });
}

function ajouter() {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const note = document.getElementById("note").value;
    const appreciation = document.getElementById("appreciation").value;

    fetch("/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            note: note,
            appreciation: appreciation
        })
    })
        .then(response => response.json())

        .then(result => {
            document.getElementById("message").textContent = result.message;
        });
}

function modifier() {
    const id = document.getElementById("update_id").value;
    const nom = document.getElementById("update_nom").value;
    const prenom = document.getElementById("update_prenom").value;
    const email = document.getElementById("update_email").value;
    const note = document.getElementById("update_note").value;
    const appreciation = document.getElementById("update_appreciation").value;

    fetch("/update_etudiant", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
            nom: nom,
            prenom: prenom,
            email: email,
            note: note,
            appreciation: appreciation
        })
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("messageUpdate").textContent = result.message;
    });
}

function supprimer() {
    const id = document.getElementById("delete_id").value;

    fetch("/delete_etudiant", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
    })

    .then(response => response.json())
    .then(result => {
        document.getElementById("messageDelete").textContent = result.message;
    });
}