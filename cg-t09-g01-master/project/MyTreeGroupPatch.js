import {CGFobject} from '../lib/CGF.js';
import {CGFappearance,CGFtexture} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, x, y, z) {
		super(scene);
		this.x=x;
		this.y=y;
		this.z=z;

        this.apps=[];
		this.initBuffers();
	}

    initBuffers(){

        this.scene.billboard = new MyBillboard (this.scene,0,0,0);

        this.scene.treeTexture = new CGFtexture(this.scene, "images/billboardtree.png");
		this.scene.treeTextureApp = new CGFappearance(this.scene);
		this.scene.treeTextureApp.setTexture(this.scene.treeTexture);

        this.scene.treeTexture2 = new CGFtexture(this.scene, "images/billboardtree2.png");
		this.scene.treeTextureApp2 = new CGFappearance(this.scene);
		this.scene.treeTextureApp2.setTexture(this.scene.treeTexture2);

        this.scene.treeTexture3 = new CGFtexture(this.scene, "images/billboardtree3.png");
		this.scene.treeTextureApp3 = new CGFappearance(this.scene);
		this.scene.treeTextureApp3.setTexture(this.scene.treeTexture);

        for (var i=0;i<9;i++){
			var random = this.getRandomInt(1,3);

			if(random ==1){
				this.apps.push(this.scene.treeTextureApp);
			}

			if(random ==2){
				this.apps.push(this.scene.treeTextureApp2);
			}

			if(random ==3){
				this.apps.push(this.scene.treeTextureApp3);
			}

		}
    }

    getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

    display(){

        var scaleX = 10;
        var scaleY = 50;
        var scaleZ = 15;

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x + 0,this.y + 0,this.z + 0);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[0].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x + 5, this.y + 0, this.z + 18);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[1].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x,this.y+0,this.z - 30);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[2].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x - 15, this.y + 0, this.z -80 );
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[3].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x-15,this.y+ 0, this.z +15);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[4].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x- 15,this.y + 0,this.z - 15);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[5].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x + 15, this.y + 0,this.z );
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[6].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x + 15, this.y + 0, this.z -15);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[7].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(....);
        this.scene.translate(this.x + 15, this.y + 0,this.z +15);
        this.scene.scale(scaleX,scaleY,scaleZ);
        this.apps[8].apply();
        this.scene.billboard.display();
        this.scene.popMatrix();
    }

}
