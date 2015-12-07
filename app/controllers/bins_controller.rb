class BinsController < ApplicationController

  include ParserHelper

  BINS = ParserHelper.get_data

  def index
    @bins = Bin.all
    render "/bins/index"
  end
end
