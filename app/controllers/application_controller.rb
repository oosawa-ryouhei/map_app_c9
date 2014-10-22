class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper
  before_action :check_ip

  protected
    def check_ip
      unless (controller_name == 'notes' && action_name == 'maintenance')
        redirect_to maintenance_url unless request.ip == '127.0.0.1'
      end
    end
end
