function loadClock(){
	/* Textures */
	THREE.crossOrigin = "";


	/* MATERIALS */

	var path = "textures/SwedishRoyalCastle/";
	var format = '.jpg';
	var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];

	var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
	reflectionCube.format = THREE.RGBFormat;

	var refractionCube = THREE.ImageUtils.loadTextureCube( urls );
	refractionCube.mapping = THREE.CubeRefractionMapping;
	refractionCube.format = THREE.RGBFormat;

	//var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );

	var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } );
	var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xeecc00, envMap: refractionCube, refractionRatio: 0.95 } );
	
	var cubeMaterial3 = new THREE.MeshPhongMaterial( { 
		color: 0xaa8822, 
		envMap: reflectionCube, 
		combine: THREE.MixOperation, 
		reflectivity: 0.6, 
		opacity:0.5, 
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpScale  :  0.01,
		transparent: true
	});


	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = reflectionCube;

	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide

	} ),

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000 ), material );
	sceneGraph.add( mesh );
	mesh.rotation.y = Math.PI/4;

	/* Wall */
	var wallMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(19,10,4)"),
		specularMap    :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		shininess  :  100,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		bumpScale  :  2.5,
	});


	/* Pointers */
	var handMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(55,55,55)"),
		shininess  :  5,
		bumpMap    :  THREE.ImageUtils.loadTexture("textures/brushed_metal.png", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/blackmetal.png", {}, function(){}),
		bumpScale  :  10.1,
	});

	/* dial */
	var dialMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		specularMap    :  THREE.ImageUtils.loadTexture("obj/dial12.jpg", {}, function(){}),
		shininess  :  10,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/dial12.jpg", {}, function(){}),
		bumpScale  :  2,

	});

	var dialMaterial2 = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  :  8,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/dial2.jpg", {}, function(){}),
		bumpScale  :  2,

	});

	var FrameMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		specularMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		shininess  :  10,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		bumpScale  : 2,

	});

	var secondFrameMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  :  10,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		bumpScale  :  5,

	});

	var boltsMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,50)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  : 20,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		bumpScale  :  1,

	});


	/* MODELS */

	var oldWall = [];
	var wallWidth = 150;
	var nWalls = 4;

	for(var i = 0; i < nWalls; i++){
		for(var j = 0; j < nWalls; j++){
			oldWall[i] = new THREE.Mesh( new THREE.PlaneGeometry(wallWidth,wallWidth,1,1), wallMaterial );
			oldWall[i].castShadow = false;
			oldWall[i].receiveShadow = true;
			oldWall[i].position.x = -wallWidth + (i-1)*wallWidth;
			oldWall[i].position.y = -wallWidth + (j-1)*wallWidth;
			sceneGraph.add( oldWall[i] );
		}
	}

	onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	onError = function ( xhr ) {
		console.log("build house error " + xhr);
	};
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

	// Loader
	loader2 = new THREE.OBJMTLLoader();

	loader2.load( "obj/hour_handle.obj", "obj/hour_handle.mtl", function(object){ 
		
		hourHand.add(object);
		object.castShadow = true;
		object.receiveShadow = false;

		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = handMaterial;
	    });


	}, onProgress, onError);

	loader2.load( "obj/minute_handle.obj", "obj/minute_handle.mtl", function(object){ 
		
		object.castShadow = true;
		object.receiveShadow = false;
		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = handMaterial;
	    });
		minuteHand.add(object);
	}, onProgress, onError);

	loader2.load( "obj/second_handle.obj", "obj/second_handle.mtl", function(object){ 
		secondHand.add(object);
		object.castShadow = true;
		object.receiveShadow = false;
	}, onProgress, onError);

	loader2.load( "obj/clockFrame.obj", "obj/clockFrame.mtl", function(object){ 
		
		clock.add(object);
		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = FrameMaterial;
	    });
	}, onProgress, onError);

	loader2.load( "obj/bolts.obj", "obj/bolts.mtl", function(object){ 
		
		clock.add(object);
		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = boltsMaterial;
	    });
	}, onProgress, onError);




	loader = new THREE.JSONLoader();
	//************* JSON ***********************

	loader.load("obj/dial12.js", 

			function(geometry) {

				dial1 = new THREE.Mesh(geometry, dialMaterial);
				dial1.castShadow = false;
				dial1.receiveShadow = true;
				clock.add(dial1);
				
		});

	loader.load("obj/dial2.js", 

			function(geometry) {

				dial2 = new THREE.Mesh(geometry, dialMaterial2);
				dial2.castShadow = false;
				dial2.receiveShadow = true;
				clock.position.z = -2;

				clock.add(dial2);
				
		});

	loader.load("obj/secondFrame.js", 

			function(geometry) {

				dial2 = new THREE.Mesh(geometry, secondFrameMaterial);
				dial2.castShadow = true;
				dial2.receiveShadow = true;
				clock.position.z = -2;

				clock.add(dial2);
				
		});

	loader.load("obj/glass.js", 

			function(geometry) {

				dial2 = new THREE.Mesh(geometry, cubeMaterial3);
				dial2.castShadow = false;
				dial2.receiveShadow = false;
				clock.position.z = -2;

				clock.add(dial2);
				
		});
}





function setHands(){

	if(presentTime)
		secondsRot = -Math.PI*2*time.getSeconds()/60;
		//secondsRot = - Math.PI*2*new Date().getTime() / 60000;
	else
		 secondsRot = -Math.PI*2*time.getSeconds()/60 - (Date.now()-time_now)/100;


	minutesRot = -Math.PI*2*time.getMinutes()/60 + secondsRot/60;
	hoursRot = -Math.PI*2*time.getHours()/12 + minutesRot/12;

	secondHand.rotation.y = secondsRot;
	minuteHand.rotation.y = minutesRot;
	hourHand.rotation.y = hoursRot; 
}


function addLights(){


var spotLight	= new THREE.SpotLight( 0x222221 );
	spotLight.target.position.set( 1, -1, -20);
	spotLight.intensity = 10;
	spotLight.shadowCameraNear	= 0.1;		
	spotLight.castShadow		= true;
	spotLight.shadowDarkness	= 0.9;
	spotLight.shadowCameraVisible	= true;
	spotLight.position.set( 0, -800, 1000 );
	spotLight.shadowCameraVisible = false;

	sceneGraph.add ( spotLight );

	var spotLight2	= new THREE.SpotLight( 0x333332 );
	spotLight2.target.position.set( 1, -1, -20);
	spotLight2.intensity = 10;
	spotLight2.shadowCameraNear	= 0.1;		
	spotLight2.castShadow		= true;
	spotLight2.shadowDarkness	= 0.6;
	spotLight2.shadowCameraVisible	= true;
	spotLight2.position.set( 0, 800, 1000 );
	spotLight2.shadowCameraVisible = false;

	sceneGraph.add ( spotLight2 );
	
	ambientLight = new THREE.AmbientLight( 0x222222 );
	//scene.add( ambientLight );

}