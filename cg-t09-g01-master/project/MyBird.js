//import {CGFobject/*, CGFtextureRTT, CGFtexture*/} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFobject } from "../lib/CGF.js";
import {CGFOBJModel} from "./CGFOBJModel.js";
import {MyBirdHead} from "./MyBirdHead.js";
import { MyBirdEgg } from "./MyBirdEgg.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject{
	constructor(scene) {
		super(scene);
        this.scene = scene
        this.tail = new CGFOBJModel(scene, 'models/bird_tail.obj');
        this.body = new CGFOBJModel(scene, 'models/bird_body.obj');
        this.legs = new CGFOBJModel(scene, 'models/bird_legs.obj');
        this.head = new MyBirdHead(scene);
        this.leftWing = new CGFOBJModel(scene, 'models/bird_wing_left.obj');
        this.rightWing = new CGFOBJModel(scene, 'models/bird_wing_right.obj');
        this.blueTexture = new CGFtexture(scene, 'images/blue_better.jpg');
        this.yellowTexture = new CGFtexture(scene, 'images/yellow_better.jpg');
        this.posX = -10;
        this.posY = -15;
        this.posZ = 0;
        this.ori = 0;
        this.speed = 0;
        this.freq = 0;
        this.birdShader = new CGFshader(scene.gl, "shaders/bird.vert", "shaders/bird.frag");
        this.birdShader.setUniformsValues({ timeFactor: 1 });
        this.birdShader.setUniformsValues({ frequency: 2 });
        this.rightWingShader = new CGFshader(scene.gl, "shaders/right_wing.vert", "shaders/bird.frag");
        this.rightWingShader.setUniformsValues({ timeFactor: 1 });
        this.rightWingShader.setUniformsValues({ frequency: 2 });
        this.leftWingShader = new CGFshader(scene.gl, "shaders/left_wing.vert", "shaders/bird.frag");
        this.leftWingShader.setUniformsValues({ timeFactor: 1 });
        this.leftWingShader.setUniformsValues({ frequency: 2 });
        this.tailShader = new CGFshader(scene.gl, "shaders/tail.vert", "shaders/bird.frag");
        this.tailShader.setUniformsValues({ timeFactor: 1 });
        this.tailShader.setUniformsValues({ frequency: 2 });
        this.egg = new MyBirdEgg(this.scene, 20, 20,false);
        this.holdEgg = 0;

        this.initMaterials(scene);

	}

    initMaterials() {
        // Blue material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setTexture(this.blueTexture);
        this.blueMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.blueMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.blueMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);

        // Yellow material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setTexture(this.yellowTexture);
        this.yellowMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.yellowMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.yellowMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);

        this.eggTexture = new CGFtexture(this.scene, "images/eggshell.jpg");
        this.eggTextureApp = new CGFappearance(this.scene);
        this.eggTextureApp.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp.setTexture(this.eggTexture);

        this.eggTexture2 = new CGFtexture(this.scene, "images/eggshell2.jpg");
        this.eggTextureApp2 = new CGFappearance(this.scene);
        this.eggTextureApp2.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp2.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp2.setTexture(this.eggTexture2);

        this.eggTexture3 = new CGFtexture(this.scene, "images/eggshell3.jpg");
        this.eggTextureApp3 = new CGFappearance(this.scene);
        this.eggTextureApp3.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp3.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp3.setTexture(this.eggTexture3);

        this.eggTexture4 = new CGFtexture(this.scene, "images/eggshell4.jpg");
        this.eggTextureApp4 = new CGFappearance(this.scene);
        this.eggTextureApp4.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp4.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp4.setTexture(this.eggTexture4);

        this.eggTexture5 = new CGFtexture(this.scene, "images/eggshell5.jpg");
        this.eggTextureApp5 = new CGFappearance(this.scene);
        this.eggTextureApp5.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp5.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp5.setTexture(this.eggTexture5);

        this.eggTexture6 = new CGFtexture(this.scene, "images/eggshell6.jpg");
        this.eggTextureApp6 = new CGFappearance(this.scene);
        this.eggTextureApp6.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp6.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTextureApp6.setTexture(this.eggTexture6);
        
    }

    initBuffers() {
        this.normals = [];
        for (var i = 0; i <= 2 * 0.5 + 1; i++) {
            this.normals.push(0, 0, 1);
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    accelerate(speedF){ 
        if ((this.speed > 0 && speedF < 0) || (this.speed < 0 && speedF > 0)){
            this.speed += speedF;
        }
        if ((this.speed > 2.0 && speedF > 0) || (this.speed < -2.0 && speedF < 0)){
            this.speed += speedF*0.05;
        }
        else if (this.speed > 1.0 || this.speed < -1.0){
            this.speed += speedF*0.25;
        }
        else{
            this.speed += speedF*0.8;
        }
    }

    descendY(){
        this.posY -= 2;
    }

    ascendY(){
        this.posY += 2;
        if (this.posY > -11){
            this.posY = -15;
        }
    }

    turn(speedF){
        this.ori += speedF;
    }

    reset(){
        this.posX = -20;
        this.posY = -15;
        this.posZ = 0;
        this.ori = 0;
        this.speed = 0;
    }

    update(time, scaleF, holdE){
        this.birdShader.setUniformsValues({ timeFactor: time / 100 % 1000 });
        if (this.speed >= -1.0 && this.speed <= 1.0){
            this.freq = 0.2; 
        }
        else{
            this.freq = 0.5 + 0.04 *Math.abs(this.speed);
        }
        this.birdShader.setUniformsValues({frequency: this.freq});
        console.log(this.speed);
        this.posX += this.speed * Math.cos(this.ori);
        this.posZ += this.speed * Math.sin(-this.ori);
        this.holdEgg = holdE;
        this.display(scaleF);
    }

	
    display(scaleFactor) {
        this.scene.pushMatrix();
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.rotate(this.ori, 0, 1, 0);
        this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
        this.scene.setActiveShader(this.birdShader);

        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.blueMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.leftWingShader);
        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.blueMaterial.apply();
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.rightWingShader);
        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.blueMaterial.apply();
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.birdShader);

        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.yellowMaterial.apply();
        this.legs.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.tailShader);
        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.blueMaterial.apply();
        this.tail.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.birdShader);
        this.scene.pushMatrix();
        this.scene.rotate(0 * Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.head.display();
        this.scene.popMatrix();
        
        if(this.holdEgg > 0){
            this.scene.pushMatrix();
            if (this.holdEgg == 1) this.eggTextureApp.apply();
            else if (this.holdEgg == 2) this.eggTextureApp2.apply();
            else if (this.holdEgg == 3) this.eggTextureApp3.apply();
            else if (this.holdEgg == 4) this.eggTextureApp4.apply();
            else if (this.holdEgg == 5) this.eggTextureApp5.apply();
            else if (this.holdEgg == 6) this.eggTextureApp6.apply();
            this.scene.translate(-2.7, -3.5, 0);
            this.egg.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
        //this.scene.setActiveShader(this.scene.defaultShader);
    }

}