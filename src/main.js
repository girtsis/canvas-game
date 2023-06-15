
import { MainScene } from './MainScene';
import Phaser from 'phaser';
import './style.css'

var config = {
  type: Phaser.CANVAS,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
         //debug: true
      }
  },
  scene: new MainScene()
};

var game = new Phaser.Game(config);
