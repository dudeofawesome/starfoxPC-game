using UnityEngine;
using System.Collections;

public class LaserShooterLandmaster : MonoBehaviour {

	public GameObject laser;
	private GameObject[] argoProjectiles = new GameObject[500];
	private int iNext = 0;
	public float fMag = 10000000.0f;

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
			GameObject.Find("LightGun").GetComponent<AudioSource>().Play();
			GameObject go = argoProjectiles[iNext++];
			if (iNext >= argoProjectiles.Length) iNext = 0;
			go.SetActive (true);
			// go.AddComponent<Rigidbody>();
			go.rigidbody.velocity = Vector3.zero;
			go.transform.position = transform.position + transform.forward;
			go.transform.rotation = Quaternion.Euler(transform.rotation.x,transform.rotation.y,transform.rotation.z - 90);
			// go.transform.rotation = transform.rotation;
			go.rigidbody.AddForce (transform.forward * fMag);
			//go.rigidbody.AddForce (transform.forward * fMag * GameObject.Find("arwing").GetComponent("ThirdPersonShipController").forwardSpeed);
		}
		if(Input.GetMouseButtonDown(0)){
			GameObject.Find("model/polygon4/LightGun").light.enabled = true;
		}
		if(Input.GetMouseButtonUp(0)){
			GameObject.Find("model/polygon4/LightGun").light.enabled = false;
		}

	}
}