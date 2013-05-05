#pragma strict

public var mainMenu : String;
public var buttonStyle : GUIStyle;
public var labelStyle : GUIStyle;

private enum MenuPositionEnumDead {NONE,MAIN,SETTINGS,SCORE,LEVELQUITTER};

public var MenuPosition : MenuPositionEnumDead = MenuPositionEnumDead.MAIN;

function Start () {

}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		if(MenuPosition != MenuPositionEnumDead.NONE)
			MenuPosition = MenuPositionEnumDead.NONE;
		else
			MenuPosition = MenuPositionEnumDead.MAIN;
	}
}

function OnGUI () {
	// if(MenuPosition != MenuPositionEnumDead.NONE)
	// 	GUI.Label (new Rect(0,0,Screen.width,Screen.height),"",new GUIStyle().)
	switch(MenuPosition){
		case MenuPositionEnumDead.MAIN :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", labelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Settings", buttonStyle)) {
				MenuPosition = MenuPositionEnumDead.SETTINGS;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Score", buttonStyle)) {
				MenuPosition = MenuPositionEnumDead.SCORE;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Quit", buttonStyle)) {
				MenuPosition = MenuPositionEnumDead.LEVELQUITTER;
				Application.LoadLevel(mainMenu);
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Continue", buttonStyle)) {
				MenuPosition = MenuPositionEnumDead.NONE;
			}
		break;
		case MenuPositionEnumDead.SETTINGS :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Settings", labelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Ipsum", buttonStyle)) {
				// MenuPosition = MenuPositionEnumDead.ACCOUNT;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 500, 50), "Bacon", buttonStyle)) {
				// MenuPosition = MenuPositionEnumDead.ACCOUNT;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back", buttonStyle)) {
				MenuPosition = MenuPositionEnumDead.MAIN;
			}
		break;
		case MenuPositionEnumDead.SCORE :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Score", labelStyle);
		break;
		case MenuPositionEnumDead.LEVELQUITTER :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Quitting...", labelStyle);
		break;
	}
}