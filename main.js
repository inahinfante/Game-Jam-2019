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

/* creates class Shop*/
class Shop {
    constructor(name) {
        this.name = name;
        this.lstItems = []
        this.money = 0;
    }
}

var cnd = new Shop('Math CnD')
cnd.lstItems.push(coffee, tea, donut, soup)


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
class Person {
    constructor() {
        this.preference = [getRandomInt(6), getRandomInt(6), 
        getRandomInt(6), getRandomInt(6)];
        this.tobuylst = tobuylstfunc(cnd);
    }
}

var p1 = new Person();




class MenuScene extends Phaser.Scene {

    constructor ()
    {
        super({
            key: 'MenuScene',
        });
    }

    preload ()
    {
        this.load.image('VertMenu', 'assets/VertMenu.png');
        this.scene.setVisible('MenuScene')
    }

    create ()
    {
        let vertmenu = this.add.image(128,128, 'VertMenu' ).setOrigin(0).setInteractive();
        this.input.on('pointerup', () => {
            console.log(vertmenu)
            this.scene.start('MainScene')
        })
    }

}

class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }
    preload (){
        this.load.image("repeating-background", "assets/floor_tile.png");
        this.load.image('apple_icon', "assets/food.png");

        this.load.image("cashier", "assets/cashier.png");
        this.load.image("customer", "assets/customer.png");
        this.load.image("floor_tile", "assets/tile024.png");
        this.load.image("hcounter", "assets/hcounter.png");
        this.load.image("mcounter", "assets/mcounter.png");
        this.load.image("plant", "assets/plant.png");
        this.load.image("lvcounter", "assets/lvcounter.png");
        this.load.image("rvcounter", "assets/rvcounter.png");
    }

    create ()
    {
        const {width, height} = this.sys.game.config;
        const bg = this.add.tileSprite(0, 0, width, height, "floor_tile")
        bg.setOrigin(0, 0)
        const apple = this.add.image(0,0,'apple_icon').setOrigin(0).setInteractive();

        apple.on('pointerup', () => {
            console.log("pooopy")

        })

        this.input.on('pointerup', (pointer) => {
            this.scene.start('MenuScene')
        })
        this.add.image(400, 75, "hcounter");
        this.add.image(75, 300, "lvcounter");
        this.add.image(725, 275, "rvcounter");
        this.add.image(400, 385, "mcounter");
        this.add.image(400, 275, "mcounter");
        this.add.image(75, 75, "plant");
        this.add.image(725, 75, "plant");
        this.add.image(75, 525, "cashier");
        this.add.image(400, 525, "cashier");

    }

    update ()
    {
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

