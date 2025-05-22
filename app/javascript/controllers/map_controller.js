import { Controller } from "@hotwired/stimulus";
// Connects to data-controller="map"
export default class extends Controller {
  static targets = ["container", "latitude", "longitude", "address", "setAddressButton"];
  static values = {
    accessToken: String,
    stops: { type: Array, default: [] },
    focusStop: { type: Object, default: null }
  };

  connect() {
    mapboxgl.accessToken = this.accessTokenValue;

    this.map = new mapboxgl.Map({
      container: this.containerTarget,
      style: "mapbox://styles/mapbox/standard",
      projection: "globe",
      center: this.getInitialCenter(),
      zoom: 14,
    });

    this.map.on('load', () => {
      if (this.hasStopsValue && this.stopsValue.length > 0) {
        this.displayAllMarkers();
      } else if (this.hasLatitudeTarget && this.hasLongitudeTarget) {
        this.updateSingleMarker();
      }
    });

    // Listen for changes in latitude and longitude fields
    this.latitudeTarget.addEventListener('change', () => this.updateSingleMarker());
    this.longitudeTarget.addEventListener('change', () => this.updateSingleMarker());
    
    // Only set up address handling if the targets exist
    if (this.hasAddressTarget && this.hasSetAddressButtonTarget) {
      this.setAddressButtonTarget.addEventListener('click', this.setAddress.bind(this));
    }
  }

  getInitialCenter() {
    if (this.hasFocusStopValue && this.focusStopValue) {
      return [this.focusStopValue.longitude, this.focusStopValue.latitude];
    } else if (this.hasLatitudeTarget && this.hasLongitudeTarget) {
      const lat = parseFloat(this.latitudeTarget.value);
      const lng = parseFloat(this.longitudeTarget.value);
      if (!isNaN(lat) && !isNaN(lng)) {
        return [lng, lat];
      }
    }
    return [11.889175, 45.686688]; // Default center
  }

  setAddress() {
    this.handleAddressInput();
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Handle address input with geocoding
  async handleAddressInput() {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${this.addressTarget.value}&access_token=${this.accessTokenValue}`)
    const data = await response.json();
    console.log(data);
    const coordinates = data.features[0].geometry.coordinates;
    this.latitudeTarget.value = coordinates[1];
    this.longitudeTarget.value = coordinates[0];
    this.updateSingleMarker()
  }

  displayAllMarkers() {
    // Clear existing markers
    if (this.markers) {
      this.markers.forEach(marker => marker.remove());
    }
    this.markers = [];

    // Add markers for each stop
    this.stopsValue.forEach(stop => {
      const isFocusStop = this.hasFocusStopValue && 
                         this.focusStopValue &&
                         stop.latitude === this.focusStopValue.latitude && 
                         stop.longitude === this.focusStopValue.longitude;

      const marker = new mapboxgl.Marker({
        color: isFocusStop ? '#FF0000' : '#808080',
        scale: isFocusStop ? 1.2 : 1
      })
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${stop.name}</h3>`))
        .addTo(this.map);

      this.markers.push(marker);
    });

    // If there's a focus stop, center the map on it
    if (this.hasFocusStopValue && this.focusStopValue) {
      this.map.flyTo({
        center: [this.focusStopValue.longitude, this.focusStopValue.latitude],
        zoom: 16
      });
    } else {
      // Otherwise fit bounds to show all markers
      this.fitBoundsToMarkers();
    }
  }

  updateSingleMarker() {
    const lat = parseFloat(this.latitudeTarget.value);
    const lng = parseFloat(this.longitudeTarget.value);

    if (isNaN(lat) || isNaN(lng)) return;

    // Remove existing marker if it exists
    if (this.marker) {
      this.marker.remove();
    }

    // Create new marker
    this.marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);

    // Center map on marker
    this.map.flyTo({
      center: [lng, lat],
      zoom: 16
    });
  }

  fitBoundsToMarkers() {
    if (!this.markers || this.markers.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    this.markers.forEach(marker => {
      bounds.extend(marker.getLngLat());
    });

    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  }
}
