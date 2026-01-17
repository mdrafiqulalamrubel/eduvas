// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle features
function toggleFeatures(btn) {
    const detail = btn.nextElementSibling;
    detail.classList.toggle('active');
    btn.textContent = detail.classList.contains('active') ? 'Show Less -' : 'View All Features +';
}

// Modal functions
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Form submission handler
function handleSubmit(event, type) {
    event.preventDefault();
    alert('Thank you for your interest! We will contact you shortly at the provided email address.');
    closeModal(type);
    event.target.reset();
}

// Price calculator
const checkboxes = document.querySelectorAll('.module-check');
const priceDisplay = document.getElementById('totalPrice');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePrice);
});

function updatePrice() {
    let total = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.dataset.price);
        }
    });
    priceDisplay.textContent = '$' + total.toLocaleString();
}

// Investment summary calculator
let currentTier = 'basic';

function selectTier(tier) {
    currentTier = tier;
    
    // Update button styles
    const basicBtn = document.getElementById('basicTier');
    const premiumBtn = document.getElementById('premiumTier');
    
    if (tier === 'basic') {
        basicBtn.style.border = '2px solid #7C3AED';
        basicBtn.style.background = 'white';
        basicBtn.style.color = '#7C3AED';
        
        premiumBtn.style.border = '2px solid #ddd';
        premiumBtn.style.background = 'transparent';
        premiumBtn.style.color = '#666';
    } else {
        premiumBtn.style.border = '2px solid #7C3AED';
        premiumBtn.style.background = 'white';
        premiumBtn.style.color = '#7C3AED';
        
        basicBtn.style.border = '2px solid #ddd';
        basicBtn.style.background = 'transparent';
        basicBtn.style.color = '#666';
    }
    
    updateInvestmentSummary();
}

function updateInvestmentSummary() {
    const productSelect = document.getElementById('productSelect');
    const studentCount = parseInt(document.getElementById('studentCount').value) || 0;
    const contractLength = parseInt(document.getElementById('contractLength').value);
    
    const selectedPlan = document.getElementById('selectedPlan');
    const activeStudents = document.getElementById('activeStudents');
    const pricePerStudent = document.getElementById('pricePerStudent');
    const contractDuration = document.getElementById('contractDuration');
    const totalPrice = document.getElementById('totalPrice');
    
    // Update plan name
    let planName = '';
    switch(productSelect.value) {
        case 'school':
            planName = 'eduvas SCHOOL';
            break;
        case 'college':
            planName = 'eduvas INSTITUTE';
            break;
        case 'university':
            planName = 'eduvas UNIVERSITY';
            break;
    }
    
    selectedPlan.textContent = `${planName} (${currentTier})`;
    activeStudents.textContent = studentCount;
    contractDuration.textContent = `${contractLength} months`;
    
    // Calculate price per student (example pricing logic)
    let basePrice = 0;
    if (productSelect.value === 'school') {
        basePrice = currentTier === 'basic' ? 0.25 : 0.35;
    } else if (productSelect.value === 'college') {
        basePrice = currentTier === 'basic' ? 0.30 : 0.40;
    } else {
        basePrice = currentTier === 'basic' ? 0.33 : 0.45;
    }
    
    pricePerStudent.textContent = `$${basePrice.toFixed(2)}/month`;
    
    // Calculate total
    const monthlyTotal = studentCount * basePrice;
    const total = monthlyTotal * contractLength;
    
    totalPrice.textContent = `$${total.toLocaleString()} USD`;
}

// Chatbot functions
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    chatWindow.classList.toggle('active');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (message) {
            addMessage(message, 'user');
            input.value = '';
            setTimeout(() => {
                handleBotResponse(message);
            }, 500);
        }
    }
}

function addMessage(text, type) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (type === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        response = 'Our pricing varies based on modules selected. Please use our Price Calculator or contact us at sa@daffodil-bd.com for a custom quote.';
    } else if (lowerMessage.includes('demo')) {
        response = 'I can help you schedule a demo! Please click the "Request Demo" button or email us at sa@daffodil-bd.com';
    } else if (lowerMessage.includes('university') || lowerMessage.includes('school') || lowerMessage.includes('institute')) {
        response = 'We offer three main products: Eduvas University (Java-based), Eduvas School (Python), and Eduvas Institute (Python). Each is tailored for specific educational needs.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        response = 'You can reach us at:\nEmail: sa@daffodil-bd.com\nPhone: +880 1713 493130\nContact: Muhammad Rafiqul Alam Rubel';
    } else if (lowerMessage.includes('integration')) {
        response = 'Eduvas integrates with Koha Library, Moodle LMS, Blockchain Certificates, AI Proctor, 1 Card System, and many more!';
    } else {
        response = 'For detailed information, please email us at sa@daffodil-bd.com or call +880 1713 493130. We\'re here to help!';
    }

    addMessage(response, 'bot');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});