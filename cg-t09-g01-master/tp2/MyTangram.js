import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
	}
	
    display() {
        
        this.scene.pushMatrix();
        var trans1 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
           -2, -3, 0, 1
        ];
    
        this.scene.multMatrix(trans1);

        var rot1 = [
            (Math.sqrt(2)/2),  (Math.sqrt(2)/2), 0, 0,
           -(Math.sqrt(2)/2), (Math.sqrt(2)/2), 0, 0,
            0,            0,           1, 0,
            0,            0,           0, 1
        ];

        this.scene.multMatrix(rot1);
        this.scene.setDiffuse(0.2, 0.9, 0, 0);
        this.diamond.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.rotate(0.5 * Math.PI, 0, 0, 1);
        this.scene.translate(-1.27, 1.69, 0);
        this.scene.scale(1.04, 1.04, 1.04);
        this.scene.setDiffuse(1, 0.4, 0.5, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-0.5 * Math.PI, 0, 0, 1);
        this.scene.translate(0.25, -2.7, 0);
        this.scene.scale(1.03, 1.03, 1.03);
        this.scene.setDiffuse(0, 0.3, 0.9, 0);
        this.trianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0.5 * Math.PI, 0, 0, 1);
        this.scene.translate(1.82, 0.65, 0);
        this.scene.scale(1.03, 1.03, 1.03);
        this.scene.setDiffuse(1, 0.5, 0, 0);
        this.trianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0.75 * Math.PI, 0, 0, 1);
        this.scene.translate(-0.12, 1.06, 0);
        this.scene.scale(-1.04, 1.04, 1.04);
        this.scene.setDiffuse(0.8, 0.8, 0, 0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(1.55, -3.04, 0);
        this.scene.scale(0.745, 0.745, 0.745);
        this.scene.setDiffuse(0.6, 0, 0.8, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-1 * Math.PI, 0, 0, 1);
        this.scene.translate(-2.29, 2.73, 0);
        this.scene.scale(1.05, 1.05, 1.05);
        this.scene.setDiffuse(1, 0.1, 0, 1);
        this.trianglesmall.display();
        this.scene.popMatrix();
    }
}