
const btnSignOut = document.getElementById("signOut");

const userLogued = JSON.parse(localStorage.getItem("usuarioLogueado"));
userLogued.notes.forEach((nota, index) => {
    document.getElementById("noteSaved").innerHTML += `<div class="col-md-3">
            <div class="d-flex flex-column note-card gap-2">
                <h6 class="fw-bold">${nota.titulo}</h6>
                <p class="person-scroll text-muted small mb-2 text-break">${nota.contenido}</p>
                <div class="d-flex justify-content-between mt-auto">
                    <button data-index ="${index}" class="btn-delete btn btn-outline-danger btn-sm w-45">
                        Eliminar
                    </button>
                    <button class="btn btn-outline-success btn-sm w-45">
                        Compartir
                    </button>
                </div>
            </div>
        </div>`

});





function signOut() {
    localStorage.setItem("auth", "false");
    guardianSignOut()
}

btnSignOut.addEventListener('click', signOut);

document.addEventListener("DOMContentLoaded", function () {

    const userLoged = JSON.parse(localStorage.getItem("usuarioLogueado"));
    document.getElementById("greetingContainer").innerText += " " + userLoged.nombre;


});


function closeWindow() {
    document.getElementById("miModal").style.display = "none";
}

function openWindow() {
    document.getElementById("miModal").style.display = "flex";
}

const btnOpenAddNote = document.getElementById("btnOpenAddNote")
const btnSaveNote = document.getElementById("btnSaveNote");
const btnCloseWindow = document.getElementById("btnCloseWindow");
const btnCancel = document.getElementById("btnCancel");

btnCloseWindow.addEventListener('click', closeWindow);
btnOpenAddNote.addEventListener('click', openWindow);
btnCancel.addEventListener('click', closeWindow);






function saveNote() {

    tittleNote = document.getElementById("noteTitle").value;
    noteContent = document.getElementById("noteContent").value;

    document.getElementById("noteSaved").innerHTML += `<div class="col-md-3">
                <div class="note-card">
                    <h6 class="fw-bold">${tittleNote}</h6>
                    <p class="text-muted small mb-0">${noteContent}</p>
                </div>
            </div>`
    const userLogued = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const idUser = userLogued.id
    const newNote = {
        titulo: tittleNote,
        contenido: noteContent
    };

    fetch(`http://localhost:3000/users/${idUser}`)
        .then(res => res.json())
        .then(usuario => {
            // 4. Agregar la nueva nota al array
            const nuevasNotas = [...usuario.notes, newNote];

            // 5. Actualizar el usuario con PATCH
            return fetch(`http://localhost:3000/users/${idUser}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ notes: nuevasNotas })
            });
        })
        .then(res => res.json())
        .then(data => {
            console.log("Nota agregada con éxito:", data);
        })
        .catch(error => {
            console.error("Error al agregar nota:", error);
        });

    userLogued.notes.push(newNote);

    localStorage.setItem("usuarioLogueado", JSON.stringify(userLogued));

    closeWindow();
    
}
btnSaveNote.addEventListener('click', saveNote);

const btnDeleteNote = document.getElementById("btnDeleteNote");


const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
document.addEventListener("click", function (e) {

    if (e.target.matches(".btn-delete")) {
        
        let verDelete = prompt("Seguro que quieres eliminar esta nota? (si/no)")
    if (verDelete == "si") {

        const index = parseInt(e.target.getAttribute("data-index"));
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
        const idUser = usuarioLogueado.id;
        usuarioLogueado.notes.splice(index, 1);
        fetch(`http://localhost:3000/users/${idUser}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes: usuarioLogueado.notes })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
            e.target.closest(".col-md-3").remove();
        })
        .catch(err => console.error("Error al eliminar nota:", err));
    }
    else {

    }
    }
    }
);



