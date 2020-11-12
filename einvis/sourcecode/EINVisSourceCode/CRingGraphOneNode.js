function COneNode4RingGraph()
{
	// ----- the following are the member variables of this class. -----
	this.m_sThisNodeName = ""; // this node name
	this.m_nThisNodeFinestLevelChildrenNum = 0; // the children number in the finest level of the hierarchical tree.
    // please note that the finest level children nodes may not have the same "m_nThisNodeLevel", but they must all be the leaf node.
    // "m_nThisNodeFinestLevelChildrenNum" is used for calculate of the angle or percent of the circular arraged layout.
	this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = 0; // 20111117William. This variable is for the finest level nodes among this node's children nodes, to be shown in this mode.
	this.m_bShowOrNotShowThisNodeInPartialNodesMode = false; // this flag will decide whether show this node in the tree ring view or not.
	this.m_bIsAtLeastOneChildShownInPartialNodes = false; // 20111118William. "true" at least one child node shown in this partial nodes.
	this.m_nThisNodeLevel = 0; // the node level in the hierarchical tree.
	this.m_nThisNodeIndexInLevel = 0; // the node index in one level in the hierarchical tree. // 20110922William add and comment. // 20111018 uncomment.
	this.m_bIsLeafNode = false; // "true" is leaf; "false" is branch node (default).
	this.m_dSingleLocusTestValueScaled = 0.0; // the single locus test value (scaled). This variable only be valid when this node is a leaf node.
	this.m_vdSingleLocusTestValueScaledMapNodeColor = new Array(3);
	this.m_nNumOfNextLevelChildren = 0; // the number of children, size of "m_vIdxOfNextLevelChildren".
	this.m_vIdxOfNextLevelChildren = new Array(); // the index of directed children(in the next level), the index will point to the corresponding level of "m_vvAllNodes4RingGraph".
	// if you want to retrieve one child, it is in "m_vvAllNodes4RingGraph" set, and m_vvAllNodes4RingGraph[m_nThisNodeLevel(this node level) + 1][one element in m_vIdxOfNextLevelChildren];
	
	// 20110330William add the following variables for the graph relationship(defined by).
	this.m_nNumOfDefinedByOtherLeafNodes = 0; // the size of "m_vDefinedByOtherLeafNodes"
	this.m_vDefinedByOtherLeafNodes = new Array(); // 20110330William, the index list of other nodes which defined this leaf node.
                               // and the index is that in the Leaf Nodes Index in Global Leaf Nodes Set. in 02 file, the line number is the leaf index and the index in 03 file also refer to the line number of each leaf node.
                               // the element is similar to "m_nIndexInLeafNodes", must exist one node, whose "m_nIndexInLeafNodes" equals to one element here, so that node define this node.
	this.m_vdDefinedByOtherLeafNodesEdgeWeight = new Array();
	this.m_nIndexInLeafNodes = -1; // 20110330William the index in all leaf nodes, since we parse data from "02" and "03" files, we get each leaf node's this index directly when parsing (just is the line number).
	this.m_nIndexInAllNodes = 0; // 20110330William after that, when we construct the hierarchical tree, we can get the index in all nodes correspondingly.
	this.m_nIndexInHumMdlAllSolParam = 0; // 20110404William if this node is a leaf node, and if we can find it in the "CHumMdlAllSolParam" 's "m_vAllSolParams" 's "m_sThisParamName".
                               // then we set the this variable value to the index in the "vector<CHumMdlOneSolParam> m_vAllSolParams" vector.
                               // after we get this index, we can easily retrieve the data in the variable "aHumMdlAllSolParam01Normal", or "aHumMdlAllSolParam02Abnrml", and adjust the view item 's attributes to the user.
	// 20110407William, the following variable are designed to show partial nodes.
    // "Partial Nodes", may have various mode:
    // 1. Only Level one Nodes;
    // 2. Only Level one and two Nodes;
    // 3. Only Level one, two three Nodes;
    // 4. All Nodes, level one, two, three, four.
    // 5. Some branch are reach to level one or two only, but their leaf nodes has concealed. But Some other nodes to show has the leaf.
    //    This is the most complicated mode, each branch may have different level of nodes. This mode will allow user to decide which level to show of each branch.
    //    Or, we can decide it by the change percent value or variance value whatever you want or reasonable.
	this.m_bIsThisNodeShownInThisMode = false; // "true" this node will be shown in this mode; "false" this node will not be shown in this mode.
	this.m_bIsThisNodeLeafInThisMode = false; // "true" this node is a leaf node, no children will be added; "false" this node is not a leaf node, its children will also appear in this mode, so there will no relationship graph edge realted to this node.
	this.m_nIndexInAllNodesInThisMode = 0; // the global index in all the nodes in this mode, including the branch nodes and leaf nodes.
	this.m_nNumOfNextLevelChildrenInThisMode = 0;  // if "m_bIsThisNodeLeafInThisMode == false", then this variable has meaning.
                                             // some item in "m_vIdxOfNextLevelChildren" will disappear by user, so size of "m_vIdxOfNextLevelChildrenInThisMode" is smaller or equal to size of "m_vIdxOfNextLevelChildren".
    this.m_vIdxOfNextLevelChildrenInThisMode = new Array(); // store the children item of this node, in the special mode, see above line.
    this.m_nIdxInLevelOfFatherNode = 0; // 20111130William. We add this variable, the aim is to make it convenient to find this node's father node.
    // when you want to retrieve this node's father node, the index in level is the above variable "this.m_nIdxInLevelOfFatherNode", the index of level is "this.m_nThisNodeLevel - 1" if (this.m_nThisNodeLevel >= 1)
    this.m_nNumOfDefinedByOtherLeafNodesInThisMode = 0; // store the nodes, who or whose children(but it is not shown in this mode) defined this node or this node's children(but it is not shown in this mode).
	this.m_vDefinedByOtherLeafNodesLevelNum = new Array(); // the graph edge another node's level index
	this.m_vDefinedByOtherLeafNodesIndexInThatLevel = new Array(); // the graph edge another node's level index, so you can retrieve another nodes by "m_vvAllNodes4RingGraph[m_vDefinedByOtherLeafNodesLevelNum][m_vDefinedByOtherLeafNodesIndexInThatLevel]".
	// --- 20110707William the following variable are designed to store the layout information of this node.
	this.m_dInnerPointRadis = 0.0; // the begin inner point radius of this ring sector	| Polar
	this.m_dOuterPointRadis = 0.0; // the begin outer point radius of this ring sector	| Polar
	this.m_dBgnPointAngle   = 0.0; // the begin inner point angle of this ring sector   | Polar
	this.m_dEndPointAngle   = 0.0; // the end inner point angle of this ring sector		| Polar
	this.m_dCentrPointAngle = 0.0; // the central point angle of this ring sector		| Polar
	this.m_dCentrPointRadis = 0.0; // the central point radius of this ring sector		| Polar
	// --- 20110718William, add the following variables to store the edge information.
	this.m_vDefinedByOtherLeafNodesEdgeInformtn = new Array(); // each element (type of "class COneEdge4RingGraph()") in this variable correspond to that in "m_vDefinedByOtherLeafNodes". Each defined by node will link to this node through the edge stored here.
	// in the above variable, each element is a class, contain the edge information, including the control point, the B-Spline Curve, and the edge color information.
	// why we need to add variables to store the nodes index who are defined by this node.
	// in the prior tree-ring view, whatever user selected on node, all nodes are need to re-render, so we do not need to store it, since we always need to re-render all nodes on the canvas.
	// but now, we only need to render partial nodes: "the selected node", "the nodes who defines the selected node", and "the nodes who are defined by the selected node".
	// we do not need to render all nodes, so we do not need to traverse all nodes again. Then it is necessary to store the nodes index who are defined by this nodes.
	this.m_nNumOfDefiningOtherLeafNodes = 0; // Def05 the number of nodes who are defined by this node.
	this.m_nvDefiningOtherLeafNodesLevelNum = new Array(); // Def06 the graph edge another node's level index
	this.m_nvDefiningOtherLeafNodesIndexInThatLevel = new Array(); // Def07 the graph edge another node's level index, so you can retrieve another nodes by "m_vvAllNodes4RingGraph[m_vDefinedByOtherLeafNodesLevelNum][m_vDefinedByOtherLeafNodesIndexInThatLevel]".
	// the above four variables (Def05 06 07) need to be initialized in somewhere. William is looking for a suitable place. maybe (Def03 04) are not assigned value before.
	// some useful function may help you realize the initialization of the above four variables:
	// "FindOneNodeIndexInWhichEachLvlInWhichIndexUseIndexOfDefByChld()" in "CAllNodes4RingGraph.js"
	// Just like what I thought, (Def03 04) are not initialized. Just have operation function about these two variables.
	// 20110821William, in the stop of debugging mode, William also verify that the six variables (Def03 04 05 06 07) all are not initialized yet.
	// so, he decides to build a new function to initialize these variables according to "Def02 this.m_vDefinedByOtherLeafNodes", the most original variable storing definition relationship among variables.
	// the function name : "InitializeDefiningAndDefinedByArraysByRawDefRltnVar()"; location : "CAllNodes4RingGraph".
	// -----------------------------------------------------------------------------------------------
	// 20111017William. We need to add the Orthogonal Graph view to this project, so we need to sort the order of the root nodes.
	// In the following variable, it will store the order of the root nodes. For the order in the children nodes of one father node, we will add one array to the father node, which will store the order among the children nodes.
	this.m_vnChildNodesOrderIdxRowHgh = new Array(); // the order (int row    height direction) array to store the index of child nodes. We call this node as the father node.
	this.m_vnChildNodesOrderIdxColWdh = new Array(); // the order (int column width  direction) array to store the index of child nodes. We call this node as the father node.
	// When you want to show partial nodes, just construct a separate function to set up the above two variables.
	// 20111118William. To render the tree-ring view with partial nodes.
	this.m_dInnerPointRadis4PartialNodes = 0.0; // the layout of the tree-ring view for partial nodes.
	this.m_dOuterPointRadis4PartialNodes = 0.0; // the layout of the tree-ring view for partial nodes.
	this.m_dBgnPointAngle4PartialNodes   = 0.0; // the layout of the tree-ring view for partial nodes.
	this.m_dEndPointAngle4PartialNodes   = 0.0; // the layout of the tree-ring view for partial nodes.
	this.m_dCentrPointAngle4PartialNodes = 0.0; // the layout of the tree-ring view for partial nodes.
	this.m_dCentrPointRadis4PartialNodes = 0.0; // the layout of the tree-ring view for partial nodes.
	// 20111128William. We need an array to store the definition relationship in the tree ring view for partial nodes.
	this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes = new Array(); // index of other nodes, which defined this node in the tree ring view with partial nodes.
	this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes = new Array(); // index of other nodes, which defined this node in the tree ring view with partial nodes.
	this.m_vnDefinedByOtherNodesNumOfDefRltn4PartialNodes = new Array(); // the number of definition relationships. of each element in the above two array.
	// the above three arrays are synchronous, which means the elements with the same index are all related to the same one thing, among the three arrays.
	// these three arrays are also synchronous with variable "this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes". These four variables are in one-to-one correspondence.
	this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes = new Array(); // the set of instances of the edges (cubic B-Spline curves).
	// 20111202William. The edges information of tree ring view with partial nodes are stored in this variable.
	this.m_nRltnTypeToTheSelectNode = 0; // 20120630. Add this variable for the highlighting mode in multiple selection.
	// 20130620William. For the LD edges information, we only generate the edges between remaining real leaf nodes. If node collapse, we discard the edges corresponding to the disappearing nodes. So, we do not need to generate it recursively.
	this.m_vnLDEdgeAnotherEndNodesIndexOfLevel4PartialNodes = new Array();
	this.m_vnLDEdgeAnotherEndNodesIndexInLevel4PartialNodes = new Array();
	this.m_vnLDEdgeAnotherEndNodesNumOfDefRltn4PartialNodes = new Array();
	this.m_vaLDEdgeInformtn4PartialNodes = new Array(); // LD Edges Curve Information.
    // 20130620William. Add some variables to store LD information.
	this.m_nNumOfIndexOfNodesInLDInforEdges = 0;
	this.m_vnIndexOfNodesInLDInforEdges = new Array();
	this.m_vdEdgeWeightOfTheLDInforEdges = new Array();
	// 20130620William.
	this.m_vnLDEdgeAnotherEndNodeLevelNum = new Array(); // this.m_vDefinedByOtherLeafNodesLevelNum
	this.m_vnLDEdgeAnotherEndNodeIndexInThatLevel = new Array(); // this.m_vDefinedByOtherLeafNodesIndexInThatLevel
	// 20130620William.
	this.m_nIndexInOriginalSNPsList; // Raw data input, and we sort it. It is the index in gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs
}
// ----------------- the following are the member methods function of this class. ----------------
// operation on "m_sThisNodeName"
COneNode4RingGraph.prototype.SetThisNodeName = function(sOneNodeName){	this.m_sThisNodeName = sOneNodeName;	};
COneNode4RingGraph.prototype.GetThisNodeName = function(){	return this.m_sThisNodeName;	};
// operation on "m_nThisNodeFinestLevelChildrenNum"
COneNode4RingGraph.prototype.SetThisNodeFinestLevelChildrenNum = function(nThisNodeFinestLevelChildrenNum)
{
	this.m_nThisNodeFinestLevelChildrenNum = nThisNodeFinestLevelChildrenNum;
};
COneNode4RingGraph.prototype.GetThisNodeFinestLevelChildrenNum = function()
{
	return this.m_nThisNodeFinestLevelChildrenNum;
};
COneNode4RingGraph.prototype.IncreaseThisNodeFinestLevelChildrenNumByOne = function()
{
	this.m_nThisNodeFinestLevelChildrenNum++;
};
// operation on "m_nRltnTypeToTheSelectNode"
COneNode4RingGraph.prototype.GetThisNodeRltnTypeToTheSelectNode = function(){	return this.m_nRltnTypeToTheSelectNode;	};
// operation on "m_nThisNodeFinestLevelChildrenNum4PartialNodes"
COneNode4RingGraph.prototype.SetThisNodeFinestLevelChildrenNum4PartialNodes = function(nThisNodeFinestLevelChildrenNum4PartialNodes)
{
	this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = nThisNodeFinestLevelChildrenNum4PartialNodes;
};
COneNode4RingGraph.prototype.GetThisNodeFinestLevelChildrenNum4PartialNodes = function()
{
	return this.m_nThisNodeFinestLevelChildrenNum4PartialNodes;
};
COneNode4RingGraph.prototype.IncreaseThisNodeFinestLevelChildrenNum4PartialNodesByOne = function()
{
	this.m_nThisNodeFinestLevelChildrenNum4PartialNodes++;
};
// operation on "this.m_bShowOrNotShowThisNodeInPartialNodesMode"
COneNode4RingGraph.prototype.SetThisNodeShownOrNotInThisPartialNodesMode = function(bShowOrNotShowThisNode)
{
	this.m_bShowOrNotShowThisNodeInPartialNodesMode = bShowOrNotShowThisNode;
};
COneNode4RingGraph.prototype.GetThisNodeShownOrNotInThisPartialNodesMode = function()
{
	return this.m_bShowOrNotShowThisNodeInPartialNodesMode;
};
//operation on "this.m_bIsAtLeastOneChildShownInPartialNodes"
COneNode4RingGraph.prototype.SetIsAtLeastOneChildShownInPartialNodes = function(bAtLeastOneChildShownOrNot)
{
	this.m_bIsAtLeastOneChildShownInPartialNodes = bAtLeastOneChildShownOrNot;
};
COneNode4RingGraph.prototype.GetIsAtLeastOneChildShownInPartialNodes = function(){	return this.m_bIsAtLeastOneChildShownInPartialNodes;	};
// operation on "m_nThisNodeLevel"
COneNode4RingGraph.prototype.SetThisNodeLevel = function(nOneNodeLevel){	this.m_nThisNodeLevel = nOneNodeLevel;	};
COneNode4RingGraph.prototype.GetThisNodeLevel = function(){	return this.m_nThisNodeLevel;	};
// operation on "this.m_nThisNodeIndexInLevel"
COneNode4RingGraph.prototype.SetThisNodeIndexInLevel = function(nOneNodeIndexInLevel){	this.m_nThisNodeIndexInLevel = nOneNodeIndexInLevel;	};
// operation on "m_bIsLeafNode"
COneNode4RingGraph.prototype.SetIsLeafNode = function(bIsLeafNode){	this.m_bIsLeafNode = bIsLeafNode;	};
COneNode4RingGraph.prototype.GetIsLeafNode = function(){	return this.m_bIsLeafNode;	};
// Operation on "m_dSingleLocusTestValueScaled"
COneNode4RingGraph.prototype.SetSingleLocusTestValueScaled = function(dSingleLocusTestValueScaled)
{	this.m_dSingleLocusTestValueScaled = dSingleLocusTestValueScaled;	};
COneNode4RingGraph.prototype.GetSingleLocusTestValueScaled = function()
{	return this.m_dSingleLocusTestValueScaled;	};
// operation on "this.m_vdSingleLocusTestValueScaledMapNodeColor"
COneNode4RingGraph.prototype.SetSingleLocusTestValueScaledMapNodeColor = function(vdRGBColorValue)
{	this.m_vdSingleLocusTestValueScaledMapNodeColor = vdRGBColorValue;	};
COneNode4RingGraph.prototype.GetSingleLocusTestValueScaledMapNodeColor = function()
{	return this.m_vdSingleLocusTestValueScaledMapNodeColor;	};
COneNode4RingGraph.prototype.FormatNumberLength = function(sStrNum, length) {
    while (sStrNum.length < length) {
    	sStrNum = "0" + sStrNum;
    }
    return sStrNum;
};
COneNode4RingGraph.prototype.GetOneNodeColor = function()
{
	var sOneLeafNodeColor;
	var nColorR = Math.round(this.m_vdSingleLocusTestValueScaledMapNodeColor[0] * 255);
	var nColorG = Math.round(this.m_vdSingleLocusTestValueScaledMapNodeColor[1] * 255);
	var nColorB = Math.round(this.m_vdSingleLocusTestValueScaledMapNodeColor[2] * 255);
	var sColorRHex = nColorR.toString(16);
	sColorRHex = this.FormatNumberLength(sColorRHex, 2);
	var sColorGHex = nColorG.toString(16);
	sColorGHex = this.FormatNumberLength(sColorGHex, 2);
	var sColorBHex = nColorB.toString(16);
	sColorBHex = this.FormatNumberLength(sColorBHex, 2);
	sOneLeafNodeColor = "#" + sColorRHex + sColorGHex + sColorBHex;
	return sOneLeafNodeColor;
};
// operation on "m_nNumOfNextLevelChildren" and "m_vIdxOfNextLevelChildren".
COneNode4RingGraph.prototype.GetNumOfNextLevelChildren = function()
{
	return this.m_nNumOfNextLevelChildren;
};
COneNode4RingGraph.prototype.AddOneIdxOfNextLevelChildren = function(nIdxOfNextLevelChild)
{
	this.m_vIdxOfNextLevelChildren.push(nIdxOfNextLevelChild);
	this.m_nNumOfNextLevelChildren++;
};
COneNode4RingGraph.prototype.RemoveOneIdxOfNextLevelChild = function(nIdxInNextChildrenSet)
{
	this.m_vIdxOfNextLevelChildren.splice(nIdxInNextChildrenSet, 1); // delete one element in the Array, the begin position is at "nIdxInNextChildrenSet", and delete number is 1.
	this.m_nNumOfNextLevelChildren--;
};
COneNode4RingGraph.prototype.GetOneIdxOfNextLevelChildren = function(nIdxInNextLevelChildrenSet)
{
	return this.m_vIdxOfNextLevelChildren[nIdxInNextLevelChildrenSet];
};
// operation on "m_vDefinedByOtherLeafNodes" and "m_nNumOfDefinedByOtherLeafNodes"
COneNode4RingGraph.prototype.GetNumOfDefinedByOtherLeafNodes = function()
{
	return this.m_nNumOfDefinedByOtherLeafNodes;
};
COneNode4RingGraph.prototype.AddOneIdxOfDefinedByOtherLeafNodes = function(nIdxOfDefinedByLeafNode)
{
	this.m_vDefinedByOtherLeafNodes.push(nIdxOfDefinedByLeafNode);
	this.m_nNumOfDefinedByOtherLeafNodes++;
};
COneNode4RingGraph.prototype.RemoveOneIdxOfDefinedByOtherLeafNodes = function(nIdxInDefinedByOthrNodsSet)
{
	this.m_vDefinedByOtherLeafNodes.splice(nIdxInDefinedByOthrNodsSet, 1); // "splice" function
	this.m_nNumOfDefinedByOtherLeafNodes--;
};
COneNode4RingGraph.prototype.GetOneIdxOfDefinedByOtherLeafNodes = function(nIdxInDefinedByOthrNodsSet)
{
	return this.m_vDefinedByOtherLeafNodes[nIdxInDefinedByOthrNodsSet];
};
// Operation on "this.m_vnIndexOfNodesInLDInforEdges"
COneNode4RingGraph.prototype.AddOneNodeIndexOfLDInforEdge = function(nIdxOfAnotherNodeInOneLDInforEdge)
{
	this.m_vnIndexOfNodesInLDInforEdges.push(nIdxOfAnotherNodeInOneLDInforEdge);
	this.m_nNumOfIndexOfNodesInLDInforEdges++;
};
// Operation on "this.m_vnIndexOfNodesInLDInforEdges"
COneNode4RingGraph.prototype.AddOneWeightOfLDInforEdge = function(dLDInforEdgeValue)
{
	this.m_vdEdgeWeightOfTheLDInforEdges.push(dLDInforEdgeValue);
};
// operation on "this.m_vdDefinedByOtherLeafNodesEdgeWeight"
COneNode4RingGraph.prototype.AddOneDefinedByOtherLeafNodesEdgeWeight = function(dTwoLocusTestValue)
{
	this.m_vdDefinedByOtherLeafNodesEdgeWeight.push(dTwoLocusTestValue);
};
COneNode4RingGraph.prototype.GetOneDefinedByOtherLeafNodesEdgeWeight = function(nIdxInDefinedByOthrNodsSet)
{
	return this.m_vdDefinedByOtherLeafNodesEdgeWeight[nIdxInDefinedByOthrNodsSet];
};
// operation on "m_nIndexInLeafNodes"
COneNode4RingGraph.prototype.SetIndexInLeafNodes = function(nIdxInLeafNodes)
{
	this.m_nIndexInLeafNodes = nIdxInLeafNodes;
};
COneNode4RingGraph.prototype.GetIndexInLeafNodes = function()
{
	return this.m_nIndexInLeafNodes;
};
// operation on "m_nIndexInAllNodes"
COneNode4RingGraph.prototype.SetIndexInAllNodes = function(nIdxInAllNodes)
{
	this.m_nIndexInAllNodes = nIdxInAllNodes;
};
COneNode4RingGraph.prototype.GetIndexInAllNodes = function()
{
	return this.m_nIndexInAllNodes;
};
// operation on "m_nIndexInHumMdlAllSolParam"
COneNode4RingGraph.prototype.SetIndexInHumMdlAllSolParam = function(nIdxInHumMdlAllSolParam)
{	// the corresponding node in the "CAllSolParamsData", you can retrieve the data through "CAllSolParamsData.m_vAllSolParams[this.m_nIndexInHumMdlAllSolParam];"
	this.m_nIndexInHumMdlAllSolParam = nIdxInHumMdlAllSolParam;
};
COneNode4RingGraph.prototype.GetIndexInHumMdlAllSolParam = function()
{
	return this.m_nIndexInHumMdlAllSolParam;
};
// 20110408William to show the partial nodes, we call it in one mode.
// operation on "m_bIsThisNodeShownInThisMode"
COneNode4RingGraph.prototype.SetIsThisNodeShownInThisMode = function(bIsThisNodeShownInThisMode)
{   //
	this.m_bIsThisNodeShownInThisMode = bIsThisNodeShownInThisMode;
};
COneNode4RingGraph.prototype.GetIsThisNodeShownInThisMode = function(){	return this.m_bIsThisNodeShownInThisMode;	};
// operation on "m_bIsThisNodeLeafInThisMode"
COneNode4RingGraph.prototype.SetIsThisNodeLeafInThisMode = function(bIsThisNodeLeafInThisMode){	this.m_bIsThisNodeLeafInThisMode = bIsThisNodeLeafInThisMode;	};
COneNode4RingGraph.prototype.GetIsThisNodeLeafInThisMode = function()
{   //
	return this.m_bIsThisNodeLeafInThisMode;
};
// operation on "m_nIndexInAllNodesInThisMode"
COneNode4RingGraph.prototype.SetIndexInAllNodesInThisMode = function(nIndexInAllNodesInThisMode)
{
	this.m_nIndexInAllNodesInThisMode = nIndexInAllNodesInThisMode;
};
COneNode4RingGraph.prototype.GetIndexInAllNodesInThisMode = function()
{
	return this.m_nIndexInAllNodesInThisMode;
};
// operation on "m_nNumOfNextLevelChildrenInThisMode" and "m_vIdxOfNextLevelChildrenInThisMode"
COneNode4RingGraph.prototype.GetNumOfNextLevelChildrenInThisMode = function()
{
	return this.m_nNumOfNextLevelChildrenInThisMode;
};
COneNode4RingGraph.prototype.AddOneIdxOfNextLevelChildrenInThisMode = function(nIdxOfNextLevelChildInThisMode)
{
	this.m_vIdxOfNextLevelChildrenInThisMode.push(nIdxOfNextLevelChildInThisMode);
	this.m_nNumOfNextLevelChildrenInThisMode++;
};
COneNode4RingGraph.prototype.RemoveOneIdxOfNextLevelChildInThisMode = function(nIdxInNextChildrenSetInThisMode)
{
	this.m_vIdxOfNextLevelChildrenInThisMode.splice(nIdxInNextChildrenSetInThisMode, 1);
	this.m_nNumOfNextLevelChildrenInThisMode--;
};
COneNode4RingGraph.prototype.GetOneIdxOfNextLevelChildrenInThisMode = function(nIdxInNextLevelChildrenSetInThisMode)
{
	return this.m_vIdxOfNextLevelChildrenInThisMode[nIdxInNextLevelChildrenSetInThisMode];
};
// operation on "m_nNumOfDefinedByOtherLeafNodesInThisMode", "m_vDefinedByOtherLeafNodesLevelNum" and "m_vDefinedByOtherLeafNodesIndexInThatLevel"
COneNode4RingGraph.prototype.GetNumOfDefinedByOtherLeafNodesInThisMode = function()
{
	return this.m_nNumOfDefinedByOtherLeafNodesInThisMode;
};
// operation on "m_dInnerPointRadis"
COneNode4RingGraph.prototype.GetThisNodeInnerCircleRadius = function()
{
	return this.m_dInnerPointRadis;
};
// operation on "this.m_dCentrPointAngle"
COneNode4RingGraph.prototype.GetThisNodeCentralAngle = function()
{
	return this.m_dCentrPointAngle;
};
// operation on "this.m_dEndPointAngle"
COneNode4RingGraph.prototype.GetThisNodeEndAngle = function()
{
	return this.m_dEndPointAngle;
};
// operation on "this.m_dBgnPointAngle"
COneNode4RingGraph.prototype.GetThisNodeBgnAngle = function()
{
	return this.m_dBgnPointAngle;
};
// operation on "this.m_dInnerPointRadis"
COneNode4RingGraph.prototype.GetThisNodeInnerRadius = function(){	return this.m_dInnerPointRadis;	};
// operation on the "this.m_nIndexInAllNodes"
COneNode4RingGraph.prototype.AssignTheIndexInAllNodesToThisNode = function(nIdxInAllNodes)
{
	this.m_nIndexInAllNodes = nIdxInAllNodes;
};
// operation on "this.m_dInnerPointRadis4PartialNodes"
COneNode4RingGraph.prototype.GetThisNodeInnerPointRadis4PartialNodes = function()
{
	return this.m_dInnerPointRadis4PartialNodes;
};
// operation on "this.m_dCentrPointAngle4PartialNodes"
COneNode4RingGraph.prototype.GetThisNodeCentrPointAngle4PartialNodes = function()
{
	return this.m_dCentrPointAngle4PartialNodes;
};
// operation on "this.m_dCentrPointRadis4PartialNodes"
COneNode4RingGraph.prototype.GetThisNodeCentrPointRadis4PartialNodes = function(){	return this.m_dCentrPointRadis4PartialNodes;	};
// operation on "this.m_nIdxInLevelOfFatherNode"
COneNode4RingGraph.prototype.GetThisNodeFatherNodesIndexInLevel = function(){	return this.m_nIdxInLevelOfFatherNode;	};
COneNode4RingGraph.prototype.SetThisNodeAndItsChildrenWhetherShownInOneMode = function(bWhetherShowThisNodeAndItsChildrenNod, nVisLevelNum, aParseAndCnstrctHierTreeAndGraphData)
{
	// first, set itself
	if (this.m_nThisNodeLevel <= nVisLevelNum)
	{
		this.m_bIsThisNodeShownInThisMode = bWhetherShowThisNodeAndItsChildrenNod;
	}
	else
	{
		this.m_bIsThisNodeShownInThisMode = false;
	}
	// then set its children or grand children or ...
	for (var nIdxOfNextLvlChld = 0; nIdxOfNextLvlChld < this.m_nNumOfNextLevelChildren; nIdxOfNextLvlChld++)
	{
		var nOneIndexOfNextLevelChildren = this.m_vIdxOfNextLevelChildren[nIdxOfNextLvlChld];
		var aTmpNodeReferChild = aParseAndCnstrctHierTreeAndGraphData.GetOneNodeReference(this.m_nThisNodeLevel + 1, nOneIndexOfNextLevelChildren);
		aTmpNodeReferChild.SetThisNodeAndItsChildrenWhetherShownInOneMode(bWhetherShowThisNodeAndItsChildrenNod, nVisLevelNum, aParseAndCnstrctHierTreeAndGraphData);
	}
};
// --- 20110707William the following variable are designed to store the layout information of this node.
COneNode4RingGraph.prototype.SetBgnEndInnerOuterPointInPolar = function(dInnerPointRadis, dOuterPointRadis, dBgnPointAngle, dEndPointAngle)
{
	this.m_dInnerPointRadis = dInnerPointRadis; // the begin inner point radius of this ring sector	| Polar
	this.m_dOuterPointRadis = dOuterPointRadis; // the begin outer point radius of this ring sector	| Polar
	this.m_dBgnPointAngle   = dBgnPointAngle; // the begin inner point angle of this ring sector    | Polar
	this.m_dEndPointAngle   = dEndPointAngle; // the end inner point angle of this ring sector		| Polar
	this.m_dCentrPointAngle = (dBgnPointAngle   + dEndPointAngle) / 2; // the central point angle of this ring sector				| Polar
	this.m_dCentrPointRadis = (dInnerPointRadis + dOuterPointRadis) / 2; // the central point radius of this ring sector			| Polar
};
// --- 20111118William. Set the begin and end angle of the ring sector.
COneNode4RingGraph.prototype.SetBgnEndInnerOuterPointInPolar4PartialNodes = function(dInnerPointRadis, dOuterPointRadis, dBgnPointAngle,   dEndPointAngle)
{
	this.m_dInnerPointRadis4PartialNodes = dInnerPointRadis; // the begin inner point radius of this ring sector	| Polar
	this.m_dOuterPointRadis4PartialNodes = dOuterPointRadis; // the begin outer point radius of this ring sector	| Polar
	this.m_dBgnPointAngle4PartialNodes   = dBgnPointAngle; // the begin inner point angle of this ring sector    | Polar
	this.m_dEndPointAngle4PartialNodes   = dEndPointAngle; // the end inner point angle of this ring sector		| Polar
	this.m_dCentrPointAngle4PartialNodes = (dBgnPointAngle   + dEndPointAngle) / 2; // the central point angle of this ring sector				| Polar
	this.m_dCentrPointRadis4PartialNodes = (dInnerPointRadis + dOuterPointRadis) / 2; // the central point radius of this ring sector			| Polar
};
COneNode4RingGraph.prototype.SetItsLinealChildrenNodeLayoutInfor = function(vvAllNodes4RingGraph, dDegreeOfEachSlot, dOneLvlNodeInnerRadius, dOneLvlNodeOuterRadius)
{	// 											    "m_vvAllNodes4RingGraph" in "CAllNodes4RingGraph" class. 
	if (this.m_bIsLeafNode == false)
	{	// if it is not leaf.
		// --- 1 get the total finest children number.
		var nTotalNumOfAllFinestChildrenNodes = 0;
		var nNumOfLinealChildren = this.m_vIdxOfNextLevelChildren.length; // the number of lineal children
		var aOneLinealChldOfThisNode = new COneNode4RingGraph();
		for (var nIdxOfLinealChld = 0; nIdxOfLinealChld < nNumOfLinealChildren; nIdxOfLinealChld++)
		{
			var nIdxInNextLvlOfLinealChld = this.m_vIdxOfNextLevelChildren[nIdxOfLinealChld];
			aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfLinealChld];
			var bIsThisChildALeaf = aOneLinealChldOfThisNode.GetIsLeafNode();
			if (bIsThisChildALeaf == false)
			{
				nTotalNumOfAllFinestChildrenNodes += aOneLinealChldOfThisNode.GetThisNodeFinestLevelChildrenNum();
			}
			else	// bIsThisChildALeaf == true
			{
				nTotalNumOfAllFinestChildrenNodes += 1;
			}
		}
		// --- 2 separate the angle of the father node(this node), and then set each lineal children.
		var nNumOfSlotsBtwSector = nNumOfLinealChildren - 1;
		var dDegreeOfEachSlotOfThisLvl = dDegreeOfEachSlot;
		var dTotalDegreeOfThisSectorExceptSlots = this.m_dEndPointAngle - this.m_dBgnPointAngle - nNumOfSlotsBtwSector * dDegreeOfEachSlotOfThisLvl;
		var dOneRingSectorBgnAngle = 0.0;
		var dOneRingSectorEndAngle = 0.0;
		var dInnerRadiusOfThisLvl = dOneLvlNodeInnerRadius; // the inner circle radius of the root node level
		var dOuterRadiusOfThisLvl = dOneLvlNodeOuterRadius; // the outer circle radius of the root node level
		var aOneLinealChldNode4RingGraph = new COneNode4RingGraph();
		for (var nIdxOfLinealChld = 0; nIdxOfLinealChld < nNumOfLinealChildren; nIdxOfLinealChld++)
		{
			var nIdxInNextLvlOfLinealChld = this.m_vIdxOfNextLevelChildren[nIdxOfLinealChld];
			aOneLinealChldNode4RingGraph = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfLinealChld];
			var nThisNodeFinestLevelChildrenNum = 0;
			var bIsThisChildALeaf = aOneLinealChldNode4RingGraph.GetIsLeafNode();
			if (bIsThisChildALeaf == false)
			{
				nThisNodeFinestLevelChildrenNum = aOneLinealChldNode4RingGraph.GetThisNodeFinestLevelChildrenNum();
			}
			else	// bIsThisChildALeaf == true
			{
				nThisNodeFinestLevelChildrenNum = 1;
			}
			if (nIdxOfLinealChld == 0)
			{
				dOneRingSectorBgnAngle = this.m_dBgnPointAngle; // one root node begin degree equals to the prior's end degree plus the degree of slot.
			}
			else
			{
				dOneRingSectorBgnAngle = dOneRingSectorEndAngle + dDegreeOfEachSlot; // one root node begin degree equals to the prior's end degree plus the degree of slot.
			}
			if (nIdxOfLinealChld == (nNumOfLinealChildren - 1))
			{
				dOneRingSectorEndAngle = this.m_dEndPointAngle; 
			}
			else
			{
				dOneRingSectorEndAngle = dOneRingSectorBgnAngle + dTotalDegreeOfThisSectorExceptSlots * nThisNodeFinestLevelChildrenNum / nTotalNumOfAllFinestChildrenNodes; // need to debug, not sure it will generate correct results. int / int ??
			}
			aOneLinealChldNode4RingGraph.SetBgnEndInnerOuterPointInPolar(dInnerRadiusOfThisLvl,  dOuterRadiusOfThisLvl,
																   		 dOneRingSectorBgnAngle, dOneRingSectorEndAngle);
		}
	}
	else
	{	// if it is leaf, skip, do nothing.
	}
};
// -------- 20110717William the following is for the generation of piecewise cubic B-Spline curve edge --------
COneNode4RingGraph.prototype.ConstructThePointsSequenceAndTheBSplineCurve = function(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength)
{	// add the inner points to a set, and the point will form the path, link two leaf nodes. You must traverse the hierarchical tree to find the path.
	// this fun will traverse the hierarchical tree stored in "aAllNodes4RingGraph", and find the link between it and another leaf node in the defined by vector "m_vDefinedByOtherLeafNodes".
	// once we got the path, we can use the central angle of each node on the path and mirro radius, which can be found in "vInnerInvisibleNodesRadius", to construct one inner point in the path. Then add this point to the sequence set.
	// "vInnerInvisibleNodesRadius" store the inner mirror nodes position. the index of the element correspond to the level of in the variable "m_vvAllNodes4RingGraph", for example, vInnerInvisibleNodesRadius[0] is correspond the the radius of mirror nodes of m_vvAllNodes4RingGraph[0][i], i is a arbitrary index. vInnerInvisibleNodesRadius[1] <-> m_vvAllNodes4RingGraph[1][i], and so on.
	if (this.m_bIsLeafNode == false)
	{	// if this is not a leaf node, do nothing, just return. 
		return;
	}
	this.m_vDefinedByOtherLeafNodesEdgeInformtn = []; // 20110824William. empty this array. There is a bug.
	var nNumOfDefByElem = this.m_vDefinedByOtherLeafNodes.length;
	var vvReferenceToAllNodes4RingGraph = aAllNodes4RingGraph.m_vvAllNodes4RingGraph;
	var aOneNodeReference = new COneNode4RingGraph();
	var dHueRangeBgn = gdHueRangeBgn4EdgeColorBar; // begin from red  // 20120701William. Modify this line.
	var dHueRangeEnd = gdHueRangeEnd4EdgeColorBar; // end with green.
	for (var nIdxOfDefByElem = 0; nIdxOfDefByElem < nNumOfDefByElem; nIdxOfDefByElem++)
	{
		var nOneIndexOfNodeWhichDefineThisNode = this.m_vDefinedByOtherLeafNodes[nIdxOfDefByElem]; // the elements stored in this vecotr "m_vDefinedByOtherLeafNodes" equals to "this.m_nIndexInLeafNodes".
		var vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel = new Array();
		var vThePathsNodesListLinkTwoLeafNodeIndexOfLevel = new Array();
		aAllNodes4RingGraph.GetThePathFromOneLeafNodeToAnotherInHierTree(this.m_nIndexInLeafNodes, nOneIndexOfNodeWhichDefineThisNode, vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel);
		// so, in the above function, we get the path link the two leaf node, we need to map them to the real position list P of point, then, we can input it P to the B-Spline Curve generation function, to get the detailed B-Splien Curve.
		// Please note that, the begin and end leaf node have been added in the vector "vThePathsNodesListLinkTwoLeafNode", at the begin and end position of the vector. They need special process. I mean, not get the mirror point's radius, but use the inner circle radius as the begin and end point of the curve line.
		var vPathMirrorNodesPositnXList = new Array(); // the x coordinates in Euclidean Coordinate system, of the mirror node of this node's ancestor node.
		var vPathMirrorNodesPositnYList = new Array(); // the y coordinates in Euclidean Coordinate system, of the mirror node of this node's ancestor node.
		var nNumOfPointInTheInnerPathsNodes = vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.length;
		for (var nIdxOfPtInPath = 0; nIdxOfPtInPath < nNumOfPointInTheInnerPathsNodes; nIdxOfPtInPath++)
		{ // for each node in the path ( nodes list of the route link the two leaf node ), map it to the real position value at the inner circle.
			var nOneIndexInOneLevelOfOneNodeInPath = vThePathsNodesListLinkTwoLeafNodeIndexInOneLevel[nIdxOfPtInPath]; // one node's index in its level, the index is in the variable "m_vvAllNodes4RingGraph";
			var nOneIndexOfLevelOfOneNodeInPath    = vThePathsNodesListLinkTwoLeafNodeIndexOfLevel[nIdxOfPtInPath]; // one node's index of level, the index is in the variable "m_vvAllNodes4RingGraph";
			aOneNodeReference = vvReferenceToAllNodes4RingGraph[nOneIndexOfLevelOfOneNodeInPath][nOneIndexInOneLevelOfOneNodeInPath];
			if (nIdxOfPtInPath == 0 || nIdxOfPtInPath == (nNumOfPointInTheInnerPathsNodes - 1))
			{	// the begin and end point need special processing, the point is (inner circle radius, central angle).
				var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentralAngle(); // one mirror node's central angle
				var dOneMirrorNodeInnerCircleRadius = aOneNodeReference.GetThisNodeInnerCircleRadius(); // one mirror node's radius value.
				var dOneMirrorNodePosX = dOneMirrorNodeInnerCircleRadius * Math.cos( dOneMirrorNodeCentralAngle); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
				var dOneMirrorNodePosY = dOneMirrorNodeInnerCircleRadius * Math.sin( dOneMirrorNodeCentralAngle); 
				vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
				vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.
			}
			else
			{	// the point not at begin or end need common processing, the point is (central circle radius, central angle).
				var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentralAngle(); // one mirror node's central angle
				var dOneMirrorNodeRadius = vInnerInvisibleNodesRadius[nOneIndexOfLevelOfOneNodeInPath]; // one mirror node's radius value.
				var dOneMirrorNodePosX = dOneMirrorNodeRadius * Math.cos( dOneMirrorNodeCentralAngle); // in my impression, I remember that the radius is negative, since the y direction is from up to down.
				var dOneMirrorNodePosY = dOneMirrorNodeRadius * Math.sin( dOneMirrorNodeCentralAngle); 
				vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
				vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.					
			}
		}
		// ConstructTheBSplineCurveBasedOnThePointsSequence() is here, William did not want to store the temporary inner mirror points, he just want to store the final interpolate points of the B-Spline curve.
		// I move the code for the generation of cubic B-Spline curve to a independent class. So here may look more clear.
		var aOneEdge4RingGraph = new COneEdge4RingGraph(); // 20110912William. This is a new instance, which will be pushed into the Array later, it is not a reference.
		aOneEdge4RingGraph.SetTheListOfControlPointCoordsX(vPathMirrorNodesPositnXList);
		aOneEdge4RingGraph.SetTheListOfControlPointCoordsY(vPathMirrorNodesPositnYList);
		aOneEdge4RingGraph.AdjustTheBundlingStrengthToTheControlPoints(dTreeRingViewBundleStrength); // 20110719William, set Beta Value, the "Bundling Strength".
		aOneEdge4RingGraph.CalculateTheCubicBSplineAccordingToControlPointUseDeBoorAlgorithm();
		var dTwoLocusTestValue = this.m_vdDefinedByOtherLeafNodesEdgeWeight[nIdxOfDefByElem];
		var vdRGBColorValue = new Array(3);
		if (gnIndexOfColorScheme4EdgesColor == 12)
		{ // "12" continuous red to green color bar.
			aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dTwoLocusTestValue, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
		}
		else
		{ // "0~11" discrete color bar from ColorBrewer.
			aAllNodes4RingGraph.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dTwoLocusTestValue, gnIndexOfColorScheme4EdgesColor);
		}
		var dColorR = vdRGBColorValue[0];
		var dColorG = vdRGBColorValue[1];
		var dColorB = vdRGBColorValue[2];
		var nColorR = Math.round(dColorR * 255);
		var nColorG = Math.round(dColorG * 255);
		var nColorB = Math.round(dColorB * 255);
		var sColorRGB = "rgb(" + nColorR + ", " + nColorG + "," + nColorB + ")";
		aOneEdge4RingGraph.SetEdgeColorMappedFromTwoLocusTestValue(sColorRGB);
		this.m_vDefinedByOtherLeafNodesEdgeInformtn.push(aOneEdge4RingGraph);
	}
	// the following code want to traverse the tree to find the ancestor nodes list of each leaf nodes in the nodes pair, which form the edge.
	// but the two leaf nodes may belong to one same ancestor node, then there will be lack of some efficiency.
};
// 20110821William. We need to initialize the variabels storing the "defining and defined by" relations.
COneNode4RingGraph.prototype.InitializeDefinedByArraysByRawDefRltnVar = function(aAllNodes4RingGraph)
{	// this fun only initialize the defined by relationship variables "Def 03 04", by use of the raw def ralation variable.
	// 1. Add the Two Locus Test edges.
	for (var nIdxDefinedBy = 0; nIdxDefinedBy < this.m_nNumOfDefinedByOtherLeafNodes; nIdxDefinedBy++)
	{
		var nOneIndexOfDefinedByOtherLeafNodes = this.m_vDefinedByOtherLeafNodes[nIdxDefinedBy];
		var aOneDefByNodeInfor = [];
		aOneDefByNodeInfor[0] = 0; // nIdxOfLevel ; "nOneDefByNodeLvlNum"
		aOneDefByNodeInfor[1] = 0; // nIdxInOneLevel ; "nOneDefByNodeIdxInOneLvl"
		aAllNodes4RingGraph.FindOneNodeIndexInWhichEachLvlInWhichIndexUseIndexOfDefByChld(nOneIndexOfDefinedByOtherLeafNodes, aOneDefByNodeInfor);
		// get on defined by relationship node, add to variables "Def 03 04" and store them.
		this.m_vDefinedByOtherLeafNodesLevelNum.push(aOneDefByNodeInfor[0]);
		this.m_vDefinedByOtherLeafNodesIndexInThatLevel.push(aOneDefByNodeInfor[1]);
	}
	// 2. Add the LD Information edges.
	for (var nIdxLDEdge = 0; nIdxLDEdge < this.m_nNumOfIndexOfNodesInLDInforEdges; nIdxLDEdge++)
	{
		var nOneIndexOfNodeInLDEdge = this.m_vnIndexOfNodesInLDInforEdges[nIdxLDEdge];
		var aOneNodeInfor4LDEdge = [];
		aOneNodeInfor4LDEdge[0] = 0; // nIdxOfLevel ; "nOneDefByNodeLvlNum"
		aOneNodeInfor4LDEdge[1] = 0; // nIdxInOneLevel ; "nOneDefByNodeIdxInOneLvl"
		aAllNodes4RingGraph.FindOneNodeIndexInWhichEachLvlInWhichIndexUseIndexOfDefByChld(nOneIndexOfNodeInLDEdge, aOneNodeInfor4LDEdge);
		this.m_vnLDEdgeAnotherEndNodeLevelNum.push(aOneNodeInfor4LDEdge[0]);
		this.m_vnLDEdgeAnotherEndNodeIndexInThatLevel.push(aOneNodeInfor4LDEdge[1]);
	}
};
COneNode4RingGraph.prototype.FindIsThisNodesDefBySetConstainOneNodeLeafIndex = function(nThisNodeIndexInLeafNodes)
{	// find whether this node's defined by set contains one node's index "nThisNodeIndexInLeafNodes" in leaf nodes.
	// "nThisNodeIndexInLeafNodes" is one node's index in leaf nodes.
	// the return value is whether it contains. "true" contain; "false" not contain.
	var bIsThisLeafNodeDefSetContain = false;
	for (var nIdxDefinedBy = 0; nIdxDefinedBy < this.m_nNumOfDefinedByOtherLeafNodes; nIdxDefinedBy++)
	{
		var nOneIndexOfDefinedByOtherLeafNodes = this.m_vDefinedByOtherLeafNodes[nIdxDefinedBy];
		if (nOneIndexOfDefinedByOtherLeafNodes == nThisNodeIndexInLeafNodes)
		{
			bIsThisLeafNodeDefSetContain = true;
			break;
		}
	}
	return bIsThisLeafNodeDefSetContain;
};
COneNode4RingGraph.prototype.AddOneDefiningNodeInfor = function(nDefiningNodeIdxOfLvl, nDefiningNodeIdxInLvl) // 20110821William.
{	// add one defineing node information to the "Def06 07" variables.
	// "nDefiningNodeIdxOfLvl" is the index of level, of the node who is defined by this node.
	// "nDefiningNodeIdxInLvl" is the index in that level, of the node who is defined by this node.
	this.m_nvDefiningOtherLeafNodesLevelNum.push(nDefiningNodeIdxOfLvl);
	this.m_nvDefiningOtherLeafNodesIndexInThatLevel.push(nDefiningNodeIdxInLvl);
	this.m_nNumOfDefiningOtherLeafNodes++;
};
// 20111018William. begin to implement the algorithm for "Orthogonal Graph Layout"
COneNode4RingGraph.prototype.GetNumOfDefByRelationInLeafNodesLevelByThisNode = function(vvAllNodes4RingGraph, aOneAddedRootNode, nNumOfDefByAnotherNode)
{	// get the number of defined by relationship (in the finest level, the leaf nodes level) by this node (input node reference).
	// "vvAllNodes4RingGraph" is a reference to the array of all nodes set. We can retrieve any node by use of this variable.
	// "this" is one node A; "aOneAddedRootNode" is another node B.
	// This function will find the number of relation between A and B, just A.A1.A11 is defined by B.B1.B12, no counting the defining relationship.
	// This function will implement a more general function. Right now, both "this" node and another node "aOneAddedRootNode" are root node.
	// We will implement it, so it can realize that even when one or both of them are leaf node, it can also return correct result.
	// " nNumOfDefByAnotherNode " count the number of defined by relationship; 
	if (this.m_bIsLeafNode == true)
	{	// only leaf node can have defined by / defining other nodes relationship.
		var nNumOfDefByNodes = this.m_vDefinedByOtherLeafNodesLevelNum.length;
		for (var nIdxOfDefBy = 0; nIdxOfDefBy < nNumOfDefByNodes; nIdxOfDefBy++)
		{
			var nDefByNodeLvlNum = this.m_vDefinedByOtherLeafNodesLevelNum[nIdxOfDefBy];
			var nDefByNodeIdxInLvl = this.m_vDefinedByOtherLeafNodesIndexInThatLevel[nIdxOfDefBy];
			// "nDefByNodeLvlNum" and "nDefByNodeIdxInLvl" can decide one node, this node defines "this" node.
			var bIsThisNodeItsChildNode = aOneAddedRootNode.FindIsThisLeafNodeItsChildNode(vvAllNodes4RingGraph, nDefByNodeLvlNum, nDefByNodeIdxInLvl); // "true", yes, it is its childe node; "false", no, it is not its child node.
			if (bIsThisNodeItsChildNode == true)
			{
				nNumOfDefByAnotherNode++;
			}
		}
	}
	else
	{	// if it is not leaf node, call its children nodes' function, do iteration.
		for (var nIdxChld = 0; nIdxChld < this.m_nNumOfNextLevelChildren; nIdxChld++)
		{	// for each child.
			var nIdxInNextLvl = this.m_vIdxOfNextLevelChildren[nIdxChld];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvl]; // get the reference of one child node.
			nNumOfDefByAnotherNode = aOneChildNodeRefer.GetNumOfDefByRelationInLeafNodesLevelByThisNode(vvAllNodes4RingGraph, aOneAddedRootNode, nNumOfDefByAnotherNode);
		}
	}
	return nNumOfDefByAnotherNode;
};

