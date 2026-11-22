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
  let selected = null;
  function render() {
    const on = power.getAttribute('aria-checked') === 'true';
    board.dataset.powered = String(on);
    power.querySelector('.power-state').textContent = on ? 'on' : 'off';
    parts.forEach(part => {
      part.disabled = !on;
      part.setAttribute('aria-pressed', String(on && part.dataset.part === selected));
    });
    const [title, description] = !on
      ? ['Power is off.', 'Flip the power switch to light the traces and explore the components.']
      : selected ? content[selected] : ['Built on curiosity.', 'Tap a component to explore my work. Try the power switch to see the board come to life.'];
    detail.querySelector('h2').textContent = title;
    detail.querySelector('p').textContent = description;
  }
  power.addEventListener('click', () => {
    power.setAttribute('aria-checked', String(power.getAttribute('aria-checked') !== 'true'));
    render();
  });
  parts.forEach(part => part.addEventListener('click', () => { selected = part.dataset.part; render(); }));
  render();
})();
