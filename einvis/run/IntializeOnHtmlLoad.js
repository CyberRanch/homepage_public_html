// 20111006William, this is the unique place to put the global variables.
// --- 1. Canvas ---
var vaGlobalMyCanvasList = new Array(); // 20111005William. We need to maintain a global array to store many canvas, which will be created by users.
// when we create a new canvas element, just put it into this array;
// when we delete one canvas element, just delete it from this array;
// we do not change the order of canvas element in this array;
// The Z-Index order will be stored in the following array, which is synchronous with "vaGlobalMyCanvasList".
// In "vaGlobalMyCanvasList":
// "0" matrix view canvas;
// "1" tree ring view canvas;
// "2" LD ring view canvas;
var vnGlobalMyCanvasZIndex = new Array(); // you need to write an algorithm to re-assign the Z-Index of each canvas.
// "vaGlobalMyCanvasList" and "vnGlobalMyCanvasZIndex" always have the same length, and their elements correspond to each other.
//20120629William. Add two global variables to store the index of canvas in "vaGlobalMyCanvasList" for Matrix View and Tree Ring View.
var gnCanvasID4MatrixView = 0;	// Because We add matrix view canvas first, so, its ID is 0;
var gnCanvasID4TreeRingView = 1; // we add tree ring view canvas second, therefore, its ID is 1.
var gnCanvasID4LDRingView = 2; // we add LD ring view canvas third, therefore, its ID is 2.
// --- 2. Main Data Structure ---
var aAllNodes4RingGraph = new CAllNodes4RingGraph(); // the declaration of global variable "aAllNodes4RingGraph".
// 20111012William. These two variables are to store the old position point of the mouse, when user are moving the whole canvas.
var nFlagOfInteractionType = 0; // "0" default, no interaction; "1" user is moving the whole canvas;
var nMoveWholeCanvasMouseOldPosWdhX = 0;
var nMoveWholeCanvasMouseOldPosHghY = 0;
// 20111012William. I want to get the runtime of program.
var nTimeBgn = (new Date()).getTime(); // get the current time. unit "ms".
var nTimeEnd = 0;
// --- 3. Controls ---
// 20111208William. Add three variables to remember the selecting status and selecting node's information.
var gbDoesUserSelectOneNode = false;
var gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView = new Array();
var gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView = new Array();
// 20120701William, the following are for controls. The global position of the slider for "Number Of Edges"
var gsNewValueNumEdgesSldr = '3'; // 20120724 For Figure In Paper, original '3'.
var gnNumOfEdgesToShow = 0; // 20120927. The total number of edges to show: var nNumOfSNPsPairsToShow = Math.round(nTotalNumOfSNPsPairs * dTopPercentToShow);
var gsEdgBundleStrengthSliderValue = '5'; // 20120713William, add this global variable.
var gnHightlightModeAnyOrAll = 0; // 20120713William, add this global variable. '0' Any; '1', All.
// 20120701William. The global position of the slider for "Font Size" and whether or not the checkbox is checked.
var gsNewValueFontSizeSldr = '17'; // 20120724 For Figure In Paper, original '14'.
var gbWhetherCheckboxShowTextChecked = true;
// 20120701William. I think we should adjust the color bar of the node color and edge color to get a more beautiful view.
var gdHueRangeBgn4NodeColorBar = 2 * 3.1415926 * 0 / 6; // begin from cyan;
var gdHueRangeEnd4NodeColorBar = 2 * 3.1415926 * 2 / 6; // end with purple.
var gdHueRangeBgn4EdgeColorBar = 2 * 3.1415926 * 0 / 6; // begin from red;
var gdHueRangeEnd4EdgeColorBar = 2 * 3.1415926 * 2 / 6; // end with shallow green.
var gdSatutation4NodeColorBar = 1.0; // the saturation value in node color in HSV color space model.
var gdSatutation4EdgeColorBar = 1.0; // the saturation value in edge color in HSV color space model.
var gdIntensity4NodeColorBar = 1.0 / 3; // the Intensity value in node color in HSV color space model.
var gdIntensity4EdgeColorBar = 1.0 / 3; // the Intensity value in edge color in HSV color space model.
var gbClockwiseOrCounterClockwise4NodeColorBar = true; // "false", by default, is Counter Clockwise; "true", clockwise. When sampling the HSV color space.
var gbClockwiseOrCounterClockwise4EdgeColorBar = true; // "false", by default, is Counter Clockwise; "true", clockwise. When sampling the HSV color space.
// 20120706William. The width for the control column in the tree ring view canvas.
var gnTreeRingViewCanvasColumnWidth = 266; // 250 is the length of the slider, and 10 pixel on left and right.
var gnTreeRingViewCanvasWidthMin = 730;
// 20120711. Color Bar from "http://colorbrewer2.org/"
var gvvnColorBrewer = new Array(12);
var gnIndexOfColorScheme4NodesColor = 11;
var gnIndexOfColorScheme4EdgesColor = 11;
var gbWhetherCheckboxBlackBackgroundChecked = true;
// 20120727. Global Variable for Browser Type
var gsBrowserType = "";
// 20120928. Global Window for view the ranks of SNPs by their degree in epistasis interaction network.
var gbWindow4ViewRankOfSNPsByDegreeBeenCreatedOrNot = false;
var gaWindow4ViewRankOfSNPsByDegree;
// 20121012. To add the new Search Genes Names and SNPs Names Function.
var gbSearchInputTextBoxElementCreated = false;
var gsSearchInputTextBoxStringValue = '';

