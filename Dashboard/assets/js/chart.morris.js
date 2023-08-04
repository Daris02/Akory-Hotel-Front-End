const URL = "http://localhost:8000";

$(document).ready(function () {
  lineChart();
  donutChart();
  pieChart();
  $(window).resize(function () {
    window.lineChart.redraw();
    window.donutChart.redraw();
    window.pieChart.redraw();
  });
});

const dataList = $("#allBooking");
const bookings = $("#totalBooking");
const roomsAvailable = $('#roomsAvailable')

async function getTotalBookings() {
  const response = await fetch(`${URL}/reservations`)
    .then((res) => res.json())
    .then((data) => {
      bookings.append(`${data.length}`);
    });
}

async function getTotalRoomsAvailable() {
  const response = await fetch(`${URL}/RoomsAvailableForAHotel`)
    .then((res) => res.json())
    .then((data) => {
      roomsAvailable.append(`${data.length}`);
    });
}

getTotalBookings();
getTotalRoomsAvailable();

function lineChart() {
  window.lineChart = Morris.Line({
    element: "line-chart",
    data: [
      { y: "2006", a: 100 },
      { y: "2007", a: 75 },
      { y: "2008", a: 50 },
      { y: "2009", a: 75 },
      { y: "2010", a: 50 },
      { y: "2011", a: 75 },
      { y: "2012", a: 100 },
    ],
    xkey: "y",
    ykeys: ["a"],
    labels: ["Series A"],
    lineColors: ["#009688"],
    lineWidth: "3px",
    resize: true,
    redraw: true,
  });
}

let Solo = 0;
let Twin = 0;
let Family = 0;
let Vip = 0;
let Rooms = { Solo, Twin, Family, Vip };

async function donutChart() {
  const response = await fetch(`${URL}/CurrentyOccupiedRoomsList`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((room) => {
      if (room.room_type == "solo") {
        Rooms.Solo++;
      } else if (room.room_type == "twin") {
        Rooms.Twin++;
      } else if (room.room_type == "family") {
        Rooms.Family++;
      } else if (room.room_type == "VIP") {
        Rooms.Vip++;
      }
    });
  });

  window.donutChart = Morris.Donut({
    element: "donut-chart",
    data: [
      { label: "Single Room", value: Rooms.Solo },
      { label: "Twin", value: Rooms.Twin },
      { label: "Family suite", value: Rooms.Family },
      { label: "VIP room", value: Rooms.Vip },
    ],
    backgroundColor: "#f2f5fa",
    labelColor: "#009688",
    colors: ["#f6a625", "#2daf9e", "#f44336", "#2579f6"],
    resize: true,
    redraw: true,
  });
}


function pieChart() {
  var paper = Raphael("pie-chart");
  paper.piechart(100, 100, 90, [18.373, 18.686, 2.867, 23.991, 9.592, 0.213], {
    legend: [
      "Windows/Windows Live",
      "Server/Tools",
      "Online Services",
      "Business",
      "Entertainment/Devices",
      "Unallocated/Other",
    ],
  });
}

fetch(`${URL}/ResrvationsWithCustomerInfo`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((booking) => {
      let status = '<span class="badge badge-pill bg-success badge">ARRIVED</span>';
      if (booking.is_cancelled == false) {
        status = '<span class="badge badge-pill bg-warning badge">PENDING</span>'
      } else if (booking.is_cancelled == true) {
        status = '<span class="badge badge-pill bg-danger badge">CANCELLED</span>'
      }
      dataList.append(
        `
          <tr>
            <td class="text-nowrap">
              <div>BKG-${booking.id}</div>
            </td>
            <td class="text-nowrap">${booking.customer_firstname} ${booking.customer_lastname}</td>
            <!-- <td><a href="https://gmail.${booking.email}" class="__cf_email__"
                data-cfemail="3743585a5a4e55524559565b77524f565a475b521954585a">[email&#160;protected]</a>
            </td> -->
            <td>
                <div>${booking.email}</div>
            </td>
            <td>${booking.principal_contact}</td>
            <td class="text-center">${booking.room_type}</td>
            <td class="text-right">
              <div>${booking.emergency_number}</div>
            </td>
            <td class="text-center">
              ${status}
            </td>
          </tr>
        `
      );
    });
  });
