function CAllNodes4RingGraph()
{
	// --- this class is separated from "CParseAndConstrctHierarTreeAndGraphStructure.php". Only contain one main variable. ---
	// 20110324William add these variables for the storage of each level of parameters.
	this.m_vsTokensListInOneLineParamRealName = new Array(); // the tokens set of one node parameter in the original 01 02 files. // since php can not pass one class instance to the javascript, so we have to pass through the basic variable type, such as string, int, bool...
	this.m_nGlobalIndexOfOneLineparamRealName = 0;
	this.m_vvAllNodes4RingGraph = new Array(); // the original type is "vector< vector<COneNode4RingGraph> >" in Qt/C++
	// store all nodes information in the tree, even the graph infor can be stored in the leaf nodes.
	// this variable will be add contents when we parsing the data file "02AllLeafNodeParamNameListRealName.txt"
    // the element of the first vector is the node list of each level of the hierarchical tree structure with the data type "vector<COneNode4RingGraph>"
    // and in each level's nodes list, each element is one node, it maybe a branch node, so it contains children nodes;
    //                                                           it maybe leaf nodes, so it contains the time-varying data or the graph relationship vector;(these attributes will be added later.)
    // we mix the branch and leaf nodes here, and it is better to separate them in two different class in future.
    // --- this is another explanation ---
    // this variable "m_vvAllNodes4RingGraph" is to store all the nodes data structure for the ring graph vis.
    // the main variable should be "vector< vector<COneNode4RingGraph> > m_vvAllNodes4RingGraph"
    // and the reason to form this class is that many operations needed on this variable.
    // such as, we want to add one node, we need to first search the existing father nodes, and add the leaf nodes to its children.
    // and if there is no this father, we need to add the father first.
    // also we need to count the leaf node children number of each father, no matter the root father node or non-root father nodes.
    // and each node, no matter branch node or leaf node, are store in the class "COneNode4RingGraph".
	this.m_nMaxlevelInAllLeafNodesParamRealName = 0; // the max level in "m_vvAllNodes4RingGraph", but it comes from the number of "." in the global name string plus 1.
	// 20110721William, this variable is a flag of current mouse event type. This flag is decided by the mouse event type(left/right mouse down/click/move) and the position of the mouse (inside the inner cicle/in the ring/outside the outside circle).
	this.m_nMouseOperationUserDefinedEventType = 0; // all possible user operation type are all included in this variable.
	// 0. default, no mouse event;
	// 1. to rotate the tree-ring view circle;
	// 2. to begin draw a line segment inside the circle, and select curves;
	// 3. mouse over one node response;
	// 4. mouse left button click on one node;
	// 5. mouse right click on one node;
	// 20110722William. I am trying to add the first interaction, rotate the tree-ring view. We need to store the rotation angle in this class, and when we add text over canvas (in the fun "AddPhysParamNameTextOverCanvas"); The rotation of the "Ring Sector" and "Edges" are already done by WebGL itself, we just draw the same as that before rotation.
	this.m_dRotationAngleByUser4PhysParamNameText = 0.0; // the variable stores the rotation degree of the whole circle view.
	// 20110724William begin to process the mouse left button click event. change the color of node and edge related to the selected node.
	this.m_vdMousePosInWebGLCoordsWhenLeftBtnDown = new Array(2); // this variable will store the position when left button down.
	this.m_vnIndexOfLevelAndIndexInThatLevelOfSelectedNode = new Array(2); // store the "index of level" and "index in that level" of the selected node.
	this.m_bHaveOneNodeBeenSelected = false; // 20110820William. Since the selected node will be rendered at the center of the canvas.
	// In future, the first time user click on one parameter, this flag will set to "true", it will also enable the de-focusing on any parameter.
	// 20110824William. Message Response for the Bundle Strength slider.
	this.m_dTreeRingViewBundleStrength = 0.5; // the bundle strength in the tree-ring view.
	// 20110908William. For Orthogonal Graph View.
	// 20111017William. We need to add the Orthogonal Graph view to this project, so we need to sort the order of the root nodes.
	// In the following variable, it will store the order of the root nodes. For the order in the children nodes of one father node, we will add one array to the father node, which will store the order among the children nodes.
	this.m_vnRootNodeOrderIdxRowHgh = new Array(); // the order (int row    height direction) array to store the index of root node.
	this.m_vnRootNodeOrderIdxColWdh = new Array(); // the order (int column width  direction) array to store the index of root node.
	// Notes: Not must all root nodes be shown. 
	// Notes: The index value in array "this.m_vnRootNodeOrderIdxRowHgh" and "this.m_vnRootNodeOrderIdxColWdh" points to the array "this.m_vvAllNodes4RingGraph"
	// You can retrieve one node refer as "var nIdx = this.m_vnRootNodeOrderIdxRowHgh[i]; var aOneNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdx];"
	// Begin to render the Matrix View. We need to define some variables about the layout of the Matrix View.
	this.m_nLftTopLabelsFontAndSquareSize = 10; // the size of the label text is "10 px". This is also the size of the square in the matrix view.
	this.m_nGapBtwnLabelsSquares = 2; // the gap between labels, labels and squares, squares.
	this.m_nLftLabelsMaxWidth = 0; // the left side labels maximum width .
	this.m_nTopLabelsMaxHeght = 0; // the top  side labels maximum height. this variable and the above one are equal.
	this.m_nCanvasWidth4MatrixView = 0; // the canvas width  of the matrix view.
	this.m_nCanvasHeght4MatrixView = 0; // the canvas height of the matrix view.
	this.m_nNumOfAllLeafNodes = 0; // the number of all leaf nodes.
	// 20111019William. The canvas size: 11500 works; But 12000 Aw, Snap! There are total 2370 parameters, each parameter takes 12 pixels.
	// Since it is too large to show all nodes. So we have to use pan function in this view.
	this.m_bIsUserPanningMatrixView = false; // the flag of whether user is panning the matrix view.
	this.m_nMatrixViewPanMousePosOldWdhX = 0; // the Width  X of the old position of the mouse when user pan the matrix view.
	this.m_nMatrixViewPanMousePosOldHghY = 0; // the Height Y of the old position of the mouse when user pan the matrix view.
	this.m_nLftMarginLeafNodeBgnIdx = 0; // the index of the leaf node at the begin of the left margin.
	this.m_nLftMarginLeafNodeEndIdx = 0; // the index of the leaf node at the end   of the left margin.
	this.m_nTopMarginLeafNodeBgnIdx = 0; // the index of the leaf node at the begin of the top  margin.
	this.m_nTopMarginLeafNodeEndIdx = 0; // the index of the leaf node at the end   of the top  margin.
	this.m_nMaxNumOfLabelsInLftOrTopMargin = 100; // the maximum number of labels in left or top margin. // 400 sucess, 800/600/500/crash.
	this.m_bIsMatrixViewPanFunAllowed = false; // "false" do not allow to pan the matrix view (less than 800 parameters); "true" allow to pan the matrix view (when total number of parameters is larger than 800).
	// 20111118William. To render the tree-ring view with partial nodes.
	this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes = 0; // set the width and height of the canvas, which is for the rendering of the tree-ring view with partial nodes.
	// if The canvas size is set to 1400, the "Canvas2Image" does not work;
	// if The canvas size is set to 1300, the "Canvas2Image" does work;
	this.m_nLengthOfRingSectorInRadiusDirectn = 90; // the length of the ring sector in the radius direction.
	this.m_nGapLengthBtwTwoAdjcntLvlRingSectr = 6; // the gap between two adjacent level of ring sector.
	// also for the tree ring view, but the variables are for user interaction.
	this.m_nTreeRingView4PartialNodMouseRelativePosWdhX = 0; // the mouse global position's width  X for the interaction in the tree ring view with partial nodes.
	this.m_nTreeRingView4PartialNodMouseRelativePosHghY = 0; // the mouse global position's height Y for the interaction in the tree ring view with partial nodes.
	this.m_bIsMouseFallInAnyRingSector = false; // "false" it does not fall in any ring sector; "true" it does fall in one ring sector.
	this.m_nMouseClickOnNodeIndexOfLevel = 0; // the index of level of the node which user mouse click on.
	this.m_nMouseClickOnNodeIndexInLevel = 0; // the index in one level of the node which user mouse click on.
	// 20111205William. To render the curve edges of the node selected by user.
	// if user want to select one node, he must use this interaction "Shift key pressed + Ctrl key pressed + Mouse left button click".
	this.m_bDoesUserSelectOneNode = false; // "true" user does select one node, so we only render the curve edges related to this selected node; "false", no, so render all nodes equally, all with gradient color.
	this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView = new Array(); // 20120630William update to multiple selection. the index of level of one selected node in the tree ring view with partial nodes.
	this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView = new Array(); // the index in level of one selected node in the tree ring view with partial nodes.
	// 20120629William. Variables For Color Bar.
	this.m_nColorBarWidth = 250;
	this.m_nColorBarHeigh = 18;
	this.m_vsColorBar4NodeColor = new Array();
	this.m_vsColorBar4EdgeColor = new Array();
	this.m_nCanvasWidth = 0;
	this.m_nCanvasHeght = 0;
	this.m_nMultipleSelectionHighlightMode = 0; // 20120630William, variable for multiple selection, hightlight mode, "0" any of them, or "1" all of them.
	// 20120705William. Add variables to decide whether or not to show text nodes name; and the size of font of the nodes name text.
	this.m_bTreeRingViewNodesNameTextWhetherShow = true;
	this.m_nTreeRingViewNodesNameTextFontSize = 20;
	// 20120707William. Add the variable to store the width and maximum width of each level in the tree Ring view.
	this.m_vnTreeRingViewLevelWidth = new Array();
	// 20130621William. For the Judge of Mouse Hanging Over Which Edges (Two Locus Test Edges, or LD Infor Edges)
	this.m_vaAllEdgesBriefInforWithDistToMouse = new Array();
	this.m_aMouseOverHangingBriefEdgeInfor = new COneEdgeBriefInfor();
	this.m_aMouseOverHangingBriefEdgeInforLD = new COneEdgeBriefInfor();
}

