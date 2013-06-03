using UnityEngine;
using System.Collections;

public class MainMenuGUI : MonoBehaviour {

	public string lvlSpaceStation;
	public string lvlMountainRange;

	public GUIStyle titleLabelStyle;
	public GUIStyle descLabelStyle;
	public GUIStyle sliderBackStyle;
	public GUIStyle sliderThumbStyle;

	public GUISkin guiSkin;

	public enum MenuPositionEnum {MAIN,ACCOUNT,SETTINGS,LEVELCHOOSER,LEVELLOADER};

	public MenuPositionEnum MenuPosition = MenuPositionEnum.MAIN;

	private int oldHue = 0;

	// Use this for initialization
	void Start () {
		oldHue = PlayerPrefs.GetInt("color");
	}
	
	// Update is called once per frame
	void Update () {
		GameObject.Find("Arwing1/polygon1").renderer.material.color = new ColorHSV((float) PlayerPrefs.GetInt("color"),1f,1f).ToColor();
		GameObject.Find("Arwing2/polygon1").renderer.material.color = new ColorHSV((float) PlayerPrefs.GetInt("color"),1f,1f).ToColor();
	}

	void OnGUI () {
		switch(MenuPosition){
			case MenuPositionEnum.MAIN :
				GUI.skin = guiSkin;
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", titleLabelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Start")) {
					MenuPosition = MenuPositionEnum.LEVELCHOOSER;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Account")) {
					MenuPosition = MenuPositionEnum.ACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 370, 500, 50), "Settings")) {
					MenuPosition = MenuPositionEnum.SETTINGS;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Exit")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.Quit();
				}
			break;
			case MenuPositionEnum.ACCOUNT :
				GUI.skin = guiSkin;
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Account Options", titleLabelStyle);
				GUI.BeginGroup(new Rect(0,80,Screen.width,Screen.height));
					GUI.Label (new Rect(Screen.width / 2 - 250, 250, 500, 30), "Email", descLabelStyle);
					PlayerPrefs.SetString("email",GUI.TextField (new Rect(Screen.width / 2 - 150, 250, 400, 20), PlayerPrefs.GetString("email")));
					GUI.Label (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Color", descLabelStyle);
					PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 150, 330, 400, 20), PlayerPrefs.GetInt("color"), 0.0f, 255.0f));
					// PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 310, 250, 500, 20), PlayerPrefs.GetInt("color"), 0.0f, 255.0f,sliderBackStyle,sliderThumbStyle));
					if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 120, 500, 50), "Apply Changes")) {
						WWW webData = new WWW("http://s.clrk.us/unity-hue.php?i=" + PlayerPrefs.GetInt("userID") + "&h=" + PlayerPrefs.GetInt("color"));
						//wait for download to finish...
						while(!webData.isDone){
							//we wait...
						}
						print(webData.text);
						//if (webData.text != "") {
							MenuPosition = MenuPositionEnum.MAIN;
						//}
						//else {
						//	PlayerPrefs.SetInt("color",oldHue);
						//}
					}
					if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back")) {
						MenuPosition = MenuPositionEnum.MAIN;
					}
				GUI.EndGroup();
			break;
			case MenuPositionEnum.SETTINGS :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Settings", titleLabelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Ipsum")) {

				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Bacon")) {
					MenuPosition = MenuPositionEnum.ACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back")) {
					MenuPosition = MenuPositionEnum.MAIN;
				}
			break;
			case MenuPositionEnum.LEVELCHOOSER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Choose Map", titleLabelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Space Station")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.LoadLevel(lvlSpaceStation);
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Mountain Range")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.LoadLevel(lvlMountainRange);
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back")) {
					MenuPosition = MenuPositionEnum.MAIN;
				}
			break;
			case MenuPositionEnum.LEVELLOADER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Loading...", titleLabelStyle);
			break;
		}
	}
}
