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
    this.load.image("cashier", "assets/cashier.png");
    this.load.image("customer", "assets/customer.png");
    this.load.image("floor_tile", "assets/floor_tile.png");
    this.load.image("hcounter", "assets/hcounter.png");
    this.load.image("mcounter", "assets/mcounter.png");
    this.load.image("plant", "assets/plant.png");
    this.load.image("lvcounter", "assets/lvcounter.png");
    this.load.image("rvcounter", "assets/rvcounter.png");
}

function create ()
{
    const {width, height} = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, "floor_tile")
    bg.setOrigin(0, 0)
    this.add.image(400, 75, "hcounter");
    this.add.image(75, 300, "lvcounter");
    this.add.image(725, 275, "rvcounter");
    this.add.image(400, 387, "mcounter");
    this.add.image(75, 75, "plant");
    this.add.image(725, 75, "plant");
    this.add.image(75, 525, "cashier");
    this.add.image(400, 525, "cashier");
}

function update ()
{
}
