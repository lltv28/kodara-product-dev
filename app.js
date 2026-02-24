// Kodara Whitelabel — Personal Trainer AI Mockup
// Interactive demo with view switching, simulated chat, and rich response components

document.addEventListener('DOMContentLoaded', () => {
  const viewDashboard = document.getElementById('viewDashboard');
  const viewChat = document.getElementById('viewChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatInputBottom = document.getElementById('chatInputBottom');
  const sendBtn = document.getElementById('sendBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsTopBtn = document.getElementById('settingsTopBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const sidebarItems = document.querySelectorAll('.sidebar-item[data-view]');
  const userProfileBtn = document.getElementById('userProfileBtn');
  const demoDropdown = document.getElementById('demoDropdown');
  const demoList = document.getElementById('demoList');
  const sidebarAvatar = document.getElementById('sidebarAvatar');
  const sidebarUsername = document.getElementById('sidebarUsername');

  // ===========================================================
  // DEMO CONFIGURATIONS
  // ===========================================================
  const DEMOS = [
    {
      id: 'marcus',
      name: 'Marcus Fitness',
      initials: 'MF',
      role: 'Personal Trainer',
      gradient: 'linear-gradient(135deg, #0a6b43, #0d8555)',
      greeting: 'Hey there, ready to train?',
      placeholder: 'Ask me about workouts, nutrition, recovery...',
      agentName: 'Marcus AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for Marcus',
      suggestions: [
        { text: 'Scan my meal photo and break down the macros', prompt: 'Scan this food photo and tell me the macros', highlighted: true },
        { text: 'Show my workout consistency and streak', prompt: 'Show my workouts and streak this month' },
        { text: 'Analyze my squat form and give feedback', prompt: 'Can you do a form check on my squat?' },
        { text: 'Show my nutrition dashboard for today', prompt: 'Show my macros and calories today' },
      ],
    },
    {
      id: 'lucas',
      name: 'Lucas AI',
      initials: 'LA',
      role: 'Media Buyer',
      gradient: 'linear-gradient(135deg, rgba(16,104,68,0.80), rgba(16,104,68,0.60))',
      greeting: 'Hey! Ready to crush your ad performance?',
      placeholder: 'Ask me about campaigns, ad creative, competitors...',
      agentName: 'Lucas AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for Lucas',
      suggestions: [
        { text: 'Show me how my Facebook campaigns are performing', prompt: 'Show me my Facebook ad campaign performance', highlighted: true },
        { text: 'My campaigns were working well for 2 months, but now have died out, what should I do?', prompt: 'My campaigns were working well for 2 months, but now have died out, what should I do?' },
        { text: 'Generate new ad creative concepts', prompt: 'Generate new ad creative concepts for my cold traffic campaign' },
        { text: 'Show my campaign ROAS and spend breakdown', prompt: 'Show my campaign analytics and ROAS this week' },
      ],
    },
    {
      id: 'alex',
      name: 'Alex Rivera',
      initials: 'AR',
      role: 'Mindset Coach',
      gradient: 'linear-gradient(135deg, rgba(16,104,68,0.92), rgba(16,104,68,0.70))',
      greeting: 'Welcome back. How are you feeling?',
      placeholder: 'Talk to me about mindset, emotions, breakthroughs...',
      agentName: 'Alex AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for Alex',
      suggestions: [
        { text: 'Show my personality profile and coaching insights', prompt: 'Show my personality profile and coaching insights', highlighted: true },
        { text: 'How have I been progressing over our sessions?', prompt: 'Show my session history and emotional progress' },
        { text: 'I need to have a tough conversation with my partner', prompt: 'Help me navigate a difficult conversation with my partner' },
        { text: 'I feel completely burned out — what should I do?', prompt: 'I feel burned out and emotionally exhausted' },
      ],
    },
    {
      id: 'nathan',
      name: 'Nathan Cross',
      initials: 'NC',
      role: 'Business Operations',
      gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
      greeting: 'Good morning. Let\'s check in on your business.',
      placeholder: 'Ask about projects, finances, clients, team workload...',
      agentName: 'Nathan AI',
      agentCount: '+4',
      suggestionsLabel: 'Common questions for Nathan',
      suggestions: [
        { text: 'Pull my tasks from Monday, ClickUp, and Asana', prompt: 'Pull my tasks and projects from Monday, ClickUp, and Asana', highlighted: true },
        { text: 'Show my financial overview and cash position', prompt: 'Show me my financial overview and cash flow' },
        { text: 'Which clients are most profitable this quarter?', prompt: 'Which clients are most profitable this quarter and are any of them at risk of churning?' },
        { text: 'Anything that needs my attention today?', prompt: 'Is there anything that needs my attention today?' },
      ],
    },
    {
      id: 'mike',
      name: 'Mike AI',
      initials: 'MA',
      role: 'Copywriting AI',
      gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
      greeting: 'Ready to write copy that converts?',
      placeholder: 'Ask me to write webinar scripts, funnels, ads, emails...',
      agentName: 'Mike AI',
      agentCount: '+3',
      suggestionsLabel: 'What Mike can build for you',
      suggestions: [
        { text: 'Build me a complete 1-hour webinar script from scratch', prompt: 'Build me a complete 1-hour webinar script from scratch', highlighted: true },
        { text: 'Create a full sales funnel with ad campaigns', prompt: 'Create a full sales funnel with ad campaigns' },
        { text: 'Write a high-converting email welcome sequence', prompt: 'Write a high-converting email welcome sequence' },
        { text: 'Generate 10 ad hooks with different angles', prompt: 'Generate 10 ad hooks with different angles' },
      ],
    },
  ];

  let currentDemo = DEMOS[0];

  // --- Demo switcher ---
  function buildDemoList() {
    demoList.innerHTML = DEMOS.map(d => `
      <button class="demo-dropdown__item${d.id === currentDemo.id ? ' demo-dropdown__item--active' : ''}" data-demo="${d.id}">
        <div class="demo-dropdown__item-avatar" style="background:${d.gradient}">${d.initials}</div>
        <div class="demo-dropdown__item-info">
          <span class="demo-dropdown__item-name">${d.name}</span>
          <span class="demo-dropdown__item-role">${d.role}</span>
        </div>
        ${d.id === currentDemo.id ? '<svg class="demo-dropdown__item-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
      </button>
    `).join('');

    demoList.querySelectorAll('.demo-dropdown__item').forEach(item => {
      item.addEventListener('click', () => {
        const demo = DEMOS.find(d => d.id === item.dataset.demo);
        if (demo && demo.id !== currentDemo.id) {
          switchDemo(demo);
        }
        closeDemoDropdown();
      });
    });
  }

  function switchDemo(demo) {
    currentDemo = demo;

    // Update sidebar
    sidebarAvatar.textContent = demo.initials;
    sidebarAvatar.style.background = demo.gradient;
    sidebarUsername.textContent = demo.name;

    // Update hero
    document.querySelector('.avatar-initials--lg').textContent = demo.initials;
    document.querySelector('.avatar-initials--lg').style.background = demo.gradient;
    document.querySelector('.hero-heading').textContent = demo.greeting;

    // Update chat input placeholders
    document.querySelectorAll('.chat-textarea').forEach(el => {
      el.placeholder = demo.placeholder;
    });

    // Update agent chips
    document.querySelectorAll('.agent-chip span:not(.agent-chip-badge)').forEach(el => {
      el.textContent = demo.agentName;
    });
    document.querySelectorAll('.agent-chip-badge').forEach(el => {
      el.textContent = demo.agentCount;
    });

    // Update suggestions
    document.querySelector('.suggestions-label').textContent = demo.suggestionsLabel;
    const grid = document.querySelector('.suggestions-grid');
    grid.innerHTML = demo.suggestions.map(s => `
      <button class="suggestion-card${s.highlighted ? ' suggestion-card--highlighted' : ''}" data-prompt="${escapeAttr(s.prompt)}">
        ${escapeHtml(s.text)}
      </button>
    `).join('');

    // Re-bind suggestion card clicks
    grid.querySelectorAll('.suggestion-card').forEach(card => {
      card.addEventListener('click', () => sendMessage(card.dataset.prompt, true));
    });

    // Update chat avatar initials
    document.querySelectorAll('.avatar--chat .avatar-initials').forEach(el => {
      el.textContent = demo.initials;
      el.style.background = demo.gradient;
    });

    // Clear chat and go to dashboard
    chatMessages.innerHTML = '';
    showView('dashboard');

    // Update page title
    document.title = `${demo.name} AI — Kodara`;
  }

  function toggleDemoDropdown() {
    const isHidden = demoDropdown.classList.contains('hidden');
    if (isHidden) {
      buildDemoList();
      demoDropdown.classList.remove('hidden');
      userProfileBtn.classList.add('sidebar-user--open');
    } else {
      closeDemoDropdown();
    }
  }

  function closeDemoDropdown() {
    demoDropdown.classList.add('hidden');
    userProfileBtn.classList.remove('sidebar-user--open');
  }

  userProfileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDemoDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!demoDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeDemoDropdown();
    }
  });

  // --- View switching ---
  function showView(view) {
    if (view === 'dashboard') {
      viewDashboard.classList.remove('hidden');
      viewChat.classList.add('hidden');
    } else {
      viewDashboard.classList.add('hidden');
      viewChat.classList.remove('hidden');
    }
    sidebarItems.forEach(item => {
      item.classList.toggle('sidebar-item--active', item.dataset.view === view);
    });
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.dataset.view === 'dashboard') {
        chatMessages.innerHTML = '';
      }
      showView(item.dataset.view);
    });
  });

  // --- Suggestion cards (always start fresh chat) ---
  document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', () => {
      sendMessage(card.dataset.prompt, true);
    });
  });

  // --- Send message ---
  let _responseTimers = [];
  function _clearResponseTimers() {
    _responseTimers.forEach(id => clearTimeout(id));
    _responseTimers = [];
  }
  function _track(id) { _responseTimers.push(id); return id; }

  function sendMessage(text, freshChat) {
    if (!text.trim()) return;
    // Cancel any in-flight response sequence from a previous message
    _clearResponseTimers();
    // Clear previous messages for a fresh conversation
    if (freshChat || chatMessages.children.length === 0) {
      chatMessages.innerHTML = '';
    }
    showView('chat');

    const response = getAIResponse(text);

    // Show user message (with image attachment for photo-based features)
    if (response.userImage) {
      addUserMessageWithImage(text, response.userImage);
    } else {
      addUserMessage(text);
    }

    chatInput.value = '';
    chatInputBottom.value = '';

    const loadingEl = addLoadingMessage();

    _track(setTimeout(() => {
      loadingEl.remove();
      if (response.scanning) {
        // Show scanning state first, then reveal results
        const scanEl = addAIComponentMessage(buildCalAIScanningState(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          scanEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 2200));
      } else if (response.connecting) {
        // FB Ads: connecting -> syncing -> results
        const connectEl = addAIComponentMessage(buildFbAdsConnecting(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          connectEl.remove();
          const syncEl = addAIComponentMessage(buildFbAdsSyncing(), true);
          scrollToBottom();
          _track(setTimeout(() => {
            syncEl.remove();
            addAIComponentMessage(response.component);
            scrollToBottom();
          }, 2500));
        }, 1500));
      } else if (response.searching) {
        // Competitor: searching -> results
        const searchEl = addAIComponentMessage(buildCompetitorSearching(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          searchEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 2500));
      } else if (response.generating) {
        // Ad Creative: thinking -> results
        const thinkEl = addAIComponentMessage(buildAdGenThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 2500));
      } else if (response.creatingImages) {
        // Creative Preview: loading -> results
        const loadEl = addAIComponentMessage(buildCreativePreviewLoading(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          loadEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3000));
      } else if (response.pmHubConnecting) {
        // PM Hub: connecting -> dashboard
        const pmConnectEl = addAIComponentMessage(buildPmHubConnecting(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          pmConnectEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3000));
      } else if (response.finConnecting) {
        // Financial: connecting -> dashboard
        const finConnectEl = addAIComponentMessage(buildFinConnecting(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          finConnectEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3000));
      } else if (response.unifiedThinking) {
        // Unified Data: thinking -> result
        const unifiedThinkEl = addAIComponentMessage(buildUnifiedThinkingState(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          unifiedThinkEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3500));
      } else if (response.personalityLoading) {
        // Mindset: personality profile thinking -> results
        const thinkEl = addAIComponentMessage(buildPersonalityThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3000));
      } else if (response.sessionLoading) {
        // Mindset: session history thinking -> results
        const thinkEl = addAIComponentMessage(buildSessionThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3000));
      } else if (response.conversationLoading) {
        // Mindset: conversation guide thinking -> results
        const thinkEl = addAIComponentMessage(buildConversationThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3500));
      } else if (response.burnoutLoading) {
        // Mindset: burnout recovery thinking -> results
        const thinkEl = addAIComponentMessage(buildBurnoutThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
        }, 3500));
      } else if (response.webinarLoading) {
        // Webinar Script: thinking -> result (longer delay for dramatic effect)
        const thinkEl = addAIComponentMessage(buildWebinarThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          const resultEl = addAIComponentMessage(response.component, true);
          scrollToTop(resultEl);
        }, 20000));
      } else if (response.funnelLoading) {
        // Funnel Builder: thinking -> result
        const thinkEl = addAIComponentMessage(buildFunnelThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          const resultEl = addAIComponentMessage(response.component, true);
          scrollToTop(resultEl);
        }, 20000));
      } else if (response.emailLoading) {
        // Email Sequence: thinking -> result
        const thinkEl = addAIComponentMessage(buildEmailThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          const resultEl = addAIComponentMessage(response.component, true);
          scrollToTop(resultEl);
        }, 3000));
      } else if (response.hookLoading) {
        // Hook Generator: thinking -> result
        const thinkEl = addAIComponentMessage(buildHookThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          thinkEl.remove();
          const resultEl = addAIComponentMessage(response.component, true);
          scrollToTop(resultEl);
        }, 2500));
      } else if (response.videoDiagnostic) {
        // Video Diagnostic: analyzing -> video response (8 seconds)
        const diagEl = addAIComponentMessage(buildVideoDiagnosticThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          diagEl.remove();
          addAIComponentMessage(response.component);
          scrollToBottom();
          // Auto-play the video after render
          _track(setTimeout(() => {
            const vid = document.querySelector('.video-diagnostic__player');
            if (vid) vid.play().catch(() => {});
          }, 300));
        }, 8000));
      } else if (response.component) {
        addAIComponentMessage(response.component);
      } else {
        addAIMessage(response.text, response.chips);
      }
      scrollToBottom();
    }, 1500 + Math.random() * 1000));
  }

  // Send on Enter
  [chatInput, chatInputBottom].forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });
  });

  sendBtn.addEventListener('click', () => sendMessage(chatInput.value));

  // --- Chat message builders ---
  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'message-user';
    el.innerHTML = `<div class="message-user-bubble">${escapeHtml(text)}</div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
  }

  function addUserMessageWithImage(text, imgSrc) {
    const el = document.createElement('div');
    el.className = 'message-user';
    el.innerHTML = `
      <div class="message-user--with-image">
        <div class="message-user-image"><img src="${imgSrc}" alt="Attached photo"/></div>
        <div class="message-user-bubble">${escapeHtml(text)}</div>
      </div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
  }

  function addAIMessage(html, chips = []) {
    const el = document.createElement('div');
    el.className = 'message-ai';

    let chipsHtml = '';
    if (chips.length) {
      chipsHtml = `
        <div class="action-chips">
          ${chips.map(c => `<button class="action-chip" data-prompt="${escapeAttr(c)}">${escapeHtml(c)}</button>`).join('')}
        </div>`;
    }

    el.innerHTML = `
      <div class="avatar avatar--chat">
        <div class="avatar-initials" style="background:${currentDemo.gradient}">${currentDemo.initials}</div>
      </div>
      <div class="message-ai-content">
        <div class="message-ai-text">${html}</div>
        ${chipsHtml}
      </div>`;
    chatMessages.appendChild(el);

    el.querySelectorAll('.action-chip').forEach(chip => {
      chip.addEventListener('click', () => sendMessage(chip.dataset.prompt));
    });
  }

  function addAIComponentMessage(componentHtml, returnEl) {
    const el = document.createElement('div');
    el.className = 'message-ai';
    el.innerHTML = `
      <div class="avatar avatar--chat">
        <div class="avatar-initials" style="background:${currentDemo.gradient}">${currentDemo.initials}</div>
      </div>
      <div class="message-ai-content">
        ${componentHtml}
      </div>`;
    chatMessages.appendChild(el);
    initComponentInteractions(el);
    if (returnEl) return el;
  }

  function addLoadingMessage() {
    const el = document.createElement('div');
    el.className = 'message-ai';
    el.innerHTML = `
      <div class="avatar avatar--chat">
        <div class="avatar-initials" style="background:${currentDemo.gradient}">${currentDemo.initials}</div>
      </div>
      <div class="message-loading">
        <span class="loading-text">${currentDemo.name.split(' ')[0]} is thinking</span>
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
    return el;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function scrollToTop(el) {
    requestAnimationFrame(() => {
      const prev = el.previousElementSibling;
      (prev || el).scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }

  // --- Settings modal ---
  function openSettings() {
    settingsModal.classList.remove('hidden');
    settingsModal.classList.remove('closing');
  }
  function closeSettingsModal() {
    settingsModal.classList.add('closing');
    settingsModal.addEventListener('animationend', function handler() {
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('closing');
      settingsModal.removeEventListener('animationend', handler);
    });
  }

  settingsBtn.addEventListener('click', (e) => { e.preventDefault(); openSettings(); });
  settingsTopBtn.addEventListener('click', openSettings);
  closeSettings.addEventListener('click', closeSettingsModal);
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeSettingsModal);

  // ===========================================================
  // COMPONENT BUILDERS
  // ===========================================================

  // --- Image URLs ---
  const IMG = {
    meal: 'https://images.unsplash.com/photo-1544378730-5e409d0e649e?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=600&q=80',
    squat: 'https://images.unsplash.com/photo-1513352098199-8ccf457b35a8?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=600&q=80',
    squatIdeal: 'https://images.unsplash.com/photo-1642267379398-c430d619019d?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=600&q=80',
  };

  // --- 1. Cal AI: Scanning State ---
  function buildCalAIScanningState() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Analyzing your meal photo...</p>
    </div>
    <div class="chat-response-card">
      <div class="cal-ai__photo">
        <img src="${IMG.meal}" alt="Meal photo" class="cal-ai__photo-img"/>
        <div class="cal-ai__photo-overlay"></div>
      </div>
      <div class="cal-ai__scanning">
        <div class="cal-ai__scan-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="cal-ai__scan-text">Identifying food items...</span>
        <div class="cal-ai__scan-bar"><div class="cal-ai__scan-bar-fill"></div></div>
      </div>
    </div>`;
  }

  // --- 1. Cal AI: Photo-to-Macros Scanner (results) ---
  function buildCalAIScanner() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed your meal photo. Here's the nutritional breakdown:</p>
    </div>
    <div class="chat-response-card" id="calAiCard">
      <div class="cal-ai__photo">
        <img src="${IMG.meal}" alt="Meal photo" class="cal-ai__photo-img"/>
        <div class="cal-ai__photo-overlay"></div>
      </div>
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Meal Analysis</div>
          <div class="chat-response-card__subtitle">Lunch — 3 items detected</div>
        </div>
      </div>
      <div class="cal-ai__items">
        <div class="cal-ai__item">
          <div class="cal-ai__item-left">
            <span class="cal-ai__item-emoji">🍝</span>
            <div>
              <div class="cal-ai__item-name">Chicken Pasta</div>
              <div class="cal-ai__item-portion">~280g serving</div>
            </div>
          </div>
          <div class="cal-ai__item-macros">
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">42g</span><span class="cal-ai__macro-label">Prot</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">58g</span><span class="cal-ai__macro-label">Carb</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">14g</span><span class="cal-ai__macro-label">Fat</span></div>
          </div>
        </div>
        <div class="cal-ai__item">
          <div class="cal-ai__item-left">
            <span class="cal-ai__item-emoji">🥗</span>
            <div>
              <div class="cal-ai__item-name">Side Salad</div>
              <div class="cal-ai__item-portion">~120g with dressing</div>
            </div>
          </div>
          <div class="cal-ai__item-macros">
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">3g</span><span class="cal-ai__macro-label">Prot</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">8g</span><span class="cal-ai__macro-label">Carb</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">7g</span><span class="cal-ai__macro-label">Fat</span></div>
          </div>
        </div>
        <div class="cal-ai__item">
          <div class="cal-ai__item-left">
            <span class="cal-ai__item-emoji">🍞</span>
            <div>
              <div class="cal-ai__item-name">Garlic Bread</div>
              <div class="cal-ai__item-portion">2 slices</div>
            </div>
          </div>
          <div class="cal-ai__item-macros">
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">5g</span><span class="cal-ai__macro-label">Prot</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">28g</span><span class="cal-ai__macro-label">Carb</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">9g</span><span class="cal-ai__macro-label">Fat</span></div>
          </div>
        </div>
      </div>
      <div class="cal-ai__total">
        <span class="cal-ai__total-label">Total</span>
        <span class="cal-ai__total-cal">738 <span>kcal</span></span>
      </div>
      <div class="chat-response-card__footer" id="calAiFooter">
        <button class="cal-ai__add-btn" id="calAiAddBtn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10" stroke-linecap="round"/></svg>
          Add to Today's Plan
        </button>
      </div>
    </div>`;
  }

  // --- 2. Habit Tracker: Workout Calendar ---
  function buildHabitTracker() {
    const today = 19;
    // Workout data: day -> type
    const workouts = {2:'Push',3:'Pull',5:'Legs',6:'Cardio',9:'Push',10:'Pull',12:'Legs',13:'Cardio',16:'Push',17:'Pull',18:'Legs'};
    const workoutDays = new Set(Object.keys(workouts).map(Number));

    // This week strip (Mon16 - Sun22)
    const week = [
      { d:'M', num:16 }, { d:'T', num:17 }, { d:'W', num:18 },
      { d:'T', num:19 }, { d:'F', num:20 }, { d:'S', num:21 }, { d:'S', num:22 },
    ];
    const weekHtml = week.map(w => {
      const done = workoutDays.has(w.num);
      const isToday = w.num === today;
      const isFuture = w.num > today;
      let dotClass = 'habit-dot';
      if (done) dotClass += ' habit-dot--done';
      else if (isToday) dotClass += ' habit-dot--today';
      else if (isFuture) dotClass += ' habit-dot--future';
      else dotClass += ' habit-dot--rest';
      return `<div class="habit-week-col">
        <span class="habit-week-day">${w.d}</span>
        <div class="${dotClass}">${done ? '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 6l2.5 2.5 4.5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</div>
      </div>`;
    }).join('');

    // Month grid (Feb 2026 starts on Sunday)
    let gridHtml = '';
    for (let day = 1; day <= 28; day++) {
      const done = workoutDays.has(day);
      const isToday = day === today;
      const isFuture = day > today;
      let cls = 'habit-cell';
      if (done) cls += ' habit-cell--done';
      else if (isFuture) cls += ' habit-cell--future';
      if (isToday) cls += ' habit-cell--today';
      gridHtml += `<div class="${cls}"></div>`;
    }

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your workout consistency this month. Looking strong!</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Workout Tracker</div>
          <div class="chat-response-card__subtitle">February 2026</div>
        </div>
      </div>
      <!-- Streak + stats row -->
      <div class="habit-stats">
        <div class="habit-stat habit-stat--streak">
          <span class="habit-stat__number">3</span>
          <span class="habit-stat__label">week streak</span>
        </div>
        <div class="habit-stat">
          <span class="habit-stat__number">11</span>
          <span class="habit-stat__label">workouts</span>
        </div>
        <div class="habit-stat">
          <span class="habit-stat__number">58%</span>
          <span class="habit-stat__label">consistency</span>
        </div>
      </div>
      <!-- This week strip -->
      <div class="habit-week-strip">
        <span class="habit-week-title">This week</span>
        <div class="habit-week-row">${weekHtml}</div>
      </div>
      <!-- Month heatmap grid -->
      <div class="habit-month">
        <div class="habit-month-header">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div class="habit-month-grid">${gridHtml}</div>
        <div class="habit-legend">
          <div class="habit-legend-item"><div class="habit-cell habit-cell--done habit-legend-swatch"></div><span>Workout</span></div>
          <div class="habit-legend-item"><div class="habit-cell habit-legend-swatch"></div><span>Rest</span></div>
          <div class="habit-legend-item"><div class="habit-cell habit-cell--today habit-legend-swatch"></div><span>Today</span></div>
        </div>
      </div>
    </div>`;
  }

  // --- 3. Exercise Form Analyzer ---
  function buildFormAnalyzer() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed your squat form. Overall solid foundation — here are some key areas to focus on:</p>
    </div>
    <div class="chat-response-card" id="formAnalyzerCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Form Analysis — Barbell Back Squat</div>
          <div class="chat-response-card__subtitle">3 areas analyzed</div>
        </div>
      </div>
      <div class="form-analyzer__score">
        <span class="form-analyzer__score-value">7.2</span>
        <span class="form-analyzer__score-max">/ 10</span>
        <span class="form-analyzer__score-label">— Good, with room to improve</span>
      </div>
      <div class="form-analyzer__image-wrap" id="formAnalyzerImageSingle">
        <img src="${IMG.squat}" alt="Squat form" class="form-analyzer__photo"/>
        <!-- Overlay lines drawn via SVG on top of photo -->
        <svg class="form-analyzer__overlay-svg" viewBox="0 0 520 390" fill="none">
          <!-- Upper back line — green (good) -->
          <line x1="270" y1="70" x2="255" y2="170" stroke="#16a34a" stroke-width="3" stroke-dasharray="8 4" opacity="0.85"/>
          <!-- Lower back line — red (fix needed) -->
          <line x1="255" y1="170" x2="240" y2="240" stroke="#dc2626" stroke-width="3" stroke-dasharray="8 4" opacity="0.85"/>
          <!-- Knee tracking — orange/warning -->
          <circle cx="220" cy="300" r="16" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.8"/>
          <circle cx="300" cy="295" r="16" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.8"/>
        </svg>
        <!-- Annotation callouts -->
        <div class="form-analyzer__annotation" style="top:10%;left:55%">
          <span class="form-analyzer__annotation-num form-analyzer__annotation-num--good">1</span>
          <span class="form-analyzer__annotation-text">Head neutral — good</span>
        </div>
        <div class="form-analyzer__annotation" style="top:48%;left:5%">
          <span class="form-analyzer__annotation-num form-analyzer__annotation-num--fix">2</span>
          <span class="form-analyzer__annotation-text">Lower back rounding</span>
        </div>
        <div class="form-analyzer__annotation" style="top:72%;left:55%">
          <span class="form-analyzer__annotation-num form-analyzer__annotation-num--warning">3</span>
          <span class="form-analyzer__annotation-text">Knees caving inward</span>
        </div>
      </div>
      <div class="form-analyzer__feedback">
        <div class="form-analyzer__feedback-item">
          <div class="form-analyzer__severity form-analyzer__severity--good"></div>
          <div>
            <div class="form-analyzer__feedback-text">Head and upper back position is solid</div>
            <div class="form-analyzer__feedback-detail">Neutral spine through the cervical region. Keep looking at a spot 6 feet ahead on the floor.</div>
          </div>
        </div>
        <div class="form-analyzer__feedback-item">
          <div class="form-analyzer__severity form-analyzer__severity--fix"></div>
          <div>
            <div class="form-analyzer__feedback-text">Lower back is rounding at the bottom</div>
            <div class="form-analyzer__feedback-detail">This "butt wink" puts stress on lumbar discs. Reduce depth slightly and focus on bracing your core before descending.</div>
          </div>
        </div>
        <div class="form-analyzer__feedback-item">
          <div class="form-analyzer__severity form-analyzer__severity--warning"></div>
          <div>
            <div class="form-analyzer__feedback-text">Knees are tracking slightly inward</div>
            <div class="form-analyzer__feedback-detail">Push knees out over your toes. Cue: "screw your feet into the floor" to engage glutes and prevent valgus collapse.</div>
          </div>
        </div>
      </div>
      <div class="form-analyzer__compare" id="formCompareToggle">
        <div class="form-analyzer__compare-toggle" id="formCompareSwitch"></div>
        <span class="form-analyzer__compare-label">Compare with Ideal Form</span>
      </div>
      <div class="form-analyzer__side-by-side hidden" id="formSideBySide"
        <div>
          <div class="form-analyzer__side-label form-analyzer__side-label--yours">Your Form</div>
          <div class="form-analyzer__side-image">
            <img src="${IMG.squat}" alt="Your squat form" class="form-analyzer__side-photo"/>
          </div>
        </div>
        <div>
          <div class="form-analyzer__side-label form-analyzer__side-label--ideal">Ideal Form</div>
          <div class="form-analyzer__side-image form-analyzer__side-image--ideal">
            <img src="${IMG.squatIdeal}" alt="Ideal squat form" class="form-analyzer__side-photo"/>
          </div>
        </div>
      </div>
    </div>`;
  }

  // --- 4. Nutrition Tracker: Daily/Weekly Dashboard ---
  function buildNutritionTracker() {
    const consumed = 1847;
    const target = 2650;
    const pct = Math.round((consumed / target) * 100);
    const circumference = 2 * Math.PI * 42; // radius 42
    const dashoffset = circumference - (circumference * pct / 100);

    // Realistic macro data for 180lb male
    const protein = { current: 132, target: 185 };
    const carbs = { current: 198, target: 290 };
    const fat = { current: 58, target: 82 };

    // Weekly calorie data (last 7 days ending today Thu)
    const weekData = [
      { day: 'Fri', cal: 2580 },
      { day: 'Sat', cal: 2720 },
      { day: 'Sun', cal: 2140 },
      { day: 'Mon', cal: 2690 },
      { day: 'Tue', cal: 2850 },
      { day: 'Wed', cal: 2540 },
      { day: 'Thu', cal: 1847 },
    ];
    const maxCal = 3000;

    const barsHtml = weekData.map((d, i) => {
      const h = Math.round((d.cal / maxCal) * 100);
      let barClass = d.cal >= target ? 'nutrition__chart-bar--over' : 'nutrition__chart-bar--under';
      if (i === 6) barClass = 'nutrition__chart-bar--today';
      return `<div class="nutrition__chart-bar-wrap">
        <div class="nutrition__chart-bar ${barClass}" style="height:${h}px"></div>
        <span class="nutrition__chart-day-label">${d.day}</span>
      </div>`;
    }).join('');

    const targetLineTop = 100 - Math.round((target / maxCal) * 100);

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your nutrition dashboard for today. You're making good progress — don't forget to hit your protein target before bed!</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Nutrition Dashboard</div>
          <div class="chat-response-card__subtitle">Thursday, Feb 19</div>
        </div>
        <div class="toggle-pill" data-toggle="nutrition-view">
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="daily">Daily</button>
          <button class="toggle-pill__btn" data-value="weekly">Weekly</button>
        </div>
      </div>

      <!-- Daily view -->
      <div data-panel="daily">
        <div class="nutrition__ring-section">
          <div class="nutrition__ring-wrap">
            <svg class="nutrition__ring-svg" viewBox="0 0 100 100">
              <circle class="nutrition__ring-bg" cx="50" cy="50" r="42"/>
              <circle class="nutrition__ring-fill nutrition__ring-fill--cal"
                cx="50" cy="50" r="42"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${dashoffset}"/>
            </svg>
            <div class="nutrition__ring-center">
              <span class="nutrition__ring-number">${consumed}</span>
              <span class="nutrition__ring-label">of ${target}</span>
            </div>
          </div>
          <div class="nutrition__macro-list">
            <div class="nutrition__macro-row">
              <div class="nutrition__macro-row-top">
                <span class="nutrition__macro-name">Protein</span>
                <span class="nutrition__macro-values">${protein.current}g <span>/ ${protein.target}g</span></span>
              </div>
              <div class="nutrition__macro-bar">
                <div class="nutrition__macro-bar-fill nutrition__macro-bar-fill--protein" style="width:${Math.round(protein.current/protein.target*100)}%"></div>
              </div>
            </div>
            <div class="nutrition__macro-row">
              <div class="nutrition__macro-row-top">
                <span class="nutrition__macro-name">Carbs</span>
                <span class="nutrition__macro-values">${carbs.current}g <span>/ ${carbs.target}g</span></span>
              </div>
              <div class="nutrition__macro-bar">
                <div class="nutrition__macro-bar-fill nutrition__macro-bar-fill--carbs" style="width:${Math.round(carbs.current/carbs.target*100)}%"></div>
              </div>
            </div>
            <div class="nutrition__macro-row">
              <div class="nutrition__macro-row-top">
                <span class="nutrition__macro-name">Fat</span>
                <span class="nutrition__macro-values">${fat.current}g <span>/ ${fat.target}g</span></span>
              </div>
              <div class="nutrition__macro-bar">
                <div class="nutrition__macro-bar-fill nutrition__macro-bar-fill--fat" style="width:${Math.round(fat.current/fat.target*100)}%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="nutrition__meals">
          <div class="nutrition__meals-title">Today's Meals</div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🍳</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Breakfast</span>
                <span class="nutrition__meal-detail">Eggs, turkey bacon, oats</span>
              </div>
            </div>
            <span class="nutrition__meal-cal">580 <span>kcal</span></span>
          </div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🍝</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Lunch</span>
                <span class="nutrition__meal-detail">Chicken pasta, salad, bread</span>
              </div>
            </div>
            <span class="nutrition__meal-cal">738 <span>kcal</span></span>
          </div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🥤</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Post-Workout Shake</span>
                <span class="nutrition__meal-detail">Whey protein, banana, oats</span>
              </div>
            </div>
            <span class="nutrition__meal-cal">529 <span>kcal</span></span>
          </div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🍽️</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Dinner</span>
                <span class="nutrition__meal-detail">Not logged yet</span>
              </div>
            </div>
            <span class="nutrition__meal-cal nutrition__meal-cal--empty">— <span>kcal</span></span>
          </div>
          <button class="nutrition__quick-add">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2v10M2 7h10" stroke-linecap="round"/></svg>
            Quick add meal or snack
          </button>
        </div>
      </div>

      <!-- Weekly view -->
      <div data-panel="weekly" class="hidden">
        <div class="nutrition__weekly-wrapper">
          <div class="nutrition__weekly-chart">
            <div class="nutrition__chart-target-line" style="bottom:${Math.round((target/maxCal)*100)}px">
              <span class="nutrition__chart-target-label">${target} target</span>
            </div>
            ${barsHtml}
          </div>
        </div>
        <div class="nutrition__weekly-stats">
          <div class="nutrition__weekly-stats-row">
            <div>
              <div class="nutrition__weekly-stat-label">Weekly Avg</div>
              <div class="nutrition__weekly-stat-value">2,481 <span class="nutrition__weekly-stat-unit">kcal/day</span></div>
            </div>
            <div class="nutrition__weekly-stat--right">
              <div class="nutrition__weekly-stat-label">On Target</div>
              <div class="nutrition__weekly-stat-value">3 <span class="nutrition__weekly-stat-unit">of 7 days</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // ===========================================================
  // MARKETING COMPONENT BUILDERS
  // ===========================================================

  // --- 5. FB Ads: Connecting State ---
  function buildFbAdsConnecting() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your latest campaign data.</p>
    </div>
    <div class="chat-response-card">
      <div class="fb-ads__status">
        <div class="fb-ads__status-dot"></div>
        <span class="fb-ads__status-text">Connecting to Facebook Ads Manager...</span>
      </div>
    </div>`;
  }

  // --- 5. FB Ads: Syncing State ---
  function buildFbAdsSyncing() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Connected. Pulling your campaign data now.</p>
    </div>
    <div class="chat-response-card">
      <div class="fb-ads__status">
        <div class="fb-ads__status-dot"></div>
        <span class="fb-ads__status-text">Pulling campaign data...</span>
      </div>
      <div class="fb-ads__sync-details">
        <div class="fb-ads__sync-item">
          <svg class="fb-ads__sync-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Found 3 active campaigns
        </div>
        <div class="fb-ads__sync-item">
          <svg class="fb-ads__sync-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          12 ad sets loaded
        </div>
        <div class="fb-ads__sync-item">
          <svg class="fb-ads__sync-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          47 ads synced
        </div>
      </div>
      <div class="fb-ads__sync-bar"><div class="fb-ads__sync-bar-fill"></div></div>
    </div>`;
  }

  // --- 5. FB Ads: Performance Dashboard ---
  function buildFbAdsPerformance() {
    const campaigns = [
      {
        name: 'Kodara \u2014 VSL Cold Traffic',
        status: 'active', statusLabel: 'Active',
        spend: '$4,230', impressions: '892K', clicks: '12,847',
        ctr: '1.44%', cpa: '$18.20', roas: '3.2x',
        ctrClass: '', cpaClass: 'good', roasClass: 'good',
        trend: [65, 72, 68, 80, 75, 82, 90], trendDir: 'up',
      },
      {
        name: 'Retargeting \u2014 Case Study Viewers',
        status: 'active', statusLabel: 'Active',
        spend: '$1,890', impressions: '234K', clicks: '5,621',
        ctr: '2.40%', cpa: '$12.50', roas: '4.1x',
        ctrClass: 'good', cpaClass: 'good', roasClass: 'good',
        trend: [45, 50, 48, 52, 55, 58, 62], trendDir: 'up',
      },
      {
        name: 'Lookalike \u2014 High Intent',
        status: 'paused', statusLabel: 'Paused',
        spend: '$2,150', impressions: '456K', clicks: '3,892',
        ctr: '0.85%', cpa: '$34.80', roas: '1.1x',
        ctrClass: 'bad', cpaClass: 'bad', roasClass: 'bad',
        trend: [80, 75, 65, 55, 42, 38, 30], trendDir: 'down',
      },
    ];

    const campaignsHtml = campaigns.map(c => {
      const maxTrend = Math.max(...c.trend);
      const trendBarsHtml = c.trend.map(v => {
        const h = Math.round((v / maxTrend) * 24);
        return `<div class="fb-ads__trend-bar fb-ads__trend-bar--${c.trendDir}" style="height:${h}px"></div>`;
      }).join('');

      return `
      <div class="fb-ads__campaign">
        <div class="fb-ads__campaign-header">
          <span class="fb-ads__campaign-name">${c.name}</span>
          <span class="fb-ads__status-pill fb-ads__status-pill--${c.status}">${c.statusLabel}</span>
        </div>
        <div class="fb-ads__metrics">
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value">${c.spend}</span>
            <span class="fb-ads__metric-label">Spend</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value">${c.impressions}</span>
            <span class="fb-ads__metric-label">Impressions</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value">${c.clicks}</span>
            <span class="fb-ads__metric-label">Clicks</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value ${c.ctrClass ? 'fb-ads__metric-value--' + c.ctrClass : ''}">${c.ctr}</span>
            <span class="fb-ads__metric-label">CTR</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value ${c.cpaClass ? 'fb-ads__metric-value--' + c.cpaClass : ''}">${c.cpa}</span>
            <span class="fb-ads__metric-label">CPA</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value ${c.roasClass ? 'fb-ads__metric-value--' + c.roasClass : ''}">${c.roas}</span>
            <span class="fb-ads__metric-label">ROAS</span>
          </div>
        </div>
        <div class="fb-ads__trend">${trendBarsHtml}</div>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your campaign performance overview. I've analyzed all 3 active campaigns across the last 7 days.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Campaign Performance</div>
          <div class="chat-response-card__subtitle">Last 7 days \u00B7 3 campaigns</div>
        </div>
        <div class="fb-ads__live-badge">
          <div class="fb-ads__live-dot"></div>
          Live
        </div>
      </div>
      <div class="fb-ads__campaigns">
        ${campaignsHtml}
      </div>
      <div class="fb-ads__summary">
        Your top performer is <strong>Kodara \u2014 VSL Cold Traffic</strong> with a <strong>3.2x ROAS</strong> and spend trending upward. I\u2019d recommend increasing budget by 20% on this campaign. <strong>Retargeting \u2014 Case Study Viewers</strong> is also strong at 4.1x ROAS with room to scale. I\u2019d suggest pausing <strong>Lookalike \u2014 High Intent</strong> \u2014 it\u2019s been declining for 5 days with a 1.1x ROAS and $34.80 CPA.
      </div>
    </div>`;
  }

  // --- 6. Competitor: Searching State ---
  function buildCompetitorSearching() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Searching the Facebook Ad Library now...</p>
    </div>
    <div class="chat-response-card">
      <div class="competitor__search-status">
        <div class="competitor__search-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="competitor__search-text">Searching Facebook Ad Library for Glossier...</span>
        <div class="competitor__search-bar"><div class="competitor__search-bar-fill"></div></div>
      </div>
    </div>`;
  }

  // --- 6. Competitor: Ad Library Browser ---
  function buildCompetitorBrowser() {
    const ads = [
      { copy: '\u201CIs your skincare routine actually working? Most women waste $200/month on products that don\u2019t...\u201D', format: 'Video', duration: '47 days', ratio: 'feed' },
      { copy: '\u201CI tried every moisturizer on the market. Then my dermatologist told me something that changed everything...\u201D', format: 'Video', duration: '34 days', ratio: 'feed' },
      { copy: '\u201CBefore Glossier: 12-step routine. After Glossier: 3 steps, better skin. Here\u2019s what I use...\u201D', format: 'Image', duration: '28 days', ratio: 'feed' },
      { copy: '\u201CPOV: You finally find a sunscreen that doesn\u2019t leave a white cast\u201D', format: 'Video', duration: '21 days', ratio: 'story' },
      { copy: '\u201CThe #1 mistake people make with their skincare? Using too many products. We asked 500 dermatologists...\u201D', format: 'Carousel', duration: '15 days', ratio: 'feed' },
      { copy: '\u201CReal people. Real results. No filters. See what 30 days of consistent skincare looks like...\u201D', format: 'Video', duration: '12 days', ratio: 'feed' },
    ];

    const videoCount = ads.filter(a => a.format === 'Video').length;
    const imageCount = ads.filter(a => a.format === 'Image').length;
    const carouselCount = ads.filter(a => a.format === 'Carousel').length;

    const thumbIcon = `<svg class="competitor__ad-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 16l5-5 4 4 3-3 6 6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>`;

    const adsHtml = ads.map(ad => `
      <div class="competitor__ad-card" data-format="${ad.format}">
        <div class="competitor__ad-thumb competitor__ad-thumb--${ad.ratio}">
          <div class="competitor__ad-thumb-inner">
            ${thumbIcon}
            <span class="competitor__ad-thumb-label">${ad.format === 'Video' ? 'Video Creative' : ad.format === 'Carousel' ? 'Carousel (3 slides)' : 'Static Image'}</span>
          </div>
        </div>
        <div class="competitor__ad-info">
          <div class="competitor__ad-copy">${ad.copy}</div>
          <div class="competitor__ad-meta">
            <span class="competitor__format-badge">${ad.format}</span>
            <span class="competitor__ad-duration">${ad.duration}</span>
          </div>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Found <strong>23 active ads</strong> from Glossier. Here are the most relevant ones:</p>
    </div>
    <div class="chat-response-card" id="competitorCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Competitor Ads \u2014 Glossier</div>
          <div class="chat-response-card__subtitle">23 active ads found</div>
        </div>
      </div>
      <div class="competitor__filters" id="competitorFilters">
        <button class="competitor__filter-btn competitor__filter-btn--active" data-filter="all">All Ads <span class="competitor__filter-count">${ads.length}</span></button>
        <button class="competitor__filter-btn" data-filter="Video">Video <span class="competitor__filter-count">${videoCount}</span></button>
        <button class="competitor__filter-btn" data-filter="Image">Image <span class="competitor__filter-count">${imageCount}</span></button>
        <button class="competitor__filter-btn" data-filter="Carousel">Carousel <span class="competitor__filter-count">${carouselCount}</span></button>
      </div>
      <div class="competitor__gallery">
        <div class="competitor__grid" id="competitorGrid">
          ${adsHtml}
        </div>
      </div>
      <div class="competitor__analysis">
        <div class="competitor__analysis-title">Competitor Analysis</div>
        <div class="competitor__analysis-text">
          They\u2019re running <strong>8 video ads</strong> focused on pain-point messaging. Their longest-running ad (47 days) uses a <strong>UGC-style testimonial</strong> format. Most of their creatives lead with a question hook. They appear to be testing story-format ads for the first time this month.
        </div>
        <div class="competitor__patterns-title">Patterns Detected</div>
        <div class="competitor__patterns">
          <span class="competitor__pattern-chip">UGC Style (65%)</span>
          <span class="competitor__pattern-chip">Question Hooks (40%)</span>
          <span class="competitor__pattern-chip">Before/After (25%)</span>
          <span class="competitor__pattern-chip">Social Proof (20%)</span>
          <span class="competitor__pattern-chip">Pain Points (55%)</span>
        </div>
      </div>
    </div>`;
  }

  // --- 7. Ad Creative: Thinking State ---
  function buildAdGenThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Generating ad concepts based on your campaign data and competitor analysis...</p>
    </div>
    <div class="chat-response-card">
      <div class="ad-gen__thinking">
        <div class="ad-gen__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 14l-4.8 2.6.9-5.3L4.3 7.6l5.3-.8L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="ad-gen__thinking-text">Generating ad concepts based on your<br>campaign data and competitor analysis...</span>
      </div>
    </div>`;
  }

  // --- 7. Ad Creative Generator ---
  function buildAdCreativeGenerator() {
    const concepts = [
      {
        name: 'Concept A',
        tag: 'Pain Point Hook \u00B7 UGC Style',
        primaryText: 'I was spending $3,000/month on Facebook ads with nothing to show for it. My ROAS was 0.8x and I was about to give up on paid media entirely. Then I found a completely different approach to creative strategy...',
        headline: 'Stop Burning Money on Ads That Don\u2019t Convert',
        description: 'See how 1,200+ DTC brands transformed their ad performance in 30 days',
        cta: 'Learn More',
        previewDesc: 'AI-generated image: Person frustrated at laptop with overlay text \u201CStop wasting money on ads that don\u2019t convert\u201D',
        formats: ['Feed', 'Stories', 'Reels'],
        prediction: '2.1\u20132.8x ROAS',
        confidence: 'High',
      },
      {
        name: 'Concept B',
        tag: 'Testimonial \u00B7 Authority Style',
        primaryText: 'We helped Kodara scale from $5K to $50K/month ad spend while improving ROAS from 1.2x to 3.4x. Here\u2019s exactly what we changed in their campaign structure...',
        headline: 'How Kodara 10x\u2019d Their Ad Spend Profitably',
        description: 'Case study: The exact framework behind a 3.4x ROAS at scale',
        cta: 'Get the Case Study',
        previewDesc: 'AI-generated image: Dashboard screenshot with upward trending ROAS graph and text overlay \u201CFrom 1.2x to 3.4x ROAS\u201D',
        formats: ['Feed', 'In-Stream'],
        prediction: '1.8\u20132.4x ROAS',
        confidence: 'Medium',
      },
      {
        name: 'Concept C',
        tag: 'Question Hook \u00B7 Curiosity Gap',
        primaryText: 'What if you could predict which ad creative will perform before spending a single dollar? Most media buyers test blindly. But there\u2019s a data-driven approach that changes everything...',
        headline: 'Predict Your Best Ads Before You Spend',
        description: 'AI-powered creative testing for performance marketers',
        cta: 'Try It Free',
        previewDesc: 'AI-generated image: Split screen showing A/B test results with \u201CWhich ad wins?\u201D and a prediction confidence meter',
        formats: ['Feed', 'Stories'],
        prediction: '2.4\u20133.1x ROAS',
        confidence: 'High',
      },
    ];

    const tabsHtml = concepts.map((c, i) => `
      <button class="ad-gen__tab${i === 0 ? ' ad-gen__tab--active' : ''}" data-concept="${i}">${c.name}</button>
    `).join('');

    const conceptsHtml = concepts.map((c, i) => `
      <div class="ad-gen__concept${i > 0 ? ' hidden' : ''}" data-concept-panel="${i}">
        <div class="ad-gen__strategy-tag">${c.tag}</div>
        <div class="ad-gen__copy">
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Primary Text</span>
            <span class="ad-gen__copy-value ad-gen__copy-value--body">${c.primaryText}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Headline</span>
            <span class="ad-gen__copy-value">${c.headline}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Description</span>
            <span class="ad-gen__copy-value">${c.description}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">CTA</span>
            <span class="ad-gen__copy-value">${c.cta}</span>
          </div>
        </div>
        <div class="ad-gen__preview">
          <div class="ad-gen__preview-frame">
            <svg class="ad-gen__preview-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="4" y="4" width="24" height="24" rx="4"/>
              <path d="M4 22l7-7 5 5 4-4 8 8" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
            <span class="ad-gen__preview-desc">${c.previewDesc}</span>
          </div>
        </div>
        <div class="ad-gen__formats">
          <span class="ad-gen__formats-label">Recommended for:</span>
          ${c.formats.map(f => `<span class="ad-gen__format-pill">${f}</span>`).join('')}
        </div>
        <div class="ad-gen__prediction">
          <svg class="ad-gen__prediction-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 1l2 4 4.5.6-3.3 3.2.8 4.5L8 11l-4 2.3.8-4.5L1.5 5.6 6 5l2-4z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="ad-gen__prediction-text">Based on your historical data, this concept could achieve a <strong>${c.prediction}</strong>. Confidence: <strong>${c.confidence}</strong></span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I\u2019ve generated 3 ad concepts based on your top-performing campaigns and competitor patterns. Here they are:</p>
    </div>
    <div class="chat-response-card" id="adGenCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Ad Concepts</div>
          <div class="chat-response-card__subtitle">3 concepts generated</div>
        </div>
      </div>
      <div class="ad-gen__tabs" id="adGenTabs">
        ${tabsHtml}
      </div>
      ${conceptsHtml}
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary" id="adGenGenerateImages">Generate Images</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Generate Video Script</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Edit Copy</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Export All</button>
      </div>
    </div>`;
  }

  // --- 8. Creative Preview: Loading State ---
  function buildCreativePreviewLoading() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Generating creative variations now...</p>
    </div>
    <div class="chat-response-card">
      <div class="creative-preview__loading">
        <div class="creative-preview__loading-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M3 16l5-5 4 4 3-3 6 6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
          </svg>
        </div>
        <span class="creative-preview__loading-text">Creating 4 ad creative variations...</span>
        <div class="creative-preview__progress"><div class="creative-preview__progress-fill"></div></div>
        <span class="creative-preview__progress-label">Generating variation 1 of 4...</span>
      </div>
    </div>`;
  }

  // --- 8. Creative Preview: Generated Grid ---
  function buildCreativePreview() {
    const variations = [
      {
        label: 'Variation A',
        format: '1080\u00D71080',
        headline: 'Stop Burning Money\non Ads That Don\u2019t\nConvert',
        gradient: 'linear-gradient(135deg, rgba(26,26,26,0.75) 0%, rgba(16,104,68,0.55) 100%)',
        selected: true,
      },
      {
        label: 'Variation B',
        format: '1080\u00D71080',
        headline: 'Your ROAS Is Broken.\nHere\u2019s How to Fix It.',
        gradient: 'linear-gradient(135deg, rgba(16,104,68,0.5) 0%, rgba(26,26,26,0.65) 100%)',
        selected: false,
      },
      {
        label: 'Variation C',
        format: '1080\u00D71080',
        headline: '3,000+ Brands\nSwitched. See Why.',
        gradient: 'linear-gradient(135deg, rgba(26,26,26,0.65) 0%, rgba(26,26,26,0.85) 100%)',
        selected: true,
      },
      {
        label: 'Variation D',
        format: '1080\u00D71920',
        headline: 'What If You Could\nPredict the Winner?',
        gradient: 'linear-gradient(135deg, rgba(16,104,68,0.65) 0%, rgba(16,104,68,0.35) 100%)',
        selected: false,
      },
    ];

    const selectedCount = variations.filter(v => v.selected).length;

    const gridHtml = variations.map((v, i) => `
      <div class="creative-preview__variation${v.selected ? ' creative-preview__variation--selected' : ''}" data-variation="${i}">
        <div class="creative-preview__check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 6l2.5 2.5 4.5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="creative-preview__image" style="background:${v.gradient}">
          <span class="creative-preview__overlay-text">${v.headline}</span>
        </div>
        <div class="creative-preview__meta">
          <span class="creative-preview__label">${v.label}</span>
          <span class="creative-preview__format">${v.format}</span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are 4 creative variations for your \u201CPain Point Hook\u201D concept. I\u2019ve pre-selected the two strongest options.</p>
    </div>
    <div class="chat-response-card" id="creativePreviewCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Generated Creatives</div>
          <div class="chat-response-card__subtitle">4 variations</div>
        </div>
      </div>
      <div class="creative-preview__grid" id="creativePreviewGrid">
        ${gridHtml}
      </div>
      <div class="creative-preview__selection" id="creativePreviewSelection">
        Selected: <strong>${selectedCount} of 4</strong> variations
      </div>
      <div class="creative-preview__ab-note">
        <strong>A/B Test Recommendation:</strong> I recommend running Variations A and C as an A/B test. They use contrasting hooks which will help identify what resonates with your audience.
      </div>
      <div class="creative-preview__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Push to Facebook Ads Manager</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Download All</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Regenerate</button>
      </div>
    </div>`;
  }

  // --- 9. Video Diagnostic: Thinking State ---
  function buildVideoDiagnosticThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me analyze your campaign data and pull some insights on this...</p>
    </div>
    <div class="chat-response-card">
      <div class="video-diagnostic__thinking">
        <div class="video-diagnostic__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="video-diagnostic__thinking-text">Analyzing campaign performance history...</span>
        <div class="video-diagnostic__steps">
          <div class="video-diagnostic__step">
            <div class="video-diagnostic__step-dot"></div>
            <span>Reviewing 60-day performance data</span>
          </div>
          <div class="video-diagnostic__step">
            <div class="video-diagnostic__step-dot"></div>
            <span>Identifying decline patterns</span>
          </div>
          <div class="video-diagnostic__step">
            <div class="video-diagnostic__step-dot"></div>
            <span>Preparing diagnostic guide</span>
          </div>
        </div>
        <div class="video-diagnostic__progress"><div class="video-diagnostic__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- 9. Video Diagnostic: Video Response ---
  function buildVideoDiagnosticResponse() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>This is a really common pattern — campaigns that perform well initially and then plateau or decline. I've put together a diagnostic guide that walks you through exactly how to troubleshoot this. Watch below:</p>
    </div>
    <div class="video-diagnostic__wrap">
      <video class="video-diagnostic__player" playsinline>
        <source src="Ad%20Performance%20Diagnostic%20Guide.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="video-diagnostic__volume">
        <button class="video-diagnostic__volume-btn" aria-label="Mute">
          <svg class="video-diagnostic__vol-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M10 4L5.5 7.5H2v5h3.5L10 16V4z" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="video-diagnostic__vol-wave1" d="M13 7.5a4 4 0 010 5" stroke-linecap="round"/>
            <path class="video-diagnostic__vol-wave2" d="M15.5 5a8 8 0 010 10" stroke-linecap="round"/>
          </svg>
          <svg class="video-diagnostic__mute-icon hidden" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M10 4L5.5 7.5H2v5h3.5L10 16V4z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 7.5l-4 5M12 7.5l4 5" stroke-linecap="round"/>
          </svg>
        </button>
        <input class="video-diagnostic__volume-slider" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume"/>
      </div>
    </div>`;
  }

  // ===========================================================
  // BUSINESS COMPONENT BUILDERS
  // ===========================================================

  const CHECK_SVG = '<svg class="connect-seq__check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // --- Component 1: PM Hub — Connecting State ---
  function buildPmHubConnecting() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your projects and tasks from all platforms.</p>
    </div>
    <div class="chat-response-card">
      <div class="connect-seq">
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#FF3D57">M</div>
          <span>Connecting to Monday.com...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#7B68EE">C</div>
          <span>Connecting to ClickUp...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#F06A6A">A</div>
          <span>Connecting to Asana...</span>
          ${CHECK_SVG}
        </div>
      </div>
      <div class="connect-seq__synced">
        <div class="connect-seq__synced-logos">
          <div class="connect-seq__synced-logo" style="background:#FF3D57">M</div>
          <div class="connect-seq__synced-logo" style="background:#7B68EE">C</div>
          <div class="connect-seq__synced-logo" style="background:#F06A6A">A</div>
        </div>
        <span>3 platforms synced</span>
        <span class="connect-seq__synced-text">Last synced: just now</span>
      </div>
    </div>`;
  }

  // --- Component 1: PM Hub — Dashboard ---
  function buildPmHubDashboard() {
    const projects = [
      { name: 'Henderson Consulting Onboarding', source: 'monday', sourceName: 'Monday', assignee: 'Jamie L.', due: 'Mar 21', status: 'on-track', statusLabel: 'On Track' },
      { name: 'Q1 Website Redesign', source: 'clickup', sourceName: 'ClickUp', assignee: 'Marcus T.', due: 'Mar 15', status: 'at-risk', statusLabel: 'At Risk' },
      { name: 'Monthly Retainer \u2014 Apex Properties', source: 'asana', sourceName: 'Asana', assignee: 'Sarah K.', due: 'Mar 19', status: 'overdue', statusLabel: 'Overdue' },
      { name: 'Tax Prep Document Collection', source: 'monday', sourceName: 'Monday', assignee: 'Chris M.', due: 'Mar 28', status: 'on-track', statusLabel: 'On Track' },
      { name: 'New Client Proposal \u2014 Meridian Group', source: 'clickup', sourceName: 'ClickUp', assignee: 'Marcus T.', due: 'Mar 14', status: 'overdue', statusLabel: 'Overdue' },
    ];

    const team = [
      { name: 'Marcus T.', tasks: 12, level: 'overloaded' },
      { name: 'Jamie L.', tasks: 8, level: 'heavy' },
      { name: 'Alex R.', tasks: 7, level: 'normal' },
      { name: 'Sarah K.', tasks: 6, level: 'normal' },
      { name: 'David W.', tasks: 5, level: 'normal' },
      { name: 'Chris M.', tasks: 4, level: 'light' },
      { name: 'Lisa C.', tasks: 3, level: 'light' },
      { name: 'Tom H.', tasks: 2, level: 'light' },
    ];

    const maxTasks = Math.max(...team.map(t => t.tasks));

    const projectsHtml = projects.map(p => `
      <div class="pm-hub__project">
        <span class="pm-hub__project-name">${p.name}</span>
        <div class="pm-hub__project-meta">
          <span class="source-pill source-pill--${p.source}">${p.sourceName}</span>
          <span class="pm-hub__project-assignee">${p.assignee}</span>
          <span class="pm-hub__project-due">${p.due}</span>
          <span class="status-pill status-pill--${p.status}">${p.statusLabel}</span>
        </div>
      </div>
    `).join('');

    const workloadHtml = team.map(t => `
      <div class="pm-hub__workload-row">
        <span class="pm-hub__workload-name">${t.name}</span>
        <div class="pm-hub__workload-bar">
          <div class="pm-hub__workload-bar-fill pm-hub__workload-bar-fill--${t.level}" style="width:${Math.round((t.tasks / maxTasks) * 100)}%"></div>
        </div>
        <span class="pm-hub__workload-count">${t.tasks}</span>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>All three platforms synced. Here\u2019s your unified project overview:</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Cross-Platform Summary</div>
          <div class="chat-response-card__subtitle">Monday \u00B7 ClickUp \u00B7 Asana</div>
        </div>
        <div class="connect-seq__synced-logos">
          <div class="connect-seq__synced-logo" style="background:#FF3D57">M</div>
          <div class="connect-seq__synced-logo" style="background:#7B68EE">C</div>
          <div class="connect-seq__synced-logo" style="background:#F06A6A">A</div>
        </div>
      </div>
      <div class="pm-hub__stats">
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number">14</span>
          <span class="pm-hub__stat-label">Active Projects</span>
        </div>
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number">23</span>
          <span class="pm-hub__stat-label">Due This Week</span>
        </div>
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number pm-hub__stat-number--warning">5</span>
          <span class="pm-hub__stat-label">Overdue</span>
        </div>
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number">8</span>
          <span class="pm-hub__stat-label">Team Active</span>
        </div>
      </div>
      <div class="pm-hub__projects">
        <div class="pm-hub__projects-title">Highest Priority Items</div>
        ${projectsHtml}
      </div>
      <div class="pm-hub__workload">
        <div class="pm-hub__workload-title">Team Workload</div>
        <div class="pm-hub__workload-rows">${workloadHtml}</div>
      </div>
      <div class="ai-insight">
        You have <strong>5 overdue items</strong> across Monday and Asana, 3 of which are assigned to <strong>Marcus T.</strong> It looks like he may be overloaded this week with 12 active tasks. I would suggest reassigning the Asana tasks for the Henderson project to <strong>Lisa C.</strong>, who currently has capacity. Also, the <strong>Q1 Website Redesign</strong> in ClickUp has not had any activity in 9 days and may need attention.
      </div>
    </div>`;
  }

  // --- Component 2: Financial — Connecting State ---
  function buildFinConnecting() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your latest financial data.</p>
    </div>
    <div class="chat-response-card">
      <div class="connect-seq">
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Connecting to QuickBooks...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Syncing transactions from the last 30 days...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Processing 247 transactions...</span>
          ${CHECK_SVG}
        </div>
      </div>
    </div>`;
  }

  // --- Component 2: Financial — Dashboard ---
  function buildFinDashboard() {
    const chartData = [
      { month: 'Oct', rev: 142, exp: 108 },
      { month: 'Nov', rev: 156, exp: 118 },
      { month: 'Dec', rev: 148, exp: 124 },
      { month: 'Jan', rev: 165, exp: 128 },
      { month: 'Feb', rev: 172, exp: 132 },
      { month: 'Mar', rev: 187, exp: 143 },
    ];
    const maxVal = 200;

    const chartBarsHtml = chartData.map(d => `
      <div class="fin__chart-col">
        <div class="fin__chart-bar-group">
          <div class="fin__chart-bar fin__chart-bar--revenue" style="height:${Math.round((d.rev / maxVal) * 70)}px"></div>
          <div class="fin__chart-bar fin__chart-bar--expense" style="height:${Math.round((d.exp / maxVal) * 70)}px"></div>
        </div>
        <span class="fin__chart-month">${d.month}</span>
      </div>
    `).join('');

    const transactions = [
      { date: 'Mar 14', desc: 'Stripe Payout \u2014 March Revenue', amount: '+$52,400', type: 'Revenue', positive: true },
      { date: 'Mar 12', desc: 'Payroll \u2014 Biweekly', amount: '-$38,200', type: 'Payroll', positive: false },
      { date: 'Mar 10', desc: 'AWS Monthly \u2014 Infrastructure', amount: '-$4,850', type: 'Operations', positive: false },
      { date: 'Mar 8', desc: 'Office Lease \u2014 Q1', amount: '-$12,600', type: 'Facilities', positive: false },
      { date: 'Mar 5', desc: 'Contractor Payment \u2014 Design Team', amount: '-$8,400', type: 'Contractors', positive: false },
    ];

    const transactionsHtml = transactions.map(t => `
      <div class="fin__transaction">
        <div class="fin__transaction-left">
          <span class="fin__transaction-desc">${t.desc}</span>
          <div class="fin__transaction-meta">
            <span>${t.date}</span>
            <span>\u00B7</span>
            <span>${t.type}</span>
          </div>
        </div>
        <span class="fin__transaction-amount ${t.positive ? 'fin__transaction-amount--positive' : 'fin__transaction-amount--negative'}">${t.amount}</span>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here\u2019s your financial overview. 247 transactions synced from QuickBooks.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Financial Overview</div>
          <div class="chat-response-card__subtitle">Month to Date \u00B7 March 2026</div>
        </div>
        <div class="fin__live-badge">
          <div class="fin__live-dot"></div>
          Live
        </div>
      </div>
      <div class="fin__stats">
        <div class="fin__stat-card">
          <span class="fin__stat-value">$187.4K</span>
          <span class="fin__stat-label">Revenue</span>
          <span class="fin__stat-trend fin__stat-trend--up">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            12%
          </span>
        </div>
        <div class="fin__stat-card">
          <span class="fin__stat-value">$142.8K</span>
          <span class="fin__stat-label">Expenses</span>
          <span class="fin__stat-trend fin__stat-trend--down">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            18%
          </span>
        </div>
        <div class="fin__stat-card">
          <span class="fin__stat-value">$44.6K</span>
          <span class="fin__stat-label">Net Profit</span>
          <span class="fin__stat-trend fin__stat-trend--down">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            8%
          </span>
        </div>
        <div class="fin__stat-card">
          <span class="fin__stat-value">$284.5K</span>
          <span class="fin__stat-label">Cash on Hand</span>
        </div>
      </div>
      <div class="fin__chart">
        <div class="fin__chart-title">Revenue vs Expenses (6 months)</div>
        <div class="fin__chart-bars">${chartBarsHtml}</div>
        <div class="fin__chart-legend">
          <div class="fin__chart-legend-item"><div class="fin__chart-legend-dot fin__chart-legend-dot--revenue"></div><span class="fin__chart-legend-label">Revenue</span></div>
          <div class="fin__chart-legend-item"><div class="fin__chart-legend-dot fin__chart-legend-dot--expense"></div><span class="fin__chart-legend-label">Expenses</span></div>
        </div>
      </div>
      <div class="fin__ar">
        <div class="fin__ar-title">Accounts Receivable Aging</div>
        <div class="fin__ar-rows">
          <div class="fin__ar-row">
            <span class="fin__ar-label">Current</span>
            <span class="fin__ar-value">$42,300</span>
          </div>
          <div class="fin__ar-row">
            <span class="fin__ar-label">1\u201330 days</span>
            <span class="fin__ar-value">$28,700</span>
          </div>
          <div class="fin__ar-row">
            <span class="fin__ar-label">31\u201360 days</span>
            <span class="fin__ar-value">$18,400</span>
          </div>
          <div class="fin__ar-row">
            <span class="fin__ar-label">60+ days</span>
            <span class="fin__ar-value fin__ar-value--warning">$14,200</span>
          </div>
          <div class="fin__ar-row fin__ar-row--total">
            <span class="fin__ar-label">Total Outstanding</span>
            <span class="fin__ar-value">$103,600</span>
          </div>
        </div>
      </div>
      <div class="fin__transactions">
        <div class="fin__transactions-title">Recent Large Transactions</div>
        ${transactionsHtml}
      </div>
      <div class="ai-insight">
        Your revenue is up <strong>12% month-over-month</strong>, but expenses grew <strong>18%</strong> driven primarily by the new contractor costs. You have <strong>$14,200 in receivables over 60 days past due</strong>, mostly from Apex Properties ($8,400) and Meridian Group ($5,800). I would recommend sending follow-up invoices today. Your current cash runway at this burn rate is approximately <strong>4.2 months</strong>.
      </div>
    </div>`;
  }

  // --- Component 3: Unified Data — Thinking State ---
  function buildUnifiedThinkingState() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Great question. Let me cross-reference your data sources.</p>
    </div>
    <div class="chat-response-card">
      <div class="unified__thinking">
        <div class="unified__thinking-header">Analyzing your question...</div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Querying QuickBooks for revenue by client...
        </div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Querying Monday.com for project hours...
        </div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Querying ClickUp for deliverable status...
        </div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Cross-referencing data...
        </div>
      </div>
    </div>`;
  }

  // --- Component 3: Unified Data — Result ---
  function buildUnifiedDataResult() {
    const clients = [
      { name: 'Henderson Consulting', revenue: '$48,000', hours: '180 hrs', rate: '$267/hr', margin: '62%', status: 'on-track', statusLabel: 'Healthy' },
      { name: 'Apex Properties', revenue: '$25,200', hours: '95 hrs', rate: '$265/hr', margin: '58%', status: 'at-risk', statusLabel: 'At Risk' },
      { name: 'Meridian Group', revenue: '$32,400', hours: '140 hrs', rate: '$231/hr', margin: '48%', status: 'at-risk', statusLabel: 'At Risk' },
      { name: 'Pinnacle Tech', revenue: '$18,600', hours: '60 hrs', rate: '$310/hr', margin: '68%', status: 'on-track', statusLabel: 'Healthy' },
      { name: 'Cornerstone Legal', revenue: '$15,800', hours: '72 hrs', rate: '$219/hr', margin: '42%', status: 'on-track', statusLabel: 'Healthy' },
    ];

    const tableRowsHtml = clients.map(c => `
      <div class="unified__table-row">
        <span class="unified__table-cell unified__table-cell--client">${c.name}</span>
        <span class="unified__table-cell">${c.revenue}</span>
        <span class="unified__table-cell unified__table-cell--muted">${c.hours}</span>
        <span class="unified__table-cell ${c.name === 'Pinnacle Tech' ? 'unified__table-cell--highlight' : ''}">${c.rate}</span>
        <span class="unified__table-cell"><span class="status-pill status-pill--${c.status}">${c.statusLabel}</span></span>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I\u2019ve combined data from QuickBooks, Monday.com, and ClickUp to answer your question. Here\u2019s what I found:</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Client Profitability \u2014 Q1 2026</div>
          <div class="chat-response-card__subtitle">Revenue + hours cross-referenced</div>
        </div>
      </div>
      <div class="unified__table">
        <div class="unified__table-title">Client Profitability Breakdown</div>
        <div class="unified__table-header">
          <span>Client</span>
          <span>Q1 Revenue</span>
          <span>Hours</span>
          <span>Eff. Rate</span>
          <span>Status</span>
        </div>
        ${tableRowsHtml}
      </div>
      <div class="unified__churn">
        <div class="unified__churn-title">Churn Risk Flags</div>
        <div class="unified__churn-flag">
          <div class="unified__churn-dot"></div>
          <div class="unified__churn-content">
            <span class="unified__churn-client">Apex Properties</span>
            <span class="unified__churn-detail">3 support tickets unresolved for 14+ days (ClickUp) and last invoice 47 days past due (QuickBooks). Combined signals indicate elevated churn risk.</span>
            <div class="unified__churn-sources">
              <span class="source-pill source-pill--clickup">ClickUp</span>
              <span class="source-pill source-pill--quickbooks">QuickBooks</span>
            </div>
          </div>
        </div>
        <div class="unified__churn-flag">
          <div class="unified__churn-dot"></div>
          <div class="unified__churn-content">
            <span class="unified__churn-client">Meridian Group</span>
            <span class="unified__churn-detail">Project scope reduced by 40% last month (Monday) and they requested a contract review (email). Revenue trending down quarter-over-quarter.</span>
            <div class="unified__churn-sources">
              <span class="source-pill source-pill--monday">Monday</span>
              <span class="source-pill source-pill--gmail">Gmail</span>
            </div>
          </div>
        </div>
      </div>
      <div class="unified__recommendation">
        <strong>Henderson Consulting</strong> is your highest-margin client at <strong>$267/hr</strong> effective rate. <strong>Apex Properties</strong> shows two churn signals and represents <strong>$8,400/mo</strong> in recurring revenue. I would prioritize a check-in call with them this week. I can draft the agenda and create the follow-up tasks if you want.
      </div>
      <div class="unified__actions">
        <button class="biz-btn biz-btn--primary">Schedule Check-in with Apex</button>
        <button class="biz-btn biz-btn--secondary">Draft Client Report</button>
        <button class="biz-btn biz-btn--ghost">Show Full Profitability Report</button>
      </div>
    </div>`;
  }

  // --- Component 4: Accountability Watchdog ---
  function buildWatchdogAlert() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I\u2019ve been monitoring your accounts and projects. Here are some things that need your attention:</p>
    </div>
    <div class="watchdog-card">
      <div class="watchdog__header">
        <div class="watchdog__header-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"/>
            <path d="M10 6v4l2.5 2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="watchdog__header-text">
          <span class="watchdog__header-title">I noticed a few things</span>
          <span class="watchdog__header-time">Flagged 2 hours ago \u00B7 4 items</span>
        </div>
      </div>
      <div class="watchdog__alerts">
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--urgent"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">The proposal for <strong>Meridian Group</strong> was sent 7 days ago with no response. The typical close window for proposals this size is 5 business days. This is at risk of going cold.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--gmail">Gmail</span>
              <span class="source-pill source-pill--monday">Monday</span>
            </div>
            <button class="watchdog__alert-action">Send Follow-up Email</button>
          </div>
        </div>
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--urgent"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">There is a <strong>duplicate charge of $2,340</strong> from your payment processor on March 12th and March 13th. This looks unintentional based on your transaction history.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--quickbooks">QuickBooks</span>
            </div>
            <button class="watchdog__alert-action">Review Transaction</button>
          </div>
        </div>
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--warning"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">The <strong>Henderson Consulting</strong> deliverables are due Friday, but 3 of 7 tasks are still in progress and the assigned team member has been out sick for 2 days. At the current pace, this will likely miss the deadline.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--asana">Asana</span>
              <span class="source-pill source-pill--clickup">ClickUp</span>
            </div>
            <button class="watchdog__alert-action">Reassign Tasks</button>
          </div>
        </div>
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--info"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">Your <strong>quarterly estimated tax payment</strong> is due in 12 days. Based on your current revenue, the estimated amount is <strong>$18,400</strong>. Last quarter you were late by 3 days and incurred a $220 penalty.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--quickbooks">QuickBooks</span>
              <span class="source-pill source-pill--calendar">Calendar</span>
            </div>
            <button class="watchdog__alert-action">Schedule Payment</button>
          </div>
        </div>
      </div>
      <div class="watchdog__footer">
        <span class="watchdog__footer-text"><strong>4 items</strong> need your attention. <strong>2 are urgent.</strong></span>
        <div class="watchdog__footer-actions">
          <button class="biz-btn biz-btn--ghost biz-btn--sm">Dismiss All</button>
          <button class="biz-btn biz-btn--secondary biz-btn--sm">Add to Today\u2019s Tasks</button>
        </div>
      </div>
    </div>`;
  }

  // ===========================================================
  // MINDSET COACH COMPONENT BUILDERS
  // ===========================================================

  // --- Alex: Personality Profile Thinking State ---
  function buildPersonalityThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull up your personality profile and coaching insights.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 21h6M10 17h4" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Loading your personality profile...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} DISC assessment results</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Enneagram profile</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Attachment style analysis</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Generating coaching insights...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 1 — Personality Insights Dashboard ---
  function buildPersonalityDashboard() {
    const traits = [
      { name: 'Openness', value: 82, color: '#106844' },
      { name: 'Conscientiousness', value: 58, color: '#106844' },
      { name: 'Extraversion', value: 45, color: '#106844' },
      { name: 'Agreeableness', value: 74, color: '#106844' },
      { name: 'Emotional Stability', value: 38, color: '#f59e0b' },
    ];

    const traitsHtml = traits.map(t => `
      <div class="personality__trait">
        <div class="personality__trait-header">
          <span class="personality__trait-name">${t.name}</span>
          <span class="personality__trait-value">${t.value}%</span>
        </div>
        <div class="personality__trait-bar">
          <div class="personality__trait-bar-fill" style="width:${t.value}%;background:${t.color}"></div>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your complete personality profile. I've integrated your DISC results, Enneagram type, and attachment style to build a holistic coaching picture.</p>
    </div>
    <div class="chat-response-card" id="personalityCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Personality Insights</div>
          <div class="chat-response-card__subtitle">Based on 3 assessments \u00B7 Updated Feb 18</div>
        </div>
        <div class="toggle-pill" data-toggle="personality-view">
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="overview">Overview</button>
          <button class="toggle-pill__btn" data-value="traits">Traits</button>
        </div>
      </div>

      <!-- Overview panel -->
      <div data-panel="overview">
        <div class="personality__types">
          <div class="personality__type-card">
            <span class="personality__type-label">DISC Type</span>
            <span class="personality__type-badge personality__type-badge--disc">Si</span>
            <span class="personality__type-name">Steadiness-Influence</span>
            <span class="personality__type-desc">Supportive, patient, collaborative. Prefers harmony and resists abrupt change.</span>
          </div>
          <div class="personality__type-card">
            <span class="personality__type-label">Enneagram</span>
            <span class="personality__type-badge personality__type-badge--enneagram">4w5</span>
            <span class="personality__type-name">The Individualist</span>
            <span class="personality__type-desc">Deep self-awareness, emotionally intense, drawn to authenticity and meaning.</span>
          </div>
          <div class="personality__type-card">
            <span class="personality__type-label">Attachment</span>
            <span class="personality__type-badge personality__type-badge--attachment">AP</span>
            <span class="personality__type-name">Anxious-Preoccupied</span>
            <span class="personality__type-desc">Seeks closeness and reassurance. Can overanalyze relational dynamics.</span>
          </div>
        </div>
        <div class="personality__coaching">
          <div class="personality__coaching-title">Coaching Implications</div>
          <div class="personality__coaching-items">
            <div class="personality__coaching-item">
              <div class="personality__coaching-icon personality__coaching-icon--strength">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1l2 4 4.5.6-3.3 3.2.8 4.5L8 11l-4 2.3.8-4.5L1.5 5.6 6 5l2-4z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <span class="personality__coaching-label">Key Strength</span>
                <span class="personality__coaching-text">Your deep self-awareness and empathy allow you to form genuine connections. Use this to build your support network.</span>
              </div>
            </div>
            <div class="personality__coaching-item">
              <div class="personality__coaching-icon personality__coaching-icon--growth">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 12V4m0 0l-3 3m3-3l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <span class="personality__coaching-label">Growth Edge</span>
                <span class="personality__coaching-text">Your emotional stability score suggests you may be carrying stress internally. We should prioritize emotional regulation techniques.</span>
              </div>
            </div>
            <div class="personality__coaching-item">
              <div class="personality__coaching-icon personality__coaching-icon--approach">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2a6 6 0 100 12A6 6 0 008 2z"/><path d="M8 5v3l2 2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <span class="personality__coaching-label">Coaching Approach</span>
                <span class="personality__coaching-text">Avoid surface-level advice. You respond best to deeper exploration. I\u2019ll push you to confront avoidance patterns while respecting your pace.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Traits panel -->
      <div data-panel="traits" class="hidden">
        <div class="personality__traits-section">
          <div class="personality__traits-title">Big Five Personality Traits</div>
          ${traitsHtml}
        </div>
        <div class="personality__traits-note">
          <strong>Note:</strong> Your Emotional Stability score (38%) has improved from 24% since we started working together 8 weeks ago. This is significant progress \u2014 keep building on the grounding exercises we\u2019ve been practicing.
        </div>
      </div>
    </div>`;
  }

  // --- Alex: Session History Thinking State ---
  function buildSessionThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me review your coaching journey.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Reviewing your coaching journey...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Loading session notes</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Mapping emotional trends</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Identifying breakthroughs...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 2 — Client Journey & Session History ---
  function buildSessionHistory() {
    // Emotional trend data (last 8 sessions)
    const emotionData = [
      { session: 'S1', score: 3, label: 'Dec 14' },
      { session: 'S2', score: 3.5, label: 'Dec 21' },
      { session: 'S3', score: 4, label: 'Jan 4' },
      { session: 'S4', score: 3, label: 'Jan 11' },
      { session: 'S5', score: 5, label: 'Jan 25' },
      { session: 'S6', score: 5.5, label: 'Feb 1' },
      { session: 'S7', score: 6, label: 'Feb 8' },
      { session: 'S8', score: 7, label: 'Feb 15' },
    ];

    const maxScore = 10;
    const chartHeight = 80;
    const points = emotionData.map((d, i) => {
      const x = Math.round((i / (emotionData.length - 1)) * 280) + 10;
      const y = Math.round(chartHeight - (d.score / maxScore) * chartHeight) + 5;
      return { x, y, ...d };
    });
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const dotsHtml = points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#106844" stroke="white" stroke-width="1.5"/>`).join('');

    const sessions = [
      { date: 'Feb 15', title: 'Breakthrough: Boundary Setting', mood: 'Empowered', moodClass: 'positive', summary: 'Successfully set boundaries with a difficult family member for the first time. Practiced assertive communication techniques.', breakthrough: true },
      { date: 'Feb 8', title: 'Exploring Avoidance Patterns', mood: 'Reflective', moodClass: 'neutral', summary: 'Identified pattern of avoiding conflict by people-pleasing. Connected this to childhood attachment patterns.', breakthrough: false },
      { date: 'Feb 1', title: 'Stress Response Work', mood: 'Challenged', moodClass: 'neutral', summary: 'Worked through a triggering event at work. Practiced grounding techniques and reframing catastrophic thinking.', breakthrough: false },
      { date: 'Jan 25', title: 'Breakthrough: Core Belief Shift', mood: 'Hopeful', moodClass: 'positive', summary: 'Challenged the core belief "I\'m not enough." Replaced with evidence-based affirmation. Significant emotional release.', breakthrough: true },
      { date: 'Jan 11', title: 'Setback Processing', mood: 'Struggling', moodClass: 'negative', summary: 'Difficult week \u2014 old patterns resurfaced after a stressful event. Normalized regression as part of growth.', breakthrough: false },
    ];

    const sessionsHtml = sessions.map(s => `
      <div class="session__timeline-item">
        <div class="session__timeline-dot ${s.breakthrough ? 'session__timeline-dot--breakthrough' : ''}"></div>
        <div class="session__timeline-content">
          <div class="session__timeline-header">
            <span class="session__timeline-date">${s.date}</span>
            <span class="session__mood-pill session__mood-pill--${s.moodClass}">${s.mood}</span>
          </div>
          <span class="session__timeline-title">${s.title}</span>
          <span class="session__timeline-summary">${s.summary}</span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your coaching journey so far. You've made some really significant progress \u2014 let me walk you through it.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Your Coaching Journey</div>
          <div class="chat-response-card__subtitle">8 sessions \u00B7 Since Dec 14</div>
        </div>
      </div>
      <div class="session__stats">
        <div class="session__stat">
          <span class="session__stat-number">8</span>
          <span class="session__stat-label">Sessions</span>
        </div>
        <div class="session__stat">
          <span class="session__stat-number">10</span>
          <span class="session__stat-label">Weeks Active</span>
        </div>
        <div class="session__stat">
          <span class="session__stat-number session__stat-number--highlight">2</span>
          <span class="session__stat-label">Breakthroughs</span>
        </div>
        <div class="session__stat">
          <span class="session__stat-number">+14%</span>
          <span class="session__stat-label">Emotional Stability</span>
        </div>
      </div>
      <div class="session__chart">
        <div class="session__chart-title">Emotional Trend</div>
        <div class="session__chart-labels">
          <span>Thriving</span>
          <span>Surviving</span>
        </div>
        <svg class="session__chart-svg" viewBox="0 0 300 ${chartHeight + 10}">
          <path d="${linePath}" fill="none" stroke="#106844" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="${linePath} L${points[points.length-1].x},${chartHeight + 5} L${points[0].x},${chartHeight + 5} Z" fill="url(#emotionGrad)" opacity="0.15"/>
          <defs>
            <linearGradient id="emotionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#106844"/>
              <stop offset="100%" stop-color="#106844" stop-opacity="0"/>
            </linearGradient>
          </defs>
          ${dotsHtml}
        </svg>
        <div class="session__chart-x-labels">
          ${emotionData.map(d => `<span>${d.label}</span>`).join('')}
        </div>
      </div>
      <div class="session__timeline">
        <div class="session__timeline-title">Session History</div>
        ${sessionsHtml}
      </div>
      <div class="ai-insight">
        Your emotional trend is clearly <strong>upward</strong>. The dip in Session 4 (Jan 11) was a normal regression after a stressful event, but you recovered faster than expected. Your <strong>2 breakthroughs</strong> in boundary-setting and core belief work are foundational changes that will compound over time. I recommend we focus next on <strong>conflict resolution skills</strong> to build on the boundary work.
      </div>
    </div>`;
  }

  // --- Alex: Conversation Guide Thinking State ---
  function buildConversationThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me help you prepare for this conversation. Give me a moment to pull your context.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Preparing your conversation guide...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Reviewing your relationship context</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Analyzing communication patterns</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Building reframe strategies...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 3 — Deep Conversation Guide ---
  function buildConversationGuide() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I know this isn\u2019t easy. Based on your attachment style and the patterns we\u2019ve discussed, here\u2019s a framework to help you navigate this conversation with confidence.</p>
    </div>
    <div class="chat-response-card" id="conversationGuideCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Difficult Conversation Guide</div>
          <div class="chat-response-card__subtitle">Personalized for your communication style</div>
        </div>
      </div>
      <div class="convo__context">
        <div class="convo__context-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3M8 10h.01" stroke-linecap="round"/></svg>
        </div>
        <div class="convo__context-text">
          Based on your <strong>anxious-preoccupied attachment</strong> style, you tend to over-explain and seek immediate reassurance during conflict. This guide will help you stay grounded and direct.
        </div>
      </div>
      <div class="convo__phases" id="convoPhases">
        <div class="convo__phase convo__phase--active" data-phase="0">
          <div class="convo__phase-header">
            <span class="convo__phase-num">1</span>
            <div>
              <span class="convo__phase-title">Open with Vulnerability</span>
              <span class="convo__phase-subtitle">Set the tone without blame</span>
            </div>
          </div>
          <div class="convo__phase-body">
            <div class="convo__script">
              <span class="convo__script-label">Try saying:</span>
              <span class="convo__script-text">\u201CI\u2019ve been thinking about something that\u2019s been weighing on me, and I care about us enough to bring it up rather than let it build.\u201D</span>
            </div>
            <div class="convo__reframe">
              <span class="convo__reframe-label">If you feel the urge to over-explain:</span>
              <span class="convo__reframe-text">Pause. Take a breath. You don\u2019t need to justify your feelings. State them simply and let the silence work.</span>
            </div>
          </div>
        </div>
        <div class="convo__phase" data-phase="1">
          <div class="convo__phase-header">
            <span class="convo__phase-num">2</span>
            <div>
              <span class="convo__phase-title">Name the Pattern</span>
              <span class="convo__phase-subtitle">Be specific about what you\u2019ve observed</span>
            </div>
          </div>
          <div class="convo__phase-body">
            <div class="convo__script">
              <span class="convo__script-label">Try saying:</span>
              <span class="convo__script-text">\u201CI\u2019ve noticed that when [specific situation], I feel [emotion]. I\u2019m not saying you\u2019re doing it intentionally \u2014 I\u2019m sharing how it lands for me.\u201D</span>
            </div>
            <div class="convo__reframe">
              <span class="convo__reframe-label">If they get defensive:</span>
              <span class="convo__reframe-text">Don\u2019t retreat. Say: \u201CI\u2019m not attacking you. I\u2019m trying to make this better for both of us. Can you help me understand your side?\u201D</span>
            </div>
          </div>
        </div>
        <div class="convo__phase" data-phase="2">
          <div class="convo__phase-header">
            <span class="convo__phase-num">3</span>
            <div>
              <span class="convo__phase-title">Hold Your Ground</span>
              <span class="convo__phase-subtitle">Stay present, don\u2019t abandon your needs</span>
            </div>
          </div>
          <div class="convo__phase-body">
            <div class="convo__script">
              <span class="convo__script-label">Try saying:</span>
              <span class="convo__script-text">\u201CWhat I need going forward is [specific request]. I know change takes time, and I\u2019m committed to working on this together.\u201D</span>
            </div>
            <div class="convo__reframe">
              <span class="convo__reframe-label">If you feel the pull to people-please:</span>
              <span class="convo__reframe-text">Remember: saying what you need isn\u2019t selfish. It\u2019s the foundation of a healthy relationship. Your Session 5 breakthrough proved you can do this.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="convo__checkin">
        <div class="convo__checkin-title">Pre-Conversation Check-In</div>
        <div class="convo__checkin-items">
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I\u2019ve identified the specific outcome I want</span></label>
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I\u2019m approaching this from curiosity, not blame</span></label>
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I\u2019m prepared for discomfort without abandoning my needs</span></label>
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I have a grounding technique ready (box breathing)</span></label>
        </div>
      </div>
      <div class="ai-insight">
        This conversation will activate your anxious attachment patterns. That\u2019s expected. The goal isn\u2019t to feel comfortable \u2014 it\u2019s to stay <strong>present and honest</strong> even when discomfort shows up. You\u2019ve already proven you can set boundaries (Feb 15 breakthrough). This is the next level of that same muscle.
      </div>
    </div>`;
  }

  // --- Alex: Burnout Assessment Thinking State ---
  function buildBurnoutThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I hear you. Let me assess where you are and build a recovery plan.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Assessing your burnout level...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Reviewing recent session notes</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Analyzing emotional patterns</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Building personalized recovery plan...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 4 — Burnout Recovery Plan ---
  function buildBurnoutRecovery() {
    const energyData = [
      { day: 'Mon', level: 3 },
      { day: 'Tue', level: 2 },
      { day: 'Wed', level: 2 },
      { day: 'Thu', level: 4 },
      { day: 'Fri', level: 1 },
      { day: 'Sat', level: 3 },
      { day: 'Sun', level: 2 },
    ];
    const maxLevel = 10;

    const energyBarsHtml = energyData.map(d => {
      const h = Math.round((d.level / maxLevel) * 48);
      const cls = d.level <= 2 ? 'burnout__energy-bar--low' : d.level <= 4 ? 'burnout__energy-bar--mid' : 'burnout__energy-bar--high';
      return `<div class="burnout__energy-col">
        <div class="burnout__energy-bar ${cls}" style="height:${h}px"></div>
        <span class="burnout__energy-day">${d.day}</span>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Burnout isn\u2019t a character flaw \u2014 it\u2019s a signal that something needs to change. Based on everything I know about you, here\u2019s what I see and what I recommend.</p>
    </div>
    <div class="chat-response-card" id="burnoutCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Burnout Assessment & Recovery</div>
          <div class="chat-response-card__subtitle">Personalized recovery protocol</div>
        </div>
      </div>
      <div class="burnout__assessment">
        <div class="burnout__score-section">
          <div class="burnout__score-ring">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="6"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f59e0b" stroke-width="6"
                stroke-dasharray="${2 * Math.PI * 34}"
                stroke-dashoffset="${2 * Math.PI * 34 * (1 - 0.72)}"
                transform="rotate(-90 40 40)"
                stroke-linecap="round"/>
            </svg>
            <div class="burnout__score-center">
              <span class="burnout__score-value">7.2</span>
              <span class="burnout__score-max">/10</span>
            </div>
          </div>
          <div class="burnout__score-detail">
            <span class="burnout__score-label">Burnout Severity</span>
            <span class="burnout__score-desc">Moderate-High. You\u2019re running on reserves, not sustainable energy.</span>
          </div>
        </div>
        <div class="burnout__dimensions">
          <div class="burnout__dimension">
            <span class="burnout__dimension-name">Emotional Exhaustion</span>
            <div class="burnout__dimension-bar"><div class="burnout__dimension-fill burnout__dimension-fill--high" style="width:85%"></div></div>
            <span class="burnout__dimension-value">High</span>
          </div>
          <div class="burnout__dimension">
            <span class="burnout__dimension-name">Depersonalization</span>
            <div class="burnout__dimension-bar"><div class="burnout__dimension-fill burnout__dimension-fill--mid" style="width:55%"></div></div>
            <span class="burnout__dimension-value">Moderate</span>
          </div>
          <div class="burnout__dimension">
            <span class="burnout__dimension-name">Sense of Accomplishment</span>
            <div class="burnout__dimension-bar"><div class="burnout__dimension-fill burnout__dimension-fill--low" style="width:30%"></div></div>
            <span class="burnout__dimension-value">Low</span>
          </div>
        </div>
      </div>
      <div class="burnout__energy">
        <div class="burnout__energy-title">Your Energy This Week</div>
        <div class="burnout__energy-chart">${energyBarsHtml}</div>
        <div class="burnout__energy-avg">Average: <strong>2.4/10</strong> \u2014 significantly below your baseline of 5.8</div>
      </div>
      <div class="burnout__recovery">
        <div class="burnout__recovery-title">Recovery Protocol</div>
        <div class="burnout__phases">
          <div class="burnout__phase">
            <div class="burnout__phase-header">
              <span class="burnout__phase-num">Phase 1</span>
              <span class="burnout__phase-label">Immediate \u2014 This Week</span>
            </div>
            <div class="burnout__phase-items">
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Cancel or delegate 2 non-essential commitments</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Implement a hard stop at 6pm \u2014 no work after</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>10 min morning grounding (box breathing + journaling)</span>
              </div>
            </div>
          </div>
          <div class="burnout__phase">
            <div class="burnout__phase-header">
              <span class="burnout__phase-num">Phase 2</span>
              <span class="burnout__phase-label">Short-term \u2014 Next 2 Weeks</span>
            </div>
            <div class="burnout__phase-items">
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Audit your \u201Cyes\u201D list \u2014 identify obligations driven by guilt, not values</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Reintroduce one activity that\u2019s purely for enjoyment</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Practice saying \u201Cnot right now\u201D without apologizing</span>
              </div>
            </div>
          </div>
          <div class="burnout__phase">
            <div class="burnout__phase-header">
              <span class="burnout__phase-num">Phase 3</span>
              <span class="burnout__phase-label">Structural \u2014 Next 30 Days</span>
            </div>
            <div class="burnout__phase-items">
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Redesign your weekly schedule around energy, not just tasks</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Address the root causes: what boundaries are you not setting?</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Rebuild your identity beyond productivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ai-insight">
        I want to be direct with you: your burnout isn\u2019t just about being \u201Ctoo busy.\u201D Based on your personality profile (Enneagram 4w5, anxious attachment), you tend to absorb others\u2019 emotional weight while neglecting your own needs. The people-pleasing pattern we identified in Session 3 is <strong>directly fueling this burnout</strong>. Recovery starts with the boundary work we\u2019ve been building toward. You\u2019re closer than you think.
      </div>
    </div>`;
  }

  // ===========================================================
  // MIKE AI — COPYWRITING COMPONENTS
  // ===========================================================

  // --- Mike: Webinar Script Thinking State ---
  function buildWebinarThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Building your complete webinar script from scratch. Give me a moment...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking mike__thinking--long">
        <div class="mike__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Building your 1-hour webinar script...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Analyzing your offer...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Selecting proven framework...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing opening hook...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Building content sections...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Crafting offer stack and close...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill mike__progress-fill--long"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 1 — Webinar Script Generator ---
  function buildWebinarScript() {
    const sections = [
      {
        num: 1,
        title: 'Opening Hook & Pattern Interrupt',
        time: '0:00\u20133:00',
        direction: 'Open with a bold, counterintuitive claim that breaks the audience\u2019s existing beliefs. Start with energy \u2014 you have 30 seconds to earn the next 57 minutes.',
        keyLine: '\u201CWhat if everything you\u2019ve been told about [topic] is not just wrong \u2014 but is actually the reason you\u2019re stuck? In the next 60 minutes, I\u2019m going to show you a completely different approach that\u2019s generated over $305 million in revenue.\u201D',
        transition: 'Transition into credibility by connecting the bold claim to your personal story.',
        extra: ''
      },
      {
        num: 2,
        title: 'Origin Story & Credibility',
        time: '3:00\u201310:00',
        direction: 'Tell your \u201Cwound to wisdom\u201D story. You were once where they are. Show the struggle, the turning point, and the transformation. This builds rapport and positions you as the guide, not the guru.',
        keyLine: '\u201CI was $47,000 in debt, working 80-hour weeks, and my best marketing campaign had a 0.4x return. I was ready to quit. Then I discovered something that changed everything \u2014 and I\u2019ve never looked back.\u201D',
        transition: 'Bridge to Secret #1 by saying: \u201CThe first thing I learned was that everyone was focused on the wrong thing entirely...\u201D',
        extra: ''
      },
      {
        num: 3,
        title: 'Secret #1: The Framework',
        time: '10:00\u201322:00',
        direction: 'Introduce your core framework or methodology. Teach the \u201Cwhat\u201D and the \u201Cwhy\u201D, but not the step-by-step \u201Chow.\u201D Give enough value that they think \u201CThis is incredible\u201D but realize they need help implementing.',
        keyLine: '\u201CMost people try to scale by doing more. The Framework flips this: you do less, but you do the right things in the right order. There are 3 pillars, and if any one is missing, the whole system breaks.\u201D',
        transition: 'Transition with a false close: \u201CNow, if that was all I shared today, it would be worth the price of admission. But the second secret is what really unlocks the whole thing...\u201D',
        extra: ''
      },
      {
        num: 4,
        title: 'Secret #2: Internal Belief Shift',
        time: '22:00\u201334:00',
        direction: 'Address the internal belief holding them back (e.g., \u201CI\u2019m not techy enough,\u201D \u201CI don\u2019t have enough experience\u201D). Use a case study of someone who had the same belief and broke through.',
        keyLine: '\u201CSarah came to us convinced she was \u2018too late\u2019 to the market. She was 54, had no audience, and no technical skills. Eight weeks later, she launched to $127,000 in revenue. What changed wasn\u2019t her skills \u2014 it was her belief about what was possible.\u201D',
        transition: 'Bridge to Secret #3: \u201CBut there\u2019s one more obstacle \u2014 and this one isn\u2019t inside your head. It\u2019s the external system working against you...\u201D',
        extra: ''
      },
      {
        num: 5,
        title: 'Secret #3: External Belief Shift',
        time: '34:00\u201344:00',
        direction: 'Address the external excuse (\u201CThe market is saturated,\u201D \u201CAds are too expensive,\u201D \u201CThis won\u2019t work in my niche\u201D). Reframe with data and examples. Destroy the last objection before the offer.',
        keyLine: '\u201CThe market isn\u2019t saturated \u2014 it\u2019s unsophisticated. 94% of your competitors are running the same tired playbook from 2019. When you show up with a framework built on $305M in proven data, you\u2019re not competing. You\u2019re in a category of one.\u201D',
        transition: 'Transition to the offer: \u201CSo here\u2019s the question: do you want to keep going alone, or do you want the complete system?\u201D',
        extra: ''
      },
      {
        num: 6,
        title: 'The Offer Stack',
        time: '44:00\u201352:00',
        direction: 'Present the offer as a stack of value. Anchor each component with its standalone price, then reveal the actual price at the end. Build the value gap.',
        keyLine: '\u201CWhen you add it all up, the total value of everything you\u2019re getting today is $8,485. But you\u2019re not paying anywhere near that.\u201D',
        transition: 'Move into the close by restating the transformation, not the features.',
        extra: `<div class="webinar__offer-stack">
          <div class="webinar__offer-row"><span class="webinar__offer-item">Complete Framework Implementation System</span><span class="webinar__offer-price">$2,997</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">90-Day Action Plan & Templates</span><span class="webinar__offer-price">$997</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">Private Community Access (1 Year)</span><span class="webinar__offer-price">$1,497</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">Weekly Live Q&A Calls</span><span class="webinar__offer-price">$1,997</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">Bonus: Swipe File Library (500+ Templates)</span><span class="webinar__offer-price">$997</span></div>
          <div class="webinar__offer-total"><span>Total Value</span><span>$8,485</span></div>
          <div class="webinar__offer-actual"><span>Your Price Today</span><span>$997</span></div>
        </div>`
      },
      {
        num: 7,
        title: 'Close, Urgency & Objection Handling',
        time: '52:00\u201360:00',
        direction: 'Close with urgency (limited bonuses, price increase, scarcity). Then pre-handle the top 3 objections before they arise. End with a final emotional appeal.',
        keyLine: '\u201CYou have two choices right now. You can close this tab and go back to what you\u2019ve been doing \u2014 and you\u2019ll get the same results you\u2019ve always gotten. Or you can take action today and have the complete system in your hands within the next 5 minutes.\u201D',
        transition: 'Final CTA: \u201CClick the button below to get started now.\u201D',
        extra: `<div class="webinar__objections">
          <div class="webinar__objection">
            <div class="webinar__objection-q">\u201CI can\u2019t afford it right now.\u201D</div>
            <div class="webinar__objection-a">Can you afford another 6 months of the same results? This pays for itself with a single implementation. Plus, we offer a flexible payment plan \u2014 2 payments of $547.</div>
          </div>
          <div class="webinar__objection">
            <div class="webinar__objection-q">\u201CWhat if it doesn\u2019t work for me?\u201D</div>
            <div class="webinar__objection-a">That\u2019s exactly why we include a 90-day results guarantee. Follow the system, do the work, and if you don\u2019t see results, we\u2019ll refund every penny. Zero risk.</div>
          </div>
          <div class="webinar__objection">
            <div class="webinar__objection-q">\u201CI need to think about it.\u201D</div>
            <div class="webinar__objection-a">I respect that. But ask yourself \u2014 what new information will you have tomorrow that you don\u2019t have right now? The bonuses disappear when this webinar ends. The best time to start is today.</div>
          </div>
        </div>`
      }
    ];

    const fullScriptHtml = `<div class="webinar__full-script">
      <div class="webinar__full-note">~8,200 words \u00B7 Showing first 2 sections</div>
      <div class="webinar__full-section">
        <p class="webinar__full-para">What if everything you\u2019ve been told about growing your business online is not just wrong \u2014 but is actually the reason you\u2019re stuck?</p>
        <p class="webinar__full-para">I know that\u2019s a bold statement. But in the next 60 minutes, I\u2019m going to show you a completely different approach \u2014 one that\u2019s been responsible for generating over $305 million in revenue across 47 different niches. And by the end of this presentation, you\u2019re going to have the complete framework to implement it yourself.</p>
        <p class="webinar__full-para">Before we dive in, let me be clear about what this is NOT. This is not another \u201Cjust run Facebook ads\u201D strategy. This is not about hustling 18 hours a day. And this is definitely not about building a complicated funnel that takes 3 months to set up. What I\u2019m about to share is simpler, faster, and more proven than anything you\u2019ve tried before.</p>
        <p class="webinar__full-para">Let me take you back to 2019. I was sitting in a cramped apartment at 2 AM, staring at my Ads Manager, watching my daily spend tick past $400 with exactly zero sales to show for it.</p>
        <p class="webinar__full-para">My credit cards were maxed. I was $47,000 in debt. I had read every marketing book, taken every course, followed every guru. And nothing was working.</p>
        <p class="webinar__full-para">I was ready to quit. I told my partner that night that I was going back to a 9-to-5. That this whole \u201Conline business thing\u201D just wasn\u2019t for people like me.</p>
        <p class="webinar__full-para">But the next morning, something happened that changed the entire trajectory of my life. I got an email from a mentor I\u2019d been following. And in that email was a single question that made everything click.</p>
        <p class="webinar__full-para">\u201CWhat if the problem isn\u2019t your offer, your ads, or your funnel \u2014 what if the problem is the ORDER you\u2019re doing them in?\u201D</p>
        <p class="webinar__full-para">That one question led me to develop what I now call The Framework. And it\u2019s the same system that\u2019s now generated over $305 million \u2014 not just for me, but for 2,100+ students across 47 niches.</p>
        <p class="webinar__full-para">Now, the first thing I learned \u2014 and the thing that nobody was telling me \u2014 was that everyone was focused on the wrong thing entirely. They were obsessing over tactics. The latest ad hack. The newest funnel template. The algorithm change. But none of that matters if you don\u2019t get the foundation right.</p>
        <p class="webinar__full-para">Most people try to scale by doing more. More ads, more content, more launches. The Framework flips this completely. You do less, but you do the right things in the right order. There are 3 pillars, and if any one of them is missing, the whole system breaks.</p>
        <p class="webinar__full-para">Think of it like building a house. You wouldn\u2019t start with the roof, right? But that\u2019s exactly what most entrepreneurs do. They start with ads and funnels \u2014 the roof \u2014 without ever pouring the foundation. And then they wonder why everything keeps collapsing.</p>
      </div>
      <p class="webinar__full-continue">Script continues for remaining sections...</p>
    </div>`;

    const outlineSectionsHtml = sections.map((s, i) => `
      <div class="webinar__section${i === 0 ? ' webinar__section--active' : ''}" data-section="${i}">
        <div class="webinar__section-header">
          <span class="webinar__section-num">${s.num}</span>
          <div>
            <span class="webinar__section-title">${s.title}</span>
            <span class="webinar__section-time">${s.time}</span>
          </div>
        </div>
        <div class="webinar__section-body">
          <p class="webinar__section-direction">${s.direction}</p>
          <div class="webinar__key-line">${s.keyLine}</div>
          ${s.extra}
          <p class="webinar__section-transition"><strong>Transition:</strong> ${s.transition}</p>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Your complete 1-hour webinar script is ready. I\u2019ve used the Perfect Webinar framework \u2014 the same structure behind hundreds of millions in webinar sales. Here\u2019s everything you need to deliver a high-converting presentation.</p>
    </div>
    <div class="chat-response-card" id="webinarCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">1-Hour Webinar Script</div>
          <div class="chat-response-card__subtitle">7 sections \u00B7 ~8,200 words \u00B7 Perfect Webinar Framework</div>
        </div>
        <div class="toggle-pill" data-toggle="webinar-view">
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="outline">Outline</button>
          <button class="toggle-pill__btn" data-value="full">Full Script</button>
        </div>
      </div>
      <div data-panel="outline">
        <div class="webinar__sections" id="webinarSections">
          ${outlineSectionsHtml}
        </div>
      </div>
      <div data-panel="full" class="hidden">
        ${fullScriptHtml}
      </div>
      <div class="webinar__framework-note">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3M8 10h.01" stroke-linecap="round"/></svg>
        <span>Built on the <strong>Perfect Webinar</strong> framework \u2014 the proven structure behind $305M+ in webinar revenue.</span>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Copy Full Script</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Export to Google Docs</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Customize Framework</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Generate Slide Deck Outline</button>
      </div>
    </div>`;
  }

  // --- Mike: Funnel Builder Thinking State ---
  function buildFunnelThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Building your funnel in ClickFunnels and setting up your ad campaigns in Facebook Ads...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking mike__thinking--long">
        <div class="mike__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Connecting to ClickFunnels & Facebook Ads...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Connected to ClickFunnels workspace...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing sales page copy...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Building offer stack and guarantee...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Publishing funnel to ClickFunnels...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Creating ad campaigns in Facebook Ads...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill mike__progress-fill--long"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 2 — Funnel Copy + Ad Campaign Builder ---
  function buildFunnelBuilder() {
    const adVariations = [
      { name: 'Ad 1', angle: 'Pain Point', angleClass: 'pain', primary: 'I wasted 2 years and $43,000 trying to figure this out on my own. Every course, every guru, every "proven system" left me more confused than before. Then I found a completely different approach \u2014 and everything changed in 90 days.', headline: 'Stop Wasting Money on Strategies That Don\u2019t Work', cta: 'See the Framework', placements: ['Feed', 'Stories'], roas: '2.4\u20133.1x' },
      { name: 'Ad 2', angle: 'Curiosity', angleClass: 'curiosity', primary: 'There\u2019s a reason 94% of online businesses fail in year one. And it has nothing to do with their product, their audience, or their budget. It\u2019s something much simpler \u2014 and almost nobody talks about it.', headline: 'The One Mistake Killing 94% of Online Businesses', cta: 'Learn What It Is', placements: ['Feed', 'In-Stream'], roas: '2.1\u20132.7x' },
      { name: 'Ad 3', angle: 'Social Proof', angleClass: 'proof', primary: '2,100+ students. 47 niches. $305M in combined revenue. Here\u2019s what they all have in common \u2014 they stopped following the old playbook and started using The Framework.', headline: 'Join 2,100+ Students Who\u2019ve Transformed Their Results', cta: 'Get the Case Studies', placements: ['Feed', 'Reels'], roas: '2.6\u20133.4x' },
      { name: 'Ad 4', angle: 'FOMO', angleClass: 'fomo', primary: 'We\u2019re opening 50 spots for our next implementation cohort. The last group sold out in 36 hours. If you\u2019ve been waiting for the right time \u2014 this is it.', headline: 'Only 50 Spots Available \u2014 Last Cohort Sold Out in 36 Hours', cta: 'Claim Your Spot', placements: ['Feed', 'Stories'], roas: '1.9\u20132.5x' },
      { name: 'Ad 5', angle: 'Authority', angleClass: 'authority', primary: 'After generating $305M+ in proven results across 47 industries, I\u2019ve distilled everything into one system. This isn\u2019t theory \u2014 it\u2019s a battle-tested framework backed by real data from real campaigns.', headline: '$305M+ in Results. One Framework.', cta: 'Access the System', placements: ['Feed', 'In-Stream'], roas: '2.2\u20132.8x' },
      { name: 'Ad 6', angle: 'Direct Benefit', angleClass: 'benefit', primary: 'What would it mean for your business to have a complete sales system that works on autopilot? No more guessing. No more wasted ad spend. Just a proven framework that converts cold traffic into paying customers.', headline: 'Build a Sales System That Works While You Sleep', cta: 'Start Building', placements: ['Feed', 'Stories', 'Reels'], roas: '2.3\u20133.0x' },
    ];

    const adCardsHtml = adVariations.map(ad => `
      <div class="funnel__ad-card">
        <div class="funnel__ad-header">
          <span class="funnel__ad-name">${ad.name}</span>
          <span class="funnel__angle-pill funnel__angle-pill--${ad.angleClass}">${ad.angle}</span>
        </div>
        <div class="ad-gen__copy">
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Primary Text</span>
            <span class="ad-gen__copy-value ad-gen__copy-value--body">${ad.primary}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Headline</span>
            <span class="ad-gen__copy-value">${ad.headline}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">CTA</span>
            <span class="ad-gen__copy-value">${ad.cta}</span>
          </div>
        </div>
        <div class="funnel__ad-meta">
          <div class="ad-gen__formats">
            ${ad.placements.map(p => `<span class="ad-gen__format-pill">${p}</span>`).join('')}
          </div>
          <span class="funnel__roas-pill">Predicted ROAS: ${ad.roas}</span>
        </div>
      </div>
    `).join('');

    const faqItems = [
      { q: 'How quickly will I see results?', a: 'Most students see their first results within 14\u201321 days of implementation. Full system optimization typically happens within 60\u201390 days. The framework is designed for speed \u2014 we\u2019ve eliminated everything that doesn\u2019t directly drive revenue.' },
      { q: 'Does this work for my niche?', a: 'The Framework has been proven across 47 different niches \u2014 from fitness to SaaS, from coaching to e-commerce. The principles are universal because they\u2019re based on human psychology, not platform tricks.' },
      { q: 'What if I\u2019m not tech-savvy?', a: 'You don\u2019t need to be. Everything comes with step-by-step video walkthroughs, done-for-you templates, and our support team is available 7 days a week. If you can send an email, you can implement this system.' },
      { q: 'Is there a guarantee?', a: 'Absolutely. You\u2019re covered by our 90-Day Results Guarantee. Follow the implementation plan, put in the work, and if you don\u2019t see measurable results, we\u2019ll refund every penny. No questions, no hassle.' },
    ];

    const faqHtml = faqItems.map((item, i) => `
      <div class="funnel__faq-item${i === 0 ? ' funnel__faq-item--active' : ''}" data-faq="${i}">
        <div class="funnel__faq-q">${item.q}</div>
        <div class="funnel__faq-a">${item.a}</div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Done. I\u2019ve built your sales funnel in ClickFunnels and created 6 ad variations in Facebook Ads. Here\u2019s everything that\u2019s live:</p>
    </div>
    <div class="chat-response-card" id="funnelCard">
      <div class="funnel__platform-header">
        <div class="funnel__platform-icon funnel__platform-icon--cf">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 3v18" stroke-linecap="round"/></svg>
        </div>
        <div>
          <div class="funnel__platform-name">Sales Funnel <span class="funnel__platform-badge">Built in ClickFunnels</span></div>
          <div class="funnel__platform-status">${CHECK_SVG} Published \u00B7 6 page sections \u00B7 Live at yoursite.com/framework</div>
        </div>
      </div>
      <div class="funnel__page-content">
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Headline</span>
          <div class="funnel__headline">The Proven Framework That\u2019s Generated $305M+ in Revenue \u2014 Now Available to You</div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Sub-headline</span>
          <div class="funnel__subheadline">Discover the exact system 2,100+ entrepreneurs are using to build profitable businesses in 90 days or less \u2014 without burning cash on ads that don\u2019t convert.</div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Lead / Opening</span>
          <p class="funnel__body-text">If you\u2019re tired of throwing money at marketing strategies that promise the world and deliver nothing, you\u2019re not alone. The average entrepreneur wastes $12,000 on courses, tools, and ads before finding something that actually works.</p>
          <p class="funnel__body-text">But what if there was a way to skip the expensive trial-and-error? A proven, data-backed framework that\u2019s already generated over $305 million in real revenue across 47 different niches?</p>
          <p class="funnel__body-text">That\u2019s exactly what you\u2019re about to discover.</p>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">The Problem</span>
          <div class="funnel__pain-points">
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Spending hundreds per day on ads with nothing to show for it</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Buying course after course that teaches theory, not results</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Watching competitors grow while you\u2019re stuck at the same level</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Working 60+ hour weeks with no predictable revenue system</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Feeling overwhelmed by conflicting advice from every \u201Cexpert\u201D</div>
          </div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Offer Stack</span>
          <div class="webinar__offer-stack">
            <div class="webinar__offer-row"><span class="webinar__offer-item">Complete Framework Implementation System</span><span class="webinar__offer-price">$4,997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">90-Day Action Plan & Templates</span><span class="webinar__offer-price">$1,997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Private Community (1 Year)</span><span class="webinar__offer-price">$2,497</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Weekly Live Implementation Calls</span><span class="webinar__offer-price">$2,997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Bonus: 500+ Swipe File Library</span><span class="webinar__offer-price">$997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Bonus: Private 1-on-1 Strategy Call</span><span class="webinar__offer-price">$997</span></div>
            <div class="webinar__offer-total"><span>Total Value</span><span>$14,485</span></div>
            <div class="webinar__offer-actual"><span>Your Price Today</span><span>$1,997</span></div>
          </div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Guarantee</span>
          <div class="funnel__guarantee">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div>
              <strong>90-Day Results or Full Refund</strong>
              <span>Follow the implementation plan and put in the work. If you don\u2019t see measurable results within 90 days, email us and we\u2019ll refund every penny. No questions asked.</span>
            </div>
          </div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">FAQ</span>
          <div class="funnel__faq" id="funnelFaq">
            ${faqHtml}
          </div>
        </div>
      </div>
      <div class="funnel__platform-header funnel__platform-header--fb">
        <div class="funnel__platform-icon funnel__platform-icon--fb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <div class="funnel__platform-name">Ad Campaign <span class="funnel__platform-badge">Created in Facebook Ads</span></div>
          <div class="funnel__platform-status">${CHECK_SVG} 6 variations \u00B7 Multi-angle \u00B7 Ready to launch</div>
        </div>
      </div>
      <div class="funnel__ads-grid">
        ${adCardsHtml}
      </div>
      <div class="ai-insight">
        This campaign uses the <strong>Problem-Agitate-Solve</strong> framework across 6 angles. The offer stack has a <strong>7.25x value-to-price ratio</strong> \u2014 well above the 5x minimum for high-converting funnels. I recommend testing <strong>Ads 1 and 3</strong> first (Pain Point and Social Proof consistently outperform other angles in cold traffic).
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Open in ClickFunnels</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Launch Ad Campaign</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Edit Copy</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Generate More Variations</button>
      </div>
    </div>`;
  }

  // --- Mike: Email Thinking State ---
  function buildEmailThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Creating your high-converting email welcome sequence...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking">
        <div class="mike__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 6l-10 7L2 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Writing your 5-email welcome sequence...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Mapping subscriber journey...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing Email 1: Welcome & Hook...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing Email 2: Story & Value...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing Emails 3\u20135: Nurture to Offer...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 3 — Email Welcome Sequence ---
  function buildEmailSequence() {
    const emails = [
      {
        num: 1,
        title: 'The Welcome Email',
        day: 'Day 0',
        subject: 'You\u2019re in \u2014 here\u2019s what happens next',
        preview: 'Plus the one thing 94% of people get wrong...',
        openRate: '65\u201375%',
        body: `<p>Subject: <strong>You\u2019re in \u2014 here\u2019s what happens next</strong></p>
