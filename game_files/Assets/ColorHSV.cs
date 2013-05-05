using UnityEngine;
using System.Collections;

public class ColorHSV {
/**
* A color in HSV space
*/

	float h = 0.0f;
	float s = 0.0f;
	float v = 0.0f;
	float a = 0.0f;

	/**
	* Construct without alpha (which defaults to 1)
	*/

	public ColorHSV (float _h, float _s, float _v){
		this.h = _h;
		this.s = _s;
		this.v = _v;
		this.a = 1.0f;
	}

	/**
	* Construct with alpha
	*/

	public ColorHSV (float _h, float _s, float _v, float _a){
		this.h = _h;
		this.s = _s;
		this.v = _v;
		this.a = _a;
	}

	/**
	* Create from an RGBA color object
	*/
	public ColorHSV (Color color){
		float min = Mathf.Min(Mathf.Min(color.r, color.g), color.b);
		float max = Mathf.Max(Mathf.Max(color.r, color.g), color.b);
		float delta = max - min;
 
		// value is our max color
		this.v = max;

		// saturation is percent of max
		if(!Mathf.Approximately(max, 0))
			this.s = delta / max;
		else
		{
			// all colors are zero, no saturation and hue is undefined
			this.s = 0;
			this.h = -1;
			return;
		}

		// grayscale image if min and max are the same
		if(Mathf.Approximately(min, max))
		{
			this.v = max;
			this.s = 0;
			this.h = -1;
			return;
		}

		// hue depends which color is max (this creates a rainbow effect)
		if( color.r == max )
			this.h = ( color.g - color.b ) / delta;         // between yellow & magenta
		else if( color.g == max )
			this.h = 2 + ( color.b - color.r ) / delta; // between cyan & yellow
		else
			this.h = 4 + ( color.r - color.g ) / delta; // between magenta & cyan

		// turn hue into 0-360 degrees
		this.h *= 60;
		if(this.h < 0 )
			this.h += 360;
	}

	/**
	* Return an RGBA color object
	*/
	public Color ToColor () {
		// no saturation, we can return the value across the board (grayscale)
		if(this.s == 0 )
			return new Color(this.v, this.v, this.v, this.a);

		// which chunk of the rainbow are we in?
		float sector = this.h / 60;

		// split across the decimal (ie 3.87f into 3 and 0.87f)
		int i = (int) Mathf.Floor(sector);
		float f = sector - i;

		float v = this.v;
		float p = v * ( 1 - s );
		float q = v * ( 1 - s * f );
		float t = v * ( 1 - s * ( 1 - f ) );

		// build our rgb color
		Color color = new Color(0, 0, 0, this.a);

		switch(i)
		{
			case 0:
				color.r = v;
				color.g = t;
				color.b = p;
				break;
			case 1:
				color.r = q;
				color.g = v;
				color.b = p;
				break;
			case 2:
				color.r  = p;
				color.g  = v;
				color.b  = t;
				break;
			case 3:
				color.r  = p;
				color.g  = q;
				color.b  = v;
				break;
			case 4:
				color.r  = t;
				color.g  = p;
				color.b  = v;
				break;
			default:
				color.r  = v;
				color.g  = p;
				color.b  = q;
				break;
		}

		return color;
	}

	/**
	* Format nicely
	*/
	public string ToString (){
		return string.Format("h: {0:0.00f}, s: {1:0.00f}, v: {2:0.00f}, a: {3:0.00f}", h, s, v, a);
	}
}