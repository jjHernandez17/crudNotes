
const btnSignOut = document.getElementById("signOut");

const userLogued = JSON.parse(localStorage.getItem("usuarioLogueado"));
userLogued.notes.forEach(u => {
    document.getElementById("noteSaved").innerHTML += `<div class="col-md-3">
                                                            <div class="d-flex flex-column note-card gap-2">
                                                                <h6 class="fw-bold">${u.titulo}</h6>
                                                                <p class="person-scroll text-muted small mb-2 text-break">${u.contenido}</p>
                                                                <div class="d-flex justify-content-between mt-auto">
                                                                    <button class="btn btn-outline-danger btn-sm w-45">
                                                                        <i class="bi bi-trash"></i> Eliminar
                                                                    </button>
                                                                    <button class="btn btn-outline-success btn-sm w-45">
                                                                        <i class="bi bi-share"></i> Compartir
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



