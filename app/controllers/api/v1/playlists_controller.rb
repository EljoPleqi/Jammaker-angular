class Api::V1::PlaylistsController < ApplicationController
  include CurrentUserConcern

  private

  def playlist_params
    params.require(:playlist).permit(:id)
  end
end
