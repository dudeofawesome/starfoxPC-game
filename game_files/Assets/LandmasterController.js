#pragma strict

public var speed = 10;

function Start () {

}

function Update () {
	//mouse down
	if(Input.GetMouseButtonDown(0)){
		GameObject.Find("model/polygon4/LightGun").light.enabled = true;
	}

	//mouse down
	if(Input.GetMouseButtonUp(0)){
		GameObject.Find("model/polygon4/LightGun").light.enabled = false;

	}
	if(Input.GetKey(KeyCode.W)){
		transform.position += transform.forward / 2;
		// transform.rigidbody.AddForce(transform.forward);
	}
}

function fixedUpdate () {
	// if(Input.GetKey(KeyCode.W)){
	// 	transform.position += transform.forward;
	// }
}