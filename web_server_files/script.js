

// select
function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
};

// add inputs to form of relay
function addInputsOptions(selecttId, inNum, adcNum) {
    //Create and append select list
    var selectList = document.getElementById(selecttId);//

    //Create and append the options in
    for (var i = 1; i <= inNum; i++) {
        var option = document.createElement("option");
        option.value = `in${i}`;
        option.text = `IN${i}`;
        selectList.appendChild(option);
    }

    //Create and append the options in
    for (var i = 1; i <= adcNum; i++) {
        var option = document.createElement("option");
        option.value = `adc${i}`;
        option.text = `ADC${i}`;
        selectList.appendChild(option);
    }
}


// ajax request with any chage in the "formName" form
function sendData(formName) {
    const XHR = new XMLHttpRequest();

    //console.log(formName.id);

    // Bind the FormData object and the form element
    const FD = new FormData( formName );
    const queryString = new URLSearchParams(FD).toString();
    

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
        //alert( event.target.responseText );
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    XHR.onreadystatechange = function()
    {
        // Everything is good, the response was received.
        if (this.status == 200) 
        {
            // add feedback
            // TODO
            //var frm = document.getElementById(formName.id);
            //frm.getElementsByName("div_fb")[0].innerHTML = this.responseText;
        }
        
    }

    // Set up our request
    XHR.open( "GET", "act?form=" + formName.id + "&" + queryString);

    // The data sent is what the user provided in the form
    XHR.send( FD );

}

// create relay options and settings
function createRelaySettings(num) {
    var formName = "r" + num + "_form";

    const contentText = `<fieldset>\
    <legend>Relay ${num}</legend>\
    <div>\
        <input type="checkbox" name="on_off">\
        <label for="on_off">Once a day On/Off</label>\
    </div>\
    <div name="div_fb"></div>
    <div>\
        <label>Time ON</label>\
        <input type="time" name="time_on" value="07:00"/>\
    </div>\
    <div>\
        <label>Time OFF</label>\
        <input type="time" name="time_off" value="21:00"/>\
    </div>\
    <div>\
        <input type="checkbox" name="period">\
        <label for="period">Periodical On/Off</label>\
    </div>\
    <div>\
        <label>Period ON</label>\
        <input type="time" name="period_on" value="00:10"/>\
    </div>\
    <div>\
        <label>Period OFF</label>\
        <input type="time" name="period_off" value="00:20"/>\
    </div>\
    <div>\
        <label>Input\'s priority</label>\
        <select name="in_pri">\
            <option value="">Select priority:</option>\
            <option value="2">HIEGHT</option>\
            <option value="1">MIDDLE</option>\
            <option value="0">LOW</option>\
        </select>\
    </div>\
    <div>\
        <label>Bound input/ADC</label>\
        <select name="bound_in" id="r${num}_in">\
            <option value="">Select an input:</option>\
        </select>\
    </div>\
    <div>\
        <label>ADC threshold level</label>\
        <input type="text" name="adc_thld" placeholder="500" />\
        <label>ADC hysteresis</label>\
        <input type="text" name="adc_hyst" placeholder="10" />\
    </div>\
    <div>\
        <input type="checkbox" name="inv">\
        <label for="inv">Inversion</label>\
    </div>\
    </fieldset>`;
    document.getElementById(formName).innerHTML = contentText;
}

// load settings from application
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
                var config = JSON.parse(this.responseText);

                console.log(config.device.relay);

                var plc = document.getElementById("plc");

                for (var i = 0; i < config.device.relay; i++) {
                    var relayForm = document.createElement("form");
                    relayForm.id = `r${i}_form`;
                    plc.appendChild(relayForm);
                    // add relay
                    createRelaySettings(`${i}`);
                    // add inputs to relay
                    addInputsOptions(`r${i}_in`,  config.device.in, config.device.adc);
                    //
                    if (config.relay[i].on_off===1) {
                        document.getElementsByName("on_off")[i].checked = true;
                    }
                    else {
                        document.getElementsByName("on_off")[i].checked = false;
                    }
                    //
                    document.getElementsByName("time_on")[i].value = config.relay[i].time_on;
                    document.getElementsByName("time_off")[i].value = config.relay[i].time_off;
                    //
                    if (config.relay[i].period===1) {
                        document.getElementsByName("period")[i].checked = true;
                    }
                    else {
                        document.getElementsByName("period")[i].checked = false;
                    }
                    //
                    document.getElementsByName("period_on")[i].value = config.relay[i].period_on;
                    document.getElementsByName("period_off")[i].value = config.relay[i].period_off;
                    //
                    //document.getElementsByName("in_pri")[i].selectElement(this,config.relay[i].in_pri);
                    //selectElement("in_pri", config.relay[i].in_pri);
                    //document.getElementsByName("in_pri")[i].value = config.relay[i].in_pri;

                    document.getElementsByName("adc_thld")[i].value = config.relay[i].adc_thld;
                    document.getElementsByName("adc_hyst")[i].value = config.relay[i].adc_hyst;
                    //
                    if (config.relay[i].inv===1) {
                        document.getElementsByName("inv")[i].checked = true;
                    }
                    else {
                        document.getElementsByName("inv")[i].checked = false;
                    }
                    
                    // add listener
                    relayForm.addEventListener("change", function () { sendData(this); });
                }

                var myParent = document.getElementById("rtc_tz_div");
            
                //Create and append select list
                var selectList = document.createElement("select");
                selectList.id = "time_zone";
                selectList.name = "rtc_tz";
                myParent.appendChild(selectList);
            
                //Create and append the options
                for (var i = 0; i < timeZones.length; i++) {
                    var option = document.createElement("option");
                    option.value = timeZones[i].index;
                    option.text = timeZones[i].name;
                    selectList.appendChild(option);
                }

                // var obj = JSON.parse(this.responseText);
                // document.getElementById("sn").innerHTML = obj.sn;
                // document.getElementById("ip").innerHTML = obj.ip;
                // document.getElementById("mac").innerHTML = obj.mac;
                // document.getElementById("mode").innerHTML = obj.mode;
                // document.getElementsByName("wifi_ssid")[0].placeholder=obj.wifi_ssid;
                // document.getElementById("current_time").innerHTML = obj.current_time;
                // document.getElementsByName("r1_time_on")[0].value="06:00";
                // selectElement("time_zone", obj.time_zone);

                document.getElementsByName("wifi_ssid")[0].placeholder=config.wifi.wifi_ssid;
                selectElement("wifi_mode", config.wifi.wifi_mode);

                selectElement("time_zone", config.rtc.rtc_tz);
                if (config.rtc.rtc_sntp===1) {
                    document.getElementsByName("rtc_sntp")[0].checked = true;
                }
                else {
                    document.getElementsByName("rtc_sntp")[0].checked = false;
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

    httpRequest.open('GET', 'act?settings=1', true);
    httpRequest.send();
};


