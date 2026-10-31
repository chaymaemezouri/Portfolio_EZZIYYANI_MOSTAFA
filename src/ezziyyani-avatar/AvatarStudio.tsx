import { AvatarRoom } from "./AvatarRoom";
import { AvatarStage } from "./AvatarStage";

export function AvatarStudio() {
  return (
    <section className="ez-avatar-studio">
      <AvatarStage />
      <AvatarRoom />
    </section>
  );
}
