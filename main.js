
/* getRandomInt produces an integer between [0 - int(max - 1)] */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* creates class Food(name, purchase, sell) where name is a str, purchase and sell are numbers*/
class Food{
    constructor(name, purchase, sell) {
        this.name = name;
        this.purchase = purchase;
        this.sell = sell;
    }
}

var coffee = new Food('coffee', 1, 1.25)
var tea = new Food('tea', 0.95, 1.15)
var donut = new Food('donut', 1.25, 1.75)
var soup = new Food('soup', 4, 5)
var apple = new Food('apple', 0.65, 0.75)

/* creates class Shop*/
class Shop {
    constructor(name) {
        this.name = name;
        this.lstItems = []
        this.money = 0;
    }
}

var cnd = new Shop('Math CnD')
cnd.lstItems.push(coffee, tea, donut, soup, apple)


/* tobuylstfunc takes in shopname, which is a Shop class. It produces an array of min 1 and max (shopname.lstItems.length) items from shopname.lstItems*/
function tobuylstfunc(shopname) {
    var i;
    var maxnum = getRandomInt(shopname.lstItems.length);
    if (maxnum==0) {
        maxnum++
    }
    var lst = [];
    for (i=1; i<=maxnum; i++) {
        lst.push(shopname.lstItems[getRandomInt(shopname.lstItems.length - 1)]);
    }
    return lst
}

/* creates class Person, with attributes preference and tobuylst. preference is an array of four digits, from 0 - 5. tobuylst is an array from tobuylstfun() */

// Constructing a Person object:
// Inside of a Scene (likely MenuScene.create()), instantiate as follows:
// p1 = new Person(this.add.image(X,Y,'IMGNAME').setOrigin(0).setInteractive())
// This way, the Person object holds a pointer to an image in the scene.
class Person {
    constructor(charimg) {
        this.preference = [getRandomInt(6), getRandomInt(6), getRandomInt(6), getRandomInt(6)];
        this.charimg = charimg
    }
}

var p1 = new Person();

class MenuScene extends Phaser.Scene {

    constructor ()
    {
        super({
            key: 'MenuScene',
            active: true,
        });
    }

    init(){
        console.log('initing menuscene');
    }

    preload ()
    {
        this.load.image('NBlueMenu', 'assets/NBlueMenu.png');
        this.load.image('coin', "assets/coin.png");
        

        this.scene.setVisible('MenuScene')
        this.scene.setVisible('coin')
    }

    create ()
    {
        this.add.image(75, 20, "coin")
        let vertmenu = this.add.image(200, 125, 'NBlueMenu').setOrigin(0).setInteractive();
        this.input.on('pointerup', () => {
            this.scene.pause('MenuScene')
            this.scene.wake('MainScene')
            this.scene.bringToTop('MainScene');
        })

        this.input.keyboard.on('keyup_B', ()=>{
            this.scene.switch('MenuScene', 'MainScene')
            this.scene.bringToTop('MainScene');
        })
    }

}


class testperson extends Phaser.GameObjects.Image{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
    }
    movedown(){
        this.y += 1
    }
    update(){
        this.y += 1
    }
}


class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }
    preload (){
        this.load.image("repeating-background", "assets/floor_tile.png");
        this.load.image("cashier", "assets/cashier.png");
        this.load.image("customer", "assets/customer.png");
        this.load.image("floor_tile", "assets/tile024.png");
        this.load.image("hcounter", "assets/hcounter.png");
        this.load.image("mcounter", "assets/mcounter.png");
        this.load.image("plant", "assets/plant.png");
        this.load.image("lvcounter", "assets/lvcounter.png");
        this.load.image("rvcounter", "assets/rvcounter.png");
        this.load.image('apple_icon', "assets/food.png");
        this.load.image('coin', "assets/coin.png");

        this.scene.pause('MenuScene')
        this.scene.bringToTop('MainScene')
    }

    create ()
    {
        const {width, height} = this.sys.game.config;
        const bg = this.add.tileSprite(0, 0, width, height, "floor_tile")
        bg.setOrigin(0, 0)

        
        this.add.image(400, 100, "hcounter");
        this.add.image(75, 325, "lvcounter");
        this.add.image(725, 300, "rvcounter");
        this.add.image(400, 410, "mcounter");
        this.add.image(400, 300, "mcounter");
        this.add.image(75, 100, "plant");
        this.add.image(725, 100, "plant");
        this.add.image(75, 550, "cashier");
        this.add.image(400, 550, "cashier");

        const apple = this.add.image(75,250,'apple_icon').setInteractive();

        apple.on('pointerup', () => {})
        // const apple = this.add.image(0,0,'apple_icon').setOrigin(0).setInteractive();
        //var testp = new testperson(this.add.image(0,0,'apple_icon').setOrigin(0).setInteractive());
        // pass in `this`, which is the scene object.
        // testp = new testperson(this,0,0,'apple_icon').setOrigin(0).setInteractive();
        // this.testp = this.add.existing(testp);
        //this.testp = this.add.existing(new testperson(this,0,0,'apple_icon').setOrigin(0).setInteractive());
        
        //this.add.existing(testp);

        // apple.on('pointerup', () => {
        //     console.log("pooopy")

        // })

        /*
        this.input.keyboard.on('keyup_S', () => {
            testp.movedown()
        })
        */

        this.input.on('pointerup', (pointer) => {
            //this.scene.switch('MainScene','MenuScene')
            this.scene.pause('MainScene')
            this.scene.wake('MenuScene')
            this.scene.bringToTop('MenuScene');
        })

        this.add.image(75, 20, "coin")

    }

    update (){
        
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#222222",
    parent:"game-continer",
    scene: [MainScene, MenuScene]
};

var game = new Phaser.Game(config);

