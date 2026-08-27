/* ============================================================================
   Fahrschule CH — Interaktionen
   - Kopfleiste schrumpft beim Scrollen
   - Mobiles Voll-Sheet
   - Scroll-Reveal (IntersectionObserver)
   - Hero-Fotostapel (Auto-Rotation + Punkte)
   - Preis-Rechner
   - Ablauf-Kapitelnavigation (Scrollspy)
   - mailto-Formulare (vorbefüllt, kein Backend)
   - Consent-Load für externe Kurskalender
   ========================================================================== */
(function () {
  "use strict";
  var doc = document;
  var prefersReduced = function () {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  /* ---------- Kopfleiste ---------- */
  var header = doc.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-shrunk", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobiles Menü ---------- */
  var toggle = doc.querySelector(".nav-toggle");
  var sheet = doc.querySelector(".mobile-sheet");
  if (toggle && sheet) {
    var setMenu = function (open) {
      doc.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setMenu(!doc.body.classList.contains("menu-open"));
    });
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- Scroll-Reveal ---------- */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // Sicherheitsnetz: falls der Observer (z. B. in eingebetteten Kontexten)
    // nicht auslöst, spätestens nach 2,5 s alles einblenden.
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }, 2500);
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Hero-Fotostapel ---------- */
  var stack = doc.querySelector(".hero-stack");
  if (stack) {
    var shots = Array.prototype.slice.call(stack.querySelectorAll(".shot"));
    var dotsWrap = stack.querySelector(".stack-dots");
    var idx = 0, timer = null;
    var go = function (n) {
      idx = (n + shots.length) % shots.length;
      shots.forEach(function (s, i) { s.classList.toggle("is-current", i === idx); });
      if (dotsWrap) {
        Array.prototype.slice.call(dotsWrap.children).forEach(function (d, i) {
          d.classList.toggle("is-current", i === idx);
        });
      }
    };
    if (dotsWrap) {
      shots.forEach(function (_, i) {
        var b = doc.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Bild " + (i + 1));
        b.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(b);
      });
    }
    var tick = function () { go(idx + 1); };
    var restart = function () {
      if (timer) clearInterval(timer);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = setInterval(tick, 4200);
      }
    };
    go(0); restart();
    stack.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    stack.addEventListener("mouseleave", restart);
  }

  /* ---------- Preis-Rechner ---------- */
  var calc = doc.querySelector("[data-calc]");
  if (calc) {
    // Tarife laut Preisliste fahrschule-ch.ch
    var TIERS = [
      { key: "full", name: "Full Drive", cond: "mehr als 10 Fahrstunden / Monat", automat: 88, geschaltet: 90 },
      { key: "boost", name: "Boost", cond: "mehr als 5 Fahrstunden / Monat", automat: 90, geschaltet: 92 },
      { key: "basic", name: "Basic", cond: "1–5 Fahrstunden / Monat", automat: 95, geschaltet: 97 }
    ];
    var gearBtns = calc.querySelectorAll("[data-gear]");
    var range = calc.querySelector("input[type=range]");
    var rngVal = calc.querySelector(".rng-val");
    var outName = calc.querySelector(".tier-name");
    var outPrice = calc.querySelector(".tier-price");
    var outCond = calc.querySelector(".tier-cond");
    var gear = "automat";

    var pick = function (n) {
      if (n > 10) return TIERS[0];
      if (n > 5) return TIERS[1];
      return TIERS[2];
    };
    var render = function () {
      var n = parseInt(range.value, 10);
      rngVal.textContent = n >= 15 ? "15+" : n;
      var t = pick(n);
      outName.innerHTML = '<span>' + t.name + '</span>';
      outPrice.innerHTML = "CHF " + t[gear] + ' <small>/ Doppellektion (100 Min.)</small>';
      outCond.textContent = t.cond + " · " + (gear === "automat" ? "Mazda 2 Hybrid (Automat)" : "BMW 120 (geschaltet)");
    };
    gearBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        gearBtns.forEach(function (x) { x.classList.remove("is-on"); });
        b.classList.add("is-on");
        gear = b.getAttribute("data-gear");
        render();
      });
    });
    range.addEventListener("input", render);
    render();
  }

  /* ---------- Ablauf-Scrollspy ---------- */
  var pathway = doc.querySelector(".pathway");
  if (pathway) {
    var idxBtns = Array.prototype.slice.call(pathway.querySelectorAll(".path-index button"));
    var steps = Array.prototype.slice.call(pathway.querySelectorAll(".path-step"));
    idxBtns.forEach(function (b, i) {
      b.addEventListener("click", function () {
        if (steps[i]) steps[i].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var i = steps.indexOf(en.target);
            idxBtns.forEach(function (b, j) { b.classList.toggle("is-active", j === i); });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      steps.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- mailto-Formulare ---------- */
  doc.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-mailto");
      var subject = form.getAttribute("data-subject") || "Anfrage über die Website";
      var lines = [];
      form.querySelectorAll("[data-label]").forEach(function (el) {
        var label = el.getAttribute("data-label");
        var val = "";
        if (el.type === "checkbox") {
          val = el.checked ? "Ja" : "Nein";
        } else if (el.tagName === "SELECT") {
          val = el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : "";
        } else {
          val = (el.value || "").trim();
        }
        if (el.type === "radio") { if (el.checked) lines.push(label + ": " + el.value); return; }
        if (val) lines.push(label + ": " + val);
      });
      var body = lines.join("\n") + "\n\n— gesendet über fahrschule-ch (Demo)";
      var href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      window.location.href = href;
      var ok = form.querySelector(".form-sent");
      if (ok) ok.hidden = false;
    });
  });

  /* ---------- Consent-Load (externer Kurskalender) ---------- */
  doc.querySelectorAll("[data-consent-load]").forEach(function (box) {
    var btn = box.querySelector("button");
    var src = box.getAttribute("data-consent-load");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var frame = doc.createElement("iframe");
      frame.src = src;
      frame.loading = "lazy";
      frame.title = "Kurskalender";
      frame.setAttribute("allow", "fullscreen");
      box.innerHTML = "";
      box.appendChild(frame);
    });
  });

  /* ---------- Lese-Fortschrittsbalken ---------- */
  if (header && !prefersReduced()) {
    var bar = doc.createElement("div");
    bar.className = "scroll-progress";
    header.appendChild(bar);
    var updateBar = function () {
      var h = doc.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    updateBar();
    window.addEventListener("scroll", updateBar, { passive: true });
    window.addEventListener("resize", updateBar);
  }

  /* ---------- Zahlen hochzählen ---------- */
  var nums = doc.querySelectorAll(".hero-facts .num");
  if (nums.length && "IntersectionObserver" in window && !prefersReduced()) {
    var numIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        numIo.unobserve(en.target);
        var el = en.target;
        var m = (el.textContent || "").replace(/ /g, " ").match(/^(\D*)(\d+)(.*)$/);
        if (!m) return;
        var target = parseInt(m[2], 10);
        if (target > 1000) return; // Jahreszahlen o. Ä. nicht animieren
        var pre = m[1], post = m[3], start = null, dur = 1100;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + Math.round(eased * target) + post;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { numIo.observe(n); });
  }

  /* ---------- Hero-Fotostapel: sanfte Parallaxe ---------- */
  if (stack && window.matchMedia("(pointer: fine)").matches && !prefersReduced()) {
    stack.addEventListener("pointermove", function (e) {
      var r = stack.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty("transform", "perspective(900px) rotateY(" + (dx * 5).toFixed(2) + "deg) rotateX(" + (-dy * 5).toFixed(2) + "deg)");
    });
    stack.addEventListener("pointerleave", function () {
      stack.style.removeProperty("transform");
    });
    stack.style.transition = "transform .3s var(--ease)";
  }

  /* ---------- Video-Modal ---------- */
  var vm = doc.getElementById("videoModal");
  if (vm) {
    var vmVideo = vm.querySelector("video");
    var openVm = function () {
      vm.hidden = false;
      doc.body.style.overflow = "hidden";
    };
    var closeVm = function () {
      vm.hidden = true;
      doc.body.style.overflow = "";
      if (vmVideo) { vmVideo.pause(); }
    };
    doc.querySelectorAll("[data-video]").forEach(function (b) {
      b.addEventListener("click", openVm);
    });
    vm.addEventListener("click", function (e) {
      if (e.target === vm || e.target.closest(".vm-close")) closeVm();
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !vm.hidden) closeVm();
    });
  }

  /* ---------- Jahr im Footer ---------- */
  var y = doc.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
