#pragma strict

public var mainMenu : String;
public var buttonStyle : GUIStyle;
public var labelStyle : GUIStyle;
public var bombCountStyle : GUIStyle;
public var livesCountStyle : GUIStyle;
public var healthBarBase : GUIStyle;
public var healthBarHead : GUIStyle;
public var statsTex : Texture;

private var health = 100.0;
private var lives = 3;
private var bombs = 1;

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
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 245, 50), "Kill Me", buttonStyle)) {
				MenuPosition = MenuPositionEnumLive.NONE;
				GameObject.Find("Arwing00").SendMessage("AddDamage",101);
			}
			if (GUI.Button (new Rect(Screen.width / 2, 310, 245, 50), "Quit", buttonStyle)) {
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

	GUI.DrawTexture(Rect(20, Screen.height - 220, 200, 200), statsTex);

	//lives count
	GUI.Label (new Rect(146,Screen.height - 82,20,20),"0" + lives,livesCountStyle);

	//bombs count
	var matrixBackup : Matrix4x4 = GUI.matrix;
	GUIUtility.RotateAroundPivot(-45, new Vector2(120,Screen.height - 180));
	//GUI.DrawTexture(rect, texture);
	GUI.Label (new Rect(96,Screen.height - 192,20,20),"0" + bombs,bombCountStyle);

	var texture : Texture2D = new Texture2D(1, 1);
	var color : Color = new Color(0,255,0);
	texture.SetPixel(0, 0, color);
	texture.Apply();
	healthBarBase.normal.background = texture;
	healthBarHead.normal.background = texture;

	//health bar
	if(275 * (health / 100.0) - 80 < 0 && health > 0){
		GUI.Box (new Rect(-18,Screen.height - 142,275 * (health / 100.0),25),"",healthBarBase);
	}
	else if (health > 0)
		GUI.Box (new Rect(-18,Screen.height - 142,80,25),"",healthBarBase);
	if(275 * (health / 100.0) - 105 >= 0){
		GUI.Box (new Rect(62,Screen.height - 137,212 * (health / 100.0) - 80,20),"",healthBarHead);
	}

	GUI.matrix = matrixBackup;
}

function ReceiveHealth (_health : int) {
	health = _health;
}
function ReceiveBombs (_bombs : int) {
	bombs = _bombs;
}
function ReceiveLives (_lives : int) {
	lives = _lives;
}