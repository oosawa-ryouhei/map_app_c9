class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :student_name
      t.string :student_number
      t.integer :student_grade
      t.integer :student_class
      t.string :title
      t.text :body
      t.string :image_file_name
      t.datetime :observed_at
      t.string :weather
      t.string :event_name
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
