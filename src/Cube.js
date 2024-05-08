class Cube{
    constructor(){
        this.type='cube';
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0,1.0,1.0,1.0];
        // this.size = 5.0;
        // this.segments = 3;
        this.matrix = new Matrix4();
        this.textureNum=0;
    }
    render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;

        gl.uniform1i(u_whichTexture, this.textureNum);

        //Pass color of a point to u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);


        // Pass the color of a point to u_FragColor uniform variable
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);        
        
    
// Section 1: Drawtriangle3DUV

//CHATGPT helped me realize that I can use all of the triangle coordinates that I used in section 2 of my code and just adding the extra bracket to each line of code. 
//to allow webgl to draw the uv colors. I originally used its UV color coordinates with triangle point coordinates in my previous versions of my code (in section 1) which were working, but I modified it to match my original section 2 to make my code more consistent,
// and to help me understand the implementation better.
//It also helped me debug the 3DUV coordinates along with the drawtriangle3d coordinates, as just copying and pasting coordinates code from my original section 2 was not giving smooth color on each cube side.
    // Front face (already provided) UV
    drawTriangle3DUV([0,0,0,    1,1,0,    1,0,0 ], [0,0,  1,1,  1,0]);
    drawTriangle3DUV([0,0,0,    0,1,0,    1,1,0 ], [0,0,  0,1,  1,1]);

    //Back of cube (when drawing things, webgl renders objects closer to the camera when the z coordinate is less than zero. Further away from camera if z axis is greater than zero)
    drawTriangle3DUV( [0,0,1,  1,1,1,  1,0,1 ], [0,0,  1,1,  1,0]);
    drawTriangle3DUV( [0,0,1,  0,1,1,  1,1,1 ], [0,0,  0,1,  1,1]);

    //Top of cube
    drawTriangle3DUV( [0,1,0,   0,1,1,  1,1,1], [0,0,  0,1,  1,1]);
    drawTriangle3DUV( [0,1,0,   1,1,1,  1,1,0], [0,0,  1,1,  1,0]);
    
    //Bottom of cube
    drawTriangle3DUV( [0,0,0,   0,0,1,  1,0,1], [0,0,  0,1,  1,1]);
    drawTriangle3DUV( [0,0,0,   1,0,1,  1,0,0], [0,0,  1,1,  1,0]);

    //Right side of cube
    drawTriangle3DUV([1,0,0,   1,1,1,  1,0,1], [0,0,  1,1,  1,0]);// right side of cube triangle 1
    drawTriangle3DUV([1,0,0,   1,1,0,  1,1,1], [0,0,  0,1,  1,1]);//right side of cube triangle 2

    //Left side of triangle
    drawTriangle3DUV([0,0,0,   0,1,1,   0,0,1], [0,0,  1,1,  1,0]); //left side of cube triangle 1
    drawTriangle3DUV([0,0,0,   0,1,0,   0,1,1], [0,0,  0,1,  1,1]); //left side of cube triangle 2

// ----------------UV End

// Section 2: triangles
    //Front of cube
    drawTriangle3D( [0,0,0,  1,1,0,  1,0,0 ]);
    drawTriangle3D( [0,0,0,  0,1,0,  1,1,0 ]);


    //Back of cube (when drawing things, webgl renders objects closer to the camera when the z coordinate is less than zero. Further away from camera if z axis is greater than zero)
    drawTriangle3D( [0,0,1,  1,1,1,  1,0,1 ]);
    drawTriangle3D( [0,0,1,  0,1,1,  1,1,1 ]);
    // Fake lighting (Pass the color of a point to u_FragColor uniform variable)
    gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

    //Top of cube
    drawTriangle3D( [0,1,0,   0,1,1,  1,1,1]);
    drawTriangle3D( [0,1,0,   1,1,1,  1,1,0]);
    
    //Bottom of cube
    drawTriangle3D( [0,0,0,   0,0,1,  1,0,1]);
    drawTriangle3D( [0,0,0,   1,0,1,  1,0,0]);

    //Right side of cube
    drawTriangle3D([1,1,1,   1,0,1,    1, 0, 0])// right side of cube triangle 1
    drawTriangle3D([1,1,1,   1,1,0,    1, 0, 0])//right side of cube triangle 2

    //Left side of triangle
    drawTriangle3D([0,0,0,   0,1,0,   0,1,1]) //left side of cube triangle 1
    drawTriangle3D([0,0,0,   0,0,1,   0,1,1]) //left side of cube triangle 2
    }

}