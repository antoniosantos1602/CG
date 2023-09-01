import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyTangram } from "./MyTangram.js";


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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.trianglesmall = new MyTriangleSmall(this);
    this.trianglebig = new MyTriangleBig(this);
    this.unitCube= new MyUnitCube(this);
    this.quad = new MyQuad(this);
    this.unitCubeQuad = new MyUnitCubeQuad(this);
    this.tangram = new MyTangram(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = false;
    this.displayDiamond = false;
    this.displayParallelogram= false;
    this.displayMyTriangleSmall= false;
    this.displayMyTriangleBig = false;
    this.displayMyUnitCube=false;
    this.displayMyQuad = false;
    this.displayMyUnitCubeQuad = true;
    this.displayMyTangram = true;

    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    //this.diamond.display();
    //this.triangle.display();
    //this.parallelogram.display();
    //this.trianglesmall.display();
    //this.trianglebig.display();

    

    this.pushMatrix();
    this.rotate(-0.5 * Math.PI, 1, 0, 0);
    this.translate(4.5, -4.5, 0.1);
    this.setAmbient(1, 1, 1, 1);
    //this.setSpecular(1, 1, 1, 1);
    //this.setGlobalAmbientLight(0, 0, 0, 0.3);

    this.pushMatrix();
    //this.rotate(0.5 * Math.PI, 0, 0, 1);
    this.translate(0, 0, -4.55);
    this.scale(9, 9, 9);
    this.setDiffuse(1, 0.5, 0.7, 1);
    //if (this.displayMyQuad) this.quad.display();
    if (this.displayMyUnitCubeQuad) this.unitCubeQuad.display();
    this.popMatrix();
    
    this.pushMatrix();
    if (this.displayMyTangram) this.tangram.display();
    this.popMatrix();
    
    

    // UnitCUbe
    this.pushMatrix();
    this.translate(0, 0, -4.6);
    this.scale(9, 9, 9);
    //this.diffuse(0.5, 0.5, 0);
    this.setDiffuse(1, 1, 1, 1);
    //this.setAmbient(1, 1, 1, 1);
    //this.setSpecular(1, 1, 1, 1);
    if (this.displayMyUnitCube) this.unitCube.display();
    this.popMatrix();

    //this.pushMatrix();
    this.rotate(-1 * Math.PI, 0, 0, 1);
    this.popMatrix();

    

    // ---- END Primitive drawing section
  }
}
