import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function DELETE(req, context) {

  // ✅ IMPORTANT FIX (Next.js 15)
  const { id } = await context.params;

  const { error } = await supabase
    .from("userdetail")   // ⚠ apna table name
    .delete()
    .eq("id", id);        // ⚠ id column name

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted Successfully" });
}