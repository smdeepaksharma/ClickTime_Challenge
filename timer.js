
	var seconds,
		minutes,
		hours,
		days, t,
		endAt, startAt = 0;	
		remainingTime = 10000000000000;

	
	/* this function is used to read count target value */
	function inputReader() {
		var count = document.getElementById('val').value;
		t = parseInt(count) * 1000;	
		endAt = Date.parse(new Date()) + t;
		
		seconds = Math.floor( (t/1000) % 60 );
		minutes = Math.floor( (t/1000/60) % 60 );
		hours = Math.floor( (t/(1000*60*60)) % 24 );
		days = Math.floor( t/(1000*60*60*24) );	
		
		if(isNaN(t) || t < 0 || t > 10000000000000){
			document.getElementById('error').innerHTML = "Invalid Input";
			document.getElementById('upButton').disabled = true;
			document.getElementById('theButton').disabled = true;
			document.getElementById('s').innerHTML = 0;
			t = -1;
		}
		else{
			document.getElementById('upButton').disabled = false;
			document.getElementById('theButton').disabled = false;
			document.getElementById('error').innerHTML = "";
			document.getElementById('d').innerHTML = days;
			document.getElementById('h').innerHTML = hours;
			document.getElementById('m').innerHTML = minutes;
			document.getElementById('s').innerHTML = seconds;
		}
	}
	/* This function is used to obtain the time remaining to countTarget */
	function getRemainingTime() {
		var rt = endAt - Date.parse(new Date());
		remainingTime = rt;
		return {
			'total': rt,
			'days': Math.floor( rt/(1000*60*60*24) ),
			'hours': Math.floor( (rt/(1000*60*60)) % 24 ),
			'minutes': Math.floor( (rt/1000/60) % 60) ,
			'seconds': Math.floor( (rt/1000) % 60 )
		};	
	}

	function start(text)
	{		
		//startAt = startAt ? new Date().getTime() : 0;
		if (text == "Start") { 
			if(isNaN(t) || t < 0){
			document.getElementById('error').innerHTML = "Invalid Input";
			}
			else{
			document.getElementById('theButton').value = "Stop";
			endAt = Date.parse(new Date()) + Math.min(t,remainingTime) ;		}
		}
		
		if (text == "Stop") { document.getElementById('theButton').value = "Start";	}
		
		if (document.getElementById('theButton').value == "Start") {
			window.clearTimeout(downClock);
			return true; 
		}	
		
		var time = getRemainingTime();		
		if(time.total < 0 ) {
			document.getElementById('theButton').disabled = true;
			popupOpen();
			document.getElementById('theButton').value == "Start";
			window.clearTimeout(downClock);
			return true;
		}
		document.getElementById('d').innerHTML = time.days;
		document.getElementById('h').innerHTML = time.hours;
		document.getElementById('m').innerHTML = time.minutes;
		document.getElementById('s').innerHTML = time.seconds;
		
		downClock = window.setTimeout("start();", 1000);			
	}
	
	function resetIt() {
		seconds = -1;
		minutes = 0;
		hours = 0;
		t =-1
		remainingTime = 1000000000000;
		document.getElementById('d').innerHTML = 0;
		document.getElementById('h').innerHTML = 0;
		document.getElementById('m').innerHTML = 0;
		document.getElementById('s').innerHTML = 0;
		document.getElementById('val').value = "";
		document.getElementById('theButton').disabled = true;
		if (document.getElementById('theButton').value == "Stop") {
			document.getElementById('theButton').value = "Start"; 
		}
		window.clearTimeout(downClock);
	}
 /******************************* END OF DOWN COUNTER **********************************/
 
 /*********************************** UP COUNTER ***************************************/
	var sec_up = 0;
	var min_up = 0;
	var hour_up = 0;
	var day_up = 0;
	/* Up counter : used to count the time till countTarget */
	function upcounter(text) {
		
		var countTarget = parseInt(document.getElementById('val').value);
		console.log("CT : "+countTarget);
		sec_up++;
		if (sec_up == 60) {
			sec_up = 0;
			min_up = min_up + 1; }
		else {
			min_up = min_up; }
		if (min_up == 60) {
			min_up = 0; 
			hour_up += 1; }
		if(hour_up == 24) {
			day_up +=1;
		}
		   
		if(sec_up > countTarget)
		{
			document.getElementById('upButton').disabled = true;
			popupOpen();
			window.clearTimeout(upClock);
			return true;		
		}
		
		document.getElementById('days_up').innerHTML = day_up;;
		document.getElementById('hours_up').innerHTML = hour_up;
		document.getElementById('minutes_up').innerHTML = min_up;
		document.getElementById('seconds_up').innerHTML = sec_up;

		if (text == "Start") { document.getElementById('upButton').value = "Stop "; }
		if (text == "Stop ") { document.getElementById('upButton').value = "Start"; }

		if (document.getElementById('upButton').value == "Start") {
			window.clearTimeout(upClock);
			return true; 
		}
		
		upClock=window.setTimeout("upcounter();", 1000);
	}
	/* Function is used to reset the values */
	function resetup() {
		sec_up = -1;
		min_up = 0;
		hour_up= 0;
		day_up = 0;

		document.getElementById('days_up').innerHTML = 0;
		document.getElementById('hours_up').innerHTML = 0;
		document.getElementById('minutes_up').innerHTML = 0;
		document.getElementById('seconds_up').innerHTML = 0;
		document.getElementById('upButton').disabled = true;
		document.getElementById('val').value = "";
		
		if (document.getElementById('upButton').value == "Stop") {
			document.getElementById('upButton').value = "Start"; 
		}
		window.clearTimeout(upClock);
	}
 
 
 
 		/** this function is used to hide the pop up*/
		function hider()
		{
			$(".popmodal").hide();	
		}
		
		/* This function is invoked the timer is up */
		function popupOpen() {
			$(".popmodal").show();
			setTimeout(hider,1000);
		}