function IntializeOnHtmlLoad()
{
	// 20120727. First detect the browser.
	var sBrowserUserAgentHeader = navigator.userAgent; // Get user agent header.
	if (sBrowserUserAgentHeader.indexOf("Chrome") > 0)
	{
		gsBrowserType = "Chrome";
	}
	else if (sBrowserUserAgentHeader.indexOf("Safari") > 0)
	{
		gsBrowserType = "Safari";
	}
	else if (sBrowserUserAgentHeader.indexOf("Firefox") > 0)
	{
		gsBrowserType = "Firefox";
	}
	// 20120706William. We need to fit the Tree Ring View Canvas to the client Region of the web page exactly.
	var nScreenWidth = document.body.clientWidth;
	var nScreenHeght = document.body.clientHeight;
	var nCanvasWidth4TreeRingView = 0;
	var nCanvasHeght4TreeRingView = 0;
	var nCanvasWidth4LDRingView = 0;
	var nCanvasHeght4LDRingView = 0;
	var nCanvasLftTopPosX4LDRingView = 0;
	var nCanvasLftTopPosY4LDRingView = 0;
	var nCanvasWidth4MatrixView = 0;
	var nCanvasHeght4MatrixView = 0;
	var nCanvasLftTopPosX4MatrixView = 0;
	var nCanvasLftTopPosY4MatrixView = 0;
	if (nScreenWidth >= gnTreeRingViewCanvasWidthMin && nScreenHeght >= gnTreeRingViewCanvasWidthMin)
	{	// If the screen is large enough.
		if ((nScreenWidth - gnTreeRingViewCanvasColumnWidth) >= nScreenHeght)
		{	// the width is longer than height.
			nCanvasWidth4TreeRingView = nScreenHeght + gnTreeRingViewCanvasColumnWidth;
			nCanvasHeght4TreeRingView = nScreenHeght;
			nCanvasWidth4MatrixView = nScreenHeght;
			nCanvasHeght4MatrixView = nScreenHeght;
			nCanvasLftTopPosX4LDRingView = nScreenHeght / 2;
			nCanvasLftTopPosY4LDRingView = 0;
			nCanvasLftTopPosX4MatrixView = nCanvasWidth4TreeRingView;
			nCanvasLftTopPosY4MatrixView = 0;
		}
		else
		{	// the height is longer than width.
			nCanvasWidth4TreeRingView = nScreenWidth;
			nCanvasHeght4TreeRingView = nScreenWidth - gnTreeRingViewCanvasColumnWidth;
			nCanvasWidth4MatrixView = nScreenWidth;
			nCanvasHeght4MatrixView = nScreenWidth;
			nCanvasLftTopPosX4LDRingView = 0;
			nCanvasLftTopPosY4LDRingView = nScreenWidth / 2;
			nCanvasLftTopPosX4MatrixView = 0;
			nCanvasLftTopPosY4MatrixView = nCanvasHeght4TreeRingView;
		}
	}
	else
	{	// If the screen is too small.
		nCanvasWidth4TreeRingView = gnTreeRingViewCanvasWidthMin + gnTreeRingViewCanvasColumnWidth;
		nCanvasHeght4TreeRingView = gnTreeRingViewCanvasWidthMin;
		nCanvasWidth4MatrixView = gnTreeRingViewCanvasWidthMin;
		nCanvasHeght4MatrixView = gnTreeRingViewCanvasWidthMin;
		nCanvasLftTopPosX4LDRingView = gnTreeRingViewCanvasWidthMin / 2;
		nCanvasLftTopPosY4LDRingView = 0;
		nCanvasLftTopPosX4MatrixView = gnTreeRingViewCanvasWidthMin;
		nCanvasLftTopPosY4MatrixView = 0;
	}
	nCanvasWidth4LDRingView = nCanvasHeght4TreeRingView; // Both width and height equal to height of Tree Ring View Canvas.
	nCanvasHeght4LDRingView = nCanvasHeght4TreeRingView; // The LD canvas is squared.
	// We need to initialize the color bar here.
	gvvnColorBrewer[0] = [[255,255,229],[247,252,185],[217,240,163],[173,221,142],[120,198,121],[65,171,93],[35,132,67],[0,104,55],[0,69,41]]; // sequential YIGn
	gvvnColorBrewer[1] = [[255,255,217],[237,248,217],[199,233,180],[127,205,187],[65,182,196],[29,145,192],[34,94,168],[37,52,148],[8,29,88]]; // sequential YIGnBu
	gvvnColorBrewer[2] = [[255,255,229],[255,247,188],[254,227,145],[254,196,79],[254,153,41],[236,112,20],[204,76,2],[153,52,4],[102,37,6]]; // sequential YIOrBr
	gvvnColorBrewer[3] = [[255,255,204],[255,237,160],[254,217,118],[254,178,76],[253,141,60],[252,78,42],[227,26,28],[189,0,38],[128,0,38]]; // sequential YIOrRd
	gvvnColorBrewer[4] = [[247,244,249],[231,225,239],[212,185,218],[201,148,199],[223,101,176],[231,41,138],[206,18,86],[152,0,67],[103,0,31]]; // sequential PuRd
	gvvnColorBrewer[5] = [[255,255,255],[240,240,240],[217,217,217],[189,189,189],[150,150,150],[115,115,115],[82,82,82],[37,37,37],[0,0,0]]; // sequential Greys
	gvvnColorBrewer[6] = [[197,27,125],[222,119,174],[241,182,218],[253,224,239],[247,247,247],[230,245,208],[184,225,134],[127,188,65],[77,146,33]]; // diverging PiYG
	gvvnColorBrewer[7] = [[118,42,131],[153,112,171],[194,165,207],[231,212,232],[247,247,247],[217,240,211],[166,219,160],[90,174,97],[27,120,55]]; // diverging PRGn
	gvvnColorBrewer[8] = [[179,88,6],[224,130,20],[253,184,99],[254,224,182],[247,247,247],[216,218,235],[178,171,210],[128,115,172],[84,39,136]]; // diverging PuOr
	gvvnColorBrewer[9] = [[178,24,43],[214,96,77],[244,165,130],[253,219,199],[247,247,247],[209,229,240],[146,197,222],[67,147,195],[33,102,172]]; // diverging RdBu
	gvvnColorBrewer[10] = [[215,48,39],[244,109,67],[253,174,97],[254,224,144],[255,255,191],[224,243,248],[171,217,233],[116,173,209],[69,117,180]]; // diverging RdYIBu
	gvvnColorBrewer[11] = [[215,48,39],[244,109,67],[253,174,97],[254,224,139],[255,255,191],[217,239,139],[166,217,106],[102,189,99],[26,152,80]]; // diverging RdYIGn
	
	// --- 1 --- 20111016William. initialize another common view for the "Matrix View" visualizing the definition relationship.
	nOneCommonCanvasIndexInGlobalList = vaGlobalMyCanvasList.length;
	var sCanvasId4Common00 = nOneCommonCanvasIndexInGlobalList.toString();
	var aCommonCanvas00 = new CMyCanvasWindowCommon();
	aCommonCanvas00.InitalizeThisCanvasPosSizeBorderEtc(sCanvasId4Common00, nCanvasWidth4MatrixView, nCanvasHeght4MatrixView);
	nThisCommonCanvasZIndexValue = 1; // "Matrix View", Z-Index = 1, But Id = 0 (equals to index in "vaGlobalMyCanvasList").
	aCommonCanvas00.SetZIndexValue(nThisCommonCanvasZIndexValue);
	// --- 20111016William. Initialize the absolute position of the canvas.
	aCommonCanvas00.MoveCanvasAbsolutePositionToAbsltPoint(nCanvasLftTopPosX4MatrixView, nCanvasLftTopPosY4MatrixView); // "2, 2" point is already set when initialize this canvas.
	// -- insert one common canvas
	vaGlobalMyCanvasList.push(aCommonCanvas00);
	vnGlobalMyCanvasZIndex.push(nThisCommonCanvasZIndexValue); // insert one common canvas.
	
	// --- 2 --- 20111109William. Initialize one common view for the "Tree-Ring View".
	nOneCommonCanvasIndexInGlobalList = vaGlobalMyCanvasList.length;
	var sCanvasId4Common01 = nOneCommonCanvasIndexInGlobalList.toString();
	var aCommonCanvas01 = new CMyCanvasWindowCommon();
	aCommonCanvas01.InitalizeThisCanvasPosSizeBorderEtc(sCanvasId4Common01, nCanvasWidth4TreeRingView, nCanvasHeght4TreeRingView);
	aCommonCanvas01.AddSomeControls(); // 20120629William add this.
	aCommonCanvas01.RenderSomeTextForUserSelectFiles(); // 20120704. We have to move the text render here. Because at initial, when user did not select files, there is no instance for "CAllNodes4RingGraph" class.
	nThisCommonCanvasZIndexValue = 3; // "Matrix View", Z-Index = 3, But Id = 1 (equals to index in "vaGlobalMyCanvasList").
	aCommonCanvas01.SetZIndexValue(nThisCommonCanvasZIndexValue);
	// 20111109William. Initialize the absolute position of the canvas.
	aCommonCanvas01.MoveCanvasAbsolutePositionToAbsltPoint(0, 0); // "2, 2" point is already set when initialize this canvas.
	// insert one common canvas
	vaGlobalMyCanvasList.push(aCommonCanvas01);
	vnGlobalMyCanvasZIndex.push(nThisCommonCanvasZIndexValue); // insert one common canvas.
	
	// --- 3 --- 20130619William. Initialize one common view for the "LD-Ring View".
	nOneCommonCanvasIndexInGlobalList = vaGlobalMyCanvasList.length;
	var sCanvasId4Common02 = nOneCommonCanvasIndexInGlobalList.toString();
	var aCommonCanvas02 = new CMyCanvasWindowCommon();
	aCommonCanvas02.InitalizeThisCanvasPosSizeBorderEtc(sCanvasId4Common02, nCanvasWidth4LDRingView, nCanvasHeght4LDRingView);
	nThisCommonCanvasZIndexValue = 2; // "Matrix View", Z-Index = 2, But Id = 2 (equals to index in "vaGlobalMyCanvasList").
	aCommonCanvas02.SetZIndexValue(nThisCommonCanvasZIndexValue); // "SetZIndexValue" "z-index" will decide the overlapping of two canvases.
	// 20111109William. Initialize the absolute position of the canvas.
	aCommonCanvas02.MoveCanvasAbsolutePositionToAbsltPoint(nCanvasLftTopPosX4LDRingView, nCanvasLftTopPosY4LDRingView); // "2, 2" point is already set when initialize this canvas.
	// insert one common canvas
	vaGlobalMyCanvasList.push(aCommonCanvas02);
	vnGlobalMyCanvasZIndex.push(nThisCommonCanvasZIndexValue); // insert one common canvas.

	// --- 4 --- Initialize the document body message response function, original it is in function "function InitializeDocumentBodyMessageResponseFunction()".
	// 20111012William. We need to overload the mouse move function, since when user move one canvas too fast, the message can not pass to the moving mouse.
	document.body.addEventListener('mousedown', MessageFunction4DocumentBody4MouseDown, false);
	document.body.addEventListener('mousemove', MessageFunction4DocumentBody4MouseMove, false);
	document.body.addEventListener('mouseup', MessageFunction4DocumentBody4MouseUp, false);
	document.body.addEventListener('keydown', MessageFunction4DocumentBody4KeyDown, false);
	document.body.addEventListener('keyup', MessageFunction4DocumentBody4KeyUp, false);
}

