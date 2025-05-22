class CreateStops < ActiveRecord::Migration[8.0]
  def change
    create_table :stops do |t|
      t.string :name
      t.string :whatsapp_group_url
      t.datetime :start_datetime
      t.datetime :end_datetime
      t.text :address
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
