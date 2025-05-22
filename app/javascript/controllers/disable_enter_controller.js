import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="disable-enter"
export default class extends Controller {
  keydown(event) {
    if (event.key === "Enter") {
      if (event.target.tagName.toLowerCase() === 'textarea') {
        return true;
      }
      
      event.preventDefault();
      return false;
    }
  }
}