function ReRenderAllViewsAfterUserChangeSomeControlsParameters()
{
	// 20120706William. We need to fit the Tree Ring View Canvas to the client Region of the web page exactly.
	// --- 0. Update the Canvas Elements.
	var nScreenWidth = document.body.clientWidth;
	var nScreenHeght = document.body.clientHeight;
	var nCanvasWidth4TreeRingView = 0;
	var nCanvasHeght4TreeRingView = 0;
	var nCanvasWidth4MatrixView = 0;
	var nCanvasHeght4MatrixView = 0;
	if (nScreenWidth >= gnTreeRingViewCanvasWidthMin && nScreenHeght >= gnTreeRingViewCanvasWidthMin)
	{	// If the screen is large enough.
		if ((nScreenWidth - gnTreeRingViewCanvasColumnWidth) >= nScreenHeght)
		{	// the width is longer than height.
			nCanvasWidth4TreeRingView = nScreenHeght + gnTreeRingViewCanvasColumnWidth;
			nCanvasHeght4TreeRingView = nScreenHeght;
			nCanvasWidth4MatrixView = nScreenHeght;
			nCanvasHeght4MatrixView = nScreenHeght;
		}
		else
		{	// the height is longer than width.
			nCanvasWidth4TreeRingView = nScreenWidth;
			nCanvasHeght4TreeRingView = nScreenWidth - gnTreeRingViewCanvasColumnWidth;
			nCanvasWidth4MatrixView = nScreenWidth;
			nCanvasHeght4MatrixView = nScreenWidth;
		}
	}
	else
	{	// If the screen is too small.
		nCanvasWidth4TreeRingView = gnTreeRingViewCanvasWidthMin + gnTreeRingViewCanvasColumnWidth;
		nCanvasHeght4TreeRingView = gnTreeRingViewCanvasWidthMin;
		nCanvasWidth4MatrixView = gnTreeRingViewCanvasWidthMin;
		nCanvasHeght4MatrixView = gnTreeRingViewCanvasWidthMin;
	}
	nCanvasWidth4LDRingView = nCanvasHeght4TreeRingView; // Both width and height equal to height of Tree Ring View Canvas.
	nCanvasHeght4LDRingView = nCanvasHeght4TreeRingView; // The LD canvas is squared.
	// Resize the canvas of tree ring view and matrix view.
	// --- First, refresh the tree ring view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	aOneCanvasRefer.RemoveSomeControls(); // 20120713William. add this to remove all other controls except this canvas.
	aOneCanvasRefer.AddSomeControls(); // 20120629William add this.
//	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
//	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nCanvasWidth4TreeRingView, nCanvasHeght4TreeRingView); // It will clear the canvas.
	// --- Second, refresh the matrix view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView]; // "gnCanvasID4MatrixView" is the canvas for Matrix view.
//	var nMatrixViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
//	var nMatrixViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nCanvasWidth4MatrixView, nCanvasHeght4MatrixView); // It will clear the canvas.
	// --- Third, refresh the LD ring view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView]; // "gnCanvasID4LDRingView" is the canvas for LD ring view.
//	var nLDRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
//	var nLDRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nCanvasWidth4LDRingView, nCanvasHeght4LDRingView); // It will clear the canvas.
	// --- 1. before rendering, clear some global variables.
	aAllNodes4RingGraph = new CAllNodes4RingGraph(); // I am lazy, just call this to reset, hope it can works.
	nFlagOfInteractionType = 0; // "0" default, no interaction; "1" user is moving the whole canvas;
	nMoveWholeCanvasMouseOldPosWdhX = 0;
	nMoveWholeCanvasMouseOldPosHghY = 0;
	gbDoesUserSelectOneNode = false;
	gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView = new Array();
	gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView = new Array();
	gnCanvasID4MatrixView = 0;	// Because We add matrix view canvas first, so, its ID is 0;
	gnCanvasID4TreeRingView = 1; // we add tree ring view canvas second, therefore, its ID is 1.
	gnCanvasID4LDRingView = 2; // we add LD ring view canvas third, therefore, its ID is 2.
	// Re-Assign the Top Percent SNPs Pairs data.
	var dEdgeNumberValue = gsNewValueNumEdgesSldr / 10; // 20120711Test. It works. '3'/10 = 0.3.
	ReAssignTopPercentData(dEdgeNumberValue);
	// Call pre-processing function and re-render function.
	// --- 1.1 Sub-Step 1. Pre-processing the data structure.
	aAllNodes4RingGraph.AssignTheIndexInAllNodesToEachNode(); // assign the index of all nodes to each node in the hierarchical nodes tree.
	aAllNodes4RingGraph.AssignFatherNodeIndexInLevelToEachNode(); // 20111130William. Assign the index in level of father node to each node.
	aAllNodes4RingGraph.InitializeDefiningAndDefinedByArraysByRawDefRltnVar(); // pre-processing. We need to initialize the defining and defined by relationship variables first, for the convenience of the future use.
	aAllNodes4RingGraph.MapSingleLocusTestValueToNodeColors(); // Map the single locus test value to the node color. About the edge color, we will map it when we create one new edge.
	aAllNodes4RingGraph.GenerateNodeColorBarAndEdgeColorBarsColorData();
	aAllNodes4RingGraph.SetTreeRingViewNodesNameTextWhetherShow(gbWhetherCheckboxShowTextChecked);
	aAllNodes4RingGraph.SetTreeRingViewNodesNameTextFontSize(gsNewValueFontSizeSldr);
	var dTreeRingViewBundleStrength = gsEdgBundleStrengthSliderValue / 10;
	aAllNodes4RingGraph.SetBundleStrength(dTreeRingViewBundleStrength);
	aAllNodes4RingGraph.SetMultipleSelectionHighlightMode(gnHightlightModeAnyOrAll);
	// --- 1.2 Sub-Step 2. Re-Render all the Views.
	RenderTreeRingViewWithInteraction();
	RenderLDRingViewWithInteraction();
	RenderMatrixView4Definition();
	// 20120927. After all the above work has been done. We begin to do some statistics on the SNPs data.
	SortAllSNPsByTheirBionominalDistPValue();
}

