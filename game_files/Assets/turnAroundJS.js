#pragma strict
import Holoville.HOTween;

function Start () {

}

function Update () {

}

function OnCollisionEnter (other : Collision) {
	// HOTween.To(other.transform.rotation.eulerAngles, 1, "y", 180);
	other.transform.rotation.eulerAngles.y += 180;
}