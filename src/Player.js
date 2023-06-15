import Phaser from 'phaser';
import { Arrow } from './Arrow';
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'knight_m_idle_anim_0');
        scene.physics.add.existing(this);
        this.setName('Player');
        this.body.maxSpeed = 100;
        this.lastShot = 0;
        this.body.setDrag(200)

        this.arrowsLeft = 3;
        this.arrows = [];

        this.anims.create({
            key: 'knight_m_idle',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'knight_m_idle_anim_',start:0, end: 3}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'knight_m_run',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'knight_m_run_anim_',start:0, end: 3}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'knight_m_hit',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'knight_m_hit_anim_',start:0, end: 0}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.play('knight_m_idle');
      

        this.keys = {
            a: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            w: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            space: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        }
        
        scene.input.on('pointermove', (pointer) =>
        {
            this.pointer = {x: pointer.worldX, y: pointer.worldY};
            
        });

        this.text = scene.add.text(scene.cameras.main.centerX - scene.cameras.main.width/2, scene.cameras.main.centerY - scene.cameras.main.height/2)
        .setText('Arrows - ' + this.arrowsLeft)
        .setScrollFactor(0,0)
        this.text.setShadow(1, 1, '#000000', 2); 

        scene.physics.add.collider(this.arrows, this, (collision) => {
            this.arrowsLeft += 1;
            this.text.setText('Arrows - ' + this.arrowsLeft);
            this.arrows.splice(this.arrows.indexOf(collision), 1);
            
            collision.destroy();
        });
    }

    isMoving(){
        return this.keys.a.isDown || this.keys.d.isDown || this.keys.s.isDown || this.keys.w.isDown;
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.keys.a.isDown){
            this.body.velocity.x = -this.body.maxSpeed;
        }
        if(this.keys.d.isDown){
            this.body.velocity.x = this.body.maxSpeed;
        }
        if(this.keys.s.isDown){
            this.body.velocity.y = this.body.maxSpeed;
        }
        if(this.keys.w.isDown){
            this.body.velocity.y = -this.body.maxSpeed;
        }
        if(this.keys.space.isDown){
            if(time-this.lastShot > 1000){
                if(this.arrowsLeft > 0){
                    let arrow = this.scene.add.existing(new Arrow(this.scene, this.x, this.y, this.pointer));
                    this.arrows.push(arrow);
                    this.lastShot = time;
                    this.arrowsLeft -= 1;
                    this.text.setText('Arrows - ' + this.arrowsLeft);
                }
            }
        }

        if(this.keys.a.isDown){
            this.setFlipX(true);
        }
        if(this.keys.d.isDown){
            this.setFlipX(false);
        }
        if(this.isMoving()) {
            this.anims.play('knight_m_run', true);
        } else {
            this.anims.play('knight_m_idle', true);
        }
        if(this.body.blocked.down){
            //console.log(this.body);
        }
    }
}