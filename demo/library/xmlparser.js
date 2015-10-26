//#################################################################
//# Javascript Class: XMLparser()
//#       SuperClass: 
//#   Class Filename: XMLparser.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               22.10.2014             
//# last modifications    22.10.2014             
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="myclass.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class XMLparser() 
// Call the constructor for creating an instance of class XMLparser
// by the following command in HTML-file that imports this class
// var vMyInstance = new XMLparser();
//---------------------------------------------------------------------

function XMLparser () {
	// no superclass defined

	//---Attributes-------------------------
	this.aParent = null;
	this.aText = "";
	this.aTreeXML = null;
	this.aVariables = new Array();
	//---Methods----------------------------
	this.init			 = init_XMLparser;
	this.init_parent	 = init_parent_XMLparser;
	this.parse			 = parse_XMLparser;
	this.pre_parse		 = pre_parse_XMLparser;
	this.exportTree		 = exportTree_XMLparser;
	this.handleNode		 = handleNode_XMLparser;
	this.encodeValue	 = encodeValue_XMLparser;
	this.decodeValue	 = decodeValue_XMLparser;

	//--------------------------------------
}
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of XMLparser, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'XMLparser'
// the function name is extended with '_XMLparser'.
// This is done to avoid name space conflicts, if you overwrite a 
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       XMLparser.my_method()
// The method definitions are as follows
//   function my_method_XMLparser(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "XMLparser()" defined as JS functions 
//---------------------------------------------------------------------
						
//#################################################################
//# Method: init  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function init_XMLparser(pText) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:init(pText)-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    vMyInstance.init(pText);
	//-------------------------------------------------------
	this.aText = pText;
	this.aTreeXML = null;
	this.aVariables = new Array();

}
//----End of Method init Definition

//#################################################################
//# Method: init_parent  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function init_parent_XMLparser(pParent) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:init(pText)-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    vMyInstance.init(pText);
	//-------------------------------------------------------
	this.aParent = pParent;
}
//----End of Method init Definition
						
