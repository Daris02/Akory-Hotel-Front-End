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
