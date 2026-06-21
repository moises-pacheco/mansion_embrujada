import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class Fantasma{
    private loader: GLTFLoader;
    private scene: three.Scene;
    private ghost: three.Group;
    private angulo: number;

    private pos: three.Vector3;
    private alturaBase: number;


    constructor(scene: three.Scene){
        this.ghost = new three.Group();
        this.loader = new GLTFLoader();
        this.scene = scene;
        this.angulo = 0;
        this.pos = new three.Vector3(-0.8,-.4,1.3);
        this.alturaBase = -0.6;
    }

    setFantasma(vector: three.Vector3, alturaBase: number){
        this.pos = vector;
        this.alturaBase = alturaBase;
        this.actualizarFantasma();
        setTimeout(() =>{
            this.crearFantasma();
        }, 1000)
    }

    getFantasma(){
        return this.ghost;
    }

    actualizarFantasma(){
        this.getFantasma().clear();
    }


    crearFantasma(){
        this.loader.load('./modelos/ghost.glb', (gltf) => {
            this.ghost = gltf.scene;
            this.ghost.scale.set(.3,.3,.3);
            this.ghost.rotation.set(0,1.57,0);
            this.ghost.position.copy(this.pos);
            this.scene.add(this.ghost);
        }, undefined, function(error){
            console.log(error); 
        })
    }

    crearMovimiento(){
        if(this.ghost){
            const subida = 0.2;

            this.ghost.position.y = this.alturaBase + (Math.sin(this.angulo) * subida);
            this.angulo += 0.02;
        }
    }




}