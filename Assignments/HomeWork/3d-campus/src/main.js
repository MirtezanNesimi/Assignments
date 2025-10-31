import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ----------------------------------------------------------
// SCENE & CAMERA
// ----------------------------------------------------------
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x87ceeb) // Sky blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(120, 70, 130)

// ----------------------------------------------------------
// RENDERER
// ----------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// ----------------------------------------------------------
// LIGHTS
// ----------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
directionalLight.position.set(70, 100, 70)
scene.add(directionalLight)

// ----------------------------------------------------------
// GROUND (grass)
// ----------------------------------------------------------
const grassGeometry = new THREE.PlaneGeometry(350, 350)
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x2e8b57 })
const grass = new THREE.Mesh(grassGeometry, grassMaterial)
grass.rotation.x = -Math.PI / 2
scene.add(grass)

// ----------------------------------------------------------
// ROADS (Të plota deri në fund të fushës)
// ----------------------------------------------------------
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })

// Rrugë horizontale sipër
const topRoad = new THREE.Mesh(new THREE.BoxGeometry(340, 0.1, 14), roadMaterial)
topRoad.position.set(0, 0.05, 110)
scene.add(topRoad)

// Rrugë horizontale poshtë
const bottomRoad = new THREE.Mesh(new THREE.BoxGeometry(340, 0.1, 14), roadMaterial)
bottomRoad.position.set(0, 0.05, -110)
scene.add(bottomRoad)

// Rrugë vertikale në të djathtë (tani deri në fund)
const rightRoad = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 340), roadMaterial)
rightRoad.position.set(110, 0.05, 0)
scene.add(rightRoad)

// ----------------------------------------------------------
// BUILDINGS (larg rrugëve, më të mëdha, formë drejtkëndëshe)
// ----------------------------------------------------------
const blueMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff })
const grayMaterial = new THREE.MeshPhongMaterial({ color: 0xbfbfbf })

// Ndërtesat blu sipër (larg nga rruga)
const buildingTopLeft = new THREE.Mesh(new THREE.BoxGeometry(60, 12, 18), blueMaterial)
buildingTopLeft.position.set(-65, 6, 140)
scene.add(buildingTopLeft)

const buildingTopRight = new THREE.Mesh(new THREE.BoxGeometry(60, 12, 18), blueMaterial)
buildingTopRight.position.set(65, 6, 140)
scene.add(buildingTopRight)

// Ndërtesa gri qendrore (më e madhe dhe e dukshme)
const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(100, 20, 45), grayMaterial)
mainBuilding.position.set(0, 10, 30)
scene.add(mainBuilding)

// Ndërtesat blu poshtë (larg nga rruga)
const buildingBottomLeft = new THREE.Mesh(new THREE.BoxGeometry(60, 12, 18), blueMaterial)
buildingBottomLeft.position.set(-65, 6, -140)
scene.add(buildingBottomLeft)

const buildingBottomRight = new THREE.Mesh(new THREE.BoxGeometry(60, 12, 18), blueMaterial)
buildingBottomRight.position.set(65, 6, -140)
scene.add(buildingBottomRight)

// ----------------------------------------------------------
// ANIMATION LOOP
// ----------------------------------------------------------
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

// ----------------------------------------------------------
// RESIZE HANDLER
// ----------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
