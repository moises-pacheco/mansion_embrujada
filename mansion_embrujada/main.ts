import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Mansion } from './clases/create-house';



// Elementos esenciales para iniciar una escena.

const scene = new three.Scene();
scene.background = new three.Color(0x0D1824)
// scene.fog = new three.FogExp2(0x081017, 0.05);
const camera = new three.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 25;
camera.position.y = 2;


camera.lookAt(0,0,0);
const renderer = new three.WebGLRenderer();
renderer.shadowMap.enabled = true; 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);



//Mansion
const mansion = new Mansion();
mansion.crearMansion(scene);

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate();