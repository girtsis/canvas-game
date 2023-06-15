import { Scene, GameObjects } from "phaser";
import atlasJSON from '../tiles.json';
import mapJSON from './assets/map.json';
import atlas from './assets/0x72_DungeonTilesetII_v1.4.png';
import { Player } from "./Player";
import { Goblin } from "./Goblin";
export class MainScene extends Scene{
    map;
    preload(){
        this.load.atlas('atlas', atlas, atlasJSON);
        this.load.tilemapTiledJSON('map', mapJSON);

    }
    create(){
        
        this.map = this.make.tilemap({ key: 'map' });

        // The first parameter is the name of the tileset in Tiled and the second parameter is the key
        // of the tileset image used when loading the file in preload.
        const tiles = this.map.addTilesetImage('0x72_DungeonTilesetII_v1.4', 'atlas');
        this.cameras.main.setZoom(1);
        console.log(this.cameras.main);
        // You can load a layer from the map using the layer name from Tiled, or by using the layer
        // index (0 in this case).
        const layer = this.map.createLayer(0, tiles, 0, 0);
        console.log(this.map, layer);
        this.map.layers[0].tilemapLayer.setCollision(-1);
        let debugGraphics = this.add.graphics().setAlpha(0.4);
        
        // layer.renderDebug(debugGraphics, {
        //     tileColor: new Phaser.Display.Color(40, 255, 48, 255),
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        // })
        
        console.log(this.physics);
        
        let player = this.add.existing(new Player(this, 100, 100));
        let goblin = this.add.existing(new Goblin(this, 150, 100));
        this.cameras.main.startFollow(player);
        this.physics.add.collider(player, this.map.layers[0].tilemapLayer);
        const layer2 = this.map.createLayer(1, tiles, 0, 0);
        console.log(this);
    }
    update(){
    }
}