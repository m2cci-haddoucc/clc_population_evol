import "./style.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Style, Stroke, Fill } from "ol/style.js";
import { scaleThreshold } from "d3-scale";
import Overlay from "ol/Overlay.js";
import { Group as LayerGroup } from "ol/layer.js";
import { lab } from "d3";

//initialising the map
const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [222500, 5900000],
    zoom: 6,
  }),
});
const layerGroup1 = new LayerGroup();
const layerGroup2 = new LayerGroup();

/**
 * Loads GeoJSON data and adds it as a vector layer to a layer group on the map.
 * @param {string} file_path 
 * @param {string} option - path element in json
 * @param {string} option2 
 * @param {string} title 
 * @param {LayerGroup} layerGroup 
 * @param {string[]} colors 
 */
async function loadGeoJSON(file_path, option, option2, title, layerGroup, colors) {
  // Fetch the GeoJSON file
  const response = await fetch(file_path);
  const data = await response.json();
  const colors_panel = colors;

  // Create a vector source and read features from the GeoJSON data
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    }),
  });

  // Create a vector layer with the specified title, source, and style
  const vectorLayer = new VectorLayer({
    title: title,
    source: vectorSource,
    style: function (feature) {
      var rate = feature.getProperties()[option];
      var minRate = 0;
      var maxRate = 30;
      var colors = colors_panel;
      var colorScale = scaleThreshold()
        .domain([minRate, 4, 10, 16, maxRate])
        .range(colors);

      var color = colorScale(rate);
      return new Style({
        fill: new Fill({
          color: color,
        }),
        stroke: new Stroke({
          color: "#000000",
          width: 1,
        }),
      });
    },
  });

  // Add the vector layer to the layer group
  layerGroup.getLayers().push(vectorLayer);

  // Click interaction to display the popup
  map.on("click", function (evt) {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      var rate = feature.getProperties()[option];
      var region = feature.getProperties()[option2];
      var content =
        "<p>Population increased by " +
        rate +
        "%" +
        " in <br>" +
        region +
        "<br>" +
        "between 2006 and 2018";
      ("</p>");
      overlay.setPosition(evt.coordinate);
      popupContent.innerHTML = content;
    });
  });

  // Create the overlay and popup
  const overlay = new Overlay({
    element: document.getElementById("popup"),
    positioning: "bottom-center",
    offset: [0, -10],
  });
  map.addOverlay(overlay);

  const popupContent = document.getElementById("popup-content");
  const closer = document.getElementById("popup-closer");

  closer.addEventListener("click", function () {
    overlay.setPosition(undefined);
  });
}

//declare variables population and artificialisation layers 
var path_artif = "geodata/artificialisation.geojson";
var option_artif = "taux_augmentation";
var option2_artif = "nouveau_reg";
var title_artif = "artificialisation";
var colors_artif = ["#E1F5FE", "#B3E5FC", "#81D4FA", "#039BE5 ", "#01579B"];
var path_pop = "geodata/population.geojson";
var option_pop = "taux_augmentation";
var option2_pop = "region";
var title_pop = "population";
var colors_pop = ["#FFCCBC", "#FFAB91", "#FF8A65", "#F4511E", "#BF360C"];

//call function 
var artificialisation = loadGeoJSON(
  path_artif,
  option_artif,
  option2_artif,
  title_artif,
  layerGroup1,
  colors_artif
);

var population = loadGeoJSON(
  path_pop,
  option_pop,
  option2_pop,
  title_pop,
  layerGroup2,
  colors_pop
);
//adding the layers to the map
map.addLayer(layerGroup1);
map.addLayer(layerGroup2);

//Create and manage checkboxex for layers setVisible
var bindLayerCheckboxToggle = function (checkboxId, layer) {
  var checkbox = document.getElementById(checkboxId);
  checkbox.onchange = function () {
    layer.setVisible(checkbox.checked);
  };
};

bindLayerCheckboxToggle("pop", layerGroup1);
bindLayerCheckboxToggle("artif", layerGroup2);