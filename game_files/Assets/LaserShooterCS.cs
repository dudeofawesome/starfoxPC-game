using UnityEngine;
using System.Collections;
using System;

public class LaserShooterCS : MonoBehaviour {

	public GameObject projectile;
	private GameObject[] argoProjectiles = new GameObject[500];
	private int iNext = 0;
	public float fMag = 1000000.0f;
	private float chargeTime = 0.0f;

	public bool controlMe = true;
	public enum WeaponType {LASER,SMARTBOMB};
	public WeaponType weaponType = WeaponType.LASER;

	public int damageMultiplier = 1;

	private int bombsRemaining = 1;

	void Start () {
		for (int i = 0; i < argoProjectiles.Length; i++) {
			argoProjectiles[i] = (GameObject)Instantiate (projectile);
			argoProjectiles[i].SetActive (false);
		}
	}

	void Update () {
		if (GameObject.Find("Cameras/CamDeath").camera.enabled == true)
			controlMe = false;
		else
			controlMe = true;
		if (weaponType == WeaponType.LASER) {
			if (Input.GetMouseButtonDown(0)) {
				chargeTime = Time.time;
			}
			if (controlMe && Input.GetMouseButtonUp(0)) {
				chargeTime = Time.time - chargeTime;
				GameObject.Find("WeapLaserLeft").GetComponent<AudioSource>().Play();
				GameObject.Find("WeapLaserRight").GetComponent<AudioSource>().Play();
				GameObject go = argoProjectiles[iNext++];
				if (iNext >= argoProjectiles.Length) iNext = 0;
				go.SetActive (true);
				go.rigidbody.velocity = Vector3.zero;
				float _scaleSize = 19f / (1f + Mathf.Pow(0.1f, chargeTime - 2f)) + 1f;
				go.transform.position = transform.position + transform.forward * 2 * _scaleSize;
				go.transform.localScale = new Vector3 (_scaleSize,_scaleSize,_scaleSize);
				go.transform.rotation = transform.rotation;
				go.transform.Rotate (0,90,0);
				go.rigidbody.AddForce (transform.forward * fMag + transform.forward);
				go.SendMessage ("ReceiveDamageMultiplier",damageMultiplier);
			}
		}
		else if (weaponType == WeaponType.SMARTBOMB) {
			if (controlMe && Input.GetMouseButtonDown(1) && bombsRemaining > 0) {
				bombsRemaining--;
				GameObject.Find("WeapSmartBomb").GetComponent<AudioSource>().Play();
				GameObject go = argoProjectiles[iNext++];
				if (iNext >= argoProjectiles.Length) iNext = 0;
				go.SetActive (true);
				go.rigidbody.velocity = Vector3.zero;
				float _scaleSize = 19f / (1f + Mathf.Pow(0.1f, chargeTime - 2f)) + 1f;
				go.transform.position = transform.position + transform.forward * 2 * _scaleSize;
				go.transform.localScale = new Vector3(_scaleSize,_scaleSize,_scaleSize);
				go.transform.rotation = transform.rotation;
				go.transform.Rotate(0,180,0);
				go.rigidbody.AddForce (transform.forward * fMag + transform.forward);
				GameObject.Find("GUI").SendMessage("ReceiveBombs",this.bombsRemaining);
			}
		}
	}

	public void ReceiveBombs(int _count) {
		bombsRemaining += _count;
		GameObject.Find("GUI").SendMessage("ReceiveBombs",this.bombsRemaining);
	}

	public void ReceiveDamageMultiplier (int _newMultiplier) {
		damageMultiplier += _newMultiplier;
	}
}