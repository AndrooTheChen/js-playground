import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Okay to expose to the client.
const supabaseUrl = "https://rtcvyajlixqvqzyywuyx.supabase.co"
const supabaseAnonKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Y3Z5YWpsaXhxdnF6eXl3dXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MzcyNTgsImV4cCI6MjA1NjExMzI1OH0.vqq92FM3xVcxtXlRBmchlDVV-bd6DIvn9hQlyGTa3Bk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
