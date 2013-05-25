#pragma strict
import Holoville.HOTween;

public var controlMe : boolean = true;
public var forwardSpeed = 0.0;
public var rollSpeed = 0.0;
public var pitchSpeed = 0.0;
public var health : int = 100;
public var lives : int = 3;

public var particleFlash : GameObject;
public var particleFireball : GameObject;
public var particleFireRing : GameObject;

private var spawnsList = new Array(new Vector3(250,38,-640),new Vector3(350,38,-640),new Vector3(300,38,-640));

function Start () {

}

function Update () {
	if(GameObject.Find("Cameras/CamDeath").camera.enabled == true)
		controlMe = false;

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

	if(Input.GetMouseButtonDown(2)){
		HOTween.To(GameObject.Find("Cameras/CamThirdPerson").camera, 0.3, "fieldOfView", 30);
		HOTween.To(GameObject.Find("Cameras/CamFirstPerson").camera, 0.3, "fieldOfView", 30);
	}
	if(Input.GetMouseButtonUp(2)){
		HOTween.To(GameObject.Find("Cameras/CamThirdPerson").camera, 0.3, "fieldOfView", 60);
		HOTween.To(GameObject.Find("Cameras/CamFirstPerson").camera, 0.3, "fieldOfView", 60);
	}
}

