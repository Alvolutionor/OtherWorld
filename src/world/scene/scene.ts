import Phaser from "phaser";
import { EventAcrossComponents } from "@/world/interface/WorldInterface";
import { Ref } from "react";
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
  GameEvent?: Ref<EventAcrossComponents | null>;
  map_height?: number;
  map_width?: number;
  map_json?: world_map;
  objects: objectTuple[];
  constructor(
    config: Phaser.Types.Scenes.SettingsConfig,
    id: string,
    GameEvent: Ref<EventAcrossComponents | null>
  ) {
    super(config);
    this.map_file = "tst/" + id + ".json";
    this.GameEvent = GameEvent;
    this.objects = [];
  }
  // load the scene with id
  // Data structure:
  // size:

  preload() {
    console.log("preload");
    this.load.spritesheet("player", "assets/player.png",{ frameWidth:32, frameHeight:64}, )
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

    const player = this.physics.add.sprite(100, 450, 'player');
    player.depth = 3
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    computer.depth = 2;
    computer.setScale(2);
    //{ cursor: 'pointer' } for pointer when hover
    computer.setInteractive({ cursor: "pointer" });

    computer.on("pointerover", () => {});

    computer.on("pointerdown", (e: any) => {
      background.setAlpha(0.5);
      computer.setAlpha(0.5);
      (this.GameEvent as any).current = {
        EventName: "WorldMenu",
      };
      // console.log(e);
    });
  }
  update() {
    // console.log(this.GameEvent);
    if ((this.GameEvent as any)?.current?.EventName == "gameInterface") {
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