// this function is called by the above function "GetNumOfDefByRelationInLeafNodesLevelByThisNode".
COneNode4RingGraph.prototype.FindIsThisLeafNodeItsChildNode = function(vvAllNodes4RingGraph, nDefByNodeLvlNum, nDefByNodeIdxInLvl)
{	// "vvAllNodes4RingGraph" is a reference to the array of all nodes set. We can retrieve any node by use of this variable.
	// "nDefByNodeLvlNum" and "nDefByNodeIdxInLvl" can decide one node, this node defines "this" node.
	var bIsThisNodeItsChildNode = false; // "true", yes, it is its childe node; "false", no, it is not its child node.
	if (this.m_bIsLeafNode == true)
	{	// if this node is a leaf node.
		if (this.m_nThisNodeLevel == nDefByNodeLvlNum && this.m_nThisNodeIndexInLevel == nDefByNodeIdxInLvl)
		{	// if this node has the same index of level and index in level, then the two nodes are the same.
			bIsThisNodeItsChildNode = true;
		}
	}
	else
	{	// if it is not leaf node, call its children nodes' function, do iteration.
		for (var nIdxChld = 0; nIdxChld < this.m_nNumOfNextLevelChildren; nIdxChld++)
		{	// for each child.
			var nIdxInNextLvl = this.m_vIdxOfNextLevelChildren[nIdxChld];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvl]; // get the reference of one child node.
			bIsThisNodeItsChildNode = aOneChildNodeRefer.FindIsThisLeafNodeItsChildNode(vvAllNodes4RingGraph, nDefByNodeLvlNum, nDefByNodeIdxInLvl);
			if (bIsThisNodeItsChildNode == true)
			{	// if we have found that the input node is one of its child. Break this for loop, and return.
				break;
			}
		}
	}
	return bIsThisNodeItsChildNode;
};

