import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
let genWidth,genHight;
if(window.innerWidth <= 750){
	genWidth = 200;
	genHight = 180;
}
else {
	genWidth = 500;
	genHight = 380;
}
const canvas = document.getElementById('canvas');
const renderizador = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderizador.setSize(genWidth, genHight);
renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFSoftShadowMap;
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, genWidth / genHight, 0.1, 1000);
camara.position.z = 550;
escena.background = null;
escena.fog = new THREE.Fog( 0x0000, 200, 2000 );
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xfff, 3 );
hemiLight.position.set( 1000, 300, 300 );
escena.add( hemiLight );
const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
dirLight.position.set( 100, 100, 200 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = -100;
dirLight.shadow.camera.left = -160;
dirLight.shadow.camera.right = 160;
escena.add( dirLight );
const controles = new OrbitControls(camara, canvas);
controles.enablePan = false;
controles.enableZoom = false;
const loader = new FBXLoader();
loader.load('./assets/models/tierra.fbx', (object) => {
	const textureLoader = new THREE.TextureLoader();
	const textura = textureLoader.load('./assets/models/tierra.webp');
	object.traverse((child) => {
    if (child.isMesh) {
    	child.material.map = textura;
    	child.castShadow = true;
      	child.receiveShadow = true;
    }
  	});
    escena.add(object);
    function animateObject() {
    	requestAnimationFrame(animateObject);
    	object.rotation.y += 0.002;
  	}
  	animateObject();
});
function animar() {
    requestAnimationFrame(animar);
    renderizador.render(escena, camara);
}
animar();