import { Group } from 'three';
import { BasicLights } from './Lights';
import { WatercraftDark } from './watercraft/WatercraftDark';
import { WatercraftLight } from './watercraft/WatercraftLight';

export default class SeedScene extends Group {
  constructor() {
    super();

    this.__watercraftDark = new WatercraftDark();
    this.__watercraftLight = new WatercraftLight();
    this.__watercraftDark.position.set(0, 0.5, 0);
    this.__watercraftLight.position.set(0, -3.7, 0);
    const lights: BasicLights = new BasicLights();

    this.add(this.__watercraftDark, this.__watercraftLight, lights);
  }

  private __watercraftDark: WatercraftDark;
  private __watercraftLight: WatercraftLight;

  public update(timeStamp: number): void {
    this.__watercraftDark.rotation.y = -timeStamp / 1000;
    this.__watercraftLight.rotation.y = timeStamp / 1000;
  }
}
