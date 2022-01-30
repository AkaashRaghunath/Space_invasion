// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property
  bulletSpeed:number=500;

  @property
  isEn_bullet:boolean=false;

    onLoad () {
      cc.director.preloadScene('mainmenu');
    }

    start () {

    }

    update (dt) {
        this.node.setPosition(this.node.position.x,this.node.position.y += this.bulletSpeed*dt);
       if(this.isEn_bullet==false){
            if(this.node.position.y<=-(this.node.parent.getContentSize().height)){
                this.node.destroy();
            }
          }
    }
}
