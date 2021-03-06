/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static pixelScaleRatio() {
        return 2;
    }
    static mobileExtraSidePadding() {
        return 250;
    }
    static fakingMobileForDebug() {
        return false;
    }
    static debug() {
        return false;
    }
}
exports.Config = Config;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class GameEvents {
    constructor() {
        this.items = [];
        this.listeners = [];
    }
    register(event) {
        this.items.push(event);
        this.listeners.map(function (listener) {
            listener.callback()(event, listener.context());
        });
    }
    addListener(callback, callbackContext) {
        this.listeners.push(new Listener(callback, callbackContext));
    }
    all() {
        return this.items;
    }
}
exports.GameEvents = GameEvents;
class Listener {
    constructor(callback, context) {
        this.callbackFunction = callback;
        this.callbackContext = context;
    }
    callback() {
        return this.callbackFunction;
    }
    context() {
        return this.callbackContext;
    }
}
class BaseEvent {
    constructor(time) {
        this.gameTime = time;
    }
    time() {
        return this.gameTime;
    }
}
exports.BaseEvent = BaseEvent;
class CopKilled extends BaseEvent {
}
exports.CopKilled = CopKilled;
class CitizenKilled extends BaseEvent {
}
exports.CitizenKilled = CitizenKilled;
class HeroKilled extends BaseEvent {
}
exports.HeroKilled = HeroKilled;
class HeroNursed extends BaseEvent {
}
exports.HeroNursed = HeroNursed;
class MoneyPicked extends BaseEvent {
    constructor(time, amount, total) {
        super(time);
        this.picked = amount;
        this.total = total;
    }
    pickedAmount() {
        return this.picked;
    }
    totalAmount() {
        return this.total;
    }
}
exports.MoneyPicked = MoneyPicked;
class GunPicked extends BaseEvent {
}
exports.GunPicked = GunPicked;
class ShotGunPicked extends BaseEvent {
}
exports.ShotGunPicked = ShotGunPicked;
class MachineGunPicked extends BaseEvent {
}
exports.MachineGunPicked = MachineGunPicked;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalDirection_1 = __webpack_require__(10);
class CharacterHurt {
    blinkHumanOrReplicant(host, fromDirection, replicant) {
        let tint = 0xb43232;
        if (replicant) {
            tint = 0xaabcff;
        }
        this.blink(host, fromDirection, tint);
    }
    blinkHero(host, fromDirection) {
        this.blink(host, fromDirection, 0xb43232);
    }
    blink(host, fromDirection, tint) {
        const tintTween = host.game.add.tween(host).to({
            tint: tint,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
        tintTween.onComplete.addOnce(function () {
            host.tint = 0xffffff;
        });
        const shiftDistance = 5;
        const shiftX = fromDirection.direction() === HorizontalDirection_1.HorizontalDirection.LEFT ? shiftDistance : -shiftDistance;
        host.game.add.tween(host).to({
            x: host.x + shiftX,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
    }
}
exports.CharacterHurt = CharacterHurt;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class PickableItem extends Phaser.Sprite {
    constructor(group, x, y, key, player) {
        super(group.game, x, y - 10, key, 0);
        this.picking = false;
        this.player = player;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.animations.add('blink', [0, 1], 1, true);
        this.animations.play('blink');
        const fallAngle = 180;
        this.angle -= fallAngle;
        const fallDestinationY = this.y + 30;
        const fallNewAngle = this.angle + fallAngle;
        this.game.add.tween(this).to({ y: fallDestinationY, angle: fallNewAngle }, 600, Phaser.Easing.Bounce.Out, true);
        const pickDestinationY = fallDestinationY - 30;
        const pickNewAngle = fallNewAngle - 180;
        this.pickingTween = this.game.add.tween(this).to({ y: pickDestinationY, angle: pickNewAngle }, 100, Phaser.Easing.Bounce.Out);
        const item = this;
        this.pickingTween.onComplete.addOnce(function () { player.pick(item); });
    }
    update() {
        this.game.physics.arcade.overlap(this.player, this, function (player, item) {
            if (!this.picking) {
                this.picking = true;
                this.pickingTween.start();
            }
        }, null, this);
    }
}
exports.PickableItem = PickableItem;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/finite-state-machines-theory-and-implementation--gamedev-11867
 */
class StackFSM {
    constructor() {
        this.stack = [];
    }
    update() {
        const currentState = this.getCurrentState();
        const currentStateFunction = currentState.getFunc();
        if (currentStateFunction != null) {
            currentStateFunction();
        }
    }
    popState() {
        return this.stack.pop();
    }
    pushState(state) {
        if (this.getCurrentState() != state) {
            this.stack.push(state);
        }
    }
    getCurrentState() {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }
}
exports.StackFSM = StackFSM;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(name, func) {
        this.name = name;
        this.func = func;
    }
    getName() {
        return this.name;
    }
    getFunc() {
        return this.func;
    }
}
exports.State = State;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class BrainStateMarker extends Phaser.Sprite {
    constructor(group, host, brain, replicant) {
        super(group.game, host.x, host.y, 'Marker', 0);
        group.add(this);
        this.host = host;
        this.brain = brain;
        this.scale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.animations.add('nothing', [5], 4, true);
        this.animations.add('afraid', [3, 4], 4, true);
        this.animations.add('attack', [0, 1, 2], 4, true);
        if (replicant) {
            this.animations.add('dying', [8, 9, 10], 2, false);
        }
        else {
            this.animations.add('dying', [6, 7], 2, false);
        }
    }
    update() {
        if (this.brain.currentStateName() === 'dying') {
            this.play('dying', 4, false, true);
        }
        else if (this.brain.currentStateName() === 'flee') {
            this.play('afraid');
        }
        else if (this.brain.currentStateName() === 'attack') {
            this.play('attack');
        }
        else {
            this.play('nothing');
        }
        this.x = this.host.x - 22;
        this.y = this.host.y - 60;
    }
}
exports.BrainStateMarker = BrainStateMarker;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Energy {
    constructor(randomGenerator) {
        this.randomGenerator = randomGenerator;
        this.resetWithRandomAmount();
    }
    increase() {
        this.amount++;
    }
    decrease() {
        this.amount--;
    }
    empty() {
        return this.amount <= 0;
    }
    minimalAmountToMoveIsReached() {
        return this.amount >= 1000;
    }
    resetWithRandomAmount() {
        this.amount = this.randomGenerator.integerInRange(50, 5000);
    }
}
exports.Energy = Energy;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Steering {
    constructor(randomGenerator, host, hostGun = null) {
        this.left = -1;
        this.right = 1;
        this.walkSpeed = 50;
        this.runSpeed = 150;
        this.randomGenerator = randomGenerator;
        this.bot = host;
        this.botGun = hostGun;
        this.walkToARandomDirection();
    }
    blockedToTheLeft() {
        return (this.bot.body.blocked.left || this.bot.body.touching.left) && this.directionX === this.left;
    }
    blockedToTheRight() {
        return (this.bot.body.blocked.right || this.bot.body.touching.right) && this.directionX === this.right;
    }
    stop() {
        this.bot.body.velocity.x = 0;
        this.bot.body.velocity.y = 0;
    }
    walkToTheRight() {
        this.turnToTheRight();
        this.bot.body.velocity.x = this.walkSpeed;
    }
    walkToTheLeft() {
        this.turnToTheLeft();
        this.bot.body.velocity.x = -this.walkSpeed;
    }
    runToTheRight() {
        this.turnToTheRight();
        this.bot.body.velocity.x = this.runSpeed;
    }
    runToTheLeft() {
        this.turnToTheLeft();
        this.bot.body.velocity.x = -this.runSpeed;
    }
    walkToARandomDirection() {
        this.directionX = this.bot.game.rnd.sign();
        if (this.directionX === -1) {
            this.walkToTheLeft();
        }
        else {
            this.walkToTheRight();
        }
    }
    stopAndTurnToTheSprite(sprite) {
        this.stop();
        if (sprite.x > this.bot.x) {
            this.turnToTheRight();
        }
        else {
            this.turnToTheLeft();
        }
    }
    runFromTheSprite(sprite) {
        if (sprite.x < this.bot.x) {
            this.runToTheRight();
        }
        else {
            this.runToTheLeft();
        }
    }
    turnToTheRight() {
        this.directionX = this.right;
        if (this.botGun) {
            this.botGun.turnToTheRight();
        }
        this.bot.scale.x = Config_1.Config.pixelScaleRatio();
    }
    turnToTheLeft() {
        this.directionX = this.left;
        if (this.botGun) {
            this.botGun.turnToTheLeft();
        }
        this.bot.scale.x = -Config_1.Config.pixelScaleRatio();
    }
}
exports.Steering = Steering;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vision {
    constructor(host, street) {
        this.scope = 300;
        this.bot = host;
        this.street = street;
    }
    playerIsCloseAndAggressive() {
        return this.street.player().isAggressive() && this.playerIsClose();
    }
    playerIsClose() {
        const player = this.street.player();
        return Phaser.Math.distance(player.x, player.y, this.bot.x, this.bot.y) < this.scope;
    }
    playerIsCloseAndAlive() {
        const player = this.street.player();
        return !player.isDead() && Phaser.Math.distance(player.x, player.y, this.bot.x, this.bot.y) < this.scope;
    }
    playerIsCloseAndAliveAndAggressive() {
        return this.street.player().isAggressive() && this.playerIsCloseAndAlive();
    }
}
exports.Vision = Vision;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HorizontalDirection {
    constructor(body) {
        this.body = body;
    }
    direction() {
        return this.body.facing == 2 ? HorizontalDirection.LEFT : HorizontalDirection.RIGHT;
    }
}
HorizontalDirection.LEFT = -1;
HorizontalDirection.RIGHT = 1;
exports.HorizontalDirection = HorizontalDirection;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class DeviceDetector {
    constructor(device) {
        this.device = device;
    }
    isMobile() {
        return !this.device.desktop || Config_1.Config.fakingMobileForDebug();
    }
}
exports.DeviceDetector = DeviceDetector;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Hospital extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingHospital', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.animations.add('idle', [0, 1, 2], 3, true);
        this.animations.play('idle');
    }
    nurseCost() {
        return 200;
    }
    entranceX() {
        return this.x + this.width / 2;
    }
    entranceY() {
        return this.y + this.height;
    }
}
exports.Hospital = Hospital;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalDirection_1 = __webpack_require__(10);
class BulletHits {
    constructor(myself, myGun, street) {
        this.shooter = myself;
        this.gun = myGun;
        this.street = street;
    }
    hit() {
        const myself = this.shooter;
        const myGun = this.gun;
        const otherAliveCops = this.street.cops().allAlive().filter(function (cop) {
            return cop !== myself;
        });
        myGun.bulletHits(otherAliveCops, function (cop, bullet) {
            cop.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
        });
        const otherAliveSwats = this.street.swats().allAlive().filter(function (swat) {
            return swat !== myself;
        });
        myGun.bulletHits(otherAliveSwats, function (swat, bullet) {
            swat.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
        });
        myGun.bulletHits(this.street.citizens().allAlive(), function (citizen, bullet) {
            citizen.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
        });
        myGun.bulletHits(this.street.player(), function (hero, bullet) {
            hero.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
        });
    }
}
exports.BulletHits = BulletHits;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HeroCamera {
    constructor(camera) {
        this.camera = camera;
    }
    shootgunEffect() {
        this.camera.shake(0.003, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }
    machinegunEffect() {
        this.camera.shake(0.001, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }
    gunEffect() {
        this.camera.shake(0.001, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }
    warningEffect() {
        this.camera.flash(0xf04b36, 1000, false, 0.2);
    }
    dyingEffect() {
        this.camera.flash(0xb43232, 10000, false, 0.2);
    }
}
exports.HeroCamera = HeroCamera;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const DeviceDetector_1 = __webpack_require__(11);
class KeyBoardController {
    constructor(game) {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.shotKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.switchKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    }
    goingLeft() {
        return this.cursors.left.isDown;
    }
    goingRight() {
        return this.cursors.right.isDown;
    }
    goingDown() {
        return this.cursors.down.isDown;
    }
    goingUp() {
        return this.cursors.up.isDown;
    }
    shooting() {
        return this.shotKey.isDown;
    }
    switchingWeapon() {
        return this.switchKey.isDown;
    }
    supported() {
        return true;
    }
    identifier() {
        return 'keyboard';
    }
}
exports.KeyBoardController = KeyBoardController;
class GamePadController {
    constructor(game) {
        game.input.gamepad.start();
        this.pad = game.input.gamepad.pad1;
        this.game = game;
        if (!game.input.gamepad.supported) {
            throw new Error("Game pad not supported");
        }
        if (!game.input.gamepad.active) {
            throw new Error("Game pad is inactive");
        }
    }
    supported() {
        return this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad.connected;
    }
    goingLeft() {
        return (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1);
    }
    goingRight() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1;
    }
    goingDown() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1;
    }
    goingUp() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1;
    }
    shooting() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_X);
    }
    switchingWeapon() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_Y);
    }
    identifier() {
        return 'gamepad';
    }
}
exports.GamePadController = GamePadController;
class VirtualPadController {
    constructor(game) {
        this.buttonXPressed = false;
        this.buttonYPressed = false;
        this.buttonLeftPressed = false;
        this.buttonRightPressed = false;
        this.buttonUpPressed = false;
        this.buttonDownPressed = false;
        this.game = game;
        const scaleRatio = 1.5;
        const imgPadPositionX = 90;
        const imgPadPositionY = 430;
        const imgPadFrame = '360_Dpad';
        const padImage = game.add.image(imgPadPositionX, imgPadPositionY, 'xbox360', imgPadFrame);
        padImage.scale.set(scaleRatio);
        padImage.fixedToCamera = true;
        const directionBtnAlpha = 0;
        const directionBtnPadding = 90;
        const btnLeftPositionX = imgPadPositionX - directionBtnPadding;
        const btnLeftPositionY = imgPadPositionY;
        const btnLeftFrame = '360_Dpad_Left';
        this.buttonLeft = game.add.button(btnLeftPositionX, btnLeftPositionY, 'xbox360', null, this, btnLeftFrame, btnLeftFrame, btnLeftFrame);
        this.buttonLeft.onInputUp.add(function () { this.buttonLeftPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonLeft.onInputDown.add(function () { this.buttonLeftPressed = true; padImage.frameName = btnLeftFrame; }, this);
        this.buttonLeft.alpha = directionBtnAlpha;
        this.buttonLeft.fixedToCamera = true;
        this.buttonLeft.scale.set(scaleRatio);
        const btnRightPositionX = imgPadPositionX + directionBtnPadding;
        const btnRightPositionY = imgPadPositionY;
        const btnRightFrame = '360_Dpad_Right';
        this.buttonRight = game.add.button(btnRightPositionX, btnRightPositionY, 'xbox360', null, this, btnRightFrame, btnRightFrame, btnRightFrame);
        this.buttonRight.onInputUp.add(function () { this.buttonRightPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonRight.onInputDown.add(function () { this.buttonRightPressed = true; padImage.frameName = btnRightFrame; }, this);
        this.buttonRight.alpha = directionBtnAlpha;
        this.buttonRight.fixedToCamera = true;
        this.buttonRight.scale.set(scaleRatio);
        const btnUpPositionX = imgPadPositionX;
        const btnUpPositionY = imgPadPositionY - directionBtnPadding;
        const btnUpFrame = '360_Dpad_Up';
        this.buttonUp = game.add.button(btnUpPositionX, btnUpPositionY, 'xbox360', null, this, btnUpFrame, btnUpFrame, btnUpFrame);
        this.buttonUp.onInputUp.add(function () { this.buttonUpPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonUp.onInputDown.add(function () { this.buttonUpPressed = true; padImage.frameName = btnUpFrame; }, this);
        this.buttonUp.alpha = directionBtnAlpha;
        this.buttonUp.fixedToCamera = true;
        this.buttonUp.scale.set(scaleRatio);
        const btnDownPositionX = imgPadPositionX;
        const btnDownPositionY = imgPadPositionY + directionBtnPadding;
        const btnDownFrame = '360_Dpad_Down';
        this.buttonDown = game.add.button(btnDownPositionX, btnDownPositionY, 'xbox360', null, this, btnDownFrame, btnDownFrame, btnDownFrame);
        this.buttonDown.onInputUp.add(function () { this.buttonDownPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonDown.onInputDown.add(function () { this.buttonDownPressed = true; padImage.frameName = btnDownFrame; }, this);
        this.buttonDown.alpha = directionBtnAlpha;
        this.buttonDown.fixedToCamera = true;
        this.buttonDown.scale.set(scaleRatio);
        const btnYpositionX = 930 + Config_1.Config.mobileExtraSidePadding() * 2;
        const btnYpositionY = imgPadPositionY + 90;
        const btnYFrame = '360_Y';
        this.buttonY = game.add.button(btnYpositionX, btnYpositionY, 'xbox360', null, this, btnYFrame, btnYFrame, btnYFrame);
        this.buttonY.onInputUp.add(function () { this.buttonYPressed = false; }, this);
        this.buttonY.onInputDown.add(function () { this.buttonYPressed = true; }, this);
        this.buttonY.fixedToCamera = true;
        this.buttonY.scale.set(scaleRatio);
        const btnXpositionX = btnYpositionX + 110;
        const btnXpositionY = btnYpositionY - 150;
        const btnXFrame = '360_X';
        this.buttonX = game.add.button(btnXpositionX, btnXpositionY, 'xbox360', null, this, btnXFrame, btnXFrame, btnXFrame);
        this.buttonX.onInputUp.add(function () { this.buttonXPressed = false; }, this);
        this.buttonX.onInputDown.add(function () { this.buttonXPressed = true; }, this);
        this.buttonX.fixedToCamera = true;
        this.buttonX.scale.set(scaleRatio);
    }
    supported() {
        const detector = new DeviceDetector_1.DeviceDetector(this.game.device);
        return detector.isMobile();
    }
    goingLeft() {
        return this.buttonLeftPressed;
    }
    goingRight() {
        return this.buttonRightPressed;
    }
    goingDown() {
        return this.buttonDownPressed;
    }
    goingUp() {
        return this.buttonUpPressed;
    }
    shooting() {
        return this.buttonXPressed;
    }
    switchingWeapon() {
        return this.buttonYPressed;
    }
    identifier() {
        return 'virtualpad';
    }
}
exports.VirtualPadController = VirtualPadController;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Gun {
    constructor(group, owner, amno = 10000) {
        this.game = group.game;
        this.amnoAmount = amno;
        this.weapon = group.game.add.weapon(-1, 'Bullet', 0, group);
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 600;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 600;
        this.weapon.trackSprite(owner, 0, -8, false);
        this.weapon.fireAngle = 0;
        this.weapon.addBulletAnimation('idle', [0, 1], 4, true);
        this.weapon.bulletAnimation = 'idle';
        this.weapon.onFire.add(function () {
            this.amnoAmount--;
        }, this);
        this.weapon.onFire.add(function () {
            const shootAudio = this.game.add.audio('shoot', 0.5, false);
            shootAudio.play();
        }, this);
    }
    fire() {
        this.weapon.fire();
    }
    turnToTheLeft() {
        this.weapon.fireAngle = 180;
    }
    turnToTheRight() {
        this.weapon.fireAngle = 0;
    }
    bullets() {
        return this.weapon.bullets;
    }
    bulletHits(targets, overlapCallback) {
        this.game.physics.arcade.overlap(this.weapon.bullets, targets, overlapCallback, null, this);
    }
    amno() {
        return this.amnoAmount;
    }
    reload(amount) {
        this.amnoAmount = this.amnoAmount + amount;
    }
    damage() {
        return 20;
    }
    identifier() {
        return 'Gun';
    }
}
exports.Gun = Gun;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MachineGun {
    constructor(group, owner, amno = 10000) {
        this.weapon = group.game.add.weapon(-1, 'Bullet', 0, group);
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 800;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 200;
        this.weapon.trackSprite(owner, 0, -8, false);
        this.weapon.fireAngle = 0;
        this.weapon.bulletAngleVariance = 3;
        this.game = group.game;
        this.amnoAmount = amno;
        this.weapon.onFire.add(function () {
            this.amnoAmount = this.amnoAmount - 1;
        }, this);
        this.weapon.onFire.add(function () {
            const shootAudio = this.game.add.audio('shoot', 0.5, false);
            shootAudio.play();
        }, this);
    }
    fire() {
        this.weapon.fire();
    }
    turnToTheLeft() {
        this.weapon.fireAngle = 180;
    }
    turnToTheRight() {
        this.weapon.fireAngle = 0;
    }
    bullets() {
        return this.weapon.bullets;
    }
    bulletHits(targets, overlapCallback) {
        this.game.physics.arcade.overlap(this.weapon.bullets, targets, overlapCallback, null, this);
    }
    amno() {
        return this.amnoAmount;
    }
    reload(amount) {
        this.amnoAmount = this.amnoAmount + amount;
    }
    damage() {
        return 30;
    }
    identifier() {
        return 'MachineGun';
    }
}
exports.MachineGun = MachineGun;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ShotGun {
    constructor(group, owner, amno = 10000) {
        this.weapon = group.game.add.weapon(-1, 'Bullet', 1, group);
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 300;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 1200;
        this.weapon.trackSprite(owner, 0, -8, false);
        this.weapon.fireAngle = 0;
        this.weapon.bulletAngleVariance = 10;
        this.game = group.game;
        this.amnoAmount = amno;
        this.weapon.onFire.add(function () {
            this.amnoAmount = this.amnoAmount - 0.25;
        }, this);
        this.weapon.onFire.add(function () {
            const shootAudio = this.game.add.audio('shoot', 0.5, false);
            shootAudio.play();
        }, this);
    }
    fire() {
        const originalRate = this.weapon.fireRate;
        this.weapon.fireRate = 0;
        this.weapon.fire();
        this.weapon.fire();
        this.weapon.fire();
        this.weapon.fireRate = originalRate;
        this.weapon.fire();
    }
    turnToTheLeft() {
        this.weapon.fireAngle = 180;
    }
    turnToTheRight() {
        this.weapon.fireAngle = 0;
    }
    bullets() {
        return this.weapon.bullets;
    }
    bulletHits(targets, overlapCallback) {
        this.game.physics.arcade.overlap(this.weapon.bullets, targets, overlapCallback, null, this);
    }
    amno() {
        return this.amnoAmount;
    }
    reload(amount) {
        this.amnoAmount = this.amnoAmount + amount;
    }
    damage() {
        return 40;
    }
    identifier() {
        return 'ShotGun';
    }
}
exports.ShotGun = ShotGun;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(46);
const Preload_1 = __webpack_require__(49);
const Menu_1 = __webpack_require__(47);
const Play_1 = __webpack_require__(48);
class SimpleGame extends Phaser.Game {
    constructor() {
        super(1200, 800, Phaser.CANVAS, 'content', null);
        this.antialias = false;
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Menu', Menu_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
window.onload = () => {
    new SimpleGame();
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Big extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingBig', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
    }
}
exports.Big = Big;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElectricSheep_1 = __webpack_require__(23);
const Big_1 = __webpack_require__(20);
const Buildings_1 = __webpack_require__(22);
const Pub_1 = __webpack_require__(26);
const Medium_1 = __webpack_require__(25);
const Small_1 = __webpack_require__(27);
const Hospital_1 = __webpack_require__(12);
const Hostel_1 = __webpack_require__(24);
class BuildingLayout {
    constructor(level, group, streetPositionX) {
        this.buildingY = 100;
        this.isometricMargin = 50;
        this.previousBuildingMargin = 6;
        this.previousBuilding = null;
        this.group = group;
        this.streetPositionX = streetPositionX;
        this.buildingsRepository = new Buildings_1.Buildings();
        level.orderedBuildingTypes().forEach(function (type) {
            switch (type) {
                case 'Small':
                    this.addSmall();
                    break;
                case 'Medium':
                    this.addMedium();
                    break;
                case 'Big':
                    this.addBig();
                    break;
                case 'Pub':
                    this.addPub();
                    break;
                case 'ElectricSheep':
                    this.addElectricSheep();
                    break;
                case 'Hospital':
                    this.addHospital();
                    break;
                case 'Hostel':
                    this.addHostel();
                    break;
                default:
                    throw new Error("Building type " + type + " is unknown");
            }
        }, this);
    }
    streetWidth() {
        return this.previousBuilding.x + this.previousBuilding.width;
    }
    buildings() {
        return this.buildingsRepository;
    }
    addElectricSheep() {
        return this.addBuilding(new ElectricSheep_1.ElectricSheep(this.group, this.buildPositionX(), this.buildingY));
    }
    addHostel() {
        return this.addBuilding(new Hostel_1.Hostel(this.group, this.buildPositionX(), this.buildingY));
    }
    addPub() {
        return this.addBuilding(new Pub_1.Pub(this.group, this.buildPositionX(), this.buildingY));
    }
    addBig() {
        return this.addBuilding(new Big_1.Big(this.group, this.buildPositionX(), this.buildingY));
    }
    addMedium() {
        return this.addBuilding(new Medium_1.Medium(this.group, this.buildPositionX(), this.buildingY));
    }
    addSmall() {
        return this.addBuilding(new Small_1.Small(this.group, this.buildPositionX(), this.buildingY));
    }
    addHospital() {
        const building = new Hospital_1.Hospital(this.group, this.buildPositionX(), this.buildingY);
        this.previousBuilding = building;
        this.group.sort('x', Phaser.Group.SORT_DESCENDING);
        this.buildingsRepository.add(building);
        return building;
    }
    addBuilding(building) {
        this.previousBuilding = building;
        this.group.sort('x', Phaser.Group.SORT_DESCENDING);
        this.buildingsRepository.add(building);
        return building;
    }
    buildPositionX() {
        if (this.previousBuilding === null) {
            return this.streetPositionX - this.isometricMargin;
        }
        else {
            return this.previousBuilding.x + this.previousBuilding.width - this.isometricMargin - this.previousBuildingMargin;
        }
    }
}
exports.BuildingLayout = BuildingLayout;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Hospital_1 = __webpack_require__(12);
class Buildings {
    constructor() {
        this.items = [];
    }
    all() {
        return this.items;
    }
    add(citizen) {
        this.items.push(citizen);
    }
    hospital() {
        const hospitals = this.items.filter(function (building) {
            return building instanceof Hospital_1.Hospital;
        });
        return hospitals.length > 0 ? hospitals[0] : null;
    }
    length() {
        return this.items.length;
    }
}
exports.Buildings = Buildings;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class ElectricSheep extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingElectricSheep', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.animations.add('idle', [0, 1, 2], 3, true);
        this.animations.play('idle');
    }
}
exports.ElectricSheep = ElectricSheep;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Hostel extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingHostel', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.animations.add('idle', [0, 1, 2], 3, true);
        this.animations.play('idle');
    }
}
exports.Hostel = Hostel;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Medium extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingMedium', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
    }
}
exports.Medium = Medium;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Pub extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingPub', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.animations.add('idle', [0, 1, 2], 2, true);
        this.animations.play('idle');
    }
}
exports.Pub = Pub;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class Small extends Phaser.Sprite {
    constructor(group, x, y) {
        super(group.game, x, y, 'BuildingSmall', 0);
        group.add(this);
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
    }
}
exports.Small = Small;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const CharacterHurt_1 = __webpack_require__(2);
class AlienQueen extends Phaser.Sprite {
    constructor(group, x, y, key) {
        super(group.game, x, y, key, 0);
        this.dead = false;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(40, 22, 44);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.health = 600;
        this.animations.add('idle', [0, 1, 2], 1, true);
        this.animations.add('die', [2, 3, 4], 12, false);
        this.animations.play('idle');
    }
    update() {
        if (this.health <= 0 && this.isDead() == false) {
            this.die();
        }
    }
    die() {
        this.animations.play('die');
        this.dead = true;
    }
    hurt(damage, fromDirection) {
        const audio = this.game.add.audio('alien-dying', 1, false);
        audio.play();
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, false);
    }
    isDead() {
        return this.dead;
    }
    isDying() {
        return this.health <= 0;
    }
}
exports.AlienQueen = AlienQueen;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StackFSM_1 = __webpack_require__(4);
const State_1 = __webpack_require__(5);
const Energy_1 = __webpack_require__(7);
const Steering_1 = __webpack_require__(8);
const Vision_1 = __webpack_require__(9);
class CitizenBrain {
    constructor(citizen, street, group, fearStatus) {
        this.walk = () => {
            this.energy.decrease();
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAggressive()) {
                this.toFlee();
            }
            else if (this.energy.empty()) {
                this.toRest();
            }
            else {
                if (this.steering.blockedToTheLeft()) {
                    this.steering.walkToTheRight();
                }
                if (this.steering.blockedToTheRight()) {
                    this.steering.walkToTheLeft();
                }
            }
        };
        this.resting = () => {
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAggressive()) {
                this.toFlee();
            }
            else {
                this.energy.increase();
                if (this.energy.minimalAmountToMoveIsReached()) {
                    this.fromRestToWalk();
                }
            }
        };
        this.flee = () => {
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsClose()) {
                if (this.steering.blockedToTheLeft()) {
                    this.steering.runToTheRight();
                }
                if (this.steering.blockedToTheRight()) {
                    this.steering.runToTheLeft();
                }
            }
            else {
                this.fromFleeToWalk();
            }
        };
        this.dying = () => {
        };
        this.fsm = new StackFSM_1.StackFSM();
        this.host = citizen;
        this.street = street;
        this.group = group;
        this.energy = new Energy_1.Energy(this.host.game.rnd);
        this.steering = new Steering_1.Steering(this.host.game.rnd, this.host);
        this.vision = new Vision_1.Vision(this.host, this.street);
        this.fearStatus = fearStatus;
        this.toWalk();
    }
    think() {
        this.fsm.update();
    }
    toWalk() {
        this.host.walk();
        this.fsm.pushState(new State_1.State('walk', this.walk));
    }
    toFlee() {
        this.steering.runFromTheSprite(this.street.player());
        this.fearStatus.frighten();
        this.host.run();
        this.fsm.pushState(new State_1.State('flee', this.flee));
    }
    toRest() {
        this.steering.stop();
        this.host.rest();
        this.fsm.pushState(new State_1.State('resting', this.resting));
    }
    toDie() {
        this.steering.stop();
        this.host.die();
        this.fsm.pushState(new State_1.State('dying', this.dying));
    }
    fromRestToWalk() {
        this.energy.resetWithRandomAmount();
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }
    fromFleeToWalk() {
        this.steering.walkToARandomDirection();
        this.fearStatus.reassure();
        this.host.walk();
        this.fsm.popState();
    }
    currentStateName() {
        return this.fsm.getCurrentState().getName();
    }
}
exports.CitizenBrain = CitizenBrain;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StackFSM_1 = __webpack_require__(4);
const State_1 = __webpack_require__(5);
const Energy_1 = __webpack_require__(7);
const Steering_1 = __webpack_require__(8);
const Vision_1 = __webpack_require__(9);
class CopBrain {
    constructor(cop, gun, street, group) {
        this.patrol = () => {
            this.energy.decrease();
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAliveAndAggressive()) {
                this.toAttack();
            }
            else if (this.energy.empty()) {
                this.toRest();
            }
            else {
                if (this.steering.blockedToTheLeft()) {
                    this.steering.walkToTheRight();
                }
                else if (this.steering.blockedToTheRight()) {
                    this.steering.walkToTheLeft();
                }
            }
        };
        this.resting = () => {
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAliveAndAggressive()) {
                this.toAttack();
            }
            else {
                this.energy.increase();
                if (this.energy.minimalAmountToMoveIsReached()) {
                    this.fromRestToWalk();
                }
            }
        };
        this.attack = () => {
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAlive()) {
                this.steering.stopAndTurnToTheSprite(this.street.player());
                this.host.shot();
                this.gun.fire();
            }
            else {
                this.fromAttackToWalk();
            }
        };
        this.dying = () => {
        };
        this.fsm = new StackFSM_1.StackFSM();
        this.host = cop;
        this.gun = gun;
        this.street = street;
        this.group = group;
        this.energy = new Energy_1.Energy(this.host.game.rnd);
        this.steering = new Steering_1.Steering(this.host.game.rnd, this.host, this.gun);
        this.vision = new Vision_1.Vision(this.host, this.street);
        this.toPatrol();
    }
    think() {
        this.fsm.update();
    }
    toPatrol() {
        this.host.walk();
        this.fsm.pushState(new State_1.State('patrol', this.patrol));
    }
    toDie() {
        this.steering.stop();
        this.host.die();
        this.fsm.pushState(new State_1.State('dying', this.dying));
    }
    toRest() {
        this.steering.stop();
        this.host.rest();
        this.fsm.pushState(new State_1.State('resting', this.resting));
    }
    toAttack() {
        this.fsm.pushState(new State_1.State('attack', this.attack));
    }
    fromRestToWalk() {
        this.energy.resetWithRandomAmount();
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }
    fromAttackToWalk() {
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }
    currentStateName() {
        return this.fsm.getCurrentState().getName();
    }
}
exports.CopBrain = CopBrain;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StackFSM_1 = __webpack_require__(4);
const State_1 = __webpack_require__(5);
const Energy_1 = __webpack_require__(7);
const Steering_1 = __webpack_require__(8);
const Vision_1 = __webpack_require__(9);
class SwatBrain {
    constructor(swat, gun, street, group) {
        this.patrol = () => {
            this.energy.decrease();
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAliveAndAggressive()) {
                this.toAttack();
            }
            else if (this.energy.empty()) {
                this.toRest();
            }
            else {
                if (this.steering.blockedToTheLeft()) {
                    this.steering.walkToTheRight();
                }
                else if (this.steering.blockedToTheRight()) {
                    this.steering.walkToTheLeft();
                }
            }
        };
        this.resting = () => {
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAliveAndAggressive()) {
                this.toAttack();
            }
            else {
                this.energy.increase();
                if (this.energy.minimalAmountToMoveIsReached()) {
                    this.fromRestToWalk();
                }
            }
        };
        this.attack = () => {
            if (this.host.health <= 0) {
                this.toDie();
            }
            else if (this.vision.playerIsCloseAndAlive()) {
                this.steering.stopAndTurnToTheSprite(this.street.player());
                this.host.shot();
                this.gun.fire();
            }
            else {
                this.fromAttackToWalk();
            }
        };
        this.dying = () => {
        };
        this.fsm = new StackFSM_1.StackFSM();
        this.host = swat;
        this.gun = gun;
        this.street = street;
        this.group = group;
        this.energy = new Energy_1.Energy(this.host.game.rnd);
        this.steering = new Steering_1.Steering(this.host.game.rnd, this.host, this.gun);
        this.vision = new Vision_1.Vision(this.host, this.street);
        this.toPatrol();
    }
    think() {
        this.fsm.update();
    }
    toPatrol() {
        this.host.walk();
        this.fsm.pushState(new State_1.State('patrol', this.patrol));
    }
    toDie() {
        this.steering.stop();
        this.host.die();
        this.fsm.pushState(new State_1.State('dying', this.dying));
    }
    toRest() {
        this.steering.stop();
        this.host.rest();
        this.fsm.pushState(new State_1.State('resting', this.resting));
    }
    toAttack() {
        this.fsm.pushState(new State_1.State('attack', this.attack));
    }
    fromRestToWalk() {
        this.energy.resetWithRandomAmount();
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }
    fromAttackToWalk() {
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }
    currentStateName() {
        return this.fsm.getCurrentState().getName();
    }
}
exports.SwatBrain = SwatBrain;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const CitizenBrain_1 = __webpack_require__(29);
const CharacterHurt_1 = __webpack_require__(2);
const FearStatus_1 = __webpack_require__(36);
const PickableItem_1 = __webpack_require__(3);
const BrainStateMarker_1 = __webpack_require__(6);
class Citizen extends Phaser.Sprite {
    constructor(group, x, y, key, street, replicant) {
        super(group.game, x, y, key, 0);
        this.dead = false;
        this.isReplicant = false;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.animations.add('idle', [0, 1, 2, 3, 4], 4, true);
        this.animations.add('walk', [5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
        this.animations.add('run', [5, 6, 7, 8, 9, 10, 11, 12, 13], 24, true);
        if (replicant) {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 12, false);
        }
        else {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20], 12, false);
        }
        this.fearStatus = new FearStatus_1.FearStatus();
        this.brain = new CitizenBrain_1.CitizenBrain(this, street, group, this.fearStatus);
        this.isReplicant = replicant;
        this.street = street;
        new BrainStateMarker_1.BrainStateMarker(group, this, this.brain, replicant);
    }
    update() {
        if (!this.dead) {
            this.brain.think();
        }
    }
    die() {
        if (this.isReplicant) {
            const audio = this.game.add.audio('alien-dying', 1, false);
            audio.play();
        }
        else {
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();
        }
        this.animations.play('die');
        let randMoney = this.group.game.rnd.integerInRange(1, 3);
        if (randMoney === 1) {
            new PickableItem_1.PickableItem(this.group, this.x, this.y, 'Money', this.street.player());
        }
        this.dead = true;
    }
    run() {
        this.animations.play('run');
    }
    walk() {
        this.animations.play('walk');
    }
    rest() {
        this.animations.play('idle');
    }
    hurt(damage, fromDirection) {
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, this.replicant());
    }
    isDead() {
        return this.dead;
    }
    isDying() {
        return this.health <= 0;
    }
    isAfraid() {
        return this.fearStatus.isAfraid();
    }
    replicant() {
        return this.isReplicant;
    }
}
exports.Citizen = Citizen;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Citizens {
    constructor() {
        this.items = [];
    }
    all() {
        return this.items;
    }
    allAlive() {
        return this.items.filter(function (citizen) {
            return citizen.health > 0;
        });
    }
    add(citizen) {
        this.items.push(citizen);
    }
    remove(citizen) {
        const index = this.items.indexOf(citizen);
        this.items.splice(index, 1);
    }
    length() {
        return this.items.length;
    }
}
exports.Citizens = Citizens;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CopBrain_1 = __webpack_require__(30);
const Config_1 = __webpack_require__(0);
const Gun_1 = __webpack_require__(16);
const ShotGun_1 = __webpack_require__(18);
const BulletHits_1 = __webpack_require__(13);
const CharacterHurt_1 = __webpack_require__(2);
const PickableItem_1 = __webpack_require__(3);
const BrainStateMarker_1 = __webpack_require__(6);
class Cop extends Phaser.Sprite {
    constructor(group, x, y, key, street, replicant) {
        super(group.game, x, y, key, 0);
        this.dead = false;
        this.isReplicant = false;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        let gun = null;
        let shotRate = 0;
        if (key === 'cop-shotgun') {
            gun = new ShotGun_1.ShotGun(group, this);
            shotRate = 6;
            this.health = 40;
        }
        else {
            gun = new Gun_1.Gun(group, this);
            shotRate = 12;
            this.health = 1;
        }
        this.animations.add('idle', [0, 1, 2, 3, 4], 4, true);
        this.animations.add('walk', [5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
        this.animations.add('shot', [21, 22, 23, 24, 25, 26], shotRate, false);
        if (replicant) {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20, 27, 28, 29, 30, 31, 32, 33], 12, false);
        }
        else {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20], 12, false);
        }
        this.isReplicant = replicant;
        this.street = street;
        this.bulletHits = new BulletHits_1.BulletHits(this, gun, street);
        this.brain = new CopBrain_1.CopBrain(this, gun, street, group);
        new BrainStateMarker_1.BrainStateMarker(group, this, this.brain, replicant);
    }
    update() {
        if (!this.dead) {
            this.brain.think();
            this.bulletHits.hit();
        }
    }
    die() {
        if (this.isReplicant) {
            const audio = this.game.add.audio('alien-dying', 1, false);
            audio.play();
        }
        else {
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();
        }
        this.animations.play('die');
        if (this.key === 'cop') {
            new PickableItem_1.PickableItem(this.group, this.x, this.y, 'Gun', this.street.player());
        }
        else {
            new PickableItem_1.PickableItem(this.group, this.x, this.y, 'ShotGun', this.street.player());
        }
        this.dead = true;
    }
    walk() {
        this.animations.play('walk');
    }
    rest() {
        this.animations.play('idle');
    }
    shot() {
        this.animations.play('shot');
    }
    hurt(damage, fromDirection) {
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, this.replicant());
    }
    isDying() {
        return this.health <= 0;
    }
    replicant() {
        return this.isReplicant;
    }
}
exports.Cop = Cop;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Cops {
    constructor() {
        this.items = [];
    }
    all() {
        return this.items;
    }
    allAlive() {
        return this.items.filter(function (cop) {
            return cop.health > 0;
        });
    }
    add(cop) {
        this.items.push(cop);
    }
    remove(cop) {
        const index = this.items.indexOf(cop);
        this.items.splice(index, 1);
    }
    length() {
        return this.items.length;
    }
}
exports.Cops = Cops;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FearStatus {
    constructor() {
        this.afraid = false;
    }
    frighten() {
        this.afraid = true;
    }
    reassure() {
        this.afraid = false;
    }
    isAfraid() {
        return this.afraid;
    }
}
exports.FearStatus = FearStatus;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const SwatBrain_1 = __webpack_require__(31);
const MachineGun_1 = __webpack_require__(17);
const BulletHits_1 = __webpack_require__(13);
const CharacterHurt_1 = __webpack_require__(2);
const PickableItem_1 = __webpack_require__(3);
const BrainStateMarker_1 = __webpack_require__(6);
class Swat extends Phaser.Sprite {
    constructor(group, x, y, key, street, replicant) {
        super(group.game, x, y, key, 0);
        this.dead = false;
        this.isReplicant = false;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        let gun = new MachineGun_1.MachineGun(group, this);
        let shotRate = 24;
        this.animations.add('idle', [0, 1, 2, 3, 4], 4, true);
        this.animations.add('walk', [5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
        this.animations.add('shot', [21, 22, 23, 24, 25, 26], shotRate, false);
        if (replicant) {
            this.animations.add('die', [27, 28, 29, 30, 31, 32, 33], 12, false);
        }
        else {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20], 12, false);
        }
        this.brain = new SwatBrain_1.SwatBrain(this, gun, street, group);
        this.isReplicant = replicant;
        this.street = street;
        this.bulletHits = new BulletHits_1.BulletHits(this, gun, street);
        this.health = 100;
        new BrainStateMarker_1.BrainStateMarker(group, this, this.brain, replicant);
    }
    update() {
        if (!this.dead) {
            this.brain.think();
            this.bulletHits.hit();
        }
    }
    die() {
        if (this.isReplicant) {
            const audio = this.game.add.audio('alien-dying', 1, false);
            audio.play();
        }
        else {
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();
        }
        this.animations.play('die');
        new PickableItem_1.PickableItem(this.group, this.x, this.y, 'MachineGun', this.street.player());
        this.dead = true;
    }
    walk() {
        this.animations.play('walk');
    }
    rest() {
        this.animations.play('idle');
    }
    shot() {
        this.animations.play('shot');
    }
    hurt(damage, fromDirection) {
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, this.replicant());
    }
    isDying() {
        return this.health <= 0;
    }
    replicant() {
        return this.isReplicant;
    }
}
exports.Swat = Swat;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Swats {
    constructor() {
        this.items = [];
    }
    all() {
        return this.items;
    }
    allAlive() {
        return this.items.filter(function (swat) {
            return swat.health > 0;
        });
    }
    add(swat) {
        this.items.push(swat);
    }
    remove(swat) {
        const index = this.items.indexOf(swat);
        this.items.splice(index, 1);
    }
    length() {
        return this.items.length;
    }
}
exports.Swats = Swats;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Hero_1 = __webpack_require__(43);
const Cop_1 = __webpack_require__(34);
const Swat_1 = __webpack_require__(37);
const Citizen_1 = __webpack_require__(32);
const AlienQueen_1 = __webpack_require__(28);
const PickableItem_1 = __webpack_require__(3);
class CharactersGenerator {
    constructor(characterGroup, limits, level, backbag, heroController, heroGunType, heroPosition) {
        this.limits = limits;
        this.characterGroup = characterGroup;
        this.level = level;
        this.backbag = backbag;
        this.controller = heroController;
        this.heroGunType = heroGunType;
        this.heroPosition = heroPosition;
    }
    generateHero(street) {
        const x = (this.heroPosition) ? this.heroPosition.x : this.limits.minX();
        const y = (this.heroPosition) ? this.heroPosition.y : this.limits.maxY();
        return new Hero_1.Hero(this.characterGroup, x, y, 'hero', street, this.backbag, this.controller, this.heroGunType);
    }
    generateAlienQueen(hero) {
        const queenX = 700;
        const queenY = 620;
        const firstWeaponX = queenX - 450;
        const firstWeaponY = queenY - 20;
        new PickableItem_1.PickableItem(this.characterGroup, firstWeaponX, firstWeaponY, 'MachineGun', hero);
        new PickableItem_1.PickableItem(this.characterGroup, firstWeaponX, firstWeaponY + 50, 'MachineGun', hero);
        new PickableItem_1.PickableItem(this.characterGroup, firstWeaponX, firstWeaponY + 100, 'MachineGun', hero);
        new PickableItem_1.PickableItem(this.characterGroup, firstWeaponX, firstWeaponY + 150, 'MachineGun', hero);
        return new AlienQueen_1.AlienQueen(this.characterGroup, queenX, queenY, 'AlienQueen');
    }
    generateBots(street, cops, citizens, swats) {
        for (let indCiv = 0; indCiv < this.level.saneCitizens(); indCiv++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            citizens.add(new Citizen_1.Citizen(this.characterGroup, randX, randY, 'citizen1', street, false));
        }
        for (let indCiv = 0; indCiv < this.level.infectedCitizens(); indCiv++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            citizens.add(new Citizen_1.Citizen(this.characterGroup, randX, randY, 'citizen1', street, true));
        }
        for (let indCop = 0; indCop < this.level.saneCowboysWithGun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop_1.Cop(this.characterGroup, randX, randY, 'cop', street, false));
        }
        for (let indCop = 0; indCop < this.level.infectedCowboysWithGun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop_1.Cop(this.characterGroup, randX, randY, 'cop', street, true));
        }
        for (let indCop = 0; indCop < this.level.saneCowboysWithShotgun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop_1.Cop(this.characterGroup, randX, randY, 'cop-shotgun', street, false));
        }
        for (let indCop = 0; indCop < this.level.infectedCowboysWithShotgun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop_1.Cop(this.characterGroup, randX, randY, 'cop-shotgun', street, true));
        }
        for (let indSwat = 0; indSwat < this.level.saneCowboysWithMachinegun(); indSwat++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            swats.add(new Swat_1.Swat(this.characterGroup, randX, randY, 'enemy-machinegun', street, false));
        }
        for (let indSwat = 0; indSwat < this.level.infectedCowboysWithMachinegun(); indSwat++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            swats.add(new Swat_1.Swat(this.characterGroup, randX, randY, 'enemy-machinegun', street, true));
        }
    }
}
exports.CharactersGenerator = CharactersGenerator;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AggressivenessGauge {
    constructor(time) {
        this.aggressiveRating = 0;
        this.time = time;
    }
    increase() {
        this.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
            this.aggressiveRating++;
        }, this);
        this.time.events.add(Phaser.Timer.SECOND * 4, function () {
            this.aggressiveRating--;
        }, this);
    }
    isAggressive() {
        return this.aggressiveRating > 0;
    }
}
exports.AggressivenessGauge = AggressivenessGauge;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BackBag {
    constructor(data) {
        this.gunAmnoAmount = data.gunAmno;
        this.shotgunAmnoAmount = data.shotgunAmno;
        this.machinegunAmnoAmount = data.machinegunAmno;
        this.moneyAmount = data.money;
    }
    gunAmno() {
        return this.gunAmnoAmount;
    }
    shotgunAmno() {
        return this.shotgunAmnoAmount;
    }
    machinegunAmno() {
        return this.machinegunAmnoAmount;
    }
    money() {
        return this.moneyAmount;
    }
}
exports.BackBag = BackBag;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalDirection_1 = __webpack_require__(10);
const Events_1 = __webpack_require__(1);
class BulletHits {
    constructor(myself, street) {
        this.shooter = myself;
        this.street = street;
    }
    hit() {
        const hero = this.shooter;
        const myGun = hero.equippedGun();
        myGun.bulletHits(this.street.cops().allAlive(), function (cop, bullet) {
            cop.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
            if (cop.isDying()) {
                hero.pastGameEvents().register(new Events_1.CopKilled(hero.game.time.now));
            }
        });
        myGun.bulletHits(this.street.swats().allAlive(), function (swat, bullet) {
            swat.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
            if (swat.isDying()) {
                hero.pastGameEvents().register(new Events_1.CopKilled(hero.game.time.now));
            }
        });
        myGun.bulletHits(this.street.citizens().allAlive(), function (citizen, bullet) {
            citizen.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
            bullet.kill();
            if (citizen.isDying()) {
                hero.pastGameEvents().register(new Events_1.CitizenKilled(hero.game.time.now));
            }
        });
        if (this.street.alienQueen()) {
            myGun.bulletHits(this.street.alienQueen(), function (queen, bullet) {
                queen.hurt(myGun.damage(), new HorizontalDirection_1.HorizontalDirection(bullet.body));
                bullet.kill();
            });
        }
    }
}
exports.BulletHits = BulletHits;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Gun_1 = __webpack_require__(16);
const ShotGun_1 = __webpack_require__(18);
const Events_1 = __webpack_require__(1);
const MachineGun_1 = __webpack_require__(17);
const CharacterHurt_1 = __webpack_require__(2);
const HeroCamera_1 = __webpack_require__(14);
const BulletHits_1 = __webpack_require__(42);
const Config_1 = __webpack_require__(0);
const AggressivenessGauge_1 = __webpack_require__(40);
class Hero extends Phaser.Sprite {
    constructor(group, x, y, key, street, backbag, controller, gunIdentifier) {
        super(group.game, x, y, key, 0);
        this.speed = 150;
        this.switchedTime = 0;
        this.dead = false;
        this.moneyAmount = 0;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.inputEnabled = true;
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.gun = new Gun_1.Gun(group, this, backbag.gunAmno());
        this.shotgun = new ShotGun_1.ShotGun(group, this, backbag.shotgunAmno());
        this.machinegun = new MachineGun_1.MachineGun(group, this, backbag.machinegunAmno());
        this.moneyAmount = backbag.money();
        this.animations.add('idle-' + this.gun.identifier(), [0, 1, 2, 3, 4], 4, true);
        this.animations.add('walk-' + this.gun.identifier(), [5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
        this.animations.add('die-' + this.gun.identifier(), [14, 15, 16, 17, 18, 19, 20], 12, false);
        this.animations.add('shot-' + this.gun.identifier(), [21, 22, 23, 24, 25, 26], 12, false);
        this.animations.add('idle-' + this.shotgun.identifier(), [27, 28, 29, 30, 31], 4, true);
        this.animations.add('walk-' + this.shotgun.identifier(), [32, 33, 34, 35, 36, 37, 38, 39, 40], 12, true);
        this.animations.add('die-' + this.shotgun.identifier(), [41, 42, 43, 44, 45, 46, 47], 12, false);
        this.animations.add('shot-' + this.shotgun.identifier(), [48, 49, 50, 51, 52, 53], 6, false);
        this.animations.add('idle-' + this.machinegun.identifier(), [54, 55, 56, 57, 58], 4, true);
        this.animations.add('walk-' + this.machinegun.identifier(), [59, 60, 61, 62, 63, 64, 65, 66, 67], 12, true);
        this.animations.add('die-' + this.machinegun.identifier(), [68, 69, 70, 71, 72, 73, 74], 12, false);
        this.animations.add('shot-' + this.machinegun.identifier(), [75, 76, 77, 78, 79, 80], 24, false);
        this.controller = controller;
        switch (gunIdentifier) {
            case 'Gun':
                this.switchToGun();
                break;
            case 'ShotGun':
                this.switchToShotGun();
                break;
            case 'MachineGun':
                this.switchToMachineGun();
                break;
            default:
                throw new Error("Gun identifier " + gunIdentifier + " is unknown");
        }
        this.cameraFx = new HeroCamera_1.HeroCamera(group.game.camera);
        this.gameEvents = new Events_1.GameEvents();
        this.bulletHits = new BulletHits_1.BulletHits(this, street);
        this.agressivenessGauge = new AggressivenessGauge_1.AggressivenessGauge(this.game.time);
    }
    update() {
        if (this.health <= 0) {
            this.die();
        }
        else {
            this.controls();
            this.bulletHits.hit();
        }
    }
    hurt(damage, fromDirection) {
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHero(this, fromDirection);
    }
    isDying() {
        return this.health <= 0;
    }
    movingToTheRight() {
        return this.body.velocity.x > 0;
    }
    movingToTheLeft() {
        return this.body.velocity.x < 0;
    }
    isAggressive() {
        return this.agressivenessGauge.isAggressive();
    }
    isDead() {
        return this.dead;
    }
    money() {
        return this.moneyAmount;
    }
    gunAmno() {
        return this.gun.amno();
    }
    shotgunAmno() {
        return this.shotgun.amno();
    }
    machinegunAmno() {
        return this.machinegun.amno();
    }
    switchToNextUsableGun() {
        if (this.currentGun === this.gun) {
            if (this.shotgunAmno() > 0) {
                this.switchToShotGun();
            }
            else if (this.machinegunAmno() > 0) {
                this.switchToMachineGun();
            }
        }
        else if (this.currentGun === this.shotgun) {
            if (this.machinegunAmno() > 0) {
                this.switchToMachineGun();
            }
            else if (this.gunAmno() > 0) {
                this.switchToGun();
            }
        }
        else if (this.currentGun === this.machinegun) {
            if (this.gunAmno() > 0) {
                this.switchToGun();
            }
            else if (this.shotgunAmno() > 0) {
                this.switchToShotGun();
            }
        }
    }
    switchToMachineGun() {
        this.currentGun = this.machinegun;
        this.switchGunEffect();
    }
    switchToShotGun() {
        this.currentGun = this.shotgun;
        this.switchGunEffect();
    }
    switchToGun() {
        this.currentGun = this.gun;
        this.switchGunEffect();
    }
    isEquipedWithGun() {
        return this.currentGun == this.gun;
    }
    isEquipedWithShotgun() {
        return this.currentGun == this.shotgun;
    }
    equippedGun() {
        return this.currentGun;
    }
    pick(item) {
        if (item.key === 'Money') {
            const audio = this.game.add.audio('pick-money', 0.5, false);
            audio.play();
            const randAmount = this.game.rnd.integerInRange(2, 50);
            this.moneyAmount = this.moneyAmount + randAmount;
            this.gameEvents.register(new Events_1.MoneyPicked(this.game.time.now, randAmount, this.moneyAmount));
        }
        else if (item.key === 'Gun') {
            const audio = this.game.add.audio('pick-weapon', 1, false);
            audio.play();
            this.gun.reload(11);
            this.gameEvents.register(new Events_1.GunPicked(this.game.time.now));
        }
        else if (item.key === 'ShotGun') {
            const audio = this.game.add.audio('pick-weapon', 1, false);
            audio.play();
            if (this.shotgunAmno() === 0) {
                this.switchToShotGun();
            }
            this.shotgun.reload(6);
            this.gameEvents.register(new Events_1.ShotGunPicked(this.game.time.now));
        }
        else if (item.key === 'MachineGun') {
            const audio = this.game.add.audio('pick-weapon', 1, false);
            audio.play();
            if (this.machinegunAmno() === 0) {
                this.switchToMachineGun();
            }
            this.machinegun.reload(15);
            this.gameEvents.register(new Events_1.MachineGunPicked(this.game.time.now));
        }
        item.kill();
    }
    nurse(hospital) {
        this.moneyAmount -= hospital.nurseCost();
    }
    pastGameEvents() {
        return this.gameEvents;
    }
    controls() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        if (this.controller.shooting()) {
            this.shot();
            // TODO: use justDown to fix this??
        }
        else if (this.controller.switchingWeapon() && this.game.time.now > this.switchedTime) {
            this.switchedTime = this.game.time.now + 500;
            this.switchToNextUsableGun();
        }
        else {
            if (this.controller.goingLeft()) {
                this.scale.x = -Config_1.Config.pixelScaleRatio();
                this.body.velocity.x = -this.speed;
                this.animations.play('walk-' + this.currentGun.identifier());
                this.gun.turnToTheLeft();
                this.shotgun.turnToTheLeft();
                this.machinegun.turnToTheLeft();
            }
            else if (this.controller.goingRight()) {
                this.scale.x = Config_1.Config.pixelScaleRatio();
                this.body.velocity.x = this.speed;
                this.animations.play('walk-' + this.currentGun.identifier());
                this.gun.turnToTheRight();
                this.shotgun.turnToTheRight();
                this.machinegun.turnToTheRight();
            }
            if (this.controller.goingUp()) {
                this.body.velocity.y = -this.speed;
                this.animations.play('walk-' + this.currentGun.identifier());
            }
            else if (this.controller.goingDown()) {
                this.body.velocity.y = this.speed;
                this.animations.play('walk-' + this.currentGun.identifier());
            }
            if (!this.controller.goingLeft() && !this.controller.goingRight() && !this.controller.goingDown() && !this.controller.goingUp()) {
                this.animations.play('idle-' + this.currentGun.identifier());
            }
        }
    }
    shot() {
        this.animations.play('shot-' + this.currentGun.identifier());
        this.currentGun.fire();
        this.shotCameraEffects();
        if (this.currentGun === this.machinegun && this.machinegunAmno() === 0) {
            this.switchToShotGun();
        }
        if (this.currentGun === this.shotgun && this.shotgunAmno() === 0) {
            this.switchToGun();
        }
        this.agressivenessGauge.increase();
    }
    shotCameraEffects() {
        if (this.currentGun === this.machinegun) {
            this.cameraFx.machinegunEffect();
        }
        else if (this.currentGun === this.shotgun) {
            this.cameraFx.shootgunEffect();
        }
        else {
            this.cameraFx.gunEffect();
        }
    }
    switchGunEffect() {
        const switchGunSprite = this.game.add.sprite(this.x - 10, this.y - 40, this.currentGun.identifier(), 1, this.group);
        const duration = 300;
        const tween = this.group.game.add.tween(switchGunSprite).to({ y: switchGunSprite.y - 20 }, duration, "Linear", true);
        tween.onComplete.addOnce(function () { switchGunSprite.destroy(); });
    }
    die() {
        if (!this.dead) {
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();
            this.dead = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('die-' + this.currentGun.identifier());
            this.gameEvents.register(new Events_1.HeroKilled(this.game.time.now));
        }
    }
}
exports.Hero = Hero;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Level {
    constructor(num, data) {
        this.num = num;
        this.tutorialText = data['tutorial'];
        this.buildings = data['buildings'];
        const characters = data['characters'];
        this.nbSaneCitizens = characters['citizens']['sane'];
        this.nbInfectedCitizens = characters['citizens']['infected'];
        this.nbSaneCowboysWithGun = characters['cowboy_with_gun']['sane'];
        this.nbInfectedCowboysWithGun = characters['cowboy_with_gun']['infected'];
        this.nbSaneCowboysWithShotgun = characters['cowboy_with_shotgun']['sane'];
        this.nbInfectedCowboysWithShotgun = characters['cowboy_with_shotgun']['infected'];
        this.nbSaneCowboysWithMachinegun = characters['cowboy_with_machinegun']['sane'];
        this.nbInfectedCowboysWithMachinegun = characters['cowboy_with_machinegun']['infected'];
    }
    number() {
        return this.num;
    }
    saneCitizens() {
        return this.nbSaneCitizens;
    }
    infectedCitizens() {
        return this.nbInfectedCitizens;
    }
    saneCowboysWithGun() {
        return this.nbSaneCowboysWithGun;
    }
    infectedCowboysWithGun() {
        return this.nbInfectedCowboysWithGun;
    }
    saneCowboysWithShotgun() {
        return this.nbSaneCowboysWithShotgun;
    }
    infectedCowboysWithShotgun() {
        return this.nbInfectedCowboysWithShotgun;
    }
    saneCowboysWithMachinegun() {
        return this.nbSaneCowboysWithMachinegun;
    }
    infectedCowboysWithMachinegun() {
        return this.nbInfectedCowboysWithMachinegun;
    }
    tutorial() {
        return this.tutorialText;
    }
    orderedBuildingTypes() {
        return this.buildings;
    }
}
exports.Level = Level;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Level_1 = __webpack_require__(44);
class LevelLoader {
    load(game, levelNumber) {
        const levelsData = JSON.parse(game.cache.getText('levels'));
        const levelData = levelsData[levelNumber - 1];
        const level = new Level_1.Level(levelNumber, levelData);
        return level;
    }
}
exports.LevelLoader = LevelLoader;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DeviceDetector_1 = __webpack_require__(11);
const Config_1 = __webpack_require__(0);
class Boot extends Phaser.State {
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        const detector = new DeviceDetector_1.DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            this.setupMobile();
        }
        this.game.state.start('Preload');
    }
    setupMobile() {
        this.game.scale.setGameSize(this.game.width + Config_1.Config.mobileExtraSidePadding() * 2, this.game.height);
    }
}
exports.default = Boot;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const Controller_1 = __webpack_require__(15);
class Menu extends Phaser.State {
    constructor() {
        super(...arguments);
        this.starting = false;
    }
    create() {
        const verySmallFontSize = 10;
        const smallFontSize = 14;
        const mediumFontSize = 20;
        const largeFontSize = 34;
        this.game.stage.backgroundColor = '#1b1128';
        //this.background = this.game.add.sprite(0, 0, 'Menu');
        //this.background.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        let titleX = 260;
        const titleY = 113;
        this.game.add.bitmapText(titleX, titleY, 'cowboy', 'Cowboys vs Aliens', largeFontSize);
        const storyX = titleX - 150;
        const storyY = titleY + 150;
        const storyText = "Hey Rick MacMorty,\n\n"
            + "Aliens are infesting citizens in our town, you\n"
            + "can't distinguish who is sane or contaminated.\n"
            + "You have only one option... kill them all to stop\n"
            + "this plague and save the far west.\n";
        this.game.add.bitmapText(storyX, storyY, 'cowboy', storyText, mediumFontSize);
        const controlsChoiceX = storyX;
        const controlsChoiceY = storyY + 350;
        this.setupForComputer(controlsChoiceX, controlsChoiceY, smallFontSize);
        const startX = storyX + 250;
        const startY = storyY + 220;
        this.startText = this.game.add.bitmapText(startX, startY, 'cowboy', '', mediumFontSize);
        this.startText.alpha = 1;
        //const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        //tweenAlpha.repeat(10000, 400);
        const gunSprite = this.game.add.sprite(startX - 50, startY, 'Gun', 1);
        gunSprite.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        gunSprite.animations.add('selected', [0, 1], 1, true);
        gunSprite.play('selected');
        const gunSprite2 = this.game.add.sprite(startX + 550, startY, 'Gun', 1);
        gunSprite2.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        gunSprite2.scale.x = -Config_1.Config.pixelScaleRatio();
        gunSprite2.animations.add('selected', [0, 1], 1, true);
        gunSprite2.play('selected');
        const authorX = 860;
        const authorY = 740;
        this.game.add.bitmapText(authorX, authorY, 'carrier-command', 'LDJAM #41 by Nidup', verySmallFontSize);
        const heroSprite = this.game.add.sprite(authorX - 5, authorY - 45, 'hero', 1);
        heroSprite.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        heroSprite.scale.x = -Config_1.Config.pixelScaleRatio();
        heroSprite.animations.add('selected', [0, 1, 2, 3, 4], 4, true);
        heroSprite.play('selected');
        this.music = this.game.add.audio('far-west');
        this.music.loopFull();
        this.shootAudio = this.game.add.audio('shoot');
    }
    setupForComputer(controlsChoiceX, controlsChoiceY, smallFontSize) {
        this.controlsKeyboardText = "Keyboard Controls:\n"
            + " - Move: arrows\n"
            + " - Shoot: space bar\n"
            + " - Switch weapon: S\n";
        this.controlsText = this.game.add.bitmapText(controlsChoiceX, controlsChoiceY, 'cowboy', this.controlsKeyboardText, smallFontSize);
        this.keyboardController = new Controller_1.KeyBoardController(this.game);
        this.chosenController = this.keyboardController;
    }
    update() {
        this.startText.setText('Press space key to start');
        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            this.shootAudio.play('', 0, 0.5, false);
            this.shootAudio.onStop.addOnce(function () {
                this.game.state.start('Play', true, false, this.chosenController.identifier());
            }, this);
        }
    }
    shutdown() {
        this.startText.destroy();
    }
}
exports.default = Menu;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Street_1 = __webpack_require__(50);
const Inventory_1 = __webpack_require__(53);
const BackBag_1 = __webpack_require__(41);
const LevelInstructions_1 = __webpack_require__(54);
const FlashMessages_1 = __webpack_require__(52);
const BuildingLayout_1 = __webpack_require__(21);
const Config_1 = __webpack_require__(0);
const LevelLoader_1 = __webpack_require__(45);
const Controller_1 = __webpack_require__(15);
const DeviceDetector_1 = __webpack_require__(11);
const StreetLimits_1 = __webpack_require__(51);
const CharactersGenerator_1 = __webpack_require__(39);
const Events_1 = __webpack_require__(1);
class Play extends Phaser.State {
    constructor() {
        super(...arguments);
        this.levelNumber = 1;
        this.switchingLevel = false;
        this.previousInventory = null;
        this.controllerType = null;
        this.isFinalLevel = false;
    }
    init(controllerType, level = 1, previousInventory = { 'gunAmno': 100, 'shotgunAmno': 0, 'machinegunAmno': 0, 'money': 0 }, currentGunType = 'Gun', playerPosition = null) {
        this.levelNumber = level;
        this.previousInventory = previousInventory;
        this.switchingLevel = false;
        this.controllerType = controllerType;
        this.previousGunType = currentGunType;
        this.playerPosition = playerPosition;
        if (level == 12) {
            this.isFinalLevel = true;
        }
    }
    create() {
        if (Config_1.Config.debug()) {
            this.game.time.advancedTiming = true;
        }
        this.game.stage.backgroundColor = '#000000';
        const levelLoader = new LevelLoader_1.LevelLoader();
        const level = levelLoader.load(this.game, this.levelNumber);
        const skyLayer = this.game.add.group();
        skyLayer.name = 'Sky';
        const backgroundLayer = this.game.add.group();
        backgroundLayer.name = 'Background';
        const buildingsLayer = this.game.add.group();
        buildingsLayer.name = 'Buildings';
        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';
        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';
        let streetPositionX = 0;
        let sideMarginWidth = 1;
        let rightCameraMarginX = this.game.width;
        const detector = new DeviceDetector_1.DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            streetPositionX += Config_1.Config.mobileExtraSidePadding();
            sideMarginWidth = Config_1.Config.mobileExtraSidePadding();
            rightCameraMarginX -= Config_1.Config.mobileExtraSidePadding();
        }
        const leftCameraMargin = this.game.add.tileSprite(0, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        leftCameraMargin.fixedToCamera = true;
        this.leftBoundMargin = this.game.add.tileSprite(-1, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.leftBoundMargin, Phaser.Physics.ARCADE);
        this.leftBoundMargin.body.immovable = true;
        this.leftBoundMargin.body.allowGravity = false;
        const rightCameraMargin = this.game.add.tileSprite(rightCameraMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        rightCameraMargin.fixedToCamera = true;
        const layout = new BuildingLayout_1.BuildingLayout(level, buildingsLayer, streetPositionX);
        const streetWidth = layout.streetWidth();
        let worldWidth = streetWidth;
        let rightBoundMarginX = streetWidth;
        if (detector.isMobile()) {
            worldWidth += Config_1.Config.mobileExtraSidePadding();
        }
        this.rightBoundMargin = this.game.add.tileSprite(rightBoundMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.rightBoundMargin, Phaser.Physics.ARCADE);
        this.rightBoundMargin.body.immovable = true;
        this.rightBoundMargin.body.allowGravity = false;
        const streetPositionY = 580;
        let topBoundMarginY = streetPositionY - 40;
        this.topBoundMargin = this.game.add.tileSprite(0, topBoundMarginY, worldWidth, 1, 'Top', 0, interfaceLayer);
        this.game.physics.enable(this.topBoundMargin, Phaser.Physics.ARCADE);
        this.topBoundMargin.body.immovable = true;
        this.topBoundMargin.body.allowGravity = false;
        const height = 1200;
        const heightPosition = -400;
        this.sky = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height, 'sky', 0, skyLayer);
        this.sky.tileScale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.background = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height, 'background', 0, backgroundLayer);
        this.background.tileScale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        const streetHeight = 220;
        const street = this.game.add.tileSprite(streetPositionX, streetPositionY, streetWidth, streetHeight, 'Street', 0, buildingsLayer);
        street.tileScale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        let controller = null;
        if (this.controllerType === 'keyboard') {
            controller = new Controller_1.KeyBoardController(this.game);
        }
        else if (this.controllerType === 'gamepad') {
            controller = new Controller_1.GamePadController(this.game);
        }
        else if (this.controllerType === 'virtualpad') {
            controller = new Controller_1.VirtualPadController(this.game);
        }
        else {
            throw new Error('Unknown controller ' + this.controllerType);
        }
        const backbag = new BackBag_1.BackBag(this.previousInventory);
        const limits = new StreetLimits_1.StreetLimits(streetPositionX, streetWidth);
        const generator = new CharactersGenerator_1.CharactersGenerator(this.characterLayer, limits, level, backbag, controller, this.previousGunType, this.playerPosition);
        this.street = new Street_1.Street(generator, this.isFinalLevel);
        this.buildings = layout.buildings();
        new LevelInstructions_1.LevelInstructions(interfaceLayer, streetPositionX, 0, 'LevelInstructions', level);
        new Inventory_1.Inventory(interfaceLayer, streetPositionX + 600, 0, 'Inventory', this.street.player());
        new FlashMessages_1.FlashMessages(interfaceLayer, this.street.player().pastGameEvents(), this.street.player());
        const worldBoundX = 0;
        const worldBoundY = 0;
        const worldHeight = 800;
        this.game.world.setBounds(worldBoundX, worldBoundY, worldWidth, worldHeight);
        this.game.camera.follow(this.street.player());
    }
    update() {
        if (this.isFinalLevel) {
            if (this.street.alienQueen().isDead()) {
                const levelText = this.game.add.bitmapText(100, 300, 'cowboy', 'Congratz, you defeat the aliens!', 30);
                levelText.alpha = 1;
                const tweenAlpha = this.game.add.tween(levelText).to({ alpha: 0 }, 0, "Linear", true);
                this.game.time.events.add(Phaser.Timer.SECOND * 10, function () {
                    this.nextLevel();
                }, this);
            }
        }
        else {
            if (this.street.isEmpty()) {
                this.nextLevel();
            }
        }
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.swats().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.swats().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.swats().all());
        const skyParallaxSpeed = 0.03;
        this.sky.tilePosition.x -= skyParallaxSpeed;
        const backgroundParallaxSpeed = 0.05;
        if (this.street.player().movingToTheRight()) {
            this.background.tilePosition.x -= backgroundParallaxSpeed;
        }
        else if (this.street.player().movingToTheLeft()) {
            this.background.tilePosition.x += backgroundParallaxSpeed;
        }
        this.characterLayer.sort('y', Phaser.Group.SORT_ASCENDING);
        if (this.street.player().isDead()) {
            const hospital = this.buildings.hospital();
            if (hospital && this.street.player().money() >= hospital.nurseCost()) {
                this.street.player().nurse(hospital);
                this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                    this.game.state.start('Play', true, false, this.controllerType, this.levelNumber, this.buildInventory(), this.street.player().equippedGun().identifier(), new Phaser.Point(hospital.entranceX(), hospital.entranceY()));
                    this.street.player().pastGameEvents().register(new Events_1.HeroNursed(this.game.time.now));
                }, this);
            }
            else {
                this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                    this.game.state.start('Play', true, false, this.controllerType, this.levelNumber, this.buildInventory(), this.street.player().equippedGun().identifier());
                }, this);
            }
        }
    }
    render() {
        if (Config_1.Config.debug()) {
            this.game.debug.text("FPS: " + this.game.time.fps + " ", 2, 14, "#00ff00");
            this.game.debug.body(this.street.player());
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteInfo(this.street.player(), 32, 200);
            //this.game.debug.body(this.alienQueen);
            //this.game.debug.body(this.street.citizens().all()[0]);
            //this.game.debug.spriteInfo(this.street.citizens().all()[0], 32, 300);
            //this.game.debug.bodyInfo(this.street.citizens().all()[0], 32, 300);
        }
    }
    shutdown() {
        this.sky.destroy();
        this.background.destroy();
        this.street.player().destroy();
        this.street.citizens().all().map(function (citizen) { citizen.destroy(); });
        this.street.cops().all().map(function (cop) { cop.destroy(); });
        this.street = null;
    }
    nextLevel() {
        if (this.switchingLevel === false) {
            this.switchingLevel = true;
            const levelsData = JSON.parse(this.game.cache.getText('levels'));
            const lastLevelNumber = levelsData.length;
            this.levelNumber++;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                if (this.levelNumber <= lastLevelNumber) {
                    this.game.state.start('Play', true, false, this.controllerType, this.levelNumber, this.buildInventory(), this.street.player().equippedGun().identifier());
                }
                else {
                    this.game.state.start('Menu');
                }
            }, this);
        }
    }
    buildInventory() {
        return {
            'gunAmno': this.street.player().gunAmno(),
            'shotgunAmno': this.street.player().shotgunAmno(),
            'machinegunAmno': this.street.player().machinegunAmno(),
            'money': this.street.player().money(),
        };
    }
}
exports.default = Play;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Preload extends Phaser.State {
    constructor() {
        super(...arguments);
        this.skipMenu = false;
        this.skipToLevel = 1;
    }
    preload() {
        this.loadAudio();
        this.loadLevels();
        this.loadGameImages();
        this.loadFonts();
    }
    create() {
        if (this.skipMenu) {
            this.game.state.start('Play', true, false, 'keyboard', this.skipToLevel);
        }
        else {
            this.game.state.start('Menu');
        }
    }
    loadAudio() {
        this.load.audio('far-west', 'assets/sounds/far-west2.ogg');
        this.load.audio('shoot', 'assets/sounds/single-shoot.ogg');
        this.load.audio('pick-money', 'assets/sounds/pick-money.ogg');
        this.load.audio('pick-weapon', 'assets/sounds/pick-weapon.ogg');
        this.load.audio('alien-dying', 'assets/sounds/alien-dying.ogg');
        this.load.audio('human-dying', 'assets/sounds/human-dying.ogg');
    }
    loadLevels() {
        this.load.text('levels', 'assets/data/levels.json');
    }
    loadGameImages() {
        this.load.spritesheet('Top', 'assets/sprites/top.png', 1, 1);
        this.load.spritesheet('Side', 'assets/sprites/side.png', 12, 12);
        this.load.spritesheet('sky', 'assets/sprites/sky.png', 800, 600);
        this.load.spritesheet('background', 'assets/sprites/background.png', 800, 600);
        this.load.spritesheet('Inventory', 'assets/sprites/inventory.png', 300, 300);
        this.load.spritesheet('LevelInstructions', 'assets/sprites/level.png', 400, 300);
        this.load.spritesheet('citizen1', 'assets/sprites/citizen1.png', 32, 32);
        this.load.spritesheet('cop', 'assets/sprites/cop.png', 32, 32);
        this.load.spritesheet('cop-shotgun', 'assets/sprites/cop-shotgun.png', 32, 32);
        this.load.spritesheet('enemy-machinegun', 'assets/sprites/enemy-machinegun.png', 32, 32);
        this.load.spritesheet('hero', 'assets/sprites/hero.png', 32, 32);
        this.load.spritesheet('Bullet', 'assets/sprites/bullets.png', 10, 10);
        this.load.spritesheet('Marker', 'assets/sprites/markers.png', 20, 20);
        this.load.spritesheet('Gun', 'assets/sprites/gun.png', 20, 20);
        this.load.spritesheet('ShotGun', 'assets/sprites/shotgun.png', 30, 20);
        this.load.spritesheet('MachineGun', 'assets/sprites/machinegun.png', 30, 20);
        this.load.spritesheet('Money', 'assets/sprites/money.png', 20, 20);
        this.load.spritesheet('Menu', 'assets/sprites/menu.png', 800, 600);
        this.load.spritesheet('Street', 'assets/sprites/street.png', 80, 110);
        this.load.spritesheet('BuildingHostel', 'assets/sprites/building-hostel.png', 180, 240);
        this.load.spritesheet('BuildingMedium', 'assets/sprites/building-medium.png', 180, 240);
        this.load.spritesheet('BuildingSmall', 'assets/sprites/building-small.png', 120, 240);
        this.load.spritesheet('AlienQueen', 'assets/sprites/alien-queen.png', 128, 128);
    }
    loadFonts() {
        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.load.bitmapFont('cowboy', 'assets/fonts/cowboy.png', 'assets/fonts/cowboy.fnt');
    }
}
exports.default = Preload;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cops_1 = __webpack_require__(35);
const Citizens_1 = __webpack_require__(33);
const Swats_1 = __webpack_require__(38);
class Street {
    constructor(generator, lastLevel = false) {
        this.copRepository = new Cops_1.Cops();
        this.citizenRepository = new Citizens_1.Citizens();
        this.swatRepository = new Swats_1.Swats();
        generator.generateBots(this, this.cops(), this.citizens(), this.swats());
        this.hero = generator.generateHero(this);
        if (lastLevel) {
            this.queen = generator.generateAlienQueen(this.hero);
        }
    }
    isEmpty() {
        return this.cops().allAlive().length === 0 && this.citizens().allAlive().length === 0 && this.swats().allAlive().length === 0;
    }
    player() {
        return this.hero;
    }
    alienQueen() {
        return this.queen;
    }
    cops() {
        return this.copRepository;
    }
    swats() {
        return this.swatRepository;
    }
    citizens() {
        return this.citizenRepository;
    }
}
exports.Street = Street;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class StreetLimits {
    constructor(streetPositionX, streetWidth) {
        this.streetPositionX = streetPositionX;
        this.streetWidth = streetWidth;
    }
    minY() {
        return 570;
    }
    maxY() {
        return 750;
    }
    minX() {
        return this.streetPositionX + 20;
    }
    maxX() {
        return this.streetWidth - 40;
    }
}
exports.StreetLimits = StreetLimits;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __webpack_require__(1);
class FlashMessages {
    constructor(group, gameEvents, hero) {
        this.group = group;
        this.gameEvents = gameEvents;
        this.gameEvents.addListener(this.buildMessages, this);
        this.hero = hero;
    }
    buildMessages(raisedEvent, callbackContext) {
        const messages = [];
        if (raisedEvent instanceof Events_1.CopKilled) {
            callbackContext.buildCarnageMessage(messages);
        }
        if (raisedEvent instanceof Events_1.CitizenKilled) {
            callbackContext.buildCarnageMessage(messages);
        }
        if (raisedEvent instanceof Events_1.ShotGunPicked) {
            callbackContext.buildFirstShotgunMessage(messages);
        }
        if (raisedEvent instanceof Events_1.MachineGunPicked) {
            callbackContext.buildFirstMachinegunMessage(messages);
        }
        if (raisedEvent instanceof Events_1.MoneyPicked) {
            callbackContext.buildPickedMoneyMessage(messages, raisedEvent);
        }
        if (raisedEvent instanceof Events_1.HeroNursed) {
            messages.push(new Message("Got nursed :)"));
        }
        else if (raisedEvent instanceof Events_1.HeroKilled) {
            messages.push(new Message("Got killed :("));
        }
        const x = callbackContext.hero.x - 130;
        const fromY = 500;
        let startDelay = 0;
        messages.forEach(function (message) {
            const newMessage = callbackContext.group.game.add.bitmapText(x, fromY, 'cowboy', message.content(), 20);
            const duration = 3000;
            const tweenAlpha = callbackContext.group.game.add.tween(newMessage).to({ alpha: 0 }, duration, "Linear", true, startDelay);
            callbackContext.group.game.add.tween(newMessage).to({ y: newMessage.y - 400 }, duration, "Linear", true, startDelay);
            tweenAlpha.onComplete.addOnce(function () { newMessage.destroy(); });
            startDelay = startDelay + 350;
        });
    }
    buildCarnageMessage(messages) {
        const lastSeconds = this.group.game.time.now - 10000;
        const lastKilledEvents = this.gameEvents.all()
            .filter(function (event) {
            return event instanceof Events_1.CitizenKilled || event instanceof Events_1.CopKilled;
        }).filter(function (event) {
            return event.time() >= lastSeconds;
        });
        if (lastKilledEvents.length >= 10) {
            messages.push(new Message("Rampage! " + "more than ten kills in ten seconds!"));
        }
        else if (lastKilledEvents.length >= 6) {
            messages.push(new Message("Carnage! " + "more than six killed in ten seconds!"));
        }
        else if (lastKilledEvents.length >= 3) {
            messages.push(new Message("Butchery! " + "more than three killed in ten seconds!"));
        }
    }
    buildFirstShotgunMessage(messages) {
        const shotgunPickedEvents = this.gameEvents.all().filter(function (event) {
            return event instanceof Events_1.ShotGunPicked;
        });
        if (shotgunPickedEvents.length === 1) {
            messages.push(new Message("Got a shotgun, hell yeah!"));
        }
    }
    buildFirstMachinegunMessage(messages) {
        const machinePickedEvents = this.gameEvents.all().filter(function (event) {
            return event instanceof Events_1.MachineGunPicked;
        });
        if (machinePickedEvents.length === 1) {
            messages.push(new Message("Got a machinegun, hell yeah!"));
        }
    }
    buildPickedMoneyMessage(messages, raisedEvent) {
        const moneyPickedEvents = this.gameEvents.all().filter(function (event) {
            return event instanceof Events_1.MoneyPicked;
        });
        if (raisedEvent.totalAmount() >= 100 && raisedEvent.totalAmount() - raisedEvent.pickedAmount() <= 100) {
            messages.push(new Message("Money! Hundred bucks picked!"));
        }
        else if (raisedEvent.totalAmount() >= 500 && raisedEvent.totalAmount() - raisedEvent.pickedAmount() <= 500) {
            messages.push(new Message("Money! Five hundred bucks picked!"));
        }
        else if (raisedEvent.totalAmount() >= 1000 && raisedEvent.totalAmount() - raisedEvent.pickedAmount() <= 1000) {
            messages.push(new Message("Money! Thousand bucks picked!"));
        }
        else if (moneyPickedEvents.length === 1) {
            messages.push(new Message("Money! " + raisedEvent.pickedAmount() + " bucks picked!"));
        }
    }
}
exports.FlashMessages = FlashMessages;
class Message {
    constructor(content) {
        this.text = content;
    }
    content() {
        return this.text;
    }
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const HeroCamera_1 = __webpack_require__(14);
const Events_1 = __webpack_require__(1);
class Inventory extends Phaser.Sprite {
    constructor(group, x, y, key, player) {
        super(group.game, x, y, key, 0);
        this.player = player;
        group.add(this);
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.fixedToCamera = true;
        const statusX = this.x + 435;
        const statusY = 60;
        this.statusText = this.game.add.bitmapText(statusX, statusY, 'cowboy', '0', 17);
        this.statusText.fixedToCamera = true;
        this.statusText.align = 'right';
        const fontSize = 13;
        const marginLeftAmountToImage = 80;
        const marginTopAmountToImage = 15;
        const gunX = this.x + 527;
        const gunY = 145;
        this.gunSprite = group.game.add.sprite(gunX, gunY, 'Gun', 1, group);
        this.gunSprite.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.gunSprite.fixedToCamera = true;
        this.gunSprite.animations.add('unselected', [0]);
        this.gunSprite.animations.add('selected', [0, 1], 1, true);
        this.gunSprite.play('selected');
        this.gunText = this.game.add.bitmapText(gunX - marginLeftAmountToImage, gunY + marginTopAmountToImage, 'carrier-command', '0', fontSize);
        this.gunText.fixedToCamera = true;
        this.gunText.align = 'right';
        const shotgunX = gunX - 16;
        const shotgunY = gunY + 70;
        this.shotgunSprite = group.game.add.sprite(shotgunX, shotgunY, 'ShotGun', 1, group);
        this.shotgunSprite.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.shotgunSprite.fixedToCamera = true;
        this.shotgunSprite.animations.add('unselected', [0]);
        this.shotgunSprite.animations.add('selected', [0, 1], 1, true);
        this.shotgunSprite.play('unselected');
        this.shotgunText = this.game.add.bitmapText(shotgunX - marginLeftAmountToImage, shotgunY + marginTopAmountToImage, 'carrier-command', '0', fontSize);
        this.shotgunText.fixedToCamera = true;
        this.shotgunText.align = 'right';
        const machinegunX = shotgunX;
        const machinegunY = shotgunY + 70;
        this.machinegunSprite = group.game.add.sprite(machinegunX, machinegunY, 'MachineGun', 1, group);
        this.machinegunSprite.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.machinegunSprite.fixedToCamera = true;
        this.machinegunSprite.animations.add('unselected', [0]);
        this.machinegunSprite.animations.add('selected', [0, 1], 1, true);
        this.machinegunSprite.play('unselected');
        this.machinegunText = this.game.add.bitmapText(machinegunX - marginLeftAmountToImage, machinegunY + marginTopAmountToImage, 'carrier-command', '0', fontSize);
        this.machinegunText.fixedToCamera = true;
        this.machinegunText.align = 'right';
        const moneyX = machinegunX;
        const moneyY = machinegunY + 70;
        this.moneySprite = group.game.add.sprite(moneyX, moneyY, 'Money', 0, group);
        this.moneySprite.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.moneySprite.fixedToCamera = true;
        this.moneyText = this.game.add.bitmapText(moneyX - marginLeftAmountToImage, moneyY + marginTopAmountToImage, 'carrier-command', '0', fontSize);
        this.moneyText.fixedToCamera = true;
        this.cameraFX = new HeroCamera_1.HeroCamera(group.game.camera);
        player.pastGameEvents().addListener(this.collectItem, this);
    }
    update() {
        if (this.player.isDead()) {
            this.statusText.setText('  Dead');
            this.cameraFX.dyingEffect();
        }
        else if (this.player.isAggressive()) {
            this.statusText.setText('Wanted');
            this.cameraFX.warningEffect();
        }
        else {
            this.statusText.setText(' Alive');
        }
        if (this.player.isEquipedWithGun()) {
            this.gunSprite.play('selected');
            this.shotgunSprite.play('unselected');
            this.machinegunSprite.play('unselected');
        }
        else if (this.player.isEquipedWithShotgun()) {
            this.gunSprite.play('unselected');
            this.shotgunSprite.play('selected');
            this.machinegunSprite.play('unselected');
        }
        else {
            this.gunSprite.play('unselected');
            this.shotgunSprite.play('unselected');
            this.machinegunSprite.play('selected');
        }
        this.moneyText.setText(this.alignText(this.player.money()));
        this.gunText.setText(this.alignText(this.player.gunAmno()));
        this.shotgunText.setText(this.alignText(this.player.shotgunAmno()));
        this.machinegunText.setText(this.alignText(this.player.machinegunAmno()));
    }
    alignText(amount) {
        let text = "" + amount;
        if (amount < 10) {
            text = "  " + amount;
        }
        else if (amount < 100) {
            text = " " + amount;
        }
        return text;
    }
    collectItem(raisedEvent, callbackContext) {
        let itemSpriteToShake = null;
        if (raisedEvent instanceof Events_1.GunPicked) {
            itemSpriteToShake = callbackContext.gunSprite;
        }
        else if (raisedEvent instanceof Events_1.ShotGunPicked) {
            itemSpriteToShake = callbackContext.shotgunSprite;
        }
        else if (raisedEvent instanceof Events_1.MachineGunPicked) {
            itemSpriteToShake = callbackContext.machinegunSprite;
        }
        else if (raisedEvent instanceof Events_1.MoneyPicked) {
            itemSpriteToShake = callbackContext.moneySprite;
        }
        if (itemSpriteToShake) {
            const formerAngle = itemSpriteToShake.angle;
            const newAngle = formerAngle - 15;
            const formerY = itemSpriteToShake.y;
            const newY = formerY - 5;
            const tween = callbackContext.game.add.tween(itemSpriteToShake).to({ y: newY, angle: newAngle }, 100, Phaser.Easing.Bounce.Out);
            const nextTween = callbackContext.game.add.tween(itemSpriteToShake).to({ y: formerY, angle: formerAngle }, 100, Phaser.Easing.Bounce.Out);
            tween.chain(nextTween).start();
        }
    }
}
exports.Inventory = Inventory;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class LevelInstructions extends Phaser.Sprite {
    constructor(group, x, y, key, level) {
        super(group.game, x, y, key, 0);
        group.add(this);
        this.scale.setTo(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.fixedToCamera = true;
        const fontTutorialSize = 13;
        const levelToDaysNumber = {
            1: 'One',
            2: 'Two',
            3: 'Three',
            4: 'Four',
            5: 'Five',
            6: 'Six',
            7: 'Seven',
            8: 'Eight',
            9: 'Nine',
            10: 'Ten',
            11: 'Eleven',
            12: 'Twelve',
            13: 'Thirteen'
        };
        const lineLength = 48;
        const fullText = level.tutorial();
        const tokens = fullText.split(' ');
        let lines = [];
        let line = 'Day ' + levelToDaysNumber[level.number()] + ": ";
        tokens.forEach(function (token) {
            if ((line + token).length >= lineLength) {
                lines.push(line);
                line = "";
            }
            line += " " + token;
        });
        lines.push(line);
        let formattedText = "";
        lines.forEach(function (line) {
            formattedText += line.trim() + "\n";
        });
        const tutorialText = this.game.add.bitmapText(this.x + 45, 45, 'cowboy', formattedText, fontTutorialSize);
        tutorialText.fixedToCamera = true;
        const levelText = this.game.add.bitmapText(400, 300, 'cowboy', 'Day ' + levelToDaysNumber[level.number()], 40);
        levelText.alpha = 1;
        const tweenAlpha = this.game.add.tween(levelText).to({ alpha: 0 }, 0, "Linear", true);
    }
}
exports.LevelInstructions = LevelInstructions;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ })
/******/ ]);