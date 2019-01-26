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
    }

    create ()
    {
        const {width, height} = this.sys.game.config;
        const bg = this.add.tileSprite(0, 0, width, height, "repeating-background")
        bg.setOrigin(0, 0)
        const apple = this.add.image(0,0,'apple_icon').setOrigin(0).setInteractive();
        apple.on('pointerup', () => {
        })
        this.input.on('pointerup', (pointer) => {
            this.scene.start('MenuScene')
        })

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

