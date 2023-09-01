import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import {MyPlaneTerrain} from './MyPlaneTerrain.js';

// Define MyTerrain class
export class MyTerrain extends CGFobject {
  constructor(scene) {
    super(scene);
    this.heightMap = new CGFtexture(this, "heightmap.jpg");
    this.terrainTex = new CGFtexture(this, "terrain.jpg");
    this.planeTerrain = new MyPlaneTerrain(this.scene, 50); // create a 400x400 plane
    this.shader = new CGFshader(this.scene.gl, "water.vert", "water.frag"); // load vertex and fragment shaders
    this.shader.setUniformsValues({uSampler2: 1}); // set texture sampler
  }

  display() {
    // enable shader program
    this.scene.setActiveShader(this.shader);

    // bind height map texture
    this.heightMap.bind(0);
    this.shader.setUniformsValues({uSampler1: 0});

    // bind terrain texture
    this.terrainTex.bind(1);
    this.shader.setUniformsValues({uSampler2: 1});

    // display plane
    this.planeTerrain.display();

    // disable shader program
    this.scene.setActiveShader(this.scene.defaultShader);
  }
}