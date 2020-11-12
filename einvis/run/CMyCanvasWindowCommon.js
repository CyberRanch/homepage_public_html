function CMyCanvasWindowCommon()
{
	// --------------------- the following are member variables -----------------------
	this.m_nCanvasTopLftPointWidthX = 0; // the Width  X of left top point for the position of the canvas.
	this.m_nCanvasTopLftPointHeghtY = 0; // the Height Y of left top point for the position of the canvas.
	this.m_aCanvasElement; // the element of this canvas.
	this.m_aCanvasContext; // the context of this canvas.
	this.m_nCanvasWidth = 0; // the width  of this canvas.
	this.m_nCanvasHeght = 0; // the height of this canvas.
	this.m_nCanvasBorderColorR = 0; // the Red   of the color of the border of the canvas.
	this.m_nCanvasBorderColorG = 0; // the Green of the color of the border of the canvas.
	this.m_nCanvasBorderColorB = 0; // the Blue  of the color of the border of the canvas.
	this.m_nCanvasBorderInnerPath = new Array(); // the inner path of the border of the canvas.
	this.m_nCanvasBorderInnerPathLineType = new Array(); // line type of the inner path of the border of the canvas.
	// "1" arc line; "2" straight line;
	this.m_nCanvasBorderOuterPath = new Array(); // the outer path of the border of the canvas.
	this.m_nCanvasBorderOuterPathBgnEndPt = new Array(); // the outer path of the border of the canvas.
	this.m_nCanvasBorderOuterPathLineType = new Array(); // line type of the outer path of the border of the canvas.
	this.m_nCanvasBorderWidthSideArc = 5; // the width of the side arc border. it is the height of the arc on one side.
	this.m_nCanvasBorderWidthCorner  = 15; // the width of the corner border. it is the radius of the corner circle.
	this.m_nCanvasInnerBorderCornerRadius = 6; // the radius of the corner circle of the inner border.
	// --- a global flag to move the background canvas. All canvases will be moved when user press the right button and drag the mouse.
	this.m_nFlagOfLeftOrRightOrNoButtonPressed = 0; // "0" no button pressed; "1" left button pressed; "2" left button pressed + ctrl.
	this.m_nPressRightBtnAndDragMouseOldPosWdhX = 0; // the old position of the mouse
	this.m_nPressRightBtnAndDragMouseOldPosHghY = 0; // the old position of the mouse
	// variables to resize the canvas.
	this.m_nResizeCanvasMousPosOldWdhX = 0; // the old width  x of the mouse when resize the canvas.
	this.m_nResizeCanvasMousPosOldHghY = 0; // the old height Y of the mouse when resize the canvas.
	// variables to move the canvas.
	this.m_nMoveSingleCanvasMousPosOldWdhX = 0; // the old width  x of the mouse when resize the canvas.
	this.m_nMoveSingleCanvasMousPosOldHghY = 0; // the old height Y of the mouse when resize the canvas.
	// 20120629William. Add one slider to change the Number of Nodes to be shown in tree ring view. Read 1K, maybe only show 500.
	this.m_aSliderElement4NumOfTopPairs; // the element of slider for number of nodes in the tree ring view.
	this.m_nSlider4NumOfTopPairsPositionX = 280;
	this.m_nSlider4NumOfTopPairsPositionY = 264 + 48;
	// 20120629William. Add one slider to change the bundle strength of the tree ring view with partial nodes.
	this.m_aSliderElement4BundleStrength; // the element of slider for bundle strength of the curve edge in tree ring view.
	this.m_nSlider4BundleStrengthPositionX = 280;
	this.m_nSlider4BundleStrengthPositionY = 304 + 48;
	// 20120630William. Add one radio button to change the multiple selection mode, highlight any of them, or all of them.
	this.m_aRadioBtnElement4HighlightMode1; // any of them
	this.m_aRadioBtnElement4HighlightMode2; // all of them
	this.m_nCanvasID = 0; // "4" Matrix View; "5" Tree Ring View.
	this.m_nRadioBtn4HighlightModePositionY = 392 + 48;
	this.m_nRadioBtn4HighlightModePositionX1 = 212;
	this.m_nRadioBtn4HighlightModePositionX2 = 162;
	// 20120703William. Add the input button, to let user select their own local data files.
	this.m_aButtonElement4ReadLocalFile1; // button to read the local files 1: Unique SNPs Name List File. (Nodes of the graph)
	this.m_nButtonElement4ReadLocalFile1PositionX = 280; // the X coords of position to the top left corner point of the canvas.
	this.m_nButtonElement4ReadLocalFile1PositionY = 40; // the Y coords of position to the top left corner point of the canvas.
	this.m_aButtonElement4ReadLocalFile2; // button to read the local files 2: SNPs Pairs Relationship File. (Edges of the graph)
	this.m_nButtonElement4ReadLocalFile2PositionX = 280; // the X coords of position to the top left corner point of the canvas.
	this.m_nButtonElement4ReadLocalFile2PositionY = 88; // the Y coords of position to the top left corner point of the canvas.
	this.m_aButtonElement4ReadLocalFile3; // button to read the local files 3: SNPs Pairs LD Relationship File. (Edges of another graph)
	this.m_nButtonElement4ReadLocalFile3PositionX = 280; // the X coords of position to the top left corner point of the canvas.
	this.m_nButtonElement4ReadLocalFile3PositionY = 136; // the Y coords of position to the top left corner point of the canvas.
	// 20120704William. Add one checkbox to let user decide whether or not show text (nodes name); Add one slider to let user decide the font size of nodes name.
	this.m_aCheckboxElement4WhetherShowNodesName;
	this.m_aCheckboxElement4WhetherShowNodesNamePositionX = 280;
	this.m_aCheckboxElement4WhetherShowNodesNamePositionY = 368 + 48;
	this.m_aSliderElement4NodesNameFontSize;
	this.m_aSliderElement4NodesNameFontSizePositionX = 280;
	this.m_aSliderElement4NodesNameFontSizePositionY = 344 + 48;
	// 20120706William. Add one button to "Start Render"
	this.m_aButtonElement4StartRender;
	this.m_aButtonElement4StartRenderPositionX = 280;
	this.m_aButtonElement4StartRenderPositionY = 122 + 48;
	// 20120706William. Add one button to take one screenshot. // 20120706. Since "canvas2image.js" is very limited, so we have to remove it now.
//	this.m_aButtonElement4ScreenShot;
//	this.m_aButtonElement4ScreenShotPositionX = 140;
//	this.m_aButtonElement4ScreenShotPositionY = 126;
	// 20120710. William add this function to start render demo, it will read remote data automatically, withour user input the data files manually.
	this.m_aButtonElement4RenderDemo; // This does not work, since the "same origin policy"
	this.m_aButtonElement4RenderDemoPositionX = 140;
	this.m_aButtonElement4RenderDemoPositionY = 122 + 48;
	// 20120711. William Add two drop down cloumn controls to control the color bars of nodes color and edges color.
	this.m_aSelectElement4NodesColor; // drop down select for Nodes Color
	this.m_aSelectElement4NodesColorPositionX = 150;
	this.m_aSelectElement4NodesColorPositionY = 152 + 48;
	this.m_aSelectElement4EdgesColor; // drop down select for Nodes Color
	this.m_aSelectElement4EdgesColorPositionX = 150;
	this.m_aSelectElement4EdgesColorPositionY = 196 + 48;
	// 20120712. Control the background of the tree ring view.
	this.m_aCheckboxElement4BackgroundColor;
	this.m_aCheckboxElement4BackgroundColorPositionX = 170;
	this.m_aCheckboxElement4BackgroundColorPositionY = 368 + 48;
	// 20120928. View Ranking of SNPs by their degree.
	this.m_aButtonElement4ViewRankOfSNPsByDegree; // The button to view the ranks of SNPs by their degree in the epistasis interaction network.
	this.m_aButtonElement4ViewRankOfSNPsByDegreePositionX = 114;
	this.m_aButtonElement4ViewRankOfSNPsByDegreePositionY = 387 + 48;
	// 20121011. The Search Box. Search for Special Gene Names.
	this.m_aInputTextBoxElement4SearchGeneName; // the search box for searching for special genes name.
	this.m_aInputTextBoxElement4SearchGeneNamePositionX = 222;
	this.m_aInputTextBoxElement4SearchGeneNamePositionY = 412 + 48;
}
// --------------------- the following are member functions -----------------------
CMyCanvasWindowCommon.prototype.SetZIndexValue = function(nZIndexValue)
{	// set this canvas's Z-Index value
	this.m_aCanvasElement.style.zIndex = nZIndexValue;
	if (this.m_nCanvasID == gnCanvasID4TreeRingView)
	{
		if (gbDoesUserLoadAnyFiles == true)
		{
			this.m_aSliderElement4BundleStrength.style.zIndex = nZIndexValue; //  + 1
			this.m_aSliderElement4NumOfTopPairs.style.zIndex = nZIndexValue; // + 1
			this.m_aRadioBtnElement4HighlightMode1.style.zIndex = nZIndexValue;
			this.m_aRadioBtnElement4HighlightMode2.style.zIndex = nZIndexValue;
			this.m_aCheckboxElement4WhetherShowNodesName.style.zIndex = nZIndexValue;
			this.m_aSliderElement4NodesNameFontSize.style.zIndex = nZIndexValue;
//			this.m_aButtonElement4ScreenShot.style.zIndex = nZIndexValue;
			this.m_aSelectElement4NodesColor.style.zIndex = nZIndexValue;
			this.m_aSelectElement4EdgesColor.style.zIndex = nZIndexValue;
			this.m_aCheckboxElement4BackgroundColor.style.zIndex = nZIndexValue;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.zIndex = nZIndexValue;
			this.m_aInputTextBoxElement4SearchGeneName.style.zIndex = nZIndexValue;
		}
		this.m_aButtonElement4ReadLocalFile1.style.zIndex = nZIndexValue;
		this.m_aButtonElement4ReadLocalFile2.style.zIndex = nZIndexValue;
		this.m_aButtonElement4ReadLocalFile3.style.zIndex = nZIndexValue;
		this.m_aButtonElement4StartRender.style.zIndex = nZIndexValue;
		this.m_aButtonElement4RenderDemo.style.zIndex = nZIndexValue;
	}
};
CMyCanvasWindowCommon.prototype.SetPressRightBtnAndDragMouseOldMousePos = function(nMousePosClientX, nMousePosClientY)
{
	this.m_nPressRightBtnAndDragMouseOldPosWdhX = nMousePosClientX;
	this.m_nPressRightBtnAndDragMouseOldPosHghY = nMousePosClientY;
};
CMyCanvasWindowCommon.prototype.GetPressRightBtnAndDragMouseOldMousePos = function(vnMousePosClientXY)
{
	vnMousePosClientXY[0] = this.m_nPressRightBtnAndDragMouseOldPosWdhX;
	vnMousePosClientXY[1] = this.m_nPressRightBtnAndDragMouseOldPosHghY;
};
CMyCanvasWindowCommon.prototype.SetFlagOfLeftOrRightOrNoButtonPressed = function(nFlagOfLeftOrRightOrNoButtonPressed)
{
	this.m_nFlagOfLeftOrRightOrNoButtonPressed = nFlagOfLeftOrRightOrNoButtonPressed;
};
CMyCanvasWindowCommon.prototype.GetFlagOfLeftOrRightOrNoButtonPressed = function()
{
	return this.m_nFlagOfLeftOrRightOrNoButtonPressed;
};
CMyCanvasWindowCommon.prototype.SetResizeCanvasMousPosOldXY = function(nResizeCanvasMousPosOldWdhX, nResizeCanvasMousPosOldHghY)
{
	this.m_nResizeCanvasMousPosOldWdhX = nResizeCanvasMousPosOldWdhX;
	this.m_nResizeCanvasMousPosOldHghY = nResizeCanvasMousPosOldHghY;
};
CMyCanvasWindowCommon.prototype.GetResizeCanvasMousPosOldXY = function(vnResizeCanvasMousPosOldXY)
{
	vnResizeCanvasMousPosOldXY[0] = this.m_nResizeCanvasMousPosOldWdhX;
	vnResizeCanvasMousPosOldXY[1] = this.m_nResizeCanvasMousPosOldHghY;
};
CMyCanvasWindowCommon.prototype.SetMoveSingleCanvasMousPosOldXY = function(nMoveSingleCanvasMousPosOldWdhX, nMoveSingleCanvasMousPosOldHghY)
{
	this.m_nMoveSingleCanvasMousPosOldWdhX = nMoveSingleCanvasMousPosOldWdhX;
	this.m_nMoveSingleCanvasMousPosOldHghY = nMoveSingleCanvasMousPosOldHghY;
};
CMyCanvasWindowCommon.prototype.GetMoveSingleCanvasMousPosOldXY = function(vnMoveSingleCanvasMousPosOldXY)
{
	vnMoveSingleCanvasMousPosOldXY[0] = this.m_nMoveSingleCanvasMousPosOldWdhX;
	vnMoveSingleCanvasMousPosOldXY[1] = this.m_nMoveSingleCanvasMousPosOldHghY;
};
CMyCanvasWindowCommon.prototype.ClearInnerBorderPath = function()
{
	this.m_nCanvasBorderInnerPath = [];
	this.m_nCanvasBorderInnerPathLineType = [];
};
CMyCanvasWindowCommon.prototype.ClearOuterBorderPath = function()
{
	this.m_nCanvasBorderOuterPath = [];
	this.m_nCanvasBorderOuterPathLineType = [];
};
CMyCanvasWindowCommon.prototype.InitalizeThisCanvasPosSizeBorderEtc = function(sCanvasId, nCanvasWidth, nCanvasHeght)
{
	this.m_aCanvasElement = document.createElement("canvas"); // create an canvas element;
	this.m_aCanvasContext = this.m_aCanvasElement.getContext("2d");
	this.m_aCanvasElement.id = sCanvasId;
	this.m_nCanvasID = parseInt(sCanvasId);
	this.m_nCanvasTopLftPointWidthX = 0;
	this.m_nCanvasTopLftPointHeghtY = 0;
	this.m_nCanvasWidth = nCanvasWidth;
	this.m_nCanvasHeght = nCanvasHeght;
	var nLftMarginWdh = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes = this.m_nCanvasHeght - nLftMarginWdh * 2;
	this.m_nCanvasBorderColorR = 255;
	this.m_nCanvasBorderColorG = 0;
	this.m_nCanvasBorderColorB = 0;
	this.m_aCanvasElement.style.position = 'absolute';
	this.m_aCanvasElement.style.left = this.m_nCanvasTopLftPointWidthX + 'px';
	this.m_aCanvasElement.style.top  = this.m_nCanvasTopLftPointHeghtY + 'px';
	this.m_aCanvasElement.style.width  = this.m_nCanvasWidth + 'px';
	this.m_aCanvasElement.style.height = this.m_nCanvasHeght + 'px';
	this.m_aCanvasElement.width  = this.m_nCanvasWidth;
	this.m_aCanvasElement.height = this.m_nCanvasHeght;
	this.m_aCanvasElement.style.zIndex = 1;
//	this.m_aCanvasElement.style.border = "blue 1px solid"; // for debug, border will cause extra 2 pixel in height and width, and then the scroll bar will occur.
	document.body.appendChild(this.m_aCanvasElement); // append the canvas element in the document.body
	// Reset the message response function for the this canvas.
	this.m_aCanvasElement.addEventListener('mousedown', this.MessageFunction4CommonCanvas4MouseLeftOrRightButtonDown, false);
	this.m_aCanvasElement.addEventListener('mousemove', this.MessageFunction4CommonCanvas4MouseMove, false);
	this.m_aCanvasElement.addEventListener('mouseup', this.MessageFunction4CommonCanvas4MouseLeftOrRightButtonUp, false);
	// calculate the border and render the border.
	this.InitializeOuterBorderPath(); // calculate the border
	this.InitializeInnerBorderPath(); // calculate the border
	this.RenderOuterBorderPath();
	this.RenderInnerBorderPath(); // inner border must be rendered after outer border.
//	this.RenderRadialGradientBackground(); // 20120712, since blackground is better, so we need to render a blackbackground.
};
CMyCanvasWindowCommon.prototype.RenderOuterBorderPath = function()
{	// 20111003William Test. // render the outer path.
	var nNumOfLine = this.m_nCanvasBorderOuterPath.length;
	this.m_aCanvasContext.beginPath();
	// calculate the begin point
	var nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc;
	var nBgnPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	this.m_aCanvasContext.moveTo(nBgnPointWdhX, nBgnPointHghY);
	for (var nIdxOfLine = 0; nIdxOfLine < nNumOfLine; nIdxOfLine++)
	{
		var nLineType = this.m_nCanvasBorderOuterPathLineType[nIdxOfLine];
		if (nLineType == 1)
		{	// "1" arc line.
			var vArcParamsRefer = this.m_nCanvasBorderOuterPath[nIdxOfLine];
			var nCornerWdhX = vArcParamsRefer[0];
			var nCornerHghY = vArcParamsRefer[1];
			var nRadius = vArcParamsRefer[2];
			var dStartingAngle = vArcParamsRefer[3];
			var dEndingAngle = vArcParamsRefer[4];
			var bAntiClockwise = vArcParamsRefer[5];
			this.m_aCanvasContext.arc(nCornerWdhX, nCornerHghY, nRadius, dStartingAngle, dEndingAngle, bAntiClockwise);
		}
		else if (nLineType == 2)
		{	// "2" straight line.
			var vStraightLineRefer = this.m_nCanvasBorderOuterPath[nIdxOfLine];
//			var nBgnPtWdhX = vStraightLineRefer[0];
//			var nBgnPtHghY = vStraightLineRefer[1];
			var nEndPtWdhX = vStraightLineRefer[2];
			var nEndPtHghY = vStraightLineRefer[3];
			this.m_aCanvasContext.lineTo(nEndPtWdhX, nEndPtHghY);
		}
	}
	// generate one gradient fill style. We can not generate custom fill style, we only can generate linear or radial fill style.
	var aGradientFillStyleObj = this.m_aCanvasContext.createLinearGradient(0,0,this.m_nCanvasWidth,this.m_nCanvasHeght);
	aGradientFillStyleObj.addColorStop(0.0, "rgba(135, 206, 235, 0.7)");
	aGradientFillStyleObj.addColorStop(1.0, "rgba( 30, 144, 255, 0.7)");
	this.m_aCanvasContext.fillStyle = aGradientFillStyleObj;
//	this.m_aCanvasContext.fillStyle = 'rgba(0, 0, 255, 0.8)';
	this.m_aCanvasContext.fill();
};
CMyCanvasWindowCommon.prototype.RenderInnerBorderPath = function()
{	// 20111003William Test.
	// render the outer path.
	var nNumOfLine = this.m_nCanvasBorderInnerPath.length;
	this.m_aCanvasContext.beginPath();
	// calculate the begin point
	var nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nBgnPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	this.m_aCanvasContext.moveTo(nBgnPointWdhX, nBgnPointHghY);
	for (var nIdxOfLine = 0; nIdxOfLine < nNumOfLine; nIdxOfLine++)
	{
		var nLineType = this.m_nCanvasBorderInnerPathLineType[nIdxOfLine];
		if (nLineType == 1)
		{	// "1" arc line.
			var vArcParamsRefer = this.m_nCanvasBorderInnerPath[nIdxOfLine];
			var nCornerWdhX = vArcParamsRefer[0];
			var nCornerHghY = vArcParamsRefer[1];
			var nRadius = vArcParamsRefer[2];
			var dStartingAngle = vArcParamsRefer[3];
			var dEndingAngle = vArcParamsRefer[4];
			var bAntiClockwise = vArcParamsRefer[5];
			this.m_aCanvasContext.arc(nCornerWdhX, nCornerHghY, nRadius, dStartingAngle, dEndingAngle, bAntiClockwise);
		}
		else if (nLineType == 2)
		{	// "2" straight line.
			var vStraightLineRefer = this.m_nCanvasBorderInnerPath[nIdxOfLine];
//			var nBgnPtWdhX = vStraightLineRefer[0];
//			var nBgnPtHghY = vStraightLineRefer[1];
			var nEndPtWdhX = vStraightLineRefer[2];
			var nEndPtHghY = vStraightLineRefer[3];
			this.m_aCanvasContext.lineTo(nEndPtWdhX, nEndPtHghY);
		}
	}
	this.m_aCanvasContext.fillStyle = 'rgba(255, 255, 255, 1.0)';
//	this.m_aCanvasContext.fillStyle = 'rgba(50, 50, 50, 1.0)'; // 20120712William Change it to Black.
//	this.m_aCanvasContext.fillStyle = 'rgba(0, 0, 0, 1.0)'; // 20120712William Change it to Black. I think the blacker, the better.
	this.m_aCanvasContext.fill();
};
CMyCanvasWindowCommon.prototype.RenderRadialGradientBackground = function()
{ // 20120712, since black background is better, so we need to render a black background.
	if (this.m_nCanvasID == gnCanvasID4TreeRingView || this.m_nCanvasID == gnCanvasID4LDRingView)
	{
		var nHaloWidth = 20;
		var nCanvasHeght = this.m_nCanvasHeght;
		var nMarginWidth = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
		var nCircleCenterPosX = Math.round(nCanvasHeght / 2);
		var nCircleCenterPosY = nCircleCenterPosX;
		var nCircleInnerRadius = (nCanvasHeght - 2 * nMarginWidth - 2 * this.m_nCanvasInnerBorderCornerRadius) / 2;
		var nCircleOuterRadius = (nCanvasHeght - 2 * nMarginWidth) / 2;
//		var nCircleOuterRadiusExtent = Math.sqrt(2 * nCircleOuterRadius * nCircleOuterRadius); // + 200
		var nCircleOuterRadiusExtent = nCircleInnerRadius + nHaloWidth; // + 200
		var dCircleTotalBlackRegionRatio = nCircleInnerRadius / nCircleOuterRadiusExtent;
		var nRectLeftUpPtX = nMarginWidth;
		var nRectLeftUpPtY = nMarginWidth;
		var nRectWidth = nCanvasHeght - 2 * nMarginWidth;
		var nRectHeght = nRectWidth;
		var aRadialGradient = this.m_aCanvasContext.createRadialGradient(nCircleCenterPosX,nCircleCenterPosY,0,nCircleCenterPosX,nCircleCenterPosY,nCircleOuterRadiusExtent);
		aRadialGradient.addColorStop(0,"rgb(0,0,0)");
		aRadialGradient.addColorStop(dCircleTotalBlackRegionRatio,"rgb(0,0,0)");
		aRadialGradient.addColorStop(dCircleTotalBlackRegionRatio,"rgb(180,180,180)");
		aRadialGradient.addColorStop(1,"white");
		this.m_aCanvasContext.fillStyle = aRadialGradient;
		if (this.m_nCanvasID == gnCanvasID4TreeRingView) {
			this.m_aCanvasContext.fillRect(nRectLeftUpPtX,nRectLeftUpPtY,nRectWidth + nHaloWidth,nRectHeght);
		} else {
			this.m_aCanvasContext.fillRect(nRectLeftUpPtX,nRectLeftUpPtY,nRectWidth,nRectHeght);
		}
	}
};
CMyCanvasWindowCommon.prototype.InitializeInnerBorderPath = function()
{	// initialize the inner border path.
	// 					 top
	//      	(end)   (med)  (bgn)
	//      (bgn) +--------------+ (end)
	// left (med) |              | (med) right
	//      (end) +--------------+ (bgn)
	//		    (bgn)   (med)  (end)
	// 					bottom
	// so it is always keep the direction of anticlockwise.
	// --- left side ---
	var nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nBgnPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	var nEndPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nEndPointHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	var vStraightLineLeftSide = new Array();
	vStraightLineLeftSide.push(nBgnPointWdhX);
	vStraightLineLeftSide.push(nBgnPointHghY);
	vStraightLineLeftSide.push(nEndPointWdhX);
	vStraightLineLeftSide.push(nEndPointHghY);
	this.m_nCanvasBorderInnerPath.push(vStraightLineLeftSide);
	this.m_nCanvasBorderInnerPathLineType.push(2); // 2 straight line.
	// --- left bottom corner ---
	var nCenterPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	var nCenterPointHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	var nRadius = this.m_nCanvasInnerBorderCornerRadius;
	var dStartingAngle = Math.PI;
	var dEndingAngle = 0.5 * Math.PI;
	var bAnticlockwise = true;
	var vArcLineLeftBottomCorner = new Array();
	vArcLineLeftBottomCorner.push(nCenterPointWdhX);
	vArcLineLeftBottomCorner.push(nCenterPointHghY);
	vArcLineLeftBottomCorner.push(nRadius);
	vArcLineLeftBottomCorner.push(dStartingAngle);
	vArcLineLeftBottomCorner.push(dEndingAngle);
	vArcLineLeftBottomCorner.push(bAnticlockwise);
	this.m_nCanvasBorderInnerPath.push(vArcLineLeftBottomCorner);
	this.m_nCanvasBorderInnerPathLineType.push(1); // 1 arc line.
	// --- bottom side ---
	nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	nBgnPointHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner);
	nEndPointWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	nEndPointHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner);
	var vStraightLineBottomSide = new Array();
	vStraightLineBottomSide.push(nBgnPointWdhX);
	vStraightLineBottomSide.push(nBgnPointHghY);
	vStraightLineBottomSide.push(nEndPointWdhX);
	vStraightLineBottomSide.push(nEndPointHghY);
	this.m_nCanvasBorderInnerPath.push(vStraightLineBottomSide);
	this.m_nCanvasBorderInnerPathLineType.push(2); // 2 straight line.
	// --- bottom right corner ---
	nCenterPointWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	nCenterPointHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	nRadius = this.m_nCanvasInnerBorderCornerRadius;
	dStartingAngle = 0.5 * Math.PI;
	dEndingAngle = 0.0 * Math.PI;
	bAnticlockwise = true;
	var vArcLineBottomRightCorner = new Array();
	vArcLineBottomRightCorner.push(nCenterPointWdhX);
	vArcLineBottomRightCorner.push(nCenterPointHghY);
	vArcLineBottomRightCorner.push(nRadius);
	vArcLineBottomRightCorner.push(dStartingAngle);
	vArcLineBottomRightCorner.push(dEndingAngle);
	vArcLineBottomRightCorner.push(bAnticlockwise);
	this.m_nCanvasBorderInnerPath.push(vArcLineBottomRightCorner);
	this.m_nCanvasBorderInnerPathLineType.push(1); // 1 arc line.
	// --- right side ---
	nBgnPointWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner);
	nBgnPointHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	nEndPointWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner);
	nEndPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	var vStraightLineRightSide = new Array();
	vStraightLineRightSide.push(nBgnPointWdhX);
	vStraightLineRightSide.push(nBgnPointHghY);
	vStraightLineRightSide.push(nEndPointWdhX);
	vStraightLineRightSide.push(nEndPointHghY);
	this.m_nCanvasBorderInnerPath.push(vStraightLineRightSide);
	this.m_nCanvasBorderInnerPathLineType.push(2); // 2 straight line.
	// --- right top corner ---
	nCenterPointWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	nCenterPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	nRadius = this.m_nCanvasInnerBorderCornerRadius;
	dStartingAngle = 0.0 * Math.PI;
	dEndingAngle = 1.5 * Math.PI;
	bAnticlockwise = true;
	var vArcLineRightTopCorner = new Array();
	vArcLineRightTopCorner.push(nCenterPointWdhX);
	vArcLineRightTopCorner.push(nCenterPointHghY);
	vArcLineRightTopCorner.push(nRadius);
	vArcLineRightTopCorner.push(dStartingAngle);
	vArcLineRightTopCorner.push(dEndingAngle);
	vArcLineRightTopCorner.push(bAnticlockwise);
	this.m_nCanvasBorderInnerPath.push(vArcLineRightTopCorner);
	this.m_nCanvasBorderInnerPathLineType.push(1); // 1 arc line.
	// --- top side ---
	nBgnPointWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius);
	nBgnPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nEndPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	nEndPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var vStraightLineTopSide = new Array();
	vStraightLineTopSide.push(nBgnPointWdhX);
	vStraightLineTopSide.push(nBgnPointHghY);
	vStraightLineTopSide.push(nEndPointWdhX);
	vStraightLineTopSide.push(nEndPointHghY);
	this.m_nCanvasBorderInnerPath.push(vStraightLineTopSide);
	this.m_nCanvasBorderInnerPathLineType.push(2); // 2 straight line.
	// --- top left corner ---
	nCenterPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	nCenterPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner + this.m_nCanvasInnerBorderCornerRadius;
	nRadius = this.m_nCanvasInnerBorderCornerRadius;
	dStartingAngle = 1.5 * Math.PI;
	dEndingAngle = 1.0 * Math.PI;
	bAnticlockwise = true;
	var vArcLineTopLeftCorner = new Array();
	vArcLineTopLeftCorner.push(nCenterPointWdhX);
	vArcLineTopLeftCorner.push(nCenterPointHghY);
	vArcLineTopLeftCorner.push(nRadius);
	vArcLineTopLeftCorner.push(dStartingAngle);
	vArcLineTopLeftCorner.push(dEndingAngle);
	vArcLineTopLeftCorner.push(bAnticlockwise);
	this.m_nCanvasBorderInnerPath.push(vArcLineTopLeftCorner);
	this.m_nCanvasBorderInnerPathLineType.push(1); // 1 arc line.
};
CMyCanvasWindowCommon.prototype.InitializeOuterBorderPathBorderArc = function()
{
	// 20130915William change border arc to straight line in function "InitializeOuterBorderPath()".
	// This function is abondoned.
	// initialize the outer border path.
	// 					 top
	//      	(end)   (med)  (bgn)
	//      (bgn) +--------------+ (end)
	// left (med) |              | (med) right
	//      (end) +--------------+ (bgn)
	//		    (bgn)   (med)  (end)
	// 					bottom
	// so it is always keep the direction of anticlockwise.
	// --- left side ---
	var nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc;
	var nBgnPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nMedPointWdhX = 0;
	var nMedPointHghY = this.m_nCanvasHeght / 2; // "Math.floor" will generate a bug.
	var nEndPointWdhX = this.m_nCanvasBorderWidthSideArc;
	var nEndPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	var vArcParamsLeftSide = new Array();
	this.CalculateArcParametersAccordingToThreePoints(nBgnPointWdhX, nBgnPointHghY, nMedPointWdhX, nMedPointHghY, nEndPointWdhX, nEndPointHghY, vArcParamsLeftSide);
	this.m_nCanvasBorderOuterPath.push(vArcParamsLeftSide);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// Store Begin and End Points.
	var nRadius = vArcParamsLeftSide[2];
	var vArcBgnEndPt = new Array();
	vArcBgnEndPt.push(nBgnPointWdhX);
	vArcBgnEndPt.push(nBgnPointHghY);
	vArcBgnEndPt.push(nEndPointWdhX);
	vArcBgnEndPt.push(nEndPointHghY);
	vArcBgnEndPt.push(nRadius);
	this.m_nCanvasBorderOuterPathBgnEndPt.push(vArcBgnEndPt);
	// --- left bottom corner ---
	var vArcParamsLeftBottomCorner = new Array();
	var nCornerWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nCornerHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	var nRadius = this.m_nCanvasBorderWidthCorner;
	var dStartingAngle = Math.PI;
	var dEndingAngle = 0.5 * Math.PI;
	var bAntiClockwise = true;
	vArcParamsLeftBottomCorner.push(nCornerWdhX);
	vArcParamsLeftBottomCorner.push(nCornerHghY);
	vArcParamsLeftBottomCorner.push(nRadius);
	vArcParamsLeftBottomCorner.push(dStartingAngle);
	vArcParamsLeftBottomCorner.push(dEndingAngle);
	vArcParamsLeftBottomCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsLeftBottomCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// --- bottom side ---
	nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nBgnPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc;
	nMedPointWdhX = this.m_nCanvasWidth / 2; // "Math.floor" will generate a bug.
	nMedPointHghY = this.m_nCanvasHeght;
	nEndPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nEndPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc;
	var vArcParamsBottomSide = new Array();
	this.CalculateArcParametersAccordingToThreePoints(nBgnPointWdhX, nBgnPointHghY, nMedPointWdhX, nMedPointHghY, nEndPointWdhX, nEndPointHghY, vArcParamsBottomSide);
	this.m_nCanvasBorderOuterPath.push(vArcParamsBottomSide);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// Store Begin and End Points.
	var nRadius = vArcParamsLeftSide[2];
	var vArcBgnEndPt = new Array();
	vArcBgnEndPt.push(nBgnPointWdhX);
	vArcBgnEndPt.push(nBgnPointHghY);
	vArcBgnEndPt.push(nEndPointWdhX);
	vArcBgnEndPt.push(nEndPointHghY);
	vArcBgnEndPt.push(nRadius);
	this.m_nCanvasBorderOuterPathBgnEndPt.push(vArcBgnEndPt);
	// --- bottom right corner ---
	var vArcParamsBottomRightCorner = new Array();
	nCornerWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nCornerHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nRadius = this.m_nCanvasBorderWidthCorner;
	dStartingAngle = 0.5 * Math.PI;
	dEndingAngle = 0.0 * Math.PI;
	bAntiClockwise = true;
	vArcParamsBottomRightCorner.push(nCornerWdhX);
	vArcParamsBottomRightCorner.push(nCornerHghY);
	vArcParamsBottomRightCorner.push(nRadius);
	vArcParamsBottomRightCorner.push(dStartingAngle);
	vArcParamsBottomRightCorner.push(dEndingAngle);
	vArcParamsBottomRightCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsBottomRightCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// --- right side ---
	nBgnPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc;
	nBgnPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nMedPointWdhX = this.m_nCanvasWidth;
	nMedPointHghY = this.m_nCanvasHeght / 2; // "Math.floor" will generate a bug.
	nEndPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc;
	nEndPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var vArcParamsRightSide = new Array();
	this.CalculateArcParametersAccordingToThreePoints(nBgnPointWdhX, nBgnPointHghY, nMedPointWdhX, nMedPointHghY, nEndPointWdhX, nEndPointHghY, vArcParamsRightSide);
	this.m_nCanvasBorderOuterPath.push(vArcParamsRightSide);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// Store Begin and End Points.
	var nRadius = vArcParamsLeftSide[2];
	var vArcBgnEndPt = new Array();
	vArcBgnEndPt.push(nBgnPointWdhX);
	vArcBgnEndPt.push(nBgnPointHghY);
	vArcBgnEndPt.push(nEndPointWdhX);
	vArcBgnEndPt.push(nEndPointHghY);
	vArcBgnEndPt.push(nRadius);
	this.m_nCanvasBorderOuterPathBgnEndPt.push(vArcBgnEndPt);
	// --- right top corner ---
	var vArcParamsRightTopCorner = new Array();
	nCornerWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nCornerHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nRadius = this.m_nCanvasBorderWidthCorner;
	dStartingAngle = 0.0 * Math.PI;
	dEndingAngle = 1.5 * Math.PI;
	bAntiClockwise = true;
	vArcParamsRightTopCorner.push(nCornerWdhX);
	vArcParamsRightTopCorner.push(nCornerHghY);
	vArcParamsRightTopCorner.push(nRadius);
	vArcParamsRightTopCorner.push(dStartingAngle);
	vArcParamsRightTopCorner.push(dEndingAngle);
	vArcParamsRightTopCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsRightTopCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// --- top side ---
	nBgnPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nBgnPointHghY = this.m_nCanvasBorderWidthSideArc;
	nMedPointWdhX = this.m_nCanvasWidth / 2; // "Math.floor" will generate a bug.
	nMedPointHghY = 0;
	nEndPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nEndPointHghY = this.m_nCanvasBorderWidthSideArc;
	var vArcParamsTopSide = new Array();
	this.CalculateArcParametersAccordingToThreePoints(nBgnPointWdhX, nBgnPointHghY, nMedPointWdhX, nMedPointHghY, nEndPointWdhX, nEndPointHghY, vArcParamsTopSide);
	this.m_nCanvasBorderOuterPath.push(vArcParamsTopSide);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// Store Begin and End Points.
	var nRadius = vArcParamsLeftSide[2];
	var vArcBgnEndPt = new Array();
	vArcBgnEndPt.push(nBgnPointWdhX);
	vArcBgnEndPt.push(nBgnPointHghY);
	vArcBgnEndPt.push(nEndPointWdhX);
	vArcBgnEndPt.push(nEndPointHghY);
	vArcBgnEndPt.push(nRadius);
	this.m_nCanvasBorderOuterPathBgnEndPt.push(vArcBgnEndPt);
	// --- top left corner ---
	var vArcParamsTopLeftCorner = new Array();
	nCornerWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nCornerHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nRadius = this.m_nCanvasBorderWidthCorner;
	dStartingAngle = 1.5 * Math.PI;
	dEndingAngle = 1.0 * Math.PI;
	bAntiClockwise = true;
	vArcParamsTopLeftCorner.push(nCornerWdhX);
	vArcParamsTopLeftCorner.push(nCornerHghY);
	vArcParamsTopLeftCorner.push(nRadius);
	vArcParamsTopLeftCorner.push(dStartingAngle);
	vArcParamsTopLeftCorner.push(dEndingAngle);
	vArcParamsTopLeftCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsTopLeftCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
};
CMyCanvasWindowCommon.prototype.InitializeOuterBorderPath = function()
{	// initialize the outer border path.
	// 					 top
	//      	(end)   (med)  (bgn)
	//      (bgn) +--------------+ (end)
	// left (med) |              | (med) right
	//      (end) +--------------+ (bgn)
	//		    (bgn)   (med)  (end)
	// 					bottom
	// so it is always keep the direction of anticlockwise.
	// --- left side ---
	var nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc;
	var nBgnPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nEndPointWdhX = this.m_nCanvasBorderWidthSideArc;
	var nEndPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	var vStraightLineLeftSide = new Array();
	vStraightLineLeftSide.push(nBgnPointWdhX);
	vStraightLineLeftSide.push(nBgnPointHghY);
	vStraightLineLeftSide.push(nEndPointWdhX);
	vStraightLineLeftSide.push(nEndPointHghY);
	this.m_nCanvasBorderOuterPath.push(vStraightLineLeftSide);
	this.m_nCanvasBorderOuterPathLineType.push(2); // "arc" line.
	// --- left bottom corner ---
	var vArcParamsLeftBottomCorner = new Array();
	var nCornerWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var nCornerHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	var nRadius = this.m_nCanvasBorderWidthCorner;
	var dStartingAngle = Math.PI;
	var dEndingAngle = 0.5 * Math.PI;
	var bAntiClockwise = true;
	vArcParamsLeftBottomCorner.push(nCornerWdhX);
	vArcParamsLeftBottomCorner.push(nCornerHghY);
	vArcParamsLeftBottomCorner.push(nRadius);
	vArcParamsLeftBottomCorner.push(dStartingAngle);
	vArcParamsLeftBottomCorner.push(dEndingAngle);
	vArcParamsLeftBottomCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsLeftBottomCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// --- bottom side ---
	nBgnPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nBgnPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc;
	nEndPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nEndPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc;
	var vStraightLineLeftSide = new Array();
	vStraightLineLeftSide.push(nBgnPointWdhX);
	vStraightLineLeftSide.push(nBgnPointHghY);
	vStraightLineLeftSide.push(nEndPointWdhX);
	vStraightLineLeftSide.push(nEndPointHghY);
	this.m_nCanvasBorderOuterPath.push(vStraightLineLeftSide);
	this.m_nCanvasBorderOuterPathLineType.push(2); // "arc" line.
	// --- bottom right corner ---
	var vArcParamsBottomRightCorner = new Array();
	nCornerWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nCornerHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nRadius = this.m_nCanvasBorderWidthCorner;
	dStartingAngle = 0.5 * Math.PI;
	dEndingAngle = 0.0 * Math.PI;
	bAntiClockwise = true;
	vArcParamsBottomRightCorner.push(nCornerWdhX);
	vArcParamsBottomRightCorner.push(nCornerHghY);
	vArcParamsBottomRightCorner.push(nRadius);
	vArcParamsBottomRightCorner.push(dStartingAngle);
	vArcParamsBottomRightCorner.push(dEndingAngle);
	vArcParamsBottomRightCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsBottomRightCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// --- right side ---
	nBgnPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc;
	nBgnPointHghY = this.m_nCanvasHeght - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nEndPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc;
	nEndPointHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	var vStraightLineLeftSide = new Array();
	vStraightLineLeftSide.push(nBgnPointWdhX);
	vStraightLineLeftSide.push(nBgnPointHghY);
	vStraightLineLeftSide.push(nEndPointWdhX);
	vStraightLineLeftSide.push(nEndPointHghY);
	this.m_nCanvasBorderOuterPath.push(vStraightLineLeftSide);
	this.m_nCanvasBorderOuterPathLineType.push(2); // "arc" line.
	// --- right top corner ---
	var vArcParamsRightTopCorner = new Array();
	nCornerWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nCornerHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nRadius = this.m_nCanvasBorderWidthCorner;
	dStartingAngle = 0.0 * Math.PI;
	dEndingAngle = 1.5 * Math.PI;
	bAntiClockwise = true;
	vArcParamsRightTopCorner.push(nCornerWdhX);
	vArcParamsRightTopCorner.push(nCornerHghY);
	vArcParamsRightTopCorner.push(nRadius);
	vArcParamsRightTopCorner.push(dStartingAngle);
	vArcParamsRightTopCorner.push(dEndingAngle);
	vArcParamsRightTopCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsRightTopCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
	// --- top side ---
	nBgnPointWdhX = this.m_nCanvasWidth - this.m_nCanvasBorderWidthSideArc - this.m_nCanvasBorderWidthCorner;
	nBgnPointHghY = this.m_nCanvasBorderWidthSideArc;
	nEndPointWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nEndPointHghY = this.m_nCanvasBorderWidthSideArc;
	var vStraightLineLeftSide = new Array();
	vStraightLineLeftSide.push(nBgnPointWdhX);
	vStraightLineLeftSide.push(nBgnPointHghY);
	vStraightLineLeftSide.push(nEndPointWdhX);
	vStraightLineLeftSide.push(nEndPointHghY);
	this.m_nCanvasBorderOuterPath.push(vStraightLineLeftSide);
	this.m_nCanvasBorderOuterPathLineType.push(2); // "arc" line.
	// --- top left corner ---
	var vArcParamsTopLeftCorner = new Array();
	nCornerWdhX = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nCornerHghY = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner;
	nRadius = this.m_nCanvasBorderWidthCorner;
	dStartingAngle = 1.5 * Math.PI;
	dEndingAngle = 1.0 * Math.PI;
	bAntiClockwise = true;
	vArcParamsTopLeftCorner.push(nCornerWdhX);
	vArcParamsTopLeftCorner.push(nCornerHghY);
	vArcParamsTopLeftCorner.push(nRadius);
	vArcParamsTopLeftCorner.push(dStartingAngle);
	vArcParamsTopLeftCorner.push(dEndingAngle);
	vArcParamsTopLeftCorner.push(bAntiClockwise);
	this.m_nCanvasBorderOuterPath.push(vArcParamsTopLeftCorner);
	this.m_nCanvasBorderOuterPathLineType.push(1); // "arc" line.
};
CMyCanvasWindowCommon.prototype.CalculateArcParametersAccordingToThreePoints = function(nBgnPointWdhX, nBgnPointHghY, nMedPointWdhX, nMedPointHghY, nEndPointWdhX, nEndPointHghY, vArcParams)
{	// Point A(nBgnPointWdhX, nBgnPointHghY) and B(nEndPointWdhX, nEndPointHghY) is a chord.
	// Point C(nMedPointWdhX, nMedPointHghY) is the median point of the chord.
	// we need to calculate the arc parameters:
	// context.arc(centerX, centerY, radius, startingAngle, endingAngle, antiClockwise);
	// "vArcParams" is an array, stores these parameters.
	var dChordLenSquareAB = Math.pow((nBgnPointWdhX - nEndPointWdhX), 2) + Math.pow((nBgnPointHghY - nEndPointHghY), 2);
	var dChordLenSquareAC = Math.pow((nBgnPointWdhX - nMedPointWdhX), 2) + Math.pow((nBgnPointHghY - nMedPointHghY), 2);
	var dRadiusSquare = Math.pow(dChordLenSquareAC, 2) / (4 * dChordLenSquareAC - dChordLenSquareAB);
	var dRadius = Math.sqrt(dRadiusSquare); // we get the radius of the circle.
	var nRadius = Math.round(dRadius);
	var dChordLenABHalf = Math.sqrt(dChordLenSquareAB) / 2;
	// we can try to get the center of the circle
	var nCenterWdhX = 0; // the widht X of center point.
	var nCenterHghY = 0; // the height Y of center point.
	var dChordAngleHalf = 0.0; // the chord AB's angle's half.
	var dStartingAngle = 0.0; // the starting angle;
	var dEndingAngle = 0.0; // the ending angle;
	var bAntiClockwise = true; // whether anticlockwise
	if (nBgnPointWdhX == nEndPointWdhX)
	{	// if the begin and end point in the same Width  X value; // left or right side.
		if (nBgnPointWdhX > nMedPointWdhX)
		{	// left side
			nCenterWdhX = nMedPointWdhX + nRadius;
			nCenterHghY = nMedPointHghY;
			dChordAngleHalf = Math.asin(dChordLenABHalf / dRadius); // it is must be positive.
			dStartingAngle = Math.PI + dChordAngleHalf;
			dEndingAngle   = Math.PI - dChordAngleHalf;
			bAntiClockwise = true;
		}
		else if (nBgnPointWdhX < nMedPointWdhX)
		{	// right side
			nCenterWdhX = nMedPointWdhX - nRadius;
			nCenterHghY = nMedPointHghY;
			dChordAngleHalf = Math.asin(dChordLenABHalf / dRadius); // it is must be positive.
			dStartingAngle = 0.0 * Math.PI + dChordAngleHalf;
			dEndingAngle   = 2.0 * Math.PI - dChordAngleHalf;
			bAntiClockwise = true;
		}
	}
	else if(nBgnPointHghY == nEndPointHghY)
	{	// if the begin and end point in the same Height Y value; // top or bottom side.
		if (nBgnPointHghY > nMedPointHghY)
		{	// top side
			nCenterWdhX = nMedPointWdhX;
			nCenterHghY = nMedPointHghY + nRadius;
			dChordAngleHalf = Math.asin(dChordLenABHalf / dRadius); // it is must be positive.
			dStartingAngle = 1.5 * Math.PI + dChordAngleHalf;
			dEndingAngle   = 1.5 * Math.PI - dChordAngleHalf;
			bAntiClockwise = true;
		}
		else if (nBgnPointHghY < nMedPointHghY)
		{	// bottom side
			nCenterWdhX = nMedPointWdhX;
			nCenterHghY = nMedPointHghY - nRadius;
			dChordAngleHalf = Math.asin(dChordLenABHalf / dRadius); // it is must be positive.
			dStartingAngle = 0.5 * Math.PI + dChordAngleHalf;
			dEndingAngle   = 0.5 * Math.PI - dChordAngleHalf;
			bAntiClockwise = true;
		}
	}
	vArcParams.push(nCenterWdhX);
	vArcParams.push(nCenterHghY);
	vArcParams.push(nRadius);
	vArcParams.push(dStartingAngle);
	vArcParams.push(dEndingAngle);
	vArcParams.push(bAntiClockwise);
};
CMyCanvasWindowCommon.prototype.ReRenderThisCanvas = function()
{
	this.RenderOuterBorderPath();
	this.RenderInnerBorderPath(); // inner border must be rendered after outer border.
};
CMyCanvasWindowCommon.prototype.MoveCanvasAbsolutePositionWithOffset = function(nMouseRightDownDragMoveOffsetWdhX, nMouseRightDownDragMoveOffsetHghY)
{	// move the position (left top base point) of a canvas with offset value.
	// this fun is used to move canvas when user move it using mouse.
	this.m_nCanvasTopLftPointWidthX  = this.m_nCanvasTopLftPointWidthX + nMouseRightDownDragMoveOffsetWdhX;
	this.m_nCanvasTopLftPointHeghtY  = this.m_nCanvasTopLftPointHeghtY + nMouseRightDownDragMoveOffsetHghY;
	this.m_aCanvasElement.style.left = this.m_nCanvasTopLftPointWidthX + 'px';
	this.m_aCanvasElement.style.top  = this.m_nCanvasTopLftPointHeghtY + 'px';
	if (this.m_nCanvasID == gnCanvasID4TreeRingView)
	{
		if (gbDoesUserLoadAnyFiles == true)
		{
			this.m_aSliderElement4BundleStrength.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4BundleStrengthPositionX;
			this.m_aSliderElement4BundleStrength.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4BundleStrengthPositionY;
			this.m_aSliderElement4NumOfTopPairs.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4NumOfTopPairsPositionX;
			this.m_aSliderElement4NumOfTopPairs.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4NumOfTopPairsPositionY;
			this.m_aRadioBtnElement4HighlightMode1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX1;
			this.m_aRadioBtnElement4HighlightMode1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
			this.m_aRadioBtnElement4HighlightMode2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX2;
			this.m_aRadioBtnElement4HighlightMode2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
			this.m_aCheckboxElement4WhetherShowNodesName.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4WhetherShowNodesNamePositionX;
			this.m_aCheckboxElement4WhetherShowNodesName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4WhetherShowNodesNamePositionY;
			this.m_aSliderElement4NodesNameFontSize.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSliderElement4NodesNameFontSizePositionX;
			this.m_aSliderElement4NodesNameFontSize.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSliderElement4NodesNameFontSizePositionY;
//			this.m_aButtonElement4ScreenShot.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aButtonElement4ScreenShotPositionX;
//			this.m_aButtonElement4ScreenShot.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ScreenShotPositionY;
			this.m_aSelectElement4NodesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4NodesColorPositionX;
			this.m_aSelectElement4NodesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4NodesColorPositionY;
			this.m_aSelectElement4EdgesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4EdgesColorPositionX;
			this.m_aSelectElement4EdgesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4EdgesColorPositionY;
			this.m_aCheckboxElement4BackgroundColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4BackgroundColorPositionX;
			this.m_aCheckboxElement4BackgroundColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4BackgroundColorPositionY;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4ViewRankOfSNPsByDegreePositionX;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ViewRankOfSNPsByDegreePositionY;
			this.m_aInputTextBoxElement4SearchGeneName.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aInputTextBoxElement4SearchGeneNamePositionX;
			this.m_aInputTextBoxElement4SearchGeneName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aInputTextBoxElement4SearchGeneNamePositionY;
		}
		this.m_aButtonElement4ReadLocalFile1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile1PositionX;
		this.m_aButtonElement4ReadLocalFile1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile1PositionY;
		this.m_aButtonElement4ReadLocalFile2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile2PositionX;
		this.m_aButtonElement4ReadLocalFile2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile2PositionY;
		this.m_aButtonElement4ReadLocalFile3.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile3PositionX;
		this.m_aButtonElement4ReadLocalFile3.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile3PositionY;
		this.m_aButtonElement4StartRender.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4StartRenderPositionX;
		this.m_aButtonElement4StartRender.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4StartRenderPositionY;
		this.m_aButtonElement4RenderDemo.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4RenderDemoPositionX;
		this.m_aButtonElement4RenderDemo.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4RenderDemoPositionY;
	}
};
CMyCanvasWindowCommon.prototype.MoveCanvasAbsolutePositionToAbsltPoint = function(nLftTopPointWdhX, nLftTopPointHghY)
{	// move the position (left top base point) of a canvas to a absolute point.
	// this fun is used to move canvas when we initialize one canvas's position.
	this.m_nCanvasTopLftPointWidthX  = nLftTopPointWdhX;
	this.m_nCanvasTopLftPointHeghtY  = nLftTopPointHghY;
	this.m_aCanvasElement.style.left = this.m_nCanvasTopLftPointWidthX + 'px';
	this.m_aCanvasElement.style.top  = this.m_nCanvasTopLftPointHeghtY + 'px';
	if (this.m_nCanvasID == gnCanvasID4TreeRingView)
	{
		if (gbDoesUserLoadAnyFiles == true)
		{
			this.m_aSliderElement4BundleStrength.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4BundleStrengthPositionX;
			this.m_aSliderElement4BundleStrength.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4BundleStrengthPositionY;
			this.m_aSliderElement4NumOfTopPairs.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4NumOfTopPairsPositionX;
			this.m_aSliderElement4NumOfTopPairs.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4NumOfTopPairsPositionY;
			this.m_aRadioBtnElement4HighlightMode1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX1;
			this.m_aRadioBtnElement4HighlightMode1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
			this.m_aRadioBtnElement4HighlightMode2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX2;
			this.m_aRadioBtnElement4HighlightMode2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
			this.m_aCheckboxElement4WhetherShowNodesName.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4WhetherShowNodesNamePositionX;
			this.m_aCheckboxElement4WhetherShowNodesName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4WhetherShowNodesNamePositionY;
			this.m_aSliderElement4NodesNameFontSize.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSliderElement4NodesNameFontSizePositionX;
			this.m_aSliderElement4NodesNameFontSize.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSliderElement4NodesNameFontSizePositionY;
//			this.m_aButtonElement4ScreenShot.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aButtonElement4ScreenShotPositionX;
//			this.m_aButtonElement4ScreenShot.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ScreenShotPositionY;
			this.m_aSelectElement4NodesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4NodesColorPositionX;
			this.m_aSelectElement4NodesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4NodesColorPositionY;
			this.m_aSelectElement4EdgesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4EdgesColorPositionX;
			this.m_aSelectElement4EdgesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4EdgesColorPositionY;
			this.m_aCheckboxElement4BackgroundColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4BackgroundColorPositionX;
			this.m_aCheckboxElement4BackgroundColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4BackgroundColorPositionY;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4ViewRankOfSNPsByDegreePositionX;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ViewRankOfSNPsByDegreePositionY;
			this.m_aInputTextBoxElement4SearchGeneName.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aInputTextBoxElement4SearchGeneNamePositionX;
			this.m_aInputTextBoxElement4SearchGeneName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aInputTextBoxElement4SearchGeneNamePositionY;
		}
		this.m_aButtonElement4ReadLocalFile1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile1PositionX;
		this.m_aButtonElement4ReadLocalFile1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile1PositionY;
		this.m_aButtonElement4ReadLocalFile2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile2PositionX;
		this.m_aButtonElement4ReadLocalFile2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile2PositionY;
		this.m_aButtonElement4ReadLocalFile3.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile3PositionX;
		this.m_aButtonElement4ReadLocalFile3.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile3PositionY;
		this.m_aButtonElement4StartRender.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4StartRenderPositionX;
		this.m_aButtonElement4StartRender.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4StartRenderPositionY;
		this.m_aButtonElement4RenderDemo.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4RenderDemoPositionX;
		this.m_aButtonElement4RenderDemo.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4RenderDemoPositionY;
	}
};
CMyCanvasWindowCommon.prototype.MessageFunction4CommonCanvas4MouseLeftOrRightButtonDown = function(event)
{	// when user mouse down.
	var nMouseGlobalPosWdhX = document.body.scrollLeft + event.clientX;
	var nMouseGlobalPosHghY = document.body.scrollTop  + event.clientY;
	var sThisCanvasIdValue = this.id; // "this" is "HTML canvas element".
	var nThisCanvasIndexInGlobalList = parseInt(sThisCanvasIdValue);
	var aOneCommonCanvasRefer = vaGlobalMyCanvasList[nThisCanvasIndexInGlobalList];
	var sBeingPressedKeyCode = GetBeingPressedKey();
	if (event.button == 0 && sBeingPressedKeyCode == "m")
	{	// if it is the left button down of mouse and "m" key is being pressed.
		// If user wants to move all the canvas together.
		aOneCommonCanvasRefer.SetPressRightBtnAndDragMouseOldMousePos(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
		aOneCommonCanvasRefer.SetFlagOfLeftOrRightOrNoButtonPressed(2); // "2" left button down + "m".
		document.body.style.cursor = "move"; // set cursor "move"
		event.preventDefault();
		event.stopPropagation(); // stop event propagation from this canvas to document body.
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "c" && gbDoesUserLoadAnyFiles == true)
	{	// If user wants to collapse one node.
		var nLftBtnDwnRegionIndex = aOneCommonCanvasRefer.JudgeMouseLeftBtnDownPos2Frame2Inner2BottomRightCorner(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
		if (nLftBtnDwnRegionIndex == 3)
		{	// if the mouse is in the inner rectangle region, the region to render the tree ring view.
			if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
			{	// "" is the index of canvas used to draw the tree ring view with partial nodes.
				var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
				var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
				aAllNodes4RingGraph.SetLOrRBtnDownPosCoords4TreeRingViewPartialNod(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
			}
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "s" && gbDoesUserLoadAnyFiles == true) // 'h':72
	{	// if user wants to select (or add) one node to highlight mode.
		var nLftBtnDwnRegionIndex = aOneCommonCanvasRefer.JudgeMouseLeftBtnDownPos2Frame2Inner2BottomRightCorner(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
		if (nLftBtnDwnRegionIndex == 3) // this is for judgement of the bubble framework of the vis of hummod.
		{	// if the mouse is in the inner rectangle region, the region to render the tree ring view.
			if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
			{	// "gnCanvasID4TreeRingView" is the index of canvas used to draw the tree ring view with partial nodes.
				var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
				var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
				aAllNodes4RingGraph.SetLOrRBtnDownPosCoords4TreeRingViewPartialNod(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
			}
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "u" && gbDoesUserLoadAnyFiles == true)
	{	// if user wants to un-select (or delete) one node which is in the highlight mode.
		var nLftBtnDwnRegionIndex = aOneCommonCanvasRefer.JudgeMouseLeftBtnDownPos2Frame2Inner2BottomRightCorner(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
		if (nLftBtnDwnRegionIndex == 3) // this is for judgement of the bubble framework of the vis of hummod.
		{	// if the mouse is in the inner rectangle region, the region to render the tree ring view.
			if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
			{	// "gnCanvasID4TreeRingView" is the index of canvas used to draw the tree ring view with partial nodes.
				var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
				var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
				aAllNodes4RingGraph.SetLOrRBtnDownPosCoords4TreeRingViewPartialNod(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
			}
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "l" && gbDoesUserLoadAnyFiles == true)
	{	// if user wants to select one node, and look this node up in NCBI website.
		var nLftBtnDwnRegionIndex = aOneCommonCanvasRefer.JudgeMouseLeftBtnDownPos2Frame2Inner2BottomRightCorner(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
		if (nLftBtnDwnRegionIndex == 3) // this is for judgement of the bubble framework of the vis of hummod.
		{	// if the mouse is in the inner rectangle region, the region to render the tree ring view.
			if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
			{	// "gnCanvasID4TreeRingView" is the index of canvas used to draw the tree ring view with partial nodes.
				var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
				var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
				aAllNodes4RingGraph.SetLOrRBtnDownPosCoords4TreeRingViewPartialNod(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
			}
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "NoKeyBeingPressed")
	{	// if it is the left button of mouse and no key is not being pressed.
		var nLftBtnDwnRegionIndex = aOneCommonCanvasRefer.JudgeMouseLeftBtnDownPos2Frame2Inner2BottomRightCorner(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
		// alert(nLftBtnDwnRegionIndex); // "0" default; "1" bottom right corner (resize canvas); "2" frame (move canvas); "3" inner region;
		if (nLftBtnDwnRegionIndex == 1)
		{	// "1" bottom right corner (resize canvas) // 20120706 Forbid Resize the canvas.
//			aOneCommonCanvasRefer.SetResizeCanvasMousPosOldXY(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
//			aOneCommonCanvasRefer.SetFlagOfLeftOrRightOrNoButtonPressed(3); // "3" to rezie canvas.
//			document.body.style.cursor = "nw-resize"; // set cursor "nw-resize"
		}
		else if (nLftBtnDwnRegionIndex == 2)
		{	// "2" frame (move canvas)
			aOneCommonCanvasRefer.SetMoveSingleCanvasMousPosOldXY(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
			aOneCommonCanvasRefer.SetFlagOfLeftOrRightOrNoButtonPressed(4); // "4" to move this one canvas.
			document.body.style.cursor = "move"; // set cursor "move"
		}
		else if (nLftBtnDwnRegionIndex == 3)
		{	// "3" inner region; // right now, we did not process this one.
			// 20111020William. To add the pan interaction function to the Matrix View.
			if (nThisCanvasIndexInGlobalList == gnCanvasID4MatrixView && gbDoesUserLoadAnyFiles == true)
			{	// "4" is the index of canvas used to draw the matrix view.
				aAllNodes4RingGraph.SetIsUserPanningMatrixView(true);
				aAllNodes4RingGraph.SetLBtnDownPosCoords(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
				document.body.style.cursor = "move"; // set cursor "move"
			}
			if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView && gbDoesUserLoadAnyFiles == true)
			{	// "5" is the index of canvas used to draw the tree ring view with partial nodes.
				var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
				var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
				var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
				aAllNodes4RingGraph.SetLOrRBtnDownPosCoords4TreeRingViewPartialNod(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
			}
		}
		event.preventDefault();
		event.stopPropagation(); // stop event propagation from this canvas to document body.
	}
	// 20111005William. We need to change the order of these common canvases. When user mouse left button down, that canvas will become the most front canvas.
	aOneCommonCanvasRefer.AdjustCommonCanvasOrder();
	console.log("Mouse Button Dpwn. event.keyCode: " + sBeingPressedKeyCode + " .");
	// 20121012William. To auto de-focus on the input box.
	if (gbSearchInputTextBoxElementCreated == true)
	{
		var aInputTextBoxElement4SearchGeneName = document.getElementById('SearchGenesSNPsName');
//		var sTempSearchBoxString = aInputTextBoxElement4SearchGeneName.value;
		aInputTextBoxElement4SearchGeneName.blur();
	}
};
CMyCanvasWindowCommon.prototype.MessageFunction4CommonCanvas4MouseMove = function(event)
{
	var nMouseGlobalPosWdhX = document.body.scrollLeft + event.clientX;
	var nMouseGlobalPosHghY = document.body.scrollTop  + event.clientY;
	var sThisCanvasIdValue = this.id;
	var nThisCanvasIndexInGlobalList = parseInt(sThisCanvasIdValue);
	var aOneCommonCanvasRefer = vaGlobalMyCanvasList[nThisCanvasIndexInGlobalList];
	var nFlagOfLeftOrRightOrNoButtonPressed = aOneCommonCanvasRefer.GetFlagOfLeftOrRightOrNoButtonPressed();
	if (nFlagOfLeftOrRightOrNoButtonPressed == 2 && event.ctrlKey == true && event.shiftKey == true && event.altKey == true) 
	{	// "2" if right button is being pressed.
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
		aOneCommonCanvasRefer.MoveCanvasAbsolutePositionWithOffset(nMouseRightDownDragMoveOffsetWdhX, 
																   nMouseRightDownDragMoveOffsetHghY);
		var nNumOfAllCanvas = vaGlobalMyCanvasList.length;
		for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
		{
			var aCommonCanvasRefer = vaGlobalMyCanvasList[nIdxOfCommonCanvas];
			aCommonCanvasRefer.MoveCanvasAbsolutePositionWithOffset(nMouseRightDownDragMoveOffsetWdhX, 
					   nMouseRightDownDragMoveOffsetHghY);
		}
		aOneCommonCanvasRefer.SetPressRightBtnAndDragMouseOldMousePos(nPressRightBtnAndDragMouseNewPosWdhX, 
																	  nPressRightBtnAndDragMouseNewPosHghY);
		// alert('left down + ctrl + move');
		event.preventDefault();
		event.stopPropagation(); // stop event propagation from this canvas to document body.
	}
	else if (nFlagOfLeftOrRightOrNoButtonPressed == 3)
	{	// to resize the canvas  // 20120706 Forbid Resize the canvas.
	}
	else if (nFlagOfLeftOrRightOrNoButtonPressed == 4) // "4" to move the canvas. Not Matrix View Here.
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
		event.preventDefault();
		event.stopPropagation(); // stop event propagation from this canvas to document body.
	}
	else if (nThisCanvasIndexInGlobalList == gnCanvasID4MatrixView && gbDoesUserLoadAnyFiles == true) // "4" is for the canvas to draw the matrix view.
	{	// 20111020William. to process the mouse panning function of the matrix view. // this is the inner interaction in the canvas.
		var bIsUserPanningMatrixView = aAllNodes4RingGraph.GetIsUserPanningMatrixView();
		if (bIsUserPanningMatrixView == true)
		{	// if user is panning the matrix view.
			aAllNodes4RingGraph.UpdateTheMatrixViewWhenUserPanIt(nMouseGlobalPosWdhX, nMouseGlobalPosHghY);
			// In the above function, we just input the new position of mouse, for how to update the Matrix View, it will be handled inside that function.
		}
	}
	else if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView && gbDoesUserLoadAnyFiles == true)
	{	// 20130621William. When user move the mouse, we should update the mouse hanging over information for nodes or edges in the Tree Ring View for two locus test.
		var aOneCommonCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
		var aCanvasContext = aOneCommonCanvasRefer.m_aCanvasContext;
		var nCanvasHeight  = aOneCommonCanvasRefer.m_nCanvasHeght;
		var nLftMarginWdh  = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
		var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
		var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
		aAllNodes4RingGraph.UpdateTreeRingViewMouseHangingOverInformation(aCanvasContext, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, nCanvasHeight);
	}
	else if (nThisCanvasIndexInGlobalList == gnCanvasID4LDRingView && gbDoesUserLoadAnyFiles == true)
	{	// 20130621William. When user move the mouse, we should update the mouse hanging over information for edges in LD Ring View.
		var aOneCommonCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
		var aCanvasContext = aOneCommonCanvasRefer.m_aCanvasContext;
		var nCanvasHeight  = aOneCommonCanvasRefer.m_nCanvasHeght;
		var nLftMarginWdh  = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
		var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
		var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
		aAllNodes4RingGraph.UpdateLDRingViewMouseHangingOverInformation(aCanvasContext, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, nCanvasHeight);
	}
	else
	{	// if nothing happened, just mouse move.
//		event.preventDefault();
//		event.stopPropagation(); // stop event propagation from this canvas to document body.
		// 20120705William. This is one bug. When user do not load anything, one canvas message will run to here. Then, when you move one canvas too fast, and the mouse is within another canvas moving, then the bug will occur.
		// The moving canvas will stay there, because the message is first go the the another canvas, and the above two function stop the propagation, and the message will not be transfered to document.body's message function of mouse moving, neither the moving canvas's.
	}
};
CMyCanvasWindowCommon.prototype.MessageFunction4CommonCanvas4MouseLeftOrRightButtonUp = function(event)
{
	var nMouseGlobalPosWdhX = document.body.scrollLeft + event.clientX;
	var nMouseGlobalPosHghY = document.body.scrollTop  + event.clientY;
	var sThisCanvasIdValue = this.id;
	var nThisCanvasIndexInGlobalList = parseInt(sThisCanvasIdValue);
	var aOneCommonCanvasRefer = vaGlobalMyCanvasList[nThisCanvasIndexInGlobalList];
	var nFlagOfLeftOrRightOrNoButtonPressed = aOneCommonCanvasRefer.GetFlagOfLeftOrRightOrNoButtonPressed();
	var sBeingPressedKeyCode = GetBeingPressedKey();
	if (event.button == 0 && sBeingPressedKeyCode == "m")
	{	// If user wants to move all the canvas together. Left button down of mouse and "m" key is being pressed.
		aOneCommonCanvasRefer.SetFlagOfLeftOrRightOrNoButtonPressed(0); // "0" no button pressed.
		document.body.style.cursor = "default"; // set cursor "default"
		event.stopPropagation(); // stop event propagation from this canvas to document body.
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "c" && gbDoesUserLoadAnyFiles == true)
	{	// If user wants to collapse one node.
		if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
		{	// "5" if user is interacting with the canvas of tree ring view with partial nodes.
			// we only want to whether it is right click or left click, and response them.
			var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
			var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
			var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
			aAllNodes4RingGraph.UpdateTreeRingView4PartialNodes4UserMouseInteract(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, 1, false, false);
			// "nMouseGlobalPosWdhX" and "nMouseGlobalPosHghY" is the coords of the mouse;
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "s" && gbDoesUserLoadAnyFiles == true) // add one selected node.
	{	// if user wants to select (or add) one node to highlight mode. "s" key + mouse left button pressed, select one node.
		if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
		{	// "gnCanvasID4TreeRingView", if user is interacting with the canvas of tree ring view with partial nodes.
			var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
			var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
			var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
			aAllNodes4RingGraph.UpdateTreeRingView4PartialNodes4UserMouseInteract(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, 0, true, true); // if the fourth parameter is "true", the third parameter has no use.
			// "nMouseGlobalPosWdhX" and "nMouseGlobalPosHghY" is the coords of the mouse;
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "u" && gbDoesUserLoadAnyFiles == true) // delete one selected node.
	{	// if user wants to un-select (or delete) one node which is in the highlight mode.
		if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
		{	// "gnCanvasID4TreeRingView", if user is interacting with the canvas of tree ring view with partial nodes.
			// we only want to whether it is right click or left click, and response them.
			var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
			var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
			var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
			aAllNodes4RingGraph.UpdateTreeRingView4PartialNodes4UserMouseInteract(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, 0, true, false); // if the fourth parameter is "true", the third parameter has no use.
			// "nMouseGlobalPosWdhX" and "nMouseGlobalPosHghY" is the coords of the mouse;
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "l" && gbDoesUserLoadAnyFiles == true) // look up one node in NCBI.
	{	// if user "ctrl key + shift key + mouse left button pressed", look one node up in NCBI website.
		if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView)
		{	// "gnCanvasID4TreeRingView", if user is interacting with the canvas of tree ring view with partial nodes.
			var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
			var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
			var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
			aAllNodes4RingGraph.UpdateTreeRingView4PartialNodes4UserMouseInteract4LookUpInNCBIWebsite(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY); // if the fourth parameter is "true", the third parameter has no use.
			// "nMouseGlobalPosWdhX" and "nMouseGlobalPosHghY" is the coords of the mouse;
			// 20120927 One Bug. Since this user interaction will open a new webpage. Therefore, the "MessageFunction4DocumentBody4KeyUp" can not be executed correctly.
			// Therefore, we reset the key flag here.
			gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.L_Key] = false;
			gvbKeyBeingPressedArray[gveKeyBeingPressedEnum.NO_Key] = true;
		}
	}
	else if (event.button == 0 && sBeingPressedKeyCode == "NoKeyBeingPressed")
	{	// if it is the left button of mouse
		if (nFlagOfLeftOrRightOrNoButtonPressed == 3)
		{	// 20120706 Forbid Resize the canvas.
		}
		else if (nFlagOfLeftOrRightOrNoButtonPressed == 4) // "4" to move the canvas. Not Matrix View Here.
		{
			aOneCommonCanvasRefer.SetFlagOfLeftOrRightOrNoButtonPressed(0); // "0" no button pressed.
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
		}
		else if (nThisCanvasIndexInGlobalList == gnCanvasID4MatrixView && gbDoesUserLoadAnyFiles == true) // "4" is for the canvas to draw the matrix view.
		{	// 20111020William. to process the mouse panning function of the matrix view. // this is the inner interaction in the canvas.
			var bIsUserPanningMatrixView = aAllNodes4RingGraph.GetIsUserPanningMatrixView();
			if (bIsUserPanningMatrixView == true)
			{	// if user is panning the matrix view.
				aAllNodes4RingGraph.UpdateTheMatrixViewWhenUserPanIt(nMouseGlobalPosWdhX, nMouseGlobalPosHghY); // here, update the matrix view for the last time.
				// In the above function, we just input the new position of mouse, for how to update the Matrix View, it will be handled inside that function.
				aAllNodes4RingGraph.SetIsUserPanningMatrixView(false); // and then, set the flag to false. finish one interaction of panning operation.
			}
		}
		else if (nThisCanvasIndexInGlobalList == gnCanvasID4TreeRingView && gbDoesUserLoadAnyFiles == true)
		{	// "5" if user is interacting with the canvas of tree ring view with partial nodes.
			// we only want to whether it is right click or left click, and response them.
			var nLftMarginWdh = aOneCommonCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCommonCanvasRefer.m_nCanvasBorderWidthCorner + aOneCommonCanvasRefer.m_nCanvasInnerBorderCornerRadius;
			var nMouseRelativeCoordsWdhX = nMouseGlobalPosWdhX - aOneCommonCanvasRefer.m_nCanvasTopLftPointWidthX - nLftMarginWdh;
			var nMouseRelativeCoordsHghY = nMouseGlobalPosHghY - aOneCommonCanvasRefer.m_nCanvasTopLftPointHeghtY - nLftMarginWdh; // "nTopMarginHgh" is the same as "nLftMarginWdh"
			aAllNodes4RingGraph.UpdateTreeRingView4PartialNodes4UserMouseInteract(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, 0, false, false);
			// "nMouseGlobalPosWdhX" and "nMouseGlobalPosHghY" is the coords of the mouse;
			// "0" represents that it is the left button.
		}
		document.body.style.cursor = "default"; // set cursor "default"
		event.stopPropagation(); // stop event propagation from this canvas to document body.
	}
	console.log("Mouse Button Up. event.keyCode: " + sBeingPressedKeyCode + " .");
};
CMyCanvasWindowCommon.prototype.JudgeMouseLeftBtnDownPos2Frame2Inner2BottomRightCorner = function(nMouseLftBtnDwnWdhX, nMouseLftBtnDwnHghY)
{	// left button down, judge the region it belongs to.
	// input mouse left button down position is a global position; we need to change it to the coordinate relative to the canvas.
	nMouseLftBtnDwnWdhX = nMouseLftBtnDwnWdhX - this.m_nCanvasTopLftPointWidthX;
	nMouseLftBtnDwnHghY = nMouseLftBtnDwnHghY - this.m_nCanvasTopLftPointHeghtY;
	// then, use the relative position to judge the region index.
	var nLftBtnDwnRegionIndex = 0; // "0" default; "1" bottom right corner (resize canvas); "2" frame (move canvas); "3" inner region;
	var nBottomRightCornerWdhX = 0; // the bottom right corner point.
	var nBottomRightCornerHghY = 0; // the bottom right corner point.
	nBottomRightCornerWdhX = this.m_nCanvasWidth - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner);
	nBottomRightCornerHghY = this.m_nCanvasHeght - (this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner);
	// first judge whether the mouse left button down is in the bottom right corner region.
	if (nMouseLftBtnDwnWdhX >= nBottomRightCornerWdhX && nMouseLftBtnDwnWdhX <= this.m_nCanvasWidth
	    && nMouseLftBtnDwnHghY >= nBottomRightCornerHghY && nMouseLftBtnDwnHghY <= this.m_nCanvasHeght)
	{
		var nDistBtwnMouseAndCorner = Math.sqrt(
		Math.pow((nMouseLftBtnDwnWdhX - nBottomRightCornerWdhX), 2) + Math.pow((nMouseLftBtnDwnHghY - nBottomRightCornerHghY), 2)
		);
		if (nDistBtwnMouseAndCorner < this.m_nCanvasBorderWidthCorner)
		{
			nLftBtnDwnRegionIndex = 1;
			return nLftBtnDwnRegionIndex;
		}
	}
	// then, judge whether it is in the frame, we do not require that accurately, just in the inner rectangle and outer rectangle, that's fine.
	var nFrameWidth = this.m_nCanvasBorderWidthSideArc + this.m_nCanvasBorderWidthCorner; // the frame width on the four sides.
	if ( (nMouseLftBtnDwnWdhX >= 0 && nMouseLftBtnDwnWdhX <= nFrameWidth) 
	  || (nMouseLftBtnDwnWdhX >= (this.m_nCanvasWidth - nFrameWidth) && nMouseLftBtnDwnWdhX <= this.m_nCanvasWidth )
	  || (nMouseLftBtnDwnHghY >= 0 && nMouseLftBtnDwnHghY <= nFrameWidth) 
	  || (nMouseLftBtnDwnHghY >= (this.m_nCanvasHeght - nFrameWidth) && nMouseLftBtnDwnHghY <= this.m_nCanvasHeght ) )
	{	// left, right, top, bottom side frame.
		nLftBtnDwnRegionIndex = 2;
		return nLftBtnDwnRegionIndex;
	}
	// if not all of the above three status, then it must be in the inner region.
	nLftBtnDwnRegionIndex = 3;
	return nLftBtnDwnRegionIndex;
};
CMyCanvasWindowCommon.prototype.ResizeThisCanvasWithOffset = function(nMouseMoveOffsetWdhX, nMouseMoveOffsetHghY)
{	// resize this canvas.
	var nTmpValueOfResizeCanvasWidth = this.m_nCanvasWidth + nMouseMoveOffsetWdhX;
	var nTmpValueOfResizeCanvasHeght = this.m_nCanvasHeght + nMouseMoveOffsetHghY;
	if (nTmpValueOfResizeCanvasWidth < 100 || nTmpValueOfResizeCanvasHeght < 100)
	{	// if the size of canvas after resize is too small, then do nothing, just return.
		return;
	}
	this.m_nCanvasWidth = this.m_nCanvasWidth + nMouseMoveOffsetWdhX;
	this.m_nCanvasHeght = this.m_nCanvasHeght + nMouseMoveOffsetHghY;
	this.m_aCanvasElement.style.width  = this.m_nCanvasWidth + 'px';
	this.m_aCanvasElement.style.height = this.m_nCanvasHeght + 'px';
	this.m_aCanvasElement.width  = this.m_nCanvasWidth;
	this.m_aCanvasElement.height = this.m_nCanvasHeght;
	// before re-calculate the border, we need first to clear the arrays which store the border information.
	this.ClearInnerBorderPath();
	this.ClearOuterBorderPath();
	this.m_aCanvasContext.clearRect(0, 0, this.m_nCanvasWidth, this.m_nCanvasHeght);
	// begin to recalculate the border.
	this.InitializeOuterBorderPath(); // calculate the border
	this.InitializeInnerBorderPath(); // calculate the border
	// begin to rerender the border.
	this.RenderOuterBorderPath();
	this.RenderInnerBorderPath(); // inner border must be rendered after outer border.
	// You need to mention controls, so it can be rendered again, to keep above the canvas.
	if (this.m_nCanvasID == gnCanvasID4TreeRingView)
	{
		if (gbDoesUserLoadAnyFiles == true)
		{
			this.m_aSliderElement4BundleStrength.style.zIndex = this.m_aCanvasElement.style.zIndex; // + 1
			this.m_aSliderElement4NumOfTopPairs.style.zIndex = this.m_aCanvasElement.style.zIndex; // + 1
			this.m_aRadioBtnElement4HighlightMode1.style.zIndex = nZIndexValue;
			this.m_aRadioBtnElement4HighlightMode2.style.zIndex = nZIndexValue;
			this.m_aCheckboxElement4WhetherShowNodesName.style.zIndex = nZIndexValue;
			this.m_aSliderElement4NodesNameFontSize.style.zIndex = nZIndexValue;
//			this.m_aButtonElement4ScreenShot.style.zIndex = nZIndexValue;
			this.m_aSelectElement4NodesColor.style.zIndex = nZIndexValue;
			this.m_aSelectElement4EdgesColor.style.zIndex = nZIndexValue;
			this.m_aCheckboxElement4BackgroundColor.style.zIndex = nZIndexValue;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.zIndex = nZIndexValue;
			this.m_aInputTextBoxElement4SearchGeneName.style.zIndex = nZIndexValue;
		}
		this.m_aButtonElement4ReadLocalFile1.style.zIndex = nZIndexValue;
		this.m_aButtonElement4ReadLocalFile2.style.zIndex = nZIndexValue;
		this.m_aButtonElement4ReadLocalFile3.style.zIndex = nZIndexValue;
		this.m_aButtonElement4StartRender.style.zIndex = nZIndexValue;
		this.m_aButtonElement4RenderDemo.style.zIndex = nZIndexValue;
	}
};
CMyCanvasWindowCommon.prototype.ResizeThisCanvasWithAbsoluteWdhHghValue = function(nCanvasWidth, nCanvasHeght)
{	// resize this canvas.
	this.m_nCanvasWidth = nCanvasWidth;
	this.m_nCanvasHeght = nCanvasHeght;
	this.m_aCanvasElement.style.width  = this.m_nCanvasWidth + 'px';
	this.m_aCanvasElement.style.height = this.m_nCanvasHeght + 'px';
	this.m_aCanvasElement.width  = this.m_nCanvasWidth;
	this.m_aCanvasElement.height = this.m_nCanvasHeght;
	// before re-calculate the border, we need first to clear the arrays which store the border information.
	this.ClearInnerBorderPath();
	this.ClearOuterBorderPath();
	this.m_aCanvasContext.clearRect(0, 0, this.m_nCanvasWidth, this.m_nCanvasHeght);
	// begin to recalculate the border.
	this.InitializeOuterBorderPath(); // calculate the border
	this.InitializeInnerBorderPath(); // calculate the border
	// begin to rerender the border.
	this.RenderOuterBorderPath();
	this.RenderInnerBorderPath(); // inner border must be rendered after outer border.
	if (gbWhetherCheckboxBlackBackgroundChecked == true)
	{
		this.RenderRadialGradientBackground(); // 20120712, since blackground is better, so we need to render a blackbackground.	
	}
	// Re-position the two sliders.
	if (this.m_nCanvasID == gnCanvasID4TreeRingView)
	{
		if (gbDoesUserLoadAnyFiles == true)
		{
			this.m_aSliderElement4BundleStrength.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4BundleStrengthPositionX;
			this.m_aSliderElement4BundleStrength.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4BundleStrengthPositionY;
			this.m_aSliderElement4NumOfTopPairs.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4NumOfTopPairsPositionX;
			this.m_aSliderElement4NumOfTopPairs.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4NumOfTopPairsPositionY;
			this.m_aRadioBtnElement4HighlightMode1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX1;
			this.m_aRadioBtnElement4HighlightMode1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
			this.m_aRadioBtnElement4HighlightMode2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX2;
			this.m_aRadioBtnElement4HighlightMode2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
			this.m_aCheckboxElement4WhetherShowNodesName.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4WhetherShowNodesNamePositionX;
			this.m_aCheckboxElement4WhetherShowNodesName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4WhetherShowNodesNamePositionY;
			this.m_aSliderElement4NodesNameFontSize.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSliderElement4NodesNameFontSizePositionX;
			this.m_aSliderElement4NodesNameFontSize.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSliderElement4NodesNameFontSizePositionY;
//			this.m_aButtonElement4ScreenShot.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aButtonElement4ScreenShotPositionX;
//			this.m_aButtonElement4ScreenShot.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ScreenShotPositionY;
			this.m_aSelectElement4NodesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4NodesColorPositionX;
			this.m_aSelectElement4NodesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4NodesColorPositionY;
			this.m_aSelectElement4EdgesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4EdgesColorPositionX;
			this.m_aSelectElement4EdgesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4EdgesColorPositionY;
			this.m_aCheckboxElement4BackgroundColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4BackgroundColorPositionX;
			this.m_aCheckboxElement4BackgroundColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4BackgroundColorPositionY;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4ViewRankOfSNPsByDegreePositionX;
			this.m_aButtonElement4ViewRankOfSNPsByDegree.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ViewRankOfSNPsByDegreePositionY;
			this.m_aInputTextBoxElement4SearchGeneName.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aInputTextBoxElement4SearchGeneNamePositionX;
			this.m_aInputTextBoxElement4SearchGeneName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aInputTextBoxElement4SearchGeneNamePositionY;
		}
		this.m_aButtonElement4ReadLocalFile1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile1PositionX;
		this.m_aButtonElement4ReadLocalFile1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile1PositionY;
		this.m_aButtonElement4ReadLocalFile2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile2PositionX;
		this.m_aButtonElement4ReadLocalFile2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile2PositionY;
		this.m_aButtonElement4ReadLocalFile3.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile3PositionX;
		this.m_aButtonElement4ReadLocalFile3.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile3PositionY;
		this.m_aButtonElement4StartRender.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4StartRenderPositionX;
		this.m_aButtonElement4StartRender.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4StartRenderPositionY;
		this.m_aButtonElement4RenderDemo.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4RenderDemoPositionX;
		this.m_aButtonElement4RenderDemo.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4RenderDemoPositionY;
	}
};
CMyCanvasWindowCommon.prototype.AdjustCommonCanvasOrder = function()
{	// 20111005William. This function aims to set this canvas as the most front canvas, and keep the other canvase's order the same.
	// For example, There is four common canvases. "2 3 4 1" is the Z-Index of the four canvases.
	// And user left button down on the first canvas, whose Z-Index is 2 right now. Then the four canvases' Z-Index will be adjust as "4 2 3 1".
	// the selected canvas will be set with the most large Z-Index; the other three canvases keep the same order as before.
	// The order (Z-Index) is stored in array "vnGlobalMyCanvasZIndex"; the first four elements is "OverView", "Toolbar", "background", and "foreground".
	// --- 1 get the canvas index in the global canvas list, this canvas is the user selected canvas.
	var sThisCanvasIdValue = this.m_aCanvasElement.id;
	var nThisCanvasIndexInGlobalList = parseInt(sThisCanvasIdValue);
	// --- 2 traverse the canvas list, and find the maximum and minimum index of the common canvases.
	var nNumOfAllCanvas = vaGlobalMyCanvasList.length;
	var nCommonCanvasZIndexMax = 0; // the maximum Z-Index among the common canvases.
	var nCommonCanvasZIndexMin = 0; // the minimum Z-Index among the common canvases.
	var nCommonCanvasOneTmpIdx = 0; // one common canvas tmeporary index.
	for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
	{
		nCommonCanvasOneTmpIdx = vnGlobalMyCanvasZIndex[nIdxOfCommonCanvas];
		if (nIdxOfCommonCanvas == 0)
		{	// if it is the first common canvas element
			nCommonCanvasZIndexMax = nCommonCanvasOneTmpIdx;
			nCommonCanvasZIndexMin = nCommonCanvasOneTmpIdx;
		}
		else
		{	// if it is second or later common canvas element.
			if (nCommonCanvasOneTmpIdx > nCommonCanvasZIndexMax)
			{
				nCommonCanvasZIndexMax = nCommonCanvasOneTmpIdx;
			}
			if (nCommonCanvasOneTmpIdx < nCommonCanvasZIndexMin)
			{
				nCommonCanvasZIndexMin = nCommonCanvasOneTmpIdx;
			}
		}
	}
	// --- 3 traverse the canvas list again, get the selected canvas's Z-Index (ZT), and set its Z-Index to the largest one.
	// 										 if the Z-Index is larger  than (ZT), subtract with one;
	// 										 if the Z-Index is smaller than (ZT), do nothing.
	if (vnGlobalMyCanvasZIndex[nThisCanvasIndexInGlobalList] < nCommonCanvasZIndexMax)
	{	// if user selected canvas is already the most front canvas, do nothing.
		// do the following code snippet, just when the selected canvas currently is not the most front canvas.
		var nTheSelectedCanvasZIndex = vnGlobalMyCanvasZIndex[nThisCanvasIndexInGlobalList];
		vnGlobalMyCanvasZIndex[nThisCanvasIndexInGlobalList] = nCommonCanvasZIndexMax;
		for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
		{
			nCommonCanvasOneTmpIdx = vnGlobalMyCanvasZIndex[nIdxOfCommonCanvas];
			if (nIdxOfCommonCanvas == nThisCanvasIndexInGlobalList)
			{	// if this canvas is the selected canvas, do not alter the Z-Index.
				continue;
			}	// if "nCommonCanvasOneTmpIdx < nTheSelectedCanvasZIndex" , do nothing.
			if (nCommonCanvasOneTmpIdx > nTheSelectedCanvasZIndex)
			{
				vnGlobalMyCanvasZIndex[nIdxOfCommonCanvas] = nCommonCanvasOneTmpIdx - 1;
			}
		}
		// --- 4 finally, in above, we have re-arranged the Z-Index of all the common canvas.
		//       Then, we can reset the common canvases' Z-Index, and the chrome will re-render it automatically.
		for (var nIdxOfCommonCanvas = 0; nIdxOfCommonCanvas < nNumOfAllCanvas; nIdxOfCommonCanvas++)
		{
			var aCommonCanvasRefer = vaGlobalMyCanvasList[nIdxOfCommonCanvas];
			var nCommonCanvasZIndx = vnGlobalMyCanvasZIndex[nIdxOfCommonCanvas];
			aCommonCanvasRefer.SetZIndexValue(nCommonCanvasZIndx);
		}
	}
};

CMyCanvasWindowCommon.prototype.AddSomeControls = function()
{	
	if (gbDoesUserLoadAnyFiles == true)
	{
		// --- 1 add one Slider to change the number of nodes in the tree ring view.
		this.m_aSliderElement4NumOfTopPairs = document.createElement('input');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('type', 'range');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('name', 'SliderNumberOfEdges');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('class', 'ControlsDeletable');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('value', gsNewValueNumEdgesSldr);
		this.m_aSliderElement4NumOfTopPairs.setAttribute('min', '1');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('max', '10');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('step', '1');
		this.m_aSliderElement4NumOfTopPairs.setAttribute('id', 'SliderNumberOfEdges');
		this.m_aSliderElement4NumOfTopPairs.style.position = 'absolute';
		this.m_aSliderElement4NumOfTopPairs.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4NumOfTopPairsPositionX;
		this.m_aSliderElement4NumOfTopPairs.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4NumOfTopPairsPositionY;
		this.m_aSliderElement4NumOfTopPairs.style.width = 250 + 'px';
		this.m_aSliderElement4NumOfTopPairs.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aSliderElement4NumOfTopPairs);
		this.m_aSliderElement4NumOfTopPairs.onchange = MessageFunction4SliderOfNumOfTopPairs; // 20111208William. add the a slider, and its message response function. for the bundle strength of the tree ring view.
		// --- 2 add one Slider to change the strength of edge bundle.
		this.m_aSliderElement4BundleStrength = document.createElement('input');
		this.m_aSliderElement4BundleStrength.setAttribute('type', 'range');
		this.m_aSliderElement4BundleStrength.setAttribute('name', 'SliderBundleStrength');
		this.m_aSliderElement4BundleStrength.setAttribute('class', 'ControlsDeletable');
		this.m_aSliderElement4BundleStrength.setAttribute('value', gsEdgBundleStrengthSliderValue);
		this.m_aSliderElement4BundleStrength.setAttribute('min', '0');
		this.m_aSliderElement4BundleStrength.setAttribute('max', '10');
		this.m_aSliderElement4BundleStrength.setAttribute('step', '1');
		this.m_aSliderElement4BundleStrength.setAttribute('id', 'SliderBundleStrength');
		this.m_aSliderElement4BundleStrength.style.position = 'absolute';
		this.m_aSliderElement4BundleStrength.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nSlider4BundleStrengthPositionX;
		this.m_aSliderElement4BundleStrength.style.top  = this.m_nCanvasTopLftPointHeghtY + this.m_nSlider4BundleStrengthPositionY;
		this.m_aSliderElement4BundleStrength.style.width = 250 + 'px';
		this.m_aSliderElement4BundleStrength.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aSliderElement4BundleStrength);
		this.m_aSliderElement4BundleStrength.onchange = MessageFunction4SliderOfBundleStrength2;
		// --- 3 Add one radio button
		this.m_aRadioBtnElement4HighlightMode1 = document.createElement('input');
		this.m_aRadioBtnElement4HighlightMode1.setAttribute('type', 'radio');
		this.m_aRadioBtnElement4HighlightMode1.setAttribute('name', 'HightlightMode');
		this.m_aRadioBtnElement4HighlightMode1.setAttribute('class', 'ControlsDeletable');
		this.m_aRadioBtnElement4HighlightMode1.setAttribute('value', 'Any');
		this.m_aRadioBtnElement4HighlightMode1.setAttribute('id', 'Any');
		if (gnHightlightModeAnyOrAll == 0){	this.m_aRadioBtnElement4HighlightMode1.setAttribute('checked', 'checked');	} // default, the first radio is checked, use "Any of them".
		this.m_aRadioBtnElement4HighlightMode1.style.position = 'absolute';
		this.m_aRadioBtnElement4HighlightMode1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX1;
		this.m_aRadioBtnElement4HighlightMode1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
		this.m_aRadioBtnElement4HighlightMode1.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aRadioBtnElement4HighlightMode1);
		this.m_aRadioBtnElement4HighlightMode1.onclick = MessageFunction4RadioButtonHighlightMode;
		// --- 4 Add one radio button
		this.m_aRadioBtnElement4HighlightMode2 = document.createElement('input');
		this.m_aRadioBtnElement4HighlightMode2.setAttribute('type', 'radio');
		this.m_aRadioBtnElement4HighlightMode2.setAttribute('name', 'HightlightMode');
		this.m_aRadioBtnElement4HighlightMode2.setAttribute('class', 'ControlsDeletable');
		this.m_aRadioBtnElement4HighlightMode2.setAttribute('value', 'All'); // Radio control does not show 'value', you must add the label name yourself.
		this.m_aRadioBtnElement4HighlightMode2.setAttribute('id', 'All');
		if (gnHightlightModeAnyOrAll == 1){	this.m_aRadioBtnElement4HighlightMode2.setAttribute('checked', 'checked');	} // the second radio is checked, use "All of them".
		this.m_aRadioBtnElement4HighlightMode2.style.position = 'absolute';
		this.m_aRadioBtnElement4HighlightMode2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nRadioBtn4HighlightModePositionX2;
		this.m_aRadioBtnElement4HighlightMode2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nRadioBtn4HighlightModePositionY;
		this.m_aRadioBtnElement4HighlightMode2.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aRadioBtnElement4HighlightMode2);
		this.m_aRadioBtnElement4HighlightMode2.onclick = MessageFunction4RadioButtonHighlightMode;
		// --- 5 Add one checkbox for decide whether or not show nodes name text.
		this.m_aCheckboxElement4WhetherShowNodesName = document.createElement('input');
		this.m_aCheckboxElement4WhetherShowNodesName.setAttribute('type', 'checkbox');
		this.m_aCheckboxElement4WhetherShowNodesName.setAttribute('name', 'Node Name');
		this.m_aCheckboxElement4WhetherShowNodesName.setAttribute('class', 'ControlsDeletable');
		this.m_aCheckboxElement4WhetherShowNodesName.setAttribute('value', 'Node Name'); // Radio control does not show 'value', you must add the label name yourself.
		this.m_aCheckboxElement4WhetherShowNodesName.setAttribute('id', 'Node Name');
		this.m_aCheckboxElement4WhetherShowNodesName.checked = gbWhetherCheckboxShowTextChecked;
		this.m_aCheckboxElement4WhetherShowNodesName.style.position = 'absolute';
		this.m_aCheckboxElement4WhetherShowNodesName.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4WhetherShowNodesNamePositionX;
		this.m_aCheckboxElement4WhetherShowNodesName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4WhetherShowNodesNamePositionY;
		this.m_aCheckboxElement4WhetherShowNodesName.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aCheckboxElement4WhetherShowNodesName);
		this.m_aCheckboxElement4WhetherShowNodesName.onclick = MessageFunction4CheckboxWhetherShowNodesName;
		// --- 6 add one Slider to change the font size of nodes names in the tree ring view.
		this.m_aSliderElement4NodesNameFontSize = document.createElement('input');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('type', 'range');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('name', 'SliderFontSize');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('class', 'ControlsDeletable');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('value', gsNewValueFontSizeSldr);
		this.m_aSliderElement4NodesNameFontSize.setAttribute('min', '10');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('max', '20');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('step', '1');
		this.m_aSliderElement4NodesNameFontSize.setAttribute('id', 'SliderFontSize');
		this.m_aSliderElement4NodesNameFontSize.style.position = 'absolute';
		this.m_aSliderElement4NodesNameFontSize.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSliderElement4NodesNameFontSizePositionX;
		this.m_aSliderElement4NodesNameFontSize.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSliderElement4NodesNameFontSizePositionY;
		this.m_aSliderElement4NodesNameFontSize.style.width = 250 + 'px';
		this.m_aSliderElement4NodesNameFontSize.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aSliderElement4NodesNameFontSize);
		this.m_aSliderElement4NodesNameFontSize.onchange = MessageFunction4SliderOfFontSize;
		// --- 8 Add one button to Get One ScreenShot of the tree ring view. 20120706William.
//		this.m_aButtonElement4ScreenShot = document.createElement('input');
//		this.m_aButtonElement4ScreenShot.setAttribute('type', 'button');
//		this.m_aButtonElement4ScreenShot.setAttribute('name', 'Screen Shot');
//		this.m_aButtonElement4ScreenShot.setAttribute('value', 'Screen Shot'); // Radio control does not show 'value', you must add the label name yourself.
//		this.m_aButtonElement4ScreenShot.setAttribute('id', 'Screen Shot');
//		this.m_aButtonElement4ScreenShot.style.position = 'absolute';
//		this.m_aButtonElement4ScreenShot.style.fontSize = 16 + 'px';
//		this.m_aButtonElement4ScreenShot.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aButtonElement4ScreenShotPositionX;
//		this.m_aButtonElement4ScreenShot.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ScreenShotPositionY;
//		this.m_aButtonElement4ScreenShot.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
//		document.body.appendChild(this.m_aButtonElement4ScreenShot);
//		this.m_aButtonElement4ScreenShot.onclick = MessageFunction4ButtonScreenshot; // Message responce function for choose local files.
		// --- 9 20120710William. Add one select to control the Nodes color bar
		this.m_aSelectElement4NodesColor = document.createElement('select');
		this.m_aSelectElement4NodesColor.options[0] = new Option('Sequential YIGn', 0);
		this.m_aSelectElement4NodesColor.options[1] = new Option('Sequential YIGnBu', 1);
		this.m_aSelectElement4NodesColor.options[2] = new Option('Sequential YIOrBr', 2);
		this.m_aSelectElement4NodesColor.options[3] = new Option('Sequential YIOrRd', 3);
		this.m_aSelectElement4NodesColor.options[4] = new Option('Sequential PuRd', 4);
		this.m_aSelectElement4NodesColor.options[5] = new Option('Sequential Greys', 5);
		this.m_aSelectElement4NodesColor.options[6] = new Option('Diverging PiYG', 6);
		this.m_aSelectElement4NodesColor.options[7] = new Option('Diverging PRGn', 7);
		this.m_aSelectElement4NodesColor.options[8] = new Option('Diverging PuOr', 8);
		this.m_aSelectElement4NodesColor.options[9] = new Option('Diverging RdBu', 9);
		this.m_aSelectElement4NodesColor.options[10] = new Option('Diverging RdYIBu', 10);
		this.m_aSelectElement4NodesColor.options[11] = new Option('Diverging RdYIGn', 11);
		this.m_aSelectElement4NodesColor.options[12] = new Option('Continuous RdGn', 12);
		this.m_aSelectElement4NodesColor.selectedIndex = gnIndexOfColorScheme4NodesColor;
		this.m_aSelectElement4NodesColor.setAttribute('id', 'NodesColorBar');
		this.m_aSelectElement4NodesColor.setAttribute('class', 'ControlsDeletable');
		this.m_aSelectElement4NodesColor.style.position = 'absolute';
		this.m_aSelectElement4NodesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4NodesColorPositionX;
		this.m_aSelectElement4NodesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4NodesColorPositionY;
		this.m_aSelectElement4NodesColor.style.width = 120 + 'px';
		this.m_aSelectElement4NodesColor.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aSelectElement4NodesColor);
		this.m_aSelectElement4NodesColor.onchange = MessageFunction4SelectColorBar4NodesColor;
		// --- 10 20120710William. Add one select to control the Edges color bar
		this.m_aSelectElement4EdgesColor = document.createElement('select');
		this.m_aSelectElement4EdgesColor.options[0] = new Option('Sequential YIGn', 0);
		this.m_aSelectElement4EdgesColor.options[1] = new Option('Sequential YIGnBu', 1);
		this.m_aSelectElement4EdgesColor.options[2] = new Option('Sequential YIOrBr', 2);
		this.m_aSelectElement4EdgesColor.options[3] = new Option('Sequential YIOrRd', 3);
		this.m_aSelectElement4EdgesColor.options[4] = new Option('Sequential PuRd', 4);
		this.m_aSelectElement4EdgesColor.options[5] = new Option('Sequential Greys', 5);
		this.m_aSelectElement4EdgesColor.options[6] = new Option('Diverging PiYG', 6);
		this.m_aSelectElement4EdgesColor.options[7] = new Option('Diverging PRGn', 7);
		this.m_aSelectElement4EdgesColor.options[8] = new Option('Diverging PuOr', 8);
		this.m_aSelectElement4EdgesColor.options[9] = new Option('Diverging RdBu', 9);
		this.m_aSelectElement4EdgesColor.options[10] = new Option('Diverging RdYIBu', 10);
		this.m_aSelectElement4EdgesColor.options[11] = new Option('Diverging RdYIGn', 11);
		this.m_aSelectElement4EdgesColor.options[12] = new Option('Continuous RdGn', 12);
		this.m_aSelectElement4EdgesColor.selectedIndex = gnIndexOfColorScheme4EdgesColor;
		this.m_aSelectElement4EdgesColor.setAttribute('id', 'EdgesColorBar');
		this.m_aSelectElement4EdgesColor.setAttribute('class', 'ControlsDeletable');
		this.m_aSelectElement4EdgesColor.style.position = 'absolute';
		this.m_aSelectElement4EdgesColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aSelectElement4EdgesColorPositionX;
		this.m_aSelectElement4EdgesColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aSelectElement4EdgesColorPositionY;			
		this.m_aSelectElement4EdgesColor.style.width = 120 + 'px';
		this.m_aSelectElement4EdgesColor.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aSelectElement4EdgesColor);
		this.m_aSelectElement4EdgesColor.onchange = MessageFunction4SelectColorBar4EdgesColor;
		// --- 11 20120710William. Add one checkbox to change the background.
		this.m_aCheckboxElement4BackgroundColor = document.createElement('input');
		this.m_aCheckboxElement4BackgroundColor.setAttribute('type', 'checkbox');
		this.m_aCheckboxElement4BackgroundColor.setAttribute('name', 'BackgourndColor');
		this.m_aCheckboxElement4BackgroundColor.setAttribute('class', 'ControlsDeletable');
		this.m_aCheckboxElement4BackgroundColor.setAttribute('value', 'Black Background'); // Radio control does not show 'value', you must add the label name yourself.
		this.m_aCheckboxElement4BackgroundColor.setAttribute('id', 'BackgourndColor');
		this.m_aCheckboxElement4BackgroundColor.checked = gbWhetherCheckboxBlackBackgroundChecked;
		this.m_aCheckboxElement4BackgroundColor.style.position = 'absolute';
		this.m_aCheckboxElement4BackgroundColor.style.left = this.m_nCanvasTopLftPointWidthX  + this.m_nCanvasWidth - this.m_aCheckboxElement4BackgroundColorPositionX;
		this.m_aCheckboxElement4BackgroundColor.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aCheckboxElement4BackgroundColorPositionY;
		this.m_aCheckboxElement4BackgroundColor.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aCheckboxElement4BackgroundColor);
		this.m_aCheckboxElement4BackgroundColor.onclick = MessageFunction4CheckboxWhetherShowBlackBackground;
		// --- 12 20120928William. Add one Button "View Rank". Click it, it will open a new tab window and show the ranking of SNPs by their degree in Epistasis interaction network.
		this.m_aButtonElement4ViewRankOfSNPsByDegree = document.createElement('input');
		this.m_aButtonElement4ViewRankOfSNPsByDegree.setAttribute('type', 'button');
		this.m_aButtonElement4ViewRankOfSNPsByDegree.setAttribute('name', 'ViewRankOfSNPs');
		this.m_aButtonElement4ViewRankOfSNPsByDegree.setAttribute('class', 'ControlsDeletable');
		this.m_aButtonElement4ViewRankOfSNPsByDegree.setAttribute('value', 'View Rank'); // Name shown on the button.
		this.m_aButtonElement4ViewRankOfSNPsByDegree.setAttribute('id', 'ViewRankOfSNPs');
		this.m_aButtonElement4ViewRankOfSNPsByDegree.style.position = 'absolute';
		this.m_aButtonElement4ViewRankOfSNPsByDegree.style.fontSize = '15px'; // All other text font size is 16. It is 15 here, it looks more suitable.
		this.m_aButtonElement4ViewRankOfSNPsByDegree.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4ViewRankOfSNPsByDegreePositionX;
		this.m_aButtonElement4ViewRankOfSNPsByDegree.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4ViewRankOfSNPsByDegreePositionY;
		this.m_aButtonElement4ViewRankOfSNPsByDegree.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aButtonElement4ViewRankOfSNPsByDegree);
		this.m_aButtonElement4ViewRankOfSNPsByDegree.onclick = MessageFunction4ButtonViewRankOfSNPsByDegree; // Message responce function for view rank of SNPs by their degree.
		// --- 13 20121011William. Add one Input Text Box "Search: ". When user input gene names here, the correponding gene name will be highlighted.
		this.m_aInputTextBoxElement4SearchGeneName = document.createElement('input');
		this.m_aInputTextBoxElement4SearchGeneName.setAttribute('type', 'text');
		this.m_aInputTextBoxElement4SearchGeneName.setAttribute('name', 'SearchGenesSNPsName');
		this.m_aInputTextBoxElement4SearchGeneName.setAttribute('class', 'ControlsDeletable');
		this.m_aInputTextBoxElement4SearchGeneName.setAttribute('value', ''); // Name shown on the button.
		this.m_aInputTextBoxElement4SearchGeneName.setAttribute('id', 'SearchGenesSNPsName');
		this.m_aInputTextBoxElement4SearchGeneName.style.position = 'absolute';
		this.m_aInputTextBoxElement4SearchGeneName.style.width = 100 + 'px';
		this.m_aInputTextBoxElement4SearchGeneName.style.fontSize = '15px'; // All other text font size is 16. It is 15 here, it looks more suitable.
		this.m_aInputTextBoxElement4SearchGeneName.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aInputTextBoxElement4SearchGeneNamePositionX;
		this.m_aInputTextBoxElement4SearchGeneName.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aInputTextBoxElement4SearchGeneNamePositionY;
		this.m_aInputTextBoxElement4SearchGeneName.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
		document.body.appendChild(this.m_aInputTextBoxElement4SearchGeneName);
		gbSearchInputTextBoxElementCreated = true;
//		this.m_aInputTextBoxElement4SearchGeneName.onchange = MessageFunction4InputTextBoxSearchGenesSNPsName; // Message responce function for view rank of SNPs by their degree.
//		We response this Search Box in the Key message function "function MessageFunction4DocumentBody4KeyUp(event)". Because we want it can response when user input the text, not just when they finish the input.
	}
	// --- 5 Add one button to read the local files 1: SNPs Name File. 20120703William.
	this.m_aButtonElement4ReadLocalFile1 = document.createElement('input');
	this.m_aButtonElement4ReadLocalFile1.setAttribute('type', 'file');
	this.m_aButtonElement4ReadLocalFile1.setAttribute('name', 'Nodes File');
	this.m_aButtonElement4ReadLocalFile1.setAttribute('class', 'ControlsDeletable');
	this.m_aButtonElement4ReadLocalFile1.setAttribute('value', 'Nodes File'); // Radio control does not show 'value', you must add the label name yourself.
	this.m_aButtonElement4ReadLocalFile1.setAttribute('id', 'NodesFile');
	this.m_aButtonElement4ReadLocalFile1.style.position = 'absolute';
	this.m_aButtonElement4ReadLocalFile1.style.fontSize = 16 + 'px';
	this.m_aButtonElement4ReadLocalFile1.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile1PositionX;
	this.m_aButtonElement4ReadLocalFile1.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile1PositionY;
	this.m_aButtonElement4ReadLocalFile1.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
	document.body.appendChild(this.m_aButtonElement4ReadLocalFile1);
	this.m_aButtonElement4ReadLocalFile1.onchange = MessageFunction4ButtonReadLocalFiles1; // Message responce function for choose local files.
	// --- 6 Add one button to read the local files 2: SNPs Pairs File. 20120704William.
	this.m_aButtonElement4ReadLocalFile2 = document.createElement('input');
	this.m_aButtonElement4ReadLocalFile2.setAttribute('type', 'file');
	this.m_aButtonElement4ReadLocalFile2.setAttribute('name', 'Edges File');
	this.m_aButtonElement4ReadLocalFile2.setAttribute('class', 'ControlsDeletable');
	this.m_aButtonElement4ReadLocalFile2.setAttribute('value', 'Edges File'); // Radio control does not show 'value', you must add the label name yourself.
	this.m_aButtonElement4ReadLocalFile2.setAttribute('id', 'EdgesFile');
	this.m_aButtonElement4ReadLocalFile2.style.position = 'absolute';
	this.m_aButtonElement4ReadLocalFile2.style.fontSize = 16 + 'px';
	this.m_aButtonElement4ReadLocalFile2.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile2PositionX;
	this.m_aButtonElement4ReadLocalFile2.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile2PositionY;
	this.m_aButtonElement4ReadLocalFile2.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
	document.body.appendChild(this.m_aButtonElement4ReadLocalFile2);
	this.m_aButtonElement4ReadLocalFile2.onchange = MessageFunction4ButtonReadLocalFiles2; // Message responce function for choose local files.
	// --- 6.1 Add one button to read the local files 3: SNPs Pairs LD File. 20120704William.
	this.m_aButtonElement4ReadLocalFile3 = document.createElement('input');
	this.m_aButtonElement4ReadLocalFile3.setAttribute('type', 'file');
	this.m_aButtonElement4ReadLocalFile3.setAttribute('name', 'LD Edges File');
	this.m_aButtonElement4ReadLocalFile3.setAttribute('class', 'ControlsDeletable');
	this.m_aButtonElement4ReadLocalFile3.setAttribute('value', 'LD Edges File'); // Radio control does not show 'value', you must add the label name yourself.
	this.m_aButtonElement4ReadLocalFile3.setAttribute('id', 'LDEdgesFile');
	this.m_aButtonElement4ReadLocalFile3.style.position = 'absolute';
	this.m_aButtonElement4ReadLocalFile3.style.fontSize = 16 + 'px';
	this.m_aButtonElement4ReadLocalFile3.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_nButtonElement4ReadLocalFile3PositionX;
	this.m_aButtonElement4ReadLocalFile3.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_nButtonElement4ReadLocalFile3PositionY;
	this.m_aButtonElement4ReadLocalFile3.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
	document.body.appendChild(this.m_aButtonElement4ReadLocalFile3);
	this.m_aButtonElement4ReadLocalFile3.onchange = MessageFunction4ButtonReadLocalFiles3; // Message responce function for choose local files.
	// --- 7 Add one button to Start Render the tree ring view. 20120706William.
	this.m_aButtonElement4StartRender = document.createElement('input');
	this.m_aButtonElement4StartRender.setAttribute('type', 'button');
	this.m_aButtonElement4StartRender.setAttribute('name', 'StartRender');
	this.m_aButtonElement4StartRender.setAttribute('class', 'ControlsDeletable');
	this.m_aButtonElement4StartRender.setAttribute('value', 'Start Rendering'); // Radio control does not show 'value', you must add the label name yourself.
	this.m_aButtonElement4StartRender.setAttribute('id', 'StartRender');
	this.m_aButtonElement4StartRender.style.position = 'absolute';
	this.m_aButtonElement4StartRender.style.fontSize = 16 + 'px';
	this.m_aButtonElement4StartRender.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4StartRenderPositionX;
	this.m_aButtonElement4StartRender.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4StartRenderPositionY;
	this.m_aButtonElement4StartRender.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
	document.body.appendChild(this.m_aButtonElement4StartRender);
	this.m_aButtonElement4StartRender.onclick = MessageFunction4ButtonStartRender; // Message responce function for choose local files.
	// 20120710William. Read the data automatically, and begin to render demo.
	this.m_aButtonElement4RenderDemo = document.createElement('input');
	this.m_aButtonElement4RenderDemo.setAttribute('type', 'button');
	this.m_aButtonElement4RenderDemo.setAttribute('name', 'StartRenderDemo');
	this.m_aButtonElement4RenderDemo.setAttribute('class', 'ControlsDeletable');
	this.m_aButtonElement4RenderDemo.setAttribute('value', 'Demo'); // Radio control does not show 'value', you must add the label name yourself.
	this.m_aButtonElement4RenderDemo.setAttribute('id', 'StartRenderDemo');
	this.m_aButtonElement4RenderDemo.style.position = 'absolute';
	this.m_aButtonElement4RenderDemo.style.width = 111 + 'px';
	this.m_aButtonElement4RenderDemo.style.fontSize = 16 + 'px';
	this.m_aButtonElement4RenderDemo.style.color = 'rgb(255,0,0)';
	this.m_aButtonElement4RenderDemo.style.left = this.m_nCanvasTopLftPointWidthX + this.m_nCanvasWidth - this.m_aButtonElement4RenderDemoPositionX;
	this.m_aButtonElement4RenderDemo.style.top = this.m_nCanvasTopLftPointHeghtY + this.m_aButtonElement4RenderDemoPositionY;
	this.m_aButtonElement4RenderDemo.style.zIndex = this.m_aCanvasElement.style.zIndex; //  + 1
	document.body.appendChild(this.m_aButtonElement4RenderDemo);
	this.m_aButtonElement4RenderDemo.onclick = MessageFunction4ButtonStartRenderDemo; // Message responce function for choose local files.
};
CMyCanvasWindowCommon.prototype.RemoveSomeControls = function()
{ // 20120713William. add this to remove all other controls except this canvas.
	var nNumOfElement = document.getElementsByClassName('ControlsDeletable').length;
	var vsControlsElementsIDList = new Array(nNumOfElement);
	for (var nIdx = 0; nIdx < nNumOfElement; nIdx++) 
	{
		var sOneElementId = document.getElementsByClassName('ControlsDeletable')[nIdx].id;
		vsControlsElementsIDList[nIdx] = sOneElementId;
	}
	for (var nIdx = 0; nIdx < nNumOfElement; nIdx++) 
	{
		var sOneElementId = vsControlsElementsIDList[nIdx];
		var aOneElement = document.getElementById(sOneElementId);
		document.body.removeChild(aOneElement);
	}
};
CMyCanvasWindowCommon.prototype.RenderSomeTextForUserSelectFiles = function()
{	// 20120704. The content is copied here from "RenderNodeColorBarAndEdgeColorBar" in file "CRingGraphAllNodes.js"
	var nFontSizeNormal = 16;
	// --- 9 Add the title for choose file 1: SNPs Name File.
	this.m_aCanvasContext.fillStyle    = "black";
	this.m_aCanvasContext.textBaseline = "top"; // "top"
	this.m_aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	this.m_aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 22;
	this.m_aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	this.m_aCanvasContext.textAlign = "left";
	this.m_aCanvasContext.fillText("Nodes File:", 0, 0);
	this.m_aCanvasContext.restore();
	// --- 10 Add the title for choose file 2: SNPs Pair File.
	this.m_aCanvasContext.fillStyle    = "black";
	this.m_aCanvasContext.textBaseline = "top"; // "top"
	this.m_aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	this.m_aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 70;
	this.m_aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	this.m_aCanvasContext.textAlign = "left";
	this.m_aCanvasContext.fillText("Edges File:", 0, 0);
	this.m_aCanvasContext.restore();
	// --- 10.1 Add the title for choose file 3: SNPs Pair LD File.
	this.m_aCanvasContext.fillStyle    = "black";
	this.m_aCanvasContext.textBaseline = "top"; // "top"
	this.m_aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	this.m_aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 70 + 48;
	this.m_aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	this.m_aCanvasContext.textAlign = "left";
	this.m_aCanvasContext.fillText("LD Edges File:", 0, 0);
	this.m_aCanvasContext.restore();
	// --- 90 Add one sentence to say that after load the data and start render, the control panel will show up.
	this.m_aCanvasContext.fillStyle    = "black";
	this.m_aCanvasContext.textBaseline = "top"; // "top"
	this.m_aCanvasContext.font = 15 + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	this.m_aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 160 + 48;
	this.m_aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	this.m_aCanvasContext.textAlign = "left";
	this.m_aCanvasContext.fillText("The control panel will appear after user", 0, 0);
	this.m_aCanvasContext.restore();
	this.m_aCanvasContext.save();
	var nOneLabelBasePtHghY = 180 + 48;
	this.m_aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	this.m_aCanvasContext.textAlign = "left";
	this.m_aCanvasContext.fillText("loads data files and starts rendering.", 0, 0);
	this.m_aCanvasContext.restore();
};

function MessageFunction4SliderOfBundleStrength2(event)
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
	gsEdgBundleStrengthSliderValue = aOneCanvasRefer.m_aSliderElement4BundleStrength.value;
	// the following are the message you are going to process. This slider's value is read as "nNewValueBndlStrgSldr".
	// "nNewValueBndlStrgSldr" will lie between [0 10]. You need to calculate the relative value.
	var dBundleStrengthValue = gsEdgBundleStrengthSliderValue / 10;
	aAllNodes4RingGraph.SetBundleStrength(dBundleStrengthValue);
	// the following steps are needed to re-run to update the tree ring view with partial nodes.
	// --- 1 --- before rendering, we need to get the width and height of the canvas.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh);
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// --- Step 4. Generate the Edges (B-Spline Curves) for the partial nodes.
	aAllNodes4RingGraph.GenerateCurveEdgesOfPiecewiseCubicBSpline4PartialNodes();
	// --- Step 5. Call rendering function. 20111202William, Render the curve edges. This Step must be run after Step 4 "Generation of Curve Edge".
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// --- Step 6. Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// the above process is also called in sequence in the following function:
};

function MessageFunction4SliderOfNumOfTopPairs(event)
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
	var nNewValueNumEdgesSldr = aOneCanvasRefer.m_aSliderElement4NumOfTopPairs.value;
	gsNewValueNumEdgesSldr = nNewValueNumEdgesSldr.toString();
	ReRenderAllViewsAfterUserChangeSomeControlsParameters(); // 20120927 This is one main entry point.
};

function MessageFunction4RadioButtonHighlightMode(event)
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // 5 is the sixth common canvas.
	if (this.value == 'Any')
	{	gnHightlightModeAnyOrAll = 0;	}
	else if (this.value == 'All')
	{	gnHightlightModeAnyOrAll = 1;	}
	aAllNodes4RingGraph.SetMultipleSelectionHighlightMode(gnHightlightModeAnyOrAll);
	// We must refresh the view.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// Call rendering function. Re-draw the tree ring view.
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
};

function MessageFunction4ButtonReadLocalFiles1(event)
{
	// Check for the various File API support.
	if (window.File && window.FileReader) {
//		alert('The File APIs are fully supported in this browser.'); // Great success! All the File APIs are supported.
	} else {
		if (gsBrowserType == "Safari")
		{
			alert('You are using a lower version of Safari, and the FileReader API is not supported. Please update to Safari 6 in OS X Moutain Lion, then it will work well.');
		}
	}
	// Begin to get the file name list, and read the files.
	var vaFilesObjects = event.target.files; // "vaFilesObjects" is a FileList of File objects.
	var aOneFileObject = vaFilesObjects[0];
	var aOneFileReader = new FileReader();
	aOneFileReader.readAsText(aOneFileObject);
	// Handle progress, success, and errors
	aOneFileReader.onprogress = FileReadUpdateProgress;
	aOneFileReader.onload = FileReadOnLoadedFun1;
	aOneFileReader.onerror = FileReadErrorHandler;
};

function MessageFunction4ButtonReadLocalFiles2(event)
{
	// Check for the various File API support.
	if (window.File && window.FileReader) {
//		alert('The File APIs are fully supported in this browser.'); // Great success! All the File APIs are supported.
	} else {
		if (gsBrowserType == "Safari")
		{
			alert('You are using a lower version of Safari, and the FileReader API is not supported. Please update to Safari 6 in OS X Moutain Lion, then it will work well.');
		}
	}
	// Begin to get the file name list, and read the files.
	var vaFilesObjects = event.target.files; // "vaFilesObjects" is a FileList of File objects.
	var aOneFileObject = vaFilesObjects[0];
	var aOneFileReader = new FileReader();
	aOneFileReader.readAsText(aOneFileObject);
	// Handle progress, success, and errors
	aOneFileReader.onprogress = FileReadUpdateProgress;
	aOneFileReader.onload = FileReadOnLoadedFun2;
	aOneFileReader.onerror = FileReadErrorHandler;
};

function MessageFunction4ButtonReadLocalFiles3(event)
{
	// Check for the various File API support.
	if (window.File && window.FileReader) {
//		alert('The File APIs are fully supported in this browser.'); // Great success! All the File APIs are supported.
	} else {
		if (gsBrowserType == "Safari")
		{
			alert('You are using a lower version of Safari, and the FileReader API is not supported. Please update to Safari 6 in OS X Moutain Lion, then it will work well.');
		}
	}
	// Begin to get the file name list, and read the files.
	var vaFilesObjects = event.target.files; // "vaFilesObjects" is a FileList of File objects.
	var aOneFileObject = vaFilesObjects[0];
	var aOneFileReader = new FileReader();
	aOneFileReader.readAsText(aOneFileObject);
	// Handle progress, success, and errors
	aOneFileReader.onprogress = FileReadUpdateProgress;
	aOneFileReader.onload = FileReadOnLoadedFun3;
	aOneFileReader.onerror = FileReadErrorHandler;
};

function FileReadOnLoadedFun1(evt) {  // Obtain the read file data    
	var fileString = evt.target.result;
	var vsLineArray = fileString.split("\n");
	var nNumOfLines = vsLineArray.length;
	gvvsJSAllUniqueSNPsInfor = []; // 20120704. Since we are going to assign new values, we must clear this array first.
	for (var nIdx = 0; nIdx < nNumOfLines; nIdx++)
	{
		var sOneLineStr = vsLineArray[nIdx];
		if (sOneLineStr == "") {continue;}
		var vsOneLineTokens = sOneLineStr.split(" ");
		gvvsJSAllUniqueSNPsInfor.push(vsOneLineTokens);
	}
	// After read the data, call functions to re-render the views.
	gbDoesNodesFileReloaded = true;
};

function COneEdgeInfor(){
	this.m_nIndexOfNode1 = 0;
	this.m_nIndexOfNode2 = 0;
	this.m_dEdgeWeight = 0.0;
};

function FileReadOnLoadedFun2(evt) {  // Obtain the read file data    
	var fileString = evt.target.result;
	var vsLineArray = fileString.split("\n");
	var nNumOfLines = vsLineArray.length;
	var vaAllRawEdgeInfor = new Array();
	for (var nIdx = 0; nIdx < nNumOfLines; nIdx++)
	{
		var sOneLineStr = vsLineArray[nIdx];
		if (sOneLineStr == "") {continue;}
		var vsOneLineTokens = sOneLineStr.split(" ");
		var nIdxOfNode1 = vsOneLineTokens[0];
		var nIdxOfNode2 = vsOneLineTokens[1];
		var dEdgeWeight = vsOneLineTokens[2];
		var aOneEdgeInfor = new COneEdgeInfor();
		aOneEdgeInfor.m_nIndexOfNode1 = nIdxOfNode1;
		aOneEdgeInfor.m_nIndexOfNode2 = nIdxOfNode2;
		aOneEdgeInfor.m_dEdgeWeight = dEdgeWeight;
		vaAllRawEdgeInfor.push(aOneEdgeInfor);
	}
	// Sort these edges.
	vaAllRawEdgeInfor.sort(function(a,b){return b.m_dEdgeWeight - a.m_dEdgeWeight;});
	// Assign the data to global variable.
	gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs = []; // 20120704. Since we are going to assign new values, we must clear this array first.
	gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs = [];
	gvdJSTwoLocusTestValue = [];
	var nNumOfEdges = vaAllRawEdgeInfor.length;
	for (var nIdx = 0; nIdx < nNumOfEdges; nIdx++)
	{
		var aOneEdgeInfor = vaAllRawEdgeInfor[nIdx];
		gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs.push(aOneEdgeInfor.m_nIndexOfNode1);
		gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs.push(aOneEdgeInfor.m_nIndexOfNode2);
		gvdJSTwoLocusTestValue.push(aOneEdgeInfor.m_dEdgeWeight);
	}
	// After read the data, call functions to re-render the views.
	gbDoesEdgesFileReloaded = true;
};

function FileReadOnLoadedFun3(evt) {  // Obtain the read file data    
	var fileString = evt.target.result;
	var vsLineArray = fileString.split("\n");
	var nNumOfLines = vsLineArray.length;
	gvnJSLDInforFstSNPIndexInUniqueSNPs = []; // 20120704. Since we are going to assign new values, we must clear this array first.
	gvnJSLDInforSndSNPIndexInUniqueSNPs = [];
	gvdJSLDInforValue = [];
	for (var nIdx = 0; nIdx < nNumOfLines; nIdx++)
	{
		var sOneLineStr = vsLineArray[nIdx];
		if (sOneLineStr == "") {continue;}
		var vsOneLineTokens = sOneLineStr.split(" ");
		gvnJSLDInforFstSNPIndexInUniqueSNPs.push(vsOneLineTokens[0]);
		gvnJSLDInforSndSNPIndexInUniqueSNPs.push(vsOneLineTokens[1]);
		gvdJSLDInforValue.push(vsOneLineTokens[2]);
	}
	// After read the data, call functions to re-render the views.
	gbDoesLDInforEdgesFileReloaded = true;
};

function FileReadUpdateProgress(evt) {
	if (evt.lengthComputable) {	// evt.loaded and evt.total are ProgressEvent properties
		var loaded = (evt.loaded / evt.total);
		if (loaded < 1) {}	// Increase the prog bar length	// style.width = (loaded * 200) + "px";
	}
};

function FileReadErrorHandler(evt) {	if(evt.target.error.name == "NOT_READABLE_ERR") {} }; // The file could not be read

function MessageFunction4CheckboxWhetherShowNodesName(event)
{	// --- 1. Get the new value
	var bWhetherShowNodesName = this.checked;
	aAllNodes4RingGraph.SetTreeRingViewNodesNameTextWhetherShow(bWhetherShowNodesName);
	gbWhetherCheckboxShowTextChecked = bWhetherShowNodesName;
	// --- 2. Re-Render the tree ring view.
	// We must refresh the view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// Call rendering function. Re-draw the tree ring view.
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
}

function MessageFunction4SliderOfFontSize(event)
{	// --- 1. Get the new value
	var nNewValueFontSizeSldr = this.value;
	aAllNodes4RingGraph.SetTreeRingViewNodesNameTextFontSize(nNewValueFontSizeSldr);
	aAllNodes4RingGraph.RefreshTreeRingViewLevelWidthVariable();
	gsNewValueFontSizeSldr = nNewValueFontSizeSldr;
	// --- 2. Begin re-render the two views.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.GenerateLayoutOfTheTreeRingView4PartialNodes();
	aAllNodes4RingGraph.GenerateCurveEdgesOfPiecewiseCubicBSpline4PartialNodes();
	// Call rendering function. Re-draw the tree ring view.
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
}

function MessageFunction4ButtonStartRender(event)
{
	if (gbDoesNodesFileReloaded == true && gbDoesEdgesFileReloaded == true && gbDoesLDInforEdgesFileReloaded == true)
	{
		gbDoesUserLoadAnyFiles = true; // Since we already load two files, therefore, we can add the controls.
		ReRenderViewsAfterUserLoadNewFiles(); // 20120704. It will clear everything, and begin from the very beginning to render the views.
		// After re-render the views. Set the global flag to false.
		gbDoesNodesFileReloaded = false;
		gbDoesEdgesFileReloaded = false;
		gbDoesLDInforEdgesFileReloaded = false;
	}
}

function MessageFunction4ButtonStartRenderDemo(event)
{
	gbDoesNodesFileReloaded = false;
	gbDoesEdgesFileReloaded = false;
	gbDoesLDInforEdgesFileReloaded = false;
	// First, read nodes file on remote server.
	var aNodesFile = new XMLHttpRequest();
	aNodesFile.open('GET', './01NodesFile.txt', false);
	aNodesFile.onreadystatechange = FileReadRemoteTextFile4NodesFile;
	aNodesFile.send(null);
	// Second, read edges file on remote server.
	var aEdgesFile = new XMLHttpRequest();
	aEdgesFile.open('GET', './02EdgesFile.txt', false);
	aEdgesFile.onreadystatechange = FileReadRemoteTextFile4EdgesFile;
	aEdgesFile.send(null);
	// Third, read LD edges file on remote server.
	var aLDEdgesFile = new XMLHttpRequest(); // aLDEdgesFile has no use, the data is read in "FileReadRemoteTextFile4LDEdgesFile", and data is stored in global variables.
	aLDEdgesFile.open('GET', './03LDEdgesFile.txt', false);
	aLDEdgesFile.onreadystatechange = FileReadRemoteTextFile4LDEdgesFile;
	aLDEdgesFile.send(null);
	// After read the data, re-render everything.
	if (gbDoesNodesFileReloaded == true && gbDoesEdgesFileReloaded == true && gbDoesLDInforEdgesFileReloaded == true)
	{
		gbDoesUserLoadAnyFiles = true; // Since we already load two files, therefore, we can add the controls.
		ReRenderViewsAfterUserLoadNewFiles(); // 20120704. It will clear everything, and begin from the very beginning to render the views.
		// After re-render the views. Set the global flag to false.
		gbDoesNodesFileReloaded = false;
		gbDoesEdgesFileReloaded = false;
		gbDoesLDInforEdgesFileReloaded = false;
	}
}

function FileReadRemoteTextFile4NodesFile(event) {
	if (this.readyState === 4) {  // Makes sure the document is ready to parse.
		if (this.status === 200) {  // Makes sure it's found the file.
			sAllFileText = this.responseText;
			var vsLineArray = sAllFileText.split("\n");
			var nNumOfLines = vsLineArray.length;
			gvvsJSAllUniqueSNPsInfor = []; // 20120704. Since we are going to assign new values, we must clear this array first.
			for (var nIdx = 0; nIdx < nNumOfLines; nIdx++)
			{
				var sOneLineStr = vsLineArray[nIdx];
				if (sOneLineStr == "") {continue;}
				var vsOneLineTokens = sOneLineStr.split(" ");
				gvvsJSAllUniqueSNPsInfor.push(vsOneLineTokens);
			}
			gbDoesNodesFileReloaded = true;
		}
	}
};

function FileReadRemoteTextFile4EdgesFile(event) {
	if (this.readyState === 4) {  // Makes sure the document is ready to parse.
		if (this.status === 200) {  // Makes sure it's found the file.
			sAllFileText = this.responseText;
			var vsLineArray = sAllFileText.split("\n");
			var nNumOfLines = vsLineArray.length;
			gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs = []; // 20120704. Since we are going to assign new values, we must clear this array first.
			gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs = [];
			gvdJSTwoLocusTestValue = [];
			for (var nIdx = 0; nIdx < nNumOfLines; nIdx++)
			{
				var sOneLineStr = vsLineArray[nIdx];
				if (sOneLineStr == "") {continue;}
				var vsOneLineTokens = sOneLineStr.split(" ");
				gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs.push(vsOneLineTokens[0]);
				gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs.push(vsOneLineTokens[1]);
				gvdJSTwoLocusTestValue.push(vsOneLineTokens[2]);
			}
			gbDoesEdgesFileReloaded = true;
		}
	}
};
function FileReadRemoteTextFile4LDEdgesFile(event) {
	if (this.readyState === 4) {  // Makes sure the document is ready to parse.
		if (this.status === 200) {  // Makes sure it's found the file.
			sAllFileText = this.responseText;
			var vsLineArray = sAllFileText.split("\n");
			var nNumOfLines = vsLineArray.length;
			gvnJSLDInforFstSNPIndexInUniqueSNPs = []; // 20120704. Since we are going to assign new values, we must clear this array first.
			gvnJSLDInforSndSNPIndexInUniqueSNPs = [];
			gvdJSLDInforValue = [];
			for (var nIdx = 0; nIdx < nNumOfLines; nIdx++)
			{
				var sOneLineStr = vsLineArray[nIdx];
				if (sOneLineStr == "") {continue;}
				var vsOneLineTokens = sOneLineStr.split(" ");
				gvnJSLDInforFstSNPIndexInUniqueSNPs.push(vsOneLineTokens[0]);
				gvnJSLDInforSndSNPIndexInUniqueSNPs.push(vsOneLineTokens[1]);
				gvdJSLDInforValue.push(vsOneLineTokens[2]);
			}
			gbDoesLDInforEdgesFileReloaded = true;
		}
	}
};
//function MessageFunction4ButtonScreenshot(event)
//{
//	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
//	var aOneCanvasElement = aOneCanvasRefer.m_aCanvasElement;
//	Canvas2Image.saveAsPNG(aOneCanvasElement); // It can not save large size image.
//}
function MessageFunction4SelectColorBar4NodesColor(event)
{
	gnIndexOfColorScheme4NodesColor = this.selectedIndex;
	// --- Begin to re-render the two views.
	// --- First, refresh the tree ring view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.MapSingleLocusTestValueToNodeColors();
	aAllNodes4RingGraph.GenerateNodeColorBarAndEdgeColorBarsColorData();
	// Call rendering function. Re-draw the tree ring view.
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// --- Second, refresh the matrix view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nMatrixViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nMatrixViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nMatrixViewCanvasWdh, nMatrixViewCanvasHgh); // It will clear the canvas.
	// Call rendering function. Re-draw the tree ring view.
	UpdateTheMatrixView(0, 0);
};
function MessageFunction4SelectColorBar4EdgesColor(event)
{
	gnIndexOfColorScheme4EdgesColor = this.selectedIndex;
	// --- Begin to re-render the two views.
	// --- First, refresh the tree ring view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.GenerateNodeColorBarAndEdgeColorBarsColorData();
	aAllNodes4RingGraph.GenerateCurveEdgesOfPiecewiseCubicBSpline4PartialNodes();
	// Call rendering function. Re-draw the tree ring view.
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// --- Second, refresh the matrix view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nMatrixViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nMatrixViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nMatrixViewCanvasWdh, nMatrixViewCanvasHgh); // It will clear the canvas.
	// Call rendering function. Re-draw the tree ring view.
	UpdateTheMatrixView(0, 0);
};
function MessageFunction4CheckboxWhetherShowBlackBackground(event)
{
	gbWhetherCheckboxBlackBackgroundChecked = this.checked;
	// Begin to re-render the tree ring view.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // "gnCanvasID4TreeRingView" is the canvas for tree ring view.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// Call rendering function. Re-draw the tree ring view.
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// Call rendering function for LD Ring View. 20130619William.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
	var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, gbDoesUserSelectOneNode, gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
};
function MessageFunction4ButtonViewRankOfSNPsByDegree(event)
{	// Open a new webpage tab, and show the rank results of SNPs in the webpage.
	if (gbWindow4ViewRankOfSNPsByDegreeBeenCreatedOrNot == false)
	{
		gbWindow4ViewRankOfSNPsByDegreeBeenCreatedOrNot = true;
	}
	else if (gbWindow4ViewRankOfSNPsByDegreeBeenCreatedOrNot == true)
	{
		var bHasItAlreadyBeenClosed = gaWindow4ViewRankOfSNPsByDegree.closed;
		if (bHasItAlreadyBeenClosed == false)
		{
			gaWindow4ViewRankOfSNPsByDegree.close();
		}
	}
	gaWindow4ViewRankOfSNPsByDegree = window.open();
	gaWindow4ViewRankOfSNPsByDegree.document.open();
	gaWindow4ViewRankOfSNPsByDegree.document.write("<title>EINVis: SNPs Rank</title>");
	gaWindow4ViewRankOfSNPsByDegree.document.write("<table border=\"0\" cellspacing=\"0\" cellpadding=\"3\" width=\"61.8%\" align=\"center\"><tbody><tr><td>");
	var sTableTitle = "<h3 align=\"center\" style=\"margin-top:20px;margin-bottom:10px;\">Rank of SNPs</h3>";
	gaWindow4ViewRankOfSNPsByDegree.document.write("</td></tr><tr><td>");
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableTitle);
	var sTableExplainEpisIntrNet1 = "<p>Epistasis Interaction Network (EIN) has: </p>";
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableExplainEpisIntrNet1);
	var sTableExplainEpisIntrNet2 = "<ul><li><div style=\"FONT-FAMILY: times new roman,serif\">Number of Nodes (SNPs): " + gnNodeOfNodesInEpistasisInteractionNetwork + " </div></li></ul>";
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableExplainEpisIntrNet2);
	var sTableExplainEpisIntrNet3 = "<ul><li><div style=\"FONT-FAMILY: times new roman,serif\">Number of Edges (SNP-SNP Interactions): " + gnNodeOfEdgesInEpistasisInteractionNetwork + " </div></li></ul>";
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableExplainEpisIntrNet3);
	var sTableExplainParagraph1 = "<p>The parameters for Binomial Distribution are:</p>";
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableExplainParagraph1);
	var sTableExplainParagraph2 = "<ul><li><div style=\"FONT-FAMILY: times new roman,serif\">Number of Independent Experiments: " + gnNumOfIndependentExperiments + " (Number of Edges in EIN);</div></li></ul>";
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableExplainParagraph2);
	var sTableExplainParagraph3 = "<ul><li><div style=\"FONT-FAMILY: times new roman,serif\">Probability to Yield Success: " + Number(gdProbabilityOfYieldSuccess).toFixed(4) + " (2 / Number of Nodes in EIN);</div></li></ul>";
	gaWindow4ViewRankOfSNPsByDegree.document.write(sTableExplainParagraph3);
	gaWindow4ViewRankOfSNPsByDegree.document.write("<table border=\"1\" cellspacing=\"0\" cellpadding=\"3\" width=\"100%\" align=\"center\">");
	gaWindow4ViewRankOfSNPsByDegree.document.write("<tbody><tr>");
	gaWindow4ViewRankOfSNPsByDegree.document.write("<th>Index</th><th>Chrome ID</th><th>Gene Name</th><th>SNP ID</th><th>Single Locus Test Statistics</th><th>Number of Related Edges</th><th>Binomial Dist. p-value</th>");
	gaWindow4ViewRankOfSNPsByDegree.document.write("</tr><tr align=\"left\">");
	// Then, add all the SNPs to the table.
	var nNumOfSNPs = gvaAllSNPsListRankedByBinmDistPValue.length;
	for (var nIdx = 0; nIdx < nNumOfSNPs; nIdx++)
	{
		var aOneSNPRefer = gvaAllSNPsListRankedByBinmDistPValue[nIdx];
		var sChrmName = aOneSNPRefer.m_sChrmName;
		var sGeneName = aOneSNPRefer.m_sGeneName;
		var sSNPsName = aOneSNPRefer.m_sSNPName;
		var sURLAddressInNCBI4Gene = "http://www.ncbi.nlm.nih.gov/gene?term=" + sGeneName;
		var nNumOfCharsInSNPsName = sSNPsName.length;
		var sRSNumberInSNPName = sSNPsName.substr(2, nNumOfCharsInSNPsName - 2);
		var sURLAddressInNCBI4SNPs = "http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=" + sRSNumberInSNPName;
		var dSingleLocusTestValue = aOneSNPRefer.m_dSingleLocusTestValue;
		dSingleLocusTestValue = Number(dSingleLocusTestValue).toFixed(3);
		var nNumOfEdgesRelated = aOneSNPRefer.m_nNumOfEdges;
		var dBinominalDistPValue = 1 - aOneSNPRefer.m_dBinominalDistPValue; // 1 - Q value is the p-value.
		dBinominalDistPValue = Number(dBinominalDistPValue).toFixed(4);
		var sOneRowInTable = "<td align=\"center\">" + (nIdx + 1) + "</td><td align=\"center\">" + sChrmName
						   + "</td><td align=\"center\"> <a href=\"" + sURLAddressInNCBI4Gene + "\" target=\"_blank\">"
						   + sGeneName
						   + "</a></td><td align=\"center\"> <a href=\"" + sURLAddressInNCBI4SNPs + "\" target=\"_blank\">"
						   + sSNPsName
						   + "</a></td><td align=\"center\">" + dSingleLocusTestValue
						   + "</td><td align=\"center\">" + nNumOfEdgesRelated + 
						   "</td><td align=\"center\">" + dBinominalDistPValue + "</td>";
		gaWindow4ViewRankOfSNPsByDegree.document.write(sOneRowInTable);
		gaWindow4ViewRankOfSNPsByDegree.document.write("</tr><tr align=\"left\">");
	}
	gaWindow4ViewRankOfSNPsByDegree.document.write("</tr></tbody></table>");
	gaWindow4ViewRankOfSNPsByDegree.document.write("</td></tr></tbody></table>");
	gaWindow4ViewRankOfSNPsByDegree.document.close();
};
function MessageFunction4InputTextBoxSearchGenesSNPsName(event)
{	// When user input text ("Gene Name", or "SNPs Name") in the "Search:" input text box, then this message function will be called.
	alert("Test:)");
};