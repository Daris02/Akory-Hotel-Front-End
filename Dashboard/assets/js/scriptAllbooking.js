// import DataTable from 'datatables.net-dt';

const URL = "http://localhost:8000";

const tbody = $("#tbody");

async function displayAllBooking(bookings) {
  let tab = ``;

  await bookings.forEach((booking) => {
      tab += `
        <tr>
          <td>BKG-${booking.id}</td>
          <td>
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="../assets/img/profiles/avatar-03.jpg" alt="User Image"></a>
              <a href="profile.html">${booking.customer_firstname} ${booking.customer_lastname}<span>#${booking.id_customer}</span></a>
              </h2>
          </td>
          <td>${booking.room_type}</td>
          <td>${booking.number_of_person}</td>
          <td>${booking.date_arrived.split('').slice(0, 10).join('')}</td>
          <td>${booking.leaving_date.split('').slice(0, 10).join('')}</td>
          <td>${booking.email}</td>
          <td>${booking.principal_contact}</td>
          <td>
            <div class="actions"> <a href="#" class="btn btn-sm bg-success-light mr-2">Active</a> </div>
          </td>
          <td class="text-right">
            <div class="dropdown dropdown-action"> <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v ellipse_color"></i></a>
              <div class="dropdown-menu dropdown-menu-right"> <a class="dropdown-item" href="edit-booking.html"><i class="fas fa-pencil-alt m-r-5"></i> Edit</a> <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset"><i class="fas fa-trash-alt m-r-5"></i> Delete</a> </div>
            </div>
          </td>
        </tr>
        `;
    })

    tbody.innerHTML = tab;
    $(document).ready(function () {
      $('#myTable').DataTable();
    })
}

fetch(`${URL}/ReservationsWithCustomerInfo`)
  .then((res) => res.json())
  .then((data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    displayAllBooking(data);
  });
