Rails.application.routes.draw do
  devise_for :users
  resources :stops, only: [:index, :new, :create, :edit, :update, :destroy]
  root "stops#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
