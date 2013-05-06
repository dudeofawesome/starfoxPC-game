using UnityEngine;
using System.Collections;

public class MainMenuGUI : MonoBehaviour {

	public string lvlSpaceStation;
	public string lvlMountainRange;

	public GUIStyle buttonStyle;
	public GUIStyle titleLabelStyle;
	public GUIStyle descLabelStyle;
	public GUIStyle sliderBackStyle;
	public GUIStyle sliderThumbStyle;

	public enum MenuPositionEnum {MAIN,ACCOUNT,SETTINGS,LEVELCHOOSER,LEVELLOADER};

	public MenuPositionEnum MenuPosition = MenuPositionEnum.MAIN;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		// GameObject.Find("Arwing/polygon1").GetComponent<MeshRenderer>().SetColor("_tint",new ColorHSV((float) PlayerPrefs.GetInt("color"),1f,1f).ToColor());
		GameObject.Find("Arwing/polygon1").renderer.material.color = new ColorHSV((float) PlayerPrefs.GetInt("color"),1f,1f).ToColor();
	}

	void OnGUI () {
		switch(MenuPosition){
			case MenuPositionEnum.MAIN :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", titleLabelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Start", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LEVELCHOOSER;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Account", buttonStyle)) {
					MenuPosition = MenuPositionEnum.ACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 370, 500, 50), "Settings", buttonStyle)) {
					MenuPosition = MenuPositionEnum.SETTINGS;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Exit", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.Quit();
				}
			break;
			case MenuPositionEnum.ACCOUNT :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Account Options", titleLabelStyle);
				GUI.Label (new Rect(Screen.width / 2 - 250, 250, 500, 30), "Email", descLabelStyle);
				PlayerPrefs.SetString("email",GUI.TextField (new Rect(Screen.width / 2 - 150, 250, 400, 20), PlayerPrefs.GetString("email")));
				GUI.Label (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Color", descLabelStyle);
				PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 150, 330, 400, 20), PlayerPrefs.GetInt("color"), 0.0f, 255.0f));
				// PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 310, 250, 500, 20), PlayerPrefs.GetInt("color"), 0.0f, 255.0f,sliderBackStyle,sliderThumbStyle));
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back", buttonStyle)) {
					MenuPosition = MenuPositionEnum.MAIN;
				}
			break;
			case MenuPositionEnum.SETTINGS :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Settings", titleLabelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Ipsum", buttonStyle)) {

				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Bacon", buttonStyle)) {
					MenuPosition = MenuPositionEnum.ACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back", buttonStyle)) {
					MenuPosition = MenuPositionEnum.MAIN;
				}
			break;
			case MenuPositionEnum.LEVELCHOOSER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Choose Map", titleLabelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Space Station", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.LoadLevel(lvlSpaceStation);
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Mountain Range", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.LoadLevel(lvlMountainRange);
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back", buttonStyle)) {
					MenuPosition = MenuPositionEnum.MAIN;
				}
			break;
			case MenuPositionEnum.LEVELLOADER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Loading...", titleLabelStyle);
			break;
		}
	}
}
