export default function() {

  console.log("CHART CHART JS!!!")
  console.log(Chart)

    if (typeof Chart === 'undefined') {
      console.log("Chart is undefined!!!")
      return;
    }

    // random values for demo
    var rFactor = function() {
        return Math.round(Math.random() * 100);
    };


    // Line chart
    // -----------------------------------

    var lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            fillColor: 'rgba(114,102,186,0.2)',
            strokeColor: 'rgba(114,102,186,1)',
            pointColor: 'rgba(114,102,186,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(114,102,186,1)',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }, {
            label: 'My Second dataset',
            fillColor: 'rgba(35,183,229,0.2)',
            strokeColor: 'rgba(35,183,229,1)',
            pointColor: 'rgba(35,183,229,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(35,183,229,1)',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }]
    };


    var lineOptions = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        responsive: true
    };

    if (document.getElementById("chartjs-linechart")) {
        console.log("LINE CHART!!!")
        var linectx = document.getElementById("chartjs-linechart").getContext("2d");
        var lineChart = new Chart(linectx).Line(lineData, lineOptions);
    }




}
