import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, tex1, tex2, tex3, tex4, tex5, tex6) {
		super(scene);
        this.t1 = new CGFtexture(scene, tex1);
        this.t1.texPar
        this.t2 = new CGFtexture(scene, tex2);
        this.t3 = new CGFtexture(scene, tex3);
        this.t4 = new CGFtexture(scene, tex4);
        this.t5 = new CGFtexture(scene, tex5);
        this.t6 = new CGFtexture(scene, tex6);
		this.quad = new MyQuad(scene);
        this.initMaterials(scene);
	}
    initMaterials() {
        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setTexture(this.t1);
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.topMaterial.setAmbient(1, 1, 1, 1.0);
        this.topMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.topMaterial.setSpecular(1, 1, 1, 1.0);
        this.topMaterial.setShininess(10);
        
        this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setTexture(this.t2);
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.bottomMaterial.setAmbient(1, 1, 1, 1.0);
        this.bottomMaterial.setDiffuse(1.0, 1, 1, 1.0);
        this.bottomMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.bottomMaterial.setShininess(10);  

        this.side1Material = new CGFappearance(this.scene);
        this.side1Material.setTexture(this.t3);
        this.side1Material.setTextureWrap('REPEAT', 'REPEAT');
        this.side1Material.setAmbient(1, 1, 1, 1.0);
        this.side1Material.setDiffuse(1.0, 1, 1, 1.0);
        this.side1Material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.side1Material.setShininess(10);  
        
        this.side2Material = new CGFappearance(this.scene);
        this.side2Material.setTexture(this.t4);
        this.side2Material.setTextureWrap('REPEAT', 'REPEAT');
        this.side2Material.setAmbient(1, 1, 1, 1.0);
        this.side2Material.setDiffuse(1.0, 1, 1, 1.0);
        this.side2Material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.side2Material.setShininess(10);  
        
        this.side3Material = new CGFappearance(this.scene);
        this.side3Material.setTexture(this.t5);
        this.side3Material.setTextureWrap('REPEAT', 'REPEAT');
        this.side3Material.setAmbient(1, 1, 1, 1.0);
        this.side3Material.setDiffuse(1.0, 1, 1, 1.0);
        this.side3Material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.side3Material.setShininess(10);   

        this.side4Material = new CGFappearance(this.scene);
        this.side4Material.setTexture(this.t6);
        this.side4Material.setTextureWrap('REPEAT', 'REPEAT');
        this.side4Material.setAmbient(1, 1, 1, 1.0);
        this.side4Material.setDiffuse(1.0, 1, 1, 1.0);
        this.side4Material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.side4Material.setShininess(10);
    }
	
    display() {
        
        // top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.topMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 1, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.bottomMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(0, 1, 0, 0);
        this.scene.scale(1, 1, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.side1Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(0, 1, 0, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.side2Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(1, 1, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.side3Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.side4Material.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}
