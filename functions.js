function loadClock(){
	/* Textures */
	THREE.crossOrigin = "";


	/* MATERIALS */

	/* Wall */
	var wallMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(19,10,4)"),
		shininess  :  20,
		bumpMap    :  THREE.ImageUtils.loadTexture("textures/metal.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("textures/metal.jpg", {}, function(){}),
		bumpScale  :  800.5,
	});


	/* Pointers */
	var handMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(55,55,55)"),
		shininess  :  20,
		// bumpMap    :  THREE.ImageUtils.loadTexture("textures/brushed_metal.png", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("textures/brushed_metal.png", {}, function(){}),
		bumpScale  :  0.1,
	});

	/* dial */
	var dialMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  :  20,
		bumpMap    :  THREE.ImageUtils.loadTexture("textures/darkblue.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("textures/metal.jpg", {}, function(){}),
		bumpScale  :  20.1,

	});


	/* MODELS */

	var oldWall = new THREE.Mesh( new THREE.PlaneGeometry(500,500,1,1), wallMaterial );
	oldWall.castShadow = true;
	oldWall.receiveShadow = true;
	sceneGraph.add( oldWall );


	loader = new THREE.JSONLoader();
	loader.load("obj/dial.js", 

		function(geometry) {

			object = new THREE.Mesh(geometry, dialMaterial);
			object.castShadow = true;
			object.receiveShadow = false;
			object.position.set(0.5,0,0);
			clock.add(object);
	});


	loader.load("obj/minutePointer.js", 

		function(geometry) {

			object = new THREE.Mesh(geometry, handMaterial);
			object.castShadow = true;
			object.receiveShadow = false;
			minuteHand.add(object);
	});

	loader.load("obj/hourPointer.js", 

		function(geometry) {

			object = new THREE.Mesh(geometry, handMaterial);
			object.castShadow = true;
			object.receiveShadow = false;
			hourHand.add(object);
	});
}




function setHands(){

	secondHand.rotation.x = -Math.PI*2*time.getSeconds()/60;
	
	minuteHand.rotation.x = -Math.PI*2*time.getMinutes()/60 + secondHand.rotation.x/60 ;
	
	hourHand.rotation.x = -Math.PI*2*time.getHours()/12 + minuteHand.rotation.x/12;
}



function addLights(){

	var spotLight	= new THREE.SpotLight( 0xff6644 );
	spotLight.target.position.set( 0, -2, 0 );
	spotLight.intensity = 30;
	spotLight.shadowCameraNear	= 0.1;		
	spotLight.castShadow		= true;
	spotLight.shadowDarkness	= 0.9;
	spotLight.shadowCameraVisible	= true;
	spotLight.position.set( 0, -100, 1000 );
	spotLight.shadowCameraVisible = false;

	camera.add ( spotLight );

	var spotLight2	= new THREE.SpotLight( 0x6666ff );
	spotLight2.target.position.set( 1, -1, -20);
	spotLight2.intensity = 10;
	spotLight2.shadowCameraNear	= 0.1;		
	spotLight2.castShadow		= true;
	spotLight2.shadowDarkness	= 0.9;
	spotLight2.shadowCameraVisible	= true;
	spotLight2.position.set( 0, -100, 1000 );
	spotLight2.shadowCameraVisible = false;

	sceneGraph.add ( spotLight2 );
	
	ambientLight = new THREE.AmbientLight( 0x555555 );
	//scene.add( ambientLight );

}