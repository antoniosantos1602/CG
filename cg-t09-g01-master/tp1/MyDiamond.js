import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			//1, 0, 0,	//3
			//0, 0, 0,    //4
			//-1, 0, 0,   //5
			//-1, 1, 0,   //6
			//-1, -1, 0,  //7
			//0, -1, 0,   //8
			//1, -1, 0,   //9

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//0, 1, 2,
			//1, 3, 2
			//6, 5, 4,
			//4, 8, 9,

			//4, 5, 6,
			//9, 8, 4
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

