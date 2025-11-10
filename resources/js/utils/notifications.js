// Global Notification & Confirm Modal
// Initializes once and overrides window.alert and window.confirm

(function initNotifications() {
  if (window.__notificationsInitialized) return;
  window.__notificationsInitialized = true;

  const modal = document.createElement('div');
  modal.id = 'notifyModal';
  modal.className = 'notify-modal hidden';
  modal.innerHTML = `
    <div class="notify-backdrop"></div>
    <div class="notify-dialog" role="dialog" aria-modal="true" aria-labelledby="notifyTitle" aria-describedby="notifyMessage">
      <button class="notify-close" type="button" aria-label="Close">×</button>
      <div class="notify-icon" aria-hidden="true"></div>
      <h3 id="notifyTitle" class="notify-title"></h3>
      <p id="notifyMessage" class="notify-message"></p>
      <div class="notify-actions">
        <button type="button" class="btn btn-primary" id="notifyOk">OK</button>
        <button type="button" class="btn btn-secondary hidden" id="notifyCancel">Cancel</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  const dialog = modal.querySelector('.notify-dialog');
  const closeBtn = modal.querySelector('.notify-close');
  const okBtn = modal.querySelector('#notifyOk');
  const cancelBtn = modal.querySelector('#notifyCancel');
  const titleEl = modal.querySelector('#notifyTitle');
  const msgEl = modal.querySelector('#notifyMessage');
  const iconEl = modal.querySelector('.notify-icon');

  let resolver = null; // for optional async confirm helper

  function hide() {
    modal.classList.add('hidden');
    dialog.classList.remove('show');
    document.body.classList.remove('modal-open');
    // cleanup listeners specific to this show
    okBtn.onclick = null;
    cancelBtn.onclick = null;
    closeBtn.onclick = null;
  }

  function show({ kind, title, message, confirm = false }) {
    // kind: 'success' | 'error' | 'info'
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // set visual state
    modal.dataset.kind = kind;
    iconEl.className = `notify-icon ${kind}`;
    titleEl.textContent = title || (kind === 'success' ? 'Success' : kind === 'error' ? 'Error' : 'Notice');
    msgEl.innerHTML = message || '';

    // buttons
    if (confirm) {
      cancelBtn.classList.remove('hidden');
      okBtn.textContent = 'Confirm';
    } else {
      cancelBtn.classList.add('hidden');
      okBtn.textContent = 'OK';
    }

    // wire actions
    closeBtn.onclick = hide;

    if (confirm) {
      okBtn.onclick = () => { hide(); resolver && resolver(true); };
      cancelBtn.onclick = () => { hide(); resolver && resolver(false); };
    } else {
      okBtn.onclick = hide;
      cancelBtn.onclick = null;
    }

    // animate in
    requestAnimationFrame(() => dialog.classList.add('show'));
  }

  function classifyMessage(msg) {
    const m = (msg || '').toLowerCase();
    if (m.includes('fail') || m.includes('error') || m.includes('invalid') || m.includes('unauth')) return 'error';
    if (m.includes('success') || m.includes('saved') || m.includes('updated') || m.includes('added') || m.includes('archived') || m.includes('deleted') || m.includes('sent') || m.includes('export')) return 'success';
    return 'info';
  }

  // Expose helpers
  window.notify = {
    success(message, title = 'Successfully added!') { show({ kind: 'success', title, message }); },
    error(message, title = 'Failed') { show({ kind: 'error', title, message }); },
    info(message, title = 'Notice') { show({ kind: 'info', title, message }); },
    confirm(message, title = 'Are you sure?') {
      return new Promise((resolve) => {
        resolver = resolve;
        show({ kind: 'info', title, message, confirm: true });
      });
    }
  };

  // Override alert and confirm globally to keep existing logic untouched
  const nativeAlert = window.alert.bind(window);
  const nativeConfirm = window.confirm.bind(window);

  window.alert = function (msg) {
    try {
      const kind = classifyMessage(String(msg));
      show({ kind, title: kind === 'success' ? 'Success' : kind === 'error' ? 'Error' : 'Notice', message: String(msg) });
    } catch (e) {
      // Fallback to native if something goes wrong
      nativeAlert(msg);
    }
  };

  // Do NOT override confirm to avoid changing existing synchronous logic
  window.confirm = nativeConfirm;
})();
