import * as three from 'three';



export class Luciernagas{

    private cantidad_luiernagas: number;
    private particulas_posicion: Float32Array;
    private particulas_geometria: three.BufferGeometry;
    private particulas_material: three.PointsMaterial;
    public particulas: three.Points;
    private scene: three.Scene;



    constructor(scene : three.Scene){
        this.cantidad_luiernagas = 8;
        this.particulas_posicion = new Float32Array(this.cantidad_luiernagas * 3);
        this.particulas_geometria = new three.BufferGeometry();
        this.particulas_geometria.setAttribute(
            'position',
            new three.BufferAttribute(this.particulas_posicion,3)
        )

        for(let i = 0; i < this.cantidad_luiernagas; i++){
            this.particulas_posicion[i * 3] = this.crearNumeroAleatorio();
            this.particulas_posicion[i * 3 + 1] = this.crearNumeroAleatorio();
            this.particulas_posicion[i * 3 + 2] = this.crearNumeroAleatorio();
        }

        this.particulas_material = new three.PointsMaterial({
            size: 0.06,
            color: 'yellow',
        })

        this.particulas = new three.Points(this.particulas_geometria,this.particulas_material);
        this.scene = scene;
    };


    crearLuciernagas(){

        for(let i = 0; i < this.cantidad_luiernagas; i++){
            this.particulas_posicion[i * 3 + 1] += 0.008;
            if(this.particulas_posicion){
                if(this.particulas_posicion[i * 3+ 1] > 4){
                    this.particulas_posicion[i * 3 +1] = this.crearNumeroAleatorio();
                    this.particulas_posicion[i * 3] = this.crearNumeroAleatorio();
                    this.particulas_posicion[i * 3 + 2] = this.crearNumeroAleatorio();
                }
            }
        }

        this.particulas_geometria.attributes.position.needsUpdate = true;
        this.scene.add(this.particulas);
        return this.particulas;

    }


    crearLuzLuciernagas(){
        const luciernagas = new three.PointLight(0xCCFF00, 100);
        luciernagas.position.set(-6.8,0,4);
        const luciernagas_helper = new three.PointLightHelper(luciernagas, 1);
        this.scene.add(luciernagas);
    }

    crearNumeroAleatorio(){
        const numeroRandom = Math.floor(Math.random() * 4 - 1) + 1;
        return numeroRandom;
    }
}