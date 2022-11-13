Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/login', to: "auth#spotify_request"
      get '/user', to: "users#create"
      patch '/user', to: "users#update"
    end
  end
  get 'sessions/:id', to: "sessions#create"

  namespace :api do
    namespace :v1 do
      resources :recipes, only: %i[show create  update destroy] do
        post '/new-playlist', to: "recipes#generate_new_playlist"
        post '/typed-recipe', to: "recipes#typed_recipe"
      end
      resources :playlists, only: %i[show create update destroy]
      resources :condiments, only: %i[show create update destroy]
      resources :flavour_enhancers, only: %i[create show destroy]
    end
  end
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root to: "static#home"
  # Defines the root path route ("/")
  # root "articles#index"
end
