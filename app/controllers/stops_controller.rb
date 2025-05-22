# app/controllers/stops_controller.rb
class StopsController < ApplicationController
  before_action :set_stop, only: [:edit, :update, :destroy]

  def index
    @upcoming_stops = Stop.upcoming.order(:start_datetime)
    @active_stops = Stop.active.order(:start_datetime)
  end

  def new
    @stop = Stop.new
  end

  def create
    @stop = Stop.new(stop_params)

    if @stop.save
      redirect_to @stop, notice: "Tappa creata con successo."
    else
      flash.now[:alert] = "Impossibile creare la tappa."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @stop.update(stop_params)
      redirect_to @stop, notice: "Tappa aggiornata con successo."
    else
      flash.now[:alert] = "Impossibile aggiornare la tappa."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @stop.destroy
    redirect_to stops_url, notice: "Tappa eliminata con successo."
  end

  private

  def set_stop
    @stop = Stop.find(params[:id])
  end

  def stop_params
    params.require(:stop).permit(:name, :start_datetime, :end_datetime, :address, :latitude, :longitude, :whatsapp_group_url)
  end
end
