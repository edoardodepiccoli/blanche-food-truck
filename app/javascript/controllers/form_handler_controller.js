import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form-handler"
export default class extends Controller {
  static targets = ["startDatetime", "endDatetime", "name", "address"]

  connect() {
    this.startDatetimeTarget.addEventListener('input', this.updateEndDatetime.bind(this))
    
    // Add input listeners for text fields that need capitalization
    this.nameTarget.addEventListener('input', this.capitalizeText.bind(this))
    this.addressTarget.addEventListener('input', this.capitalizeText.bind(this))
  }

  capitalizeText(event) {
    const input = event.target
    const words = input.value.split(' ')
    const capitalizedWords = words.map(word => {
      // Don't capitalize if the word is all uppercase (like TV, USA, etc.)
      if (word === word.toUpperCase()) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    input.value = capitalizedWords.join(' ')
  }

  updateEndDatetime() {
    // Parse the input value directly without timezone conversion
    const [datePart, timePart] = this.startDatetimeTarget.value.split('T')
    const [year, month, day] = datePart.split('-').map(Number)
    const [hours, minutes] = timePart.split(':').map(Number)
    
    const startDate = new Date(year, month - 1, day, hours, minutes)
    const endDate = new Date(startDate.getTime() + (2.5 * 60 * 60 * 1000)) // Add 2.5 hours
    
    // Format the date manually to avoid timezone issues
    const endYear = endDate.getFullYear()
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0')
    const endDay = String(endDate.getDate()).padStart(2, '0')
    const endHours = String(endDate.getHours()).padStart(2, '0')
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0')
    
    const endDatetimeString = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}`
    this.endDatetimeTarget.value = endDatetimeString
  }
}
