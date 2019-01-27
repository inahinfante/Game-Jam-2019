/* getRandomInt produces an integer between [0 - int(max - 1)] */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* creates class Shop*/
class Shop {
    constructor(name) {
        this.name = name;
        this.inventory = []
        this.money = 1500;
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
        //console.log('menu init, gameObj is ', this.FoodObj)
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
            this.scene.bringToTop('MoneyUI');
        })
        
        //console.log('in create in menu')
        this.input.on('pointerup', () => {
            //console.log(data)
        })

        // Make new image using FoodObj texture key
        this.add.image(300,300,this.FoodObj.texture.key);

        this.add.text(300, 150, "press q to exit menu", {fill:'#000'});

        this.input.keyboard.on('keyup_Q', ()=>{
            this.scene.pause('MenuScene')
            this.scene.wake('MainScene')
            this.scene.bringToTop('MainScene');
            this.scene.bringToTop('MoneyUI');
        })

        /* placeholders */
        var itemName = this.FoodObj.name;
        var purchprice = this.FoodObj.purchase;
        var sellprice = this.FoodObj.sell;
        var buymore = 'derp';

        this.add.text(250, 200, itemName, {fontSize:'35px', fill:'#000000'})
        
        this.add.text(350, 250, "Buy Price: ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        this.add.text(475, 250, purchprice, {fontSize:'25px', fill:'#000000'}).setAlign('right')

        this.add.text(350, 300, "Sell Price: ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        this.add.text(475, 300, sellprice, {fontSize:'25px', fill:'#000000'}).setAlign('right')

        this.add.text(350, 350, "Stock: ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        this.stockview = this.add.text(475, 350, this.FoodObj.stock, {fontSize:'25px', fill:'#000000'}).setAlign('right')

        this.add.text(350, 400, "Buy more? ", {fontSize:'25px', fill:'#000000'}).setAlign('right')
        var buybutt = this.add.text(475, 400, 'Yes (+1)', {fontSize:'25px', fill:'#000000'})
        buybutt.setAlign('right').setInteractive().setBackgroundColor('green')

        buybutt.on('pointerup', () => {
            this.FoodObj.stock += 1

            // Make a local copy of shop from the registry to
            // work with. Subtract the purchase price of the food
            // then update the registry to trigger an update in 
            // MoneyUI
            this.shop = this.registry.get('shop')
            this.shop.money -= this.FoodObj.purchase
            this.registry.set('shop', this.shop)

            this.stockview.setText(this.FoodObj.stock);
        })
    }

}

var platforms;
var cursors;
var path;


class Person extends Phaser.GameObjects.PathFollower{
    constructor(scene, path, x, y, texture){
        super(scene, x, y, texture)
        this.toBuy = [getRandomInt(9), getRandomInt(9), getRandomInt(9), getRandomInt(9)];
        //this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    }
    update(){
    }
}


/* creates class Food(name, purchase, sell) where name is a str, purchase and sell are numbers*/
class Food extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, name, purchase, sell) {
        super(scene, x, y, texture)
        this.name = name;
        this.purchase = purchase;
        this.sell = sell;
        this.stock = 0;
    }
}

class MoneyUI extends Phaser.Scene{
    constructor(){
        super({
            key: 'MoneyUI',
            active: true,
        })
    }

    preload(){
        this.load.image('coin', "assets/coin.png");
        //console.log('preloading moneyui')
    }

