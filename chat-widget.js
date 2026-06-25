class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.messages = [
      { id: 1, text: 'Hello! 👋', sender: 'agent', timestamp: new Date() },
      { id: 2, text: 'How can I help you today?', sender: 'agent', timestamp: new Date() }
    ];
    this.step = 'initial';
    this.leadData = {
      caseType: '',
      description: '',
      name: '',
      phone: '',
      email: '',
      location: '',
      urgency: ''
    };
    
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
  }

  createWidget() {
    const widgetHTML = `
      <div class="chat-widget" id="chat-widget">
        <div class="chat-window" id="chat-window" style="display: none;">
          <div class="chat-header">
            <div class="chat-header-info">
              <h4>Velocity Leads - AI Assistant</h4>
              <span class="status-indicator">● Online 24/7</span>
            </div>
            <button class="minimize-button" id="minimize-chat">✕</button>
          </div>
          
          <div class="chat-messages" id="chat-messages"></div>
          
          <div class="chat-input-container">
            <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." />
            <button class="send-button" id="send-button">Send</button>
          </div>
        </div>
        
        <button class="chat-bubble" id="chat-bubble">
          <div class="robot-container">
            <div class="hologram-icon">
              <svg viewBox="0 0 100 100" class="hologram-svg">
                <defs>
                  <linearGradient id="hologramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
                    <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.6" />
                    <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="35" fill="none" stroke="url(#hologramGradient)" stroke-width="2" filter="url(#glow)" class="hologram-circle-outer" />
                <circle cx="50" cy="50" r="25" fill="url(#hologramGradient)" opacity="0.3" class="hologram-circle-inner" />
                <circle cx="50" cy="50" r="15" fill="url(#hologramGradient)" opacity="0.6" class="hologram-core" />
              </svg>
            </div>
            <div class="speech-bubble">
              <span class="speech-bubble-text">Need Help?</span>
            </div>
          </div>
        </button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    this.renderMessages();
  }

  attachEventListeners() {
    document.getElementById('chat-bubble').addEventListener('click', () => this.openChat());
    document.getElementById('minimize-chat').addEventListener('click', () => this.closeChat());
    document.getElementById('send-button').addEventListener('click', () => this.handleSend());
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });
  }

  openChat() {
    this.isOpen = true;
    document.getElementById('chat-window').style.display = 'block';
    document.getElementById('chat-bubble').style.display = 'none';
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('chat-window').style.display = 'none';
    document.getElementById('chat-bubble').style.display = 'flex';
  }

  addMessage(text, sender) {
    const message = {
      id: this.messages.length + 1,
      text,
      sender,
      timestamp: new Date()
    };
    this.messages.push(message);
    this.renderMessages();
  }

  renderMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    let html = '';
    this.messages.forEach(msg => {
      const time = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      html += `
        <div class="message ${msg.sender}">
          <div class="message-content">${msg.text}</div>
          <div class="message-time">${time}</div>
        </div>
      `;
    });

    if (this.step === 'initial') {
      html += `
        <div class="quick-replies">
          <p class="quick-replies-label">Select your legal need:</p>
          <button onclick="chatWidget.handleQuickReply('Family Law')">Family Law</button>
          <button onclick="chatWidget.handleQuickReply('Personal Injury')">Personal Injury</button>
          <button onclick="chatWidget.handleQuickReply('Business Law')">Business Law</button>
          <button onclick="chatWidget.handleQuickReply('Other')">Other</button>
        </div>
      `;
    }

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  }

  handleQuickReply(reply) {
    this.addMessage(reply, 'user');
    this.leadData.caseType = reply;
    
    setTimeout(() => {
      this.addMessage(
        `I understand you need help with ${reply.toLowerCase()}. Can you briefly describe your situation?`,
        'agent'
      );
      this.step = 'details';
      document.getElementById('chat-input').disabled = false;
    }, 800);
  }

  handleSend() {
    const input = document.getElementById('chat-input');
    const value = input.value.trim();
    
    if (!value || this.step === 'initial') return;

    this.addMessage(value, 'user');

    if (this.step === 'details') {
      this.leadData.description = value;
      setTimeout(() => {
        this.addMessage(
          "Thank you for sharing. To have someone contact you, I'll need your name, phone number, and email. Let's start with your name:",
          'agent'
        );
        this.step = 'contact';
      }, 800);
    } else if (this.step === 'contact') {
      if (!this.leadData.name) {
        this.leadData.name = value;
        setTimeout(() => {
          this.addMessage(`Thank you, ${value}. What's the best phone number to reach you?`, 'agent');
        }, 800);
      } else if (!this.leadData.phone) {
        this.leadData.phone = value;
        setTimeout(() => {
          this.addMessage("Great! And finally, what's your email address?", 'agent');
        }, 800);
      } else if (!this.leadData.email) {
        this.leadData.email = value;
        setTimeout(() => {
          this.addMessage(
            `Perfect! I've collected all your information:\n\n📋 Case Type: ${this.leadData.caseType}\n👤 Name: ${this.leadData.name}\n📞 Phone: ${this.leadData.phone}\n📧 Email: ${this.leadData.email}\n\nSomeone from Velocity Leads will contact you within 24 hours. Is there anything else you'd like to add?`,
            'agent'
          );
          this.step = 'complete';
          
          // Send to Netlify Forms
          this.submitLead();
        }, 800);
      }
    }

    input.value = '';
  }

  submitLead() {
    const formData = new FormData();
    formData.append('form-name', 'chat-lead');
    formData.append('name', this.leadData.name);
    formData.append('phone', this.leadData.phone);
    formData.append('email', this.leadData.email);
    formData.append('case-type', this.leadData.caseType);
    formData.append('description', this.leadData.description);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    }).catch(err => console.log('Form submission error:', err));
  }
}

// Initialize chat widget when DOM is ready
let chatWidget;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    chatWidget = new ChatWidget();
  });
} else {
  chatWidget = new ChatWidget();
}
