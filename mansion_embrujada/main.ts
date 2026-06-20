import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Mansion } from './clases/create-house';
import { Luz } from './clases/crear-luz';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { Luciernagas } from './clases/crearLuciernagas';
import { Fantasma } from './clases/crearFantasma';
import { Farola } from './clases/crear-farola';
import { Raycaster } from './clases/raycaster';
import { Puerta } from './clases/puerta';


// Elementos esenciales para iniciar una escena.

const scene = new three.Scene();
scene.background = new three.Color(0x050505)
scene.fog = new three.FogExp2(0x081017, 0.01);
const camera = new three.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 2.4;


camera.lookAt(0,0,0);
const renderer = new three.WebGLRenderer();
renderer.shadowMap.enabled = true; 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

//Exposición
renderer.toneMapping = three.AgXToneMapping;
renderer.toneMappingExposure = 0.4;


// HDR
new RGBELoader()
  .loadAsync('hdr/satara_night_1k.hdr')
  .then((texture) => {
    texture.mapping = three.EquirectangularReflectionMapping
    scene.environment = texture
  })

//Orbit controls∂
const controls = new OrbitControls(camera, renderer.domElement);



//Mansion
const mansion = new Mansion();
mansion.crearMansion(scene);

//Luces ambientales
const luz = new Luz();
luz.crearLuces(scene);

//Postes de Luz
luz.crearPostesDeLuz(scene);

//luciernagas
const luciernagas = new Luciernagas(scene);
luciernagas.particulas.position.set(-8.6,-1,2);
luciernagas.crearLuzLuciernagas();

//Fantasma

const fantasma = new Fantasma(scene);
fantasma.crearFantasma();

//Farola
const farola = new Farola(scene);
const farola_bombillo_1 = farola.crearBombillo(new three.Vector3(8.2,0.5,11));

//Puerta
const puerta = new Puerta(scene,new three.Vector3(0, 0, -0.2), new three.Vector3(-0.3, 0, 0), camera);

//Raycaster
// const raycaster = new Raycaster(scene, camera, puerta, document);
// raycaster.abrirPuertaEvento();






//Animaciones

// const camaras = {
//     primera_camara: camera.clone(),
//     segunda_camara: camera.clone(),
//     tercera_camara: camera.clone(),
// }

// camaras.segunda_camara.position.y = 10;

let camara_proyeccion = camera;

// function primera_camara(){
//     camaras.primera_camara.lookAt(0,0,0);
//     camaras.primera_camara.position.x += -0.01;
//     console.log(camaras.primera_camara.position.x);
//     if(camaras.primera_camara.position.x <= -6){
//         camara_proyeccion = camaras.segunda_camara;
//         segunda_camara();
//     }
// }

// function segunda_camara(){
//     camaras.segunda_camara.lookAt(0,0,0);
//     camaras.segunda_camara.position.y += -0.01;

//     if(camaras.segunda_camara.position.y <= 1){
//         camara_proyeccion = camaras.tercera_camara;
//         tercera_camara();
//     }
// }

// function tercera_camara(){
//     camaras.tercera_camara.position.z += 0.01;
// }



function animate(){
    requestAnimationFrame(animate);
    // camera.position.z += -0.01;
    // console.log(camera.position.z);
    // if(camera.position.z <= 14){
    //     camara_proyeccion = camaras.primera_camara;
    // }

    controls.update();
    fantasma.crearMovimiento();
    luciernagas.crearLuciernagas();
    puerta.evento();
    renderer.render(scene,camara_proyeccion);
}

animate();