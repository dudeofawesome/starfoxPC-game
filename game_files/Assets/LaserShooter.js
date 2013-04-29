#pragma strict

public var laser : GameObject;
private var argoProjectiles : Array = new Array(500);
public var numOfBullets = 500;
private var iNext = 0;
public var fMag = 10000;

function Start () {
	// laser.AddComponent(Rigidbody);
	for (var i = 0; i < numOfBullets; i++) {
		argoProjectiles[i] = Instantiate (laser);
		// argoProjectiles[i].SetActive (false);
		// argoProjectiles[i].AddComponent(Rigidbody);
	}
}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		// GameObject.Find("pLightRightBlaster").GetComponent(AudioSource).Play();
		var go : GameObject = argoProjectiles[iNext++];
		if (iNext >= argoProjectiles.length) iNext = 0;
		go.SetActive (true);
		// go.AddComponent<Rigidbody>();
		go.rigidbody.velocity = Vector3.zero;
		go.transform.position = transform.position + transform.forward;
		go.transform.rotation = Quaternion.Euler(transform.rotation.x,transform.rotation.y - 90,transform.rotation.z);
		go.rigidbody.AddForce (transform.forward * fMag);
		//go.rigidbody.AddForce (transform.forward * fMag * GameObject.Find("arwing").GetComponent("ThirdPersonShipController").forwardSpeed);
	}
}