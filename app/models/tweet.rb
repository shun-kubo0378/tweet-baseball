class Tweet < ApplicationRecord
  validates :text, presence: true
  belongs_to :user
  has_many :comments
  has_many :likes, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user

  def self.search(search)
    if search
      Tweet.where('text LIKE(?)', "%#{search}%")
    else
      Tweet.all
    end
  end

  #mount_uploader :image, ImageUploader
end
