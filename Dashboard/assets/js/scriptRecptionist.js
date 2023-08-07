const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayAllReceptionists(receptionists) {
  let tab = ``;

  receptionists.forEach((receptionist) => {
    tbody.append(`
        <tr>
          <td>${receptionist.id}</td>
          <td>
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="../assets/img/profiles/avatar-03.jpg" alt="User Image"></a>
              <a href="profile.html">${receptionist.first_name} ${receptionist.last_name}</a>
              </h2>
          </td>
          <td>${receptionist.email}</td>
          <td>${receptionist.work_contact}</td>
          <td>${receptionist.name}</td>
          <td class="text-right">
            <div class="dropdown dropdown-action"> <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v ellipse_color"></i></a>
              <div class="dropdown-menu dropdown-menu-right"> 
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_asset_${receptionist.id}"><i class="fas fa-pencil-alt m-r-5"></i> Edit</a>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset_${receptionist.id}"><i class="fas fa-trash-alt m-r-5"></i> Delete</a>
              </div>
            </div>

            <div id="delete_asset_${receptionist.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center"> <img src="../assets/img/sent.png" alt="" width="50" height="46">
                      <h3 class="delete_class">Are you sure want to delete this receptionist</h3>
                      <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
              
            <div id="edit_asset_${receptionist.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered modal-lg h-100">
                <div class="modal-content">
                    <div class="modal-body text-center h-100">
                      <form class="w-100" onSubmit={updateReceptionist(${receptionist.id})} >
                        <h3 class="">Edit Receptionist</h3>
                        <div class="row formtype">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="first_name_${receptionist.id}">First Name</label>
                                    <input class="form-control" id="first_name_${receptionist.id}" type="text">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="last_name_${receptionist.id}">Last Name</label>
                                    <input type="text" class="form-control" id="last_name_${receptionist.id}" name="sellist1">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="work_contact_${receptionist.id}">Work contact</label>
                                    <input type="text" class="form-control" id="work_contact_${receptionist.id}" name="sellist1">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="email_${receptionist.id}">Email</label>
                                    <input type="text" class="form-control" id="email_${receptionist.id}">
                                </div>
                            </div>
                        </div>
                        <div class="m-t-20 d-flex justify-content-around">
                            <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                            <button type="submit" class="btn btn-warning">Edit</button>
                        </div>
                      </form>
                      
                    </div>
                </div>
              </div>
            </div>

          </td>
        </tr>
        `);
  });

  $(document).ready(function () {
    $("#myTable").DataTable();
  });
}

fetch(`${URL}/ReceptionistsListInWhichHotel`)
  .then((res) => res.json())
  .then((data) => displayAllReceptionists(data));

function updateReceptionist(id) {
  fetch(`${URL}/receptionist/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: document.getElementById(`first_name_${id}`).value,
      last_name: document.getElementById(`last_name_${id}`).value,
      work_contact: document.getElementById(`work_contact_${id}`).value,
      email: document.getElementById(`email_${id}`).value
    }),
  }).then((res) => res);
}
