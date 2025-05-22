class StopsController < ApplicationController
  def index
    @stops = Stop.all
  end

  def show
    @stop = Stop.find(params[:id])
  end

  def new
    @stop = Stop.new
  end

  def create
    @stop = Stop.new(stop_params)
    if @stop.start_datetime.blank? || @stop.end_datetime.blank? || @stop.name.blank? || @stop.latitude.blank? || @stop.longitude.blank? || @stop.start_datetime > @stop.end_datetime
      flash.now[:alert] = "Please fill in all fields"
      render :new, status: :unprocessable_entity
      return
    end
    if @stop.start_datetime < Time.now
      flash[:notice] = "Occhio! Hai creato una tappa passata!"
    end

    if @stop.save
      redirect_to @stop
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @stop = Stop.find(params[:id])
  end

  def update
    @stop = Stop.find(params[:id])
    if @stop.update(stop_params)
      redirect_to @stop
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @stop = Stop.find(params[:id])
    @stop.destroy
    redirect_to stops_path, status: :see_other
  end

  private

  def stop_params
    params.require(:stop).permit(:name, :latitude, :longitude, :start_datetime, :end_datetime)
  end
end
