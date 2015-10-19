//----STEP-DISPLAY-HTML---------
$vCellWidth = "40px"
$getStepDiplayHTML = "\n<table width='95%' border='0'><tr><td valign='top'  width='".$vCellWidth."'>"
$max_i = count($AllJustificationsID) - 1
$vName = "outSTEPDISPLAY__vNr__"
for ($i=1..$max_i) {
  $vID = $AllJustificationsID[$i]
  $vStepDef = $AllJustificationsStep[$i]
  $getStepDiplayHTML .= "\n<OUTTEXT class='".$vName."' id='".$vName."-POS-".$i."' >(".$i.")</OUTTEXT>"
}
$getStepDiplayHTML .= "\n</td><td valign='top' align='center' width='".$vCellWidth."'>"
$getStepDiplayHTML .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-NA' >`???`</OUTTEXT>"
$max_i = count($StepConnectionTAG) - 1
for ($i=0..$max_i) {
    $getStepDiplayHTML .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-".$i."' >`".$StepConnectionTAG[$i]."`</OUTTEXT>";
}
$getStepDiplayHTML .= "\n</td><td valign='top' align='left'>"
$max_i = count($AllJustificationsID) - 1
for ($i=1..$max_i) {
  $vID = $AllJustificationsID[$i]
  $vStepDef = $AllJustificationsStep[$i]
  $getStepDiplayHTML .= "\n<OUTTEXT class='".$vName."' id='".$vName."-STEP-".$vID."' >[".$vID."]&nbsp; ".$vStepDef." </OUTTEXT>"
}
$getStepDiplayHTML .= "\n</td></tr></table>"
