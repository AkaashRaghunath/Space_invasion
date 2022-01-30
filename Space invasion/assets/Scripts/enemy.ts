// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

//ships shoot bullets    
@property(cc.Prefab)
En_bullets:cc.Prefab = null;
@property
timeInterval:number = 1;
@property
bulletFrequency:number = 1;

//ship movements
@property
duration:number = 0.5;
@property
moveX:number = 200;
@property
moveY:number = 75;

//Explosion
explosionAnim:boolean = true;
@property(cc.AudioClip)
explosionSound:cc.AudioClip;


    // move enemy
    enemyMovement(){
        var moveLeft=cc.moveBy(this.duration,cc.v2(-this.moveX,-this.moveY));
        var moveRight=cc.moveBy(this.duration,cc.v2(this.moveX,-this.moveY));
        return cc.repeatForever(cc.sequence(moveLeft,moveRight));
    }

// explosionAnim
 
 explosionanim() {
    if(this.explosionAnim=true){
        this.node.stopAllActions();
        this.explosionAnim=false;
        this.node.getComponent(cc.Animation).play()
        cc.audioEngine.playEffect(this.explosionSound,false);
    }
    
}

// shoot bullets
    spawnBullets(){
        var bullet=cc.instantiate(this.En_bullets);
        bullet.setPosition(this.node.position.x,this.node.position.y);
        this.node.parent.addChild(bullet);
        
    }

    
    onLoad () {
        this.schedule(this.spawnBullets,this.bulletFrequency,cc.macro.REPEAT_FOREVER,this.timeInterval);
        this.node.runAction(this.enemyMovement());

        cc.director.preloadScene('mainmenu')
    }

    // collision detection
      onCollisionEnter(Other,Self){
          if(Other.tag==3){
              Other.node.destroy();
              this.explosionanim();
            this.node.parent.getComponent('GameManager').addScore();
          }
      }

      enemyDie(){
          this.node.destroy();
      }
    start () {
        
    }

     update (dt) {
         if(this.node.position.y<=-(this.node.parent.getContentSize().height)){
             this.node.destroy();
             cc.director.loadScene('mainmenu');
         }
     }
}
