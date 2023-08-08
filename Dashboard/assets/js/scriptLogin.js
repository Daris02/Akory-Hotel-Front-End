const URL = `http://localhost:8000`;

let status;

const loginForm = document.getElementById("loginForm");
const welcomeMessageElement = document.getElementById("welcomingMessage");
const user_profile = document.getElementById("user_profile");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user_email = document.getElementById("user_email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${URL}/login`, {
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
            window.location.replace('../index.html');
            welcomeMessageElement.innerText = `Welcome ${data.first_name} ${data.last_name} !`;
            user_profile.innerText = `${data.first_name} ${data.last_name}`;
        }
    } catch (error) {
        console.error(error);
    }
});

// "john.doe@gmail.com"
// "password1"
