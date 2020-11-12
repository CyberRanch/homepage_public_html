// to receive the data from the server.
// 20120701William. We need some global variable to store the whole data (Top 1K). And then, user can move the slider to choose to show top 100.
var gvvsJSAllUniqueSNPsInfor = new Array();
// Two locus test values (edges)
var gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs = new Array();
var gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs = new Array();
var gvdJSTwoLocusTestValue = new Array();
// LD information values (edges)
var gvnJSLDInforFstSNPIndexInUniqueSNPs = new Array();
var gvnJSLDInforSndSNPIndexInUniqueSNPs = new Array();
var gvdJSLDInforValue = new Array();
var gbDoesNodesFileReloaded = false;
var gbDoesEdgesFileReloaded = false;
var gbDoesLDInforEdgesFileReloaded = false;
var gbDoesUserLoadAnyFiles = false; // the flag. when user load the web page for the first time, it is "false", and we only render two button for user to select files; after user select files, it becomes "true", we add other controls to tree ring view canvas.

function ReRenderViewsAfterUserLoadNewFiles()
{ // 20120704. It will clear everything, and begin from the very beginning to render the views.
	// Then, we can do the same thing as what we do in the message response function of "NumOfTopPairs" slider:
	// "function MessageFunction4SliderOfNumOfTopPairs(event)" in file "CMyCanvasWindowCommon.js"
	gsNewValueNumEdgesSldr = 3; // 20120704. Reassign the slider value of number of edges.  // 20120724 For Figure In Paper, original '3'.
	ReRenderAllViewsAfterUserChangeSomeControlsParameters(); // 20120927 This is one main entry point.
	// The following three user interactions will run to the above function:
	// 1) User Click on "Demo" button; It will call "ReRenderViewsAfterUserLoadNewFiles" function.
	// 2) User Select two files, and click on "Start Rendering" button; It will call "ReRenderViewsAfterUserLoadNewFiles" function.
	// 3) User Adjust the Number of Edges shown; It will call "ReRenderAllViewsAfterUserChangeSomeControlsParameters" function directly.
};

