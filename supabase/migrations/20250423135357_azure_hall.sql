/*
  # Add Storage Bucket for File Uploads

  1. Create public bucket for storing uploaded files
  2. Enable public access to files
  3. Add storage policies for authenticated users
*/

-- Enable storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'public' );

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'public' );

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated users can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'public' );

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'public' );