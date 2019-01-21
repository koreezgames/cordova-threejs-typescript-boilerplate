var fs = require('fs');
var path = require('path');

if (process.argv.length <= 2) {
  console.log('Usage: ' + path.basename(__filename) + ' model.obj');
  process.exit(-1);
}
//
console.log(path.resolve('assets', 'models'));
var PRECISION = 6;

function parseNumber(key, value) {
  return typeof value === 'number'
    ? parseFloat(value.toFixed(PRECISION))
    : value;
}

THREE = require(path.resolve('node_modules', 'three', 'build', 'three.js'));
require(path.resolve(
  'node_modules',
  'three',
  'examples',
  'js',
  'loaders',
  'OBJLoader.js',
));
require(path.resolve(
  'node_modules',
  'three',
  'examples',
  'js',
  'loaders',
  'MTLLoader.js',
));

var file = process.argv[2];
var objLoader = new THREE.OBJLoader();
var matLoader = new THREE.MTLLoader();

var obj = fs.readFileSync(file, 'utf8');
var mtl = fs.readFileSync(
  path.resolve('raw', 'models', path.basename(file, '.obj')) + '.mtl',
  'utf8',
);
const materialCreator = matLoader.parse(mtl);
const materialsInfo = materialCreator.materialsInfo;
for (const materialInfo in materialsInfo) {
  if (materialsInfo.hasOwnProperty(materialInfo)) {
    materialCreator.create(materialInfo);
  }
}

const objJson = objLoader.parse(obj).toJSON();
objJson.materials.forEach(material => {
  const actualMaterial = materialCreator.materials[material.name];
  for (const materialProp in actualMaterial) {
    if (
      actualMaterial.hasOwnProperty(materialProp) &&
      materialProp !== 'uuid'
    ) {
      material[materialProp] = actualMaterial[materialProp];
    }
  }
});

var content = JSON.stringify(objJson, parseNumber);

fs.writeFileSync(
  path.resolve('assets', 'models', path.basename(file, '.obj')) + '.json',
  content,
  'utf8',
);
