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
function lineChart() {
  window.lineChart = Morris.Line({
    element: "line-chart",
    data: [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ],
    xkey: "y",
    ykeys: ["a", "b"],
    labels: ["Series A", "Series B"],
    lineColors: ["#009688", "#cdc6c6"],
    lineWidth: "3px",
    resize: true,
    redraw: true,
  });
}
function donutChart() {
  window.donutChart = Morris.Donut({
    element: "donut-chart",
    data: [
      { label: "Room with view", value: 31 },
      { label: "Connecting room", value: 31 },
      { label: "Executive room", value: 31 },
      { label: "Disabled room", value: 31 },
      { label: "Suit room", value: 31 },
      { label: "Twin", value: 30 },
      { label: "Single Room", value: 30 },
      { label: "Family suite", value: 30 },
      { label: "Triple room", value:30 }
    ],
    backgroundColor: "#f2f5fa",
    labelColor: "#009688",
    colors: ["#f6a625", "#f44336", "#ff8c00", "#ffc107","#42a5f5","#00bcd4","#4caf50","#9c27b0","#795548"],
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

fetch('http://localhost:8000/ReservationListDescByHotel')
  .then(res => res.json())
  .then(data => {
    let dataList = $('#allBooking');
    data.forEach(booking => {
      dataList.append(
        `
          <tr>
            <td class="text-nowrap">
              <div>BKG-${booking.id}</div>
            </td>
            <td class="text-nowrap">${booking.id_customer}</td>
            <td><a href="/cdn-cgi/l/${booking.id_customer}" class="__cf_email__"
                data-cfemail="3743585a5a4e55524559565b77524f565a475b521954585a">[email&#160;protected]</a>
            </td>
            <td>12414786454545</td>
            <td class="text-center">Double</td>
            <td class="text-right">
              <div>631-254-6480</div>
            </td>
            <td class="text-center">
              <span class="badge badge-pill bg-success inv-badge">INACTIVE</span>
            </td>
          </tr>
        `
      )
    });
  })