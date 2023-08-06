const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayAllRooms(rooms) {
    let tab = ``;

    rooms.forEach((room) => {
        let type = '';
        if (room.room_type == 'solo') {
            type = '<div class="actions"> <h1 class="btn btn-sm bg-primary-light mr-2">SOLO</h1> </div>';
        } else if (room.room_type == 'twin') {
            type = '<div class="actions"> <h1 class="btn btn-sm bg-warning-light mr-2">TWIN</h1> </div>';
        } else if (room.room_type == 'family') {
            type = '<div class="actions"> <h1 class="btn btn-sm bg-success-light mr-2">FAMILY</h1> </div>';
        } else if (room.room_type == 'VIP') {
            type = '<div class="actions"> <h1 class="btn btn-sm bg-danger-light mr-2">VIP</h1> </div>';
        }

        let status = '<div class="actions"> <p class="btn btn-sm bg-secondary mr-2">Occuped OR Available</p> </div>';

        tbody.append(`
        <tr>
          <td><h2>${room.number}</h2></td>
          <td>
            ${type}
          </td>
          <td>
            <h5>${room.capacity_room}</h5>
          </td>
          <td>
            ${status}
          </td>
          <td class="text-right">
            <div class="dropdown dropdown-action"> <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v ellipse_color"></i></a>
              <div class="dropdown-menu dropdown-menu-right"> 
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_asset_${room.id}"><i class="fas fa-pencil-alt m-r-5"></i> Edit</a>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset_${room.id}"><i class="fas fa-trash-alt m-r-5"></i> Delete</a>
              </div>
            </div>

            <div id="delete_asset_${room.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center"> <img src="../assets/img/sent.png" alt="" width="50" height="46">
                      <h3 class="delete_class">Are you sure want to delete this room</h3>
                      <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
              
            <div id="edit_asset_${room.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered modal-lg h-100">
                <div class="modal-content">
                    <div class="modal-body text-center">
                      <form class="w-100" onSubmit={updateRoom()} >
                        <h3 class="">Edit Customer</h3>
                        <div class="row formtype">
                            <div class="col-md-4">
                                <div class="form-group"><label for="number">Room Number</label>
                                    <input class="form-control" type="text" id="number">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="sel1">Room Type</label>
                                    <select class="form-control" id="sel1" name="sellist1">
                                        <option>Select</option>
                                        <option>Single</option>
                                        <option>Double</option>
                                        <option>Quad</option>
                                        <option>King</option>
                                        <option>Suite</option>
                                        <option>Villa</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="sel2">Room capacity</label>
                                    <input type="number" class="form-control" id="sel2" name="sellist1">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="price">ID price</label>
                                    <input type="text" id="price" class="form-control" id="usr">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="features">Room Features ID</label>
                                    <input type="text" id="features" class="form-control" id="usr1">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customFile">Hotel ID</label>
                                    <div class="custom-file mb-3">
                                        <input type="number" class="form-control" id="customFile" name="filename">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="comment">Message</label>
                                    <textarea class="form-control" rows="5" id="comment" name="text"></textarea>
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

fetch(`${URL}/rooms`)
    .then((res) => res.json())
    .then((data) => {
        displayAllRooms(data);
    });

function updateRoom() {
    alert('Edit room Send !');
}
