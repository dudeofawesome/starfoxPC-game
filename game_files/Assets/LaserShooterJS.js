#pragma strict

public var projectile : GameObject;
private var argoProjectiles : GameObject[] = new GameObject[500];
private var iNext : int = 0;
public var fMag = 1000000.0;
private var chargeTime = 0.0;

public var controlMe : boolean = true;
public enum WeaponType {LASER,SMARTBOMB};
public var weaponType : WeaponType = WeaponType.LASER;

public var playerID : int = -1;

public var damageMultiplier : int = 1;

private var bombsRemaining : int = 1;

function Start () {
	for (var i : int = 0; i < argoProjectiles.Length; i++) {
		argoProjectiles[i] = Instantiate (projectile) as GameObject;
		argoProjectiles[i].SetActive (false);
	}
}

function Update () {
	if (GameObject.Find("Arwing" + playerID).GetComponent(ShipController).controlMe)
		controlMe = true;
	else
		controlMe = false;
	if (controlMe && weaponType == WeaponType.LASER) {
		if (Input.GetMouseButtonDown(0)) {
			chargeTime = Time.time;
		}
		if (Input.GetMouseButtonUp(0)) {
			chargeTime = Time.time - chargeTime;
			GameObject.Find("WeapLaserLeft").GetComponent(AudioSource).Play();
			GameObject.Find("WeapLaserRight").GetComponent(AudioSource).Play();
			var go : GameObject = argoProjectiles[iNext++];
			if (iNext >= argoProjectiles.Length) iNext = 0;
			go.SetActive (true);
			go.rigidbody.velocity = Vector3.zero;
			var _scaleSize = 19 / (1 + Mathf.Pow(0.1, chargeTime - 2)) + 1;
			go.transform.position = transform.position + transform.forward * 2 * _scaleSize;
			go.transform.localScale = new Vector3 (_scaleSize,_scaleSize,_scaleSize);
			go.transform.rotation = transform.rotation;
			go.transform.Rotate (0,90,0);
			go.rigidbody.AddForce (transform.forward * fMag + transform.forward);
			go.SendMessage ("ReceiveDamageMultiplier",damageMultiplier);
			go.SendMessage ("ReceiveShooterID",playerID);
		}
	}
	else if (controlMe && weaponType == WeaponType.SMARTBOMB) {
		if (Input.GetMouseButtonDown(1) && bombsRemaining > 0) {
			bombsRemaining--;
			GameObject.Find("WeapSmartBomb").GetComponent(AudioSource).Play();
			go = argoProjectiles[iNext++];
			if (iNext >= argoProjectiles.Length) iNext = 0;
			go.SetActive (true);
			go.rigidbody.velocity = Vector3.zero;
			go.transform.position = transform.position + transform.forward * 2;
			go.transform.rotation = transform.rotation;
			go.transform.Rotate(0,180,0);
			go.rigidbody.AddForce (transform.forward * fMag + transform.forward);
			GameObject.Find("GUI").SendMessage("ReceiveBombs",this.bombsRemaining);
			go.SendMessage ("ReceiveShooterID",playerID);
		}
	}
}

public function ReceiveBombs(_count : int) {
	bombsRemaining += _count;
	if(controlMe)
		GameObject.Find("GUI").SendMessage("ReceiveBombs",this.bombsRemaining);
}

public function ReceiveDamageMultiplier (_newMultiplier : int) {
	damageMultiplier += _newMultiplier;
}

public function ReceivePlayerID (_index : int) {
	playerID = _index;
}