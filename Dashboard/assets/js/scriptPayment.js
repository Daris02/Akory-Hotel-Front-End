const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayPayents(payments) {
  let tab = ``;

  payments.forEach((payment) => {
    let payment_method = payment.name;
    let occupation = payment.lending_status;

    if (payment_method == "mobile money") {
        payment_method = `<div class="actions"> <h1 class="btn btn-sm bg-warning-light mr-2">MOBILE MONEY</h1> </div>`;
    } else if (payment_method == "cash") {
        payment_method = `<div class="actions"> <h1 class="btn btn-sm bg-success-light mr-2">CASH</h1> </div>`;
    } else if (payment_method == "credit card") {
        payment_method = `<div class="actions"> <h1 class="btn btn-sm bg-primary-light mr-2">CREDIT CARD</h1> </div>`;
    }

    if (occupation) {
        occupation = `<div class="actions"> <h1 class="btn btn-sm bg-success-light mr-2">OCCUPED</h1> </div>`;
    } else {
        occupation = `<div class="actions"> <h1 class="btn btn-sm bg-danger-light mr-2">QUIT</h1> </div>`;
    }

    tbody.append(`
        <tr>
            <td class="text-left" ><a href="invoice-view.html">#INV-${payment.id}</a></td>
            <td>${payment.first_name} ${payment.last_name}</td>
            <td>${payment.room_occuped}</td>
            <td>${payment_method}</td>
            <td>${payment.payment_date.split("").slice(0, 10).join("")}</td>
            <td>${payment.deadline_payment.split("").slice(0, 10).join("")}</td>
            <td>${occupation}</td>
            <td>$ ${payment.amount_paid}</td>
        </tr>
    `);
  });

  $(document).ready(function () {
    $("#myTable").DataTable();
  });
}

fetch(`${URL}/AllPayments`)
  .then((res) => res.json())
  .then((data) => displayPayents(data));
