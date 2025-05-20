class CreateStops < ActiveRecord::Migration[8.0]
  def change
    create_table :stops do |t|
      t.timestamps

      t.string :name

      t.string :latitude
      t.string :longitude

      t.datetime :datetime
    end
  end
end
