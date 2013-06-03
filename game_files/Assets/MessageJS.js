class MessageJS {
	public var message : String = "";
	public var lifetime : int = 300;
	public var alive : int = 0;

	public function MessageJS (_message) {
		message = _message;
	}

	public function age(){
		alive ++;
	}
}