import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    accessToken: String,
    stops: Array
  }

  connect() {
    mapboxgl.accessToken = this.accessTokenValue;
    
    // Get the first stop to center the map
    const firstStop = this.stopsValue[0];
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard',
      center: [firstStop.longitude, firstStop.latitude],
      zoom: 12,
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
    this.stopsValue.forEach(stop => {
      const marker = new mapboxgl.Marker({
        opacity: 1,
        color: '#7C2809'
      })
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          offset: 25,
          className: 'custom-popup'
        }).setHTML(`
          <div class="p-2 m-2">
            <h3 class="font-bold mb-2">${stop.name}</h3>
            <a href="${stop.google_maps_url}" target="_blank" class="text-blue-500 hover:text-blue-700">
              📍 Apri in Google Maps
            </a>
          </div>
        `))
        .addTo(map);
    });
  }
}