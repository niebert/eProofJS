//#################################################################
//# Javascript Class: EProof__SID__()
//#       SuperClass: 
//#   Class Filename: eproofmain.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               24.2.2015             
//# last modifications    __DATE__             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//TODO:
// - exportID, exportHash, exportList sind noch nicht funktionstuechtig
// - Title aus XML-File wird nicht geladen
// - Title wird aus XML nicht korrekt gelesen.
//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="myclass.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class EProof__SID__() 
// Call the constructor for creating an instance of class EProof__SID__
// by the following command in HTML-file that imports this class
// var vMyInstance = new EProof__SID__();
//---------------------------------------------------------------------

//window.EProof__SID__ = function () {
function EProof__SID__ () {

	// no superclass defined

	//---Attributes-------------------------
	this.aMode = "DEFAULT"; //"DEAULT", "AUTHORING", "DEBUG" parameter of Load
	this.aShowControl = "0"; 
	this.aDebug = "0";
	//---------------
	this.aUseMathJax = "1";
	this.aQID = "__QID__";
	this.aThisQ = "__THISQ__";
	this.aRootID = "EPROOF" + this.aQID;
	this.aRootDOM = document.getElementById(this.aRootID);
	//alert(this.aRootDOM.className);
	this.aDisplay = "Short";
	this.aLocalEProof = "";
	this.aOffline = "1";
	this.aIndentUL = "3.0em";
	this.aStudentAnswerList = null; // Duplicate Attribute this.aAllSteps
	this.aCount = 0;
	this.aCountHash = new Array();
	this.aAllSteps   = null; 
	this.aUsedID      = "USEDSTEPS"; //append QID in load() and 
	this.aUsedDOM     = null; //set DOM in this.preProcess()
	this.aUsedSteps   = null; 
	this.aUnusedID    = "UNUSEDSTEPS"; // append QID load() and
	this.aUnusedDOM   = null; //set DOM in this.preProcess()
	this.aUnusedSteps = null; 
	this.aTemplateID  = "tplSTUDENTANSWER"; // append QID when loaded
	this.aTemplateDOM = null; //set in this.preProcess() 
	this.onLoadAMprocess = false;
	this.aListHeader      = new Array(); //Hash for PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION
	this.aAllID           = new Array(); //Array with all IDs ("P1","S1",...,"C1")
	this.aAllID2Node      = new Array(); //Hash for Proof Step ID to Node with InnerHTML
	this.aAllID2NodeID    = new Array(); //Hash for Proof Step ID
	this.aAllID2RAW       = new Array(); //Hash for Proof Step ID
	this.aCharCounter     = new Array(); //Hash for Leader Chars e.g. "P" CharCounter=4 creates "P4"
	this.aErrorStep       = new Array(); //Array4Steps
	this.aScoreStep       = new Array(); //Array4Steps
	this.aScoreTotal      = 0.0;
	this.aUsedCount       = 0;
	this.aErrorDefault    = 0.1;
	this.aErrorAssessment = 0.3; //this.aSettings["Assessment_Minus_Percent"]
	this.aErrorSuggestion = 0.2; //this.aSettings["Suggestion_Minus_Percent"]
	this.aErrorConMult    = 3;
	this.aID2SA	  	      = new Array(); //Hash maps ID to StudentAnswer 
	this.aID2Solutions    = new Array(); //Hash for Proof Step ID
	this.aID4StepType     = new Array(); //Hash maps Type to ID-Array Types are PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION with ID-Arrays
	this.aStepType4ID     = new Array(); //Hash maps ID to StepType PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION 
	//---Start: Array/Hash for createStep4SA()----------------------------
	//---Following Arrays/Hash are created by method createStep2SA()------
	this.aStep2SA	  	  = new Array(); // Hash with Step Number to StudentAnswer 
	this.aIndex2Step  	  = new Array();
	this.aStep2Index  	  = new Array();
	this.aIndex2ID        = new Array();
	this.aID2Index        = new Array();
	//---End: Array/Hash for createStep4SA()------------------------------
	this.aSolUsedID  	  = new Array();
	this.aMappedID  	  = new Array();
	this.aOriginalID  	  = new Array();
	this.aSolution        = new Array(); //Array with all Solution Steps
	this.vLink_Screencast = "http://e-proof.weebly.com/german-tutorials.html";
	this.vLink_Tutorial   = "http://math.uni-landau.de/download/IMathAS/eProof_iMathAS_Tutorial.pdf";
	this.vLink_ASCIIMath  = "http://www.wjagray.co.uk/maths/ASCIIMathTutorial.html";
	this.vMaxQuestionPart = 6;
	this.vUpdateEdit = 0;
	this.aLLE = 1.0;
	this.CR = String.fromCharCode(10); //newline symbol /n
	this.GT = String.fromCharCode(62); //greater than symbol >
	this.LT = String.fromCharCode(60); //lower than symbol >
	this.AP = String.fromCharCode(96); //IMathAS Apostrophe
	this.QU = String.fromCharCode(34); //Quote
	this.DO = String.fromCharCode(36); //Dollar
	this.SC = String.fromCharCode(186); //Semi-Colon
	this.BR = this.LT+"BR/"+this.GT;
	this.vEditorID = "taSTEPEDITOR";
	this.aSeparator = "__#S#__";
	this.aSepInput = ","; //This is used to separate Input e.g. "P1,C1,J2"	
	this.aNewLine = "__#NL#__";	
	this.aComma = "__#CO#__";	
	this.aCrypt     = false; //will be set by CheckBox "checkENCRYPT"
	this.aExportSA  = false; //will be set by CheckBox "checkSTUDANSWERSOLUTION"
	this.aExportSol = true;  //will be set by CheckBox "checkSUSESOLUTION"
	this.aSAexport  = false; //will be set by CheckBox "checkSTUDANSWEREXPORT"
	this.vUpdateButton = this.LT+"input type='button' value=' Update ' onclick=\"vEProof"+this.aQID+".save_IMathAS(this.form)\""+this.GT;
	this.vSpace =  " &nbsp;&nbsp; ";
	this.aStudAnsFormat = new Array("PREVIOUS","CONNECTION","ID","JUST","OPTJUST","MANSCORE","SUGUSED","ASSUSED","SELCON","SELID","SELJUST","VALUE");
	this.aListID = new Array("OPTJUST","JUST","SELCON","SELID","SELJUST");
	this.aIMathID = new Array("PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP");
	this.aStudAns2DOM = new Array("PREVIOUSLINK","sCONNECTION","inSTEPID","inJUSTIFICATION","optJUSTIFICATION","inMYSTEPASSESSSCORE","inSUGGESTIONSUSED","inASSESSMENTUSED","selectCONNECTION","selectSTEPID","selectJUSTIFICATION","STEPNR");
	this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP","SOLUTION","ENCRYPTED","SETTINGS");
	this.aIMATH = new Array(); //init Hash of Form IDs by method preprocess() 
	this.vConnection2Index = new Array();
	//this.vConnectionArray = new Array("???","TYP"," ","="+this.GT,"=",this.LT+"=",this.LT,this.GT+"=",this.GT,"subseteq","DEF","TEXT","q.e.d.");
	this.vConnectionArray = new Array("???"," ","="+this.GT,"=",this.LT+"=",this.LT,this.GT+"=",this.GT,"subseteq","DEF","TEXT","TYP","q.e.d.");
	this.vConnectionName = new Array();
	this.vConnection2Node = null; //set in load_StudentAnswer
	//----XML-Parser-----
	this.aText = "";
	this.aTreeXML = null;
	//--------------------------------------------

	//---Methods----------------------------
	this.appendMethods 	   = appendMethods_EProof__SID__;
	this.addStepDefinition = addStepDefinition_EProof__SID__;
	this.append_template   = append_template_EProof__SID__;
	this.assessStep        = assessStep_EProof__SID__;
	this.assessStepDisplay = assessStepDisplay_EProof__SID__;
	this.checkPreviousLink = checkPreviousLink_EProof__SID__;
	this.clear_LocalStorage			 = clear_LocalStorage_EProof__SID__;
	this.correct_StudentAnswer       = correct_StudentAnswer_EProof__SID__;
	this.createAllID2Node            = createAllID2Node_EProof__SID__;
	this.createDisplayOptions	     = createDisplayOptions_EProof__SID__;
	this.createDisplayJustifications = createDisplayJustifications_EProof__SID__;
	this.createEditJustificationsStep = createEditJustificationsStep_EProof__SID__;
	this.createJustifications	     = createJustifications_EProof__SID__;
	this.createSelectConnection		 = createSelectConnection_EProof__SID__;
	this.createSelectConnection4JS	 = createSelectConnection4JS_EProof__SID__;
	this.createSelectPosition	     = createSelectPosition_EProof__SID__;
	this.createSelectStepID	         = createSelectStepID_EProof__SID__;
	this.createSol2IMathAS           = createSol2IMathAS_EProof__SID__;
	this.createSuggestionStep        = createSuggestionStep_EProof__SID__;
	this.deleteID 				  = deleteID_EProof__SID__;
	this.exportXML 				  = exportXML_EProof__SID__;
	this.getCheckedJustifications = getCheckedJustifications_EProof__SID__;
	this.getChildById             = getChildById_EProof__SID__;
	this.getChildByIdRecursive    = getChildByIdRecursive_EProof__SID__;
	this.getChildByClassName      = getChildByClassName_EProof__SID__;
	this.getChildrenByClassName   = getChildrenByClassName_EProof__SID__;
	this.getElementById           = getElementById_EProof__SID__;
	this.getElementsByClassName   = getElementsByClassName_EProof__SID__;
	this.getItemsIMathAS	 = getItemsIMathAS_EProof__SID__;
	this.getListIMathAS	     = getListIMathAS_EProof__SID__;
	this.getParentStudentAnswer      = getParentStudentAnswer_EProof__SID__;
	this.getStepDefHTML              = getStepDefHTML_EProof__SID__;
	this.getStudentAnswerByClassName = getStudentAnswerByClassName_EProof__SID__;
	this.getStudentAnswerById	     = getStudentAnswerById_EProof__SID__;
	this.hide             = hide_EProof__SID__;
	this.hideSA           = hideSA_EProof__SID__;
	this.hideElement      = hideElement_EProof__SID__;
	this.hideElementNode  = hideElementNode_EProof__SID__;
	this.hideNode         = hideNode_EProof__SID__;
	this.init             = init_EProof__SID__;
	this.initIMathQN      = initIMathQN_EProof__SID__;
	this.init_settings         = init_settings_EProof__SID__;
	this.init_undef_setting    = init_undef_setting_EProof__SID__;
	this.init_default_settings = init_default_settings_EProof__SID__;
	this.init_template    = init_template_EProof__SID__;
	this.init_template_ID = init_template_ID_EProof__SID__;
	this.initRootNodeById = initRootNodeById_EProof__SID__;
	this.load               = load_EProof__SID__;
	this.load_Settings      = load_Settings_EProof__SID__;
	this.load_Form_LocalStorage = load_Form_LocalStorage_EProof__SID__;
	this.load_IMathAS	        = load_IMathAS_EProof__SID__;
	this.load_StudentAnswer     = load_StudentAnswer_EProof__SID__;
	this.load_StudentAnswerLine = load_StudentAnswerLine_EProof__SID__;
	this.load_XML            = load_XML_EProof__SID__;
	this.moveStep       = moveStep_EProof__SID__;
	this.moveStepID     = moveStepID_EProof__SID__;
	this.moveStepOrder  = moveStepOrder_EProof__SID__;
	this.preAllSteps	= preAllSteps_EProof__SID__;
	this.postProcess	     = postProcess_EProof__SID__;
	this.preProcess4Lanugage = preProcess4Lanugage_EProof__SID__;
	this.postProcessSolution = postProcessSolution_EProof__SID__;
	this.preProcess	         = preProcess_EProof__SID__;
	this.preProcess4JS_only	 = preProcess4JS_only_EProof__SID__;
	this.preProcessCounter   = preProcessCounter_EProof__SID__;
	this.preProcessHeader    = preProcessHeader_EProof__SID__;
	this.removeAllChildren = removeAllChildren_EProof__SID__;
	this.replaceString     = replaceString_EProof__SID__;
	this.reloadProof       = reloadProof_EProof__SID__;
	this.save              = save_EProof__SID__;
	this.saveEProof2Form   = saveEProof2Form_EProof__SID__;
	this.saveOfflineHTML   = saveOfflineHTML_EProof__SID__;
	this.saveOnChange      = saveOnChange_EProof__SID__;
	this.saveXML           = saveXML_EProof__SID__;
	this.saveIMathAS	   = saveIMathAS_EProof__SID__;
	this.saveArr2IMathAS   = saveArr2IMathAS_EProof__SID__;
	this.saveSol2IMathAS   = saveSol2IMathAS_EProof__SID__;
	this.save_Form_LocalStorage = save_Form_LocalStorage_EProof__SID__;
	this.set_values        = set_values_EProof__SID__;
	this.setAttribute4List = setAttribute4List_EProof__SID__;
	this.setClassName4Step = setClassName4Step_EProof__SID__;
	this.setStep4List      = setStep4List_EProof__SID__;
	this.show              = show_EProof__SID__;
	this.showSA            = showSA_EProof__SID__;
	this.showDebug		   = showDebug_EProof__SID__;
	this.showHelpLanguage  = showHelpLanguage_EProof__SID__;
	this.showHideArray     = showHideArray_EProof__SID__;
	this.showHideBoolean   = showHideBoolean_EProof__SID__;
	this.showHideNodeBoolean = showHideNodeBoolean_EProof__SID__;
	this.showNode            = showNode_EProof__SID__;
	this.showAllJustifications = showAllJustifications_EProof__SID__;
	this.shuffleSteps          = shuffleSteps_EProof__SID__;
	this.toggle                = toggle_EProof__SID__;
	this.toggleSA              = toggleSA_EProof__SID__;
	this.toggleAssessmentButton = toggleAssessmentButton_EProof__SID__;
	this.toggleAuthoringMode   = toggleAuthoringMode_EProof__SID__;
	this.toggleButton          = toggleButton_EProof__SID__;
	this.toggleButtonMode      = toggleButtonMode_EProof__SID__;
	this.toggleManualAssessment  = toggleManualAssessment_EProof__SID__;
	this.toggleJustifications    = toggleJustifications_EProof__SID__;
	this.toggleSolutionButton    = toggleSolutionButton_EProof__SID__;
	this.toggleSuggestionButton  = toggleSuggestionButton_EProof__SID__;
	this.toggleSteps             = toggleSteps_EProof__SID__;
	this.toggleList              = toggleList_EProof__SID__;
	this.toggleNode              = toggleNode_EProof__SID__;
	this.toggleSuggestion        = toggleSuggestion_EProof__SID__;
	this.toggleSuggestionAppend  = toggleSuggestionAppend_EProof__SID__;
	this.toggleSuggestionStep    = toggleSuggestionStep_EProof__SID__;
	this.update		 		     = update_EProof__SID__;
	this.updateAllJustifications = updateAllJustifications_EProof__SID__;
	this.updateIMathById         = updateIMathById_EProof__SID__;
	this.updateInput		     = updateInput_EProof__SID__;
	this.updateJustifications    = updateJustifications_EProof__SID__;
	this.updateProof2IMath       = updateProof2IMath_EProof__SID__;
	this.updateSettingValue      = updateSettingValue_EProof__SID__;
	this.updateSettings2Form     = updateSettings2Form_EProof__SID__;
	this.updateStep			     = updateStep_EProof__SID__;
	this.updateTextarea          = updateTextarea_EProof__SID__;
	this.updateTitle             = updateTitle_EProof__SID__;
	this.visible		= visible_EProof__SID__;
	//--------------------------------------------
	//#################################################################
	//# Nested: processMathNode(pNode)
	//#################################################################
	this.processMathNode = function (pNode) {
		if (this.aUseMathJax == "1") {
			//MathJax.Hub.Queue(["Typeset",MathJax.Hub,pNode]);
			MathJax.Hub.Typeset(pNode);
		} else {
			AMprocessNode(pNode);
		}
	};
	//#################################################################
	//# Nested: addFalseSuggestions()
	//#################################################################
	this.addFalseSuggestions = function () {
		//var vSugArray = this.getElementsByClassName("SELECTFROM"+this.aQID);
		// setAllSuggestions() sets the correct proofsteps
		var vStep=0;
		while (vStep != (this.aCount+1)) {
			this.addFalseSuggestionStep(vStep);
			vStep++;
		};
	};
	//#################################################################
	//# Nested: addCorrectSuggestionStep(pStep)
	//#################################################################
	this.addCorrectSuggestionStep = function (pStep) {
		//var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
		var vSA = this.aStep2SA[pStep];
		var vSF = this.getElementById("SELECTFROM"+this.aQID+pStep);
		var vID = " ";
		var vConAppend = "";
		var vSelArr = [];
		if (pStep != 0) {
			vID = this.getChildById(vSA,"inSTEPID"+this.aQID+pStep).value;
		} else {
			vSelArr = [" ","TYP"];
			vSA = vSF;
			//vSA = this.getChildById(this.aRootDOM,"SELECTFROM"+this.aQID+"0");
			vConAppend = " ";
		};
		//----Solution Structure of SplitRec----------------------------------------
		// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
		if (this.aID2Solutions[vID]) {
			//---ID Select-------
			var aID = this.aID2Solutions[vID]["NEXT"];
			var vList = aID.join(",");
			this.writeParentValue(vSA,"selectSTEPID"+this.aQID+pStep,vList);
			//---CON Select-------
			aID = this.aID2Solutions[vID]["NEXT_REC"];
			var iSel=2;
			var i=0;
			var vCon = 0;
			//alert("vSugCon"+pStep+".length="+aID.length);
			while (i != aID.length) {
				vCon = this.aSolution[aID[i]][iSel];
				vSelArr.push(this.vConnectionArray[vCon]);
				i++;
			};
			vList = (this.uniquearray(vSelArr)).join(",");
			this.writeParentValue(vSA,"selectCONNECTION"+this.aQID+pStep,vList);
			//---JUST Select-------
			var vArr = [];
			if (vID != " ") {
				var aID = this.aID2Solutions[vID]["ASSESS"];
				var vSel = [];
				var iSel=5;
				var i=0;
				while (i != aID.length) {
					vSel = this.aSolution[aID[i]][iSel];
					if (vSel) {
						vArr = this.unionarrays(vArr,vSel);
					};
					i++;
				};
			};
			this.writeParentValue(vSA,"selectCONNECTION"+this.aQID+pStep,vList);
		};
				// this.aSolution.push(vSplitRec);
// 					var vPrevID = vSplitRec[0];
// 					var vID = vSplitRec[1];
// 					this.checkSolStep(vID);
// 					this.checkSolStep(vPrevID);
// 					this.aID2Solutions[vID]["ASSESS"].push(i);
// 					this.aID2Solutions[vID]["PREV"].push(vPrevID);
// 					this.aID2Solutions[vID]["PREV_REC"].push(i);
// 					this.aID2Solutions[vPrevID]["NEXT"].push(vID);
// 					this.aID2Solutions[vPrevID]["NEXT_REC"].push(i);

	};
	//#################################################################
	//# Nested: addFalseSuggestionStep(pStep)
	//#################################################################
	this.addFalseSuggestionStep = function (pStep) {
		var vArrDOM = new Array("selectCONNECTION","selectSTEPID","selectJUSTIFICATION");
		var vCountUn = new Array("connections","proofsteps","justifications");
		var vSelArray = new Array(this.vConnectionArray.slice(1),this.aAllID,this.aID4StepType["JUSTIFICATION"]);
		var k=0;
		var vArr,vNewArr,vList,vSelection,vNode,vName;
		var getSugCall = null;
		var SelectHash = new Array();
		var vOrgArray = new Array(); 
		SelectHash["ID"] = this.getElementById("inSTEPID"+this.aQID+pStep).value;
		while (k!=vArrDOM.length) {
			//alert("addFalseSuggestionStep("+pStep+") vArrDOM["+k+"]="+vArrDOM[k])
			vName = vArrDOM[k]+this.aQID+pStep;
			vNode = this.getChildById(this.aRootDOM,vName);
			//alert("addFalseSuggestionStep("+pStep+") vName="+vName+" vNode="+vNode.value);
			vOrgList = vNode.value;
			vOrgArray = new Array();
			if (vOrgList != "") vOrgArray = vOrgList.split(",");
			//alert("addFalseSuggestionStep("+pStep+") vOrgList=["+vOrgList+"]");
			SelectHash["COUNT"] = parseInt(this.aSettings["unnecessary_"+vCountUn[k]]);
			SelectHash["ARRAY"] = vOrgArray; 
			//alert("SelectHash['STEP"+pStep+"COUNT"+k+"']="+SelectHash["COUNT"]);
			SelectHash["SELARRAY"] = vSelArray[k];
			if (this.greater(SelectHash["COUNT"],vOrgArray.length)) {
				//i.e. Orginal False Suggestions are less than defined by unnecessary-Count
				//k=1 (ID Selection): select S2_F1, S2_F2 as false IDs for S2
				if (k==0) {
					SelectHash["ARRAY"].push("="+this.GT); 
					if (SelectHash["COUNT"] != 0) SelectHash["COUNT"]--;
				} if (k==1) { 
					this.addDefinedFalseIDs(SelectHash);
					//this.sortArrayID(SelectHash["ARRAY"]);
				};
				this.addRandomFalseSuggestions(SelectHash,pStep);
				var vSelList = SelectHash["ARRAY"].join(",");
				//if (vNode.value != "") 
				if (vSelList == "") {
					vNode.value = vOrgList;
				} else if (vOrgList == "") {
					vNode.value = vSelList;
				} else {
					vNode.value = vSelList+","+vOrgList;
				}
				vNode.value = (this.uniquearray((vNode.value).split(","))).join(",");
				//alert("OrgList ["+vOrgList+"] including False:["+SelectHash["ARRAY"].join(",")+"]");
				// Sort SelectHash???
			};
			k++;
		}
		// [C01]
		//Justifications are not properly selected
		//Con this.aSettings["unnecessary_connections"] = "4";
		//ID this.aSettings["unnecessary_proofsteps"] = "2";
		//Just this.aSettings["unnecessary_justifications"] = "3";
	};
	//#################################################################
	//# Nested: addDefinedFalseIDs(pSelectHash)
	//#################################################################
	this.addDefinedFalseIDs = function (pSelectHash) {
		var vArr = pSelectHash["SELARRAY"];
		var vID = pSelectHash["ID"];
		var k=0;
		while (k!=vArr.length) {
			//alert("vArr[k]=["+vArr[k]+"] check! pSelectHash['COUNT']="+pSelectHash["COUNT"]);
			if (this.greater(pSelectHash["COUNT"],0)) {
				if (vArr[k].indexOf(vID+"_F") == 0) {
					//alert("vArr[k]=["+vArr[k]+"] found!")
					pSelectHash["ARRAY"].push(vArr[k]);
					pSelectHash["COUNT"]--;
				};
			} else {
				//alert("Stop Search for ["+vID+"]");
				k = vArr.length - 1;
			};
			k++;
		};
		this.sortArrayID(pSelectHash["ARRAY"]);
	};
	//#################################################################
	//# Nested: addPrefix2DOM(pParentDOM)
	//#################################################################
	this.addPrefix2DOM = function (pParentDOM,pPrefix) {
		var vParent = null; 
		//this.alertDOM("addPrefix2DOM()-call pParentDOM.id="+pParentDOM.id)
		if (pParentDOM) {
			vParent = pParentDOM;
			//alert("(1) Rename ID="+vParent.id+"\nClassname '"+vParent.className+"' with '"+ pPrefix+"'");
			//vParent.className = pPrefix + vParent.className;
			//vParent.id = pPrefix + vParent.id;
			//alert("(2) Rename ID="+vParent.id+"\nClassname '"+vParent.className+"' with '"+ pPrefix+"'");
			var i=0;
			while (i != vParent.children.length) {
				if (vParent.children[i].nodeType == 1) {
					if (vParent.children[i].className != "") {
						//alert("(1) Rename ID="+vParent.children[i].id+"\nClassname '"+vParent.children[i].className+"' with '"+ pPrefix+"'");
						vParent.children[i].className = pPrefix + vParent.children[i].className;
					};
					if (vParent.children[i].id != "") {
						vParent.children[i].id = pPrefix + vParent.children[i].id;
						//alert("(2) Rename ID="+vParent.children[i].id+"\nClassname '"+vParent.children[i].className+"' with '"+ pPrefix+"'");
					}
					this.addPrefix2DOM(vParent.children[i],pPrefix);
				};
				i++;
			};
		} else {
			alert("addPrefix2DOM()-Call pParentDOM for Prefix "+pPrefix+" is undefined");
		};
		//alert("InnerHTML="+pParentDOM.innerHTML);
	};
	//#################################################################
	//# Nested: addRandomFalseSuggestions(pSelectHash,pStep)
	//#################################################################
	this.addRandomFalseSuggestions = function (pSelectHash,pStep) {
		var vStep = (pStep || "-1");
		var vCount = pSelectHash["COUNT"];
		//alert("Create new vCount="+vCount+" for Step="+vStep);
		var vArr = pSelectHash["ARRAY"];
		var vSelArr = pSelectHash["SELARRAY"];
		var vRandomSel = this.selectElementsFromArray(vSelArr,vCount);
		pSelectHash["ARRAY"] = this.unionarrays(vArr,vRandomSel);
		//alert("addRandomFalseSuggestions()=["+pSelectHash["ARRAY"].join(",")+"]");
	};
	//#################################################################
	//# Nested: appendStep(pButtonDOM)
	//#################################################################
	this.appendStep = function (pButtonDOM) {
		var vStep = pButtonDOM.getAttribute("step");
		//var vOldPos = this.getElementById("oldPOSITION"+this.aQID+vStep).value;
		var vOldPos = this.aStep2Index[vStep]+1;
		//alert("appendStep(): vStep=" + vStep + " vOldPos =" +vOldPos+ " TO pNewPos=0");
		this.moveStep(vOldPos,0);	
		var c = this.getStepCount();
		//alert("appendStep(): Count="+c+" vStep=" + vStep + " vOldPos =" +vOldPos+ " TO pNewPos=0");
		this.setStepCount(c+1);
		var vSA = this.aStep2SA[vStep];
		var vID = this.getChildById(vSA,"inSTEPID"+this.aQID+vStep).value;
		vID = this.aMappedID[vID];
		alert("("+(c+1)+") "+vLanguage["ProofStep"]+ " ["+vID+"] "+vLanguage["appended"]);
	};
	//#################################################################
	//# Nested: append_PreviousStep_Justification()
	//#################################################################
	this.append_PreviousStep_Justification = function () {
		//this.aStudentAnswerList = this.getElementsByClassName("STUDENTANSWER"+this.aQID);
		//var vListArray = this.aStudentAnswerList;
		//this.aStudentAnswerList = this.getElementsByClassName("STUDENTANSWER"+this.aQID);
		//var vListArray = this.getAllSteps("SCAN"); 
		var vListArray = this.getAllSteps(); 
		var vOutString = "";
		var vStep = this.getStep4Index(1);
		//alert("append_PreviousStep_Justification() - Index=1 Step="+vStep);
		var vSugStep = 0;
		var vComma = "";
		var vPrevious = " ";
		var vID = this.getElementById("inSTEPID"+this.aQID+vStep).value;
		this.getElementById("NEXT"+this.aQID+"0").value = vID;
		var vNextConNode = this.getElementById("NEXTCON"+this.aQID+"0");
		var vCon = 0;
		var k=0;
		while (k != vListArray.length) {
			if (vListArray[k]) {
			var vPrevLink = " ";
			var vPreNode = this.getChildByClassName(vListArray[k],"PREVIOUSLINK"+this.aQID);
			if (vPreNode) {
				vPrevLink = vPreNode.value;
			} else {
				alert("PREVIOUSLINK undefined for k="+k);
			}
			var vMapNode = this.getChildByClassName(vListArray[k],"mapPREVIOUSLINK"+this.aQID);
			if (vPrevLink != "") { 
				if (this.aMappedID[vPrevLink]) {
					vMapNode.value = this.aMappedID[vPrevLink];
				} else {
					vMapNode.value = "";
				}
			} else {
				vMapNode.value = "";
			};
			vID = this.getChildByClassName(vListArray[k],"inSTEPID"+this.aQID).value;
			vCon = this.getChildByClassName(vListArray[k],"sCONNECTION"+this.aQID).value;
			vNextConNode.value = vCon;
			vNextConNode = this.getChildByClassName(vListArray[k],"NEXTCON"+this.aQID);
			var vPosNode = this.getChildByClassName(vListArray[k],"sPOSITION"+this.aQID);
			vPosNode.value = k+1;
			vStep = vPosNode.getAttribute("step");
			this.getChildByClassName(vListArray[k],"stepSUGGESTION"+this.aQID).value = vSugStep;
			vSugStep = vStep;
			this.getChildByClassName(vListArray[k],"PREVIOUS"+this.aQID).value = vPrevious;
			if (k != 0) {
				this.getChildByClassName(vListArray[k-1],"NEXT"+this.aQID).value = vID;
			};
			this.getChildByClassName(vListArray[k],"oldPOSITION"+this.aQID).value = k+1;
			this.getChildByClassName(vListArray[k],"outNEXTNR"+this.aQID).innerHTML = k+2;
			//alert("outNEXTNR="+this.getChildByClassName(vListArray[k],"outNEXTNR"+this.aQID).innerHTML);
			var vNrList = this.getChildrenByClassName(vListArray[k],"outSTEPNR"+this.aQID);
			var i=0;
			while (i != vNrList.length) {
				vNrList[i].innerHTML = "("+(k+1)+")";
				i++;
			};
			this.getChildByClassName(vListArray[k],"appendJUSTIFICATION"+this.aQID).value = vOutString;
			vPrevious = vID;
			vOutString += vComma + vID;
			vComma = ",";
			};
			k++;
		};
		var vMax = (this.getUsedSteps()).length;
		if (vMax != 0) {
			this.getChildByClassName(vListArray[vMax-1],"NEXT"+this.aQID).value = "";
		};
	};
	//#################################################################
	//# Nested: alertDOM  
	//#################################################################
	this.alertDOM = function (pMessage) {
		if (this.aSettings["alertDOM"] == "1") {
			alert(pMessage);
		}
	};
	//#################################################################
	//# Nested: appendMissingSteps2SA()
	//#################################################################
	this.appendMissingSteps2SA = function () {
		var i=0;
		var vIndex=0;
		var vOut = "";
		var vStep = 0;
		var vID = "";
		var vHash = new Array();
		this.initExportHashSA(vHash);
		while (i != this.aAllID.length) {
			vID = this.aAllID[i];
			if (!this.aSolUsedID[vID]) {
				//alert("ID =["+vID+"] is missing.");
				vHash["ID"] = vID;
				vOut += this.CR + this.exportHashSA2Form(vHash);
			};
			i++;
		};
		var vIMathSA = this.getIMathById("STUDENTANSWER");
		//alert("BEFORE:"+vIMathSA.value);
		vIMathSA.value += vOut;
	};
	//#################################################################
	//# Nested: appendSolStep2Array (pSolStep,pSequence)
	//#################################################################
	this.appendSolStep2Array = function (pSolStep,pSequence) {
		var vHash = new Array(); 
		// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
		var vID = pSolStep[1];
		vHash["PREVIOUS"] = pSolStep[0];
		vHash["inSTEPID"] = vID;
		vHash["ID"] = vID;
		var vConIndex = parseInt(pSolStep[2]+"");
		vHash["CONNECTIONINDEX"] = pSolStep[2];
		vHash["CONNECTION"] = this.vConnectionArray[vConIndex];					
		vHash["JUSTIFICATIONARRAY"] = pSolStep[3];
		vHash["JUSTSOL"] = this.createSolArrayString(pSolStep[3]);
		vHash["OPTJUSTIFICATIONARRAY"] = pSolStep[4];	
		vHash["OPTJUSTSOL"] = this.createSolArrayString(pSolStep[4]);	
		vHash["STEPDEF"] = this.aAllID2RAW[vID];
		//-------
		pSequence.push(vHash);
	};	
	//#################################################################
	//# Nested: appendStudAns2SolSequence (pSequence)
	//#################################################################
	this.appendStudAns2SolSequence = function (pSequence,pPreID) {
		var vUsedNodes = this.getUsedSteps(); 
		//this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		var vStep = 0;
		var vPreID = " ";
		if (pPreID) vPreID = pPreID;
		var i=0;
		while (i != vUsedNodes.length) {
			vStep = this.getChildByClassName(vUsedNodes[i],"STEPNR"+this.aQID).value;
			var vHash = new Array(); 
			// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
			//var vPreID_Def = this.getElementById("PREVIOUS"+this.aQID+vStep).value;
			var vPreID_Def = this.getChildById(vUsedNodes[i],"PREVIOUS"+this.aQID+vStep).value;
			if (vPreID_Def != "") vPreID = vPreID_Def;
			vHash["PREVIOUS"] = vPreID;
			var vID = this.getChildById(vUsedNodes[i],"inSTEPID"+this.aQID+vStep).value;
			vHash["inSTEPID"] = vID;
			var vConIndex = this.getChildById(vUsedNodes[i],"sCONNECTION"+this.aQID+vStep).value;
			vHash["CONNECTIONINDEX"] = vConIndex;
			vHash["CONNECTION"] = this.vConnectionArray[parseInt(vConIndex)];
			var JustString = this.getChildById(vUsedNodes[i],"inJUSTIFICATION"+this.aQID+vStep).value; 
			vHash["JUSTIFICATIONARRAY"] = JustString.split(",");
			JustString = this.getChildById(vUsedNodes[i],"optJUSTIFICATION"+this.aQID+vStep).value; 
			vHash["OPTJUSTIFICATIONARRAY"] = this.array2original(JustString.split(","));					
			vHash["STEPDEF"] = this.aAllID2RAW[vID];
			//-------
			if (vHash["CONNECTION"] =="???") {
				alert("ERROR: Student Answer Append Error ["+this.aMappedID[vHash["inSTEPID"]]+"] Connection="+vHash["CONNECTION"]+" undefined!"+this.CR+"Please correct Student Answer and export Solution again!");
			};
			pSequence.push(vHash);
			//-------
			vPreID = vID;
			i++;
		};
	};				
	//#################################################################
	//# Nested: addErrorLink(pStep,pCount)
	//#################################################################
	this.addErrorLink = function (pStep,pCount) {
		if (this.lower(pCount,0)) pCount=1000;
		var vLinkError = this.calcErrorLink(pStep,pCount);
		this.aErrorStep["STEP"+pStep] += vLinkError;
		//alert("ERROR: "+vLinkError.toFixed(2)+" for Step"+pStep+" pCount="+pCount+" aErrorStep="+this.aErrorStep["STEP"+pStep]+" addLinkError()-Call:287");
	};
	//#################################################################
	//# Nested: array2mapped(pArrayID)
	//#################################################################
	this.array2mapped = function (pArrayID) {
		var vRes = [];
		var i=0;
		var vMapID = "";
		var vID = "";
		while (i != pArrayID.length) {
			vID = pArrayID[i];
			vMapID = this.aMappedID[vID];
			if (vMapID) {
				vRes.push(vMapID) 
			} else {
				//vRes.push(vID+"undef");
			};
			i++;
		};
		return vRes;
	};
	//#################################################################
	//# Nested: array2original(pArrayID)
	//#################################################################
	this.array2original = function (pArrayID) {
		var vRes = [];
		var i=0;
		var vOrgID = "";
		var vID = "";
		while (i != pArrayID.length) {
			vID = pArrayID[i];
			vOrgID = this.aOriginalID[vID];
			if (vOrgID) {
				vRes.push(vOrgID) 
			};
			i++;
		};
		return vRes;
	};
	//#################################################################
	//# Nested: calcErrorLink(pStep,pCount)
	//#################################################################
	this.calcErrorLink = function (pStep,pCount,pDefaultError) {
		var vDefaultError = this.aErrorDefault;
		if (pDefaultError) vDefaultError = pDefaultError; 
		var reduc = vDefaultError * pCount;
		if (this.greater(reduc,0.5)) reduc = 0.5;
		//this.aErrorStep["STEP"+pStep] += reduc;
		return reduc;
	};
    //#################################################################
	//# Nested: calcLogicLinkError(pUsedC,pProofC)
	//#################################################################
	this.calcLogicLinkError = function (pUsedC,pProofC) {
		//alert("calcLogicLinkError() - pUsedC="+pUsedC+",pProofC="+pProofC);
		if (this.greater(pUsedC,pProofC)) pUsedC = pProofC;
		var vReturn = 1.0;
		if (pProofC != 0) {
			var t = pUsedC/pProofC;
			vReturn =  t * this.aErrorDefault + (1-t)*1.0;
			vReturn = Math.round(vReturn * 100)/100;
		};
		this.aLLE = vReturn;
		//alert("calc LLE="+vReturn);
		return vReturn;
	};
	//#################################################################
	//# Nested: calcAssessment()
	//#################################################################
	this.calcAssessment = function (pAddUsed) {
		var vUsedNodes = this.getUsedSteps(); 
		var i = 0;
		var vStep=1;
		this.aScoreTotal = 0.0;
		var vUsedCount = vUsedNodes.length;
		while (i != vUsedCount) {
			vStep = this.getChildByClassName(vUsedNodes[i],"STEPNR"+this.aQID).value;
			this.calcAssessmentStep(vStep,pAddUsed);
			this.aScoreTotal += this.aScoreStep["STEP"+vStep];
			i++;
		}
		this.calcMinimalProofSteps();
		if (this.greater(this.aMinimalProofSteps,vUsedCount)) {
			vUsedCount = this.aMinimalProofSteps;
		};
		if (vUsedCount == 0) vUsedCount=1;
		this.aScoreTotal = this.aScoreTotal/vUsedCount;
		this.aUsedCount = vUsedCount;
		//while (vStep != (this.aCount+1)) {
		//	this.calcAssessmentStep(vStep,pAddUsed);
		//	vStep++;
		//};
	};
	//#################################################################
	//# Nested: calcAssessmentStep(pStep)
	//#################################################################
	this.calcAssessmentStep = function (pStep,pAddUsed) {
		//called in this.createAssessmentStep()
		// [0] PrevID | [1] ID | [2] Con | [3] JustArray | [4] OptJustArray
		//alert("calcAssessmentStep("+pStep+")");
		//this.aErrorDefault = parseInt(this.aSettings["Per_Error_Minus_Percent"])/100;
		var vOutHash = new Array();
		this.aErrorStep["STEP"+pStep] = 0.0;
		this.aScoreStep["STEP"+pStep] = 0.0;
		//this.aDefaultError = parseInt(this.aSettings["Per_Error_Minus_Percent"])/100;
		var vCount = this.getUsedCount(pStep,"inASSESSMENTUSED");
		if (pAddUsed) {
			this.getElementById("inASSESSMENTUSED"+this.aQID+pStep).value = vCount+pAddUsed;	
		};
		//alert("LLE="+this.aLLE);
		if (vCount != 0) {
			this.aErrorStep["STEP"+pStep] += vCount * this.aErrorAssessment;
		};
		//alert("(1) this.aErrorStep['STEP"+pStep+"']="+this.aErrorStep["STEP"+pStep]);
		vCount = this.getUsedCount(pStep,"inSUGGESTIONSUSED");
		if (vCount != 0) {
			this.aErrorStep["STEP"+pStep] += this.aErrorSuggestion;
		};
		//alert("(2) this.aErrorStep['STEP"+pStep+"']="+this.aErrorStep["STEP"+pStep]);
		var vPrevious = " ";
		var vPrevTextInsert = "";
		var vCon = this.getElementById("sCONNECTION"+this.aQID+pStep).value;
		if (this.vConnectionArray[vCon] != " ") {
			vPrevious = this.getElementById("PREVIOUS"+this.aQID+pStep).value;
		};
		var vID = this.getElementById("inSTEPID"+this.aQID+pStep).value;
		var vNext = this.getElementById("NEXT"+this.aQID+pStep).value;
		var vPreDist = this.calcStepDistance(vPrevious,vID);
		var vStartDist = this.calcStepDistance(" ",vID);
		if (vStartDist == 1) {
			//alert("["+vID+"] is a Startnode, that needs no previous Step\ncalcAssessmentStep():496");
			vPreDist = vStartDist;
		};
		//alert("Previous: vPreDist="+vPreDist+"\ncalcAssessmentStep("+pStep+"):505");
		vOutHash["preLINKSTEPS"] = vPreDist - 1;
		vOutHash["postLINKSTEPS"] = 0;
		if (this.aStepType4ID[vID] == "CONCLUSION") {
			//alert("["+vID+"] is a Conclusion, that needs no next Step\ncalcAssessmentStep():502");
			vOutHash["postLINKSTEPS"] = 0;
		} else {
			vOutHash["postLINKSTEPS"] = this.calcStepDistance(vID,vNext)-1;
		};
		this.addErrorLink(pStep,vOutHash["preLINKSTEPS"]);
		this.addErrorLink(pStep,vOutHash["postLINKSTEPS"]);	
		if (this.aID2Solutions[vID]) {
			var vAssArr = this.aID2Solutions[vID]["ASSESS"];
			var vAssHash = new Array();
			//alert("calcAssessmentStep("+pStep+") vID=["+vID+"] vAssArr.length="+vAssArr.length+" Distance to ["+vPrevious+"]="+vOutHash["preLINKSTEPS"]+" Distance to ["+vNext+"]="+vOutHash["postLINKSTEPS"]);
			this.calcSolutionRecord(pStep,vPrevious,vID,vNext,vOutHash,this.aErrorStep["STEP"+pStep]); 
		} else {
			vOutHash["maxSCORESTEP"] = "0.0";
			vOutHash["assCONNECTION"] = "0";
			vOutHash["preLINKSTEPS"] = "-1";
			vOutHash["postLINKSTEPS"] = "-1";
			vOutHash["assJUSTCORRECT"] = "";
			vOutHash["assJUSTMISSING"] = "";
			vOutHash["assJUSTUNNECESSARY"] = this.getElementById("inJUSTIFICATION"+this.aQID+pStep).value;
			//alert("No Assessment Step available for ID=["+vID+"] in Solution-Array");
		};
		var vManualScore = this.getElementById("inMYSTEPASSESSSCORE"+this.aQID+pStep).value;
		if (vManualScore != "") {
			this.aScoreStep["STEP"+pStep] = parseFloat(vManualScore)/100;
			vOutHash["maxSCORESTEP"] = this.aScoreStep["STEP"+pStep];
		};
		//alert("Error="+this.aErrorStep["STEP"+pStep]+" for Step="+pStep+"");
		this.set_values(pStep,vOutHash);
	};
	//#################################################################
	//# Nested: calcMinimalProofSteps()
	//#################################################################
	this.calcMinimalProofSteps = function () {
		// create a Solution for each ID [C1], [C2],...
		var vConclusionNodes = this.getElementsByClassName("ID_CONCLUSION"+this.aQID);
		var vID="";
		var i=0;
		this.aMinimalProofSteps = 0;
		while (i != vConclusionNodes.length) {
			vID = vConclusionNodes[i].value;
			var vPath = this.calcPath(" ",vID);
			this.aMinimalProofSteps += vPath.length - 1;
			i++;
		};
	};
	//#################################################################
	//# Nested: calcSolutionRecords (pStep,pPrevious,pID,pNext,pOutHash,pMainError)
	//#################################################################
	this.calcSolutionRecord = function (pStep,pPrevious,pID,pNext,pOutHash,pMainError) {
		var k=0;
		var vScoreTemp = 0.0;
		//this.aErrorDefault = parseInt(this.aSettings["Per_Error_Minus_Percent"])/100;
		var vErrorMax = 1000; // Counts all Errors with high default value
		var vError = 0;
		var vFoundSols = 0;
		var vRec;
		var vConOK = 0;
		var vConIndex = this.getElementById("sCONNECTION"+this.aQID+pStep).value;
		var vJust = this.getElementById("inJUSTIFICATION"+this.aQID+pStep).value;
		var vJustArr = vJust.split(",");
		var vAssArr = this.aID2Solutions[pID]["ASSESS"];
		if (vAssArr.length==0) alert("calcSolutionRecord():690 - No Steps for vID=["+pID+"] found for Assessment vScoreTemp="+vScoreTemp.toFixed(2));
		while (k != vAssArr.length) {
			//this.writeAss2Step(pStep,vAssHash);
			vSol = this.aSolution[vAssArr[k]];
			//alert("Step: "+vSol[0]+" "+this.vConnectionArray[vSol[2]]+" "+vSol[1]+" ");
			if (vSol[0]==pPrevious) {
				//alert("Previous=["+pPrevious+"] correct");
			};
			if (vSol[1]==pID) {
				//alert("ID=["+pID+"] o.k.");
			};
			//alert("vConSol="+vSol[2]+" vConIndex="+vConIndex+" ");
			if (vSol[2]==vConIndex) {
				//alert("Connection '"+this.vConnectionArray[vConIndex]+"' ok");
				vConOK = 1;
			} else {
				vConOk = 0;
			};
			var vArrCor = this.intersectionarrays(vJustArr,vSol[5]);
			var vArrMis = this.setminusarrays(vSol[3],vJustArr);
			var vArrUnnec = this.setminusarrays(vJustArr,vSol[5]);
			//alert("Sol-Correct: Just=["+vSol[3].join(",")+"]");
			//alert("Sol-Correct: JustOpt=["+vSol[4].join(",")+"]");
			//alert("Sol-Correct: Just+JustOpt=["+vSol[5].join(",")+"]");
			vError = vArrMis.length + vArrUnnec.length;
			if (this.lower(vError,vErrorMax)) {
				vErrorMax = vError;
				if(!this.aErrorStep["STEP"+pStep]) this.aErrorStep["STEP"+pStep]=0.0;
				//alert("this.aErrorDefault="+this.aErrorDefault+" this.aLLE="+this.aLLE+" pMainError="+pMainError);
				vScoreTemp = 1.0 - vErrorMax * this.aErrorDefault - (1-vConOK)*this.aErrorConMult*this.aErrorDefault - pMainError;
				//alert("calcSolutionRecord(): Better Solution found with "+vError+" Errors vScoreTemp="+vScoreTemp.toFixed(2));
				pOutHash["assCONNECTION"] = vSol[2];
				pOutHash["assJUSTCORRECT"] = vArrCor.join(",");
				pOutHash["assJUSTMISSING"] = vArrMis.join(",");
				pOutHash["assJUSTUNNECESSARY"] = vArrUnnec.join(",");
				this.aScoreStep["STEP"+pStep] = vScoreTemp;
			}
			k++;
		};
		//alert("vScoreTemp="+vScoreTemp.toFixed(2)+" MainError="+this.aErrorStep["STEP"+pStep].toFixed(2));
		if (this.greater(0,vScoreTemp)) vScoreTemp = 0.0; 
		this.aScoreStep["STEP"+pStep] = vScoreTemp;
		//this.getElementById("outSCORESTEPTEXT"+this.aQID+pStep).value = "---";
		this.getElementById("maxSCORESTEP"+this.aQID+pStep).value = vScoreTemp.toFixed(2);
		//id="maxSCORESTEP__SID__2"
		//return pOutHash
	};
	//#################################################################
	//# Nested: calcStepDistance(pID1,pID2,pPrevNext,pPrevNext)
	//#################################################################
	this.calcStepDistance = function (pID1,pID2,pPrevNext) {
		var vDirection = "NEXT";
		if (pPrevNext) vDirection = pPrevNext;
		var vPathArr = this.calcStepPath(pID1,pID2,vDirection);
		//this.calcStepPathString(vPathArr);
		var vReturn = vPathArr.length;
		if (vReturn != 0) vReturn--;
		//alert("calcStepDistance('"+pID1+"','"+pID2+"','"+vDirection+"')="+vReturn);
		return vReturn;
	};
	//#################################################################
	//# Nested: calcStepPathString(pArr)
	//#################################################################
	this.calcStepPathString = function (pPathArr) {
		var k=0;
		var vOut = " Path Array:"+this.CR;
		while (k !=pPathArr.length) {
			vOut += "("+k+") ["+pPathArr[k].join(",")+"]"+this.CR;
			k++;
		};
		//alert(vOut);
		return vOut;
	};
	//#################################################################
	//# Nested: calcStepPath(pID1,pID2,pPrevNext)
	//#################################################################
	this.calcStepPath = function (pID1,pID2,pPrevNext) {
		var vPathArr = []; //means unconnected
		var vFound = -1;
		var vArr = new Array(pID1);
		vPathArr.push(vArr);
		var k=0;
		var vOut = "";
		while (k != this.aCount) {
			k++;
			vArr = this.findConnectedSteps(vArr,pPrevNext);
			vFound = this.findarray(pID2,vArr);
			//alert("Level="+k+" vArr=["+vArr.join(",")+"] Start-ID1=["+pID1+"] Stop-ID2=["+pID2+"] vFound="+vFound);
			if (vFound == -1) {
				if (vArr.length == 0) {
					//alert("pID1=["+pID1+"] and pID2=["+pID2+"] are unconnected at level k="+k);
					vPathArr = [];
					k = this.aCount;
				} else {
					if (k+1 == this.aCount) {
						//alert("Path from pID1=["+pID1+"] to pID2=["+pID2+"] does not exist");
						vPathArr = [];
						k = this.aCount;
					} else {
						//alert("Check next level after k="+k+" ["+vArr.join(",")+"]");
						//vOut +="\n["+vArr.join(",")+"]";
						vPathArr.push(this.uniquearray(vArr));
					}
				}
			} else {
				//alert("Stop-ID2=["+pID2+"] vFound="+vFound+" with vOut=["+vOut+"]");
				vPathArr.push(this.uniquearray(vArr));
				k = this.aCount;
			};
		};
		//alert("calcStepPath('"+pPrevNext+"')-Call for ["+pID1+"]->["+pID2+"]:"+this.calcStepPathString(vPathArr));
		return vPathArr;
	};
	//#################################################################
	//# Nested: calcPath(pID1,pID2)
	//#################################################################
	this.calcPath = function(pID1,pID2) {
		var vPathArr = [];
		var vArr,vArrPrev;
		if (pID1 != pID2) {
			var vBackPathArr = this.calcStepPath(pID2,pID1,"PREV");
			var k=0;
			var i=0;
			if (vBackPathArr.length != 0) {
				//var vBackPathArr = this.calcStepPath(pID2,pID1,"PREV");
				k = vBackPathArr.length-1;
				//vArr = [pID1];
				//vBackPathArr[k] = [pID1];
				vArrPrev = [pID1];
				vPathArr.push(vArrPrev);
				//alert("Previous Array "+k+" ["+vArrPrev.join(",")+"]");
				while (k) {
					k--;
					vArr = vBackPathArr[k]; 
					if (vArr.length != 1) {
						//alert("Previous Array "+k+" ["+vArrPrev.join(",")+"]");
						vArr = this.findConnectedSteps(vArrPrev,"NEXT");
						//alert("Connected NEXT form vArrPrev "+k+" ["+vArr.join(",")+"]");
						vArr = this.intersectionarrays(vArr,vBackPathArr[k]);
						//alert("Intersection with BackPathArr at "+k+" ["+vBackPathArr[k].join(",")+"]");
					};
					//alert("Stored Result Arr "+k+" ["+vArr.join(",")+"]");
					vPathArr.push(vArr);
					vArrPrev = vArr;
					if (vArr.length == 0) { 
						alert("calcPath()-Error:552 Path contains no NEXT IDs for ["+vArrPrev.join(",")+"]!")
					}
				};
			} else {
				alert("calcPath('"+pID1+"','"+pID2+"')-Error: No Solution Path exists!")
			};
		} else {
			alert("calcPath()-Error:541 - IDs are equal for path calculation");
		}
		return vPathArr;
	};
	//#################################################################
	//# Nested: cancelSubControl()
	//#################################################################
	this.cancelSubControl = function () {
		this.show("CONTROLBUTTONS"+this.aQID);
		this.hide("LOADAREA"+this.aQID);
		this.hide("SAVEXMLAREA"+this.aQID);
		this.hide("SAVEIMATHAREA"+this.aQID);
		this.hide("PREFERENCESAREA"+this.aQID);
	};
	//#################################################################
	//# Nested: checkOptJustifications(pDOM)
	//#################################################################
	this.checkOptJustifications = function (pDOM) {
		var vStep = pDOM.getAttribute("step");
		var vListID = ((pDOM.value).replace(/\s/g,""));
		var vOrgListID = "";
		if (vListID != "") {
			var vMapArr = ((pDOM.value).replace(/\s/g,",")).split(",");
			var vOutArr = new Array();
			var vOrgArr = new Array();
			var i=0;
			var vMapID = "";
			while (i != vMapArr.length) {
				vMapID = vMapArr[i];
				if (vMapID != "") {
					if (this.aOriginalID[vMapID]) {
						vOutArr.push(vMapID);
						vOrgArr.push(this.aOriginalID[vMapID]);
					} else {
						alert("ERROR Optional Justifications: ID=["+vMapID+"] does not exist!");
					};
				};
				i++;
			};
			vListID = vOutArr.join(",");
			alert("Optional Justifications ["+vListID+"] are defined!");
		};
		vOrgListID = this.list2original(vListID);
		var vOrgListDOM = this.getElementById("orgOPTJUSTIFICATION"+this.aQID+vStep);
		vOrgListDOM.value = vOrgListID;
		pDOM.value = vListID;
	};
	//#################################################################
	//# Nested: checkSolStep(pID)
	//#################################################################
	this.checkSolStep = function (pID) {
		if (!this.aID2Solutions[pID]) {
			this.aID2Solutions[pID] = new Array();
			// ASSESS is a collection of all solution steps, 
			// that are necessary to assess the step with ID=pID
			this.aID2Solutions[pID]["ASSESS"] = [];
			this.aID2Solutions[pID]["PREV"] = [];
			this.aID2Solutions[pID]["PREV_REC"] = [];
			this.aID2Solutions[pID]["NEXT"] = [];
			this.aID2Solutions[pID]["NEXT_REC"] = [];
		};
	};
	//#################################################################
	//# Nested: checkUnusedCount()
	//#################################################################
	this.checkUnusedCount = function () {
		//var vUnusedNodes = this.getChildrenByClassName(this.aUnusedDOM,"STUDENTANSWER"+this.aQID);
		var vUnusedNodes = this.getUnusedSteps();
		if (vUnusedNodes.length == 0) {
			this.hideElement("UNUSED"+this.aQID);
		} else {
			this.show("UNUSED"+this.aQID); 
		}
	};
	//#################################################################
	//# Nested: clearProofInput()
	//#################################################################
	this.clearProofInput = function () {
		//alert("clearProofInput() delete all Justifications and Connections");
		var vStep=1;
		while (vStep != (this.aCount+1)) {
			this.clearProofInputStep(vStep);
			vStep++;
		};
	};
	//#################################################################
	//# Nested: clearProofInputStep(pStep)
	//#################################################################
	this.clearProofInputStep = function (pStep) {
		var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
		this.getChildById(vSA,"sCONNECTION"+this.aQID+pStep).value = 0;
		this.getChildById(vSA,"inJUSTIFICATION"+this.aQID+pStep).value = "";
		this.getChildById(vSA,"displayJUSTIFICATIONS"+this.aQID+pStep).innerHTML = "";
		this.getChildById(vSA,"editJUSTIFICATIONS"+this.aQID+pStep).innerHTML = "";
		this.updateStep(pStep);
	};
	//#################################################################
	//# Nested: clearSuggestions()
	//#################################################################
	this.clearSuggestions = function () {
		//var vSugArray = this.getElementsByClassName("SELECTFROM"+this.aQID);
		var vStep=0;
		while (vStep != (this.aCount+1)) {
			this.clearSuggestionStep(vStep);
			vStep++;
		};
	};
	//#################################################################
	//# Nested: clearSuggestionStep(pStep)
	//#################################################################
	this.clearSuggestionStep = function (pStep) {	
		var vSA = this.getElementById("SELECTFROM"+this.aQID+pStep);
		if (vSA) {
			this.getChildById(vSA,"selectCONNECTION"+this.aQID+pStep).value = "";
			this.getChildById(vSA,"selectSTEPID"+this.aQID+pStep).value = "";
			this.getChildById(vSA,"selectJUSTIFICATION"+this.aQID+pStep).value = "";
		//} else {
		//	alert("STUDENTANSWER for Step="+pStep+" is not defined - clearSuggestionStep():1126" );
		};
	};
	//#################################################################
	//# Nested: clickAssessment()
	//#################################################################
	this.clickAssessment = function () {
		var vNode = document.getElementById('ASSESSMENT'+this.aQID);
		this.hide('SOLUTION'+this.aQID);
		this.toggleNode(vNode);
		if (vNode.style.display!="none") {		
			this.createSummaryAssess();
		};
		this.visible('btXAS'+this.aQID);
	};
	//#################################################################
	//# Nested: clickSolution()
	//#################################################################
	this.clickSolution = function () {
		var vNode = document.getElementById('SOLUTION'+this.aQID);
		this.hide('ASSESSMENT'+this.aQID);
		this.toggleNode(vNode);
		if (vNode.style.display!="none") {		
			this.createSolution();
		};
		this.visible('btXAS'+this.aQID);
	};
	//#################################################################
	//# Nested: clickCloseControl()
	//#################################################################
	this.clickCloseControl = function () {
		//alert("clickCloseControl()-Call");
		this.show("PROOFTABLE"+this.aQID);
		if (this.aSettings["show_Main_Control"] == "1") {
			this.show("MAINCONTROL"+this.aQID);
		};
		if (this.aSettings["show_Load_Save_Control"] == "1") {
			this.show("CONTROLBUTTONS"+this.aQID);
		};
		this.hide("LOADAREA"+this.aQID);
		this.hide("SAVEXMLAREA"+this.aQID);
		this.hide("SAVEIMATHAREA"+this.aQID);
		this.hide("PREFERENCESAREA"+this.aQID);
	};
	//#################################################################
	//# Nested: clickLoadXML()
	//#################################################################
	this.clickLoadXML = function () {
		this.clickCloseControl();
		alert("Load XML-File - please wait!");
		this.load_XML();
	};
	//#################################################################
	//# Nested: clickLoad()
	//#################################################################
	this.clickLoad = function () {
		//alert("clickLoad()-Call");
		this.show("LOADAREA"+this.aQID);
		this.hide("PROOFTABLE"+this.aQID);
		this.hide("MAINCONTROL"+this.aQID);
		this.hide("SAVEXMLAREA"+this.aQID);
		this.hide("SAVEIMATHAREA"+this.aQID);
		this.hide("PREFERENCESAREA"+this.aQID);
		this.hide("CONTROLBUTTONS"+this.aQID);
		var vFileXML = this.getChildById(this.aRootDOM,"COPYTOLOAD"+this.aQID).value;
		//alert("vFileXML="+vFileXML);
		var vLoadForm = this.getChildById(this.aRootDOM,"tLOAD"+this.aQID);
		if (vLoadForm.value == "") {
			vLoadForm.value = this.getChildById(this.aRootDOM,vFileXML).value;
		};
		this.onLoadAMprocess = true;
		//this.load_XML(); Perform load_XML() on Click on Import Button
	};
	//#################################################################
	//# Nested: clickPreferences()
	//#################################################################
	this.clickPreferences = function () {
		//alert("clickPreferences()-Call");
		this.show("PREFERENCESAREA"+this.aQID);
		this.hide("PROOFTABLE"+this.aQID);
		this.hide("MAINCONTROL"+this.aQID);
		this.hide("LOADAREA"+this.aQID);
		this.hide("SAVEXMLAREA"+this.aQID);
		this.hide("SAVEIMATHAREA"+this.aQID);
		this.hide("CONTROLBUTTONS"+this.aQID);
		this.aSettings["vQID"] = this.getStringQID("");
		this.init_default_settings();
		this.updateSettings2Form();
	};
	//#################################################################
	//# Nested: clickSaveXML()
	//#################################################################
	this.clickSaveXML = function () {
		//alert("clickSaveXML()-Call");
		this.show("SAVEXMLAREA"+this.aQID);
		this.hide("PROOFTABLE"+this.aQID);
		this.hide("MAINCONTROL"+this.aQID);
		this.hide("LOADAREA"+this.aQID);
		this.hide("SAVEIMATHAREA"+this.aQID);
		this.hide("PREFERENCESAREA"+this.aQID);
		this.hide("CONTROLBUTTONS"+this.aQID);
		this.aSettings["vQID"] = this.getStringQID("");
		this.saveXML();
	};
	//#################################################################
	//# Nested: clickSaveIMathAS()
	//#################################################################
	this.clickSaveIMathAS = function () {
		//alert("clickSaveIMathAS()-Call");
		this.hide("PROOFTABLE"+this.aQID);
		this.hide("MAINCONTROL"+this.aQID);
		this.show("SAVEIMATHAREA"+this.aQID);
		this.hide("LOADAREA"+this.aQID);
		this.hide("SAVEXMLAREA"+this.aQID);
		this.hide("PREFERENCESAREA"+this.aQID);
		this.hide("CONTROLBUTTONS"+this.aQID);
		this.aSettings["vQID"] = this.getStringQID("");
		//this.hide("PROOFCONTROL"+this.aQID);
		//this.hide("MAINCONTROL"+this.aQID);
		this.saveEProofIMath2Form();
		this.getElementById("tIMATHCOMMONCONTROL_I"+this.aQID).value = this.createSettingsForm();
		this.getElementById("tWEEBLYEXPORT"+this.aQID).value = this.getWeeblyEProof();
		//this.showHideBoolean("PROOFCONTROL"+this.aQID,this.aSettings["show_Load_Save_Control"]);
		//this.showHideBoolean("MAINCONTROL"+this.aQID,this.aSettings["show_Main_Control"]);

	};
	//#################################################################
	//# Nested: compareCon(a,b)
	//#################################################################
	this.compareCon = function(a,b){
		return parsetInt(this.vConnection2Index[a])-parseInt(this.vConnection2Index[b]);
	};
	//#################################################################
	//# Nested: compareID(a,b)
	//#################################################################
	this.compareID = function(a,b){
		//return this.vAllID2Index[a]-this.vAllID2Index[b];
		var found1 = this.findarray(a,this.vAllID);
		var found2 = this.findarray(b,this.vAllID);
		return found1 - found2; 
	};
	//#################################################################
	//# Nested: compareInt(a,b)
	//#################################################################
	this.compareInt = function(a, b){
		return a-b;
	};
	//#################################################################
	//# Nested: convertList2Mapped()
	//#################################################################
	this.convertConList2Mapped = function (pList) {
		var vReturn = pList;
		if (pList != "") {
			var vArray = pList.split(",");
			var k=0;
			while (k != vArray.length) {
				if (this.aMappedID[vArray[k]]) {
					vArray[k] = this.aMappedID[vArray[k]];
				} else {
					vArray[k] += "?";
				};
				k++;
			}
			vReturn = vArray.join(",");
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: conList2Orginal()
	//#################################################################
	this.convertConList2Org = function (pList) {
		var vReturn = pList;
		if (pList != "") {
			var vArray = pList.split(",");
			var k=0;
			while (k != vArray.length) {
				if (this.aOriginalID[vArray[k]]) {
					vArray[k] = this.aOriginalID[vArray[k]];
				} else {
					vArray[k] += "?";
				};
				k++;
			}
			vReturn = vArray.join(",");
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: conList2Index()
	//#################################################################
	this.convertConList2Index = function (pList) {
		var vConIndex = new Array();
		if (pList) {
			var vConArray = pList.split(",");
			var k=0;
			while (k != vConArray.length) {
				//alert("vConArray["+k+"]='"+vConArray[k]+"'");
				if (this.vConnection2Index[vConArray[k]]) {
					vConIndex.push(parseInt(this.vConnection2Index[vConArray[k]])+0);
				};
				k++;
			};
			//alert("BEFORE SORT: vConIndex="+vConIndex.join(","));
			vConIndex.sort(this.compareInt);
			//alert("AFTER SORT: vConIndex="+vConIndex.join(","));
		};
		return vConIndex;
	};
	//#################################################################
	//# Nested: concatList()
	//#################################################################
	this.concatList = function (pList1,pList2) {
		//pList1 = pList1.replace(/\s/g,"");
		//pList2 = pList2.replace(/\s/g,"");
		var vListArray = null;
		var vListString = "";
		if (pList1 != "") {
			if (pList2 != "") {
				vListArray = this.unionarrays(pList1.split(","),pList2.split(","));		
				vListString = vListArray.join(",");
			} else {
				vListString = pList1;
			}
		} else {
			vListString = pList2;
		}
		return vListString; 
	};
	//#################################################################
	//# Nested: correctMappedID()
	//#################################################################
	this.correctMappedID = function () {
		//'MAPID-"+this.aQID+"-"+vID+"'
		//this.aCharCounter     = new Array(); //Hash for Leader Chars e.g. "P" CharCounter=4 creates "P4"
		//this.aMappedID  	  = new Array();
		//this.aOriginalID  	  = new Array();
		if (this.aSettings['remap_proofstep_IDs'] == "1") {				
			var vChar = "";
			var vOrgID = "";
			for (iID in this.aMappedID) {
				vChar = this.createChar4ID(iID);
				if (this.aCharCounter[vChar]==1) {
					//alert("ID=["+iID+"] remap ["+this.aMappedID[iID]+"] to ["+vChar+"] - correctMappedID()-Call");
					this.redefineMappedID(iID,vChar);
				};
			};
			for (iChar in this.aCharCounter) {
				// correct Mapped S2 to Mapped S02 if CharCounter greater 9
				if (this.greater(this.aCharCounter[iChar],9)) {
					var k=0;
					while (k != 9) {
						k++;
						vOrgID = this.aOriginalID[iChar+""+k];
						if (vOrgID) this.redefineMappedID(vOrgID,iChar+"0"+k);
					}
				}
			};
			if (this.aSettings["AuthoringMode"] == "1") this.updateAuthoringMappedIDs();
		} else {
			for (iID in this.aMappedID) {
				this.aMappedID[iID] = iID;
				this.aOriginalID[iID] = iID;
			};
		};
	};
	//#################################################################
	//# Nested: createAllStudentAnswers()
	//#################################################################
	this.createAllStudentAnswers = function() {
		//alert("createAllStudentAnswers() "+this.aAllID.length);
		var vTplDOM = this.getTemplateDOM();
		var i=0;
		var vStep = 0;
		var cln = null;
		var vPrefix = "";
		var vHashValue = new Array();
		var vHashInnerHTML = new Array();
		var vID = "";
		while (i != this.aAllID.length) {
			vStep++;
			vID = this.aAllID[i];
			//vHashInnerHTML["outSTEPNR"] = vStep+1000;
			vHashValue["STEPNR"] = vStep;
			vHashValue["inSTEPID"] = vID;
			vHashValue["sSTEPID"] = vID;
			vHashInnerHTML["displayJUSTIFICATIONS"] = "";
			vHashInnerHTML["outSTEPID"] = "["+this.aMappedID[vID]+"]";
			vHashInnerHTML["outSTEPID_ASSESSMENT"] = "["+this.aMappedID[vID]+"]";
			vHashInnerHTML["outSTEPDEF"] = this.aAllID2Node[vID].innerHTML;
			cln = vTplDOM.cloneNode(true);
			cln.className = vPrefix+"STUDENTANSWER"+this.aQID;
			cln.id = cln.className + vStep;
			//if (vStep==0) alert("Step=0");
			//alert("this.setClassName4Step createAllStudentAnswers");
			this.setClassName4Step(cln,vPrefix,vStep);
			//alert("2 this.setClassName4Step createAllStudentAnswers");
			this.writeHash2Value(cln,vHashValue,vStep);
			this.writeHash2InnerHTML(cln,vHashInnerHTML,vStep);
			//alert("append_template innerHTML="+cln.innerHTML);
			this.aUnusedDOM.appendChild(cln);
			i++;
		};
	};
	//#################################################################
	//# Nested: createAssessment()
	//#################################################################
	this.createAssessment = function () {
		var vStep=1;
		var vListSA = this.getUsedSteps();//this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		var vMax = vListSA.length;
		var vPos=0;
		while (vStep != (this.aCount+1)) {
			vPos = this.getElementById("sPOSITION"+this.aQID+vStep).value;
			if (this.greater(vPos,vMax)) {
				//alert("HIDE"+pStep+": vPos="+vPos+" vMax="+vMax);
			} else {
				this.createAssessmentStep(vStep,vPos,vMax);
			};
			vStep++;
		};
	};
	//#################################################################
	//# Nested: createAssessmentStep(pStep)
	//#################################################################
	this.createAssessmentStep = function (pStep,pPos,pMax) {	
		this.calcAssessmentStep(pStep);
		//--------------------------
		var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
		var vAssRoot = this.getElementById("assessSTUDENTANSWER"+this.aQID+pStep);
		//--------------------------
		var vID = this.getElementById("sSTEPID"+this.aQID+pStep).value;
		var vPrevID = this.getElementById("PREVIOUS"+this.aQID+pStep).value;
		var vNextID = this.getElementById("NEXT"+this.aQID+pStep).value;
		var vNextCon = this.getElementById("NEXTCON"+this.aQID+pStep).value;
		var vMapID = this.aMappedID[vID];
		var vMapPrevID = this.aMappedID[vPrevID];
		var vMapNextID = this.aMappedID[vNextID];
		//---get with SA------------
		var vCon = this.getChildById(vSA,"sCONNECTION"+this.aQID+pStep).value;
		var vNextCon = this.getChildById(vSA,"NEXTCON"+this.aQID+pStep).value;
		var vConSA = this.vConnection2Node[vCon].innerHTML;
		//--------------------------
		//alert("PREVIOUS="+this.getElementById("PREVIOUS"+this.aQID+pStep).value);
		//alert("NEXT="+this.getElementById("NEXT"+this.aQID+pStep).value+" createAssessmentStep():1036");
		//--------------------------
		//---Suggestion Used--------
		this.createUsedHelp(vAssRoot,vSA,"ASSESS","ASSESSMENT",pStep,this.aErrorAssessment);
		//---Suggestion Used--------
		this.createUsedHelp(vAssRoot,vSA,"SUG","SUGGESTIONS",pStep,this.aErrorSuggestion);
		//----assCONNECTION---------
		var vOutRow = this.getChildById(vAssRoot,"outASSESSCONNECTION"+this.aQID+pStep);
		//---SA CONNECTION----------
		if (this.vConnectionArray[vCon]==" ") {
			vConSA="START";
			vPrevID = " ";
		};
		vNode = this.getChildById(vSA,"assCONNECTION"+this.aQID+pStep);
		var s = vNode.value;
		var vConR= this.vConnection2Node[s].innerHTML;
		if (this.vConnectionArray[s]==" ") {
			vConR="START";
		}
		vText = vLanguage["Connection"] + " ''" + vConSA +"'' ";
		vOutRow.style.color = "red";
		vValue = "-"+this.createPercent(this.aErrorDefault*this.aErrorConMult);
		if ((s==0)  || (s != vCon)) {
			vText += vLanguage["WRONG"];
		} else if (s == vCon) {
			vValue = "-0%";
			vText += vLanguage["RIGHT"]; 
			vOutRow.style.color = "green";
		} else {
			vText += vLanguage["WRONG"] + " - " +vLanguage["Use"]+" ''";
			vText += vConR +"'' "+vLanguage["Instead_of"]+" ''";
			vText += vConSA +"''";
		};
		this.setStepAssValue(pStep,vAssRoot,"outASSESSCONNECTION",vText,vValue);
		//----PREV and NEXT-------
		var vEndOfSequence = false;
		//if (vNextCon)
		var vText =  this.LT+"br/"+this.GT+""+ this.getPossiblePrevNext(vID,"PREV");
		var vRes = this.setStepAssPrevNext(pStep,vAssRoot,vSA,"preLINKSTEPS",vNextCon,vMapID,vPrevID,"PREV",vText);
		this.setStepAssValue(pStep,vAssRoot,"outpreLINKSTEPS",vRes[0],vRes[1]);
		vText =  this.LT+"br/"+this.GT+""+ this.getPossiblePrevNext(vID,"NEXT");
		vRes = this.setStepAssPrevNext(pStep,vAssRoot,vSA,"postLINKSTEPS",vNextCon,vMapID,vNextID,"NEXT",vText);
		this.setStepAssValue(pStep,vAssRoot,"outpostLINKSTEPS",vRes[0],vRes[1]);
		//----COR JUST-------
		var vJustCor = this.getChildById(vSA,"assJUSTCORRECT"+this.aQID+pStep).value;
		vText = "["+this.list2mapped(vJustCor)+"] ";
		vValue = vLanguage["RIGHT"];		
		this.setStepAssValue(pStep,vAssRoot,"outJUSTCORRECT",vText,vValue);
		//----Ass JUSTIFICATIONS-------
		this.setJustAssValue(pStep,vAssRoot,vSA,"JUSTMISSING");
		this.setJustAssValue(pStep,vAssRoot,vSA,"JUSTUNNECESSARY");
		//---TOTAL SCORE---------
		var vNode = this.getChildById(vSA,"maxSCORESTEP"+this.aQID+pStep);
		var vValue =  this.LT+"b"+this.GT+""+this.createPercent(vNode.value)+""+this.LT+"/b"+this.GT;
		var vManualScore = this.getElementById("inMYSTEPASSESSSCORE"+this.aQID+pStep).value;
		var vText = vLanguage["Deduction_Points"]+" "+this.createPercent(1.0-vNode.value)+" ";
		if (vManualScore != "") {
			vText = vLanguage["manual"]+" "+vLanguage["Assessment"];
		};
		this.setStepAssValue(pStep,vAssRoot,"outSCORESTEP",vText,vValue);
	};
	//#################################################################
	//# Nested: createChar4ID(pID)
	//#################################################################
	this.createChar4ID = function (pID) {
		var vChar = "";
		if (this.aSettings["AuthoringMode"] == "1") {
			//remove last numbers in ID-String e.g. [S3_F5] to [S3_F] or [S3] to [S]   
			vChar = pID.replace(/[\-0-9]+$/g,"");
		} else {
			//remove FALSE identification in ID-String e.g. [S3_F5] to [S3]   
			vChar = pID.replace(/_F[\-0-9]+$/g,"");
			//remove last numbers in ID-String e.g.  [S3] to [S]   
			vChar = vChar.replace(/[^A-Z_]/g,"");
		}
		return vChar;
	};
	//#################################################################
	//# Nested: createCryptSol(pDomID)
	//#################################################################
	this.createCryptSol = function (pDomID) {
		var vOutput = "  "+this.LT+"CRYPTSOL"+this.GT+this.CR;
		vOutput += this.getEncodedSol();   
		vOutput += this.CR+"  "+this.LT+"/CRYPTSOL"+this.GT+this.CR;
		return vOutput;
	};
	//#################################################################
	//# Nested: createMappedID(pID)
	//#################################################################
	this.createMappedID = function (pID) {
		var vChar = this.createChar4ID(pID);
		return vChar+this.newCharCounter(vChar);
	};	
	//#################################################################
	//# Nested: createLanguageIMathAS()
	//#################################################################
	this.createLanguageIMathAS = function () {
		var vOut = "var vLanguage = new Array()"+this.SC;
		for (var iID in vLanguage) {
			vOut += this.CR + "vLanguage[\""+iID+"\"] = \""+this.DO+"STR_"+iID+"\""+this.SC;
		};
		return vOut;
	};	
	//#################################################################
	//# Nested: createPercent(pValue)
	//#################################################################
	this.createPercent = function (pValue) {
		pValue *=100;
		return pValue.toFixed(2)+"%";
	};
	//#################################################################
	//# Nested: createSettingXML()
	//#################################################################
	this.createSettingXML = function () {
		var vOutput = "";
		var vValue = "";
		for (var iID in this.aSettings) {
			if (this.isSettingExportID(iID)) {
				vValue = this.encodeValue(this.aSettings[iID]);
				vOutput += "  "+this.LT+"VARIABLE NAME='"+iID+"' VALUE='"+vValue+"' /"+this.GT+this.CR;
			};
			// <VARIABLE NAME='UNNECESSARY_PROOFSTEPS' VALUE='3' />
		};
		return vOutput;
	};
	//#################################################################
	//# Nested: createIMathSettings() for imathSETTINGS
	//#################################################################
	this.createIMathSettings = function () {
		var vOut = "";
		var vSettings = "";
		var vCR = "";
		for (var iID in this.aSettings) {
			vOut += vCR + iID + this.aSeparator + this.encodeValue(this.aSettings[iID]);
			vCR = this.CR;
		};
		return vOut;
	};
	//#################################################################
	//# Nested: createSettingsForm() for imathSETTINGS
	//#################################################################
	this.createSettingsForm = function () {
		var vOut = this.DO+"imathSETTINGS  = \"\"";
		var vSettings = "";
		var vCR = this.CR;
		for (var iID in this.aSettings) {
			vOut += vCR + this.DO+"imathSETTINGS .= \""+iID + this.aSeparator + this.DO+iID+"\\"+"n\"";
			vCR = this.CR;
		};
		return vOut;
	};
	//#################################################################
	//# Nested: createSettingIMathAS() - Export IMathAS-Format
	//#################################################################
	this.createSettingIMathAS = function (pHash) {
		var vTPL = this.getElementById("tTPLIMATHAS").value;
		vTPL = this.replaceString(vTPL,"__do__",this.DO);
		vTPL = this.replaceString(vTPL,"___DATE___",this.getDateString());
		var vSettings = "";
		for (var iID in this.aSettings) {
			var vSearch = "___"+iID.toUpperCase()+"___";
			var vValue = this.aSettings[iID];
			vValue = this.encodeValue(this.aSettings[iID]);
			if (iID == "ThisQ") {
				vValue = this.DO+"thisq";
			} else if (iID == "Offline") {
				vValue = "0";
			} else if (iID == "COMMONCONTROL") {
				vValue = this.decodeCommaForm(vValue);
			} else if (iID == "QUESTIONTEXT") {
				vValue = this.decodeCommaForm(vValue);
			} else if (iID == "alertDOM") {
				vValue = "0";
			};
			if (vTPL.indexOf(vSearch) == -1) {
				if (this.isSettingExportID(iID)) {
					vSettings  += ""+this.DO+iID+"='"+vValue+"'"+this.CR;
				};
			} else {
				vTPL = this.replaceString(vTPL,vSearch,this.aSettings[iID]);
			};
		};
		vTPL = vTPL.replace("___SETTINGS___",vSettings);
		return vTPL;
	};
	//#################################################################
	//# Nested: createStep2SA() - Map SA Index and Step
	//#################################################################
	this.createStep2SA = function () {
		var vArr = this.aAllSteps;
		var i=0;
		var vStep = 0;
		while (i != vArr.length) {
			vStep = this.getChildByClassName(vArr[i],"STEPNR"+this.aQID).value;
			vID   = this.getChildByClassName(vArr[i],"inSTEPID"+this.aQID).value;
			//alert("createStep2SA():1559 vStep="+vStep);
			this.aStep2SA[parseInt(vStep)] = vArr[i];
			this.aID2SA[vID] = vArr[i];
			this.aIndex2Step[i] = vStep;
			this.aStep2Index[vStep] = i;
			this.aIndex2ID[i] = vID;
			this.aID2Index[vID] = i;
			i++;
		};
	};
	//#################################################################
	//# Nested: createStepsIMathAS(pStepVar,pOut)
	//#################################################################
	this.createStepsIMathAS = function (pStepVar,pOut) {
		//alert("createStepsIMathAS()-Call:1292");
		var vTPL = this.getExportTemplate("tTPLSTEPSIMATHAS");
		var vList = "";
		//StepVar="Precondition"
		var vStepType = pStepVar.toUpperCase();
		var vArrID = new Array();
		if (!this.aID4StepType[vStepType]) {
			this.createStep2SA();
		};	
		if (this.aID4StepType[vStepType]) vArrID = this.aID4StepType[vStepType];
		var i=0;
		var vName = "";
		var vValue = "";
		while (i != vArrID.length) {
			vName = "EDITSTEP-"+this.aQID+"-"+vArrID[i];
			vValue = this.getElementById(vName).value;
			vValue = this.encodeValue(vValue);
			var vStepStr = vTPL;
			vStepStr = this.replaceString(vStepStr,"___ID___",this.exportID(vArrID[i]));
			vStepStr = this.replaceString(vStepStr,"___STEPTYPE___",pStepVar);
			vStepStr = this.replaceString(vStepStr,"___STEP_DEF___",vValue);
			vList += vStepStr;
			i++;
		}
		pOut = pOut.replace("___"+vStepType+"S___",vList);
		return pOut;
	};
	//#################################################################
	//# Nested: createStepsXML(pStepType,pSize)
	//#################################################################
	this.createStepsXML = function (pStepType,pSize) {
		var vOutput = "";
		vOutput += "  "+this.LT+"VARLIST NAME='"+pStepType+"_OPTIONS'"+this.GT+this.CR;
		vOutput += this.createStepsInnerXML(pStepType,pSize);
		vOutput += "  "+this.LT+"/VARLIST"+this.GT+this.CR;
		//return "create Step XML"+pStepType+" Size="+pSize+" ";
		return vOutput;
	};
	//#################################################################
	//# Nested: createStepsXML(pStepType,pSize)
	//#################################################################
	this.createStepsInnerXML = function (pStepType,pSize) {
		var vOutput = "";
		var vArrID = new Array();
		if (!this.aID4StepType[pStepType]) {
			this.createStep2SA();
		};	
		vArrID = this.aID4StepType[pStepType];
		var i=0;
		var vName = "";
		var vValue = "";
		while (i != vArrID.length) {
			vName = "EDITSTEP-"+this.aQID+"-"+vArrID[i];
			vValue = this.getElementById(vName).value;
			vValue = this.encodeValue(vValue);
			if (pSize=="5") {
				vOutput += this.getStepSize5XML(vArrID[i],vValue);
			} else {
				vOutput += "    "+this.LT+"STEPDEF SIZE='"+pSize+"' ID='"+this.exportID(vArrID[i])+"' VALUE='"+vValue+"' /"+this.GT+this.CR;
				// <STEPDEF SIZE='2' ID='P1'  VALUE=' `(c_n)_{n in  NN_0} in CC^{NN_0}` sei eine komplexe Folge.' />
			};
			i++;
		}
		//return "create Step XML"+pStepType+" Size="+pSize+" ";
		return vOutput;
	};
	//#################################################################
	//# Nested: checkID4StepDefExpor(pID,pUsedID,pHash)
	//#################################################################
	this.checkID4StepDefExport = function (pPreID,pID,pUsedID,pHash) {
		if (pUsedID[pID]) {
			pHash["STEPDEF"] = "";
		} else {
			if (this.aStepType4ID[pID] != "PROOFSTEP") {
				pHash["STEPDEF"] = "";
			}
		};
		if (pPreID == pHash["PREVIOUS"]) {
			pHash["PREVIOUS"] = "";
		};
		pUsedID[pID] = pID;
	};
	//#################################################################
	//# Nested: createSolutionSequence()
	//#################################################################
	this.createSolutionSequence = function () {
		var vConclusionNodes = this.getElementsByClassName("ID_CONCLUSION"+this.aQID);
		var vConID="";
		var vID = "";
		var vPreID = "";
		var vOut = "";
		var i=0;
		var vPath = null;
		var vUsedSol = new Array();
		//var vUsedIDs = new Array();
		var vSeq = new Array();
		while (i != vConclusionNodes.length) {
			vConID = vConclusionNodes[i].value;
			vPath = this.calcPath(" ",vConID);
			var k=1;
			while (this.lower(k,vPath.length)) {
				vID = vPath[k][0];
				vPreID = vPath[k-1][0];
				var vRes = this.findSolutionIndex4ID(vPreID,vID);
				if (vRes.length == 0) {
					alert("No Solution Index for ["+vPreID+","+vID+"] - createSolutionSequence():1314");
				} else {
					var vSolStep = this.aSolution[vRes[0]];
					this.appendSolStep2Array(vSolStep,vSeq);
				};
				vUsedSol.push(vRes[0]);
				//vUsedID[vID] = vID;
				k++;
			};
			i++;
		};
		//---Append all Solution Steps that are not used in Default Solution---
		var vUsedSolStr = "#,"+vUsedSol.join(",")+",#";
		//alert("vUsedSol=["+vUsedSolStr+"] - createSolutionSequence()-Call:1415");
		var vSol = this.aSolution;
		i=0;
		while (i != vSol.length) {
			//var vFound = this.findarray(k,vUsedSol);
			//if (vUsedSolStr.indexOf(","+vSol[i]+",") != -1) {
			if (vUsedSolStr.indexOf(","+i+",") == -1) {
				//---Solution Step not use --- append SolStep---
				//alert("Solution["+i+"] was not used before! createSolutionSequence()-Call:1424");
				this.appendSolStep2Array(vSol[i],vSeq);
			//} else {
				//alert("Solution["+i+"] already used! - createSolutionSequence()-Call:1425");
			};
			i++;
		};
		return vSeq;
	};
	//#################################################################
	//# Nested: createSolution()
	//#################################################################
	this.createSolution = function () {
		//get all IDs of conclusions [C1], [C2],...
		var vConclusionNodes = this.getElementsByClassName("ID_CONCLUSION"+this.aQID);
		var vHTML =  this.LT+"h2"+this.GT+""+vLanguage["Solution"]+":"+this.LT+"/h2"+this.GT;
		var vID="";
		var vIDm="";
		var vHR = "";
		var i=0;
		this.aMinimalProofSteps = 0;
		while (i != vConclusionNodes.length) {
			vID = vConclusionNodes[i].value;
			vIDm= this.aMappedID[vID];
			vHTML += vHR;
			vHTML += this.LT+"b style='font-size:20px'"+this.GT+vLanguage["Proof"]+" "+vLanguage["for"]+" ["+vIDm+"]: ";
			vHTML += this.aAllID2Node[vID].innerHTML+""+this.LT+"/b"+this.GT;
			//vStep = this.getChildByClassName(vSolutionPath[i],"STEPNR"+this.aQID).value;
			vHTML += this.createSolution4ID(vID);
			vHR =  this.LT+"hr  width='50%' align='left'/"+this.GT;
			i++;
		};
		this.getElementById("SOLUTION"+this.aQID).innerHTML = vHTML;
	};
	//#################################################################
	//# Nested: createSolution4ID(pID)
	//#################################################################
	this.createSolution4ID = function (pID) {
		// create a Solution for each ID [C1], [C2],...
		var vPath = this.calcPath(" ",pID);
		//var vPath = this.calcStepPath(" ",pID,"NEXT");
		//var vPath = this.calcStepPath(pID," ","PREV");
		var vHTML = "";
		//vHTML +=  this.LT+"ul"+this.GT;
		var i=1;
		this.aMinimalProofSteps += vPath.length - 1;
		while (this.lower(i,vPath.length)) {
			//vHTML +=  this.LT+"li"+this.GT+"Solution Path-Step["+i+"] for Conclusion ["+pID+"] contain Steps ["+vPath[i].join(",")+"]"+this.LT+"/li"+this.GT;
			vHTML += this.createSolutionStep(i,vPath[i-1][0],vPath[i][0]);
			i++;
		};	
		//vHTML +=  this.LT+"/ul"+this.GT;
		return vHTML;
	};
	//#################################################################
	//# Nested: createSolutionStep(pStep,pID1,pID2)
	//#################################################################
	this.createSolutionStep = function (pStep,pID1,pID2) {
		var vSolNode = this.getElementById("displaySOLUTIONSTEP"+this.aQID);
		var cln = vSolNode.cloneNode(true);
		//this.addPrefix2DOM(cln,"SOL");
		//cln.className = "STUDENTANSWER"+this.aQID;
		cln.id += pStep;
		var vInnerHash = new Array();
		vInnerHash["solSTEPNR"] ="("+ pStep +")";
		vInnerHash["solSTEPID"] = "[?"+pID2+"?]";
		vInnerHash["solSTEPDEF"] = "Step Definition  of ["+pID2+"] is undefined";
		var vRes = this.findSolutionStep4ID(pID1,pID2);
		if (vRes.length == 0) {
			alert("No Solution Step for ["+pID1+","+pID2+"] - createSolutionStep():1026");
		} else {
			if (this.aMappedID[pID2]) {
				vInnerHash["solSTEPID"] = "["+this.aMappedID[pID2]+"]";
			};
			if (this.aAllID2Node[pID2]) {
				vInnerHash["solSTEPDEF"] = this.aAllID2Node[pID2].innerHTML;
			};
			this.evaluateSolutionStep(vRes[0],vInnerHash);
		}
		//------------------------------------
		this.writeHash2InnerHTML(cln,vInnerHash,"");
		//------------------------------------
		return cln.innerHTML;
	};
	//#################################################################
	//# Nested: createSolutionIMathAS(pStepType,pHash)
	//#################################################################
	this.createSolutionIMathAS = function (pStepType,pMainOut) {
		var vTPL = this.getExportTemplate("tTPLSOLUTIONSTEP");
		//alert(vTPL);
		var vSolSeq = new Array();
		if (this.aExportSol) {
			vSolSeq = this.createSolutionSequence();
		};
		var vPreID = " ";
		if (this.aExportSA) {
			this.appendStudAns2SolSequence(vSolSeq,vPreID);
		};
		var vID = "";
		var vOut = "";
		var vIMath = "";
		var i=0;
		while (i != vSolSeq.length) {
			//var vHash = vSolSeq[i];
			vOut += this.createSolutionStepIMathAS(vTPL,vSolSeq[i]);
			vIMath += this.createSolutionStep2Form(vSolSeq[i]); 
			i++;
		};
		if (pStepType !="Solution") {
			//if (this.aCrypt) {
			//alert("Encrypt IMath"+this.CR+vIMath);
			var vKey = this.aSettings["cryptkey"];
			//var vReturn = this.vigenere(vIMath,"ABC","encode");
			var vCryptSol = this.vigenere(vIMath,vKey,"encode");
			var vArr = vCryptSol.split(this.CR);
			vOut += "//----ENCRYPTED-SOLUTION-------"+this.CR;
			i=0;
			var vPlus = " ";
			while (i != vArr.length) {
				if (this.greater(vArr[i].length,0)) {
					vOut += this.DO+pStepType+" "+vPlus+"= \""+vArr[i]+"\""+this.CR;
					vPlus = ".";
				};
				i++;
			}
		}
		return this.replaceString(pMainOut,"___SOLUTION___",vOut);
	};
	//#################################################################
	//# Nested: createSolutionForm(pHash)
	//#################################################################
	this.createSolution2Form = function () {
		var vSolSeq = new Array();
		if (this.aExportSol) {
			vSolSeq = this.createSolutionSequence();
		};
		var vPreID = " ";
		if (this.aExportSA) {
			this.appendStudAns2SolSequence(vSolSeq,vPreID);
		};
		var vOut = "";
		var i=0;
		while (i != vSolSeq.length) {
			//var vHash = vSolSeq[i];
			vOut += this.createSolutionStep2Form(vSolSeq[i]); 
			i++;
		};
		return vOut;
	};
	//#################################################################
	//# Nested: createSolutionStep2Form(pHash)
	//#################################################################
	this.createSolutionStep2Form = function (pHash) {
		 var i = 0;
		 var vOut = "";
		 var SEP = "";
		 var vFormat = new Array("PREVIOUS","ID","CONNECTION","JUSTFORM","OPTJUSTFORM");
		 pHash["JUSTFORM"] = (pHash["JUSTIFICATIONARRAY"]).join(this.aComma);
		 pHash["OPTJUSTFORM"] = (pHash["OPTJUSTIFICATIONARRAY"]).join(this.aComma);
		 while (i !=vFormat.length) {
		 	vOut += SEP+pHash[vFormat[i]];
			SEP = this.aSeparator;
			i++;
		 }
		 return vOut+this.CR;
	}; 
	//#################################################################
	//# Nested: createSolutionStep5IMathAS(pTPL,pHash)
	//#################################################################
	this.createSolutionStepIMathAS = function (pTPL,pHash) {
		var vCon = pHash["CONNECTION"];
		pHash["ID"] = pHash["inSTEPID"];
		if (vCon == "???") {
			alert("ERROR Export IMathAS: Step ["+this.aMappedID[pHash["inSTEPID"]]+"] has an undefined connection between proof steps");
		};
		pHash["JUSTSOL"] = "'"+(pHash["JUSTIFICATIONARRAY"]).join("','")+"'";
		pHash["OPTJUSTSOL"] = "'"+(pHash["OPTJUSTIFICATIONARRAY"]).join("','")+"'";
		var i = 0;
		 var vFormat = new Array("PREVIOUS","CONNECTION","ID","JUSTSOL","OPTJUSTSOL");
		 while (i !=vFormat.length) {
		 	var iID = vFormat[i];
			pTPL = this.replaceString(pTPL,"___"+iID+"___",pHash[iID]);
			i++;
		 }
		 return pTPL;
	}; 
	//#################################################################
	//# Nested: createSolutionXML()
	//#################################################################
	this.createSolutionXML = function () {
		return this.createProofStepsXML("PROOFSTEP","5");
	};
	//#################################################################
	//# Nested: createProofStepsXML(pStepType,pSize)
	//#################################################################
	this.createProofStepsXML = function (pStepType,pSize) {
		var vOut = "";
		vOut += "  "+this.LT+"VARLIST NAME='"+pStepType+"_OPTIONS'"+this.GT+this.CR;
		var vSolSeq = new Array();
		if (this.aExportSol) {
			vSolSeq = this.createSolutionSequence();
		//} else {
			//---duplicates PROOFSTEP_XML Size=2 in XML export----- 
			//vOut += this.createStepsInnerXML(pStepType,"2");
		};
		var vPreID = " ";
		if (this.aExportSA) {
			this.appendStudAns2SolSequence(vSolSeq,vPreID);
		};
		var vID = "";
		var vUsedID = new Array();
		//var vLinkNode = new Array();
		//vLinkNode["PREVIOUS"] = "?";
		var i=0;
		while (i != vSolSeq.length) {
			var vHash = vSolSeq[i];
			vID = vHash["inSTEPID"];
			//alert("createProofStepsXML():1253 - vID=["+vID+"]");
			this.checkID4StepDefExport(vPreID,vID,vUsedID,vHash);
			vOut += this.createStepSize5XML(vHash); 
			vPreID = vID;
			i++;
		};
		vOut += "  "+this.LT+"/VARLIST"+this.GT+this.CR;		
		return vOut;
	};
	//#################################################################
	//# Nested: createStudentAnswer2XML(pStepType,pSize)
	//#################################################################
	this.createStudentAnswer2XML = function (pStepType,pSize) {
		var vOut = "";
		var vUsedNodes = this.getUsedSteps();
		//this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		var vStep = 0;
		var i=0;
		vOut += "  "+this.LT+"VARLIST NAME='"+pStepType+"_OPTIONS'"+this.GT+this.CR;
		while (i != vUsedNodes.length) {
			vStep = this.getChildByClassName(vUsedNodes[i],"STEPNR"+this.aQID).value;
			vOut += this.createStudentAnswerStep2XML(vStep,pSize);
			i++;
		};
		vOut += "  "+this.LT+"/VARLIST"+this.GT+this.CR;		
		return vOut;
	};
	//#################################################################
	//# Nested: createStudentAnswerStep2XML(pStep)
	//#################################################################
	this.createStudentAnswerStep2XML = function (pStep,pSize) {
		//this.aStudAnsFormat = new Array("PREVIOUS","CONNECTION","ID","JUST","OPTJUST","MANSCORE","SUGUSED","ASSUSED","SELCON","SELID","SELJUST","VALUE");
		//this.aListID = new Array("OPTJUST","JUST","SELCON","SELID","SELJUST");	
		//this.aStudAns2DOM = new Array("PREVIOUSLINK","sCONNECTION","inSTEPID","inJUSTIFICATION","optJUSTIFICATION","inMYSTEPASSESSSCORE","inSUGGESTIONSUSED","inASSESSMENTUSED","selectCONNECTION","selectSTEPID","selectJUSTIFICATION","VALUE");
		var vOut = "";
		vOut += "    "+this.LT+"STEPDEF SIZE='"+pSize+"' ";
		var vHash = new Array();
		var i = 0;
		while (i != this.aStudAns2DOM.length) {
			var vDOM = this.aStudAns2DOM[i];
			var vAtt = this.aStudAnsFormat[i];
			var vValue = this.getElementById(vDOM+this.aQID+pStep).value || "";
			vHash[vAtt] = this.encodeValue(vValue);
			i++;
		};
		if (vHash["PREVIOUS"] != "") {
			vOut += "PREVIOUS='"+vHash["PREVIOUS"]+"' ";
		};
		vHash["CONNECTION"] = this.encodeValue(this.vConnectionArray[parseInt(vHash["CONNECTION"]+"")]);
		var i = 1;
		while (i != this.aStudAns2DOM.length) {
			var vAtt = this.aStudAnsFormat[i];
			vOut += vAtt+"='"+vHash[vAtt]+"' ";	
			i++;
		};
		vOut += "' /"+this.GT+this.CR;
		return vOut;
	};
	//#################################################################
	//# Nested: createStudentAnswer2IMathAS()
	//#################################################################
	this.createStudentAnswer2IMathAS = function () {
		var vOut = "";
		//var vSA = this.getUsedSteps();
		var vSA = this.getAllSteps();
		//this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		var vStep = 0;
		var i=0;
		var vCR = "";
		while (i != vSA.length) {
			//vStep = this.getChildByClassName(vSA[i],"STEPNR"+this.aQID).value;
			vStep = this.aIndex2Step[i];
			vOut += vCR + this.createStudentAnswerStep2IMathAS(vStep,vSA[i]);
			vCR = this.CR;
			i++;
		};
		//alert("createStudentAnswer2IMathAS() "+this.CR+vOut);
		return vOut;
	};
	//#################################################################
	//# Nested: createStudentAnswerStep2IMathAS(pStep,pSA)
	//#################################################################
	this.createStudentAnswerStep2IMathAS = function (pStep,pSA) {
		//this.aStudAnsFormat = new Array("PREVIOUS","CONNECTION","ID","JUST","OPTJUST","MANSCORE","SUGUSED","ASSUSED","SELCON","SELID","SELJUST","VALUE");
		//this.aListID = new Array("OPTJUST","JUST","SELCON","SELID","SELJUST");	
		//this.aStudAns2DOM = new Array("PREVIOUSLINK","sCONNECTION","inSTEPID","inJUSTIFICATION","optJUSTIFICATION","inMYSTEPASSESSSCORE","inSUGGESTIONSUSED","inASSESSMENTUSED","selectCONNECTION","selectSTEPID","selectJUSTIFICATION","VALUE");
		var vOut = "";
		var vHash = new Array();
		var i = 0;
		while (i != this.aStudAns2DOM.length) {
			var vDOM = this.aStudAns2DOM[i];
			var vAtt = this.aStudAnsFormat[i];
			var vValue = this.getChildById(pSA,vDOM+this.aQID+pStep).value || "";
			//if (this.greater(vValue.length,150)) alert("createStudnentAnswertStep2SA():2025 "+vDOM+"="+vValue); 
			vHash[vAtt] = this.encodeCommaForm(vValue);
			i++;
		};
		//vHash["CONNECTION"] = this.encodeValue(this.vConnectionArray[parseInt(vHash["CONNECTION"]+"")]);
		vHash["CONNECTION"] = this.vConnectionArray[parseInt(vHash["CONNECTION"]+"")];
		i=0;
		while (i != this.aListID.length) {
			vHash[this.aListID[i]] = this.list2IMathAS(vHash[this.aListID[i]]) || ""; 
			i++;
		};
		return this.exportHashSA2Form(vHash);
	};
	//#################################################################
	//# Nested: createStepSize5XML(pHash)
	//#################################################################
	this.createStepSize5XML = function (pHash) {
		var vCon = pHash["CONNECTION"];
		pHash["ID"] = pHash["inSTEPID"];
		if (vCon == "???") {
			alert("ERROR Export XML: Step ["+this.aMappedID[pHash["inSTEPID"]]+"] has an undefined connection between proof steps");
			vOut = " ";
		};
		pHash["JUST"] = (pHash["JUSTIFICATIONARRAY"]).join(",");
		pHash["OPTJUST"] = (pHash["OPTJUSTIFICATIONARRAY"]).join(",");
		//------------
		pHash = this.exportHashID(pHash);
		//------------
		var vOut = "";
		if (pHash["ID"]) {
			vOut += "    "+this.LT+"STEPDEF SIZE='5' ";
			if (pHash["PREVIOUS"] != "") {
				vOut += "PREVIOUS='"+pHash["PREVIOUS"]+"' ";
			};
			vOut += "ID='"+pHash["ID"]+"' ";
			vOut += "CONNECTION='"+this.encodeValue(vCon)+"' ";
			var vJust = 
			vOut += "JUST='"+pHash["JUST"] +"' ";
			vOut += "OPTJUST='"+pHash["OPTJUST"]+"' ";
			vOut += "VALUE='"+this.encodeValue(pHash["STEPDEF"])+"' /"+this.GT+this.CR;
		}
		return vOut;
	};
	//#################################################################
	//# Nested: getStepSize5XML(pID,pValue)
	//#################################################################
	this.getStepSize5XML = function (pStep,pID,pValue) {
		//----depricated----
		var vOut = "";
		var vStep = this.getStep4ID(pID);
		vOut += "    "+this.LT+"STEPDEF SIZE='5' ID='"+pID+"' ";
		var vConIndex = this.getElementById("sCONNECTION"+this.aQID+vStep).value;
		var vCon = this.vConnectionArray[parseInt(vConIndex)];
		vOut += "CONNECTION='"+this.encodeValue(vCon)+"' ";
		var vJust = this.getElementById("inJUSTIFICATION"+this.aQID+vStep).value;
		vOut += "JUST='"+vJust+"' ";
		vJust = this.getElementById("optJUSTIFICATION"+this.aQID+vStep).value;
		vOut += "OPTJUST='"+this.list2original(vJust)+"' ";
		vOut += "VALUE='"+pValue+"' /"+this.GT+this.CR;
		return vOut;
	};
	//#################################################################
	//# Nested: createSolArrayString(pArr)
	//#################################################################
	this.createSolArrayString = function (pArr) {
		var vRet = "";
		if (pArr) {
			if (pArr.length != 0) {
				vRet = "\""+pArr.join("\",\"")+"\"";	
			};
		};
		return vRet;
	};
	//#################################################################
	//# Nested: createSummaryAssess()
	//#################################################################
	this.createSummaryAssess = function () {
		this.getElementById("ASSESSMENT"+this.aQID).innerHTML = "Assessment with be calculated - please wait!";
		var pAddUsedCount = 1;
		if (this.aSettings["AssessmentMode"] == "1") pAddUsedCount = 0;
		this.calcAssessment(pAddUsedCount);
		this.createSolution();
		this.createAssessment();
		var vUsedNodes = this.getUsedSteps(); 
		//this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		var vTitle =  this.LT+"h2"+this.GT+""+vLanguage["Assessment"]+":"+this.LT+"/h2"+this.GT;
		var vAssessHTML = "";
		var vStep = 0;
		var i=0;
		var vScoreTotal = 0.0;
		var vHR =  this.LT+"hr width='50%' align='left'/"+this.GT;
		//vAssessHTML +=  this.LT+"ul"+this.GT;
		var vUsedCount = vUsedNodes.length;
		while (i != vUsedCount) {
			vStep = this.getChildByClassName(vUsedNodes[i],"STEPNR"+this.aQID).value;
			//vScoreTotal += this.aScoreStep["STEP"+vStep];
			//alert("vStep="+vStep+" vScoreTotal="+vScoreTotal)
			//this.check
			vAssessHTML += this.createSummaryAssessStep(vStep,i+1);
			vAssessHTML += vHR;
			i++;
		};
		vAssessHTML += vLanguage["MinimalProofSteps"] +""+this.LT+"ul"+this.GT;
		vAssessHTML +=  this.LT+"li"+this.GT+""+this.aMinimalProofSteps+" "+vLanguage["ProofSteps"]+" "+vLanguage["necessary"]+""+this.LT+"/li"+this.GT;
		vAssessHTML +=  this.LT+"li"+this.GT+""+vUsedCount+" "+vLanguage["ProofSteps"] + " "+vLanguage["USED"].toLowerCase()+""+this.LT+"/li"+this.GT;
		//var vUsedCount = vUsedNodes.length;
		//if (this.greater(this.aMinimalProofSteps,vUsedCount)) {
		//	vUsedCount = this.aMinimalProofSteps;
		//};
		//if (vUsedCount == 0) vUsedCount=1;
		vAssessHTML +=  this.LT+"/ul"+this.GT;
		var vScoreHTML =  this.LT+"b"+this.GT+""+this.createPercent(this.aScoreTotal) + " "+ vLanguage["Average"] +" "+vLanguage["for"] + " "+ this.aUsedCount+" "+vLanguage["ProofSteps"] +""+this.LT+"/b"+this.GT;
		vAssessHTML = vTitle + vScoreHTML+vHR+vAssessHTML + vScoreHTML;
		this.getElementById("ASSESSMENT"+this.aQID).innerHTML = vAssessHTML;
		//return vSolArrayHTML;
	};
	//#################################################################
	//# Nested: createSummaryAssessLinked(pSA,pStep,pPrePost)
	//#################################################################
	this.createSummaryAssessLinked = function (pSA,pStep,pPrePost) {
		var vScoreTmp = "("+this.getChildById(pSA,"out"+pPrePost+"LINKSTEPSSCORE"+this.aQID+pStep).innerHTML+")";
		vScoreTmp = vScoreTmp.bold();
		var vLinkStep = parseInt(this.getChildById(pSA,pPrePost+"LINKSTEPS"+this.aQID+pStep).value);
		if (vLinkStep == 0) {
			vScoreTmp = vScoreTmp.fontcolor("green"); 
		} else {
			vScoreTmp = vScoreTmp.fontcolor("red"); 
		};
		vScoreTmp =  this.getChildById(pSA,"out"+pPrePost+"LINKSTEPSTEXT"+this.aQID+pStep).innerHTML + " "+ vScoreTmp;
		return this.LT+"li"+this.GT+vScoreTmp+" "+this.LT+"/li"+this.GT;
	};
	//#################################################################
	//# Nested: createSummaryAssessStep(pStep)
	//#################################################################
	this.createSummaryAssessStep = function (pStep,pNr) {
		var vHTML = "";
		//vAssStepHTML +=  this.LT+"li"+this.GT+"Summary Assessment Step "+pStep+""+this.LT+"/li"+this.GT;
		var vSolNode = this.getElementById("displaySOLUTIONSTEP"+this.aQID);
		var cln = vSolNode.cloneNode(true);
		//this.addPrefix2DOM(cln,"SOL");
		//cln.className = "STUDENTANSWER"+this.aQID;
		cln.id += pStep;
		var vInnerHash = new Array();
		var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
		var vID = this.getChildById(vSA,"inSTEPID"+this.aQID+pStep).value;
		var vMapID = this.aMappedID[vID];
		//alert("this.createSummaryAssessStep("+pStep+"):1089 vID=["+vID+"]");
		var vCon = this.getChildById(vSA,"sCONNECTION"+this.aQID+pStep).value;
		var vAssCon = this.getChildById(vSA,"assCONNECTION"+this.aQID+pStep).value;
		var vMapID = this.aMappedID[vID];
		var vJustOK =  this.getChildById(vSA,"assJUSTCORRECT"+this.aQID+pStep).value;
		var vJustMiss =  this.getChildById(vSA,"assJUSTMISSING"+this.aQID+pStep).value;
		var vJustUnnec =  this.getChildById(vSA,"assJUSTUNNECESSARY"+this.aQID+pStep).value;
		vInnerHash["solSTEPNR"] ="("+ pNr +")"+this.LT+"br"+this.GT;
		var vRed1 =  this.LT+"b style='color:red'"+this.GT;
		var vRed2 =  this.LT+"/b"+this.GT;
		var vGreen1 =  this.LT+"b style='color:green'"+this.GT;
		var vGreen2 =  this.LT+"/b"+this.GT;
		var vPre = vRed1;
		var vPost = vRed2;
		var vOut = "";
		if (this.greater(this.aScoreStep["STEP"+pStep],0.85)) {
			vPre = vGreen1;
		};
		var vConAssHTML = vLanguage["WRONG"].fontcolor("red").bold();
		var vScoreCell = "";
		vScoreCell = " ("+this.getElementById("outASSESSCONNECTIONSCORE"+this.aQID+pStep).innerHTML+")";
		var vScoreTmp = vScoreCell.fontcolor("red");
		if ((vCon!=0) && (vAssCon==vCon)) {
			vConAssHTML = vLanguage["RIGHT"].fontcolor("green");
			vScoreCell = vScoreCell.fontcolor("green");
		} else {
			vScoreCell = vScoreCell.fontcolor("red");
		};
		vScoreCell = this.getElementById("outASSESSCONNECTIONTEXT"+this.aQID+pStep).innerHTML + vScoreCell.bold();
		vInnerHash["solCONNECTION"] = this.vConnection2Node[vCon].innerHTML+""+this.LT+"br/"+this.GT+""+vConAssHTML;
		vInnerHash["solSTEPNR"] += vPre+this.createPercent(this.aScoreStep["STEP"+pStep])+vPost;
		vInnerHash["solSTEPID"] = "["+vMapID+"]";
		vInnerHash["solSTEPDEF"] = this.aAllID2Node[vID].innerHTML;	
		vOut = "";
		var vManualScore = this.getElementById("inMYSTEPASSESSSCORE"+this.aQID+pStep).value;
		if (vManualScore != "") {
			vOut = ((vLanguage["manual"]+" "+vLanguage["Assessment"]).toUpperCase()).bold();
		};
		vOut += this.LT+"hr width='25%' align='left'/"+this.GT;
		vOut +=  (vLanguage["HelpPage"]+" "+vLanguage["for"]+" "+vLanguage["ProofSteps"]+":").bold();
		vOut += this.LT+"ul"+this.GT;
		var vUsedText = this.getElementById("outSUGUSEDTEXT"+this.aQID+pStep).innerHTML;
		var vUsedScore = " ("+this.getElementById("outSUGUSEDSCORE"+this.aQID+pStep).innerHTML+")";
		vOut += this.LT+"li"+this.GT+ vLanguage["Suggestions"]+" "+vUsedText+ vUsedScore.bold()+" "+this.LT+"/li"+this.GT;
		vUsedText = this.getElementById("outASSESSUSEDTEXT"+this.aQID+pStep).innerHTML;
		vUsedScore = " ("+this.getElementById("outASSESSUSEDSCORE"+this.aQID+pStep).innerHTML+")";
		vOut += this.LT+"li"+this.GT+ vLanguage["Assessment"]+" "+vUsedText+ vUsedScore.bold()+" "+this.LT+"/li"+this.GT;
		vOut += this.LT+"/ul"+this.GT;
		vOut += this.LT+"b"+this.GT+""+vLanguage["Link_ProofSteps"]+":"+this.LT+"/b"+this.GT;
		vOut += this.LT+"ul"+this.GT;
		vOut += this.LT+"li"+this.GT+""+vScoreCell+" "+this.LT+"/li"+this.GT;
		vOut += this.createSummaryAssessLinked(vSA,pStep,"pre");
		vOut += this.createSummaryAssessLinked(vSA,pStep,"post");
		vOut  +=  this.LT+"/ul"+this.GT;
		var vTitle = vGreen1 + vLanguage["Correct"]+" "+vLanguage["Justifications"] + ":" + vGreen2;
		vOut += this.createDisplayJustifications(vJustOK,vMapID,vTitle);
		var vScoreCell = this.getElementById("outJUSTMISSINGSCORE"+this.aQID+pStep).innerHTML;
		vTitle = vRed1 + vLanguage["Missing"]+" "+vLanguage["Justifications"] + " ("+ vScoreCell.bold() +"):" + vRed2;
		vOut += this.createDisplayJustifications(vJustMiss,vMapID,vTitle);
		var vScoreCell = this.getElementById("outJUSTUNNECESSARYSCORE"+this.aQID+pStep).innerHTML;
		vTitle = vRed1 + vLanguage["Unnecessary"]+" "+vLanguage["Justifications"] + " ("+ vScoreCell.bold() +"):" + vRed2;
		vOut += this.createDisplayJustifications(vJustUnnec,vMapID,vTitle);
		vInnerHash["solJUSTIFICATIONS"] = vOut;
		this.writeHash2InnerHTML(cln,vInnerHash,"");
		return cln.innerHTML;
	};
	//#################################################################
	//# Nested: createUsedHelp(pAssRoot,pSA,pReadID,pWriteID,pStep,pErrorValue)
	//#################################################################
	this.createUsedHelp = function (pAssRoot,pSA,pReadID,pWriteID,pStep,pErrorValue) {
		var vText="";
		var vValue="";
		var vOutRow = this.getChildById(pAssRoot,"out"+pReadID+"USED"+this.aQID+pStep);
		vNode = this.getChildById(pSA,"in"+pWriteID+"USED"+this.aQID+pStep);
		var vCount = parseInt(vNode.value);
		if (vCount == 0) {
			vValue = "-0%";
			vOutRow.style.color = "green";
		} else {
			vOutRow.style.color = "black";
			if (pReadID!="SUG") {
				pErrorValue *= vCount;
			};
			if (this.greater(pErrorValue,1.0)) pErrorValue = 1.0;
			vValue = "-"+this.createPercent(pErrorValue);
			//this.aErrorStep["STEP"] += pErrorValue;
		};
		vText = vCount+" x "+vLanguage["USED"].toLowerCase();
		this.setStepAssValue(pStep,pAssRoot,"out"+pReadID+"USED",vText,vValue);
	};
	//#################################################################
	//# Nested: diffarrays  
	//# diffarrays(array1,array2): Returns all elements in array1 that are not also in array2
	//#################################################################
	this.diffarrays = function (x, y) {
		var diffhash=[], diff=[];
		var i=0;
		while (i != x.length) {
			diffhash[x[i]]=true;
			i++;
		}	  
		i=0;
		while (i != y.length) {
			if(diffhash[y[i]]) delete diffhash[y[i]];
			else diffhash[y[i]]=true;
			i++;
		}
		for(var k in diffhash) {
			diff.push(k);
		}
		return diff;
	};
	//#################################################################
	//# Nested: deleteProofStep(pButtonDOM)
	//#################################################################
	this.deleteProofStep = function (pButtonDOM) {
	//function deleteProofStep(pButtonDOM) {
		var vStep = pButtonDOM.getAttribute("step");
		var vNode4ID = this.getElementById("inSTEPID"+this.aQID+vStep);
		var vPos = this.getElementById("sPOSITION"+this.aQID+vStep).value;
		//alert("Delete Step="+vStep+" vNode4ID.value="+vNode4ID.value);
		var vID = this.aMappedID[vNode4ID.value];
		Check = confirm("("+vLanguage["Delete"].toUpperCase()+") "+vLanguage["Delete_Prompt"] + this.CR + vPos+". "+vLanguage["ProofStep"]+" ["+vID+"] ");
		if (Check) {
			this.moveStepOrder(pButtonDOM,this.aCount+1);
			var c = this.getStepCount();
			this.setStepCount(c-1);
			//alert(vLanguage["ProofStep"]+" ["+vNode4ID.value+"] "+vLanguage["Deleted"]);
		} else {
			//alert("CANCEL: "+ vLanguage["ProofStep"]+" ["+vNode4ID.value+"] "+vLanguage["Deleted"]);
			alert(vLanguage["Cancel"].toUpperCase()+": "+ vLanguage["ProofStep"]+" ["+vID+"] "+vLanguage["Deleted"]);
		}
    };
	//#################################################################
	//# nested: evaluateSolutionStep(pSolStep,pInnerHash)
	//#################################################################
	this.evaluateSolutionStep = function (pSolStep,pInnerHash) {
		//----Structure of SplitRec-------------------------------------------------
		// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
		var vCon = pSolStep[2];
		//alert("vCon="+vCon+" pSolStep[2]="+pSolStep[2])
		var vConHTML = "UNDEF";
		if (this.vConnection2Node[vCon]) {
			vConHTML = this.vConnection2Node[vCon].innerHTML;
		};
		pInnerHash["solCONNECTION"] = vConHTML;
		var vJust = pSolStep[3]; 
		//alert("vJust=["+vJust+"]")		
		pInnerHash["solJUSTIFICATIONS"] = this.createDisplayJustifications(vJust,this.aMappedID[pSolStep[1]]);
	};
	//#################################################################
	//# Nested: this.exportID(pID)
	//#################################################################
	this.exportID = function (pID) {
		var vID = pID;
		if (this.aSettings["remap_proofstep_IDs"] == "1") {
			//vID = this.aMappedID[pID];
			//alert("Old=["+pID+"] New=["+vID+"]");
		};
		return vID 
	};
	//#################################################################
	//# Nested: this.exportArrID(pArr)
	//#################################################################
	this.exportArrID = function (pArr) {
		var vArr = pArr;
		if (this.aSettings["remap_proofstep_IDs"] == "1") {
			//vArr = this.array2mapped(pArr);
		};
		return vArr 
	};
	//#################################################################
	//# Nested: this.exportListID(pList)
	//#################################################################
	this.exportListID = function (pList) {
		var vList = pList;
		if (this.aSettings["remap_proofstep_IDs"] == "1") {
			//vList = this.list2mapped(pList);
		};
		return vList 
	};
	//#################################################################
	//# Nested: this.exportHashID(pHash)
	//#################################################################
	this.exportHashID = function (pHash) {
		return pHash;
	};
	this.X_exportHashID = function (pHash) {
	 	//this.aStudAnsFormat = new Array("PREVIOUS","CONNECTION","ID","JUST","OPTJUST","MANSCORE","SUGUSED","ASSUSED","SELCON","SELID","SELJUST","VALUE");
		var vHash = new Array();
		for (var iID in pHash) vHash[iID] = pHash[iID];
		if (this.aSettings["remap_proofstep_IDs"] == "1") {
			vHash["ID"] = this.exportID(vHash["ID"]);
			if (vHash["PREVIOUS"] != "") {
				if (vHash["PREVIOUS"] != " ") {
					vHash["PREVIOUS"] = this.exportID(vHash["PREVIOUS"]);
				}
			};
			//this.aListID = new Array("OPTJUST","JUST","SELCON","SELID","SELJUST");	
			var i=1; //not i=0 because this.aListID[0]="OPTJUST"
			while (i != this.aListID.length) {
				var vList = this.aListID[i];
				if (vHash[vList]) {
					if (vHash[vList] != "") {
						vHash[vList] = this.list2mapped(vHash[vList]);
					};
				};
				i++;
			};
		} else {
			if (vHash["OPTJUST"] != "") {
				vHash["OPTJUST"] = this.list2original(vHash["OPTJUST"]);
			};
		};
		return vHash;
	};
	//#################################################################
	//# Method: exportHashSA2Form(pHash)
	//#################################################################	
	this.exportHashSA2Form = function (pHash) {
		var vOut = "";
		var i = 0;
		vOut +=pHash[this.aStudAnsFormat[i]];
		i++;
		while (i != this.aStudAns2DOM.length) {
			var vAtt = this.aStudAnsFormat[i];
			vOut += this.aSeparator+pHash[vAtt];	
			i++;
		};
		//vOut += this.CR;
		//alert("exportHashSA2Form():2397"+this.CR+vOut);
		return vOut;
	};
	//#################################################################
	//# Method: exportSolStep(pPrevID,pID,pCon,pJust,pJustOpt)
	//#################################################################	
	this.exportSolStep = function (pPrevID,pID,pCon,pJust,pOptJust) {
		var vOut = "";
		if (!pCon) {
			alert("exportSolStep() pCon undefined!");
			pCon=" ";
		};
		if (!pJust) pJust="";
		if (!pOptJust) pOptJust="";
		if (pJust != "") pJust = pJust.replace(/,/g,this.aComma);
		if (pOptJust != "") pOptJust = pOptJust.replace(/,/g,this.aComma);
		vOut += pPrevID+this.aSeparator;
		vOut += pID+this.aSeparator;
		vOut += pCon+this.aSeparator;
		vOut += pJust+this.aSeparator;
		vOut += pOptJust+this.CR;
		return vOut;
	};
	//#################################################################
	//# Method: exportStep(pID,pValue)
	//#################################################################	
	this.exportStep = function (pID,pValue) {
		var vOut = "";
		if ((pID != "") && (pValue != "")) {
			vOut += pID+this.aSeparator;
			vOut += pValue+this.CR;
		};
		return vOut;
	};
	//#################################################################
	//# Method: exportStudentAnswer(pXMLnode) 
	//#################################################################	
	this.exportStudentAnswer = function (pXMLnode) {
		//0:PrevID//1:Con=TYP//2:ID=MY1//3:Just=CK,DU,P1//4:OptJust//5:ManScore=0.9//6:SugUsed//7:AssUsed//8:SelCon//9:SelID//10:SelJUST//11:StepDef=(a+b)*c
		var i=0;
		var vHash = new Array(); 
		//this.aStudAnsFormat = new Array("PREVIOUS","CONNECTION","ID","JUST","OPTJUST","MANSCORE","SUGUSED","ASSUSED","SELCON","SELID","SELJUST","VALUE");
		//this.aStudAns2DOM = new Array("PREVIOUSLINK","sCONNECTION","inSTEPID","inJUSTIFICATION","optJUSTIFICATION","inMYSTEPASSESSSCORE","inSUGGESTIONSUSED","inASSESSMENTUSED","selectCONNECTION","selectSTEPID","selectJUSTIFICATION","VALUE");
		while (i != this.aStudAnsFormat.length) {
			var vAtt = this.aStudAnsFormat[i];
			vHash[vAtt]= pXMLnode.getAttribute(vAtt) || "";
			i++;
		};
		if (vHash['CONNECTION'] == "") vHash['CONNECTION'] = "???";
		//this.aListID = new Array("OPTJUST","JUST","SELCON","SELID","SELJUST");	
		i=0;
		while (i != this.aListID.length) {
			vHash[this.aListID[i]] = this.list2IMathAS(vHash[this.aListID[i]]); 
			i++;
		};
		//var vOut = "";
		//i=0;
		//while (i != this.aStudAnsFormat.length) {
		//	var vAtt = this.aStudAnsFormat[i];
		//	vOut += vHash[vAtt] + this.aSeparator;
		//	i++;
		//};
		//vOut += this.CR;
		//return vOut;
		return this.exportHashSA2Form(vHash);
	};
	//#################################################################
	//# Method: exportDefaultSA(pID)
	//#################################################################	
	this.exportDefaultSA = function (pID) {
		var vOut = "";
		vOut += this.aSeparator+"???"+this.aSeparator;
		vOut += pID+this.aSeparator;
		vOut += this.aSeparator; //Justification empty
		vOut += this.CR; //Manual Assessment
		return vOut;
	};
	//#################################################################
	//# Method: exportXMLTree  
	//#################################################################	
	this.exportXMLtree = function () {
		//----Debugging------------------------------------------
		// The following alert-Command is useful for debugging 
		//alert("XMLparser:1389 exportXMLTree()-Call")
		//-------------------------------------------------------
		var vUsedID = new Array();
		var vNode = this.aTreeXML.getElementsByTagName("EPROOF");
		var vSA = "";
		var vSA_Length = 0;
		var vChildNodes = null;
		var vName  = "";
		var vSize  = "";
		var vValue = "";
		var vVariables = new Array();
		var vErrorCode = 0;
		var vErrorMax = 2;
		var vStudAnsExported = false;
		var vDefaultSA = "";
		var vSetting = "";
		var vCR = "";
		var vCryptSol = "";
		if (vNode.length == 0) {
			alert("ERROR in XML-File, EPROOF-Definition could not be parsed!"+this.CR+"xmlparser.js:186 - exportTree()-Call");
			vErrorCode++;		
		} else if (this.greater(vNode.length,1)) {
			alert("ERROR: XML-File contains more than 1 EPROOF-Definition!"+this.CR+"xmlparser.js:188 - exportTree()-Call");
			vErrorCode++;
		};
		if (this.lower(vErrorCode,vErrorMax)) {
			var vVariableNode = vNode[0].getElementsByTagName("VARIABLE");
			//alert("VARIABLE vVariableNode.length="+vVariableNode.length);
			//---VARIABE----
			var i=0;
			while (i != vVariableNode.length) {
				vName  = vVariableNode[i].getAttribute("NAME");
				vValue  = vVariableNode[i].getAttribute("VALUE");
				vSetting += vCR + vName + this.aSeparator + vValue;
				vCR = this.CR;
				//vValue = this.decodeValue(vValue);
				//this.loadSettingsVar(vName,vValue);
				//alert("VARIABLE NAME='"+vName+"' VALUE='"+vValue+"'");
				i++;
			};
			this.getIMathById("SETTINGS").value = vSetting;
			var vVariableNode = vNode[0].getElementsByTagName("CRYPTSOL");
			//---CRYPTSOL----
			i=0;
			while (i != vVariableNode.length) {
				vCryptSol += vVariableNode[i].childNodes[0].nodeValue;
				i++;
			};
			if (vCryptSol != "") {
				this.getIMathById("ENCRYPTED").value = vCryptSol;
				this.getIMathById("SOLUTION").value = "";
			};
			//alert("exportXMLtree()-Call:1533 - vCryptSol="+vCryptSol);
			var vVariableNode = vNode[0].getElementsByTagName("VARLIST");
			//alert("VARLIST: vVariableNode.length="+vVariableNode.length);
			//---VARLIST----
			i=0;
			while (i != vVariableNode.length) {
				vValue = "";
				vName  = vVariableNode[i].getAttribute('NAME');
				vStepType = vName.replace(/_OPTIONS/,""); 
				//alert("VARLIST NAME="+vName);
				//vValue  = vVariableNode[i].childNodes[0].nodeValue;
				//------
				var vStepDefs = vVariableNode[i].getElementsByTagName("STEPDEF");
				var j=0;
				var vSolution = "";
				var vSteps = "";
				var vPrevID = " ";
				var vNextPrevID = " ";
				var vCon = ""; 
				var vID = ""; 
				while (j != vStepDefs.length) {
					vSize  = vStepDefs[j].getAttribute('SIZE');
					vID = vStepDefs[j].getAttribute('ID');
					vNextPrevID = vID;
					vValue = vStepDefs[j].getAttribute('VALUE');
					vValue = this.encodeValue(vValue);
					if (vStepType != "JUSTIFICATION") {
						if (!vUsedID[vID]) {
							vDefaultSA += this.exportDefaultSA(vID);
						};
					};
					if (vSize=="5") {
						var vPrevID_Def = vStepDefs[j].getAttribute('PREVIOUS') || "";
						//vCon = this.decodeValue(vStepDefs[j].getAttribute('CONNECTION'));
						vCon = vStepDefs[j].getAttribute('CONNECTION');
						vCon = this.decodeValue(vCon);
						//alert("vCon="+vCon + " for vID=["+vID+"] exportXMLTree():1483")
						if (vPrevID_Def != "") {
							//alert("Previous ID set ["+vPrevID_Def+"]found for vID=["+vID+"] - exportXMLtree:1477");
							vPrevID = vPrevID_Def;
						};
						var vJust    = vStepDefs[j].getAttribute('JUST') || "";
						var vOptJust = vStepDefs[j].getAttribute('OPTJUST') || "";
						if (vCon.indexOf("INK") == -1) {
							if (!vUsedID[vID]) {
							//if (vValue != "") {
								vSteps += this.exportStep(vID,vValue);
							};
							vSolution += this.exportSolStep(vPrevID,vID,vCon,vJust,vOptJust);						
						} else {
							//alert("LINKNODE for ["+vID+"]");
							vPrevID = vID;
						};
						//this.exportDefaultSA(vID);
					} else if (vSize=="2") {
						vSteps += this.exportStep(vID,vValue);
						vNextPrevID = " ";				
					} else if (vSize=="10") {
						//var vAtt = new Array("PREVIOUS","CONNECTION","JUST","OPTJUST","MANSCORE")
						vStudAnsExported = true;
						vSA_Length++;
						vSA += this.exportStudentAnswer(vStepDefs[j]);
					} else {
						alert(this.LT+"STEPDEF SIZE='"+vSize+"' ..."+this.GT+" undefined for vID=["+vID+"]! exportXMLTree:1443");
					};
					vUsedID[vID] = vID;
					vPrevID = vNextPrevID;
					j++;
				}
				//----Encoding in Function createLoopXML() in iMathAScreator.html:148
				//vValue = this.decodeValue(vValue);
				if (vStepType == "PROOFSTEP") {
					this.getIMathById("SOLUTION").value = vSolution;
				};
				this.getIMathById(vStepType).value = vSteps;
				//alert("NAME="+vName+" exportXMLTree() \n"+vSteps);
				i++;
			};
			var vNodeSA = this.getIMathById("STUDENTANSWER");
			if (!vStudAnsExported) {
				//alert("exportXMLTree():2408 Export Default Student Answer");
				vNodeSA.value = vDefaultSA;
			} else {
				//alert("exportXMLTree():2411 Export Student Answer from XML-File");
				vNodeSA.value = vSA;
			};
		};
		//alert("PRECONDITION_OPTIONS="+vVariables["PRECONDITION_OPTIONS"]);
		//alert("exportXMLTree():2621 "+vNodeSA.value)
		return vVariables;
		//------Remark: ATTRIBUTES are case sensitive-------
		// <EPROOF>
		//   <VARIABLE name='AUTHOR' value='Engelbert Niehaus'>
		//   <VARIABLE name='EMAIL' value='niehaus@uni-landau.de'>
		//   <VARIABLE name='DATE' value='17.11.2014'>
		//   <VARIABLE name='TITLE' value='Title of my Proof'>
		//   <VARIABLE name='THEOREM_APPENDIX' value='Comment or Link Wikipedia'>
		//   <VARIABLE name='AUTHORINGMODE' value='0'>
		//   <VARIABLE name='SHOW_FEEDBACK_SCORE' value='1'>
		//   <VARIABLE name='SHOW_PROOF_SOLUTION' value='1'>
		//   <VARIABLE name='SELECTBOX_PROOFSTEPS' value='1'>
		//   <VARIABLE name='ALLOW_OWN_PROOFSTEPS' value='1'>
		//   <VARIABLE name='PER_ERROR_MINUS_PERCENT' value='10'>
		//   <VARIABLE name='UNNECESSARY_PRECONDITIONS' value='3'>
		//   <VARIABLE name='UNNECESSARY_PROOFSTEPS' value='3'>
		//   <VARIABLE name='RANDOMIZE_PROOFSTEP_IDS' value='0'>
		//   <VARIABLE name='REMAP_PROOFSTEP_IDS' value='0'>
		//   <VARIABLE name='CODE_ID_I' value='4001'>
		//   <VARIABLE name='CODE_ID_II' value='4002'>
		//   <VARIABLE name='CODE_ID_III' value='4200'>
		//   <VARLIST NAME='PRECONDITION_OPTIONS'>
		//     <STEPDEF SIZE='2' ID='P1'  VALUE=' `(c_n)_{n in  NN_0} in CC^{NN_0}` sei eine komplexe Folge.' />
		//     <STEPDEF SIZE='2' ID='P2'  VALUE=' `P(z) :__eq__ sum_{n__eq__0}^{oo} c_n * (z - a)^n` eine Potenzreihe mit Entwicklungspunkt `a in CC`' />
		//     <STEPDEF SIZE='2' ID='P3'  VALUE=' `K` sei die Konvergenzmenge, d.h. `K:__eq__{ z in CC | P(z)__eq__ sum_{n__eq__0}^{oo} c_n * (z - a)^n __qu__ absolut konvergent__qu__ }`' />
		//     <STEPDEF SIZE='2' ID='P4'  VALUE=' `z_0 in K` und `w_0 in CC` mit `|w_0 - a| __lt__ |z_0 -a|`' />
		//     <STEPDEF SIZE='2' ID='P5'  VALUE=' `z_1 notin K` und  `w_1 in CC` mit `|w_1 - a| __gt__ |z_1 -a|`' />
		//   </VARLIST>
		//   <VARLIST NAME='CONCLUSION_OPTIONS'>
		//     <STEPDEF SIZE='2' ID='C1'  VALUE=' `w_0 in K`  ' />
		//     <STEPDEF SIZE='2' ID='C2'  VALUE=' `w_1 notin K`  ' />
		//   </VARLIST>
		//   <VARLIST NAME='JUSTIFICATION_OPTIONS'>
		//     <STEPDEF SIZE='2' ID='J1'  VALUE=' `sum_{n__eq__0}^{oo} c_n * (z - a)^n` and `sum_{k__eq__0}^{oo} c_k * (z - a)^k` ' />
		//     <STEPDEF SIZE='2' ID='J2'  VALUE='Satz: Ist die Reihe `sum_{k__eq__0}^{oo} b_k` konvergent in `CC`, dann ist `(b_k)_{k in NN_o} in CC^{NN_o}` eine beschr__ae__nkte Folge in `CC`.' />
		//     <STEPDEF SIZE='2' ID='J3'  VALUE='Satz: Ist die Reihe `sum_{k__eq__0}^{oo} b_k` konvergent in `CC`, dann ist `(b_k)_{k in NN_o} in CC^{NN_o}` keine Nullfolge in `CC`.' />
		//     <STEPDEF SIZE='2' ID='DU'  VALUE=' `AA_(a,b in CC) : |a + b| __lt____eq__ |a| + |b| `' />
		//     <STEPDEF SIZE='2' ID='DG'  VALUE=' `AA_(a,b,c in M) : a * (b + c) __eq__ a * b + a * c` ' />
		//     <STEPDEF SIZE='2' ID='AG'  VALUE=' `AA_(a,b,c in M) : (a + b) + c __eq__ a + (b + c)` ' />
		//     <STEPDEF SIZE='2' ID='KG'  VALUE=' `AA_(a,b in M) : a * b __eq__ b * c `' />
		//     <STEPDEF SIZE='2' ID='PG'  VALUE='`AA_{a,b in RR, b!__eq__0} AA_{n in NN} : (a/b)^n __eq__ a^n/b^n` ' />
		//   </VARLIST>
		//   <VARLIST NAME='PROOFSTEP_OPTIONS'>
		//     <STEPDEF SIZE='5' ID='S1' CONNECTION='__eq____gt__' JUST='P4' OPTJUST='' VALUE='`P(z_o) :__eq__ sum_{n__eq__0}^{oo} c_n * (z_o-a)^{n}` ist konvergent. ' />
		//     <STEPDEF SIZE='5' ID='S2' CONNECTION='__eq____gt__' JUST='P3,J2' OPTJUST='' VALUE='`EE_{C__gt__0}  AA_{n in NN_0}: | c_n * (z_o - a)^{n} | __lt__ C` und `| z_o - a |__gt__ |w_o - a| __gt____eq__ 0`. ' />
		//     <STEPDEF SIZE='5' ID='S3' CONNECTION='__eq____gt__' JUST='J2,PA' OPTJUST='' VALUE='`EE_{C__gt__0}  AA_{n in NN_0}: | c_n | * | (z_o-a)^{n} | __lt__ C`  und `| (z_o - a)^{n} | __gt__ 0`. ' />
		//     <STEPDEF SIZE='5' ID='S4' CONNECTION='__eq____gt__' JUST='P4' OPTJUST='' VALUE='`EE_{q __gt__0} :  q:__eq__| (w_o - a)/(z_o - a) | __lt__ 1` und `| c_n * (w_o - a)^{n} | __eq__ | c_n * (z_o - a)^{n} * ((w_o - a)^{n}/(z_o - a)^{n}) | __eq__ | c_n * (z_o - a)^{n} | * q^n`. ' />
		//   </VARLIST>
		//   <VARLIST NAME='STUDENTANSWER_OPTIONS'>
		//     <STEPDEF SIZE='10' ID='S1' CONNECTION='__eq____gt__' JUST='P4' OPTJUST='' VALUE='`P(z_o) :__eq__ sum_{n__eq__0}^{oo} c_n * (z_o-a)^{n}` ist konvergent. ' />
		//   </VARLIST>
	};
	//----End of Method exportTree() Definition
	//#################################################################
	//# nested: findarray(pNeedle,pHaystackArray)
	//#################################################################
	this.findarray = function (pNeedle,pArray) {
		var vReturn = -1;
		var k=0;
		while (k != pArray.length) {
			if (pArray[k] == pNeedle) {
				vReturn = k;
			}
			k++;
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: findConnectedSteps(pArray,pPrevNext)
	//#################################################################
	this.findConnectedSteps = function (pArray,pPrevNext) {
		// pPrevNext= "NEXT" or "PREV"
		var vRes = [];
		var vID = "";
		var k=0;
		var vRec=1;
		if (pPrevNext == "PREV") vRec=0;
		while (k != pArray.length) {
			//append all possible next IDs
			vID = pArray[k];
			if (this.aID2Solutions[vID]) {
				var aID = this.aID2Solutions[vID][pPrevNext+"_REC"];
				var i=0;
				while (i != aID.length) {
					vRes.push(this.aSolution[aID[i]][vRec]);
					i++;
				};
			};
			k++;
		};
		//alert("Level1 ["+pArray.join(",")+"] ("+pPrevNext+") Level2 ["+vRes.join(",")+"]")
		//return this.uniquearray(vRes);
		return this.uniquearray(vRes);
	};
	//#################################################################
	//# Nested: findSolutionIndex4ID(pID1,pID2)
	//#################################################################
	this.findSolutionIndex4ID = function (pID1,pID2) {
		var vRes = [];
		var vRec=0; //PREV=0 NEXT=1
		if (this.aID2Solutions[pID2]) {
			var aID = this.aID2Solutions[pID2]["PREV_REC"];
			var i=0;
			while (i != aID.length) {
				if (this.aSolution[aID[i]][vRec] == pID1) {
					vRes.push(aID[i]);
				};
				i++;
			};
		}
		return vRes;

	};
	//#################################################################
	//# Nested: findSolutionStep4ID(pID1,pID2)
	//#################################################################
	this.findSolutionStep4ID = function (pID1,pID2) {
		var vRes = [];
		var vRec=0; //PREV=0 NEXT=1
		if (this.aID2Solutions[pID2]) {
			var aID = this.aID2Solutions[pID2]["PREV_REC"];
			var i=0;
			while (i != aID.length) {
				if (this.aSolution[aID[i]][vRec] == pID1) {
					vRes.push(this.aSolution[aID[i]]);
				};
				i++;
			};
		}
		//alert("ID ["+pID1+"] ["+pID2+"] Result Length="+vRes.length+" ");
		//return this.uniquearray(vRes);
		return vRes;

	};
	//#################################################################
	//# Nested: form2list  
	//#################################################################
	this.form2list = function (pString) {
		var vReturn = "";
		if (pString) {
			vReturn = this.replaceString(pString,this.aComma,",");
		};
		return vReturn;
	};
};
