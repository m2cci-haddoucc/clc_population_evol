// Global variable for actual chart
let chart;
/**
 * this function create bar charts
 * @param {string} file_path
 * @param {string} axe_x
 * @param {string} axe_y
 * @param {string} chart
 * @param {string} label
 */

async function CreatebarChart(file_path, axe_x, axe_y, chart, label, color) {
  const response = await fetch(file_path);
  const data = await response.json();

  //get axes data
  const chartData = data.features.map((feature) => feature.properties[axe_x]);
  const chartLabels = data.features.map((feature) => feature.properties[axe_y]);

  const ctx = document.getElementById(chart).getContext("2d");

  //creating the chart
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: label,
          data: chartData,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
// declare variables for createBarrChart
var color_artif = "#566573";
var color_pop = "#2874A6 ";
var path_artif = "geodata/artificialisation.geojson";
var path_pop = "geodata/population.geojson";
var axe_x_pop = "taux_augmentation";
var axe_y_pop = "nouveau_reg";
var axe_x_artif = "taux_augmentation";
var axe_y_artif = "region";
// call createBarrChart for specific charts
CreatebarChart(
  path_pop,
  axe_x_pop,
  axe_y_pop,
  "chart_pop",
  "taux d'augmentation de la population",
  color_pop
);
CreatebarChart(
  path_artif,
  axe_x_artif,
  axe_y_artif,
  "chart_art",
  "taux d'augmentation de l'artificialisation",
  color_artif
);

async function CreateLineChart(
  file_path_1,
  file_path_2,
  chart,
  label_1,
  label_2,
  region_range
) {
  const response1 = await fetch(file_path_1);
  const response2 = await fetch(file_path_2);
  const data1 = await response1.json();
  const data2 = await response2.json();
  // Get axes data for dataset 1
  var chartData1 = [];
  var chartData2 = [];
  const art2006 = data2.features[region_range].properties["sum_annee_2006"];
  const art2012 = data2.features[region_range].properties["sum_annee_2012"];
  const art2018 = data2.features[region_range].properties["sum_annee_2018"];
  const art2006_norm = art2006/100;
  const art2012_norm = art2012/100;
  const art2018_norm = art2018/100;

  chartData1.push(art2006_norm);
  chartData1.push(art2012_norm);
  chartData1.push(art2018_norm);
  const chartLabels = ["2006", "2012", "2018"];
  const pop2006 = data1.features[region_range].properties["total_population_2006"];
  const pop2012 = data1.features[region_range].properties["total_population_2012"];
  const pop2018 = data1.features[region_range].properties["population_2018"];

  chartData2.push(pop2006);
  chartData2.push(pop2012);
  chartData2.push(pop2018);
  console.log(data1);
  console.log(data2);
  console.log(data2.features[region_range].properties["region"]);
  const chartLabels1 = ["2006", "2012", "2018"];
  console.log(document.getElementById(chart));
  const ctx = document.getElementById(chart).getContext("2d");

  // Creating the chart
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartLabels1,
      datasets: [
        {
          label: label_1,
          data: chartData1,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
        },
        {
          label: label_2,
          data: chartData2,
          borderColor: "rgba(192, 75, 192, 1)",
          backgroundColor: "rgba(192, 75, 192, 0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

CreateLineChart(
  path_pop,
  path_artif,
  "line_chart_corse",
  "Taux d'augmentation de la population",
  "Taux d'augmentation de l'artificialisation",
  8
);

CreateLineChart(
  path_pop,
  path_artif,
  "line_chart_grandest",
  "Taux d'augmentation de la population",
  "Taux d'augmentation de l'artificialisation",
  9
);
