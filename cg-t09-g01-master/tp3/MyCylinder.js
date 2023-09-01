
import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */ 
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices; //n de lados
		this.stacks = stacks; //n de prismas stacked
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
		var stackLen = 1/this.stacks;

        var count = 0;

        for(var i = 0; i <= this.slices; i++){
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);
            var countAux = count;
            var s2 = Math.sin(ang+2*alphaAng);
            var c2 = Math.cos(ang+2*alphaAng);

			for (var t = 0; t < this.stacks; t++){
				var k = - stackLen * t;
				//this.vertices.push(caa, -saa, k);
				this.vertices.push(ca, -sa, k);
                count += 1;
			}
            //this.vertices.push(caa, -saa, -1);
            this.vertices.push(ca, -sa, -1);
            count += 1;
            /*
            for (var cnt = countAux; cnt < count-2; cnt+=2){
                this.indices.push((cnt +1), (cnt +0), (cnt +2) );
				this.indices.push((cnt +1), (cnt +2), (cnt +3) );

                this.normals.push(null, null, null); //just wanna skip this normal
                this.normals.push(s2, c2, 0);
            }*/
            ang+=alphaAng;
        }

        for(var cnt = 0; cnt < ((this.slices) * (this.stacks+1)); cnt++){
            this.indices.push((cnt +0), (cnt + this.stacks+1), (cnt +this.stacks+2) );
            this.indices.push((cnt +0), (cnt +this.stacks+2), (cnt +1) );
        }

        count = 0;
        for(var i = 0; i <= this.slices; i++){
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);
            var countAux = count;
            var s2 = Math.sin(ang+alphaAng);
            var c2 = Math.cos(ang+alphaAng);
            count += this.stacks+1;
            for (var cnt = countAux; cnt < count; cnt++){
                this.normals.push(s2, c2, 0);
            }
            ang+=alphaAng;
        }


            
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