// the following fun is for the sorting of children nodes, (the children nodes of root node)
COneNode4RingGraph.prototype.ComputeRowHghInForwardOrderAndColWdhInBckwardOrderNatrualPos = function(vvAllNodes4RingGraph)
{	// 20120707. Change the nodes order to natrual position of SNPs on chromosome, modified from function "ComputeRowHghInForwardOrderAndColWdhInBckwardOrder".
	if (this.m_bIsLeafNode == true)
	{	// if this node is leaf node
		return; // do nothing, just return. Leaf node does not need sorting.
	}
	else
	{	// if this node is not leaf node. I mean it has child nodes.
		for (var nIdxOfChildNode = 0; nIdxOfChildNode < this.m_nNumOfNextLevelChildren; nIdxOfChildNode++)
		{
			this.m_vnChildNodesOrderIdxRowHgh[nIdxOfChildNode] = nIdxOfChildNode;
			this.m_vnChildNodesOrderIdxColWdh[nIdxOfChildNode] = nIdxOfChildNode;
		}
		// The following code snippet will call this fun iteratively, to sort each child node's child nodes.
		for (var nIdxOfChildNode = 0; nIdxOfChildNode < this.m_nNumOfNextLevelChildren; nIdxOfChildNode++)
		{
			var nOneNewChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxOfChildNode];
			var aOneNewChildNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneNewChildNodeIdxInLvl]; // get the reference of one child node, we preparing to add it to the sorted array "this.m_vnChildNodesOrderIdxRowHgh".
			aOneNewChildNode.ComputeRowHghInForwardOrderAndColWdhInBckwardOrderNatrualPos(vvAllNodes4RingGraph);
		}
	}
};

COneNode4RingGraph.prototype.GetMaxLengthOfAllNodesStringName = function(nNameStringMaxLength, nLftTopLabelsFontAndSquareSize, sFatherNodeName, vvAllNodes4RingGraph)
{	// get the maximum length of all nodes' string name
	// "nNameStringMaxLength" is the maximum length of all nodes' one dot name string.
	// "nLftTopLabelsFontAndSquareSize" is the font size of all nodes' name string.
	// "sFatherNodeName" is father node's name
	// "vvAllNodes4RingGraph" is used to retrieve an arbitrary node (child node).
	if (this.m_bIsLeafNode == true)
	{	// if it is leaf node.
		var sOneDotName = sFatherNodeName + "." + this.m_sThisNodeName;
		var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView]; // 20120705. This line and the following line can not be delete, oherwise, error occurs. Even though, Eclipse gives and warning, said "aOneCanvasRefer" is never read.
		var aOneCanvasRefer = aOneCanvasRefer.m_aCanvasContext; // get a canvas context, whatever canvas.
		aOneCanvasRefer.font = nLftTopLabelsFontAndSquareSize + 'px Arial';
		var vTextWidthAndHeight = aOneCanvasRefer.measureText(sOneDotName); // "nTextWidthAndHeight.width  .height"
		var nTextWidth = vTextWidthAndHeight.width;
		if (nNameStringMaxLength < nTextWidth)
		{
			nNameStringMaxLength = nTextWidth;
		}
	}
	else
	{	// if it is not leaf node.
		for (var nIdxChildNode = 0; nIdxChildNode < this.m_nNumOfNextLevelChildren; nIdxChildNode++)
		{
			var nOneChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxChildNode];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildNodeIdxInLvl];
			nNameStringMaxLength = aOneChildNodeRefer.GetMaxLengthOfAllNodesStringName(
					nNameStringMaxLength, nLftTopLabelsFontAndSquareSize, this.m_sThisNodeName, vvAllNodes4RingGraph);
		}
	}
	return nNameStringMaxLength;
};

