Rails.application.routes.draw do
  post   '/like/:tweet_id' => 'likes#like',   as: 'like'
  delete '/like/:tweet_id' => 'likes#unlike', as: 'unlike'
  devise_for :users
  get 'tweets/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "tweets#index"
  resources :tweets do
    resources :comments, only: :create
    collection do
      get 'search'
    end
  end  
  resources :users, only: :show
end