<p>Hey [First Name],</p>
<p>Welcome \u2014 you just made one of the smartest decisions you\u2019ll make this year.</p>
<p>Over the next 10 days, I\u2019m going to share the exact framework that\u2019s generated over $305M in revenue. Not theory. Not fluff. The actual system.</p>
<p>But first, I need to warn you about something: <strong>94% of people who download this will never implement it.</strong> Not because it\u2019s hard. But because they\u2019ll try to do everything at once instead of following the sequence.</p>
<p>Don\u2019t be that person.</p>
<p>Tomorrow, I\u2019ll share the origin story behind this framework \u2014 including the $47,000 mistake that led to everything.</p>
<p>Talk soon,<br/>[Name]</p>
<p>P.S. Hit reply and tell me your #1 business challenge right now. I read every response.</p>`
      },
      {
        num: 2,
        title: 'The Origin Story',
        day: 'Day 1',
        subject: 'The $47,000 mistake that changed everything',
        preview: 'I was ready to quit. Then this happened...',
        openRate: '55\u201365%',
        body: `<p>Subject: <strong>The $47,000 mistake that changed everything</strong></p>
<p>Hey [First Name],</p>
<p>In 2019, I was $47,000 in debt. My ads were bleeding money. My \u201Cproven funnel\u201D had a 0.4x return.</p>
<p>I\u2019d tried everything the gurus told me to do. More ad spend. Better targeting. Longer sales pages. Nothing worked.</p>
<p>Then a mentor asked me one question that changed everything:</p>
<p><strong>\u201CWhat if the problem isn\u2019t what you\u2019re doing \u2014 but the ORDER you\u2019re doing it in?\u201D</strong></p>
<p>That single insight led to what I now call The Framework. Within 90 days, I went from losing money to generating $127,000 in a single launch.</p>
<p>The difference wasn\u2019t working harder. It was working in the right sequence.</p>
<p>Tomorrow, I\u2019m going to teach you the first pillar of that sequence \u2014 the one thing that makes everything else work.</p>
<p>[Name]</p>`
      },
      {
        num: 3,
        title: 'The Value Bomb',
        day: 'Day 3',
        subject: 'The #1 framework piece most people skip',
        preview: 'This alone is worth more than most courses...',
        openRate: '45\u201355%',
        body: `<p>Subject: <strong>The #1 framework piece most people skip</strong></p>
<p>Hey [First Name],</p>
<p>Most people start with the product. Or the ads. Or the funnel.</p>
<p>They\u2019re all wrong.</p>
<p><strong>Pillar #1 of The Framework is: Offer Architecture.</strong></p>
<p>Here\u2019s the rule: Your offer needs to be so good that people feel stupid saying no. That means:</p>
<ul>
<li>The value stack must be 7\u201310x the price</li>
<li>Each component must solve a specific objection</li>
<li>The guarantee must remove 100% of the risk</li>
</ul>
<p>When your offer is built correctly, everything downstream gets easier \u2014 your ads convert better, your sales page writes itself, and your close rate doubles.</p>
<p>Here\u2019s a quick exercise: Look at your current offer. Does it pass the 7x test? If someone calculated the real-world value of everything included, would it be 7x what you\u2019re charging?</p>
<p>If not, that\u2019s your #1 priority. Fix the offer, and the rest follows.</p>
<p>[Name]</p>
<p>P.S. On Day 5, I\u2019m sharing a case study that\u2019ll blow your mind. Stay tuned.</p>`
      },
      {
        num: 4,
        title: 'The Social Proof',
        day: 'Day 5',
        subject: 'She went from $0 to $127K in 8 weeks',
        preview: 'And she started with zero audience...',
        openRate: '50\u201360%',
        body: `<p>Subject: <strong>She went from $0 to $127K in 8 weeks</strong></p>
<p>Hey [First Name],</p>
<p>Meet Sarah.</p>
<p>54 years old. No audience. No tech skills. No previous online business experience.</p>
<p>She joined our program convinced she was \u201Ctoo late\u201D to make it work. Her exact words: \u201CEveryone in my niche is 25 and on TikTok. I don\u2019t stand a chance.\u201D</p>
<p><strong>8 weeks later, she launched to $127,000 in revenue.</strong></p>
<p>What changed? She stopped trying to copy what worked for 25-year-olds and started using a framework built on proven principles \u2014 principles that work regardless of age, niche, or platform.</p>
<p>Sarah\u2019s results aren\u2019t unusual. Our average student sees a 340% ROI within 90 days. Some see results in week one.</p>
<p>The difference isn\u2019t talent or luck. It\u2019s having the right system.</p>
<p>In 5 days, I\u2019m going to share how you can get access to the complete Framework \u2014 with everything you need to implement it yourself.</p>
<p>[Name]</p>`
      },
      {
        num: 5,
        title: 'The Offer',
        day: 'Day 10',
        subject: 'Doors are open (but not for long)',
        preview: 'Everything you need to implement The Framework...',
        openRate: '40\u201350%',
        body: `<p>Subject: <strong>Doors are open (but not for long)</strong></p>
<p>Hey [First Name],</p>
<p>For the past 10 days, I\u2019ve shared the story, the framework, and the proof.</p>
<p>Now it\u2019s decision time.</p>
<p><strong>The Framework Implementation Program is officially open for enrollment.</strong></p>
<p>Here\u2019s what you get:</p>
<ul>
<li>The complete Framework system (video + workbooks)</li>
<li>90-Day implementation roadmap</li>
<li>500+ proven swipe files and templates</li>
<li>Private community access</li>
<li>Weekly live Q&A calls</li>
</ul>
<p>Total value: $14,485. Your investment today: <strong>$1,997</strong> (or 2 payments of $1,047).</p>
<p>And you\u2019re covered by our 90-Day Results Guarantee. If you follow the system and don\u2019t see results, you get a full refund. Period.</p>
<p>But here\u2019s the thing \u2014 we\u2019re only opening 50 spots in this cohort. The last one filled in 36 hours.</p>
<p><strong>[ENROLL NOW \u2192]</strong></p>
<p>[Name]</p>
<p>P.S. Everyone who enrolls in the next 24 hours gets a bonus 1-on-1 strategy call with our team ($997 value). This bonus disappears at midnight.</p>`
      }
    ];

    const timelineHtml = emails.map((e, i) => `
      <div class="email-seq__timeline-point${i === 0 ? ' email-seq__timeline-point--active' : ''}">
        <div class="email-seq__timeline-dot"></div>
        <span class="email-seq__timeline-label">${e.day}</span>
      </div>
    `).join('');

    const emailAccordionHtml = emails.map((e, i) => `
      <div class="email-seq__email${i === 0 ? ' email-seq__email--active' : ''}" data-email="${i}">
        <div class="email-seq__email-header">
          <span class="email-seq__email-num">${e.num}</span>
          <div>
            <span class="email-seq__email-title">${e.title}</span>
            <span class="email-seq__email-meta">${e.day} \u00B7 Predicted open rate: ${e.openRate}</span>
          </div>
        </div>
        <div class="email-seq__email-body">
          <div class="email-seq__subject-line">
            <span class="ad-gen__copy-label">Subject Line</span>
            <span class="email-seq__subject-text">${e.subject}</span>
          </div>
          <div class="email-seq__preview-text">
            <span class="ad-gen__copy-label">Preview Text</span>
            <span class="email-seq__preview-value">${e.preview}</span>
          </div>
          <div class="email-seq__email-content">
            ${e.body}
          </div>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Your 5-email welcome sequence is ready. I\u2019ve built this using the Story-Value-Proof-Offer framework \u2014 each email has a specific job that moves subscribers closer to buying.</p>
    </div>
    <div class="chat-response-card" id="emailSeqCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Email Welcome Sequence</div>
          <div class="chat-response-card__subtitle">5 emails \u00B7 10-day sequence \u00B7 Story-Value-Proof-Offer</div>
        </div>
      </div>
      <div class="email-seq__timeline">
        ${timelineHtml}
      </div>
      <div class="email-seq__emails" id="emailSeqAccordion">
        ${emailAccordionHtml}
      </div>
      <div class="email-seq__stats">
        <div class="email-seq__stat"><span class="email-seq__stat-value">5</span><span class="email-seq__stat-label">Emails</span></div>
        <div class="email-seq__stat"><span class="email-seq__stat-value">~4,200</span><span class="email-seq__stat-label">Words</span></div>
        <div class="email-seq__stat"><span class="email-seq__stat-value">10-Day</span><span class="email-seq__stat-label">Sequence</span></div>
        <div class="email-seq__stat"><span class="email-seq__stat-value">~45%</span><span class="email-seq__stat-label">Avg Open Rate</span></div>
      </div>
      <div class="ai-insight">
        This sequence follows the <strong>Story-Value-Proof-Offer</strong> framework. Each email has one job: Email 1 hooks them, Email 2 builds connection through story, Email 3 delivers value that creates reciprocity, Email 4 provides social proof that eliminates doubt, and Email 5 makes the offer. Subject line formula: <strong>Specificity + Curiosity Gap</strong> \u2014 every subject line either includes a number or opens a loop.
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Copy All Emails</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Export Sequence</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Add More Emails</button>
      </div>
    </div>`;
  }

  // --- Mike: Hook Generator Thinking State ---
  function buildHookThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Generating 10 high-performing ad hooks across multiple angles...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking">
        <div class="mike__thinking-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Generating 10 ad hook variations...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Analyzing your offer angle...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Pulling from proven hook database...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Generating 10 variations...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 4 — Ad Hook Generator ---
  function buildHookGenerator() {
    const hooks = [
      { num: '01', angle: 'Pain Point', angleClass: 'pain', text: 'I wasted $43,000 on marketing before I discovered the one thing nobody was telling me.', use: 'Cold traffic \u00B7 Feed ads', performance: 'High CTR \u00B7 Strong stop-scroll' },
      { num: '02', angle: 'Pain Point', angleClass: 'pain', text: 'If your ads stopped working and you don\u2019t know why, it\u2019s probably not what you think.', use: 'Retargeting \u00B7 Feed & Stories', performance: 'High relevance \u00B7 Low CPC' },
      { num: '03', angle: 'Curiosity', angleClass: 'curiosity', text: 'There\u2019s a reason 94% of online businesses fail \u2014 and it has nothing to do with their product.', use: 'Cold traffic \u00B7 Feed ads', performance: 'High CTR \u00B7 Strong curiosity gap' },
      { num: '04', angle: 'Curiosity', angleClass: 'curiosity', text: 'The biggest lie in marketing is that you need a big audience to make big money.', use: 'Cold traffic \u00B7 All placements', performance: 'Broad appeal \u00B7 High share rate' },
      { num: '05', angle: 'Social Proof', angleClass: 'proof', text: '2,100 students. 47 niches. $305M in combined results. Here\u2019s what they all did differently.', use: 'Lookalike audiences \u00B7 Feed', performance: 'Strong trust signal \u00B7 High CVR' },
      { num: '06', angle: 'Social Proof', angleClass: 'proof', text: 'She was 54 with zero audience. 8 weeks later, she launched to $127K. This is the framework she used.', use: 'Cold traffic \u00B7 Reels & Stories', performance: 'High engagement \u00B7 Story-driven' },
      { num: '07', angle: 'Challenge', angleClass: 'challenge', text: 'If you can\u2019t explain your offer in one sentence, you don\u2019t have an offer \u2014 you have a list of features.', use: 'Cold traffic \u00B7 Feed ads', performance: 'Polarizing \u00B7 High comment rate' },
      { num: '08', angle: 'Challenge', angleClass: 'challenge', text: 'You don\u2019t need another course. You need a system that actually tells you what to do on Day 1, Day 2, Day 3.', use: 'Retargeting \u00B7 Feed & In-Stream', performance: 'Objection-killer \u00B7 High CVR' },
      { num: '09', angle: 'Story', angleClass: 'story', text: 'At 2 AM, $47K in debt, I almost quit everything. Then I got an email that changed my life.', use: 'Cold traffic \u00B7 Reels', performance: 'Emotional hook \u00B7 High watch time' },
      { num: '10', angle: 'Story', angleClass: 'story', text: 'My mentor asked me one question. That question turned a failing business into a $305M framework.', use: 'Cold traffic \u00B7 All placements', performance: 'Curiosity + story \u00B7 High CTR' },
    ];

    const hookCardsHtml = hooks.map(h => `
      <div class="hook-gen__card" data-angle="${h.angleClass}">
        <div class="hook-gen__card-top">
          <span class="hook-gen__num">${h.num}</span>
          <span class="funnel__angle-pill funnel__angle-pill--${h.angleClass}">${h.angle}</span>
        </div>
        <div class="hook-gen__text">${h.text}</div>
        <div class="hook-gen__meta">
          <span class="hook-gen__use">${h.use}</span>
          <span class="hook-gen__perf">${h.performance}</span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are 10 ad hooks across 5 proven angles. Each hook is designed to stop the scroll and drive clicks \u2014 ready to plug into any ad format.</p>
    </div>
    <div class="chat-response-card" id="hookGenCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Ad Hook Library</div>
          <div class="chat-response-card__subtitle">10 hooks \u00B7 5 angles \u00B7 Multiple placements</div>
        </div>
      </div>
      <div class="hook-gen__filters" id="hookFilters">
        <button class="competitor__filter-btn competitor__filter-btn--active" data-hfilter="all">All Hooks <span class="competitor__filter-count">10</span></button>
        <button class="competitor__filter-btn" data-hfilter="pain">Pain Point <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="curiosity">Curiosity <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="proof">Social Proof <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="challenge">Challenge <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="story">Story <span class="competitor__filter-count">2</span></button>
      </div>
      <div class="hook-gen__cards" id="hookCards">
        ${hookCardsHtml}
      </div>
      <div class="hook-gen__strategy">
        <div class="hook-gen__strategy-title">Hook Strategy Analysis</div>
        <div class="hook-gen__strategy-chips">
          <span class="ad-gen__format-pill">Pattern Interrupt</span>
          <span class="ad-gen__format-pill">Specificity</span>
          <span class="ad-gen__format-pill">Curiosity Gap</span>
          <span class="ad-gen__format-pill">Social Proof</span>
          <span class="ad-gen__format-pill">Emotional Trigger</span>
        </div>
        <p class="hook-gen__strategy-text">These hooks use 5 proven psychological triggers. The most effective hooks combine <strong>specificity</strong> (exact numbers and results) with <strong>curiosity gaps</strong> (open loops that demand resolution). Test Pain Point hooks for direct response and Story hooks for brand awareness.</p>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Copy All Hooks</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Generate 10 More</button>
        <button class="ad-gen__btn ad-gen__btn--ghost" id="hookToFunnel">Turn Hooks into Full Ads</button>
      </div>
    </div>`;
  }

  // ===========================================================
  // COMPONENT INTERACTIONS
  // ===========================================================

  function initComponentInteractions(container) {
    // Toggle pills (shared)
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const btns = pill.querySelectorAll('.toggle-pill__btn');
      const toggleName = pill.dataset.toggle;
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
          btn.classList.add('toggle-pill__btn--active');
          // Find panels in this card
          const card = pill.closest('.chat-response-card');
          if (toggleName === 'nutrition-view') {
            const daily = card.querySelector('[data-panel="daily"]');
            const weeklyPanel = card.querySelector('[data-panel="weekly"]');
            if (btn.dataset.value === 'daily') {
              daily.classList.remove('hidden');
              weeklyPanel.classList.add('hidden');
            } else {
              daily.classList.add('hidden');
              weeklyPanel.classList.remove('hidden');
            }
          }
        });
      });
    });

    // Cal AI add button
    const addBtn = container.querySelector('#calAiAddBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const footer = container.querySelector('#calAiFooter');
        footer.innerHTML = `
          <div class="cal-ai__added">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Added to Today's Plan — 738 kcal logged
          </div>`;
      });
    }

    // Competitor filter buttons
    const competitorFilters = container.querySelector('#competitorFilters');
    if (competitorFilters) {
      const filterBtns = competitorFilters.querySelectorAll('.competitor__filter-btn');
      const adCards = container.querySelectorAll('.competitor__ad-card');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          adCards.forEach(card => {
            if (filter === 'all' || card.dataset.format === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // Ad Creative Generator tabs
    const adGenTabs = container.querySelector('#adGenTabs');
    if (adGenTabs) {
      const tabs = adGenTabs.querySelectorAll('.ad-gen__tab');
      const card = adGenTabs.closest('.chat-response-card');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('ad-gen__tab--active'));
          tab.classList.add('ad-gen__tab--active');
          const idx = tab.dataset.concept;
          card.querySelectorAll('[data-concept-panel]').forEach(panel => {
            panel.classList.toggle('hidden', panel.dataset.conceptPanel !== idx);
          });
        });
      });
    }

    // Ad Creative Generator "Generate Images" button
    const genImagesBtn = container.querySelector('#adGenGenerateImages');
    if (genImagesBtn) {
      genImagesBtn.addEventListener('click', () => {
        sendMessage('Generate images for these ad concepts', false);
      });
    }

    // Creative Preview variation selection
    const previewGrid = container.querySelector('#creativePreviewGrid');
    if (previewGrid) {
      const variations = previewGrid.querySelectorAll('.creative-preview__variation');
      const selectionEl = container.querySelector('#creativePreviewSelection');
      variations.forEach(v => {
        v.addEventListener('click', () => {
          v.classList.toggle('creative-preview__variation--selected');
          const selectedCount = previewGrid.querySelectorAll('.creative-preview__variation--selected').length;
          if (selectionEl) {
            selectionEl.innerHTML = `Selected: <strong>${selectedCount} of 4</strong> variations`;
          }
        });
      });
    }

    // Video diagnostic volume control
    const videoWrap = container.querySelector('.video-diagnostic__wrap');
    if (videoWrap) {
      const video = videoWrap.querySelector('.video-diagnostic__player');
      const muteBtn = videoWrap.querySelector('.video-diagnostic__volume-btn');
      const slider = videoWrap.querySelector('.video-diagnostic__volume-slider');
      const volIcon = videoWrap.querySelector('.video-diagnostic__vol-icon');
      const muteIcon = videoWrap.querySelector('.video-diagnostic__mute-icon');

      function updateVolumeUI() {
        const muted = video.muted || video.volume === 0;
        volIcon.classList.toggle('hidden', muted);
        muteIcon.classList.toggle('hidden', !muted);
        slider.value = muted ? 0 : video.volume;
      }

      video.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
      });

      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateVolumeUI();
      });

      slider.addEventListener('input', () => {
        video.volume = parseFloat(slider.value);
        video.muted = video.volume === 0;
        updateVolumeUI();
      });
    }

    // Personality toggle (overview/traits)
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const toggleName = pill.dataset.toggle;
      if (toggleName === 'personality-view') {
        const btns = pill.querySelectorAll('.toggle-pill__btn');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
            btn.classList.add('toggle-pill__btn--active');
            const card = pill.closest('.chat-response-card');
            const overview = card.querySelector('[data-panel="overview"]');
            const traits = card.querySelector('[data-panel="traits"]');
            if (btn.dataset.value === 'overview') {
              overview.classList.remove('hidden');
              traits.classList.add('hidden');
            } else {
              overview.classList.add('hidden');
              traits.classList.remove('hidden');
            }
          });
        });
      }
    });

    // Conversation guide phase accordion
    const convoPhases = container.querySelector('#convoPhases');
    if (convoPhases) {
      const phases = convoPhases.querySelectorAll('.convo__phase');
      phases.forEach(phase => {
        phase.querySelector('.convo__phase-header').addEventListener('click', () => {
          phases.forEach(p => p.classList.remove('convo__phase--active'));
          phase.classList.add('convo__phase--active');
          scrollToBottom();
        });
      });
    }

    // Form analyzer compare toggle
    const compareToggle = container.querySelector('#formCompareToggle');
    if (compareToggle) {
      compareToggle.addEventListener('click', () => {
        const switchEl = container.querySelector('#formCompareSwitch');
        const sideBySide = container.querySelector('#formSideBySide');
        const singleView = container.querySelector('#formAnalyzerImageSingle');
        const isActive = switchEl.classList.toggle('form-analyzer__compare-toggle--active');
        if (isActive) {
          if (singleView) singleView.classList.add('hidden');
          sideBySide.classList.remove('hidden');
        } else {
          if (singleView) singleView.classList.remove('hidden');
          sideBySide.classList.add('hidden');
        }
        scrollToBottom();
      });
    }

    // --- Mike AI: Webinar toggle (outline/full script) ---
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const toggleName = pill.dataset.toggle;
      if (toggleName === 'webinar-view') {
        const btns = pill.querySelectorAll('.toggle-pill__btn');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
            btn.classList.add('toggle-pill__btn--active');
            const card = pill.closest('.chat-response-card');
            const outline = card.querySelector('[data-panel="outline"]');
            const full = card.querySelector('[data-panel="full"]');
            if (btn.dataset.value === 'outline') {
              outline.classList.remove('hidden');
              full.classList.add('hidden');
            } else {
              outline.classList.add('hidden');
              full.classList.remove('hidden');
            }
            scrollToBottom();
          });
        });
      }
    });

    // --- Mike AI: Webinar section accordion ---
    const webinarSections = container.querySelector('#webinarSections');
    if (webinarSections) {
      const sections = webinarSections.querySelectorAll('.webinar__section');
      sections.forEach(section => {
        section.querySelector('.webinar__section-header').addEventListener('click', () => {
          sections.forEach(s => s.classList.remove('webinar__section--active'));
          section.classList.add('webinar__section--active');
          scrollToBottom();
        });
      });
    }

    // --- Mike AI: Funnel FAQ accordion ---
    const funnelFaq = container.querySelector('#funnelFaq');
    if (funnelFaq) {
      const items = funnelFaq.querySelectorAll('.funnel__faq-item');
      items.forEach(item => {
        item.querySelector('.funnel__faq-q').addEventListener('click', () => {
          const wasActive = item.classList.contains('funnel__faq-item--active');
          items.forEach(i => i.classList.remove('funnel__faq-item--active'));
          if (!wasActive) item.classList.add('funnel__faq-item--active');
          scrollToBottom();
        });
      });
    }

    // --- Mike AI: Email sequence accordion ---
    const emailAccordion = container.querySelector('#emailSeqAccordion');
    if (emailAccordion) {
      const emails = emailAccordion.querySelectorAll('.email-seq__email');
      emails.forEach(email => {
        email.querySelector('.email-seq__email-header').addEventListener('click', () => {
          emails.forEach(e => e.classList.remove('email-seq__email--active'));
          email.classList.add('email-seq__email--active');
          scrollToBottom();
        });
      });
    }

    // --- Mike AI: Hook filter buttons ---
    const hookFilters = container.querySelector('#hookFilters');
    if (hookFilters) {
      const filterBtns = hookFilters.querySelectorAll('.competitor__filter-btn');
      const hookCards = container.querySelectorAll('.hook-gen__card');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.hfilter;
          hookCards.forEach(card => {
            if (filter === 'all' || card.dataset.angle === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Mike AI: "Turn Hooks into Full Ads" cross-component trigger ---
    const hookToFunnel = container.querySelector('#hookToFunnel');
    if (hookToFunnel) {
      hookToFunnel.addEventListener('click', () => {
        sendMessage('Create a full sales funnel with ad campaigns', false);
      });
    }
  }

  // ===========================================================
  // AI RESPONSE ROUTING
  // ===========================================================

  function getAIResponse(userText) {
    const lower = userText.toLowerCase();

    // --- Copywriting AI component triggers (Mike) ---

    // Webinar Script Generator
    if (lower.includes('webinar script') || lower.includes('webinar') && lower.includes('script') ||
        lower.includes('presentation script') || lower.includes('1-hour webinar') ||
        lower.includes('build me a webinar') || lower.includes('webinar for my offer') ||
        lower.includes('webinar script from scratch')) {
      return { component: buildWebinarScript(), webinarLoading: true };
    }

    // Funnel Copy + Ad Campaign Builder
    if (lower.includes('sales funnel') || lower.includes('funnel') && lower.includes('ad campaign') ||
        lower.includes('funnel copy') || lower.includes('sales page') && lower.includes('ad') ||
        lower.includes('complete sales funnel') || lower.includes('funnel and ad') ||
        lower.includes('funnel with ad')) {
      return { component: buildFunnelBuilder(), funnelLoading: true };
    }

    // Email Welcome Sequence
    if (lower.includes('email') && lower.includes('sequence') || lower.includes('email welcome') ||
        lower.includes('email drip') || lower.includes('welcome sequence') ||
        lower.includes('email series') || lower.includes('nurture sequence') ||
        lower.includes('5-part email')) {
      return { component: buildEmailSequence(), emailLoading: true };
    }

    // Ad Hook Generator
    if (lower.includes('ad hook') || lower.includes('hook variations') || lower.includes('hook generator') ||
        lower.includes('10 ad hook') || lower.includes('different angles') && lower.includes('hook') ||
        lower.includes('hook library') || lower.includes('ad hooks')) {
      return { component: buildHookGenerator(), hookLoading: true };
    }

    // --- Mindset coach component triggers ---

    // Personality Profile Dashboard
    if (lower.includes('personality profile') || lower.includes('disc') || lower.includes('enneagram') ||
        lower.includes('attachment style') || lower.includes('coaching insights') ||
        lower.includes('my personality') || lower.includes('assessment results')) {
      return { component: buildPersonalityDashboard(), personalityLoading: true };
    }

    // Session History & Emotional Progress
    if (lower.includes('session history') || lower.includes('emotional progress') ||
        lower.includes('how have i been progressing') || lower.includes('my sessions') ||
        lower.includes('coaching journey') || lower.includes('my progress')) {
      return { component: buildSessionHistory(), sessionLoading: true };
    }

    // Difficult Conversation Guide
    if (lower.includes('difficult conversation') || lower.includes('tough conversation') ||
        lower.includes('navigate a conversation') || lower.includes('hard conversation') ||
        lower.includes('confront') || lower.includes('bring something up to')) {
      return { component: buildConversationGuide(), conversationLoading: true };
    }

    // Burnout Recovery
    if (lower.includes('burned out') || lower.includes('burnout') || lower.includes('emotionally exhausted') ||
        lower.includes('overwhelmed') || lower.includes('can\'t keep going') || lower.includes('running on empty')) {
      return { component: buildBurnoutRecovery(), burnoutLoading: true };
    }

    // --- Business component triggers ---

    // PM Hub: project management, tasks across platforms
    if (lower.includes('pull my tasks') || lower.includes('monday') && lower.includes('clickup') ||
        lower.includes('project management') || lower.includes('team workload') ||
        lower.includes('all platforms') || lower.includes('monday') && lower.includes('asana') ||
        lower.includes('pull my projects') || lower.includes('tasks and projects')) {
      return { component: buildPmHubDashboard(), pmHubConnecting: true };
    }

    // Financial Overview: cash flow, revenue, finances
    if (lower.includes('financial overview') || lower.includes('cash flow') || lower.includes('cash position') ||
        lower.includes('revenue') && !lower.includes('client') || lower.includes('quickbooks') ||
        lower.includes('expenses') || lower.includes('my finances') || lower.includes('p&l') ||
        lower.includes('profit and loss') || lower.includes('bank balance') || lower.includes('cash on hand')) {
      return { component: buildFinDashboard(), finConnecting: true };
    }

    // Unified Data Chat: client profitability, cross-reference
    if (lower.includes('profitable') || lower.includes('churning') || lower.includes('churn risk') ||
        lower.includes('client profitability') || lower.includes('which clients') ||
        lower.includes('cross-reference') || lower.includes('compare client')) {
      return { component: buildUnifiedDataResult(), unifiedThinking: true };
    }

    // Accountability Watchdog: attention, alerts, issues
    if (lower.includes('needs my attention') || lower.includes('anything i should know') ||
        lower.includes('what did i miss') || lower.includes('alerts') || lower.includes('watchdog') ||
        lower.includes('falling through') || lower.includes('catch up') || lower.includes('daily briefing') ||
        lower.includes('attention today')) {
      return { component: buildWatchdogAlert() };
    }

    // --- Marketing component triggers ---

    // Ad Performance Diagnostic: campaigns died out, what should I do
    if (lower.includes('died out') || lower.includes('campaigns were working') && lower.includes('what should i do') ||
        lower.includes('campaign died') || lower.includes('ads stopped working') ||
        lower.includes('performance dropped') || lower.includes('campaigns stopped')) {
      return { component: buildVideoDiagnosticResponse(), videoDiagnostic: true };
    }

    // Generated Creative Preview (must be before Ad Creative Generator to avoid false match)
    if (lower.includes('generate images') || lower.includes('create images') ||
        lower.includes('generate visuals') || lower.includes('make the images')) {
      return { component: buildCreativePreview(), creatingImages: true };
    }

    // FB Ads Performance Analyzer
    if (lower.includes('facebook ad') || lower.includes('campaign performance') ||
        lower.includes('ad performance') || lower.includes('roas') ||
        lower.includes('campaign analytics') || lower.includes('ad spend') ||
        lower.includes('how are my campaigns') || lower.includes('show me my facebook')) {
      return { component: buildFbAdsPerformance(), connecting: true };
    }

    // Competitor Ad Library Browser
    if (lower.includes('competitor') || lower.includes('ad library') ||
        lower.includes('spy on') || lower.includes('what ads are') ||
        lower.includes('competitor ads') || lower.includes('pull competitor')) {
      return { component: buildCompetitorBrowser(), searching: true };
    }

    // Ad Creative Generator
    if (lower.includes('generate') && (lower.includes('ad') || lower.includes('creative') || lower.includes('concept')) ||
        lower.includes('create new ads') || lower.includes('ad concepts') ||
        lower.includes('new creative') || lower.includes('write ad copy')) {
      return { component: buildAdCreativeGenerator(), generating: true };
    }

    // Cal AI triggers
    if (lower.includes('scan') || lower.includes('photo') || lower.includes('what did i eat') ||
        lower.includes('analyze my meal') || lower.includes('food photo') || lower.includes('log this meal')) {
      return { component: buildCalAIScanner(), scanning: true, userImage: IMG.meal };
    }

    // Habit tracker triggers
    if (lower.includes('streak') || lower.includes('consistency') || lower.includes('calendar') ||
        lower.includes('how many days') || lower.includes('workout history') || lower.includes('habit') ||
        lower.includes('show my workouts')) {
      return { component: buildHabitTracker() };
    }

    // Form analyzer triggers
    if (lower.includes('form check') || lower.includes('analyze my form') || lower.includes('check my squat') ||
        lower.includes('form analysis') || lower.includes('correct my form') || lower.includes('review my form')) {
      return { component: buildFormAnalyzer(), userImage: IMG.squat };
    }

    // Nutrition tracker triggers
    if (lower.includes('macros') || lower.includes('calories today') || lower.includes('nutrition dashboard') ||
        lower.includes('daily nutrition') || lower.includes('calorie') || lower.includes('how am i doing nutrition') ||
        lower.includes('show my macros') || lower.includes('calculate my macros')) {
      return { component: buildNutritionTracker() };
    }

    // Existing text responses
    if (lower.includes('full-body') || lower.includes('45 minute') || lower.includes('workout')) {
      return {
        text: `<p>Great question! Here's a solid 45-minute full-body session you can do with minimal equipment:</p>
<p><strong>Warm-up (5 min)</strong></p>
<ul><li>Jumping jacks — 1 min</li><li>Leg swings — 30 sec each side</li><li>Arm circles to push-up walkouts — 2 min</li></ul>
<p><strong>Strength Circuit (30 min — 3 rounds)</strong></p>
<ul><li>Goblet squats — 12 reps</li><li>Push-ups (or dumbbell bench press) — 10 reps</li><li>Romanian deadlifts — 10 reps</li><li>Dumbbell rows — 10 each arm</li><li>Overhead press — 10 reps</li><li>Rest 60 sec between rounds</li></ul>
<p><strong>Finisher (5 min)</strong></p>
<ul><li>30 sec burpees, 30 sec rest x 5</li></ul>
<p><strong>Cool-down (5 min)</strong> — Light stretching, focus on hip flexors and shoulders.</p>
<p>Want me to adjust the intensity or swap any exercises based on your equipment?</p>`,
        chips: ['Make it harder', 'Bodyweight only version', 'Add a core focus']
      };
    }

    if (lower.includes('meal plan') || lower.includes('nutrition') || lower.includes('muscle')) {
      return {
        text: `<p>I'd love to help with your meal plan! To give you the best recommendations for building lean muscle, I need to understand a few things first:</p>
<p><strong>Quick questions:</strong></p>
<ul><li>What's your current body weight and height?</li><li>How many meals per day do you prefer?</li><li>Any dietary restrictions?</li><li>What does a typical day of eating look like right now?</li></ul>
<p>In the meantime, here are the <strong>key principles</strong> for lean muscle gain:</p>
<ul><li><strong>Protein target:</strong> 0.8–1g per pound of bodyweight daily</li><li><strong>Calorie surplus:</strong> ~200–300 kcal above maintenance</li><li><strong>Meal timing:</strong> Protein distributed across 4+ meals</li><li><strong>Pre/post workout:</strong> Prioritize carbs + protein around training</li></ul>
<p>Share your details and I'll build you something personalized.</p>`,
        chips: ['Calculate my macros', 'Show me a sample day', 'I eat vegetarian']
      };
    }

    if (lower.includes('knee') || lower.includes('pain') || lower.includes('squat')) {
      return {
        text: `<p>Knee pain during squats is something I see a lot, and the good news is — it's usually fixable.</p>
<p><strong>Common causes:</strong></p>
<ul><li><strong>Ankle mobility:</strong> Limited dorsiflexion forces your knees to compensate</li><li><strong>Knee tracking:</strong> Knees collapsing inward</li><li><strong>Depth too fast:</strong> Control the eccentric phase — 3 seconds down</li><li><strong>Quad dominance:</strong> Shifting weight forward puts more load on the knee joint</li></ul>
<p><strong>Immediate action plan:</strong></p>
<ol><li>Switch to box squats at a comfortable depth for 2 weeks</li><li>Add ankle mobility drills (wall ankle stretches, 2 min daily)</li><li>Foam roll quads and IT band before sessions</li><li>Strengthen VMO with terminal knee extensions</li></ol>
<p>If the pain is sharp or causes swelling — please see a physiotherapist. I want to keep you training safely long-term.</p>`,
        chips: ['Show me ankle mobility drills', 'What about front squats instead?']
      };
    }

    if (lower.includes('sleep') || lower.includes('5 hour') || lower.includes('tired') || lower.includes('recovery')) {
      return {
        text: `<p>Training on poor sleep is one of the biggest mistakes I see.</p>
<p><strong>What changes after a bad night:</strong></p>
<ul><li>Reaction time and coordination drop — higher injury risk</li><li>Growth hormone release is impaired</li><li>Cortisol is elevated</li><li>Perceived exertion goes up — everything feels harder</li></ul>
<p><strong>My recommendation for today:</strong></p>
<ul><li><strong>Do train</strong>, but drop intensity to 70%</li><li>Cut volume by ~30%</li><li>Skip heavy compounds</li><li>Focus on machines and isolation work</li><li>Keep session to 30–35 minutes</li><li>Prioritize a 20 min nap before training</li></ul>
<p>Sleep is your #1 recovery tool. One bad night is manageable; a pattern needs addressing.</p>`,
        chips: ['Help me fix my sleep routine', 'Give me a light session for today']
      };
    }

    // Default
    return {
      text: `<p>That's a great question! Let me think about the best way to approach this for your specific situation.</p>
<p>Could you tell me a bit more about:</p>
<ul><li>Your current fitness level?</li><li>How many days per week you can train?</li><li>Any equipment you have access to?</li></ul>
<p>The more context you give me, the more personalized my advice will be.</p>`,
      chips: ['I train 4x per week', "I'm a beginner", 'I have a home gym']
    };
  }

  // --- Helpers ---
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
});
