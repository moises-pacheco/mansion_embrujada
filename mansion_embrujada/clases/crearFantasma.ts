import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class Fantasma{
    private loader: GLTFLoader;
    private scene: three.Scene;
    private ghost: three.Group | null = null;
    private angulo: number;
    private ghost_movimiento: three.Group | null = null;


    constructor(scene: three.Scene){
        this.loader = new GLTFLoader();
        this.scene = scene;
        this.angulo = 0;
    }

    crearFantasma(){
        this.loader.load('./modelos/ghost.glb', (gltf) => {
            this.ghost = gltf.scene;
            this.ghost.scale.set(.3,.3,.3);
            this.ghost.rotation.set(0,1.57,0);
            this.ghost.position.set(-0.8,-.4,1.3);
            this.scene.add(this.ghost);
        }, undefined, function(error){
            console.log(error); 
        })
    }

    crearMovimiento(){
        if(this.ghost){
            const alturaBase = -0.6;
            const subida = 0.2;

            this.ghost.position.y = alturaBase + (Math.sin(this.angulo) * subida);
            this.angulo += 0.02;
        }

        
    }




}