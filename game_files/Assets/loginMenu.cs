using UnityEngine;
using System.Collections;

public class loginMenu : MonoBehaviour {

	public string lvlMainMenu;

	public GUIStyle titleLabelStyle;
	public GUIStyle descLabelStyle;

	public GUISkin guiSkin;

	public enum MenuPositionEnum {LOGIN,NEWACCOUNT,LEVELLOADER,LOGINNOINTERNET};

	public MenuPositionEnum MenuPosition = MenuPositionEnum.LOGIN;

	private int _num1 = 0;
	private int _num2 = 0;
	private int _num3 = 0;
	private string userCaptcha = "";

	private string username = "";
	private string email = "";
	private string fullName = "";
	private string password = "";
	private string passwordConfirm = "";
	private int hue = 200;


	// Use this for initialization
	void Start () {
		_num1 = Random.Range(0,10);
		_num2 = Random.Range(5,20);
		_num3 = Random.Range(-3,3);
	}
	
	// Update is called once per frame
	void Update () {
		GameObject.Find("Arwing1/polygon1").renderer.material.color = new ColorHSV((float) PlayerPrefs.GetInt("color"),1f,1f).ToColor();
		GameObject.Find("Arwing2/polygon1").renderer.material.color = new ColorHSV((float) PlayerPrefs.GetInt("color"),1f,1f).ToColor();
	}

	void OnGUI () {
		GUI.skin = guiSkin;
		switch(MenuPosition){
			case MenuPositionEnum.LOGIN :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", titleLabelStyle);

				GUI.Label (new Rect(Screen.width / 2 - 250, 250, 500, 30), "Username", descLabelStyle);
				PlayerPrefs.SetString("username",GUI.TextField (new Rect(Screen.width / 2 - 90, 250, 340, 20), PlayerPrefs.GetString("username")));
				GUI.Label (new Rect(Screen.width / 2 - 250, 310, 500, 30), "Password", descLabelStyle);
				PlayerPrefs.SetString("password",GUI.PasswordField (new Rect(Screen.width / 2 - 90, 310, 340, 20), PlayerPrefs.GetString("password"),"*"[0]));

				if (GUI.Button (new Rect(Screen.width / 2 - 250, 370, 500, 50), "Login")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;

					if (PlayerPrefs.GetString("username") == "anon") {
						MenuPosition = MenuPositionEnum.LEVELLOADER;
						Application.LoadLevel(lvlMainMenu);
					}
					WWW webLogin = new WWW("http://s.clrk.us/unity-login.php?u=" + PlayerPrefs.GetString("username") + "&p=" + PlayerPrefs.GetString("password"));
					//wait for download to finish...
					while(!webLogin.isDone){
						//we wait...
					}
					string[] _loginInfo = webLogin.text.Split(","[0]);
					if (_loginInfo[0] != "fail") {
						PlayerPrefs.SetInt("userID",int.Parse(_loginInfo[0]));
						PlayerPrefs.SetInt("color",int.Parse(_loginInfo[1]));
						PlayerPrefs.SetString("realname",_loginInfo[2]);
						PlayerPrefs.SetString("profilePicLink",_loginInfo[3]);

						Application.LoadLevel(lvlMainMenu);
					}
					else {
						if (webLogin.text == "") {
							MenuPosition = MenuPositionEnum.LOGINNOINTERNET;
						}
						else {
							MenuPosition = MenuPositionEnum.LOGIN;
						}
					}
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 430, 500, 50), "Make new account")) {
					MenuPosition = MenuPositionEnum.NEWACCOUNT;
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Exit")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.Quit();
				}
			break;
			case MenuPositionEnum.LOGINNOINTERNET :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Starfox PC", titleLabelStyle);

				GUI.Label (new Rect(Screen.width / 2 - 250, 250, 500, 30), "Username", descLabelStyle);
				PlayerPrefs.SetString("username",GUI.TextField (new Rect(Screen.width / 2 - 90, 250, 340, 20), PlayerPrefs.GetString("username")));
				GUI.Label (new Rect(Screen.width / 2 - 250, 310, 500, 30), "Password", descLabelStyle);
				PlayerPrefs.SetString("password",GUI.PasswordField (new Rect(Screen.width / 2 - 90, 310, 340, 20), PlayerPrefs.GetString("password"),"*"[0]));

