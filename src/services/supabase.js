import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://chknworlnkhwjeyscqon.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoa253b3Jsbmtod2pleXNjcW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NjE5MTQsImV4cCI6MjAwOTQzNzkxNH0.fApFVhNvpCSPe-d9zCY5FewjXDGOV3WnjQy3Wh_UA68";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
