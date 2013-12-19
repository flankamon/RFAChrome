//
// ~* RFA - Chrome Extension *~
// Author : webdevbrian
// Contributing: flankamon
// Project started: 12.5.2013
//

//
// Check ready state -- due to inconsistency of plugin firing with plug.dj
//
var readyStateCheckIntervalRFA = setInterval(function () {
  if (document.readyState === "complete") {
    init();
    clearInterval(readyStateCheckIntervalRFA);
  }
}, 10);

//
// Make the magic happen
//
RFAChrome = function () {

  //
  // Vote for Pedro!
  //
  $('#room').append('<div id="voteforbrian"></div>');
  $("#voteforbrian").animate({ left: "-500px" }, 30000, "linear");


  //
  // GUI
  // TODO: Menus
  $('#now-playing-dj').append('<span class="pHVersion"> RFA eX:  v0.1.6</strong>');
  $('#room').append('<div id="rfaMenu"></div>');
  $('#rfaMenu').append('<div id="sfx-toggle" style="display:none" class="enabled"></div>');

  //
  // CHAT MSG HANDLING
  // TODO: socket & monogodb server-side
  API.on(API.CHAT, chtMsg);

  function chtMsg(data) {
    if (data.message.indexOf("togglesfx") != -1) {
      if (API.hasPermission(data.fromID, API.ROLE.MANAGER)) {
        $("#sfx-toggle").toggleClass("enabled");
      }
    }

    tryPlaySFX(data);
  };

  function tryPlaySFX(data) {

    var isStaff = true;

    if (!API.hasPermission(data.fromID, API.ROLE.RESIDENTDJ)) {
      isStaff = false;
    }

    var sfxEnabled = isSFXOn(data.FromID);

    if (sfxEnabled && isStaff) {

      var c = data.message;

      if (c.indexOf(":fire:") != -1) {
        playSFX("horn2");
      } else if (c.indexOf("chune!") != -1) {
        playSFX("snare");
      } else if (c.indexOf(":car:") != -1) {
        playSFX("speed");
      } else if (c.indexOf(":police_car:") != -1) {
        playSFX("copcar");
      } else if (c.indexOf(":clap:") != -1) {
        playSFX("clap");
      } else if (c.indexOf(":gun:") != -1) {
        playSFX("gunshot");
      } else if (c.indexOf(":zap:") != -1) {
        playSFX("lazer2");
      } else if (c.indexOf(":ship:") != -1) {
        playSFX("alarm");
      } else if (c.indexOf(":skull:") != -1) {
        playSFX("guncock");
      } else if (c.indexOf(":loudspeaker:") != -1) {
        playSFX("horn");
      } else if (c.indexOf(":thumbsup:") != -1) {
        playSFX("cymbal");
      } else if (c.indexOf(":train:") != -1) {
        playSFX("train");
      } else if (c.indexOf(":taxi:") != -1) {
        playSFX("taxi");
      } else if (c.indexOf(":dash:") != -1) {
        playSFX("dash");
      } else if (c.indexOf(":boom:") != -1) {
        playSFX("boom");
      } else if (c.indexOf(":speaker:") != -1) {
        playSFX("speaker");
      } else if (c.indexOf(":airplane:") != -1) {
        playSFX("airplane");
      } else if (c.indexOf(":tiger:") != -1) {
        playSFX("tiger");
      }
    }
  }

  //
  // SOUNDS
  //

  // Fire off Audio
  
  function playSFX(s) {
    var snd = new Audio("http://thebriankinney.com/ph/sfx/" + s + ".mp3");
    snd.play();
  };
    
  function isSFXOn() {
    return $("#sfx-toggle").hasClass("enabled");
  };

  //
  // TODO: PM Socket Handling
  //

  //
  // TODO: Socket based notifications
  //

  //
  // TODO: Bot integration with Socket server?
  //

  // Finished
  console.log('RFA Finished');

};

function init() {
  if ($('#audience').length > 0) {
    if (document.location.pathname == "/" || $('.RFAChrome').length > 0) return; // Only one instance of RFA at a time

    RFAChrome();

  } else {
    setTimeout(init, 250); // yeah -- this is because of plug.dj ... don't you judge me!
  }

};

