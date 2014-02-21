var BZZ = A1;
var tune = "c    c    c   d    e   e  d   e    f   g   C  C C   g  g g   e  e e   c  c c  g    f  e   d c";
//var tune = " abcde fgAB CDE FG"; //try1
//var tune="ce  ce  g  g  ce  ce  g  g  CB  AAgg f A gf ed  c  c "; //try2
var song_letters="  abcdefgABCDEFG";
var l1,l2,l3=false;
var pos=0;
var music_i;
var eq_interval;
//not used something not working 
function led_pwm(pin,brightness) {
	var Hz = 50;
	if ((typeof eq_interval) !== "undefined") {
		clearInterval(eq_interval);
		digitalWrite(pin,0);
	}
	if(brightness>0){
		eq_interval = setInterval(function() {
			digitalPulse(pin, 0.5, brightness * (1000/Hz));
		}, 1000/Hz);
	} else {
		digitalWrite(pin,0);
	}
}
function turn_sound_led(frek) {
	l1=false;
	l2=false;
	l3=false;
	var pin = LED1;
	if(frek>0&&frek<320) {l1=true;}
	if(frek>=320&&frek<480) {l2=true;}
	if(frek>=480) {l3=true;}
	digitalWrite(LED1,l1);
	digitalWrite(LED2,l2);
	digitalWrite(LED3,l3);
}
function beep(freq) {
	if(freq==0){
		digitalWrite(BZZ,0);
	}else{
		analogWrite(BZZ,0.5,{freq:freq});
	}	
}
function set_pos() {
  if(pos < tune.length){pos++;
  }else{pos=0;}
}
function sound_step() {
  var ch = tune[pos];
  var frek = 0;
  //if (ch!=undefined) 
  if (ch==' ' || ch==undefined) frek=0; // off
  else if (ch=='a') frek=220.00;
  else if (ch=='b') frek=246.94;
  else if (ch=='c') frek=261.63;
  else if (ch=='d') frek=293.66;
  else if (ch=='e') frek=329.63;
  else if (ch=='f') frek=349.23;
  else if (ch=='g') frek=392.00;
  else if (ch=='A') frek=440.00;
  else if (ch=='B') frek=493.88;
  else if (ch=='C') frek=523.25;
  else if (ch=='D') frek=587.33;
  else if (ch=='E') frek=659.26;
  else if (ch=='F') frek=698.00;
  else if (ch=='G') frek=784.00;
  if(pos < tune.length){pos++;
  }else{pos=0;}
  beep(frek);
  //sound_eq(frek);
  turn_sound_led(frek);
}
function sound_eq(frek) {
  console.log(frek);
  led_pwm(LED1,frek/1000);
}
function random_step() {
	//song_letters[pos];
	var rand_pos = Math.floor((Math.random()*song_letters.length)+1);
	console.log("rand_pos",rand_pos);
	sound_step(rand_pos);
	set_pos();
}
function play_scale() {
	for (var i = 1; i < 1000; i++) {
		beep(i);
                       
                                     
	}
	beep(0);
}
function start_music() {
	pos = 0;
	music_i=setInterval(sound_step, 100);
}
function stop_music() {
	if (typeof music_i !== "undefined") {
		clearInterval(music_i);
		digitalWrite(BZZ,0);
	}
}
function start_random() {
	music_i=setInterval(random_step, 300);
}
var btn_watch_press,btn_watch_release,led_loop;
var btn_state = false;
btn_watch_press = setWatch(function(){
	if(!btn_state){
		start_music();
	} else {
		stop_music();
	}
	btn_state=!btn_state;
},BTN,{repeat:true,edge:'rising'});
btn_watch_release = setWatch(function(){
	console.log(btn_state);
},BTN,{repeat:true,edge:'falling'});