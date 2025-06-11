import { redirect, RedirectType } from "next/navigation";

export default function Home() {
  redirect("/books", RedirectType.replace);
}
