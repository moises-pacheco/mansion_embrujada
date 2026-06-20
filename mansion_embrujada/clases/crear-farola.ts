import * as three from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Farola {
  private loader: GLTFLoader;
  private scene: three.Scene;
  public farola: three.Group;

  constructor(scene: three.Scene, pos = new three.Vector3(8.2,-3.2,11)) {
    this.farola = new three.Group();
    this.loader = new GLTFLoader();

    this.loader.load(
      "./modelos/farola.glb",
      (gltf) => {
        this.farola.add(gltf.scene);
        this.farola.position.copy(pos);
        this.scene.add(this.farola);
      },
      undefined,
      function (error) {},
    );

    this.scene = scene;
  }

  crearBombillo(pos = new three.Vector3(8.2,0.5,11), scl = new three.Vector3(0.1,0.06,0.1)) {
    //Luz dentro de la farola
    const farola_bombillo_geometria = new three.CylinderGeometry(3.9, 3, 10, 4);
    const farola_bomillo_material = new three.MeshStandardMaterial({
      color: "yellow",
      emissive: "yellow",
      emissiveIntensity: 4,
    });

    const farola_bombillo = new three.Mesh(
      farola_bombillo_geometria,
      farola_bomillo_material,
    );
    farola_bombillo.position.copy(pos);
    farola_bombillo.scale.copy(scl);

    farola_bombillo.rotation.reorder("YXZ");
    farola_bombillo.rotation.set(0,0.78,0);
    this.scene.add(farola_bombillo);
  }
}
