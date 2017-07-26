import gameObject from './gameObject.js'
import Block from './block.js'
import Bullet from './bullet.js';
import Consumable from './consumable.js';

class Level {
	constructor() {
		this.blocks = new Array();
		this.consumables = new Array();
		this.enemies = new Array();
		this.maxEnemies = 2;
	}

	clear() {
		return this.blocks = [];
	}

	numBlocks() {
		return this.blocks.length;
	}

	platformBlocks() {
		return this.blocks.filter(block => block.type === "platform");
	}

	fallingBlocks() {
		return this.blocks.filter(block => block.type === "falling");
	}

	springBlocks() {
		return this.blocks.filter(block => block.type === "spring");
	}

	generateEnemies() {
		while (this.enemies.length < this.maxEnemies) {
			this.enemies.push(new Bullet());
		}
	};

	updateEnemies() {
		this.enemies.forEach(enemy => {
			enemy.update();
		})
	}

	generateConsumables() {
		Object.keys(CONSUMABLES).forEach(el => {
			this.consumables.push(new Consumable(CONSUMABLES[el]));
		});
	}
}

const CONSUMABLES = {
	"1": {
		img: "assets/mic.png",
		type: "mic",
		x: 500,
		y: 180,
		width: 17,
		height: 35
	},
	"2": {
		img: "assets/heart-small.png",
		type: "health",
		x: 2950,
		y: 100,
		width: 26,
		height: 24
	},
	"3": {
		img: "assets/mic.png",
		type: "mic",
		x: 4350,
		y: 100,
		width: 17,
		height: 35
	},
	"4": {
		img: "assets/heart-small.png",
		type: "health",
		x: 4600,
		y: 100,
		width: 26,
		height: 24
	},
	"5": {
		img: "assets/mic.png",
		type: "mic",
		x: 5000,
		y: 150,
		width: 17,
		height: 35
	},
	"6": {
		img: "assets/heart-small.png",
		type: "health",
		x: 5300,
		y: 150,
		width: 26,
		height: 24
	}
};

const generateBlock = (options) => {
	let defaultOptions = {
		type: "platform",
		num: 1,
		space: 0
	};
	let newOptions = Object.assign(defaultOptions, options);

	const {
		level,
		num,
		img,
		x,
		y,
		width,
		height,
		type,
		space
	} = newOptions;

	let totalWidth = 0;
	for (var i = 1; i <= num; i++) {
		level.blocks.push(new Block({
			img: img,
			x: x + (totalWidth),
			y: y,
			width: width,
			height: height,
			type: type
		}));

		totalWidth += width + space
	}
};

// Create Level One
const generateLevelOne = () => {
	const levelOne = new Level();
	//flat stage
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 6,
		x: 96,
		y: 405,
		width: 96,
		height: 11
	});

	// Food
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 1,
		x: 300,
		y: 325,
		width: 96,
		height: 11,
	});

	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 768,
		y: 325,
		width: 96,
		height: 11,
		type: "falling"
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 2,
		x: 875,
		y: 425,
		width: 96,
		height: 11
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		x: 1200,
		y: 405,
		width: 96,
		height: 11,
		num: 2
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 2,
		x: 1460,
		y: 325,
		width: 96,
		height: 11
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		x: 1300,
		y: 260,
		width: 96,
		height: 11
	});

	//flat stage
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 6,
		x: 1460,
		y: 160,
		width: 96,
		height: 11
	});

	// springs
	generateBlock({
		level: levelOne,
		img: "assets/spring.png",
		x: 2200,
		y: 420,
		width: 60,
		height: 78,
		type: "spring",
		num: 2
	});

	// flat platform
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		x: 2400,
		y: 260,
		width: 96,
		height: 11,
		num: 2
	});

	// springs
	generateBlock({
		level: levelOne,
		img: "assets/spring.png",
		x: 2700,
		y: 420,
		width: 60,
		height: 78,
		type: "spring",
		num: 2
	});

	// fall sequence
	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 2900,
		y: 215,
		width: 96,
		height: 11,
		type: "falling"
	});

	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 3050,
		y: 275,
		width: 96,
		height: 11,
		type: "falling"
	});

	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 3200,
		y: 360,
		width: 96,
		height: 11,
		type: "falling"
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 2,
		x: 3330,
		y: 425,
		width: 96,
		height: 11
	});

	//falling to spring
	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 3600,
		y: 410,
		width: 96,
		height: 11,
		type: "falling"
	});

	generateBlock({
		level: levelOne,
		img: "assets/spring.png",
		num: 1,
		x: 3800,
		y: 420,
		width: 60,
		height: 78,
		type: "spring"
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 2,
		x: 3900,
		y: 225,
		width: 96,
		height: 11
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 2,
		x: 3700,
		y: 125,
		width: 96,
		height: 11
	});

	// Falling area
	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 4200,
		y: 260,
		width: 96,
		height: 11,
		type: "falling",
		space: 170,
		num: 3
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 1,
		x: 4700,
		y: 485,
		width: 96,
		height: 11,
	});

	generateBlock({
		level: levelOne,
		img: "assets/spring.png",
		x: 4900,
		y: 420,
		width: 60,
		height: 78,
		type: "spring",
		num: 3,
		space: 250
	});

	// after spring
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		x: 5800,
		y: 480,
		width: 96,
		height: 11,
    num: 2,
    space: 200
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		x: 5950,
		y: 380,
		width: 96,
		height: 11,
	});

	generateBlock({
		level: levelOne,
		img: "assets/spring.png",
		x: 6200,
		y: 420,
		width: 60,
		height: 78,
		type: "spring",
	});

	// +300
	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 6400,
		y: 360,
		width: 96,
		height: 11,
		type: "falling",
	});
	//
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 1,
		x: 6600,
		y: 310,
		width: 96,
		height: 11
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 3,
		x: 6800,
		y: 260,
		width: 96,
		height: 11
	});

	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		x: 6900,
		y: 160,
		width: 96,
		height: 11
	});

	generateBlock({
		level: levelOne,
		img: "assets/falling-platform.png",
		num: 1,
		x: 7088,
		y: 260,
		width: 96,
		height: 11,
		type: "falling"
	});

	generateBlock({
		level: levelOne,
		img: "assets/spring.png",
		num: 1,
		x: 7400,
		y: 420,
		width: 60,
		height: 78,
		type: "spring"
	});

	//flat stage
	generateBlock({
		level: levelOne,
		img: "assets/platform.png",
		num: 10,
		x: 7600,
		y: 425,
		width: 96,
		height: 11
	});
	// debugger
	return levelOne;
}

export default generateLevelOne;
