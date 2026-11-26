// Greek text for the portfolio homepage.
// Keys are the English text in index.html, with runs of whitespace collapsed to one space.
// tools/build-greek.mjs uses this to write el/index.html; board.js uses it in the browser
// for the circuit-board captions.
(function (root) {
  const greek = {
    // Page title, search description and link preview (head of index.html)
    "Ioannis Tsakalidis · IT & Artificial Intelligence":
      "Ιωάννης Τσακαλίδης | Τεχνικός Υπολογιστών και Δικτύων",
    "Ioannis Tsakalidis — computer and network technician based in Larissa, Greece, studying Artificial Intelligence. Explore my background in IT support, networking and hardware.":
      "Ιωάννης Τσακαλίδης — τεχνικός υπολογιστών και δικτύων στη Λάρισα και φοιτητής Τεχνητής Νοημοσύνης. Εξερεύνησε την εμπειρία μου σε τεχνική υποστήριξη, δίκτυα και υλικό.",
    "Computer and network technician in Larissa, Greece, studying Artificial Intelligence. IT support, networking and Xerox/Lexmark printer repair.":
      "Τεχνικός υπολογιστών και δικτύων στη Λάρισα, φοιτητής Τεχνητής Νοημοσύνης. Τεχνική υποστήριξη, δίκτυα και επισκευή εκτυπωτών Xerox και Lexmark.",
    "tsakioan — Hands-on IT. From diagnosis to repair. Ioannis Tsakalidis, Larissa, Greece.":
      "tsakioan — Τεχνική υποστήριξη, δίκτυα και επισκευές. Ιωάννης Τσακαλίδης, Λάρισα.",
    // Page titles, search descriptions and link previews of the calculator and test sheet
    "IP & network calculator · Tsakioan": "Υπολογιστής IP και υποδικτύου · Tsakioan",
    "Calculate IPv4 subnet details and compare printer and computer addresses in English or Greek.":
      "Υπολόγισε τα στοιχεία ενός υποδικτύου IPv4 και σύγκρινε τις διευθύνσεις ενός υπολογιστή και ενός εκτυπωτή, στα ελληνικά ή στα αγγλικά.",
    "Calculate IPv4 subnet details and check whether a computer and a printer are on the same subnet. Runs entirely in your browser.":
      "Υπολόγισε τα στοιχεία ενός υποδικτύου IPv4 και έλεγξε αν ένας υπολογιστής και ένας εκτυπωτής βρίσκονται στο ίδιο υποδίκτυο. Λειτουργεί εξ ολοκλήρου στον browser σου.",
    "Printer test sheet · Tsakioan": "Δοκιμαστική σελίδα εκτύπωσης · Tsakioan",
    "A low-coverage printer test sheet in English and Greek: print it in your browser or download the PDF.":
      "Δοκιμαστική σελίδα εκτύπωσης χαμηλής κάλυψης, στα ελληνικά και στα αγγλικά: εκτύπωσέ τη από τον περιηγητή σου ή κατέβασε το PDF.",
    // Page text
    "Tap a component to explore my work. Flip the power switch to bring the board to life.":
      "Επίλεξε ένα εξάρτημα για να δεις περισσότερα για τη δουλειά μου. Με τον διακόπτη μπορείς να ανάψεις ή να σβήσεις την πλακέτα.",
    "My background spans networks and hardware support, and I’m studying Artificial Intelligence. Enable JavaScript to explore the board.":
      "Έχω εμπειρία σε δίκτυα και τεχνική υποστήριξη εξοπλισμού και σπουδάζω Τεχνητή Νοημοσύνη. Ενεργοποίησε τη JavaScript για να εξερευνήσεις την πλακέτα.",
    "CONTRACT ROLE": "ΠΡΟΗΓΟΥΜΕΝΗ ΘΕΣΗ",
    "IT Specialist": "Τεχνικός Πληροφορικής",
    "Larissa, Greece · April–July 2025": "Λάρισα, Ελλάδα · Απρίλιος–Ιούλιος 2025",
    "Provided onsite and remote support for computers, printers and networks, including troubleshooting, maintenance and software setup.":
      "Παρείχα τεχνική υποστήριξη για υπολογιστές, εκτυπωτές και δίκτυα, στον χώρο του πελάτη και εξ αποστάσεως. Αντιμετώπιζα βλάβες και αναλάμβανα εργασίες συντήρησης και εγκατάστασης λογισμικού.",
    "Installed and terminated UTP and RJ-45 network cabling and configured small-office systems.":
      "Εγκαθιστούσα καλωδίωση UTP, πραγματοποιούσα τερματισμούς RJ-45 και ρύθμιζα συστήματα για μικρά γραφεία.",
    "Assisted with equipment preparation and installation for public-sector projects, including Syzefxis II.":
      "Συμμετείχα στην προετοιμασία και εγκατάσταση εξοπλισμού για έργα του Δημοσίου, όπως το ΣΥΖΕΥΞΙΣ II.",
    "IT support": "Τεχνική υποστήριξη",
    "Syzefxis II": "ΣΥΖΕΥΞΙΣ II",
    INTERNSHIP: "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ",
    "Computer & Network Technician Intern": "Τεχνικός Υπολογιστών και Δικτύων — Πρακτική άσκηση",
    "Region of Thessaly": "Περιφέρεια Θεσσαλίας",
    "Larissa, Greece · November 2022–August 2023": "Λάρισα, Ελλάδα · Νοέμβριος 2022–Αύγουστος 2023",
    "Supported daily IT operations across departments and helped employees resolve computer and software issues.":
      "Υποστήριζα τους υπαλλήλους διαφόρων τμημάτων σε προβλήματα με υπολογιστές και λογισμικό και βοηθούσα στην καθημερινή λειτουργία του εξοπλισμού.",
    "Created reports and proposed improvements to local network and hardware infrastructure.":
      "Συνέτασσα αναφορές και πρότεινα βελτιώσεις για το τοπικό δίκτυο και τον εξοπλισμό.",
    "User support": "Υποστήριξη χρηστών",
    "Hardware & networks": "Εξοπλισμός & δίκτυα",
    "Install, maintain and repair Xerox and Lexmark printers and multifunction devices onsite, in the workshop and remotely.":
      "Εγκαθιστώ, συντηρώ και επισκευάζω εκτυπωτές και πολυμηχανήματα Xerox και Lexmark, στον χώρο του πελάτη και στο εργαστήριο. Παρέχω επίσης απομακρυσμένη τεχνική υποστήριξη.",
    "Diagnose faults, repair or replace components, then reassemble, configure and test equipment.":
      "Εντοπίζω βλάβες, επισκευάζω ή αντικαθιστώ εξαρτήματα και ελέγχω τη σωστή λειτουργία του εξοπλισμού μετά την επισκευή.",
    "Install drivers, operating systems and applications, and follow up on repairs to check reliability.":
      "Εγκαθιστώ προγράμματα οδήγησης, λειτουργικά συστήματα και εφαρμογές και παρακολουθώ την πορεία των επισκευών.",
    "I’m Ioannis Tsakalidis, a computer and network technician based in Larissa. My experience spans IT support, networking, and servicing Xerox and Lexmark printing equipment. Alongside my work, I’m studying Artificial Intelligence.":
      "Είμαι ο Ιωάννης Τσακαλίδης, τεχνικός υπολογιστών και δικτύων στη Λάρισα. Ασχολούμαι με την τεχνική υποστήριξη, την εγκατάσταση δικτύων και τη συντήρηση και επισκευή εκτυπωτών Xerox και Lexmark. Παράλληλα, σπουδάζω Πληροφορική με κατεύθυνση την Τεχνητή Νοημοσύνη.",
    "From diagnosis": "δίκτυα",
    "to repair.": "και επισκευές.",
    "CURRENT ROLE": "ΤΩΡΙΝΗ ΘΕΣΗ",
    "Technical Services": "Εκπρόσωπος",
    Representative: "Τεχνικών Υπηρεσιών",
    "Larissa, Greece · July 2025–Present": "Λάρισα, Ελλάδα · Ιούλιος 2025–Σήμερα",
    "Completed official service training from Xerox and Lexmark, covering multiple printer and multifunction models.":
      "Έχω ολοκληρώσει επίσημη τεχνική εκπαίδευση από τη Xerox και τη Lexmark για τη συντήρηση και επισκευή διαφορετικών μοντέλων εκτυπωτών και πολυμηχανημάτων.",
    "Diagnostics & repair": "Διάγνωση & επισκευή",
    "Onsite & remote support": "Επιτόπια & απομακρυσμένη υποστήριξη",
    "Skip to content": "Μετάβαση στο περιεχόμενο",
    About: "Σχετικά με εμένα",
    Experience: "Εμπειρία",
    Tools: "Εργαλεία",
    "Let’s connect": "Επικοινωνία",
    "IOANNIS TSAKALIDIS": "ΙΩΑΝΝΗΣ ΤΣΑΚΑΛΙΔΗΣ",
    "LARISSA, GREECE": "ΛΑΡΙΣΑ, ΕΛΛΑΔΑ",
    "Hands-on IT.": "Τεχνική υποστήριξη,",
    "A mind for": "Με το βλέμμα",
    "what’s next.": "στο μέλλον.",
    "Computer & network technician.": "Τεχνικός υπολογιστών και δικτύων.",
    "Artificial Intelligence student.": "Φοιτητής Τεχνητής Νοημοσύνης.",
    "I like understanding how things work—and making them work better.":
      "Μου αρέσει να καταλαβαίνω πώς λειτουργούν τα πράγματα και να τα κάνω να λειτουργούν καλύτερα.",
    "Explore my background": "Δες την εμπειρία μου",
    "THE HANDS-ON SIDE": "ΓΝΩΡΙΣΕ ΤΗ ΔΟΥΛΕΙΑ ΜΟΥ",
    Power: "Ρεύμα",
    on: "ON",
    off: "OFF",
    Printers: "Εκτυπωτές",
    Networks: "Δίκτυα",
    Hardware: "Εξοπλισμός",
    "AI & learning": "Τεχνητή νοημοσύνη",
    "Built on curiosity.": "Δες με τι ασχολούμαι.",
    "Tap a component to explore my work. Try the power switch to see the board come to life.":
      "Επίλεξε ένα εξάρτημα για να δεις περισσότερα για τη δουλειά μου. Με τον διακόπτη μπορείς να ανάψεις ή να σβήσεις την πλακέτα.",
    "Networks that connect.": "Εγκατάσταση και υποστήριξη δικτύων",
    "Structured cabling, system setup, troubleshooting, and fault restoration—including work on Syzefxis II.":
      "Έχω εμπειρία στη δομημένη καλωδίωση, στην εγκατάσταση και ρύθμιση συστημάτων και στην αποκατάσταση βλαβών δικτύου. Έχω επίσης συμμετάσχει στο έργο ΣΥΖΕΥΞΙΣ II.",
    "Hands-on with hardware.": "Συντήρηση και επισκευή εξοπλισμού",
    "Computer support, hardware maintenance, and printer repair, backed by official Xerox and Lexmark service training.":
      "Ασχολούμαι με την υποστήριξη υπολογιστών και τη συντήρηση και επισκευή εκτυπωτών. Έχω ολοκληρώσει επίσημη τεχνική εκπαίδευση από τη Xerox και τη Lexmark.",
    "Still learning. Always curious.": "Σπουδές και νέες δεξιότητες",
    "I’m studying Artificial Intelligence at Aegean College and exploring how programming and automation can support everyday IT work.":
      "Σπουδάζω Πληροφορική με κατεύθυνση την Τεχνητή Νοημοσύνη στο Aegean College. Με ενδιαφέρει πώς ο προγραμματισμός και οι αυτοματισμοί μπορούν να βοηθήσουν στην καθημερινή τεχνική υποστήριξη.",
    "Power is off.": "Η πλακέτα είναι σβηστή.",
    "Flip the power switch to light the traces and explore the components.":
      "Πάτησε τον διακόπτη για να ανάψεις την πλακέτα και να επιλέξεις ένα εξάρτημα.",
    "Technical support": "Τεχνική υποστήριξη",
    "Computer networks": "Δίκτυα υπολογιστών",
    "Hardware maintenance": "Συντήρηση εξοπλισμού",
    "Artificial intelligence": "Τεχνητή νοημοσύνη",
    "A FEW WORDS ABOUT ME": "ΛΙΓΑ ΛΟΓΙΑ ΓΙΑ ΕΜΕΝΑ",
    "Curiosity meets": "Πώς δουλεύω",
    "practical experience.": "και τι μαθαίνω.",
    "I’m Ioannis, a computer and network technician based in Larissa, Greece. My background is hands-on: technical support, hardware maintenance, printer repair, and getting networks up and running.":
      "Μου αρέσει να εντοπίζω την αιτία ενός προβλήματος και να βρίσκω μια λύση που λειτουργεί στην πράξη. Η δουλειά μου περιλαμβάνει υποστήριξη χρηστών, συντήρηση εξοπλισμού, επισκευές εκτυπωτών και εγκαταστάσεις δικτύων.",
    "I’m also pursuing a BSc (Hons) in Computing (Artificial Intelligence) from the University of Essex, delivered at Aegean College, developing my understanding of programming, automation, and intelligent systems. I want to bring those two worlds together: real technical problems and thoughtful ways to solve them.":
      "Παράλληλα, παρακολουθώ το πρόγραμμα BSc (Hons) Computing με κατεύθυνση την Τεχνητή Νοημοσύνη του University of Essex, στο Aegean College. Με ενδιαφέρει να αξιοποιώ τον προγραμματισμό και τους αυτοματισμούς για να λύνω καθημερινά προβλήματα της δουλειάς μου.",
    "For me, good technical work also means communicating clearly with the people who depend on it.":
      "Θεωρώ σημαντικό να εξηγώ καθαρά τι πρόβλημα υπάρχει, τι χρειάζεται να γίνει και πώς μπορεί να αποφευχθεί στο μέλλον.",
    "WHERE I’VE PUT IT INTO PRACTICE": "",
    "A foundation in": "Η επαγγελματική",
    "the real world.": "μου εμπειρία",
    "From cabling and system setup to diagnosis and repair, my experience starts with making technology reliable.":
      "Έχω εργαστεί στην υποστήριξη χρηστών, στην εγκατάσταση δικτύων και στη συντήρηση και επισκευή εξοπλισμού, τόσο στον χώρο του πελάτη όσο και στο εργαστήριο.",
    NETWORKING: "ΔΙΚΤΥΑ",
    "Connecting systems.": "Σύνδεση συστημάτων.",
    "Restoring service.": "Αποκατάσταση λειτουργίας.",
    "I’ve contributed to networking projects in the private and public sectors, including Syzefxis II. My work has included structured cabling, system setup, troubleshooting, and fault restoration.":
      "Έχω συμμετάσχει σε έργα δικτύων στον ιδιωτικό και τον δημόσιο τομέα, μεταξύ αυτών και το ΣΥΖΕΥΞΙΣ II. Η δουλειά μου περιλαμβάνει δομημένη καλωδίωση, εγκατάσταση συστημάτων, διάγνωση και αποκατάσταση βλαβών.",
    "Structured cabling": "Δομημένη καλωδίωση",
    "System setup": "Εγκατάσταση συστημάτων",
    Troubleshooting: "Διάγνωση βλαβών",
    "TECHNICAL SUPPORT": "ΤΕΧΝΙΚΗ ΥΠΟΣΤΗΡΙΞΗ",
    "Understanding the fault.": "Κατανόηση της βλάβης.",
    "Finding the fix.": "Εύρεση της λύσης.",
    "Computer hardware": "Εξοπλισμός υπολογιστών",
    "Printer repair": "Επισκευή εκτυπωτών",
    "Client communication": "Επικοινωνία με πελάτες",
    "THE NEXT CHAPTER": "ΣΠΟΥΔΕΣ ΚΑΙ ΕΝΔΙΑΦΕΡΟΝΤΑ",
    "From maintaining systems": "Προγραμματισμός,",
    "to making them": "αυτοματισμοί και",
    "smarter.": "τεχνητή νοημοσύνη",
    "I’m studying Artificial Intelligence at Aegean College, with a growing interest in how programming and automation can make everyday IT work more efficient.":
      "Μέσα από τις σπουδές μου στο Aegean College, μαθαίνω περισσότερα για τον προγραμματισμό και την τεχνητή νοημοσύνη. Με ενδιαφέρουν ιδιαίτερα οι εφαρμογές τους στην τεχνική υποστήριξη και στην αυτοματοποίηση καθημερινών εργασιών.",
    "BSc (Hons) Computing (AI)": "BSc (Hons) Computing (Τεχνητή Νοημοσύνη)",
    "University of Essex · Aegean College · In progress":
      "University of Essex · Aegean College · Σε εξέλιξη",
    "Project: Diabetes Data Analysis": "Έργο: Ανάλυση δεδομένων διαβήτη",
    "An educational machine-learning project with an initial set of 100,000 records. Explore the data, compare two models and see how their estimates change with different input values.":
      "Εκπαιδευτικό έργο μηχανικής μάθησης με αρχικό σύνολο 100.000 εγγραφών. Δες τα δεδομένα, σύγκρινε δύο μοντέλα και δοκίμασε πώς αλλάζουν οι εκτιμήσεις τους με διαφορετικές τιμές εισόδου.",
    "Open the project": "Δες το έργο",
    "FROM MY EVERYDAY WORK": "ΑΠΟ ΤΗΝ ΚΑΘΗΜΕΡΙΝΗ ΜΟΥ ΔΟΥΛΕΙΑ",
    "Useful tools": "Χρήσιμα εργαλεία",
    "Free to use in your browser, on any computer.": "Δωρεάν, στον browser σου, από οποιονδήποτε υπολογιστή.",
    "Printer test sheet": "Δοκιμαστική σελίδα εκτύπωσης",
    "Check text clarity, fine lines and grayscale.": "Έλεγξε την ευκρίνεια του κειμένου, τις λεπτές γραμμές και τις διαβαθμίσεις του γκρι.",
    "IP & subnet calculator": "Υπολογιστής IP και υποδικτύου",
    "Calculate network details and check whether two addresses share a subnet.":
      "Υπολόγισε τα στοιχεία ενός δικτύου και έλεγξε αν δύο διευθύνσεις ανήκουν στο ίδιο υποδίκτυο.",
    "Download CV (PDF)": "Κατέβασε το βιογραφικό μου (PDF)",
    "KEEP THE CONVERSATION GOING": "ΑΣ ΜΙΛΗΣΟΥΜΕ",
    "Let’s talk": "Επικοινωνία",
    "technology.": "",
    "Let’s connect about IT support, networking, or an opportunity to work together.":
      "Αν θέλεις να συζητήσουμε για τεχνική υποστήριξη, δίκτυα ή μια επαγγελματική ευκαιρία,",
    "Send me an email or find me on LinkedIn.": "στείλε μου email ή βρες με στο LinkedIn.",
    "Email me": "Στείλε μου email",
    "Connect on LinkedIn": "Βρες με στο LinkedIn",
    "(opens in a new tab)": "(ανοίγει σε νέα καρτέλα)",
    "Ioannis Tsakalidis": "Ιωάννης Τσακαλίδης",
    "Back to top": "Επιστροφή στην αρχή",
    "Privacy policy": "Πολιτική απορρήτου",
    "Tsakioan home": "Tsakioan — Αρχική",
    "Main navigation": "Κύρια πλοήγηση",
    "Interactive circuit board": "Διαδραστική πλακέτα",
    "Circuit board power": "Τροφοδοσία πλακέτας",
    "Networking skills": "Εμπειρία στα δίκτυα",
    "Technical support skills": "Εμπειρία στην τεχνική υποστήριξη",
    "Fine line sample": "Δείγμα λεπτών γραμμών",
    "Grid sample": "Δείγμα πλέγματος",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = greek;
  else root.tsakGreek = greek;
})(typeof window !== "undefined" ? window : globalThis);
