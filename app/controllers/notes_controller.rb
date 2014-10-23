class NotesController < ApplicationController
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  def maintenance
  end

  # GET /notes
  # GET /notes.json
  def index
    @notes = Note.all
    @lat_max = Note.maximum(:lat)
    @lat_min = Note.minimum(:lat)
    @lng_max = Note.maximum(:lng)
    @lng_min = Note.minimum(:lng)
  end

  # GET /notes/1
  # GET /notes/1.json
  def show
    respond_to do |format|
      format.html
      format.js
      format.json
    end
  end

  # GET /notes/new
  def new
    @note = Note.new(lat: params[:lat], lng: params[:lng])
  end

  # GET /notes/1/edit
  def edit
  end

  # POST /notes
  # POST /notes.json
  def create
    @note = Note.new(note_params)
    @note.image_file_name = 'no_image.png' if @note.image_file_name == nil
=begin
    upload_file = note_params[:image_file_name]
    content = {}
    if upload_file != nil
      content[:upload_file] = upload_file.read
      content[:upload_file_name] = upload_file.original_filename
      render plain: content[:upload_file_name]
    end
=end
    respond_to do |format|
      if @note.save
        format.html { redirect_to @note, notice: 'Note was successfully created.' }
        format.json { render :show, status: :created, location: @note }
      else
        format.html { render :new }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /notes/1
  # PATCH/PUT /notes/1.json
  def update
    respond_to do |format|
      if @note.update(note_params)
        format.html { redirect_to @note, notice: 'Note was successfully updated.' }
        format.json { render :show, status: :ok, location: @note }
      else
        format.html { render :edit }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /notes/1
  # DELETE /notes/1.json
  def destroy
    @note.destroy
    respond_to do |format|
      format.html { redirect_to notes_url, notice: 'Note was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
      @note.image_file_name = 'no_image.png' if @note.image_file_name == nil
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def note_params
      params.require(:note).permit(:student_name, :student_number, :student_grade, :student_class, :title, :body, :observed_at, :event_name, :lat, :lng)
    end
end
