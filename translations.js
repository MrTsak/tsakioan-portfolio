// Greek text for the portfolio homepage.
// Keys are the English text in index.html, with runs of whitespace collapsed to one space.
// tools/build-greek.mjs uses this to write el/index.html; board.js uses it in the browser
// for the circuit-board captions.
(function (root) {
  const greek = {
    // Page title, search description and link preview (head of index.html)
    "Ioannis Tsakalidis · IT & Artificial Intelligence":
      "Ιωάννης Τσακαλίδης · Πληροφορική & Τεχνητή Νοημοσύνη",
    "Ioannis Tsakalidis — computer and network technician based in Larissa, Greece, studying Artificial Intelligence. Explore my background in IT support, networking and hardware.":
      "Ιωάννης Τσακαλίδης — τεχνικός υπολογιστών και δικτύων στη Λάρισα και φοιτητής Τεχνητής Νοημοσύνης. Εμπειρία σε τεχνική υποστήριξη, δίκτυα και υλικό.",
    "Computer and network technician in Larissa, Greece, studying Artificial Intelligence. IT support, networking and Xerox/Lexmark printer repair.":
      "Τεχνικός υπολογιστών και δικτύων στη Λάρισα, φοιτητής Τεχνητής Νοημοσύνης. Τεχνική υποστήριξη, δίκτυα και επισκευή εκτυπωτών Xerox και Lexmark.",
    "tsakioan — Hands-on IT. From diagnosis to repair. Ioannis Tsakalidis, Larissa, Greece.":
      "tsakioan — Πληροφορική στην πράξη. Από τη διάγνωση στην επισκευή. Ιωάννης Τσακαλίδης, Λάρισα.",
    // Page titles, search descriptions and link previews of the calculator and test sheet
    "IP & network calculator · Tsakioan": "Υπολογισμός IP και υποδικτύου · Tsakioan",
    "Calculate IPv4 subnet details and compare printer and computer addresses in English or Greek.":
      "Υπολόγισε τα στοιχεία ενός υποδικτύου IPv4 και σύγκρινε τις διευθύνσεις ενός υπολογιστή και ενός εκτυπωτή.",
    "Calculate IPv4 subnet details and check whether a computer and a printer are on the same subnet. Runs entirely in your browser.":
      "Υπολόγισε τα στοιχεία ενός υποδικτύου IPv4 και έλεγξε αν ένας υπολογιστής και ένας εκτυπωτής βρίσκονται στο ίδιο υποδίκτυο. Λειτουργεί εξ ολοκλήρου στον browser σου.",
    "Printer test sheet · Tsakioan": "Δοκιμαστική εκτύπωση · Tsakioan",
    "A low-coverage printer test sheet in English and Greek: print it in your browser or download the PDF.":
      "Δοκιμαστική σελίδα εκτύπωσης χαμηλής κάλυψης, στα Ελληνικά και στα Αγγλικά: εκτύπωσέ τη από τον browser ή κατέβασε το PDF.",
    // Page text
    "Tap a component to explore my work. Flip the power switch to bring the board to life.":
      "Πάτησε σε ένα από τα εξαρτήματα για να μάθεις περισσότερα για τη δουλειά μου. Με τον διακόπτη μπορείς να ανάψεις ή να σβήσεις την πλακέτα.",
    "My background spans networks and hardware support, and I’m studying Artificial Intelligence. Enable JavaScript to explore the board.":
      "Έχω εμπειρία σε δίκτυα και τεχνική υποστήριξη εξοπλισμού και σπουδάζω Τεχνητή Νοημοσύνη. Ενεργοποίησε τη JavaScript για να εξερευνήσεις την πλακέτα.",
    "CONTRACT ROLE": "ΣΥΜΒΑΣΗ ΕΡΓΑΣΙΑΣ",
    "IT Specialist": "Τεχνικός Πληροφορικής",
    "Larissa, Greece · April–July 2025": "Λάρισα, Ελλάδα · Απρίλιος–Ιούλιος 2025",
    "Provided onsite and remote support for computers, printers and networks, including troubleshooting, maintenance and software setup.":
      "Υποστήριζα υπολογιστές, εκτυπωτές και δίκτυα, στον χώρο του πελάτη και απομακρυσμένα. Αντιμετώπιζα βλάβες και αναλάμβανα συντηρήσεις και εγκαταστάσεις λογισμικού.",
    "Installed and terminated UTP and RJ-45 network cabling and configured small-office systems.":
      "Εγκαθιστούσα καλωδίωση UTP, έκανα τερματισμούς RJ-45 και ρύθμιζα συστήματα σε μικρά γραφεία.",
    "Assisted with equipment preparation and installation for public-sector projects, including Syzefxis II.":
      "Συμμετείχα στην προετοιμασία και εγκατάσταση εξοπλισμού για έργα του Δημοσίου, όπως το ΣΥΖΕΥΞΙΣ II.",
    "IT support": "Τεχνική υποστήριξη",
    "Syzefxis II": "ΣΥΖΕΥΞΙΣ II",
    INTERNSHIP: "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ",
    "Computer Technical Specialist": "Τεχνικός Υπολογιστών",
    "Region of Thessaly": "Περιφέρεια Θεσσαλίας",
    "Larissa, Greece · November 2022–August 2023": "Λάρισα, Ελλάδα · Νοέμβριος 2022–Αύγουστος 2023",
    "Supported daily IT operations across departments and helped employees resolve computer and software issues.":
      "Στην πρακτική μου, βοηθούσα τους υπαλλήλους διαφόρων τμημάτων να λύσουν καθημερινά προβλήματα με τους υπολογιστές και τα προγράμματά τους.",
    "Created reports and proposed improvements to local network and hardware infrastructure.":
      "Συνέτασσα αναφορές και πρότεινα βελτιώσεις στο τοπικό δίκτυο και στον εξοπλισμό.",
    "User support": "Υποστήριξη χρηστών",
    "Hardware & networks": "Εξοπλισμός & δίκτυα",
    "Install, maintain and repair Xerox and Lexmark printers and multifunction devices onsite, in the workshop and remotely.":
      "Αναλαμβάνω την εγκατάσταση, συντήρηση και επισκευή εκτυπωτών και πολυμηχανημάτων Xerox και Lexmark. Εργάζομαι στον χώρο του πελάτη και στο εργαστήριο και παρέχω απομακρυσμένη υποστήριξη.",
    "Diagnose faults, repair or replace components, then reassemble, configure and test equipment.":
      "Εντοπίζω βλάβες, επισκευάζω ή αντικαθιστώ εξαρτήματα και ελέγχω ότι ο εξοπλισμός λειτουργεί σωστά μετά την επισκευή.",
    "Install drivers, operating systems and applications, and follow up on repairs to check reliability.":
      "Εγκαθιστώ drivers, λειτουργικά συστήματα και εφαρμογές και παρακολουθώ τη λειτουργία του εξοπλισμού μετά την επισκευή.",
    "I’m Ioannis Tsakalidis, a computer and network technician based in Larissa. My experience spans IT support, networking, and servicing Xerox and Lexmark printing equipment. Alongside my work, I’m studying Artificial Intelligence.":
      "Είμαι ο Ιωάννης Τσακαλίδης, τεχνικός υπολογιστών και δικτύων στη Λάρισα. Εργάζομαι στην COPYPRINT, όπου ασχολούμαι με την υποστήριξη, τη συντήρηση και την επισκευή εκτυπωτών Xerox και Lexmark. Παράλληλα σπουδάζω Τεχνητή Νοημοσύνη.",
    "From diagnosis": "Από τη διάγνωση",
    "to repair.": "στην επισκευή.",
    "CURRENT ROLE": "ΣΗΜΕΡΑ",
    "Technical Services": "Εκπρόσωπος",
    Representative: "Τεχνικών Υπηρεσιών",
    "Larissa, Greece · July 2025–Present": "Λάρισα, Ελλάδα · Ιούλιος 2025–Σήμερα",
    "Technical training and certifications in the repair of printing and document-management equipment.":
      "Έχω παρακολουθήσει τεχνικές εκπαιδεύσεις και έχω λάβει πιστοποιήσεις για την επισκευή εκτυπωτών, πολυμηχανημάτων και εξοπλισμού διαχείρισης εγγράφων.",
    "Diagnostics & repair": "Διάγνωση & επισκευή",
    "Onsite & remote support": "Επιτόπια & απομακρυσμένη υποστήριξη",
    "Skip to content": "Μετάβαση στο περιεχόμενο",
    About: "Σχετικά με εμένα",
    Experience: "Εμπειρία",
    "Let’s connect": "Επικοινωνία",
    "IOANNIS TSAKALIDIS": "ΙΩΑΝΝΗΣ ΤΣΑΚΑΛΙΔΗΣ",
    "LARISSA, GREECE": "ΛΑΡΙΣΑ, ΕΛΛΑΔΑ",
    "Hands-on IT.": "Πληροφορική στην πράξη.",
    "A mind for": "Με το βλέμμα",
    "what’s next.": "στο αύριο.",
    "Computer & network technician.": "Τεχνικός υπολογιστών και δικτύων.",
    "Artificial Intelligence student.": "Φοιτητής Τεχνητής Νοημοσύνης.",
    "I like understanding how things work—and making them work better.":
      "Μου αρέσει να καταλαβαίνω πώς λειτουργούν τα πράγματα και να τα κάνω να λειτουργούν καλύτερα.",
    "Explore my background": "Δες την εμπειρία μου",
    "THE HANDS-ON SIDE": "Η ΔΟΥΛΕΙΑ ΜΟΥ",
    Power: "Ρεύμα",
    on: "ON",
    off: "OFF",
    Printers: "Εκτυπωτές",
    Networks: "Δίκτυα",
    Hardware: "Εξοπλισμός",
    "AI & learning": "Σπουδές & AI",
    "Built on curiosity.": "Δες με τι ασχολούμαι.",
    "Tap a component to explore my work. Try the power switch to see the board come to life.":
      "Πάτησε σε ένα από τα εξαρτήματα για να μάθεις περισσότερα για τη δουλειά μου. Με τον διακόπτη μπορείς να ανάψεις ή να σβήσεις την πλακέτα.",
    "Networks that connect.": "Εγκατάσταση και υποστήριξη δικτύων.",
    "Structured cabling, system setup, troubleshooting, and fault restoration—including work on Syzefxis II.":
      "Δομημένη καλωδίωση, εγκατάσταση συστημάτων, διάγνωση και αποκατάσταση βλαβών, με συμμετοχή και στο έργο ΣΥΖΕΥΞΙΣ II.",
    "Hands-on with hardware.": "Υπολογιστές και εκτυπωτές.",
    "Computer support, hardware maintenance, and printer repair, backed by my Xerox printer certification.":
      "Ασχολούμαι με την υποστήριξη υπολογιστών, τη συντήρηση εξοπλισμού και την επισκευή εκτυπωτών. Έχω πιστοποίηση για εκτυπωτές Xerox.",
    "Still learning. Always curious.": "Συνεχίζω να μαθαίνω.",
    "I’m studying Artificial Intelligence at Aegean College and exploring how programming and automation can support everyday IT work.":
      "Σπουδάζω Τεχνητή Νοημοσύνη στο Aegean College. Με ενδιαφέρει πώς ο προγραμματισμός και οι αυτοματισμοί μπορούν να με βοηθήσουν στην καθημερινή δουλειά μου.",
    "Power is off.": "Η πλακέτα είναι σβηστή.",
    "Flip the power switch to light the traces and explore the components.":
      "Πάτησε τον διακόπτη για να ανάψεις την πλακέτα και να επιλέξεις ένα εξάρτημα.",
    "Technical support": "Τεχνική υποστήριξη",
    "Computer networks": "Δίκτυα υπολογιστών",
    "Hardware maintenance": "Συντήρηση εξοπλισμού",
    "Artificial intelligence": "Τεχνητή νοημοσύνη",
    "THE PERSON BEHIND THE HANDLE": "ΛΙΓΑ ΛΟΓΙΑ ΓΙΑ ΕΜΕΝΑ",
    "Curiosity meets": "Μου αρέσει να βρίσκω",
    "practical experience.": "πώς λύνεται ένα πρόβλημα.",
    "I’m Ioannis, a computer and network technician based in Larissa, Greece. My background is hands-on: technical support, hardware maintenance, printer repair, and getting networks up and running.":
      "Στη δουλειά μου ασχολούμαι με υπολογιστές, εκτυπωτές και δίκτυα: από την εγκατάσταση και τη συντήρηση μέχρι τον εντοπισμό και την επισκευή μιας βλάβης.",
    "I’m also pursuing a BSc in Artificial Intelligence at Aegean College, developing my understanding of programming, automation, and intelligent systems. I want to bring those two worlds together: real technical problems and thoughtful ways to solve them.":
      "Στο Aegean College σπουδάζω Τεχνητή Νοημοσύνη και μαθαίνω περισσότερα για τον προγραμματισμό και τους αυτοματισμούς. Θέλω να αξιοποιήσω αυτές τις γνώσεις σε προβλήματα που συναντώ στη δουλειά μου.",
    "For me, good technical work also means communicating clearly with the people who depend on it.":
      "Θεωρώ σημαντικό να εξηγώ με απλά λόγια ποιο είναι το πρόβλημα, τι χρειάζεται να γίνει και πώς μπορεί να αποφευχθεί στο μέλλον.",
    "WHERE I’VE PUT IT INTO PRACTICE": "ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΕΜΠΕΙΡΙΑ",
    "A foundation in": "Πού έχω",
    "the real world.": "εργαστεί.",
    "From cabling and system setup to diagnosis and repair, my experience starts with making technology reliable.":
      "Η εμπειρία μου περιλαμβάνει τεχνική υποστήριξη, εγκαταστάσεις δικτύων και επισκευές εξοπλισμού.",
    NETWORKING: "ΔΙΚΤΥΑ",
    "Connecting systems.": "Εγκατάσταση δικτύων.",
    "Restoring service.": "Αποκατάσταση βλαβών.",
    "I’ve contributed to networking projects in the private and public sectors, including Syzefxis II. My work has included structured cabling, system setup, troubleshooting, and fault restoration.":
      "Έχω συμμετάσχει σε έργα δικτύων στον ιδιωτικό και τον δημόσιο τομέα, μεταξύ αυτών και το ΣΥΖΕΥΞΙΣ II. Η δουλειά μου περιλαμβάνει δομημένη καλωδίωση, εγκατάσταση συστημάτων, διάγνωση και αποκατάσταση βλαβών.",
    "Structured cabling": "Δομημένη καλωδίωση",
    "System setup": "Εγκατάσταση συστημάτων",
    Troubleshooting: "Διάγνωση βλαβών",
    "TECHNICAL SUPPORT": "ΤΕΧΝΙΚΗ ΥΠΟΣΤΗΡΙΞΗ",
    "Understanding the fault.": "Εντοπισμός βλάβης.",
    "Finding the fix.": "Επισκευή και έλεγχος.",
    "My technical background covers computer support, hardware maintenance, and printer repair. As a Xerox-certified printer specialist, I bring practical equipment knowledge to diagnosis and support.":
      "Έχω εμπειρία στην υποστήριξη υπολογιστών, τη συντήρηση εξοπλισμού και την επισκευή εκτυπωτών, καθώς και πιστοποίηση για εκτυπωτές Xerox.",
    "Computer hardware": "Εξοπλισμός υπολογιστών",
    "Printer repair": "Επισκευή εκτυπωτών",
    "Client communication": "Επικοινωνία με πελάτες",
    "THE NEXT CHAPTER": "ΣΠΟΥΔΕΣ",
    "From maintaining systems": "Μαθαίνω περισσότερα",
    "to making them": "για την Τεχνητή",
    "smarter.": "Νοημοσύνη.",
    "I’m studying Artificial Intelligence at Aegean College, with a growing interest in how programming and automation can make everyday IT work more efficient.":
      "Σπουδάζω Τεχνητή Νοημοσύνη στο Aegean College. Με ενδιαφέρει ιδιαίτερα πώς ο προγραμματισμός και οι αυτοματισμοί μπορούν να διευκολύνουν την καθημερινή τεχνική υποστήριξη.",
    "BSc Artificial Intelligence": "BSc Τεχνητή Νοημοσύνη",
    "Aegean College · In progress": "Aegean College · Σε εξέλιξη",
    "KEEP THE CONVERSATION GOING": "ΑΣ ΜΙΛΗΣΟΥΜΕ",
    "Let’s talk": "Θέλεις να",
    "technology.": "μιλήσουμε;",
    "Let’s connect about IT support, networking, or an opportunity to work together.":
      "Για θέματα τεχνικής υποστήριξης, δικτύων ή για μια πιθανή συνεργασία, μπορείς να επικοινωνήσεις μαζί μου.",
    "Send me an email or find me on LinkedIn.": "Στείλε μου email ή βρες με στο LinkedIn.",
    "Email me": "Στείλε email",
    "Connect on LinkedIn": "Βρες με στο LinkedIn",
    "(opens in a new tab)": "(ανοίγει σε νέα καρτέλα)",
    "Ioannis Tsakalidis": "Ιωάννης Τσακαλίδης",
    "Back to top": "Επιστροφή στην αρχή",
    "Privacy policy": "Πολιτική απορρήτου (στα Αγγλικά)",
    "Tsakioan home": "Tsakioan — Αρχική",
    "Main navigation": "Κύρια πλοήγηση",
    "Interactive circuit board": "Διαδραστική πλακέτα",
    "Circuit board power": "Τροφοδοσία πλακέτας",
    "Networking skills": "Δεξιότητες δικτύων",
    "Technical support skills": "Δεξιότητες τεχνικής υποστήριξης",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = greek;
  else root.tsakGreek = greek;
})(typeof window !== "undefined" ? window : globalThis);
