using UnityEngine;
using System.Collections;

public class loginMenu : MonoBehaviour {

	public string lvlMainMenu;

	public GUIStyle buttonStyle;
	public GUIStyle titleLabelStyle;
	public GUIStyle descLabelStyle;

	public enum MenuPositionEnum {LOGIN,NEWACCOUNT,LEVELLOADER};

	public MenuPositionEnum MenuPosition = MenuPositionEnum.LOGIN;

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
			case MenuPositionEnum.LOGIN :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", titleLabelStyle);

				GUI.Label (new Rect(Screen.width / 2 - 250, 250, 500, 30), "Username", descLabelStyle);
				PlayerPrefs.SetString("username",GUI.TextField (new Rect(Screen.width / 2 - 90, 250, 340, 20), PlayerPrefs.GetString("username")));
				GUI.Label (new Rect(Screen.width / 2 - 250, 310, 500, 30), "Password", descLabelStyle);
				PlayerPrefs.SetString("password",GUI.TextField (new Rect(Screen.width / 2 - 90, 310, 340, 20), PlayerPrefs.GetString("password")));

				if (GUI.Button (new Rect(Screen.width / 2 - 250, 370, 500, 50), "Login", buttonStyle)) {
					if (PlayerPrefs.GetString("username") == "anon") {
						MenuPosition = MenuPositionEnum.LEVELLOADER;
						Application.LoadLevel(lvlMainMenu);
					}
					// WWW webLogin = new WWW("http://s.clrk.us/login.php?u=" + PlayerPrefs.GetString("username") + "&p=" + PlayerPrefs.GetString("password"));
					WWW webLogin = new WWW("http://s.clrk.us/unity-login.php?u=b1hiker&p=mypassword");
					//wait for download to finish...
					while(!webLogin.isDone){
						//we wait...
					}
					if (webLogin.text == "logged in successfully") {
						MenuPosition = MenuPositionEnum.LEVELLOADER;
						Application.LoadLevel(lvlMainMenu);
					}
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 430, 500, 50), "Make new account", buttonStyle)) {
					MenuPosition = MenuPositionEnum.NEWACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Exit", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.Quit();
				}
			break;
			case MenuPositionEnum.NEWACCOUNT :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "New Account", titleLabelStyle);

				GUI.Label (new Rect(Screen.width / 2 - 250, 250, 500, 30), "Email", descLabelStyle);
				string email = GUI.TextField (new Rect(Screen.width / 2 - 150, 250, 400, 20), PlayerPrefs.GetString("email"));

				GUI.Label (new Rect(Screen.width / 2 - 250, 310, 500, 30), "Username", descLabelStyle);
				string username = GUI.TextField (new Rect(Screen.width / 2 - 90, 310, 340, 20), PlayerPrefs.GetString("username"));

				GUI.Label (new Rect(Screen.width / 2 - 250, 370, 500, 30), "Password", descLabelStyle);
				string password = GUI.TextField (new Rect(Screen.width / 2 - 90, 370, 340, 20), PlayerPrefs.GetString("password"));

				GUI.Label (new Rect(Screen.width / 2 - 250, 430, 500, 30), "Password", descLabelStyle);
				string passwordConfirm = GUI.TextField (new Rect(Screen.width / 2 - 90, 430, 340, 20), PlayerPrefs.GetString("password"));

				GUI.Label (new Rect(Screen.width / 2 - 250, 490, 500, 50), "Color", descLabelStyle);
				PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 150, 510, 400, 20), PlayerPrefs.GetInt("color"), 0.0f, 255.0f));

				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 245, 50), "Back", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LOGIN;
				}

				if (GUI.Button (new Rect(Screen.width / 2 - 0, Screen.height - 70, 245, 50), "Continue", buttonStyle)) {
					if(password == passwordConfirm){
						//server check
						MenuPosition = MenuPositionEnum.LOGIN;
					}
					else{
						//MenuPosition = MenuPositionEnum.LOGIN;
						//MenuPosition = MenuPositionEnum.NEWACCOUNT;
					}
				}
			break;
			case MenuPositionEnum.LEVELLOADER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Loading...", titleLabelStyle);
			break;
		}
	}
}
