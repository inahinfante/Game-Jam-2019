var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#222222",
    parent:"game-continer",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("repeating-background", "assets/floor_tile.png");
}

function create ()
{
    const {width, height} = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, "repeating-background")
    bg.setOrigin(0, 0)
}

function update ()
{
}