COneNode4RingGraph.prototype.GetNumOfAllLeafNodes = function(nNumOfAllLeafNodes, vvAllNodes4RingGraph)
{	// get total number of leaf nodes.
	// "nNumOfAllLeafNodes" is the total number of all leaf nodes.
	// "vvAllNodes4RingGraph" is used to retrieve an arbitrary node (child node).
	if (this.m_bIsLeafNode == true)
	{	// if it is leaf node.
		nNumOfAllLeafNodes++;
	}
	else
	{	// if it is not leaf node.
		for (var nIdxChildNode = 0; nIdxChildNode < this.m_nNumOfNextLevelChildren; nIdxChildNode++)
		{
			var nOneChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxChildNode];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildNodeIdxInLvl];
			nNumOfAllLeafNodes = aOneChildNodeRefer.GetNumOfAllLeafNodes(nNumOfAllLeafNodes, vvAllNodes4RingGraph);
		}
	}
	return nNumOfAllLeafNodes;
};
// render the text label on left side
COneNode4RingGraph.prototype.RenderTextLabelOnLeftSide = function(vvAllNodes4RingGraph, nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, sFatherNodeName, nIdxInAllLeafNodes, aOneCanvasContext, 
		nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, nLftMarginLeafNodeBgnIdx, nLftMarginLeafNodeEndIdx)
{
	if (this.m_bIsLeafNode == true)
	{	// if it is leaf node.
		if (nIdxInAllLeafNodes >= nLftMarginLeafNodeBgnIdx
		 && nIdxInAllLeafNodes <= nLftMarginLeafNodeEndIdx)
		{
			// 20120707. Render rectangle with single locus test value mapped color.
			aOneCanvasContext.beginPath();
			aOneCanvasContext.fillStyle = this.GetOneNodeColor();
			var nRectCoordsX = nLftMarginWdh;
			var nRectCoordsY = nTopMarginHgh + nTopLabelsMaxHeght + nGapBtwnLabelsSquares
							 + (nIdxInAllLeafNodes - nLftMarginLeafNodeBgnIdx) * nLftTopLabelsFontAndSquareSize
							 + (nIdxInAllLeafNodes - nLftMarginLeafNodeBgnIdx) * nGapBtwnLabelsSquares;
			var nRectWidth = nLftLabelsMaxWidth;
			var nRectHeght = nLftTopLabelsFontAndSquareSize;
			aOneCanvasContext.fillRect(nRectCoordsX, nRectCoordsY, nRectWidth, nRectHeght);
			// Begin to render the text name of this leaf node
			var sOneDotName = sFatherNodeName + "." + this.m_sThisNodeName;
			var nOneLabelBasePtWdhX = nLftMarginWdh + nLftLabelsMaxWidth;
			var nOneLabelBasePtHghY = nTopMarginHgh + nTopLabelsMaxHeght + nGapBtwnLabelsSquares
									+ (nIdxInAllLeafNodes - nLftMarginLeafNodeBgnIdx) * nLftTopLabelsFontAndSquareSize
									+ (nIdxInAllLeafNodes - nLftMarginLeafNodeBgnIdx) * nGapBtwnLabelsSquares - 1;
			aOneCanvasContext.fillStyle    = "blue";
			aOneCanvasContext.textBaseline = "hanging"; // "top"
			aOneCanvasContext.font = nLftTopLabelsFontAndSquareSize + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
			aOneCanvasContext.save();
			aOneCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
			aOneCanvasContext.textAlign = "right";
			aOneCanvasContext.fillText(sOneDotName, 0, 0);
			aOneCanvasContext.restore();

		}
		nIdxInAllLeafNodes++;
	}
	else
	{	// if it is not leaf node.
		for (var nIdxChildNode = 0; nIdxChildNode < this.m_nNumOfNextLevelChildren; nIdxChildNode++)
		{
			if (nIdxInAllLeafNodes > nLftMarginLeafNodeEndIdx)
			{	// small than "this.m_nLftMarginLeafNodeBgnIdx" still need to run. larger than "" do not need to run.
				break;
			}
			var nIdxInOrderRowHgh = this.m_vnChildNodesOrderIdxRowHgh[nIdxChildNode]; // follow the order.
			var nOneChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxInOrderRowHgh];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildNodeIdxInLvl];
			nIdxInAllLeafNodes = aOneChildNodeRefer.RenderTextLabelOnLeftSide(vvAllNodes4RingGraph, 
					nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, this.m_sThisNodeName, nIdxInAllLeafNodes, aOneCanvasContext, 
					nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh,
					nLftMarginLeafNodeBgnIdx, nLftMarginLeafNodeEndIdx);
		}
	}
	return nIdxInAllLeafNodes;
};
// render the text label on top side
COneNode4RingGraph.prototype.RenderTextLabelOnToppSide = function(vvAllNodes4RingGraph, 
		nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, sFatherNodeName, nIdxInAllLeafNodes, aOneCanvasContext, 
		nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh,
		nTopMarginLeafNodeBgnIdx, nTopMarginLeafNodeEndIdx)
{
	if (this.m_bIsLeafNode == true)
	{	// if it is leaf node.
		if (nIdxInAllLeafNodes >= nTopMarginLeafNodeBgnIdx
		 && nIdxInAllLeafNodes <= nTopMarginLeafNodeEndIdx)
		{
			// 20120707. Render rectangle with single locus test value mapped color.
			aOneCanvasContext.beginPath();
			aOneCanvasContext.fillStyle = this.GetOneNodeColor();
			var nRectCoordsX = nLftMarginWdh + nLftLabelsMaxWidth + nGapBtwnLabelsSquares
							 + (nIdxInAllLeafNodes - nTopMarginLeafNodeBgnIdx) * nLftTopLabelsFontAndSquareSize
							 + (nIdxInAllLeafNodes - nTopMarginLeafNodeBgnIdx) * nGapBtwnLabelsSquares
			var nRectCoordsY = nTopMarginHgh;
			var nRectWidth = nLftTopLabelsFontAndSquareSize;
			var nRectHeght = nTopLabelsMaxHeght;
			aOneCanvasContext.fillRect(nRectCoordsX, nRectCoordsY, nRectWidth, nRectHeght);
			// Begin to render the text name of this leaf node
			var sOneDotName = sFatherNodeName + "." + this.m_sThisNodeName;
			var nOneLabelBasePtWdhX = nLftMarginWdh + nLftLabelsMaxWidth + nGapBtwnLabelsSquares
									+ (nIdxInAllLeafNodes - nTopMarginLeafNodeBgnIdx) * nLftTopLabelsFontAndSquareSize
									+ (nIdxInAllLeafNodes - nTopMarginLeafNodeBgnIdx) * nGapBtwnLabelsSquares - 1;
			var nOneLabelBasePtHghY = nTopMarginHgh + nTopLabelsMaxHeght;
			aOneCanvasContext.fillStyle    = "blue";
			aOneCanvasContext.textBaseline = "hanging"; // "top"
			aOneCanvasContext.font = nLftTopLabelsFontAndSquareSize + "px Arial"; // "pt Arial" or "px Arial" // 10px is good enough.
			aOneCanvasContext.save();
			aOneCanvasContext.translate(nOneLabelBasePtWdhX, nOneLabelBasePtHghY);
			aOneCanvasContext.rotate( 3 * Math.PI / 2 ); // "7 * 2 * Math.PI / 8" skew
			aOneCanvasContext.textAlign = "left";
			aOneCanvasContext.fillText(sOneDotName, 0, 0);
			aOneCanvasContext.restore();
		}
		nIdxInAllLeafNodes++;
	}
	else
	{	// if it is not leaf node.
		for (var nIdxChildNode = 0; nIdxChildNode < this.m_nNumOfNextLevelChildren; nIdxChildNode++)
		{
			if (nIdxInAllLeafNodes > nTopMarginLeafNodeEndIdx)
			{	// small than "this.m_nTopMarginLeafNodeBgnIdx" still need to run. larger than "" do not need to run.
				break;
			}
			var nIdxInOrderColWdh = this.m_vnChildNodesOrderIdxColWdh[nIdxChildNode]; // follow the order.
			var nOneChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxInOrderColWdh];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildNodeIdxInLvl];
			nIdxInAllLeafNodes = aOneChildNodeRefer.RenderTextLabelOnToppSide(vvAllNodes4RingGraph, 
					nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, this.m_sThisNodeName, nIdxInAllLeafNodes, aOneCanvasContext, 
					nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh,
					nTopMarginLeafNodeBgnIdx, nTopMarginLeafNodeEndIdx);
		}
	}
	return nIdxInAllLeafNodes;
};
// render the text label on left side
COneNode4RingGraph.prototype.RenderSquaresInMatrixView = function(aOneCanvasContext, nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, 
		nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, nIdxInAllLeafNodes, nLftMarginLeafNodeBgnIdx, nLftMarginLeafNodeEndIdx)
{	// "aAllNodes4RingGraph" is a global variable, you can visit it always.
	if (this.m_bIsLeafNode == true)
	{	// if it is leaf node.
		if (nIdxInAllLeafNodes >= nLftMarginLeafNodeBgnIdx
		 && nIdxInAllLeafNodes <= nLftMarginLeafNodeEndIdx)
		{
			var nOneSquareLftTopBasePtHghY = nLftMarginWdh + nLftLabelsMaxWidth + nGapBtwnLabelsSquares
										   + (nIdxInAllLeafNodes - nLftMarginLeafNodeBgnIdx) * nLftTopLabelsFontAndSquareSize
										   + (nIdxInAllLeafNodes - nLftMarginLeafNodeBgnIdx) * nGapBtwnLabelsSquares;
			aAllNodes4RingGraph.RenderSquaresInMatrixViewColWdhInnerFun(aOneCanvasContext, this, nOneSquareLftTopBasePtHghY, nLftMarginWdh, nTopMarginHgh);
		}
		nIdxInAllLeafNodes++;
	}
	else
	{	// if it is not leaf node.
		for (var nIdxChildNode = 0; nIdxChildNode < this.m_nNumOfNextLevelChildren; nIdxChildNode++)
		{
			if (nIdxInAllLeafNodes > nLftMarginLeafNodeEndIdx)
			{	// small than "this.m_nLftMarginLeafNodeBgnIdx" still need to run. larger than "" do not need to run.
				break;
			}
			var nIdxInOrderRowHgh = this.m_vnChildNodesOrderIdxRowHgh[nIdxChildNode]; // follow the order.
			var nOneChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxInOrderRowHgh];
			var aOneChildNodeRefer = aAllNodes4RingGraph.m_vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildNodeIdxInLvl];
			nIdxInAllLeafNodes = aOneChildNodeRefer.RenderSquaresInMatrixView(aOneCanvasContext, nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, 
										nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, nIdxInAllLeafNodes, nLftMarginLeafNodeBgnIdx, nLftMarginLeafNodeEndIdx);
		}
	}
	return nIdxInAllLeafNodes;
};
// the inner loop functions.
COneNode4RingGraph.prototype.RenderSquaresInMatrixViewColWdhInnerFun2 = function(aOneCanvasContext,
		nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, 
		nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, 
		nIdxInAllLeafNodesColWdh, aOneLeafNode, nOneSquareLftTopBasePtHghY,
		nTopMarginLeafNodeBgnIdx, nTopMarginLeafNodeEndIdx)
{
	if (this.m_bIsLeafNode == true)
	{	// if it is leaf node.
		if (nIdxInAllLeafNodesColWdh >= nTopMarginLeafNodeBgnIdx
		 && nIdxInAllLeafNodesColWdh <= nTopMarginLeafNodeEndIdx)
		{
			var nOneSquareLftTopBasePtWdhX = nLftMarginWdh + nLftLabelsMaxWidth + nGapBtwnLabelsSquares
										   + (nIdxInAllLeafNodesColWdh - nTopMarginLeafNodeBgnIdx) * nLftTopLabelsFontAndSquareSize
										   + (nIdxInAllLeafNodesColWdh - nTopMarginLeafNodeBgnIdx) * nGapBtwnLabelsSquares;
			var vsEdgeColors = new Array(2);
			var nTypeOfTwoLeafNode = this.GetThisNodeAndAnotherNodeRelationType(aOneLeafNode, vsEdgeColors);
			// we need to define a color shema for the relationship between two nodes.
			switch (nTypeOfTwoLeafNode)
			{
			case 1: // "1" the two nodes are the same node.
				aOneCanvasContext.fillStyle = "rgb(204,204,204)"; // grey
				break;
			case 2: // "2" B is defined by A;
//				aOneCanvasContext.fillStyle = "rgb(186,228,188)"; // 
				aOneCanvasContext.fillStyle = vsEdgeColors[1]; // vsEdgeColors[0] and vsEdgeColors[1] should be same.
				break;
			case 3: // "3" A is defined by B;
//				aOneCanvasContext.fillStyle = "rgb(23,204,196)"; // 
				aOneCanvasContext.fillStyle = vsEdgeColors[0];
				break;
			case 4:	// "4" B is defined by A, and A is defined by B;
//				aOneCanvasContext.fillStyle = "rgb(43,140,190)"; // dark blue
				aOneCanvasContext.fillStyle = vsEdgeColors[0];
				break;
			case 5: // "5" there is no definition relationship between A and B.
				aOneCanvasContext.fillStyle = "rgb(204,204,204)"; // grey
				break;
			}
			aOneCanvasContext.fillRect(nOneSquareLftTopBasePtWdhX, nOneSquareLftTopBasePtHghY, nLftTopLabelsFontAndSquareSize, nLftTopLabelsFontAndSquareSize);
		}
		nIdxInAllLeafNodesColWdh++;
	}
	else
	{	// if it is not leaf node.
		for (var nIdxChildNode = 0; nIdxChildNode < this.m_nNumOfNextLevelChildren; nIdxChildNode++)
		{
			if (nIdxInAllLeafNodesColWdh > nTopMarginLeafNodeEndIdx)
			{	// small than "this.m_nTopMarginLeafNodeBgnIdx" still need to run. larger than "" do not need to run.
				break;
			}
			var nIdxInOrderColWdh = this.m_vnChildNodesOrderIdxColWdh[nIdxChildNode]; // follow the order.
			var nOneChildNodeIdxInLvl = this.m_vIdxOfNextLevelChildren[nIdxInOrderColWdh];
			var aOneChildNodeRefer = aAllNodes4RingGraph.m_vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildNodeIdxInLvl];
			nIdxInAllLeafNodesColWdh = aOneChildNodeRefer.RenderSquaresInMatrixViewColWdhInnerFun2(aOneCanvasContext,
											nLftTopLabelsFontAndSquareSize, nGapBtwnLabelsSquares, 
											nLftLabelsMaxWidth, nTopLabelsMaxHeght, nLftMarginWdh, nTopMarginHgh, 
											nIdxInAllLeafNodesColWdh, aOneLeafNode, nOneSquareLftTopBasePtHghY,
											nTopMarginLeafNodeBgnIdx, nTopMarginLeafNodeEndIdx);
		}
	}
	return nIdxInAllLeafNodesColWdh;
};

COneNode4RingGraph.prototype.GetThisNodeAndAnotherNodeRelationType = function(aOneLeafNode, vsEdgeColor)
{	// find the relationship between this node "A" and another node "aOneLeafNode" "B".
	// "vsEdgeColor" is one array with only two elements, 20120707William add it.
	var nTypeOfTwoLeafNode = 0;
	// "0" default value
	// "1" the two nodes are the same node.
	// "2" B is defined by A;
	// "3" A is defined by B;
	// "4" B is defined by A, and A is defined by B;
	// "5" there is no definition relationship between A and B.
	var nBNodeLevel = aOneLeafNode.m_nThisNodeLevel;
	var nBNodeIndexInLevel = aOneLeafNode.m_nThisNodeIndexInLevel;
	if (this.m_nThisNodeLevel == nBNodeLevel
	 && this.m_nThisNodeIndexInLevel == nBNodeIndexInLevel)
	{	// if this node is the input node.
		nTypeOfTwoLeafNode = 1;
	}
	else
	{	// if they are not the same node.
		var bIsADefinedByB = false; // the flag of whether A is defined by B;
		var bIsBDefinedByA = false; // the flag of whether B is defined by A;
		// --- first,  judge that whether A is defined by B;
		var nADefByNum = this.m_nNumOfDefinedByOtherLeafNodes;
		for (var nIdxDefBy = 0; nIdxDefBy < nADefByNum; nIdxDefBy++)
		{
			var nOneDefByNodeLvl = this.m_vDefinedByOtherLeafNodesLevelNum[nIdxDefBy];
			var nOneDefByNodeIdxInLvl = this.m_vDefinedByOtherLeafNodesIndexInThatLevel[nIdxDefBy];
			if (nOneDefByNodeLvl == nBNodeLevel
			 && nOneDefByNodeIdxInLvl == nBNodeIndexInLevel)
			{
				bIsADefinedByB = true;
				var aOneEdgeInformtn = this.m_vDefinedByOtherLeafNodesEdgeInformtn[nIdxDefBy];
				vsEdgeColor[0] = aOneEdgeInformtn.GetEdgeColorMappedFromTwoLocusTestValue();
				break;
			}
		}
		// --- second, judge that whether B is defined by A;
		var nBDefByNum = aOneLeafNode.m_nNumOfDefinedByOtherLeafNodes;
		for (var nIdxDefBy = 0; nIdxDefBy < nBDefByNum; nIdxDefBy++)
		{
			var nOneDefByNodeLvl = aOneLeafNode.m_vDefinedByOtherLeafNodesLevelNum[nIdxDefBy];
			var nOneDefByNodeIdxInLvl = aOneLeafNode.m_vDefinedByOtherLeafNodesIndexInThatLevel[nIdxDefBy];
			if (nOneDefByNodeLvl == this.m_nThisNodeLevel
			 && nOneDefByNodeIdxInLvl == this.m_nThisNodeIndexInLevel)
			{
				bIsBDefinedByA = true;
				var aOneEdgeInformtn = aOneLeafNode.m_vDefinedByOtherLeafNodesEdgeInformtn[nIdxDefBy];
				vsEdgeColor[1] = aOneEdgeInformtn.GetEdgeColorMappedFromTwoLocusTestValue();
				break;
			}
		}
		// set up the type of relationship "nTypeOfTwoLeafNode", according to the above two flags.
		if (bIsADefinedByB == true && bIsBDefinedByA == true)
		{	// B is defined by A, and A is defined by B;
			nTypeOfTwoLeafNode = 4;
		}
		else if (bIsADefinedByB == false && bIsBDefinedByA == true)
		{	// B is defined by A;
			nTypeOfTwoLeafNode = 2;
		}
		else if (bIsADefinedByB == true && bIsBDefinedByA == false)
		{	// A is defined by B;
			nTypeOfTwoLeafNode = 3;
		}
		else if (bIsADefinedByB == false && bIsBDefinedByA == false)
		{
			nTypeOfTwoLeafNode = 5;
		}
	}
	return nTypeOfTwoLeafNode;
};

// 20111117William. To render the Tree-Ring View.
COneNode4RingGraph.prototype.CountTheFinestLevelChildrenNodesInPartialNodes = function(vvAllNodes4RingGraph)
{	// this function is a recursive function. It will count the number of nodes in the finest level in the partial nodes mode.
	var nNumOfFinestLvlChildNodes = 0; // the number of children nodes in the finest level.
	if (this.m_bIsLeafNode == false)
	{	// "this.m_bIsLeafNode" is the flag of real leaf node.
		if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
		 && this.m_bIsAtLeastOneChildShownInPartialNodes == true)
		{
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				var nNumOfFinestLvlChildNodesOfOneChild = 
					aOneLinealChldOfThisNode.CountTheFinestLevelChildrenNodesInPartialNodes(vvAllNodes4RingGraph);
				nNumOfFinestLvlChildNodes += nNumOfFinestLvlChildNodesOfOneChild;
			}
			this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = nNumOfFinestLvlChildNodes; // the number of children nodes in the finest level in this mode.
		}
		else if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
			  && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
		{	// if this node is shown in partial nodes, but no child nodes are shown in partial nodes.
			this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = 1;
			nNumOfFinestLvlChildNodes = 1;
		}
		else if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == false
			  && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
		{
			this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = 0;
			nNumOfFinestLvlChildNodes = 0;
		}
		// this.m_bShowOrNotShowThisNodeInPartialNodesMode == false
		//   && this.m_bIsAtLeastOneChildShownInPartialNodes == true
		// this condition will never happen. This node is not shown in this mode,
		// but at least one of its children nodes are shown in this partial nodes.
	}
	else if (this.m_bIsLeafNode == true)
	{	// if this node is a real leaf node
		// "this.m_bIsAtLeastOneChildShownInPartialNodes == false" must be right, since it does not have children.
		// "this.m_bShowOrNotShowThisNodeInPartialNodesMode" can be true or false.
		if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true)
		{	// if this real leaf node is shown in this partial nodes.
			this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = 1;
			nNumOfFinestLvlChildNodes = 1;
		}
		else if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == false)
		{	// if this real leaf node is not shown in this partial nodes.
			this.m_nThisNodeFinestLevelChildrenNum4PartialNodes = 0;
			nNumOfFinestLvlChildNodes = 0;
		}
	}
	return nNumOfFinestLvlChildNodes;
};

