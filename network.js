(() => {
  const $ = (id) => document.getElementById(id);
  let lang = (() => {
      const q = new URLSearchParams(location.search).get("lang");
      if (q === "el" || q === "en") {
        try {
          localStorage.setItem("tsakioan-language", q);
        } catch {}
        return q;
      }
      try {
        return localStorage.getItem("tsakioan-language") === "el" ? "el" : "en";
      } catch {
        return "en";
      }
    })(),
    result = null,
    summary = "",
    errorKey = "";
  const strings = {
    back: ["Back to portfolio", "Επιστροφή στο portfolio"],
    title: ["Understand your network.", "Υπολογισμός υποδικτύου."],
    intro: [
      "Find IPv4 subnet details and compare a computer with a printer or another device.",
      "Συμπλήρωσε μια διεύθυνση IPv4 και τη μάσκα υποδικτύου για να δεις το εύρος των διευθύνσεων. Μπορείς επίσης να ελέγξεις αν ένας υπολογιστής και ένας εκτυπωτής ανήκουν στο ίδιο υποδίκτυο.",
    ],
    privacy: [
      "Calculations happen in this browser. Addresses are not uploaded or saved. This tool does not scan or change your network.",
      "Οι υπολογισμοί γίνονται στον browser. Οι διευθύνσεις δεν αποστέλλονται ούτε αποθηκεύονται. Το εργαλείο δεν σαρώνει ούτε αλλάζει το δίκτυό σου.",
    ],
    settings: ["Network settings", "Ρυθμίσεις δικτύου"],
    address: ["Computer / device IPv4 address", "Διεύθυνση IPv4 υπολογιστή / συσκευής"],
    ipHint: [
      "Enter four numbers from 0 to 255, separated by dots. IPv4 only.",
      "Γράψε τέσσερις αριθμούς από 0 έως 255, χωρισμένους με τελείες. Μόνο IPv4.",
    ],
    mask: ["Subnet mask or CIDR prefix", "Μάσκα υποδικτύου ή πρόθεμα CIDR"],
    maskHint: [
      "For example: 255.255.255.0, 24 or /24. Prefixes /0–/32 are supported.",
      "Παράδειγμα: 255.255.255.0, 24 ή /24. Υποστηρίζονται προθέματα /0–/32.",
    ],
    other: [
      "Printer / second device IPv4 (optional)",
      "IPv4 εκτυπωτή / δεύτερης συσκευής (προαιρετικό)",
    ],
    otherHint: [
      "Comparison assumes both devices use the subnet mask above. Check their actual settings first.",
      "Για τη σύγκριση χρησιμοποιείται η ίδια μάσκα και για τις δύο συσκευές. Έλεγξε πρώτα ότι έχουν όντως την ίδια μάσκα στις ρυθμίσεις τους.",
    ],
    calculate: ["Calculate", "Υπολογισμός"],
    example: ["Try an example", "Δες ένα παράδειγμα"],
    results: ["Subnet details", "Στοιχεία υποδικτύου"],
    network: ["Network address", "Διεύθυνση δικτύου"],
    broadcast: ["Broadcast address", "Διεύθυνση broadcast"],
    range: ["Usable address range", "Εύρος διαθέσιμων διευθύνσεων"],
    hosts: ["Usable addresses", "Διαθέσιμες διευθύνσεις"],
    prefix: ["CIDR prefix", "Πρόθεμα CIDR"],
    none: ["Not applicable", "Δεν εφαρμόζεται"],
    same: [
      "Both addresses are in the same subnet with this mask.",
      "Οι δύο διευθύνσεις βρίσκονται στο ίδιο υποδίκτυο με αυτή τη μάσκα.",
    ],
    different: [
      "These addresses are in different subnets with this mask. Communication would require appropriate routing.",
      "Οι διευθύνσεις βρίσκονται σε διαφορετικά υποδίκτυα με αυτή τη μάσκα. Για επικοινωνία χρειάζεται κατάλληλη δρομολόγηση.",
    ],
    duplicate: [
      "The addresses are identical. Two devices must not share the same IP on the same network.",
      "Οι διευθύνσεις είναι ίδιες. Δύο συσκευές δεν πρέπει να έχουν την ίδια IP στο ίδιο δίκτυο.",
    ],
    reserved: [
      "One of the entered addresses is a network or broadcast address, not a usable host address for this subnet.",
      "Μία από τις διευθύνσεις είναι διεύθυνση δικτύου ή broadcast και δεν είναι διαθέσιμη για συσκευή σε αυτό το υποδίκτυο.",
    ],
    p31: [
      "/31 is for point-to-point links: both addresses are endpoints, with no broadcast. It is not a typical printer LAN.",
      "Το /31 χρησιμοποιείται σε συνδέσεις μεταξύ δύο συσκευών. Και οι δύο διευθύνσεις μπορούν να χρησιμοποιηθούν, χωρίς διεύθυνση broadcast. Δεν είναι η συνηθισμένη επιλογή για δίκτυο με εκτυπωτές.",
    ],
    p32: [
      "/32 describes a single host route, with no broadcast or additional host addresses.",
      "Το /32 περιγράφει διαδρομή προς μία μόνο συσκευή, χωρίς broadcast ή πρόσθετες διευθύνσεις.",
    ],
    limit: [
      "This is subnet arithmetic, not a connectivity test. Matching subnets do not guarantee communication: VLANs, cabling, Wi-Fi isolation and firewalls also matter. The range does not show which IPs are free or suitable for your LAN.",
      "Το εργαλείο υπολογίζει διευθύνσεις· δεν ελέγχει αν οι συσκευές επικοινωνούν. Ακόμη κι αν βρίσκονται στο ίδιο υποδίκτυο, μπορεί να υπάρχει πρόβλημα με την καλωδίωση ή περιορισμός από VLAN, απομόνωση Wi-Fi ή firewall. Οι διευθύνσεις που εμφανίζονται δεν είναι απαραίτητα ελεύθερες ή κατάλληλες για χρήση στο δίκτυό σου.",
    ],
    copy: ["Copy summary", "Αντιγραφή σύνοψης"],
    copied: ["Summary copied.", "Η σύνοψη αντιγράφηκε."],
    fallback: ["Select and copy the summary below.", "Επίλεξε και αντέγραψε την παρακάτω σύνοψη."],
    ipError: [
      "Enter a valid IPv4 address without leading zeros, such as 192.168.1.20.",
      "Γράψε έγκυρη διεύθυνση IPv4 χωρίς αρχικά μηδενικά, π.χ. 192.168.1.20.",
    ],
    maskError: [
      "Enter a prefix from 0 to 32 or a contiguous subnet mask, such as 255.255.255.0.",
      "Γράψε πρόθεμα από 0 έως 32 ή συνεχόμενη μάσκα υποδικτύου, π.χ. 255.255.255.0.",
    ],
    test: ["Printer test sheet", "Σελίδα δοκιμαστικής εκτύπωσης"],
  };
  const t = (k) => strings[k][lang === "el" ? 1 : 0];
  function render() {
    document.documentElement.lang = lang;
    document.title = t("title") + " · Tsakioan";
    document.querySelectorAll("[data-t]").forEach((e) => (e.textContent = t(e.dataset.t)));
    $("language").textContent = lang === "en" ? "Ελληνικά" : "English";
    $("test-link").href = "print-test.html?lang=" + lang;
    document.querySelector("[data-t=back]").href = lang === "el" ? "el/" : "./";
    $("error").textContent = errorKey ? t(errorKey) : "";
    $("status").textContent = "";
    if (result) show();
  }
  function show() {
    const r = result;
    const rows = [
      [t("address"), r.address],
      [t("mask"), r.mask],
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
  function calculate() {
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
        $(id).focus();
        return;
      }
    }
    result = NetworkCalc.calculate($("address").value, $("mask").value, $("other").value);
    $("summary").hidden = true;
    $("status").textContent = "";
    show();
    $("results").scrollIntoView({ block: "start", behavior: "smooth" });
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
  $("language").onclick = () => {
    lang = lang === "en" ? "el" : "en";
    try {
      localStorage.setItem("tsakioan-language", lang);
    } catch {}
    const u = new URL(location.href);
    u.searchParams.set("lang", lang);
    history.replaceState(null, "", u);
    render();
  };
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
})();
