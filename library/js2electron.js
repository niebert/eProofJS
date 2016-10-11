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
     const child_process = require('child_process');
     const exec = child_process.exec;
     const spawn = child_process.spawn;
     const child = child_process.execFile;
     const electron = require('electron');
     const shell = electron.shell;
     //const path  = require('path');
     //const remote  = require('remote');
     const remote = electron.remote;
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
  this.aFilenameXML = "";
  //#################################################################
  //## OVERWRITE: default methods()
  //#################################################################
  this.clickLoad_JS         = this.clickLoad;
  this.saveOfflineHTML_JS   = this.saveOfflineHTML;
  this.getJavascriptLibs_JS = this.getJavascriptLibs;
  this.getStylesCSS_JS      = this.getStylesCSS;
  //#################################################################
	//# Nested: initElectron()
	//#################################################################
	this.initElectron = function () {
    console.log("initElectron() init FilePath!");
    //init eProof Path

    write2value("tMAINPATH"+this.aQID, this.checkEProofDir());
    // init Library Path
    write2value("tLIBPATH"+this.aQID,this.checkEProofLibraries());
    write2value("tCSSPATH"+this.aQID,this.checkEProofCSS());
    var vSubDir = "Algebra";
    vSubDir = this.getLocalStorage("tSUBDIRECTORY"+this.aQID,vSubDir);
    write2value("tSUBDIRECTORY"+this.aQID,vSubDir);
    var vID = "MATHJAX_PATH"+this.aQID;
    var vPath = this.checkMathJaxDir();
    //alert("vID:'"+vID+"' vPath:'"+vPath+"'");
    write2value(vID,vPath);
  };
  //#################################################################
	//# Nested: appendPathSlash (pPath)
	//#################################################################
	this.appendPathSlash = function (pPath) {
      pPath = pPath.replace(/\\/g, "/");
			var vLen = pPath.length;
			if (vLen > 3) {
				if (pPath.lastIndexOf("/") < (vLen-1)) {
					pPath += getPathSeparator();
				};
			};
			return pPath
	};
	//#################################################################
	//# Nested: saveOfflineHTML()
	//#################################################################
	this.saveOfflineHTML = function (pEProofPath) {
    var vSep = getPathSeparator();
    //var vOut = this.getWeeblyEProof("library/","../MathJax/","ASCIIMath","__QID__","__THISQ__","__SID__","DEFAULT","HTMLROOT");
  	//var vHeader = this.getHeaderHTML();
  	//var vTail = this.getTailHTML();
    var vEProofPath    = pEProofPath || this.getEProofExportPath();
    var vLibPath       = this.getValueDOM("tLIBPATH"+this.aQID);
    var vCSSPath       = this.getValueDOM("tCSSPATH"+this.aQID);
    var vMathJaxPath   = this.getValueDOM("MATHJAX_PATH"+this.aQID);
    var vMathJaxFormat = this.getValueDOM("SET_MathFormat");
    var vLibRelative     = getRelativePath(vEProofPath, vLibPath) || "library";
    var vCSSRelative     = getRelativePath(vEProofPath, vCSSPath) || "css";
    var vMathJaxRelative = getRelativePath(vEProofPath, vMathJaxPath) || "."+vSep+"MathJax";
    vCSSRelative = this.appendPathSlash(vCSSRelative);
    vMathJaxRelative = this.appendPathSlash(vMathJaxRelative);
    vLibRelative = this.appendPathSlash(vLibRelative);
    console.log("this.saveOfflineHTML() vCSSRelative='"+vCSSRelative+"'");
    console.log("this.saveOfflineHTML() vLibRelative='"+vLibRelative+"'");
    console.log("this.saveOfflineHTML() vMathJaxRelative='"+vMathJaxRelative+"'");
    var vCheck_MathJax_Local = document.getElementById("checkMATHJAX_LOCAL"+this.aQID);
    if (!(vCheck_MathJax_Local.checked)) {
      vMathJaxRelative = null;
    };
  	var vOut = this.getWeeblyEProof(vLibRelative,vMathJaxRelative,vMathJaxFormat,"__QID__","__THISQ__","__SID__","DEFAULT","HTMLROOT",vCSSRelative);
  	this.getElementById("tSAVEXML"+this.aQID).value = vOut;
  };
  //this.clickSaveXML_JS = this.clickSaveXML;
  //this.clickCloseControl_JS = this.clickCloseControl;
  //#################################################################
  //# Nested: clickLoad()
  //#################################################################
  this.getEProofExportPath = function () {
    var vSep = getPathSeparator();
    var vEProofPath    = this.getValueDOM("tMAINPATH"+this.aQID);
    var vSubdirectory  = this.getValueDOM("tSUBDIRECTORY"+this.aQID);
    console.log("getEProofExportPath(): SUBDIRECTORY='"+vSubdirectory+"'");
    return vEProofPath + vSep + vSubdirectory;
  };
  //#################################################################
  //# Nested: clickLoad()
  //#################################################################
  this.clickLoad = function () {
    var vID = "tLOAD"+this.aQID;
    //var vID = "COPYTOLOAD"+this.aQID;
    //alert("Click Electron Load ["+vID+"]");
    //this.clickLoad_JS();
    this.openOpenDialog(vID);
  };
  //#################################################################
  //# Nested: getFilenameType()
  //#################################################################
  this.getFilename4Type = function (pType,pPath) {
    var vPath = pPath || "";
    var vTitle = this.aSettings["Theorem_Label"] + "_" + this.aSettings["Theorem_Title"];
    vTitle = vTitle.replace(/ /g,"_");
    vTitle = vTitle.replace(/[^A-Za-z_]/g,"_");
    var vExtension = "";
    switch (pType) {
      case "XML":
        vExtension = ".xml";
        break;
      case "HTML":
        vExtension = ".html";
        break;
      case "IMathAS":
        vExtension = ".imas";
        break;
      default:
        vExtension = ".eproof";
    };
    return vPath + vTitle + vExtension;
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
    this.writeHash2InnerHTML(vHash);
  };
  //#################################################################
	//# Nested: getJavascriptLibs()
	//#################################################################
  this.getJavascriptLibs = function(pPathJS) {
    var vJS = "";
    var vCheckBox = this.getElementById("checkLIBPATH"+this.aQID);
    if (vCheckBox.checked) {
      vJS = this.getJavascriptLibs_JS(pPathJS);
    } else {
      vJS += this.LT+"script type=\"text/javascript\" "+this.GT+this.CR;
      vJS +=  this.getLibraryCode("language.js");
      vJS +=  this.getLibraryCode("eproofmain.js");
      vJS +=  this.getLibraryCode("eproofmeth1.js");
      vJS +=  this.getLibraryCode("eproofmeth2.js");
  		vJS += this.CR + this.LT+"/script"+this.GT+this.CR;
    };
    return vJS
  };
  //#################################################################
	//# Nested: getStylesCSS()
	//#################################################################
  this.getStylesCSS = function(pPathCSS) {
    var vCSS = "";
    var vCheckBox = this.getElementById("checkLIBPATH"+this.aQID);
    if (vCheckBox.checked) {
      vCSS = this.getStylesCSS_JS(pPathCSS);
    } else {
      vCSS += this.LT+"style"+this.GT+this.CR;
      vCSS +=  this.getStyleCode("imathas.css");
  		vCSS += this.CR + this.LT+"/style"+this.GT+this.CR;
    };
    return vCSS
  };
  //#################################################################
  //## openOpenDialog(pPath)
  //#################################################################
  this.getLibraryCode  = function(pLibName) {
    var vSep = getPathSeparator();
    var vCode = "\n//undefined code for '"+pLibName+"'. ";
    var vFilepath = "."+vSep+"library"+vSep+pLibName;
    vCode = fs.readFileSync( vFilepath , 'utf8');
    //alert(vCode.substr(0,100));
    return vCode;
  }
  //#################################################################
  //## openOpenDialog(pPath)
  //#################################################################
  this.getStyleCode  = function(pCSSName) {
    var vSep = getPathSeparator();
    var vCode = "\n//undefined Style Sheet CSS for '"+pCSSName+"'. ";
    var vFilepath = "."+vSep+"css"+vSep+pCSSName;
    vCode = fs.readFileSync( vFilepath , 'utf8');
    //alert(vCode.substr(0,100));
    return vCode;
  }
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
            vEProof.aFilenameXML = fileNames[0];
            readFile(fileNames[0],pID,vEProof);
         };
       });
  };

  //#################################################################
  //# Nested: renameCharCounter1()
  //#################################################################
  this.openWindow = function (pURL) {
    //window.open(pURL);
    console.log("openWindow('"+pURL+"')");
    shell.openExternal(pURL);
  }

  //#################################################################
  //## saveFile_Menu()
  //#################################################################
  this.saveFile_Menu = function () {
    if (this.aFilenameXML == "") {
        console.log("aFilenameXML is undefined");
    } else {
        console.log("aFilenameXML: "+this.aFilenameXML);

    };
  };
  //#################################################################
  //## saveAsOpenDialog()
  //#################################################################
  this.saveAsOpenDialog = function () {
      console.log("Save As... Dialog called!");
  };

  //#################################################################
  //# Nested: saveEProof2Filesystem()
  //#################################################################
  this.saveEProof2Filesystem = function () {
      console.log("saveEProof2Filesystem()");
      //alert("Only Electron Application have access to File System for Saving Files");
      //load templates/eProofJS.html
      //replace the following variable
        // MathJaxPath: ___MATHJAX_PATH___
        //eProof XML:   ___EPROOF_SOURCE_XML___    Files: current XML-File of loaded edited eProof
       // Libraries JS: ___JAVASCRIPT_LIBRARIES___ Files: language.js, eproofmain.js, eproofmeth1.js, eproofmeth2.js
       // Style Sheets: ___CSS_FILES___ File: ./css/imathas.css
       var vID = "tSAVEXML"+ this.aQID;
       var vContent = this.getValueDOM(vID);
       var vType = this.getValueDOM("sFILEFORMAT"+ this.aQID);
       if (vContent === null) {
         console.log("saveEProof2Filesystem() cancelled due to ["+vID+"] value undefined");
       } else {
         //--- get eProofType
        var vPath = this.appendPathSlash(this.getEProofExportPath());
        var vFilename = this.getFilename4Type(vType);
        makedirpath(vPath);
        console.log("Save File ["+vType+"]: "+vPath +vFilename);
        saveFile(vPath + vFilename,vContent);
        alert("File '"+vFilename+"' saved!");
        //electron.shell.openExternal(vPath +vFilename);
       };
  };
  //#################################################################
  //# setMathJaxPath()
  //#################################################################
  this.setMathJaxPath = function () {
    console.log("Select MathJaxPath with openDirectory()-Call");
    var vSep = getPathSeparator();
    //var vDefaultPath = app.getPath('documents')+vSep+"PanDoc"+vSep+"eProofJS"+vSep+"library"
    var vDefaultPath = app.getPath('documents')+vSep+"PanDoc"+vSep+"mathjax";
    var vID = "MATHJAX_PATH"+this.aQID;
    openDirectory(vID,vDefaultPath);
    //this.getValueDOM();
  };

  //#################################################################
  //# setPath()
  //#################################################################
  this.setPath = function (pID) {
    console.log("setPath('"+pID+"')");
    var vValue = this.getValueDOM("t"+pID);
    var vDefaultPath = "";
    switch (pID) {
      case "SUBDIRECTORY"+this.aQID:
        localStorage.setItem("t"+pID, vValue);
        alert("Subdirectory '"+vValue+"' saved in Local Storage!")
        break;
      case "MAINPATH"+this.aQID:
        vDefaultPath = app.getPath('documents')+vSep+"eProofs";
        openDirectory("t"+pID,vDefaultPath);
        break;
      case "LIBPATH"+this.aQID:
        vDefaultPath = app.getPath('documents')+vSep+"eProofs"+vSep+"library";
        openDirectory("t"+pID,vDefaultPath);
        break;
      default:
          console.log("setPath(pID) called with an unknown pID");
    };
  };
  //#################################################################
  //# checkPanDocDir()
  //#################################################################
  this.checkPanDocDir = function () {
    var vSep = getPathSeparator();
    var vPath = app.getPath('documents')+vSep+"PanDoc";
    if (checkPathExists(vPath)) {
      console.log("PanDoc Folder exists");
      return vPath
    } else {
      alert("Please Download PanDoc.zip from https://github.com/niebert/PanDoc/archive/master.zip \n unzip in your 'Documents' folder\n and rename folder to 'PanDoc'");
      return app.getPath('documents');
    };
  }
  //#################################################################
  //# checkMathJaxDir()
  //#################################################################
  this.checkMathJaxDir = function () {
    var vSep = getPathSeparator();
    var vPath = app.getPath('documents')+vSep+"PanDoc"+vSep+"mathjax";
    if (checkPathExists(vPath)) {
      console.log("MathJax Folder exists");
      return vPath
    } else {
      alert("MathJax folder does not exist!\n(1) Please Download PanDoc.zip from\n https://github.com/niebert/PanDoc/archive/master.zip \n(2) unzip in your Documents folder\n   and rename folder to 'PanDoc'");
      return app.getPath('documents');
    };
  };
  //#################################################################
  //# getLocalStorage()
  //#################################################################
  this.getLocalStorage = function (pID,pDefaultValue) {
    var vValue = pDefaultValue;
    //pID += this.aQID;
    if (localStorage.getItem(pID) === null) {
      console.log("Local Storage ["+pID+"] is undefined - use default value!");
    } else {
      vValue = localStorage.getItem(pID);
      console.log("Local Storage ["+pID+"]='"+vValue+"'");
    };
    return vValue;
  }
  //#################################################################
  //# checkEProofDir()
  //#################################################################
  this.checkEProofDir = function () {
    var vSep = getPathSeparator();
    var vPath = app.getPath('documents')+vSep+"eProofs";
    vPath = this.getLocalStorage("tMAINPATH"+this.aQID,vPath);
    if (checkPathExists(vPath)) {
      console.log("eProofs Folder exists");
    } else {
      makedirpath(vPath);
    };
    return vPath
  }
  //#################################################################
  //# getEProofLibrary()
  //#################################################################
  this.getEProofLibrary = function () {
    var vSep = getPathSeparator();
    var vPath = app.getPath('documents')+vSep+"eProofs"+vSep+"library";
    vPath = this.getLocalStorage("tLIBPATH"+this.aQID,vPath);
    return vPath;
  }
  //#################################################################
  //# getEProofCSS()
  //#################################################################
  this.getEProofCSS = function () {
    var vSep = getPathSeparator();
    return app.getPath('documents')+vSep+"eProofs"+vSep+"css";
  }
  //#################################################################
  //# checkEProofLibraries()
  //#################################################################
  this.checkEProofLibraries = function (pPath) {
    var vSep = getPathSeparator();
    var vPath = pPath || this.getEProofLibrary();
    var vRet = true;
    makedirpath(vPath);
    if (checkFileExists(vPath+vSep+"language.js")) {
      console.log("eProofs Libs exists");
    } else {
      vRet = confirm("JavaScript Library do not exist Path 'library/'!\nDo want to create the directory?\n'"+vPath+"'");
    };
    vPath = this.appendPathSlash(vPath);
    if (vRet) {
      this.checkLibrary(vPath,"language.js");
      this.checkLibrary(vPath,"eproofmain.js");
      this.checkLibrary(vPath,"eproofmeth1.js");
      this.checkLibrary(vPath,"eproofmeth2.js");
    };
    return vPath
  }
  //#################################################################
  //# checkEProofCSS()
  //#################################################################
  this.checkEProofCSS = function (pPath) {
    var vSep = getPathSeparator();
    var vPath = pPath || this.getEProofCSS();
    var vRet = true;
    makedirpath(vPath);
    if (checkFileExists(vPath+vSep+"imathas.css")) {
      console.log("CSS directory exists");
    } else {
      vRet = confirm("CSS File does not exist in Path 'css/'!\nDo want to create the directory?\n'"+vPath+"'");
    };
    vPath = this.appendPathSlash(vPath);
    if (vRet) {
      this.checkCSS(vPath,"imathas.css");
    };
    return vPath
  }
  //#################################################################
  //# checkLibrary ()
  //#################################################################
  this.checkLibrary = function (pPath,pLib) {
    this.checkCopyFile(pPath,pLib,"JS-Library","./library/");
  };
  //#################################################################
  //# checkLibrary ()
  //#################################################################
  this.checkCSS = function (pPath,pLib) {
    this.checkCopyFile(pPath,pLib,"CSS-Style","./css/");
  };
  //#################################################################
  //# checkCopyFile()
  //#################################################################
  this.checkCopyFile = function (pPath,pFilename,pName,pSourcePath) {
    if (checkFileExists(pPath+pFilename)) {
      console.log("The "+pName+" '"+pFilename+"' exists in Path="+pPath+"!");
    } else {
      copyFile2File(pSourcePath+pFilename,pPath+pFilename);
    }
  };

  //#################################################################
  //#################################################################

//####################################################################
}; //-----END Definition: appendElectronMethods()---------------------
//####################################################################

//#################################################################
//## non-OOA: getOperatingSystem()
//#################################################################
function getOperatingSystem() {
  // Origine of Code
  // http://www.javascripter.net/faq/operatin.htm
  // This script sets OSName variable as follows:
  // "Windows"    for all versions of Windows
  // "MacOS"      for all versions of Macintosh OS
  // "Linux"      for all versions of Linux
  // "UNIX"       for all other UNIX flavors
  // "Unknown OS" indicates failure to detect the OS

  var OSName="Unknown OS";
  //--Recognition of Windows is not consistent--
  OSName="Linux";
  if (navigator.appVersion.indexOf("Win")!=-1) {
    OSName="Windows";
  } else if (navigator.appVersion.indexOf("Mac")!=-1) {
    OSName="MacOSX";
  } else if (navigator.appVersion.indexOf("X11")!=-1) {
    //OSName="Unix";
    OSName="Linux";
  } else if (navigator.appVersion.indexOf("Linux")!=-1) {
    OSName="Linux";
  };
  //alert(OSName);
  return OSName
}

//#################################################################
//## non-OOA: getPathSeparator()
//#################################################################
function getPathSeparator() {
  var vOS = getOperatingSystem();
  var vSep = "/";
  if (vOS == "Windows") {
    vSep ="\\";
  };
  return vSep;
}
//#################################################################
//## non-OOA: makedirpath()
//#################################################################
function makedirpath(pPathDir) {
  var mkdirp = require('mkdirp');
  mkdirp(pPathDir, function(err) {
    // full path exists including all subdirectories unless there was an error
    console.log("makedirpath()-Call: Directory="+pPathDir+" already exists!");
  });
}
//#################################################################
//## non-OOA: readFile()
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

