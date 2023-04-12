var mto = 0.5;
 var lab_imp = [],
     dat_imp = [],
     lab_step = [],
     dat_step = [],
     lab_final = [];

var re_nyq = [],
    img_nyq = [];
var stepeqn,impuleqn;
var eqn;
var poles = [],
    roots = [];
var kpi,essi,esss,kp;
 
 var conclusion = "<br>All the poles entered here are in the left-half plane. So, the number of unstable poles of open-loop are zero. <br>";
 conclusion = conclusion+"<br> Similarly, the zeros entered are in the left-half plane, so the number of unstable cosed-loop poles is zero. So, the encirclement is zero. <br> "

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
     roots = [];
     poles = [];
     var x1, y1;
     var ni = 0,
         di = 0;

     c = parseInt(c1);
     d = parseInt(d1);
     p = parseInt(p1);
     q = parseInt(q1);
     r = parseInt(r1);

    nyquist (c,d,p,q,r);
    

     mto =1;
     lc = 1;
     document.getElementById("line1").setAttribute("style", "color:blue");
     document.getElementById("chartcont").setAttribute("style", "display:none");
     document.getElementById("tanswer").setAttribute("style", "display:none;");
     document.getElementById("chartcont1").setAttribute("style", "display:none;");
     document.getElementById("out1").setAttribute("style", "display:none;");
     for (let i = 1; i < 1; i++) {
         let out = "out" + i;
         let ln = "line" + (i + 1);
         document.getElementById(ln).setAttribute("Style", "color:black");
         document.getElementById(out).setAttribute("style", "display:none");
     }
     if (mto) {
         document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
         document.getElementById("matwork").title = "";
         document.getElementById("mrun").disabled = false;
         document.getElementById("matwork").setAttribute("style", "opacity:1");
         document.getElementById("mrun").classList.remove("mrundisabled", "mrunenabled");
         document.getElementById("mrun").classList.add("mrunenabled");
         document.getElementById("matwork").classList.remove('mat');

         var numerator = "$${\\frac{ ";
         if (c != 0)
             numerator = numerator + c + "s";
         if (d != 0)
             if (c != 0)
                 numerator = numerator + " + " + d;
             else
                 numerator = numerator + d;
         numerator = numerator + "}";
         var denominator = "{";
         if (p != 0)
             denominator = denominator + p + "s^2";
         if (q != 0)
             if (p != 0)
                 denominator = denominator + " + " + q + "s";
             else
                 denominator = denominator + q + "s";
         if (r != 0)
             if (q != 0)
                 denominator = denominator + " + " + r;
             else
                 denominator = denominator + r;
         denominator = denominator + "}} $$";
         var eqn = numerator+denominator;
        

         document.getElementById("out1").innerHTML = eqn;
         
         var eq = "$${\\frac{"+(c*q-d*p)+"w^2 + "+d*r + "}{"+(q*q)+"w^2"+"+("+ r+"-"+p+"w^2)^2"+"}} $$";

         document.getElementById("out2").innerHTML = eq;

         var eq2 = "$${\\frac{"+c+"w("+r+"-"+p+"w^2) -"+(d*q)+"w}{"+(r*r)+"w^2"+"("+r+"-"+p+"w^2)^2}} $$";

         document.getElementById("out3").innerHTML = eq2;
         
         
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
     if (lc <= 3)
         highlightline(lc);
     else {
         document.getElementById("fconclusions").innerHTML = conclusion;
         document.getElementById("line3").setAttribute("style", "color:black;");
         document.getElementById("mrun").disabled = true;
         var ms = window.matchMedia("screen and (max-width:950px)");
         document.getElementById("out3").setAttribute("style", "display:block;");
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
     
     
    //  window.ch1 = new Chart(chartplot1, {
    //      type: "line",
    //      data: {
    //         labels: re_nyq,
   
            
    //         datasets: [{
    //             label: "Nyquist Plot",
    //             data: img_nyq,
    //             fill: false,
    //             pointRadius: 0.01,
    //             borderWidth: 2,
    //             borderColor: 'rgb(102, 255, 255)',
    //             tension: 0.5
    //         }]
    //     },
    //      options: {
    //          title: {
    //              display: true,
    //              text: "Nyquist Plot",
    //              fontSize: 14,
    //          },
    //          maintainAspectRatio: false,
    //          scales: {
    //              xAxes: [{
    //                  scaleLabel: {
    //                      display: "Real Part" !== ' ',
    //                      labelString: "Real Part"
    //                  },

    //              }],
    //              yAxes: [{
    //                  stacked: false, // `true` for stacked area chart, `false` otherwise
    //                  beginAtZero: false,
    //                  scaleLabel: {
    //                      display: "Imaginary part" !== '',
    //                      labelString: "Imaginary part"
    //                  },


    //              }]
    //          },
    //      }
    //  });

     window.ch1 = new Chart(chartplot1, {
        type: 'scatter',
    data: {
        datasets: [{
            label: 'Nyquist Plot',
            data: generateDataPoints(re_nyq, img_nyq),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 0.2
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: "Real Part" !== ' ',
                    labelString: "Real Part"
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: "Imaginary Part" !== ' ',
                    labelString: "Imaginary Part"
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
   
    for (let i=-50; i<=50; i=i+0.01){
        re_nyq.push(real(c0,d0,p0,q0,r0,i).toFixed(2));
        img_nyq.push(imaginary(c0,d0,p0,q0,r0,i));    
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

 

 

 
 
