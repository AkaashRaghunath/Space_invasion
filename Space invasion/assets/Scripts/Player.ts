// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

//movement
moveLeft:number=0;
moveRight:number=0;

// shoot
@property(cc.Prefab)
Pl_bullet:cc.Prefab = null;

// game over
@property(cc.Node)
gameover_scr:cc.Node=null;

// health
PlayerLife:number = 3;

@property(cc.Sprite)
healthbar:cc.Sprite=null;

// Audios
@property(cc.AudioClip)
shootSound:cc.AudioClip=null;

@property(cc.AudioClip)
hitSound:cc.AudioClip=null;

@property(cc.AudioClip)
DieSound:cc.AudioClip=null;

// spawn bullets
bullets(){
    var bullet=cc.instantiate(this.Pl_bullet);
    bullet.setPosition(this.node.position.x,this.node.position.y);
    this.node.parent.addChild(bullet);
    cc.audioEngine.playEffect(this.shootSound,false);
}

// shoot bullets outs when hit 'space'
shootbullets(event){
   

    switch(event.keyCode){
        case cc.macro.KEY.space:
            this.schedule(this.bullets, 0.4 , 1 , 0);
           
            break;
    }
}


movePlayer(event){
    switch(event.keyCode){
        case cc.macro.KEY.left:
            this.moveLeft=1;
            break;
        case cc.macro.KEY.right:
            this.moveRight=1;
            break;
    }
    
}
stopPlayer(event){
       switch(event.keyCode){
           case cc.macro.KEY.left:
               this.moveLeft=0;
               break;
            case cc.macro.KEY.right:
                this.moveRight=0;
                break;
       }
   }

   // collision detection
    onCollisionEnter(Other,Self){
        if(Other.tag==2){
           this.Gameover();
            
        }
        if(Other.tag==4){
            this.PlayerLife -= 1;
            Other.node.destroy();
            cc.audioEngine.playEffect(this.hitSound,false);
            this.healthbar.fillRange-=0.3;
            if(this.PlayerLife <= 0){
                this.healthbar.fillRange=0;
                this.Gameover();
            }
        }

    }

    Gameover(){
        cc.audioEngine.playEffect(this.DieSound,false);
        this.gameover_scr.active=true;
        this.node.destroy();
        this.node.parent.getComponent('GameManager').bgmOff();


    }

     onLoad () {
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.movePlayer,this);
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.stopPlayer,this);
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.shootbullets,this);
         
        
         cc.director.preloadScene('mainmenu');
         
     }

    start () {
            this.gameover_scr.active=false;
            
    }

     update (dt) {
         if(this.moveLeft==1 && this.node.position.x > -315){
             this.node.setPosition(this.node.position.x-=300*dt,this.node.position.y);
         }
         if(this.moveRight==1 && this.node.position.x < 315){
            this.node.setPosition(this.node.position.x+=300*dt,this.node.position.y);
        }
     }
}
