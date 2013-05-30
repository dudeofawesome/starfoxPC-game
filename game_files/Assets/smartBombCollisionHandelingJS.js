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
	// }

	for (var _player : Transform in GameObject.Find("Players").transform) {
		if(Mathf.Pow(_player.transform.position.x - gameObject.transform.position.x, 2) + Mathf.Pow(_player.transform.position.y - gameObject.transform.position.y, 2) + Mathf.Pow(_player.transform.position.z - gameObject.transform.position.z, 2) < 1600) {	
			print(_player.name);
			_player.SendMessage("AddDamage",50);
		}
	}

	Destroy(gameObject);
}