//
// LIBRARIES
//

// ----------------------------------------------------------------------------
// Buzz, a Javascript HTML5 Audio library
// v1.1.0 - released 2013-08-15 13:18
// Licensed under the MIT license.
// http://buzz.jaysalvat.com/
// ----------------------------------------------------------------------------
// Copyright (C) 2010-2013 Jay Salvat
// http://jaysalvat.com/
// ----------------------------------------------------------------------------

(function (t, n, e) { "undefined" != typeof module && module.exports ? module.exports = e() : "function" == typeof n.define && n.define.amd ? define(t, [], e) : n[t] = e() })("buzz", this, function () { var t = { defaults: { autoplay: !1, duration: 5e3, formats: [], loop: !1, placeholder: "--", preload: "metadata", volume: 80, document: document }, types: { mp3: "audio/mpeg", ogg: "audio/ogg", wav: "audio/wav", aac: "audio/aac", m4a: "audio/x-m4a" }, sounds: [], el: document.createElement("audio"), sound: function (n, e) { function i(t) { for (var n = [], e = t.length - 1, i = 0; e >= i; i++) n.push({ start: t.start(i), end: t.end(i) }); return n } function u(t) { return t.split(".").pop() } function s(n, e) { var i = r.createElement("source"); i.src = e, t.types[u(e)] && (i.type = t.types[u(e)]), n.appendChild(i) } e = e || {}; var r = e.document || t.defaults.document, o = 0, a = [], h = {}, l = t.isSupported(); if (this.load = function () { return l ? (this.sound.load(), this) : this }, this.play = function () { return l ? (this.sound.play(), this) : this }, this.togglePlay = function () { return l ? (this.sound.paused ? this.sound.play() : this.sound.pause(), this) : this }, this.pause = function () { return l ? (this.sound.pause(), this) : this }, this.isPaused = function () { return l ? this.sound.paused : null }, this.stop = function () { return l ? (this.setTime(0), this.sound.pause(), this) : this }, this.isEnded = function () { return l ? this.sound.ended : null }, this.loop = function () { return l ? (this.sound.loop = "loop", this.bind("ended.buzzloop", function () { this.currentTime = 0, this.play() }), this) : this }, this.unloop = function () { return l ? (this.sound.removeAttribute("loop"), this.unbind("ended.buzzloop"), this) : this }, this.mute = function () { return l ? (this.sound.muted = !0, this) : this }, this.unmute = function () { return l ? (this.sound.muted = !1, this) : this }, this.toggleMute = function () { return l ? (this.sound.muted = !this.sound.muted, this) : this }, this.isMuted = function () { return l ? this.sound.muted : null }, this.setVolume = function (t) { return l ? (0 > t && (t = 0), t > 100 && (t = 100), this.volume = t, this.sound.volume = t / 100, this) : this }, this.getVolume = function () { return l ? this.volume : this }, this.increaseVolume = function (t) { return this.setVolume(this.volume + (t || 1)) }, this.decreaseVolume = function (t) { return this.setVolume(this.volume - (t || 1)) }, this.setTime = function (t) { if (!l) return this; var n = !0; return this.whenReady(function () { n === !0 && (n = !1, this.sound.currentTime = t) }), this }, this.getTime = function () { if (!l) return null; var n = Math.round(100 * this.sound.currentTime) / 100; return isNaN(n) ? t.defaults.placeholder : n }, this.setPercent = function (n) { return l ? this.setTime(t.fromPercent(n, this.sound.duration)) : this }, this.getPercent = function () { if (!l) return null; var n = Math.round(t.toPercent(this.sound.currentTime, this.sound.duration)); return isNaN(n) ? t.defaults.placeholder : n }, this.setSpeed = function (t) { return l ? (this.sound.playbackRate = t, this) : this }, this.getSpeed = function () { return l ? this.sound.playbackRate : null }, this.getDuration = function () { if (!l) return null; var n = Math.round(100 * this.sound.duration) / 100; return isNaN(n) ? t.defaults.placeholder : n }, this.getPlayed = function () { return l ? i(this.sound.played) : null }, this.getBuffered = function () { return l ? i(this.sound.buffered) : null }, this.getSeekable = function () { return l ? i(this.sound.seekable) : null }, this.getErrorCode = function () { return l && this.sound.error ? this.sound.error.code : 0 }, this.getErrorMessage = function () { if (!l) return null; switch (this.getErrorCode()) { case 1: return "MEDIA_ERR_ABORTED"; case 2: return "MEDIA_ERR_NETWORK"; case 3: return "MEDIA_ERR_DECODE"; case 4: return "MEDIA_ERR_SRC_NOT_SUPPORTED"; default: return null } }, this.getStateCode = function () { return l ? this.sound.readyState : null }, this.getStateMessage = function () { if (!l) return null; switch (this.getStateCode()) { case 0: return "HAVE_NOTHING"; case 1: return "HAVE_METADATA"; case 2: return "HAVE_CURRENT_DATA"; case 3: return "HAVE_FUTURE_DATA"; case 4: return "HAVE_ENOUGH_DATA"; default: return null } }, this.getNetworkStateCode = function () { return l ? this.sound.networkState : null }, this.getNetworkStateMessage = function () { if (!l) return null; switch (this.getNetworkStateCode()) { case 0: return "NETWORK_EMPTY"; case 1: return "NETWORK_IDLE"; case 2: return "NETWORK_LOADING"; case 3: return "NETWORK_NO_SOURCE"; default: return null } }, this.set = function (t, n) { return l ? (this.sound[t] = n, this) : this }, this.get = function (t) { return l ? t ? this.sound[t] : this.sound : null }, this.bind = function (t, n) { if (!l) return this; t = t.split(" "); for (var e = this, i = function (t) { n.call(e, t) }, u = 0; t.length > u; u++) { var s = t[u], r = s; s = r.split(".")[0], a.push({ idx: r, func: i }), this.sound.addEventListener(s, i, !0) } return this }, this.unbind = function (t) { if (!l) return this; t = t.split(" "); for (var n = 0; t.length > n; n++) for (var e = t[n], i = e.split(".")[0], u = 0; a.length > u; u++) { var s = a[u].idx.split("."); (a[u].idx == e || s[1] && s[1] == e.replace(".", "")) && (this.sound.removeEventListener(i, a[u].func, !0), a.splice(u, 1)) } return this }, this.bindOnce = function (t, n) { if (!l) return this; var e = this; return h[o++] = !1, this.bind(t + "." + o, function () { h[o] || (h[o] = !0, n.call(e)), e.unbind(t + "." + o) }), this }, this.trigger = function (t) { if (!l) return this; t = t.split(" "); for (var n = 0; t.length > n; n++) for (var e = t[n], i = 0; a.length > i; i++) { var u = a[i].idx.split("."); if (a[i].idx == e || u[0] && u[0] == e.replace(".", "")) { var s = r.createEvent("HTMLEvents"); s.initEvent(u[0], !1, !0), this.sound.dispatchEvent(s) } } return this }, this.fadeTo = function (n, e, i) { function u() { setTimeout(function () { n > s && n > o.volume ? (o.setVolume(o.volume += 1), u()) : s > n && o.volume > n ? (o.setVolume(o.volume -= 1), u()) : i instanceof Function && i.apply(o) }, r) } if (!l) return this; e instanceof Function ? (i = e, e = t.defaults.duration) : e = e || t.defaults.duration; var s = this.volume, r = e / Math.abs(s - n), o = this; return this.play(), this.whenReady(function () { u() }), this }, this.fadeIn = function (t, n) { return l ? this.setVolume(0).fadeTo(100, t, n) : this }, this.fadeOut = function (t, n) { return l ? this.fadeTo(0, t, n) : this }, this.fadeWith = function (t, n) { return l ? (this.fadeOut(n, function () { this.stop() }), t.play().fadeIn(n), this) : this }, this.whenReady = function (t) { if (!l) return null; var n = this; 0 === this.sound.readyState ? this.bind("canplay.buzzwhenready", function () { t.call(n) }) : t.call(n) }, l && n) { for (var d in t.defaults) t.defaults.hasOwnProperty(d) && (e[d] = e[d] || t.defaults[d]); if (this.sound = r.createElement("audio"), n instanceof Array) for (var c in n) n.hasOwnProperty(c) && s(this.sound, n[c]); else if (e.formats.length) for (var f in e.formats) e.formats.hasOwnProperty(f) && s(this.sound, n + "." + e.formats[f]); else s(this.sound, n); e.loop && this.loop(), e.autoplay && (this.sound.autoplay = "autoplay"), this.sound.preload = e.preload === !0 ? "auto" : e.preload === !1 ? "none" : e.preload, this.setVolume(e.volume), t.sounds.push(this) } }, group: function (t) { function n() { for (var n = e(null, arguments), i = n.shift(), u = 0; t.length > u; u++) t[u][i].apply(t[u], n) } function e(t, n) { return t instanceof Array ? t : Array.prototype.slice.call(n) } t = e(t, arguments), this.getSounds = function () { return t }, this.add = function (n) { n = e(n, arguments); for (var i = 0; n.length > i; i++) t.push(n[i]) }, this.remove = function (n) { n = e(n, arguments); for (var i = 0; n.length > i; i++) for (var u = 0; t.length > u; u++) if (t[u] == n[i]) { t.splice(u, 1); break } }, this.load = function () { return n("load"), this }, this.play = function () { return n("play"), this }, this.togglePlay = function () { return n("togglePlay"), this }, this.pause = function (t) { return n("pause", t), this }, this.stop = function () { return n("stop"), this }, this.mute = function () { return n("mute"), this }, this.unmute = function () { return n("unmute"), this }, this.toggleMute = function () { return n("toggleMute"), this }, this.setVolume = function (t) { return n("setVolume", t), this }, this.increaseVolume = function (t) { return n("increaseVolume", t), this }, this.decreaseVolume = function (t) { return n("decreaseVolume", t), this }, this.loop = function () { return n("loop"), this }, this.unloop = function () { return n("unloop"), this }, this.setTime = function (t) { return n("setTime", t), this }, this.set = function (t, e) { return n("set", t, e), this }, this.bind = function (t, e) { return n("bind", t, e), this }, this.unbind = function (t) { return n("unbind", t), this }, this.bindOnce = function (t, e) { return n("bindOnce", t, e), this }, this.trigger = function (t) { return n("trigger", t), this }, this.fade = function (t, e, i, u) { return n("fade", t, e, i, u), this }, this.fadeIn = function (t, e) { return n("fadeIn", t, e), this }, this.fadeOut = function (t, e) { return n("fadeOut", t, e), this } }, all: function () { return new t.group(t.sounds) }, isSupported: function () { return !!t.el.canPlayType }, isOGGSupported: function () { return !!t.el.canPlayType && t.el.canPlayType('audio/ogg; codecs="vorbis"') }, isWAVSupported: function () { return !!t.el.canPlayType && t.el.canPlayType('audio/wav; codecs="1"') }, isMP3Supported: function () { return !!t.el.canPlayType && t.el.canPlayType("audio/mpeg;") }, isAACSupported: function () { return !!t.el.canPlayType && (t.el.canPlayType("audio/x-m4a;") || t.el.canPlayType("audio/aac;")) }, toTimer: function (t, n) { var e, i, u; return e = Math.floor(t / 3600), e = isNaN(e) ? "--" : e >= 10 ? e : "0" + e, i = n ? Math.floor(t / 60 % 60) : Math.floor(t / 60), i = isNaN(i) ? "--" : i >= 10 ? i : "0" + i, u = Math.floor(t % 60), u = isNaN(u) ? "--" : u >= 10 ? u : "0" + u, n ? e + ":" + i + ":" + u : i + ":" + u }, fromTimer: function (t) { var n = ("" + t).split(":"); return n && 3 == n.length && (t = 3600 * parseInt(n[0], 10) + 60 * parseInt(n[1], 10) + parseInt(n[2], 10)), n && 2 == n.length && (t = 60 * parseInt(n[0], 10) + parseInt(n[1], 10)), t }, toPercent: function (t, n, e) { var i = Math.pow(10, e || 0); return Math.round(100 * t / n * i) / i }, fromPercent: function (t, n, e) { var i = Math.pow(10, e || 0); return Math.round(n / 100 * t * i) / i } }; return t });
