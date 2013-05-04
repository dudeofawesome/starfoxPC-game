#pragma strict

public var particleFlash : GameObject;
public var particleFireball : GameObject;
public var particleFireRing : GameObject;

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
		_parts1.transform.position = other.gameObject.transform.position;
		_parts2.transform.position = other.gameObject.transform.position;
		_parts3.transform.position = other.gameObject.transform.position;
		_parts1.particleSystem.Play();
		_parts2.particleSystem.Play();
		_parts3.particleSystem.Play();
		Destroy(other.gameObject);
	}
	else if (other.gameObject.name == "Arwing") {
		other.gameObject.GetComponent(ShipController).health -= 10;
		if (other.gameObject.GetComponent(ShipController).health < 0) {
			_parts1.transform.position = other.gameObject.transform.position;
			_parts2.transform.position = other.gameObject.transform.position;
			_parts3.transform.position = other.gameObject.transform.position;
			_parts1.particleSystem.Play();
			_parts2.particleSystem.Play();
			_parts3.particleSystem.Play();
			Destroy(other.gameObject);
		}
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
	print(other.gameObject.GetComponent(ShipController).health);

	Destroy(this);
}