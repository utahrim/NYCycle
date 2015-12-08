module ParserHelper

  def self.get_data
    response = HTTParty.get("https://data.cityofnewyork.us/resource/ggvk-gyea.json?$$app_token=g9vAMkHRT1iiTeZ3ffrtQ20KA")
    response.each {|row| Bin.create(row) if row["latitude"] && row["longitude"]}
  end

end
