# app/models/stop.rb
class Stop < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :start_datetime, presence: true
  validates :end_datetime, presence: true
  validates :address, presence: true, length: { minimum: 5, maximum: 500 }
  validates :latitude, presence: true, numericality: { in: -90.0..90.0 }
  validates :longitude, presence: true, numericality: { in: -180.0..180.0 }

  validate :end_datetime_after_start_datetime
  validate :start_datetime_in_future

  # Scopes for easier querying
  scope :upcoming, -> { where("start_datetime > ?", Time.current) }
  scope :active, -> { where("start_datetime <= ? AND end_datetime >= ?", Time.current, Time.current) }
  scope :past, -> { where("end_datetime < ?", Time.current) }

  # Helper method for maps link
  def maps_url
    "https://maps.apple.com/?q=#{latitude},#{longitude}&z=15"
  end

  def google_maps_url
    "https://www.google.com/maps?q=#{latitude},#{longitude}&z=15"
  end

  # Status helper
  def status
    now = Time.current
    if end_datetime < now
      "past"
    elsif start_datetime <= now && end_datetime >= now
      "active"
    else
      "upcoming"
    end
  end

  private

  def end_datetime_after_start_datetime
    return unless start_datetime && end_datetime

    if end_datetime <= start_datetime
      errors.add(:end_datetime, "must be after start date and time")
    end
  end

  def start_datetime_in_future
    return unless start_datetime

    if start_datetime <= Time.current
      errors.add(:start_datetime, "must be in the future")
    end
  end
end
