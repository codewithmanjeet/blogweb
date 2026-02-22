import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, message, skill } = body;

    const { data, error } = await supabase
      .from("userdetail")
      .insert([
        {
          name,
          email,
          phone,
          message,
          skill,
        },
      ]);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Data saved successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server Error" }),
      { status: 500 }
    );
  }
}