class Api::V1::PlaylistsController < ApplicationController
  include CurrentUserConcern

  def show
    hdrs = return_header
    playlist = JSON.parse(RestClient.get("https://api.spotify.com/v1/playlists/#{params[:id]}", hdrs))
    duration = 0
    playlist['tracks']['items'].each do |item|
      duration += item['track']['duration_ms'] / 60_000
    end
    render json: {
      duration:,
      numberOfTracks: playlist['tracks']['items'].size
    }
  end

  private

  def return_header
    @current_user = User.find_by(id: session[:id]) if session[:id]
    enc_credentials = "Bearer #{@current_user.access_token}"
    { "Accept" => "application/json",
      "Content-Type" => "application/json",
      "Authorization" => enc_credentials }
  end

  def playlist_params
    params.require(:playlist).permit(:id)
  end
end
