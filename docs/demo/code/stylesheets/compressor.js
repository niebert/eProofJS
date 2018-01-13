var vControlButtons = false;

var vPartNr = 0;
var vFileNr = 0;
var vLimitGlobal = 63000; // < 2^16=65536

//---------------------------------------------
function allTabs2Blank(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	replaceAllTabsBy(pDOM,"  ");
};
//---------------------------------------------
function appendPartTail(pDOM,pBaseName,pPartNr,pPartHeader,pTailTpl)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	if (!pTailTpl) {
		pTailTpl = "parttail";
	};
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	var vNode = document.getElementById(pDOM);
	var vTpl = document.getElementById(pTailTpl).value;
	if (questiontext.checked) {
		vTpl = vTpl.replace("END:","END QUESTION-TEXT:");
	} else {
		vTpl = vTpl.replace("END:","END COMMON-CONTROL:");
	};

	vTpl = replaceTpl(vTpl,pBaseName,pPartNr);
	if (vNode) {
		vNode.value += "\n"+ vTpl +"\n";
	} else {
		alert("appendPartTail() - Form Element '"+pDOM+"' is undefined");
	}
};
//---------------------------------------------
function clearAllParts() {
//---------------------------------------------
	var vParts = document.getElementsByClassName("divPart");
	//alert("Hide all Parts length="+vParts.length);
	for (var i=0;i<vParts.length;i++) {
		//alert("ID="+vParts[i].id)
		vParts[i].value="";
		vParts[i].innerHTML="";
		hidePart(i);
	};
    if (pDOM = "output") {
		updateCompressionInOut();
	};
	vFileNr = 0;
	vPartNr = 0;
};
//---------------------------------------------
function compressJS(pDOM,pBaseName,pPartNr) {
//---------------------------------------------
	if (!pDOM) {
		pDOM = "output";
	};
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	var vCheckBox = document.getElementById("CheckInsertTagJS");
	var vInput = document.getElementById("input");
	var vOutput = document.getElementById(pDOM);
	vCheckBox.checked = false;
	headertail.checked = true;
	newline.checked = true;
	if (vInput.value) {
          var vValue = packer.pack(vInput.value, base62.checked, shrink.checked);
          //alert(vValue.substr(1,45));
          vInput.value = vValue;
          //vInput.value = vValue;
    }
	if (newline.checked) {
		//alert("NewLine checked YES");
		insertNewLine(pDOM);
	} else {
		//alert("NewLine checked NO");
	};
	if (qiddirect.checked) {
		//alert("NewLine checked YES");
		replaceQID(pDOM);
	} else {
		//alert("NewLine checked NO");
	};
	if (vCheckBox) {
		if (vCheckBox.checked) {
			//alert("Checkbox 'InsertJS' not checked");
			insertTagJS(pDOM,pBaseName,pPartNr);
		} else {
			//alert("Checkbox 'InsertJS' not checked");
		}
	} else {
		alert("Checkbox 'CheckInsertTagJS' undefined");
	};
    message.update(); 
};
//---------------------------------------------
function convertAllSteps(pDOM,pPartNr) {
//---------------------------------------------
	pPartNr = pPartNr || vPartNr;
	pDOM = pDOM || "output";
	pBaseName = pBaseName || "eProofJS";
	var vCheckBox = document.getElementById("CheckInsertTagJS");
	var vInput = document.getElementById('input');
	var vOutput = document.getElementById('output');
	vInput.value=vOutput.value;
	if (vCheckBox) {
		if (vCheckBox.checked) {
			insertTagJS(pDOM,pBaseName,pPartNr);
		} else {
			//alert("Checkbox 'CheckInsertTagJS' not checked");
		}
	} else {
		alert("Checkbox 'CheckInsertTagJS' undefined");
	}
	removeJSComment(pDOM,pBaseName,pPartNr);
	removeEmptyLines(pDOM,pBaseName,pPartNr);
	removeAllTabs(pDOM);
	insertFileInit(pDOM,pBaseName,pPartNr);
	convertText2Javascript(pDOM,pBaseName,pPartNr);
	replaceMetaQID(pDOM);
	insertVariableDef(pDOM,pBaseName,pPartNr);
	insertIMathComment(pDOM,pBaseName,pPartNr);
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function convertIFrameJS(pIFrame) {
//---------------------------------------------
	var vInput = document.getElementById("input");
	loadIFrameJS(pIFrame);
	replaceAllTabsBy("input","  ");
	var vString = vInput.value;
	vString = vString.replace(/__TEXT__AREA__/g,"TEXTAREA");
	vInput.value = vString;
};
//---------------------------------------------
function convertAllFrames(pFirst,pLast) {
//---------------------------------------------
	var vCode = "";
	var vInput = document.getElementById("input");
	for (var i=pFirst;i<=pLast;i++) {
		convertIFrameJS("iJS"+i);
		vCode += vInput.value;
	};
	vInput.value = vCode;
};
//---------------------------------------------
function loadAll() {
//---------------------------------------------
	loadAllIMathFrames();
	var i=0;
	var vContinue;
	var vDone = false;
	while ((i<10) && (!vDone)) {
		vDone = processSplitAndRemove();
		i++;
	};
};
//---------------------------------------------
function loadAllIMathFrames() {
//---------------------------------------------
	var vFirst=4;
	var vLast=7;
	var vCode = "";
	var vInput = document.getElementById("input");
	for (var i=vFirst;i<=vLast;i++) {
		convertIFrameJS("iJS"+i);
		//alert("i="+i);
		document.getElementById("commoncontrol"+(i-vFirst)).value = vInput.value;
		show("divCommonControl"+(i-vFirst));
	};
	convertIFrameJS("iJSmain");
	document.getElementById("imathmain").value = vInput.value;
	vInput.value = "";
};

//---------------------------------------------
function convertSQID(pString)
//---------------------------------------------
{
	vNewQID = iQID.value;
	vNewSID = iSID.value;
	//alert("vNewQID="+vNewQID);
	pString = replaceString(pString,"__QID__",vNewQID);
    pString = replaceString(pString,"__SID__",vNewSID);
    return pString;
};   
//---------------------------------------------
function convertMetaSQID(pString)
//---------------------------------------------
{
	vNewQID = iQID.value;
	vNewSID = iSID.value;
	//alert("vNewQID="+vNewQID);
	pString = replaceString(pString,"__QID__","\"+"+vNewQID+"+\"");
    pString = replaceString(pString,"__SID__","\"+"+vNewSID+"+\"");
    return pString;
};   
//---------------------------------------------
function convertText2Javascript(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	//alert("convertText2Javascript()");
	var vNode = document.getElementById(pDOM);
	var vString = vNode.value;
	vNode.value = convertToMeta(vString);
	insertStringConcat(pDOM);
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function convertToMeta(pString)
//---------------------------------------------
{
	pString = replaceString(pString,"\\n","\\\\n");
	pString = replaceString(pString,"\\\"","__QN__");
	pString = replaceString(pString,'"',"\\\"");
	pString = replaceString(pString,"__QN__","\\\\\\\"");
	return pString
};
//---------------------------------------------
function hide(pDOM) {
//---------------------------------------------
	var vNode = document.getElementById(pDOM);
	hideNode(vNode);
};
//---------------------------------------------
function hideNode(pNode) {
//---------------------------------------------
	if (pNode) {
		pNode.style.display = "none";
		pNode.style.visibility = "hidden";
	} else {
		alert("hideNode() pNode is undefined");
	};
};
//---------------------------------------------
function hideAllParts() {
//---------------------------------------------
	var vParts = document.getElementsByClassName("divPart");
	//alert("Hide all Parts length="+vParts.length);
	for (var i=0;i<vParts.length;i++) {
		//vParts[i].value="";
		//hideNode(vParts[i]);
		hide("divQuestionText"+i);
	};
	vParts = document.getElementsByClassName("divCommon");
	//alert("Hide all Parts length="+vParts.length);
	for (var i=0;i<vParts.length;i++) {
		//vParts[i].value="";
		//hideNode(vParts[i]);
		hide("divCommonControl"+i);
	};
};
//---------------------------------------------
function hidePart(pi) {
//---------------------------------------------
	hide("divPart"+pi)
	//hide("plabel"+pi);
};
//---------------------------------------------
function insertStringConcat(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	var vSplitArray = vString.split("\n");
	var vPre1 = document.getElementById("firstpretext").value;
	var vPre  = document.getElementById("pretext").value;
	var vPost = document.getElementById("posttext").value;
	vString = vPre1 + vSplitArray.join(vPost + "\n" + vPre) +vPost;
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertFileInit(pDOM,pBaseName,pPartNr)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	var vNode = document.getElementById(pDOM);
	var vTpl = document.getElementById("codepre").value;
	vTpl = replaceTpl(vTpl,pBaseName,pPartNr);
	vTpl = convertSQID(vTpl);
	if (vNode) {
		vNode.value = "\n"+ vTpl +"\n"+ vNode.value;
	} else {
		alert("insertFileInit() - Form Element '"+pDOM+"' is undefined");
	};
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertTailJS(pDOM,pBaseName,pPartNr)
//---------------------------------------------
{
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	if (!pDOM) {
		pDOM = "output";
	};
	//alert("pBaseName="+pBaseName);
	insertPartTail(pDOM,pBaseName,pPartNr);
	insertVariableDef(pDOM,pBaseName,pPartNr);
};
//---------------------------------------------
function insertPartHeader(pDOM,pBaseName,pPartNr,pPartHeader)
//---------------------------------------------
{
	pBaseName = pBaseName || "eProofJS";
	if (!pDOM) {
		pDOM = "output";
	};
	pPartNr = pPartNr || vPartNr;
	var vString = document.getElementById(pDOM).value;
	var vTpl = document.getElementById("iMathPrefix").value;
	if (questiontext.checked) {
		vTpl = vTpl.replace("E-PROOF-BACKGROUND-CODE","E-PROOF-QUESTION-TEXT");
	} else {
		vTpl = vTpl.replace("E-PROOF-BACKGROUND-CODE","E-PROOF-COMMON-CONTROL");
	};
	var vHeader = replaceTpl(vTpl,pBaseName,pPartNr,pPartHeader);
	vHeader = convertSQID(vHeader);
	vString =  vHeader + vString;
    document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertPartTail(pDOM,pBaseName,pPartNr)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	var vNode = document.getElementById(pDOM);
	var vTpl = document.getElementById("codepost").value;
	vTpl = replaceTpl(vTpl,pBaseName,pPartNr);
	vTpl = convertSQID(vTpl);
	if (vNode) {
		vNode.value += "\n"+ vTpl +"\n";
	} else {
		alert("insertPartTail() - Form Element '"+pDOM+"' is undefined");
	};
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertVariableDef(pDOM,pBaseName,pPartNr)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	var vNode = document.getElementById(pDOM);
	var vTpl = document.getElementById("variabledef").value;
	vTpl = replaceTpl(vTpl,pBaseName,pPartNr);
	vTpl = convertSQID(vTpl);
	if (vNode) {
		vNode.value += "\n"+ vTpl +"\n";
	} else {
		alert("insertVariableDef() - Form Element '"+pDOM+"' is undefined");
	};
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertNewLine(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	vString = vString.replace(/;/g,";\n");
	vString = vString.replace(/}function /g,"}\nfunction ");
	vString = vString.replace(/}function /g,"}\nfunction ");
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertTagJS(pDOM,pBaseName,pPartNr)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	vString = document.getElementById("iMathPre").value + vString + document.getElementById("iMathPost").value;
	vString = vString.replace(/XXXscript/g,"script");
    document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	};
};
//---------------------------------------------
function insertIMathComment(pPartNr,pDOM,pBaseName)
//---------------------------------------------
{
	insertPartHeader(pDOM,pBaseName,pPartNr);
};
//---------------------------------------------
function loadAllFrames(pFirst,pLast) {
//---------------------------------------------
	var vCode = "";
	var vInput = document.getElementById("input");
	for (var i=pFirst;i<=pLast;i++) {
		loadIFrameJS("iJS"+i);
		vCode += vInput.value;
	};
	vInput.value = vCode;
};
//---------------------------------------------
function loadIFrameJS(pIFrame) {
//---------------------------------------------
	var frameRef = document.getElementById(pIFrame);
	if (frameRef) {
		var win = frameRef.contentWindow || frameRef.contentDocument;
		if (win) {
			var doc = win.document;
			if (doc) {
				var iFrameInput = doc.getElementById("input");
				if (iFrameInput) {
					document.getElementById("input").value = iFrameInput.value;			
				} else {
					alert("iFrameInput for doc='"+pIFrame+"' does not exist!");
				};
			} else {
				alert("iFrame.document doc for '"+pIFrame+"' does not exist!");
			};
		} else { 
			alert("iFrame.window 'win'  for '"+pIFrame+"' does not exist!");
		};
	} else {
		alert("iFrame "+pIFrame+" does not exist!");
	};
	//eval("vString="+pIFrame+".document.href");
	//for (var iID in iframe)  vString += iID+" ";
    //vString = iframe.document.getElementById("input").value;
};
//---------------------------------------------
function removeAllTabs(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	replaceAllTabsBy(pDOM,"");
};
//---------------------------------------------
function replaceAllTabsBy(pDOM,pReplace)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	vString = vString.replace(/\t/g,pReplace);
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function removeJSComment(pDOM,pBaseName,pPartNr)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	//alert("vString.indexOf('//')="+vString.indexOf("//"));
	if (vString.indexOf("//") == 0) {
		vString = vString.replace(/[^\n]+\n/,"");
	};
	vString = vString.replace(/\/\/[^\n]+\n/g,"\n");
	vString = vString.replace(/\n\s+\/\/[^\n]+/g,"\n");
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function removeEmptyLines(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	vString = vString.replace(/^\n/,"");
	vString = vString.replace(/\n+/g,"\n");
	vString = vString.replace(/\n\s+\n/g,"\n");
	vString = vString.replace(/^\n/,"");
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function removeNewLine(pDOM)
//---------------------------------------------
{
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	//alert(vString.substr(1,30));
	vString = vString.replace(/\n+/g," ");
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function replaceMode(pCompress,pNameFile,pPartNr) {
//---------------------------------------------
	//alert("pCompress="+pCompress);
	if (pCompress == "replaceAllSteps") {
		replaceAllSteps("input",pNameFile,pPartNr);
	} else if (pCompress == "compressJS") {
		compressJS("input",pNameFile,pPartNr);
	} else {
		alert("Compress Type '"+pCompress+"' is undefined!");
	};
};
//---------------------------------------------
function replaceTpl(pTpl,pBaseName,pPartNr,pPartHeader)
//---------------------------------------------
{
	if (!pPartHeader) pPartHeader = pBaseName;
	pPartNr++;
	pTpl = replaceString(pTpl,"__NR__",pPartNr+"");
	pTpl = replaceString(pTpl,"__FILENAME__",pBaseName.toLowerCase() + ".js");
	pTpl = replaceString(pTpl,"__BASENAME__",pBaseName);
	pTpl = replaceString(pTpl,"__PARTHEADER__",pPartHeader);
	pTpl = replaceString(pTpl,"__DATE__",(new Date()).toLocaleString());
	return pTpl;
};
//---------------------------------------------
function replaceStringReverse(pString,pReplace,pSearch)
//---------------------------------------------
{
	return replaceString(pString,pSearch,pReplace);
};
//---------------------------------------------
function replaceString(pString,pSearch,pReplace)
//---------------------------------------------
{
	//alert("cstring.js - replaceString() "+pString);
	if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (vN >= 0)
		{
			if (vN > 0)
				vReturnString += pString.substring(0, vN);
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
};
//---------------------------------------------
function replaceMetaQID(pDOM) {
//---------------------------------------------
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	vString = convertMetaSQID(vString);
	document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	}
};
//---------------------------------------------
function replaceQID(pDOM) {
//---------------------------------------------
	if (!pDOM) {
		pDOM = "output";
	};
	var vString = document.getElementById(pDOM).value;
	vString = convertSQID(vString);
    document.getElementById(pDOM).value = vString;
    if (pDOM = "output") {
		updateCompressionInOut();
	}
}
//compressJS("input",vNameArr[vFileNr],vPartNr);

//---------------------------------------------
function replaceAllSteps(pDOM,pBaseName,pPartNr) {
//---------------------------------------------
	if (!pDOM) {
		pDOM = "output";
	};
	pBaseName = pBaseName || "eProofJS";
	pPartNr = pPartNr || vPartNr;
	var vCheckBox = document.getElementById("CheckInsertTagJS");
	if (vCheckBox) {
		if (vCheckBox.checked) {
			insertTagJS(pDOM,pBaseName,pPartNr);
		} else {
			//alert("Checkbox 'CheckInsertTagJS' not checked");
		}
	} else {
		alert("Checkbox 'CheckInsertTagJS' undefined");
	}
	removeJSComment(pDOM,pBaseName,pPartNr);
	removeEmptyLines(pDOM,pBaseName,pPartNr);
	removeAllTabs(pDOM);
	convertText2Javascript(pDOM,pBaseName,pPartNr);
	insertFileInit(pDOM,pBaseName,pPartNr);
	replaceMetaQID(pDOM);
	insertVariableDef(pDOM,pBaseName,pPartNr);
	//insertIMathComment(pDOM,pBaseName,pPartNr);
};
//---------------------------------------------
function splitStepsSizeFixed() {
//---------------------------------------------
	var vString = document.getElementById("output").value;
	var vArr = vString.split("\n");
	var vPart = "";
	var vPartNr = 0;
	var vPartSize = 0;
	var vLimit = vLimitGlobal; //2^16=65536
 	//alert("vArr.length="+vArr.length);
	var i = 0;
	while (i != vArr.length) {
		vPart +=vArr[i]+"\n";
		vPartSize += vArr[i].length;
		if (vPartSize >=  vLimit) {
			document.getElementById("part"+vPartNr).value = vPart;
			vPart = "";
			vPartSize = 0;
			vPartNr++;
		};
		i++;
	}
};
//---------------------------------------------
function splitAndRemove_Part() {
	var vDone = processSplitAndRemove();
	if (vDone) {
		alert("Split and Remove finished");
	};
}
//---------------------------------------------
function processSplitAndRemove() {
//---------------------------------------------
	var vFileMax = 3;
	var vDone = false;
	var pCompress = "replaceAllSteps";
	if (questiontext.checked) {
		pCompress = "compressJS";
	} else {
		pCompress = "replaceAllSteps";
	};
	var vContinue = "1";
	if (vFileNr>vFileMax) {
		vDone = true; 
	} else {
		var vNameArr = ["vLanguage","eProofMain","eProofMeth1","eProofMeth2"];
		var vLimitMax = vLimitGlobal;  //62500 < 2^16=65536
		var vLimit = vLimitMax;
		var vInput = document.getElementById("input");
		var vOutput = document.getElementById("output");
		var vPartForm = document.getElementById("part"+vPartNr);
		var vString = vInput.value;
		var vBoolEnd = false;
		if (vString.length == 0) {
			//---init Frame with File----
			if (vFileNr == 0) {
				//alert("Load INIT iJS"+vFileNr);
				loadIFrameJS("iJS"+vFileNr);
			} else {
				vFileNr++;
				//alert("Load APPEND iJS"+vFileNr)
				loadIFrameJS("iJS"+vFileNr);
			};
			replaceMode(pCompress,"input",vNameArr[vFileNr],vPartNr);
			vString = vInput.value;
		};
		//------ remaining String is too short------
		if (vString.length < vLimit) {
			if (vString.length >0) {
				//------ remaining String exisit and is too short------
				//alert("Length="+vString.length+" below Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr])
				if (headertail.checked) {
					insertTailJS("input",vNameArr[vFileNr],vPartNr);
				}
			} else {
				//alert("Length="+vString.length+" is empty with Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr])
			};
			if (vFileNr == vFileMax) {
				if (vString.length < vLimit) {
					//alert("Length="+vString.length+" is below Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr]+" vPartNr="+vPartNr)	
					vBoolEnd = true;
					vLimit = vString.length;
				} else { //	if (vString.length >= vLimitMax) {
					// Remaining String is exceeding vLimitMax - extract max Part Size
					//alert("Length="+vString.length+" is above Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr]+" vPartNr="+vPartNr)
					vLimit = vLimitMax;
				}
			} else {
				//alert("Length="+vString.length+" vFileNr="+vFileNr+" != 3");
				//---load a new Part, if String too short--------
				vFileNr++;
				//alert("Load new FrameiJS"+vFileNr);
				loadIFrameJS("iJS"+vFileNr);
				//alert("File iJS"+vFileNr+" loaded");
				//alert("After replaceAllSteps(vInput.value="+(vInput.value).length+") File iJS"+vFileNr+" loaded");
				replaceMode(pCompress,"input",vNameArr[vFileNr],vPartNr);
				vString = vString + vInput.value;
				//alert("After REPLACE: Length="+vString.length+" with Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr]+" vPartNr="+vPartNr)	
				vInput.value = vString;
				if (vString.length < vLimit) {
					//alert("After LOAD: Length="+vString.length+" is below Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr]+" vPartNr="+vPartNr)	
					vLimit = vString.length;
				} else { //	if (vString.length >= vLimitMax) {
					// Remaining String is exceeding vLimitMax - extract max Part Size
					//alert("After LOAD: Length="+vString.length+" is above Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr]+" vPartNr="+vPartNr)
					vLimit = vLimitMax;
				}
			}
		} else {
			//alert("Length="+vString.length+" is above Limit="+vLimitMax+" in FileNr="+vFileNr+" "+vNameArr[vFileNr]+" vPartNr="+vPartNr);
		}
		vPart = vString.substr(0,vLimit);
		var vRest = vString.substr(vLimit,vString.length);
		if (vLimitMax == vLimit) {
			var vFound = vPart.lastIndexOf("\n");
			if (vFound > 0) {
				vLimit = vFound+1;
				vPart = vString.substr(0,vLimit);
				vRest = vString.substr(vLimit,vString.length);
			};
		};
		vInput.value  = vRest;
		vOutput.value = vPart;
		if (vPartNr == 0) {
			pPartHeader = vNameArr[0]+","+vNameArr[vFileNr];
		} else {
			pPartHeader = vNameArr[vFileNr];
		}
		if (headertail.checked) {
			insertPartHeader("output",vNameArr[vFileNr],vPartNr,pPartHeader);
			if (pCompress != "compressJS") {
				appendPartTail("output",vNameArr[vFileNr],vPartNr,pPartHeader);
			} else {
				appendPartTail("output",vNameArr[vFileNr],vPartNr,pPartHeader,"variabledef");
			}
		};
		removeEmptyLines("output");
		vPartForm.value = vOutput.value;
		showPart(vPartNr);
		vPartNr++;
		if (vBoolEnd) {
			vFileNr++;
		};
	};
	return vDone;
};
//---------------------------------------------
function splitSteps() {
//---------------------------------------------
	//hideAllParts();
	showAllParts();
	var vString = document.getElementById("output").value;
	//var vArr = vString.split("\n");
	var vPart = "";
	var vPartNr = 0;
	var vLimit = vLimitGlobal; //60000 < 2^16=65536;
	alert("vString.length="+vString.length);
	var i = 0;
	while (i*vLimit < vString.length) {
		vPart =vString.substr(i*vLimit,vLimit);
		vLine = document.getElementById("part"+vPartNr);
		//vPartSize += vArr[i].length;
		if (vPartNr > 0) {
			var vFound = vPart.indexOf("\n");
			var vPrePart = vPart.substring(0,vFound+1);
			vPart = vPart.substring(vFound+1,vPart.length);
			var vPartDOM = document.getElementById("part"+(vPartNr-1));
			vPartDOM.value += vPrePart;
			//showNode(vPartDOM);
			showPart(vPartNr);
		};
		vPartNr++;
		vLine.value = vPart;
		i++;
	}
};
//---------------------------------------------
function splitParts() {
//---------------------------------------------
	//hideAllParts();
	showAllParts();
	var vString = document.getElementById("output").value;
	//var vArr = vString.split("\n");
	var vPart = "";
	var vPartNr = 0;
	var vLimit = vLimitGlobal; //62500 < 2^16=65536;
	alert("vString.length="+vString.length);
	var i = 0;
	while (i*vLimit < vString.length) {
		vPart =vString.substr(i*vLimit,vLimit);
		vPartDOM = document.getElementById("part"+vPartNr);
		//vPartSize += vArr[i].length;
		if (vPartNr > 0) {
			var vFound = vPart.indexOf("function ");
			var vPrePart = vPart.substring(0,vFound);
			vPart = vPart.substring(vFound,vPart.length);
			var vPrePartDOM = document.getElementById("part"+(vPartNr-1));
			vPrePartDOM.value += vPrePart;
		};
		vPartDOM.value = vPart;
		showNode(vPartDOM);
		vPartNr++;
		i++;
	}
};
//---------------------------------------------
function show(pDOM,pDisplay) {
//---------------------------------------------
	var vNode = document.getElementById(pDOM);
	showNode(vNode,pDisplay);
};
//---------------------------------------------
function showAllParts() {
//---------------------------------------------
	var vParts = document.getElementsByClassName("divPart");
	//alert("Hide all Parts length="+vParts.length);
	for (var i=0;i<vParts.length;i++) {
		vParts[i].value="";
		//showNode(vParts[i]);
		show("divQuestionText"+i);
	}
};

//---------------------------------------------
function showNode(pNode,pDisplay) {
//---------------------------------------------
	var vDisplay = pDisplay || "inline";
	if (pNode) {
		pNode.style.display = vDisplay;
		//pNode.style.display = "inline"; // "block"
		pNode.style.visibility = "visible";
	};
}
//----End of Method showNode() Definition
//---------------------------------------------
function showPart(pi) {
//---------------------------------------------
	show("divQuestionText"+pi);
};
//---------------------------------------------
function toggleNode(pNode,pDisplay) {
//---------------------------------------------
	var vDisplay = pDisplay || "inline";
	if (pNode) {
		if (pNode.style.display=="none") {
			//alert("SHOW "+pNode.id);
			pNode.style.visibility = "visible";
			pNode.style.display = vDisplay;
		} else {
			//alert("HIDE "+pNode.id);
			pNode.style.visibility = "hidden";
			pNode.style.display = "none";
		}
	} else {
		alert("ERROR: toggleNode()-Call - pNode does not exist");
	}
}
function updateCompressionInOut() {
	var vInput  = document.getElementById("input");
	var vOutput = document.getElementById("output");
	updateCompression(vInput.value,vOutput.value)
}


function updateCompression(pInput,pOutput) {
      var length = pInput.length;
      if (!/\r/.test(pInput)) { // mozilla trims carriage returns
        length += match(pInput, /\n/g).length;
      }
      var calc = pOutput.length + "/" + length;
      var ratio = (pOutput.length / length).toFixed(3);
      var vOutNode = document.getElementById("message");
      vOutNode.innerHTML = " compression ratio: " + calc + "="+ ratio;
};
//---------------------------------------------
function wrapperHTML(pString)
//---------------------------------------------
{
	var vDate = new Date().toLocaleString();
	pString = pString.replace(/__DATE__/g,vDate);
	pString = pString.replace(/textarea/g,"__TEXT__AREA__");
	var vHTML = "<html>";
	vHTML += "<body>"
	vHTML += "<form>"
	vHTML += "<center>"
	vHTML += "<textarea id='input'  rows='10' cols='100'>"
	vHTML += pString;
	vHTML += "\n</textarea>"
	vHTML += "</center>"
	vHTML += "</form>"
	vHTML += "</body>"
	vHTML += "</html>\n"
	return vHTML 
};
//---------------------------------------------
function wrapOut1String(pString)
//---------------------------------------------
{
	var vPre1 = document.getElementById("firstpretext").value;
	var vPost = document.getElementById("posttext").value;
	vPost = replaceString(vPost,'\n',"");
	return vPre1 + convertToMeta(pString) +vPost;
};
//---------------------------------------------
function wrapOutString(pString)
//---------------------------------------------
{
	var vPre  = document.getElementById("pretext").value;
	var vPost = document.getElementById("posttext").value;
	vPost = replaceString(vPost,'\n',"");
	return vPre + convertToMeta(pString) +vPost;
};
//---------------------------------------------
function wrapHTML()
//---------------------------------------------
{
	var vString = document.getElementById("input").value;
	vString = wrapperHTML(vString);
	document.getElementById("output").value = vString;
}
