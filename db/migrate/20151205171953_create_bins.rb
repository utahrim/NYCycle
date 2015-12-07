class CreateBins < ActiveRecord::Migration
  def change
    create_table :bins do |t|
      t.string :borough
      t.string :site_type
      t.string :park_site_name
      t.string :address
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps null: false
    end
  end
end