COneNode4RingGraph.prototype.GenerateLayoutOfChildrenNodes4PartialNodes = function(
		vvAllNodes4RingGraph, nGapLengthBtwTwoAdjcntLvlRingSectr, nLengthOfRingSectorInRadiusDirectn, vnTreeRingViewLevelWidth)
{	// this node's layout is stored in the following variables:
	// "this.m_dInnerPointRadis4PartialNodes"
	// "this.m_dOuterPointRadis4PartialNodes"
	// "this.m_dBgnPointAngle4PartialNodes  "
	// "this.m_dEndPointAngle4PartialNodes  "
	// "this.m_dCentrPointAngle4PartialNodes"
	// "this.m_dCentrPointRadis4PartialNodes"
	// this function will generate all the children nodes' layout based on this node's layout information.
	if (this.m_bIsLeafNode == true)
	{	// if this node is a leaf node.
		// do nothing, just return;
	}
	else if (this.m_bIsLeafNode == false)
	{	// if this node is not a leaf node.
		if (this.m_bIsAtLeastOneChildShownInPartialNodes == true)
		{	// if at least one node is shown in partial nodes.
			// since there are one or more child node need to be shown in the tree-ring view, so we need to do the layout work similar as that in the root nodes.
			// --- 1. Count the total number of children nodes need to be shown in this partial nodes.
			// I forget, it is already stored in variable "this.m_nThisNodeFinestLevelChildrenNum4PartialNodes".
			// But, we still need to count the number of lineal children nodes, we need to get the number of slots.
			var nNumOfLinealNodesShownInPartialNodes = 0;
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				var bThisNodeShownOrNotInThisPartialNodes = aOneLinealChldOfThisNode.GetThisNodeShownOrNotInThisPartialNodesMode();
				if (bThisNodeShownOrNotInThisPartialNodes == true)
				{	// if one of its lineal child node is shown in partial nodes.
					nNumOfLinealNodesShownInPartialNodes++;
				}
			}
			// --- 2. Calculate the begin and end angle of each children nodes need to be shown in this partial nodes layout.
			var dDegreeOfEachSlot = 0.003; // 0.003 * 360 = 1.08 degree/slot, 0.0001 for Whole parameters set; 0.08 for lite files only contains 17 parameters.
			var dTotalDegreeOfAllSectorExceptSlots = this.m_dEndPointAngle4PartialNodes - this.m_dBgnPointAngle4PartialNodes
							- (nNumOfLinealNodesShownInPartialNodes - 1) * dDegreeOfEachSlot;
			var dOneRingSectorBgnAngle = this.m_dBgnPointAngle4PartialNodes;
			var dOneRingSectorEndAngle = this.m_dBgnPointAngle4PartialNodes;
			var dRootNodeInnerRadius = this.m_dInnerPointRadis4PartialNodes - nGapLengthBtwTwoAdjcntLvlRingSectr
									 - nLengthOfRingSectorInRadiusDirectn; // the inner circle radius of the root node level
			var dRootNodeOuterRadius = this.m_dInnerPointRadis4PartialNodes - nGapLengthBtwTwoAdjcntLvlRingSectr; // the outer circle radius of the root node level
			var nIdxOfChildNodeInShownNodes = 0;
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				var nOneChildNodeFinestNodeNum = aOneLinealChldOfThisNode.GetThisNodeFinestLevelChildrenNum4PartialNodes();
				if (nOneChildNodeFinestNodeNum == 0)
				{	// this child node and all of its children nodes will not be shown in the tree-ring view.
					continue; // continue this for loop, and process for the next child node.
				}
				else // nOneChildNodeFinestNodeNum > 0
				{	// this node will be shown in the view.
					nIdxOfChildNodeInShownNodes++;
				}
				if (nIdxOfChild == 0)
				{
					dOneRingSectorBgnAngle = this.m_dBgnPointAngle4PartialNodes;
				}
				else
				{
					dOneRingSectorBgnAngle = dOneRingSectorEndAngle + dDegreeOfEachSlot; // one root node begin degree equals to the prior's end degree plus the degree of slot.
				}
				if (nIdxOfChildNodeInShownNodes == nNumOfLinealNodesShownInPartialNodes)
				{
					dOneRingSectorEndAngle = this.m_dEndPointAngle4PartialNodes;
				}
				else
				{
					dOneRingSectorEndAngle = dOneRingSectorBgnAngle + dTotalDegreeOfAllSectorExceptSlots * nOneChildNodeFinestNodeNum / this.m_nThisNodeFinestLevelChildrenNum4PartialNodes; // need to debug, not sure it will generate correct results. int / int ??
				}
				aOneLinealChldOfThisNode.SetBgnEndInnerOuterPointInPolar4PartialNodes(dRootNodeInnerRadius,   dRootNodeOuterRadius,
																	   				dOneRingSectorBgnAngle, dOneRingSectorEndAngle);
				// Since this root node's layout is fixed, then all of its children nodes' layout can be calculated.
				// --- 3. Call the function "GenerateLayoutOfChildrenNodes4PartialNodes()" recursively to set the layout of children of children nodes.
				var nChildNodeLevel = aOneLinealChldOfThisNode.GetThisNodeLevel();
				var nChildNodeNextLevelWidth = vnTreeRingViewLevelWidth[nChildNodeLevel + 1];
				aOneLinealChldOfThisNode.GenerateLayoutOfChildrenNodes4PartialNodes(vvAllNodes4RingGraph, nGapLengthBtwTwoAdjcntLvlRingSectr, nChildNodeNextLevelWidth, vnTreeRingViewLevelWidth);
			}
		}
		else if (this.m_bIsAtLeastOneChildShownInPartialNodes == false)
		{	// if there is no child node to be shown in partial nodes.
			// do nothing, just return.
		}
	}
};
// 20111121William. Render this node's ring sector, and then call all children nodes' this function recursively to render the children nodes' ring sector.
COneNode4RingGraph.prototype.RenderTreeRingView4ThisNodeAndChildNodesIfNeed = function(
		aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, vvAllNodes4RingGraph,
		bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, nMultipleSelectionHighlightMode, bTreeRingViewNodesNameTextWhetherShow, nTreeRingViewNodesNameTextFontSize)
{	// "aOneCanvasContext" is the canvas context to render the tree ring view;
	// "nLftMarginWdh" is the left margin of the canvas, since there is one frame of the canvas;
	// "nTopMarginHgh" is the top  margin of the canvas, since there is one frame of the canvas;
	// "vvAllNodes4RingGraph" the all nodes' set, we need it to retrieve an arbitrary node.
	var bIsThereAtLeastOneChildNodeShown = false;
	// --- 1. render all children nodes of this node, if they or any of them are shown in the tree ring view with partial nodes.
	if (this.m_bIsAtLeastOneChildShownInPartialNodes == true) // If it is leaf node, then it will be false.
	{	// if at least one child node needs to be shown in the view, then render them.
		for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
		{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
			var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
			var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
			var bIsThisChildNodeShownWithColor = aOneLinealChldOfThisNode.RenderTreeRingView4ThisNodeAndChildNodesIfNeed(aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, vvAllNodes4RingGraph,
																					bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, nMultipleSelectionHighlightMode, bTreeRingViewNodesNameTextWhetherShow, nTreeRingViewNodesNameTextFontSize);
			if (bIsThisChildNodeShownWithColor == true)
			{
				bIsThereAtLeastOneChildNodeShown = true;
			}
		}
	}
	// --- 2. render the ring sector of this node, if it is shown in the tree ring view with partial nodes.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true)
	{	// if this node needs to be shown in the tree ring view, then render it.
		// ---- 1.1 Render the one ring sector in this tree ring view.
		// we need to calculate the arc parameters:
		// context.arc(centerX, centerY, radius, startingAngle, endingAngle, antiClockwise);
		var nRadiusOfThisRingSector = Math.floor( (this.m_dInnerPointRadis4PartialNodes + this.m_dOuterPointRadis4PartialNodes) / 2 );
		aOneCanvasContext.beginPath();
		aOneCanvasContext.arc(nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, 
				nRadiusOfThisRingSector, this.m_dBgnPointAngle4PartialNodes, this.m_dEndPointAngle4PartialNodes, 
				false); // "true" it is in the antiClockwise direction.
		aOneCanvasContext.lineWidth = this.m_dOuterPointRadis4PartialNodes - this.m_dInnerPointRadis4PartialNodes + 1;
		if (bDoesUserSelectOneNode == false)
		{	// if user is not selecting one node. Just render the nodes with two colors "#33FF66" and "#33FFCC"
			// 20120628. We need to set the node color as the mapped single locus test value node color
			var sLeafNodeColor = this.GetOneNodeColor();
			aOneCanvasContext.strokeStyle = sLeafNodeColor; // Right now, it is not only about the leaf node color, but also father node's color.
		}
		else if (bDoesUserSelectOneNode == true)
		{	// if user is selecting one node.
			var nRltnTypeToTheSelectNode = 0;
			// 0: default, no relation with the selected node;
			// 1: the selected node itself;
			// 2: the selected node is defining this node;
			// 3: the selected node is defined by this node;
			// 4: the selected node is defined by this node, and it is also defining this node.
			// 5: the selected node has relationship with the child node of this node.
			if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
			{	// if this node is shown in the view, and none of its child nodes is shown in the view.
				// which means this node is the "leaf" node in the view.
				// --- Step 1. Judge whether this node is the selected node.
				var bIsThisNodeExistInTheSelectedNodesList = this.IsThisNodeExistInSelectedNodeList(this.m_nThisNodeLevel, this.m_nThisNodeIndexInLevel, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
				if (bIsThisNodeExistInTheSelectedNodesList == true)
				{	// if this node is the selected node itself;
					nRltnTypeToTheSelectNode = 1;
				}
				else
				{
					var bIsThisNodeDefBySelectedNode = false; // flag of whether this node is defined by the selected node;
					var bIsThisNodeDefInSelectedNode = false; // flag of whether this node defines the selected node.
					if (nMultipleSelectionHighlightMode == 0) // Any of them. This is easy, and it is the original design idea.
					{
						// --- Step 2. Judge whether this node's "defined by" nodes set containing the selected node;
						var nNumOfDefByInPartailNode = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes.length;
						for (var nIdxOfDefBy = 0; nIdxOfDefBy < nNumOfDefByInPartailNode; nIdxOfDefBy++)
						{
							var nOneDefByIdxOfLevel = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOfDefBy];
							var nOneDefByIdxInLevel = this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOfDefBy];
							var bIsThisNodeExistInTheSelectedNodesList = this.IsThisNodeExistInSelectedNodeList(nOneDefByIdxOfLevel, nOneDefByIdxInLevel, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
							if ( bIsThisNodeExistInTheSelectedNodesList == true )
							{	// if one node is the selected node
								bIsThisNodeDefBySelectedNode = true;
								break;
							}
						}
						// --- Step 3. Judge whether the selected node's "defined by" nodes set containing this node;
						var nNumOfSelectedNode = vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
						for (var nIdx = 0; nIdx < nNumOfSelectedNode; nIdx++)
						{
							var nSelectedNodeIndexOfLevel4PartialNodesTreeRingView = vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView[nIdx];
							var nSelectedNodeIndexInLevel4PartialNodesTreeRingView = vnSelectedNodeIndexInLevel4PartialNodesTreeRingView[nIdx];
							var aTheSelectedNodeRefer = vvAllNodes4RingGraph[nSelectedNodeIndexOfLevel4PartialNodesTreeRingView][nSelectedNodeIndexInLevel4PartialNodesTreeRingView];
							var nNumOfDefIngInPartialNode = aTheSelectedNodeRefer.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes.length;
							for (var nIdxOfDefIng = 0; nIdxOfDefIng < nNumOfDefIngInPartialNode; nIdxOfDefIng++)
							{
								var nOneDefIngIdxOfLevel = aTheSelectedNodeRefer.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOfDefIng];
								var nOneDefIngIdxInLevel = aTheSelectedNodeRefer.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOfDefIng];
								if (nOneDefIngIdxOfLevel == this.m_nThisNodeLevel
								 && nOneDefIngIdxInLevel == this.m_nThisNodeIndexInLevel)
								{	// if one node is the selected node
									bIsThisNodeDefInSelectedNode = true;
									break;
								}
							}
						}
						// --- Step 4. fuse the above two flag variable into flag variable "nRltnTypeToTheSelectNode".
						if (bIsThisNodeDefBySelectedNode == true && bIsThisNodeDefInSelectedNode == false)
						{	// the selected node is defining this node;
							nRltnTypeToTheSelectNode = 2;
						}
						else if (bIsThisNodeDefBySelectedNode == false && bIsThisNodeDefInSelectedNode == true)
						{	// the selected node is defined by this node;
							nRltnTypeToTheSelectNode = 3;
						}
						else if (bIsThisNodeDefBySelectedNode == true && bIsThisNodeDefInSelectedNode == true)
						{	// the selected node is defined by this node, and it is also defining this node.
							nRltnTypeToTheSelectNode = 4;
						}
						else if (bIsThisNodeDefBySelectedNode == false && bIsThisNodeDefInSelectedNode == false)
						{	// there is no definition relationship between this node and the selected node.
							nRltnTypeToTheSelectNode = 0;
						}
					}
					else if (nMultipleSelectionHighlightMode == 1) // All of them. I am still not quite clear about the logic.
					{
						var bIsAllTheSelectedNodesExistInDefByOrDef = true;
						var nNumOfSelectedNode = vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
						for (var nIdx = 0; nIdx < nNumOfSelectedNode; nIdx++)
						{
							var nIdxOfLevelOfSelectedNode = vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView[nIdx];
							var nIdxInLevelOfSelectedNode = vnSelectedNodeIndexInLevel4PartialNodesTreeRingView[nIdx];
							var bIsThisSelectedNodeExistInDefOrDefBy = false;
							// --- Step 2. Judge whether this node's "defined by" nodes set containing this selected node;
							var nNumOfDefByInPartailNode = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes.length;
							for (var nIdxOfDefBy = 0; nIdxOfDefBy < nNumOfDefByInPartailNode; nIdxOfDefBy++)
							{
								var nOneDefByIdxOfLevel = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOfDefBy];
								var nOneDefByIdxInLevel = this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOfDefBy];
								if (nIdxOfLevelOfSelectedNode == nOneDefByIdxOfLevel && nIdxInLevelOfSelectedNode == nOneDefByIdxInLevel)
								{
									bIsThisSelectedNodeExistInDefOrDefBy = true;
									break;
								}
							}
							if (bIsThisSelectedNodeExistInDefOrDefBy == false)
							{
								// --- Step 3. Judge whether the selected node's "defining" nodes set containing this selected node;
								var aTheSelectedNodeRefer = vvAllNodes4RingGraph[nIdxOfLevelOfSelectedNode][nIdxInLevelOfSelectedNode];
								var nNumOfDefIngInPartialNode = aTheSelectedNodeRefer.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes.length;
								for (var nIdxOfDefIng = 0; nIdxOfDefIng < nNumOfDefIngInPartialNode; nIdxOfDefIng++)
								{
									var nOneDefIngIdxOfLevel = aTheSelectedNodeRefer.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOfDefIng];
									var nOneDefIngIdxInLevel = aTheSelectedNodeRefer.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOfDefIng];
									if (nOneDefIngIdxOfLevel == this.m_nThisNodeLevel && nOneDefIngIdxInLevel == this.m_nThisNodeIndexInLevel)
									{	// if one node (in the def by nodes list of this selected node) is this node
										bIsThisSelectedNodeExistInDefOrDefBy = true;
										break;
									}
								}
							}
							if (bIsThisSelectedNodeExistInDefOrDefBy == false)
							{
								bIsAllTheSelectedNodesExistInDefByOrDef = false;
								break;
							}
						}
						if (bIsAllTheSelectedNodesExistInDefByOrDef == true)
						{	nRltnTypeToTheSelectNode = 5;	}
					}
				}
			}
			if (bIsThereAtLeastOneChildNodeShown == true)
			{
				nRltnTypeToTheSelectNode = 5;
			}
			this.m_nRltnTypeToTheSelectNode = nRltnTypeToTheSelectNode;
			// ok, then we can assign the colod to this node, according to the relationship between this node and the selected node.
			switch(nRltnTypeToTheSelectNode)
			{
			case 0:
				aOneCanvasContext.strokeStyle = "#F0F0F0"; // gray, no relationship.
				break;
			case 1: // the selected node.
				// 20120628. We need to set the node color as the mapped single locus test value node color
				var sLeafNodeColor = this.GetOneNodeColor();
				aOneCanvasContext.strokeStyle = sLeafNodeColor; // "#FF0000"
				break;
			case 2:	// nodes who are defined by the selected node.
				// 20120628. We need to set the node color as the mapped single locus test value node color
				var sLeafNodeColor = this.GetOneNodeColor();
				aOneCanvasContext.strokeStyle = sLeafNodeColor; // "#00FFFF"
				break;
			case 3:
				// 20120628. We need to set the node color as the mapped single locus test value node color
				var sLeafNodeColor = this.GetOneNodeColor();
				aOneCanvasContext.strokeStyle = sLeafNodeColor; // "#00FFFF"
				break;
			case 4:
				// 20120628. We need to set the node color as the mapped single locus test value node color
				var sLeafNodeColor = this.GetOneNodeColor();
				aOneCanvasContext.strokeStyle = sLeafNodeColor; // "#FF00FF"
				break;
			case 5:
				// 20120630. We need to set the node color as the mapped single locus test value node color
				var sLeafNodeColor = this.GetOneNodeColor();
				aOneCanvasContext.strokeStyle = sLeafNodeColor;
				break;
			default:
				aOneCanvasContext.strokeStyle = "#33FF66";
				break;
			}
			// If as a leaf node, it is shown with color, then return true.
			if (nRltnTypeToTheSelectNode >= 1 && nRltnTypeToTheSelectNode <= 5)
			{	bIsThereAtLeastOneChildNodeShown = true;	}
		}
		aOneCanvasContext.stroke();
		// ---- 1.2 Render the text label of this node in this tree ring view.
		if (bTreeRingViewNodesNameTextWhetherShow == true)
		{
			aOneCanvasContext.fillStyle = "black";
			aOneCanvasContext.textBaseline = "middle"; // top; hanging; middle; alphabetic(default); ideographic; bottom;
//			aOneCanvasContext.font = 22 + "px courier"; // "pt Arial" or "px Arial" "times new roman" "courier"// 10px is good enough.
			aOneCanvasContext.font = "bold " + nTreeRingViewNodesNameTextFontSize + "px courier"; // "pt Arial" or "px Arial" "times new roman" "courier"// 10px is good enough.
		    var sThisParamName = this.m_sThisNodeName; // Yeap, it works. It can show the level of each node in the tree ring view.
//		    var sThisParamName = this.m_nThisNodeLevel + this.m_sThisNodeName;
		    var dCenterAngleForTextAlign = this.m_dCentrPointAngle4PartialNodes;
		    nBasePointForTextWdhX = nAllRingSectorCenterWdhX + Math.round( this.m_dInnerPointRadis4PartialNodes * Math.cos(dCenterAngleForTextAlign) );
		    nBasePointForTextHghY = nAllRingSectorCenterHghY + Math.round( this.m_dInnerPointRadis4PartialNodes * Math.sin(dCenterAngleForTextAlign) );
		    aOneCanvasContext.save();
		    aOneCanvasContext.translate(nBasePointForTextWdhX, nBasePointForTextHghY);
		    if (dCenterAngleForTextAlign >= (Math.PI / 2) && dCenterAngleForTextAlign <= (Math.PI * 3 /2))
	    	{	// if the rotate angle lies in [PI / 2, 3 * PI / 2].
		    	aOneCanvasContext.textAlign = "right";
		    	aOneCanvasContext.rotate(dCenterAngleForTextAlign + Math.PI);
	    	}
		    else
	    	{	// else if the rotate angle lies in [0, PI / 2] or [3 * PI / 2, 2 * PI].
		    	aOneCanvasContext.textAlign = "left";
		    	aOneCanvasContext.rotate(dCenterAngleForTextAlign);
	    	}
		    aOneCanvasContext.fillText(sThisParamName, 0, 0);
		    aOneCanvasContext.restore();
		}
	}
	return bIsThereAtLeastOneChildNodeShown;
};
// 20121020William. Add this function for searching box.
COneNode4RingGraph.prototype.RenderTreeRingView4ThisNodeAndChildNodes4SearchNodes = function(
		aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, vvAllNodes4RingGraph,
		bTreeRingViewNodesNameTextWhetherShow, nTreeRingViewNodesNameTextFontSize, sSearchInputTextBoxStringValue)
{	// "aOneCanvasContext" is the canvas context to render the tree ring view;
	// "nLftMarginWdh" is the left margin of the canvas, since there is one frame of the canvas;
	// "nTopMarginHgh" is the top  margin of the canvas, since there is one frame of the canvas;
	// "vvAllNodes4RingGraph" the all nodes' set, we need it to retrieve an arbitrary node.
	// --- 1. render all children nodes of this node.
	if (this.m_bIsAtLeastOneChildShownInPartialNodes == true) // If it is leaf node, then it will be false.
	{	// if at least one child node needs to be shown in the view, then render them.
		for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
		{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
			var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
			var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
			aOneLinealChldOfThisNode.RenderTreeRingView4ThisNodeAndChildNodes4SearchNodes(
					aOneCanvasContext, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, vvAllNodes4RingGraph,
					bTreeRingViewNodesNameTextWhetherShow, nTreeRingViewNodesNameTextFontSize, sSearchInputTextBoxStringValue);
		}
	}
	// --- 2. render the ring sector of this node, if it is shown in the tree ring view with partial nodes.
	// ---- 2.1 Render the one ring sector in this tree ring view.
	// we need to calculate the arc parameters:
	// context.arc(centerX, centerY, radius, startingAngle, endingAngle, antiClockwise);
	var nRadiusOfThisRingSector = Math.floor( (this.m_dInnerPointRadis4PartialNodes + this.m_dOuterPointRadis4PartialNodes) / 2 );
	aOneCanvasContext.beginPath();
	aOneCanvasContext.arc(nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY, 
			nRadiusOfThisRingSector, this.m_dBgnPointAngle4PartialNodes, this.m_dEndPointAngle4PartialNodes, 
			false); // "true" it is in the antiClockwise direction.
	aOneCanvasContext.lineWidth = this.m_dOuterPointRadis4PartialNodes - this.m_dInnerPointRadis4PartialNodes + 1;
	// ---- 2.2 Judge whether one node begin with the string input by user in the searching box.
	sThisNodeNameLowerCase = this.m_sThisNodeName.toLowerCase();
	sSearchInputTextBoxStringValueLowerCase = sSearchInputTextBoxStringValue.toLowerCase();
	nIndexOfSearchingString = sThisNodeNameLowerCase.indexOf(sSearchInputTextBoxStringValueLowerCase, 0); // Is this node's name begin with "sSearchInputTextBoxStringValue"?
	if (nIndexOfSearchingString == 0)
	{	// This node name do begin with the searching string.
		var sLeafNodeColor = this.GetOneNodeColor();
		aOneCanvasContext.strokeStyle = sLeafNodeColor;
	}
	else
	{	// Otherwise, use gray color.
		aOneCanvasContext.strokeStyle = "#F0F0F0"; // gray, no relationship.	
	}
	aOneCanvasContext.stroke();
	// ---- 2.3 Render the text label of this node in this tree ring view.
	if (bTreeRingViewNodesNameTextWhetherShow == true)
	{
		aOneCanvasContext.fillStyle = "black";
		aOneCanvasContext.textBaseline = "middle"; // top; hanging; middle; alphabetic(default); ideographic; bottom;
//			aOneCanvasContext.font = 22 + "px courier"; // "pt Arial" or "px Arial" "times new roman" "courier"// 10px is good enough.
		aOneCanvasContext.font = "bold " + nTreeRingViewNodesNameTextFontSize + "px courier"; // "pt Arial" or "px Arial" "times new roman" "courier"// 10px is good enough.
	    var sThisParamName = this.m_sThisNodeName; // Yeap, it works. It can show the level of each node in the tree ring view.
//		    var sThisParamName = this.m_nThisNodeLevel + this.m_sThisNodeName;
	    var dCenterAngleForTextAlign = this.m_dCentrPointAngle4PartialNodes;
	    nBasePointForTextWdhX = nAllRingSectorCenterWdhX + Math.round( this.m_dInnerPointRadis4PartialNodes * Math.cos(dCenterAngleForTextAlign) );
	    nBasePointForTextHghY = nAllRingSectorCenterHghY + Math.round( this.m_dInnerPointRadis4PartialNodes * Math.sin(dCenterAngleForTextAlign) );
	    aOneCanvasContext.save();
	    aOneCanvasContext.translate(nBasePointForTextWdhX, nBasePointForTextHghY);
	    if (dCenterAngleForTextAlign >= (Math.PI / 2) && dCenterAngleForTextAlign <= (Math.PI * 3 /2))
    	{	// if the rotate angle lies in [PI / 2, 3 * PI / 2].
	    	aOneCanvasContext.textAlign = "right";
	    	aOneCanvasContext.rotate(dCenterAngleForTextAlign + Math.PI);
    	}
	    else
    	{	// else if the rotate angle lies in [0, PI / 2] or [3 * PI / 2, 2 * PI].
	    	aOneCanvasContext.textAlign = "left";
	    	aOneCanvasContext.rotate(dCenterAngleForTextAlign);
    	}
	    aOneCanvasContext.fillText(sThisParamName, 0, 0);
	    aOneCanvasContext.restore();
	}
};
// 20111121William. for the interaction of user mouse, add or delete some nodes in the tree ring view.
COneNode4RingGraph.prototype.JudgeDoesTheMouseFallInThisNodeAndChildNodesRingSector = function(
		dMousePointRadis, dMousePointAngle, vaMouseFallInRingSectorInfor, vvAllNodes4RingGraph)
{
	// judge the point (nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY)(Already in relative coordinates) fall in which node 
	// (this.m_nMouseClickOnNodeIndexOfLevel, this.m_nMouseClickOnNodeIndexInLevel)
	// Notes: only search for the nodes shown in the tree ring view.
	// for the variable "vaMouseFallInRingSectorInfor":
	// Index "0": "this.m_bIsMouseFallInAnyRingSector"
	// Index "1": "this.m_nMouseClickOnNodeIndexOfLevel"
	// Index "2": "this.m_nMouseClickOnNodeIndexInLevel"
	// --- first, judge whether it falls in this node's ring sector.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true)
	{	// if this node is shown in the tree ring view with partial nodes.
		if (dMousePointRadis <= this.m_dOuterPointRadis4PartialNodes
		 && dMousePointRadis >= this.m_dInnerPointRadis4PartialNodes
		 && dMousePointAngle <= this.m_dEndPointAngle4PartialNodes
		 && dMousePointAngle >= this.m_dBgnPointAngle4PartialNodes)
		{	// if the mouse polar coords fall in this ring sector
			vaMouseFallInRingSectorInfor[0] = true;
			vaMouseFallInRingSectorInfor[1] = this.m_nThisNodeLevel;
			vaMouseFallInRingSectorInfor[2] = this.m_nThisNodeIndexInLevel;
			return; // just return, do not need to examine the child nodes.
		}
		// if the mouse does not fall in the ring sector of this node, judge its children nodes
		if (this.m_bIsAtLeastOneChildShownInPartialNodes == true)
		{
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				aOneLinealChldOfThisNode.JudgeDoesTheMouseFallInThisNodeAndChildNodesRingSector(
						dMousePointRadis, dMousePointAngle, vaMouseFallInRingSectorInfor, vvAllNodes4RingGraph);
				var bIsMouseFallInAnyRingSector = vaMouseFallInRingSectorInfor[0];
				if (bIsMouseFallInAnyRingSector == true)
				{	// if we have found the ring sector, which the mouse falls in.
					return; // once we found the ring sector, return immediately.
				}
			}
		}
	}
};
// 20111122William. To response to the operation of left click, expand this node's child nodes.
COneNode4RingGraph.prototype.ExpandThisSelectedNodeChildrenNodes = function(vvAllNodes4RingGraph)
{	// if user left  click on this ring sector. expand its children nodes
	if (this.m_bIsLeafNode == false)
	{	// if this node is not a real leaf node.
		if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
		 && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
		{	// if this node is shown in current view, but all of its nodes are not shown in current view.
			this.m_bIsAtLeastOneChildShownInPartialNodes = true;
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				aOneLinealChldOfThisNode.SetThisNodeShownOrNotInThisPartialNodesMode(true); // show this lineal child node;
				aOneLinealChldOfThisNode.SetIsAtLeastOneChildShownInPartialNodes(false);	// but not show any of its child nodes.
			}
		}
		// "this.m_bShowOrNotShowThisNodeInPartialNodesMode == true" must be right, when the program run into this function.
		// if "this.m_bIsAtLeastOneChildShownInPartialNodes == true", it indicates that the child nodes already have been shown in this view. So, do nothing.
	}
	// if it is a leaf node, do nothing. Since it does not have child nodes. So, we can not expand its child nodes.
};
//20111122William. To response to the operation of right click, shrink this node's child nodes.
COneNode4RingGraph.prototype.ShrinkThisSelectedNodeChildrenNodes = function(vvAllNodes4RingGraph)
{	// if user right click on this ring sector. shrink its children nodes
	if (this.m_bIsLeafNode == false)
	{	// if this node is not a real leaf node.
		if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
		 && this.m_bIsAtLeastOneChildShownInPartialNodes == true)
		{	// if this node is shown in current view, but all of its nodes are not shown in current view.
			this.m_bIsAtLeastOneChildShownInPartialNodes = false;
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				aOneLinealChldOfThisNode.ShrinkThisNodeAndItsChildrenNodes(vvAllNodes4RingGraph); // shrink this lineal child node, if it has child nodes shown, shrink them too.
			}
		}
		// "this.m_bShowOrNotShowThisNodeInPartialNodesMode == true" must be right, when the program run into this function.
		// if "this.m_bIsAtLeastOneChildShownInPartialNodes == false", it indicates that the child nodes is not being shown in this view. So, do nothing.
	}
	// if it is a leaf node, do nothing. Since it does not have child nodes. So, we can not expand its child nodes.
};

