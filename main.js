/* getRandomInt produces an integer between [0 - int(max - 1)] */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* creates class Shop*/
class Shop {
    constructor(name) {
        this.name = name;
        this.lstItems = []
        this.money = 0;
    }
}

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

class MenuScene extends Phaser.Scene {

    constructor ()
    {
        super({
            key: 'MenuScene',
        });
    }

    init(data){
        this.FoodObj = data.input.gameObject
        console.log('menu init, gameObj is ', this.FoodObj)
    }

    preload ()
    {
        this.load.image('NBlueMenu', 'assets/NBlueMenu.png');
        this.scene.setVisible('MenuScene')

        this.load.image('exitbutton', 'assets/redboxCross.png');
        this.scene.setVisible('exitbutton')
    }

    create (data)
    {
        this.add.image(200, 125, 'NBlueMenu').setOrigin(0).setInteractive();
        let xbutt = this.add.image(575, 110, 'exitbutton').setOrigin(0).setInteractive();
        xbutt.on('pointerup', ()=>{
            this.scene.pause('MenuScene')
            this.scene.wake('MainScene')
            this.scene.bringToTop('MainScene');
        })
        
        console.log('in create in menu')
        this.input.on('pointerup', () => {
            console.log(data)
        })

        // Make new image using FoodObj texture key
        this.add.image(300,300,this.FoodObj.texture.key);

        this.add.text(300, 150, "press q to exit menu", {fill:'#000'});

        this.input.keyboard.on('keyup_Q', ()=>{
            this.scene.pause('MenuScene')
            this.scene.wake('MainScene')
            this.scene.bringToTop('MainScene');
        })

        /* placeholders */
        var itemName = this.FoodObj.name;
        var purchprice = this.FoodObj.purchase;
        var sellprice = this.FoodObj.sell;
        var stockamnt = 10;
        var buymore = 'derp';

        this.add.text(250, 200, itemName, {fontSize:'35px', fill:'#000000'})
        
        this.add.text(350, 250, "Buy Price: ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        this.add.text(475, 250, purchprice, {fontSize:'25px', fill:'#000000'}).setAlign('right')

        this.add.text(350, 300, "Sell Price: ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        this.add.text(475, 300, sellprice, {fontSize:'25px', fill:'#000000'}).setAlign('right')

        this.add.text(350, 350, "Stock: ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        this.stockview = this.add.text(475, 350, stockamnt, {fontSize:'25px', fill:'#000000'}).setAlign('right')

        this.add.text(350, 400, "Buy more? ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        var buybutt = this.add.text(475, 400, 'Yes (+1)', {fontSize:'25px', fill:'#000000'})
        buybutt.setAlign('right').setInteractive().setBackgroundColor('green')


        buybutt.on('pointerup', () => {
            stockamnt += 1
            this.stockview.destroy()
            this.stockview = this.add.text(475, 350, stockamnt, {fontSize:'25px', fill:'#000000'}).setAlign('right')
        })
    }

}

var platforms;
var cursors;
var path;


class testperson extends Phaser.GameObjects.Image{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.preference = [getRandomInt(6), getRandomInt(6), getRandomInt(6), getRandomInt(6)];
        this.tobuylst = ['a'];
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    }
    update(time, delta){
        this.testperson_SPEED = 1/10000;

    // move the t point along the path, 0 is the start and 0 is the end
       this.follower.t += testperson_SPEED * delta;
    
    // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);
            
    // update testperson x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
 
    // if we have reached the end of the path, remove the testperson
        if (this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    startOnPath(){
    // set the t parameter at the start of the path
        this.follower.t = 0;
            
    // get x and y of the given t point            
        this.path.getPoint(this.follower.t, this.follower.vec);
            
    // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }
}


/* creates class Food(name, purchase, sell) where name is a str, purchase and sell are numbers*/
class Food extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, name, purchase, sell) {
        super(scene, x, y, texture)
        this.name = name;
        this.purchase = purchase;
        this.sell = sell;
    }
}



class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }
    preload (){
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
        this.load.image('char', 'assets/customer.png');

        this.scene.pause('MenuScene')
        this.scene.bringToTop('MainScene')
    }


    create (){
        const {width, height} = this.sys.game.config;
        const bg = this.add.tileSprite(0, 0, width, height, "floor_tile")
        bg.setOrigin(0, 0)

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 100, "hcounter");
        platforms.create(75, 325, "lvcounter");
        platforms.create(725, 325, "rvcounter");
        platforms.create(400, 410, "mcounter");
        platforms.create(400, 300, "mcounter");
        platforms.create(75, 550, "cashier");
        platforms.create(400, 550, "cashier");

        this.add.image(75, 100, "plant");
        this.add.image(725, 100, "plant");
        this.add.image(75, 20, "coin");
        this.add.text(73, 12, "1500", {fontSize:'17px', fill:'#997a00'});

        this.apple = this.add.existing(new Food(this,75,250,'apple_icon', 'apple', 1, 1.25)).setInteractive();

        this.apple.on('pointerup', () => {
            this.scene.pause('MainScene')
            this.scene.launch('MenuScene',this.apple)
            this.scene.bringToTop('MenuScene');
        })

        this.input.on('pointerup', (pointer) => {
            this.scene.pause('MainScene')
            this.scene.wake('MenuScene')
            this.scene.bringToTop('MenuScene');
        })

        this.player = this.physics.add.sprite(775, 525, 'char');
        this.cursors = this.input.keyboard.createCursorKeys();

        /* bounce is not needed and players need to leave the world later*/
        /*player.setBounce(0);
        player.setCollideWorldBounds(true);*/

        this.physics.add.collider(this.player, platforms);

        this.graphics = this.add.graphics();

        this.path = this.add.path(775, 525);
        this.path.lineTo(550, 525);
        this.path.lineTo(550, 200);
        this.path.lineTo(225, 200);
        this.path.lineTo(225, 575);

        this.graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        this.path.draw(this.graphics);

        this.enemies = this.add.group({ classType: testperson, runChildUpdate: true });
        this.nexttestperson = 0;
    }

    update (time, delta){
    // if its time for the next testperson
        if (time > this.nexttestperson) {
            this.testperson = this.enemies.get();
            
            if (this.testperson) {
                this.testperson.setActive(true);
                this.testperson.setVisible(true);
            
            // place the testperson at the start of the path
                this.testperson.startOnPath();
            
                this.nexttestperson = time + 2000;
            }
        }
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: "#222222",
    parent:"game-continer",
    scene: [MainScene, MenuScene]
};

var game = new Phaser.Game(config);
