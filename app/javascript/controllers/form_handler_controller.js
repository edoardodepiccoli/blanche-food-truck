import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form-handler"
export default class extends Controller {
  static targets = ["startDatetime", "endDatetime"]

  connect() {
    this.startDatetimeTarget.addEventListener('input', this.updateEndDatetime.bind(this))
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
