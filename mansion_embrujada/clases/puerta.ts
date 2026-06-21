import * as three from "three";
import { Fantasma } from "./crearFantasma";

export class Puerta {
    private puerta_group: three.Group;
    private pivote_group: three.Group;
    private scene: three.Scene;
    private estaAbierta: boolean;

    private raycaster: three.Raycaster;
    private mouse: three.Vector2;
    private camera: three.Camera;
    private puerta: three.Group;

    private fantasma: Fantasma;

    constructor(
        scene: three.Scene,
        pos_puerta = new three.Vector3(0, 0, -0.2),
        pos_manilla = new three.Vector3(-0.3, 0, 0),
        camera: three.Camera,
        fantasma: Fantasma,
    ) {
        //Atributos para el evento
        this.raycaster = new three.Raycaster();
        this.mouse = new three.Vector2();
        this.camera = camera;
        this.scene = scene;
        this.estaAbierta = false;

        //Atributos para la puerta
        this.puerta_group = new three.Group();
        this.pivote_group = new three.Group();
        this.scene = scene;

        //Fantasma
        this.fantasma = fantasma;

        const puerta = new three.Mesh(
            new three.BoxGeometry(1.2, 2, 0.4),
            new three.MeshStandardMaterial({ color: "#3A4032" }),
        );
        puerta.position.copy(pos_puerta);
        puerta.castShadow = true;

        const manilla_puerta = new three.Mesh(
            new three.SphereGeometry(15, 32, 16),
            new three.MeshMatcapMaterial({ color: "white" }),
        );
        manilla_puerta.scale.set(0.01, 0.01, 0.004);
        manilla_puerta.position.copy(pos_manilla);

        this.puerta_group.add(puerta, manilla_puerta);
        this.puerta_group.position.set(-0.6, 0, 0);

        // const pivote_helper = new three.AxesHelper(2);
        this.pivote_group.add(this.puerta_group);
        this.pivote_group.position.set(2.3, -1.1, 2.8);
        this.puerta = this.pivote_group;
        scene.add(this.pivote_group);
    }

    abrirPuerta() {
        this.estaAbierta = true;
        this.pivote_group.rotation.y = 1.57;
        this.fantasma.setFantasma(new three.Vector3(-2,0,8), -2);
        console.log(this.estaAbierta);
    }

    cerrarPuerta() {
        this.estaAbierta = false;
        this.pivote_group.rotation.y = 0;
        console.log(this.estaAbierta);
    }

    evento() {
        document.addEventListener("pointerdown", (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            //Actualiza la cámara
            this.camera.updateMatrixWorld();
            this.raycaster.setFromCamera(this.mouse, this.camera);
            //Encuentra el objeto
            const objetoEncontrado = this.raycaster.intersectObject(
                this.puerta,
                true,
            );
            if (objetoEncontrado.length > 0) {
                if (!this.estaAbierta) {
                    this.abrirPuerta();
                }
            }

        });
    }
}
