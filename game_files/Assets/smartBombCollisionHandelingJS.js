#pragma strict

public var particleFlash : GameObject;
public var particleFireball : GameObject;
public var particleFireRing : GameObject;

function Start () {

}

function Update () {

}

function OnCollisionEnter (other : Collision) {
	var _parts1 : GameObject = Instantiate(particleFlash);
	var _parts2 : GameObject = Instantiate(particleFireball);
	var _parts3 : GameObject = Instantiate(particleFireRing);

	_parts1.transform.position = gameObject.transform.position;
	_parts2.transform.position = gameObject.transform.position;
	_parts3.transform.position = gameObject.transform.position;
	_parts1.particleSystem.Play();
	_parts2.particleSystem.Play();
	_parts3.particleSystem.Play();

	if (other.gameObject.name == "Arwing") {
		other.gameObject.GetComponent(ShipController).health -= 50;
		if (other.gameObject.GetComponent(ShipController).health < 0) {
			Destroy(other.gameObject);
		}
	}
	else if (other.gameObject.name == "ArwingMe") {
		other.gameObject.GetComponent(ShipController).health -= 50;
		if (other.gameObject.GetComponent(ShipController).health < 0) {
			GameObject.Find("Cameras/CamThirdPerson").camera.enabled = false;
			GameObject.Find("Cameras/CamFirstPerson").camera.enabled = false;
			GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled =false;
			GameObject.Find("Cameras/CamFirstPerson").GetComponent(AudioListener).enabled = false;
			GameObject.Find("Cameras/CamDeath").camera.enabled = true;
			GameObject.Find("Cameras/CamDeath").GetComponent(AudioListener).enabled = true;
			// gameObject.GetComponent("ShipController").active = false;

			other.gameObject.Find("ArwingMe/model").SetActive(false);
			other.gameObject.Find("ArwingMe/Colliders").SetActive(false);
			other.gameObject.Find("ArwingMe/GUI").SetActive(false);
			other.gameObject.Find("ArwingMe/Lighting").SetActive(false);
			other.gameObject.Find("ArwingMe/Emitters").SetActive(false);
		}
	}

	var hitColliders = Physics.OverlapSphere(center, radius);
	for (var i = 0; i < hitColliders.Length; i++) {
		hitColliders[i].SendMessage("AddDamage");
	}

	Destroy(gameObject);
}