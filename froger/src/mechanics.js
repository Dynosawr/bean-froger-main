// Custom components

// custom component controlling enemy patrol movement
export function patrol(speed = 60, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area", "tile"],
    update() {
      if (this.pos.x < 0 || this.pos.x > this.getLevel().levelWidth()) {
        dir = -dir
      }
      this.move(speed * dir, 0)
    },
    add(){
      this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
      })
    }
  }
}

// Custom functions

// custom function that detect whether sourde is colliding any walls
export function isCollidingWall(source) {
  return source.getCollisions().some((col) => col.isLeft() || col.isRight() && !["platform", "soft", "light"].some(tag => col.target.is(tag)))
}

// level generator
export function generateLevel(levelWidth) {
  return addLevel(["-".repeat(levelWidth)], {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "=": () => [
        sprite("grass"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        tile(),
        patrol(),
        "platform",
      ],
      "-": () => [
        sprite("steel"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
      ],
    }
  });
}

// A custom component for handling drag & drop behavior
function drag() {
  let curDragging = false;
  let tileWidth = 64;
  let tileHeight = 64;

  return {
    id: "drag",
    require: ["pos", "area", "tile"],
    pick() {
      curDragging = true;
      this.trigger("drag");
    },
    update() {
      if (curDragging) {
        this.pos = toWorld(mousePos())
        this.pos = vec2(
          Math.floor(this.pos.x / tileWidth) * tileWidth,
          Math.floor(this.pos.y / tileHeight) * tileHeight
        );
        this.trigger("dragUpdate");
      } else if (this.isClicked()) {
        this.pick();
      }
    },
    add() {
      onMouseRelease(() => {
        if (curDragging) {
          this.trigger("dragEnd");
          curDragging = false;
        }
        this.level = this.getLevel();
        tileWidth = this.level.tileWidth();
        tileHeight = this.level.tileHeight();
      });
    },
    onDrag(action) {
      return this.on("drag", action);
    },
    onDragUpdate(action) {
      return this.on("dragUpdate", action);
    },
    onDragEnd(action) {
      return this.on("dragEnd", action);
    },
    curDragging() {
      return curDragging;
    },
  };
}


export function totemComp() {
  return [
    sprite("totem"),
    area({ cursor: "grab" }),
    body(),
    anchor("center"),
    tile(),
    drag(),
    "totem",
    {
      level: null,
    },
    {
      add() {
        this.onDrag(() => {
          this.unuse("body");
          this.unuse("follow");
        })
        this.onDragEnd(() => {
          this.use(body());
        })
        this.onGround(() => {

          if (!this.curDragging()) {
            this.use(follow(this.curPlatform(), vec2(0, -64)))
            if (this.level) {
              for (let i = -1; i <= 1; i += 2) {
                this.level.spawn("=", this.level.pos2Tile(this.pos).add(vec2(i, -1)));
              }
            }
          }
        })
      }
    }
  ]
}