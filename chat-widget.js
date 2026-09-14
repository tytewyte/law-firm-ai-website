class ChatWidget {
  constructor() {
    this.messages = [
      { text: 'Welcome to the Velocity Leads interactive demo.', sender: 'agent' },
      { text: 'Choose a sample practice area. Please do not enter real or confidential case information.', sender: 'agent' }
    ];
    this.step = 'practice';
    this.practice = '';
    this.init();
  }

  init() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="chat-widget" id="chat-widget">
        <div class="chat-window" id="chat-window" style="display:none" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <div class="chat-header">
            <div class="chat-header-info"><h4 id="chat-title">Sample Intake Assistant</h4><span class="status-indicator">● Interactive demo</span></div>
            <button class="minimize-button" id="minimize-chat" type="button" aria-label="Close intake demo">✕</button>
          </div>
          <div class="demo-chat-notice">Demo only — entries are not saved or transmitted.</div>
          <div class="chat-messages" id="chat-messages" aria-live="polite"></div>
          <div class="chat-input-container">
            <label class="sr-only" for="chat-input">Sample response</label>
            <input type="text" class="chat-input" id="chat-input" placeholder="Enter a fictional example..." disabled />
            <button class="send-button" id="send-button" type="button">Send</button>
          </div>
        </div>
        <button class="chat-bubble" id="chat-bubble" type="button" aria-label="Open interactive intake demo">
          <div class="robot-container"><div class="hologram-icon">
            <svg viewBox="0 0 100 100" class="hologram-svg" aria-hidden="true"><defs><linearGradient id="hologramGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22d3ee" stop-opacity=".8"/><stop offset="50%" stop-color="#8b5cf6" stop-opacity=".6"/><stop offset="100%" stop-color="#22d3ee" stop-opacity=".8"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="50" cy="50" r="35" fill="none" stroke="url(#hologramGradient)" stroke-width="2" filter="url(#glow)" class="hologram-circle-outer"/><circle cx="50" cy="50" r="25" fill="url(#hologramGradient)" opacity=".3" class="hologram-circle-inner"/><circle cx="50" cy="50" r="15" fill="url(#hologramGradient)" opacity=".6" class="hologram-core"/></svg>
          </div><div class="speech-bubble"><span class="speech-bubble-text">Try Demo</span></div></div>
        </button>
      </div>`);
    document.getElementById('chat-bubble').addEventListener('click', () => this.open());
    document.getElementById('minimize-chat').addEventListener('click', () => this.close());
    document.getElementById('send-button').addEventListener('click', () => this.send());
    document.getElementById('chat-input').addEventListener('keydown', (event) => { if (event.key === 'Enter') this.send(); });
    this.render();
  }

  escape(value) {
    return String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]));
  }

  open() {
    document.getElementById('chat-window').style.display = 'block';
    document.getElementById('chat-bubble').style.display = 'none';
  }

  close() {
    document.getElementById('chat-window').style.display = 'none';
    document.getElementById('chat-bubble').style.display = 'flex';
  }

  add(text, sender = 'agent') {
    this.messages.push({ text, sender });
    this.render();
  }

  render() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = this.messages.map(message => `<div class="message ${message.sender}"><div class="message-content">${this.escape(message.text)}</div></div>`).join('');
    if (this.step === 'practice') {
      container.insertAdjacentHTML('beforeend', `<div class="quick-replies"><p class="quick-replies-label">Select a sample path:</p>${['Family Law','Personal Injury','Estate Planning','Immigration'].map(item => `<button type="button" data-practice="${item}">${item}</button>`).join('')}</div>`);
      container.querySelectorAll('[data-practice]').forEach(button => button.addEventListener('click', () => this.choosePractice(button.dataset.practice)));
    }
    if (this.step === 'complete') {
      container.insertAdjacentHTML('beforeend', '<div class="quick-replies"><button type="button" data-restart>Restart demo</button></div>');
      container.querySelector('[data-restart]').addEventListener('click', () => this.restart());
    }
    container.scrollTop = container.scrollHeight;
  }

  choosePractice(practice) {
    this.practice = practice;
    this.step = 'detail';
    this.add(practice, 'user');
    window.setTimeout(() => {
      const prompts = {
        'Family Law': 'What type of family-law matter should this example route: divorce, custody, support, or another issue?',
        'Personal Injury': 'What type of incident should this example route, and approximately when did it happen?',
        'Estate Planning': 'Is this example about a will, trust, power of attorney, probate, or another need?',
        'Immigration': 'What type of immigration matter should this example route, and is there an upcoming deadline?'
      };
      this.add(prompts[practice]);
      const input = document.getElementById('chat-input');
      input.disabled = false;
      input.focus();
    }, 350);
  }

  send() {
    const input = document.getElementById('chat-input');
    const value = input.value.trim();
    if (!value || this.step !== 'detail') return;
    this.add(value, 'user');
    input.value = '';
    input.disabled = true;
    this.step = 'complete';
    window.setTimeout(() => {
      this.add(`ATTORNEY HANDOFF PREVIEW\nPractice area: ${this.practice}\nSample detail: ${value}\nSuggested next step: staff review or consultation scheduling.\n\nIn a live build, the firm chooses every question, disclaimer, urgency flag, and delivery destination.`);
    }, 350);
  }

  restart() {
    this.messages = [{ text: 'Demo restarted. Choose another sample practice area.', sender: 'agent' }];
    this.step = 'practice';
    this.practice = '';
    document.getElementById('chat-input').value = '';
    document.getElementById('chat-input').disabled = true;
    this.render();
  }
}

let chatWidget;
const startChatWidget = () => { chatWidget = new ChatWidget(); };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startChatWidget);
else startChatWidget();
