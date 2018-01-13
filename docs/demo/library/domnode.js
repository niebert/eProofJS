
//#################################################################
//# Method: createDIV(pClassName,pStep)  
//#################################################################
function createDIV(pClassName,pStep) {
	var vNode = document.createElement("DIV");
	vNode.className = pClassName;
	vNode.id = pClassName+pStep;
	vNode.setAttribute("step",pStep);
	return vNode;
}
//#################################################################
//# Method: createOUTNODE(pClassName,pStep)  
//#################################################################
function createOUTNODE(pClassName,pStep) {
	return createOUTNODE2(pClassName,pClassName,pStep);
}
//#################################################################
//# Method: createOUTNODE2(pClassName,pStep)  
//#################################################################
function createOUTNODE2(pClassName,pNameID,pStep) {
	var vNode = document.createElement("OUTNODE");
	vNode.className = pClassName;
	vNode.id = pNameID+pStep;
	vNode.setAttribute("step",pStep);
	return vNode;
}
//#################################################################
//# Method: createINPUT(pType,pName,pStep,pLabel,pCall,pVisible)  
//#################################################################
function createInputDOM(pType,pName,pStep,pLabel,pCall,pStyle) {
	var vNode = document.createElement("INPUT");
	vNode.className = pName;
	vNode.id = pName+pStep;
	vNode.setAttribute("type",pType);
	vNode.setAttribute("name",pName+pStep);
	vNode.setAttribute("value",pLabel);
	vNode.setAttribute("style",pStyle);
	vNode.setAttribute("onchange",pCall);
	return vNode;
}
//#################################################################
//# Method: createButton(pName,pStep,pLabel,pCall,pVisible)  
//#################################################################
function createButton(pName,pStep,pLabel,pCall,pVisible) {
	var vNode = createInputDOM("button",pName,pStep,pLabel,pCall,pVisible);
	vNode.setAttribute("onclick",pCall);
	return vNode;
}
//#################################################################
//# Method: createViewID(pName,pStep,pValue)  
//#################################################################
function createViewID(pTAG,pClassName,pNameID,pStep,pValue) {
	var vNode = document.createElement(pTAG);
	vNode.appendChild(document.createTextNode("["));
	var vIDNode = createOUTNODE2(pClassName,pNameID,pStep);
	vIDNode.appendChild(document.createTextNode(pValue));
	vNode.appendChild(document.createTextNode("]"));
	return vNode;
}
//#################################################################
//# Method: createEditNodes(pStep,pNode,pCount)   
//#################################################################
function createEditNodes(pStep,pNode,pCount,pAllSteps) {
	var vRootNode    = null;
	var vParentNode  = null;
	var vCreatedNode = null;
	//----ROOT NODE: EDIT STUDENTANSWER---------------------
	vRootNode = createDIV("editSTUDENTANSWER",pStep);
	vParentNode = vRootNode;
	//---POSTION-----
	vCreatedNode =createOUTNODE("outnodePOSITION",pStep);
	vCreatedNode.innerHTML = setStepPosition(pStep,pCount);
	vParentNode.appendChild(vCreatedNode);
	//---[+]-----
	vCreatedNode = createButton("bUseStep",pStep," + ","appendStep("+pStep+")","visibility:hidden");
	vParentNode.appendChild(vCreatedNode);
	//---[Connection]-----
	vCreatedNode =createOUTNODE("outnodeCONNECTION",pStep);
	vCreatedNode.innerHTML = setStepConnection(vNr,pCount);	
	vParentNode.appendChild(vCreatedNode);
	//---[EDIT]-----
	vCreatedNode = createButton("bEdit",pStep,"EDIT","toggleEdit("+pStep+")","visibility:visible");
	vParentNode.appendChild(vCreatedNode);
	//---VIEWID----
	vCreatedNode = createViewID("b","VIEWID","outVIEWID",pStep,"??ID??"); 
	vParentNode.appendChild(vCreatedNode);	
	//---[STEO SELECT]-----
	vCreatedNode = createOUTNODE("outnodeSTEPSELECT",pStep);
	vCreatedNode.innerHTML = setStepDefinition(vNr,pCount,pAllSteps,pNode.id);
	//---[X]-----
	vCreatedNode = createButton("bDelete",pStep," X ","deleteProofStep("+vNr+","+pCount+")","color:red");
	vParentNode.appendChild(vCreatedNode);
	//---VIEW CHECKBOXES---
	vCreatedNode = createInputDOM("checkbox","cVIEWJUSTIFICATION",pStep,"VIEW","changeViewJustification("+pStep+")","display:none");
	//vCreatedNode.setAttribute("checked","checked");
	vParentNode.appendChild(vCreatedNode);	
	vCreatedNode = createInputDOM("checkbox","cEDITJUSTIFICATION",pStep,"EDIT","changeViewJustification("+pStep+")","display:none");
	vParentNode.appendChild(vCreatedNode);	
	//---[Justifications]:---
	vCreatedNode = createButton("bJUSTIFICATION",pStep,vLanguage["Justifications"],"toggleJustification("+pStep+")","visibility:visible");
	vParentNode.appendChild(vCreatedNode);
	vCreatedNode = createInputDOM("text","inJUSTIFICATION",pStep,"EDIT","changeEditJustification("+pStep+")","visibility:visible");
	vCreatedNode.setAttribute("size","15");
	vParentNode.appendChild(vCreatedNode);
	//---inSTEPID---
	vCreatedNode = createInputDOM("text","inSTEPID",pStep,pNode.id,"updateStep("+pStep+")","display:none");
	vCreatedNode.setAttribute("size","3");
	vParentNode.appendChild(vCreatedNode);
	//---inSTEPDEF---
	vCreatedNode = createInputDOM("text","inSTEPDEF",pStep,pNode.childNodes[0].nodeValue,"updateStep("+pStep+")","display:none");
	vCreatedNode.setAttribute("size","3");
	vParentNode.appendChild(vCreatedNode);
	//---STEP=pStep---
	vCreatedNode = createInputDOM("text","STEP",pStep,pStep,"alert(this.value)","display:none");
	vCreatedNode.setAttribute("size","3");
	vParentNode.appendChild(vCreatedNode);
	//---------------------------------------------------
	alert(vRootNode.innerHTML);
			
	return vRootNode;
}
//#################################################################
//# Method: getAnswerItemHTML(pList)  
//#################################################################
function X_getAnswerItemHTML(pList,pJustList,pNrStart,pCount,pAllSteps) {
	//var vContent = "Length of List="+pList.length;
	var vName = "";
	var vContent = "";
	var vNr=pNrStart;
	var vContentNode = document.createElement("P");
	var vRootNode    = vContentNode;
	var vParentNode  = vContentNode;
	var vCreatedNode = null;
	var vNode        = null;
	var vString = "";
	var k=0;
	while (lower(k,pList.length)) if (pList[k].id) {
	    vNr++;
	    vStepMap["STUDENTANSWER"+vNr] = vNr;
		//vCreatedNode = document.createTextNode("Hello World"); 
		//vParentNode.appendChild(vCreatedNode);
		//--------------------------------------------------
		//---ROOT: STUDENTANSWER----------------------------
		vRootNode = createDIV("STUDENTANSWER",vNr);
		vContentNode.appendChild(vRootNode);
		//--------------------------------------------------
		//----ROOT: EDIT STUDENTANSWER----------------------
		vCreatedNode = createEditNodes(vNr,pList[k],pList.length,pAllSteps);
		vRootNode.appendChild(vCreatedNode);	
		//--------------------------------------------------
		//----ROOT: STEPEDITOR------------------------------
		vCreatedNode = createDIV("STEPEDITOR",vNr);
		vCreatedNode.setAttribute("style","display:none");
		vRootNode.appendChild(vCreatedNode);	
		vParentNode = vCreatedNode;
		//---Edit TEXTAREA---
		vCreatedNode = document.createElement("textarea");
		vCreatedNode.className = vEditorID;
		vCreatedNode.id = vEditorID+vNr;
		vCreatedNode.setAttribute("style","width:98%");
		vCreatedNode.setAttribute("rows","9");
		vCreatedNode.setAttribute("onkeyup","updateTextarea("+vNr+")");
		vParentNode.appendChild(vCreatedNode);	
		//---Processed Edit String---
		vCreatedNode = createInputDOM("text","inSTEPDEF",vNr,pList[k].childNodes[0].nodeValue,"updateStepEdit("+vNr+")","visibility:visible");
		vCreatedNode.setAttribute("size","92");
		vParentNode.appendChild(vCreatedNode);
		//--------------------------------------------------
		//----ROOT: OUT ID and STEP-------------------------
		vCreatedNode = createDIV("outIDandSTEP",vNr);
		vCreatedNode.setAttribute("style","visibility:visible");
		vRootNode.appendChild(vCreatedNode);	
		vParentNode = vCreatedNode;
		//--------------------------------------------------
		vCreatedNode = createOUTNODE('outSTEP','outSTEP',vNr);
		vCreatedNode.inneHTML = "("+vNr+") "+vSpace + "`???` "+ vSpace + getStepDef(pList[k]);
		vParentNode.appendChild(vCreatedNode);
		//--------------------------------------------------
		//----ROOT: JUSTIFICATION-------------------------
		vCreatedNode = createDIV("dJUSTIFICATION",vNr);
		vCreatedNode.setAttribute("style","visibility:visible");
		vRootNode.appendChild(vCreatedNode);	
		vParentNode = vCreatedNode;
		//---VIEW JUSTIFICATION---
		vCreatedNode = createDIV("dVIEWJUSTIFICATION",vNr);
		vCreatedNode.setAttribute("style","display:none");
		vCreatedNode.innerHTML = getJustificationHTML(pJustList,pAllSteps,vNr,pCount);
		vParentNode.appendChild(vCreatedNode);	
		//---EDIT JUSTIFICATION---
		vCreatedNode = createDIV("dEDITJUSTIFICATION",vNr);
		vCreatedNode.setAttribute("style","display:none");
		vCreatedNode.innerHTML = getJustificationCheckboxHTML(pJustList,pAllSteps,vNr,pCount);
		vParentNode.appendChild(vCreatedNode);	
		//--------------------------------------------------
		//alert("innerHTML="+vContentNode.innerHTML);
		//--------------------------------------------------
		k++;
	};
	return vContentNode.innerHTML;
}
