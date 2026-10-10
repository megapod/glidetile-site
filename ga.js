// GlideTile site analytics (11.10.2026): the share landing pages count who opens them and from which network,
// and who taps "Get it on Google Play", so the share funnel is not blind between "sent" and "installed".
// One Firebase web stream of the glidetile project; the measurement id below is the only thing to fill in.
// Events reuse the game's registered parameters (to = network, what = open / install, code = the sharer's code).
var GA_ID = "G-DQ8EK45B9V";   // G-XXXXXXXXXX from Firebase console -> Project settings -> Your apps -> Web app (empty = count nothing)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
function gaLoad() {
  if (!GA_ID) { return false; }
  var s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false, transport_type: "beacon" });
  return true;
}
// landing(what, params, then): sends one event and calls `then` once it left (or after 400 ms, whichever first),
// so the redirect to Play never waits on Google and never loses the event either.
function gaEvent(what, params, then) {
  var done = false, go = function () { if (!done) { done = true; if (then) { then(); } } };
  if (!GA_ID) { go(); return; }
  var p = {}; for (var k in params) { if (params[k]) { p[k] = params[k]; } }
  p.what = what; p.event_callback = go; p.event_timeout = 400;
  gtag("event", "landing", p);
  setTimeout(go, 450);
}
