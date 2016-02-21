
if(typeof tpOnce=="undefined"){
    try {
        // var rgchatAdviceToken = "test";
        var rgchatAttachingType = "widget"; //
        var clientContainerStyle = "";
        var rgchatClientWindowTop = 200;
        var rgchatClientWindowLeft = 500;
        var rgchatClientWindowWidth = 400;
        var rgchatClientWindowHeight = 500;
        var tocplusFloatingWindow = true;
        var rgchatClientWindowDiv;
        var attached = false;

        addOnloadFunc(attachDiv);
    } catch(e$) {

    }

    function attachDiv() {
        if(attached){
            return;
        }
        attached=true;
        // _T$Ca=document.body.scrollWidth;
        // if(_T$Ca<0||_T$Ca==document.body.clientWidth){
        //     _T$Ca=0;
        // }
        // if(_T$Ca>1500){
        //     _T$Ca=1500;
        // }
        var rgchatClientWindowDiv = document.createElement('div');
        if(tocplusFloatingWindow){
            // var pc=_T$Da();
            // var qc=_T$tocplusTop+_T$tocplusHeight+48;
            // if(qc>pc){
            //     _T$tocplusTop+=pc-qc;
            // }
            rgchatClientWindowDiv.innerHTML='<div id="rgchatClientWindow" style="width:'+rgchatClientWindowWidth+'px; height:'+rgchatClientWindowHeight+'px; z-index: 2147483647; position:absolute; top:'+rgchatClientWindowTop+'px; left:'+rgchatClientWindowLeft+'px;"></div>';
        }
        else{
            // rgchatClientWindow.innerHTML=_T$vb;
        }
        document.body.appendChild(rgchatClientWindowDiv);
        rgchatClientWindow=document.getElementById("rgchatClientWindow");

        var clientiFrame=document.createElement('iframe');
        clientiFrame.style.width='100%';
        clientiFrame.style.height='100%';
        clientiFrame.src='http://localhost:3000/client?token=' + rgchatAdviceToken;
        clientiFrame.frameBorder=0;
        rgchatClientWindow.appendChild(clientiFrame);

        // setTimeout("stu()",500);

    }
}

tpOnce = true;

function addOnloadFunc(func){
    var defaultOnload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }
    else{
        window.onload=function(){
            func();
            if(defaultOnload){
                defaultOnload();
            }
        }
    }
}
// document.onload = function() {
//     var iframe = document.createElement('iframe');
//     iframe.style.display = "none";
//     iframe.src = 'http://rgchatsocketserver.azurewebsites.net/client?token=' + rgchatToken;
//     document.body.appendChild(iframe);
// };
