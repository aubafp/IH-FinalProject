const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZXJlemR0Z3F6bGh5amlhZXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExODQwMzIsImV4cCI6MjAyNjc2MDAzMn0.v19PnoEna5Mv6-Bjs88EzgDcmEWq99Y_sGHGFbbcgLQ'

const PROJECT_URL = 'https://kkerezdtgqzlhyjiaetq.supabase.co'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PROJECT_URL, API_KEY)