// operation on "this.m_nMouseOperationUserDefinedEventType"
CAllNodes4RingGraph.prototype.GetMouseOperationUserDefinedEventType = function(){	return this.m_nMouseOperationUserDefinedEventType;	};
CAllNodes4RingGraph.prototype.SetMouseOperationUserDefinedEventType = function(nMouseOperationUserDefinedEventType){	this.m_nMouseOperationUserDefinedEventType = nMouseOperationUserDefinedEventType;	};
// operation on "this.m_nMatrixViewPanMousePosOldWdhX" and "this.m_nMatrixViewPanMousePosOldHghY"
CAllNodes4RingGraph.prototype.SetLBtnDownPosCoords = function(nMouseGlobalPosWdhX, nMouseGlobalPosHghY)
{
	this.m_nMatrixViewPanMousePosOldWdhX = nMouseGlobalPosWdhX;
	this.m_nMatrixViewPanMousePosOldHghY = nMouseGlobalPosHghY;
};
//operation on "this.m_nTreeRingView4PartialNodMouseRelativePosWdhX" and "this.m_nTreeRingView4PartialNodMouseRelativePosHghY"
CAllNodes4RingGraph.prototype.SetLOrRBtnDownPosCoords4TreeRingViewPartialNod = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY)
{
	this.m_nTreeRingView4PartialNodMouseRelativePosWdhX = nMouseRelativeCoordsWdhX;
	this.m_nTreeRingView4PartialNodMouseRelativePosHghY = nMouseRelativeCoordsHghY;
};
// operation on "this.m_bIsUserPanningMatrixView"
CAllNodes4RingGraph.prototype.SetIsUserPanningMatrixView = function(bIsUserPanningMatrixView){	this.m_bIsUserPanningMatrixView = bIsUserPanningMatrixView;	};
CAllNodes4RingGraph.prototype.GetIsUserPanningMatrixView = function(){	return this.m_bIsUserPanningMatrixView;	};
// operation on "this.m_nCanvasWidth" and "this.m_nCanvasHeght"
CAllNodes4RingGraph.prototype.SetCanvasWidthAndHeight = function(nCanvasWidth, nCanvasHeight)
{
	this.m_nCanvasWidth = nCanvasWidth;
	this.m_nCanvasHeght = nCanvasHeight;
	// Set another important variable, 20120706.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes = this.m_nCanvasHeght - nLftMarginWdh * 2;
};
// operation on "this.m_bTreeRingViewNodesNameTextWhetherShow"
CAllNodes4RingGraph.prototype.SetTreeRingViewNodesNameTextWhetherShow = function(bTreeRingViewNodesNameTextWhetherShow) {this.m_bTreeRingViewNodesNameTextWhetherShow = bTreeRingViewNodesNameTextWhetherShow;};
//operation on "this.m_nTreeRingViewNodesNameTextFontSize"
CAllNodes4RingGraph.prototype.SetTreeRingViewNodesNameTextFontSize = function(nTreeRingViewNodesNameTextFontSize) {this.m_nTreeRingViewNodesNameTextFontSize = nTreeRingViewNodesNameTextFontSize;};
//---------------- the member function is as follows -------------------------
//operation on "this.m_dRotationAngleByUser4PhysParamNameText"
CAllNodes4RingGraph.prototype.SetRotationAngleByUser4PhysParamNameText = function(dRotationAngleByUser4PhysParamNameText)
{
	this.m_dRotationAngleByUser4PhysParamNameText = dRotationAngleByUser4PhysParamNameText;
};
CAllNodes4RingGraph.prototype.ClearTheOneLeafNodeTokensSet = function()
{
	this.m_vsTokensListInOneLineParamRealName = new Array();
};
CAllNodes4RingGraph.prototype.SetGlobalIndexOfOneLeafNodeTokensSet = function(nIdxOfOneNode){	this.m_nGlobalIndexOfOneLineparamRealName = nIdxOfOneNode;	};
CAllNodes4RingGraph.prototype.AddOneTokenToOneLeafNodeTokensSet = function(sOneToken)
{
	this.m_vsTokensListInOneLineParamRealName.push(sOneToken);
};
//operation on "this.m_dTreeRingViewBundleStrength"
CAllNodes4RingGraph.prototype.SetBundleStrength = function(dBundleStrengthValue)
{
	this.m_dTreeRingViewBundleStrength = dBundleStrengthValue;
};
//Get the total number of all nodes in the hierarchical tree.
CAllNodes4RingGraph.prototype.GetTotalNumberOfNodesInThisHierTree = function()
{
	var nTotalNumberOfNodes = 0;
	var nNumOfLvl = this.m_vvAllNodes4RingGraph.length;
	for (var nIdxOfLvl = 0; nIdxOfLvl < nNumOfLvl; nIdxOfLvl++)
	{
		var nNumOfNodesInThisLevel = this.m_vvAllNodes4RingGraph[nIdxOfLvl].length;
		nTotalNumberOfNodes += nNumOfNodesInThisLevel;
	}
	return nTotalNumberOfNodes;
};
// the following are the main function. The above are just simple member variable operation function.
CAllNodes4RingGraph.prototype.AddOneGlobalParameterRealName = function(dSingleLocusTestValue)
{   // 20110330William add the second parameter input, the aim is to parse the graph relationship in another file in future.
	// add one global name, which is a parameter's real name, into the tree nodes data set.
	// this global name input in the form of string set "m_vsTokensListInOneLineParamRealName", which is a string list.
	// 20120628William add on input parameter "dSingleLocusTestValue" is for the single locus test value (scaled).
	var nTokensNumOfThisLine = this.m_vsTokensListInOneLineParamRealName.length;
	var vTokensIndexInEachLevel = new Array(nTokensNumOfThisLine); // store each level index in the "m_vvAllNodes4RingGraph". If the token in a concrete level exist already, then the index point to it; if not exist, set the flag with false;
	var vTokensIsExistInEachLevel = new Array(nTokensNumOfThisLine); // the flag whether the token exist in one level. if "true", exist; if "false", not exist.
	var aTmpNodeRefer = new COneNode4RingGraph();
	for (var nIdxOfTokensOfThisLine = 0; nIdxOfTokensOfThisLine < nTokensNumOfThisLine; nIdxOfTokensOfThisLine++)
	{   // "nIdxOfNodeExistNumInOneLevel" is equal to the level number of the whole tree structure.
		vTokensIndexInEachLevel[nIdxOfTokensOfThisLine] = 0; // initial value
		vTokensIsExistInEachLevel[nIdxOfTokensOfThisLine] = false; // initial value
		var sOneTokenOfThisLine = this.m_vsTokensListInOneLineParamRealName[nIdxOfTokensOfThisLine];
		// we need to find the nodes number in level "nIdxOfTokensOfThisLine".
		var nExistLevelNum = this.m_vvAllNodes4RingGraph.length;
		if (nExistLevelNum > nIdxOfTokensOfThisLine) // "nIdxOfTokensOfThisLine" is the level number in the tree.
		{	// if the node level of this new node is smaller than the existing node set maximum level, then we can add this new node into the corresponding level array. I mean, you do not need to add a new level to store the data.
			if (nIdxOfTokensOfThisLine != (nTokensNumOfThisLine - 1)) // if it is not the leaf token string name, the level is not the last(branch node).
			{
				var nThisLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxOfTokensOfThisLine].length;
				for (var nIdxOfNodeExistNumInOneLevel = 0; nIdxOfNodeExistNumInOneLevel < nThisLevelNodesNum; nIdxOfNodeExistNumInOneLevel++)
				{
					aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxOfTokensOfThisLine][nIdxOfNodeExistNumInOneLevel];
					var sOneExistNodeName = aTmpNodeRefer.GetThisNodeName();
					// if ( strcmp(sOneExistNodeName.c_str(), sOneTokenOfThisLine.c_str()) == 0 ) // version 1 to compare two string.
					if ( sOneExistNodeName == sOneTokenOfThisLine ) // version 2 to compare two string
					{
						vTokensIsExistInEachLevel[nIdxOfTokensOfThisLine] = true; // if find this token already exist, then set the flag.
						vTokensIndexInEachLevel[nIdxOfTokensOfThisLine] = nIdxOfNodeExistNumInOneLevel;
						break;
					}
				}
			}
			else    // if it is leaf token, the level is the last, (leaf node). We allow duplicate exist in the leaf nodes.
			{   //  20110325William debug. Add this branch if else to allow the repeated leaf nodes name exist.
				vTokensIsExistInEachLevel[nIdxOfTokensOfThisLine] = false; // if find this token already exist, then set the flag.
				vTokensIndexInEachLevel[nIdxOfTokensOfThisLine] = 0;
			}
		}
		else
		{   // if this node has exceed the level exist, we need to add a new level.
			var aOneNode4RingGraph = new COneNode4RingGraph(); // 20110912William. This variable is not a reference, it is a new instance, which will be pushed into the Array later.
			aOneNode4RingGraph.SetThisNodeLevel(nIdxOfTokensOfThisLine);
			var nIdxInThisLevel = 0; // since the level is created here, totally new, so it is the first element.
			aOneNode4RingGraph.SetThisNodeIndexInLevel(nIdxInThisLevel); // 20111018William. These two lines are added for orthogonal graph layout generation.
			aOneNode4RingGraph.SetThisNodeName(sOneTokenOfThisLine);
			if (nIdxOfTokensOfThisLine == nTokensNumOfThisLine - 1)
			{   // if it is the leaf node
				aOneNode4RingGraph.SetIsLeafNode(true);
				aOneNode4RingGraph.SetSingleLocusTestValueScaled(dSingleLocusTestValue); // 20120628William.
				aOneNode4RingGraph.SetIndexInLeafNodes(this.m_nGlobalIndexOfOneLineparamRealName); // the index in all leaf node.
			}
			else
			{   // if it is the branch node
				aOneNode4RingGraph.SetIsLeafNode(false);
			}
			var aTmpNodeLevelVectr = new Array();
			aTmpNodeLevelVectr.push(aOneNode4RingGraph);
			this.m_vvAllNodes4RingGraph.push(aTmpNodeLevelVectr);
			continue; // go to process the next token. // or we can set "vTokensIsExistInEachLevel[nIdxOfTokensOfThisLine] = true;" to avert the process of the following if code seg.
		}
		// so, the level not exist, but the node token string maybe found but not found, so we need to add a new obj or update the reference object.
		if (vTokensIsExistInEachLevel[nIdxOfTokensOfThisLine] == false)
		{   // if we have find the token string in the existing data set.
			var aOneNode4RingGraph = new COneNode4RingGraph(); // 20110912William. This variable is not a reference, it is a new instance, which will be pushed into the Array later.
			aOneNode4RingGraph.SetThisNodeLevel(nIdxOfTokensOfThisLine);
			var nIdxInThisLevel = this.m_vvAllNodes4RingGraph[nIdxOfTokensOfThisLine].length; // insert at the last position, so the index equals to the length of the array.
			aOneNode4RingGraph.SetThisNodeIndexInLevel(nIdxInThisLevel); // 20111018William. These two lines are added for orthogonal graph layout generation.
			aOneNode4RingGraph.SetThisNodeName(sOneTokenOfThisLine);
			if (nIdxOfTokensOfThisLine == nTokensNumOfThisLine - 1)
			{   // if it is the leaf node
				aOneNode4RingGraph.SetIsLeafNode(true);
				aOneNode4RingGraph.SetSingleLocusTestValueScaled(dSingleLocusTestValue); // 20120628William.
				aOneNode4RingGraph.SetIndexInLeafNodes(this.m_nGlobalIndexOfOneLineparamRealName); // the index in all leaf node.
			}
			else
			{   // if it is the branch node
				aOneNode4RingGraph.SetIsLeafNode(false);
			}
			this.m_vvAllNodes4RingGraph[nIdxOfTokensOfThisLine].push(aOneNode4RingGraph);
			vTokensIndexInEachLevel[nIdxOfTokensOfThisLine] = this.m_vvAllNodes4RingGraph[nIdxOfTokensOfThisLine].length - 1; // set the index to the last element just added.
		}
	}
	// after the above first round search , we have added or found all this parameter's father node and leaf node.
	// these information is stored in the variables "vTokensIndexInEachLevel" and "vTokensIsExistInEachLevel".
	// then , update the father-children relationship , and also need to update the leaf children number information.
	for (var nIdxOfTokensOfThisLine = 0; nIdxOfTokensOfThisLine < nTokensNumOfThisLine; nIdxOfTokensOfThisLine++)
	{   // "nIdxOfNodeExistNumInOneLevel" is equal to the level number of the whole tree structure.
		var nIndexOfOneNode2ThisParam = vTokensIndexInEachLevel[nIdxOfTokensOfThisLine];
		aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxOfTokensOfThisLine][nIndexOfOneNode2ThisParam]; // it should be reference.
		var bIsLeafNode = aTmpNodeRefer.GetIsLeafNode();
		if (bIsLeafNode === false)
		{
			if (vTokensIsExistInEachLevel[nIdxOfTokensOfThisLine + 1] === false) // if the next(its child) level node is not found in the above for loop, then we need to add the index of child in the next level into this node children set, this parameter name.
			{
				aTmpNodeRefer.AddOneIdxOfNextLevelChildren(vTokensIndexInEachLevel[nIdxOfTokensOfThisLine + 1]); // since it is not leaf node, so we plus one do not exceed the bound.
			}
			aTmpNodeRefer.IncreaseThisNodeFinestLevelChildrenNumByOne();
		}
		// if it is a leaf node, nothing to do in this step.
	}
	// final, you need to know the maximum level of nodes
	this.GetMaxLevelInAllLeafNodesParamRealName();
};
//the following function is for the edge relationship operation.
CAllNodes4RingGraph.prototype.GetMaxLevelInAllLeafNodesParamRealName = function()
{	// the maximum level of all nodes.
	this.m_nMaxlevelInAllLeafNodesParamRealName = this.m_vvAllNodes4RingGraph.length;
};
CAllNodes4RingGraph.prototype.AddOneDefinedByRltn4GraphEdge = function(nIndexDefEdgeFrom, nIndexDefEdgeTo, dTwoLocusTestValue, nIndexInOriginalSNPsListFrom, nIndexInOriginalSNPsListTo)
{
	var aTmpNodeRefer = new COneNode4RingGraph();
	var bFoundFrom = false;
	var bFoundTo   = false;
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName;nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes];
			var bIsThisNodeALeafNode = aTmpNodeRefer.GetIsLeafNode();
			if (bIsThisNodeALeafNode == true)
			{
				var nThisNodeIndexInLeafNodes = aTmpNodeRefer.GetIndexInLeafNodes();
				if (nThisNodeIndexInLeafNodes == nIndexDefEdgeTo)
				{
					aTmpNodeRefer.AddOneIdxOfDefinedByOtherLeafNodes(nIndexDefEdgeFrom);
					aTmpNodeRefer.AddOneDefinedByOtherLeafNodesEdgeWeight(dTwoLocusTestValue);
					aTmpNodeRefer.m_nIndexInOriginalSNPsList = nIndexInOriginalSNPsListTo;
					bFoundFrom = true;
				}
				if (nThisNodeIndexInLeafNodes == nIndexDefEdgeFrom)
				{
					aTmpNodeRefer.m_nIndexInOriginalSNPsList = nIndexInOriginalSNPsListFrom;
					bFoundTo = true;
				}
				if (bFoundFrom == true && bFoundTo == true){
					return;
				}
			}
		}
	}
};
CAllNodes4RingGraph.prototype.AddOneLDInforEdge = function(nIndexOfNode1, nIndexOfNode2, dLDInforValue)
{
	var aTmpNodeRefer = new COneNode4RingGraph();
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName;nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes];
			var bIsThisNodeALeafNode = aTmpNodeRefer.GetIsLeafNode();
			if (bIsThisNodeALeafNode == true)
			{
				var nThisNodeIndexInLeafNodes = aTmpNodeRefer.GetIndexInLeafNodes();
				if (nThisNodeIndexInLeafNodes == nIndexOfNode2)
				{
					aTmpNodeRefer.AddOneNodeIndexOfLDInforEdge(nIndexOfNode1);
					aTmpNodeRefer.AddOneWeightOfLDInforEdge(dLDInforValue);
					return;
				}
			}
		}
	}
};
//the following function's task is to generate the layout of the tree-ring view.
//each node will contain (in the class "COneNode4RingGraph"):
//1.1 4 corner points Euclidean Coordinates (x, y) of the ring sector.  // for easy to rotate, I think we had better store the polar coordinate system coordinate.
//1.2 4 corner points Polar Coordinates (Radius, Angle) // for easy to rotate the whole graph. if you rotate, just plus the angle and recalculate the Euclidean Coordinates.
//2.1 the center point Euclidean Coordinates (x, y) of the ring sector.
//2.2 the center point Polar Coordinates (Radius, Angle) of the ring sector. // this Angle value can be used as the direction of the text label.
//3. the color of this node.
//All the data is defined in the "ReadAndParseTheLeafNodesParamRealNameListFile()" fun in file "CParseAndConstrctHierarTreeAndGraphStructure.php"
//		echo 'var aAllNodes4RingGraph = new CAllNodes4RingGraph();';echo "\n";
//so, all data is stored in "aAllNodes4RingGraph".
//you should define one function here, since you may need to recall them in the message interaction function,such as the "Rotate", etc.
CAllNodes4RingGraph.prototype.GenerateLayoutOfTheTreeRingView = function()
{ // this function is described above.
	// we need to process each level independently, but the slot between two ring sectors may need to keep consistent between all neighbors.
	// in the top layer, use a larger slot, and in the lower layer, use the same span of the slot between two neighbor nodes, whose fathers are different.
	// just use fathers span to get the children span, then the begin and end angle will be kept.
	// --- 1.1 generate the first level nodes layout (angle and radius) information
	// first, calculate the total number of leaf nodes, and number of leaf nodes that each node contains.
	var nTotalNumOfNodeInFinestLevel = 0;
	var nNumOfRootNodes = 0;
	nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var nThisNodeFinestLevelChildrenNum = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].GetThisNodeFinestLevelChildrenNum();
		nTotalNumOfNodeInFinestLevel += nThisNodeFinestLevelChildrenNum;
	}
	// --- 1.2 separate the full circle 360 degree, each ring sector's angle is proportional to the number of finest level chidren nodes.
	var nNumOfSlotsBtwSector = nNumOfRootNodes;
	var dDegreeOfEachSlot = 0.003; // 0.003 * 360 = 1.08 degree/slot, 0.0001 for Whole parameters set; 0.08 for lite files only contains 17 parameters.
	// 20110726William, we need to set a Adaptable width of the slot between two neighbor ring sectors.
	var nThresholdOfWhetherRecudeWidthOfSlot = (2 * 3.1415926) / (dDegreeOfEachSlot * 2);
	var nNumOfAllNodesInThisHierTree = this.GetTotalNumberOfNodesInThisHierTree();
	if (nNumOfAllNodesInThisHierTree > nThresholdOfWhetherRecudeWidthOfSlot)
	{	// if the number of nodes is too large, so we have to reduce the width of slot between two neighbor ring sector.
		dDegreeOfEachSlot = (2 * 3.1415926) / (2 * nNumOfAllNodesInThisHierTree);
	}	// if the number of nodes is larger than "1047", the width of slots will reduced accordingly.
	// then begin to split the circle into ring sector.
	var dTotalDegreeOfAllSectorExceptSlots = 2 * 3.1415926 - dDegreeOfEachSlot * nNumOfSlotsBtwSector;
	var dOneRingSectorBgnAngle = 0.0;
	var dOneRingSectorEndAngle = 0.0;
	var dRootNodeInnerRadius = 3.8; // the inner circle radius of the root node level
	var dRootNodeOuterRadius = 4.1; // the outer circle radius of the root node level
	var aOneRootNode4RingGraph = new COneNode4RingGraph();
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		aOneRootNode4RingGraph = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode];
		var nThisNodeFinestLevelChildrenNum = aOneRootNode4RingGraph.GetThisNodeFinestLevelChildrenNum();
		if (nIdxOfRootNode == 0)
		{
			dOneRingSectorBgnAngle = 0.0;
		}
		else
		{
			dOneRingSectorBgnAngle = dOneRingSectorEndAngle + dDegreeOfEachSlot; // one root node begin degree equals to the prior's end degree plus the degree of slot.
		}
		if (nIdxOfRootNode == (nNumOfRootNodes - 1))
		{
			dOneRingSectorEndAngle = 2 * 3.1415926 - dDegreeOfEachSlot;
		}
		else
		{
			dOneRingSectorEndAngle = dOneRingSectorBgnAngle + dTotalDegreeOfAllSectorExceptSlots * nThisNodeFinestLevelChildrenNum / nTotalNumOfNodeInFinestLevel; // need to debug, not sure it will generate correct results. int / int ??
		}
		aOneRootNode4RingGraph.SetBgnEndInnerOuterPointInPolar(dRootNodeInnerRadius,   dRootNodeOuterRadius,
															   dOneRingSectorBgnAngle, dOneRingSectorEndAngle);
	}
	// --- 2 after the first level's layout finished, we begin to generate the lower level nodes'. Then lower, until bottom level(finest level).
	var dOneLvlNodeInnerRadius = dRootNodeInnerRadius;
	var dOneLvlNodeOuterRadius = dRootNodeOuterRadius;
	for (var nIdxOfNodeLevel = 0; nIdxOfNodeLevel < this.m_nMaxlevelInAllLeafNodesParamRealName - 1; nIdxOfNodeLevel++)
	{
		dOneLvlNodeInnerRadius -= 0.315;
		dOneLvlNodeOuterRadius -= 0.315;
		var nNumOfNodesAtThisLevel = this.m_vvAllNodes4RingGraph[nIdxOfNodeLevel].length;
		// dDegreeOfEachSlot = dDegreeOfEachSlot * 8 / 10; // the lower the level, the smaller the slot.
		for (var nIdxOfNodeInOneLvl = 0; nIdxOfNodeInOneLvl < nNumOfNodesAtThisLevel; nIdxOfNodeInOneLvl++)
		{
			aOneRootNode4RingGraph = this.m_vvAllNodes4RingGraph[nIdxOfNodeLevel][nIdxOfNodeInOneLvl];
			aOneRootNode4RingGraph.SetItsLinealChildrenNodeLayoutInfor(this.m_vvAllNodes4RingGraph, dDegreeOfEachSlot, dOneLvlNodeInnerRadius, dOneLvlNodeOuterRadius);
		}
	}
};
// 20111117William. This function is to generate the layout of partial nodes.
CAllNodes4RingGraph.prototype.GenerateLayoutOfTheTreeRingView4PartialNodes = function()
{
	// --- 1.1 generate the first level nodes layout (angle and radius) information
	// first, calculate the total number of leaf nodes, and number of leaf nodes that each node contains.
	var nTotalNumOfNodeInFinestLevel = 0;
	var nNumOfRootNodes = 0;
	nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var nThisNodeFinestLevelChildrenNum = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].GetThisNodeFinestLevelChildrenNum4PartialNodes();
		nTotalNumOfNodeInFinestLevel += nThisNodeFinestLevelChildrenNum;
	}
	// --- 1.2 separate the full circle 360 degree, each ring sector's angle is proportional to the number of finest level chidren nodes.
	var nNumOfSlotsBtwSector = nNumOfRootNodes;
	var dDegreeOfEachSlot = 0.003; // 0.003 * 360 = 1.08 degree/slot, 0.0001 for Whole parameters set; 0.08 for lite files only contains 17 parameters.
	// then begin to split the circle into ring sector.
	var dTotalDegreeOfAllSectorExceptSlots = 2 * 3.1415926 - dDegreeOfEachSlot * nNumOfSlotsBtwSector;
	var dOneRingSectorBgnAngle = 0.0;
	var dOneRingSectorEndAngle = 0.0;
//	var dRootNodeInnerRadius = Math.floor( this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2 )
//							 - this.m_nLengthOfRingSectorInRadiusDirectn; // the inner circle radius of the root node level
	var nFstLevelWidth = this.m_vnTreeRingViewLevelWidth[0]; // 20120707William. Change to the level width will change with the font size.
	var dRootNodeInnerRadius = Math.floor( this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2 ) - nFstLevelWidth; // the inner circle radius of the root node level
	var dRootNodeOuterRadius = Math.floor( this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2 ); // the outer circle radius of the root node level
	var aOneRootNode4RingGraph = new COneNode4RingGraph();
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		aOneRootNode4RingGraph = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode];
		var nThisNodeFinestLevelChildrenNum = aOneRootNode4RingGraph.GetThisNodeFinestLevelChildrenNum4PartialNodes();
		if (nIdxOfRootNode == 0)
		{
			dOneRingSectorBgnAngle = 0.0;
		}
		else
		{
			dOneRingSectorBgnAngle = dOneRingSectorEndAngle + dDegreeOfEachSlot; // one root node begin degree equals to the prior's end degree plus the degree of slot.
		}
		if (nIdxOfRootNode == (nNumOfRootNodes - 1))
		{
			dOneRingSectorEndAngle = 2 * 3.1415926 - dDegreeOfEachSlot;
		}
		else
		{
			dOneRingSectorEndAngle = dOneRingSectorBgnAngle + dTotalDegreeOfAllSectorExceptSlots * nThisNodeFinestLevelChildrenNum / nTotalNumOfNodeInFinestLevel; // need to debug, not sure it will generate correct results. int / int ??
		}
		aOneRootNode4RingGraph.SetBgnEndInnerOuterPointInPolar4PartialNodes(dRootNodeInnerRadius, dRootNodeOuterRadius, dOneRingSectorBgnAngle, dOneRingSectorEndAngle);
		// Since this root node's layout is fixed, then all of its children nodes' layout can be calculated.
