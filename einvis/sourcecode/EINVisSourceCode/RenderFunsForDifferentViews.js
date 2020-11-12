// --- 1. Render Tree Ring View ---
// 20111109William. To render the "Tree Ring View" on a 2D canvas. With the interaction from user.
function RenderTreeRingViewWithInteraction()
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4TreeRingView];
	// --- 1 --- before rendering, we need to get the width and height of the canvas.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nTreeRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nTreeRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aAllNodes4RingGraph.SetCanvasWidthAndHeight(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh);
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nTreeRingViewCanvasWdh, nTreeRingViewCanvasHgh);
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// --- Step 0. Refresh the level width of each level
	aAllNodes4RingGraph.RefreshTreeRingViewLevelWidthVariable();
	// --- Step 1. Set the partial nodes to just show the root nodes.
//	aAllNodes4RingGraph.SetWhichNodesAreShownAtInitial(); // set which nodes are shown in the initial mode.
	aAllNodes4RingGraph.SetAllNodesAreShownAtInitial(); // 20120629William, set to show all the nodes at initial, just for convenient to debug.
	// --- Step 2. Count the children nodes of each nodes under this partial nodes mode.
	aAllNodes4RingGraph.CountTheFinestLevelChildrenNodesInThisPartialNodesMode();
	// --- Step 3. Generate the layout of the TRW for partial nodes.
	aAllNodes4RingGraph.GenerateLayoutOfTheTreeRingView4PartialNodes();
	// --- Step 4. Generate the Edges (B-Spline Curves) for the partial nodes.
	aAllNodes4RingGraph.GenerateCurveEdgesOfPiecewiseCubicBSpline4PartialNodes();
	// --- Step 5. Call rendering function. 20111202William, Render the curve edges. This Step must be run after Step 4 "Generation of Curve Edge".
	var vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView = new Array();
	var vnSelectedNodeIndexInLevel4PartialNodesTreeRingView = new Array();
	aAllNodes4RingGraph.RenderTreeRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, false, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// the above process is also called in sequence in the following function:
	// "UpdateTreeRingView4PartialNodes4UserMouseInteract()" in class "CAllNodes4RingGraph.js".
};

// --- 2. Render LD Ring View ---
//20130619William. To render the "LD Ring View" on a 2D canvas. With the interaction from user.
function RenderLDRingViewWithInteraction()
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4LDRingView];
	// --- 1 --- before rendering, we need to get the width and height of the canvas.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var nLDRingViewCanvasWdh = aOneCanvasRefer.m_nCanvasWidth;
	var nLDRingViewCanvasHgh = aOneCanvasRefer.m_nCanvasHeght;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nLDRingViewCanvasWdh, nLDRingViewCanvasHgh);
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// --- Step 0.1.2.3.4. Must already be called in function "RenderTreeRingViewWithInteraction", so NOT here again.
	// Only call rendering function here.
	// --- Step 5. Call rendering function.
	var vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView = new Array();
	var vnSelectedNodeIndexInLevel4PartialNodesTreeRingView = new Array();
	aAllNodes4RingGraph.RenderLDRingView4PartialNodes(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh, false, vnSelectedNodeIndexOfLevel4PartialNodesTreeRingView, vnSelectedNodeIndexInLevel4PartialNodesTreeRingView);
	// the above process is also called in sequence in the following function:
	// "UpdateTreeRingView4PartialNodes4UserMouseInteract()" in class "CAllNodes4RingGraph.js".
};

// --- 3. Render Matrix View ---
// 20111016William. To render the "Matrix View" on 2D canvas, which visualize the definition relationship among params.
// This "Matrix View" can be used as debug view for the later "Orthogonal Graph" view.
// The "Orthogonal Graph" view will adapt a special strategy to shuffle the order of the parameters either on the left side, or on the top side.
// Based on this order, it will optimize (not optimal) the crossing; Then, The "Orthogonal Graph" view will split each node according to the degree of input/output definition relationship.
function RenderMatrixView4Definition()
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView];
	// --- 1 --- before rendering, we need to get the width and height of the canvas.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	// 20111018William. We need to add some pre-processing functions. These functions do not need to run for each time when render the Matrix View. I just put it here, for simple and easy understanding, modulize.
	// You can move them to other files, to let the following functions run only once.
	aAllNodes4RingGraph.ComputeRowHghForNodesInForwardOrderNatrualPos(); // 20120707 Change to natural order.
	aAllNodes4RingGraph.ComputeColWdhForNodesInBckwardOrderNatrualPos(); // this fun and the above fun are parallel. There is not causal (or first/second) relationship.
	// The above two functions can sort the root nodes.
	// for each root node, we need to sort its children nodes. The sorting process must be follow breath-first traverse principle.
	// The level of father node must be sorted first, then its children can know which siblings of its father are at left/right/top/bottom, this will guide it during the sorting process.
	aAllNodes4RingGraph.ComputeRowHghInForwardOrderAndColWdhInBckwardOrder4ChildNatrualPos(); // 20120707 Change to natural order.
	// 20111018William. The above fun is to sort the child nodes, iteratively.
	// For simple, we only consider the inner relationship among siblings, we did not consider the relationship between one child node and outside nodes (outside of children nodes of this father node).
	UpdateTheMatrixView(0, 0);
};

function UpdateTheMatrixView(nLftMarginLeafNodeBgnIdx, nTopMarginLeafNodeBgnIdx)
{
	var aOneCanvasRefer = vaGlobalMyCanvasList[gnCanvasID4MatrixView]; // 4 is the second common canvas.
	// --- 1 --- before rendering, we need to get the width and height of the canvas.
	var nLftMarginWdh = aOneCanvasRefer.m_nCanvasBorderWidthSideArc + aOneCanvasRefer.m_nCanvasBorderWidthCorner + aOneCanvasRefer.m_nCanvasInnerBorderCornerRadius;
	var nTopMarginHgh = nLftMarginWdh; // right now, it is the same.
	var aOneCanvasContext = aOneCanvasRefer.m_aCanvasContext;
	// --- All Right, we have got the order of Root Nodes, also Child Nodes of each father node.
	// Begin to render the Matrix View. It is an examination of the above algorithm. Later We will render another view, which is the orthogonal graph view.
	aAllNodes4RingGraph.GetLeftLabelsWidthEqualTopLabelsHeight(nLftMarginWdh, nTopMarginHgh, nLftMarginLeafNodeBgnIdx, nTopMarginLeafNodeBgnIdx);
	// Get the size of canvas, and resize the canvas.
	var nCanvasWidth = aAllNodes4RingGraph.m_nCanvasWidth4MatrixView;
	var nCanvasHeght = aAllNodes4RingGraph.m_nCanvasHeght4MatrixView;
	aOneCanvasRefer.ResizeThisCanvasWithAbsoluteWdhHghValue(nCanvasWidth, nCanvasHeght);
	// Finally, we can render the Matrix View on this canvas.
	aAllNodes4RingGraph.SynthesizeMatrixViewForDefinationWithLabel(aOneCanvasContext, nLftMarginWdh, nTopMarginHgh);
};