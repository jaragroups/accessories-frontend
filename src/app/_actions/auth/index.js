import { deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();

  localStorage.removeItem("auth");
  redirect("/login");
}