//#################################################################
//# Method: pre_parse  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function pre_parse_XMLparser(pText) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:checkXML(pText)-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    vMyInstance.pre_parseL(pText);
	//-------------------------------------------------------

}
//----End of Method checkXML DefcheckXMLion

						
//#################################################################
//# Method: parse  
//#    used in Class: XMLparser
//#                
//# Comment: if this.aTAG="BODY" then this.aText contains the block                       
//#          between <BODY> and </BODY>. Parsing append all 
//#          Children to this.aChilden. aTAG="" means block is 
//#          a string without XML-Tags.
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function parse_XMLparser(pXMLstring) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:parse()-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    vMyInstance.parse();
	//-------------------------------------------------------
	//alert("xmlparser.js:153 - pXMLstring="+pXMLstring+"");
	if (pXMLstring) {
		this.aText = pXMLstring;
	};
	if (window.DOMParser) {
    	parser=new DOMParser();
    	this.aTreeXML = parser.parseFromString(this.aText,"text/xml");
	} else {
	// Internet Explorer
	    this.aTreeXML = new ActiveXObject("Microsoft.XMLDOM");
    	this.aTreeXML.async=false;
	    this.aTreeXML.loadXML(this.aText);
	}
}
//----End of Method parse Definition

						
//#################################################################
//# Method: exportTree  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function exportTree_XMLparser() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:exportTree()-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    vMyInstance.exportTree();
	//-------------------------------------------------------
	var vNode = this.aTreeXML.getElementsByTagName("EPROOF");
	var vChildNodes = null;
	var vName  = "";
	var vSize  = "";
	var vValue = "";
	var vVariables = new Array();
	var vErrorCode = 0;
	var vErrorMax = 2;
	if (vNode.length == 0) {
		alert("ERROR in XML-File, <EPROOF>-Definition could not be parsed!\nxmlparser.js:186 - exportTree()-Call");
		vErrorCode++;		
	} else if (vNode.length > 1) {
		alert("ERROR: XML-File contains more than 1 <EPROOF>-Definition!\nxmlparser.js:188 - exportTree()-Call");
		vErrorCode++;
	};
	if (vErrorCode < vErrorMax) {
		var vVariableNode = vNode[0].getElementsByTagName("VARIABLE");
		//alert("VARIABLE vVariableNode.length="+vVariableNode.length);
		//---VARIABE----
		for (var i=0;i<vVariableNode.length;i++) {
			vName  = vVariableNode[i].getAttribute("NAME");
			vValue  = vVariableNode[i].getAttribute("VALUE");
			vValue = this.decodeValue(vValue);
			vVariables[vName] = vValue;
			//alert("VARIABLE NAME='"+vName+"' VALUE='"+vValue+"'");
			
		};
		var vVariableNode = vNode[0].getElementsByTagName("VARLIST");
		//alert("VARLIST: vVariableNode.length="+vVariableNode.length);
		//---VARLIST----
		for (var i=0;i<vVariableNode.length;i++) {
			vValue = "";
			vName  = vVariableNode[i].getAttribute('NAME');
			//alert("VARLIST NAME="+vName);
			//vValue  = vVariableNode[i].childNodes[0].nodeValue;
			//------
			var vStepDefs = vVariableNode[i].getElementsByTagName("STEPDEF");
			for (var j=0;j<vStepDefs.length;j++) {
				vSize  = vStepDefs[j].getAttribute('SIZE');
				if (vSize=="5") {
					vValue += vStepDefs[j].getAttribute('ID')+"#";
					vValue += vStepDefs[j].getAttribute('CONNECTION')+"#";
					vValue += vStepDefs[j].getAttribute('JUST')+"#";
					vValue += vStepDefs[j].getAttribute('OPTJUST')+"#";
					vValue += vStepDefs[j].getAttribute('VALUE')+"\n";
				} else if (vSize=="2") {
					vValue += vStepDefs[j].getAttribute('ID')+"#";
					vValue += vStepDefs[j].getAttribute('VALUE')+"\n";
				} else {
					alert("<STEPDEF SIZE='"+vSize+"' ...> undefined!\nxmlsparser.js:230");
				}
			}
			//----Encoding in Function createLoopXML() in iMathAScreator.html:148
			vValue = this.decodeValue(vValue);
			vVariables[vName] = vValue;
			//alert("NAME="+vName+" VALUE="+vValue);
		}
	};
	//alert("PRECONDITION_OPTIONS="+vVariables["PRECONDITION_OPTIONS"]);
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
	//   <VARLIST name='PRECONDITION_OPTIONS'>
	// P1#First Precondition `int_a^b f(x) dx`
	// P2#Second Precondition `sqrt(x)`
	// P3#Third Precondition `f(x):=sum_{n=0}^{oo} q^{n+1}`
	//   </VARLIST>
	//   <VARLIST name='CONCLUSION_OPTIONS'>
	// C1#First Conclusion `L((x_1),(x_2)) := sqrt{x_1^2 +x_2^2}`
	// C2#Second Conclusion `oint_a^b f(x) d mu(x)`
	//   </VARLIST>
	//   <VARLIST name='JUSTIFICATION_OPTIONS'>
	// J1#Justification I 
	// J2#Justification II
	// DG# `AA_(a,b,c in M) : a * (b + c) = a * b + a * c` 
	// AG# `AA_(a,b,c in M) : (a + b) + c = a + (b + c)` 
	// KG# `AA_(a,b in M) : a * b = b * c `
	//   </VARLIST>
	//   <VARLIST name='PROOFSTEP_OPTIONS'>
	// S1# #P1,P3#J2#ProofStep 1 `f(x)`
	// S1_F1#=>#P1,P3##ProofStep 1 False 1 `sin(x^2)`
	// S2#=>#P1,P3#J2#ProofStep 2 `prod_{k=1}^{oo} p_k^{alpha_k}`
	// S3#<#J1,P3,P2#J3#ProofStep 3 `((a,b),(c,d))`
	// S4#=#J3,P2#J3#ProofStep 4 `f(x) := {(x^2,"mit "x>=0),(-x,"mit " x<0 ):}`
	//   </VARLIST>
	// </EPROOF>
	// These are s ome typical DOM properties:
	// 
	//     x.nodeName - the name of x
	//     x.nodeValue - the value of x
	//     x.parentNode - the parent node of x
	//     x.childNodes - the child nodes of x
	//     x.attributes - the attributes nodes of x
	// 
	// Note: In the list above, x is a node object.
	// XML DOM Methods
	// 
	//     x.getElementsByTagName(name) - get all elements with a specified tag name
	//     x.appendChild(node) - insert a child node to x
	//     x.removeChild(node) - remove a child node from x
	//     x.getAttribute(attrib_name) - get the value of attribute with attrib_name";
	// Note: In the list above, x is a node object.
	//Gets TYPE
	// vQNode.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue;

	// x=xmlDoc.getElementsByTagName('book');
	// 
	// for (i=0;i<x.length;i++) {
	//   document.write(x[i].getAttribute('category'));
	//   document.write("<br>");
	// }

	
	// var str = '<books>' +
	// 			  '  <book title="A Tale of Two Cities"/>' +
	// 			  '  <book title="1984" category="fiction"/>' +
	// 			  '</books>';
	// 	
	// 	var vXMLparser = new XMLparser();
	// 	var XMLdoc = vXMLparser.parse(str);
	// 	
	// 	var bookEls = XMLdoc.getRootElement().getChildElements();
	// 	
	// 	for (var i=0; i<bookEls.length; i++) {
	// 		var bookEl = bookEls[i];
	// 		// alerts "Element name is 'book' and book title is '...'"
	// 		alert("Element name is '" + bookEl.getName() + 
	// 			"' and book title is '" + 
	// 			bookEl.getAttributeValue("title") + "'"
	// 		);
	// 	}
}
//----End of Method exportTree() Definition
						
