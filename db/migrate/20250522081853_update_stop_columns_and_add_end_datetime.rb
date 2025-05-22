class UpdateStopColumnsAndAddEndDatetime < ActiveRecord::Migration[8.0]
  def change
    rename_column :stops, :datetime, :start_datetime
    add_column :stops, :end_datetime, :datetime
  end
end
