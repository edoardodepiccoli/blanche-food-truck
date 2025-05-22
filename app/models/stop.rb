class Stop < ApplicationRecord
  scope :today, -> { where("start_datetime > ?", Time.now.beginning_of_day).where("start_datetime < ?", Time.now.end_of_day) }
  scope :upcoming, -> { where("start_datetime > ?", (Time.now + 1.day).beginning_of_day).where("start_datetime < ?", (Time.now + 1.day).end_of_day) }
  scope :past, -> { where("start_datetime < ?", Time.now) }
end
