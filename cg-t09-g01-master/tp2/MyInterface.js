import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        this.gui.add(this.scene, 'displayParallelogram').name('DisplayParallelogram');

        this.gui.add(this.scene, 'displayMyTriangleSmall').name('Display Small Triangle');

        this.gui.add(this.scene, 'displayMyTriangleBig').name('Display Big Triangle');

        this.gui.add(this.scene, 'displayMyUnitCube').name('Display Unit Cube');

        this.gui.add(this.scene, 'displayMyTangram').name('Display Tangram');

        this.gui.add(this.scene, 'displayMyQuad').name('Display Quad');

        this.gui.add(this.scene, 'displayMyUnitCubeQuad').name('Display Unit Cube Quad');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        

        return true;
    }
}