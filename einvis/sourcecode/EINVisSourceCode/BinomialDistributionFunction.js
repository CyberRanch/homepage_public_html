// 20120928. This function comes from here:
// http://www.math.ucla.edu/~tom/distributions/binomial.html
// Define some global variable for calculating the Binominal Distribution p-value.
var gnNumOfIndependentExperiments = 0;
var gdProbabilityOfYieldSuccess = 0.0;
var gvaAllSNPsListRankedByBinmDistPValue;
var gnNodeOfNodesInEpistasisInteractionNetwork = 0;
var gnNodeOfEdgesInEpistasisInteractionNetwork = 0;

function LogGamma(Z) {
	with (Math) {
		var S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + .00120858003 / (Z + 4) - .00000536382 / (Z + 5);
		var LG = (Z - .5) * log(Z + 4.5) - (Z + 4.5) + log(S * 2.50662827465);
	}
	return LG;
}

function Betinc(X,A,B) {
	var A0 = 0;
	var B0 = 1;
	var A1 = 1;
	var B1 = 1;
	var M9 = 0;
	var A2 = 0;
	var C9;
	while (Math.abs((A1 - A2) / A1) > .00001) {
		A2 = A1;
		C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);
		A0 = A1 + C9 * A0;
		B0 = B1 + C9 * B0;
		M9 = M9 + 1;
		C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);
		A1 = A0 + C9 * A1;
		B1 = B0 + C9 * B1;
		A0 = A0 / B1;
		B0 = B0 / B1;
		A1 = A1 / B1;
		B1 = 1;
	}
	return A1 / A;
}

function ComputeBinominalCDFValue(X, N, P) {
    // X : Observed Value
    // N : Sample Size
    // P : Prob Value
	var dBinominalCDFValue = 0.0;
	if (N <= 0) {
		dBinominalCDFValue = 0; // alert("sample size must be positive must be positive");
	} else if ((P < 0) || (P > 1)) {
		dBinominalCDFValue = 0; // alert("probability must be between 0 and 1");
	} else if (X < 0) {
		dBinominalCDFValue = 0;
	} else if (X >= N) {
		dBinominalCDFValue = 1;
	} else {
		X = Math.floor(X);
		Z = P;
		A = X + 1;
		B = N - X;
		S = A + B;
		BT = Math.exp(LogGamma(S) - LogGamma(B) - LogGamma(A) + A * Math.log(Z) + B * Math.log(1-Z));
		if (Z < (A+1) / (S+2)) {
			Betacdf = BT * Betinc(Z,A,B);
		} else {
			Betacdf = 1 - BT * Betinc(1-Z,B,A);
		}
		dBinominalCDFValue = 1 - Betacdf;
	}
	dBinominalCDFValue = Math.round(dBinominalCDFValue * 100000) / 100000;
	return dBinominalCDFValue;
}

function COneSNP4Rank()
{	// The data structure for Rank of SNPs by their degree.
	var m_nIndexOfLevel = 0; // One SNP. The first index in variable "m_vvAllNodes4RingGraph" in class "CAllNodes4RingGraph";
	var m_nIndexInLevel = 0; // One SNP. The second index in variable "m_vvAllNodes4RingGraph" in class "CAllNodes4RingGraph";
	var m_sSNPName; // the name of the SNP.
	var m_sChrmName; // the chromosome name of this SNP.
	var m_sGeneName; // the gene name of this SNP.
	var m_dSingleLocusTestValue; // the single locus test value of this SNP.
	var m_nNumOfEdges = 0; // one SNP's related edges.
	var m_dBinominalDistPValue = 0; // the p-value in the binominal distribution.
}