//#################################################################
//## non-OOA: saveFile()
//#################################################################
function saveFile(pFilename,pContent) {
 //alert(typeof(pFilename));
 fs.writeFile(pFilename, pContent, (err) => {
   if (err) throw err;
   console.log('Filename \''+pFilename+'\' saved!');
   //alert("Dirname: "+__dirname)
 });
}
//#################################################################
//## non-OOA: checkPathExists()
//#################################################################
function checkPathExists(pPath) {
  return checkFileExists(pPath);
};
//#################################################################
//## non-OOA: checkFileExists()
//#################################################################
function checkFileExists(pFile) {
  if (fs.existsSync(pFile)) {
    console.log('Found \''+pFile+'\' File');
    // do something
    return true;
  } else {
    return false;
  }
}
//#################################################################
//## non-OOA: checkFileExists()
//#################################################################
function copyFile2File (pReadFile,pWriteFile) {
  fs.readFile(pReadFile, 'utf-8', function (err, data) {
    console.log('\''+pReadFile+'\' opened!');
    fs.writeFile(pWriteFile, data, (err) => {
      if (err) throw err;
      console.log('Filename \''+pWriteFile+'\' saved!');
      //alert("Dirname: "+__dirname)
    });
  });
}
/**
 * Souce: https://gist.github.com/eriwen/1211656
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
function getRelativePath(source, target) {
  console.log("Source: '"+source+"' Target: '"+target+"'");
  //var sep = (source.indexOf("/") !== -1) ? "/" : "\\",
  var sep = getPathSeparator(),
		targetArr = target.split(sep),
		sourceArr = source.split(sep),
		filename = targetArr.pop(),
		targetPath = targetArr.join(sep),
		relativePath = "";

	while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
		sourceArr.pop();
		relativePath += ".." + sep;
	}

	var relPathArr = targetArr.slice(sourceArr.length);
	relPathArr.length && (relativePath += relPathArr.join(sep) + sep);
  console.log("Relative Path: '"+ relativePath + filename +"'");
	return relativePath + filename;
};

//#################################################################
//## non-OOA: openFileInBrowser()
//#################################################################
function openFileInBrowser(pFilename) {
  const {shell} = require('electron');
  shell.openExternal(pFilename);
}
//#################################################################
//## non-OOA: openDirectory()
//#################################################################
function openDirectory(pFolderID,pDefaultPath) {
  //dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]})
  var vFolder =dialog.showOpenDialog({ defaultPath: pDefaultPath , properties: [ 'openDirectory' ]});
  if (vFolder) {
    //write2innerHTML(pFolderID,vFolder);
    write2value(pFolderID,vFolder);
    localStorage.setItem(pFolderID, vFolder);
  }
}
//#################################################################
//## non-OOA: write2innerHTML()
//#################################################################
function write2innerHTML(pID,pContent) {
  var vNode =document.getElementById(pID);
  if (vNode){
    vNode.innerHTML=pContent;
  } else {
    console.log("Write DOM-Node 'innerHTML' with ID=["+pID+"] was undefined")
  }
}

//#################################################################
//## non-OOA: write2value()
//#################################################################
function write2value(pID,pContent) {
  var vNode =document.getElementById(pID);
  if (vNode){
    vNode.value=pContent;
  } else {
    console.log("Write DOM-Node 'value' with ID=["+pID+"] was undefined")
  }
}
//#################################################################
//## non-OOA: append2innerHTML()
//#################################################################
function append2innerHTML(pID,pContent) {
  var vNode =document.getElementById(pID);
  if (vNode){
    vNode.innerHTML+=pContent;
  } else {
    console.log("Append DOM-Node 'innerHTML' with ID=["+pID+"] was undefined");
  }
}
//#################################################################
//## non-OOA: append2value()
//#################################################################
function append2value(pID,pContent) {
  var vNode =document.getElementById(pID);
  if (vNode){
    vNode.value+=pContent;
  } else {
    console.log("DOM-Node 'value' with ID=["+pID+"] was undefined")
  }
}
