import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import {CGFOBJModel} from "./CGFOBJModel.js";
import { MyBird } from "./MyBird.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";



/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.setUpdatePeriod(10);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,200);
    this.terrainHeight = 256.0;
    this.sphere = new MySphere(this, 20, 20,false);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
    this.billboard = new MyBillboard(this, 0,0,0);
    this.myTreeRPatch = new MyTreeRowPatch (this, 90,-40, 10);
    this.myTreeGPatch = new MyTreeGroupPatch (this,-90,-40,0);

  
    this.bb2 = new MyBird(this);
    this.isDescending = false;
    this.isAscending = false;
    this.holdEgg = 0;

    this.nest = new MyNest(this);
    this.egg1 = new MyBirdEgg(this, 20, 20,false);
    this.egg2 = new MyBirdEgg(this, 20, 20,false);
    this.egg3 = new MyBirdEgg(this, 20, 20,false);
    this.egg4 = new MyBirdEgg(this, 20, 20,false);
    this.egg5 = new MyBirdEgg(this, 20, 20,false);
    this.egg6 = new MyBirdEgg(this, 20, 20,false);
    this.egg1state = 0;
    this.egg2state = 0;
    this.egg3state = 0;
    this.egg4state = 0;
    this.egg5state = 0;
    this.egg6state = 0;

    this.eggPos = [
      [-13, -61.6, 50],
      [-70, -61.6, 80],
      [-40, -61.6, 100],
      [-40, -61.6, -45],
      [-80, -61.6, -45],
      [5, -61.6, -80],
      [-30, -61.6, -80],
      [55, -61.6, -30],
      [55, -61.6, 28],
      [95, -61.6, 15], 
      [120, -61.6, -20],
      [125, -61.6, 10], 
      [-95, -61.6, -5],
      [-20, -61.6, -110],
      [33, -61.6, 23]
    ];

    for (let i = this.eggPos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.eggPos[i], this.eggPos[j]] = [this.eggPos[j], this.eggPos[i]];
    }
    
    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.terrainTexture = new CGFtexture(this, "images/terrain_better.jpg");
    this.heightMap = new CGFtexture(this, "images/heightMap2.jpg");
    this.altimeter = new CGFtexture(this, "images/altimetry.png");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.terrainTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.terrainShader.setUniformsValues({ heightMapTexture: 1});
    this.terrainShader.setUniformsValues({ altimeterTexture: 2});
    this.terrainShader.setUniformsValues({ altimeterHeight: this.terrainHeight});

    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.earthTextureApp = new CGFappearance(this);
    this.earthTextureApp.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.earthTextureApp.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.earthTextureApp.setTexture(this.earthTexture);

    this.eggTexture = new CGFtexture(this, "images/eggshell.jpg");
    this.eggTextureApp = new CGFappearance(this);
    this.eggTextureApp.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp.setTexture(this.eggTexture);

    this.eggTexture2 = new CGFtexture(this, "images/eggshell2.jpg");
    this.eggTextureApp2 = new CGFappearance(this);
    this.eggTextureApp2.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp2.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp2.setTexture(this.eggTexture2);

    this.eggTexture3 = new CGFtexture(this, "images/eggshell3.jpg");
    this.eggTextureApp3 = new CGFappearance(this);
    this.eggTextureApp3.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp3.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp3.setTexture(this.eggTexture3);

    this.eggTexture4 = new CGFtexture(this, "images/eggshell4.jpg");
    this.eggTextureApp4 = new CGFappearance(this);
    this.eggTextureApp4.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp4.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp4.setTexture(this.eggTexture4);

    this.eggTexture5 = new CGFtexture(this, "images/eggshell5.jpg");
    this.eggTextureApp5 = new CGFappearance(this);
    this.eggTextureApp5.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp5.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp5.setTexture(this.eggTexture5);

    this.eggTexture6 = new CGFtexture(this, "images/eggshell6.jpg");
    this.eggTextureApp6 = new CGFappearance(this);
    this.eggTextureApp6.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp6.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.eggTextureApp6.setTexture(this.eggTexture6);

  }
  initLights() {
    this.lights[0].setPosition(0, 40, 0, 1);
    this.lights[0].setAmbient(0.6, 0.6, 0.6, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();   
  }
  initCameras() {
    this.camera = new CGFcamera(1.0, 0.1, 1000, vec3.fromValues(50, 12, 15), vec3.fromValues(10, -15, -10));
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

    checkKeys(){
    var text = "Keys pressed:";
    var keysPressed = false;
    if (this.gui.isKeyPressed("KeyO")){
      text += " O ";
      keysPressed = true;
      if (this.holdEgg > 0){
        if(this.bb2.posX+10 > -45 && this.bb2.posX+10 < -25 && this.bb2.posZ > 15 && this.bb2.posZ < 25){
          if (this.holdEgg == 1) this.egg1state = 2;
          else if (this.holdEgg == 2) this.egg2state = 2;
          else if (this.holdEgg == 3) this.egg3state = 2;
          else if (this.holdEgg == 4) this.egg4state = 2;
          else if (this.holdEgg == 5) this.egg5state = 2;
          else if (this.holdEgg == 6) this.egg6state = 2;
          this.holdEgg = 0;
        }
      }
    }
    if (this.gui.isKeyPressed("KeyP") && !this.isDescending && !this.isAscending && this.holdEgg == 0){
      this.isDescending = true;
    }
    if(this.isDescending){
      if(this.bb2.posY >= - 60){
        console.log('AAAAAAAAAAAAAA');
        this.bb2.descendY();
      }
      else{
        this.isDescending = false;
        this.isAscending = true;
        for (var i = 1; i < 7; i++){
          var distX = 0;
          var distZ = 0;
          if ((this.bb2.posX+10 >= 0 && this.eggPos[i][0] >= 0) || (this.bb2.posX+10 <= 0 && this.eggPos[i][0] <= 0)){
            if (Math.abs(this.bb2.posX+10) > Math.abs(this.eggPos[i][0])){
              distX = Math.abs(this.bb2.posX+10) - Math.abs(this.eggPos[i][0]);
            }
            else{
              distX = Math.abs(this.eggPos[i][0]) - Math.abs(this.bb2.posX+10);
            }
          }
          else{
            distX = Math.abs(this.bb2.posX+10) + Math.abs(this.eggPos[i][0]);
          }

          if ((this.bb2.posZ >= 0 && this.eggPos[i][2] >= 0) || (this.bb2.posZ <= 0 && this.eggPos[i][2] <= 0)){
            if (Math.abs(this.bb2.posZ) > Math.abs(this.eggPos[i][2])){
              distZ = Math.abs(this.bb2.posZ) - Math.abs(this.eggPos[i][2]);
            }
            else{
              distZ = Math.abs(this.eggPos[i][2]) - Math.abs(this.bb2.posZ);
            }
          }
          else{
              distZ = Math.abs(this.bb2.posZ) + Math.abs(this.eggPos[i][2]);
          }

          var dist = distX + distZ;
          if (dist < 20){
            this.holdEgg = i;
            if (i == 1) this.egg1state = 1;
            else if (i == 2) this.egg2state = 1;
            else if (i == 3) this.egg3state = 1;
            else if (i == 4) this.egg4state = 1;
            else if (i == 5) this.egg5state = 1;
            else if (i == 6) this.egg6state = 1;
          }
        }
      }
    }
    if (this.isAscending){
      this.bb2.ascendY();
      if (this.bb2.posY == -15){
        this.isAscending = false;
      }
    }
    if (this.gui.isKeyPressed("KeyW")){
      this.bb2.accelerate(this.speedFactor*0.03);
      text += " W";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")){
      this.bb2.turn(this.speedFactor*0.15);
      text += " A";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")){
      this.bb2.accelerate(-this.speedFactor*0.03);
      text += " S";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")){
      this.bb2.turn(-this.speedFactor*0.15);
      text += " D";
      keysPressed = true;
    }
    if (!this.isDescending && !this.isAscending){
      if (this.gui.isKeyPressed("KeyR")){
        this.bb2.reset();
        text += " R";
        keysPressed = true;
      }
    }
    if (keysPressed){
      console.log(text);
    }
  }

  update(t){
    this.checkKeys();
    this.bb2.update(t, this.scaleFactor, this.holdEgg);
  }

  
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.setActiveShader(this.defaultShader);
    if (this.displayAxis)this.axis.display();

    // ---- BEGIN Primitive drawing section
    
    
    /*
    this.pushMatrix();
    this.earthTextureApp.apply();
    this.sphere.enableNormalViz();
    this.sphere.display();
    this.sphere.disableNormalViz();
    this.popMatrix();
    */

    this.pushMatrix();
    this.earthTextureApp.apply();
    this.panorama.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.myTreeGPatch.display();
    this.popMatrix();


    this.pushMatrix();
    this.myTreeRPatch.display();
    this.popMatrix();
    
    this.setActiveShader(this.terrainShader);
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.terrainTexture.bind(0);
    this.heightMap.bind(1);
    this.altimeter.bind(2);
    this.plane.display();
    this.popMatrix();
    this.setActiveShader(this.defaultShader);

    this.pushMatrix();
    this.translate(18, 6, 0);
    this.bb2.display(this.scaleFactor, this.holdEgg);
    this.popMatrix();
    
    this.pushMatrix();
    this.nest.display();
    this.popMatrix();

    this.pushMatrix();
    this.eggTextureApp.apply();
    if (this.egg1state == 0){
      this.translate(this.eggPos[1][0], this.eggPos[1][1], this.eggPos[1][2]);
      this.scale(1.2, 1.2, 1.2);
      this.egg1.display();
    }
    else if (this.egg1state == 2){
      this.translate(-40, -60, 30.5);
      this.egg1.display();
    }
    this.popMatrix();

    this.pushMatrix();
    this.eggTextureApp2.apply();
    if (this.egg2state == 0){
      this.translate(this.eggPos[2][0], this.eggPos[2][1], this.eggPos[2][2]);
      this.egg2.display();
    }
    else if (this.egg2state == 2){
      this.translate(-42, -60, 32);
      this.egg2.display();
    }
    this.popMatrix();

    this.pushMatrix();
    this.eggTextureApp3.apply();
    if (this.egg3state == 0){
      this.translate(this.eggPos[3][0], this.eggPos[3][1], this.eggPos[3][2]);
      this.scale(1.2, 1.2, 1.2);
      this.egg3.display();
    }
    else if (this.egg3state == 2){
      this.translate(-38, -60, 31.2);
      this.egg3.display();
    }
    this.popMatrix();

    this.pushMatrix();
    this.eggTextureApp4.apply();
    if (this.egg4state == 0){
      this.translate(this.eggPos[4][0], this.eggPos[4][1], this.eggPos[4][2]);
      this.scale(1.2, 1.2, 1.2);
      this.egg4.display();
    }
    else if (this.egg4state == 2){
      this.translate(-42.5, -60, 29);
      this.egg4.display();
    }
    this.popMatrix();

    this.pushMatrix();
    this.eggTextureApp5.apply();
    if (this.egg5state == 0){
      this.translate(this.eggPos[5][0], this.eggPos[5][1], this.eggPos[5][2]);
      this.scale(1.2, 1.2, 1.2);
      this.egg5.display();
    }
    else if (this.egg5state == 2){
      this.translate(-41, -60, 27.5);
      this.egg5.display();
    }
    this.popMatrix();

    this.pushMatrix();
    this.eggTextureApp6.apply();
    if (this.egg6state == 0){
      this.translate(this.eggPos[6][0], this.eggPos[6][1], this.eggPos[6][2]);
      this.scale(1.2, 1.2, 1.2);
      this.egg6.display();
    }
    else if (this.egg6state == 2){
      this.translate(-38.5, -60, 28);
      this.egg6.display();
    }
    this.popMatrix();
  
    // ---- END Primitive drawing section
  }
}
