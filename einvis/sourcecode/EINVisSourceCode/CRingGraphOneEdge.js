// 20110718William, this file contain only one class "COneEdge4RingGraph".
// this file is totally new, not from "Qt".
// the aim and function of this class is to store and enrich the edge information.
// for example, at initial, we get the control point from the outside. Then, we can calculate the interpolate B-Spline curve information.
// further, if we change the Beta value, which control the curvature of the curve, we need to recalculate the interpolate value at each point.
// and, we may assign color to the edge, either constant monochrome color or graduated color (e.g. from green to red), to enrich the edge information.
function COneEdgeBriefInfor(){
	this.m_nIndexOfLevel4Node1 = 0;
	this.m_nIndexInLevel4Node1 = 0;
	this.m_nIndexOfEdgeInformn = 0;
	this.m_nIndexOfLevel4Node2 = 0;
	this.m_nIndexInLevel4Node2 = 0;
	this.m_dDistanceToMousePos = 0.0;
};
function COneEdge4RingGraph()
{
	// --------------------- the following are member variables -----------------------
	this.m_vListOfControlPointCoordsX = new Array(); // the list of X coordinates of control points. // the original control points.
	this.m_vListOfControlPointCoordsY = new Array(); // the list of Y coordinates of control points. // the original control points.
	this.m_vSetOfEdgePointsCoordsX = new Array(); // the set of X coordinates of the edge points.
	this.m_vSetOfEdgePointsCoordsY = new Array(); // the set of Y coordinates of the edge points.
	this.m_vGradientEdgeColor = new Array(); // the gradient edge color, e.g. from green to red. // each element is a Array(3), the three elements is R, G, B color value respectively. The length of "this.m_vGradientEdgeColor" is the same as that of "this.m_vSetOfEdgePointsCoordsX", i.e. one point with one color.
	this.m_vListOfControlPointCoordsXAdjustWithBeta = new Array(); // the modified control points, adjust from the original one according to "Beta" value.
	this.m_vListOfControlPointCoordsYAdjustWithBeta = new Array(); // the modified control points, adjust from the original one according to "Beta" value.
	this.m_sEdgeColorMappedFromTwoLocusTestValue = "";
};
// --------------------- the following are member functions -----------------------
// operation on "m_vListOfControlPointCoordsX"
COneEdge4RingGraph.prototype.SetTheListOfControlPointCoordsX = function(vListOfControlPointCoordsX)
{	// do not use "=" directly, such as "this.m_vListOfControlPointCoordsX = vListOfControlPointCoordsX", it will use reference instead of copy.
	this.m_vListOfControlPointCoordsX = []; // first empty this array.
	var nNumOfControlPoint = vListOfControlPointCoordsX.length;
	for (var nIdxOfCtrlPt = 0; nIdxOfCtrlPt < nNumOfControlPoint; nIdxOfCtrlPt++)
	{
		var dOneControlPtCoordX = vListOfControlPointCoordsX[nIdxOfCtrlPt];
		this.m_vListOfControlPointCoordsX.push(dOneControlPtCoordX);
	}
};
// operation on "m_vListOfControlPointCoordsX"
COneEdge4RingGraph.prototype.SetTheListOfControlPointCoordsY = function(vListOfControlPointCoordsY)
{	// do not use "=" directly, such as "this.m_vListOfControlPointCoordsY = vListOfControlPointCoordsY", it will use reference instead of copy.
	this.m_vListOfControlPointCoordsY = []; // first empty this array.
	var nNumOfControlPoint = vListOfControlPointCoordsY.length;
	for (var nIdxOfCtrlPt = 0; nIdxOfCtrlPt < nNumOfControlPoint; nIdxOfCtrlPt++)
	{
		var dOneControlPtCoordY = vListOfControlPointCoordsY[nIdxOfCtrlPt];
		this.m_vListOfControlPointCoordsY.push(dOneControlPtCoordY);
	}
};
// operation on "this.m_sEdgeColorMappedFromTwoLocusTestValue"
COneEdge4RingGraph.prototype.SetEdgeColorMappedFromTwoLocusTestValue = function(sColorRGB)
{	this.m_sEdgeColorMappedFromTwoLocusTestValue = sColorRGB;	};
COneEdge4RingGraph.prototype.GetEdgeColorMappedFromTwoLocusTestValue = function()
{	return this.m_sEdgeColorMappedFromTwoLocusTestValue;	};
// get the number of points in this edge curve.
COneEdge4RingGraph.prototype.GetNumOfPointsInThisEdgeCurve = function()
{
	return this.m_vSetOfEdgePointsCoordsX.length;
};
// get one point's X coordinate in the edge curve.
COneEdge4RingGraph.prototype.GetOnePointXCoordsInEdgeCurve = function(nOneIndexOfPointInEdgeCurve)
{
	return this.m_vSetOfEdgePointsCoordsX[nOneIndexOfPointInEdgeCurve];
};
// get one point's Y coordinate in the edge curve.
COneEdge4RingGraph.prototype.GetOnePointYCoordsInEdgeCurve = function(nOneIndexOfPointInEdgeCurve)
{
	return this.m_vSetOfEdgePointsCoordsY[nOneIndexOfPointInEdgeCurve];
};
// get one point color in the edge curve.
COneEdge4RingGraph.prototype.GetOnePointColorInEdgeCurve = function(nIdxOfPointInEdgeCurve)
{	// each element is a 3 elements vector, R G B color value.
	return this.m_vGradientEdgeColor[nIdxOfPointInEdgeCurve];
};
// the kernel function of calculate the B-Spline curve according to the control point.
COneEdge4RingGraph.prototype.CalculateTheCubicBSplineAccordingToControlPointUseDeBoorAlgorithm = function()
{
	// Once we get the points sequence which form the path link two leaf nodes, we can construct the B-Spline using this path.
	// the curve's control point position is stored in vector "vPathMirrorNodesPositnXList" and "vPathMirrorNodesPositnYList".
	var nNumOfControlPoints = this.m_vListOfControlPointCoordsXAdjustWithBeta.length;
	// --- 2.1 step one, construct the Knot Vector of Tj.
	var vKnotVectorOfTj = new Array();
	if (nNumOfControlPoints >= 4)
	{	// for cubic B-Spline, the minimum control points number is 4.
		vKnotVectorOfTj.push(0.0);
		vKnotVectorOfTj.push(0.0);
		vKnotVectorOfTj.push(0.0);
		for (var nIdxOfContrlPt = 0; nIdxOfContrlPt <= (nNumOfControlPoints - 3); nIdxOfContrlPt++)
		{
			var dOneKnotValue = nIdxOfContrlPt * 1.0 / (nNumOfControlPoints - 3); // 20110718William, I am not sure whether this integer division can work well in Javascript. 
			vKnotVectorOfTj.push(dOneKnotValue);
		}
		vKnotVectorOfTj.push(1.0);
		vKnotVectorOfTj.push(1.0);
		vKnotVectorOfTj.push(1.0);
	}
	else if(nNumOfControlPoints == 3)
	{	// if the number of control points is 3, then we need use the quadratic B-Spline to interpolate the curve.
		vKnotVectorOfTj.push(0.0);
		vKnotVectorOfTj.push(0.0);
		vKnotVectorOfTj.push(0.0);
		vKnotVectorOfTj.push(1.0);
		vKnotVectorOfTj.push(1.0);
		vKnotVectorOfTj.push(1.0);
	}
	else
	{
		document.write("There are edge with control points less than 3.<br>");
	}
	// --- 2.2 step two, construct the basis function input vector
	var vBasisFunInputVector = new Array(); // this variable control the interpolate value. for example, if the Knot vector is [0.0:0.1:1.0], then this basis function vector should be [0.0:0.01:1.0], if you want more fine results, set the step to 0.0001 or even smaller.
	var vBasisFunOutputVectorSet = new Array(nNumOfControlPoints); // this variable store the fun value at each point of "vBasisFunInputVector".
	// there will be "nNumOfControlPoints" basis function. Each control point has one basis function.
	var nDegreeNOfSpline = 3; // piecewise cubic B-Spline.
	if (nNumOfControlPoints == 3)
	{	// if the number of control points is 3, then need to use quadratic B-Spline, the degree is 2.
		nDegreeNOfSpline = 2;
	}
	var nNumOfTotalInterpolatePoints = 21; // each spline curve will contain 1000 points.
	for (var nIdxOfBasisFun = 0; nIdxOfBasisFun < nNumOfControlPoints; nIdxOfBasisFun++)
	{
		vBasisFunOutputVectorSet[nIdxOfBasisFun] = new Array(nNumOfTotalInterpolatePoints);
	}
	for (var nIdxOfBasFun = 0; nIdxOfBasFun < nNumOfControlPoints; nIdxOfBasFun++)
	{
		for (var nIdxOfIntrpltPt = 0; nIdxOfIntrpltPt < nNumOfTotalInterpolatePoints; nIdxOfIntrpltPt++)
		{
			var dOneInterpolatePosValue = 1.0 * nIdxOfIntrpltPt / (nNumOfTotalInterpolatePoints - 1);
			vBasisFunInputVector.push(dOneInterpolatePosValue);
			vBasisFunOutputVectorSet[nIdxOfBasFun][nIdxOfIntrpltPt] = this.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm(vKnotVectorOfTj, nIdxOfBasFun, nDegreeNOfSpline, dOneInterpolatePosValue);
		}
	}
	// 20110719William, the following part is for debug.
	// document.writeln("1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello World!<br>");
	// --- 2.3 step three, once we got the basis function, the left work is simple, just the weighted sum.
	// finally, we can calculate the interpolate curve's each individual point value.
	this.m_vSetOfEdgePointsCoordsX = new Array(nNumOfTotalInterpolatePoints);
	this.m_vSetOfEdgePointsCoordsY = new Array(nNumOfTotalInterpolatePoints);
	for (var nIdxOfIntrpltPt = 0; nIdxOfIntrpltPt < nNumOfTotalInterpolatePoints; nIdxOfIntrpltPt++)
	{
		this.m_vSetOfEdgePointsCoordsX[nIdxOfIntrpltPt] = 0.0;
		this.m_vSetOfEdgePointsCoordsY[nIdxOfIntrpltPt] = 0.0;
		for (var nIdxOfBasisFun = 0; nIdxOfBasisFun < nNumOfControlPoints; nIdxOfBasisFun++)
		{
			this.m_vSetOfEdgePointsCoordsX[nIdxOfIntrpltPt] += this.m_vListOfControlPointCoordsXAdjustWithBeta[nIdxOfBasisFun] * vBasisFunOutputVectorSet[nIdxOfBasisFun][nIdxOfIntrpltPt];
			this.m_vSetOfEdgePointsCoordsY[nIdxOfIntrpltPt] += this.m_vListOfControlPointCoordsYAdjustWithBeta[nIdxOfBasisFun] * vBasisFunOutputVectorSet[nIdxOfBasisFun][nIdxOfIntrpltPt];
		}
	}
	// finally, we get the interpolate B-Spline. stored in the two array "m_vSetOfEdgePointsCoordsX" and "m_vSetOfEdgePointsCoordsY".
	this.CalculateTheGradientEdgeColor(); // 20110719William. We have succeeded in construction of cubic B-Spline curve. After that, This function is to add color to the edge, this fun is now generating the gradient color, changing from red to green.
};
// the following fun is to calculate the basis function of B-Spline.
COneEdge4RingGraph.prototype.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm = function(vKnotVectorOfTj, nOneIdxInKnotVectorOfTj, nDegreeNOfSpline, dOneKnotValueTi)
{	// this function will calculate the piecewise cubic B-Spline basis function use recursion function, i.e. the De Boor Algorithm.
	// the input parameters' meaning is like the following:
	// "vKnotVectorOfTj", is the Knot Vector, which is defined in the De Boor Algorithm; such as [0.0 0.0 0.0 0.0 0.2 0.4 0.6 0.8 1.0 1.0 1.0 1.0]
	// "nOneIdxInKnotVectorOfTj", is one index in the Knot Vector, it equals to the index of the basis function.
	// "nDegreeNOfSpline", it indicate the value of the degree of the Spline basis function. It is the soul variable of the recursion function.
	// "dOneKnotValueTi", it is the one knot slot value. It is one interpolation position. It is often more fine than the Knot Vector value. [0.00 0.01 0.02 0.03 ...... 0.96 0.97 0.98 0.99 1.00].
	// "dReturnInterpolatBasisFunValueAtOneSamplePoint", it is the the return variable. It is the value of one basis function at the degree of "nDegreeNOfSpline", and at the position of "dOneKnotValueTi".
	var dReturnInterpolatBasisFunValueAtOneSamplePoint = 0.0;
	if (nDegreeNOfSpline > 0)
	{	// 20110719William, the original version of the following line is as "dPartValueInLowDegreeOne = ...", then in the next line inner function (var dPartValueInLowDegreeTwo = this.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm), it will be changed. 
		// You must use "var" to define a variable, if not, it will declare a global variable. And that is not wanted, a nightmare, for a recursive function.
		var dPartValueInLowDegreeOne = this.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm(vKnotVectorOfTj, nOneIdxInKnotVectorOfTj    , nDegreeNOfSpline - 1, dOneKnotValueTi);
        var dPartValueInLowDegreeTwo = this.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm(vKnotVectorOfTj, nOneIdxInKnotVectorOfTj + 1, nDegreeNOfSpline - 1, dOneKnotValueTi);
        var dPartValueInPartOne = 0.0;
        var dPartValueInPartTwo = 0.0;
        if (Math.abs(vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline] - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj]) < 0.0000001)
        {	// if KnotVectorOfTj(nOneIdxInKnotVectorOfTj + nDegreeNOfSpline) == vKnotVectorOfTj(nOneIdxInKnotVectorOfTj), then the "denominator" in the following equation will be zero.
            dPartValueInPartOne = 0.0; // to avoid the generation of NaN value, we have set it to zeor. This is the second Notes: Once you encounter 0/0, presumed to 0 (0/0 = 0). in this program, once I encounter 0 at denominator, set the multiplier part to zero.
       	}
        else
        {
            dPartValueInPartOne = (   dOneKnotValueTi - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj]                       ) * dPartValueInLowDegreeOne / ( vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline]     - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj]     );
        }
        if (Math.abs(vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline + 1] - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1]) < 0.0000001)
        {
        	dPartValueInPartTwo = 0.0;
        }
        else
        {
        	dPartValueInPartTwo = ( - dOneKnotValueTi + vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline + 1]) * dPartValueInLowDegreeTwo / ( vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline + 1] - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1] );
        }
        dReturnInterpolatBasisFunValueAtOneSamplePoint = dPartValueInPartOne + dPartValueInPartTwo;
	}
	else
	{	// if nDegreeNOfSpline == 0
		var dValueOfKnotAtTj        = vKnotVectorOfTj[nOneIdxInKnotVectorOfTj];
		var dValueOfKnotAtTjPlusOne = vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1];
		if (((dOneKnotValueTi > dValueOfKnotAtTj) || Math.abs(dOneKnotValueTi - dValueOfKnotAtTj) < 0.0000001) && (dOneKnotValueTi < dValueOfKnotAtTjPlusOne))
		// if (dOneKnotValueTi >= dValueOfKnotAtTj) && dOneKnotValueTi < dValueOfKnotAtTjPlusOne.  i.e. dOneKnotT lies in [dValueOfKnotAtTj  dValueOfKnotAtTjPlusOne)
		{
			dReturnInterpolatBasisFunValueAtOneSamplePoint = 1.0;
		}
		else
		{
			dReturnInterpolatBasisFunValueAtOneSamplePoint = 0.0;
			// This is the first Notes: the last Zero Degree basis function's right bound should be set to 1.0
			if ((Math.abs(dOneKnotValueTi - dValueOfKnotAtTjPlusOne) < 0.0000001) && (Math.abs(dValueOfKnotAtTjPlusOne - dValueOfKnotAtTj) > 0.0000001) && (Math.abs(dValueOfKnotAtTjPlusOne - 1.0) < 0.0000001))
            {	// means "dOneKnotValueTi == dValueOfKnotAtTjPlusOne" && "dValueOfKnotAtTjPlusOne == dValueOfKnotAtTj" && "dValueOfKnotAtTjPlusOne == 1.0"
            	dReturnInterpolatBasisFunValueAtOneSamplePoint = 1.0; // this means that, in the last segment of the Zero Degree basis function, the most right point should be 1.0, else this point will be zero in any Zero Degree basis function.
        	}
		}
		if ((Math.abs(dOneKnotValueTi - dValueOfKnotAtTj) < 0.0000001) && (Math.abs(dOneKnotValueTi - dValueOfKnotAtTjPlusOne) < 0.0000001))
		{	// if dOneKnotValueTi == dValueOfKnotAtTj == dValueOfKnotAtTjPlusOne. if the three value are equal, they must in the begin or end part of the knot vector.
			dReturnInterpolatBasisFunValueAtOneSamplePoint = 1.0;
		}
	}
	return dReturnInterpolatBasisFunValueAtOneSamplePoint;
};
// debug version of the above function. the following fun is to calculate the basis function of B-Spline.
COneEdge4RingGraph.prototype.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm4Debug = function(vKnotVectorOfTj, nOneIdxInKnotVectorOfTj, nDegreeNOfSpline, dOneKnotValueTi)
{	// 20110719William, this fun is a debug version of the above function "CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm". This fun is not called by any other function at anywhere.
	// this function will calculate the piecewise cubic B-Spline basis function use recursion function, i.e. the De Boor Algorithm.
	// the input parameters' meaning is like the following:
	// "vKnotVectorOfTj", is the Knot Vector, which is defined in the De Boor Algorithm; such as [0.0 0.0 0.0 0.0 0.2 0.4 0.6 0.8 1.0 1.0 1.0 1.0]
	// "nOneIdxInKnotVectorOfTj", is one index in the Knot Vector, it equals to the index of the basis function.
	// "nDegreeNOfSpline", it indicate the value of the degree of the Spline basis function. It is the soul variable of the recursion function.
	// "dOneKnotValueTi", it is the one knot slot value. It is one interpolation position. It is often more fine than the Knot Vector value. [0.00 0.01 0.02 0.03 ...... 0.96 0.97 0.98 0.99 1.00].
	// "dReturnInterpolatBasisFunValueAtOneSamplePoint", it is the the return variable. It is the value of one basis function at the degree of "nDegreeNOfSpline", and at the position of "dOneKnotValueTi".
	var dReturnInterpolatBasisFunValueAtOneSamplePoint = 0.0;
	if (nDegreeNOfSpline > 0)
	{
		var dPartValueInLowDegreeOne = this.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm(vKnotVectorOfTj, nOneIdxInKnotVectorOfTj    , nDegreeNOfSpline - 1, dOneKnotValueTi);
        var dPartValueInLowDegreeTwo = this.CalculatePiecewiseCubicBSplineBasisFunctionUseRecursionDeBoorAlgorithm(vKnotVectorOfTj, nOneIdxInKnotVectorOfTj + 1, nDegreeNOfSpline - 1, dOneKnotValueTi);
        var dPartValueInPartOne = 0.0;
        var dPartValueInPartTwo = 0.0;
        if (Math.abs(vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline] - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj]) < 0.0000001)
        {	// if KnotVectorOfTj(nOneIdxInKnotVectorOfTj + nDegreeNOfSpline) == vKnotVectorOfTj(nOneIdxInKnotVectorOfTj), then the "denominator" in the following equation will be zero.
            dPartValueInPartOne = 0.0; // to avoid the generation of NaN value, we have set it to zeor. This is the second Notes: Once you encounter 0/0, presumed to 0 (0/0 = 0). in this program, once I encounter 0 at denominator, set the multiplier part to zero.
       	}
        else
        {
            dPartValueInPartOne = (   dOneKnotValueTi - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj]                       ) * dPartValueInLowDegreeOne / ( vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline]     - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj]     );
        }
        if (Math.abs(vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline + 1] - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1]) < 0.0000001)
        {
        	dPartValueInPartTwo = 0.0;
        }
        else
        {
        	dPartValueInPartTwo = ( - dOneKnotValueTi + vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline + 1]) * dPartValueInLowDegreeTwo / ( vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + nDegreeNOfSpline + 1] - vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1] );
        }
        dReturnInterpolatBasisFunValueAtOneSamplePoint = dPartValueInPartOne + dPartValueInPartTwo;
