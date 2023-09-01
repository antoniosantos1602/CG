import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
  constructor(scene, slices, stacks, invert) {
    super(scene);
    this.stacks = stacks * 2;
    this.slices = slices;
    this.invert = invert;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var texturaLat = 0;
    var texturaLong = 0;
    var texturaDeltaLatitude = 1 / this.stacks;
    var texturaDeltaLongitude = 1 / this.slices;
    var phiInc = Math.PI / this.stacks;
    var thetaInc = (2 * Math.PI) / this.slices;
    var latVertices = this.slices + 1;

    // construct a stack at a time, starting at the "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.stacks; latitude++) {
      // in each stack, build all the slices around, starting at longitude 0
      theta = 0;
      texturaLong = 0;

      for (let longitude = 0; longitude <= this.slices; longitude++) {
        // vertex coordinates
        var x = Math.cos(theta) * Math.sin(phi);
        var y = Math.cos(phi);
        var z = Math.sin(-theta) * Math.sin(phi);

        // vertices
        this.vertices.push(x, y, z);

        // indices
        if (latitude < this.stacks && longitude < this.slices) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;

          if (this.invert) {
            this.indices.push(next, current, current + 1);
            this.indices.push(next + 1, next, current + 1);
          } else {
            this.indices.push(current, next, current + 1);
            this.indices.push(next, next + 1, current + 1);
          }
        }
        
        // push the normal for this vertex
        this.normals.push(x,y,z);
        

        theta += thetaInc;

        // texture coordinates
        this.texCoords.push(texturaLong, texturaLat);
        texturaLong += texturaDeltaLongitude;
      }

      phi += phiInc;
      texturaLat += texturaDeltaLatitude;
    }

    // read in groups of three
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  
}