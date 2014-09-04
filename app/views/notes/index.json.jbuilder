json.array!(@notes) do |note|
  json.extract! note, :id, :student_name, :student_number, :student_grade, :student_class, :title, :body, :observed_at, :event_name, :latitude, :longitude
  json.url note_url(note, format: :json)
end
