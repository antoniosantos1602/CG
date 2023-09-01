import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);
	}
	
    display() {
        
        // top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(-1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        // bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        // front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(0, 1, 0, 0);
        this.scene.scale(1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        // back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(0, 1, 0, 0);
        this.scene.scale(-1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        // right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();

        // left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(-1, 1, 1);
        this.quad.display();
        this.scene.popMatrix();
    }
}