function guardianSignOut() {
let authenticated = localStorage.getItem("auth")

if (authenticated != "true") {
    window.location = "index.html"
} 
}