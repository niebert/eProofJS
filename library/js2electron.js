//#################################################################
//# Javascript Class:         EProof Electron  Function Mapper
//#   Method Definition File: js2electron.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               24.2.2015
//# last modifications    __DATE__
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//#################################################################
     const fs    = require('fs');
     const exec = require('child_process').exec;
     const spawn = require('child_process').spawn;
     const child = require('child_process').execFile;
     const shell = require('electron').shell;
     //const remote  = require('remote');
     const remote = require('electron').remote;
     var app    = remote.app;
     var dialog = remote.dialog;
     var vPathSeparator = "/";
     //var vOS = getOperatingSystem(); // is on Linux/Mac "/" on Windows "Backslash"
     //if (vOS == "Windows") {
    //   vPathSeparator = "\\";
     //};
     //var vPandocDocs = app.getPath('documents')+vPathSeparator+"PanDoc";

//----IPC Electron triggered from main.JS-e-Proof
require('electron').ipcRenderer.on('menucall', function(event, pMenuCall) {
     console.log("MENU CALL:" + pMenuCall);  // Prints "whoooooooh!"
     //alert("CALL: "+pMenuCall);
     eval(pMenuCall);
   });

function appendElectronMethods_EProof__SID__ () {
  //alert("appendElectronMethods()-Call");
  //#################################################################
  //## OVERWRITE: clickLoad()
  //#################################################################
  this.clickLoad_JS = this.clickLoad;

  this.clickLoad = function () {
    var vID = "tLOAD"+this.aQID;
    //var vID = "COPYTOLOAD"+this.aQID;
    //alert("Click Electron Load ["+vID+"]");
    //this.clickLoad_JS();
    this.openOpenDialog(vID);
  };

  //#################################################################
  //## initHTML()
  //#################################################################
  this.initHTML = function () {
    var vHash = {};
    vHash["THEOREMLABEL"] = "LOAD";
  	vHash["THEOREMTITLE"] = "XML-File";
    vHash["PRECONDITIONLIST"] = "<img src='spinner.gif'>";
    vHash["CONCLUSIONLIST"] = "<img src='spinner.gif'>";
    vHash["THEOREMAPPENDIX"] = "";
    vHash["USEDSTEPS"] = "";
    vHash["UNUSEDSTEPS"] = "";
    vHash["JUSTIFICATIONLIST"] = "";
    vHash["PROOFSTEPLIST"] = "";
    this.writeHash2InnerHTML(vHash)
  };
  //#################################################################
  //## openOpenDialog(pPath)
  //#################################################################
  this.openOpenDialog = function (pID) {
    var vEProof = this;
    dialog.showOpenDialog(  { filters: [
          { name: 'e-Proof XML', extensions: ['xml'] }
        ]}, function (fileNames) {
          // fileNames is an array that contains all the selected
         if(fileNames === undefined){
              console.log("No file selected");
         } else {
              readFile(fileNames[0],pID,vEProof);
         };
       });
  };

}; //--END Definition: appendElectronMethods()--


//#################################################################
//## readFile()
//#################################################################
function readFile(filepath,pID,pEProof){
  fs.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            };
            // Change how to handle the file content
            var vLoadDOM = document.getElementById(pID);
            if (vLoadDOM) {
              //pEProof.clickLoad();
              vLoadDOM.value = data;
              //pEProof.clickLoadXML();
              pEProof.initLoad();
              pEProof.initHTML();
              alert("Load XML - please wait!");
              var vRootID = "EPROOF__QID__";
          		var vRootDOM = document.getElementById(vRootID);
              pEProof.load('__QID__','__THISQ__',vRootDOM,vRootID,'ELECTRON');
              pEProof.updateAllMath();
              pEProof.updateMathJustification();
              console.log("File "+filepath+" loaded into textarea ["+pID+"]");
            } else {
              console.log("Error Loading XML File. Node ["+pID+"] does not exist!");
            };
            //console.log("The file content is : " + data);
      });
};
