class ModesController < ApplicationController
  http_basic_authenticate_with name: ENV['BASIC_AUTH_USERNAME'], password: ENV['BASIC_AUTH_PASSWORD'] if Rails.env == "production"
  http_basic_authenticate_with name: 'teacher', password: 'secret' if Rails.env == "development"

  # GET /mode
  def index
    @mode = Mode.first
  end

  # PATCH/PUT /modes/1
  def update
    respond_to do |format|
      @mode = Mode.first
      if mode_params[:name] == 'view' || mode_params[:name] == 'edit'
        if @mode.update(mode_params)
          format.html { redirect_to modes_path, notice: 'モードを変更しました' }
        else
          format.html { redirect_to modes_path, notice: 'モードが変更できませんでした' }
        end
      else
        format.html { redirect_to modes_path, notice: 'モードが変更できませんでした' }
      end
    end
  end


  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def mode_params
      params.require(:mode).permit(:name)
    end
end
