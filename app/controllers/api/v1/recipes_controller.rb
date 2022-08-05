class Api::V1::RecipesController < ApplicationController
  # require 'rest-client'
  include CurrentUserConcern

  def index
    @recipes = Recipe.all
    @recipe = Recipe.new
  end

  def create
    @current_user
    if session[:id]
      @current_user = User.find_by(id: session[:id])
    end
    @recipe = Recipe.new(recipes_params)
    @recipe = Recipe.scraper(@recipe)
    @recipe.user = @current_user
    @recipe.save
    @instructions = Instruction.parse(@recipe.steps)
    @instructions.shift
    @instructions.each do |instruction|
      instruction.gsub!(/\A\s\d*\s*/, "")
      Instruction.create(content: instruction, recipe: @recipe)
    end
    # @ingredients = Ingredient.parse(@recipe.ingredients)
    # @ingredients.each do |ingredient|
    #   Ingredient.create(content: ingredient, recipe: @recipe)
    # end
    @recipe.playlist = Playlist.new({
      spotify_playlist_id: create_playlist(@recipe.preptime.to_i, @recipe.title),
      recipe_id: @recipe.id })
    @recipe.save
   render json:  {
    id: @recipe.id,
    playlistId: @recipe.playlist["spotify_playlist_id"]
  }
   end



  def show
    @recipe = Recipe.find(params[:id])
    render json: {
      recipe: @recipe,
      playlist: @recipe.playlist["spotify_playlist_id"]
    } # * send the recipe data sa json to the frontend
  end

  # def update
  #   @recipe = Recipe.find(params[:id])
  #   @recipe.update(favorite: true)
  #   redirect_to recipe_path(@recipe)
  # end

  # def destroy
  #   @recipes.destroy
  #   redirect_to recipes_path
  # end

  private

  # * the #create_playlist takes two paraments the spotify user and the prep_time from the scrapper
  # * the #create_playlist generates and populates the user recipe
  def create_playlist(prep_time, playlist_name)
    hdrs = return_header
    # * currate the songs array, it must hold either tracks or a collection of strings that is a valid spotify track uri
    songs = []
    # TODO: calculate the total duration of all the songs inside the songs array
    playlist_time = 0
    # * looping until the total playlist time reaches the total preptime
    until playlist_time >= prep_time
      # TODO: loop logic
      song = fetch_song
      puts "playlist time: #{playlist_time} prep time: #{prep_time}"

      next if songs.include?(song[0])

      songs.push(song[0])
      playlist_time += song[1] / 60_000
      puts "line 62 songs array length -> #{songs.size}"
    end
    # * CREATE THE PLAYLIST
    payload = {name: "Jammaker #{playlist_name}",
                description: "An automated playlist generated by jammaker.lol so that you dont ever have to fiddle with your music again",
                public: false}
    playlist = JSON.parse(RestClient.post("https://api.spotify.com/v1/users/#{@current_user.spotify_id}/playlists", payload.to_json, hdrs))

    RestClient::Request.new({
                    method: :post,
                    url: "https://api.spotify.com/v1/playlists/#{playlist["id"]}/tracks?uris=#{songs.join(',')}",
                    headers: hdrs
                    }).execute do |response, request, result|
                    case response.code
                    when 400
                      [ :error, JSON.parse(response.to_str) ]
                    when 200
                      [ :success, JSON.parse(response.to_str) ]
                    else
                      [ :success, JSON.parse(response.to_str) ]
                    end
      end

    playlist["id"]

  end

  def fetch_genre_url
    # * get the categories
    "https://api.spotify.com/v1/browse/categories/#{recipes_params[:genre]}"
  end

  def fetch_song
    hdrs = return_header
    # * get the playlist url from the category
    playlist_response = fetch_genre_url

    if RestClient::Request.new({ url: "#{playlist_response}/playlists",
      method: "GET",
      headers: hdrs }).execute.code == 404
    playlist_response = fetch_genre_url
    end

    playlist_response =  JSON.parse(RestClient.get("#{playlist_response}/playlists", hdrs))

    playlist_url = playlist_response['playlists']['items'][rand(playlist_response.length) - 1]['href']

    # * get the song url from the playlist

    total_songs =JSON.parse(RestClient.get(playlist_url + "/tracks?", hdrs))
    puts total_songs["total"]
    song_response = JSON.parse(RestClient.get(playlist_url + "/tracks?&limit=1&offset=#{rand(total_songs["total"])}",hdrs))

   [song_response['items'].first['track']['uri'], song_response['items'].first['track']['duration_ms']] # * <---- return song
  end

  def recipes_params
    params.require(:recipeData).permit(:url, :genre)
  end

  def spotify_urls
    spotify_urls = {
      categories: "https://api.spotify.com/v1/browse/categories?limit=10&offset=5",
      token: "https://accounts.spotify.com/api/token",
      refresh: 'https://api.spotify.com/v1/refresh'
    }
  end

  def return_header
    enc_credentials = "Bearer #{@current_user.access_token}"
    hdrs = { "Accept" => "application/json",
                "Content-Type" => "application/json",
                "Authorization" => enc_credentials }
  end


end
