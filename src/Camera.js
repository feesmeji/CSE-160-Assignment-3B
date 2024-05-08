class Camera{
    constuctor(){
        this.type = 'Camera';
        this.fov = 60.0;
        this.eye = new Vector3([0,0,0]);
        this.at = new Vector3([0,0,-1]);
        this.up = new Vector3([0,1,0]);
        this.viewMatrix = new Matrix4().setLookAt(
          //ChatGPT helped me write the following three lines of code. It helped me understand that since we have vector 3 for the attributes, we must initialize each eye,at,up with three different coordinates x,y,z
          this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], //x,y,z components
          this.at.elements[0], this.at.elements[1], this.at.elements[2], 
          this.up.elements[0], this.up.elements[1], this.up.elements[2],
        );
        this.projectionMatrix = new Matrix4();
      }
      MoveForward(){
        

      }
}