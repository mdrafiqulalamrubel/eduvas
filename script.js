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

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = 'Hello! Welcome to Eduvas. I\'m here to help you learn about our education management solutions. How can I assist you today?';
    }
    // About Eduvas
    else if (lowerMessage.includes('what is eduvas') || lowerMessage.includes('about eduvas') || lowerMessage.includes('tell me about')) {
        response = 'Eduvas is an Educational Value Added Service under Daffodil Group. We provide comprehensive management solutions for universities, schools, colleges, and institutions worldwide. Visit eduvas.pages.dev to learn more!\n\nFor detailed information, please contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Products
    else if (lowerMessage.includes('products') || lowerMessage.includes('what do you offer')) {
        response = 'We offer three main products:\n\n🏫 EDUVAS University - Comprehensive university management ($5999/month)\n🎓 EDUVAS School - Complete school management ($4999/month)\n🏛️ EDUVAS Institute - Institute management ($2999/month)\n\nEach includes features like admission management, LMS, finance, HR, and more!\n\nFor custom requirements, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // University specific
    else if (lowerMessage.includes('university')) {
        response = 'EDUVAS University is our comprehensive university management system featuring:\n• Student Information Management\n• Academic Management Portal\n• HR & Financial Systems\n• Admission Management\n• Examination & Results\n• Transport Management\n• And much more!\n\nStarting at $5999/month. For a demo, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // School specific
    else if (lowerMessage.includes('school')) {
        response = 'EDUVAS School is our complete school management solution with:\n• Teacher Portal Integration\n• Department Management\n• Bill & Budget System\n• Research Administration\n• E-Learning Integration\n• Hall Management\n\nStarting at $4999/month. For more details, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Institute specific
    else if (lowerMessage.includes('institute') || lowerMessage.includes('college')) {
        response = 'EDUVAS Institute is designed for institutes and colleges:\n• Transport Management\n• Timetable Automation\n• SMS & Email Integration\n• Report Card Generation\n• Inventory Management\n• CRM & Communication\n\nStarting at $2999/month. Contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com for details.';
    }
    // Pricing
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        response = 'Our pricing is flexible based on your needs:\n\n• EDUVAS University: From $5999/month\n• EDUVAS School: From $4999/month\n• EDUVAS Institute: From $2999/month\n\nPricing varies by number of students and modules. Use our calculator above or contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com for a custom quote!';
    }
    // Demo request
    else if (lowerMessage.includes('demo') || lowerMessage.includes('trial')) {
        response = 'I\'d love to help you schedule a demo! You can:\n\n1. Click the "Request Demo" button on this page\n2. Email Muhammad Rafiqul Alam Rubel directly at sa@daffodil-bd.com\n3. Call +880 1713 493130\n\nOur team will showcase the full platform tailored to your institution\'s needs!';
    }
    // Features
    else if (lowerMessage.includes('features') || lowerMessage.includes('what can it do')) {
        response = 'Eduvas offers 25+ comprehensive features including:\n\n📋 Admission Management\n🎓 Academic Management\n📚 LMS & E-Learning\n💰 Finance & Accounting\n👥 HR Management\n🚌 Transport Management\n📊 Reports & Analytics\n\nAnd many more! For a complete feature list, visit eduvas.pages.dev or contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Integrations
    else if (lowerMessage.includes('integration') || lowerMessage.includes('integrate') || lowerMessage.includes('third party')) {
        response = 'Eduvas seamlessly integrates with:\n\n📚 Koha Library System\n🎓 Moodle E-Learning\n🔗 Blockchain Certificates\n🤖 AI Proctor & AI Professor\n💳 1 Card System\n📊 DSpace Repository\n🏢 HR Management Systems\n\nFor integration details, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Contact information
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
        response = '📞 Contact Information:\n\n👤 Muhammad Rafiqul Alam Rubel\n📧 Email: sa@daffodil-bd.com\n📱 Phone: +880 1713 493130\n🌐 Website: eduvas.pages.dev\n📍 Location: Dhaka, Bangladesh\n\nFeel free to reach out anytime!';
    }
    // Clients/Partners
    else if (lowerMessage.includes('client') || lowerMessage.includes('partner') || lowerMessage.includes('who uses')) {
        response = 'We\'re trusted by leading institutions including:\n\n🎖️ Army IBS (Bangladesh Army)\n🏛️ Sylhet RTM University\n🎓 Comilla University\n💼 Daffodil International University\n\nFor partnership opportunities, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Support
    else if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('assistance')) {
        response = 'We provide 24/7 support with:\n\n✔ Regular updates\n✔ Team training\n✔ Technical assistance\n✔ No setup fees\n✔ 30-day money-back guarantee\n\nFor support inquiries, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com or call +880 1713 493130';
    }
    // Technology stack
    else if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('built with')) {
        response = 'Our solutions are built with:\n\n• EDUVAS University: Java-based\n• EDUVAS School: Python-based\n• EDUVAS Institute: Python-based\n\nAll include cloud deployment, mobile apps, and web portals.\n\nFor technical details, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Admission Management
    else if (lowerMessage.includes('admission')) {
        response = 'Our Admission Management system includes:\n\n✓ Online application portal\n✓ Document verification\n✓ Payment integration\n✓ Automated notifications\n✓ Applicant tracking\n✓ Merit list generation\n\nFor more details, contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com';
    }
    // Thanks
    else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        response = 'You\'re welcome! If you have any other questions, feel free to ask or contact Muhammad Rafiqul Alam Rubel at sa@daffodil-bd.com. Have a great day!';
    }
    // Default fallback
    else {
        response = 'I\'m here to help with information about Eduvas products and services. For specific inquiries or detailed information, please contact:\n\n👤 Muhammad Rafiqul Alam Rubel\n📧 sa@daffodil-bd.com\n📱 +880 1713 493130\n🌐 eduvas.pages.dev\n\nYou can also ask me about our products, pricing, features, or integrations!';
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