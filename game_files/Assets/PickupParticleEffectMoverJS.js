#pragma strict

public var radius = 2.0;
public var moveOnX : boolean = false;
public var moveOnY : boolean = false;
public var moveOnZ : boolean = false;
private var timeAlive = 0.0;

function Start () {

}

function FixedUpdate () {
	if (moveOnX && moveOnY) {
		transform.localPosition = new Vector3(Mathf.Cos(timeAlive) * radius,Mathf.Sin(timeAlive) * radius,0);
	}
	else if (moveOnX && moveOnZ) {
		transform.localPosition = new Vector3(Mathf.Cos(timeAlive) * radius,0,Mathf.Sin(timeAlive) * radius);
	}
	else if (moveOnY && moveOnZ) {
		transform.localPosition = new Vector3(0,Mathf.Sin(timeAlive) * radius,Mathf.Cos(timeAlive) * radius);
	}
	timeAlive += 0.05;
}