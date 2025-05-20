import { Controller } from "@hotwired/stimulus"
import * as mapboxgl from "mapbox-gl"
// Connects to data-controller="map"
export default class extends Controller {
  connect() {
    // Initialize map functionality here
    console.log("Map controller connected")
  }
}

