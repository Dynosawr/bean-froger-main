// seperate player component from generateLevel() for easier management
const FALL_DEATH = 2400;

export default function playerComp() {
  return [
    sprite("bean"),
    pos(0, 0),
    area(),
    body({
      jumpForce: 1320
    }),
    anchor("bot"),
    "player",
    "light",
    {
      moveDirection: 0,
      moveSpeed: 480,
      canPick: false,
      curDragging: null,
    },
    {
      update() {
        this.move(this.moveDirection * this.moveSpeed, 0)
        // Check fall death
        if (this.pos.y >= FALL_DEATH) {
          go("game")
        }
      },
      add() {
        // Jump through platforms
        this.onBeforePhysicsResolve((collision) => {
          if (["platform", "soft"].some(tag => collision.target.is(tag)) && this.isJumping() && collision.isTop()) {
            collision.preventResolution()
          }
        })
      },
    }
  ]
}