function MessageFunction4DocumentBody4MouseDown(event)
{	// I want to move the canvas, even when user "mouse left button down + ctrl + mouse moving".
	// before, user must move the whole canvas, by clicking on one canvas. But sometimes, there is no canvas on the whole screen, then you can not move the whole canvas.
	var nMouseGlobalPosWdhX = document.body.scrollLeft + event.clientX;
	var nMouseGlobalPosHghY = document.body.scrollTop  + event.clientY;
	var sBeingPressedKeyCode = GetBeingPressedKey();
	if (event.button == 0 && sBeingPressedKeyCode == "m")
	{	// User press "ctrl" key, and begin to move the whole canvas using mouse with left button pressed.
		nMoveWholeCanvasMouseOldPosWdhX = nMouseGlobalPosWdhX;
		nMoveWholeCanvasMouseOldPosHghY = nMouseGlobalPosHghY;
		nFlagOfInteractionType = 1;
		document.body.style.cursor = "move"; // set cursor "move"
//		event.preventDefault();
	}
	if (gbSearchInputTextBoxElementCreated == true)
	{
		var aInputTextBoxElement4SearchGeneName = document.getElementById('SearchGenesSNPsName');
		var sTempSearchBoxString = aInputTextBoxElement4SearchGeneName.value;
		aInputTextBoxElement4SearchGeneName.blur();
		document.getElementById("StartRenderDemo").focus();
	}
}

