using UnityEngine;
using System.Collections;

public class BulletCollisionHandling : MonoBehaviour {

	public GameObject particleSystem;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnCollisionEnter (Collision other)
	{
		print("beep");
		if (other.gameObject.name == "asteroid_rock")
 {
			print("boop");
			_parts = Instantiate(particleSystem);
			_parts.transform.position = other.gameObject.transform.position;
			Destroy(other.gameObject);
			// other.gameObject.GetComponent<MeshRenderer>().enabled = false;
		}
		else
			print(other.gameObject.name);
	}
}
