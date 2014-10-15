module ModesHelper
  def edit_mode?
    Mode.first.name == 'edit'
  end
end