COneNode4RingGraph.prototype.ShrinkThisNodeAndItsChildrenNodes = function(vvAllNodes4RingGraph)
{	// shrink this lineal child node, if it has child nodes shown, shrink them too.
	if (this.m_bIsLeafNode == false)
	{	// if this node is not a real leaf node.
		if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
		 && this.m_bIsAtLeastOneChildShownInPartialNodes == true)
		{	// if this node is shown in current view, but all of its nodes are not shown in current view.
			this.m_bIsAtLeastOneChildShownInPartialNodes = false;
			for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
			{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
				var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
				var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
				aOneLinealChldOfThisNode.ShrinkThisNodeAndItsChildrenNodes(vvAllNodes4RingGraph); // shrink this lineal child node, if it has child nodes shown, shrink them too.
			}
		}
		// "this.m_bShowOrNotShowThisNodeInPartialNodesMode == true" must be right, when the program run into this function.
		// if "this.m_bIsAtLeastOneChildShownInPartialNodes == false", it indicates that the child nodes is not being shown in this view. So, do nothing.
	}
	// if it is a leaf node, do nothing. Since it does not have child nodes. So, we can not expand its child nodes.
	this.m_bShowOrNotShowThisNodeInPartialNodesMode = false;
	this.m_bIsAtLeastOneChildShownInPartialNodes = false;
};
// ----- the following function is new for the generation of B-spline curves -----
// ----- 20111128William the following is for the generation of piecewise cubic B-Spline curve edge -------
COneNode4RingGraph.prototype.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodes = function(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength)
{	// add the inner points to a set, and the point will form the path, link two leaf nodes. You must traverse the hierarchical tree to find the path.
	// this fun will traverse the hierarchical tree stored in "aAllNodes4RingGraph", and find the link between it and another leaf node in the defined by vector "m_vDefinedByOtherLeafNodes".
	// once we got the path, we can use the central angle of each node on the path and mirro radius, which can be found in "vInnerInvisibleNodesRadius", to construct one inner point in the path. Then add this point to the sequence set.
	// "vInnerInvisibleNodesRadius" store the inner mirror nodes position. the index of the element correspond to the level of in the variable "m_vvAllNodes4RingGraph", for example, vInnerInvisibleNodesRadius[0] is correspond the the radius of mirror nodes of m_vvAllNodes4RingGraph[0][i], i is a arbitrary index. vInnerInvisibleNodesRadius[1] <-> m_vvAllNodes4RingGraph[1][i], and so on.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
	{	// if this is a "leaf" node. In pratial nodes mode, a "leaf" node refer to that the node itself is shown, but none of its child nodes is shown. 
		this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes = [];
		this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes = [];
		this.m_vnDefinedByOtherNodesNumOfDefRltn4PartialNodes = []; // 20111202William one bug.
		this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes = []; // 20111202William one bug.
		vdDefinedByOtherNodesEdgeWeight4PartialNodes = new Array();
		this.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength, this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes, this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes, this.m_vnDefinedByOtherNodesNumOfDefRltn4PartialNodes, this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes, vdDefinedByOtherNodesEdgeWeight4PartialNodes, this.m_nThisNodeLevel, this.m_nThisNodeIndexInLevel);
		// 20120630William, add parameter "vdDefinedByOtherNodesEdgeWeight4PartialNodes", for set the edge with the maximum two locus test value.
	}
};
COneNode4RingGraph.prototype.ClearAllTempVariables = function(vvAllNodes4RingGraph){
	this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes = [];
	this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes = [];
	this.m_vnDefinedByOtherNodesNumOfDefRltn4PartialNodes = []; // 20111202William one bug.
	this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes = []; // 20111202William one bug.
//	this.m_vnLDEdgeAnotherEndNodesIndexOfLevel4PartialNodes = [];
//	this.m_vnLDEdgeAnotherEndNodesIndexInLevel4PartialNodes = [];
//	this.m_vnLDEdgeAnotherEndNodesNumOfDefRltn4PartialNodes = [];
//	this.m_vaLDEdgeInformtn4PartialNodes = []; // 20111202William one bug.
	var aOneChildNodeRefer = new COneNode4RingGraph();
	for (var nIdxChild = 0; nIdxChild < this.m_nNumOfNextLevelChildren; nIdxChild++)
	{	// check each child node.
		var nOneChildIndexInNextLevel = this.m_vIdxOfNextLevelChildren[nIdxChild];
		aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildIndexInNextLevel];
		aOneChildNodeRefer.ClearAllTempVariables(vvAllNodes4RingGraph);
	}
};
//----- 20130620William. LD Edges. The generation of piecewise cubic B-Spline curve edge -------
COneNode4RingGraph.prototype.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodes4LDEdges = function(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength)
{	// add the inner points to a set, and the point will form the path, link two leaf nodes. You must traverse the hierarchical tree to find the path.
	// this fun will traverse the hierarchical tree stored in "aAllNodes4RingGraph", and find the link between it and another leaf node in the defined by vector "m_vDefinedByOtherLeafNodes".
	// once we got the path, we can use the central angle of each node on the path and mirro radius, which can be found in "vInnerInvisibleNodesRadius", to construct one inner point in the path. Then add this point to the sequence set.
	// "vInnerInvisibleNodesRadius" store the inner mirror nodes position. the index of the element correspond to the level of in the variable "m_vvAllNodes4RingGraph", for example, vInnerInvisibleNodesRadius[0] is correspond the the radius of mirror nodes of m_vvAllNodes4RingGraph[0][i], i is a arbitrary index. vInnerInvisibleNodesRadius[1] <-> m_vvAllNodes4RingGraph[1][i], and so on.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true && this.m_bIsLeafNode == true)
	{	// if this is a "leaf" node. In pratial nodes mode, a "leaf" node refer to that the node itself is shown, but none of its child nodes is shown. 
		this.m_vnLDEdgeAnotherEndNodesIndexOfLevel4PartialNodes = [];
		this.m_vnLDEdgeAnotherEndNodesIndexInLevel4PartialNodes = [];
		this.m_vnLDEdgeAnotherEndNodesNumOfDefRltn4PartialNodes = [];
		this.m_vaLDEdgeInformtn4PartialNodes = []; // 20111202William one bug.
		vdLDEdgeWeight4PartialNodes = new Array();
		this.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively4LDEdges(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength, this.m_vnLDEdgeAnotherEndNodesIndexOfLevel4PartialNodes, this.m_vnLDEdgeAnotherEndNodesIndexInLevel4PartialNodes, this.m_vnLDEdgeAnotherEndNodesNumOfDefRltn4PartialNodes, this.m_vaLDEdgeInformtn4PartialNodes, vdLDEdgeWeight4PartialNodes, this.m_nThisNodeLevel, this.m_nThisNodeIndexInLevel);
		// 20120630William, add parameter "vdDefinedByOtherNodesEdgeWeight4PartialNodes", for set the edge with the maximum two locus test value.
	}
};

//20111128William. This function is designed to be an recursive function.
COneNode4RingGraph.prototype.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively4LDEdges
	= function(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength,
			   vnLDEdgesIndexOfLevel4PartialNodes, vnLDEdgesIndexInLevel4PartialNodes,
			   vnLDEdgesNumOfDefRltn4PartialNodes, vaLDEdgesInformtn4PartialNodes,
			   vdLDEdgesWeight4PartialNodes, nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode)
{
	var vvAllNodes4RingGraph = aAllNodes4RingGraph.m_vvAllNodes4RingGraph;
	var dHueRangeBgn = gdHueRangeBgn4EdgeColorBar; // begin from red  // 20120701William Modify this line.
	var dHueRangeEnd = gdHueRangeEnd4EdgeColorBar; // end with green.
	if (this.m_bIsLeafNode == true)
	{	// if it is a real leaf node
		// traverse all the defination relationship between this real leaf node and other leaf nodes A (if A is not shown, search for its ancestor of leaf nodes).
		var nNumOfLDEdges = this.m_vnIndexOfNodesInLDInforEdges.length;
		var aOneNodeReference = new COneNode4RingGraph();
		for (var nIdxOfLDEdge = 0; nIdxOfLDEdge < nNumOfLDEdges; nIdxOfLDEdge++)
		{
			// process one edge (one defination relationship). For example, A(shown)'s child A1(not shown) is defined by B1(not shown), which is the child of B(shown). We need to add one edge from A to B.
			// --- Step 1. traverse the tree, and get the path of nodes linking A and B.
			// we need to index of level and index in level of node A and B1, then we can use fun "GetThePathFromOneNodeToAnotherInHierTree4PartialNodes" to find B(the ancestor of B1), and add the link between A and B.
			var nIndexOfLevelOfNodeInOneLDEdge = this.m_vnLDEdgeAnotherEndNodeLevelNum[nIdxOfLDEdge];
			var nIndexInLevelOfNodeInOneLDEdge = this.m_vnLDEdgeAnotherEndNodeIndexInThatLevel[nIdxOfLDEdge];
			var vThePathsNodesListLinkTwoLeafNodeIndexInLevel = new Array();
			var vThePathsNodesListLinkTwoLeafNodeIndexOfLevel = new Array();
			var vnIndexOfDuplicateExistingEdge = new Array(1);
			vnIndexOfDuplicateExistingEdge[0] = -2;
			var bIsThisOneNew = aAllNodes4RingGraph.GetThePathFromOneNodeToAnotherInHierTree4PartialNodes(
nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode, nIndexOfLevelOfNodeInOneLDEdge, nIndexInLevelOfNodeInOneLDEdge, vnLDEdgesIndexOfLevel4PartialNodes, vnLDEdgesIndexInLevel4PartialNodes, vnLDEdgesNumOfDefRltn4PartialNodes, vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInLevel, vnIndexOfDuplicateExistingEdge);
			// so, in the above function, we get the path link the two leaf node, we need to map them to the real position list P of point, then, we can input it P to the B-Spline Curve generation function, to get the detailed B-Splien Curve.
			// Please note that, the begin and end leaf node have been added in the vector "vThePathsNodesListLinkTwoLeafNode", at the begin and end position of the vector. They need special process. I mean, not get the mirror point's radius, but use the inner circle radius as the begin and end point of the curve line.
			if (bIsThisOneNew == false)
			{
				// If it not new, then we need to update the color of the exisitng edge, if the original two locus test value is less than the new one.
				var nIndexOfDuplicateExistingEdge = vnIndexOfDuplicateExistingEdge[0];
				if (nIndexOfDuplicateExistingEdge >= 0)
				{
					var dLDEdgeWeightValueNew = this.m_vdEdgeWeightOfTheLDInforEdges[nIdxOfLDEdge];
					var dLDEdgeWeightValueOld = vdLDEdgesWeight4PartialNodes[nIndexOfDuplicateExistingEdge];
					if (dLDEdgeWeightValueOld < dLDEdgeWeightValueNew)
					{
						var vdRGBColorValue = new Array(3);
						aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dLDEdgeWeightValueNew, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4EdgeColorBar, gdSatutation4EdgeColorBar, gdIntensity4EdgeColorBar);
						if (gnIndexOfColorScheme4EdgesColor == 12)
						{ // "12" continuous red to green color bar.
							aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dLDEdgeWeightValueNew, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);
						}
						else
						{ // "0~11" discrete color bar from ColorBrewer.
							aAllNodes4RingGraph.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dLDEdgeWeightValueNew, gnIndexOfColorScheme4EdgesColor);
						}
						var dColorR = vdRGBColorValue[0];
						var dColorG = vdRGBColorValue[1];
						var dColorB = vdRGBColorValue[2];
						var nColorR = Math.round(dColorR * 255);
						var nColorG = Math.round(dColorG * 255);
						var nColorB = Math.round(dColorB * 255);
						var sColorRGB = "rgb(" + nColorR + ", " + nColorG + "," + nColorB + ")";
						var aOneEdge4RingGraph = vaLDEdgesInformtn4PartialNodes[nIndexOfDuplicateExistingEdge];
						aOneEdge4RingGraph.SetEdgeColorMappedFromTwoLocusTestValue(sColorRGB);
					}
				}
				continue; // if this one is not new definition, do not add new curve edge.
			}
			// if (bIsThisOneNew == true) do the following code snippet (Step 2 and 3).
			// --- Step 2. map the nodes in the path into the mirror position in the inner circle, and get the virtual skeleton path of the curves for edge.
			var vPathMirrorNodesPositnXList = new Array(); // the x coordinates in Euclidean Coordinate system, of the mirror node of this node's ancestor node.
			var vPathMirrorNodesPositnYList = new Array(); // the y coordinates in Euclidean Coordinate system, of the mirror node of this node's ancestor node.
			var nNumOfPointInTheInnerPathsNodes = vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.length;
			for (var nIdxOfPtInPath = 0; nIdxOfPtInPath < nNumOfPointInTheInnerPathsNodes; nIdxOfPtInPath++)
			{ // for each node in the path ( nodes list of the route link the two leaf node ), map it to the real position value at the inner circle.
				var nOneIndexInLevelOfOneNodeInPath = vThePathsNodesListLinkTwoLeafNodeIndexInLevel[nIdxOfPtInPath]; // one node's index in its level, the idnex is in the variable "m_vvAllNodes4RingGraph";
				var nOneIndexOfLevelOfOneNodeInPath = vThePathsNodesListLinkTwoLeafNodeIndexOfLevel[nIdxOfPtInPath]; // one node's index of level, the idnex is in the variable "m_vvAllNodes4RingGraph";
				aOneNodeReference = vvAllNodes4RingGraph[nOneIndexOfLevelOfOneNodeInPath][nOneIndexInLevelOfOneNodeInPath];
				// --- 2.1. if it is the begin of the path, we need to add the begin point of the curve.
				if ( nIdxOfPtInPath == 0 )
				{	// the begin and end point need special processing, the point is (inner circle radius, central angle).
					var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentrPointAngle4PartialNodes(); // one mirror node's central angle
					var dOneMirrorNodeInnerCircleRadius = aOneNodeReference.GetThisNodeInnerPointRadis4PartialNodes(); // one mirror node's radius value.
					var dOneMirrorNodePosX = dOneMirrorNodeInnerCircleRadius * Math.cos( dOneMirrorNodeCentralAngle ); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
					var dOneMirrorNodePosY = dOneMirrorNodeInnerCircleRadius * Math.sin( dOneMirrorNodeCentralAngle ); 
					vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
					vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.
				}
				// --- 2.2. for all point (begin, middle, or end), we need to add the mirror point (inside the inner circle) to the path of the circle.
				// the point not at begin or end need common processing, the point is (central circle radius, central angle).
				var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentrPointAngle4PartialNodes(); // one mirror node's central angle
				var dOneMirrorNodeRadius = vInnerInvisibleNodesRadius[nOneIndexOfLevelOfOneNodeInPath]; // one mirror node's radius value.
				var dOneMirrorNodePosX = dOneMirrorNodeRadius * Math.cos( dOneMirrorNodeCentralAngle ); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
				var dOneMirrorNodePosY = dOneMirrorNodeRadius * Math.sin( dOneMirrorNodeCentralAngle ); 
				vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
				vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.					
				// --- 2.3. if it is the end of the path, we need to add the end point of the curve.
				if ( nIdxOfPtInPath == (nNumOfPointInTheInnerPathsNodes - 1) )
				{
					var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentrPointAngle4PartialNodes(); // one mirror node's central angle
					var dOneMirrorNodeInnerCircleRadius = aOneNodeReference.GetThisNodeInnerPointRadis4PartialNodes(); // one mirror node's radius value.
					var dOneMirrorNodePosX = dOneMirrorNodeInnerCircleRadius * Math.cos( dOneMirrorNodeCentralAngle ); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
					var dOneMirrorNodePosY = dOneMirrorNodeInnerCircleRadius * Math.sin( dOneMirrorNodeCentralAngle ); 
					vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
					vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.
				}
			}
			// ConstructTheBSplineCurveBasedOnThePointsSequence() is here, William did not want to store the temporary inner mirror points, he just want to store the final interpolate points of the B-Spline curve.
			// I move the code for the generation of cubic B-Spline curve to a independent class. So here may look more clear.
			// --- Step 3. using the above virtual skeleton points to generate the cubic B-spline curves. 
			var aOneEdge4RingGraph = new COneEdge4RingGraph(); // 20110912William. This is a new instance, which will be pushed into the Array later, it is not a reference.
			aOneEdge4RingGraph.SetTheListOfControlPointCoordsX(vPathMirrorNodesPositnXList);
			aOneEdge4RingGraph.SetTheListOfControlPointCoordsY(vPathMirrorNodesPositnYList);
			aOneEdge4RingGraph.AdjustTheBundlingStrengthToTheControlPoints(dTreeRingViewBundleStrength); // 20110719William, set Beta Value, the "Bundling Strength".
			aOneEdge4RingGraph.CalculateTheCubicBSplineAccordingToControlPointUseDeBoorAlgorithm();
			var dLDEdgeWeightValue = this.m_vdEdgeWeightOfTheLDInforEdges[nIdxOfLDEdge];
			var vdRGBColorValue = new Array(3);
			if (gnIndexOfColorScheme4EdgesColor == 12)
			{ // "12" continuous red to green color bar.
				aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dLDEdgeWeightValue, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);
			}
			else
			{ // "0~11" discrete color bar from ColorBrewer.
				aAllNodes4RingGraph.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dLDEdgeWeightValue, gnIndexOfColorScheme4EdgesColor);
			}
			var dColorR = vdRGBColorValue[0];
			var dColorG = vdRGBColorValue[1];
			var dColorB = vdRGBColorValue[2];
			var nColorR = Math.round(dColorR * 255);
			var nColorG = Math.round(dColorG * 255);
			var nColorB = Math.round(dColorB * 255);
			var sColorRGB = "rgb(" + nColorR + ", " + nColorG + "," + nColorB + ")";
			aOneEdge4RingGraph.SetEdgeColorMappedFromTwoLocusTestValue(sColorRGB);
			vaLDEdgesInformtn4PartialNodes.push(aOneEdge4RingGraph);
			vdLDEdgesWeight4PartialNodes.push(dLDEdgeWeightValue);
		}
		// the following code want to traverse the tree to find the ancestor nodes list of each leaf nodes in the nodes pair, which form the edge.
		// but the two leaf nodes may belong to one same ancestor node, then there will be lack of some efficiency.
	}
	else if (this.m_bIsLeafNode == false)
	{	// if it is not a real leaf node
		var aOneChildNodeRefer = new COneNode4RingGraph();
		for (var nIdxChild = 0; nIdxChild < this.m_nNumOfNextLevelChildren; nIdxChild++)
		{	// check each child node.
			var nOneChildIndexInNextLevel = this.m_vIdxOfNextLevelChildren[nIdxChild];
			aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildIndexInNextLevel];
			aOneChildNodeRefer.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively4LDEdges(
					aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength,
					vnLDEdgesIndexOfLevel4PartialNodes, vnLDEdgesIndexInLevel4PartialNodes,
					vnLDEdgesNumOfDefRltn4PartialNodes, vaLDEdgesInformtn4PartialNodes,
					vdLDEdgesWeight4PartialNodes, nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode);
		}
	}
};