function FixedUpdate () {
	//key down
	if(Input.GetKeyDown(KeyCode.E)){
		//barrel roll right
		HOTween.To(transform, 0.7, "rotation", new Vector3(transform.rotation.eulerAngles.x,transform.rotation.eulerAngles.y,transform.rotation.eulerAngles.z + 179));
	}
	if(Input.GetKeyDown(KeyCode.Q)){
		//barrel roll right
		HOTween.To(transform, 0.7, "rotation", new Vector3(transform.rotation.eulerAngles.x,transform.rotation.eulerAngles.y,transform.rotation.eulerAngles.z - 179));
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
		if(GameObject.Find("3dGUI/crosshair").transform.localPosition.y == 2.3)
			GameObject.Find("3dGUI/crosshair").transform.localPosition.y = 1.4;
		else
			GameObject.Find("3dGUI/crosshair").transform.localPosition.y = 2.3;
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
	GameObject.Find("Emitters/EmitPartEngine").particleSystem.emissionRate = forwardSpeed * 2;
	// GameObject.Find("Emitters/EmitPartEngine").particleSystem.emissionRate = forwardSpeed * 2;

	//minimap
	if(controlMe){
		GameObject.Find("CamMiniMap").transform.position = new Vector3(transform.position.x,transform.position.y + 2500,transform.position.z);
		GameObject.Find("CamMiniMap").transform.rotation.eulerAngles.y = transform.rotation.eulerAngles.y;
	}

}

function OnCollisionEnter (other : Collision) {
	if(other.gameObject.tag == "immobile"){
		HOTween.To(transform, 0.3, "position", new Vector3(transform.position.x - (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward.x * 40,transform.position.y - (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward.y * 40,transform.position.z - (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward.z * 40));
		AddDamage(15 * forwardSpeed / 120);
	}
	else if(other.gameObject.tag == "mobile"){
		HOTween.To(transform, 0.3, "position", new Vector3(transform.position.x - (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward.x * 5,transform.position.y - (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward.y * 5,transform.position.z - (12 / (5 + Mathf.Pow(0.94, (forwardSpeed - 100)))) * transform.forward.z * 5));
		// other.transform.AddForce(transform.forward);
		AddDamage(5 * forwardSpeed / 120);
	}
	else if(other.gameObject.tag == "mobile_push"){
		AddDamage(3 * forwardSpeed / 120);
	}
	// if (controlMe && gameObject.GetComponent(ShipController).health < 0) {
	// 	var _parts1 : GameObject = Instantiate(particleFlash);
	// 	var _parts2 : GameObject = Instantiate(particleFireball);
	// 	var _parts3 : GameObject = Instantiate(particleFireRing);

	// 	GameObject.Find("Cameras/CamThirdPerson").camera.enabled = false;
	// 	GameObject.Find("Cameras/CamFirstPerson").camera.enabled = false;
	// 	GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled =false;
	// 	GameObject.Find("Cameras/CamFirstPerson").GetComponent(AudioListener).enabled = false;
	// 	GameObject.Find("Cameras/CamDeath").camera.enabled = true;
	// 	GameObject.Find("Cameras/CamDeath").GetComponent(AudioListener).enabled = true;

	// 	_parts1.transform.position = gameObject.transform.position;
	// 	_parts2.transform.position = gameObject.transform.position;
	// 	_parts3.transform.position = gameObject.transform.position;
	// 	_parts1.particleSystem.Play();
	// 	_parts2.particleSystem.Play();
	// 	_parts3.particleSystem.Play();
	// 	other.gameObject.Find("ArwingMe/model").SetActive(false);
	// 	other.gameObject.Find("ArwingMe/Colliders").SetActive(false);
	// 	other.gameObject.Find("ArwingMe/GUI").SetActive(false);
	// 	other.gameObject.Find("ArwingMe/Lighting").SetActive(false);
	// 	other.gameObject.Find("ArwingMe/Emitters").SetActive(false);
	// }
}

function AddDamage (_damage : int) {
	health -= _damage;

	//smoke when near death
	if(this.health < 20)
		GameObject.Find("Emitters/EmitPartSmoke").particleSystem.emissionRate = 10;
	else if(this.health > 20)
		GameObject.Find("Emitters/EmitPartSmoke").particleSystem.emissionRate = 0;

	if (controlMe)
		GameObject.Find("GUI").SendMessage("ReceiveHealth",this.health);

	if (gameObject.GetComponent(ShipController).health < 0) {
		var mainPlayer : boolean = controlMe;

		lives --;
		var _parts1 : GameObject = Instantiate(particleFlash);
		var _parts2 : GameObject = Instantiate(particleFireball);
		var _parts3 : GameObject = Instantiate(particleFireRing);

		_parts1.transform.position = gameObject.transform.position;
		_parts2.transform.position = gameObject.transform.position;
		_parts3.transform.position = gameObject.transform.position;
		_parts1.particleSystem.Play();
		_parts2.particleSystem.Play();
		_parts3.particleSystem.Play();
		
		if (controlMe) {
			GameObject.Find("GUI").SendMessage("ReceiveLives",this.lives);

			GameObject.Find("Cameras/CamDeath").camera.enabled = true;
			GameObject.Find("Cameras/CamDeath").GetComponent(AudioListener).enabled = true;
			GameObject.Find("Cameras/CamThirdPerson").camera.enabled = false;
			GameObject.Find("Cameras/CamFirstPerson").camera.enabled = false;
			GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled = false;
			GameObject.Find("Cameras/CamFirstPerson").GetComponent(AudioListener).enabled = false;

			GameObject.Find("ArwingMe/model").SetActive(false);
			GameObject.Find("ArwingMe/Colliders").SetActive(false);
			GameObject.Find("ArwingMe/3dGUI").SetActive(false);
			GameObject.Find("ArwingMe/Lighting").SetActive(false);
			GameObject.Find("ArwingMe/Emitters").SetActive(false);
		}
		else{
			gameObject.SetActive(false);
		}

		yield WaitForSeconds (5);
		gameObject.transform.position = spawnsList[Random.Range(0,spawnsList.length)];

		health = 100;

		if (mainPlayer) {
			controlMe = true;

			GameObject.Find("Cameras/CamThirdPerson").camera.enabled = true;
			GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled = true;
			GameObject.Find("Cameras/CamDeath").camera.enabled = false;
			GameObject.Find("Cameras/CamDeath").GetComponent(AudioListener).enabled = false;

			GameObject.Find("ArwingMe/model").SetActive(true);
			GameObject.Find("ArwingMe/Colliders").SetActive(true);
			GameObject.Find("ArwingMe/GUI").SetActive(true);
			GameObject.Find("ArwingMe/Lighting").SetActive(true);
			GameObject.Find("ArwingMe/Emitters").SetActive(true);
		}
		else{
			gameObject.SetActive(true);
		}
	}
}