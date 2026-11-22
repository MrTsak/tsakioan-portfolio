(() => {
  const board = document.querySelector('.pcb');
  const power = document.querySelector('.pcb-power');
  const detail = document.querySelector('.pcb-detail');
  const parts = [...document.querySelectorAll('.pcb-part')];
  const content = {
    network: ['Networks that connect.', 'Structured cabling, system setup, troubleshooting, and fault restoration—including work on Syzefxis II.'],
    hardware: ['Hands-on with hardware.', 'Computer support, hardware maintenance, and printer repair, backed by my Xerox printer certification.'],
    ai: ['Still learning. Always curious.', 'I’m studying Artificial Intelligence at Aegean College and exploring how programming and automation can support everyday IT work.']
  };
  const demo = document.querySelector('.pcb-demo');
  const run = demo.querySelector('.demo-run');
  const copy = {
    label: ['INTERACTIVE DEMO', 'ΔΙΑΔΡΑΣΤΙΚΟ DEMO'],
    note: ['Simulation only — no access to your devices or network.', 'Προσομοίωση — χωρίς πρόσβαση στις συσκευές ή στο δίκτυό σου.'],
    networkReady: ['Follow a connection from cable to gateway.', 'Ακολούθησε τη σύνδεση από το καλώδιο μέχρι την πύλη.'],
    hardwareReady: ['Watch a test page move through the printer.', 'Δες μια δοκιμαστική σελίδα να περνά από τον εκτυπωτή.'],
    networkRun: ['Run network check', 'Έλεγχος δικτύου'],
    hardwareRun: ['Run print demo', 'Προσομοίωση εκτύπωσης'],
    running: ['Running…', 'Σε εξέλιξη…'],
    again: ['Run again', 'Επανάληψη'],
    network0: ['01 · Checking the physical link…', '01 · Έλεγχος φυσικής σύνδεσης…'],
    network1: ['02 · Link established. Assigning an IP address…', '02 · Η σύνδεση έγινε. Εκχώρηση διεύθυνσης IP…'],
    network2: ['03 · Gateway reachable. Connection ready.', '03 · Η πύλη αποκρίνεται. Η σύνδεση είναι έτοιμη.'],
    hardware0: ['01 · Sending the job to the print queue…', '01 · Αποστολή στην ουρά εκτύπωσης…'],
    hardware1: ['02 · Feeding paper. Printing the test pattern…', '02 · Τροφοδοσία χαρτιού. Εκτύπωση δοκιμαστικού μοτίβου…'],
    hardware2: ['03 · Test page complete. Ready for inspection.', '03 · Η σελίδα εκτυπώθηκε. Έτοιμη για έλεγχο.']
  };
  const t = key => copy[key][document.documentElement.lang === 'el' ? 1 : 0];
  let selected = null;
  let step = -1;
  let timer;
  function resetDemo() { clearTimeout(timer); step = -1; }
  function renderDemo(on) {
    const available = on && (selected === 'network' || selected === 'hardware');
    demo.hidden = !available;
    board.dataset.activity = available && step >= 0 && step < 2 ? selected : '';
    if (!available) return;
    const printLink = demo.querySelector('.demo-print-link');
    printLink.hidden = selected !== 'hardware';
    printLink.textContent = document.documentElement.lang === 'el' ? 'Πραγματική δοκιμή; Άνοιξε τη σελίδα εκτύπωσης →' : 'Try your own printer: open the test sheet →';
    printLink.href = 'print-test.html?lang=' + document.documentElement.lang;
    const helpLink = demo.querySelector('.demo-help-link');
    helpLink.hidden = selected !== 'hardware';
    helpLink.textContent = document.documentElement.lang === 'el' ? 'Βοήθεια με τον εκτυπωτή; Ξεκίνα τους ελέγχους →' : 'Printer trouble? Start the guided checks →';
    helpLink.href = 'printer-help.html?lang=' + document.documentElement.lang;
    const reportLink = demo.querySelector('.demo-report-link');
    reportLink.hidden = selected !== 'hardware';
    reportLink.textContent = document.documentElement.lang === 'el' ? 'Κατάγραψε την εργασία: δημιουργία δελτίου PDF →' : 'Record the work: build a service report PDF →';
    reportLink.href = 'service-report.html?lang=' + document.documentElement.lang;
    let networkLink = demo.querySelector('.demo-network-link');
    if (!networkLink) { networkLink = document.createElement('a'); networkLink.className = 'demo-print-link demo-network-link'; demo.append(networkLink); }
    networkLink.hidden = selected !== 'network';
    networkLink.textContent = document.documentElement.lang === 'el' ? 'Υπολογιστής IP και υποδικτύου' : 'IP and network calculator';
    networkLink.href = 'network.html?lang=' + document.documentElement.lang;
    demo.dataset.kind = selected;
    demo.dataset.step = String(step);
    demo.querySelector('.demo-label').textContent = t('label');
    demo.querySelector('.demo-number').textContent = `${Math.max(1, step + 1).toString().padStart(2, '0')} / 03`;
    demo.querySelector('.demo-note').textContent = t('note');
    demo.querySelector('.demo-status').textContent = t(selected + (step < 0 ? 'Ready' : step));
    run.textContent = t(step < 0 ? selected + 'Run' : step < 2 ? 'running' : 'again');
    run.disabled = step >= 0 && step < 2;
  }
  run.addEventListener('click', () => {
    resetDemo();
    const advance = () => { step++; render(); if (step < 2) timer = setTimeout(advance, 1100); };
    advance();
  });
  function render() {
    const on = power.getAttribute('aria-checked') === 'true';
    board.dataset.powered = String(on);
    renderDemo(on);
    power.querySelector('.power-state').textContent = window.siteLanguage.t(on ? 'on' : 'off');
    parts.forEach(part => {
      part.disabled = !on;
      part.setAttribute('aria-pressed', String(on && part.dataset.part === selected));
    });
    const [title, description] = !on
      ? ['Power is off.', 'Flip the power switch to light the traces and explore the components.']
      : selected ? content[selected] : ['Built on curiosity.', 'Tap a component to explore my work. Try the power switch to see the board come to life.'];
    detail.querySelector('h2').textContent = window.siteLanguage.t(title);
    detail.querySelector('p').textContent = window.siteLanguage.t(description);
  }
  power.addEventListener('click', () => {
    resetDemo();
    power.setAttribute('aria-checked', String(power.getAttribute('aria-checked') !== 'true'));
    render();
  });
  parts.forEach(part => part.addEventListener('click', () => { resetDemo(); selected = part.dataset.part; render(); }));
  document.addEventListener('languagechange', render);
  render();
})();
