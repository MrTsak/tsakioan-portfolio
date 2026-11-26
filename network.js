(() => {
  const $ = (id) => document.getElementById(id);
  // Each language has its own page: network.html (English) and el/network.html (Greek).
  const lang = document.documentElement.lang === "el" ? "el" : "en";
  try {
    localStorage.setItem("tsakioan-language", lang);
  } catch {}
  let result = null,
    summary = "",
    errorKey = "";
  const strings = window.networkStrings;
  const t = (k) => strings[k][lang === "el" ? 1 : 0];
  function render() {
    document.querySelectorAll("[data-t]").forEach((e) => (e.textContent = t(e.dataset.t)));
    $("error").textContent = errorKey ? t(errorKey) : "";
    $("status").textContent = "";
    if (result) show();
  }
  function show() {
    const r = result;
    const rows = [
      [t("address"), r.address],
      [t("maskResult"), r.mask],
      [t("prefix"), "/" + r.prefix],
      [t("network"), r.network],
      [t("broadcast"), r.broadcast || t("none")],
      [t("range"), r.first === r.last ? r.first : r.first + " – " + r.last],
      [t("hosts"), r.hosts.toLocaleString(lang === "el" ? "el-GR" : "en-US")],
    ];
    $("details").replaceChildren();
    rows.forEach(([k, v]) => {
      const dt = document.createElement("dt"),
        dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      $("details").append(dt, dd);
    });
    const special = [
      r.prefix === 31 ? t("p31") : r.prefix === 32 ? t("p32") : "",
      r.invalidHost || r.otherInvalid ? t("reserved") : "",
    ]
      .filter(Boolean)
      .join(" ");
    $("special").hidden = !special;
    $("special").textContent = special;
    const comparison =
      r.same === null ? "" : r.duplicate ? t("duplicate") : t(r.same ? "same" : "different");
    $("comparison").hidden = !comparison;
    $("comparison").textContent = comparison;
    summary =
      rows.map((x) => x.join(": ")).join("\n") +
      (r.other ? "\n" + t("other") + ": " + r.other : "") +
      "\n" +
      special +
      "\n" +
      comparison +
      "\n" +
      t("otherHint") +
      "\n" +
      t("limit");
    $("summary").value = summary;
    $("results").hidden = false;
  }
  // quiet: used when restoring after a language switch, so the page neither scrolls nor moves focus.
  function calculate({ quiet = false } = {}) {
    errorKey = "";
    result = null;
    $("results").hidden = true;
    $("error").textContent = "";
    for (const id of ["address", "mask", "other"]) {
      $(id).removeAttribute("aria-invalid");
      try {
        if (id === "mask") NetworkCalc.prefix($(id).value);
        else if (id === "address" || $(id).value.trim()) NetworkCalc.ip($(id).value);
      } catch {
        $(id).setAttribute("aria-invalid", "true");
        errorKey = id === "mask" ? "maskError" : "ipError";
        $("error").textContent = t(errorKey);
        if (!quiet) $(id).focus();
        return;
      }
    }
    result = NetworkCalc.calculate($("address").value, $("mask").value, $("other").value);
    $("summary").hidden = true;
    $("status").textContent = "";
    show();
    if (!quiet) $("results").scrollIntoView({ block: "start", behavior: "smooth" });
  }
  $("calculator").addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
  });
  $("calculator").addEventListener("input", () => {
    errorKey = "";
    result = null;
    $("results").hidden = true;
    $("error").textContent = "";
    for (const id of ["address", "mask", "other"]) $(id).removeAttribute("aria-invalid");
  });
  $("example").onclick = () => {
    $("address").value = "192.168.1.20";
    $("mask").value = "24";
    $("other").value = "192.168.1.50";
    calculate();
  };
  // Switching language keeps what was entered. The values are handed to the other language's page
  // through this tab's sessionStorage, which that page reads and deletes at once. They never go
  // into the link, are not sent anywhere, and an unused hand-over expires after a minute.
  const HANDOFF = "tsakioan-calculator-handoff";
  const HANDOFF_MAX_AGE = 60 * 1000;
  // The language button is a link to the other page; remember the choice for later visits.
  $("language").addEventListener("click", () => {
    const target = lang === "en" ? "el" : "en";
    try {
      localStorage.setItem("tsakioan-language", target);
    } catch {}
    try {
      sessionStorage.setItem(
        HANDOFF,
        JSON.stringify({
          to: target,
          at: Date.now(),
          address: $("address").value,
          mask: $("mask").value,
          other: $("other").value,
          // Which view was on screen: a result, a validation message, or just the fields.
          shown: result ? "result" : errorKey ? "error" : "fields",
        }),
      );
    } catch {}
  });
  function restoreHandoff() {
    let saved = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(HANDOFF));
      sessionStorage.removeItem(HANDOFF);
    } catch {}
    if (!saved || saved.to !== lang || !(Date.now() - saved.at < HANDOFF_MAX_AGE)) return;
    for (const id of ["address", "mask", "other"]) {
      if (typeof saved[id] === "string") $(id).value = saved[id].slice(0, 32);
    }
    // Recalculating from the same values redraws the same result or message in this language.
    if (saved.shown === "result" || saved.shown === "error") calculate({ quiet: true });
  }
  $("copy").onclick = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      $("status").textContent = t("copied");
    } catch {
      $("summary").hidden = false;
      $("summary").focus();
      $("summary").select();
      $("status").textContent = t("fallback");
    }
  };
  render();
  restoreHandoff();
})();
