import { Facebook, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

export function SocialIcon({ id }: { id: string }) {
  const props = { size: 16, strokeWidth: 1.5, "aria-hidden": true as const };
  if (id === "linkedin") return <Linkedin {...props} />;
  if (id === "youtube") return <Youtube {...props} />;
  if (id === "facebook") return <Facebook {...props} />;
  return <ArrowUpRight {...props} />;
}
