// Rohan the tutor helped me debug many things in this code.
// Mostly referenced to assignment instructions, but when I would get bugs I referred to https://people.ucsc.edu/~jbrowne2/asgn3/src/Camera.js.
class Camera{
    constructor(){
        this.type = 'Camera';
        this.fov = 60.0;
        this.eye = new Vector3([0,0,0]);
        this.at = new Vector3([0,0,-1]);
        this.up = new Vector3([0,1,0]);
        this.speed = 0.5;
        this.projectionMatrix = new Matrix4().setPerspective(this.fov, (canvas.width/canvas.height), 0.1, 1000 );
        this.update();
      }


      update(){
        this.viewMat = new Matrix4().setLookAt(
          //ChatGPT helped me write the following three lines of code. It helped me understand that since we have vector 3 for the attributes, we must initialize each eye,at,up with three different coordinates x,y,z
          this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], //x,y,z components
          this.at.elements[0], this.at.elements[1], this.at.elements[2], 
          this.up.elements[0], this.up.elements[1], this.up.elements[2],
        );
      }

      MoveForward(){
        let f = new Vector3();  //Create a new vector f = at - eye.
        f.set(this.at);
        f.sub(this.eye);
        f.normalize();
        f.mul(this.speed);
        // orig code:
        // this.eye += f;
        // this.at += f;
        //ChatGpt debugged code:
        this.eye.add(f);
        this.at.add(f);
        this.update();
      }

      moveBackwards(){
        let b = new Vector3();
        b.set(this.eye);
        b.sub(this.at);
        b.normalize();
        b.mul(this.speed);
        this.eye.add(b);
        this.at.add(b);
        this.update();
      }

      moveLeft(){
        let L = new Vector3(); //L is still considered to be a forward vector 
        L.set(this.at);
        L.sub(this.eye);
        let s = Vector3.cross(this.up, L)
        s.normalize();
        s.mul(this.speed);
        this.eye.add(s);
        this.at.add(s);
        this.update();
      }

      moveRight(){
        let R = new Vector3();
        R.set(this.at);
        R.sub(this.eye);
        let s = Vector3.cross(R, this.up)
        s.normalize();
        s.mul(this.speed);
        this.eye.add(s);
        this.at.add(s);
        this.update();
      }

      panLeft(){
        let PL = new Vector3();
        PL.set(this.at);
        PL.sub(this.eye);
        let rot_mat = new Matrix4();
        rot_mat.setRotate(23, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let f_prime = rot_mat.multiplyVector3(PL)
        // Code here "update the "at" vector to be at = eye + "panRight"
        this.at = this.eye.add(f_prime);//Rohan the tutor helped me with this line of code.
        this.update();
      }

      panRight(){
        let PR = new Vector3();
        PR.set(this.at);
        PR.sub(this.eye);
        let rot_mat = new Matrix4();
        rot_mat.setRotate(-23, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let f_prime = rot_mat.multiplyVector3(PR);
        // Code here "update the "at" vector to be at = eye + "panRight"
        this.at = this.eye.add(f_prime);//Rohan the tutor helped me with this line of code.
        this.update();
      }
}