import * as three from "three";

export class Puerta {
    private puerta_group: three.Group;
    private pivote_group: three.Group;
    private scene: three.Scene;
    private estaAbierta: boolean;

    private raycaster: three.Raycaster;
    private mouse: three.Vector2;
    private camera: three.Camera;
    private puerta: three.Group;
    private document: Document;

    constructor(
        scene: three.Scene,
        pos_puerta = new three.Vector3(0, 0, -0.2),
        pos_manilla = new three.Vector3(-0.3, 0, 0),
        camera: three.Camera,
    ) {
        //Atributos para el evento
        this.raycaster = new three.Raycaster();
        this.mouse = new three.Vector2();
        this.camera = camera;
        this.scene = scene;
        this.document = document;
        this.estaAbierta = false;

        //Atributos para la puerta
        this.puerta_group = new three.Group();
        this.pivote_group = new three.Group();
        this.scene = scene;

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

        const pivote_helper = new three.AxesHelper(2);
        this.pivote_group.add(this.puerta_group);
        this.pivote_group.position.set(2.3, -1.1, 2.8);
        this.puerta = this.pivote_group;
        scene.add(this.pivote_group);
    }

    abrirPuerta() {
        this.estaAbierta = true;
        this.pivote_group.rotation.y = 1.57;

        console.log(this.pivote_group.rotation.y);
    }

    cerrarPuerta() {
        this.estaAbierta = false;
        this.pivote_group.rotation.y = 0;
    }

    evento() {
        this.document.addEventListener("pointerdown", (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            //Actualiza la cámara
            this.raycaster.setFromCamera(this.mouse, this.camera);
            //Encuentra el objeto
            const objetoEncontrado = this.raycaster.intersectObject(this.puerta);
            const grupoEncontrado = objetoEncontrado[0].object.parent;
            if (objetoEncontrado.length > 0 && grupoEncontrado) {
                if (this.estaAbierta == false) {
                    this.abrirPuerta();
                } else if (this.estaAbierta == true) {
                    this.cerrarPuerta();
                }
            } 
        });
    }
}