// 20111128William. This function is designed to be an recursive function.
COneNode4RingGraph.prototype.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively
	= function(aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength,
			   vnDefinedByOtherNodesIndexOfLevel4PartialNodes, vnDefinedByOtherNodesIndexInLevel4PartialNodes,
			   vnDefinedByOtherNodesNumOfDefRltn4PartialNodes, vaDefinedByOtherNodesEdgeInformtn4PartialNodes,
			   vdDefinedByOtherNodesEdgeWeight4PartialNodes, nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode)
{
	var vvAllNodes4RingGraph = aAllNodes4RingGraph.m_vvAllNodes4RingGraph;
	var dHueRangeBgn = gdHueRangeBgn4EdgeColorBar; // begin from red  // 20120701William Modify this line.
	var dHueRangeEnd = gdHueRangeEnd4EdgeColorBar; // end with green.
	if (this.m_bIsLeafNode == true)
	{	// if it is a real leaf node
		// traverse all the defination relationship between this real leaf node and other leaf nodes A (if A is not shown, search for its ancestor of leaf nodes).
		var nNumOfDefByElem = this.m_vDefinedByOtherLeafNodes.length;
		var aOneNodeReference = new COneNode4RingGraph();
		for (var nIdxOfDefByElem = 0; nIdxOfDefByElem < nNumOfDefByElem; nIdxOfDefByElem++)
		{
			// process one edge (one defination relationship). For example, A(shown)'s child A1(not shown) is defined by B1(not shown), which is the child of B(shown). We need to add one edge from A to B.
			// --- Step 1. traverse the tree, and get the path of nodes linking A and B.
			// we need to index of level and index in level of node A and B1, then we can use fun "GetThePathFromOneNodeToAnotherInHierTree4PartialNodes" to find B(the ancestor of B1), and add the link between A and B.
			var nIndexOfLevelOfNodeWhichDefineThisNode = this.m_vDefinedByOtherLeafNodesLevelNum[nIdxOfDefByElem];
			var nIndexInLevelOfNodeWhichDefineThisNode = this.m_vDefinedByOtherLeafNodesIndexInThatLevel[nIdxOfDefByElem];
			var vThePathsNodesListLinkTwoLeafNodeIndexInLevel = new Array();
			var vThePathsNodesListLinkTwoLeafNodeIndexOfLevel = new Array();
			var vnIndexOfDuplicateExistingEdge = new Array(1);
			vnIndexOfDuplicateExistingEdge[0] = -2;
			var bIsThisOneNew = aAllNodes4RingGraph.GetThePathFromOneNodeToAnotherInHierTree4PartialNodes(
nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode, nIndexOfLevelOfNodeWhichDefineThisNode, nIndexInLevelOfNodeWhichDefineThisNode, vnDefinedByOtherNodesIndexOfLevel4PartialNodes, vnDefinedByOtherNodesIndexInLevel4PartialNodes, vnDefinedByOtherNodesNumOfDefRltn4PartialNodes, vThePathsNodesListLinkTwoLeafNodeIndexOfLevel, vThePathsNodesListLinkTwoLeafNodeIndexInLevel, vnIndexOfDuplicateExistingEdge);
			// so, in the above function, we get the path link the two leaf node, we need to map them to the real position list P of point, then, we can input it P to the B-Spline Curve generation function, to get the detailed B-Splien Curve.
			// Please note that, the begin and end leaf node have been added in the vector "vThePathsNodesListLinkTwoLeafNode", at the begin and end position of the vector. They need special process. I mean, not get the mirror point's radius, but use the inner circle radius as the begin and end point of the curve line.
			if (bIsThisOneNew == false)
			{
				// If it not new, then we need to update the color of the exisitng edge, if the original two locus test value is less than the new one.
				var nIndexOfDuplicateExistingEdge = vnIndexOfDuplicateExistingEdge[0];
				if (nIndexOfDuplicateExistingEdge >= 0)
				{
					var dTwoLocusTestValueNew = this.m_vdDefinedByOtherLeafNodesEdgeWeight[nIdxOfDefByElem];
					var dTwoLocusTestValueOld = vdDefinedByOtherNodesEdgeWeight4PartialNodes[nIndexOfDuplicateExistingEdge];
					if (dTwoLocusTestValueOld < dTwoLocusTestValueNew)
					{
						var vdRGBColorValue = new Array(3);
						aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dTwoLocusTestValueNew, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4EdgeColorBar, gdSatutation4EdgeColorBar, gdIntensity4EdgeColorBar);
						if (gnIndexOfColorScheme4EdgesColor == 12)
						{ // "12" continuous red to green color bar.
							aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dTwoLocusTestValueNew, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
						}
						else
						{ // "0~11" discrete color bar from ColorBrewer.
							aAllNodes4RingGraph.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dTwoLocusTestValueNew, gnIndexOfColorScheme4EdgesColor);
						}
						var dColorR = vdRGBColorValue[0];
						var dColorG = vdRGBColorValue[1];
						var dColorB = vdRGBColorValue[2];
						var nColorR = Math.round(dColorR * 255);
						var nColorG = Math.round(dColorG * 255);
						var nColorB = Math.round(dColorB * 255);
						var sColorRGB = "rgb(" + nColorR + ", " + nColorG + "," + nColorB + ")";
						var aOneEdge4RingGraph = vaDefinedByOtherNodesEdgeInformtn4PartialNodes[nIndexOfDuplicateExistingEdge];
						aOneEdge4RingGraph.SetEdgeColorMappedFromTwoLocusTestValue(sColorRGB);
					}
				}
				continue; // if this one is not new definition, do not add new curve edge.
			}
			// if (bIsThisOneNew == true) do the following code snippet (Step 2 and 3).
			// --- Step 2. map the nodes in the path into the mirror position in the inner circle, and get the virtual skeleton path of the curves for edge.
			var vPathMirrorNodesPositnXList = new Array(); // the x coordinates in Euclidean Coordinate system, of the mirror node of this node's ancestor node.
			var vPathMirrorNodesPositnYList = new Array(); // the y coordinates in Euclidean Coordinate system, of the mirror node of this node's ancestor node.
			var nNumOfPointInTheInnerPathsNodes = vThePathsNodesListLinkTwoLeafNodeIndexOfLevel.length;
			for (var nIdxOfPtInPath = 0; nIdxOfPtInPath < nNumOfPointInTheInnerPathsNodes; nIdxOfPtInPath++)
			{ // for each node in the path ( nodes list of the route link the two leaf node ), map it to the real position value at the inner circle.
				var nOneIndexInLevelOfOneNodeInPath = vThePathsNodesListLinkTwoLeafNodeIndexInLevel[nIdxOfPtInPath]; // one node's index in its level, the idnex is in the variable "m_vvAllNodes4RingGraph";
				var nOneIndexOfLevelOfOneNodeInPath = vThePathsNodesListLinkTwoLeafNodeIndexOfLevel[nIdxOfPtInPath]; // one node's index of level, the idnex is in the variable "m_vvAllNodes4RingGraph";
				aOneNodeReference = vvAllNodes4RingGraph[nOneIndexOfLevelOfOneNodeInPath][nOneIndexInLevelOfOneNodeInPath];
				// --- 2.1. if it is the begin of the path, we need to add the begin point of the curve.
				if ( nIdxOfPtInPath == 0 )
				{	// the begin and end point need special processing, the point is (inner circle radius, central angle).
					var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentrPointAngle4PartialNodes(); // one mirror node's central angle
					var dOneMirrorNodeInnerCircleRadius = aOneNodeReference.GetThisNodeInnerPointRadis4PartialNodes(); // one mirror node's radius value.
					var dOneMirrorNodePosX = dOneMirrorNodeInnerCircleRadius * Math.cos( dOneMirrorNodeCentralAngle ); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
					var dOneMirrorNodePosY = dOneMirrorNodeInnerCircleRadius * Math.sin( dOneMirrorNodeCentralAngle ); 
					vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
					vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.
				}
				// --- 2.2. for all point (begin, middle, or end), we need to add the mirror point (inside the inner circle) to the path of the circle.
				// the point not at begin or end need common processing, the point is (central circle radius, central angle).
				var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentrPointAngle4PartialNodes(); // one mirror node's central angle
				var dOneMirrorNodeRadius = vInnerInvisibleNodesRadius[nOneIndexOfLevelOfOneNodeInPath]; // one mirror node's radius value.
				var dOneMirrorNodePosX = dOneMirrorNodeRadius * Math.cos( dOneMirrorNodeCentralAngle ); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
				var dOneMirrorNodePosY = dOneMirrorNodeRadius * Math.sin( dOneMirrorNodeCentralAngle ); 
				vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
				vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.					
				// --- 2.3. if it is the end of the path, we need to add the end point of the curve.
				if ( nIdxOfPtInPath == (nNumOfPointInTheInnerPathsNodes - 1) )
				{
					var dOneMirrorNodeCentralAngle = aOneNodeReference.GetThisNodeCentrPointAngle4PartialNodes(); // one mirror node's central angle
					var dOneMirrorNodeInnerCircleRadius = aOneNodeReference.GetThisNodeInnerPointRadis4PartialNodes(); // one mirror node's radius value.
					var dOneMirrorNodePosX = dOneMirrorNodeInnerCircleRadius * Math.cos( dOneMirrorNodeCentralAngle ); // in my impression, I remember that the radius is negtive, since the y direction is from up to down.
					var dOneMirrorNodePosY = dOneMirrorNodeInnerCircleRadius * Math.sin( dOneMirrorNodeCentralAngle ); 
					vPathMirrorNodesPositnXList.push(dOneMirrorNodePosX); // insert the value to the begin of the vector.
					vPathMirrorNodesPositnYList.push(dOneMirrorNodePosY); // insert the value to the begin of the vector.
				}
			}
			// ConstructTheBSplineCurveBasedOnThePointsSequence() is here, William did not want to store the temporary inner mirror points, he just want to store the final interpolate points of the B-Spline curve.
			// I move the code for the generation of cubic B-Spline curve to a independent class. So here may look more clear.
			// --- Step 3. using the above virtual skeleton points to generate the cubic B-spline curves. 
			var aOneEdge4RingGraph = new COneEdge4RingGraph(); // 20110912William. This is a new instance, which will be pushed into the Array later, it is not a reference.
			aOneEdge4RingGraph.SetTheListOfControlPointCoordsX(vPathMirrorNodesPositnXList);
			aOneEdge4RingGraph.SetTheListOfControlPointCoordsY(vPathMirrorNodesPositnYList);
			aOneEdge4RingGraph.AdjustTheBundlingStrengthToTheControlPoints(dTreeRingViewBundleStrength); // 20110719William, set Beta Value, the "Bundling Strength".
			aOneEdge4RingGraph.CalculateTheCubicBSplineAccordingToControlPointUseDeBoorAlgorithm();
			var dTwoLocusTestValue = this.m_vdDefinedByOtherLeafNodesEdgeWeight[nIdxOfDefByElem];
			var vdRGBColorValue = new Array(3);
			if (gnIndexOfColorScheme4EdgesColor == 12)
			{ // "12" continuous red to green color bar.
				aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, dTwoLocusTestValue, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
			}
			else
			{ // "0~11" discrete color bar from ColorBrewer.
				aAllNodes4RingGraph.GetRGBColorValueFromColorBrewer(vdRGBColorValue, dTwoLocusTestValue, gnIndexOfColorScheme4EdgesColor);
			}
			var dColorR = vdRGBColorValue[0];
			var dColorG = vdRGBColorValue[1];
			var dColorB = vdRGBColorValue[2];
			var nColorR = Math.round(dColorR * 255);
			var nColorG = Math.round(dColorG * 255);
			var nColorB = Math.round(dColorB * 255);
			var sColorRGB = "rgb(" + nColorR + ", " + nColorG + "," + nColorB + ")";
			aOneEdge4RingGraph.SetEdgeColorMappedFromTwoLocusTestValue(sColorRGB);
			vaDefinedByOtherNodesEdgeInformtn4PartialNodes.push(aOneEdge4RingGraph);
			vdDefinedByOtherNodesEdgeWeight4PartialNodes.push(dTwoLocusTestValue);
		}
		// the following code want to traverse the tree to find the ancestor nodes list of each leaf nodes in the nodes pair, which form the edge.
		// but the two leaf nodes may belong to one same ancestor node, then there will be lack of some efficiency.
	}
	else if (this.m_bIsLeafNode == false)
	{	// if it is not a real leaf node
		// call "ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively()" of all of child nodes of this node
		// then we can build the edges for this node in the tree ring view with partial nodes.
		var aOneChildNodeRefer = new COneNode4RingGraph();
		for (var nIdxChild = 0; nIdxChild < this.m_nNumOfNextLevelChildren; nIdxChild++)
		{	// check each child node.
			var nOneChildIndexInNextLevel = this.m_vIdxOfNextLevelChildren[nIdxChild];
			aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildIndexInNextLevel];
			aOneChildNodeRefer.ConstructThePointsSequenceAndTheBSplineCurve4PartialNodesRecursively(
					aAllNodes4RingGraph, vInnerInvisibleNodesRadius, dTreeRingViewBundleStrength,
					vnDefinedByOtherNodesIndexOfLevel4PartialNodes, vnDefinedByOtherNodesIndexInLevel4PartialNodes,
					vnDefinedByOtherNodesNumOfDefRltn4PartialNodes,  vaDefinedByOtherNodesEdgeInformtn4PartialNodes,
					vdDefinedByOtherNodesEdgeWeight4PartialNodes, nIndexOfLevelOfSourceNode, nIndexInLevelOfSourceNode);
		}
	}
};

COneNode4RingGraph.prototype.AssignFatherNodeIndexInLevelToThisNodeAndChildNode = function(nIdxInLvlOfFatherNode, vvAllNodes4RingGraph)
{	// call this recursive function to assign the Index of Level of father node.
	// --- Step 1. If this node is not root node, assign its father node's index in level;
	// 			   If this node is root node, it does not have father.
	if (this.m_nThisNodeLevel > 0) // not root node
	{
		this.m_nIdxInLevelOfFatherNode = nIdxInLvlOfFatherNode;
	}
	// --- Step 2. Then call all its child's nodes's this function recursively to finish the assignment of father node's index in level.
	for (var nIdxChild = 0; nIdxChild < this.m_nNumOfNextLevelChildren; nIdxChild++)
	{	// check each child node.
		var nOneChildIndexInNextLevel = this.m_vIdxOfNextLevelChildren[nIdxChild];
		var aOneChildNodeReference = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nOneChildIndexInNextLevel];
		aOneChildNodeReference.AssignFatherNodeIndexInLevelToThisNodeAndChildNode(this.m_nThisNodeIndexInLevel, vvAllNodes4RingGraph);
	}
};

