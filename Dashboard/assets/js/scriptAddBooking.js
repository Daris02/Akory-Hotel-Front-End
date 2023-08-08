const addBooking = document.getElementById("addBooking")

addBooking.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user_email = document.getElementById("user_email").value;
    const password = document.getElementById("password").value;

    // try {
    //     const response = await fetch(`http://localhost:8000/reservation`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //                 date_arrived: "2023-10-01 13:30:00",
    //                 leaving_date: "2023-10-02 06:00:00",
    //                 number_of_person: 3,
    //                 is_cancelled: false,
    //                 id_customer: 34,
    //                 id_room: 111
    //         }),
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // } catch (error) {
    //     console.error(error);
    // }
});