import { Group, Object3D, ObjectLoader } from 'three';

export class WatercraftDark extends Group {
  constructor() {
    super();
    const loader: ObjectLoader = new ObjectLoader();
    this.name = 'watercraft';
    this.scale.set(0.4, 0.4, 0.4);
    loader.load('assets/models/watercraftPack_003.json', (mesh: Object3D) => {
      this.add(mesh);
    });
  }
}
