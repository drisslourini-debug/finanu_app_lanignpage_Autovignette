// ===== GLOBAL HELPER: Show/Hide Elements =====
function showElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.remove('hidden');
}

function hideElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.add('hidden');
}

function showElements(...elementIds) {
    elementIds.forEach(id => showElement(id));
}

function hideElements(...elementIds) {
    elementIds.forEach(id => hideElement(id));
}

// ===== MOBILE DETECTION & OPTIMIZATION =====
const isMobile = () => window.innerWidth < 768;
const isSmallMobile = () => window.innerWidth < 480;

// Detect if touch device
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

// ===== Quiz State Management =====
let quizState = {
    currentStep: 1,
    totalQuestions: 2,
    answers: {
        1: null,  // Auto in CH?
        2: null   // Auto-Versicherung
    },
    eligible: false
};

// ===== UX Enhancement: Time estimates per step =====
const timeEstimates = {
    1: 1,  // 1 minute total at start
    2: 0   // Less than 1 minute
};

// ===== Social Proof Data =====
const recentActivities = [
    { name: 'Sandra', city: 'Zürich', action: 'hat soeben CHF 40 gespart', time: 2 },
    { name: 'Marco', city: 'Bern', action: 'hat sich qualifiziert', time: 5 },
    { name: 'Lisa', city: 'Basel', action: 'vergleicht Angebote', time: 8 },
    { name: 'Thomas', city: 'Luzern', action: 'hat sich qualifiziert', time: 12 },
    { name: 'Anna', city: 'Genf', action: 'hat soeben CHF 40 gespart', time: 15 }
];

let activityIndex = 0;

// ===== 3D Vignette Tilt Effect (disabled on mobile) =====
const visualCard = document.querySelector('.visual-card');
const heroVisual = document.querySelector('.hero-visual');