//		aOneRootNode4RingGraph.GenerateLayoutOfChildrenNodes4PartialNodes(
//				this.m_vvAllNodes4RingGraph, this.m_nGapLengthBtwTwoAdjcntLvlRingSectr, this.m_nLengthOfRingSectorInRadiusDirectn);
// 20120518 Comments the above two lines. Add the following lines.
		var nSndLevelWidth = this.m_vnTreeRingViewLevelWidth[1]; // 20120707William. Change to the level width will change with the font size.
		aOneRootNode4RingGraph.GenerateLayoutOfChildrenNodes4PartialNodes(this.m_vvAllNodes4RingGraph, this.m_nGapLengthBtwTwoAdjcntLvlRingSectr, nSndLevelWidth, this.m_vnTreeRingViewLevelWidth);
	}
};
//20110724William, the following fun is for the interaction with mouse left button down.
CAllNodes4RingGraph.prototype.AssignTheIndexInAllNodesToEachNode = function()
{	// this fun will assign each node a value, which is the index of the node in all nodes. (I think the nodes in the hierarchical 3 levels 20130620William.)
	var nIdxInAllNodes = 0;
	var aOneNodeInTheHierTree = new COneNode4RingGraph();
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName; nIdxLvl++)
	{
		var nNumOfNodeInThisLvl = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxNodInEachLvl = 0; nIdxNodInEachLvl < nNumOfNodeInThisLvl;nIdxNodInEachLvl++)
		{
			aOneNodeInTheHierTree = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxNodInEachLvl];
			aOneNodeInTheHierTree.AssignTheIndexInAllNodesToThisNode(nIdxInAllNodes);
			nIdxInAllNodes++;
		}
	}
};
CAllNodes4RingGraph.prototype.FindOneNodeIndexInWhichEachLvlInWhichIndexUseIndexOfDefByChld = function(nIdxOfOneDefByChld, aOneDefByNodeInfor) // "nIdxOfOneDefByChld" input; "nIdxOfLevel" and "nIdxInOneLevel" are output, they are used as reference.
{   // an auxiliary function in the realization of above function. 20110713William copy from Qt/C++ PhyVis06. To change from index in leaf node, to the index of level and index in one level. To retrieve one leaf node in the data structure.
	// 20110821William, this fun is called in class "COneNode4RingGraph.js"
	var aTmpNodeRefer = new COneNode4RingGraph();
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName; nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			var nThisNodeIndexInLeafNodes = aTmpNodeRefer.GetIndexInLeafNodes(); // Get variable "m_nIndexInLeafNodes" in class "COneNode4RingGraph"
			if (nThisNodeIndexInLeafNodes == nIdxOfOneDefByChld)
			{
				aOneDefByNodeInfor[0] = nIdxLvl;
				aOneDefByNodeInfor[1] = nIdxOfOneLevelNodes;
			}
		}
	}
};
// The following function will be called by the function in "COneNode4RingGraph" class.
CAllNodes4RingGraph.prototype.GetThePathFromOneLeafNodeToAnotherInHierTree = function(nOneIndexOfLeafNodeBegin, nOneIndexOfLeafNodeEnd, vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel)
{	// 20110821William, this "Path" in this function's name means that from A (one leaf node) back to its father B, and maybe grandfather C, if C is a root node, then, get the end leaf node G's root grandfather D, and fathers E, F. So, we find the path A(leaf), B, C(root), D(root), E, F, G(leaf).
	// each non-leaf node in the path contains one virtual inner point in the inner circle of the tree-ring graph. We will use this path to find the inner path, and this path will be used to construct the spline curve.
	var bIsTheBgnLeafNodeFound = false; // the flag for whether we have found the begin leaf node;
	var bIsTheEndLeafNodeFound = false; // the flag for whether we have found the end leaf node;
	var nIdxInsertPosForBgnOrEndLeafNod = 0; // the index we insert node to the vector "vThePathsNodesListLinkTwoLeafNode", the node comes from the ancestor of the begin leaf node.
	var nNumOfAllNodesLevel = this.m_vvAllNodes4RingGraph.length;
	var bFlagOneNodeIsTheAncestorOfTheBeginOrEndLeafNode = false;
	var bTheFlagOfTheTwoLeafNodeHaveSameAncestor = false;
	var aOneNodeReference = new COneNode4RingGraph();
	for (var nIdxOfLevel = (nNumOfAllNodesLevel - 1); nIdxOfLevel >= 0; nIdxOfLevel--)
	{
		if (bTheFlagOfTheTwoLeafNodeHaveSameAncestor == true)
		{	// this if condition indicates that we have found the two leaf nodes' common ancestor, maybe without searching for the root level or something. So, after that, we need return immediately.
			return;
		}
		var nNumOfNodesInThisLevel = this.m_vvAllNodes4RingGraph[nIdxOfLevel].length;
		for (var nIdxOfElemInThisLevel = 0; nIdxOfElemInThisLevel < nNumOfNodesInThisLevel; nIdxOfElemInThisLevel++)
		{
			if (bTheFlagOfTheTwoLeafNodeHaveSameAncestor == true)
			{	// this if condition indicates that we have found the two leaf nodes' common ancestor, maybe without searching for the root level or something. So, after that, we need return immediately.
				return;
			}
			aOneNodeReference = this.m_vvAllNodes4RingGraph[nIdxOfLevel][nIdxOfElemInThisLevel];
			var bIsThisNodeALeafNode = aOneNodeReference.GetIsLeafNode();
			if (bIsThisNodeALeafNode == true)
			{	// if this node is the leaf node, compare this leaf node with the input leaf index.
				var nThisNodeIndexInLeafNodes = aOneNodeReference.GetIndexInLeafNodes();
				if (nThisNodeIndexInLeafNodes == nOneIndexOfLeafNodeBegin)
				{
					bIsTheBgnLeafNodeFound = true;
					vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfLevel);
					vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfElemInThisLevel); // splice(argu1, argu2, argu3); // argu1: An integer that specifies at what position to add/remove elements; argu2: The number of elements to be removed. If set to 0, no elements will be removed; argu3: The new element(s) to be added to the array.
					nIdxInsertPosForBgnOrEndLeafNod++;
					// the above line insert the element "nIdxOfElemInThisLevel" at the begin of the Array.
				}
				if (nThisNodeIndexInLeafNodes == nOneIndexOfLeafNodeEnd)
				{
					bIsTheEndLeafNodeFound = true;
					vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfLevel);
					vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfElemInThisLevel); // splice(argu1, argu2, argu3); // argu1: An integer that specifies at what position to add/remove elements; argu2: The number of elements to be removed. If set to 0, no elements will be removed; argu3: The new element(s) to be added to the array.
					// the above line insert the element "nIdxOfElemInThisLevel" at the begin of the Array.
				}
				// please do not break, since there are two leaf nodes, and they may belong to different level. So one leaf node maybe lie in the same level as the fathre node of the other leaf node.
			}
			else
			{	// if this node is not a leaf node
				if (bIsTheBgnLeafNodeFound == false && bIsTheEndLeafNodeFound == false)
				{
					continue;
				}
				var nNumOfNextLevelChildrenNode = aOneNodeReference.GetNumOfNextLevelChildren();
				bFlagOneNodeIsTheAncestorOfTheBeginOrEndLeafNode = false;
				bTheFlagOfTheTwoLeafNodeHaveSameAncestor = false;
				for (var nIdxOfOneChldNodeInNextLvl = 0; nIdxOfOneChldNodeInNextLvl < nNumOfNextLevelChildrenNode; nIdxOfOneChldNodeInNextLvl++)
				{
					var nOneIdxInThatLevelOfNextLevelChildren = aOneNodeReference.GetOneIdxOfNextLevelChildren(nIdxOfOneChldNodeInNextLvl);
					if (bIsTheBgnLeafNodeFound == true)
					{	// if we have found the leaf node(above condition), vThisNodesAncestorNodeList[nIdxInsertPosForBgnOrEndLeafNod - 1] must is the begin leaf node or its ancestor 's index in its level.
						if ( (nOneIdxInThatLevelOfNextLevelChildren == vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel[nIdxInsertPosForBgnOrEndLeafNod - 1]) 
							&& ( (nIdxOfLevel + 1) == vThePathsNodesListLinkTwoLeafNodeIndexOfLevel[nIdxInsertPosForBgnOrEndLeafNod - 1] ) ) // B
						{
							if (bFlagOneNodeIsTheAncestorOfTheBeginOrEndLeafNode == true) // A
							{	// if this node has been found to be the begin leaf node's ancestor(indicated in the if (A) condition), and here, we also found that it is also the end leaf node's ancestor(indicated by if condition B), then we found the common ancestor of the two leaf node, we can return, we do noe need to further traverse the tree.
								bTheFlagOfTheTwoLeafNodeHaveSameAncestor = true; // for the begin and end leaf node, whose ancestor occur first, it not sure.
							}
							bFlagOneNodeIsTheAncestorOfTheBeginOrEndLeafNode = true;
							if (bTheFlagOfTheTwoLeafNodeHaveSameAncestor == false)
							{
								vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfLevel);
								vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfElemInThisLevel); // splice(argu1, argu2, argu3); // argu1: An integer that specifies at what position to add/remove elements; argu2: The number of elements to be removed. If set to 0, no elements will be removed; argu3: The new element(s) to be added to the array.
								nIdxInsertPosForBgnOrEndLeafNod++;
							}
							else
							{
								break;
							}
						}
					}
					if (bIsTheEndLeafNodeFound == true)
					{
						if ( (nOneIdxInThatLevelOfNextLevelChildren == vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel[nIdxInsertPosForBgnOrEndLeafNod])
							&& ((nIdxOfLevel + 1) == vThePathsNodesListLinkTwoLeafNodeIndexOfLevel[nIdxInsertPosForBgnOrEndLeafNod]) ) // B
						{	// not only the index in that level needs to be equal, but also the index of level needs to be equal. I make a mistake today.
							if (bFlagOneNodeIsTheAncestorOfTheBeginOrEndLeafNode == true) // A
							{	// if this node has been found to be the begin leaf node's ancestor(indicated in the if (A) condition), and here, we also found that it is also the end leaf node's ancestor(indicated by if condition B), then we found the common ancestor of the two leaf node, we can return, we do noe need to further traverse the tree.
								bTheFlagOfTheTwoLeafNodeHaveSameAncestor = true;
							}
							bFlagOneNodeIsTheAncestorOfTheBeginOrEndLeafNode = true;
							if (bTheFlagOfTheTwoLeafNodeHaveSameAncestor == false)
							{
								vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfLevel);
								vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel.splice(nIdxInsertPosForBgnOrEndLeafNod, 0, nIdxOfElemInThisLevel); // splice(argu1, argu2, argu3); // argu1: An integer that specifies at what position to add/remove elements; argu2: The number of elements to be removed. If set to 0, no elements will be removed; argu3: The new element(s) to be added to the array.
							}
							else
							{
								break;
							}
						}
					}
				}
			}
		}
	}
};
CAllNodes4RingGraph.prototype.GetOneNodeAncestorNodesList = function(nIndexInLeafNodes, vThisNodesAncestorNodeList) // 
{	// 20110718William, this function is not used, it is replaced by the above fun "GetThePathFromOneLeafNodeToAnotherInHierTree()".
	// input: "nIndexInLeafNodes" is equal to the "m_nIndexInLeafNodes" member variable in each instance of "COneNode4RingGraph" class.
	// output: "vThisNodesAncestorNodeList" is a vector, it will store the ancestor nodes. We will use recursive function to realize this function.
	// the above recursive code(has been deleted) can not work, the data stucture does not allow us to do this work recursively.
	// the following code do the traverse of the tree by use of for loop.
	var bIsTheLeafNodeFound = false;
	var nNumOfAllNodesLevel = this.m_vvAllNodes4RingGraph.length;
	var aOneNodeReference = new COneNode4RingGraph();
	for (var nIdxOfLevel = (nNumOfAllNodesLevel - 1); nIdxOfLevel >= 0; nIdxOfLevel--)
	{
		var nNumOfNodesInThisLevel = this.m_vvAllNodes4RingGraph[nIdxOfLevel].length;
		for (var nIdxOfElemInThisLevel = 0; nIdxOfElemInThisLevel < nNumOfNodesInThisLevel; nIdxOfElemInThisLevel++)
		{
			aOneNodeReference = this.m_vvAllNodes4RingGraph[nIdxOfLevel][nIdxOfElemInThisLevel];
			var bIsThisNodeALeafNode = aOneNodeReference.GetIsLeafNode();
			if (bIsThisNodeALeafNode == true)
			{	// if this node is the leaf node, compare this leaf node with the input leaf index.
				var dThisNodeIndexInLeafNodes = aOneNodeReference.GetIndexInLeafNodes();
				if (dThisNodeIndexInLeafNodes == nIndexInLeafNodes)
				{
					bIsTheLeafNodeFound = true;
					vThisNodesAncestorNodeList.splice(0, 0, nIdxOfElemInThisLevel); // splice(argu1, argu2, argu3); // argu1: An integer that specifies at what position to add/remove elements; argu2: The number of elements to be removed. If set to 0, no elements will be removed; argu3: The new element(s) to be added to the array.
					// the above line insert the element "nIdxOfElemInThisLevel" at the begin of the Array.
					break; // once we found, break;
				}
			}
			else
			{	// if this node is not a leaf node
				if (bIsTheLeafNodeFound == true)
				{	// if the leaf node has been found
					// search its list of index of the children nodes in the next level.
					var nNumOfNextLevelChildrenNode = aOneNodeReference.GetNumOfNextLevelChildren();
					for (var nIdxOfOneChldNodeInNextLvl = 0; nIdxOfOneChldNodeInNextLvl < nNumOfNextLevelChildrenNode; nIdxOfOneChldNodeInNextLvl++)
					{
						var nOneIdxInThatLevelOfNextLevelChildren = aOneNodeReference.GetOneIdxOfNextLevelChildren(nIdxOfOneChldNodeInNextLvl);
						if (nOneIdxInThatLevelOfNextLevelChildren == vThisNodesAncestorNodeList[0])
						{
							vThisNodesAncestorNodeList.splice(0, 0, nIdxOfElemInThisLevel);
							break;
						}
					}
				}
			}
		}
	}
};
CAllNodes4RingGraph.prototype.GetMousePosInWebGLObjCoordsFromHtmlClientCoords = function(nMousePosClientX, nMousePosClientY, nCanvasWdhLocal, nCanvasHghLocal, mvMatrix, pMatrix, vdMousePosInWebGLObjCoords)
{	// get the mouse position in the WebGL object coordinate systme, according to the position in the Html Client Coordinates.
	var dOnePointInNDCWdhX = 0.0; // "dOnePointInNDCWdhX" is the X coordinate of one point in the Normalized Device Coordinates.
	var dOnePointInNDCHghY = 0.0; // "dOnePointInNDCHghY" is the Y coordinate of one point in the Normalized Device Coordinates.
	dOnePointInNDCWdhX = nMousePosClientX * 2 / nCanvasWdhLocal - 1.0;
	dOnePointInNDCHghY = nMousePosClientY * 2 / nCanvasHghLocal - 1.0;
	// we need to get the third coordinates of one point in the clip coords.
	var vOnePointInObjectCoords = [0.0, 0.0, 0.0, 1.0]; // we assume a temperary point.
	var vOnePointInEyeCoords = [0.0, 0.0, 0.0, 0.0]; // "vOnePointInEyeCoords" is a point in the eye coordinates.
	var vOnePointInClipCoords = [0.0, 0.0, 0.0, 0.0]; // "vOnePointInClipCoords" is a point in the clip coordinates.
	mat4.multiplyVec4(mvMatrix, vOnePointInObjectCoords, vOnePointInEyeCoords); // "vOnePointInEyeCoords" is in the eye coordinates.
	mat4.multiplyVec4(pMatrix, vOnePointInEyeCoords, vOnePointInClipCoords); // "vOnePointInClipCoords" is in the clip coordinates.
	var dTheFourthComponentInClipCoords = vOnePointInClipCoords[3];
	var dFirstComponentInClipCoordsVec = dOnePointInNDCWdhX * dTheFourthComponentInClipCoords;
	var dSecndComponentInClipCoordsVec = dOnePointInNDCHghY * dTheFourthComponentInClipCoords;
	vOnePointInClipCoords[0] = dFirstComponentInClipCoordsVec;
	vOnePointInClipCoords[1] = dSecndComponentInClipCoordsVec;
	// after we get the clip coords vectore, then multiply the reverse pMatrix, then multiply the reverse model view matrix.
	var mvMatrixReverse = mat4.create(); // "mat4" is declared in "glMatrix-0.9.5.min.js" . "mvMatrixReverse" is the reverse matrix of "mvMatrix";
	var pMatrixReverse = mat4.create(); // "pMatrixReverse" is the reverse matrix of "pMatrix";
	mat4.inverse(mvMatrix, mvMatrixReverse);
	mat4.inverse(pMatrix, pMatrixReverse);
	mat4.multiplyVec4(pMatrixReverse, vOnePointInClipCoords, vOnePointInEyeCoords);
	mat4.multiplyVec4(mvMatrixReverse, vOnePointInEyeCoords, vOnePointInObjectCoords);
	// finally, we get the corresponding point coordinate in WebGL object coordinate system.
	vdMousePosInWebGLObjCoords[0] = vOnePointInObjectCoords[0]; // this is the return value. coords X in the real world.
	vdMousePosInWebGLObjCoords[1] = vOnePointInObjectCoords[1]; // the coords Y in the real world. the Z value should be zero.
};
//20110821William. We need first generate and initialize the defining and defined by relationship variables (Def 03~07)
//this function is independent, and it will be called for only once in the main function flow file : "GenerateLayoutOfTheTreeRingView.js".
CAllNodes4RingGraph.prototype.InitializeDefiningAndDefinedByArraysByRawDefRltnVar = function()
{	// 20110821William. traverse the hierarchical tree node, find each node, and initialize its variables (Def 03~07)
	// first, initialize the "defined by" variables (Def 03 04)
	// you can refer to / or re-use the existing function "FindOneNodeIndexInWhichEachLvlInWhichIndexUseIndexOfDefByChld".
	var aTmpNodeRefer = new COneNode4RingGraph();
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName; nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			var bIsThisNodeLeafNode = aTmpNodeRefer.GetIsLeafNode(); // Get variable "m_nIndexInLeafNodes" in class "COneNode4RingGraph"
			if (bIsThisNodeLeafNode == true)
			{
				aTmpNodeRefer.InitializeDefinedByArraysByRawDefRltnVar(this); // in each node's inner function, we will still traverse the hierarchical tree.
			}
		}
	}
	// second, initialize the "defining" variables (Def 05~07)
	var aTmpNodeReferInnerLoop = new COneNode4RingGraph();
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName; nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			var bIsThisNodeLeafNode = aTmpNodeRefer.GetIsLeafNode(); // Get variable "m_nIndexInLeafNodes" in class "COneNode4RingGraph"
			if (bIsThisNodeLeafNode == true)
			{
				var nThisNodeIndexInLeafNodes = aTmpNodeRefer.GetIndexInLeafNodes();
				// ok, then, traverse all the nodes in the hierarchical tree to search that which node are defined by this node, i.e., this node defines that node.
				for (var nIdxLvlInnerLoop = 0; nIdxLvlInnerLoop < this.m_nMaxlevelInAllLeafNodesParamRealName; nIdxLvlInnerLoop++)
				{
					var nOneLevelNodesNumInnerLoop = this.m_vvAllNodes4RingGraph[nIdxLvlInnerLoop].length;
					for (var nIdxOfOneLevelNodesInnerLoop = 0; nIdxOfOneLevelNodesInnerLoop < nOneLevelNodesNumInnerLoop; nIdxOfOneLevelNodesInnerLoop++)
					{
						aTmpNodeReferInnerLoop = this.m_vvAllNodes4RingGraph[nIdxLvlInnerLoop][nIdxOfOneLevelNodesInnerLoop]; // "COneNode4RingGraph & aTmpNodeRefer"
						var bIsThisLeafNodeDefSetContain = aTmpNodeReferInnerLoop.FindIsThisNodesDefBySetConstainOneNodeLeafIndex(nThisNodeIndexInLeafNodes);
						if (bIsThisLeafNodeDefSetContain == true)
						{
							var nDefiningNodeIdxOfLvl = 0;
							var nDefiningNodeIdxInLvl = 0;
							nDefiningNodeIdxOfLvl = nIdxLvlInnerLoop;
							nDefiningNodeIdxInLvl = nIdxOfOneLevelNodesInnerLoop;
							aTmpNodeRefer.AddOneDefiningNodeInfor(nDefiningNodeIdxOfLvl, nDefiningNodeIdxInLvl); // 20110821William.
						}
					}
				}
			}
		}
	}
};
// 20111018William. To render the matrix view, we need to calculate the order in both rows direction and columns direction.
CAllNodes4RingGraph.prototype.ComputeRowHghForNodesInForwardOrderNatrualPos = function()
{	// 20120707. Change the nodes order to natrual position of SNPs on chromosome, modified from function "ComputeRowHghForNodesInForwardOrder".
	var nRootNodesTotalNum = this.m_vvAllNodes4RingGraph[0].length; // get the root nodes number.
	for (var nIdxRootNode = 0; nIdxRootNode < nRootNodesTotalNum; nIdxRootNode++)
	{
		this.m_vnRootNodeOrderIdxRowHgh.push(nIdxRootNode);
	}
};
// the following fun is similar to above function, but in backward order.
CAllNodes4RingGraph.prototype.ComputeColWdhForNodesInBckwardOrderNatrualPos = function()
{	// 20120707. Change the nodes order to natrual position of SNPs on chromosome, modified from function "ComputeColWdhForNodesInBckwardOrder".
	var nRootNodesTotalNum = this.m_vvAllNodes4RingGraph[0].length; // get the root nodes number.
	for (var nIdxRootNode = 0; nIdxRootNode < nRootNodesTotalNum; nIdxRootNode++)
	{
		this.m_vnRootNodeOrderIdxColWdh.push(nIdxRootNode);
	}
};
// if the above two funs have been runned, then we can process the children nodes order of these ordered root nodes.
CAllNodes4RingGraph.prototype.ComputeRowHghInForwardOrderAndColWdhInBckwardOrder4ChildNatrualPos = function()
{	// 20120707. Change the nodes order to natrual position of SNPs on chromosome, modified from function "ComputeRowHghInForwardOrderAndColWdhInBckwardOrder4Child".
	var nRootNodesTotalNum = this.m_vvAllNodes4RingGraph[0].length; // get the root nodes number.
	for (var nIdxRootNode = 0; nIdxRootNode < nRootNodesTotalNum; nIdxRootNode++)
	{
		var aOneRootNoeRefer = this.m_vvAllNodes4RingGraph[0][nIdxRootNode]; // get one root node reference.
		aOneRootNoeRefer.ComputeRowHghInForwardOrderAndColWdhInBckwardOrderNatrualPos(this.m_vvAllNodes4RingGraph);
	}
};
// begin to render the matrix view.
CAllNodes4RingGraph.prototype.GetLeftLabelsWidthEqualTopLabelsHeight = function(nLftMarginWdh, nTopMarginHgh, nLftMarginLeafNodeBgnIdx, nTopMarginLeafNodeBgnIdx)
{	// we need to traverse all leaf nodes, get the name with one dot "X.Y", and then get the length of this string.
	// we need to find the maximum length of these strings.
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	var nNameStringMaxLength = 0; // the maximum length of the string of name of all nodes.
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var aOneRootNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode];
		nNameStringMaxLength = aOneRootNodeRefer.GetMaxLengthOfAllNodesStringName(
				nNameStringMaxLength, this.m_nLftTopLabelsFontAndSquareSize, "", this.m_vvAllNodes4RingGraph); // we set father name to "" (empty).
	}
	this.m_nLftLabelsMaxWidth = nNameStringMaxLength;
	this.m_nTopLabelsMaxHeght = nNameStringMaxLength;
	// traverse all the nodes, get the number of leaf nodes.
	var nNumOfAllLeafNodes = 0;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var aOneRootNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode];
		nNumOfAllLeafNodes = aOneRootNodeRefer.GetNumOfAllLeafNodes(nNumOfAllLeafNodes, this.m_vvAllNodes4RingGraph);
	}
	this.m_nNumOfAllLeafNodes = nNumOfAllLeafNodes;
	// 20120706William, we need to restrict the matrix view's maximum size.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView];
	var nMatrixViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	this.m_nMaxNumOfLabelsInLftOrTopMargin = Math.floor( (nMatrixViewCanvasWdh - nLftMarginWdh * 2 - this.m_nLftLabelsMaxWidth) / (this.m_nLftTopLabelsFontAndSquareSize + this.m_nGapBtwnLabelsSquares) );
	// calculate the canvas width and height.
	if (this.m_nNumOfAllLeafNodes > this.m_nMaxNumOfLabelsInLftOrTopMargin)
	{	// if total number of leaf nodes is larger than the threshold 800.
		this.m_bIsMatrixViewPanFunAllowed = true; // allow to pan.
		this.m_nLftMarginLeafNodeBgnIdx = nLftMarginLeafNodeBgnIdx;
		this.m_nLftMarginLeafNodeEndIdx = this.m_nLftMarginLeafNodeBgnIdx + this.m_nMaxNumOfLabelsInLftOrTopMargin - 1;
		if (this.m_nLftMarginLeafNodeEndIdx > this.m_nNumOfAllLeafNodes)
		{
			this.m_nLftMarginLeafNodeEndIdx = this.m_nNumOfAllLeafNodes - 1;
		}
		this.m_nTopMarginLeafNodeBgnIdx = nTopMarginLeafNodeBgnIdx;
		this.m_nTopMarginLeafNodeEndIdx = this.m_nTopMarginLeafNodeBgnIdx + this.m_nMaxNumOfLabelsInLftOrTopMargin - 1;
		if (this.m_nTopMarginLeafNodeEndIdx > this.m_nNumOfAllLeafNodes)
		{
			this.m_nTopMarginLeafNodeEndIdx = this.m_nNumOfAllLeafNodes - 1;
		}
		this.m_nCanvasWidth4MatrixView = nLftMarginWdh + this.m_nLftLabelsMaxWidth
									   + this.m_nLftTopLabelsFontAndSquareSize * this.m_nMaxNumOfLabelsInLftOrTopMargin
									   + this.m_nGapBtwnLabelsSquares * this.m_nMaxNumOfLabelsInLftOrTopMargin
									   + nLftMarginWdh;
		this.m_nCanvasHeght4MatrixView = this.m_nCanvasWidth4MatrixView;
	}
	else
	{	// if total number of leaf nodes is smaller than the threshold 800.
		this.m_bIsMatrixViewPanFunAllowed = false; // do not allow to pan.
		this.m_nLftMarginLeafNodeBgnIdx = 0;
		this.m_nLftMarginLeafNodeEndIdx = this.m_nNumOfAllLeafNodes - 1;
		this.m_nTopMarginLeafNodeBgnIdx = 0;
		this.m_nTopMarginLeafNodeEndIdx = this.m_nNumOfAllLeafNodes - 1;
		this.m_nCanvasWidth4MatrixView = nLftMarginWdh + this.m_nLftLabelsMaxWidth
									   + this.m_nLftTopLabelsFontAndSquareSize * this.m_nNumOfAllLeafNodes
									   + this.m_nGapBtwnLabelsSquares * this.m_nNumOfAllLeafNodes
									   + nLftMarginWdh;
		this.m_nCanvasHeght4MatrixView = this.m_nCanvasWidth4MatrixView;
	}
};
// Synthesize the matrix view, which represent the definition relationship among nodes, with labels. We can consider the render the view without label, each node only take one pixle width and height.
CAllNodes4RingGraph.prototype.SynthesizeMatrixViewForDefinationWithLabel = function(aOneCanvasContext,
		nLftMarginWdh, nTopMarginHgh)
{
	// --- 1 --- render the text label on the left side.
	var nNumOfRootNodes = this.m_vnRootNodeOrderIdxRowHgh.length;
	// "this.m_vnRootNodeOrderIdxRowHgh" and "this.m_vnRootNodeOrderIdxColWdh" always have the same length.
	var nIdxInAllLeafNodes = 0; // the index in all leaf nodes.
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var nIdxOfOrderRowHgh = this.m_vnRootNodeOrderIdxRowHgh[nIdxOfRootNode];
		var aOneRootNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfOrderRowHgh];
		nIdxInAllLeafNodes = aOneRootNodeRefer.RenderTextLabelOnLeftSide(this.m_vvAllNodes4RingGraph, 
				this.m_nLftTopLabelsFontAndSquareSize, this.m_nGapBtwnLabelsSquares, "", nIdxInAllLeafNodes, aOneCanvasContext,
				this.m_nLftLabelsMaxWidth, this.m_nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh,
				this.m_nLftMarginLeafNodeBgnIdx, this.m_nLftMarginLeafNodeEndIdx);
	}
	// --- 2 --- render the text label on the top side.
	nNumOfRootNodes = this.m_vnRootNodeOrderIdxColWdh.length;
	// "this.m_vnRootNodeOrderIdxRowHgh" and "this.m_vnRootNodeOrderIdxColWdh" always have the same length.
	nIdxInAllLeafNodes = 0; // the index in all leaf nodes.
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var nIdxOfOrderColWdh = this.m_vnRootNodeOrderIdxColWdh[nIdxOfRootNode];
		var aOneRootNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfOrderColWdh];
		nIdxInAllLeafNodes = aOneRootNodeRefer.RenderTextLabelOnToppSide(this.m_vvAllNodes4RingGraph, 
				this.m_nLftTopLabelsFontAndSquareSize, this.m_nGapBtwnLabelsSquares, "", nIdxInAllLeafNodes, aOneCanvasContext,
				this.m_nLftLabelsMaxWidth, this.m_nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh,
				this.m_nTopMarginLeafNodeBgnIdx, this.m_nTopMarginLeafNodeEndIdx);
	}
	// --- 3 --- render the squares in the Matrix View.
	nNumOfRootNodes = this.m_vnRootNodeOrderIdxColWdh.length;
	// "this.m_vnRootNodeOrderIdxRowHgh" and "this.m_vnRootNodeOrderIdxColWdh" always have the same length.
	nIdxInAllLeafNodes = 0; // the index in all leaf nodes.
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var nIdxOfOrderRowHgh = this.m_vnRootNodeOrderIdxRowHgh[nIdxOfRootNode];
		var aOneRootNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfOrderRowHgh];
		nIdxInAllLeafNodes = aOneRootNodeRefer.RenderSquaresInMatrixView(aOneCanvasContext,
				this.m_nLftTopLabelsFontAndSquareSize, this.m_nGapBtwnLabelsSquares, 
				this.m_nLftLabelsMaxWidth, this.m_nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, 
				nIdxInAllLeafNodes, this.m_nLftMarginLeafNodeBgnIdx, this.m_nLftMarginLeafNodeEndIdx);
	}
};

