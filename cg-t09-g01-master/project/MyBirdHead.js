//import {CGFobject/*, CGFtextureRTT, CGFtexture*/} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFobject } from "../lib/CGF.js";
import {CGFOBJModel} from "./CGFOBJModel.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject{
	constructor(scene) {
		super(scene);
        this.scene = scene
        this.eyes = new CGFOBJModel(scene, 'models/bird_head_eyes_v2.obj');
        this.head_head = new CGFOBJModel(scene, 'models/bird_head_head.obj');
        this.beak = new CGFOBJModel(scene, 'models/bird_head_beak.obj');
        this.orangeTexture = new CGFtexture(scene, 'images/orange_better.jpg');
        this.blueTexture = new CGFtexture(scene, 'images/blue_better.jpg');
        this.blackTexture = new CGFtexture(scene, 'images/black_better.jpg');
        this.initMaterials(scene);

	}

    initMaterials() {
        // Orange material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setTexture(this.orangeTexture);
        this.orangeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.orangeMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.orangeMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);

        // Blue material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setTexture(this.blueTexture);
        this.blueMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.blueMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.blueMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);

        // Black material
        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setTexture(this.blackTexture);
        this.blackMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.blackMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.blackMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
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
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

	
    display() {
        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.blackMaterial.apply();
        this.eyes.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.blueMaterial.apply();
        this.head_head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.orangeMaterial.apply();
        this.beak.display();
        this.scene.popMatrix();
    }
}