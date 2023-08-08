const URL = `http://localhost:8000`;

let status;

function login() {
    let email = document.getElementById(`user_email`).value;
    let pwd = document.getElementById(`password`).value;

    fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_email: email,
            password: pwd
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            alert('KO 👎')
        } else if(data.token) {
            alert('OK 👍')
            window.location = '../index.html';
        }
    });
}

// "john.doe@gmail.com"
// "password1"