function ReAssignTopPercentData(dTopPercentToShow)
{	// 20111006William. Response to fun "ReadAndParseTheLeafNodesParamRealNameListFile" in file "CEchoDataOnServer.php".
	nTimeBgn = (new Date()).getTime(); // get the current time. unit "ms".
	// Get How many SNPs pairs you want to show
	var nTotalNumOfSNPsPairs  = gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs.length;
	var nNumOfSNPsPairsToShow = Math.round(nTotalNumOfSNPsPairs * dTopPercentToShow);
	gnNumOfEdgesToShow = nNumOfSNPsPairsToShow;
	// --- 0 --- Copy partial number of Top SNPs pairs.
	var vvsJSAllUniqueSNPsInfor = new Array();
	// --- 0.1 Two Locus Test Edges Information.
	var vnJSTwoLocusTestFstSNPIndexInUniqueSNPs = new Array();
	var vnJSTwoLocusTestSndSNPIndexInUniqueSNPs = new Array();
	var vdJSTwoLocusTestValue = new Array();
	// --- 0.2 LD Information Edges.
	var vnJSLDInforFstSNPIndexInUniqueSNPs = new Array();
	var vnJSLDInforSndSNPIndexInUniqueSNPs = new Array();
	var vdJSLDInforValue = new Array();
	SelectionTopPercentSNPsPairs(vvsJSAllUniqueSNPsInfor, vnJSTwoLocusTestFstSNPIndexInUniqueSNPs, vnJSTwoLocusTestSndSNPIndexInUniqueSNPs, vdJSTwoLocusTestValue, nNumOfSNPsPairsToShow, vnJSLDInforFstSNPIndexInUniqueSNPs, vnJSLDInforSndSNPIndexInUniqueSNPs, vdJSLDInforValue);
	// --- 1 --- set the parameter name and construct the hierarchical tree.
	var nNumOfUniqueSNPs = vvsJSAllUniqueSNPsInfor.length;
	for (var nIdx = 0; nIdx < nNumOfUniqueSNPs; nIdx++)
	{
		var vsOneSNPInfor = vvsJSAllUniqueSNPsInfor[nIdx];
		var nNumOfTokens = vsOneSNPInfor.length - 1; // the number of tokens
		var nIdxOfOneNode = nIdx;
		// "vsOneLeafNodeTokensList" contains one node parameter's seperated name, such as "Brain.CO2.HO2" node will contain "Brain" "CO2" "HO2" three string in the array,
		aAllNodes4RingGraph.ClearTheOneLeafNodeTokensSet();
		aAllNodes4RingGraph.SetGlobalIndexOfOneLeafNodeTokensSet(nIdxOfOneNode);
		for (var nIdxOfTokens = 0;nIdxOfTokens < nNumOfTokens; nIdxOfTokens++)
		{
			var sOneToken = vsOneSNPInfor[nIdxOfTokens];
			aAllNodes4RingGraph.AddOneTokenToOneLeafNodeTokensSet(sOneToken);
		}
		var dSingleLocusTestValue = vsOneSNPInfor[nNumOfTokens];
		aAllNodes4RingGraph.AddOneGlobalParameterRealName(dSingleLocusTestValue);
	}
	// --- 2 --- add the (Two Locus Test) relationship edge.
	var nNumOfRltns = vnJSTwoLocusTestFstSNPIndexInUniqueSNPs.length;
	for (var nIdxOfRltns = 0; nIdxOfRltns < nNumOfRltns; nIdxOfRltns++)
	{
		var nJSIndexDefEdgeFrom = vnJSTwoLocusTestFstSNPIndexInUniqueSNPs[nIdxOfRltns];
		var nJSIndexDefEdgeTo   = vnJSTwoLocusTestSndSNPIndexInUniqueSNPs[nIdxOfRltns];
		var dTwoLocusTestValue  = vdJSTwoLocusTestValue[nIdxOfRltns];
		var nIndexInOriginalSNPsListFrom = gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs[nIdxOfRltns];
		var nIndexInOriginalSNPsListTo   = gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs[nIdxOfRltns];
		aAllNodes4RingGraph.AddOneDefinedByRltn4GraphEdge(nJSIndexDefEdgeFrom, nJSIndexDefEdgeTo, dTwoLocusTestValue, nIndexInOriginalSNPsListFrom, nIndexInOriginalSNPsListTo);
	}
	// --- 3 --- add the LD relationship edge.
	var nNumOfLDRltns = vnJSLDInforFstSNPIndexInUniqueSNPs.length;
	for (var nIdxOfRltns = 0; nIdxOfRltns < nNumOfLDRltns; nIdxOfRltns++)
	{
		var nLDInforEdgeNode1Index = vnJSLDInforFstSNPIndexInUniqueSNPs[nIdxOfRltns];
		var nLDInforEdgeNode2Index = vnJSLDInforSndSNPIndexInUniqueSNPs[nIdxOfRltns];
		var dLDInforValue 		   = vdJSLDInforValue[nIdxOfRltns];
		aAllNodes4RingGraph.AddOneLDInforEdge(nLDInforEdgeNode1Index, nLDInforEdgeNode2Index, dLDInforValue);
	}
	// 20111012William. Count the runtime of the program.
	nTimeEnd = (new Date()).getTime(); // get the current time. unit "ms".
	var nRunTime = nTimeEnd - nTimeBgn;
	console.log("Passing Data From Global All Data: " + nRunTime + "ms");
}

