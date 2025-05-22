import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="geocoding"
export default class extends Controller {
  static targets = ["address", "latitude", "longitude", "button", "coordinates"]
  static values = {
    mapboxAccessToken: String,
  }

  connect() {
    console.log("Geocoding controller connected")
  }

  async getCoordinates() {
    const address = this.addressTarget.value
    if (!address) {
      return
    }

    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${this.mapboxAccessTokenValue}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    this.latitudeTarget.value = data.features[0].geometry.coordinates[1]
    this.longitudeTarget.value = data.features[0].geometry.coordinates[0]

    this.coordinatesTarget.textContent = `✅ Coordinate impostate: ${this.latitudeTarget.value}, ${this.longitudeTarget.value}`
  }
}