// 20110719William for debug.
//        var sOutputString = "";
//        for (var nIdxDegree = 0; nIdxDegree < (3 - nDegreeNOfSpline); nIdxDegree++)
//        {
//        	sOutputString += "&nbsp;";
//        }
//        sOutputString += dReturnInterpolatBasisFunValueAtOneSamplePoint;
//        sOutputString += "&nbsp;";
//        sOutputString += dPartValueInPartOne;
//        sOutputString += "&nbsp;";
//        sOutputString += dPartValueInPartTwo;
//        sOutputString += "&nbsp;";
//        sOutputString += dPartValueInLowDegreeOne;
//        sOutputString += "&nbsp;";
//        sOutputString += dPartValueInLowDegreeTwo;
//        sOutputString += "&nbsp;:&nbsp; Tj:";
//        sOutputString += nOneIdxInKnotVectorOfTj;
//        sOutputString += "&nbsp;,&nbsp;";
//        sOutputString += vKnotVectorOfTj[nOneIdxInKnotVectorOfTj];
//        sOutputString += "; Tj+1: ";
//        sOutputString += (nOneIdxInKnotVectorOfTj + 1);
//        sOutputString += "&nbsp;,&nbsp;";
//        sOutputString += vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1];
//        sOutputString += "&nbsp;:&nbsp; Ti:";
//        sOutputString += dOneKnotValueTi;
//        sOutputString += "<br>";
//        document.writeln(sOutputString);
	}
	else
	{	// if nDegreeNOfSpline == 0
		var dValueOfKnotAtTj        = vKnotVectorOfTj[nOneIdxInKnotVectorOfTj];
		var dValueOfKnotAtTjPlusOne = vKnotVectorOfTj[nOneIdxInKnotVectorOfTj + 1];
		if (((dOneKnotValueTi > dValueOfKnotAtTj) || Math.abs(dOneKnotValueTi - dValueOfKnotAtTj) < 0.0000001) && (dOneKnotValueTi < dValueOfKnotAtTjPlusOne))
		// if (dOneKnotValueTi >= dValueOfKnotAtTj) && dOneKnotValueTi < dValueOfKnotAtTjPlusOne.  i.e. dOneKnotT lies in [dValueOfKnotAtTj  dValueOfKnotAtTjPlusOne)
		{
			dReturnInterpolatBasisFunValueAtOneSamplePoint = 1.0;
		}
		else
		{
			dReturnInterpolatBasisFunValueAtOneSamplePoint = 0.0;
			// This is the first Notes: the last Zero Degree basis function's right bound should be set to 1.0
			if ((Math.abs(dOneKnotValueTi - dValueOfKnotAtTjPlusOne) < 0.0000001) && (Math.abs(dValueOfKnotAtTjPlusOne - dValueOfKnotAtTj) > 0.0000001) && (Math.abs(dValueOfKnotAtTjPlusOne - 1.0) < 0.0000001))
            {	// means "dOneKnotValueTi == dValueOfKnotAtTjPlusOne" && "dValueOfKnotAtTjPlusOne == dValueOfKnotAtTj" && "dValueOfKnotAtTjPlusOne == 1.0"
            	dReturnInterpolatBasisFunValueAtOneSamplePoint = 1.0; // this means that, in the last segment of the Zero Degree basis function, the most right point should be 1.0, else this point will be zero in any Zero Degree basis function.
        	}
		}
		if ((Math.abs(dOneKnotValueTi - dValueOfKnotAtTj) < 0.0000001) && (Math.abs(dOneKnotValueTi - dValueOfKnotAtTjPlusOne) < 0.0000001))
		{	// if dOneKnotValueTi == dValueOfKnotAtTj == dValueOfKnotAtTjPlusOne. if the three value are equal, they must in the begin or end part of the knot vector.
			dReturnInterpolatBasisFunValueAtOneSamplePoint = 1.0;
		}
//		var sOneOutputStr = "&nbsp;&nbsp;&nbsp;" + dReturnInterpolatBasisFunValueAtOneSamplePoint + "<br>";
//		document.writeln(sOneOutputStr);
	}
	return dReturnInterpolatBasisFunValueAtOneSamplePoint;
};
// 20110719William, the following two functions is to calculate the gradient color of the edge.
COneEdge4RingGraph.prototype.CalculateTheGradientEdgeColor = function()
{	// 20110719William. calculate the gradient edge color, e.g. from green to red.
	var nNumOfPointsInTheCurve = this.m_vSetOfEdgePointsCoordsX.length; // the number of points in the curve.
	var nIdxRangeBgn = 0;
	var nIdxRangeEnd = nNumOfPointsInTheCurve - 1;
	var dHueRangeBgn = 0.0; // begin from red
	var dHueRangeEnd = 2 * 3.1415926 * 2 / 6; // end with green.
	for (var nIdxOfPoint = 0; nIdxOfPoint < nNumOfPointsInTheCurve; nIdxOfPoint++)
	{
		var vdRGBColorValue = new Array(3);
		this.GetRGBColorValueFromHSVColorSpaceUsingIndexAndHueRange(vdRGBColorValue, nIdxOfPoint, nIdxRangeBgn, nIdxRangeEnd, dHueRangeBgn, dHueRangeEnd);
		this.m_vGradientEdgeColor.push(vdRGBColorValue); // push this RGB color array to the edge color vector.
	}
};
COneEdge4RingGraph.prototype.GetRGBColorValueFromHSVColorSpaceUsingIndexAndHueRange = function(vdRgbValue, nOneIndex, nIdxRangeBgn, nIdxRangeEnd, dHueRangeBgn, dHueRangeEnd)
{	// this function comes from Qt project "PhyVis06", the same name function in "PhyVis.cpp" file.
	// the output param: "vdRgbValue", is a vector with 3 elements, R G B value respectively;
	// the input param 1: "nOneIndex", is one index in the index vector, we map range of the vector [nIdxRangeBgn nIdxRangeEnd] to the hue value [dHueRangeBgn dHueRangeEnd] linearly. For each index "nOneIndex" in the vector, we get the corresponding R G B value.
	// the input param 2 and 3: "nIdxRangeBgn = 1", "nIdxRangeEnd = 100" is the range of a linear number, for example [1 100], and "nOneIndex" maybe from 1 to 100, each value will call this function one time.
	// the input param 4 and 5: "dHueRangeBgn" and "dHueRangeEnd" is the begin and end of the hue value in the HSV color space. It can control the color range.
	var dInstensityValue = 1.0 / 3; // 0.5 // if you set it be larger than 0.333... then, the R G B value will exceed 1.0.
	var dSaturatnValue = 1.0;
	var dHueValue = (dHueRangeEnd - dHueRangeBgn) * (nOneIndex - nIdxRangeBgn) / (nIdxRangeEnd - nIdxRangeBgn) + dHueRangeBgn; // 20110719William, I am not sure about the division with integer number.
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
// 20110719William, the following functions is to Re-calculate the control points, and then re-calculate the cubic B-Spline, according to the Beta value to control the "Bundling Strength".
// if "Beta == 1.0", the "Bundling Strength" is strongest, equivalent to the original control points;
// if "Beta == 0.0", the "Bundling Strength" is weakest, equivalent to straight line;
// if "0.0 < Beta < 1.0", the "Bundling Strength" will be stronger when "Beta" value is larger.
COneEdge4RingGraph.prototype.AdjustTheBundlingStrengthToTheControlPoints = function(dBeta)
{	// adjust the Original Control points to a more suitable position according to the "Bundling Strength" "Beta" Value.
	var nNumOfControlPoints = this.m_vListOfControlPointCoordsX.length; // the total number of control points.
	var dBgnPointCoordsX = this.m_vListOfControlPointCoordsX[0]; // the X coordinate of begin control point.
	var dBgnPointCoordsY = this.m_vListOfControlPointCoordsY[0]; // the Y coordinate of begin control point.
	var dEndPointCoordsX = this.m_vListOfControlPointCoordsX[nNumOfControlPoints - 1]; // the X coordinate of end control point.
	var dEndPointCoordsY = this.m_vListOfControlPointCoordsY[nNumOfControlPoints - 1]; // the Y coordinate of End control point.
	// the above begin and end points do not change during the transformation with "Bundling Strength" value.
	// add the begin point to the adjust control points set.
	this.m_vListOfControlPointCoordsXAdjustWithBeta = []; // empty this array
	this.m_vListOfControlPointCoordsYAdjustWithBeta = []; // empty this array
	this.m_vListOfControlPointCoordsXAdjustWithBeta.push(dBgnPointCoordsX);
	this.m_vListOfControlPointCoordsYAdjustWithBeta.push(dBgnPointCoordsY);
	// begin to process the intermediate points.
	for (var nIdxOfCtrlPt = 1; nIdxOfCtrlPt < (nNumOfControlPoints - 1); nIdxOfCtrlPt++)
	{	// "nNumOfControlPoints" must not be less than 3. The minimum value of "nNumOfControlPoints", the number of "Control Points", is 3. 
		// the points with index of "0" and "nNumOfControlPoints - 1" is the begin and end points respectively. We do not process the begin and end points.
		// --- 1. get one original point A.
		var dOnePointAX = this.m_vListOfControlPointCoordsX[nIdxOfCtrlPt];
		var dOnePointAY = this.m_vListOfControlPointCoordsY[nIdxOfCtrlPt];
		// --- 2. get the interpolate point lies on the straight line, which link the the begin and end point B. When interpolating, seperate the straight line linearly, for example, if there are 5 points, then segment the line to 4 equal segments.
		var dSegmentPercents = nIdxOfCtrlPt / (nNumOfControlPoints - 1);
		var dOnePointBX = (1.0 - dSegmentPercents) * dBgnPointCoordsX + dSegmentPercents * dEndPointCoordsX;
		var dOnePointBY = (1.0 - dSegmentPercents) * dBgnPointCoordsY + dSegmentPercents * dEndPointCoordsY;
		// --- 3. interpolate the points A and B to get the final adjust control point C. This step will use the "Beta" value, the "Bundling Strength".
		var dOnePointCX = dBeta * dOnePointAX + (1.0 - dBeta) * dOnePointBX;
		var dOnePointCY = dBeta * dOnePointAY + (1.0 - dBeta) * dOnePointBY;
		// --- 4. add one intermediate point to the adjust control point set.
		this.m_vListOfControlPointCoordsXAdjustWithBeta.push(dOnePointCX);
		this.m_vListOfControlPointCoordsYAdjustWithBeta.push(dOnePointCY);
	}
	// add the end point to the adjust control points set.
	this.m_vListOfControlPointCoordsXAdjustWithBeta.push(dEndPointCoordsX);
	this.m_vListOfControlPointCoordsYAdjustWithBeta.push(dEndPointCoordsY);
};
COneEdge4RingGraph.prototype.CalculateDistanceBetweenMousePosAndEdgeCurve = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY){// CalculateDistanceBetweenMousePosAndEdgeCurve
	var dMinDistanceBtwnMousePosAndEdgeSegs = 10.0;
	var nNumOfEdgesPoints = this.m_vSetOfEdgePointsCoordsX.length;
	for (var nIdx = 0; nIdx < (nNumOfEdgesPoints - 1); nIdx++){
		var dEdgePoint1CoordsX = this.m_vSetOfEdgePointsCoordsX[nIdx];
		var dEdgePoint1CoordsY = this.m_vSetOfEdgePointsCoordsY[nIdx];
		var dEdgePoint2CoordsX = this.m_vSetOfEdgePointsCoordsX[nIdx + 1];
		var dEdgePoint2CoordsY = this.m_vSetOfEdgePointsCoordsY[nIdx + 1];
		var dDistanceBtwnMouseAndLineSeg = this.CalculateDistanceBetweenPointAndSegmentOfTwoPoints(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, dEdgePoint1CoordsX, dEdgePoint1CoordsY, dEdgePoint2CoordsX, dEdgePoint2CoordsY);
		if (dMinDistanceBtwnMousePosAndEdgeSegs > dDistanceBtwnMouseAndLineSeg){
			dMinDistanceBtwnMousePosAndEdgeSegs = dDistanceBtwnMouseAndLineSeg;
		}
	}
	return dMinDistanceBtwnMousePosAndEdgeSegs;
};
COneEdge4RingGraph.prototype.CalculateDistanceBetweenPointAndSegmentOfTwoPoints = function(nMouseRelativeCoordsWdhX, nMouseRelativeCoordsHghY, dEdgePoint1CoordsX, dEdgePoint1CoordsY, dEdgePoint2CoordsX, dEdgePoint2CoordsY){
	// Input: Point 1 (x1, y1), Point 2 (x2, y2) Of the line L; A free Point P(x0, y0);
	// We first judge whether:
	// min(x1, x2) <= x0 <= max(x1, x2) && min(y1, y2) <= y0 <= max(y1, y2)
	// If not, return large value. Otherwise, judge the special case:
	// Special case 1, if (x2 - x1) very small, then, the line is horizontal, we only compare |y0 - y1| < \delta.
	// Special case 2, if (y2 - y1) very small, then, the line is vertical  , we only compare |x0 - x1| < \delta.	
	// If pass the special case, then, calculate Distance Between P and L:
	// d = | (x0 - x1) / (x2 - x1) - (y0 - y1) / (y2 - y1) | / sqrt((1 / (x2 - x1))^2 + (y2 - y1)^2) < \delta.
	var dDistanceThreshold1 = 5.0;
	var dDistanceThreshold2 = 3.0; // 3 is larger than /delta
	var dDistanceBtwnMouseAndLineSeg = 0.0;
	var dLineSegMinXCoords = Math.min(dEdgePoint1CoordsX, dEdgePoint2CoordsX) - dDistanceThreshold2;
	var dLineSegMaxXCoords = Math.max(dEdgePoint1CoordsX, dEdgePoint2CoordsX) + dDistanceThreshold2;
	var dLineSegMinYCoords = Math.min(dEdgePoint1CoordsY, dEdgePoint2CoordsY) - dDistanceThreshold2;
	var dLineSegMaxYCoords = Math.max(dEdgePoint1CoordsY, dEdgePoint2CoordsY) + dDistanceThreshold2;
	if (nMouseRelativeCoordsWdhX >= dLineSegMinXCoords && nMouseRelativeCoordsWdhX <= dLineSegMaxXCoords && nMouseRelativeCoordsHghY >= dLineSegMinYCoords && nMouseRelativeCoordsHghY <= dLineSegMaxYCoords){
		var dLineSegXCoordsDiff = dEdgePoint2CoordsX - dEdgePoint1CoordsX;
		var dLineSegYCoordsDiff = dEdgePoint2CoordsY - dEdgePoint1CoordsY;
		var dMouse2LinEnd1DiffX = nMouseRelativeCoordsWdhX - dEdgePoint1CoordsX;
		var dMouse2LinEnd1DiffY = nMouseRelativeCoordsHghY - dEdgePoint1CoordsY;
		var dLineSegXCoordsDiffAbs = Math.abs(dLineSegXCoordsDiff);
		var dLineSegYCoordsDiffAbs = Math.abs(dLineSegYCoordsDiff);
		var dMouse2LinEnd1DiffXAbs = Math.abs(dMouse2LinEnd1DiffX);
		var dMouse2LinEnd1DiffYAbs = Math.abs(dMouse2LinEnd1DiffY);
		var dMouse2LinEnd2DiffXAbs = Math.abs(nMouseRelativeCoordsWdhX - dEdgePoint2CoordsX);
		var dMouse2LinEnd2DiffYAbs = Math.abs(nMouseRelativeCoordsHghY - dEdgePoint2CoordsY);
		if (dLineSegXCoordsDiffAbs < 0.000001) {
			dDistanceBtwnMouseAndLineSeg = Math.min(dMouse2LinEnd1DiffXAbs, dMouse2LinEnd2DiffXAbs);
		} else if (dLineSegYCoordsDiffAbs < 0.000001) {
			dDistanceBtwnMouseAndLineSeg = Math.min(dMouse2LinEnd1DiffYAbs, dMouse2LinEnd2DiffYAbs);
		} else {
			var dDistNominator = Math.abs(dMouse2LinEnd1DiffX / dLineSegXCoordsDiff - dMouse2LinEnd1DiffY / dLineSegYCoordsDiff);
			var dDistDenominat = Math.sqrt(Math.pow(dLineSegXCoordsDiffAbs, 2) + Math.pow(dLineSegYCoordsDiffAbs, 2));
			dDistanceBtwnMouseAndLineSeg = dDistNominator / dDistDenominat;
		}
	} else {
		dDistanceBtwnMouseAndLineSeg = dDistanceThreshold1;
	}
	return dDistanceBtwnMouseAndLineSeg;
};






























