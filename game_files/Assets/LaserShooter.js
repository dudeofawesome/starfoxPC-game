#pragma strict

public laser : GameObject;
private argoProjectiles : GameObject[] = new GameObject[500];
private iNext = 0;
public fMag = 10000;

function Start () {
	for (int i = 0; i < argoProjectiles.Length; i++) {
		argoProjectiles[i] = (GameObject)Instantiate (laser);
		argoProjectiles[i].SetActive (false);
		argoProjectiles[i].AddComponent<Rigidbody>();
	}
}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		// GameObject.Find("pLightRightBlaster").GetComponent(AudioSource).Play();
		GameObject go = argoProjectiles[iNext++];
		if (iNext >= argoProjectiles.Length) iNext = 0;
		go.SetActive (true);
		// go.AddComponent<Rigidbody>();
		go.rigidbody.velocity = Vector3.zero;
		go.transform.position = transform.position + transform.forward;
		go.transform.rotation = Quaternion.Euler(transform.rotation.x,transform.rotation.y - 90,transform.rotation.z);
		go.rigidbody.AddForce (transform.forward * fMag);
		//go.rigidbody.AddForce (transform.forward * fMag * GameObject.Find("arwing").GetComponent("ThirdPersonShipController").forwardSpeed);
	}
}