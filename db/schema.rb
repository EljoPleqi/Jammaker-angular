# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_26_165316) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingredients", force: :cascade do |t|
    t.string "content"
    t.bigint "recipe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_ingredients_on_recipe_id"
  end

  create_table "instructions", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "recipe_id", null: false
    t.index ["recipe_id"], name: "index_instructions_on_recipe_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.string "spotify_playlist_id"
    t.bigint "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_playlists_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "title"
    t.string "preptime"
    t.string "instructions"
    t.string "tags"
    t.string "raw_ingredients"
    t.string "url"
    t.string "steps"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "favorite", default: false
    t.string "category"
    t.string "genre"
    t.string "servings"
    t.string "ingredients"
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.string "country"
    t.string "spotify_url"
    t.string "href"
    t.string "uri"
    t.string "spotify_id"
    t.string "access_token"
    t.string "refresh_token"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  add_foreign_key "ingredients", "recipes"
  add_foreign_key "instructions", "recipes"
  add_foreign_key "playlists", "recipes"
  add_foreign_key "recipes", "users"
end
