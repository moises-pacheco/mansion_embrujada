import * as three from 'three';

export class Mansion{
    //Atríbutos
    paredes: three.Mesh[] | null = null;
    puerta: three.Mesh[] | null = null;
    suelo_y_techo: three.Mesh[] | null = null;
    chimenea: three.Mesh[] | null = null;
    tejado: three.Mesh[] | null = null;
    mesh: three.Mesh | null = null;


    //Constructor
    constructor(){
        this.paredes = [];
        this.chimenea = [];
        this.suelo_y_techo = [];
        this.puerta = [];
        this.tejado = [];
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
        const pared_material = new three.MeshMatcapMaterial({color: 'white', wireframe: false});

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


        //PUERTA
        const puerta_pared_geometria = new three.BoxGeometry(4,4,6);
        const puerta_geometria = new three.BoxGeometry(1.8,2.8,0.4);

        const puerta_material = new three.MeshMatcapMaterial({color:'white'});


        const puerta_pared = new three.Mesh(puerta_pared_geometria, pared_material);
        const puerta = new three.Mesh(puerta_geometria, puerta_material);

        puerta_pared.position.z = 3.49;
        puerta.position.z = 6.6;
        puerta.position.y = -0.58;


        this.puerta?.push(puerta);
        this.puerta?.push(puerta_pared);


        if(this.puerta){
            for(let i = 0; i < this.puerta?.length; i++){
                mansion.add(this.puerta[i]);
            }
        }

        //TEJADO

        const tejado_group = new three.Group();

        const tejado_geometria = new three.BoxGeometry(3.4,4,0.2);
        const tejado_material = new three.MeshMatcapMaterial({color:'white'});

        const tejado_union_geometria = new three.BoxGeometry(0.55,4,0.2);


        const tejado_1 = new three.Mesh(tejado_geometria,tejado_material);
        const tejado_2 = new three.Mesh(tejado_geometria, tejado_material);
        const tejado_union = new three.Mesh(tejado_union_geometria, tejado_material);



        tejado_1.rotation.reorder('YXZ');

        tejado_1.position.x = -1.6;
        tejado_1.position.z = 4.8;
        tejado_1.position.y = 3;


        tejado_1.rotation.x = -2.2;
        tejado_1.rotation.z = 1.57;
        tejado_1.rotation.y = 1.57;

        tejado_2.rotation.reorder('YXZ');
      
        tejado_2.position.x = 1.6;
        tejado_2.position.z = 4.8;
        tejado_2.position.y = 3;


        tejado_2.rotation.x = 2.2;
        tejado_2.rotation.z = 1.57;
        tejado_2.rotation.y = 1.57;


        tejado_union.rotation.reorder('YXZ');

        tejado_union.position.set(0,4.02,4.8)
        tejado_union.rotation.set(1.57,0,0);



        tejado_group.add(tejado_1);
        tejado_group.add(tejado_2);
        tejado_group.add(tejado_union);
        tejado_group.position.y = -.2

        

        //No se pueden agregar un objeto a groups independientes






        scene.add(tejado_group);
        scene.add(mansion);

        function animate(){
            requestAnimationFrame(animate);
        // tejado_1.rotation.x += -0.01;

        }

        animate();

    }

}