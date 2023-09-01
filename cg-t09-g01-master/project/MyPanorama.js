import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
 
export class MyPanorama {
    constructor(scene, panoramaTexture) {
        this.scene = scene;
        this.panoramaTexture = panoramaTexture;
        this.initBuffers();
        this.initMaterials();

    }
    initBuffers() {
        this.sphere = new MySphere(this.scene, 20, 20, true);
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1.0);
        this.material.setTexture(this.panoramaTexture);
    }
    display() {

        // Transformaçao da esfera
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2]);
        this.scene.scale(400, 400, 400);
        this.sphere.display();
        this.scene.popMatrix();

    }

    enableNormalViz(){
        this.sphere = true;
    }

    disableNormalViz(){
        this.sphere = false;
    }


}