function SelectionTopPercentSNPsPairs(vvsJSAllUniqueSNPsInfor, vnJSTwoLocusTestFstSNPIndexInUniqueSNPs, vnJSTwoLocusTestSndSNPIndexInUniqueSNPs, vdJSTwoLocusTestValue, nNumOfSNPsPairsToShow, vnJSLDInforFstSNPIndexInUniqueSNPs, vnJSLDInforSndSNPIndexInUniqueSNPs, vdJSLDInforValue)
{	// It is not too easy to select the top 10% SNPs Pairs from the top 1K SNPs Pairs.
	// First, we need to scan the first Top 10% percent SNPs Pairs, and to see which SNPs are involved in the top 10% SNPs Pairs.
	// Input: gvvsJSAllUniqueSNPsInfor, gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs, gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs, gvdJSTwoLocusTestValue. The data contains all the top 1K SNPs Pairs.
	// Output: vsJSAllUniqueSNPsInfor, vnJSTwoLocusTestFstSNPIndexInUniqueSNPs, vnJSTwoLocusTestSndSNPIndexInUniqueSNPs, vdJSTwoLocusTestValue. The data contains all the top 100 SNPs Pairs.
	// Input: nTotalNumOfSNPsPairs. is the Number of SNP pairs to be shown.
	// 20130620William. Add the function that the LD infor. edges are also selected.
	// Initialize some auxiliary variables.
	var nTotalNumOfUnqiueSNPs = gvvsJSAllUniqueSNPsInfor.length;
	var vbDoesThisSNPsInvoled = new Array(nTotalNumOfUnqiueSNPs);
	var vnIndexOfSNPsInNewUniqueSNPsList = new Array(nTotalNumOfUnqiueSNPs);
	for (var nIdx = 0; nIdx < nTotalNumOfUnqiueSNPs; nIdx++)
	{
		vbDoesThisSNPsInvoled[nIdx] = false;
		vnIndexOfSNPsInNewUniqueSNPsList[nIdx] = -1;
	}
	// Scan the top 10% SNPs pairs to find which SNPs involved.
	var nTotalNumOfSNPsPairs = gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs.length;
	if (nNumOfSNPsPairsToShow > nTotalNumOfSNPsPairs){return;} // error infor, selected # is larger than total #.
	for (var nIdx = 0; nIdx < nNumOfSNPsPairsToShow; nIdx++)
	{
		var nFstSNPIndex = gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs[nIdx];
		var nSndSNPIndex = gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs[nIdx];
		vbDoesThisSNPsInvoled[nFstSNPIndex] = true;
		vbDoesThisSNPsInvoled[nSndSNPIndex] = true;
	}
	// Count the total number of SNP involved.
	var nNumOfUniqueSNPsNew = 0;
	for (var nIdx = 0; nIdx < nTotalNumOfUnqiueSNPs; nIdx++)
	{
		if (vbDoesThisSNPsInvoled[nIdx] == true)
		{
			vnIndexOfSNPsInNewUniqueSNPsList[nIdx] = nNumOfUniqueSNPsNew;
			vvsJSAllUniqueSNPsInfor.push(gvvsJSAllUniqueSNPsInfor[nIdx]);
			nNumOfUniqueSNPsNew++;
		}
	}
	// Find the Top 10% SNPs Pairs new index pair in Two Locus Test edges.
	for (var nIdx = 0; nIdx < nNumOfSNPsPairsToShow; nIdx++)
	{
		var nFstSNPIndex = gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs[nIdx];
		var nSndSNPIndex = gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs[nIdx];
		var nFstSNPIndexNew = vnIndexOfSNPsInNewUniqueSNPsList[nFstSNPIndex];
		var nSndSNPIndexNew = vnIndexOfSNPsInNewUniqueSNPsList[nSndSNPIndex];
		vnJSTwoLocusTestFstSNPIndexInUniqueSNPs.push(nFstSNPIndexNew);
		vnJSTwoLocusTestSndSNPIndexInUniqueSNPs.push(nSndSNPIndexNew);
		vdJSTwoLocusTestValue.push(gvdJSTwoLocusTestValue[nIdx]);
	}
	// Find the all the edges in LD information edges. 20130620William.
	var nNumOfEdgesInLDInfor = gvdJSLDInforValue.length;
	for (var nIdx = 0; nIdx < nNumOfEdgesInLDInfor; nIdx++)
	{
		var nFstSNPIndex = gvnJSLDInforFstSNPIndexInUniqueSNPs[nIdx];
		var nSndSNPIndex = gvnJSLDInforSndSNPIndexInUniqueSNPs[nIdx];
		var bIsFstSNPInvolved = vbDoesThisSNPsInvoled[nFstSNPIndex];
		var bIsSndSNPInvolved = vbDoesThisSNPsInvoled[nSndSNPIndex];
		if (bIsFstSNPInvolved == true && bIsSndSNPInvolved == true) {
			var nFstSNPIndexNew = vnIndexOfSNPsInNewUniqueSNPsList[nFstSNPIndex];
			var nSndSNPIndexNew = vnIndexOfSNPsInNewUniqueSNPsList[nSndSNPIndex];
			vnJSLDInforFstSNPIndexInUniqueSNPs.push(nFstSNPIndexNew);
			vnJSLDInforSndSNPIndexInUniqueSNPs.push(nSndSNPIndexNew);
			vdJSLDInforValue.push(gvdJSLDInforValue[nIdx]);
		}
	}
	// Finally, we need to re-scale the two-locus test value to [0 1].
	var dTwoLocusTestValueMax = vdJSTwoLocusTestValue[0];
	var dTwoLocusTestValueMin = vdJSTwoLocusTestValue[0];
	for (var nIdx = 0; nIdx < nNumOfSNPsPairsToShow; nIdx++)
	{
		var dTwoLocusTestValueOrigin = vdJSTwoLocusTestValue[nIdx];
		if (dTwoLocusTestValueOrigin > dTwoLocusTestValueMax){
			dTwoLocusTestValueMax = dTwoLocusTestValueOrigin;
		}
		if (dTwoLocusTestValueOrigin < dTwoLocusTestValueMin){
			dTwoLocusTestValueMin = dTwoLocusTestValueOrigin;
		}
	}
	for (var nIdx = 0; nIdx < nNumOfSNPsPairsToShow; nIdx++)
	{
		var dTwoLocusTestValueOrigin = vdJSTwoLocusTestValue[nIdx];
		var dTwoLocusTestValueScaled = (dTwoLocusTestValueOrigin - dTwoLocusTestValueMin) / (dTwoLocusTestValueMax - dTwoLocusTestValueMin);
		vdJSTwoLocusTestValue[nIdx] = dTwoLocusTestValueScaled;
	}
	// Finally, we need to re-scale the LD Information (LD edge value) to [0 1]. 20130620William.
	var dLdEdgeValueMax = vdJSLDInforValue[0];
	var dLdEdgeValueMin = vdJSLDInforValue[0];
	var nNumOfEdgesInLDInfor = vdJSLDInforValue.length;
	for (var nIdx = 0; nIdx < nNumOfEdgesInLDInfor; nIdx++)
	{
		var dLdEdgeValueOrigin = vdJSLDInforValue[nIdx];
		if (dLdEdgeValueOrigin > dLdEdgeValueMax){
			dLdEdgeValueMax = dLdEdgeValueOrigin;
		}
		if (dLdEdgeValueOrigin < dLdEdgeValueMin){
			dLdEdgeValueMin = dLdEdgeValueOrigin;
		}
	}
	for (var nIdx = 0; nIdx < nNumOfEdgesInLDInfor; nIdx++)
	{
		var dLdEdgeValueOrigin = vdJSLDInforValue[nIdx];
		var dLdEdgeValueScaled = (dLdEdgeValueOrigin - dLdEdgeValueMin) / (dLdEdgeValueMax - dLdEdgeValueMin);
		vdJSLDInforValue[nIdx] = dLdEdgeValueScaled;
	}
}