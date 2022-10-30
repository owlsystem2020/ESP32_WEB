function ajaxAction(str) 
{  if (str == "") 
    {    document.getElementById("txtHint").innerHTML = "";    return;  }  
    const xhttp = new XMLHttpRequest();  xhttp.onload = function()
    
    {    document.getElementById("txtHint").innerHTML = this.responseText;  };  
    xhttp.open("GET", "act?mode="+str);  xhttp.send();
}

function loadData()
{
    // {    document.getElementById("ec").innerHTML = this.responseText;  };  
    // xhttp.open("GET", "act?ec=1");  xhttp.send();

    {    document.getElementById("nLevel").innerHTML = this.responseText;  };  
    xhttp.open("GET", "act?nlevel=1");  xhttp.send();

    {    document.getElementById("relayState").innerHTML = this.responseText;  };  
    xhttp.open("GET", "act?relaystate=1");  xhttp.send();

    {    document.getElementById("temp").innerHTML = this.responseText;  };  
    xhttp.open("GET", "act?temp=1");  xhttp.send();

    {    document.getElementById("time").innerHTML = this.responseText;  };  
    xhttp.open("GET", "act?time=1");  xhttp.send();

    {    document.getElementById("co2").innerHTML = this.responseText;  };  
    xhttp.open("GET", "act?co2=1");  xhttp.send();

}

function loadSettings()
{
    var httpRequest;
    httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function()
    {
        if (this.readyState == 4) 
        {
            // Everything is good, the response was received.
            if (this.status == 200) 
            {
                var obj = JSON.parse(this.responseText);
                document.getElementById("sn").innerHTML = obj.sn;
                document.getElementById("ip").innerHTML = obj.ip;
                document.getElementById("mac").innerHTML = obj.mac;
                document.getElementById("mode").innerHTML = obj.mode;
                document.getElementsByName("wifi_ssid")[0].placeholder=obj.wifi_ssid;
            } 
            else 
            {
                // error
                document.getElementById("sn").innerHTML = "error";
                document.getElementById("ip").innerHTML = "error";
                document.getElementById("mac").innerHTML = "error";
                document.getElementById("mode").innerHTML = "error";
            }

        } 
        else
        {
            // Not ready yet.
            document.getElementById("sn").innerHTML = "waiting";
            document.getElementById("ip").innerHTML = "waiting";
            document.getElementById("mac").innerHTML = "waiting";
            document.getElementById("mode").innerHTML = "waiting";
        }

        return;
    };

    httpRequest.open('GET', 'act?settings=get', true);
    httpRequest.send();
}


window.addEventListener( "load", function () {
    function sendData() {
      const XHR = new XMLHttpRequest();
  
      // Bind the FormData object and the form element
      const FD = new FormData( form );
      const queryString = new URLSearchParams(FD).toString()
  
      // Define what happens on successful data submission
      XHR.addEventListener( "load", function(event) {
        alert( event.target.responseText );
      } );
  
      // Define what happens in case of error
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      // Set up our request
      XHR.open( "GET", "act?" + queryString);
  
      // The data sent is what the user provided in the form
      XHR.send( FD );
    }
  
    // Access the form element...
    const form = document.getElementById( "wifi_ssid_form" );
    //const relay1Form = document.getElementById( "relay1_form" );
  
    // ...and take over its submit event.
    form.addEventListener( "submit", sendData);
    //relay1Form.addEventListener( "submit", sendData);

  } );

  window.addEventListener( "load", function () {
    function sendData(formName) {
      const XHR = new XMLHttpRequest();
  
      // Bind the FormData object and the form element
      const FD = new FormData( formName );
      const queryString = new URLSearchParams(FD).toString();
      
  
      // Define what happens on successful data submission
      XHR.addEventListener( "load", function(event) {
        alert( event.target.responseText );
      } );
  
      // Define what happens in case of error
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      // Set up our request
      XHR.open( "GET", "act?form=" + formName.id + "&" + queryString);
  
      // The data sent is what the user provided in the form
      XHR.send( FD );
    }
  
    // Access the form element...
    const relay1Form = document.getElementById( "r1_form" );
  
    // ...and take over its submit event.
    relay1Form.addEventListener( "change", function () { sendData(relay1Form); });
  } );


function getADCValue()
{
    var httpRequest;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function()
    {
        // Everything is good, the response was received.
        if (this.status == 200) 
        {
            document.getElementById("ec").innerHTML = this.responseText;
        }
        else
        {
            // Not ready yet.
            //document.getElementById("ec").innerHTML = "waiting";
        }
        
    }

    httpRequest.open("GET", "act?adc=1"); 
    httpRequest.send();
}

var t = setInterval(getADCValue,5000);
