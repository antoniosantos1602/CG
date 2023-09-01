import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
        let A = [ 0.5,  0.5,  0.5];
        let B = [ 0.5,  0.5, -0.5];
        let C = [ 0.5, -0.5, -0.5];
        let D = [ 0.5, -0.5,  0.5];
        let E = [-0.5,  0.5,  0.5];
        let F = [-0.5,  0.5, -0.5];
        let G = [-0.5, -0.5, -0.5];
        let H = [-0.5, -0.5,  0.5];

		this.vertices = [
          /*  0.5, -0.5, -0.5,         //0- inferior direito trás
            0.5,  0.5, -0.5,        //1- superior direito ""
            -0.5, -0.5, -0.5,       //2- inferior esquerdo ""
            -0.5,  0.5, -0.5,      //3- superior ""
            0.5, -0.5,  0.5,     //4- inferior direito frente
            0.5,  0.5,  0.5,    //5- superior direito ""
            -0.5, -0.5,  0.5,   //6- inferior esquerdo ""
            -0.5,  0.5,  0.5   //7- superior esquerdo  "" */

            //frente
            ...A, ...D, ...C, ...B,  //0, 1, 2, 3

            //trás
            ...E, ...F, ...G, ...H,  //4, 5, 6, 7

            //cima
            ...A, ...B, ...F, ...E,  //8, 9, 10, 11

            //baixo
            ...C, ...D, ...H, ...G,  //12, 13, 14, 15

            //direita
            ...A, ...E, ...H, ...D,  //16, 17, 18, 19

            //esquerda
            ...B, ...C, ...G, ...F  //20, 21, 22, 23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
/*
            //frente
            5, 7, 6,
            4, 5, 6,
            //6, 7, 5,
            //6, 5, 4,

            //tras 
            //1, 3, 2,
            2, 3, 1,
            //0, 1, 2,
            2, 1, 0,

            //cima 
            5, 1, 7,
            3, 7, 1,
            //7, 1, 5,
            //1, 7, 3,

            //baixo
            //4, 0, 6,
            //6, 4, 0,
            //2, 6, 0,
            0, 4, 6,
            0, 6, 2,

            //direito
            4,0,1,
            //4,5,1,
            //1,0,4,
            1,5,4,

            //esquerdo
            //2, 3, 7,
            //7, 6, 2,
            7, 3, 2,
            7 ,2, 6,
*/
		];
        
        for (let face = 0; face < 6; face++){
            let aux = face*4;
            this.indices.push(0+aux, 1+aux, 2+aux);
            this.indices.push(2+aux, 3+aux, 0+aux);
        }

        this.normals = [];
        for (let vertex = 0; vertex < 4; vertex++) {this.normals.push(1, 0, 0);}
        for (let vertex = 0; vertex < 4; vertex++) {this.normals.push(-1, 0, 0);}
        for (let vertex = 0; vertex < 4; vertex++) {this.normals.push(0, 1, 0);}
        for (let vertex = 0; vertex < 4; vertex++) {this.normals.push(0, -1, 0);}
        for (let vertex = 0; vertex < 4; vertex++) {this.normals.push(0, 0, 1);}
        for (let vertex = 0; vertex < 4; vertex++) {this.normals.push(0, 0, -1);}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}