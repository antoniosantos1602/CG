import {CGFobject, CGFtextureRTT, CGFtexture} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangle2 } from "./MyTriangle2.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleBig2 } from "./MyTriangleBig2.js";
import { CGFappearance } from '../lib/CGF.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.triangle2 = new MyTriangle2(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
        this.trianglebig2 = new MyTriangleBig2(scene);
        this.orangeTexture = new CGFtexture(scene, 'images/tangram.png');
        this.blueTexture = new CGFtexture(scene, 'images/tangram.png');
        this.pinkTexture = new CGFtexture(scene, 'images/tangram.png');
        this.greenTexture = new CGFtexture(scene, 'images/tangram.png');
        this.yellowTexture = new CGFtexture(scene, 'images/tangram.png');
        this.purpleTexture = new CGFtexture(scene, 'images/tangram.png');
        this.redTexture = new CGFtexture(scene, 'images/tangram.png');
        this.initMaterials(scene);
	}

    initMaterials() {
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setTexture(this.pinkTexture);
        this.pinkMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.pinkMaterial.setAmbient(0, 0, 0, 1.0);
        this.pinkMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.pinkMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.pinkMaterial.setShininess(10);

        // Purple material (no ambient, high specular)
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setTexture(this.purpleTexture);
        this.purpleMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.purpleMaterial.setAmbient(0, 0, 0, 1.0);
        this.purpleMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.purpleMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.purpleMaterial.setShininess(10);

        // Red material (no ambient, high specular)
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setTexture(this.redTexture);
        this.redMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.redMaterial.setAmbient(0, 0, 0, 1.0);
        this.redMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.redMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.redMaterial.setShininess(10);

        // Green material (no ambient, high specular)
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setTexture(this.greenTexture);
        this.greenMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.greenMaterial.setAmbient(0, 0, 0, 1.0);
        this.greenMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.greenMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.greenMaterial.setShininess(10);

        // Blue material (no ambient, high specular)
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setTexture(this.blueTexture);
        this.blueMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.blueMaterial.setAmbient(0, 0, 0, 1.0);
        this.blueMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.blueMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.blueMaterial.setShininess(10);

        // Orange material (no ambient, high specular)
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setTexture(this.orangeTexture);
        this.orangeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.orangeMaterial.setAmbient(0, 0, 0, 1.0);
        this.orangeMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.orangeMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.orangeMaterial.setShininess(10);

        // Yellow material (no ambient, high specular)
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setTexture(this.yellowTexture);
        this.yellowMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.yellowMaterial.setAmbient(0, 0, 0, 1.0);
        this.yellowMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.yellowMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.yellowMaterial.setShininess(10);
    }

    initBuffers() {
        // Generating normals
        /*
        As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
        So all the vertices will have the same normal, (0, 0, 1).
        */
        this.normals = [];
        for (var i = 0; i <= 2 * 0.5 + 1; i++) {
            this.normals.push(0, 0, 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
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
        //this.scene.setDiffuse(0.2, 0.9, 0, 0);
        this.greenMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.rotate(0.5 * Math.PI, 0, 0, 1);
        this.scene.translate(-1.27, 1.69, 0);
        this.scene.scale(1.04, 1.04, 1.04);
        //this.scene.setDiffuse(1, 0.4, 0.5, 0);
        this.pinkMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-0.5 * Math.PI, 0, 0, 1);
        this.scene.translate(0.25, -2.7, 0);
        this.scene.scale(1.03, 1.03, 1.03);
        //this.scene.setDiffuse(0, 0.3, 0.9, 0);
        this.blueMaterial.apply();
        this.trianglebig2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0.5 * Math.PI, 0, 0, 1);
        this.scene.translate(1.82, 0.65, 0);
        this.scene.scale(1.03, 1.03, 1.03);
        //this.scene.setDiffuse(1, 0.5, 0, 0);
        this.orangeMaterial.apply();
        this.trianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0.75 * Math.PI, 0, 0, 1);
        this.scene.translate(-0.12, 1.06, 0);
        this.scene.scale(-1.04, 1.04, 1.04);
        //this.scene.setDiffuse(0.8, 0.8, 0, 0);
        this.yellowMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(1.55, -3.04, 0);
        this.scene.scale(0.745, 0.745, 0.745);
        //this.scene.setDiffuse(0.6, 0, 0.8, 0);
        this.purpleMaterial.apply();
        this.triangle2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-1 * Math.PI, 0, 0, 1);
        this.scene.translate(-2.29, 2.73, 0);
        this.scene.scale(1.05, 1.05, 1.05);
        //this.scene.setDiffuse(1, 0.1, 0, 1);
        this.redMaterial.apply();
        this.trianglesmall.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.trianglebig.enableNormalViz();
        this.trianglesmall.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
      }
      
      disableNormalViz() {
        this.trianglebig.disableNormalViz();
        this.trianglesmall.disableNormalViz();
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
      }
      
      updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
      }
      

}