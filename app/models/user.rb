class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # removed: :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :validatable
end
