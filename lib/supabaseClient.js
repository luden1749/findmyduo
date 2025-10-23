import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wztrjohkutgstpsljvmm.supabase.co"; // 🔥 ton URL Supabase
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dHJqb2hrdXRnc3Rwc2xqdm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTEwNzEsImV4cCI6MjA3NjcyNzA3MX0.SU-o8Ov6LsSa6A73d9MqeLtesAiDMzqwXItzYJoqS9U"; // 👈 tu vas la récupérer ci-dessous

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
