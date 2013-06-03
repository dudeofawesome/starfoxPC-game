using UnityEngine;
using System.Collections;

public class turnAroundCS : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnCollisionEnter (Collision other) {
		//HOTween.To(other.transform.position, 0.3, "fieldOfView", 60);
	}
}
