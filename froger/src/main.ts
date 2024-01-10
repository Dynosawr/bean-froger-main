import kaboom from "kaboom";
import "kaboom/global";
import loadAssets from "./assets"
import handleControls,{keyMap} from "./controls"
import moveCamera from "./camera2"
import {generateLevel, totemComp} from "./mechanics"
import playerComp from "./player"


// initialize context
kaboom({
  background: [0, 100, 200]
});

// load assets
loadAssets()

setGravity(3200)



// define some constants
const FALL_DEATH = 2400

var coins = 0

scene(
  "game",()=>{

  const level = generateLevel(15)
    const player = level.spawn(playerComp(),level.numColumns()/2,level.numRows()-1)
level.spawn(totemComp(),level.numColumns()/2,level.numRows()-2)
    handleControls(player,keyMap)
    moveCamera(player,level)
  })
go("game")