function MessageFunction4DocumentBody4MouseMove(event)
{	// When user move too fast, this message function for mouse movement will be called.
	// alert("Mouse move");
	var nMouseGlobalPosWdhX = document.body.scrollLeft + event.clientX;
	var nMouseGlobalPosHghY = document.body.scrollTop  + event.clientY;
	var nNumOfAllCanvas = vaGlobalMyCanvasList.length;
	var sBeingPressedKeyCode = GetBeingPressedKey();
	for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
	{
		var aOneCommonCanvasRefer = vaGlobalMyCanvasList[nIdxOfCommonCanvas];
		var nFlagOfInteractType = aOneCommonCanvasRefer.GetFlagOfLeftOrRightOrNoButtonPressed();
		if (nFlagOfInteractType == 2 && sBeingPressedKeyCode == "m")
		{
			var nPressRightBtnAndDragMouseNewPosWdhX = nMouseGlobalPosWdhX;
			var nPressRightBtnAndDragMouseNewPosHghY = nMouseGlobalPosHghY;
			var nPressRightBtnAndDragMouseOldPosWdhX = 0;
			var nPressRightBtnAndDragMouseOldPosHghY = 0;
			var vnPressRightBtnAndDragMouseOldPos = new Array(2);
			aOneCommonCanvasRefer.GetPressRightBtnAndDragMouseOldMousePos(vnPressRightBtnAndDragMouseOldPos);
			nPressRightBtnAndDragMouseOldPosWdhX = vnPressRightBtnAndDragMouseOldPos[0];
			nPressRightBtnAndDragMouseOldPosHghY = vnPressRightBtnAndDragMouseOldPos[1];
			var nMouseRightDownDragMoveOffsetWdhX = nPressRightBtnAndDragMouseNewPosWdhX - nPressRightBtnAndDragMouseOldPosWdhX;
			var nMouseRightDownDragMoveOffsetHghY = nPressRightBtnAndDragMouseNewPosHghY - nPressRightBtnAndDragMouseOldPosHghY;
			for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
			{
				var aOneCanvasReferBgn3 = vaGlobalMyCanvasList[nIdxOfCommonCanvas];
				aOneCanvasReferBgn3.MoveCanvasAbsolutePositionWithOffset(nMouseRightDownDragMoveOffsetWdhX, nMouseRightDownDragMoveOffsetHghY);
			}
			aOneCommonCanvasRefer.SetPressRightBtnAndDragMouseOldMousePos(nPressRightBtnAndDragMouseNewPosWdhX, nPressRightBtnAndDragMouseNewPosHghY);
			// alert('left down + ctrl + move');
			break;
		}
		else if (nFlagOfInteractType == 3)
		{	// to resize the canvas // 20120706 Forbid Resize the canvas.
		}
		else if (nFlagOfInteractType == 4)
		{	// to move canvas
			var nMouseNewPosWdhX = nMouseGlobalPosWdhX;
			var nMouseNewPosHghY = nMouseGlobalPosHghY;
			var nMouseOldPosWdhX = 0;
			var nMouseOldPosHghY = 0;
			var vnMouseOldPos = new Array(2);
			aOneCommonCanvasRefer.GetMoveSingleCanvasMousPosOldXY(vnMouseOldPos);
			nMouseOldPosWdhX = vnMouseOldPos[0];
			nMouseOldPosHghY = vnMouseOldPos[1];
			var nMouseMoveOffsetWdhX = nMouseNewPosWdhX - nMouseOldPosWdhX;
			var nMouseMoveOffsetHghY = nMouseNewPosHghY - nMouseOldPosHghY;
			aOneCommonCanvasRefer.MoveCanvasAbsolutePositionWithOffset(nMouseMoveOffsetWdhX, nMouseMoveOffsetHghY);
			aOneCommonCanvasRefer.SetMoveSingleCanvasMousPosOldXY(nMouseNewPosWdhX, nMouseNewPosHghY);
			break;
		}
	}
	if (nFlagOfInteractionType == 1)
	{	// user is moving the whole canvas, by interaction on the background body.
		var nMoveWholeCanvasMouseNewPosWdhX = nMouseGlobalPosWdhX;
		var nMoveWholeCanvasMouseNewPosHghY = nMouseGlobalPosHghY;
		var nMoveOffsetWdhX = nMoveWholeCanvasMouseNewPosWdhX - nMoveWholeCanvasMouseOldPosWdhX;
		var nMoveOffsetHghY = nMoveWholeCanvasMouseNewPosHghY - nMoveWholeCanvasMouseOldPosHghY;
		// ok, we get the move affect in both X and Y. Then move all the canvas.
		for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
		{
			var aOneCommonCanvasRefer = vaGlobalMyCanvasList[nIdxOfCommonCanvas];
			aOneCommonCanvasRefer.MoveCanvasAbsolutePositionWithOffset(nMoveOffsetWdhX, nMoveOffsetHghY);
		}
		nMoveWholeCanvasMouseOldPosWdhX = nMoveWholeCanvasMouseNewPosWdhX;
		nMoveWholeCanvasMouseOldPosHghY = nMoveWholeCanvasMouseNewPosHghY;
	}
//	event.preventDefault();
}

