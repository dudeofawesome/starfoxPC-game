#pragma strict

public var particleFlash : GameObject;
public var particleFireball : GameObject;
public var particleFireRing : GameObject;

public var asteroid0 : GameObject;
public var asteroid1 : GameObject;
public var asteroid2 : GameObject;

public var damageMultiplier : int = 1;
public var shooterID : int = -1;

// Use this for initialization
function Start () {

}

// Update is called once per frame
function Update () {

}

function OnCollisionEnter (other : Collision)
{
	var _parts1 : GameObject = Instantiate(particleFlash);
	var _parts2 : GameObject = Instantiate(particleFireball);
	var _parts3 : GameObject = Instantiate(particleFireRing);

	if (other.gameObject.name == "asteroid_rock") {
		var _asteroid0 = Instantiate(asteroid0);
		var _asteroid1 = Instantiate(asteroid1);
		var _asteroid2 = Instantiate(asteroid2);

		_parts1.transform.position = other.gameObject.transform.position;
		_parts2.transform.position = other.gameObject.transform.position;
		_parts3.transform.position = other.gameObject.transform.position;
		_parts1.particleSystem.Play();
		_parts2.particleSystem.Play();
		_parts3.particleSystem.Play();
		var _basePosition : Vector3 = other.gameObject.transform.position;
		var _baseScale : Vector3 = other.gameObject.transform.localScale;
		Destroy(other.gameObject);

		_asteroid0.transform.localScale = _baseScale / 4;
		_asteroid1.transform.localScale = _baseScale / 4;
		_asteroid2.transform.localScale = _baseScale / 4;
		_asteroid0.transform.position = _basePosition;
		_asteroid1.transform.position = _basePosition;
		_asteroid2.transform.position = _basePosition;
		_asteroid0.name = "asteroid_rock";
		_asteroid1.name = "asteroid_rock";
		_asteroid2.name = "asteroid_rock";
	}
	else if (other.gameObject.layer == 9/*Players*/) {
		// other.gameObject.SendMessage("AddDamage",5 * damageMultiplier,shooterID);
		other.gameObject.GetComponent(ShipController).AddDamage(5 * damageMultiplier, shooterID);
	}
	else if (other.gameObject.name == "smart_bomb") {
		_parts1.transform.position = other.gameObject.transform.position;
		_parts2.transform.position = other.gameObject.transform.position;
		_parts3.transform.position = other.gameObject.transform.position;
		_parts1.particleSystem.Play();
		_parts2.particleSystem.Play();
		_parts3.particleSystem.Play();
		Destroy(other.gameObject);
	}
	Destroy(gameObject);
}

function ReceiveDamageMultiplier (_newMultiplier : int) {
	damageMultiplier = _newMultiplier;
}
function ReceiveShooterID (_id : int) {
	shooterID = _id;
}