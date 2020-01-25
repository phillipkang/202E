var THREE = require('three');
var Reflector = require('three-reflector')(THREE);
const OrbitControls = require('three-orbit-controls')(THREE);

function GeneralLights(scene) {
	
	const light = new THREE.PointLight("#2222ff", 1);
    scene.add(light);
	
	this.update = function(time) {
		// light.intensity = (Math.sin(time)+1.5)/1.5;
	}
}

function SceneWireframe(scene) {
	
    // 	const radius = 3;
    var cube = new THREE.BoxBufferGeometry( 10, 10, 10 );
    const mesh = new THREE.Mesh(cube, new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0.0}));

    
    mesh.position.set(0,0, -20);
    
    
    var eGeometry = new THREE.EdgesGeometry( mesh.geometry );
    var eMaterial = new THREE.LineBasicMaterial( { color: 0xffa500, linewidth: 1 } );
    var edges = new THREE.LineSegments( eGeometry , eMaterial );
    mesh.add( edges );
    
        scene.add(mesh);
    
        
        this.update = function(time) {

        // mesh.position.set(tanScale+x, cosScale+y, -20);
                const cosScale = Math.cos(time)*2;
                const sinScale = Math.sin(time)*2;
                const tanScale = Math.tan(time)*2;
        
        if(time%3==0){
            mesh.rotation.set(cosScale,Math.random(),sinScale);
        }

        mesh.rotation.set(cosScale,tanScale,sinScale);
        // mesh.scale.set(scale,scale,scale);
        }
    }  

function SceneSphere(scene) {
	
        // 	const radius = 3;
        var geometry = new THREE.SphereBufferGeometry( 5, 30, 30 );
        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff}));
        
        mesh.position.set(0,0, -20);
        
        
        var eGeometry = new THREE.EdgesGeometry( mesh.geometry );
        var eMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );
        var edges = new THREE.LineSegments( eGeometry , eMaterial );
        mesh.add( edges );
        
            scene.add(mesh);
        
            
            this.update = function(time) {
                const sinScale = Math.sin(time)*2;
                const cosScale = Math.cos(time)*2;
                const tanScale = Math.tan(time)*2;
                const tanhScale = Math.tanh(time)*2;
    
    
            // mesh.position.set(tanScale+x, cosScale+y, -20);
    
            mesh.rotation.set(sinScale*cosScale,cosScale,5);
            mesh.scale.set(sinScale*tanhScale,sinScale*tanScale,sinScale*tanhScale);
            }
        }


function SceneManager(canvas) {


  const clock = new THREE.Clock();
  
  const screenDimensions = {
      width: canvas.width,
      height: canvas.height
  }
  
  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene);

  var cameraControls = new OrbitControls( camera, renderer.domElement );
                cameraControls.target.set( 0, 0, -20 );
				cameraControls.maxDistance = 50;
                cameraControls.minDistance = 15;
				cameraControls.update();


  function buildScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#000");

      return scene;
  }

  function buildRender({ width, height }) {
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
      const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
      renderer.setPixelRatio(DPR);
      renderer.setSize(width, height);

      renderer.gammaInput = true;
      renderer.gammaOutput = true; 

      return renderer;
  }

  function buildCamera({ width, height }) {
      const aspectRatio = width / height;
      const fieldOfView = 60;
      const nearPlane = 1;
      const farPlane = 100; 
      const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
      camera.position.set(10,-10,10);
      return camera;
  }

  function createSceneSubjects(scene) {
      const sceneSubjects = [
          new GeneralLights(scene),
          new SceneWireframe(scene),
          new SceneSphere(scene),
      ];

      return sceneSubjects;
  }

  this.update = function() {
      const elapsedTime = clock.getElapsedTime();

      for(let i=0; i<sceneSubjects.length; i++)
        sceneSubjects[i].update(elapsedTime);

      renderer.render(scene, camera);
  }

  this.onWindowResize = function() {
      const { width, height } = canvas;

      screenDimensions.width = width;
      screenDimensions.height = height;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
  }
}



export {SceneManager as SceneManager};