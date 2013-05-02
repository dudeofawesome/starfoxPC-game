using UnityEngine;
using System.Collections;

public class BulletCollisionHandling : MonoBehaviour {

	public GameObject particleFlash;
	public GameObject particleFireball;
	public GameObject particleFireRing;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnCollisionEnter (Collision other)
	{
		if (other.gameObject.name == "asteroid_rock") {
			GameObject _parts1 = (GameObject) Instantiate(particleFlash);
			GameObject _parts2 = (GameObject) Instantiate(particleFireball);
			GameObject _parts3 = (GameObject) Instantiate(particleFireRing);
			_parts1.transform.position = other.gameObject.transform.position;
			_parts2.transform.position = other.gameObject.transform.position;
			_parts3.transform.position = other.gameObject.transform.position;
			_parts1.particleSystem.Play();
			_parts2.particleSystem.Play();
			_parts3.particleSystem.Play();
			Destroy(other.gameObject);
		}
		else if (other.gameObject.name == "Arwing") {
			// other.gameObject.GetComponent<ShipController>().health -= 10;
			// if (other.gameObject.GetComponent<ShipController>().health < 0) {
				GameObject _parts1 = (GameObject) Instantiate(particleFlash);
				GameObject _parts2 = (GameObject) Instantiate(particleFireball);
				GameObject _parts3 = (GameObject) Instantiate(particleFireRing);
				_parts1.transform.position = other.gameObject.transform.position;
				_parts2.transform.position = other.gameObject.transform.position;
				_parts3.transform.position = other.gameObject.transform.position;
				_parts1.particleSystem.Play();
				_parts2.particleSystem.Play();
				_parts3.particleSystem.Play();
				Destroy(other.gameObject);
			// }
		}
		Destroy(this);
	}
}
