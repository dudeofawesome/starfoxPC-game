using UnityEngine;
using System.Collections;
using System;

public class LaserShooterCS : MonoBehaviour {

	public GameObject laser;
	private GameObject[] argoProjectiles = new GameObject[500];
	private int iNext = 0;
	public float fMag = 1000000.0f;
	private float chargeTime = 0.0f;

	void Start () {
		for (int i = 0; i < argoProjectiles.Length; i++) {
			argoProjectiles[i] = (GameObject)Instantiate (laser);
			argoProjectiles[i].SetActive (false);
			// argoProjectiles[i].AddComponent<Rigidbody>();
			// argoProjectiles[i].AddComponent<BoxCollider>();
			// argoProjectiles[i].GetComponent<Rigidbody>().mass = 50;
		}
	}

	void Update () {
		if (Input.GetMouseButtonDown(0)) {
			chargeTime = Time.time;
		}
		if (Input.GetMouseButtonUp(0)) {
			chargeTime = Time.time - chargeTime;
			GameObject.Find("WeapLaserLeft").GetComponent<AudioSource>().Play();
			GameObject.Find("WeapLaserRight").GetComponent<AudioSource>().Play();
			GameObject go = argoProjectiles[iNext++];
			if (iNext >= argoProjectiles.Length) iNext = 0;
			go.SetActive (true);
			go.rigidbody.velocity = Vector3.zero;
			float _scaleSize = 19f / (1f + Mathf.Pow(0.1f, chargeTime - 2f)) + 1f;
			go.transform.position = transform.position + transform.forward * _scaleSize;
			go.transform.localScale = new Vector3(_scaleSize,_scaleSize,_scaleSize);
			go.transform.rotation = Quaternion.Euler(transform.rotation.x,transform.rotation.y - 90,transform.rotation.z);
			go.rigidbody.AddForce (transform.forward * fMag + transform.forward);
			//go.rigidbody.AddForce (transform.forward * fMag * GameObject.Find("arwing").GetComponent("ThirdPersonShipController").forwardSpeed);
		}
	}
}