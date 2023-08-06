// import DataTable from 'datatables.net-dt';

const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayAllCustomers(customers) {
    let tab = ``;

    customers.forEach((customer) => {
        let gender = '';
        if (customer.gender == 'F') {
            gender =
                '<div class="actions"> <p class="btn btn-sm bg-danger-light mr-2">Female</p> </div>';
        } else if (customer.gender == 'M') {
            gender =
                '<div class="actions"> <p class="btn btn-sm bg-primary-light mr-2">Male</p> </div>';
        }

        tbody.append(`
        <tr>
          <td>CUST-${customer.id}</td>
          <td>
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="../assets/img/profiles/avatar-03.jpg" alt="User Image"></a>
              <a href="profile.html">${customer.name}</a>
              </h2>
          </td>
          <td>${customer.last_name}</td>
          <td>${customer.email}</td>
          <td>${customer.principal_contact}</td>
          <td>${customer.emergency_number}</td>
          <td>
            ${gender}
          </td>
          <td class="text-right">
            <div class="dropdown dropdown-action"> <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v ellipse_color"></i></a>
              <div class="dropdown-menu dropdown-menu-right"> 
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_asset_${customer.id}"><i class="fas fa-pencil-alt m-r-5"></i> Edit</a>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset_${customer.id}"><i class="fas fa-trash-alt m-r-5"></i> Delete</a>
              </div>
            </div>

            <div id="delete_asset_${customer.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center"> <img src="../assets/img/sent.png" alt="" width="50" height="46">
                      <h3 class="delete_class">Are you sure want to delete this Customer</h3>
                      <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
              
            <div id="edit_asset_${customer.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered modal-lg h-100">
                <div class="modal-content">
                    <div class="modal-body text-center h-100">
                      <form class="w-100" onSubmit={updateCustomer()} >
                        <h3 class="">Edit Customer</h3>
                        <div class="row formtype">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer_name">First Name</label>
                                    <input class="form-control" id="customer_name" value=${customer.name} type="text">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer_last_name">Last Name</label>
                                    <input type="text" class="form-control" id="customer_last_name" value=${customer.last_name} name="sellist1">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="gender">Gender</label>
                                    <select class="form-control" id="gender" value=${customer.gender} name="sellist1">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="principal_contact">Principal contact</label>
                                    <input type="text" class="form-control" id="principal_contact" value=${customer.principal_contact} name="sellist1">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="emergency_contact">Emergency contact</label>
                                    <input type="text" id="emergency_contact" value=${customer.emergency_number} class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="cin">CIN</label>
                                    <input type="text" class="form-control" value=${customer.cin} id="cin">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" id="address" value=${customer.address} class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" value=${customer.email} id="email">
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
    })

    $(document).ready(function () {
        $('#myTable').DataTable();
    });
}

fetch(`${URL}/customers`)
    .then((res) => res.json())
    .then((data) => {
        displayAllCustomers(data);
    });

function updateCustomer() {
    alert('Edit Customer Send !');
}