CAllNodes4RingGraph.prototype.RenderSquaresInMatrixViewColWdhInnerFun = function(aOneCanvasContext,
		aOneLeafNode, nOneSquareLftTopBasePtHghY, nLftMarginWdh, nTopMarginHgh)
{
	var nNumOfRootNodes = this.m_vnRootNodeOrderIdxColWdh.length;
	var nIdxInAllLeafNodesColWdh = 0; // the index in all leaf nodes.
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		var nIdxOfOrderColWdh = this.m_vnRootNodeOrderIdxColWdh[nIdxOfRootNode];
		var aOneRootNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfOrderColWdh];
		nIdxInAllLeafNodesColWdh = aOneRootNodeRefer.RenderSquaresInMatrixViewColWdhInnerFun2(aOneCanvasContext,
							this.m_nLftTopLabelsFontAndSquareSize, this.m_nGapBtwnLabelsSquares, 
							this.m_nLftLabelsMaxWidth, this.m_nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, 
							nIdxInAllLeafNodesColWdh, aOneLeafNode, nOneSquareLftTopBasePtHghY,
							this.m_nTopMarginLeafNodeBgnIdx, this.m_nTopMarginLeafNodeEndIdx);
	}
};
// 20111020William. want to add the pan interation function.
CAllNodes4RingGraph.prototype.UpdateTheMatrixViewWhenUserPanIt = function(nMouseGlobalPosWdhX, nMouseGlobalPosHghY)
{	// "nMouseGlobalPosWdhX" and "nMouseGlobalPosHghY" is the new position of the mouse;
	// "this.m_nMatrixViewPanMousePosOldWdhX" and "this.m_nMatrixViewPanMousePosOldHghY" is the old position of the mouse;
	var nOffsetInWdhXDirectn = nMouseGlobalPosWdhX - this.m_nMatrixViewPanMousePosOldWdhX; // new - old , the offset value of the mouse position in Width  X direction.
	var nOffsetInHghYDirectn = nMouseGlobalPosHghY - this.m_nMatrixViewPanMousePosOldHghY; // new - old , the offset value of the mouse position in Height Y direction.
	var nMinimumUpdateStep = this.m_nLftTopLabelsFontAndSquareSize + this.m_nGapBtwnLabelsSquares;
	// update the width x direction, also means the Top Margin Labels direction.
	if (Math.abs(nOffsetInWdhXDirectn) >= nMinimumUpdateStep)
	{
		var nMoveGridNum = Math.floor(Math.abs(nOffsetInWdhXDirectn) / nMinimumUpdateStep);
		// "nMoveGridNum" is the offset value of mouse position. The unit is the number of parameter, or we can say it is the grid number.
		// since we have judge that "nOffsetInWdhXDirectn" is larger than "nMinimumUpdateStep", so "nMoveGridNum" is larger than 1.
		if (nOffsetInWdhXDirectn > 0)
		{
			if ( this.m_nTopMarginLeafNodeBgnIdx > 0 )
			{	// if the end index is still smaller than the "this.m_nNumOfAllLeafNodes", the end leaf node index.
				// we can still move towards the end direction.
				var nRemainOffset = this.m_nTopMarginLeafNodeBgnIdx - 0;
				var nMoveGridNumReasonable = nMoveGridNum;
				if (nMoveGridNum > nRemainOffset)
				{
					nMoveGridNumReasonable = nRemainOffset;
				}
				this.m_nTopMarginLeafNodeBgnIdx -= nMoveGridNumReasonable;
				this.m_nTopMarginLeafNodeEndIdx -= nMoveGridNumReasonable;
				this.m_nMatrixViewPanMousePosOldWdhX += nMoveGridNumReasonable * nMinimumUpdateStep;
			}
		}
		else if (nOffsetInWdhXDirectn < 0)
		{
			if ( this.m_nTopMarginLeafNodeEndIdx < (this.m_nNumOfAllLeafNodes - 1) )
			{	// if the end index is still smaller than the "this.m_nNumOfAllLeafNodes", the end leaf node index.
				// we can still move towards the end direction.
				var nRemainOffset = (this.m_nNumOfAllLeafNodes - 1) - this.m_nTopMarginLeafNodeEndIdx;
				var nMoveGridNumReasonable = nMoveGridNum;
				if (nMoveGridNum > nRemainOffset)
				{
					nMoveGridNumReasonable = nRemainOffset;
				}
				this.m_nTopMarginLeafNodeBgnIdx += nMoveGridNumReasonable;
				this.m_nTopMarginLeafNodeEndIdx += nMoveGridNumReasonable;
				this.m_nMatrixViewPanMousePosOldWdhX -= nMoveGridNumReasonable * nMinimumUpdateStep;
			}
		}
	}
	// update the width x direction, also means the Top Margin Labels direction.
	if (Math.abs(nOffsetInHghYDirectn) >= nMinimumUpdateStep)
	{
		var nMoveGridNum = Math.floor(Math.abs(nOffsetInHghYDirectn) / nMinimumUpdateStep);
		// "nMoveGridNum" is the offset value of mouse position. The unit is the number of parameter, or we can say it is the grid number.
		// since we have judge that "nOffsetInWdhXDirectn" is larger than "nMinimumUpdateStep", so "nMoveGridNum" is larger than 1.
		if (nOffsetInHghYDirectn > 0)
		{
			if ( this.m_nLftMarginLeafNodeBgnIdx > 0 )
			{	// if the end index is still smaller than the "this.m_nNumOfAllLeafNodes", the end leaf node index.
				// we can still move towards the end direction.
				var nRemainOffset = this.m_nLftMarginLeafNodeBgnIdx - 0;
				var nMoveGridNumReasonable = nMoveGridNum;
				if (nMoveGridNum > nRemainOffset)
				{
					nMoveGridNumReasonable = nRemainOffset;
				}
				this.m_nLftMarginLeafNodeBgnIdx -= nMoveGridNumReasonable;
				this.m_nLftMarginLeafNodeEndIdx -= nMoveGridNumReasonable;
				this.m_nMatrixViewPanMousePosOldHghY += nMoveGridNumReasonable * nMinimumUpdateStep;
			}
		}
		else if (nOffsetInHghYDirectn < 0)
		{
			if ( this.m_nLftMarginLeafNodeEndIdx < (this.m_nNumOfAllLeafNodes - 1) )
			{	// if the end index is still smaller than the "this.m_nNumOfAllLeafNodes", the end leaf node index.
				// we can still move towards the end direction.
				var nRemainOffset = (this.m_nNumOfAllLeafNodes - 1) - this.m_nLftMarginLeafNodeEndIdx;
				var nMoveGridNumReasonable = nMoveGridNum;
				if (nMoveGridNum > nRemainOffset)
				{
					nMoveGridNumReasonable = nRemainOffset;
				}
				this.m_nLftMarginLeafNodeBgnIdx += nMoveGridNumReasonable;
				this.m_nLftMarginLeafNodeEndIdx += nMoveGridNumReasonable;
				this.m_nMatrixViewPanMousePosOldHghY -= nMoveGridNumReasonable * nMinimumUpdateStep;
			}
		}
	}
	// we have update the following four variables:
	// "this.m_nLftMarginLeafNodeBgnIdx"
	// "this.m_nLftMarginLeafNodeEndIdx"
	// "this.m_nTopMarginLeafNodeBgnIdx"
	// "this.m_nTopMarginLeafNodeEndIdx"
	// update the matrix view according these four variables.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView]; // 6 is the second common canvas.
	// --- 1 --- before rendering, we need to get the width and height of the canvas.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// --- All Right, we have got the order of Root Nodes, also Child Nodes of each father node.
	// Begin to render the Matrix View. It is an examination of the above algorithm. Later We will render another view, which is the orthogonal graph view.
	this.GetLeftLabelsWidthEqualTopLabelsHeight(nLftMarginWdh, nTopMarginHgh, this.m_nLftMarginLeafNodeBgnIdx, this.m_nTopMarginLeafNodeBgnIdx);
	// Get the size of canvas, and resize the canvas.
	var nCanvasWidth = this.m_nCanvasWidth4MatrixView;
	var nCanvasHeght = this.m_nCanvasHeght4MatrixView;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nCanvasWidth, nCanvasHeght);
	// Finally, we can render the Matrix View on this canvas.
	this.SynthesizeMatrixViewForDefinationWithLabel(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh);
};

//20111117William. For the partial nodes tree-ring view.
CAllNodes4RingGraph.prototype.SetWhichNodesAreShownAtInitial = function()
{ // set which nodes are shown in the initial mode.
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// this this function, we just set the root nodes's shown or not flag to be true; we just show the root nodes;
		// hide all other nodes.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].SetThisNodeShownOrNotInThisPartialNodesMode(true);
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].SetIsAtLeastOneChildShownInPartialNodes(false);
	} // at default, all nodes are set to false, the default value of the flag variable.
};
CAllNodes4RingGraph.prototype.SetAllNodesAreShownAtInitial = function() // 20120629William. Set to show all the nodes at the initial.
{ // set which nodes are shown in the initial mode.
	var nNumOfNodesLevel = this.m_vvAllNodes4RingGraph.length;
	for (var nIdxOfLvl = 0; nIdxOfLvl < nNumOfNodesLevel; nIdxOfLvl++)
	{	// for each level
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxOfLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{	// this this function, we just set the root nodes's shown or not flag to be true; we just show the root nodes;
			var aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxOfLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			aTmpNodeRefer.SetThisNodeShownOrNotInThisPartialNodesMode(true);
			var bIsLeafNode = aTmpNodeRefer.GetIsLeafNode();
			if (bIsLeafNode == true)
			{	aTmpNodeRefer.SetIsAtLeastOneChildShownInPartialNodes(false);	}
			else {	aTmpNodeRefer.SetIsAtLeastOneChildShownInPartialNodes(true);	}
		} // at default, all nodes are set to false, the default value of the flag variable.
	}
};
//20111117William. For the partial nodes tree-ring view.
CAllNodes4RingGraph.prototype.CountTheFinestLevelChildrenNodesInThisPartialNodesMode = function()
{	// In this function, we will traverse all the nodes in the hierarchical tree, and count the children number in the finest level.
	// here, the finest level maybe not the real leaf nodes, but can be the "Leaf Node" in the partial ndoes.
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].CountTheFinestLevelChildrenNodesInPartialNodes(this.m_vvAllNodes4RingGraph);
	}
};
// 20111121William. This function is to render the tree ring view on a canvas with partial nodes.
CAllNodes4RingGraph.prototype.RenderTreeRingView4PartialNodes = function(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh,
		bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView)
{
	// --- Step 1. Render the ring sector of all nodes.
	// get the center point (WdhX, HghY) of all ring sector.
	var nAllRingSectorCenterWdhX = nLftMarginWdh + Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nAllRingSectorCenterHghY = nTopMarginHgh + Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderTreeRingView4ThisNodeAndChildNodesIfNeed(
				aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, this.m_vvAllNodes4RingGraph,
				bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, this.m_nMultipleSelectionHighlightMode, this.m_bTreeRingViewNodesNameTextWhetherShow, this.m_nTreeRingViewNodesNameTextFontSize);
		// 20111208William. Add the three parameters : "bDoesUserSelectOneNode", "nSelectedNodeIndexOfLevel..." and "nSelectedNodeIndexInLevel...".
		// the aim is to set the color of nodes related to the selected node.
	}
	// --- Step 2. Render the curve edges. 20120630. First render the gray lines, second, render the color lines.
	if (bDoesUserSelectOneNode == true)
	{
		var bGrayOrColorEdge = false; // "false", for gray lines
		for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
		{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
			this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderTreeRingViewsCurveEdgeIfItIsLeafInPartialNodes(
					aOneCanvasContext, this.m_vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
					bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, this.m_nMultipleSelectionHighlightMode);
		}		
	}
	var bGrayOrColorEdge = true; // "true", for color lines
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderTreeRingViewsCurveEdgeIfItIsLeafInPartialNodes(
				aOneCanvasContext, this.m_vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
				bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, this.m_nMultipleSelectionHighlightMode);
	}
	// --- Step 3. Render the Color Bar, for node color and edge color.
	this.RenderNodeColorBarAndEdgeColorBar(aOneCanvasContext);
};

