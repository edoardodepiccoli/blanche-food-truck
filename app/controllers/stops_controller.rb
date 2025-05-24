# app/controllers/stops_controller.rb
class StopsController < ApplicationController
  before_action :set_stop, only: [:edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

  def index
    @upcoming_stops = Stop.upcoming.order(:start_datetime)
    @today_stops = Stop.today.order(:start_datetime)
    @past_stops = Stop.past.order(start_datetime: :desc)
  end

  def new
    @stop = Stop.new
  end

  def create
    @stop = Stop.new(stop_params)

    if @stop.save
      redirect_to stops_path, notice: "Tappa creata con successo."
    else
      flash.now[:alert] = "Impossibile creare la tappa."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @stop.update(stop_params)
      redirect_to stops_path, notice: "Tappa aggiornata con successo."
    else
      flash.now[:alert] = "Impossibile aggiornare la tappa."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @stop.destroy
    redirect_to stops_path, notice: "Tappa eliminata con successo."
  end

  private

  def set_stop
    @stop = Stop.find(params[:id])
  end

  def stop_params
    params.require(:stop).permit(:name, :start_datetime, :end_datetime, :address, :latitude, :longitude, :whatsapp_group_url)
  end
end
