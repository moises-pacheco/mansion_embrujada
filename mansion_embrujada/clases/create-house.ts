import * as three from 'three';

export class Mansion{
    //Atríbutos
    paredes: three.Mesh[] | null = null;
    puerta: three.Mesh | null = null;
    suelo_y_techo: three.Mesh[] | null = null;
    chimenea: three.Mesh[] | null = null;
    mesh: three.Mesh | null = null;


    //Constructor
    constructor(){
        this.paredes = [];
        this.chimenea = [];
        this.suelo_y_techo = [];
    };


    //Métodos
    crearMansion(scene: three.Scene){
        //Paredes
        /**
         * BoxGeometry
         * width
         * height
         * depth
         */


        //Grupo
        const mansion = new three.Group();


        //PAREDES
        //Geometría
        const paredes_laterales_geometria = new three.BoxGeometry(1.6,1,0.04);
        const paredes_traseras_y_delanteras_geometria = new three.BoxGeometry(3,1,0.04);

        //Material
        const pared_material = new three.MeshMatcapMaterial({color: 'white'});

        //Mesh
        const pared_izquierda = new three.Mesh(paredes_laterales_geometria, pared_material);
        const pared_derecha = new three.Mesh(paredes_laterales_geometria, pared_material);
        const pared_trasera = new three.Mesh(paredes_traseras_y_delanteras_geometria, pared_material);
        const pared_delantera = new three.Mesh(paredes_traseras_y_delanteras_geometria, pared_material);

        //Posición
        pared_izquierda.rotation.y = 1.57;
        pared_izquierda.position.x = -6;

        pared_derecha.rotation.y = 1.57;
        pared_derecha.position.x = 6;

        pared_trasera.position.z = -3.2;
        pared_delantera.position.z = 3.2;

        this.paredes?.push(pared_izquierda);
        this.paredes?.push(pared_derecha);
        this.paredes?.push(pared_trasera);
        this.paredes?.push(pared_delantera);

        if(this.paredes){
            //Escalar las paredes
            for(let i = 0; i < this.paredes?.length; i++){
                this.paredes[i].scale.setScalar(4);
                mansion.add(this.paredes[i]);
            }
        }


        //SUELO y TECHO
        const suelo_y_techo_geometria = new three.PlaneGeometry(12,6.3);
        const suelo_y_techo_material = new three.MeshMatcapMaterial({color: 'white', side: three.DoubleSide});
        const suelo = new three.Mesh(suelo_y_techo_geometria,suelo_y_techo_material);
        const techo = new three.Mesh(suelo_y_techo_geometria, suelo_y_techo_material);

        suelo.rotation.x = 1.57;
        suelo.position.y = -2;

        techo.rotation.x = 1.57;
        techo.position.y = 2;


        this.suelo_y_techo?.push(suelo);
        this.suelo_y_techo?.push(techo);

        if(this.suelo_y_techo){
            for(let i = 0; i < this.suelo_y_techo?.length; i++){
                mansion.add(this.suelo_y_techo[i])
            }
        }



        scene.add(mansion);

        function animate(){
            requestAnimationFrame(animate);
            mansion.rotation.y += 0.01;
        }

        animate();
    }

}