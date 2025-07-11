const btnSignOut = document.getElementById("signOut");

function signOut() {
    localStorage.setItem("auth","false");
    guardianSignOut()
}

btnSignOut.addEventListener('click', signOut);

document.addEventListener("DOMContentLoaded", function () {
     
    const userLoged = JSON.parse(localStorage.getItem("usuarioLogueado"));
    document.getElementById("greetingContainer").innerText+=" " + userLoged.nombre;
    
    
});

function showWindow() {
    document.getElementById("miModal").style.display = "flex";
}

function closeWindow() {
    document.getElementById("miModal").style.display = "none";
}


const btnSaveNote = document.getElementById("btnSaveNote");
const closeWindow = document.getElementById("closeWindow");

closeWindow.addEventListener('click',closeWindow );



function saveNote()  {
    
    tittleNote = document.getElementById("noteTitle").value;
    noteContent = document.getElementById("noteContent").value;
    document.getElementById("noteSaved").innerHTML += `<div class="col-md-3">
                <div class="note-card">
                    <h6 class="fw-bold">${tittleNote}</h6>
                    <p class="text-muted small mb-0">${noteContent}</p>
                </div>
            </div>`
    
    


}

btnSaveNote.addEventListener('click', saveNote);



