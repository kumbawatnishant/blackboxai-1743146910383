// Auth Module - Handles user authentication
document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data in localStorage if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({
            customers: [],
            vendors: []
        }));
    }

    // Get all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Determine form type
            if (form.id.includes('customer')) {
                if (form.id.includes('login')) {
                    handleCustomerLogin();
                } else {
                    handleCustomerSignup();
                }
            } else if (form.id.includes('vendor')) {
                if (form.id.includes('login')) {
                    handleVendorLogin();
                } else {
                    handleVendorSignup();
                }
            }
        });
    });

    // Customer Login Handler
    function handleCustomerLogin() {
        const email = document.getElementById('customer-email').value;
        const password = document.getElementById('customer-password').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const customer = users.customers.find(user => user.email === email && user.password === password);
        
        if (customer) {
            // Store current session
            localStorage.setItem('currentUser', JSON.stringify({
                type: 'customer',
                ...customer
            }));
            
            // Redirect to customer dashboard
            window.location.href = '../customer/dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    }

    // Customer Signup Handler
    function handleCustomerSignup() {
        const name = document.getElementById('customer-name').value;
        const email = document.getElementById('customer-email').value;
        const password = document.getElementById('customer-password').value;
        const address = document.getElementById('customer-address').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Check if email already exists
        if (users.customers.some(user => user.email === email) || 
            users.vendors.some(user => user.email === email)) {
            alert('Email already registered');
            return;
        }
        
        // Create new customer
        const newCustomer = {
            id: Date.now().toString(),
            name,
            email,
            password,
            address,
            createdAt: new Date().toISOString()
        };
        
        users.customers.push(newCustomer);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store current session
        localStorage.setItem('currentUser', JSON.stringify({
            type: 'customer',
            ...newCustomer
        }));
        
        // Redirect to customer dashboard
        window.location.href = '../customer/dashboard.html';
    }

    // Vendor Login Handler
    function handleVendorLogin() {
        const email = document.getElementById('vendor-email').value;
        const password = document.getElementById('vendor-password').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const vendor = users.vendors.find(user => user.email === email && user.password === password);
        
        if (vendor) {
            // Store current session
            localStorage.setItem('currentUser', JSON.stringify({
                type: 'vendor',
                ...vendor
            }));
            
            // Redirect to vendor dashboard
            window.location.href = '../vendor/dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    }

    // Vendor Signup Handler
    function handleVendorSignup() {
        const businessName = document.getElementById('vendor-business').value;
        const email = document.getElementById('vendor-email').value;
        const category = document.getElementById('vendor-category').value;
        const password = document.getElementById('vendor-password').value;
        const description = document.getElementById('vendor-description').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Check if email already exists
        if (users.customers.some(user => user.email === email) || 
            users.vendors.some(user => user.email === email)) {
            alert('Email already registered');
            return;
        }
        
        // Create new vendor
        const newVendor = {
            id: Date.now().toString(),
            businessName,
            email,
            category,
            password,
            description,
            createdAt: new Date().toISOString(),
            products: []
        };
        
        users.vendors.push(newVendor);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store current session
        localStorage.setItem('currentUser', JSON.stringify({
            type: 'vendor',
            ...newVendor
        }));
        
        // Redirect to vendor dashboard
        window.location.href = '../vendor/dashboard.html';
    }

    // Check if user is already logged in
    function checkAuth() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            if (currentUser.type === 'customer' && !window.location.pathname.includes('/customer/')) {
                window.location.href = '../customer/dashboard.html';
            } else if (currentUser.type === 'vendor' && !window.location.pathname.includes('/vendor/')) {
                window.location.href = '../vendor/dashboard.html';
            }
        }
    }

    // Run auth check on page load
    checkAuth();
});