class CreateBins < ActiveRecord::Migration
  def change
    create_table :bins do |t|
      t.string :borough, null: false
      t.string :site_type, null: false
      t.string :park_site_name, null: false
      t.string :address, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps null: false
    end
  end
end
