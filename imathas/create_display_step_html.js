  //----Begin: STEP-DISPLAY-HTML---------
  $vCellWidth = "40px"
  $vContent .= "\n<table width='95%' border='0'><tr><td valign='top'  width='".$vCellWidth."'>"
  $max_i = count($AllID) - 1
  $vName = "outSTEPDISPLAY".$vNr
  for ($i=1..$max_i) {
    $vID = $AllJustificationsID[$i]
    $vStepDef = $AllJustificationsStep[$i]
    $vHideShow = "style=\"display:none\""
    if ($i == $vNr) {
      $vHideShow = "style=\"display:block\""
    }
    $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-POS-".$i."' $vHideShow >(".$i.")</OUTTEXT>"
  }
  $vContent .= "\n</td><td valign='top' align='center' width='".$vCellWidth."'>"
  $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-NA' >`???`</OUTTEXT>"
  $max_i = count($StepConnectionTAG) - 1
  for ($i=0..$max_i) {
     $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-".$i."' >`".$StepConnectionTAG[$i]."`</OUTTEXT>";
  }
  $vContent .= "\n</td><td valign='top' align='left'>"
  $max_i = count($AllID) - 1
  for ($i=1..$max_i) {
    $vID = $AllID[$i]
    $vStepDef = $AllStep[$i]
    $vHideShow = "style=\"display:none\""
    if ($i == $vNr) {
      $vHideShow = "style=\"display:block\""
    }
    $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-STEP-".$vID."' $vHideShow >[".$vID."]&nbsp; ".$vStepDef." </OUTTEXT>"
  }
  $vContent .= "\n</td></tr></table>"
  //----End: STEP-DISPLAY-HTML---------