// 20111202William. Render the curve edges in the tree ring view with partial nodes.
COneNode4RingGraph.prototype.RenderTreeRingViewsCurveEdgeIfItIsLeafInPartialNodes = function(
		aOneCanvasContext, vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
		bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, nMultipleSelectionHighlightMode)
{	// "aOneCanvasContext" is the canvas context to render the tree ring view;
	// "nLftMarginWdh" is the left margin of the canvas, since there is one frame of the canvas;
	// "nTopMarginHgh" is the top  margin of the canvas, since there is one frame of the canvas;
	// "vvAllNodes4RingGraph" the all nodes' set, we need it to retrieve an arbitrary node.
	// Notes:
	// The coordinates of points in curve edges are relative to the left top corner point of the canvas.
	// I have read the code in function "RenderTreeRingView4ThisNodeAndChildNodesIfNeed()"
	// It dis not add the "Margin" value to the coordinates also. So, we did not need to add margin value here too.
	// --- Part 1. If this node is a "Leaf" node in this view with partial nodes.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
	 && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
	{
		// 20111205William. this node information is stored in :
		// "this.m_nThisNodeLevel", the index of level of this node;
		// "this.m_nThisNodeIndexInLevel", the index in level of this node.
		var nLinesNum = this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes.length; // the length of "m_vDefinedByOtherLeafNodesEdgeInformtn" equals to that of "m_vDefinedByOtherLeafNodes".
		for (var nIdxOneLine = 0; nIdxOneLine < nLinesNum; nIdxOneLine++)
		{	// one definition relationship between two leaf nodes will generate one line, no matter straight or curve.
			// 20111205William. the other node (on the other end of the edge) 's information is store in :
			var nAnotherEndNodeIndexOfLevel = 0;
			var nAnotherEndNodeIndexInLevel = 0;
			nAnotherEndNodeIndexOfLevel = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOneLine];
			nAnotherEndNodeIndexInLevel = this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOneLine];
			// 20120630William. Add this judgement to render the gray color edge first, then render color edges.
			var aAnotherEndNodeRefer = vvAllNodes4RingGraph[nAnotherEndNodeIndexOfLevel][nAnotherEndNodeIndexInLevel];
			var nRltnTypeToTheSelectNode = aAnotherEndNodeRefer.GetThisNodeRltnTypeToTheSelectNode();
			if ( ( bDoesUserSelectOneNode == true && 
		( ( this.m_nRltnTypeToTheSelectNode >= 1 && this.m_nRltnTypeToTheSelectNode <= 5 && nRltnTypeToTheSelectNode == 1 )
	 || ( this.m_nRltnTypeToTheSelectNode == 1 && nRltnTypeToTheSelectNode >= 1 && nRltnTypeToTheSelectNode <= 5 ) ) ) || bDoesUserSelectOneNode == false )
			{	// if user select one node, and one of the two nodes of one edge is equal to the selected node.
				if (bGrayOrColorEdge == false) {continue;}
			}
			else
			{	// if user de-select one node, or no nodes are selected at all.
				if (bGrayOrColorEdge == true) {continue;}
			}
			var aOneEdge4RingGraphReference = this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes[nIdxOneLine];
			var nNumOfPointsInThisEdgeCurve = aOneEdge4RingGraphReference.GetNumOfPointsInThisEdgeCurve();
			var dOldPointXCoords = 0.0; // the x coords of the old point in the curve edge.
			var dOldPointYCoords = 0.0; // the Y coords of the old point in the curve edge.
			var dNewPointXCoords = 0.0; // the x coords of the new point in the curve edge.
			var dNewPointYCoords = 0.0; // the Y coords of the new point in the curve edge.
			for (var nIndexOfPointInEdgeCurve = 0; nIndexOfPointInEdgeCurve < nNumOfPointsInThisEdgeCurve; nIndexOfPointInEdgeCurve++)
			{
				var dOnePointXCoordsInEdgeCurve = nAllRingSectorCenterWdhX + aOneEdge4RingGraphReference.GetOnePointXCoordsInEdgeCurve(nIndexOfPointInEdgeCurve);
				var dOnePointYCoordsInEdgeCurve = nAllRingSectorCenterHghY + aOneEdge4RingGraphReference.GetOnePointYCoordsInEdgeCurve(nIndexOfPointInEdgeCurve);
				// set the old or new point coords.
				if (nIndexOfPointInEdgeCurve == 0)
				{
					dOldPointXCoords = dOnePointXCoordsInEdgeCurve;
					dOldPointYCoords = dOnePointYCoordsInEdgeCurve;
					continue;
				}
				else
				{
					dNewPointXCoords = dOnePointXCoordsInEdgeCurve;
					dNewPointYCoords = dOnePointYCoordsInEdgeCurve;
				}
				// begin to draw the curve line's one segment.
				aOneCanvasContext.beginPath();
				aOneCanvasContext.moveTo(dOldPointXCoords, dOldPointYCoords);
				aOneCanvasContext.lineTo(dNewPointXCoords, dNewPointYCoords);
				dOldPointXCoords = dNewPointXCoords;
				dOldPointYCoords = dNewPointYCoords;
				var sColorRGB = "";
				if ( bDoesUserSelectOneNode == true && 
					( ( this.m_nRltnTypeToTheSelectNode >= 1 && this.m_nRltnTypeToTheSelectNode <= 5 && nRltnTypeToTheSelectNode == 1 )
				   || ( this.m_nRltnTypeToTheSelectNode == 1 && nRltnTypeToTheSelectNode >= 1 && nRltnTypeToTheSelectNode <= 5 ) ) )
				{	// if user select one node, and one of the two nodes of one edge is equal to the selected node.
					sColorRGB = aOneEdge4RingGraphReference.GetEdgeColorMappedFromTwoLocusTestValue();
					aOneCanvasContext.lineWidth = 3; // 20120724 For Figure In Paper.
				}
				else if (bDoesUserSelectOneNode == false)
				{
					sColorRGB = aOneEdge4RingGraphReference.GetEdgeColorMappedFromTwoLocusTestValue();
					aOneCanvasContext.lineWidth = 3;
				}
				else
				{	// if user de-select one node, or no nodes are selected at all.
					sColorRGB = "rgb(100,100,100)";
					aOneCanvasContext.lineWidth = 1;
				}
				aOneCanvasContext.strokeStyle = sColorRGB;
				aOneCanvasContext.stroke();
			}
		}
	}
	// --- Part 2. If this node is not a "Leaf"...\
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
	 && this.m_bIsAtLeastOneChildShownInPartialNodes == true)
	{
		for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
		{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
			var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
			var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
			aOneLinealChldOfThisNode.RenderTreeRingViewsCurveEdgeIfItIsLeafInPartialNodes(aOneCanvasContext, vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
					bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, nMultipleSelectionHighlightMode);
		}
	}
};
// 20130620William. Render the curve edges in the LD ring view with partial nodes.
COneNode4RingGraph.prototype.RenderLDRingViewsCurveEdgeIfItIsRealLeafInPartialNodes = function(
		aOneCanvasContext, vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
		bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, nMultipleSelectionHighlightMode)
{	// "aOneCanvasContext" is the canvas context to render the LD ring view;
	// "nLftMarginWdh" is the left margin of the canvas, since there is one frame of the canvas;
	// "nTopMarginHgh" is the top  margin of the canvas, since there is one frame of the canvas;
	// "vvAllNodes4RingGraph" the all nodes' set, we need it to retrieve an arbitrary node.
	// --- Part 1. If this node is a "Leaf" node in this view with partial nodes.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true && this.m_bIsLeafNode == true)
	{	// 20130620William. "m_bIsLeafNode == true" means the node is real leaf node.
		// 20111205William. this node information is stored in :
		// "this.m_nThisNodeLevel", the index of level of this node;
		// "this.m_nThisNodeIndexInLevel", the index in level of this node.
		var nLinesNum = this.m_vaLDEdgeInformtn4PartialNodes.length; // the length of "m_vDefinedByOtherLeafNodesEdgeInformtn" equals to that of "m_vDefinedByOtherLeafNodes".
		for (var nIdxOneLine = 0; nIdxOneLine < nLinesNum; nIdxOneLine++)
		{	// one definition relationship between two leaf nodes will generate one line, no matter straight or curve.
			// 20111205William. the other node (on the other end of the edge) 's information is store in :
			var nAnotherEndNodeIndexOfLevel = 0;
			var nAnotherEndNodeIndexInLevel = 0;
			nAnotherEndNodeIndexOfLevel = this.m_vnLDEdgeAnotherEndNodesIndexOfLevel4PartialNodes[nIdxOneLine];
			nAnotherEndNodeIndexInLevel = this.m_vnLDEdgeAnotherEndNodesIndexInLevel4PartialNodes[nIdxOneLine];
			// 20120630William. Add this judgement to render the gray color edge first, then render color edges.
			var aAnotherEndNodeRefer = vvAllNodes4RingGraph[nAnotherEndNodeIndexOfLevel][nAnotherEndNodeIndexInLevel];
			var nRltnTypeToTheSelectNode = aAnotherEndNodeRefer.GetThisNodeRltnTypeToTheSelectNode();
			if ( ( bDoesUserSelectOneNode == true && 
		( ( this.m_nRltnTypeToTheSelectNode >= 1 && this.m_nRltnTypeToTheSelectNode <= 5 && nRltnTypeToTheSelectNode == 1 )
	 || ( this.m_nRltnTypeToTheSelectNode == 1 && nRltnTypeToTheSelectNode >= 1 && nRltnTypeToTheSelectNode <= 5 ) ) ) || bDoesUserSelectOneNode == false )
			{	// if user select one node, and one of the two nodes of one edge is equal to the selected node.
				if (bGrayOrColorEdge == false) {continue;}
				if (aAnotherEndNodeRefer.m_bIsLeafNode == false) {continue;} // 20130620William.
			}
			else
			{	// if user de-select one node, or no nodes are selected at all.
				if (bGrayOrColorEdge == true) {continue;}
				if (aAnotherEndNodeRefer.m_bIsLeafNode == false) {continue;} // 20130620William.
			}
			var aOneEdge4RingGraphReference = this.m_vaLDEdgeInformtn4PartialNodes[nIdxOneLine];
			var nNumOfPointsInThisEdgeCurve = aOneEdge4RingGraphReference.GetNumOfPointsInThisEdgeCurve();
			var dOldPointXCoords = 0.0; // the x coords of the old point in the curve edge.
			var dOldPointYCoords = 0.0; // the Y coords of the old point in the curve edge.
			var dNewPointXCoords = 0.0; // the x coords of the new point in the curve edge.
			var dNewPointYCoords = 0.0; // the Y coords of the new point in the curve edge.
			for (var nIndexOfPointInEdgeCurve = 0; nIndexOfPointInEdgeCurve < nNumOfPointsInThisEdgeCurve; nIndexOfPointInEdgeCurve++)
			{
				var dOnePointXCoordsInEdgeCurve = nAllRingSectorCenterWdhX + aOneEdge4RingGraphReference.GetOnePointXCoordsInEdgeCurve(nIndexOfPointInEdgeCurve);
				var dOnePointYCoordsInEdgeCurve = nAllRingSectorCenterHghY + aOneEdge4RingGraphReference.GetOnePointYCoordsInEdgeCurve(nIndexOfPointInEdgeCurve);
				// set the old or new point coords.
				if (nIndexOfPointInEdgeCurve == 0)
				{
					dOldPointXCoords = dOnePointXCoordsInEdgeCurve;
					dOldPointYCoords = dOnePointYCoordsInEdgeCurve;
					continue;
				}
				else
				{
					dNewPointXCoords = dOnePointXCoordsInEdgeCurve;
					dNewPointYCoords = dOnePointYCoordsInEdgeCurve;
				}
				// begin to draw the curve line's one segment.
				aOneCanvasContext.beginPath();
				aOneCanvasContext.moveTo(dOldPointXCoords, dOldPointYCoords);
				aOneCanvasContext.lineTo(dNewPointXCoords, dNewPointYCoords);
				dOldPointXCoords = dNewPointXCoords;
				dOldPointYCoords = dNewPointYCoords;
				var sColorRGB = "";
				if ( bDoesUserSelectOneNode == true && 
					( ( this.m_nRltnTypeToTheSelectNode >= 1 && this.m_nRltnTypeToTheSelectNode <= 5 && nRltnTypeToTheSelectNode == 1 )
				   || ( this.m_nRltnTypeToTheSelectNode == 1 && nRltnTypeToTheSelectNode >= 1 && nRltnTypeToTheSelectNode <= 5 ) ) )
				{	// if user select one node, and one of the two nodes of one edge is equal to the selected node.
					sColorRGB = aOneEdge4RingGraphReference.GetEdgeColorMappedFromTwoLocusTestValue();
					aOneCanvasContext.lineWidth = 3; // 20120724 For Figure In Paper.
				}
				else if (bDoesUserSelectOneNode == false)
				{
					sColorRGB = aOneEdge4RingGraphReference.GetEdgeColorMappedFromTwoLocusTestValue();
					aOneCanvasContext.lineWidth = 3;
				}
				else
				{	// if user de-select one node, or no nodes are selected at all.
					sColorRGB = "rgb(100,100,100)";
					aOneCanvasContext.lineWidth = 1;
				}
				aOneCanvasContext.strokeStyle = sColorRGB;
				aOneCanvasContext.stroke();
			}
		}
	}
	// --- Part 2. If this node is not a "Leaf"...\
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
	 && this.m_bIsAtLeastOneChildShownInPartialNodes == true)
	{
		for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
		{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
			var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
			var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
			aOneLinealChldOfThisNode.RenderLDRingViewsCurveEdgeIfItIsRealLeafInPartialNodes(aOneCanvasContext, vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY,
					bDoesUserSelectOneNode, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView, bGrayOrColorEdge, nMultipleSelectionHighlightMode);
		}
	}
};
//20121020William. Render the gray curve edges in the tree ring view when user searching.
COneNode4RingGraph.prototype.RenderTreeRingViewsGrayCurveEdge4SearchNodes = function(
		aOneCanvasContext, vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY)
{	// "aOneCanvasContext" is the canvas context to render the tree ring view;
	// "nLftMarginWdh" is the left margin of the canvas, since there is one frame of the canvas;
	// "nTopMarginHgh" is the top  margin of the canvas, since there is one frame of the canvas;
	// "vvAllNodes4RingGraph" the all nodes' set, we need it to retrieve an arbitrary node.
	// Notes:
	// The coordinates of points in curve edges are relative to the left top corner point of the canvas.
	// I have read the code in function "RenderTreeRingView4ThisNodeAndChildNodesIfNeed()"
	// It dis not add the "Margin" value to the coordinates also. So, we did not need to add margin value here too.
	// --- Part 1. If this node is a "Leaf" node in this view with partial nodes.
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
	 && this.m_bIsAtLeastOneChildShownInPartialNodes == false)
	{
		// 20111205William. this node information is stored in :
		// "this.m_nThisNodeLevel", the index of level of this node;
		// "this.m_nThisNodeIndexInLevel", the index in level of this node.
		var nLinesNum = this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes.length; // the length of "m_vDefinedByOtherLeafNodesEdgeInformtn" equals to that of "m_vDefinedByOtherLeafNodes".
		for (var nIdxOneLine = 0; nIdxOneLine < nLinesNum; nIdxOneLine++)
		{	// one definition relationship between two leaf nodes will generate one line, no matter straight or curve.
			// 20111205William. the other node (on the other end of the edge) 's information is store in :
			var nAnotherEndNodeIndexOfLevel = 0;
			var nAnotherEndNodeIndexInLevel = 0;
			nAnotherEndNodeIndexOfLevel = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdxOneLine];
			nAnotherEndNodeIndexInLevel = this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdxOneLine];
			// 20120630William. Add this judgement to render the gray color edge first, then render color edges.
			var aAnotherEndNodeRefer = vvAllNodes4RingGraph[nAnotherEndNodeIndexOfLevel][nAnotherEndNodeIndexInLevel];
			var aOneEdge4RingGraphReference = this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes[nIdxOneLine];
			var nNumOfPointsInThisEdgeCurve = aOneEdge4RingGraphReference.GetNumOfPointsInThisEdgeCurve();
			var dOldPointXCoords = 0.0; // the x coords of the old point in the curve edge.
			var dOldPointYCoords = 0.0; // the Y coords of the old point in the curve edge.
			var dNewPointXCoords = 0.0; // the x coords of the new point in the curve edge.
			var dNewPointYCoords = 0.0; // the Y coords of the new point in the curve edge.
			for (var nIndexOfPointInEdgeCurve = 0; nIndexOfPointInEdgeCurve < nNumOfPointsInThisEdgeCurve; nIndexOfPointInEdgeCurve++)
			{
				var dOnePointXCoordsInEdgeCurve = nAllRingSectorCenterWdhX + aOneEdge4RingGraphReference.GetOnePointXCoordsInEdgeCurve(nIndexOfPointInEdgeCurve);
				var dOnePointYCoordsInEdgeCurve = nAllRingSectorCenterHghY + aOneEdge4RingGraphReference.GetOnePointYCoordsInEdgeCurve(nIndexOfPointInEdgeCurve);
				// set the old or new point coords.
				if (nIndexOfPointInEdgeCurve == 0)
				{
					dOldPointXCoords = dOnePointXCoordsInEdgeCurve;
					dOldPointYCoords = dOnePointYCoordsInEdgeCurve;
					continue;
				}
				else
				{
					dNewPointXCoords = dOnePointXCoordsInEdgeCurve;
					dNewPointYCoords = dOnePointYCoordsInEdgeCurve;
				}
				// begin to draw the curve line's one segment.
				aOneCanvasContext.beginPath();
				aOneCanvasContext.moveTo(dOldPointXCoords, dOldPointYCoords);
				aOneCanvasContext.lineTo(dNewPointXCoords, dNewPointYCoords);
				dOldPointXCoords = dNewPointXCoords;
				dOldPointYCoords = dNewPointYCoords;
				var sColorRGB = "rgb(100,100,100)";
				aOneCanvasContext.lineWidth = 1;
				aOneCanvasContext.strokeStyle = sColorRGB;
				aOneCanvasContext.stroke();
			}
		}
	}
	// --- Part 2. If this node is not a "Leaf"...\
	if (this.m_bShowOrNotShowThisNodeInPartialNodesMode == true
	 && this.m_bIsAtLeastOneChildShownInPartialNodes == true && this.m_bIsLeafNode == false)
	{
		for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
		{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
			var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
			var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
			aOneLinealChldOfThisNode.RenderTreeRingViewsGrayCurveEdge4SearchNodes(
					aOneCanvasContext, vvAllNodes4RingGraph, nAllRingSectorCenterWdhX, nAllRingSectorCenterHghY);
		}
	}
};
// 20120630William, select the maximum single locus test value among children, and set the node color of this node.
COneNode4RingGraph.prototype.GetTheLargestSingleTestValueAmongChildrenNodesAndSetNodeColor = function(aAllNodes4RingGraph, vvAllNodes4RingGraph)
{
	// First, we need to judge whether it is a leaf node.
	if (this.m_bIsLeafNode == false)
	{
		this.m_dSingleLocusTestValueScaled = 0.0;
		// Traverse all the child node to find the maximum single locus test value
		// then set its children or grandchildren or ...
		for (var nIdxChld = 0; nIdxChld < this.m_nNumOfNextLevelChildren; nIdxChld++)
		{	// for each child.
			var nIdxInNextLvl = this.m_vIdxOfNextLevelChildren[nIdxChld];
			var aOneChildNodeRefer = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvl]; // get the reference of one child node.
			var dSingleTestValue = aOneChildNodeRefer.GetTheLargestSingleTestValueAmongChildrenNodesAndSetNodeColor(aAllNodes4RingGraph, vvAllNodes4RingGraph);
			if (dSingleTestValue > this.m_dSingleLocusTestValueScaled)
			{
				this.m_dSingleLocusTestValueScaled = dSingleTestValue;
			}
		}
	}
	// Then set the color.
	var dHueRangeBgn = gdHueRangeBgn4NodeColorBar; // begin from cyan
	var dHueRangeEnd = gdHueRangeEnd4NodeColorBar; // end with purple.
	var vdRGBColorValue = new Array(3);
	if (gnIndexOfColorScheme4NodesColor == 12)
	{ // "12" continuous red to green color bar.
		aAllNodes4RingGraph.GetRGBColorValueFromHSVColorSpaceUsingScaledTestValueAndHueRange(vdRGBColorValue, this.m_dSingleLocusTestValueScaled, 0.0, 1.0, dHueRangeBgn, dHueRangeEnd, gbClockwiseOrCounterClockwise4NodeColorBar, gdSatutation4NodeColorBar, gdIntensity4NodeColorBar);		
	}
	else
	{ // "0~11" discrete color bar from ColorBrewer.
		aAllNodes4RingGraph.GetRGBColorValueFromColorBrewer(vdRGBColorValue, this.m_dSingleLocusTestValueScaled, gnIndexOfColorScheme4NodesColor);
	}
	this.SetSingleLocusTestValueScaledMapNodeColor(vdRGBColorValue);
	return this.m_dSingleLocusTestValueScaled;
};
COneNode4RingGraph.prototype.IsThisNodeExistInSelectedNodeList = function(nThisNodeIndexOfLevel, nThisNodeIndexInLevel, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView)
{	// 20120630William. Add this for multiple nodes selection.
	var bIsThisNodeExistInTheSelectedNodesList = false;
	var nNumOfSelectedNode = vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView.length;
	for (var nIdx = 0; nIdx < nNumOfSelectedNode; nIdx++)
	{
		var nIdxOfLevel = vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView[nIdx];
		var nIdxInLevel = vnSelectedNodeIndexInLevel4PartialNodesTreeRingView[nIdx];
		if (nIdxOfLevel == nThisNodeIndexOfLevel && nIdxInLevel == nThisNodeIndexInLevel)
		{	// this node exist.
			bIsThisNodeExistInTheSelectedNodesList = true;
			break;
		}
	}
	return bIsThisNodeExistInTheSelectedNodesList;
};
COneNode4RingGraph.prototype.CalculateDistanceBetweenEachTwoLocusTestEdgeAndMousePos = function(vvAllNodes4RingGraph, vaAllEdgesBriefInforWithDistToMouse, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY){
	var nNumOfTwoLocusTestEdges = this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes.length;
	for (var nIdx = 0; nIdx < nNumOfTwoLocusTestEdges; nIdx++){
		var aOneBriefEdgeInfor = new COneEdgeBriefInfor();
		// This Node
		aOneBriefEdgeInfor.m_nIndexOfLevel4Node1 = this.m_nThisNodeLevel;
		aOneBriefEdgeInfor.m_nIndexInLevel4Node1 = this.m_nThisNodeIndexInLevel;
		aOneBriefEdgeInfor.m_nIndexOfEdgeInformn = nIdx;
		// Another Node
		aOneBriefEdgeInfor.m_nIndexOfLevel4Node2 = this.m_vnDefinedByOtherNodesIndexOfLevel4PartialNodes[nIdx];
		aOneBriefEdgeInfor.m_nIndexInLevel4Node2 = this.m_vnDefinedByOtherNodesIndexInLevel4PartialNodes[nIdx];
		var aAnotherNodeRefer = vvAllNodes4RingGraph[aOneBriefEdgeInfor.m_nIndexOfLevel4Node2][aOneBriefEdgeInfor.m_nIndexInLevel4Node2];
		var bIsAnotherNodeRealLeafNode = aAnotherNodeRefer.GetIsLeafNode();
		if (bIsAnotherNodeRealLeafNode == false) {continue;}
		// Calculate the distance between this mouse pos and this edge curve.
		var aOneEdgeCurveRefer = this.m_vaDefinedByOtherNodesEdgeInformtn4PartialNodes[nIdx];
		var dDistBtwnMouseAndEdgeCurve = aOneEdgeCurveRefer.CalculateDistanceBetweenMousePosAndEdgeCurve(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
		aOneBriefEdgeInfor.m_dDistanceToMousePos = dDistBtwnMouseAndEdgeCurve;
		vaAllEdgesBriefInforWithDistToMouse.push(aOneBriefEdgeInfor);
	};
	// recursive call all child.
	for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
	{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
		var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
		var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
		var bIsThisNodeShown = aOneLinealChldOfThisNode.GetThisNodeShownOrNotInThisPartialNodesMode();
		if (bIsThisNodeShown == true){
			aOneLinealChldOfThisNode.CalculateDistanceBetweenEachTwoLocusTestEdgeAndMousePos(vvAllNodes4RingGraph, vaAllEdgesBriefInforWithDistToMouse, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
		}
	}
};
COneNode4RingGraph.prototype.CalculateDistanceBetweenEachLDInforEdgeAndMousePos = function(vvAllNodes4RingGraph, vaAllEdgesBriefInforWithDistToMouse, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY){
	var nNumOfLDEdges = this.m_vaLDEdgeInformtn4PartialNodes.length;
	for (var nIdx = 0; nIdx < nNumOfLDEdges; nIdx++){
		var aOneBriefEdgeInfor = new COneEdgeBriefInfor();
		// This Node
		aOneBriefEdgeInfor.m_nIndexOfLevel4Node1 = this.m_nThisNodeLevel;
		aOneBriefEdgeInfor.m_nIndexInLevel4Node1 = this.m_nThisNodeIndexInLevel;
		aOneBriefEdgeInfor.m_nIndexOfEdgeInformn = nIdx;
		// Another Node
		aOneBriefEdgeInfor.m_nIndexOfLevel4Node2 = this.m_vnLDEdgeAnotherEndNodesIndexOfLevel4PartialNodes[nIdx];
		aOneBriefEdgeInfor.m_nIndexInLevel4Node2 = this.m_vnLDEdgeAnotherEndNodesIndexInLevel4PartialNodes[nIdx];
		// Calculate the distance between this mouse pos and this edge curve.
		var aOneEdgeCurveRefer = this.m_vaLDEdgeInformtn4PartialNodes[nIdx];
		var dDistBtwnMouseAndEdgeCurve = aOneEdgeCurveRefer.CalculateDistanceBetweenMousePosAndEdgeCurve(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
		aOneBriefEdgeInfor.m_dDistanceToMousePos = dDistBtwnMouseAndEdgeCurve;
		vaAllEdgesBriefInforWithDistToMouse.push(aOneBriefEdgeInfor);
	};
	// recursive call all child.
	for (var nIdxOfChild = 0; nIdxOfChild < this.m_nNumOfNextLevelChildren; nIdxOfChild++)
	{	// for each children node of this node, call this function "CountTheFinestLevelChildrenNodesInPartialNodes".
		var nIdxInNextLvlOfOneChild = this.m_vIdxOfNextLevelChildren[nIdxOfChild];
		var aOneLinealChldOfThisNode = vvAllNodes4RingGraph[this.m_nThisNodeLevel + 1][nIdxInNextLvlOfOneChild];
		aOneLinealChldOfThisNode.CalculateDistanceBetweenEachLDInforEdgeAndMousePos(vvAllNodes4RingGraph, vaAllEdgesBriefInforWithDistToMouse, nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY);
	}
};

