if (visualCard && heroVisual && !isMobile()) {
    heroVisual.addEventListener('mousemove', function(e) {
        const rect = heroVisual.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation angles (max 15 degrees)
        const rotateY = ((mouseX - centerX) / centerX) * 15;
        const rotateX = ((centerY - mouseY) / centerY) * 15;
        
        visualCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener('mouseleave', function() {
        visualCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// Mobile-specific touch handling
if (isTouchDevice() && visualCard) {
    visualCard.style.transform = 'scale(1)';
}

// ===== DOM Elements =====
const heroSection = document.getElementById('heroSection');
const quizSection = document.getElementById('quizSection');
const resultsSection = document.getElementById('resultsSection');
const notEligibleSection = document.getElementById('notEligibleSection');
const progressFill = document.getElementById('progressFill');
const currentStepSpan = document.getElementById('currentStep');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const mobileStickyCta = document.getElementById('mobileStickyCta');

// ===== INITIALIZE EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // CTA Buttons
    const navStartQuizBtn = document.getElementById('navStartQuizBtn');
    const heroCtaBtn = document.getElementById('heroCtaBtn');
    
    if (navStartQuizBtn) navStartQuizBtn.addEventListener('click', startQuiz);
    if (heroCtaBtn) heroCtaBtn.addEventListener('click', startQuiz);
    if (mobileStickyCta) mobileStickyCta.addEventListener('click', startQuiz);
    
    // Quiz Navigation
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (backBtn) backBtn.addEventListener('click', previousQuestion);
    
    // Question Option Buttons
    const q1OptionYes = document.getElementById('q1OptionYes');
    const q1OptionNo = document.getElementById('q1OptionNo');
    
    if (q1OptionYes) q1OptionYes.addEventListener('click', function() { selectAnswer(1, 'yes'); });
    if (q1OptionNo) q1OptionNo.addEventListener('click', function() { selectAnswer(1, 'no'); });
    
    // Email Capture Form
    const emailCaptureBtn = document.getElementById('emailCaptureBtn');
    if (emailCaptureBtn) emailCaptureBtn.addEventListener('click', handleInlineEmailCapture);
    
    // OS Selection Buttons
    const iosButton = document.getElementById('iosButton');
    const androidButton = document.getElementById('androidButton');
    
    if (iosButton) iosButton.addEventListener('click', function() { selectOS('ios'); });
    if (androidButton) androidButton.addEventListener('click', function() { selectOS('android'); });
    
    // Retry Quiz
    const retryQuizBtn = document.getElementById('retryQuizBtn');
    if (retryQuizBtn) retryQuizBtn.addEventListener('click', resetQuiz);
}

// ===== Start Quiz =====
function startQuiz() {
    heroSection.style.display = 'none';
    showElement('quizSection');
    showElement('liveProofBar');
    showElements('activityFeed');
    hideElement('mobileStickyCta');
    
    startLiveCounter();
    startActivityFeed();
    
    // Smooth scroll with mobile adjustment
    const scrollDelay = isMobile() ? 300 : 100;
    setTimeout(() => {
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            const headerOffset = 80;
            const elementPosition = quizContainer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, scrollDelay);
    
    // Focus first question on mobile
    if (isMobile()) {
        setTimeout(() => {
            const firstQuestion = document.getElementById('question1');
            if (firstQuestion) {
                firstQuestion.focus();
            }
        }, 500);
    }
}

// ===== Select Answer =====
function selectAnswer(questionNumber, answer) {
    quizState.answers[questionNumber] = answer;

    // Visual feedback for option buttons
    if (questionNumber === 1) {
        const options = document.querySelectorAll(`#question${questionNumber} .option-btn`);
        options.forEach(btn => btn.classList.remove('selected'));

        if (answer === 'yes') {
            options[0].classList.add('selected');
        } else if (answer === 'no') {
            options[1].classList.add('selected');
        }
    }

    // Enable next button when answer is selected
    nextBtn.disabled = false;

    // Show instant feedback
    showInstantFeedback(questionNumber, answer);

    console.log(`Answer ${questionNumber}: ${answer}`);
    console.log('Current State:', quizState.answers);
}

// ===== Show Instant Feedback =====
function showInstantFeedback(questionNumber, answer) {
    const feedbackDiv = document.getElementById('instantFeedback');
    if (!feedbackDiv) return;

    let feedbackHTML = '';
    
    if (questionNumber === 1 && answer === 'yes') {
        feedbackHTML = `
            <div class="feedback-success animate-slide-in">
                <span class="feedback-icon">✓</span>
                <span class="feedback-text">Super! Du erfüllst die Grundvoraussetzung</span>
            </div>
        `;
    } else if (questionNumber === 2 && answer) {
        const insurerBonuses = {
            'axa': 20,
            'allianz': 20,
            'helvetia': 15,
            'zurich': 15
        };
        const bonus = insurerBonuses[answer] || 0;
        
        if (bonus > 0) {
            feedbackHTML = `
                <div class="feedback-success animate-slide-in">
                    <span class="feedback-icon">✓</span>
                    <span class="feedback-text">${answer.toUpperCase()}-Kunden erhalten Zusatz-Bonus von CHF ${bonus}</span>
                </div>
            `;
        } else {
            feedbackHTML = `
                <div class="feedback-success animate-slide-in">
                    <span class="feedback-icon">✓</span>
                    <span class="feedback-text">Perfekt! Wir prüfen die besten Angebote für dich</span>
                </div>
            `;
        }
    }
    
    if (feedbackHTML) {
        feedbackDiv.innerHTML = feedbackHTML;
        feedbackDiv.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 3000);
    }
}

// ===== Next Question =====
function nextQuestion() {
    if (quizState.answers[quizState.currentStep] === null) {
        showFormError('Bitte beantworte die Frage, bevor du fortfährst.');
        return;
    }

    // Check eligibility after first question
    if (quizState.currentStep === 1 && quizState.answers[1] === 'no') {
        // User doesn't qualify - redirect to not eligible section
        setTimeout(() => {
            hideElement('quizSection');
            showElement('notEligibleSection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
        return;
    }

    // Move to next question
    if (quizState.currentStep < 2) {
        const currentQuestion = document.getElementById(`question${quizState.currentStep}`);
        currentQuestion.classList.remove('active');

        quizState.currentStep++;

        const nextQuestion = document.getElementById(`question${quizState.currentStep}`);
        nextQuestion.classList.add('active');

        // Update progress
        updateProgress();

        // Show back button
        backBtn.style.display = 'block';

        // Disable next button until answer is selected
        nextBtn.disabled = true;

        // Hide next button on last question and show submit instead
        if (quizState.currentStep === 2) {
            nextBtn.textContent = 'Quiz abschließen';
        }
    } else {
        // Submit quiz
        submitQuiz();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Previous Question =====
function previousQuestion() {
    if (quizState.currentStep > 1) {
        const currentQuestion = document.getElementById(`question${quizState.currentStep}`);
        currentQuestion.classList.remove('active');

        quizState.currentStep--;

        const prevQuestion = document.getElementById(`question${quizState.currentStep}`);
        prevQuestion.classList.add('active');

        // Update progress
        updateProgress();

        // Restore next button text
        if (quizState.currentStep < 2) {
            nextBtn.textContent = 'Weiter →';
        }

        // Hide back button on first question
        if (quizState.currentStep === 1) {
            backBtn.style.display = 'none';
        }

        // Enable next button since we already have this answer
        nextBtn.disabled = false;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Update Progress Bar =====
function updateProgress() {
    const percentage = (quizState.currentStep / 2) * 100;
    progressFill.style.width = percentage + '%';
    currentStepSpan.textContent = quizState.currentStep;
    
    // Update time estimate
    const timeRemainingSpan = document.getElementById('timeRemaining');
    if (timeRemainingSpan) {
        const time = timeEstimates[quizState.currentStep];
        timeRemainingSpan.textContent = time;
    }
}

// ===== Submit Quiz =====
function submitQuiz() {
    console.log('Quiz submitted with answers:', quizState.answers);

    // Bestimmung der Eligibilität:
    // Q1: Ja (Auto in CH)
    // Q2: Beliebige Auto-Versicherung

    const isEligible =
        quizState.answers[1] === 'yes' &&
        quizState.answers[2] !== null &&
        quizState.answers[2] !== '';

    if (isEligible) {
        quizState.eligible = true;
        showResults();
    } else {
        showNotEligible();
    }
}

// ===== Show Results =====
function showResults() {
    quizSection.style.display = 'none';
    resultsSection.style.display = 'flex';
    
    // Initially hide OS selection and app download sections until email is captured
    const osSelectionSection = document.getElementById('osSelectionSection');
    if (osSelectionSection) {
        osSelectionSection.style.display = 'none';
    }
    
    const appDownloadSection = document.getElementById('appDownloadSection');
    if (appDownloadSection) {
        appDownloadSection.style.display = 'none';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Get insurance name from code
    const carInsuranceCode = quizState.answers[2];
    const carInsuranceMap = {
        'allianz': 'Allianz',
        'axa': 'AXA',
        'generali': 'Generali',
        'helvetia': 'Helvetia',
        'zurich': 'Zurich',
        'mobiliar': 'Mobiliar',
        'vaudoise': 'Vaudoise',
        'sympany': 'Sympany',
        'other': 'Andere'
    };

    console.log('User qualified! Car Insurance:', carInsuranceMap[carInsuranceCode]);
}

// ===== Show Not Eligible =====
function showNotEligible() {
    quizSection.style.display = 'none';
    notEligibleSection.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Reset Quiz =====
function resetQuiz() {
    quizState = {
        currentStep: 1,
        totalQuestions: 2,
        answers: {
            1: null,
            2: null
        },
        eligible: false
    };

    // Reset UI
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById('question1').classList.add('active');

    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));

    const selectDropdown = document.getElementById('carInsuranceSelect');
    selectDropdown.value = '';

    nextBtn.textContent = 'Weiter →';
    nextBtn.disabled = true;
    backBtn.style.display = 'none';

    updateProgress();

    // Show quiz section again
    notEligibleSection.style.display = 'none';
    resultsSection.style.display = 'none';
    quizSection.style.display = 'flex';
    if (mobileStickyCta) {
        mobileStickyCta.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Handle Inline Email Capture =====
function handleInlineEmailCapture() {
    const fullNameInput = document.getElementById('fullNameInline');
    const emailInput = document.getElementById('emailAddressInline');
    const gdprCheckbox = document.getElementById('gdprConsent');
    
    const name = fullNameInput?.value.trim();
    const email = emailInput?.value.trim();
    const gdprAccepted = gdprCheckbox?.checked;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validation
    const errors = [];
    
    if (!name) {
        errors.push('Bitte gib deinen Namen ein');
        fullNameInput?.setAttribute('aria-invalid', 'true');
    }
    
    if (!email) {
        errors.push('Bitte gib deine E-Mail-Adresse ein');
        emailInput?.setAttribute('aria-invalid', 'true');
    } else {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Bitte gib eine gültige E-Mail-Adresse ein');
            emailInput?.setAttribute('aria-invalid', 'true');
        }
    }
    
    if (!gdprAccepted) {
        errors.push('Bitte akzeptiere die Datenschutzrichtlinie');
        gdprCheckbox?.setAttribute('aria-invalid', 'true');
    }
    
    if (errors.length > 0) {
        showFormError(errors.join('\n'));
        return;
    }
    
    // All validations passed
    fullNameInput?.removeAttribute('aria-invalid');
    emailInput?.removeAttribute('aria-invalid');
    gdprCheckbox?.removeAttribute('aria-invalid');
    
    // Update checklist with email
    updateChecklistWithEmail(email);
    
    // Hide inline form
    hideElement('emailFormInline');
    
    // Show OS selection inline
    showElement('osSelectionInline');
    
    // Store email for later use
    window.capturedEmail = email;
    window.capturedName = name;
    
    // Log for debugging
    console.log('Lead captured:', { name, email, gdprAccepted });
    
    // Send to backend (could be Supabase, Make webhook, etc.)
    sendLeadToBackend({ name, email, gdprAccepted });
}

function clearFormErrors() {
    const feedbackDiv = document.getElementById('instantFeedback');
    if (feedbackDiv) {
        feedbackDiv.innerHTML = '';
        hideElement('instantFeedback');
    }
}

function showFormError(message) {
    const feedbackDiv = document.getElementById('instantFeedback');
    if (feedbackDiv) {
        feedbackDiv.innerHTML = `
            <div class="feedback-error animate-slide-in">
                <span class="feedback-icon">✗</span>
                <span class="feedback-text">${message.replace(/\n/g, '<br>')}</span>
            </div>
        `;
        showElement('instantFeedback');
        
        // Scroll to error
        setTimeout(() => {
            feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            hideElement('instantFeedback');
        }, 4000);
    }
}

async function sendLeadToBackend(data) {
    try {
        // Example: Send to Make webhook or your backend API
        // Uncomment and replace with your actual endpoint:
        /*
        const response = await fetch('YOUR_WEBHOOK_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to send data');
        }
        */
        
        console.log('Lead sent to backend:', data);
    } catch (error) {
        console.error('Error sending lead:', error);
        showFormError('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}

// ===== Update Checklist with Email =====
function updateChecklistWithEmail(email) {
    // Update email display elements
    const emailDisplays = [
        document.getElementById('userEmailDisplay'),
        document.getElementById('emailForApp'),
        document.getElementById('emailReminder'),
        document.getElementById('emailMatchDisplay')
    ];
    
    emailDisplays.forEach(el => {
        if (el) {
            el.textContent = email;
            el.style.color = '#dc2626';
            el.style.fontWeight = '700';
        }
    });
    
    // Update email captured checklist item to completed
    const emailStep = document.getElementById('emailCapturedStep');
    if (emailStep) {
        emailStep.classList.remove('pending');
        emailStep.classList.add('completed');
        
        const icon = emailStep.querySelector('.check-icon');
        if (icon) icon.textContent = '✓';
        
        const status = emailStep.querySelector('.check-status');
        if (status) status.textContent = 'Erledigt';
        
        const span = emailStep.querySelector('span');
        if (span) {
            span.innerHTML = `Mit <strong style="color: #dc2626;">${email}</strong> reserviert`;
        }
    }
    
    // Highlight app download step (becomes active)
    const appDownloadStep = document.getElementById('appDownloadStep');
    if (appDownloadStep) {
        appDownloadStep.classList.remove('pending');
        appDownloadStep.classList.add('active');
        
        const icon = appDownloadStep.querySelector('.check-icon');
        if (icon) {
            icon.textContent = '3';
            icon.classList.add('pulse-icon');
        }
        
        const status = appDownloadStep.querySelector('.check-status');
        if (status) status.textContent = 'Jetzt';
    }
}

// ===== Select OS and Show App Download (inline version) =====
function selectOS(os) {
    // Hide OS selection inline
    const osSelectionInline = document.getElementById('osSelectionInline');
    if (osSelectionInline) {
        osSelectionInline.style.display = 'none';
    }
    
    // Update app download step to completed
    const appDownloadStep = document.getElementById('appDownloadStep');
    if (appDownloadStep) {
        appDownloadStep.classList.remove('active');
        appDownloadStep.classList.add('completed');
        
        const icon = appDownloadStep.querySelector('.check-icon');
        if (icon) {
            icon.textContent = '✓';
            icon.classList.remove('pulse-icon');
        }
        
        const status = appDownloadStep.querySelector('.check-status');
        if (status) status.textContent = 'Erledigt';
        
        const span = appDownloadStep.querySelector('.check-content span');
        if (span) {
            span.textContent = os === 'ios' ? 'iPhone / iPad ausgewählt' : 'Android ausgewählt';
        }
    }
    
    // Activate register step
    const registerStep = document.getElementById('registerStep');
    if (registerStep) {
        registerStep.classList.remove('pending');
        registerStep.classList.add('active');
        
        const icon = registerStep.querySelector('.check-icon');
        if (icon) {
            icon.textContent = '4';
            icon.classList.add('pulse-icon');
        }
        
        const status = registerStep.querySelector('.check-status');
        if (status) status.textContent = 'Jetzt';
    }
    
    // Generate appropriate app store link
    let appStoreUrl = '';
    let badgeHtml = '';
    
    if (os === 'ios') {
        appStoreUrl = 'https://apps.apple.com/ch/app/finanu-schweiz/id6738845629';
        badgeHtml = '<img src="assets/app-badges/apple-app-store.svg" alt="Im App Store laden" style="width: 180px; height: auto;">';
    } else if (os === 'android') {
        appStoreUrl = 'https://play.google.com/store/apps/details?id=app.ditcompany.finanu&pcampaignid=web_share&pli=1';
        badgeHtml = '<img src="assets/app-badges/google-play-store.svg" alt="Jetzt bei Google Play" style="width: 200px; height: auto;">';
    }
    
    // Update inline app download
    const appStoreLink = document.getElementById('appStoreLink');
    const appStoreBadge = document.getElementById('appStoreBadge');
    
    if (appStoreLink && appStoreBadge) {
        appStoreLink.href = appStoreUrl;
        appStoreBadge.innerHTML = badgeHtml;
    }
    
    // Show inline app download
    const appDownloadInline = document.getElementById('appDownloadInline');
    if (appDownloadInline) {
        appDownloadInline.style.display = 'block';
        
        // Smooth scroll to register step
        setTimeout(() => {
            registerStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    }
    
    // Generate appropriate app store button (old section - kept for compatibility)
    let buttonHTML = '';
    if (os === 'ios') {
        buttonHTML = `
            <a href="https://apps.apple.com/ch/app/finanu-schweiz/id6738845629" target="_blank" class="app-button-large apple">
                <img src="assets/app-badges/apple-app-store.svg" alt="Download on Apple App Store">
            </a>
        `;
    } else if (os === 'android') {
        buttonHTML = `
            <a href="https://play.google.com/store/apps/details?id=app.ditcompany.finanu&pcampaignid=web_share&pli=1" target="_blank" class="app-button-large google">
                <img src="assets/app-badges/google-play-store.svg" alt="Get it on Google Play">
            </a>
        `;
    }
    
    appDownloadButtons.innerHTML = buttonHTML;
    
    // Show app download section
    appDownloadSection.style.display = 'block';
    appDownloadSection.style.opacity = '0';
    setTimeout(() => {
        appDownloadSection.style.transition = 'opacity 0.5s ease';
        appDownloadSection.style.opacity = '1';
        appDownloadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    // Hide OS selection section
    const osSelectionSection = document.getElementById('osSelectionSection');
    if (osSelectionSection) {
        setTimeout(() => {
            osSelectionSection.style.display = 'none';
        }, 500);
    }
}

// ===== Email Capture & Supabase Integration =====
async function handleEmailCapture(event) {
    event.preventDefault();

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    
    // Validate inputs
    const nameValid = validateName(nameInput);
    const emailValid = validateEmail(emailInput);
    
    if (!nameValid || !emailValid) {
        return;
    }

    const userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();

    try {
        // Stage 1: Sending
        showLoadingState('sending');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Stage 2: Checking
        showLoadingState('checking');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Email Capture Data:', {
            name: userName,
            email: userEmail,
            carInsurance: quizState.answers[2],
            eligibleForVignette: true,
            timestamp: new Date().toISOString(),
            step: 'Email verified - Awaiting doc upload in app'
        });
        
        // Stage 3: Preparing
        showLoadingState('preparing');
        await new Promise(resolve => setTimeout(resolve, 800));

        // TODO: Integrate with Supabase
        // Example Supabase integration:
        /*
        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    name: userName,
                    email: userEmail,
                    insurance: quizState.answers[2],
                    vignette_eligibility_status: 'Pending',
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;

        // Send webhook to Make/Zapier for Welcome Email
        await fetch('YOUR_WEBHOOK_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                type: 'welcome'
            })
        });
        */

        hideLoadingState();
        
        // Update live checklist with email
        updateChecklistWithEmail(userEmail);
        
        // Hide email capture form, show app download section
        const emailCaptureSection = document.getElementById('emailCaptureSection');
        if (emailCaptureSection) {
            emailCaptureSection.style.display = 'none';
        }
        
        // Scroll to app download section
        const appDownloadSection = document.querySelector('.app-download-section');
        if (appDownloadSection) {
            appDownloadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

    } catch (error) {
        console.error('Error:', error);
        hideLoadingState();
        
        // Error feedback
        alert('❌ Verbindung unterbrochen. Bitte versuche es erneut.');
    }
}

// ===== Social Proof: Live Counter =====
function startLiveCounter() {
    const liveCountEl = document.getElementById('liveCount');
    if (!liveCountEl) return;
    
    let count = 23;
    
    setInterval(() => {
        // Random fluctuation between 18-28
        const change = Math.random() > 0.5 ? 1 : -1;
        count = Math.max(18, Math.min(28, count + change));
        liveCountEl.textContent = count;
    }, 5000); // Update every 5 seconds
}

// ===== Social Proof: Activity Feed =====
function startActivityFeed() {
    showNextActivity();
    
    setInterval(() => {
        showNextActivity();
    }, 8000); // New activity every 8 seconds
}

function showNextActivity() {
    const feedEl = document.getElementById('activityFeed');
    if (!feedEl) return;
    
    const activity = recentActivities[activityIndex % recentActivities.length];
    activityIndex++;
    
    const activityHTML = `
        <div class="activity-item animate-slide-in">
            <span class="activity-icon">✓</span>
            <span class="activity-text">
                <strong>${activity.name}</strong> aus ${activity.city} ${activity.action}
            </span>
            <span class="activity-time">vor ${activity.time} Min</span>
        </div>
    `;
    
    // Replace content with slide animation
    feedEl.innerHTML = activityHTML;
    
    // Auto-hide after 7 seconds
    setTimeout(() => {
        feedEl.innerHTML = '';
    }, 7000);
}

// ===== Smart Sticky CTA =====
let lastScrollY = window.scrollY;
let isScrollingDown = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    isScrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;
    
    if (mobileStickyCta && !mobileStickyCta.classList.contains('hidden')) {
        // Hide CTA when scrolling down, show when scrolling up
        if (isScrollingDown && currentScrollY > 100) {
            mobileStickyCta.style.transform = 'translateY(100px)';
        } else {
            mobileStickyCta.style.transform = 'translateY(0)';
        }
        
        // Hide CTA when hero is in viewport
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0) {
                mobileStickyCta.style.opacity = '0';
                mobileStickyCta.style.pointerEvents = 'none';
            } else {
                mobileStickyCta.style.opacity = '1';
                mobileStickyCta.style.pointerEvents = 'auto';
            }
        }
    }
});

// ===== Form Validation =====
function setupFormValidation() {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateName(nameInput));
        nameInput.addEventListener('input', () => clearError(nameInput));
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmail(emailInput));
        emailInput.addEventListener('input', () => clearError(emailInput));
    }
}

function validateName(input) {
    const wrapper = input.closest('.input-wrapper');
    const value = input.value.trim();
    
    if (value.length < 2) {
        showInputError(wrapper, 'Bitte gib deinen vollständigen Namen ein');
        return false;
    }
    
    showInputSuccess(wrapper);
    return true;
}

function validateEmail(input) {
    const wrapper = input.closest('.input-wrapper');
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showInputError(wrapper, 'Bitte gib eine gültige E-Mail-Adresse ein');
        return false;
    }
    
    showInputSuccess(wrapper);
    return true;
}

function showInputError(wrapper, message) {
    const errorSpan = wrapper.querySelector('.input-error');
    const iconSpan = wrapper.querySelector('.input-icon');
    const input = wrapper.querySelector('input');
    
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
    if (iconSpan) {
        iconSpan.textContent = '✗';
        iconSpan.style.display = 'block';
        iconSpan.style.color = '#ef4444';
    }
    if (input) {
        input.style.borderColor = '#ef4444';
    }
}

function showInputSuccess(wrapper) {
    const errorSpan = wrapper.querySelector('.input-error');
    const iconSpan = wrapper.querySelector('.input-icon');
    const input = wrapper.querySelector('input');
    
    if (errorSpan) {
        errorSpan.style.display = 'none';
    }
    if (iconSpan) {
        iconSpan.textContent = '✓';
        iconSpan.style.display = 'block';
        iconSpan.style.color = '#10b981';
    }
    if (input) {
        input.style.borderColor = '#10b981';
    }
}

function clearError(input) {
    const wrapper = input.closest('.input-wrapper');
    const errorSpan = wrapper.querySelector('.input-error');
    const iconSpan = wrapper.querySelector('.input-icon');
    
    if (errorSpan) {
        errorSpan.style.display = 'none';
    }
    if (iconSpan) {
        iconSpan.style.display = 'none';
    }
    if (input) {
        input.style.borderColor = '';
    }
}

// ===== Loading States =====
function showLoadingState(stage) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnArrow = submitBtn.querySelector('.btn-arrow');
    const loadingText = document.getElementById('loadingText');
    
    btnText.style.display = 'none';
    btnArrow.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
    
    const stages = {
        'sending': '✉️ E-Mail wird gesendet...',
        'checking': '🔄 Berechtigung wird geprüft...',
        'preparing': '✅ Fast geschafft! App-Link wird vorbereitet...'
    };
    
    loadingText.textContent = stages[stage] || 'Lädt...';
}

function hideLoadingState() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnArrow = submitBtn.querySelector('.btn-arrow');
    
    btnText.style.display = 'inline';
    btnArrow.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
}

// ===== Animate Today Counter =====
function animateTodayCounter() {
    const todayCountEl = document.getElementById('todayCount');
    if (!todayCountEl) return;
    
    let count = 820;
    const target = 847;
    const duration = 2000;
    const increment = Math.ceil((target - count) / (duration / 50));
    
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        todayCountEl.textContent = count;
    }, 50);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz initialized with UX enhancements');
    updateProgress();
    setupFormValidation();
    animateTodayCounter();
    
    // Increment today counter every minute
    setInterval(() => {
        const todayCountEl = document.getElementById('todayCount');
        if (todayCountEl) {
            let current = parseInt(todayCountEl.textContent);
            todayCountEl.textContent = current + Math.floor(Math.random() * 3);
        }
    }, 60000);
});
