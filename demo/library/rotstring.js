//#################################################
//# Rot-Encode and Decode of Strings
//#   Decode with -pCharShift
//#################################################
function rot(pString,pCharShift) {
	var s = [];
	var vMinCode = 33;
	var vMaxCode = 126;
	var vMod = vMaxCode-vMaxCode+1; 
	var i = 0;
	var j = 0;
	while (i != pString.length) {
		j = pString.charCodeAt(i);
		if ((j >= vMinCode) && (j <= vMaxCode)) {
			s[i] = String.fromCharCode(vMinCode + ((j + pCharShift) % vMod));
		} else {
			s[i] = String.fromCharCode(j);
		};
		i++;
	};
	return s.join('');
}