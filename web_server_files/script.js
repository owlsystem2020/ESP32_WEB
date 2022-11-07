
function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
};

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
                document.getElementById("current_time").innerHTML = obj.current_time;
                document.getElementsByName("r1_time_on")[0].value="06:00";

                if (obj.mode == "AP") {
                    selectElement("wifi_mode", "AP");
                }
                else
                {
                    selectElement("wifi_mode", "ST");
                }

                if (obj.rtc_sntp === 1) {
                    document.getElementsByName("rtc_sntp")[0].checked = true;
                }
                else
                {
                    document.getElementsByName("rtc_sntp")[0].checked = false;
                }

                var myParent = document.getElementById("rtc_tz_div");
            
                //Create and append select list
                var selectList = document.createElement("select");
                selectList.id = "mySelect";
                selectList.name = "rtc_tz";
                myParent.appendChild(selectList);


                console.log(timeZones.length);
                console.log(timeZones[5]);
            
                //Create and append the options
                for (var i = 0; i < timeZones.length; i++) {
                    var option = document.createElement("option");
                    option.value = timeZones[i].zone;
                    option.text = timeZones[i].name;
                    selectList.appendChild(option);
                }
                
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
};


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
    const wifiForm = document.getElementById( "wifi_ssid_form" );
    const rtcForm = document.getElementById( "rtc_form" );
  
    // ...and take over its submit event.
    relay1Form.addEventListener( "change", function () { sendData(relay1Form); });
    // ...and take over its submit event.
    wifiForm.addEventListener( "submit", function () { sendData(wifiForm); });
    rtcForm.addEventListener( "change", function () { sendData(rtcForm); });

} );

function  ajaxAction(req)
{
    var httpRequest;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function()
    {
        // Everything is good, the response was received.
        if (this.status == 200) 
        {
            document.getElementById("wifi_cb").innerHTML = "Successful set " + this.responseText;
            document.getElementById("mode").innerHTML = this.responseText;
        }
        else
        {
            // Not ready yet.
            //document.getElementById("ec").innerHTML = "waiting";
        }
        
    }

    httpRequest.open("GET", "act?wifi_mode=" + req); 
    httpRequest.send();
};

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
};