// Data exchane between forms and aplication
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

        XHR.onreadystatechange = function()
        {
            // Everything is good, the response was received.
            if (this.status == 200) 
            {
                // add feedback
                document.getElementById("wifi_ssid_fb").innerHTML = this.responseText;
            }
            
        }
  
    // Set up our request
    XHR.open( "GET", "act?form=" + formName.id + "&" + queryString);
  
    // The data sent is what the user provided in the form
    XHR.send( FD );
    }
  
    // Access the form element...
    const wifiForm = document.getElementById( "wifi_ssid_form" );
    const wifiSbmt = document.getElementById( "wifi_submit" );
    const rtcForm = document.getElementById( "rtc_form" );

    // ...and take over its submit event.
    wifiSbmt.addEventListener( "click", function () { sendData(wifiForm); });
    rtcForm.addEventListener( "change", function () { sendData(rtcForm); });

} );

// change AP / Station Wi-Fi mode
function  wifiModeChange(req)
{
    var httpRequest;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function()
    {
        // Everything is good, the response was received.
        if (this.status == 200) 
        {
            // add feedback
            document.getElementById("wifi_mode_fb").innerHTML = "Successful set " + this.responseText;
            document.getElementById("mode").innerHTML = this.responseText;
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
      "index": 0,
      "name": "Africa/Abidjan"
    },
    {
      "index": 1,
      "name": "Africa/Accra"
    },
    {
      "index": 2,
      "name": "Africa/Addis_Ababa"
    },
    {
      "index": 3,
      "name": "Africa/Algiers"
    },
    {
      "index": 4,
      "name": "Africa/Asmara"
    },
    {
      "index": 5,
      "name": "Africa/Bamako"
    },
    {
      "index": 6,
      "name": "Africa/Bangui"
    },
    {
      "index": 7,
      "name": "Africa/Banjul"
    },
    {
      "index": 8,
      "name": "Africa/Bissau"
    },
    {
      "index": 9,
      "name": "Africa/Blantyre"
    },
    {
      "index": 10,
      "name": "Africa/Brazzaville"
    },
    {
      "index": 11,
      "name": "Africa/Bujumbura"
    },
    {
      "index": 12,
      "name": "Africa/Cairo"
    },
    {
      "index": 13,
      "name": "Africa/Casablanca"
    },
    {
      "index": 14,
      "name": "Africa/Ceuta"
    },
    {
      "index": 15,
      "name": "Africa/Conakry"
    },
    {
      "index": 16,
      "name": "Africa/Dakar"
    },
    {
      "index": 17,
      "name": "Africa/Dar_es_Salaam"
    },
    {
      "index": 18,
      "name": "Africa/Djibouti"
    },
    {
      "index": 19,
      "name": "Africa/Douala"
    },
    {
      "index": 20,
      "name": "Africa/El_Aaiun"
    },
    {
      "index": 21,
      "name": "Africa/Freetown"
    },
    {
      "index": 22,
      "name": "Africa/Gaborone"
    },
    {
      "index": 23,
      "name": "Africa/Harare"
    },
    {
      "index": 24,
      "name": "Africa/Johannesburg"
    },
    {
      "index": 25,
      "name": "Africa/Juba"
    },
    {
      "index": 26,
      "name": "Africa/Kampala"
    },
    {
      "index": 27,
      "name": "Africa/Khartoum"
    },
    {
      "index": 28,
      "name": "Africa/Kigali"
    },
    {
      "index": 29,
      "name": "Africa/Kinshasa"
    },
    {
      "index": 30,
      "name": "Africa/Lagos"
    },
    {
      "index": 31,
      "name": "Africa/Libreville"
    },
    {
      "index": 32,
      "name": "Africa/Lome"
    },
    {
      "index": 33,
      "name": "Africa/Luanda"
    },
    {
      "index": 34,
      "name": "Africa/Lubumbashi"
    },
    {
      "index": 35,
      "name": "Africa/Lusaka"
    },
    {
      "index": 36,
      "name": "Africa/Malabo"
    },
    {
      "index": 37,
      "name": "Africa/Maputo"
    },
    {
      "index": 38,
      "name": "Africa/Maseru"
    },
    {
      "index": 39,
      "name": "Africa/Mbabane"
    },
    {
      "index": 40,
      "name": "Africa/Mogadishu"
    },
    {
      "index": 41,
      "name": "Africa/Monrovia"
    },
    {
      "index": 42,
      "name": "Africa/Nairobi"
    },
    {
      "index": 43,
      "name": "Africa/Ndjamena"
    },
    {
      "index": 44,
      "name": "Africa/Niamey"
    },
    {
      "index": 45,
      "name": "Africa/Nouakchott"
    },
    {
      "index": 46,
      "name": "Africa/Ouagadougou"
    },
    {
      "index": 47,
      "name": "Africa/Porto-Novo"
    },
    {
      "index": 48,
      "name": "Africa/Sao_Tome"
    },
    {
      "index": 49,
      "name": "Africa/Tripoli"
    },
    {
      "index": 50,
      "name": "Africa/Tunis"
    },
    {
      "index": 51,
      "name": "Africa/Windhoek"
    },
    {
      "index": 52,
      "name": "America/Adak"
    },
    {
      "index": 53,
      "name": "America/Anchorage"
    },
    {
      "index": 54,
      "name": "America/Anguilla"
    },
    {
      "index": 55,
      "name": "America/Antigua"
    },
    {
      "index": 56,
      "name": "America/Araguaina"
    },
    {
      "index": 57,
      "name": "America/Argentina/Buenos_Aires"
    },
    {
      "index": 58,
      "name": "America/Argentina/Catamarca"
    },
    {
      "index": 59,
      "name": "America/Argentina/Cordoba"
    },
    {
      "index": 60,
      "name": "America/Argentina/Jujuy"
    },
    {
      "index": 61,
      "name": "America/Argentina/La_Rioja"
    },
    {
      "index": 62,
      "name": "America/Argentina/Mendoza"
    },
    {
      "index": 63,
      "name": "America/Argentina/Rio_Gallegos"
    },
    {
      "index": 64,
      "name": "America/Argentina/Salta"
    },
    {
      "index": 65,
      "name": "America/Argentina/San_Juan"
    },
    {
      "index": 66,
      "name": "America/Argentina/San_Luis"
    },
    {
      "index": 67,
      "name": "America/Argentina/Tucuman"
    },
    {
      "index": 68,
      "name": "America/Argentina/Ushuaia"
    },
    {
      "index": 69,
      "name": "America/Aruba"
    },
    {
      "index": 70,
      "name": "America/Asuncion"
    },
    {
      "index": 71,
      "name": "America/Atikokan"
    },
    {
      "index": 72,
      "name": "America/Bahia"
    },
    {
      "index": 73,
      "name": "America/Bahia_Banderas"
    },
    {
      "index": 74,
      "name": "America/Barbados"
    },
    {
      "index": 75,
      "name": "America/Belem"
    },
    {
      "index": 76,
      "name": "America/Belize"
    },
    {
      "index": 77,
      "name": "America/Blanc-Sablon"
    },
    {
      "index": 78,
      "name": "America/Boa_Vista"
    },
    {
      "index": 79,
      "name": "America/Bogota"
    },
    {
      "index": 80,
      "name": "America/Boise"
    },
    {
      "index": 81,
      "name": "America/Cambridge_Bay"
    },
    {
      "index": 82,
      "name": "America/Campo_Grande"
    },
    {
      "index": 83,
      "name": "America/Cancun"
    },
    {
      "index": 84,
      "name": "America/Caracas"
    },
    {
      "index": 85,
      "name": "America/Cayenne"
    },
    {
      "index": 86,
      "name": "America/Cayman"
    },
    {
      "index": 87,
      "name": "America/Chicago"
    },
    {
      "index": 88,
      "name": "America/Chihuahua"
    },
    {
      "index": 89,
      "name": "America/Costa_Rica"
    },
    {
      "index": 90,
      "name": "America/Creston"
    },
    {
      "index": 91,
      "name": "America/Cuiaba"
    },
    {
      "index": 92,
      "name": "America/Curacao"
    },
    {
      "index": 93,
      "name": "America/Danmarkshavn"
    },
    {
      "index": 94,
      "name": "America/Dawson"
    },
    {
      "index": 95,
      "name": "America/Dawson_Creek"
    },
    {
      "index": 96,
      "name": "America/Denver"
    },
    {
      "index": 97,
      "name": "America/Detroit"
    },
    {
      "index": 98,
      "name": "America/Dominica"
    },
    {
      "index": 99,
      "name": "America/Edmonton"
    },
    {
      "index": 100,
      "name": "America/Eirunepe"
    },
    {
      "index": 101,
      "name": "America/El_Salvador"
    },
    {
      "index": 102,
      "name": "America/Fortaleza"
    },
    {
      "index": 103,
      "name": "America/Fort_Nelson"
    },
    {
      "index": 104,
      "name": "America/Glace_Bay"
    },
    {
      "index": 105,
      "name": "America/Godthab"
    },
    {
      "index": 106,
      "name": "America/Goose_Bay"
    },
    {
      "index": 107,
      "name": "America/Grand_Turk"
    },
    {
      "index": 108,
      "name": "America/Grenada"
    },
    {
      "index": 109,
      "name": "America/Guadeloupe"
    },
    {
      "index": 110,
      "name": "America/Guatemala"
    },
    {
      "index": 111,
      "name": "America/Guayaquil"
    },
    {
      "index": 112,
      "name": "America/Guyana"
    },
    {
      "index": 113,
      "name": "America/Halifax"
    },
    {
      "index": 114,
      "name": "America/Havana"
    },
    {
      "index": 115,
      "name": "America/Hermosillo"
    },
    {
      "index": 116,
      "name": "America/Indiana/Indianapolis"
    },
    {
      "index": 117,
      "name": "America/Indiana/Knox"
    },
    {
      "index": 118,
      "name": "America/Indiana/Marengo"
    },
    {
      "index": 119,
      "name": "America/Indiana/Petersburg"
    },
    {
      "index": 120,
      "name": "America/Indiana/Tell_City"
    },
    {
      "index": 121,
      "name": "America/Indiana/Vevay"
    },
    {
      "index": 122,
      "name": "America/Indiana/Vincennes"
    },
    {
      "index": 123,
      "name": "America/Indiana/Winamac"
    },
    {
      "index": 124,
      "name": "America/Inuvik"
    },
    {
      "index": 125,
      "name": "America/Iqaluit"
    },
    {
      "index": 126,
      "name": "America/Jamaica"
    },
    {
      "index": 127,
      "name": "America/Juneau"
    },
    {
      "index": 128,
      "name": "America/Kentucky/Louisville"
    },
    {
      "index": 129,
      "name": "America/Kentucky/Monticello"
    },
    {
      "index": 130,
      "name": "America/Kralendijk"
    },
    {
      "index": 131,
      "name": "America/La_Paz"
    },
    {
      "index": 132,
      "name": "America/Lima"
    },
    {
      "index": 133,
      "name": "America/Los_Angeles"
    },
    {
      "index": 134,
      "name": "America/Lower_Princes"
    },
    {
      "index": 135,
      "name": "America/Maceio"
    },
    {
      "index": 136,
      "name": "America/Managua"
    },
    {
      "index": 137,
      "name": "America/Manaus"
    },
    {
      "index": 138,
      "name": "America/Marigot"
    },
    {
      "index": 139,
      "name": "America/Martinique"
    },
    {
      "index": 140,
      "name": "America/Matamoros"
    },
    {
      "index": 141,
      "name": "America/Mazatlan"
    },
    {
      "index": 142,
      "name": "America/Menominee"
    },
    {
      "index": 143,
      "name": "America/Merida"
    },
    {
      "index": 144,
      "name": "America/Metlakatla"
    },
    {
      "index": 145,
      "name": "America/Mexico_City"
    },
    {
      "index": 146,
      "name": "America/Miquelon"
    },
    {
      "index": 147,
      "name": "America/Moncton"
    },
    {
      "index": 148,
      "name": "America/Monterrey"
    },
    {
      "index": 149,
      "name": "America/Montevideo"
    },
    {
      "index": 150,
      "name": "America/Montreal"
    },
    {
      "index": 151,
      "name": "America/Montserrat"
    },
    {
      "index": 152,
      "name": "America/Nassau"
    },
    {
      "index": 153,
      "name": "America/New_York"
    },
    {
      "index": 154,
      "name": "America/Nipigon"
    },
    {
      "index": 155,
      "name": "America/Nome"
    },
    {
      "index": 156,
      "name": "America/Noronha"
    },
    {
      "index": 157,
      "name": "America/North_Dakota/Beulah"
    },
    {
      "index": 158,
      "name": "America/North_Dakota/Center"
    },
    {
      "index": 159,
      "name": "America/North_Dakota/New_Salem"
    },
    {
      "index": 160,
      "name": "America/Nuuk"
    },
    {
      "index": 161,
      "name": "America/Ojinaga"
    },
    {
      "index": 162,
      "name": "America/Panama"
    },
    {
      "index": 163,
      "name": "America/Pangnirtung"
    },
    {
      "index": 164,
      "name": "America/Paramaribo"
    },
    {
      "index": 165,
      "name": "America/Phoenix"
    },
    {
      "index": 166,
      "name": "America/Port-au-Prince"
    },
    {
      "index": 167,
      "name": "America/Port_of_Spain"
    },
    {
      "index": 168,
      "name": "America/Porto_Velho"
    },
    {
      "index": 169,
      "name": "America/Puerto_Rico"
    },
    {
      "index": 170,
      "name": "America/Punta_Arenas"
    },
    {
      "index": 171,
      "name": "America/Rainy_River"
    },
    {
      "index": 172,
      "name": "America/Rankin_Inlet"
    },
    {
      "index": 173,
      "name": "America/Recife"
    },
    {
      "index": 174,
      "name": "America/Regina"
    },
    {
      "index": 175,
      "name": "America/Resolute"
    },
    {
      "index": 176,
      "name": "America/Rio_Branco"
    },
    {
      "index": 177,
      "name": "America/Santarem"
    },
    {
      "index": 178,
      "name": "America/Santiago"
    },
    {
      "index": 179,
      "name": "America/Santo_Domingo"
    },
    {
      "index": 180,
      "name": "America/Sao_Paulo"
    },
    {
      "index": 181,
      "name": "America/Scoresbysund"
    },
    {
      "index": 182,
      "name": "America/Sitka"
    },
    {
      "index": 183,
      "name": "America/St_Barthelemy"
    },
    {
      "index": 184,
      "name": "America/St_Johns"
    },
    {
      "index": 185,
      "name": "America/St_Kitts"
    },
    {
      "index": 186,
      "name": "America/St_Lucia"
    },
    {
      "index": 187,
      "name": "America/St_Thomas"
    },
    {
      "index": 188,
      "name": "America/St_Vincent"
    },
    {
      "index": 189,
      "name": "America/Swift_Current"
    },
    {
      "index": 190,
      "name": "America/Tegucigalpa"
    },
    {
      "index": 191,
      "name": "America/Thule"
    },
    {
      "index": 192,
      "name": "America/Thunder_Bay"
    },
    {
      "index": 193,
      "name": "America/Tijuana"
    },
    {
      "index": 194,
      "name": "America/Toronto"
    },
    {
      "index": 195,
      "name": "America/Tortola"
    },
    {
      "index": 196,
      "name": "America/Vancouver"
    },
    {
      "index": 197,
      "name": "America/Whitehorse"
    },
    {
      "index": 198,
      "name": "America/Winnipeg"
    },
    {
      "index": 199,
      "name": "America/Yakutat"
    },
    {
      "index": 200,
      "name": "America/Yellowknife"
    },
    {
      "index": 201,
      "name": "Antarctica/Casey"
    },
    {
      "index": 202,
      "name": "Antarctica/Davis"
    },
    {
      "index": 203,
      "name": "Antarctica/DumontDUrville"
    },
    {
      "index": 204,
      "name": "Antarctica/Macquarie"
    },
    {
      "index": 205,
      "name": "Antarctica/Mawson"
    },
    {
      "index": 206,
      "name": "Antarctica/McMurdo"
    },
    {
      "index": 207,
      "name": "Antarctica/Palmer"
    },
    {
      "index": 208,
      "name": "Antarctica/Rothera"
    },
    {
      "index": 209,
      "name": "Antarctica/Syowa"
    },
    {
      "index": 210,
      "name": "Antarctica/Troll"
    },
    {
      "index": 211,
      "name": "Antarctica/Vostok"
    },
    {
      "index": 212,
      "name": "Arctic/Longyearbyen"
    },
    {
      "index": 213,
      "name": "Asia/Aden"
    },
    {
      "index": 214,
      "name": "Asia/Almaty"
    },
    {
      "index": 215,
      "name": "Asia/Amman"
    },
    {
      "index": 216,
      "name": "Asia/Anadyr"
    },
    {
      "index": 217,
      "name": "Asia/Aqtau"
    },
    {
      "index": 218,
      "name": "Asia/Aqtobe"
    },
    {
      "index": 219,
      "name": "Asia/Ashgabat"
    },
    {
      "index": 220,
      "name": "Asia/Atyrau"
    },
    {
      "index": 221,
      "name": "Asia/Baghdad"
    },
    {
      "index": 222,
      "name": "Asia/Bahrain"
    },
    {
      "index": 223,
      "name": "Asia/Baku"
    },
    {
      "index": 224,
      "name": "Asia/Bangkok"
    },
    {
      "index": 225,
      "name": "Asia/Barnaul"
    },
    {
      "index": 226,
      "name": "Asia/Beirut"
    },
    {
      "index": 227,
      "name": "Asia/Bishkek"
    },
    {
      "index": 228,
      "name": "Asia/Brunei"
    },
    {
      "index": 229,
      "name": "Asia/Chita"
    },
    {
      "index": 230,
      "name": "Asia/Choibalsan"
    },
    {
      "index": 231,
      "name": "Asia/Colombo"
    },
    {
      "index": 232,
      "name": "Asia/Damascus"
    },
    {
      "index": 233,
      "name": "Asia/Dhaka"
    },
    {
      "index": 234,
      "name": "Asia/Dili"
    },
    {
      "index": 235,
      "name": "Asia/Dubai"
    },
    {
      "index": 236,
      "name": "Asia/Dushanbe"
    },
    {
      "index": 237,
      "name": "Asia/Famagusta"
    },
    {
      "index": 238,
      "name": "Asia/Gaza"
    },
    {
      "index": 239,
      "name": "Asia/Hebron"
    },
    {
      "index": 240,
      "name": "Asia/Ho_Chi_Minh"
    },
    {
      "index": 241,
      "name": "Asia/Hong_Kong"
    },
    {
      "index": 242,
      "name": "Asia/Hovd"
    },
    {
      "index": 243,
      "name": "Asia/Irkutsk"
    },
    {
      "index": 244,
      "name": "Asia/Jakarta"
    },
    {
      "index": 245,
      "name": "Asia/Jayapura"
    },
    {
      "index": 246,
      "name": "Asia/Jerusalem"
    },
    {
      "index": 247,
      "name": "Asia/Kabul"
    },
    {
      "index": 248,
      "name": "Asia/Kamchatka"
    },
    {
      "index": 249,
      "name": "Asia/Karachi"
    },
    {
      "index": 250,
      "name": "Asia/Kathmandu"
    },
    {
      "index": 251,
      "name": "Asia/Khandyga"
    },
    {
      "index": 252,
      "name": "Asia/Kolkata"
    },
    {
      "index": 253,
      "name": "Asia/Krasnoyarsk"
    },
    {
      "index": 254,
      "name": "Asia/Kuala_Lumpur"
    },
    {
      "index": 255,
      "name": "Asia/Kuching"
    },
    {
      "index": 256,
      "name": "Asia/Kuwait"
    },
    {
      "index": 257,
      "name": "Asia/Macau"
    },
    {
      "index": 258,
      "name": "Asia/Magadan"
    },
    {
      "index": 259,
      "name": "Asia/Makassar"
    },
    {
      "index": 260,
      "name": "Asia/Manila"
    },
    {
      "index": 261,
      "name": "Asia/Muscat"
    },
    {
      "index": 262,
      "name": "Asia/Nicosia"
    },
    {
      "index": 263,
      "name": "Asia/Novokuznetsk"
    },
    {
      "index": 264,
      "name": "Asia/Novosibirsk"
    },
    {
      "index": 265,
      "name": "Asia/Omsk"
    },
    {
      "index": 266,
      "name": "Asia/Oral"
    },
    {
      "index": 267,
      "name": "Asia/Phnom_Penh"
    },
    {
      "index": 268,
      "name": "Asia/Pontianak"
    },
    {
      "index": 269,
      "name": "Asia/Pyongyang"
    },
    {
      "index": 270,
      "name": "Asia/Qatar"
    },
    {
      "index": 271,
      "name": "Asia/Qyzylorda"
    },
    {
      "index": 272,
      "name": "Asia/Riyadh"
    },
    {
      "index": 273,
      "name": "Asia/Sakhalin"
    },
    {
      "index": 274,
      "name": "Asia/Samarkand"
    },
    {
      "index": 275,
      "name": "Asia/Seoul"
    },
    {
      "index": 276,
      "name": "Asia/Shanghai"
    },
    {
      "index": 277,
      "name": "Asia/Singapore"
    },
    {
      "index": 278,
      "name": "Asia/Srednekolymsk"
    },
    {
      "index": 279,
      "name": "Asia/Taipei"
    },
    {
      "index": 280,
      "name": "Asia/Tashkent"
    },
    {
      "index": 281,
      "name": "Asia/Tbilisi"
    },
    {
      "index": 282,
      "name": "Asia/Tehran"
    },
    {
      "index": 283,
      "name": "Asia/Thimphu"
    },
    {
      "index": 284,
      "name": "Asia/Tokyo"
    },
    {
      "index": 285,
      "name": "Asia/Tomsk"
    },
    {
      "index": 286,
      "name": "Asia/Ulaanbaatar"
    },
    {
      "index": 287,
      "name": "Asia/Urumqi"
    },
    {
      "index": 288,
      "name": "Asia/Ust-Nera"
    },
    {
      "index": 289,
      "name": "Asia/Vientiane"
    },
    {
      "index": 290,
      "name": "Asia/Vladivostok"
    },
    {
      "index": 291,
      "name": "Asia/Yakutsk"
    },
    {
      "index": 292,
      "name": "Asia/Yangon"
    },
    {
      "index": 293,
      "name": "Asia/Yekaterinburg"
    },
    {
      "index": 294,
      "name": "Asia/Yerevan"
    },
    {
      "index": 295,
      "name": "Atlantic/Azores"
    },
    {
      "index": 296,
      "name": "Atlantic/Bermuda"
    },
    {
      "index": 297,
      "name": "Atlantic/Canary"
    },
    {
      "index": 298,
      "name": "Atlantic/Cape_Verde"
    },
    {
      "index": 299,
      "name": "Atlantic/Faroe"
    },
    {
      "index": 300,
      "name": "Atlantic/Madeira"
    },
    {
      "index": 301,
      "name": "Atlantic/Reykjavik"
    },
    {
      "index": 302,
      "name": "Atlantic/South_Georgia"
    },
    {
      "index": 303,
      "name": "Atlantic/Stanley"
    },
    {
      "index": 304,
      "name": "Atlantic/St_Helena"
    },
    {
      "index": 305,
      "name": "Australia/Adelaide"
    },
    {
      "index": 306,
      "name": "Australia/Brisbane"
    },
    {
      "index": 307,
      "name": "Australia/Broken_Hill"
    },
    {
      "index": 308,
      "name": "Australia/Currie"
    },
    {
      "index": 309,
      "name": "Australia/Darwin"
    },
    {
      "index": 310,
      "name": "Australia/Eucla"
    },
    {
      "index": 311,
      "name": "Australia/Hobart"
    },
    {
      "index": 312,
      "name": "Australia/Lindeman"
    },
    {
      "index": 313,
      "name": "Australia/Lord_Howe"
    },
    {
      "index": 314,
      "name": "Australia/Melbourne"
    },
    {
      "index": 315,
      "name": "Australia/Perth"
    },
    {
      "index": 316,
      "name": "Australia/Sydney"
    },
    {
      "index": 317,
      "name": "Europe/Amsterdam"
    },
    {
      "index": 318,
      "name": "Europe/Andorra"
    },
    {
      "index": 319,
      "name": "Europe/Astrakhan"
    },
    {
      "index": 320,
      "name": "Europe/Athens"
    },
    {
      "index": 321,
      "name": "Europe/Belgrade"
    },
    {
      "index": 322,
      "name": "Europe/Berlin"
    },
    {
      "index": 323,
      "name": "Europe/Bratislava"
    },
    {
      "index": 324,
      "name": "Europe/Brussels"
    },
    {
      "index": 325,
      "name": "Europe/Bucharest"
    },
    {
      "index": 326,
      "name": "Europe/Budapest"
    },
    {
      "index": 327,
      "name": "Europe/Busingen"
    },
    {
      "index": 328,
      "name": "Europe/Chisinau"
    },
    {
      "index": 329,
      "name": "Europe/Copenhagen"
    },
    {
      "index": 330,
      "name": "Europe/Dublin"
    },
    {
      "index": 331,
      "name": "Europe/Gibraltar"
    },
    {
      "index": 332,
      "name": "Europe/Guernsey"
    },
    {
      "index": 333,
      "name": "Europe/Helsinki"
    },
    {
      "index": 334,
      "name": "Europe/Isle_of_Man"
    },
    {
      "index": 335,
      "name": "Europe/Istanbul"
    },
    {
      "index": 336,
      "name": "Europe/Jersey"
    },
    {
      "index": 337,
      "name": "Europe/Kaliningrad"
    },
    {
      "index": 338,
      "name": "Europe/Kiev"
    },
    {
      "index": 339,
      "name": "Europe/Kirov"
    },
    {
      "index": 340,
      "name": "Europe/Lisbon"
    },
    {
      "index": 341,
      "name": "Europe/Ljubljana"
    },
    {
      "index": 342,
      "name": "Europe/London"
    },
    {
      "index": 343,
      "name": "Europe/Luxembourg"
    },
    {
      "index": 344,
      "name": "Europe/Madrid"
    },
    {
      "index": 345,
      "name": "Europe/Malta"
    },
    {
      "index": 346,
      "name": "Europe/Mariehamn"
    },
    {
      "index": 347,
      "name": "Europe/Minsk"
    },
    {
      "index": 348,
      "name": "Europe/Monaco"
    },
    {
      "index": 349,
      "name": "Europe/Moscow"
    },
    {
      "index": 350,
      "name": "Europe/Oslo"
    },
    {
      "index": 351,
      "name": "Europe/Paris"
    },
    {
      "index": 352,
      "name": "Europe/Podgorica"
    },
    {
      "index": 353,
      "name": "Europe/Prague"
    },
    {
      "index": 354,
      "name": "Europe/Riga"
    },
    {
      "index": 355,
      "name": "Europe/Rome"
    },
    {
      "index": 356,
      "name": "Europe/Samara"
    },
    {
      "index": 357,
      "name": "Europe/San_Marino"
    },
    {
      "index": 358,
      "name": "Europe/Sarajevo"
    },
    {
      "index": 359,
      "name": "Europe/Saratov"
    },
    {
      "index": 360,
      "name": "Europe/Simferopol"
    },
    {
      "index": 361,
      "name": "Europe/Skopje"
    },
    {
      "index": 362,
      "name": "Europe/Sofia"
    },
    {
      "index": 363,
      "name": "Europe/Stockholm"
    },
    {
      "index": 364,
      "name": "Europe/Tallinn"
    },
    {
      "index": 365,
      "name": "Europe/Tirane"
    },
    {
      "index": 366,
      "name": "Europe/Ulyanovsk"
    },
    {
      "index": 367,
      "name": "Europe/Uzhgorod"
    },
    {
      "index": 368,
      "name": "Europe/Vaduz"
    },
    {
      "index": 369,
      "name": "Europe/Vatican"
    },
    {
      "index": 370,
      "name": "Europe/Vienna"
    },
    {
      "index": 371,
      "name": "Europe/Vilnius"
    },
    {
      "index": 372,
      "name": "Europe/Volgograd"
    },
    {
      "index": 373,
      "name": "Europe/Warsaw"
    },
    {
      "index": 374,
      "name": "Europe/Zagreb"
    },
    {
      "index": 375,
      "name": "Europe/Zaporozhye"
    },
    {
      "index": 376,
      "name": "Europe/Zurich"
    },
    {
      "index": 377,
      "name": "Indian/Antananarivo"
    },
    {
      "index": 378,
      "name": "Indian/Chagos"
    },
    {
      "index": 379,
      "name": "Indian/Christmas"
    },
    {
      "index": 380,
      "name": "Indian/Cocos"
    },
    {
      "index": 381,
      "name": "Indian/Comoro"
    },
    {
      "index": 382,
      "name": "Indian/Kerguelen"
    },
    {
      "index": 383,
      "name": "Indian/Mahe"
    },
    {
      "index": 384,
      "name": "Indian/Maldives"
    },
    {
      "index": 385,
      "name": "Indian/Mauritius"
    },
    {
      "index": 386,
      "name": "Indian/Mayotte"
    },
    {
      "index": 387,
      "name": "Indian/Reunion"
    },
    {
      "index": 388,
      "name": "Pacific/Apia"
    },
    {
      "index": 389,
      "name": "Pacific/Auckland"
    },
    {
      "index": 390,
      "name": "Pacific/Bougainville"
    },
    {
      "index": 391,
      "name": "Pacific/Chatham"
    },
    {
      "index": 392,
      "name": "Pacific/Chuuk"
    },
    {
      "index": 393,
      "name": "Pacific/Easter"
    },
    {
      "index": 394,
      "name": "Pacific/Efate"
    },
    {
      "index": 395,
      "name": "Pacific/Enderbury"
    },
    {
      "index": 396,
      "name": "Pacific/Fakaofo"
    },
    {
      "index": 397,
      "name": "Pacific/Fiji"
    },
    {
      "index": 398,
      "name": "Pacific/Funafuti"
    },
    {
      "index": 399,
      "name": "Pacific/Galapagos"
    },
    {
      "index": 400,
      "name": "Pacific/Gambier"
    },
    {
      "index": 401,
      "name": "Pacific/Guadalcanal"
    },
    {
      "index": 402,
      "name": "Pacific/Guam"
    },
    {
      "index": 403,
      "name": "Pacific/Honolulu"
    },
    {
      "index": 404,
      "name": "Pacific/Kiritimati"
    },
    {
      "index": 405,
      "name": "Pacific/Kosrae"
    },
    {
      "index": 406,
      "name": "Pacific/Kwajalein"
    },
    {
      "index": 407,
      "name": "Pacific/Majuro"
    },
    {
      "index": 408,
      "name": "Pacific/Marquesas"
    },
    {
      "index": 409,
      "name": "Pacific/Midway"
    },
    {
      "index": 410,
      "name": "Pacific/Nauru"
    },
    {
      "index": 411,
      "name": "Pacific/Niue"
    },
    {
      "index": 412,
      "name": "Pacific/Norfolk"
    },
    {
      "index": 413,
      "name": "Pacific/Noumea"
    },
    {
      "index": 414,
      "name": "Pacific/Pago_Pago"
    },
    {
      "index": 415,
      "name": "Pacific/Palau"
    },
    {
      "index": 416,
      "name": "Pacific/Pitcairn"
    },
    {
      "index": 417,
      "name": "Pacific/Pohnpei"
    },
    {
      "index": 418,
      "name": "Pacific/Port_Moresby"
    },
    {
      "index": 419,
      "name": "Pacific/Rarotonga"
    },
    {
      "index": 420,
      "name": "Pacific/Saipan"
    },
    {
      "index": 421,
      "name": "Pacific/Tahiti"
    },
    {
      "index": 422,
      "name": "Pacific/Tarawa"
    },
    {
      "index": 423,
      "name": "Pacific/Tongatapu"
    },
    {
      "index": 424,
      "name": "Pacific/Wake"
    },
    {
      "index": 425,
      "name": "Pacific/Wallis"
    },
    {
      "index": 426,
      "name": "Etc/GMT"
    },
    {
      "index": 427,
      "name": "Etc/GMT-0"
    },
    {
      "index": 428,
      "name": "Etc/GMT-1"
    },
    {
      "index": 429,
      "name": "Etc/GMT-2"
    },
    {
      "index": 430,
      "name": "Etc/GMT-3"
    },
    {
      "index": 431,
      "name": "Etc/GMT-4"
    },
    {
      "index": 432,
      "name": "Etc/GMT-5"
    },
    {
      "index": 433,
      "name": "Etc/GMT-6"
    },
    {
      "index": 434,
      "name": "Etc/GMT-7"
    },
    {
      "index": 435,
      "name": "Etc/GMT-8"
    },
    {
      "index": 436,
      "name": "Etc/GMT-9"
    },
    {
      "index": 437,
      "name": "Etc/GMT-10"
    },
    {
      "index": 438,
      "name": "Etc/GMT-11"
    },
    {
      "index": 439,
      "name": "Etc/GMT-12"
    },
    {
      "index": 440,
      "name": "Etc/GMT-13"
    },
    {
      "index": 441,
      "name": "Etc/GMT-14"
    },
    {
      "index": 442,
      "name": "Etc/GMT0"
    },
    {
      "index": 443,
      "name": "Etc/GMT+0"
    },
    {
      "index": 444,
      "name": "Etc/GMT+1"
    },
    {
      "index": 445,
      "name": "Etc/GMT+2"
    },
    {
      "index": 446,
      "name": "Etc/GMT+3"
    },
    {
      "index": 447,
      "name": "Etc/GMT+4"
    },
    {
      "index": 448,
      "name": "Etc/GMT+5"
    },
    {
      "index": 449,
      "name": "Etc/GMT+6"
    },
    {
      "index": 450,
      "name": "Etc/GMT+7"
    },
    {
      "index": 451,
      "name": "Etc/GMT+8"
    },
    {
      "index": 452,
      "name": "Etc/GMT+9"
    },
    {
      "index": 453,
      "name": "Etc/GMT+10"
    },
    {
      "index": 454,
      "name": "Etc/GMT+11"
    },
    {
      "index": 455,
      "name": "Etc/GMT+12"
    },
    {
      "index": 456,
      "name": "Etc/UCT"
    },
    {
      "index": 457,
      "name": "Etc/UTC"
    },
    {
      "index": 458,
      "name": "Etc/Greenwich"
    },
    {
      "index": 459,
      "name": "Etc/Universal"
    },
    {
      "index": 460,
      "name": "Etc/Zulu"
    }
  ];
