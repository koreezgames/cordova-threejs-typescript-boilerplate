/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import * as THREE from 'three';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
//@ts-ignore
import * as OBJLoader from 'three-obj-loader';
import { isNullOrUndefined } from 'util';
import SeedScene from './objects/SeedScene';
import { isIPhoneXEmulation } from './utils';
OBJLoader(THREE);

function startGame(): void {
  const scene: Scene = new Scene();
  const camera: PerspectiveCamera = new PerspectiveCamera();
  const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
  const seedScene: SeedScene = new SeedScene();

  //@ts-ignore
  window.THREE = THREE;
  //@ts-ignore
  window.scene = scene;
  // scene
  scene.add(seedScene);

  // camera
  camera.position.set(6, 3, -10);
  camera.lookAt(new Vector3(0, 0, 0));

  // renderer
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x7ec0ee, 1);

  // render loop
  function onAnimationFrameHandler(timeStamp: number): void {
    renderer.render(scene, camera);
    seedScene.update && seedScene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
  }
  window.requestAnimationFrame(onAnimationFrameHandler);

  // resize
  function windowResizeHanlder(): void {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  windowResizeHanlder();
  window.addEventListener('resize', windowResizeHanlder);

  // dom
  const parent: HTMLElement = document.getElementById('canvas');
  parent.appendChild(renderer.domElement);
}

window.onload = () => {
  if (isIPhoneXEmulation()) {
    document.body.innerHTML =
      document.body.innerHTML + `<div class="frame"></div>`;
  }
  startGame();
};

document.addEventListener('deviceready', () => {
  if (window.cordova) {
    if (window.cordova.platformId === 'android') {
      window.StatusBar.styleDefault();
      window.StatusBar.hide();
      if (!isNullOrUndefined(window.AndroidFullScreen)) {
        AndroidFullScreen.isSupported(
          () => {
            AndroidFullScreen.immersiveMode();
          },
          (error: any) => {
            console.error(error);
          },
        );
      }
    }
  }
});
