import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    accessToken: String,
    todayStops: Array,
    upcomingStops: Array
  }

  connect() {
    mapboxgl.accessToken = this.accessTokenValue;
    
    // Combine all stops for bounds calculation
    const allStops = [...this.todayStopsValue, ...this.upcomingStopsValue];
    
    // Create bounds object to fit all markers
    const bounds = new mapboxgl.LngLatBounds();
    allStops.forEach(stop => {
      bounds.extend([stop.longitude, stop.latitude]);
    });
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      bounds: bounds,
      fitBoundsOptions: {
        padding: 50 // Add some padding around the bounds
      }
    });

    // Add custom CSS for popup close button
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup-close-button {
        font-size: 20px !important;
        padding: 8px !important;
        right: 8px !important;
        top: 8px !important;
        color: #666 !important;
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        transition: color 0.2s ease !important;
      }
      .mapboxgl-popup-close-button:hover {
        color: #000 !important;
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);

    // Wait for the map to be fully loaded before adding markers
    map.on('load', () => {
      // Add a small delay to ensure the map is completely ready
      setTimeout(() => {
        this.addStopsToMap(map);
      }, 100);
    });
  }

  addStopsToMap(map) {
    // Add today's stops with special color
    this.todayStopsValue.forEach(stop => {
      const marker = new mapboxgl.Marker({
        opacity: 1,
        color: '#7C2809' // Special color for today's stops
      })
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          offset: 25,
          className: 'custom-popup'
        }).setHTML(`
          <div class="p-3">
            <h3 class="text-xl font-bold mb-1">${stop.name}</h3>
            <p class="text-xs text-gray-500 mb-3">${new Date(stop.start_datetime).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <a href="${stop.google_maps_url}" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm">
              📍 Apri in Google Maps
            </a>
          </div>
        `))
        .addTo(map);
    });

    // Add upcoming stops with grey color
    this.upcomingStopsValue.forEach(stop => {
      const marker = new mapboxgl.Marker({
        opacity: 1,
        color: '#808080' // Grey color for upcoming stops
      })
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          offset: 25,
          className: 'custom-popup'
        }).setHTML(`
          <div class="p-3">
            <h3 class="text-xl font-bold mb-1">${stop.name}</h3>
            <p class="text-xs text-gray-500 mb-3">${new Date(stop.start_datetime).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <a href="${stop.google_maps_url}" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm">
              📍 Apri in Google Maps
            </a>
          </div>
        `))
        .addTo(map);
    });
  }
}