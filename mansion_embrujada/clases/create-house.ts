import * as three from 'three';

export class Mansion{
    //Constructor
    constructor(){};


    //Métodos
    crearMansion(scene: three.Scene){
        //Paredes
        /**
         * BoxGeometry
         * width
         * height
         * depth
         */


        const paredes_geometria = new three.BoxGeometry(5.8,4,5);
        const paredes_material = new three.MeshMatcapMaterial({color:'white'});
        const paredes = new three.Mesh(paredes_geometria, paredes_material);
        scene.add(paredes);



        const tejado_group = new three.Group()

        const tejado_geometria = new three.CylinderGeometry( 0.6, 5.4, 4, 4 );
        const tejado_material = new three.MeshMatcapMaterial({color:'white'});
        const tejado = new three.Mesh(tejado_geometria, tejado_material);

        tejado.rotation.reorder('YXZ');
        tejado.position.y = 5;
        tejado.rotation.set(0,.78,0)

        tejado_group.add(tejado);

        const tejado_extruido_geometria = new three.BoxGeometry(7.7,7.7,0.6);
        const tejado_extruido = new three.Mesh(tejado_extruido_geometria, tejado_material);
        
        tejado_extruido.position.y = 2.72;
        tejado_extruido.rotation.reorder('YXZ');
        tejado_extruido.rotation.set(1.57,0,0)
        
        tejado_group.add(tejado_extruido)
        tejado_group.position.y = -0.6;

        const chimenea_geometria = new three.CylinderGeometry(0.6, 0.4, 3, 4 );
        const chimenea_material = new three.MeshMatcapMaterial({color: 'white'});
        const chimenea = new three.Mesh(chimenea_geometria, chimenea_material);

        chimenea.rotation.reorder('YXZ');

        chimenea.position.set(2,6.1,0);
        chimenea.rotation.y = .78;
        tejado_group.add(chimenea);

        scene.add(tejado_group);


        const pilares_geometria = new three.BoxGeometry(0.28,4,0.4);
        const pilares_material = new three.MeshMatcapMaterial({color:'brown'});
        const pilar_1 = new three.Mesh(pilares_geometria,pilares_material);
        const pilar_2 = pilar_1.clone();
        const pilar_3 = pilar_1.clone();
        const pilar_4 = pilar_1.clone();
        const pilar_5 = pilar_1.clone();

        pilar_1.position.set(3.4,0,3);
        pilar_2.position.set(-3.4,0,3);
        pilar_3.position.set(-3.4,0,-3);
        pilar_4.position.set(3.4,0,-3);
        pilar_5.position.set(.2,0,3);

        
        scene.add(pilar_1,pilar_2, pilar_3, pilar_4, pilar_5);


        const puerta_geometria = new three.BoxGeometry(1.2,2,0.4);
        const puerta_material = new three.MeshMatcapMaterial({color: 'red'});
        const puerta = new three.Mesh(puerta_geometria, puerta_material);

        puerta.position.set(1.6,-1,2.6);

        scene.add(puerta);


        const suelo_geometria = new three.BoxGeometry(7.7,7.7,0.6);
        const suelo_material = new three.MeshMatcapMaterial({color: 'white'});
        const suelo = new three.Mesh(suelo_geometria,suelo_material);

        suelo.position.y = -2.3;
        suelo.rotation.set(1.57,0,0);

        scene.add(suelo);

        const escaleras_geometria = new three.BoxGeometry(2,0.4,0.4);
        const escaleras_material = new three.MeshMatcapMaterial({color: 'green'});
        const escalera_1 = new three.Mesh(escaleras_geometria,escaleras_material);

        escalera_1.position.set(1.58,-2.4,4);

        scene.add(escalera_1);

        const barandillas = [];
        const barandillas_group = new three.Group();

        const barandilla_geometria = new three.BoxGeometry(0.14,1.1,0.1);
        const barandilla_material = new three.MeshMatcapMaterial({color: 'gray', wireframe: false});
        const barandilla_1 = new three.Mesh(barandilla_geometria, barandilla_material);
        barandilla_1.position.set(-2.8, -1.6, 3);

        const parte_superior_barandilla_geometria = new three.BoxGeometry(3.5,0.14,0.2);
        const parte_superior_barandilla_material = new three.MeshMatcapMaterial({color: 'gray'});
        const parte_superior_barandilla = new three.Mesh(parte_superior_barandilla_geometria, parte_superior_barandilla_material);


        parte_superior_barandilla.position.set(-1.32,-1,3);

        barandillas_group.add(parte_superior_barandilla);


        //Bucle para colocar las barandas de manera separada.

        const cantidad_barandillas = 9;
        let posicion_x = 0;

        for(let i = 0; i < cantidad_barandillas; i++){
            let barandilla = barandilla_1.clone();
            barandillas.push(barandilla);
            barandillas[i].position.x += posicion_x;
            posicion_x += 0.39;
            barandillas_group.add(barandillas[i]);
        }

        scene.add(barandillas_group);

        barandillas_group.position.x = -0.14;


        const tierra_geometria = new three.PlaneGeometry(100,100);
        const tierra_material = new three.MeshMatcapMaterial({color: 'white', side: three.DoubleSide, wireframe: true});
        const tierra = new three.Mesh(tierra_geometria, tierra_material);
        
        tierra.rotation.x = 1.57;
        tierra.position.y = -2.6;

        scene.add(tierra);




        function animate(){
            requestAnimationFrame(animate);
        // tejado_1.rotation.x += -0.01;

        }

        animate();

    }

}