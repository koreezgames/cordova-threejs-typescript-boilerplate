import {
  AmbientLight,
  Group,
  HemisphereLight,
  PointLight,
  SpotLight,
} from 'three';

export class BasicLights extends Group {
  constructor() {
    super();

    const point: PointLight = new PointLight(0xffffff, 1, 10, 1);
    const dir: SpotLight = new SpotLight(0xffffff, 0.8, 7, 0.8, 1, 1);
    const ambi: AmbientLight = new AmbientLight(0x404040, 0.66);
    const hemi: HemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1.15);

    dir.position.set(5, 1, 2);
    dir.target.position.set(0, 0, 0);

    point.position.set(0, 1, 5);

    this.add(ambi, hemi, dir);
  }
}
