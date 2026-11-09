
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;

        let users = JSON.parse(localStorage.getItem("booknestUsers")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("An account with this email already exists.");
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("booknestUsers", JSON.stringify(users));

        alert("Registration successful! Please login.");

        window.location.href = "login.html";
    });
}

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("booknestUsers")) || [];

        const user = users.find(
            item => item.email === email && item.password === password
        );

        if (user) {

            localStorage.setItem("booknestCurrentUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            alert("Login successful!");

            window.location.href = "index.html";

        } else {
            alert("Invalid email or password.");
        }
    });
}