    create(){
        this.add.image(75, 20, "coin")
        this.moneyview = this.add.text(73, 12, "1500", {fontSize:'17px', fill:'#997a00'});

        // When the registry sees change in shop object,
        // reset the text in moneyview
        this.registry.events.on('changedata', (parent,key,data) => {
            if (key === 'shop'){
                this.moneyview.setText(data.money)
            }
        })
    }



}
class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }
    preload (){
        this.load.image("repeating-background", "assets/floor_tile.png");
        this.load.image("cashier", "assets/cashier.png");
        //this.load.image("customer", "assets/player_idle.png");
        this.load.image("floor_tile", "assets/tile024.png");
        this.load.image("hcounter", "assets/hcounter.png");
        this.load.image("mcounter", "assets/mcounter.png");
        this.load.image("plant", "assets/plant.png");
        this.load.image("lvcounter", "assets/lvcounter.png");
        this.load.image("rvcounter", "assets/rvcounter.png");

        this.load.image('apple_icon', "assets/apple.png");
        this.load.image('coffee_icon', "assets/coffee.png");
        this.load.image('donut_icon', "assets/donut.png");
        this.load.image('patty_icon', "assets/beef_patty.png");
        this.load.image('tea_icon', 'assets/tea.png');
        this.load.image('bagel_icon', 'assets/bagel.png');
        this.load.image('samosa_icon', 'assets/samosa.png');

        this.load.image('char', "assets/player_idle.png");
        this.load.image('walk1', 'assets/player_walk1.png');
        this.load.image('walk2', 'assets/player_walk2.png');

        this.load.audio('bgmusic', 'assets/happy_adveture.mp3')

        this.scene.pause('MenuScene')
        this.scene.bringToTop('MainScene')
        this.scene.bringToTop('MoneyUI')
    }

    create ()
    {
        const {width, height} = this.sys.game.config;
        const bg = this.add.tileSprite(0, 0, width, height, "floor_tile")
        bg.setOrigin(0, 0)

        this.lastspawntime = -2000

        this.shop = new Shop("Math CND")
        this.registry.set('shop', this.shop)

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

        this.graphics = this.add.graphics()

        this.path = this.add.path(775,525);
        this.path.lineTo(500,525)
        this.path.lineTo(500, 200)
        this.path.lineTo(225,200)
        this.path.lineTo(225,550)

        this.anims.create({
            key: 'walking',
            frames: [
                { key: 'walk1', duration:50},
                { key: 'walk2', duration:50},
            ],
            frameRate: 4,
            repeat: -1
        })



        //this.graphics.lineStyle(3, 0xffffff, 1);
        //this.path.draw(this.graphics);

        this.customers = []
        this.customerlist = []

        var music = this.sound.add('bgmusic', {loop:true});

        music.play();

        this.foods = [

            this.add.existing(new Food(this,725,250,'coffee_icon', 'coffee', 1, 1.25)).setInteractive(),
            this.add.existing(new Food(this,725,350,'tea_icon', 'tea', 1, 10)).setInteractive(),

            this.add.existing(new Food(this,200,75,'patty_icon', 'beef patty', 1, 1.25)).setInteractive(),
            this.add.existing(new Food(this,325,75,'samosa_icon', 'samosa', 1, 10)).setInteractive(),
            this.add.existing(new Food(this,450,75,'donut_icon', 'donut', 1, 1.25)).setInteractive(),
            this.add.existing(new Food(this,575,75,'bagel_icon', 'bagel', 1, 10)).setInteractive(),

            this.add.existing(new Food(this,75,250,'apple_icon', 'apple', 1, 1.25)).setInteractive(),
            this.add.existing(new Food(this,75,350,'apple_icon', 'organic apple', 1, 10)).setInteractive(),
        ]

        this.shop.foods = this.foods

        this.input.on('pointerup', (pointer) => {
            // Check if any of the foods were clicked

            // forEach doesn't lose scope of the enumerator
            // like a for (i = 0 .....) loop would
            this.foods.forEach( (foodie) => {
                foodie.on('pointerup', () => {
                    //console.log(foodie)
                    this.scene.pause('MainScene')
                    this.scene.launch('MenuScene', foodie)
                    this.scene.bringToTop('MenuScene')
                })
            })
        })

        this.cursors = this.input.keyboard.createCursorKeys();

        this.customergroup = this.physics.add.group({
            key: 'customers'
        })

        this.physics.add.collider(this.customergroup, this.customergroup, (obj1,obj2) => {
            //console.log("collision between", obj1, obj2)
            obj1.pauseFollow()
            obj2.pauseFollow()
        })

        // Add a timer event, the call back is called every `delay` ms
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                var rando = Math.random()
                if (rando < 0.3){
                    //console.log("this.time", this.time.now)
                    if (this.time.now - this.lastspawntime > 2000){
                        this.lastspawntime = this.time.now
                        this.time.addEvent({
                            delay:12000,
                            callback:() => {
                                // take out foods in list
                                for (var i = 0; i < 4; i++){
                                    var randint = getRandomInt(8)
                                    this.foods[randint].stock -= 1
                                    this.shop.money += this.foods[randint].sell
                                    this.registry.set('shop', this.shop)
                                }

                                this.customers[0].destroy()

                                this.customerlist.shift()
                                this.customers.shift()
                                this.customers.forEach((custo)=>{
                                    custo.resumeFollow()
                                })}
                        })
                        var newfollower = this.add.follower(this.path, 775,525,'char').startFollow({duration:7000}).play('walking')
                        this.customers.push(newfollower)
                        this.customerlist.push([getRandomInt(9), getRandomInt(9), getRandomInt(9)])
                        this.physics.world.enable(this.customers[this.customers.length - 1])
                        this.customergroup.add(this.customers[this.customers.length - 1])
                    }
                }},
            callbackScope: this,
            loop: true
        })

        //this.char.play('walking');
    }

    update (time,delta){
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    backgroundColor: "#222222",
    parent:"game-continer",
    scene: [MainScene, MenuScene, MoneyUI]
};

var game = new Phaser.Game(config);
