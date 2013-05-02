#pragma strict

// var arwing : ArwingPlayer = new ArwingPlayer(GameObject.Find("model"),GameObject.Find("Lighting/LightEngine"),GameObject.Find("Lighting/LightGunLeft"),GameObject.Find("Lighting/LightGunRight"),GameObject.Find("Cameras/CamThirdPerson"),GameObject.Find("Cameras/CamFirstPerson"),GameObject.Find("GUI/crosshair"));
public var controlMe : boolean = true;
public var forwardSpeed = 0.0;
public var rollSpeed = 0.0;
public var pitchSpeed = 0.0;
public var health : int = 100;

function Start () {

}

function Update () {
	//mouse down
	if(Input.GetMouseButtonDown(0)){
		GameObject.Find("Lighting/LightGunLeft").light.enabled = true;
		GameObject.Find("Lighting/LightGunRight").light.enabled = true;
	}

	//mouse down
	if(Input.GetMouseButtonUp(0)){
		GameObject.Find("Lighting/LightGunLeft").light.enabled = false;
		GameObject.Find("Lighting/LightGunRight").light.enabled = false;
	}
}

function FixedUpdate () {
	//key down
	if(Input.GetKeyDown(KeyCode.E)){
		//barrel roll right
	}
	if(Input.GetKeyDown(KeyCode.Q)){
		//barrel roll right
	}
	if(Input.GetKeyDown(KeyCode.D)){
		// arwing.camThirdPerson.transform.Rotate(0,0,-3);
	}
	if(Input.GetKeyDown(KeyCode.A)){
		// arwing.camThirdPerson.transform.Rotate(0,0,3);
	}
	if(Input.GetKeyDown(KeyCode.W)){
		// arwing.camThirdPerson.transform.Rotate(3,0,0);
	}
	if(Input.GetKeyDown(KeyCode.S)){
		// arwing.camThirdPerson.transform.Rotate(-3,0,0);
	}
	if(Input.GetKeyDown(KeyCode.F1) && controlMe){
		GameObject.Find("Cameras/CamThirdPerson").camera.enabled = GameObject.Find("Cameras/CamFirstPerson").camera.enabled;
		GameObject.Find("Cameras/CamFirstPerson").camera.enabled = !GameObject.Find("Cameras/CamThirdPerson").camera.enabled;
		GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled = GameObject.Find("Cameras/CamFirstPerson").GetComponent(AudioListener).enabled;
		GameObject.Find("Cameras/CamFirstPerson").GetComponent(AudioListener).enabled = !GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled;
		if(GameObject.Find("GUI/crosshair").transform.localPosition.y == 2.3)
			GameObject.Find("GUI/crosshair").transform.localPosition.y = 1.4;
		else
			GameObject.Find("GUI/crosshair").transform.localPosition.y = 2.3;
	}

	//key up
	if(Input.GetKeyUp(KeyCode.D)){
		// arwing.camThirdPerson.transform.Rotate(0,0,3);
		rollSpeed = 0;
	}
	if(Input.GetKeyUp(KeyCode.A)){
		// arwing.camThirdPerson.transform.Rotate(0,0,-3);
		rollSpeed = 0;
	}
	if(Input.GetKeyUp(KeyCode.W)){
		// arwing.camThirdPerson.transform.Rotate(-3,0,0);
		pitchSpeed = 0;
	}
	if(Input.GetKeyUp(KeyCode.S)){
		// arwing.camThirdPerson.transform.Rotate(3,0,0);
		pitchSpeed = 0;
	}

	//key pressed
	if(Input.GetKey(KeyCode.D) && controlMe){
		rollSpeed += 1;
		transform.Rotate(0,0,-2 * 1 / (1 + 5 * Mathf.Pow(0.82,rollSpeed - 6)) - 0.1666);
	}
	if(Input.GetKey(KeyCode.A) && controlMe){
		rollSpeed += 1;
		transform.Rotate(0,0,2 * 1 / (1 + 5 * Mathf.Pow(0.82,rollSpeed - 6)) - 0.1666);
	}
	if(Input.GetKey(KeyCode.W) && controlMe){
		pitchSpeed += 1;
		transform.Rotate(1 * 1 / (1 + 5 * Mathf.Pow(0.82,pitchSpeed - 6)) - 0.1666,0,0);
	}
	if(Input.GetKey(KeyCode.S) && controlMe){
		pitchSpeed += 1;
		transform.Rotate(-1 * 1 / (1 + 5 * Mathf.Pow(0.82,pitchSpeed - 6)) - 0.1666,0,0);
	}
	if(Input.GetKey(KeyCode.Space) && forwardSpeed < 120){
		forwardSpeed += .3;
		// if(forwardSpeed > 0){
			// arwing.tailLights.GetComponent(MeshRenderer).enabled = true;
		// 	arwing.engineLight.GetComponent(TrailRenderer).enabled = true;
		// }
	}
	if(Input.GetKey(KeyCode.LeftShift) && forwardSpeed > 0){
		forwardSpeed -= .45;
		// if(forwardSpeed < 0){
			// arwing.tailLights.GetComponent(MeshRenderer).enabled = false;
		// 	arwing.engineLight.GetComponent(TrailRenderer).enabled = false;
		// }
	}
	transform.position += (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward;
	GameObject.Find("Lighting/LightEngine").light.intensity = forwardSpeed / 120 * 7.7 + 0.3;
	// arwing.engineLight.light.intensity = forwardSpeed / 120 * 7.7 + 0.3;
	// arwing.particlesEngine.particleSystem.emissionRate = forwardSpeed * 5;
}