import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ywkubdhespudvatsmpfi.supabase.co";   // must start with https://
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3a3ViZGhlc3B1ZHZhdHNtcGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTE0NDIsImV4cCI6MjA3OTEyNzQ0Mn0.c7zM_yugcGDwcsGtIYuGb_9pDDRFuljhIQ3qXTKO8jY";       // starts with "eyJhbGci..."

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
