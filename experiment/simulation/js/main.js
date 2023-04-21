var mto = 0.5;
 var lab_imp = [],
     dat_imp = [],
     lab_step = [],
     dat_step = [],
     lab_final = [],
     poles = [],
     polesc = [];

var re_nyq1 = [],
    img_nyq1 = [],
    re_nyq2 = [],
    img_nyq2 = [];
var stepeqn,impuleqn;
var eqn;

var kpi,essi,esss,kp;
var conclusion = "";
 
//  var conclusion = "<br>All the poles entered here are in the left-half plane. So, the number of unstable poles of open-loop are zero. <br>";
//  conclusion = conclusion+"<br> Similarly, the zeros entered are in the left-half plane, so the number of unstable cosed-loop poles is zero. So, the encirclement is zero. <br> "



 function addval() {
     lab = [];
     dat = [];
     a = "0"
     var nums, dens;
     var c1 = document.getElementById("numc").value;
     var d1 = document.getElementById("numd").value;
     var p1 = document.getElementById("dena").value;
     var q1 = document.getElementById("denb").value;
     var r1 = document.getElementById("denc").value;
     polesc = [];
     poles = [];
     var x1, y1;
     var ni = 0,
         di = 0;

     c = parseInt(c1);
     d = parseInt(d1);
     p = parseInt(p1);
     q = parseInt(q1);
     r = parseInt(r1);
     var a = 0;

    nyquist (c,d,p,q,r);
    

     
     lc = 1;
     document.getElementById("line1").setAttribute("style", "color:blue");
     document.getElementById("chartcont").setAttribute("style", "display:none");
     document.getElementById("tanswer").setAttribute("style", "display:none;");
     document.getElementById("chartcont1").setAttribute("style", "display:none;");
     document.getElementById("out5").setAttribute("style", "display:none;");
    
         
     for (let i = 1; i < 6; i++) {
         let out = "out" + i;
         let ln = "line" + (i + 1);
         document.getElementById(ln).setAttribute("Style", "color:black");
         document.getElementById(out).setAttribute("style", "display:none");
     }

     for (let i=1;i<4;i++)
     {
      let m = "tabm"+i;
      let a = "taba"+i;
      document.getElementById(m).setAttribute("style", "display:none");
      document.getElementById(a).setAttribute("style", "display:none");

     }
     
     if(a==0 && p!=0 && c!=0 && d!=0)
mto=1;
else if((a!=0 && p==0)||(c!=0&&p==0&&q==0))
{
  mto=0;
  alert("Not a proper transfer function \nthe order of denominator should be greater than order of numerator");
}
else if(d!=0 && (q!=0 || p!=0))
{mto=1;}

else if(a==0 && c==0 && d==0)
{mto=0;
  alert("Not a proper transfer function \nplease provide some value for numerator as numerator cannot be zero");}
else if(p==0 && q==0 && r==0)
{mto=0;
  alert("Not a proper transfer function \nplease provide some value for denominator as denominator cannot be zero  ");
}
     
     if (mto) {
         document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
         document.getElementById("matwork").title = "";
         document.getElementById("mrun").disabled = false;
         document.getElementById("matwork").setAttribute("style", "opacity:1");
         document.getElementById("mrun").classList.remove("mrundisabled", "mrunenabled");
         document.getElementById("mrun").classList.add("mrunenabled");
         document.getElementById("matwork").classList.remove('mat');

         if(p!=0){
            dens=p;
          dend=discriminant(p,q,r);
          if(dend>0)
          {
            x1 = (-1*q-Math.sqrt(dend))/2/p;
            x1 =Math.round(x1 * 100) / 100;
          
            poles.push({x:x1,y:0});
            x1 = (-1*q+Math.sqrt(dend))/2/p;
            x1 =Math.round(x1 * 100) / 100;
          
            poles.push({x:x1,y:0});
          }
          else if(dend==0)
          {
            x1 = (-1*q-Math.sqrt(dend))/2/p;
            x1 =Math.round(x1 * 100) / 100;
          
            poles.push({x:x1,y:0});
            poles.push({x:x1,y:0});
          }
          else
          {
            x1 = (-1*q/(2*p));
            x1 =Math.round(x1 * 100) / 100;
          
            y1 = (Math.sqrt(-1*dend)/2/p);
            y1 =Math.round(y1 * 100) / 100;
          
            poles.push({x:x1,y:y1});
            poles.push({x:x1,y:-1*y1});
            di=1;
          }}
          else
          {
            if(q!=0){
              dens=q;
              let temp = -1*r/q;
              poles.push({x:temp,y:0});
            }
            else
              dens=r;
          }
          var output = "<br>";
          for(j=0;j<poles.length;j++)
          {  if(di != 1 )
             output = output+"&emsp;&emsp;   " + poles[j].x+"<br><br>";
             else
             {
                 output = output+ "&emsp;&emsp;   " + poles[j].x+"&emsp; + &emsp;"+poles[j].y+"&emsp; i"+"<br><br>";
             }
          }

          p2 = p;
          q2 = c+q;
          r2 = d+r;

          if(p2!=0){
            dens=p2;
          dend=discriminant(p2,q2,r2);
          if(dend>0)
          {
            x1 = (-1*q2-Math.sqrt(dend))/2/p2;
            x1 =Math.round(x1 * 100) / 100;
          
            polesc.push({x:x1,y:0});
            x1 = (-1*q2+Math.sqrt(dend))/2/p2;
            x1 =Math.round(x1 * 100) / 100;
          
            polesc.push({x:x1,y:0});
          }
          else if(dend==0)
          {
            x1 = (-1*q2-Math.sqrt(dend))/2/p2;
            x1 =Math.round(x1 * 100) / 100;
          
            polesc.push({x:x1,y:0});
            polesc.push({x:x1,y:0});
            
          }
          else
          {
            x1 = (-1*q2/(2*p2));
            x1 =Math.round(x1 * 100) / 100;
          
            y1 = (Math.sqrt(-1*dend)/2/p2);
            y1 =Math.round(y1 * 100) / 100;
          
            polesc.push({x:x1,y:y1});
            polesc.push({x:x1,y:-1*y1});
            di=1;
          }}
          else
          {
            if(q2!=0){
              dens=q2;
              let temp = -1*r2/q2;
              polesc.push({x:temp,y:0});
            }
            else
              dens=r2;
          }
          var output2 = "<br>";
          for(j=0;j<polesc.length;j++)
          {  if(di != 1 )
             output2 = output2+"&emsp;&emsp;   " + polesc[j].x+"<br><br>";
             else
             {
                 output2 = output2+ "&emsp;&emsp;   " + polesc[j].x+"&emsp; + &emsp;"+polesc[j].y+"&emsp; i"+"<br><br>";
             }
          }



        //  var numerator = "$${\\frac{ ";
        //  if (c != 0)
        //      numerator = numerator + c + "s";
        //  if (d != 0)
        //      if (c != 0)
        //          numerator = numerator + " + " + d;
        //      else
        //          numerator = numerator + d;
        //  numerator = numerator + "}";
        //  var denominator = "{";
        //  if (p != 0)
        //      denominator = denominator + p + "s^2";
        //  if (q != 0)
        //      if (p != 0)
        //          denominator = denominator + " + " + q + "s";
        //      else
        //          denominator = denominator + q + "s";
        //  if (r != 0)
        //      if (q != 0)
        //          denominator = denominator + " + " + r;
        //      else
        //          denominator = denominator + r;
        //  denominator = denominator + "}} $$";
        //  var eqn = numerator+denominator;

        var numerator = "$${\\frac{";
if(a!=0)
numerator=numerator+a+"s^2";
if(c!=0)
  if(a!=0)
    if(c>0)
      numerator=numerator+" + " + c+"s";
    else
      numerator=numerator + c+"s";
  else
  numerator=numerator+ c+"s";
if(d!=0)
  if(a!=0 || c!=0)
if(d>0)
      numerator=numerator+" + " + d;
    else
      numerator=numerator + d;
  else
  numerator=numerator+ d;
numerator=numerator+"}";
var denominator = "{";
if(p!=0)
denominator=denominator+p+"s^2";
if(q!=0)
  if(p!=0)
    if(q>0)
      denominator=denominator+ " + " + q+"s";
    else
      denominator=denominator + q+"s";
  else
    denominator=denominator+ q+"s";
if(r!=0)
  if(p!=0||q!=0)
  if(r>0)
      denominator=denominator+ " + " + r;
    else
      denominator=denominator + r;
else
  denominator=denominator+ r;
denominator=denominator+"}}$$";
eqn = numerator + denominator;

var denominator2 = "{";
if(p2!=0)
denominator2=denominator2+p2+"s^2";
if(q2!=0)
  if(p2!=0)
    if(q2>0)
      denominator2=denominator2+ " + " + q2+"s";
    else
      denominator2=denominator2 + q2+"s";
  else
    denominator2=denominator2+ q2+"s";
if(r2!=0)
  if(p2!=0||q2!=0)
  if(r2>0)
      denominator2=denominator2+ " + " + r2;
    else
      denominator2=denominator2 + r2;
else
  denominator2=denominator2+ r2;
denominator2=denominator2+"}}$$";
         

         var co=0;
         for (let i=0;i<poles.length;i++)
         {
            if (poles[i].x>0)
            co++;
         }
         var cc=0;
         for (let i=0;i<polesc.length;i++)
         {
            if (polesc[i].x>0)
            cc++;
         }
         
                 

         document.getElementById("out1").innerHTML = eqn;
         
         var eq = numerator+denominator2;

         document.getElementById("out2").innerHTML = eq;
         output = output + "&emsp;&emsp;    Z (Open loop poles in RHP) = "+ co+" .<br><br>";
         document.getElementById("out3").innerHTML = output;
         output2 = output2 + "&emsp;&emsp;  P (Closed Loop Poles in RHP) = "+ cc+" <br><br>";
         document.getElementById("out4").innerHTML = output2;
         var output3 = "<br>&emsp;&emsp;  N = Z - P = "+co+" - "+cc+" = "+(co-cc)+".<br><br>";
         document.getElementById("out5").innerHTML = output3;
         document.getElementById("tabm1").innerHTML = (d/r).toFixed(2);
         document.getElementById("tabm2").innerHTML = magnitude(c,d,p,q,r,-1000).toFixed(2);
         document.getElementById("tabm3").innerHTML = magnitude(c,d,p,q,r,1000).toFixed(2);
         document.getElementById("taba1").innerHTML = angle(c,d,p,q,r,0).toFixed(2);
         document.getElementById("taba2").innerHTML = angle(c,d,p,q,r,-1000).toFixed(2);
         document.getElementById("taba3").innerHTML = angle(c,d,p,q,r,1000).toFixed(2);
         

         if ((co-cc)==0)
conclusion = "The critical point has zero encirclement. <br><br>Thus, the system is stable and there is no unstable pole of the system.<br>";
else if ((co-cc)==-1)
conclusion = "There is only one clockwise encirclement about the critical point. <br><br> The system maybe unstable and there is one unstable pole of the system. <br>";
else if ((co-cc)==-2)
conclusion = "There are two clockwise encirclements about the critical point. <br><br> The system maybe unstable with two unstable poles of the system.";
else if ((co-cc)==1)
conclusion = "There is only one anti-clockwise encirclement about the critical point. <br><br> The system maybe unstable and there is one unstable pole of the system. <br>";
else if ((co-cc)==2)
conclusion = "There are two anti-clockwise encirclements about the critical point. <br><br> The system maybe unstable with two unstable poles of the system.";
         
         
        //document.getElementById("tanswer").innerHTML ="<br> Step Response in time domain:"+ eqn +"<br>Kp:"+kp.toFixed(2)+"<br>ess:"+esss.toFixed(2)+ "<br><br>Impulse Response in time domain:"+eqn+"<br>K:"+kpi.toFixed(2)+"<br>ess:"+essi.toFixed(2);
         var j, k;

         
         
         var ms = window.matchMedia("(max-width:950px)");
         cwidth(ms);
         ms.addListener(cwidth);

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out1"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out2"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out3"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "tanswer"]);
     } else {
         mto = 1;

         document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
         document.getElementById("mrun").disabled = true;
         document.getElementById("mrun").classList.remove('mrunenabled', 'mrundisabled');
         document.getElementById("tanswer").setAttribute("style", "display:none");
         document.getElementById("mrun").classList.add('mrundisabled');
         document.getElementById("matwork").classList.add('mat');
         document.getElementById("matwork").setAttribute("style", "opacity:0.5");
         document.getElementById("matwork").title = "Please enter the values of coeffecients of the equation first";
     }
 };

 function discriminant (a,b,c)
 {
    return b*b-4*a*c;
 }

 function showval() {
     genval("numc", "lc");
     genval("numd", "ld");
     genval("dena", "lp");
     genval("denb", "lq");
     genval("denc", "lr");
 };

 function genval(idofinput, idofspan) {
     var x;
     x = document.getElementById(idofinput).value;
     //var x1 = x.toFixed(2);
     document.getElementById(idofspan).innerHTML = x;
 };

 var lc = 1;

 function runprog(i) {
     lc = lc + 1;
     if (lc <= 6)
         highlightline(lc);
     else {
         document.getElementById("fconclusions").innerHTML = conclusion;
         document.getElementById("line6").setAttribute("style", "color:black;");
         document.getElementById("mrun").disabled = true;
         var ms = window.matchMedia("screen and (max-width:950px)");
         for (let i=1;i<4;i++)
         {
          let m = "tabm"+i;
          let a = "taba"+i;
          document.getElementById(m).setAttribute("style", "color:black");
          document.getElementById(a).setAttribute("style", "color:black");          
         }
         
         
         widthcheck(ms);
         ms.addListener(widthcheck);
         document.getElementById("mrun").disabled = true;
         document.getElementById("mrun").classList.remove("mrunenabled");
         document.getElementById("mrun").classList.add("mrundisabled");

         
     }
 };

 function cwidth(ms) {

     if (ms.matches) {
         var chartplot1 = document.getElementById("chartmine1").getContext("2d");
        
     } else {
         var chartplot1 = document.getElementById("myChart1").getContext("2d");
        
     }
     if (window.ch1 != undefined)
         window.ch1.destroy();
    
     const labelstep = lab_final;    

     window.ch1 = new Chart(chartplot1, {
        type: 'scatter',
    data: {
        datasets: [{
          pointStyle: 'circle',
          pointRadius: 3,
          backgroundColor: 'rgb(255,0,0)',
          borderColor: "rgb(255,0,0)",
          pointBackgroundColor: "rgb(255,0,0)",
          data: [{x:-1, y:0}],
          label: "Critical Point"
        },        
        {
            pointStyle:'cross',
            rotation:45,
            borderWidth: 1,
            backgroundColor: 'rgb(252, 186, 3)',
            borderColor: "rgb(252, 186, 3)",
            pointRadius: 6,
            data: poles,
            label:"Open Loop Poles"
          },
          {
            pointStyle:'cross',
            rotation:45,
            borderWidth: 1,
            backgroundColor: 'rgb(252, 3, 248)',
            borderColor: "rgb(252, 3, 248)",
            pointRadius: 6,
            data: polesc,
            label:"Closed Loop Poles"
          },
          {
            data: generateDataPoints(re_nyq1, img_nyq1),
            label: '- ∞ to 0',
            backgroundColor: 'rgb(0,255,0)',
            borderColor: 'rgb(0,255,0)',
            borderWidth: 0.2
        },
        {
          data: generateDataPoints(re_nyq2, img_nyq2),
          label: '0 to ∞',
          backgroundColor: 'rgb(0,0,255)',
          borderColor: 'rgb(0,0,255)',
          borderWidth: 0.2
      }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: "Real Axis" !== ' ',
                    labelString: "Real Axis"
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: "Imaginary Axis" !== ' ',
                    labelString: "Imaginary Axis"
                }
            }]
        }
    }
});    
 }

 function generateDataPoints(xValues, yValues) {
    var dataPoints = [];
    for (var i = 0; i < xValues.length; i++) {
        dataPoints.push({x: xValues[i], y: yValues[i]});
    }
    return dataPoints;
}

 function widthcheck(ms) {
     if (ms.matches){
         document.getElementById("chartcont").setAttribute("style", "display:block;");
     
     document.getElementById("tanswer").setAttribute("style", "display:block");}
     else {
         document.getElementById("chartcont1").setAttribute("style", "display:block;");
         document.getElementById("tanswer").setAttribute("style", "display:block");
     }
 }

 function highlightline(l) {
    console.log(l);
     var ln = "line" + l;
     var out = "out" + (l-1) ;
     console.log(out);
     document.getElementById(ln).setAttribute("style", "color:blue;");
     document.getElementById(out).setAttribute("style", "display:block;");
     if (lc != 1)
         ln = "line" + (l - 1);
     document.getElementById(ln).setAttribute("style", "color:black;");
 }

 

 function nyquist(c0, d0, p0, q0, r0) {

    re_nyq1 = [];
    img_nyq1 = [];
    re_nyq2 = [];
    img_nyq2 = [];
   
    for (let i=-50; i<=50; i=i+0.01){
      if (i<0)
      {
        re_nyq1.push(real(c0,d0,p0,q0,r0,i).toFixed(2));
        img_nyq1.push(imaginary(c0,d0,p0,q0,r0,i)); 
      }
      else
      {
        re_nyq2.push(real(c0,d0,p0,q0,r0,i).toFixed(2));
        img_nyq2.push(imaginary(c0,d0,p0,q0,r0,i)); 
      }
           
        lab_final.push(i.toFixed(2));   
 
    }

 }

 function real(c,d,p,q,r,i)
 {
    var call = ((c*q-d*p)*(i*i)+d*r)/(i*i*q*q+(r-p*i*i)*(r-p*i*i));
    return call; 
 }

 function imaginary(c,d,p,q,r,i)
 {
    var call = ((c*r-d*q)*i-(p*c*i*i*i))/((q*q*i*i)+(r-p*i*i)*(r-p*i*i));
    return call;
 }

 function magnitude(c,d,p,q,r,w)
 {
   var mag = Math.sqrt(d*d+w*w*c*c)/Math.sqrt((r-p*w*w)*(r-p*w*w)+w*w*q*q);
   return mag;
 }

 function angle(c,d,p,q,r,w)
 {
  var ang = Math.atan(w*c/d)-Math.atan(w*q/(r-w*w*p));
  ang = ang*180/3.14;
  return ang;
 }

 

 

 
 
