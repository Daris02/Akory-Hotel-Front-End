let status;

const loginForm = document.getElementById("loginForm");
const welcomeMessageElement = document.getElementById("welcomingMessage");
const user_profile = document.getElementById("user_profile");
const messageElement = document.getElementById("message");

let welcome;
let user;

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user_email = document.getElementById("user_email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_email: user_email,
                password: password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            welcome = `Welcome ${data.first_name} ${data.last_name} !`;
            user = `${data.first_name} ${data.last_name}`;
            window.location.replace('../index.html');
        } else {
            messageElement.textContent = "Authification Failed!";
            setTimeout(() => {
                messageElement.textContent = null;
            }, 1500);
        }
    } catch (error) {
        console.error(error);
    }
});

// welcomeMessageElement.innerText = welcome;
// user_profile.innerText = user;

console.log(welcome);
console.log(welcome);