class Api::V1::AuthController < ApplicationController
  def spotify_request
    url = "https://accounts.spotify.com/authorize"
    query_params = {
      client_id: ENV.fetch('SPOTIFY_CLIENT_ID'),
      response_type: 'code',
      redirect_uri: 'http://localhost:3000/api/v1/user',
      scope: "playlist-modify-private
      playlist-modify-public",
      # user-read-private
      # user-modify-playback-state
      # user-top-read
      # user-read-recently-played
      # user-read-playback-state
      # user-read-currently-playing"
      # show_dialog: true
    }
    redirect_to "#{url}?#{query_params.to_query}", allow_other_host: true
  end
end
