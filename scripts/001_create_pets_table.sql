-- Create pets table for storing pet information
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  pet_type TEXT NOT NULL CHECK (pet_type IN ('cat', 'dog')),
  breed TEXT NOT NULL,
  coat TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  location TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_pets_search ON pets(pet_type, breed, coat, gender);
