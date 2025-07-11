
const loginBtn = document.getElementById("btnSignIn");

loginBtn.addEventListener('click', function (e) {
    e.preventDefault(); 

    const identifier = document.getElementById("EmailOrUsername").value.trim();
    const password = document.getElementById("password").value.trim();


    if (!identifier || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    
    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {
            const user = users.find(u =>
                (u.usuario === identifier || u.correo === identifier) &&
                u.password === password
            );

            

            if (user) {
                document.getElementById("EmailOrUsername").classList.add("is-valid");
                document.getElementById("password").classList.add("is-valid");
                setTimeout(() => {
                console.log("Sesión iniciada:", user);
                localStorage.setItem("usuarioLogueado", JSON.stringify(user));
                localStorage.setItem("auth", "true");
                window.location.href = "home.html";
                }, 700);
            } else {
                document.getElementById("EmailOrUsername").classList.add("is-invalid");
                document.getElementById("password").classList.add("is-invalid");
                
            }
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            alert("Error en el servidor. Intenta más tarde.");
        });
});

