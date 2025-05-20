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
    params.require(:stop).permit(:name, :latitude, :longitude, :datetime)
  end
end