// 20130619William. This function is to render the LD ring view on a canvas with partial nodes.
// In design, this view is synchronize with the "Tree Ring View", which is rendered by RenderTreeRingView4PartialNodes.
// They share the layouts, color bar, and many other information. The only difference:
// 1). Node Color is gray, no node color anymore;
// 2). Edge Color is mapped to LD information, not two-locus test; If collapsed, the edge color will become gray.
CAllNodes4RingGraph.prototype.RenderLDRingView4PartialNodes = function(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh,
		bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView)
{	// 20130620William. For the selected node, we still following tree ring view. "vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView" not changed to "...LDRingView"
	// --- Step 1. Render the ring sector of all nodes.
	// get the center point (WdhX, HghY) of all ring sector.
	var nAllRingSectorCenterWdhX = nLftMarginWdh + Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nAllRingSectorCenterHghY = nTopMarginHgh + Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderTreeRingView4ThisNodeAndChildNodesIfNeed(
				aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, this.m_vvAllNodes4RingGraph,
				bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, this.m_nMultipleSelectionHighlightMode, this.m_bTreeRingViewNodesNameTextWhetherShow, this.m_nTreeRingViewNodesNameTextFontSize);
		// 20111208William. Add the three parameters : "bDoesUserSelectOneNode", "nSelectedNodeIndexOfLevel..." and "nSelectedNodeIndexInLevel...".
		// the aim is to set the color of nodes related to the selected node.
		// 20130620William. For the rendering of node ring sector, we still following tree ring view, not changed to "...LDRingView"
	}
	// --- Step 2. Render the curve edges. 20120630. First render the gray lines, second, render the color lines.
	if (bDoesUserSelectOneNode == true)
	{
		var bGrayOrColorEdge = false; // "false", for gray lines
		for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
		{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
			this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderLDRingViewsCurveEdgeIfItIsRealLeafInPartialNodes(
					aOneCanvasContext, this.m_vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
					bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, this.m_nMultipleSelectionHighlightMode);
		}		
	}
	var bGrayOrColorEdge = true; // "true", for color lines
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderLDRingViewsCurveEdgeIfItIsRealLeafInPartialNodes(
				aOneCanvasContext, this.m_vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
				bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, this.m_nMultipleSelectionHighlightMode);
	}
};

CAllNodes4RingGraph.prototype.RenderTreeRingView4SearchNodes = function(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, sSearchInputTextBoxStringValue)
{
	// --- Step 1. Render the ring sector of all nodes.
	// get the center point (WdhX, HghY) of all ring sector.
	var nAllRingSectorCenterWdhX = nLftMarginWdh + Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nAllRingSectorCenterHghY = nTopMarginHgh + Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++) // the matching nodes will be shown with nodes color.
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderTreeRingView4ThisNodeAndChildNodes4SearchNodes(
				aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, this.m_vvAllNodes4RingGraph,
				true, this.m_nTreeRingViewNodesNameTextFontSize, sSearchInputTextBoxStringValue);
	}
	// --- Step 2. Render the curve edges. 20120630. First render the gray lines, second, render the color lines.
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++) // 20121020. All edges will become gray when user searching nodes.
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].RenderTreeRingViewsGrayCurveEdge4SearchNodes(
				aOneCanvasContext, this.m_vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY);
	}
	// --- Step 3. Render the Color Bar, for node color and edge color.
	this.RenderNodeColorBarAndEdgeColorBar(aOneCanvasContext);
};

CAllNodes4RingGraph.prototype.UpdateTreeRingView4PartialNodes4UserMouseInteract = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, nLeftOrRightButton, bDoesSelectNodeHappen, bIsItDeleteOrAddOneNode)
{	// "nMouseRelativeCoordsWdhX" and "nMouseRelativeCoordsHghY" is the coords of the mouse when button up;
	// "nLeftOrRightButton": "0" left button; "1" represents that it is the right button.
	// "this.m_nTreeRingView4PartialNodMouseRelativePosWdhX"
	// "this.m_nTreeRingView4PartialNodMouseRelativePosHghY" stores the coords of mouse when button down.
	// Two interaction function:
	// 1. User left button click on one ring sector, expand it to its child;
	// 2. User left button click on one ring sector + holding "Alt" key, callapse (hide) all its children nodes, only show this nodes;
	// 20111205William. Add the fourth parameter "bDoesSelectNodeHappen":
	// "false", user is not selecting one node.
	// "true",  user is selecting one node.
	// 20120630William. For multiple selection. "bIsItDeleteOrAddOneNode": "true", add one node; "false", delete one node.
	var nCoordsDiffWdhX = Math.abs(this.m_nTreeRingView4PartialNodMouseRelativePosWdhX - nMouseRelativeCoordsWdhX);
	var nCoordsDiffHghY = Math.abs(this.m_nTreeRingView4PartialNodMouseRelativePosHghY - nMouseRelativeCoordsHghY);
	if (nCoordsDiffWdhX < 5 && nCoordsDiffHghY < 5)
	{	// if the move during the click operation is small, then we think it is a click operation.
		// --- 1. judge which ring sector that the mouse fall in when user mouse up;
		this.JudgeWhichNodesRingSectorTheMouseFallIn(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
		// the above function will store the node information in the three variables:
		// "this.m_bIsMouseFallInAnyRingSector"  : "true", yes, we found it fall in one ring sector, whose infor is stored in the following two variables.
		// "this.m_nMouseClickOnNodeIndexOfLevel": if the above flag is true, then it stores the index of level of the selected node.
		// "this.m_nMouseClickOnNodeIndexInLevel": if the above flag is true, then it stores the index in that level of the selected node.
		// --- I am here, William. Do the corresponding operation when user click on the special node's ring sector.
		if (this.m_bIsMouseFallInAnyRingSector == true)
		{	// if one ring sector is selected, then we need to response to this operation.
			var aTheSelectedNodeRefer = this.m_vvAllNodes4RingGraph[this.m_nMouseClickOnNodeIndexOfLevel][this.m_nMouseClickOnNodeIndexInLevel];
			if (bDoesSelectNodeHappen == false)
			{	// if user is expanding or shrinking one node.
				if (nLeftOrRightButton == 0)
				{	// if user left  click on this ring sector. expand its children nodes
					aTheSelectedNodeRefer.ExpandThisSelectedNodeChildrenNodes(this.m_vvAllNodes4RingGraph);
				}
				else if (nLeftOrRightButton == 1)
				{	// if user right click on this ring sector. shrink its children nodes
					aTheSelectedNodeRefer.ShrinkThisSelectedNodeChildrenNodes(this.m_vvAllNodes4RingGraph);
				}
				// --- Step 2. Count the children nodes of each nodes under this partial nodes mode.
				this.CountTheFinestLevelChildrenNodesInThisPartialNodesMode();
				// --- Step 3. Generate the layout of the TRW for partial nodes.
				this.GenerateLayoutOfTheTreeRingView4PartialNodes();
				// --- Step 4. Generate the Edges (B-Spline Curves) for the partial nodes.
				this.GenerateCurveEdgesOfPiecewiseCubicBSpline4PartialNodes();
			}
			else
			{	// if user is selecting one node.
				if (this.m_bDoesUserSelectOneNode == false)
				{
					this.m_bDoesUserSelectOneNode = true;
					this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.push(this.m_nMouseClickOnNodeIndexOfLevel);
					this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView.push(this.m_nMouseClickOnNodeIndexInLevel);
				}
				else if (this.m_bDoesUserSelectOneNode == true)
				{
					if (bIsItDeleteOrAddOneNode == true) // add one node selected.
					{
						this.AddOneSelectedNode();
					}
					else if (bIsItDeleteOrAddOneNode == false) // delete one node selected.
					{
						this.DeleteOneSelectedNode();
						var nNumOfLeftSelectedNodes = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
						if (nNumOfLeftSelectedNodes == 0) {	this.m_bDoesUserSelectOneNode = false;	}
					}
				}
			}
			// re-render the tree ring view with partial nodes. The same processing flow as in 
			// "function RenderTreeRingViewWithInteraction()" in "RenderTreeRingViewWithInteraction.js".
			var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView]; // 5 is the sixth common canvas.
			var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
			var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
			var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
			// before re-render, you need re-draw the canvas, from the very begining.
			var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
			var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
			aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh);
			// --- Step 5. Call rendering function.
			gbDoesUserSelectOneNode = this.m_bDoesUserSelectOneNode;
			this.CopyAllSelectedNodesToGlobalVariable();
			this.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, this.m_bDoesUserSelectOneNode, this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
			// Call rendering function for LD Ring View. 20130619William.
			var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
			var nLDRingViewCanvasWdh = nTreeRingViewCanvasHgh;
			var nLDRingViewCanvasHgh = nTreeRingViewCanvasHgh;
			aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh); // It will clear the canvas.
			var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
			this.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, this.m_bDoesUserSelectOneNode, this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
			// --- Step 6. This step is to save this canvas as an image, for Dr. CHEN.
			// Save the view as an image. // 20111019William. The image size 9914X9914, then the web page crashes.
//			var aOneCanvasElement = document.getElementById("7");
//			Canvas2Image.saveAsPNG(aOneCanvasElement); // It can not save large size image.
		}
	}
};
CAllNodes4RingGraph.prototype.UpdateTreeRingView4PartialNodes4UserMouseInteract4LookUpInNCBIWebsite = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY)
{	// "nMouseRelativeCoordsWdhX" and "nMouseRelativeCoordsHghY" is the coords of the mouse when button up;
	var nCoordsDiffWdhX = Math.abs(this.m_nTreeRingView4PartialNodMouseRelativePosWdhX - nMouseRelativeCoordsWdhX);
	var nCoordsDiffHghY = Math.abs(this.m_nTreeRingView4PartialNodMouseRelativePosHghY - nMouseRelativeCoordsHghY);
	if (nCoordsDiffWdhX < 5 && nCoordsDiffHghY < 5)
	{	// if the move during the click operation is small, then we think it is a click operation.
		// --- 1. judge which ring sector that the mouse fall in when user mouse up;
		this.JudgeWhichNodesRingSectorTheMouseFallIn(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
		// the above function will store the node information in the three variables:
		// "this.m_bIsMouseFallInAnyRingSector"  : "true", yes, we found it fall in one ring sector, whose infor is stored in the following two variables.
		// "this.m_nMouseClickOnNodeIndexOfLevel": if the above flag is true, then it stores the index of level of the selected node.
		// "this.m_nMouseClickOnNodeIndexInLevel": if the above flag is true, then it stores the index in that level of the selected node.
		if (this.m_bIsMouseFallInAnyRingSector == true)
		{	// if one ring sector is selected, then we need to response to this operation.
			var aTheSelectedNodeRefer = this.m_vvAllNodes4RingGraph[this.m_nMouseClickOnNodeIndexOfLevel][this.m_nMouseClickOnNodeIndexInLevel];
			var nNodeLevel = aTheSelectedNodeRefer.GetThisNodeLevel(); // "m_nThisNodeLevel"
			var sNodeName  = aTheSelectedNodeRefer.GetThisNodeName(); // "m_sThisNodeName"
			if (nNodeLevel == 1)
			{	// If it is a gene.
				var sURLAddressInNCBI = "http://www.ncbi.nlm.nih.gov/gene?term=" + sNodeName;
				window.open(sURLAddressInNCBI);
			}
			else if (nNodeLevel == 2)
			{	// If it is a SNP
				var nNumOfChars = sNodeName.length;
				var sRSNumber = sNodeName.substr(2, nNumOfChars - 2);
				var sURLAddressInNCBI = "http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=" + sRSNumber;
				window.open(sURLAddressInNCBI);
			}
		}
	}
};
CAllNodes4RingGraph.prototype.JudgeWhichNodesRingSectorTheMouseFallIn = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY)
{	// judge the point (nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY)(Already in relative coordinates) fall in which node 
	// (this.m_nMouseClickOnNodeIndexOfLevel, this.m_nMouseClickOnNodeIndexInLevel)
	// Notes: only search for the nodes shown in the tree ring view.
	this.m_bIsMouseFallInAnyRingSector = false;
	var vaMouseFallInRingSectorInfor = new Array(3);
	// Index "0": "this.m_bIsMouseFallInAnyRingSector"
	// Index "1": "this.m_nMouseClickOnNodeIndexOfLevel"
	// Index "2": "this.m_nMouseClickOnNodeIndexInLevel"
	vaMouseFallInRingSectorInfor[0] = false; // set the default value.
	vaMouseFallInRingSectorInfor[1] = 0;
	vaMouseFallInRingSectorInfor[2] = 0;
	// --- change the coords of the mouse into polar coords system.
	var nMouseRltvCoordsToCenterWdhX = nMouseRelativeCoordsWdhX - Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nMouseRltvCoordsToCenterHghY = nMouseRelativeCoordsHghY - Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var dMousePointAngle = 0.0; // the angle  of the mouse point.
	var dMousePointRadis = 0.0; // the radius of the mouse point.
	dMousePointRadis = Math.sqrt( Math.pow(nMouseRltvCoordsToCenterWdhX, 2) + Math.pow(nMouseRltvCoordsToCenterHghY, 2) );
	if (dMousePointRadis < 0.000001)
	{	// if the radius is too small, then it indicates that it must not fall in any ring sector
		return; // return, and do nothing.
	}
	else
	{	// if the radius is larger enough (larger than 0)
		if (nMouseRltvCoordsToCenterHghY >= 0)
		{
			dMousePointAngle = Math.acos(nMouseRltvCoordsToCenterWdhX / dMousePointRadis);
		}
		else if (nMouseRltvCoordsToCenterHghY < 0)
		{
			dMousePointAngle = Math.PI * 2 - Math.acos(nMouseRltvCoordsToCenterWdhX / dMousePointRadis);
		}
	}
	// --- traverse the tree, and judge each node.
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].JudgeDoesTheMouseFallInThisNodeAndChildNodesRingSector(
				dMousePointRadis, dMousePointAngle, vaMouseFallInRingSectorInfor, this.m_vvAllNodes4RingGraph);
		// "nMouseRelativeCoordsWdhX", "nMouseRelativeCoordsHghY" is the mouse relative coords; input parameters;
		// "vaMouseFallInRingSectorInfor" is the ring sector information, which the mouse fall in; output parameters;
		var bIsMouseFallInAnyRingSector = vaMouseFallInRingSectorInfor[0];
		if (bIsMouseFallInAnyRingSector == true)
		{	// if we have found the ring sector, which the mouse falls in.
			this.m_bIsMouseFallInAnyRingSector = vaMouseFallInRingSectorInfor[0];
			this.m_nMouseClickOnNodeIndexOfLevel = vaMouseFallInRingSectorInfor[1];
			this.m_nMouseClickOnNodeIndexInLevel = vaMouseFallInRingSectorInfor[2];
			break; // break this for loop.
		}
	}
};
// ------------ 20111128William the following is for the generation of piecewise cubic B-Spline curve edge ------------
CAllNodes4RingGraph.prototype.GenerateCurveEdgesOfPiecewiseCubicBSpline4PartialNodes = function() // 20110717William. This fun is to generate the curve edge by use of piecewise cubic B-Spline.
{	// I have code the function in Matlab which can generate the cubic B-Spline, here, I transfer the code from Matlab to Javascript.
	// --- 1. first, I need to use the glocal advantage to assign the inner invisible center point used to contruct the spline curves.
	// --- 1.0 20111128William, since the total level shown in the tree ring view is not fixed. So, we need to get the number of level shown in the tree ring view.
	var nNumOfLevelShownInTreeRingViewPartialNodes = this.GetNumOfLevelShownInTreeRingViewPartialNodes();
	// --- 1.1 get the inner segment radius at each level.
	var dMostInnerNodeCircleRadius = 0.0; // this is the most inner node's inner circle's radius.
	dMostInnerNodeCircleRadius = this.GetTheInnerPointRadisOfMostInnerNode4PartialNodes(nNumOfLevelShownInTreeRingViewPartialNodes);
	var vInnerInvisibleNodesRadius = new Array(); // this vector is to store the inner invisible nodes radius. The number of its elements is the level of the outer(natural) nodes.
	var dInnerNodeDecreaseStepValue = 0.0; // if we have 4 level, "nNumOfNodesLevel" will be equal to 4.
	dInnerNodeDecreaseStepValue = dMostInnerNodeCircleRadius / (nNumOfLevelShownInTreeRingViewPartialNodes + 1); // if we have 4 level, we need to add 3 level inner point. Then the segments of the inner raius "dMostInnerNodeCircleRadius" is 4.
	for (var nIdxOfInnerNodeRaiusVec = 0; nIdxOfInnerNodeRaiusVec < nNumOfLevelShownInTreeRingViewPartialNodes; nIdxOfInnerNodeRaiusVec++)
	{
		var dOneInnerNodeRadiusValue = dMostInnerNodeCircleRadius - dInnerNodeDecreaseStepValue * (nIdxOfInnerNodeRaiusVec + 1);
		vInnerInvisibleNodesRadius.splice(0, 0, dOneInnerNodeRadiusValue); // the element's index in this vector correspond to the level index in the "m_vvAllNodes4RingGraph", the total all nodes data set.
	}	// the above "splice" fun, and the parameter configure, will insert the value "dOneInnerNodeRadiusValue" to the begin of the vector.
	// --- 1.2 set each node's the inner point value, and then traverse the tree to get the points sequence to contruct the B-Spline curves.
	var aTmpNodeRefer = new COneNode4RingGraph();
	for (var nIdxLvl = 0; nIdxLvl < nNumOfLevelShownInTreeRingViewPartialNodes; nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			aTmpNodeRefer.ConstructThePointsSequenceAndTheBSplineCurve(this, vInnerInvisibleNodesRadius, this.m_dTreeRingViewBundleStrength); // add the inner points to a set, and the point will form the path, link two leaf nodes. You must traverse the hierarchical tree to find the path.
			// 20130620Willaim. The above function has no use for Tree Ring View and LD Ring View, but you can't delete it. Because the Matrix View will not work if you remove this function.
			var bIsThisNodeShown = aTmpNodeRefer.GetThisNodeShownOrNotInThisPartialNodesMode();
			if (bIsThisNodeShown == true)
			{
				aTmpNodeRefer.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodes(this, vInnerInvisibleNodesRadius, this.m_dTreeRingViewBundleStrength);
				// add the inner points to a set, and the point will form the path, link two leaf nodes. You must traverse the hierarchical tree to find the path.
				aTmpNodeRefer.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodes4LDEdges(this, vInnerInvisibleNodesRadius, this.m_dTreeRingViewBundleStrength); // 20130620William.
			} else {
				aTmpNodeRefer.ClearAllTempVariables(this.m_vvAllNodes4RingGraph); // 20130621William.
			}
		}
	}
};

