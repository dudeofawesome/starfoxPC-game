public class ArwingPlayer{
	public var model : GameObject;
	public var engineLight : GameObject;
	public var gunLightLeft : GameObject;
	public var gunLightRight : GameObject;
	public var camThirdPerson : GameObject;
	public var camFirstPerson : GameObject;
	// public var particlesEngine : GameObject = GameObject.Find("Players/me/particlesEngine");
	public var GUIcrosshair : GameObject;

	public function ArwingPlayer(_model : GameObject,_engineLight : GameObject,_gunLightLeft : GameObject,_gunLightRight : GameObject,_camThirdPerson : GameObject,_camFirstPerson : GameObject,_GUIcrosshair : GameObject){
		model = _model;
		engineLight = _engineLight;
		gunLightLeft = _gunLightLeft;
		gunLightRight = _gunLightRight;
		camThirdPerson = _camThirdPerson;
		camFirstPerson = _camFirstPerson;
		GUIcrosshair = _GUIcrosshair;
	}
}