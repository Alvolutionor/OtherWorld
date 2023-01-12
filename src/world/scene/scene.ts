import Phaser from "phaser";
import fs from "node:fs";
import $ from "jquery";
import { EventAcrossComponents } from "@/world/interface/WorldInterface";

interface world_map {
  length: number;
  width: number;
  world_object: world_object[]; //location and objectid
}
interface world_object {
  location: number[][][];
  object_id: number[];
}

interface object_detail {
  length: number;
  width: number;
  world_object: { location: number[][][]; object_id: string }[];
}
type objectTuple = [string, Phaser.GameObjects.TileSprite | Phaser.GameObjects.Image];
export default class InitScene extends Phaser.Scene {
  // scene_settings: Phaser.Scenes.ScenePlugin;
  map_file: string;
  setGameEvent: Function;
  reactEvent: EventAcrossComponents;
  map_height?: number;
  map_width?: number;
  map_json?: world_map;
  objects: objectTuple[];
  constructor(
    config: Phaser.Types.Scenes.SettingsConfig,
    id: string,
    setGameEvent: Function,
    reactEvent: EventAcrossComponents
  ) {
    super(config);
    this.map_file = "tst/" + id + ".json";
    this.setGameEvent = setGameEvent;
    this.reactEvent = reactEvent;
    this.objects = [];
  }
  // load the scene with id
  // Data structure:
  // size:

  preload() {
    console.log("preload");
    this.load.spritesheet("tile", "assets/ground_tile.png", { frameWidth: 48, frameHeight: 30 });
    this.load.spritesheet("computer", "assets/computer.png", { frameWidth: 16, frameHeight: 21 });

    // this.load_scene_resource_with_id(this.map_file)
    // this.load_user()
  }

  create() {
    var platforms = this.physics.add.staticGroup();
    // this.map_json!.world_object.forEach((element:world_object) => {
    //   // this.add.image()
    // })
    const background = this.add.tileSprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight,
      "tile"
    );
    this.objects.push(["background", background]);
    background.depth = 1;

    const computer = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "computer");
    this.objects.push(["computer", computer]);

    computer.depth = 2;
    computer.setScale(2);
    //{ cursor: 'pointer' } for pointer when hover
    computer.setInteractive({ cursor: "pointer" });

    computer.on("pointerover", () => {});

    computer.on("pointerdown", (e: any) => {
      background.setAlpha(0.5);
      computer.setAlpha(0.5);
      this.setGameEvent({
        EventName: "clickOnComputer",
      });
      console.log(e);
    });
  }
  update() {
    if (this.reactEvent.EventName == "") {
      for (let object of this.objects as objectTuple[]) {
        object[1].setAlpha(1);
      }
    }
    // load_scene_resource_with_id = async(map_file:string)=>{
    //   $.ajax(URL="asset",{type:"GET",dataType: "json",async:false, success:(response)=>{this.map_json  = JSON.parse(response)}}); //fs.readFileSync(map_file,{encoding:'utf8', flag:'rw'})

    //   console.log("loaded")
    //   this.map_json!.world_object.forEach((element:world_object) => {
    //     const object_detail:object_detail = this.map_object_id_to_assets(element.object_id,"assets_dict.json")
    //     this.load.spritesheet('tile',
    //       object_detail.path
    //       , { frameWidth: 16, frameHeight: 16 }
    //     )
    //   })

    //   // await fetch(map_file)
    //   // .then((response) =>response.json())
    //   // .then((data) => { console.log(this); this.map_json = data;});
    //   // this.map_height = this.map_json!.length
    //   // this.map_width = this.map_json!.width

    //   //for each assemble all the object i, then fetch all the sprite, may need optimize.
    //   //this.map_json.forEach(element => {
    //   console.log("loaded")
    //   console.log(this)
    //   // });

    // }
    // map_object_id_to_assets = (object_id:string,dict_raw:string)=>{
    //   const obj_dict = JSON.parse(fs.readFileSync(dict_raw,{encoding:'utf8', flag:'rw'}));
    //   return  obj_dict[object_id]
    // }
    // load_user = async()=>{
    // }

    //preload should have a file which match object id to sprite and position
  }
}
