# app/controllers/stops_controller.rb
class StopsController < ApplicationController
  before_action :set_stop, only: [:show, :edit, :update, :destroy]

  def index
    @upcoming_stops = Stop.upcoming.order(:start_datetime)
    @active_stops = Stop.active.order(:start_datetime)
  end

  def show
  end

  def new
    @stop = Stop.new
  end

  def create
    @stop = Stop.new(stop_params)

    if @stop.save
      redirect_to @stop, notice: "Stop was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @stop.update(stop_params)
      redirect_to @stop, notice: "Stop was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @stop.destroy
    redirect_to stops_url, notice: "Stop was successfully deleted."
  end

  private

  def set_stop
    @stop = Stop.find(params[:id])
  end

  def stop_params
    params.require(:stop).permit(:name, :start_datetime, :end_datetime, :address, :latitude, :longitude)
  end
end
