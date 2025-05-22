Rails.application.routes.draw do
  resources :stops, only: [:index, :new, :create, :edit, :update, :destroy]
  root "stops#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
