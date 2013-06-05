#pragma strict

import System.Collections.Generic;

public var mainMenu : String;
public var buttonStyle : GUIStyle;
public var labelStyle : GUIStyle;
public var bombCountStyle : GUIStyle;
public var livesCountStyle : GUIStyle;
public var healthBarBase : GUIStyle;
public var healthBarHead : GUIStyle;
public var systemMessageStyle : GUIStyle;
public var deathMessageStyle : GUIStyle;
public var descLabelStyle : GUIStyle;
public var statsTex : Texture;

public var guiSkin : GUISkin;

private var health = 100.0;
private var lives = 3;
private var bombs = 1;

public var deathMessages : List.<MessageJS> = new List.<MessageJS>();
public var systemMessages : List.<MessageJS> = new List.<MessageJS>();

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
	GUI.skin = guiSkin;
	switch(MenuPosition){
		case MenuPositionEnumLive.MAIN :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", labelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 250, 500, 50), "Settings")) {
				MenuPosition = MenuPositionEnumLive.SETTINGS;
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, 310, 245, 50), "Kill Me")) {
				MenuPosition = MenuPositionEnumLive.NONE;
				GameObject.Find("Arwing00").SendMessage("AddDamage",101);
			}
			if (GUI.Button (new Rect(Screen.width / 2, 310, 245, 50), "Quit")) {
				MenuPosition = MenuPositionEnumLive.LEVELQUITTER;
				Application.LoadLevel(mainMenu);
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Continue")) {
				MenuPosition = MenuPositionEnumLive.NONE;
			}
		break;
		case MenuPositionEnumLive.SETTINGS :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Settings", labelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 - 200, 250, 50, 50), "<")) {
				QualitySettings.DecreaseLevel(true);
			}
			GUI.Label (new Rect(Screen.width / 2 - 70, 250, 380, 50), "Quality: " + QualitySettings.GetQualityLevel(), descLabelStyle);
			if (GUI.Button (new Rect(Screen.width / 2 + 150, 250, 50, 50), ">")) {
				QualitySettings.IncreaseLevel(true);
			}
			if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Back")) {
				MenuPosition = MenuPositionEnumLive.MAIN;
			}
		break;
		case MenuPositionEnumLive.SCORE :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Score", labelStyle);
		break;
		case MenuPositionEnumLive.LEVELQUITTER :
			GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Quitting...", labelStyle);
		break;
		case MenuPositionEnumLive.NONE :
			for (var i = 0; i < deathMessages.Count; i++) {
				var _message : MessageJS = deathMessages[i];
				GUI.Label (new Rect(Screen.width / 2 - 100,Screen.height - 80 - (i * 20),200,20),_message.message as String,deathMessageStyle);
				_message.age();
				if (_message.alive > _message.lifetime) {
					deathMessages.RemoveAt(i);
				}
			}
			for (i = 0; i < systemMessages.Count; i++) {
				_message = systemMessages[i];
				GUI.Label (new Rect(Screen.width - 250,Screen.height - ((i + 1) * 15),200,10),_message.message as String,systemMessageStyle);
				_message.age();
				if (_message.alive > _message.lifetime) {
					systemMessages.RemoveAt(i);
				}
			}
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
function ReceiveDeathMessage (_message : String) {
	deathMessages.Add(MessageJS(_message));
}
function ReceiveSystemMessage (_message : String) {
	systemMessages.Add(MessageJS(_message));
}