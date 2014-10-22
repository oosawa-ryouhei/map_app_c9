class ChangeColumnNameNotesLatitudeLatLongitudeLng < ActiveRecord::Migration
  def change
    rename_column :notes, :latitude, :lat
    rename_column :notes, :longitude, :lng
  end
end
