class SessionsController < ApplicationController

  def show
  end

  def create
    sign_in
    redirect_to session_path(1)
  end

  def destroy
    sign_out
    redirect_to session_path(2)
  end
end
