if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_jammaker", domain: "api.jammaker.lol"
else
  Rails.application.config.session_store :cookie_store, key: "_jammaker"
end
