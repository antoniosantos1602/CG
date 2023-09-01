//import {CGFobject/*, CGFtextureRTT, CGFtexture*/} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFobject } from "../lib/CGF.js";
import {CGFOBJModel} from "./CGFOBJModel.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject{
	constructor(scene) {
		super(scene);
        this.scene = scene;

        this.nest_top = new CGFOBJModel(this.scene, 'models/nest.obj');
        this.nest_base = new CGFOBJModel(this.scene, 'models/nest_base.obj');

        this.nestTexture = new CGFtexture(this.scene, "images/nest.jpg");

        this.nestTopTextureApp = new CGFappearance(this.scene);
        this.nestTopTextureApp.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.nestTopTextureApp.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.nestTopTextureApp.setTexture(this.nestTexture);

        this.nestBaseTextureApp = new CGFappearance(this.scene);
        this.nestBaseTextureApp.setAmbient(0.15, 0.15, 0.15, 0.15);
        this.nestBaseTextureApp.setDiffuse(1, 1, 1, 1);
        this.nestBaseTextureApp.setTexture(this.nestTexture);
	}

    initBuffers() {
        this.normals = [];
        for (var i = 0; i <= 2 * 0.5 + 1; i++) {
            this.normals.push(0, 0, 1);
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

	
    display() {
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.pushMatrix();
        this.nestTopTextureApp.apply();
        this.scene.translate(-40, -60, 30);
        this.scene.scale(5,5, 5);
        this.nest_top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.nestBaseTextureApp.apply();
        this.scene.translate(-40, -60, 30);
        this.scene.scale(5,5, 5);
        this.nest_base.display();
        this.scene.popMatrix();
    }

}