				if (GUI.Button (new Rect(Screen.width / 2 - 250, 370, 500, 50), "Login")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;

					if (PlayerPrefs.GetString("username") == "anon") {
						MenuPosition = MenuPositionEnum.LEVELLOADER;
						Application.LoadLevel(lvlMainMenu);
					}
					WWW webLogin = new WWW("http://s.clrk.us/unity-login.php?u=" + PlayerPrefs.GetString("username") + "&p=" + PlayerPrefs.GetString("password"));
					//wait for download to finish...
					while(!webLogin.isDone){
						//we wait...
					}
					string[] _loginInfo = webLogin.text.Split(","[0]);
					if (_loginInfo[0] != "fail") {
						PlayerPrefs.SetInt("userID",int.Parse(_loginInfo[0]));
						PlayerPrefs.SetInt("color",int.Parse(_loginInfo[1]));
						PlayerPrefs.SetString("realname",_loginInfo[2]);
						PlayerPrefs.SetString("profilePicLink",_loginInfo[3]);

						Application.LoadLevel(lvlMainMenu);
					}
					else {
						if (webLogin.text == "") {
							MenuPosition = MenuPositionEnum.LOGINNOINTERNET;
						}
						else {
							MenuPosition = MenuPositionEnum.LOGIN;
						}
					}
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, 430, 500, 50), "Anonymous Login")) {
					PlayerPrefs.SetString("username","anon");
					PlayerPrefs.SetString("realname","anon");
					PlayerPrefs.SetInt("color",200);
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.LoadLevel(lvlMainMenu);
				}
				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 500, 50), "Exit")) {
					MenuPosition = MenuPositionEnum.LEVELLOADER;
					Application.Quit();
				}
			break;
			case MenuPositionEnum.NEWACCOUNT :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "New Account", titleLabelStyle);

				GUI.Label (new Rect(Screen.width / 2 - 250, 180, 500, 30), "Email", descLabelStyle);
				email = GUI.TextField (new Rect(Screen.width / 2 - 150, 180, 400, 20), email);

				GUI.Label (new Rect(Screen.width / 2 - 250, 240, 500, 30), "Username", descLabelStyle);
				username = GUI.TextField (new Rect(Screen.width / 2 - 90, 240, 340, 20), username);

				GUI.Label (new Rect(Screen.width / 2 - 250, 300, 500, 30), "Real Name", descLabelStyle);
				fullName = GUI.TextField (new Rect(Screen.width / 2 - 90, 300, 340, 20), fullName);

				GUI.Label (new Rect(Screen.width / 2 - 250, 360, 500, 30), "Password", descLabelStyle);
				password = GUI.PasswordField (new Rect(Screen.width / 2 - 90, 360, 340, 20), password, "*"[0]);

				GUI.Label (new Rect(Screen.width / 2 - 250, 420, 500, 30), "Password", descLabelStyle);
				passwordConfirm = GUI.PasswordField (new Rect(Screen.width / 2 - 90, 420, 340, 20), passwordConfirm, "*"[0]);

				GUI.Label (new Rect(Screen.width / 2 - 250, 480, 500, 50), "Color", descLabelStyle);
				PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 150, 490, 400, 20), PlayerPrefs.GetInt("color"), 1.0f, 255.0f));
				hue = PlayerPrefs.GetInt("color");

				//fail captcha
				string correctCaptcha = ((_num1 + _num2) * _num3) + "";
				GUI.Label (new Rect(Screen.width / 2 - 250, 530, 500, 30), "Captcha: (" + _num1 + " + " + _num2 + ") * " + _num3 + " =", descLabelStyle);
				userCaptcha = GUI.TextField (new Rect(Screen.width / 2 + 90, 530, 200, 20), userCaptcha);

				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 245, 50), "Back")) {
					MenuPosition = MenuPositionEnum.LOGIN;
				}

				if (GUI.Button (new Rect(Screen.width / 2 - 0, Screen.height - 70, 245, 50), "Continue")) {
					if (userCaptcha == correctCaptcha) {
						if (password == passwordConfirm) {
							//server check
							string[] _fixedDNparts = fullName.Split(" "[0]);
							string _fixedDN = "";
							foreach (string _part in _fixedDNparts) {
								_fixedDN += _part + "%20";
							}
							WWW webLogin = new WWW("http://s.clrk.us/unity-register.php?e=" + email + "&u=" + username + "&dn=" + _fixedDN + "&h=" + hue + "&p=" + password);
							//wait for download to finish...
							while(!webLogin.isDone){
								//we wait...
							}
							if (webLogin.text == "You have successfully registered. You can now login <a href=\"login.php\">here</a>.") {
									MenuPosition = MenuPositionEnum.LOGIN;
							}
							else {
								print(webLogin.text);
								if (webLogin.text == "") {
									MenuPosition = MenuPositionEnum.LOGINNOINTERNET;
								}
								//MenuPosition = MenuPositionEnum.LOGIN;
								//MenuPosition = MenuPositionEnum.NEWACCOUNT;
							}
						}
					}
					else {
						print(correctCaptcha + " " + userCaptcha);
						_num1 = Random.Range(0,10);
						_num2 = Random.Range(5,20);
						_num3 = Random.Range(-3,3);
					}
				}
			break;
			case MenuPositionEnum.LEVELLOADER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Loading...", titleLabelStyle);
			break;
		}
	}
}