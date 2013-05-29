using UnityEngine;
using System.Collections;

public class loginMenu : MonoBehaviour {

	public string lvlMainMenu;

	public GUIStyle buttonStyle;
	public GUIStyle titleLabelStyle;
	public GUIStyle descLabelStyle;

	public enum MenuPositionEnum {LOGIN,NEWACCOUNT,LEVELLOADER};

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
					WWW webLogin = new WWW("http://s.clrk.us/unity-login.php?u=" + PlayerPrefs.GetString("username") + "&p=" + PlayerPrefs.GetString("password"));
					//WWW webLogin = new WWW("http://s.clrk.us/unity-login.php?u=b1hiker&p=mypassword");
					//wait for download to finish...
					while(!webLogin.isDone){
						//we wait...
					}
					if (webLogin.text == "username works\nAll golden") {
						MenuPosition = MenuPositionEnum.LEVELLOADER;
						Application.LoadLevel(lvlMainMenu);
					}
					else {
						print(webLogin.text);
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

				GUI.Label (new Rect(Screen.width / 2 - 250, 180, 500, 30), "Email", descLabelStyle);
				email = GUI.TextField (new Rect(Screen.width / 2 - 150, 180, 400, 20), email);

				GUI.Label (new Rect(Screen.width / 2 - 250, 240, 500, 30), "Username", descLabelStyle);
				fullName = GUI.TextField (new Rect(Screen.width / 2 - 90, 240, 340, 20), fullName);

				GUI.Label (new Rect(Screen.width / 2 - 250, 300, 500, 30), "Real Name", descLabelStyle);
				username = GUI.TextField (new Rect(Screen.width / 2 - 90, 300, 340, 20), username);

				GUI.Label (new Rect(Screen.width / 2 - 250, 360, 500, 30), "Password", descLabelStyle);
				password = GUI.TextField (new Rect(Screen.width / 2 - 90, 360, 340, 20), password);

				GUI.Label (new Rect(Screen.width / 2 - 250, 420, 500, 30), "Password", descLabelStyle);
				passwordConfirm = GUI.TextField (new Rect(Screen.width / 2 - 90, 420, 340, 20), passwordConfirm);

				GUI.Label (new Rect(Screen.width / 2 - 250, 480, 500, 50), "Color", descLabelStyle);
				PlayerPrefs.SetInt("color",(int) GUI.HorizontalSlider (new Rect(Screen.width / 2 - 150, 490, 400, 20), PlayerPrefs.GetInt("color"), 0.0f, 255.0f));
				hue = PlayerPrefs.GetInt("color");

				//fail captcha
				string correctCaptcha = ((_num1 + _num2) * _num3) + "";
				GUI.Label (new Rect(Screen.width / 2 - 250, 530, 500, 30), "Captcha: (" + _num1 + " + " + _num2 + ") * " + _num3 + " =", descLabelStyle);
				userCaptcha = GUI.TextField (new Rect(Screen.width / 2 + 90, 530, 200, 20), userCaptcha);

				if (GUI.Button (new Rect(Screen.width / 2 - 250, Screen.height - 70, 245, 50), "Back", buttonStyle)) {
					MenuPosition = MenuPositionEnum.LOGIN;
				}

				if (GUI.Button (new Rect(Screen.width / 2 - 0, Screen.height - 70, 245, 50), "Continue", buttonStyle)) {
					if (userCaptcha == correctCaptcha) {
						if (password == passwordConfirm) {
							//server check
							WWW webLogin = new WWW("http://s.clrk.us/unity-register.php?e=" + email + "&u=" + username + "&dn=" + fullName + "&p=" + password + "&h=" + hue);
							//wait for download to finish...
							while(!webLogin.isDone){
								//we wait...
							}
							if (webLogin.text == "username works\nAll golden") {
								MenuPosition = MenuPositionEnum.LOGIN;
							}
						}
						else {
							//MenuPosition = MenuPositionEnum.LOGIN;
							//MenuPosition = MenuPositionEnum.NEWACCOUNT;
							password = "Passwords did not match!";
							passwordConfirm = "";
						}
					}
					else {
						print(correctCaptcha + " " + userCaptcha);
						_num1 = Random.Range(0,10);
						_num2 = Random.Range(5,20);
						_num3 = Random.Range(-3,3);
						userCaptcha = "Invalid captcha";
					}
				}
			break;
			case MenuPositionEnum.LEVELLOADER :
				GUI.Label (new Rect(Screen.width / 2 - 50, 70, 100, 30), "Loading...", titleLabelStyle);
			break;
		}
	}
}
