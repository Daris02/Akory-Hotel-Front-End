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
    }).then((res) => {
        if(res.status == 401) {
            alert('KO 👎');           
        } else if(res.ok) {
            alert('OK 👍');
        }
        return res;
    });
}

// window.location = '../index.html';