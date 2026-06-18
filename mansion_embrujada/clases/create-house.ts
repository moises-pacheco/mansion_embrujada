import * as three from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";

export class Mansion {
  //Constructor
  constructor() {}

  //Métodos
  crearMansion(scene: three.Scene) {
    //Paredes
    /**
     * BoxGeometry
     * width
     * height
     * depth
     */

    const evaluator = new Evaluator();

    const paredBrush = new Brush(
      new three.BoxGeometry(6, 5, 0.4),
      new three.MeshStandardMaterial({ color: "#5A6366"}),
    );

    paredBrush.position.set(0, 0, 2.3);
    paredBrush.updateMatrixWorld();


    // Hueco ventana 1
    const huecoVentana1Brush = new Brush(
      new three.CylinderGeometry(0.6, 0.42, 1.4, 4),
    );
    huecoVentana1Brush.position.set(-1.96, 0.2, 2.3);
    huecoVentana1Brush.rotation.y = 0.78;
    huecoVentana1Brush.updateMatrixWorld();


    // Primera sustracción
    let paredConHueco = evaluator.evaluate(
      paredBrush,
      huecoVentana1Brush,
      SUBTRACTION,
    );

    // Hueco ventana 2
    const huecoVentana2Brush = new Brush(
      new three.CylinderGeometry(0.6, 0.42, 1.4, 4),
    );

    huecoVentana2Brush.position.set(-0.76, 0.2, 2.3);
    huecoVentana2Brush.rotation.y = 0.78;
    huecoVentana2Brush.updateMatrixWorld();

    // Segunda sustracción
    const paredConHuecoBrush = new Brush(
      paredConHueco.geometry,
      new three.MeshStandardMaterial({ color: "#5A6366" }),
    );

    paredConHuecoBrush.castShadow = true;
    paredConHuecoBrush.position.set(0, 0, 2.3);
    paredConHuecoBrush.updateMatrixWorld();

    paredConHueco = evaluator.evaluate(
      paredConHuecoBrush,
      huecoVentana2Brush,
      SUBTRACTION,
    );

    scene.add(paredConHueco);

    const paredes_group = new three.Group();

    const pared_geometria = new three.BoxGeometry(6, 5, 0.4);
    const pared_material = new three.MeshStandardMaterial({
      color: "#5A6366",
      wireframe: false,
      roughness: 0.9 
    });
    const pared_2 = new three.Mesh(pared_geometria, pared_material);
    const pared_3 = new three.Mesh(pared_geometria, pared_material);
    pared_3.geometry.dispose();
    pared_3.geometry = new three.BoxGeometry(4.4, 4, 0.4);
    const pared_4 = pared_3.clone();

    pared_2.castShadow = true;
    pared_3.castShadow = true;
    pared_4.castShadow = true;

    pared_2.position.set(0, 0, -2.3);
    pared_3.rotation.set(0, 1.57, 0);
    pared_3.position.set(-2.8, 0, 0);
    pared_4.rotation.set(0, 1.57, 0);
    pared_4.position.set(2.8, 0, 0);

    paredes_group.add(pared_2, pared_3, pared_4);
    scene.add(paredes_group);

    const tejado_group = new three.Group();
    const tejado_geometria = new three.CylinderGeometry(0.6, 5.4, 4, 4);
    const tejado_material = new three.MeshStandardMaterial({ color: "#1A0F2B",roughness: 0.9 });
    const tejado = new three.Mesh(tejado_geometria, tejado_material);

    tejado.castShadow = true;


    tejado.rotation.reorder("YXZ");
    tejado.position.y = 5;
    tejado.rotation.set(0, 0.78, 0);

    tejado_group.add(tejado);

    const tejado_extruido_geometria = new three.BoxGeometry(7.7, 7.7, 0.6);
    const tejado_extruido = new three.Mesh(
      tejado_extruido_geometria,
      tejado_material,
    );

    tejado_extruido.position.y = 2.72;
    tejado_extruido.rotation.reorder("YXZ");
    tejado_extruido.rotation.set(1.57, 0, 0);

    tejado_group.add(tejado_extruido);
    tejado_group.position.y = -0.6;

    const chimenea_geometria = new three.CylinderGeometry(0.6, 0.4, 3, 4);
    const chimenea_material = new three.MeshStandardMaterial({ color: "#3A3A3A",roughness: 0.9  });
    const chimenea = new three.Mesh(chimenea_geometria, chimenea_material);
    chimenea.castShadow = true;

    chimenea.rotation.reorder("YXZ");

    chimenea.position.set(2, 6.1, 0);
    chimenea.rotation.y = 0.78;
    tejado_group.add(chimenea);

    scene.add(tejado_group);

    const pilares_geometria = new three.BoxGeometry(0.28, 4, 0.4);
    const pilares_material = new three.MeshStandardMaterial({ color: "#4A4E4D",roughness: 0.9  });
    const pilar_1 = new three.Mesh(pilares_geometria, pilares_material);
    const pilar_2 = pilar_1.clone();
    const pilar_3 = pilar_1.clone();
    const pilar_4 = pilar_1.clone();
    const pilar_5 = pilar_1.clone();

    pilar_1.castShadow = true;
    pilar_2.castShadow = true;
    pilar_3.castShadow = true;
    pilar_4.castShadow = true;
    pilar_5.castShadow = true;

    pilar_1.position.set(3.4, -.1, 3);
    pilar_2.position.set(-3.4, -.1, 3);
    pilar_3.position.set(-3.4, -.1, -3);
    pilar_4.position.set(3.4,-.1, -3);
    pilar_5.position.set(0.2, -.1, 3);

    scene.add(pilar_1, pilar_2, pilar_3, pilar_4, pilar_5);

    //PUERTA

    const puerta_group = new three.Group();

    const puerta_geometria = new three.BoxGeometry(1.2, 2, 0.4);
    const puerta_material = new three.MeshStandardMaterial({ color: "#3A4032" });
    const puerta = new three.Mesh(puerta_geometria, puerta_material);
    puerta.position.set(1.6, -1, 2.6);
    puerta.castShadow = true;

    const manilla_puerta_geometria = new three.SphereGeometry(15, 32, 16 );
    const manilla_puerta_material = new three.MeshMatcapMaterial({color: 'white'});
    const manilla_puerta = new three.Mesh(manilla_puerta_geometria, manilla_puerta_material);
    manilla_puerta.position.set(1.3,-1,2.84);
    manilla_puerta.scale.set(.01,.01,.004);

    //Puerta unión:
    puerta_group.add(puerta,manilla_puerta);
    scene.add(puerta_group);


    const suelo_geometria = new three.BoxGeometry(7.7, 7.7, 1);
    const suelo_material = new three.MeshStandardMaterial({ color: "#5C5E61", roughness: 0.9 ,metalness: 0.1 });
    const suelo = new three.Mesh(suelo_geometria, suelo_material);
    suelo.castShadow = true;

    suelo.position.y = -2.6;
    suelo.rotation.set(1.57, 0, 0);

    scene.add(suelo);

    const escaleras_geometria = new three.BoxGeometry(2, 0.6, 0.8);
    const escaleras_material = new three.MeshStandardMaterial({ color: "#3D423A" });
    const escalera_1 = new three.Mesh(escaleras_geometria, escaleras_material);
    escalera_1.castShadow = true;

    escalera_1.position.set(1.58, -2.8, 4);

    scene.add(escalera_1);

    const barandillas = [];
    const barandillas_group = new three.Group();

    const barandilla_geometria = new three.BoxGeometry(0.14, 1.1, 0.1);
    const barandilla_material = new three.MeshStandardMaterial({
      color: "#252525",
      wireframe: false,
      roughness: 0.9 
    });
    
    const barandilla_1 = new three.Mesh(
      barandilla_geometria,
      barandilla_material,
    );

    barandilla_1.castShadow = true;

    barandilla_1.position.set(-2.8, -1.6, 3);

    const cantidad_barandillas = 9;
    let posicion_x = 0;

    for (let i = 0; i < cantidad_barandillas; i++) {
      let barandilla = barandilla_1.clone();
      barandillas.push(barandilla);
      barandillas[i].castShadow = true;
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
    barandilla_atras.position.set(-2.81, -1.4, -3);

    posicion_x = 0;
    for (let i = 0; i < cantidad_barandillas_atras; i++) {
      let barandilla = barandilla_atras.clone();
      barandillas_atras.push(barandilla);
      barandillas_atras[i].position.x += posicion_x;
      barandillas_atras[i].castShadow = true;
      posicion_x += 0.39;
      barandillas_atras_group.add(barandillas_atras[i]);
    }

    barandillas_atras_group.position.y = -0.2;

    scene.add(barandillas_atras_group);

    const parte_superior_barandilla_geometria = new three.BoxGeometry(
      3.5,
      0.14,
      0.2,
    );
    const parte_superior_barandilla_material = new three.MeshStandardMaterial({
      color: "#3E2A1F",
      wireframe: false,
    });

    const parte_superior_barandilla = new three.Mesh(
      parte_superior_barandilla_geometria,
      parte_superior_barandilla_material,
    );

    parte_superior_barandilla.castShadow = true;
    parte_superior_barandilla.position.set(-1.32, -1, 3);

    const parte_superior_barandilla_2 = parte_superior_barandilla.clone();
    parte_superior_barandilla_2.geometry.dispose(); // Elimina la gemometria anterior y elimina la memoria.
    parte_superior_barandilla_2.geometry = new three.BoxGeometry(
      6.6,
      0.14,
      0.2,
    );

    parte_superior_barandilla_2.castShadow = true;
    parte_superior_barandilla_2.position.set(0, -1, -3);
    scene.add(parte_superior_barandilla_2);

    const parte_superior_barandilla_3 = parte_superior_barandilla_2.clone();
    parte_superior_barandilla_3.geometry.dispose();
    parte_superior_barandilla_3.geometry = new three.BoxGeometry(
      6.2,
      0.14,
      0.2,
    );

    parte_superior_barandilla_3.castShadow = true;
    parte_superior_barandilla_3.rotation.y = 1.57;
    parte_superior_barandilla_3.position.set(-3.4, -1, 0);
    scene.add(parte_superior_barandilla_3);

    const barandillas_group_izquierda = barandillas_atras_group.clone();
    barandillas_group_izquierda.rotation.y = 1.57;
    barandillas_group_izquierda.position.x = -0.4;
    barandillas_group_izquierda.position.y = -0.2;
    barandillas_group_izquierda.position.z = 0.2;
    scene.add(barandillas_group_izquierda);

    const parte_superior_barandilla_4 = parte_superior_barandilla_3.clone();
    parte_superior_barandilla_4.position.set(3.38, -1, 0);
    scene.add(parte_superior_barandilla_4);

    const barandillas_group_derecha = barandillas_group_izquierda.clone();
    barandillas_group_derecha.rotation.y = -1.57;
    barandillas_group_derecha.position.set(0.4, -0.1, -0.22);
    scene.add(barandillas_group_derecha);

    barandillas_group.add(parte_superior_barandilla);

    const ventanas_group = new three.Group();
    const ventanas_geometria = new three.CylinderGeometry(0.6, 0.42, 1.4, 4);
    const ventanas_material = new three.MeshStandardMaterial({
      color: 0x39FF14,
      transparent: true,
      opacity: 0.4,
      depthWrite: false, // Evita que los oculte los objets que hay detrás
    });

    const ventana_1 = new three.Mesh(ventanas_geometria, ventanas_material);
    ventana_1.position.set(-1.8, 0.2, 2.3);
    ventana_1.rotation.y = 0.78;

    const ventana_2 = ventana_1.clone();
    ventana_2.position.set(-0.6, 0.2, 2.3);

    ventanas_group.add(ventana_1, ventana_2);
    ventanas_group.position.x = -0.16;
    scene.add(ventanas_group);

    const tierra_geometria = new three.BoxGeometry(20, 20, 1);
    const tierra_material = new three.MeshStandardMaterial({
      color: 'black',
      side: three.DoubleSide,
      wireframe: false,
      roughness: 0.9,
    });

    const tierra = new three.Mesh(tierra_geometria, tierra_material);
    tierra.receiveShadow = true;

    tierra.rotation.x = 1.57;
    tierra.position.y = -3.6;
    tierra.position.z = 2;

    scene.add(tierra);

    //Cruz
    const cruz_group = new three.Group();
    const cruz_geometria = new three.BoxGeometry(0.6, 3, 0.6);
    const cruz_material = new three.MeshStandardMaterial({
      color: 0xB5B5B5,
      wireframe: false,
      roughness: 0.9
    });

    const cruz_1 = new three.Mesh(cruz_geometria, cruz_material);
    cruz_1.castShadow = true;
    const cruz_2 = cruz_1.clone();
    cruz_2.castShadow = true;

    cruz_2.geometry = new three.BoxGeometry(0.6, 2, 0.6);
    cruz_1.position.set(0, -2, 8);
    cruz_2.position.set(0, -1.6, 8);
    cruz_2.rotation.set(1.57, 0, 1.57);

    const base_cruz_geometria = new three.BoxGeometry(1.8, 0.6, 1.2);
    const base_cruz = new three.Mesh(base_cruz_geometria, cruz_material);
    base_cruz.castShadow = true;
    base_cruz.position.set(0, -3.4, 8);

    cruz_group.add(cruz_1, cruz_2, base_cruz);
    cruz_group.position.set(8, -0.4, -4);
    cruz_group.rotation.set(0.08, -0.3, 0);
    cruz_group.scale.set(0.6, 0.6, 0.6);

    scene.add(cruz_group);

    //Caminos
    const caminos_group = new three.Group();
    const caminos_geometria = new RoundedBoxGeometry(0.8, 0.2, 0.8, 4, 0.05);
    const caminos_material = new three.MeshStandardMaterial({ color: 0xB5B5B5, roughness: 0.9 });
    const caminos_1 = new three.Mesh(caminos_geometria, caminos_material);
    caminos_1.position.set(1, -3.1, 5.3);

    let posicion_z = 0;
    let posicion_x_primer_camino = 0;
    let posicion_x_segundo_camino = 0;

    let primer_camino = [];
    let segundo_camino = [];

    for (let i = 0; i < 6; i++) {
      const camino = caminos_1.clone();
      const camino_2 = caminos_1.clone();
      primer_camino.push(camino);
      segundo_camino.push(camino_2);

      if (primer_camino) {
        primer_camino[i].castShadow = true;
        primer_camino[i].position.z += posicion_z;
        primer_camino[i].position.x += posicion_x_primer_camino;
        caminos_group.add(primer_camino[i]);
      }

      if (segundo_camino) {
        segundo_camino[i].castShadow = true;
        segundo_camino[i].position.z += posicion_z;
        segundo_camino[i].position.x += posicion_x_segundo_camino;
        caminos_group.add(segundo_camino[i]);
      }
      posicion_z += 1;
      posicion_x_primer_camino = Math.floor(Math.random() * (-2 - 2 + 1) + 2);
      posicion_x_segundo_camino = posicion_x_primer_camino + 1;
    }

    scene.add(caminos_group);

    // ROCAS

    const rocas_1 = this.crearRocas(scene);
    const rocas_2 = this.crearRocas(scene);
    rocas_2.position.set(13.4,-.6,12);
    rocas_2.rotation.set(0,-1.57,0);
    rocas_2.scale.set(.8,.8,.8);


    //ROCAS SUELTAS
    const roca_1 = this.crearRocasSueltas(scene);

    const roca_2 = this.crearRocasSueltas(scene);
    roca_2.scale.set(.8,.4,1);
    roca_2.position.x += 14;
    roca_2.position.z += -4;


    //Arbol

    const arbol = this.crearArbol(scene);
    arbol.position.set(-6.8,-3,4);
    arbol.rotation.set(0,.8,0);

    //Prueba animación
    // const cubo_prueba = new three.BoxGeometry(0.4, 0.4, 0.4);
    // const cubo_material = new three.MeshMatcapMaterial({ color: "red" });
    // const cubo = new three.Mesh(cubo_prueba, cubo_material);
    // cubo.position.set(-2.2, 0, 0);
    // scene.add(cubo);

    // let angulo = 0;
  }


  crearRocas(scene: three.Scene){

    const rocas_group = new three.Group();
    const roca_geometria = new three.TetrahedronGeometry(0.4,2);
    const roca_material = new three.MeshStandardMaterial({color: 0xB5B5B5});
    const roca_1 = new three.Mesh(roca_geometria, roca_material);
    roca_1.castShadow = true;
    roca_1.position.set(-8,-2.7,8)
    const roca_2 = roca_1.clone();
    roca_2.castShadow = true;
    roca_1.scale.set(3,2,3);

    roca_2.position.x +=1;
    roca_2.position.z += -1;
    roca_2.scale.set(2,1,2);

    const roca_3 = roca_2.clone();
    roca_3.castShadow = true;
    roca_3.position.z += 1;
    roca_3.position.x += .5;
    roca_3.position.y += -.3;
    roca_3.scale.set(1.2,.4,1.2);
    roca_2.position.x += .4

    rocas_group.add(roca_1,roca_2, roca_3);
    scene.add(rocas_group);

    return rocas_group;

  }


  crearRocasSueltas(scene: three.Scene){
    const roca_geometria = new three.TetrahedronGeometry(0.4,2);
    const roca_material = new three.MeshStandardMaterial({color: 0xB5B5B5});
    const roca = new three.Mesh(roca_geometria, roca_material);
    roca.castShadow = true;
    roca.position.set(-8,-3,0);
    roca.scale.set(1.4,.4,1.4)
    scene.add(roca);
    return roca;
  }


  crearArbol(scene: three.Scene){

    const rama_material = new three.LineBasicMaterial({color:  '#8ab164' });
    const ramas_1 = [];

    ramas_1.push(new three.Vector3(0,0,0));
    ramas_1.push(new three.Vector3(-.04,.4,0));
    ramas_1.push(new three.Vector3(-.04,.4,0));
    ramas_1.push(new three.Vector3(.02,1.4,0));
    ramas_1.push(new three.Vector3(.02,1.4,0));
    ramas_1.push(new three.Vector3(.02,1.8,0));
    ramas_1.push(new three.Vector3(-.4,2,0));
    ramas_1.push(new three.Vector3(-.6,2.01,0));
    ramas_1.push(new three.Vector3(-.6,2.01,0)); //Punto
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-1.4,2,0));
    ramas_1.push(new three.Vector3(-1.6,2.2,0));
    ramas_1.push(new three.Vector3(-1.4,2,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-.6,2.4,0)); 
    ramas_1.push(new three.Vector3(-.5,2.8,0)); //Punto hacia arriba
    ramas_1.push(new three.Vector3(-.4,3,0)); 
    ramas_1.push(new three.Vector3(0,3.2,0)); 
    ramas_1.push(new three.Vector3(.1,3.4,0)); 
    ramas_1.push(new three.Vector3(.3,3.3,0)); 
    ramas_1.push(new three.Vector3(.3,3.1,0)); 
    ramas_1.push(new three.Vector3(.3,3.3,0)); 
    ramas_1.push(new three.Vector3(.1,3.4,0)); 
    ramas_1.push(new three.Vector3(0,3.2,0)); 
    ramas_1.push(new three.Vector3(-.4,3,0)); 
    ramas_1.push(new three.Vector3(-.5,2.8,0)); //Punto hacia arriba
    ramas_1.push(new three.Vector3(-1,3.1,0)); //Punto hacia los lados
    ramas_1.push(new three.Vector3(-1.6,3.1,0)); 
    ramas_1.push(new three.Vector3(-1.8,3.24,0)); 
    ramas_1.push(new three.Vector3(-2,3.01,0)); 
    ramas_1.push(new three.Vector3(-2.2,3.1,0)); 
    ramas_1.push(new three.Vector3(-2,3.01,0)); 
    ramas_1.push(new three.Vector3(-1.8,3.24,0)); 
    ramas_1.push(new three.Vector3(-1.6,3.1,0)); 
    ramas_1.push(new three.Vector3(-1,3.1,0)); //Punto hacia los lados
    ramas_1.push(new three.Vector3(-1.2,3.4,0)); 
    ramas_1.push(new three.Vector3(-1.6,3.8,0)); 
    ramas_1.push(new three.Vector3(-1.8,3.8,0)); 
    ramas_1.push(new three.Vector3(-2,3.7,0)); 
    ramas_1.push(new three.Vector3(-2.2,3.8,0)); 
    ramas_1.push(new three.Vector3(-2.4,3.84,0)); 
    ramas_1.push(new three.Vector3(-2.6,3.6,0)); 
    ramas_1.push(new three.Vector3(-3,3.4,0)); 
    ramas_1.push(new three.Vector3(-2.6,3.6,0)); 
    ramas_1.push(new three.Vector3(-2.4,3.84,0)); 
    ramas_1.push(new three.Vector3(-2.2,3.8,0)); 
    ramas_1.push(new three.Vector3(-2,3.7,0)); 
    ramas_1.push(new three.Vector3(-1.8,3.8,0)); 
    ramas_1.push(new three.Vector3(-1.6,3.8,0)); 
    ramas_1.push(new three.Vector3(-1.2,3.4,0)); 
    ramas_1.push(new three.Vector3(-1,3.1,0)); //Punto hacia los lados
    ramas_1.push(new three.Vector3(-1.1,3.4,0)); //Punto hacia la izquierda
    ramas_1.push(new three.Vector3(-1.1,4,0)); 
    ramas_1.push(new three.Vector3(-1,4.1,0)); 
    ramas_1.push(new three.Vector3(-.6,4.1,0)); 
    ramas_1.push(new three.Vector3(-.4,4.2,0)); 
    ramas_1.push(new three.Vector3(-.3,4.4,0)); 
    ramas_1.push(new three.Vector3(-.4,4.2,0)); 
    ramas_1.push(new three.Vector3(-.6,4.1,0)); 
    ramas_1.push(new three.Vector3(-1,4.1,0)); 
    ramas_1.push(new three.Vector3(-1.1,4,0)); 
    ramas_1.push(new three.Vector3(-1.6,4.5,0)); //Punto hacia la izquierda
    ramas_1.push(new three.Vector3(-1.4,4.7,0)); 
    ramas_1.push(new three.Vector3(-1.5,4.9,0)); 
    ramas_1.push(new three.Vector3(-1.1,5.3,0)); 
    ramas_1.push(new three.Vector3(-1.5,4.9,0));
    ramas_1.push(new three.Vector3(-1.4,4.7,0));
    ramas_1.push(new three.Vector3(-1.6,4.5,0)); //Punto hacia la izquierda
    ramas_1.push(new three.Vector3(-1.1,4,0));
    ramas_1.push(new three.Vector3(-1,4.1,0));
    ramas_1.push(new three.Vector3(-.6,4.1,0));
    ramas_1.push(new three.Vector3(-.4,4.2,0));
    ramas_1.push(new three.Vector3(-.3,4.4,0));
    ramas_1.push(new three.Vector3(-.4,4.2,0));
    ramas_1.push(new three.Vector3(-.6,4.1,0));
    ramas_1.push(new three.Vector3(-1,4.1,0));
    ramas_1.push(new three.Vector3(-1.1,4,0));
    ramas_1.push(new three.Vector3(-1.1,3.4,0)); //Punto hacia la izquierda
    ramas_1.push(new three.Vector3(-1,3.1,0)); //Punto hacia los lados
    ramas_1.push(new three.Vector3(-1.2,3.4,0));
    ramas_1.push(new three.Vector3(-1.6,3.8,0));
    ramas_1.push(new three.Vector3(-1.8,3.8,0));
    ramas_1.push(new three.Vector3(-2,3.7,0));
    ramas_1.push(new three.Vector3(-2.2,3.8,0));
    ramas_1.push(new three.Vector3(-2.4,3.84,0));
    ramas_1.push(new three.Vector3(-2.6,3.6,0));
    ramas_1.push(new three.Vector3(-3,3.4,0));
    ramas_1.push(new three.Vector3(-2.6,3.6,0));
    ramas_1.push(new three.Vector3(-2.4,3.84,0));
    ramas_1.push(new three.Vector3(-2.2,3.8,0));
    ramas_1.push(new three.Vector3(-2,3.7,0));
    ramas_1.push(new three.Vector3(-1.8,3.8,0));
    ramas_1.push(new three.Vector3(-1.6,3.8,0));
    ramas_1.push(new three.Vector3(-1.2,3.4,0));
    ramas_1.push(new three.Vector3(-1,3.1,0)); //Punto hacia los lados
    ramas_1.push(new three.Vector3(-1.6,3.1,0));
    ramas_1.push(new three.Vector3(-1.8,3.24,0));
    ramas_1.push(new three.Vector3(-2,3.01,0));
    ramas_1.push(new three.Vector3(-2.2,3.1,0));
    ramas_1.push(new three.Vector3(-2,3.01,0));
    ramas_1.push(new three.Vector3(-1.8,3.24,0));
    ramas_1.push(new three.Vector3(-1.6,3.1,0));
    ramas_1.push(new three.Vector3(-1,3.1,0)); //Punto hacia los lados
    ramas_1.push(new three.Vector3(-.5,2.8,0)); //Punto hacia arriba
    ramas_1.push(new three.Vector3(-.4,3,0));
    ramas_1.push(new three.Vector3(0,3.2,0));
    ramas_1.push(new three.Vector3(.1,3.4,0));
    ramas_1.push(new three.Vector3(.3,3.3,0));
    ramas_1.push(new three.Vector3(.3,3.1,0));
    ramas_1.push(new three.Vector3(.3,3.3,0));
    ramas_1.push(new three.Vector3(.1,3.4,0));
    ramas_1.push(new three.Vector3(0,3.2,0));
    ramas_1.push(new three.Vector3(-.4,3,0));
    ramas_1.push(new three.Vector3(-.5,2.8,0)); //Punto hacia arriba
    ramas_1.push(new three.Vector3(-.6,2.4,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-1.4,2,0));
    ramas_1.push(new three.Vector3(-1.6,2.2,0));
    ramas_1.push(new three.Vector3(-1.4,2,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-1,1.9,0));
    ramas_1.push(new three.Vector3(-.6,2.01,0)); //Punto
    ramas_1.push(new three.Vector3(-.6,2.01,0));
    ramas_1.push(new three.Vector3(-.4,2,0));
    ramas_1.push(new three.Vector3(.02,1.8,0));
    ramas_1.push(new three.Vector3(.4,1.9,0));
    ramas_1.push(new three.Vector3(.8,2.1,0));
    ramas_1.push(new three.Vector3(1,2.6,0));
    ramas_1.push(new three.Vector3(1.4,3.1,0)); // Punto
    ramas_1.push(new three.Vector3(1.8,3.3,0)); 
    ramas_1.push(new three.Vector3(2.2,3.2,0)); 
    ramas_1.push(new three.Vector3(2.6,3.4,0)); 
    ramas_1.push(new three.Vector3(2.7,3.8,0)); 
    ramas_1.push(new three.Vector3(2.6,3.4,0)); 
    ramas_1.push(new three.Vector3(2.2,3.2,0)); 
    ramas_1.push(new three.Vector3(1.8,3.3,0)); 
    ramas_1.push(new three.Vector3(1.4,3.1,0)); // Punto
    ramas_1.push(new three.Vector3(1.4,3.6,0)); 
    ramas_1.push(new three.Vector3(1.2,3.8,0)); 
    ramas_1.push(new three.Vector3(1.3,4.4,0)); //Punto
    ramas_1.push(new three.Vector3(1.6,4.5,0));
    ramas_1.push(new three.Vector3(1.8,4.4,0));
    ramas_1.push(new three.Vector3(2,4.6,0));
    ramas_1.push(new three.Vector3(2.3,4.5,0));
    ramas_1.push(new three.Vector3(2,4.6,0));
    ramas_1.push(new three.Vector3(1.8,4.4,0));
    ramas_1.push(new three.Vector3(1.6,4.5,0));
    ramas_1.push(new three.Vector3(1.3,4.4,0)); //Punto
    ramas_1.push(new three.Vector3(1.1,4.8,0)); 
    ramas_1.push(new three.Vector3(1.4,5.2,0)); //Punto
    ramas_1.push(new three.Vector3(1.8,5.4,0)); 
    ramas_1.push(new three.Vector3(2.2,5.2,0)); 
    ramas_1.push(new three.Vector3(2.2,5.0,0)); 
    ramas_1.push(new three.Vector3(2.2,5.2,0)); 
    ramas_1.push(new three.Vector3(1.8,5.4,0)); 
    ramas_1.push(new three.Vector3(2.2,5.2,0)); 
    ramas_1.push(new three.Vector3(2.2,5.0,0)); 
    ramas_1.push(new three.Vector3(2.2,5.2,0)); 
    ramas_1.push(new three.Vector3(1.8,5.4,0)); 
    ramas_1.push(new three.Vector3(1.4,5.2,0)); //Punto
    ramas_1.push(new three.Vector3(1.1,4.8,0)); 
    ramas_1.push(new three.Vector3(.8,5.1,0)); 
    ramas_1.push(new three.Vector3(.6,5.4,0)); 
    ramas_1.push(new three.Vector3(.5,5.7,0)); 
  



    
    

    const ramas_1_geometria = new three.BufferGeometry().setFromPoints(ramas_1);
    const ramas_lineas = new three.Line(ramas_1_geometria,rama_material);






    scene.add(ramas_lineas);

    return ramas_lineas;

  }

}


