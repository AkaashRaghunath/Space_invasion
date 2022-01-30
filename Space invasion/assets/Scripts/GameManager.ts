// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    // score elements
    @property(cc.Label)
    scoreLabel:cc.Label = null;
    scoreCount:number=0;

    
    // game win
    
    @property(cc.Node)
    win_scr:cc.Node=null;
    EnemyCount:number=10;
    @property(cc.Node)
    bgm:cc.Node;
    @property(cc.AudioClip)
    winSound:cc.AudioClip;


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw=true;
        //manager.enabledDrawBoundingBox=true;

        cc.director.preloadScene('spaceInvasion');
        
    }
    
    Gameover_restart(event){
        cc.director.loadScene('mainmenu')

    }
    
    // add score when enemy is down
    addScore(){
        this.scoreCount += 100;
        this.scoreLabel.string="score: "+this.scoreCount.toString();
        this.EnemyCount -=1;
    }
    
    bgmOff(){
        this.bgm.active=false;
    }
    start () {
        this.win_scr.active=false;
    }

     update (dt) {
        if(this.EnemyCount<=0){
            this.win_scr.active=true;
            this.bgmOff();
            
         }
     }
}