function SortAllSNPsByTheirBionominalDistPValue()
{
	gvaAllSNPsListRankedByBinmDistPValue = new Array();
	// 1. Get all SNPs.
	var vvAllNodes4RingGraphRefer = aAllNodes4RingGraph.m_vvAllNodes4RingGraph;
	var nNumOfLvl = vvAllNodes4RingGraphRefer.length;
	for (var nIdxOfLvl = 0; nIdxOfLvl < nNumOfLvl; nIdxOfLvl++)
	{
		var nNumOfNodesInThisLevel = vvAllNodes4RingGraphRefer[nIdxOfLvl].length;
		for (var nIdxInLvl = 0; nIdxInLvl < nNumOfNodesInThisLevel; nIdxInLvl++)
		{
			var aOneNodeRefer = vvAllNodes4RingGraphRefer[nIdxOfLvl][nIdxInLvl];
			var bIsThisLeafNode = aOneNodeRefer.GetIsLeafNode();
			if (bIsThisLeafNode == true)
			{
				var aOneSNPInstance = new COneSNP4Rank();
				aOneSNPInstance.m_nIndexOfLevel = nIdxOfLvl;
				aOneSNPInstance.m_nIndexInLevel = nIdxInLvl;
				var aOneNodeRefer = vvAllNodes4RingGraphRefer[nIdxOfLvl][nIdxInLvl];
				var sSNPsName = aOneNodeRefer.GetThisNodeName();
				aOneSNPInstance.m_sSNPName = sSNPsName;
				var nNumOfAllRawSNPs = gvvsJSAllUniqueSNPsInfor.length;
				var nOneRawSNPIndexInAllUniqueSNPsInfor = 0;
				for (var nIdx2 = 0; nIdx2 < nNumOfAllRawSNPs; nIdx2++)
				{
					var vsOneSNPRawInfor = gvvsJSAllUniqueSNPsInfor[nIdx2]; // Array[4]. "0" Chr#; "1" GeneName; "2" SNPID; "3" Single Locus Test Value.
					var sOneSNPName = vsOneSNPRawInfor[2];
					if (sOneSNPName == sSNPsName)
					{
						aOneSNPInstance.m_sChrmName = vsOneSNPRawInfor[0];
						aOneSNPInstance.m_sGeneName = vsOneSNPRawInfor[1];
						aOneSNPInstance.m_dSingleLocusTestValue = vsOneSNPRawInfor[3];
						nOneRawSNPIndexInAllUniqueSNPsInfor = nIdx2;
					}
				}
				// aOneSNPInstance.m_nNumOfEdges = aOneNodeRefer.GetNumOfDefinedByOtherLeafNodes(); // 20120927. This is not the number of edges related to this node.
				var nNumOfEdgesInIndex1 = 0;
				for (var nIdx2 = 0; nIdx2 < gnNumOfEdgesToShow; nIdx2++)
				{
					if (gvnJSTwoLocusTestFstSNPIndexInUniqueSNPs[nIdx2] == nOneRawSNPIndexInAllUniqueSNPsInfor)
					{
						nNumOfEdgesInIndex1++;
					}
				}
				var nNumOfEdgesInIndex2 = 0;
				for (var nIdx2 = 0; nIdx2 < gnNumOfEdgesToShow; nIdx2++)
				{
					if (gvnJSTwoLocusTestSndSNPIndexInUniqueSNPs[nIdx2] == nOneRawSNPIndexInAllUniqueSNPsInfor)
					{
						nNumOfEdgesInIndex2++;
					}
				}
				aOneSNPInstance.m_nNumOfEdges = nNumOfEdgesInIndex1 + nNumOfEdgesInIndex2;
				gvaAllSNPsListRankedByBinmDistPValue.push(aOneSNPInstance);
			}
		}
	}
	// 2. Get the Binominal Dist. p-Value for each SNP.
	var nNumOfSNPs = gvaAllSNPsListRankedByBinmDistPValue.length;
	var nTotalNumOfEdges = gnNumOfEdgesToShow;
	gnNodeOfNodesInEpistasisInteractionNetwork = nNumOfSNPs;
	gnNodeOfEdgesInEpistasisInteractionNetwork = nTotalNumOfEdges;
	gnNumOfIndependentExperiments = gnNumOfEdgesToShow; // store it in global variable.
	var dProbOfOneSNPRelateToOneEdge = 2 / nNumOfSNPs;
	gdProbabilityOfYieldSuccess = dProbOfOneSNPRelateToOneEdge; // store it in global variable.
	for (var nIdx = 0; nIdx < nNumOfSNPs; nIdx++)
	{
		var aOneSNPRefer = gvaAllSNPsListRankedByBinmDistPValue[nIdx];
		var nNumOfEdges = aOneSNPRefer.m_nNumOfEdges;
		var dBinominalDistPValue = ComputeBinominalCDFValue(nNumOfEdges, nTotalNumOfEdges, dProbOfOneSNPRelateToOneEdge);
		aOneSNPRefer.m_dBinominalDistPValue = dBinominalDistPValue;
	}
	// 3. Sort the SNPs by their Binominal Dist. p-Value.
	gvaAllSNPsListRankedByBinmDistPValue.sort(function(a,b){return b.m_nNumOfEdges - a.m_nNumOfEdges;});
	// 4. Output them into the webpage "EINVis SNPs Rank".
	// This work will be done outside.
}