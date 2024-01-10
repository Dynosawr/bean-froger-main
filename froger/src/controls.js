export const keyMap = {
  left:["a","left"],
  right:["d","right"],
  jump:["w","space","up"],
  fullscreen:["f"]
}
  

export default function handleControls(player,keyMap) {

  onKeyPress((key) => {
    if (keyMap.jump.includes(key)) {
      player.jump();
    }
  });


  onKeyDown((key) => {
    const isJumping = player.isJumping();
    const isRightKey = keyMap.right.includes(key);
    const isLeftKey = keyMap.left.includes(key);

    player.moveDirection = (isJumping ? -0.5 : -1) * (isLeftKey - isRightKey);
  });


  onKeyRelease((key) => {
    const isRightKey = keyMap.right.includes(key);
    const isLeftKey = keyMap.left.includes(key);
    if (isRightKey||isLeftKey) {
      player.moveDirection = 0;
    }
  });

  onGamepadButtonPress("south", () => {
    player.jump();
  });

  onGamepadStick("left", (vector) => {
    player.moveDirection = (player.isJumping() ? 0.5 : 1) * vector.x;
  });

  onKeyPress("f", () => {
    setFullscreen(!isFullscreen());
  });


}