CAllNodes4RingGraph.prototype.GetNumOfLevelShownInTreeRingViewPartialNodes = function()
{	// get the number of level of the nodes shown in the tree ring view with partial nodes.
	var nNumOfLevelShownInTreeRingViewPartialNodes = 0;
	var nNumOfNodesLevel = this.m_vvAllNodes4RingGraph.length;
	var bIsAnyNodeInOneLevel = false;  // the flag of whether any node shown in this level.
	var bIsAnyNodeInNextLevel = false; // the flag of whether any node shown in next level.
	for (var nIdxOfLvl = 0; nIdxOfLvl < nNumOfNodesLevel; nIdxOfLvl++)
	{	// for each level
		bIsAnyNodeInOneLevel = false;
		bIsAnyNodeInNextLevel = false;
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxOfLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{	// for each node in the level
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxOfLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			var bIsThisNodeShown = aTmpNodeRefer.GetThisNodeShownOrNotInThisPartialNodesMode();
			var bIsAnyChildNodesShown = aTmpNodeRefer.GetIsAtLeastOneChildShownInPartialNodes();
			if (bIsThisNodeShown == true)
			{
				bIsAnyNodeInOneLevel = true;
			}
			if (bIsAnyChildNodesShown == true)
			{
				bIsAnyNodeInNextLevel = true;
			}
			if (bIsAnyNodeInOneLevel == true && bIsAnyNodeInNextLevel == true)
			{	// if we already find that there is at least one node shown in this level, as well as in next level, we can break this for loop.
				break;
			}
		}
		// judge the number of level shown in the tree ring view.
		if (bIsAnyNodeInOneLevel == true && bIsAnyNodeInNextLevel == false)
		{
			nNumOfLevelShownInTreeRingViewPartialNodes = nIdxOfLvl + 1; // we must plus one, so if the level index is 0, the number of levels is 1.
			break;
		}
	}
	return nNumOfLevelShownInTreeRingViewPartialNodes;
};

CAllNodes4RingGraph.prototype.GetTheInnerPointRadisOfMostInnerNode4PartialNodes = function(nNumOfLevelShownInTreeRingViewPartialNodes)
{	// get the number of level of the nodes shown in the tree ring view with partial nodes.
	var dMostInnerNodeCircleRadius = 0.0;
	var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nNumOfLevelShownInTreeRingViewPartialNodes - 1].length;
	for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
	{	// for each node in the level
		aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nNumOfLevelShownInTreeRingViewPartialNodes - 1][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
		var bIsThisNodeShown = aTmpNodeRefer.GetThisNodeShownOrNotInThisPartialNodesMode();
		if (bIsThisNodeShown == true)
		{
			dMostInnerNodeCircleRadius = aTmpNodeRefer.GetThisNodeInnerPointRadis4PartialNodes();
			break;
		}
	}
	return dMostInnerNodeCircleRadius;
};

// ------ function to find the path from one node A to another node B (A define B or somthing like this in partial nodes) in the hierarchial tree in the tree ring view with partial nodes.
// var bIsThisOneNew = aAllNodes4RingGraph.GetThePathFromOneNodeToAnotherInHierTree4PartialNodes(
//		nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode,
//		nIndexOfLevelOfNodeWhichDefineThisNode, nIndexInLevelOfNodeWhichDefineThisNode,
//		vnDefinedByOtherNodesIndexOfLevel4PartialNodes, vnDefinedByOtherNodesIndexInLevel4PartialNodes,
//		vnDefinedByOtherNodesNumOfDefRltn4PartialNodes,
//		vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInLevel);
CAllNodes4RingGraph.prototype.GetThePathFromOneNodeToAnotherInHierTree4PartialNodes = function(
		nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode,
		nIndexOfLevelOfNodeWhichDefineThisNode, nIndexInLevelOfNodeWhichDefineThisNode,
		vnDefinedByOtherNodesIndexOfLevel4PartialNodes, vnDefinedByOtherNodesIndexInLevel4PartialNodes,
		vnDefinedByOtherNodesNumOfDefRltn4PartialNodes,
		vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInLevel,
		vnIndexOfDuplicateExistingEdge)
{	// for example, there is one tree:
	//         A               B           --- root node.
	//     /      \        /      \
	//    A1      A2      B1      B2       --- "leaf" node in tree ring view with partial nodes.
	//   / \     / \     / \     / \
	// A11 A12 A21 A22 B11 B12 B21 B22     --- real leaf node in the hierarchical tree.
	// if input source node index (nIndexOfLevelOfSourceNode = 1, nIndexInLevelOfSourceNode = 0) A1 in the above tree.
	// and input the defining node (nIndexOfLevelOfNodeWhichDefineThisNode = 2, nIndexInLevelOfNodeWhichDefineThisNode = 5) B12 in the above tree.
	// e.g. B12 node defined A1 node's one child node, for example A12.
	// But if only B1 is shown in the partial nodes, B21 is not shown in the partial nodes tree ring view.
	// we need to find the path (A1, A, B, B1) through this function. This is the function of this function.
	// The information of node B1 is stored in (vnDefinedByOtherNodesIndexOfLevel4PartialNodes = 1, vnDefinedByOtherNodesIndexInLevel4PartialNodes = 2)
	// if B1 is the first time appear in the set of node which defines this node A1, then we add a new element to the following variables:
	// "vnDefinedByOtherNodesIndexOfLevel4PartialNodes", "vnDefinedByOtherNodesIndexInLevel4PartialNodes"
	// "vnDefinedByOtherNodesNumOfDefRltn4PartialNodes" (set to 1, indicates there are one definition relationship)
	// and, generate the nodes sequence (node path) in the variables.
	// if B1 is not the first time apears, then we return false, and add the correspongding elements (last time appears) with 1, in variable:
	// "vnDefinedByOtherNodesNumOfDefRltn4PartialNodes"
	// Notes:
	// Node A1  (nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode) is shown in the view with partial nodes, it maybe a real leaf node, or it maybe not a real leaf node. But it must be a "leaf" node in the view with partial nodes.
	// Node B12 (nIndexOfLevelOfNodeWhichDefineThisNode, nIndexInLevelOfNodeWhichDefineThisNode) may be shown in the view with partial nodes, maybe not. It must be real leaf node.
	var bIsThisOneNew = true; // "true": it is a new node; "false": it is a old node(it already exists in the set).
	var aEndNodeReferNotSureShown = this.m_vvAllNodes4RingGraph[nIndexOfLevelOfNodeWhichDefineThisNode][nIndexInLevelOfNodeWhichDefineThisNode]; // B12 Node
	var nIndexOfLevelOfBgnNode = nIndexOfLevelOfSourceNode; // the index of level of the bgn node (node A1.)
	var nIndexInLevelOfBgnNode = nIndexInLevelOfSourceNode;	// the index in level of the bgn node (node A1.)
	var nIndexOfLevelOfEndNode = 0; // the index of level of the end node (node shown in view with partial nodes, and it's ancestor of Node B12.)
	var nIndexInLevelOfEndNode = 0; // the index in level of the end node (node shown in view with partial nodes, and it's ancestor of Node B12.)
	// --- Step 1. find the the nearest ancestor node of Node B12, the requirement is this ancestor node is shown in the tree ring view with partial nodes.
	var bIsThisNodeShown = aEndNodeReferNotSureShown.GetThisNodeShownOrNotInThisPartialNodesMode();
	if (bIsThisNodeShown == true)
	{	// if this node is shown, this is good.
		nIndexOfLevelOfEndNode = nIndexOfLevelOfNodeWhichDefineThisNode;
		nIndexInLevelOfEndNode = nIndexInLevelOfNodeWhichDefineThisNode;
	}
	else
	{	// this node is not shown, so we need to find its father node shown in the view.
		var nIdxInLevelOfOneChildNode = nIndexInLevelOfNodeWhichDefineThisNode;
		// we assume that "nIndexOfLevelOfNodeWhichDefineThisNode >= 1".
		for (var nIdxOfLvl = (nIndexOfLevelOfNodeWhichDefineThisNode - 1); nIdxOfLvl >= 0; nIdxOfLvl--)
		{	// for each level, begin at the nearest level of Node B12. For example, if B12 Node is in level 3, then we begin the search from level 2, then level 1, then level 0. Once we find its ancestor, we break.
			var aTheChildnNodeReference = this.m_vvAllNodes4RingGraph[nIdxOfLvl + 1][nIdxInLevelOfOneChildNode];
			var nIdxInLevelOfFatherNode = aTheChildnNodeReference.GetThisNodeFatherNodesIndexInLevel();
			var aTheFatherNodeReference = this.m_vvAllNodes4RingGraph[nIdxOfLvl][nIdxInLevelOfFatherNode];
			var bIsThisFatherNodeShown = aTheFatherNodeReference.GetThisNodeShownOrNotInThisPartialNodesMode();
			if (bIsThisFatherNodeShown == true)
			{	// if this father node is shown in the tree ring view with partial nodes.
				nIndexOfLevelOfEndNode = nIdxOfLvl;
				nIndexInLevelOfEndNode = nIdxInLevelOfFatherNode;
				break; // 20111130William. Once we find the nearest ancestor node shown in the view with partial nodes. break. Do not search for its ancestor nodes further.
			}
			else
			{
				nIdxInLevelOfOneChildNode = nIdxInLevelOfFatherNode;
			}
		}
	}
	// finally, we get the end node ( 1. shown in the view with partial nodes; 2. is the ancestor of the input end node B12.)
	// this node 's information is stored in the following two variables:
	// "nIndexOfLevelOfEndNode" and "nIndexInLevelOfEndNode"
	// --- Step 2. judge that whether this node B1 already exists in the set of nodes, which defines Node A1, the source node.
	if (nIndexOfLevelOfBgnNode == nIndexOfLevelOfEndNode && nIndexInLevelOfBgnNode == nIndexInLevelOfEndNode)
	{	// if the begin node and the end node is the same, ignore them. This indicates that the definition relationship is within the same father node A1, and all the children nodes is not shown in this view.
		// You can count this if condition, then you can get how many definition relationship occurs among the child nodes of this father node. But right now, there is no need to do this work.
		bIsThisOneNew = false;
		vnIndexOfDuplicateExistingEdge[0] = -1;
	}
	else
	{	// the begin and end node are not same, so we can judge whether the end node already exist in the list.
		var nLenOfDefByNodeList = vnDefinedByOtherNodesIndexOfLevel4PartialNodes.length;
		for (var nIdxOfDefByNode = 0; nIdxOfDefByNode < nLenOfDefByNodeList; nIdxOfDefByNode++)
		{	// for each node exist in the node list which defines node A1' any child node.
			var nIndexOfLevelOfExistNode = vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOfDefByNode];
			var nIndexInLevelOfExistNode = vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOfDefByNode];
			if (nIndexOfLevelOfExistNode == nIndexOfLevelOfEndNode && nIndexInLevelOfExistNode == nIndexInLevelOfEndNode)
			{	// if the testing node already exist in the def by node list. Just increase the count array. then return.
				bIsThisOneNew = false;
				vnIndexOfDuplicateExistingEdge[0] = nIdxOfDefByNode;
				vnDefinedByOtherNodesNumOfDefRltn4PartialNodes[nIdxOfDefByNode]++;
				break;
			}
		}
		if (bIsThisOneNew == true)
		{	// if this variable is still "true", it indicates that we did not find the node in the def by node list. It is new.
			// --- Step 3. Find the path of Node A1, and the ancestor node B1 of real leaf node B12.
			vnDefinedByOtherNodesIndexOfLevel4PartialNodes.push(nIndexOfLevelOfEndNode);
			vnDefinedByOtherNodesIndexInLevel4PartialNodes.push(nIndexInLevelOfEndNode);
			vnDefinedByOtherNodesNumOfDefRltn4PartialNodes.push(1); // the number of tatal definition between these two nodes are 1.
			// bIsThisOneNew = true;
			// The last task of this function is to find the path linking the two nodes:
			// Bgn Node A1 (nIndexOfLevelOfBgnNode, nIndexInLevelOfBgnNode)
			// End Node B1 (nIndexOfLevelOfEndNode, nIndexInLevelOfEndNode)
			// Store the path in the following variables, they are also the return arrays:
			// "vThePathsNodesListLinkTwoLeafNodeIndexOfLevel",
			// "vThePathsNodesListLinkTwoLeafNodeIndexInLevel".
			this.GetThePathOfNodesLinkingBgnAndEndNode(nIndexOfLevelOfBgnNode, nIndexInLevelOfBgnNode,
					nIndexOfLevelOfEndNode, nIndexInLevelOfEndNode,
					vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInLevel);
		}
	}
	// then you can return.
	return bIsThisOneNew;
};

CAllNodes4RingGraph.prototype.AssignFatherNodeIndexInLevelToEachNode = function()
{	// 20111130William. Assign the index in level of father node to each node.
	var nNumInRootLvl = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxInLvl = 0; nIdxInLvl < nNumInRootLvl; nIdxInLvl++)
	{	// for each root node.
		var aOneNodeReference = this.m_vvAllNodes4RingGraph[0][nIdxInLvl];
		aOneNodeReference.AssignFatherNodeIndexInLevelToThisNodeAndChildNode(0, this.m_vvAllNodes4RingGraph); // call this recursive function to assign the Index of Level of father node.
	}
};

CAllNodes4RingGraph.prototype.GetThePathOfNodesLinkingBgnAndEndNode = function(
		nIndexOfLevelOfBgnNode, nIndexInLevelOfBgnNode,
		nIndexOfLevelOfEndNode, nIndexInLevelOfEndNode,
		vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInLevel)
{	// The last task of this function is to find the path linking the two nodes:
	// Bgn Node A1 (nIndexOfLevelOfBgnNode, nIndexInLevelOfBgnNode)
	// End Node B1 (nIndexOfLevelOfEndNode, nIndexInLevelOfEndNode)
	// Store the path in the following variables, they are also the return arrays:
	// "vThePathsNodesListLinkTwoLeafNodeIndexOfLevel",
	// "vThePathsNodesListLinkTwoLeafNodeIndexInLevel".
	// 20111130William. The idea is to get the father node list, Since it is very easy to get the gather node's list.
	var vnIndexInLevelOfAncestorNode4BgnNode = new Array(); // it will store index in level of Node [A A1];
	var vnIndexInLevelOfAncestorNode4EndNode = new Array(); // it will store index in level of Node [B B1];
	// --- Step 1.1 add the bgn node itself to the array;
	vnIndexInLevelOfAncestorNode4BgnNode.push(nIndexInLevelOfBgnNode);
	// --- Step 1.2 if it is not the root node, add all of its ancestor node.
	if (nIndexOfLevelOfBgnNode > 0)
	{	// the bgn node is not the root node.
		var nIdxInLevelOfOneChildNode = nIndexInLevelOfBgnNode;
		for (var nIdxOfLvl = (nIndexOfLevelOfBgnNode - 1); nIdxOfLvl >= 0; nIdxOfLvl--)
		{
			var aTheChildnNodeReference = this.m_vvAllNodes4RingGraph[nIdxOfLvl + 1][nIdxInLevelOfOneChildNode];
			var nIdxInLevelOfFatherNode = aTheChildnNodeReference.GetThisNodeFatherNodesIndexInLevel();
			vnIndexInLevelOfAncestorNode4BgnNode.splice(0, 0, nIdxInLevelOfFatherNode);
			nIdxInLevelOfOneChildNode = nIdxInLevelOfFatherNode;
		}
	}
	// --- Step 2.1 add the end node itself to the array
	vnIndexInLevelOfAncestorNode4EndNode.push(nIndexInLevelOfEndNode);
	// --- Step 2.2 if it is not the root node, add all of its ancestor node.
	if (nIndexOfLevelOfEndNode > 0)
	{	// the end node is not the root node.
		var nIdxInLevelOfOneChildNode = nIndexInLevelOfEndNode;
		for (var nIdxOfLvl = (nIndexOfLevelOfEndNode - 1); nIdxOfLvl >= 0; nIdxOfLvl--)
		{
			var aTheChildnNodeReference = this.m_vvAllNodes4RingGraph[nIdxOfLvl + 1][nIdxInLevelOfOneChildNode];
			var nIdxInLevelOfFatherNode = aTheChildnNodeReference.GetThisNodeFatherNodesIndexInLevel();
			vnIndexInLevelOfAncestorNode4EndNode.splice(0, 0, nIdxInLevelOfFatherNode);
			nIdxInLevelOfOneChildNode = nIdxInLevelOfFatherNode;
		}
	}
	// --- Step 3. compare the two array, and then get the path, store and return it.
	var nNumOfNodeInAncestorListOfBgnNode = vnIndexInLevelOfAncestorNode4BgnNode.length;
	var nNumOfNodeInAncestorListOfEndNode = vnIndexInLevelOfAncestorNode4EndNode.length;
	var nMaxCommonNumOfLevel = nNumOfNodeInAncestorListOfBgnNode;
	if (nMaxCommonNumOfLevel > nNumOfNodeInAncestorListOfEndNode)
	{	// nMaxCommonNumOfLevel is the minimum value of the two variables "nNumOfNodeInAncestorListOfBgnNode" and "nNumOfNodeInAncestorListOfEndNode".
		nMaxCommonNumOfLevel = nNumOfNodeInAncestorListOfEndNode;
	}
	var bIsThereSameBetweenBgnAndEnd = false;
	var nIdxOfLevelSameBwteenBgnAndEnd = 0;
	for (var nIdxOfLevel = 0; nIdxOfLevel < nMaxCommonNumOfLevel; nIdxOfLevel++)
	{
		var nOneIndexInLevel4BgnNode = vnIndexInLevelOfAncestorNode4BgnNode[nIdxOfLevel];
		var nOneIndexInLevel4EndNode = vnIndexInLevelOfAncestorNode4EndNode[nIdxOfLevel];
		if (nOneIndexInLevel4BgnNode == nOneIndexInLevel4EndNode)
		{
			bIsThereSameBetweenBgnAndEnd = true;
			nIdxOfLevelSameBwteenBgnAndEnd = nIdxOfLevel;
		}
		else
		{
			break;
		}
	}
	if (bIsThereSameBetweenBgnAndEnd == true)
	{	// if there are some common ancestor node between bgn and end node
		// push the node in path of bgn node.
		for (var IdxOfLvl = (nNumOfNodeInAncestorListOfBgnNode - 1); IdxOfLvl >= nIdxOfLevelSameBwteenBgnAndEnd; IdxOfLvl--)
		{
			var nIdxInLvlOfOneNodeInPath = vnIndexInLevelOfAncestorNode4BgnNode[IdxOfLvl];
			var nIdxOfLvlOfOneNodeInPath = IdxOfLvl;
			vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.push(nIdxOfLvlOfOneNodeInPath);
			vThePathsNodesListLinkTwoLeafNodeIndexInLevel.push(nIdxInLvlOfOneNodeInPath);
		}
		// push the node in path of end node.
		for (var IdxOfLvl = (nIdxOfLevelSameBwteenBgnAndEnd + 1); IdxOfLvl < nNumOfNodeInAncestorListOfEndNode; IdxOfLvl++)
		{
			var nIdxInLvlOfOneNodeInPath = vnIndexInLevelOfAncestorNode4EndNode[IdxOfLvl];
			var nIdxOfLvlOfOneNodeInPath = IdxOfLvl;
			vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.push(nIdxOfLvlOfOneNodeInPath);
			vThePathsNodesListLinkTwoLeafNodeIndexInLevel.push(nIdxInLvlOfOneNodeInPath);
		}	
	}
	else
	{	// there is no common ancestor node between bgn and end node.
		// push the node in path of bgn node.
		for (var IdxOfLvl = (nNumOfNodeInAncestorListOfBgnNode - 1); IdxOfLvl >= 0; IdxOfLvl--)
		{
			var nIdxInLvlOfOneNodeInPath = vnIndexInLevelOfAncestorNode4BgnNode[IdxOfLvl];
			var nIdxOfLvlOfOneNodeInPath = IdxOfLvl;
			vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.push(nIdxOfLvlOfOneNodeInPath);
			vThePathsNodesListLinkTwoLeafNodeIndexInLevel.push(nIdxInLvlOfOneNodeInPath);
		}
		// push the node in path of end node.
		for (var IdxOfLvl = 0; IdxOfLvl < nNumOfNodeInAncestorListOfEndNode; IdxOfLvl++)
		{
			var nIdxInLvlOfOneNodeInPath = vnIndexInLevelOfAncestorNode4EndNode[IdxOfLvl];
			var nIdxOfLvlOfOneNodeInPath = IdxOfLvl;
			vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.push(nIdxOfLvlOfOneNodeInPath);
			vThePathsNodesListLinkTwoLeafNodeIndexInLevel.push(nIdxInLvlOfOneNodeInPath);
		}
	}
};

