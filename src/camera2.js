import { isCollidingWall } from "./mechanics"

export default function moveCamera(target, level) {
  let lastTargetPos = target.pos;
  let lerpTargetPos = target.pos;
  let lerpTime;

  camPos(target.pos);

  target.onUpdate(() => {
    let halfScreenHeight = height() / 2;
    let halfScreenWidth = width() / 2+level.tileWidth();

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
    /// DEBUGGING
    // debug.log(level.levelWidth() / 2 +","+ (level.levelWidth() > halfScreenWidth).toString())
    // drawRect({
    //   width: level.levelWidth(),
    //   height: 240,
    //   pos: vec2(-level.tileWidth() / 2, 20),
    //   color: RED,
    //   outline: { color: BLACK, width: 4 },
    // })
    // drawRect({
    //   width: width()/2,
    //   height: 240,
    //   pos: vec2(0, 20),
    //   color: BLUE,
    //   fill: false,
    //   outline: { color: BLACK, width: 4 },
    // })
    // drawRect({
    //   width: level.levelWidth()/2,
    //   height: 240,
    //   pos: vec2(0, 20),
    //   color: YELLOW,
    //   outline: { color: BLACK, width: 4 },
  // })

    lerpTargetPos.y = target.pos.y;

    lerpTargetPos.y = Math.min(
      lerpTargetPos.y,
      level.levelHeight() - halfScreenHeight + level.tileHeight() / 2
    );

    lerpTime = target.pos.y > lastTargetPos.y ? 1 : 2;

    camPos(camPos().lerp(lerpTargetPos, 1 / lerpTime));
  });
}
