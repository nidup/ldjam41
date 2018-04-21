
import {Config} from "../../Config";
import {Controller, GamePadController, KeyBoardController, VirtualPadController} from "../Controller";
import {DeviceDetector} from "../DeviceDetector";

export default class Menu extends Phaser.State {

    private startText : Phaser.BitmapText;
    private keyboardController: KeyBoardController;
    private gamepadController: GamePadController;
    private gamepadIndicatorSprite: Phaser.Sprite;
    private gamepadIndicatorText : Phaser.BitmapText;
    private controlsKeyboardText: string;
    private controlsGamepadText: string;
    private controlsVirtualpadText: string;
    private controlsText: Phaser.BitmapText;
    private chosenController: Controller;
    private isMobile: boolean;

    public create ()
    {
        const detector = new DeviceDetector(this.game.device);
        this.isMobile = detector.isMobile();

        const smallFontSize = 10;
        const mediumFontSize = 20;
        const largeFontSize = 34;
        this.game.stage.backgroundColor = '#1b1128';

        //this.background = this.game.add.sprite(0, 0, 'Menu');
        //this.background.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        let titleX = 260;
        if (this.isMobile) {
            titleX += Config.mobileExtraSidePadding();
        }
        const titleY = 113;
        this.game.add.bitmapText(titleX, titleY, 'cowboy','Cowboys vs Aliens', largeFontSize);

        const storyX = titleX - 100;
        const storyY = titleY + 100;
        const storyText = "Hey Rick,\n\n"
            +"Aliens are infesting citizens in our town, you\n"
            +"can't distinguish who is sane or contaminated.\n"
            +"You have only one option... kill them all to stop\n"
            +"this plague.\n";
        this.game.add.bitmapText(storyX, storyY, 'cowboy',storyText, mediumFontSize);

        const controlsChoiceX = storyX;
        const controlsChoiceY = storyY + 250;
        if (this.isMobile) {
            this.setupForMobile(controlsChoiceX, controlsChoiceY, smallFontSize);
        } else {
            this.setupForComputer(controlsChoiceX, controlsChoiceY, smallFontSize);
        }

        const startX = storyX + 400;
        const startY = storyY + 250;
        this.startText = this.game.add.bitmapText(startX, startY, 'carrier-command','', smallFontSize);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 500);

        const authorX = 900;
        const authorY = 740;
        this.game.add.bitmapText(authorX, authorY, 'carrier-command','LDJAM #41 by Nidup, 2018', smallFontSize);
    }

    private setupForMobile(controlsChoiceX: number, controlsChoiceY:number, smallFontSize: number)
    {
        this.controlsVirtualpadText = "Controls [Virtual Gamepad Selected]:\n\n"
            +" - Move: arrows\n\n"
            +" - Fire: button X\n\n"
            +" - Switch weapon: button Y\n\n";
        this.controlsText = this.game.add.bitmapText(controlsChoiceX, controlsChoiceY, 'carrier-command',this.controlsVirtualpadText, smallFontSize);

        this.chosenController = new VirtualPadController(this.game);
    }

    private setupForComputer(controlsChoiceX: number, controlsChoiceY:number, smallFontSize: number)
    {
        this.controlsKeyboardText = "Controls [Keyboard Selected]:\n\n"
            +" - Move: arrows\n\n"
            +" - Fire: space bar\n\n"
            +" - Switch weapon: S\n\n";
        this.controlsGamepadText = "Controls [Gamepad Selected]:\n\n"
            +" - Move: arrows\n\n"
            +" - Fire: button X\n\n"
            +" - Switch weapon: button Y\n\n";
        this.controlsText = this.game.add.bitmapText(controlsChoiceX, controlsChoiceY, 'carrier-command',this.controlsKeyboardText, smallFontSize);

        this.keyboardController = new KeyBoardController(this.game);
        this.gamepadController = new GamePadController(this.game);
        this.chosenController = this.keyboardController;

        const indicatorX = 50;
        const indicatorY = 730;
        this.gamepadIndicatorSprite = this.game.add.sprite(indicatorX,indicatorY, 'ControllerIndicator');
        this.gamepadIndicatorSprite.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.gamepadIndicatorText = this.game.add.bitmapText(indicatorX + 50, indicatorY + 10, 'carrier-command','', smallFontSize);
    }

    public update()
    {
        if (this.isMobile) {
            this.startText.setText('Press X key to start');
        } else {
            if (this.gamepadController.supported()) {
                this.gamepadIndicatorSprite.animations.frame = 0;

                if (this.chosenController.switchingWeapon()) {
                    if (this.chosenController === this.keyboardController) {
                        this.chosenController = this.gamepadController;
                        this.controlsText.setText(this.controlsGamepadText);
                    } else {
                        this.chosenController = this.keyboardController;
                        this.controlsText.setText(this.controlsKeyboardText);
                    }
                }

                if (this.chosenController === this.keyboardController) {
                    this.gamepadIndicatorText.setText('Keyboard is selected, press S key to use gamepad');
                    this.startText.setText('Press space key to start');
                } else {
                    this.gamepadIndicatorText.setText('Gamepad is selected, press Y button to use keyboard');
                    this.startText.setText('Press X button to start');
                }

            } else {
                this.gamepadIndicatorSprite.animations.frame = 1;
                this.gamepadIndicatorText.setText('Gamepad is not supported, try to re-plug');
                this.startText.setText('Press space key to start');
                this.chosenController = this.keyboardController;
            }
        }

        if (this.chosenController.shooting()) {
            this.game.state.start('Play', true, false, this.chosenController.identifier());
        }
    }

    public shutdown ()
    {
        this.startText.destroy();
    }
}