CAllNodes4RingGraph.prototype.MapSingleLocusTestValueToNodeColors = function()
{	// 20120628William. Map single locus test value to node colors
	var aTmpNodeRefer = new COneNode4RingGraph();
	var dHueRangeBgn = gdHueRangeBgn4NodeColorBar;
	var dHueRangeEnd = gdHueRangeEnd4NodeColorBar;
	// --- 1 first, use BFS search to traverse the graph, and set the leaf node's color.
	for (var nIdxLvl = 0; nIdxLvl < this.m_nMaxlevelInAllLeafNodesParamRealName; nIdxLvl++)
	{
		var nOneLevelNodesNum = this.m_vvAllNodes4RingGraph[nIdxLvl].length;
		for (var nIdxOfOneLevelNodes = 0; nIdxOfOneLevelNodes < nOneLevelNodesNum; nIdxOfOneLevelNodes++)
		{
			aTmpNodeRefer = this.m_vvAllNodes4RingGraph[nIdxLvl][nIdxOfOneLevelNodes]; // "COneNode4RingGraph & aTmpNodeRefer"
			var dSingleLocusTestValue = aTmpNodeRefer.GetSingleLocusTestValueScaled();
			var vdRGBColorValue = new Array(3);
			if (gnIndexOfColorScheme4NodesColor == 12)
			{ // "12" continuous red to green color bar.
				this.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dSingleLocusTestValue, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
			}
			else
			{ // "0~11" discrete color bar from ColorBrewer.
				this.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dSingleLocusTestValue, gnIndexOfColorScheme4NodesColor);
			}
			aTmpNodeRefer.SetSingleLocusTestValueScaledMapNodeColor(vdRGBColorValue);
		}
	}
	// --- 2 Second, use DFS search to traverse the graph, and set the leaf node's color.
	var nNumOfRootNodes = 0;
	nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{
		aTmpNodeRefer = this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode];
		aTmpNodeRefer.GetTheLargestSingleTestValueAmongChildrenNodesAndSetNodeColor(aAllNodes4RingGraph, this.m_vvAllNodes4RingGraph);
	}
};

CAllNodes4RingGraph.prototype.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange = function(vdRgbValue, dOneTestValue, dMinTestValue, dMaxTestValue, dHueRangeBgn, dHueRangeEnd, bClockwiseOrCounterClockwise, dSatutation, dIntensity)
{	// this function comes from "COneEdge4RingGraph.prototype.GetRGBColorValueFromHSVColorSpaceUsingIndexAndHueRange".
	// the output param: "vdRgbValue", is a vector with 3 elements, R G B value respectively;
	// the input param 1: "dOneTestValue", is one statistics test value, we map range of the vector [dMinTestValue dMaxTestValue] to the hue value [dHueRangeBgn dHueRangeEnd] linearly. For each value "dOneTestValue" in the vector, we get the corresponding R G B value.
	// the input param 2 and 3: "dMinTestValue = 0.0", "dMaxTestValue = 1.0" is the range of a linear number, for example [0.0 1.0], and "dOneTestValue" maybe from 0.0 to 1.0, each value will call this function one time.
	// the input param 4 and 5: "dHueRangeBgn" and "dHueRangeEnd" is the begin and end of the hue value in the HSV color space. It can control the color range.
	if (bClockwiseOrCounterClockwise == false){} // Counter Clockwise, do nothing.
	else if (bClockwiseOrCounterClockwise == true){dOneTestValue = dMinTestValue + dMaxTestValue - dOneTestValue;} // Clockwise, reverse.
	
	var dInstensityValue = dIntensity; // 0.5 // if you set it be larger than 0.333... then, the R G B value will exceed 1.0.
	var dSaturatnValue = dSatutation;
	var dHueValue = (dHueRangeEnd - dHueRangeBgn) * (dOneTestValue - dMinTestValue) / (dMaxTestValue - dMinTestValue) + dHueRangeBgn; // 20110719William, I am not sure about the division with integer number.
	var dRgbValueR = 0.0;
	var dRgbValueG = 0.0;
	var dRgbValueB = 0.0;
	
	// RG sector (0 <= H < 2*PI/3)
	if (dHueValue >= 0 && dHueValue < (2 * 3.1415926 / 3))
	{
		dRgbValueB = dInstensityValue * (1 - dSaturatnValue);
        dRgbValueR = dInstensityValue * (1 + dSaturatnValue * Math.cos(dHueValue)/(Math.cos(3.1415926 / 3 - dHueValue)));
        dRgbValueG = 3 * dInstensityValue - (dRgbValueR + dRgbValueB);
	}
	// BG sector (2*pi/3 <= H < 4*pi/3).
    else if (dHueValue >= (2 * 3.1415926 / 3) && dHueValue < (4 * 3.1415926 / 3))
    {
        dRgbValueR = dInstensityValue * (1 - dSaturatnValue);
        dRgbValueG = dInstensityValue * (1 + dSaturatnValue * Math.cos(dHueValue - (2 * 3.1415926 / 3))/(Math.cos(3.1415926 - dHueValue)));
        dRgbValueB = 3 * dInstensityValue - (dRgbValueR + dRgbValueG);
    }
    // BR sector (4*pi/3 <= H < 2*pi).
    else // if (dHueValue >= (4 * 3.1415926 / 3) && dHueValue < (2 * 3.1415926))
    {
        dRgbValueG = dInstensityValue * (1 - dSaturatnValue);
        dRgbValueB = dInstensityValue * (1 + dSaturatnValue * Math.cos(dHueValue - (4 * 3.1415926 / 3))/(Math.cos(5 * 3.1415926 / 3 - dHueValue)));
        dRgbValueR = 3 * dInstensityValue - (dRgbValueG + dRgbValueB);
    }
    
    // return the value
    vdRgbValue[0] = dRgbValueR;
    vdRgbValue[1] = dRgbValueG;
    vdRgbValue[2] = dRgbValueB;
};
CAllNodes4RingGraph.prototype.GetRGBColorValueFromColorBrewer = function(vdRGBColorValue, dOneValue, nIndexOfColorScheme4NodesOrEdgesColor)
{
	if (isNaN(dOneValue) == true){
		vdRGBColorValue[0] = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor][0][0] / 255;
		vdRGBColorValue[1] = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor][0][1] / 255;
		vdRGBColorValue[2] = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor][0][2] / 255; return;
	}
	if (nIndexOfColorScheme4NodesOrEdgesColor >= 5 && nIndexOfColorScheme4NodesOrEdgesColor <= 12){	dOneValue = 1.0 - dOneValue;	} // Reverse the color bar
	var nNumOfColors = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor].length;
	var nIdxOfThisValue = Math.floor(dOneValue * nNumOfColors);
	if (nIdxOfThisValue == nNumOfColors){nIdxOfThisValue = nNumOfColors - 1;}
	vdRGBColorValue[0] = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor][nIdxOfThisValue][0] / 255;
	vdRGBColorValue[1] = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor][nIdxOfThisValue][1] / 255;
	vdRGBColorValue[2] = gvvnColorBrewer[nIndexOfColorScheme4NodesOrEdgesColor][nIdxOfThisValue][2] / 255;
};
CAllNodes4RingGraph.prototype.GenerateNodeColorBarAndEdgeColorBarsColorData = function()
{	// Generate the color data: "this.m_vsColorBar4NodeColor" and "this.m_vsColorBar4EdgeColor".
	// --- 1. Node Color Bar
	this.m_vsColorBar4NodeColor = []; // 20120713 Clear the nodes color bar variable.
	var dHueRangeBgn = gdHueRangeBgn4NodeColorBar; // begin from cyan
	var dHueRangeEnd = gdHueRangeEnd4NodeColorBar; // end with purple.
	for(var nIdx = 0; nIdx < this.m_nColorBarWidth; nIdx++)
	{
		var dOneValue = nIdx / (this.m_nColorBarWidth - 1);
		var vdRGBColorValue = new Array(3);
		if (gnIndexOfColorScheme4NodesColor == 12)
		{ // "12" continuous red to green color bar.
			this.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dOneValue, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
		}
		else
		{ // "0~11" discrete color bar from ColorBrewer.
			this.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dOneValue, gnIndexOfColorScheme4NodesColor);
		}
		var dColorR = vdRGBColorValue[0];
		var dColorG = vdRGBColorValue[1];
		var dColorB = vdRGBColorValue[2];
		var nColorR = Math.round(dColorR * 255);
		var nColorG = Math.round(dColorG * 255);
		var nColorB = Math.round(dColorB * 255);
		var sColorRGB = "rgb(" + nColorR + "," + nColorG + "," + nColorB + ")";
		this.m_vsColorBar4NodeColor.push(sColorRGB);
	}
	// --- 2. Edge Color Bar
	this.m_vsColorBar4EdgeColor = []; // 20120713 Clear the edges color bar variable.
	var dHueRangeBgn = gdHueRangeBgn4EdgeColorBar; // begin from red
	var dHueRangeEnd = gdHueRangeEnd4EdgeColorBar; // end with green.
	for(var nIdx = 0; nIdx < this.m_nColorBarWidth; nIdx++)
	{
		var dOneValue = nIdx / (this.m_nColorBarWidth - 1);
		var vdRGBColorValue = new Array(3);
		if (gnIndexOfColorScheme4EdgesColor == 12)
		{ // "12" continuous red to green color bar.
			this.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dOneValue, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
		}
		else
		{ // "0~11" discrete color bar from ColorBrewer.
			this.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dOneValue, gnIndexOfColorScheme4EdgesColor);
		}
		var dColorR = vdRGBColorValue[0];
		var dColorG = vdRGBColorValue[1];
		var dColorB = vdRGBColorValue[2];
		var nColorR = Math.round(dColorR * 255);
		var nColorG = Math.round(dColorG * 255);
		var nColorB = Math.round(dColorB * 255);
		var sColorRGB = "rgb(" + nColorR + "," + nColorG + "," + nColorB + ")";
		this.m_vsColorBar4EdgeColor.push(sColorRGB);
	}
};