//#################################################################
//# Method: handleNode  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function handleNode_XMLparser(pNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:handleNode()-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    vMyInstance.handleNode();
	//-------------------------------------------------------
	if (pNode.nodeName == "EPROOF") {
	} else if (pNode.nodeName == "VARIABLES") {
	} else {
	};
}
//----End of Method handleNode() Definition
			
//#################################################################
//# Method: decodeValue  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function decodeValue_XMLparser(pValue) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:decodeValue()-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    pValue = vMyInstance.decodeValue(pValue);
	//-------------------------------------------------------
	pValue = pValue.replace(/__eq__/g,"=");
	pValue = pValue.replace(/__gt__/g,">");
	pValue = pValue.replace(/__lt__/g,"<");
	pValue = pValue.replace(/__qu__/g,"\"");
	pValue = pValue.replace(/__ap__/g,"\'");
	pValue = pValue.replace(/__ae__/g,"ä");
	pValue = pValue.replace(/__oe__/g,"ö");
	pValue = pValue.replace(/__ue__/g,"ü");
	pValue = pValue.replace(/__AE__/g,"Ä");
	pValue = pValue.replace(/__OE__/g,"Ö");
	pValue = pValue.replace(/__UE__/g,"Ü");
	pValue = pValue.replace(/__sz__/g,"ß");
	return pValue;
}
//----End of Method decodeValue() Definition

			
//#################################################################
//# Method: encodeValue  
//#    used in Class: XMLparser
//#                
//# Comment:                        
//#
//# created               22.10.2014             
//# last modifications    22.10.2014             
//#################################################################

function encodeValue_XMLparser(pValue) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging 
	//alert("XMLparser.js:decodeValue()-Call")
	//----Create Object/Instance of XMLparser----
	//    var vMyInstance = new XMLparser();
	//    pValue = vMyInstance.encodeValue(pValue);
	//-------------------------------------------------------
	pValue = pValue.replace(/</g,"__lt__");
	pValue = pValue.replace(/>/g,"__gt__");
	pValue = pValue.replace(/=/g,"__eq__");
	pValue = pValue.replace(/"/g,"__qu__");
	pValue = pValue.replace(/\\[']/g,"__ap__");
	pValue = pValue.replace(/'/g,"__ap__");
	pValue = pValue.replace(/([^\\])'/g,"$1\\\'");
	pValue = pValue.replace(/ä/g,"__ae__");
	pValue = pValue.replace(/ö/g,"__oe__");
	pValue = pValue.replace(/ü/g,"__ue__");
	pValue = pValue.replace(/Ä/g,"__AE__");
	pValue = pValue.replace(/Ö/g,"__OE__");
	pValue = pValue.replace(/Ü/g,"__UE__");
	pValue = pValue.replace(/ß/g,"__sz__");
	return pValue;
}
//----End of Method decodeValue() Definition