function MessageFunction4DocumentBody4MouseUp(event)
{	// I want to move the canvas, even when user "mouse left button down + ctrl + mouse moving".
	// before, user must move the whole canvas, by clicking on one canvas. But sometimes, there is no canvas on the whole screen, then you can not move the whole canvas.
	var nMouseGlobalPosWdhX = document.body.scrollLeft + event.clientX;
	var nMouseGlobalPosHghY = document.body.scrollTop  + event.clientY;
	var sBeingPressedKeyCode = GetBeingPressedKey();
	if (event.button == 0 && sBeingPressedKeyCode == "m")
	{
		// move all the canvas to the final position.
		if (nFlagOfInteractionType == 1)
		{	// user is moving the whole canvas, by interaction on the background body.
			var nMoveWholeCanvasMouseNewPosWdhX = nMouseGlobalPosWdhX;
			var nMoveWholeCanvasMouseNewPosHghY = nMouseGlobalPosHghY;
			var nMoveOffsetWdhX = nMoveWholeCanvasMouseNewPosWdhX - nMoveWholeCanvasMouseOldPosWdhX;
			var nMoveOffsetHghY = nMoveWholeCanvasMouseNewPosHghY - nMoveWholeCanvasMouseOldPosHghY;
			// ok, we get the move affect in both X and Y. Then move all the canvas.
			var nNumOfAllCanvas = vaGlobalMyCanvasList.length;
			for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
			{
				var aToolBarOrCommonCanvasRefer = vaGlobalMyCanvasList[nIdxOfCommonCanvas];
				aToolBarOrCommonCanvasRefer.MoveCanvasAbsolutePositionWithOffset(nMoveOffsetWdhX, nMoveOffsetHghY);
			}
		}
		// and then reset the flag.
		nFlagOfInteractionType = 0;
	}
	document.body.style.cursor = "default"; // set cursor "default"
//	event.preventDefault(); // 20111208William. I encountered a problem. When I add a slider, and mouse move, even after the left button of mouse has up, the slider still move. So, I try to comments all these "preventDefault()", especially here sentence, it works. Right now, all work. Good luck.
}

