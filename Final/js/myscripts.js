
const phaserConfig = {
    type: Phaser.AUTO,
    parent: "juego",
    width: 1152,
    height: 256,
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{ y: 300 },
            debug: false
        }
    },
    backgroundColor: "#1B4F72",
    scene: {
        preload: precargar,
        create: crear,
        update: actualizar
    }
};

const juego = new Phaser.Game(phaserConfig);

var capaUno, capaDos, capaTres, cursores, personaje;

// Precarga 
function precargar() {
    this.load.image("capa-3", "assets/img/final.png");
    this.load.image("capa-2", "assets/img/medio.png");
    this.load.image("capa-1", "assets/img/principal.png");
    // Agregamos el spritesheet de un personaje
    this.load.spritesheet('IronMan', 'assets/img/sprite1.png', { frameWidth: 146, frameHeight: 127 });
}

// Crear         
function crear() {
    capaTres = this.add.tileSprite(576, 128, 1152, 256, "capa-3");
    capaDos = this.add.tileSprite(576, 128, 1152, 256, "capa-2");
    capaUno = this.add.tileSprite(576, 128, 1152, 256, "capa-1");

    // -------------------------------------------------------------------
    // Agregamos el personaje al centro de la escena
    personaje = this.physics.add.sprite(576, 50, 'IronMan');

    //  Propiedades físicas del personaje. Al caer tendrá un ligero rebote.
    personaje.setBounce(0.2);
    personaje.setCollideWorldBounds(true);

    // Las animaciones del personaje 
    this.anims.create({
        key: 'der',
        frames: this.anims.generateFrameNumbers('IronMan', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'izq',
        frames: this.anims.generateFrameNumbers('IronMan', { start: 9, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'reposo',
        frames: [{ key: 'zorro', frame: 1 }],
        frameRate: 10
    });
    // ------------------------------------------------------------------------

    // Eventos de entrada: activamos las flechas del teclado 
    cursores = this.input.keyboard.createCursorKeys();
}

// Animar         
function actualizar() {
    if (cursores.right.isDown) {
        capaTres.tilePositionX += 0.2;
        capaDos.tilePositionX += 0.3;
        capaUno.tilePositionX += 0.8;
        // personaje.setVelocityX(-20); 
        personaje.anims.play('der', true);

    }
    else if (cursores.left.isDown) {
        capaTres.tilePositionX -= 0.2;
        capaDos.tilePositionX -= 0.3;
        capaUno.tilePositionX -= 0.8;

        // personaje.setVelocityX(+20); 
        personaje.anims.play('izq', true);

    }
    else {
        // personaje.setVelocityX(0); 
        personaje.anims.play('reposo');
    }
}
