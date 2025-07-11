
const btnRegister = document.getElementById("btn-register");

function register() {
    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: fullName,
            correo: email,
            usuario: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario creado:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        alert("Usuario registrado con exito")
    event.preventDefault();
}


btnRegister.addEventListener('click',register);