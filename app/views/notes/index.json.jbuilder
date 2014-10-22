json.array!(@notes) do |note|
  json.extract! note, :id, :title, :body, :lat, :lng, :image_file_name
  json.url note_url(note, format: :json)
end
