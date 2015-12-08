class BinsController < ApplicationController


  def index
    @bins = Bin.all
    render "/bins/index"
  end

  def getlatlng
    @user_location = Geokit::LatLng.new(params[:lat].to_f, params[:lng].to_f)
    @bin = Bin.closest(:origin => @user_location).first
  end

  def convert_to_latlng
    address = params["address"] + ", " + params["city"] + ", " + params["zip"]
    address_data = Geokit::Geocoders::GoogleGeocoder.geocode address
    @user_location = Geokit::LatLng.new(address_data.lat, address_data.lng)
    @bin = Bin.closest(:origin => @user_location).first
    render "/bins/getlatlng"
  end
end
