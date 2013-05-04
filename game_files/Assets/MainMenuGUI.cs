using UnityEngine;
using System.Collections;

public class MainMenuGUI : MonoBehaviour {

	public string lvlSpaceStation;
	public string lvlMountainRange;

	public GUIStyle buttonStyle;
	public GUIStyle labelStyle;

	public enum MenuPositionEnum {MAIN,ACCOUNT,SETTINGS,LEVELCHOOSER,LEVELLOADER};

	public MenuPositionEnum MenuPosition = MenuPositionEnum.MAIN;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		// transform.Rotate(0f,-0.03f,0.01f);
	}

	void OnGUI () {
		switch(MenuPosition){
			case MenuPositionEnum.MAIN :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", labelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Start", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LEVELCHOOSER;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Account", buttonStyle)) {
					MenuPosition = MenuPositionEnum.ACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 370, 500, 50), "Settings", buttonStyle)) {
					MenuPosition = MenuPositionEnum.SETTINGS;
				}
			break;
			case MenuPositionEnum.ACCOUNT :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Account Options", labelStyle);
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Ipsum", buttonStyle)) {

				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Bacon", buttonStyle)) {
					MenuPosition = MenuPositionEnum.ACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back", buttonStyle)) {
					MenuPosition = MenuPositionEnum.MAIN;
				}
			break;
			case MenuPositionEnum.SETTINGS :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Settings", labelStyle);
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
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Choose Map", labelStyle);
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
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Loading...", labelStyle);
			break;
		}
	}
}
