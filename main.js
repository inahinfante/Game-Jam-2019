class MenuScene extends Phaser.Scene {

    constructor ()
    {
        super({
            key: 'MenuScene',
        });
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

        this.input.on('pointerup', (pointer) => {
            this.scene.start('MenuScene')
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

