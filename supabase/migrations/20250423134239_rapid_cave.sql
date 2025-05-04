/*
  # Initial Schema Setup for School CMS

  1. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `date` (date)
      - `time` (time)
      - `location` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `category` (text)
      - `created_at` (timestamp)
      
    - `programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `features` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `staff`
      - `id` (uuid, primary key)
      - `name` (text)
      - `position` (text)
      - `image_url` (text)
      - `bio` (text)
      - `created_at` (timestamp)
      
    - `settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  date date NOT NULL,
  time time,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  features text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  image_url text,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- News policies
  EXECUTE format('CREATE POLICY "Public users can view published news" ON news FOR SELECT USING (true)');
  EXECUTE format('CREATE POLICY "Authenticated users can manage news" ON news FOR ALL USING (auth.role() = ''authenticated'')');

  -- Events policies
  EXECUTE format('CREATE POLICY "Public users can view events" ON events FOR SELECT USING (true)');
  EXECUTE format('CREATE POLICY "Authenticated users can manage events" ON events FOR ALL USING (auth.role() = ''authenticated'')');

  -- Gallery policies
  EXECUTE format('CREATE POLICY "Public users can view gallery" ON gallery FOR SELECT USING (true)');
  EXECUTE format('CREATE POLICY "Authenticated users can manage gallery" ON gallery FOR ALL USING (auth.role() = ''authenticated'')');

  -- Programs policies
  EXECUTE format('CREATE POLICY "Public users can view programs" ON programs FOR SELECT USING (true)');
  EXECUTE format('CREATE POLICY "Authenticated users can manage programs" ON programs FOR ALL USING (auth.role() = ''authenticated'')');

  -- Staff policies
  EXECUTE format('CREATE POLICY "Public users can view staff" ON staff FOR SELECT USING (true)');
  EXECUTE format('CREATE POLICY "Authenticated users can manage staff" ON staff FOR ALL USING (auth.role() = ''authenticated'')');

  -- Settings policies
  EXECUTE format('CREATE POLICY "Authenticated users can manage settings" ON settings FOR ALL USING (auth.role() = ''authenticated'')');
END $$;