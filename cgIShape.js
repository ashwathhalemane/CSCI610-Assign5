class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    printHi(){
        console.log("hi")
    }

    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
        this.printHi();
    }
    
    

    makeCube (subdivisions)  {
        
        // let subdivisions = 4;
        // fill in your cube code here.
        let steps = 1 / subdivisions;
        for (let i = 0; i < subdivisions; i++) {    
        let a0 = i * steps - 0.5;
        let a1 = (i + 1) * steps - 0.5;
        for (let j = 0; j < subdivisions; j++) {
            let b0 = j * steps - 0.5;
            let b1 = (j + 1) * steps - 0.5;
            this.addTriangle(a0, b0, 0.5, a1, b0, 0.5, a0, b1, 0.5);
            this.addTriangle(a0, b1, 0.5, a1, b0, 0.5, a1, b1, 0.5);
            this.addTriangle(a0, 0.5, b1, a1, 0.5, b0, a0,0.5, b0);
            this.addTriangle(a1, 0.5, b1, a1, 0.5, b0, a0, 0.5, b1);
            this.addTriangle(a1, -0.5, b0, a0, -0.5, b1, a0, -0.5, b0);
            this.addTriangle(a1, -0.5, b0, a1, -0.5, b1, a0, -0.5, b1);
            this.addTriangle(a1, b0, -0.5, a0, b0, -0.5, a0, b1, -0.5);
            this.addTriangle(a1, b0, -0.5, a0, b1, -0.5, a1, b1, -0.5);
            this.addTriangle(0.5, a1, b0, 0.5, a0, b1, 0.5, a0, b0);
            this.addTriangle(0.5, a1, b0, 0.5, a1, b1, 0.5, a0, b1);
            this.addTriangle(-0.5, a0, b1, -0.5, a1, b0, -0.5, a0, b0);
            this.addTriangle(-0.5, a1, b1, -0.5, a1, b0, -0.5, a0, b1);
        }
    }
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        // fill in your cylinder code here
        let y0 = -0.5, x0, x1, z0, z1, y1;
    for (let i = 0; i < radialdivision; i++) {    
        x0 = 0.5 * Math.cos(i * 2 * Math.PI / radialdivision);
        z0 = 0.5 * Math.sin(i * 2 * Math.PI / radialdivision);
        x1 = 0.5 * Math.cos((i+1) * 2 * Math.PI / radialdivision);
        z1 = 0.5 * Math.sin((i+1) * 2 * Math.PI / radialdivision);
        this.addTriangle(0, -0.5, 0, x0, -0.5, z0, x1, -0.5, z1);        
        this.addTriangle(x1, 0.5, z1, x0, 0.5, z0, 0, 0.5, 0);
        for (let j = 0; j < heightdivision; j++) {
            y0 = (j) / heightdivision - 0.5;
            y1 = (j + 1) /heightdivision - 0.5;
            this.addTriangle(x0, y1, z0, x1, y1, z1, x0, y0, z0);
            this.addTriangle(x1, y1, z1, x1, y0, z1, x0, y0, z0);
        }
    }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
        // Fill in your cone code here.
         for (let i = 0; i < radialdivision; i++) {

        let x0 = 0.5 * Math.cos(i * 2 * Math.PI / radialdivision);
        let z0 = 0.5 * Math.sin(i * 2 * Math.PI / radialdivision);
        let x1 = 0.5 * Math.cos((i + 1) * 2 * Math.PI / radialdivision);
        let z1 = 0.5 * Math.sin((i + 1) * 2 * Math.PI / radialdivision);
        this.addTriangle(x0, -0.5, z0, x1, -0.5, z1, 0.0, -0.5, 0.0);
        let y0 = -0.5;
        let ax0 = -x0 / heightdivision;
        let az0 = -z0 / heightdivision;
        let ax1 = -x1 / heightdivision;
        let az1 = -z1 / heightdivision;
        let y1 = 1.0 / heightdivision;
        for (let j = 0; j < heightdivision - 1; j++) {
            this.addTriangle(x0, y0, z0, x0+ax0, y0+y1, z0+az0, x1, y0, z1);
            this.addTriangle(x0+ax0, y0+y1, z0+az0, x1+ax1, y0+y1, z1+az1, x1, y0, z1);
            x0 += ax0;
            z0 += az0;
            x1 += ax1;
            z1 += az1;
            y0 += y1;
        }
        this.addTriangle(x0, y0, z0, 0.0, 0.5, 0.0, x1, y0, z1);
    } 
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

