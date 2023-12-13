var speedCurrent = 0;
var speedTop = 0;

var egt_temp_lowest = 5;
var egt_temp_normal_start = 50;
var egt_temp_normal_end = 150;  // default = 58  *** , high-sense = 56, dangerous-zone = 65
var egt_temp_lvl1 = 230;  // default = 65 , high-sense = 60, dangerous-zone = 70
var egt_temp_lvl2 = 230;  // default = 75 , high-sense = 65, dangerous-zone = 75

var engineTempC = 0;
var engineTempGauge = 0;
var IntakeAirTempC = 0;

var showSpeed = true;


var proc_1_check = false;
var proc_2_check = false;
var proc_3_check = false;

var wsockTimeout = 10000;
var ConnwsockTimeout = 20000;

var chart;
var w;
var h;
var ch;
var cw;
var ch2;
var egt_args = {
	"payload" : {
		"pressType" : "Long",     // "Short", "Long"
		"eventCause" : "Hardkey"    // "Touch", "Multicontroller", "Hardkey"
	}
};

var mytimer1;
var mytimer2;
var mytimer1B;
var mytimer2B;
var speedometerWsVih;
var speedometerWsValue;
var tpmsWebsocketOBD;

$(document).ready(function(){

	// websocket : always on
    // --------------------------------------------------------------------------

	function retrieveValueAll(action){

		clearTimeout(mytimer2B);
		mytimer2B = setTimeout(function(){ 

				$('.Deb2').text("CT");
				speedometerWsValue.close();
				proc_2_check = false;

		},ConnwsockTimeout);	

		speedometerWsValue = new WebSocket("ws://192.168.0.10/ws");
		
	
			
		
        speedometerWsValue.onmessage = function(event){
			
			clearTimeout(mytimer2B);
			
			if(!proc_2_check) proc_2_check = true;
            var res = event.data.split("#");

			updateIntakeAirTemp(res[1]);
			updateEngineTemp(res[0]);
			updateCMVoltage(res[4]);
			
			$('.Deb2').text("V"+res[16]);
			$('.Deb5').text("M");
			$('.CAtValue').text(res[5]+" C");

			chart.canvas.width = "250";
			chart.canvas.height = "90";

			chart.beginPath();
      
			//actual graph      
			for(var i=0;i<w.length;i++){

			chart.moveTo(0, ch2);
			chart.strokeStyle = '#1dd2af';
			chart.lineWidth = 3;
			chart.lineTo(w[i], h[Math.floor(res[6+i]/5)]);
			chart.stroke();
		
			}


			clearTimeout(mytimer2);
			mytimer2 = setTimeout(function(){ 

				$('.Deb5').text("T");
				speedometerWsValue.close();
//				console.log("WS2 Closing Connection after timeout");
				//proc_2_check = false;

				},wsockTimeout);

			
        }
		
        speedometerWsValue.onopen = function(){
			speedometerWsValue.send(action);

		$('.Deb5').text("O");
		
		chart = document.getElementById("chart").getContext("2d");

		chart.canvas.width = "250";
		chart.canvas.height = "90";
		cw = chart.canvas.width;
		ch = chart.canvas.height;
			
		w = [0,cw/10,2*(cw/10),3*(cw/10),4*(cw/10),5*(cw/10),6*(cw/10),7*(cw/10),8*(cw/10),9*(cw/10)];
		h = [ch,ch-ch/10,ch-2*(ch/10),ch-3*(ch/10),ch-4*(ch/10),ch-5*(ch/10),ch-6*(ch/10),ch-7*(ch/10),ch-8*(ch/10),ch-9*(ch/10),ch-10*(ch/10)];
		// vertical lines
		
		ch2 = document.getElementById("chart");
		chart = document.getElementById("chart").getContext("2d");
		
//		console.log("WS2 Opened");

        }
		
		speedometerWsValue.onclose = function() {
			$('.Deb5').text("C");
			proc_2_check = false;
//			console.log("WS2 Closed");
		}
		speedometerWsValue.onerror = function() {
			$('.Deb5').text("E");
			speedometerWsValue.close();
			proc_2_check = false;
//			console.log("WS2 Error");
		}
    }


	function retrievedataVihicleSpeedAndRPM(action){
		

		clearTimeout(mytimer1B);
		mytimer1B = setTimeout(function(){ 

				$('.Deb1').text("CT");
				speedometerWsVih.close();
				proc_1_check = false;

		},ConnwsockTimeout);			
		
		speedometerWsVih = new WebSocket("ws://192.168.0.10/ws");


        speedometerWsVih.onmessage = function(event){

			clearTimeout(mytimer1B);

			if(!proc_1_check) proc_1_check = true;
            var res = event.data.split("#");

			var speed = res[0];
			var RPM =  res[1];
			var Throt = res[2];
	
			$('.Deb1').text("V"+res[3]);
			$('.Deb4').text("M");
	
			updateEngineRPM(RPM);
			updateVehicleSpeed(speed);
			updateThrottlePos(Throt);

			clearTimeout(mytimer1);
			mytimer1 = setTimeout(function(){ 


				$('.Deb4').text("T");
				speedometerWsVih.close();
			//	proc_1_check = false;

				},wsockTimeout);
			
        }
        speedometerWsVih.onopen = function(){
			$('.Deb4').text("O");
            speedometerWsVih.send(action);
//			console.log("WS1 Opened");
        }
		speedometerWsVih.onclose = function() {
			$('.Deb4').text("C");
			proc_1_check = false;
//			console.log("WS1 Closed");
		}
		speedometerWsVih.onerror = function() {
			$('.Deb4').text("E");
			speedometerWsVih.close();
			proc_1_check = false;
//			console.log("WS1 Error");
		}
    }

    function retrieveTPMS(action) {
        tpmsWebsocketOBD = new WebSocket("ws://192.168.0.10/ws");
		
        tpmsWebsocketOBD.onmessage = function(event) {
			if(!proc_3_check) proc_3_check = true;
            var res = event.data.split("#");
			
			$('.Deb6').text("M");
			
				
			updateTirePressOBD("FL",res[0]);
			updateTirePressOBD("FR",res[2]);
			updateTirePressOBD("RL",res[4]);
			updateTirePressOBD("RR",res[6]);
			updateTirePressOBD("SP",res[8]);
	
					

        };
        tpmsWebsocketOBD.onopen = function() {
			$('.Deb6').text("O");
            tpmsWebsocketOBD.send(action);
        };
        tpmsWebsocketOBD.onclose = function() {
			$('.Deb6').text("C");
			proc_3_check = false;
        };
        tpmsWebsocketOBD.onerror = function() {
			$('.Deb6').text("E");
            tpmsWebsocketOBD.close();
			proc_3_check = false;
        };
    }

	function updateIntakeAirTemp(IntakeAirTempIn) {
		var needPos = 0;
		var IntakeAirTemp = $.trim(IntakeAirTempIn);
		IntakeAirTemp = parseInt(IntakeAirTemp);

			IntakeAirTempC = Math.round(IntakeAirTemp);

			if(IntakeAirTempC < 5) {
				IntakeAirTempC = 5;
			}
			if(IntakeAirTempC > 60) {
				IntakeAirTempC = 60;
			}
			
			$('.IATDialValue').text(IntakeAirTempC.toString()+" C");

			if (IntakeAirTempC < 35) {
				needPos = Math.round((IntakeAirTempC - 35) * 1.5).toFixed(0);
			} else if (IntakeAirTempC > 45) {
				needPos = Math.round((IntakeAirTempC - 45) * 3).toFixed(0);
			}
			$('.IATNeedle').css("transform","rotate("+needPos+"deg)");

	}

	function updateThrottlePos(ThrottlePosIn) {
		var needPos = 0;
		var ThrottlePos = $.trim(ThrottlePosIn);
		ThrottlePos = parseInt(ThrottlePos);

		ThrottlePosC = Math.round(ThrottlePos);

		$('.IAT2DialValue').text(ThrottlePosC.toString());

		if (ThrottlePosC < 35) {
				needPos = Math.round((ThrottlePosC - 35) * 1.1).toFixed(0);
			} else if (ThrottlePosC > 50) {
				needPos = Math.round((ThrottlePosC - 50) * 1.1).toFixed(0);
			}
		$('.IAT2Needle').css("transform","rotate("+needPos+"deg)");

	}
	
	function updateCMVoltage(CMVoltageIn) {
		var needPos = 0;
		var CMVoltage = $.trim(CMVoltageIn);
		CMVoltage = parseInt(CMVoltage);

		CMVoltageC = Math.round(CMVoltage);

		$('.EGT2DialValue').text(CMVoltageIn+"V");

		if (CMVoltageC < 10) {
				needPos = Math.round((CMVoltageC - 10) * 5.6).toFixed(0);
			} else if (CMVoltageC > 12) {
				needPos = Math.round((CMVoltageC - 12) * 5.6).toFixed(0);
			}
		$('.EGT2Needle').css("transform","rotate("+needPos+"deg)");

	}

	function updateEngineTemp(engineTempIn) {
		var needPos = 0;
		var engineTemp = $.trim(engineTempIn);
		engineTempC = parseInt(engineTemp);
		//engineTempC = Math.round((engineTemp - 32) * 0.556).toFixed(0); // c0nvert to degree C
		engineTempGauge = engineTempC;



		if(engineTempC < egt_temp_lowest) {
			engineTempC = egt_temp_lowest;
		}
		if(engineTempC > egt_temp_lvl2) {
			engineTempC = egt_temp_lvl2;
		}

		$('.EGTDialValue').text(engineTempC.toString()+" C");


        if (engineTempC < egt_temp_normal_start) {
			needPos = Math.round((engineTempC - egt_temp_normal_start)*1.44).toFixed(0);
        } else if (engineTempC > egt_temp_normal_end) {
            //needPos = Math.round((engineTempC - egt_temp_normal_end)*2.647).toFixed(0);  //this is suit for the normal=58, lvl2=75 (17 step)
			needPos = Math.round((engineTempC - egt_temp_normal_end) * (45/(egt_temp_lvl2 - egt_temp_normal_end))).toFixed(0);
		}
        $('.EGTNeedle').css("transform","rotate("+needPos+"deg)");


		if (engineTempC <= egt_temp_normal_end) {
			$('.EGTAlarm').css('opacity','0');

		} else if (engineTempC >= egt_temp_lvl2) {
			$('.EGTAlarm').css('opacity','1');

		} else if (engineTempC > egt_temp_lvl1) {
			$('.EGTAlarm').css('opacity','0.8');

		} else if (engineTempC > egt_temp_normal_end) {
			$('.EGTAlarm').css('opacity','0.4');

		}

		
	}


	function updateTirePressOBD(pos, value) {
		value =  parseFloat(value).toFixed(2); 
		$('.Tr'+pos).text(value.toString()); // value is float	
			
	}

    // --------------------------------------------------------------------------

    // update vehicle speed
    // --------------------------------------------------------------------------
	function updateVehicleSpeed(currentSpeed){
		var currentSpeedUse = $.trim(currentSpeed);
		speedCurrent = Math.ceil(parseInt(currentSpeedUse) * 1.0 );

		if(speedCurrent > 120) {
			speedCurrent = speedCurrent + 3;
		} else if (speedCurrent > 90) {
			speedCurrent = speedCurrent + 2;
		} else if (speedCurrent > 30) {
			speedCurrent = speedCurrent + 1;
		}


        // update vehicle top speed
        if(speedCurrent > speedTop){
			if(speedCurrent > 180) {
				overscale = (speedCurrent-180)/2;
				$('.topSpeedNeedle').css("transform","rotate("+(-120+180+overscale)+"deg)");
			} else {
				$('.topSpeedNeedle').css("transform","rotate("+(-120+speedCurrent)+"deg)");
			}
			speedTop = speedCurrent;
        }
		$('.speedTopValue').text(speedTop.toString());

		// update vehicle speed
		if(speedCurrent > 180) {
			overscale = (speedCurrent-180)/2;
			$('.speedNeedle').css("transform","rotate("+(-120+180+overscale)+"deg)");
		} else {
			$('.speedNeedle').css("transform","rotate("+(-120+speedCurrent)+"deg)");
		}

		if(showSpeed) {
            $('.txtSpeed').text(speedCurrent.toString());
		}
    }
    // --------------------------------------------------------------------------


	function updateEngineRPM(currentRPM){
		var currentRPMShow = -120 + parseInt((currentRPM * 0.03).toFixed(0));
		$('.rpmNeedle').css("transform","rotate("+currentRPMShow+"deg)");

		//$('.txtSpeedUnit').text("rpm = " + currentRPM);

	}

	setTimeout(function(){
		if(!proc_1_check)
			retrievedataVihicleSpeedAndRPM('speed_rpm200');

		if(!proc_2_check)
			retrieveValueAll('all_value3000');
		
		if(!proc_3_check)
			retrieveTPMS('tpms_2000');
		
    }, 3000);


	setTimeout(function(){ // auto create connection again in case connection has closed (or connection has failed)
		setInterval(function () {
			speedTop = 0;
			if(!proc_1_check) {
				$('.Deb1').text("F"+speedometerWsVih.readyState);
				
				/*
				if (speedometerWsVih)
				{
						//speedometerWsVih.close();
						//speedometerWsVih = null;
				}
				retrievedataVihicleSpeedAndRPM('speed_rpm200');
				*/
			}
			else
				$('.Deb1').text("T"+speedometerWsVih.readyState);

			if(!proc_2_check) {
				$('.Deb2').text("F"+speedometerWsValue.readyState);
				
				/*
				if (speedometerWsValue)
				{
					//speedometerWsValue.close();
					//speedometerWsValue = null;
				}
				retrieveValueAll('all_value3000');
				*/
				
			}
			else
				$('.Deb2').text("T"+speedometerWsValue.readyState);
				
			if(!proc_3_check) {
				$('.Deb3').text("F"+tpmsWebsocketOBD.readyState);
				
				/*
				if (tpmsWebsocketOBD)
				{
					//tpmsWebsocketOBD.close();
					//tpmsWebsocketOBD = null;
					
				}
				retrieveTPMS('envData');
				*/
			}
			else
				$('.Deb3').text("T"+tpmsWebsocketOBD.readyState);

		}, 10000);
    }, 30000);



 });


//