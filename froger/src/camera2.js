import { isCollidingWall } from "./mechanics"

export default function moveCamera(target, level) {
  let lastTargetPos = target.pos;
  let lerpTargetPos = target.pos;
  let lerpTime;

  camPos(target.pos);

  target.onUpdate(() => {
    let halfScreenHeight = height() / 2;
    let halfScreenWidth = width() / 2;

    if (level.levelWidth() > halfScreenWidth) {
      if (target.pos.x !== lastTargetPos.x && !isCollidingWall(target) && level.levelWidth() > halfScreenWidth) {
        lerpTargetPos.x = target.pos.x;
        lerpTime = 1;
      }
      lerpTargetPos.x = Math.max(
        Math.min(
          lerpTargetPos.x,
          level.levelWidth() - halfScreenWidth + level.tileWidth() / 2
        ),
        halfScreenWidth - level.tileWidth() / 2
      );
    } else {
      lerpTargetPos.x = level.levelWidth() / 2;
      lerpTime = 1;
    }

    lerpTargetPos.y = target.pos.y;

    lerpTargetPos.y = Math.min(
      lerpTargetPos.y,
      level.levelHeight() - halfScreenHeight + level.tileHeight() / 2
    );

    lerpTime = target.pos.y > lastTargetPos.y ? 1 : 2;

    camPos(camPos().lerp(lerpTargetPos, 1 / lerpTime));
  });
}
