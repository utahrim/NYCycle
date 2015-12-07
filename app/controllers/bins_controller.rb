class BinsController < ApplicationController

  include ParserHelper

  BINS = ParserHelper.get_data

  def index
    @bins = Bin.all
    render "/bins/index"
  end

  def getlatlng
    @user_location = Geokit::LatLng.new(params[:lat].to_f, params[:lng].to_f)
    @bin = Bin.closest(:origin => @user_location).first
    binding.pry
  end


end
