var readyStateCheckIntervalRFA = setInterval(function(){
  if(document.readyState === "complete"){
    init();
    clearInterval(readyStateCheckIntervalRFA);
  }
}, 10);

RFAChrome = function(){

    /*
    $('#chat-messages').on( "click", function() {
      //document.getElementById("chat-sound").playMentionSound();
    });
    */
    //
    // Vote for Pedro!
    //

    $('#room').append('<div id="voteforbrian"></div>');

    function voteForPedro() {
        $(".boxtext").delay(30000).animate({ left: "-500px" },30000, "linear", voteForPedro);
    }

    voteForPedro();

    //
    // CHAT MSG HANDLING
    //

    $('#now-playing-dj').append('<span class="pHVersion">pH: v0.103</strong>');

    
    API.on(API.CHAT, chtMsg);
    function chtMsg(data) {

      var c = data.message;
      
      if (c.indexOf(":fire:") !=-1) {
          reggaeHornLongSFX();
      } else if (c.indexOf("chune!") !=-1) {
          chuneSFX();
      } else if (c.indexOf(":car:") !=-1) {
          carSFX();
      } else if (c.indexOf(":police_car:") !=-1) {
          police_carSFX();
      } else if (c.indexOf(":clap:") !=-1) {
          clapSFX();
      } else if (c.indexOf(":gun:") !=-1) {
          gunSFX();
      } else if (c.indexOf(":zap:") !=-1) {
          lazerSFX();
      } else if (c.indexOf(":ship:") !=-1) {
          shipSFX();
      } else if (c.indexOf(":skull:") !=-1) {
          lockandloadSFX();
      } else if (c.indexOf(":loudspeaker:") !=-1) {
          loudspeakerSFX();
      } else if (c.indexOf(":thumbsup:") !=-1) {
          cymbalSFX();
      };

    };

    //
    // SOUNDS
    //
    function reggaeHornLongSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/horn2.mp3"); 
      snd.play();
    };

    function cymbalSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/cymbal.mp3"); 
      snd.play();
    };

    function loudspeakerSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/horn.mp3"); 
      snd.play();
    };

    function shipSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/alarm.mp3"); 
      snd.play();
    };

    function lockandloadSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/guncock.mp3"); 
      snd.play();
    };

    function lazerSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/lazer2.mp3"); 
      snd.play();
    };

    function chuneSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/snare.mp3"); 
      snd.play();
    };

    function carSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/speed.mp3"); 
      snd.play();
    };

    function police_carSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/copcar.mp3"); 
      snd.play();
    };

    function clapSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/clap.mp3"); 
      snd.play();
    };

    function gunSFX() {
      var snd = new Audio("http://thebriankinney.com/ph/sfx/gunshot.mp3"); 
      snd.play();
    };


  console.log('RFA Finished');

};
  
function init(){
  if ($('#audience').length>0){
    if (document.location.pathname=="/" || $('.RFAChrome').length>0) return;//Only one instance of plug at a time.

    RFAChrome();

  } else {
    setTimeout(init, 250);
  }

};