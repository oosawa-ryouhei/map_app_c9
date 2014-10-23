json.array!(@notes) do |note|
  json.extract! note, :id, :title, :body, :lat, :lng, :image_file_name, :observed_at, :event_name, :weather
  json.url note_url(note, format: :json)
end
