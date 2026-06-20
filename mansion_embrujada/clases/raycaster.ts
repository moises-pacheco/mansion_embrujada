import * as three from "three";

export class Raycaster {
  private raycaster: three.Raycaster;
  private mouse: three.Vector2;
  private camera: three.Camera;
  private scene: three.Scene;
  private objetos: three.Group;
  private document: Document;

  constructor(scene: three.Scene,camera: three.Camera,objetos: three.Group,document: Document) {
    this.raycaster = new three.Raycaster();
    this.mouse = new three.Vector2();
    this.camera = camera;
    this.scene = scene;
    this.objetos = objetos;
    this.document = document;
  }

  abrirPuertaEvento() {
    this.document.addEventListener("pointerdown", (event) => {

      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      //Actualiza la cámara
      this.raycaster.setFromCamera(this.mouse, this.camera);
      //Encuentra el objeto
      const objetosEncontrado = this.raycaster.intersectObject(this.objetos);
      const grupoEncontrado = objetosEncontrado[0].object.parent;
      if (objetosEncontrado.length > 0 && grupoEncontrado) {
        this.abrirPuerta(grupoEncontrado);
        console.log( `Se ha clickeado el objeto`);
        
      } else {
        console.log("No se ha encontrado ningún objeto");
      }
    });
  }

  abrirPuerta(objeto: three.Object3D){
    objeto.rotation.y += 1.57;
  }
}
