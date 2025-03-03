// (c) Copyright S�ren Krohn & DWTMA 1997, 1998otype = new Popup("obstype","porosity",WC);rlpop = new Popup("roughpop","roughnesslength",null);hubht = new Box("hubheight",null,1,100," m is an unreasonably low hub height"," m is an unreasonably high hub height. 100 m is maximum");dist = new Box("distance",null,5,20000," m is an unreasonably low distance. Distance must be at least 5 m"," m is an unreasonably high distance. 20000 m is maximum");obsht = new Box("obstacleheight",null,0,100," m is an unreasonably low obstacle height"," m is an unreasonably high obstacle height. 100 m is maximum");wdth = new Box("width",null,0, Number.MAX_VALUE," m is an unreasonably low obstacle width","");poros = new Box("porosity",otype,0,99," % is too low. Porosity cannot be below 0","  % is too high. Porosity cannot be above 99%");rlen = new Box("roughnesslength",rlpop,0.0002,1.6," is too low. Roughness length cannot be below 0.0002","  is too high. Roughness length cannot be above 1.6");hhS=new Box("hhSpeed",null,1,50," m/s is no fun to look at, please use at least 1 m/s"," m/s is an extremely high wind speed. Maximum is 50 m/s");a = new Squares(10);p = new Squares(4);Wcheck(true);calc();function Squares(n) {	this.c=c;	this.m=m;	this.x=x;	this.p=p;	this.max=n;}function c(n) {	var pct=0;	if (document.images["r"+n].src.indexOf("greenpix")==-1) {		document.images["r"+n].src="../../../res/greenpix.gif";	}	else {		var q="../../../res/grpix.gif";		if(poros.val()==30) q="../../../res/tree30.gif";		if (poros.val()==50) q="../../../res/50.gif";		if (poros.val()==70) q="../../../res/tree70.gif";		if (poros.val()==0) q="../../../res/building.gif";		document.images["r"+n].src=q;	}	for (var i=0;i<this.max;i++) {		if (document.images["r"+i].src.indexOf("greenpix")==-1) pct+=0.1;	}	var filledWhen=2*dist.val()*Math.tan(Math.PI*15/180);	document.forms[0].elements.width.value=filledWhen*pct;	Wcheck(false);}function p(n) {	var po=new Array(0,30,50,70);	document.forms[0].elements.porosity.value=po [n];	poros.check();}function m(n) {	if (document.images["r"+n].src.indexOf("greenpix")!=-1) {		self.status="Click to insert a wind obstacle here";	}	else {		self.status="Click to remove this wind obstacle";	}}function x(n) {	self.status="Click to select this object's porosity";}function Popup(aName,aBox,anAction) {	this.name=aName;	this.itsbox=aBox;	this.action=anAction;	this.check=chk;	this.change=change;}function chk() {	var index = document.forms[0].elements[this.name].selectedIndex;	var ndx = document.forms[0].elements[this.name].options[index].value;	if (ndx=="") return;	document.forms[0].elements[this.itsbox].value=ndx;	if (this.action!=null) this.action();	calc();}function WC() {	Wcheck(true);}function change() {	if (this.action!=null) this.action();	var x = parseFloat(document.forms[0].elements[this.itsbox]. value);	var max = document.forms[0].elements[this.name].options.length - 1;	for (var i=0; i<max; i++) {		var ndx = parseFloat(document.forms[0].elements[this.name].options[i].value);	if (ndx==x) { document.forms[0].elements[this.name].selectedIndex = i; return; }	}	document.forms[0].elements[this.name].selectedIndex = max;}function Box(aName,aPopup,aMin,aMax,aMintxt,aMaxtxt) {	this.name=aName;	this.itspopup=aPopup;	this.min=aMin;	this.max=aMax;	this.mintxt=aMintxt;	this.maxtxt=aMaxtxt;	this.val=val;	this.check=check;	this.reset=reset;}function val() {	return(parseFloat(document.forms[0].elements[this.name].value));}function check() {	var v=this.val();	if (v<this.min) { alert(v+this.mintxt+", please try again."); this.reset(); return; }	if (v>this.max) { alert(v+this.maxtxt+",  please try again."); this.reset(); return; }	if (this.itspopup!=null) this.itspopup.change();	calc();}function reset() {	document.forms[0].elements[this.name].value= document.forms[0].elements[this.name].defaultValue;}function PWcheck() {	var pct=parseFloat(document.forms[0].elements.pctWidth.value);	if (pct<0) {		document.forms[0].elements.pctWidth.value=0;		pct=0;	}	var filledWhen=2*dist.val()*Math.tan(Math.PI*15/180);	document.forms[0].elements.width.value=filledWhen*pct*0.01;	Wcheck(true);}function Wcheck(updateSquares) {	wdth.check();	var filledWhen=2*dist.val()*Math.tan(Math.PI*15/180);	var pct= wdth.val()/filledWhen;	document.forms[0].elements.pctWidth.value=Math.round(100*pct);	if (!updateSquares) return;	var no=Math.round(10*pct);	if (no>10) no=10;	var sq="../../../res/grpix.gif"	if (poros.val()==30) sq="../../../res/tree30.gif";	if (poros.val()==50) sq="../../../res/tree50.gif";	if (poros.val()==70)sq="../../../res/tree70.gif";	if (poros.val()==0) sq="../../../res/building.gif";	for (var i=0;i<no;i++) {				document.images["r"+i].src=sq;	}	for (var i=no;i<10;i++) {		document.images["r"+i].src="../../../res/greenpix.gif";	}}function calc() {	var za=hubht.val();	var h=obsht.val();	var x=dist.val();	var P=0.01*poros.val();	var z0=rlen.val();	var L=wdth.val();	var com="";	if (x/h<5) com="Uncertain result: Obstacle too close";	if (za<2*h) {		if (com!="") {			com=com+" and too tall";		}		else {			com="Uncertain result: Obstacle too tall";		}	}	document.forms[0].elements.comment.value = com;	var R1=getR1(za,h,x,P,z0,L);	document.forms[0].elements.pct.value=100*R1;	var e=100*(1-Math.pow(1-R1,3));	document.forms[0].elements.pcte.value=e;	e=Math.round(e);	if (e>30) e=30;	for (var i=0;i<e;i++) {		document.images["t"+i].src="../../../res/whpix.gif"	}	for (var i=e;i<30;i++) {		document.images["t"+i].src="../../../res/redpix.gif"	}}function getR1(za,h,x,P,z0,L) {	var Karmann=0.4;	var K=(2*Karmann*Karmann)/Math.log(h/z0);	var eta=(za/h)*Math.pow(K*(x/h),-0.47);	var R1=9.75*(h/x)*(1-P)*eta*Math.exp(-0.67*Math.pow(eta,1.5));	var R2=2*L/x;	if (L/x>=0.3) R2=1/(1+0.2*x/L);	return(R1*R2);}function Sorry() {	alert("Sorry, you cannot change a result. You will have to change the input data instead.");	calc();}function Plot(typ) {	var wi=400;	var he=480;	var za=1.5*hubht.val();	var h=obsht.val();	var x=1.5*dist.val();	var P=0.01*poros.val();	var z0=rlen.val();	var L=wdth.val();	var data=new Array(0);	var R1=0;	var k=0;	var col="";	var km="";	var height=0;	gWindow=window.open("","Obstacle","status=yes,resizable=yes,width="+wi+",height="+he);	gWindow.document.write("<HEAD><TITLE>Wind "+typ+" Downstream of Obstacle</TITLE></HEAD>");	for (var j=0;j<30;j++) {		for (var i=0;i<21;i++) { 			data[k]=(1-getR1(za*(30-j)/30,h,(i+1)*(x/21),P,z0,L));			if (typ=="Energy") data[k]*=data[k]*data[k];			data[k]*=100;			if (data[k]<0) data[k]=0;		k++;		}	}	k=0;	gWindow.document.write("<BODY BGCOLOR='#ffffff'><TABLE WIDTH='368' BORDER='0' CELLSPACING='0' CELLPADDING='0'><TR><TD COLSPAN='23'><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' COLOR='0066CC'><B>Wind "+typ+" in per cent of Wind "+typ+" Without Obstacle</B></FONT><BR><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1'>m height </FONT></TD></TR>");	for (var j=0;j< 30;j++) {		height= Math.round(za*(30-j)/30);		col="FFFFFF"; if (height<=h) col="666666";		gWindow.document.write("<TR><TD WIDTH='16' HEIGHT='10' BGCOLOR='"+col+"' ALIGN='RIGHT'><FONT SIZE='1'> "+height+"</FONT></TD>");		for (var i=0;i<21;i++) { 			var f= CVX(data[k]);			col=f+f+f;			if ((i==13) && (height<=za/1.5)) {col=f+f+"00";}			var num= Math.round(data[k]);			if (num==0) num="&nbsp;";			gWindow.document.write("<TD WIDTH='16' HEIGHT='10' BGCOLOR='#"+col+"' ALIGN='RIGHT'><FONT SIZE=1 COLOR='#0066CC'>"+num +"</TD>");		k++;		}		if (j==0) gWindow.document.write("<TD ROWSPAN='31' VALIGN='BOTTOM' ALIGN='LEFT' WIDTH='16'><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1'>&nbsp;m</FONT></TD>");		gWindow.document.write("</TR>");	}	gWindow.document.write("<TR><TD WIDTH='16' HEIGHT='10'>&nbsp;</TD>");	for (var i=0;i<21;i++) {		var dis=Math.round(x*(i+1)/21); if (dis>=1000) {dis= 0.1*Math.round(x*(i+1)/2100); dis=dis.toString().substring(0,3); km="km";}		gWindow.document.write("<TD WIDTH='16' HEIGHT='10' VALIGN='BOTTOM' ALIGN='RIGHT'><FONT SIZE='1'> "+dis+"</FONT></TD>");	}	gWindow.document.write("</TR><TR><TD BGCOLOR='666666'>&nbsp;</TD><TD COLSPAN='13'><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1'>&nbsp;= Obstacle "+h+" m tall</FONT></TD><TD BGCOLOR='FFCC00'>&nbsp;</TD><TD COLSPAN='7'><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1'>&nbsp;= Turbine hub height "+(za/1.5)+" m tall</FONT></TD><TD><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1'>&nbsp;"+km+"</FONT></TD>");	gWindow.document.write("</TR><TR><TD COLSPAN='23'><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1'>Roughness length = "+z0+"; Porosity = "+P+"; Obstacle width = "+L+" m<BR>Note: Vertical and horizontal scales are different. Horizontal scale shows distance from obstacle</FONT><BR><FONT FACE=' gillsans, frutiger, arial, helvetica, geneva' SIZE='1' COLOR='0066CC'>&copy; 1998 Danish Wind Turbine Manufacturers Association</FONT></TD></TR>");	gWindow.document.write("</TABLE></BODY>");	gWindow.document.close();}function CVX(n) {	var d="0123456789ABCDEF";	if (n>=100) n=100;	n=Math.round(n*2.55);	var a=Math.floor(n/16);	var b=n%16;	return(d.substring(a,a+1)+d.substring(b,b+1));}function hlp() {	self.status="Click for help"}function WSpeed(height, roughness, refHeight, refSpeed, refRoughness){	return(refSpeed*Math.log(height/roughness)/Math.log(refHeight/refRoughness));}function Prof(energy) {	gProf = window.open("","","status=yes,width=390,height=310");	var rl=rlen.val();	var xv=WSpeed(100,rl,hubht.val(),hhS.val(),rl);	var yv=0;	var refSpeed = xv;	var refHeight=100;	var max=Math.ceil(xv);;	if (energy) max=Math.ceil(xv*xv*xv*1.225*0.5*0.001);	gProf.document.write("<HTML><HEAD><TITLE>Wind Speeds at Different Heights</TITLE></HEAD><BODY BGCOLOR='#ffffff'>");	gProf.document.write("<TABLE WIDTH='320' BORDER='0' CELLSPACING='0' CELLPADDING='0'><TR>");	gProf.document.write("</TR><TD COLSPAN='"+ (max+2) + "'><FONT SIZE=2 FACE='gillsans, frutiger, arial, helvetica, geneva'><IMG SRC='../../../r/t.gif' HEIGHT='1' WIDTH='11'>Roughness length = " + rl + " m, Obstacle height = "+obsht.val()+" m, Obstacle width = "+wdth.val()+"m, Porosity = "+poros.val()+"%, Distance to obstacle = "+dist.val()+" m. Red curve shows obstacle effect.<BR>m height<BR><IMG SRC='../../../r/t.gif' HEIGHT='3' WIDTH='3'></FONT><TR>");	gProf.document.write("<TD WIDTH='19' VALIGN='TOP'><P ALIGN=RIGHT><FONT SIZE='1'>100 </FONT></TD><TD ROWSPAN='10' WIDTH='1' VALIGN='TOP'><IMG SRC='../../../res/blpix.gif' HEIGHT='201' WIDTH='1' ALIGN='RIGHT' HSPACE='0'></TD>");	gProf.document.write("<TD ROWSPAN='10' COLSPAN='" + max + "' WIDTH='300' VALIGN='TOP'>");	var f=Math.round(300/max);	var oldx=Math.round(f*max);	var w=1;	var wy=1;	var oldy= Math.round(f*max);	var pix="";	for (var i=0;i<200;i++) {		xv=Math.round(f*WSpeed(0.5*(200-i), rl,refHeight, refSpeed, rl));		if (energy) xv=xv*xv*xv*1.225*0.5*0.001;		var factor=1-getR1(0.5*(200-i),obsht.val(),dist.val(),poros.val(),rl,wdth.val());		if (energy) factor=factor*factor*factor;		yv= Math.round(xv*factor);		pix='../../../r/t.gif';		if (i%20==0) pix = '../../../res/blpix.gif';		gProf.document.write("<IMG SRC='"+ pix +"' HEIGHT='1' WIDTH='"+(yv-1)+"'>");		w=oldx-xv;		wy=oldy-yv;		if (w<1) w=1;		if (wy<1) wy=1;		if (xv<=yv) {			gProf.document.write("<IMG SRC='../../../res/bluepix.gif' HEIGHT='1' WIDTH='"+(1+oldx-xv)+"'>");		}		else {			gProf.document.write("<IMG SRC='../../../res/redpix.gif' HEIGHT='1' WIDTH='"+wy+"'>");			if (xv-yv>1) {				gProf.document.write("<IMG SRC='"+ pix +"' HEIGHT='1' WIDTH='"+(xv-yv-1)+"'>");			}			gProf.document.write("<IMG SRC='../../../res/bluepix.gif' HEIGHT='1' WIDTH='"+w+"'>");		}		oldx=xv;		oldy=yv;		if (i%20==0) gProf.document.write("<IMG SRC='"+ pix +"' HEIGHT='1' WIDTH='"+(300-xv-w-wy)+"'>");		gProf.document.write("<BR>");	}	gProf.document.write("<IMG SRC='../../../res/blpix.gif' HEIGHT='1' WIDTH='"+(300)+"' HSPACE='0' VSPACE='0'></TD></TR>");	for (var i=0;i<9;i++) {		gProf.document.write("<TR><TD WIDTH='19'  VALIGN='TOP'><P ALIGN=RIGHT><FONT SIZE='1'>"+(10*(9-i))+" </FONT></TD></TR>");	}	gProf.document.write("<TR><TD COLSPAN='2'></TD><TD VALIGN='TOP' COLSPAN='"+ max +"' >");	for (var i=0; i<max; i++) {		gProf.document.write("<IMG SRC='../../../r/t.gif' HEIGHT='1' WIDTH='"+(f-1)+"'>");		gProf.document.write("<IMG SRC='../../../res/blpix.gif' HEIGHT='3' WIDTH='1'>");	}	gProf.document.write("</TD></TR>");	gProf.document.write("<TR><TD COLSPAN='2'></TD>");	for (var i=0;i<max;i++) {		gProf.document.write("<TD VALIGN='TOP'><FONT SIZE=1>" + i + "</FONT><BR><IMG SRC='../../../r/t.gif' HEIGHT='1' WIDTH='"+(f)+"'></TD>");	}	gProf.document.write("</TR><TR><TD COLSPAN='"+ (max+2) + "' VALIGN='TOP'><P ALIGN=RIGHT><FONT SIZE=2 FACE='gillsans, frutiger, arial, helvetica, geneva'>m/s<BR><FONT COLOR='0066CC' SIZE=2>&copy; 1998 Danish Wind Turbine Manufacturers Association</FONT></FONT></TD>");	gProf.document.write("</TR></TABLE></BODY></HTML>");	gProf.document.close();}// (c) Copyright S�ren Krohn & DWTMA 1997, 1998