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

        const cantidad_barandillas = 9;
        let posicion_x = 0;

        for(let i = 0; i < cantidad_barandillas; i++){
            let barandilla = barandilla_1.clone();
            barandillas.push(barandilla);
            barandillas[i].position.x += posicion_x;
            posicion_x += 0.39;
            barandillas_group.add(barandillas[i]);
        }

        barandillas_group.position.x = -0.14;
        scene.add(barandillas_group);


        const barandillas_atras_group = new three.Group();
        const barandillas_atras = [];
        const cantidad_barandillas_atras = 16;
        const barandilla_atras = barandilla_1.clone();
        barandilla_atras.position.set(-2.81,-1.4,-3);

        posicion_x = 0;
        for(let i = 0; i < cantidad_barandillas_atras; i++){
            let barandilla = barandilla_atras.clone();
            barandillas_atras.push(barandilla);
            barandillas_atras[i].position.x += posicion_x;
            posicion_x += 0.39;
            barandillas_atras_group.add(barandillas_atras[i]);
        }

        barandillas_atras_group.position.y = -.2;
        

        scene.add(barandillas_atras_group);


        const parte_superior_barandilla_geometria = new three.BoxGeometry(3.5,0.14,0.2);
        const parte_superior_barandilla_material = new three.MeshMatcapMaterial({color: 'gray', wireframe: false});
        const parte_superior_barandilla = new three.Mesh(parte_superior_barandilla_geometria, parte_superior_barandilla_material);
        parte_superior_barandilla.position.set(-1.32,-1,3);



        const parte_superior_barandilla_2 = parte_superior_barandilla.clone();
        parte_superior_barandilla_2.geometry.dispose(); // Elimina la gemometria anterior y elimina la memoria.
        parte_superior_barandilla_2.geometry = new three.BoxGeometry(6.6,0.14,0.2);
        parte_superior_barandilla_2.position.set(0,-1,-3)
        scene.add(parte_superior_barandilla_2);
        
        

        const parte_superior_barandilla_3 = parte_superior_barandilla_2.clone();
        parte_superior_barandilla_3.geometry.dispose();
        parte_superior_barandilla_3.geometry = new three.BoxGeometry(6.2,0.14,0.2);
        parte_superior_barandilla_3.rotation.y = 1.57;
        parte_superior_barandilla_3.position.set(-3.4,-1,0)
        scene.add(parte_superior_barandilla_3);
        
        const barandillas_group_izquierda = barandillas_atras_group.clone();
        barandillas_group_izquierda.rotation.y = 1.57;
        barandillas_group_izquierda.position.x = -.4
        barandillas_group_izquierda.position.y = -.2
        barandillas_group_izquierda.position.z = .2
        scene.add(barandillas_group_izquierda)
        


        const parte_superior_barandilla_4 = parte_superior_barandilla_3.clone();
        parte_superior_barandilla_4.position.set(3.38,-1,0);
        scene.add(parte_superior_barandilla_4);

        const barandillas_group_derecha = barandillas_group_izquierda.clone();
        barandillas_group_derecha.rotation.y = -1.57;
        barandillas_group_derecha.position.set(0.4,-.1,-0.22)
        scene.add(barandillas_group_derecha)



        barandillas_group.add(parte_superior_barandilla);


        //Bucle para colocar las barandas de manera separada.





        




        const ventanas_group = new three.Group();
        const ventanas_geometria = new three.CylinderGeometry(0.6, 0.42, 1.4, 4 );
        const ventanas_material = new three.MeshStandardMaterial({
            color: 'red',
            transparent: true,
            opacity: 0.4,
            depthWrite: false // Evita que los oculte los objets que hay detrás
        })

        const ventana_1 = new three.Mesh(ventanas_geometria, ventanas_material);
        ventana_1.position.set(-1.8,.2,2.3);
        ventana_1.rotation.y = .78;

        const ventana_2 = ventana_1.clone();
        ventana_2.position.set(-0.6,.2,2.3);

        ventanas_group.add(ventana_1, ventana_2);
        ventanas_group.position.x = -0.16;
        scene.add(ventanas_group);


        




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

