#pragma strict

public var particleFireball : GameObject;

function Start () {

}

function Update () {

}

function OnCollisionEnter (other : Collision) {
	var _parts : GameObject = Instantiate(particleFireball);

	_parts.transform.position = gameObject.transform.position;
	_parts.particleSystem.Play();

	// if (other.gameObject.name == "Arwing") {
	// 	other.gameObject.GetComponent(ShipController).health -= 50;
	// 	if (other.gameObject.GetComponent(ShipController).health < 0) {
	// 		Destroy(other.gameObject);
	// 	}
	// }
	// else if (other.gameObject.name == "ArwingMe") {
	// 	other.gameObject.GetComponent(ShipController).health -= 50;
	// 	if (other.gameObject.GetComponent(ShipController).health < 0) {
	// 		GameObject.Find("Cameras/CamThirdPerson").camera.enabled = false;
	// 		GameObject.Find("Cameras/CamFirstPerson").camera.enabled = false;
	// 		GameObject.Find("Cameras/CamThirdPerson").GetComponent(AudioListener).enabled =false;
	// 		GameObject.Find("Cameras/CamFirstPerson").GetComponent(AudioListener).enabled = false;
	// 		GameObject.Find("Cameras/CamDeath").camera.enabled = true;
	// 		GameObject.Find("Cameras/CamDeath").GetComponent(AudioListener).enabled = true;
	// 		// gameObject.GetComponent("ShipController").active = false;

	// 		other.gameObject.Find("ArwingMe/model").SetActive(false);
	// 		other.gameObject.Find("ArwingMe/Colliders").SetActive(false);
	// 		other.gameObject.Find("ArwingMe/GUI").SetActive(false);
	// 		other.gameObject.Find("ArwingMe/Lighting").SetActive(false);
	// 		other.gameObject.Find("ArwingMe/Emitters").SetActive(false);
	// 	}
	// }

	for (var _player : Transform in GameObject.Find("Players").transform) {
		// print(_player.name);
		if(Mathf.Pow(_player.transform.position.x - gameObject.transform.position.x, 2) + Mathf.Pow(_player.transform.position.y - gameObject.transform.position.y, 2) + Mathf.Pow(_player.transform.position.z - gameObject.transform.position.z, 2) < 64)
			_player.SendMessage("AddDamage",50);
	}

	Destroy(gameObject);
}