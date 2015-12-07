class BinsController < ApplicationController

  include ParserHelper

  def index
    @bins ||= ParserHelper.get_data
    render "/bins/index"
  end
end