CAllNodes4RingGraph.prototype.RenderNodeColorBarAndEdgeColorBar = function(aCanvasContext)
{	// Render the color bars, the color is already stored in variables "this.m_vsColorBar4NodeColor" and "this.m_vsColorBar4EdgeColor".
	var nFontSizeNormal = 16;
	var nFontSizeSmall = 16;
	var nVerticalPosOffsetY = 20 + 48;
	// --- 1. Render Node Color Bar
	var nTopLftPtX = this.m_nCanvasWidth - 280;
	var nTopLftPtY = 176 + 48;
	for(var nIdx = 0; nIdx < this.m_nColorBarWidth; nIdx++)
	{
		var sColorRGB = this.m_vsColorBar4NodeColor[nIdx];
		aCanvasContext.fillStyle = sColorRGB;
		aCanvasContext.fillRect(nTopLftPtX + nIdx, nTopLftPtY, 1, this.m_nColorBarHeigh);
	}
	// --- 3 Add the Color Bar title. The Label.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = nTopLftPtX + 10;
	var nOneLabelBasePtHghY = nTopLftPtY - 2;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Node Color Bar", 0, 0);
	aCanvasContext.restore();
	// --- 2. Render Edge Color Bar
	var nTopLftPtY = 220 + 48;
	for(var nIdx = 0; nIdx < this.m_nColorBarWidth; nIdx++)
	{
		var sColorRGB = this.m_vsColorBar4EdgeColor[nIdx];
		aCanvasContext.fillStyle = sColorRGB;
		aCanvasContext.fillRect(nTopLftPtX + nIdx, nTopLftPtY, 1, this.m_nColorBarHeigh);
	}
	// --- 3 Add the Color Bar title. The Label.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = nTopLftPtX + 10;
	var nOneLabelBasePtHghY = nTopLftPtY - 2;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Edge Color Bar", 0, 0);
	aCanvasContext.restore();
	// The "min" label.
	aCanvasContext.font = nFontSizeSmall + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = nTopLftPtX;
	var nOneLabelBasePtHghY = nTopLftPtY + 34;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("min", 0, 0);
	aCanvasContext.restore();
	// The "max" label.
	aCanvasContext.font = nFontSizeSmall + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nColorBarWidth + nTopLftPtX;
	var nOneLabelBasePtHghY = nTopLftPtY + 34;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "right";
	aCanvasContext.fillText("max", 0, 0);
	aCanvasContext.restore();
	// --- 4 Add the title for slider of bundle strength
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = Math.round(this.m_nCanvasWidth - 30 - Math.round(250 / 2));
	var nOneLabelBasePtHghY = 264 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "center";
	aCanvasContext.fillText("Edge Number", 0, 0);
	aCanvasContext.restore();
	// --- 5 Add the title for the slider of number of nodes shown.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = Math.round(this.m_nCanvasWidth - 30 - Math.round(250 / 2));
	var nOneLabelBasePtHghY = 304 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "center";
	aCanvasContext.fillText("Edge Bundle", 0, 0);
	aCanvasContext.restore();
	// --- 6 Add the title for the radio.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 190;
	var nOneLabelBasePtHghY = 392 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Any", 0, 0);
	aCanvasContext.restore();
	// --- 7 Add the title for the radio.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 140;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("All", 0, 0);
	aCanvasContext.restore();
	// --- 8 Add the title for the radio.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Highlight:", 0, 0);
	aCanvasContext.restore();
	// --- 9 Add the title for choose file 1: SNPs Name File.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 22;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Nodes File:", 0, 0);
	aCanvasContext.restore();
	// --- 10 Add the title for choose file 2: SNPs Pair File.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 70;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Edges File:", 0, 0);
	aCanvasContext.restore();
	// --- 10.1 Add the title for choose file 3: SNPs Pair LD File.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 276;
	var nOneLabelBasePtHghY = 70 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("LD Edges File:", 0, 0);
	aCanvasContext.restore();
	// --- 11 Add the label for the checkbox of whether or not show nodes name text.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 260;
	var nOneLabelBasePtHghY = 368 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Node Name", 0, 0);
	aCanvasContext.restore();
	// --- 11.2 Add the label for the checkbox of whether or not show nodes name text.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "top"; // "top"
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 150;
	var nOneLabelBasePtHghY = 368 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Black Background", 0, 0);
	aCanvasContext.restore();
	// --- 12 Add the title for choose file 2: SNPs Pair File.
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom";
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = Math.round(this.m_nCanvasWidth - 30 - Math.round(250 / 2));
	var nOneLabelBasePtHghY = 344 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "center";
	aCanvasContext.fillText("Font Size", 0, 0);
	aCanvasContext.restore();
	// --- 13 Render the Search label
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom";
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 436 + 48;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Search:", 0, 0);
	aCanvasContext.restore();
	// --- 14 Render the Interactions Tips
	aCanvasContext.fillStyle    = "black";
	aCanvasContext.textBaseline = "bottom";
	aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 442 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("User Interaction Help:", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 466 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("1) Expand Node:", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 258;
	var nOneLabelBasePtHghY = 486 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Mouse Left Button Click", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 510 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("2) Collapse Node:", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 258;
	var nOneLabelBasePtHghY = 530 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("'C' Key Pressed + Click", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 554 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("3) Select Node:", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 258;
	var nOneLabelBasePtHghY = 574 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("'S' Key Pressed + Click", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 598 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("4) Unselect Node:", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 258;
	var nOneLabelBasePtHghY = 618 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("'U' Key Pressed + Click", 0, 0);
	aCanvasContext.restore();
	// 20120712 Look up Gene or SNP in NCBI website.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 642 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("5) Look up Gene/SNP in NCBI DB:", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 258;
	var nOneLabelBasePtHghY = 662 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("'L' Key Pressed + Click", 0, 0);
	aCanvasContext.restore();
	// 20120709 Dr. Zhang suggests to add one hint: "More user interactions please refer to "Docs" webpage on EINVis homepage."
	aCanvasContext.font = 15 + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 686 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("Please follow the the 'Docs' link on the", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.font = 15 + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 706 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("EINVis homepage for more detailed", 0, 0);
	aCanvasContext.restore();
	aCanvasContext.font = 15 + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
	aCanvasContext.save();
	var nOneLabelBasePtWdhX = this.m_nCanvasWidth - 278;
	var nOneLabelBasePtHghY = 726 + nVerticalPosOffsetY;
	aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
	aCanvasContext.textAlign = "left";
	aCanvasContext.fillText("help information.", 0, 0);
	aCanvasContext.restore();
};

CAllNodes4RingGraph.prototype.AddOneSelectedNode = function()
{
	var bDoesTheNewSelectedNodeExist = false;
	var nNumOfSelectedNode = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
	for (var nIdx = 0; nIdx < nNumOfSelectedNode; nIdx++)
	{
		var nIdxOfLevel = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView[nIdx];
		var nIdxInLevel = this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView[nIdx];
		if (nIdxOfLevel == this.m_nMouseClickOnNodeIndexOfLevel && nIdxInLevel == this.m_nMouseClickOnNodeIndexInLevel)
		{	// already exist.
			bDoesTheNewSelectedNodeExist = true;
			break;
		}
	}
	if (bDoesTheNewSelectedNodeExist == false)
	{
		this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.push(this.m_nMouseClickOnNodeIndexOfLevel);
		this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView.push(this.m_nMouseClickOnNodeIndexInLevel);
	}
};
CAllNodes4RingGraph.prototype.DeleteOneSelectedNode = function()
{
	var bDoesTheNewSelectedNodeExist = false;
	var nIndexOfExistNodeToDelete = 0;
	var nNumOfSelectedNode = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
	for (var nIdx = 0; nIdx < nNumOfSelectedNode; nIdx++)
	{
		var nIdxOfLevel = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView[nIdx];
		var nIdxInLevel = this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView[nIdx];
		if (nIdxOfLevel == this.m_nMouseClickOnNodeIndexOfLevel && nIdxInLevel == this.m_nMouseClickOnNodeIndexInLevel)
		{	// already exist.
			bDoesTheNewSelectedNodeExist = true;
			nIndexOfExistNodeToDelete = nIdx;
			break;
		}
	}
	if (bDoesTheNewSelectedNodeExist == true)
	{
		this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.splice(nIndexOfExistNodeToDelete, 1);
		this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView.splice(nIndexOfExistNodeToDelete, 1);
	}
};
CAllNodes4RingGraph.prototype.CopyAllSelectedNodesToGlobalVariable = function()
{
	gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView = [];
	gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView = [];
	var nNumOfSelectedNode = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
	for (var nIdx = 0; nIdx < nNumOfSelectedNode; nIdx++)
	{
		var nIdxOfLevel = this.m_vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView[nIdx];
		var nIdxInLevel = this.m_vnSelectedNodeIndexInLevel4PartialNodesTreeRingView[nIdx];
		gvnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.push(nIdxOfLevel);
		gvnSelectedNodeIndexInLevel4PartialNodesTreeRingView.push(nIdxInLevel);
	}
};
CAllNodes4RingGraph.prototype.SetMultipleSelectionHighlightMode = function(nHightlightMode)
{	this.m_nMultipleSelectionHighlightMode = nHightlightMode;	};
CAllNodes4RingGraph.prototype.RefreshTreeRingViewLevelWidthVariable = function()
{	// When user change the "font size" slider, this fun will update the variable "this.m_vnTreeRingViewLevelWidth".
	// First, we scan all the text, and decide the maximum length of each level, and then, compare them with the predefined maximum width of each level.
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
	var nNumOfLevels = this.m_vvAllNodes4RingGraph.length;
	this.m_vnTreeRingViewLevelWidth = new Array(nNumOfLevels);
	for (var nIdxOfLvl = 0; nIdxOfLvl < nNumOfLevels; nIdxOfLvl++)
	{
		var nNumOfNodeInOneLvl = this.m_vvAllNodes4RingGraph[nIdxOfLvl].length;
		var nNodeNameTextWidthMax = 0;
		for (var nIdxInLvl = 0; nIdxInLvl < nNumOfNodeInOneLvl; nIdxInLvl++)
		{
			var aOneNodeRefer = this.m_vvAllNodes4RingGraph[nIdxOfLvl][nIdxInLvl];
			var sOneNodeName = aOneNodeRefer.GetThisNodeName();
			var aOneCanvasContextRefer = aOneCanvasRefer.m_aCanvasContext; // get a canvas context, whatever canvas.
			aOneCanvasContextRefer.font = this.m_nTreeRingViewNodesNameTextFontSize + 'px courier';
			var vTextWidthAndHeight = aOneCanvasContextRefer.measureText(sOneNodeName); // "nTextWidthAndHeight.width  .height"
			var nTextWidth = vTextWidthAndHeight.width;
			if (nNodeNameTextWidthMax < nTextWidth)
			{
				nNodeNameTextWidthMax = nTextWidth;
			}
		}
		// compare this max width with the restriction of this level.
		var nThisLevleMaxWidthRestrict = 0;
		if (nIdxOfLvl == 0){	nThisLevleMaxWidthRestrict = 25;	}
		else if (nIdxOfLvl == 1){	nThisLevleMaxWidthRestrict = 92;	}
		else if (nIdxOfLvl == 2){	nThisLevleMaxWidthRestrict = 118;	}
		else if (nIdxOfLvl >= 3){	nThisLevleMaxWidthRestrict = 120;	}
		if (nNodeNameTextWidthMax > nThisLevleMaxWidthRestrict){	nNodeNameTextWidthMax = nThisLevleMaxWidthRestrict;	}
		this.m_vnTreeRingViewLevelWidth[nIdxOfLvl] = nNodeNameTextWidthMax;
	}
};
CAllNodes4RingGraph.prototype.UpdateTreeRingViewMouseHangingOverInformation = function(aCanvasContext, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, nCanvasHeght){
	// --- 0 Basic Region Parameter
	var bRenderNewTextOrClear = false;
	var sShowText = "";
	var nFontSizeNormal = 16;
	var nOneLabelBasePtWdhX = Math.ceil(nCanvasHeght * 0.7);
	var nOneLabelBasePtHghY = 50;
	// --- 1 Judge Whether current Mouse is Hanging Over a Node or Edge.
	this.JudgeWhichNodesRingSectorTheMouseFallIn(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
	if (this.m_bIsMouseFallInAnyRingSector == true)
	{	// if one ring sector is selected, then we need to response to this operation.
		var aTheSelectedNodeRefer = this.m_vvAllNodes4RingGraph[this.m_nMouseClickOnNodeIndexOfLevel][this.m_nMouseClickOnNodeIndexInLevel];
		var sThisNodeName = aTheSelectedNodeRefer.GetThisNodeName();
		var bIsThisNodeRealLeafNode = aTheSelectedNodeRefer.GetIsLeafNode();
		if (bIsThisNodeRealLeafNode == true){
			var nIndexInOriginalSNPsList = aTheSelectedNodeRefer.m_nIndexInOriginalSNPsList;
			var vsOneSNPRawInfor = gvvsJSAllUniqueSNPsInfor[nIndexInOriginalSNPsList]; // Array[4]. "0" Chr#; "1" GeneName; "2" SNPID; "3" Single Locus Test Value.
			var dOriginalSNPsSingleTestValue = vsOneSNPRawInfor[3];
			sShowText = sThisNodeName + ", " + dOriginalSNPsSingleTestValue.toString();
			sShowText = sShowText.substring(0, 30);
			bRenderNewTextOrClear = true;
		}
	} else {
		// --- 0 Adjust the mouse position based on the center of the canvas.
		// get the center point (WdhX, HghY) of all ring sector.
		var nAllRingSectorCenterWdhX = Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
		var nAllRingSectorCenterHghY = Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
		nMouseRelativeCoordsWdhX = nMouseRelativeCoordsWdhX - nAllRingSectorCenterWdhX;
		nMouseRelativeCoordsHghY = nMouseRelativeCoordsHghY - nAllRingSectorCenterHghY;
		var bIsThereAnEdgeCloseToMouse = this.JudgeWhichTwoLocusTestEdgeCurveThisMouseCloseTo(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
		if (bIsThereAnEdgeCloseToMouse == true){
			var nIndexOfLevelNode1 = this.m_aMouseOverHangingBriefEdgeInfor.m_nIndexOfLevel4Node1;
			var nIndexInLevelNode1 = this.m_aMouseOverHangingBriefEdgeInfor.m_nIndexInLevel4Node1;
			var nIndexOfLevelNode2 = this.m_aMouseOverHangingBriefEdgeInfor.m_nIndexOfLevel4Node2;
			var nIndexInLevelNode2 = this.m_aMouseOverHangingBriefEdgeInfor.m_nIndexInLevel4Node2;
			var aOneNodeRefer1 = this.m_vvAllNodes4RingGraph[nIndexOfLevelNode1][nIndexInLevelNode1];
			var aOneNodeRefer2 = this.m_vvAllNodes4RingGraph[nIndexOfLevelNode2][nIndexInLevelNode2];
			var sNode1Name = aOneNodeRefer1.GetThisNodeName();
			var sNode2Name = aOneNodeRefer2.GetThisNodeName();
			var bIsNode1TrueLeaf = aOneNodeRefer1.GetIsLeafNode();
			var bShownInPartialNode1 = aOneNodeRefer1.GetThisNodeShownOrNotInThisPartialNodesMode();
			var bIsNode2TrueLeaf = aOneNodeRefer2.GetIsLeafNode();
			var bShownInPartialNode2 = aOneNodeRefer2.GetThisNodeShownOrNotInThisPartialNodesMode();
			var nIndexInOriginalSNPsList1 = aOneNodeRefer1.m_nIndexInOriginalSNPsList;
			var nIndexInOriginalSNPsList2 = aOneNodeRefer2.m_nIndexInOriginalSNPsList;
			if (bIsNode1TrueLeaf == true && bIsNode2TrueLeaf == true && bShownInPartialNode1 == true && bShownInPartialNode2 == true){
				var dOriginalTwoLocusTestValue = this.FindOriginalTwoLocusTestValue(nIndexInOriginalSNPsList1, nIndexInOriginalSNPsList2);
				sShowText = "(" + sNode1Name + "," + sNode2Name + ") " + dOriginalTwoLocusTestValue.toString();
				sShowText = sShowText.substring(0, 30);
				bRenderNewTextOrClear = true;
			} else {
				bRenderNewTextOrClear = false;
			}
		}
	}
	// --- 2 Render the Mouse Hanging Over Information
	if (bRenderNewTextOrClear == true){
		aCanvasContext.clearRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
		aCanvasContext.fillStyle = "white";
		aCanvasContext.fillRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
		aCanvasContext.fillStyle    = "black";
		aCanvasContext.textBaseline = "bottom"; // "top"
		aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
		aCanvasContext.save();
		aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
		aCanvasContext.textAlign = "left";
		aCanvasContext.fillText(sShowText, 0, 0);
		aCanvasContext.restore();
	} else {
		aCanvasContext.clearRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
		aCanvasContext.fillStyle = "white";
		aCanvasContext.fillRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
	}
};
CAllNodes4RingGraph.prototype.UpdateLDRingViewMouseHangingOverInformation = function(aCanvasContext, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, nCanvasHeght){
	// --- 0 Basic Region Parameter
	var bRenderNewTextOrClear = false;
	var sShowText = "";
	var nFontSizeNormal = 16;
	var nOneLabelBasePtWdhX = Math.ceil(nCanvasHeght * 0.7);
	var nOneLabelBasePtHghY = 50;
	// --- 1 Judge Whether current Mouse is Hanging Over an Edge, do not consider Node.
	// --- 1.1 Adjust the mouse position based on the center of the canvas.
	var nAllRingSectorCenterWdhX = Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	var nAllRingSectorCenterHghY = Math.floor(this.m_nWidthHeghtOfCanvas4TreeRingViewWithPartialNodes / 2);
	nMouseRelativeCoordsWdhX = nMouseRelativeCoordsWdhX - nAllRingSectorCenterWdhX;
	nMouseRelativeCoordsHghY = nMouseRelativeCoordsHghY - nAllRingSectorCenterHghY;
	// --- 1.2 Judge mouse hanging over one edge.
	var bIsThereAnEdgeCloseToMouse = this.JudgeWhichLDInforEdgeCurveThisMouseCloseTo(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
	if (bIsThereAnEdgeCloseToMouse == true){
		var nIndexOfLevelNode1 = this.m_aMouseOverHangingBriefEdgeInforLD.m_nIndexOfLevel4Node1;
		var nIndexInLevelNode1 = this.m_aMouseOverHangingBriefEdgeInforLD.m_nIndexInLevel4Node1;
		var nIndexOfLevelNode2 = this.m_aMouseOverHangingBriefEdgeInforLD.m_nIndexOfLevel4Node2;
		var nIndexInLevelNode2 = this.m_aMouseOverHangingBriefEdgeInforLD.m_nIndexInLevel4Node2;
		var aOneNodeRefer1 = this.m_vvAllNodes4RingGraph[nIndexOfLevelNode1][nIndexInLevelNode1];
		var aOneNodeRefer2 = this.m_vvAllNodes4RingGraph[nIndexOfLevelNode2][nIndexInLevelNode2];
		var sNode1Name = aOneNodeRefer1.GetThisNodeName();
		var sNode2Name = aOneNodeRefer2.GetThisNodeName();
		var bIsNode1TrueLeaf = aOneNodeRefer1.GetIsLeafNode();
		var bShownInPartialNode1 = aOneNodeRefer1.GetThisNodeShownOrNotInThisPartialNodesMode();
		var bIsNode2TrueLeaf = aOneNodeRefer2.GetIsLeafNode();
		var bShownInPartialNode2 = aOneNodeRefer2.GetThisNodeShownOrNotInThisPartialNodesMode();
		var nIndexInOriginalSNPsList1 = aOneNodeRefer1.m_nIndexInOriginalSNPsList;
		var nIndexInOriginalSNPsList2 = aOneNodeRefer2.m_nIndexInOriginalSNPsList;
		if (bIsNode1TrueLeaf == true && bIsNode2TrueLeaf == true && bShownInPartialNode1 == true && bShownInPartialNode2 == true){
			var dOriginalLDEgdeValue = this.FindOriginalLDEdgeValue(nIndexInOriginalSNPsList1, nIndexInOriginalSNPsList2);
			sShowText = "(" + sNode1Name + "," + sNode2Name + ") " + dOriginalLDEgdeValue.toString();
			sShowText = sShowText.substring(0, 30);
			bRenderNewTextOrClear = true;
		} else {
			bRenderNewTextOrClear = false;
		}
	}
	// --- 2 Render the Mouse Hanging Over Information
	if (bRenderNewTextOrClear == true){
		aCanvasContext.clearRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
		aCanvasContext.fillStyle = "white";
		aCanvasContext.fillRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
		aCanvasContext.fillStyle    = "black";
		aCanvasContext.textBaseline = "bottom"; // "top"
		aCanvasContext.font = nFontSizeNormal + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
		aCanvasContext.save();
		aCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
		aCanvasContext.textAlign = "left";
		aCanvasContext.fillText(sShowText, 0, 0);
		aCanvasContext.restore();
	} else {
		aCanvasContext.clearRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
		aCanvasContext.fillStyle = "white";
		aCanvasContext.fillRect(nOneLabelBasePtWdhX, nOneLabelBasePtHghY - 16, 250, 16);
	}
};
CAllNodes4RingGraph.prototype.FindOriginalTwoLocusTestValue = function(nIndexInOriginalSNPsList1, nIndexInOriginalSNPsList2){
	var dOriTestValue = 0.0;
	var nNumOfEdges = gvdJSTwoLocusTestValue.length;
	for (var nIdx = 0; nIdx < nNumOfEdges; nIdx++){
		var nIndexOfNode1 = gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs[nIdx];
		var nIndexOfNode2 = gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs[nIdx];
		if ((nIndexOfNode1 == nIndexInOriginalSNPsList1 && nIndexOfNode2 == nIndexInOriginalSNPsList2)
		|| (nIndexOfNode1 == nIndexInOriginalSNPsList2 && nIndexOfNode2 == nIndexInOriginalSNPsList1)) {
			dOriTestValue = gvdJSTwoLocusTestValue[nIdx]; break;
		}
	}
	return dOriTestValue;
};
CAllNodes4RingGraph.prototype.FindOriginalLDEdgeValue = function(nIndexInOriginalSNPsList1, nIndexInOriginalSNPsList2){
	var dOriLDEdgeValue = 0.0;
	var nNumOfEdges = gvdJSLDInforValue.length;
	for (var nIdx = 0; nIdx < nNumOfEdges; nIdx++){
		var nIndexOfNode1 = gvnJSLDInforFstSNPIndexInUniqueSNPs[nIdx];
		var nIndexOfNode2 = gvnJSLDInforSndSNPIndexInUniqueSNPs[nIdx];
		if ((nIndexOfNode1 == nIndexInOriginalSNPsList1 && nIndexOfNode2 == nIndexInOriginalSNPsList2)
		|| (nIndexOfNode1 == nIndexInOriginalSNPsList2 && nIndexOfNode2 == nIndexInOriginalSNPsList1)) {
			dOriLDEdgeValue = gvdJSLDInforValue[nIdx]; break;
		}
	}
	return dOriLDEdgeValue;
};
CAllNodes4RingGraph.prototype.JudgeWhichTwoLocusTestEdgeCurveThisMouseCloseTo = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, aMouseOverHangingBriefEdgeInfor){
	var bIsThereAnEdgeCloseToMouse = false;
	this.m_vaAllEdgesBriefInforWithDistToMouse = [];
	// --- traverse all the nodes, and calculate the distance between mouse and the each edge curve adjacent to each node.
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].CalculateDistanceBetweenEachTwoLocusTestEdgeAndMousePos( this.m_vvAllNodes4RingGraph, this.m_vaAllEdgesBriefInforWithDistToMouse, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
	}
	this.m_vaAllEdgesBriefInforWithDistToMouse.sort(function(aBriefEdgeInfor1, aBriefEdgeInfor2){return aBriefEdgeInfor1.m_dDistanceToMousePos - aBriefEdgeInfor2.m_dDistanceToMousePos;});
	var nNumOfBriefEdgeInfor = this.m_vaAllEdgesBriefInforWithDistToMouse.length;
	if (nNumOfBriefEdgeInfor == 0) {
		bIsThereAnEdgeCloseToMouse = false;
	} else if (nNumOfBriefEdgeInfor == 1) {
		var aBriefEdgeInforFst = this.m_vaAllEdgesBriefInforWithDistToMouse[0];
		if (aBriefEdgeInforFst.m_dDistanceToMousePos < 1.0){
			bIsThereAnEdgeCloseToMouse = true;
			this.m_aMouseOverHangingBriefEdgeInfor = aBriefEdgeInforFst;
		} else {
			bIsThereAnEdgeCloseToMouse = false;
		}
	} else if (nNumOfBriefEdgeInfor >= 2) {
		var aBriefEdgeInforFst = new COneEdgeBriefInfor();
		aBriefEdgeInforFst = this.m_vaAllEdgesBriefInforWithDistToMouse[0];
		var aBriefEdgeInforSnd = this.m_vaAllEdgesBriefInforWithDistToMouse[1];
		if ((aBriefEdgeInforFst.m_dDistanceToMousePos < 0.2 && (aBriefEdgeInforSnd.m_dDistanceToMousePos - aBriefEdgeInforFst.m_dDistanceToMousePos) > 0.08) || ((aBriefEdgeInforSnd.m_dDistanceToMousePos - aBriefEdgeInforFst.m_dDistanceToMousePos) < 0.000001)){
			bIsThereAnEdgeCloseToMouse = true;
			this.m_aMouseOverHangingBriefEdgeInfor = aBriefEdgeInforFst;
		} else {
			bIsThereAnEdgeCloseToMouse = false;
		}
	}
	return bIsThereAnEdgeCloseToMouse;
};
CAllNodes4RingGraph.prototype.JudgeWhichLDInforEdgeCurveThisMouseCloseTo = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY){
	var bIsThereAnEdgeCloseToMouse = false;
	this.m_vaAllEdgesBriefInforWithDistToMouse = [];
	// --- traverse all the nodes, and calculate the distance between mouse and the each edge curve adjacent to each node.
	var nNumOfRootNodes = this.m_vvAllNodes4RingGraph[0].length;
	for (var nIdxOfRootNode = 0; nIdxOfRootNode < nNumOfRootNodes; nIdxOfRootNode++)
	{	// traverse all root nodes, traverse all tree nodes by use of this recursive function.
		this.m_vvAllNodes4RingGraph[0][nIdxOfRootNode].CalculateDistanceBetweenEachLDInforEdgeAndMousePos( this.m_vvAllNodes4RingGraph, this.m_vaAllEdgesBriefInforWithDistToMouse, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
	}
	this.m_vaAllEdgesBriefInforWithDistToMouse.sort(function(aBriefEdgeInfor1, aBriefEdgeInfor2){return aBriefEdgeInfor1.m_dDistanceToMousePos - aBriefEdgeInfor2.m_dDistanceToMousePos;});
	var nNumOfBriefEdgeInfor = this.m_vaAllEdgesBriefInforWithDistToMouse.length;
	if (nNumOfBriefEdgeInfor == 0) {
		bIsThereAnEdgeCloseToMouse = false;
	} else if (nNumOfBriefEdgeInfor == 1) {
		var aBriefEdgeInforFst = this.m_vaAllEdgesBriefInforWithDistToMouse[0];
		if (aBriefEdgeInforFst.m_dDistanceToMousePos < 1.0){
			bIsThereAnEdgeCloseToMouse = true;
			this.m_aMouseOverHangingBriefEdgeInforLD = aBriefEdgeInforFst;
		} else {
			bIsThereAnEdgeCloseToMouse = false;
		}
	} else if (nNumOfBriefEdgeInfor >= 2) {
		var aBriefEdgeInforFst = new COneEdgeBriefInfor();
		aBriefEdgeInforFst = this.m_vaAllEdgesBriefInforWithDistToMouse[0];
		var aBriefEdgeInforSnd = this.m_vaAllEdgesBriefInforWithDistToMouse[1];
		if (aBriefEdgeInforFst.m_dDistanceToMousePos < 0.2 && (aBriefEdgeInforSnd.m_dDistanceToMousePos - aBriefEdgeInforFst.m_dDistanceToMousePos) > 0.08){
			bIsThereAnEdgeCloseToMouse = true;
			this.m_aMouseOverHangingBriefEdgeInforLD = aBriefEdgeInforFst;
		} else {
			bIsThereAnEdgeCloseToMouse = false;
		}
	}
	return bIsThereAnEdgeCloseToMouse;
};







