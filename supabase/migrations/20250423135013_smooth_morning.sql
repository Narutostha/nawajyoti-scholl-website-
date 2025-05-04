/*
  # Add Hero Carousel Table

  1. New Tables
    - `hero_carousel`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `image_url` (text)
      - `button_text` (text)
      - `button_link` (text)
      - `active` (boolean)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `hero_carousel` table
    - Add policies for public and authenticated users
*/

CREATE TABLE IF NOT EXISTS hero_carousel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image_url text NOT NULL,
  button_text text,
  button_link text,
  active boolean DEFAULT true,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hero_carousel ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public users can view active hero carousel items" 
  ON hero_carousel 
  FOR SELECT 
  USING (active = true);

CREATE POLICY "Authenticated users can manage hero carousel" 
  ON hero_carousel 
  FOR ALL 
  USING (auth.role() = 'authenticated');