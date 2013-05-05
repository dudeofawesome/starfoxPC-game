#pragma strict

public var mainMenu : String;
public var buttonStyle : GUIStyle;
public var labelStyle : GUIStyle;

private enum MenuPositionEnumLive {NONE,MAIN,SETTINGS,SCORE,LEVELQUITTER};

public var MenuPosition : MenuPositionEnumLive = MenuPositionEnumLive.NONE;

function Start () {

}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		if(MenuPosition != MenuPositionEnumLive.NONE)
			MenuPosition = MenuPositionEnumLive.NONE;
		else
			MenuPosition = MenuPositionEnumLive.MAIN;
	}
}

function OnGUI () {
	if(MenuPosition == MenuPositionEnumLive.NONE){
		// GUI.Label (new Rect(5,5,100,100),"This is map.\nsay hi map.\nhi map!\n  bye map!");
	}
	switch(MenuPosition){
		case MenuPositionEnumLive.MAIN :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", labelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Settings", buttonStyle)) {
				MenuPosition = MenuPositionEnumLive.SETTINGS;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Quit", buttonStyle)) {
				MenuPosition = MenuPositionEnumLive.LEVELQUITTER;
				Application.LoadLevel(mainMenu);
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Continue", buttonStyle)) {
				MenuPosition = MenuPositionEnumLive.NONE;
			}
		break;
		case MenuPositionEnumLive.SETTINGS :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Settings", labelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Ipsum", buttonStyle)) {
				// MenuPosition = MenuPositionEnumLive.ACCOUNT;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Bacon", buttonStyle)) {
				// MenuPosition = MenuPositionEnumLive.ACCOUNT;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back", buttonStyle)) {
				MenuPosition = MenuPositionEnumLive.MAIN;
			}
		break;
		case MenuPositionEnumLive.SCORE :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Score", labelStyle);
		break;
		case MenuPositionEnumLive.LEVELQUITTER :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Quitting...", labelStyle);
		break;
	}
}