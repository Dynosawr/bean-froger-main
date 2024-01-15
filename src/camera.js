import { isCollidingWall } from "./mechanics"

export default function moveCamera(target, level) {
  let lastTargetPos = target.pos;
  let curTween;
  const tweenParams = {
    targetPos: target.pos,
    duration: 1,
  };

  camPos(target.pos);

  const halfScreenHeight = height() / 2;
  const halfScreenWidth = width() / 2;

  target.onUpdate(() => {

    if (
      level.levelWidth() > halfScreenWidth
    ) {
      if (target.pos.x !== lastTargetPos.x && !isCollidingWall(target)) {
        tweenParams.targetPos = target.pos
        tweenParams.duration = 1;
      }
      tweenParams.targetPos.x = Math.max(
        Math.min(
          tweenParams.targetPos.x,
          level.levelWidth() - halfScreenWidth
        ),
        halfScreenWidth
      );
    }
    tweenParams.targetPos.y = target.pos.y;
    
    tweenParams.targetPos.y = Math.min(
      tweenParams.targetPos.y,
      level.levelHeight() - halfScreenHeight
    );

    tweenParams.duration = target.pos.y > lastTargetPos.y ? 0.5 : 2;

    if (curTween) curTween.cancel();

    curTween = tween(
      camPos(),
      tweenParams.targetPos,
      tweenParams.duration,
      (p) => camPos(p),
      easings.easeOutSine
    );

    lastTargetPos = target.pos;
  });
}