//var t = setInterval(getADCValue,5000);
var timeZones =
[
    {
      "name": "Africa/Abidjan",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Accra",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Addis_Ababa",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Algiers",
      "zone": "CET-1"
    },
    {
      "name": "Africa/Asmara",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Bamako",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Bangui",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Banjul",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Bissau",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Blantyre",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Brazzaville",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Bujumbura",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Cairo",
      "zone": "EET-2"
    },
    {
      "name": "Africa/Casablanca",
      "zone": "<+01>-1"
    },
    {
      "name": "Africa/Ceuta",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Africa/Conakry",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Dakar",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Dar_es_Salaam",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Djibouti",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Douala",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/El_Aaiun",
      "zone": "<+01>-1"
    },
    {
      "name": "Africa/Freetown",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Gaborone",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Harare",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Johannesburg",
      "zone": "SAST-2"
    },
    {
      "name": "Africa/Juba",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Kampala",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Khartoum",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Kigali",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Kinshasa",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Lagos",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Libreville",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Lome",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Luanda",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Lubumbashi",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Lusaka",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Malabo",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Maputo",
      "zone": "CAT-2"
    },
    {
      "name": "Africa/Maseru",
      "zone": "SAST-2"
    },
    {
      "name": "Africa/Mbabane",
      "zone": "SAST-2"
    },
    {
      "name": "Africa/Mogadishu",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Monrovia",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Nairobi",
      "zone": "EAT-3"
    },
    {
      "name": "Africa/Ndjamena",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Niamey",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Nouakchott",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Ouagadougou",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Porto-Novo",
      "zone": "WAT-1"
    },
    {
      "name": "Africa/Sao_Tome",
      "zone": "GMT0"
    },
    {
      "name": "Africa/Tripoli",
      "zone": "EET-2"
    },
    {
      "name": "Africa/Tunis",
      "zone": "CET-1"
    },
    {
      "name": "Africa/Windhoek",
      "zone": "CAT-2"
    },
    {
      "name": "America/Adak",
      "zone": "HST10HDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Anchorage",
      "zone": "AKST9AKDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Anguilla",
      "zone": "AST4"
    },
    {
      "name": "America/Antigua",
      "zone": "AST4"
    },
    {
      "name": "America/Araguaina",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Buenos_Aires",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Catamarca",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Cordoba",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Jujuy",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/La_Rioja",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Mendoza",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Rio_Gallegos",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Salta",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/San_Juan",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/San_Luis",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Tucuman",
      "zone": "<-03>3"
    },
    {
      "name": "America/Argentina/Ushuaia",
      "zone": "<-03>3"
    },
    {
      "name": "America/Aruba",
      "zone": "AST4"
    },
    {
      "name": "America/Asuncion",
      "zone": "<-04>4<-03>,M10.1.0/0,M3.4.0/0"
    },
    {
      "name": "America/Atikokan",
      "zone": "EST5"
    },
    {
      "name": "America/Bahia",
      "zone": "<-03>3"
    },
    {
      "name": "America/Bahia_Banderas",
      "zone": "CST6CDT,M4.1.0,M10.5.0"
    },
    {
      "name": "America/Barbados",
      "zone": "AST4"
    },
    {
      "name": "America/Belem",
      "zone": "<-03>3"
    },
    {
      "name": "America/Belize",
      "zone": "CST6"
    },
    {
      "name": "America/Blanc-Sablon",
      "zone": "AST4"
    },
    {
      "name": "America/Boa_Vista",
      "zone": "<-04>4"
    },
    {
      "name": "America/Bogota",
      "zone": "<-05>5"
    },
    {
      "name": "America/Boise",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Cambridge_Bay",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Campo_Grande",
      "zone": "<-04>4"
    },
    {
      "name": "America/Cancun",
      "zone": "EST5"
    },
    {
      "name": "America/Caracas",
      "zone": "<-04>4"
    },
    {
      "name": "America/Cayenne",
      "zone": "<-03>3"
    },
    {
      "name": "America/Cayman",
      "zone": "EST5"
    },
    {
      "name": "America/Chicago",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Chihuahua",
      "zone": "MST7MDT,M4.1.0,M10.5.0"
    },
    {
      "name": "America/Costa_Rica",
      "zone": "CST6"
    },
    {
      "name": "America/Creston",
      "zone": "MST7"
    },
    {
      "name": "America/Cuiaba",
      "zone": "<-04>4"
    },
    {
      "name": "America/Curacao",
      "zone": "AST4"
    },
    {
      "name": "America/Danmarkshavn",
      "zone": "GMT0"
    },
    {
      "name": "America/Dawson",
      "zone": "MST7"
    },
    {
      "name": "America/Dawson_Creek",
      "zone": "MST7"
    },
    {
      "name": "America/Denver",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Detroit",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Dominica",
      "zone": "AST4"
    },
    {
      "name": "America/Edmonton",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Eirunepe",
      "zone": "<-05>5"
    },
    {
      "name": "America/El_Salvador",
      "zone": "CST6"
    },
    {
      "name": "America/Fortaleza",
      "zone": "<-03>3"
    },
    {
      "name": "America/Fort_Nelson",
      "zone": "MST7"
    },
    {
      "name": "America/Glace_Bay",
      "zone": "AST4ADT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Godthab",
      "zone": "<-03>3<-02>,M3.5.0/-2,M10.5.0/-1"
    },
    {
      "name": "America/Goose_Bay",
      "zone": "AST4ADT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Grand_Turk",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Grenada",
      "zone": "AST4"
    },
    {
      "name": "America/Guadeloupe",
      "zone": "AST4"
    },
    {
      "name": "America/Guatemala",
      "zone": "CST6"
    },
    {
      "name": "America/Guayaquil",
      "zone": "<-05>5"
    },
    {
      "name": "America/Guyana",
      "zone": "<-04>4"
    },
    {
      "name": "America/Halifax",
      "zone": "AST4ADT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Havana",
      "zone": "CST5CDT,M3.2.0/0,M11.1.0/1"
    },
    {
      "name": "America/Hermosillo",
      "zone": "MST7"
    },
    {
      "name": "America/Indiana/Indianapolis",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Knox",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Marengo",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Petersburg",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Tell_City",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Vevay",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Vincennes",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Indiana/Winamac",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Inuvik",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Iqaluit",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Jamaica",
      "zone": "EST5"
    },
    {
      "name": "America/Juneau",
      "zone": "AKST9AKDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Kentucky/Louisville",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Kentucky/Monticello",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Kralendijk",
      "zone": "AST4"
    },
    {
      "name": "America/La_Paz",
      "zone": "<-04>4"
    },
    {
      "name": "America/Lima",
      "zone": "<-05>5"
    },
    {
      "name": "America/Los_Angeles",
      "zone": "PST8PDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Lower_Princes",
      "zone": "AST4"
    },
    {
      "name": "America/Maceio",
      "zone": "<-03>3"
    },
    {
      "name": "America/Managua",
      "zone": "CST6"
    },
    {
      "name": "America/Manaus",
      "zone": "<-04>4"
    },
    {
      "name": "America/Marigot",
      "zone": "AST4"
    },
    {
      "name": "America/Martinique",
      "zone": "AST4"
    },
    {
      "name": "America/Matamoros",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Mazatlan",
      "zone": "MST7MDT,M4.1.0,M10.5.0"
    },
    {
      "name": "America/Menominee",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Merida",
      "zone": "CST6CDT,M4.1.0,M10.5.0"
    },
    {
      "name": "America/Metlakatla",
      "zone": "AKST9AKDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Mexico_City",
      "zone": "CST6CDT,M4.1.0,M10.5.0"
    },
    {
      "name": "America/Miquelon",
      "zone": "<-03>3<-02>,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Moncton",
      "zone": "AST4ADT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Monterrey",
      "zone": "CST6CDT,M4.1.0,M10.5.0"
    },
    {
      "name": "America/Montevideo",
      "zone": "<-03>3"
    },
    {
      "name": "America/Montreal",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Montserrat",
      "zone": "AST4"
    },
    {
      "name": "America/Nassau",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/New_York",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Nipigon",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Nome",
      "zone": "AKST9AKDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Noronha",
      "zone": "<-02>2"
    },
    {
      "name": "America/North_Dakota/Beulah",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/North_Dakota/Center",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/North_Dakota/New_Salem",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Nuuk",
      "zone": "<-03>3<-02>,M3.5.0/-2,M10.5.0/-1"
    },
    {
      "name": "America/Ojinaga",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Panama",
      "zone": "EST5"
    },
    {
      "name": "America/Pangnirtung",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Paramaribo",
      "zone": "<-03>3"
    },
    {
      "name": "America/Phoenix",
      "zone": "MST7"
    },
    {
      "name": "America/Port-au-Prince",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Port_of_Spain",
      "zone": "AST4"
    },
    {
      "name": "America/Porto_Velho",
      "zone": "<-04>4"
    },
    {
      "name": "America/Puerto_Rico",
      "zone": "AST4"
    },
    {
      "name": "America/Punta_Arenas",
      "zone": "<-03>3"
    },
    {
      "name": "America/Rainy_River",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Rankin_Inlet",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Recife",
      "zone": "<-03>3"
    },
    {
      "name": "America/Regina",
      "zone": "CST6"
    },
    {
      "name": "America/Resolute",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Rio_Branco",
      "zone": "<-05>5"
    },
    {
      "name": "America/Santarem",
      "zone": "<-03>3"
    },
    {
      "name": "America/Santiago",
      "zone": "<-04>4<-03>,M9.1.6/24,M4.1.6/24"
    },
    {
      "name": "America/Santo_Domingo",
      "zone": "AST4"
    },
    {
      "name": "America/Sao_Paulo",
      "zone": "<-03>3"
    },
    {
      "name": "America/Scoresbysund",
      "zone": "<-01>1<+00>,M3.5.0/0,M10.5.0/1"
    },
    {
      "name": "America/Sitka",
      "zone": "AKST9AKDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/St_Barthelemy",
      "zone": "AST4"
    },
    {
      "name": "America/St_Johns",
      "zone": "NST3:30NDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/St_Kitts",
      "zone": "AST4"
    },
    {
      "name": "America/St_Lucia",
      "zone": "AST4"
    },
    {
      "name": "America/St_Thomas",
      "zone": "AST4"
    },
    {
      "name": "America/St_Vincent",
      "zone": "AST4"
    },
    {
      "name": "America/Swift_Current",
      "zone": "CST6"
    },
    {
      "name": "America/Tegucigalpa",
      "zone": "CST6"
    },
    {
      "name": "America/Thule",
      "zone": "AST4ADT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Thunder_Bay",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Tijuana",
      "zone": "PST8PDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Toronto",
      "zone": "EST5EDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Tortola",
      "zone": "AST4"
    },
    {
      "name": "America/Vancouver",
      "zone": "PST8PDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Whitehorse",
      "zone": "MST7"
    },
    {
      "name": "America/Winnipeg",
      "zone": "CST6CDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Yakutat",
      "zone": "AKST9AKDT,M3.2.0,M11.1.0"
    },
    {
      "name": "America/Yellowknife",
      "zone": "MST7MDT,M3.2.0,M11.1.0"
    },
    {
      "name": "Antarctica/Casey",
      "zone": "<+11>-11"
    },
    {
      "name": "Antarctica/Davis",
      "zone": "<+07>-7"
    },
    {
      "name": "Antarctica/DumontDUrville",
      "zone": "<+10>-10"
    },
    {
      "name": "Antarctica/Macquarie",
      "zone": "AEST-10AEDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Antarctica/Mawson",
      "zone": "<+05>-5"
    },
    {
      "name": "Antarctica/McMurdo",
      "zone": "NZST-12NZDT,M9.5.0,M4.1.0/3"
    },
    {
      "name": "Antarctica/Palmer",
      "zone": "<-03>3"
    },
    {
      "name": "Antarctica/Rothera",
      "zone": "<-03>3"
    },
    {
      "name": "Antarctica/Syowa",
      "zone": "<+03>-3"
    },
    {
      "name": "Antarctica/Troll",
      "zone": "<+00>0<+02>-2,M3.5.0/1,M10.5.0/3"
    },
    {
      "name": "Antarctica/Vostok",
      "zone": "<+06>-6"
    },
    {
      "name": "Arctic/Longyearbyen",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Asia/Aden",
      "zone": "<+03>-3"
    },
    {
      "name": "Asia/Almaty",
      "zone": "<+06>-6"
    },
    {
      "name": "Asia/Amman",
      "zone": "EET-2EEST,M2.5.4/24,M10.5.5/1"
    },
    {
      "name": "Asia/Anadyr",
      "zone": "<+12>-12"
    },
    {
      "name": "Asia/Aqtau",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Aqtobe",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Ashgabat",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Atyrau",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Baghdad",
      "zone": "<+03>-3"
    },
    {
      "name": "Asia/Bahrain",
      "zone": "<+03>-3"
    },
    {
      "name": "Asia/Baku",
      "zone": "<+04>-4"
    },
    {
      "name": "Asia/Bangkok",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Barnaul",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Beirut",
      "zone": "EET-2EEST,M3.5.0/0,M10.5.0/0"
    },
    {
      "name": "Asia/Bishkek",
      "zone": "<+06>-6"
    },
    {
      "name": "Asia/Brunei",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Chita",
      "zone": "<+09>-9"
    },
    {
      "name": "Asia/Choibalsan",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Colombo",
      "zone": "<+0530>-5:30"
    },
    {
      "name": "Asia/Damascus",
      "zone": "EET-2EEST,M3.5.5/0,M10.5.5/0"
    },
    {
      "name": "Asia/Dhaka",
      "zone": "<+06>-6"
    },
    {
      "name": "Asia/Dili",
      "zone": "<+09>-9"
    },
    {
      "name": "Asia/Dubai",
      "zone": "<+04>-4"
    },
    {
      "name": "Asia/Dushanbe",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Famagusta",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Asia/Gaza",
      "zone": "EET-2EEST,M3.4.4/48,M10.5.5/1"
    },
    {
      "name": "Asia/Hebron",
      "zone": "EET-2EEST,M3.4.4/48,M10.5.5/1"
    },
    {
      "name": "Asia/Ho_Chi_Minh",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Hong_Kong",
      "zone": "HKT-8"
    },
    {
      "name": "Asia/Hovd",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Irkutsk",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Jakarta",
      "zone": "WIB-7"
    },
    {
      "name": "Asia/Jayapura",
      "zone": "WIT-9"
    },
    {
      "name": "Asia/Jerusalem",
      "zone": "IST-2IDT,M3.4.4/26,M10.5.0"
    },
    {
      "name": "Asia/Kabul",
      "zone": "<+0430>-4:30"
    },
    {
      "name": "Asia/Kamchatka",
      "zone": "<+12>-12"
    },
    {
      "name": "Asia/Karachi",
      "zone": "PKT-5"
    },
    {
      "name": "Asia/Kathmandu",
      "zone": "<+0545>-5:45"
    },
    {
      "name": "Asia/Khandyga",
      "zone": "<+09>-9"
    },
    {
      "name": "Asia/Kolkata",
      "zone": "IST-5:30"
    },
    {
      "name": "Asia/Krasnoyarsk",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Kuala_Lumpur",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Kuching",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Kuwait",
      "zone": "<+03>-3"
    },
    {
      "name": "Asia/Macau",
      "zone": "CST-8"
    },
    {
      "name": "Asia/Magadan",
      "zone": "<+11>-11"
    },
    {
      "name": "Asia/Makassar",
      "zone": "WITA-8"
    },
    {
      "name": "Asia/Manila",
      "zone": "PST-8"
    },
    {
      "name": "Asia/Muscat",
      "zone": "<+04>-4"
    },
    {
      "name": "Asia/Nicosia",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Asia/Novokuznetsk",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Novosibirsk",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Omsk",
      "zone": "<+06>-6"
    },
    {
      "name": "Asia/Oral",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Phnom_Penh",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Pontianak",
      "zone": "WIB-7"
    },
    {
      "name": "Asia/Pyongyang",
      "zone": "KST-9"
    },
    {
      "name": "Asia/Qatar",
      "zone": "<+03>-3"
    },
    {
      "name": "Asia/Qyzylorda",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Riyadh",
      "zone": "<+03>-3"
    },
    {
      "name": "Asia/Sakhalin",
      "zone": "<+11>-11"
    },
    {
      "name": "Asia/Samarkand",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Seoul",
      "zone": "KST-9"
    },
    {
      "name": "Asia/Shanghai",
      "zone": "CST-8"
    },
    {
      "name": "Asia/Singapore",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Srednekolymsk",
      "zone": "<+11>-11"
    },
    {
      "name": "Asia/Taipei",
      "zone": "CST-8"
    },
    {
      "name": "Asia/Tashkent",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Tbilisi",
      "zone": "<+04>-4"
    },
    {
      "name": "Asia/Tehran",
      "zone": "<+0330>-3:30<+0430>,J79/24,J263/24"
    },
    {
      "name": "Asia/Thimphu",
      "zone": "<+06>-6"
    },
    {
      "name": "Asia/Tokyo",
      "zone": "JST-9"
    },
    {
      "name": "Asia/Tomsk",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Ulaanbaatar",
      "zone": "<+08>-8"
    },
    {
      "name": "Asia/Urumqi",
      "zone": "<+06>-6"
    },
    {
      "name": "Asia/Ust-Nera",
      "zone": "<+10>-10"
    },
    {
      "name": "Asia/Vientiane",
      "zone": "<+07>-7"
    },
    {
      "name": "Asia/Vladivostok",
      "zone": "<+10>-10"
    },
    {
      "name": "Asia/Yakutsk",
      "zone": "<+09>-9"
    },
    {
      "name": "Asia/Yangon",
      "zone": "<+0630>-6:30"
    },
    {
      "name": "Asia/Yekaterinburg",
      "zone": "<+05>-5"
    },
    {
      "name": "Asia/Yerevan",
      "zone": "<+04>-4"
    },
    {
      "name": "Atlantic/Azores",
      "zone": "<-01>1<+00>,M3.5.0/0,M10.5.0/1"
    },
    {
      "name": "Atlantic/Bermuda",
      "zone": "AST4ADT,M3.2.0,M11.1.0"
    },
    {
      "name": "Atlantic/Canary",
      "zone": "WET0WEST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Atlantic/Cape_Verde",
      "zone": "<-01>1"
    },
    {
      "name": "Atlantic/Faroe",
      "zone": "WET0WEST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Atlantic/Madeira",
      "zone": "WET0WEST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Atlantic/Reykjavik",
      "zone": "GMT0"
    },
    {
      "name": "Atlantic/South_Georgia",
      "zone": "<-02>2"
    },
    {
      "name": "Atlantic/Stanley",
      "zone": "<-03>3"
    },
    {
      "name": "Atlantic/St_Helena",
      "zone": "GMT0"
    },
    {
      "name": "Australia/Adelaide",
      "zone": "ACST-9:30ACDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Australia/Brisbane",
      "zone": "AEST-10"
    },
    {
      "name": "Australia/Broken_Hill",
      "zone": "ACST-9:30ACDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Australia/Currie",
      "zone": "AEST-10AEDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Australia/Darwin",
      "zone": "ACST-9:30"
    },
    {
      "name": "Australia/Eucla",
      "zone": "<+0845>-8:45"
    },
    {
      "name": "Australia/Hobart",
      "zone": "AEST-10AEDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Australia/Lindeman",
      "zone": "AEST-10"
    },
    {
      "name": "Australia/Lord_Howe",
      "zone": "<+1030>-10:30<+11>-11,M10.1.0,M4.1.0"
    },
    {
      "name": "Australia/Melbourne",
      "zone": "AEST-10AEDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Australia/Perth",
      "zone": "AWST-8"
    },
    {
      "name": "Australia/Sydney",
      "zone": "AEST-10AEDT,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Europe/Amsterdam",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Andorra",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Astrakhan",
      "zone": "<+04>-4"
    },
    {
      "name": "Europe/Athens",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Belgrade",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Berlin",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Bratislava",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Brussels",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Bucharest",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Budapest",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Busingen",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Chisinau",
      "zone": "EET-2EEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Copenhagen",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Dublin",
      "zone": "IST-1GMT0,M10.5.0,M3.5.0/1"
    },
    {
      "name": "Europe/Gibraltar",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Guernsey",
      "zone": "GMT0BST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Europe/Helsinki",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Isle_of_Man",
      "zone": "GMT0BST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Europe/Istanbul",
      "zone": "<+03>-3"
    },
    {
      "name": "Europe/Jersey",
      "zone": "GMT0BST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Europe/Kaliningrad",
      "zone": "EET-2"
    },
    {
      "name": "Europe/Kiev",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Kirov",
      "zone": "<+03>-3"
    },
    {
      "name": "Europe/Lisbon",
      "zone": "WET0WEST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Europe/Ljubljana",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/London",
      "zone": "GMT0BST,M3.5.0/1,M10.5.0"
    },
    {
      "name": "Europe/Luxembourg",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Madrid",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Malta",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Mariehamn",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Minsk",
      "zone": "<+03>-3"
    },
    {
      "name": "Europe/Monaco",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Moscow",
      "zone": "MSK-3"
    },
    {
      "name": "Europe/Oslo",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Paris",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Podgorica",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Prague",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Riga",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Rome",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Samara",
      "zone": "<+04>-4"
    },
    {
      "name": "Europe/San_Marino",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Sarajevo",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Saratov",
      "zone": "<+04>-4"
    },
    {
      "name": "Europe/Simferopol",
      "zone": "MSK-3"
    },
    {
      "name": "Europe/Skopje",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Sofia",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Stockholm",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Tallinn",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Tirane",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Ulyanovsk",
      "zone": "<+04>-4"
    },
    {
      "name": "Europe/Uzhgorod",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Vaduz",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Vatican",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Vienna",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Vilnius",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Volgograd",
      "zone": "<+03>-3"
    },
    {
      "name": "Europe/Warsaw",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Zagreb",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Europe/Zaporozhye",
      "zone": "EET-2EEST,M3.5.0/3,M10.5.0/4"
    },
    {
      "name": "Europe/Zurich",
      "zone": "CET-1CEST,M3.5.0,M10.5.0/3"
    },
    {
      "name": "Indian/Antananarivo",
      "zone": "EAT-3"
    },
    {
      "name": "Indian/Chagos",
      "zone": "<+06>-6"
    },
    {
      "name": "Indian/Christmas",
      "zone": "<+07>-7"
    },
    {
      "name": "Indian/Cocos",
      "zone": "<+0630>-6:30"
    },
    {
      "name": "Indian/Comoro",
      "zone": "EAT-3"
    },
    {
      "name": "Indian/Kerguelen",
      "zone": "<+05>-5"
    },
    {
      "name": "Indian/Mahe",
      "zone": "<+04>-4"
    },
    {
      "name": "Indian/Maldives",
      "zone": "<+05>-5"
    },
    {
      "name": "Indian/Mauritius",
      "zone": "<+04>-4"
    },
    {
      "name": "Indian/Mayotte",
      "zone": "EAT-3"
    },
    {
      "name": "Indian/Reunion",
      "zone": "<+04>-4"
    },
    {
      "name": "Pacific/Apia",
      "zone": "<+13>-13"
    },
    {
      "name": "Pacific/Auckland",
      "zone": "NZST-12NZDT,M9.5.0,M4.1.0/3"
    },
    {
      "name": "Pacific/Bougainville",
      "zone": "<+11>-11"
    },
    {
      "name": "Pacific/Chatham",
      "zone": "<+1245>-12:45<+1345>,M9.5.0/2:45,M4.1.0/3:45"
    },
    {
      "name": "Pacific/Chuuk",
      "zone": "<+10>-10"
    },
    {
      "name": "Pacific/Easter",
      "zone": "<-06>6<-05>,M9.1.6/22,M4.1.6/22"
    },
    {
      "name": "Pacific/Efate",
      "zone": "<+11>-11"
    },
    {
      "name": "Pacific/Enderbury",
      "zone": "<+13>-13"
    },
    {
      "name": "Pacific/Fakaofo",
      "zone": "<+13>-13"
    },
    {
      "name": "Pacific/Fiji",
      "zone": "<+12>-12<+13>,M11.2.0,M1.2.3/99"
    },
    {
      "name": "Pacific/Funafuti",
      "zone": "<+12>-12"
    },
    {
      "name": "Pacific/Galapagos",
      "zone": "<-06>6"
    },
    {
      "name": "Pacific/Gambier",
      "zone": "<-09>9"
    },
    {
      "name": "Pacific/Guadalcanal",
      "zone": "<+11>-11"
    },
    {
      "name": "Pacific/Guam",
      "zone": "ChST-10"
    },
    {
      "name": "Pacific/Honolulu",
      "zone": "HST10"
    },
    {
      "name": "Pacific/Kiritimati",
      "zone": "<+14>-14"
    },
    {
      "name": "Pacific/Kosrae",
      "zone": "<+11>-11"
    },
    {
      "name": "Pacific/Kwajalein",
      "zone": "<+12>-12"
    },
    {
      "name": "Pacific/Majuro",
      "zone": "<+12>-12"
    },
    {
      "name": "Pacific/Marquesas",
      "zone": "<-0930>9:30"
    },
    {
      "name": "Pacific/Midway",
      "zone": "SST11"
    },
    {
      "name": "Pacific/Nauru",
      "zone": "<+12>-12"
    },
    {
      "name": "Pacific/Niue",
      "zone": "<-11>11"
    },
    {
      "name": "Pacific/Norfolk",
      "zone": "<+11>-11<+12>,M10.1.0,M4.1.0/3"
    },
    {
      "name": "Pacific/Noumea",
      "zone": "<+11>-11"
    },
    {
      "name": "Pacific/Pago_Pago",
      "zone": "SST11"
    },
    {
      "name": "Pacific/Palau",
      "zone": "<+09>-9"
    },
    {
      "name": "Pacific/Pitcairn",
      "zone": "<-08>8"
    },
    {
      "name": "Pacific/Pohnpei",
      "zone": "<+11>-11"
    },
    {
      "name": "Pacific/Port_Moresby",
      "zone": "<+10>-10"
    },
    {
      "name": "Pacific/Rarotonga",
      "zone": "<-10>10"
    },
    {
      "name": "Pacific/Saipan",
      "zone": "ChST-10"
    },
    {
      "name": "Pacific/Tahiti",
      "zone": "<-10>10"
    },
    {
      "name": "Pacific/Tarawa",
      "zone": "<+12>-12"
    },
    {
      "name": "Pacific/Tongatapu",
      "zone": "<+13>-13"
    },
    {
      "name": "Pacific/Wake",
      "zone": "<+12>-12"
    },
    {
      "name": "Pacific/Wallis",
      "zone": "<+12>-12"
    },
    {
      "name": "Etc/GMT",
      "zone": "GMT0"
    },
    {
      "name": "Etc/GMT-0",
      "zone": "GMT0"
    },
    {
      "name": "Etc/GMT-1",
      "zone": "<+01>-1"
    },
    {
      "name": "Etc/GMT-2",
      "zone": "<+02>-2"
    },
    {
      "name": "Etc/GMT-3",
      "zone": "<+03>-3"
    },
    {
      "name": "Etc/GMT-4",
      "zone": "<+04>-4"
    },
    {
      "name": "Etc/GMT-5",
      "zone": "<+05>-5"
    },
    {
      "name": "Etc/GMT-6",
      "zone": "<+06>-6"
    },
    {
      "name": "Etc/GMT-7",
      "zone": "<+07>-7"
    },
    {
      "name": "Etc/GMT-8",
      "zone": "<+08>-8"
    },
    {
      "name": "Etc/GMT-9",
      "zone": "<+09>-9"
    },
    {
      "name": "Etc/GMT-10",
      "zone": "<+10>-10"
    },
    {
      "name": "Etc/GMT-11",
      "zone": "<+11>-11"
    },
    {
      "name": "Etc/GMT-12",
      "zone": "<+12>-12"
    },
    {
      "name": "Etc/GMT-13",
      "zone": "<+13>-13"
    },
    {
      "name": "Etc/GMT-14",
      "zone": "<+14>-14"
    },
    {
      "name": "Etc/GMT0",
      "zone": "GMT0"
    },
    {
      "name": "Etc/GMT+0",
      "zone": "GMT0"
    },
    {
      "name": "Etc/GMT+1",
      "zone": "<-01>1"
    },
    {
      "name": "Etc/GMT+2",
      "zone": "<-02>2"
    },
    {
      "name": "Etc/GMT+3",
      "zone": "<-03>3"
    },
    {
      "name": "Etc/GMT+4",
      "zone": "<-04>4"
    },
    {
      "name": "Etc/GMT+5",
      "zone": "<-05>5"
    },
    {
      "name": "Etc/GMT+6",
      "zone": "<-06>6"
    },
    {
      "name": "Etc/GMT+7",
      "zone": "<-07>7"
    },
    {
      "name": "Etc/GMT+8",
      "zone": "<-08>8"
    },
    {
      "name": "Etc/GMT+9",
      "zone": "<-09>9"
    },
    {
      "name": "Etc/GMT+10",
      "zone": "<-10>10"
    },
    {
      "name": "Etc/GMT+11",
      "zone": "<-11>11"
    },
    {
      "name": "Etc/GMT+12",
      "zone": "<-12>12"
    },
    {
      "name": "Etc/UCT",
      "zone": "UTC0"
    },
    {
      "name": "Etc/UTC",
      "zone": "UTC0"
    },
    {
      "name": "Etc/Greenwich",
      "zone": "GMT0"
    },
    {
      "name": "Etc/Universal",
      "zone": "UTC0"
    },
    {
      "name": "Etc/Zulu",
      "zone": "UTC0"
    }
  ];