// 20120928. Add the Array to remember the key state.
var gveKeyBeingPressedEnum = { NO_Key:0, M_Key:1, C_Key:2, S_Key:3, U_Key:4, L_Key:5 };
var gvbKeyBeingPressedArray = new Array(6);
gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.M_Key] = false;
gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.C_Key] = false;
gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.S_Key] = false;
gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.U_Key] = false;
gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.L_Key] = false;

function MessageFunction4DocumentBody4KeyDown(event)
{
	if (event.keyCode == 77) // 'm': 77.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.M_Key] = true;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = false;
	}
	else if (event.keyCode == 67) // 'c': 67.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.C_Key] = true;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = false;
	}
	else if (event.keyCode == 83) // 's': 83.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.S_Key] = true;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = false;
	}
	else if (event.keyCode == 85) // 'u': 85.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.U_Key] = true;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = false;
	}
	else if (event.keyCode == 76) // 'l':76
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.L_Key] = true;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = false;
	}
}

function MessageFunction4DocumentBody4KeyUp(event)
{
	if (event.keyCode == 77) // 'm': 77.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.M_Key] = false;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
	}
	else if (event.keyCode == 67) // 'c': 67.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.C_Key] = false;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
	}
	else if (event.keyCode == 83) // 's': 83.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.S_Key] = false;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
	}
	else if (event.keyCode == 85) // 'u': 85.
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.U_Key] = false;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
	}
	else if (event.keyCode == 76) // 'l':76
	{
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.L_Key] = false;
		gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
	}
	// 20121012. Update the "Input Text Box" "Search".
	if (gbSearchInputTextBoxElementCreated == true)
	{
		var aInputTextBoxElement4SearchGeneName = document.getElementById('SearchGenesSNPsName');
		var sTempSearchBoxString = aInputTextBoxElement4SearchGeneName.value;
		if (gsSearchInputTextBoxStringValue != sTempSearchBoxString)
		{
			gsSearchInputTextBoxStringValue = sTempSearchBoxString;
			if (gsSearchInputTextBoxStringValue != '')
			{	// If the input text search box is not empty, then we need to search and highlight the input string if we can find them.
				// Now, we begin to consider how to highlight the genes with the input string in the "Search:" box.
				// This highlight function will be similar to function "" when you click/select to highlight one node.
				// But, here it is much simple, since we don't need to consider the highlight of related nodes. We only highlight the nodes which begin with the input string.
				var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // 5 is the sixth common canvas.
				var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
				var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
				var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
				aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
				var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
				aAllNodes4RingGraph.RenderTreeRingView4SearchNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gsSearchInputTextBoxStringValue);
			}
			else // if (gsSearchInputTextBoxStringValue == '')
			{	// Then, call the normal rendering function
				var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
				var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
				var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
				var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
				aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
				var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
				aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
				// Call rendering function for LD Ring View. 20130619William.
				var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
				var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
				var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
				aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
				var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
				aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
			}
		}
	}
}

function GetBeingPressedKey()
{
	var sBeingPressedKeyCode = "";
	if (gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] == true)
	{
		sBeingPressedKeyCode = "NoKeyBeingPressed";
	}
	else if (gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.M_Key] == true)
	{
		sBeingPressedKeyCode = "m";
	}
	else if (gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.C_Key] == true)
	{
		sBeingPressedKeyCode = "c";
	}
	else if (gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.S_Key] == true)
	{
		sBeingPressedKeyCode = "s";
	}
	else if (gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.U_Key] == true)
	{
		sBeingPressedKeyCode = "u";
	}
	else if (gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.L_Key] == true)
	{
		sBeingPressedKeyCode = "l";
	}
	return sBeingPressedKeyCode;
}
