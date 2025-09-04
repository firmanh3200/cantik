document.addEventListener('DOMContentLoaded', function() {
    // Initialize the hero animation
    // initHeroAnimation(); // This function is not used in the provided index.html, keeping it commented out for now.
    
    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Initialize chart
    // initDataExplorer(); // This function is not used in the provided index.html, keeping it commented out for now.
    
    // Initialize statistical calculator
    initStatCalculator(); // Now correctly called after DOM is loaded
    
    // Initialize contact form handling
    // initContactForm(); // This function is not used in the provided index.html, keeping it commented out for now.

    // Initialize accordion-like behavior for card headers
    document.querySelectorAll('.card-header.clickable').forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            if (body.style.display === "none" || body.style.display === "") {
                body.style.display = "block";
            } else {
                body.style.display = "none";
            }
        });
    });
});

// Initialize SVG animation for Hero section
// This function is not called in the provided index.html, so it's effectively unused.
function initHeroAnimation() {
    const heroAnimation = document.getElementById('hero-animation');
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', '0 0 500 400');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Create graph elements
    const svgContent = `
        <defs>
            <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.7" />
                <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.1" />
            </linearGradient>
        </defs>
        
        <rect x="50" y="50" width="400" height="300" rx="10" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1"/>
        
        <!-- Axes -->
        <line x1="100" y1="300" x2="400" y2="300" stroke="rgba(255, 255, 255, 0.5)" stroke-width="2"/>
        <line x1="100" y1="300" x2="100" y2="100" stroke="rgba(255, 255, 255, 0.5)" stroke-width="2"/>
        
        <!-- Data Points and Lines -->
        <polyline class="data-line" points="100,250 150,220 200,240 250,180 300,150 350,190 400,120" fill="none" stroke="rgba(255, 255, 255, 0.9)" stroke-width="3"/>
        
        <path class="data-area" d="M100,250 L150,220 L200,240 L250,180 L300,150 L350,190 L400,120 L400,300 L100,300 Z" fill="url(#gradientFill)"/>
        
        <circle cx="100" cy="250" r="5" fill="white" class="data-point"/>
        <circle cx="150" cy="220" r="5" fill="white" class="data-point"/>
        <circle cx="200" cy="240" r="5" fill="white" class="data-point"/>
        <circle cx="250" cy="180" r="5" fill="white" class="data-point"/>
        <circle cx="300" cy="150" r="5" fill="white" class="data-point"/>
        <circle cx="350" cy="190" r="5" fill="white" class="data-point"/>
        <circle cx="400" cy="120" r="5" fill="white" class="data-point"/>
        
        <!-- Floating elements -->
        <g class="floating-element" style="animation: float 3s ease-in-out infinite">
            <circle cx="120" cy="80" r="15" fill="rgba(255, 255, 255, 0.2)"/>
            <text x="120" y="85" text-anchor="middle" fill="white" font-size="12">%</text>
        </g>
        
        <g class="floating-element" style="animation: float 4s ease-in-out infinite; animation-delay: 1s">
            <circle cx="380" cy="70" r="20" fill="rgba(255, 255, 255, 0.2)"/>
            <text x="380" y="75" text-anchor="middle" fill="white" font-size="16">#</text>
        </g>
        
        <g class="floating-element" style="animation: float 5s ease-in-out infinite; animation-delay: 0.5s">
            <circle cx="450" cy="150" r="12" fill="rgba(255, 255, 255, 0.2)"/>
            <text x="450" y="155" text-anchor="middle" fill="white" font-size="10">Σ</text>
        </g>
        
        <style>
            .data-point {
                animation: pulse 2s infinite;
            }
            .data-point:nth-child(odd) {
                animation-delay: 0.5s;
            }
            @keyframes pulse {
                0% { r: 5; }
                50% { r: 8; }
                100% { r: 5; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
            .floating-element {
                animation: float 3s ease-in-out infinite;
            }
        </style>
    `;
    
    heroAnimation.appendChild(svg);
}

// Initialize navbar scroll behavior
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 1rem';
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem';
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for navbar links
    document.querySelectorAll('.navbar-nav a.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Check if the target is an internal section or an external link
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            } else {
                // For external links, simply navigate
                window.open(targetId, '_blank');
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// Initialize counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the value, the faster the animation
    
    const animateCounter = function(counter) {
        const target = +counter.dataset.target;
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };
    
    // Intersection Observer to trigger counter animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize Data Explorer with Chart.js
// This function is not called in the provided index.html, so it's effectively unused.
function initDataExplorer() {
    // Sample datasets
    const datasets = {
        population: {
            labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
            data: {
                'Region A': [1.5, 1.7, 1.9, 2.1, 2.3, 2.4, 2.5],
                'Region B': [2.0, 2.1, 2.1, 2.2, 2.3, 2.3, 2.4],
                'Region C': [3.2, 3.3, 3.3, 3.4, 3.3, 3.2, 3.0]
            },
            source: 'National Statistical Office',
            lastUpdated: 'June 2023',
            description: 'This dataset shows population growth trends across different regions from 2010 to 2022.'
        },
        income: {
            labels: ['North', 'South', 'East', 'West', 'Central'],
            data: {
                'Low Income': [20, 25, 15, 18, 22],
                'Middle Income': [45, 50, 55, 60, 48],
                'High Income': [35, 25, 30, 22, 30]
            },
            source: 'Economic Research Institute',
            lastUpdated: 'March 2023',
            description: 'This dataset represents income distribution by region, showing the percentage of population in different income brackets.'
        },
        education: {
            labels: ['No Formal Education', 'Primary', 'Secondary', 'Bachelor\'s', 'Master\'s or higher'],
            data: {
                'Urban': [5, 15, 30, 35, 15],
                'Suburban': [8, 22, 40, 25, 5],
                'Rural': [15, 35, 30, 15, 5]
            },
            source: 'Education Ministry',
            lastUpdated: 'December 2022',
            description: 'This dataset displays education level statistics across different geographical areas, shown as percentages of the population.'
        }
    };
    
    // Chart configuration
    let chartConfig = {
        type: 'bar',
        data: {
            labels: datasets.population.labels,
            datasets: [
                {
                    label: 'Region A',
                    data: datasets.population.data['Region A'],
                    backgroundColor: 'rgba(13, 110, 253, 0.7)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Region B',
                    data: datasets.population.data['Region B'],
                    backgroundColor: 'rgba(32, 201, 151, 0.7)',
                    borderColor: 'rgba(32, 201, 151, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Region C',
                    data: datasets.population.data['Region C'],
                    backgroundColor: 'rgba(253, 126, 20, 0.7)',
                    borderColor: 'rgba(253, 126, 20, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    };
    
    // Initialize Chart
    const ctx = document.getElementById('dataChart').getContext('2d');
    let dataChart = new Chart(ctx, chartConfig);
    
    // Update dataset info
    document.getElementById('dataSource').textContent = datasets.population.source;
    document.getElementById('lastUpdated').textContent = datasets.population.lastUpdated;
    document.getElementById('datasetDescription').textContent = datasets.population.description;
    
    // Update chart when selection changes
    document.getElementById('updateChart').addEventListener('click', function() {
        const selectedDataset = document.getElementById('datasetSelect').value;
        const selectedChartType = document.getElementById('chartType').value;
        
        // Update chart data
        chartConfig.data.labels = datasets[selectedDataset].labels;
        
        // Update chart type
        chartConfig.type = selectedChartType;
        
        // Clear previous datasets
        chartConfig.data.datasets = [];
        
        // Add new datasets
        const colors = [
            { bg: 'rgba(13, 110, 253, 0.7)', border: 'rgba(13, 110, 253, 1)' },
            { bg: 'rgba(32, 201, 151, 0.7)', border: 'rgba(32, 201, 151, 1)' },
            { bg: 'rgba(253, 126, 20, 0.7)', border: 'rgba(253, 126, 20, 1)' },
            { bg: 'rgba(220, 53, 69, 0.7)', border: 'rgba(220, 53, 69, 1)' }
        ];
        
        let colorIndex = 0;
        for (const [key, value] of Object.entries(datasets[selectedDataset].data)) {
            chartConfig.data.datasets.push({
                label: key,
                data: value,
                backgroundColor: colors[colorIndex].bg,
                borderColor: colors[colorIndex].border,
                borderWidth: 1
            });
            colorIndex = (colorIndex + 1) % colors.length;
        }
        
        // Special handling for pie/doughnut charts
        if (selectedChartType === 'pie' || selectedChartType === 'doughnut') {
            // For pie/doughnut we need to restructure the data
            const allBackgroundColors = colors.map(c => c.bg);
            const allBorderColors = colors.map(c => c.border);
            
            // Take the first dataset only for pie chart
            const firstDatasetKey = Object.keys(datasets[selectedDataset].data)[0];
            
            chartConfig.data.datasets = [{
                label: firstDatasetKey,
                data: datasets[selectedDataset].data[firstDatasetKey],
                backgroundColor: allBackgroundColors.slice(0, datasets[selectedDataset].data[firstDatasetKey].length),
                borderColor: allBorderColors.slice(0, datasets[selectedDataset].data[firstDatasetKey].length),
                borderWidth: 1
            }];
        }
        
        // Update dataset info
        document.getElementById('dataSource').textContent = datasets[selectedDataset].source;
        document.getElementById('lastUpdated').textContent = datasets[selectedDataset].lastUpdated;
        document.getElementById('datasetDescription').textContent = datasets[selectedDataset].description;
        
        // Update key insights based on selected dataset
        const insightsElement = document.getElementById('chartInsights');
        let insightsHTML = '<ul>';
        
        if (selectedDataset === 'population') {
            insightsHTML += `
                <li>Region A shows the highest growth rate at 2.5% annually</li>
                <li>Region C has experienced a population decline since 2018</li>
                <li>Overall population growth has slowed from 1.8% to 1.2% over the observed period</li>
            `;
        } else if (selectedDataset === 'income') {
            insightsHTML += `
                <li>The Western region has the highest proportion of middle-income residents (60%)</li>
                <li>The Northern region shows the most balanced income distribution</li>
                <li>The Southern region has the lowest percentage of high-income residents (25%)</li>
            `;
        } else if (selectedDataset === 'education') {
            insightsHTML += `
                <li>Urban areas have the highest percentage of residents with Bachelor's degrees (35%)</li>
                <li>Rural areas show three times higher rates of no formal education compared to urban areas</li>
                <li>Secondary education is most prevalent in suburban areas (40%)</li>
            `;
        }
        
        insightsHTML += '</ul>';
        insightsElement.innerHTML = insightsHTML;
        
        // Destroy previous chart and create new one
        dataChart.destroy();
        dataChart = new Chart(ctx, chartConfig);
    });
}

// Initialize Statistical Calculator
function initStatCalculator() {
    const calculateBtn = document.getElementById('calculateStats');
    const clearBtn = document.getElementById('clearStats');
    const dataInput = document.getElementById('dataInput');
    
    if (calculateBtn && clearBtn && dataInput) { // Added checks to ensure elements exist
        calculateBtn.addEventListener('click', function() {
            // Get input data and convert to array of numbers
            const inputData = dataInput.value.split(',')
                .map(val => val.trim())
                .filter(val => val !== '')
                .map(val => parseFloat(val))
                .filter(val => !isNaN(val));
            
            if (inputData.length === 0) {
                alert('Please enter valid numerical data separated by commas.');
                return;
            }
            
            // Calculate statistics
            const mean = calculateMean(inputData);
            const median = calculateMedian(inputData);
            const mode = calculateMode(inputData);
            const range = calculateRange(inputData);
            const stdDev = calculateStdDev(inputData, mean);
            const variance = stdDev * stdDev;
            
            // Display results
            document.getElementById('mean').textContent = mean.toFixed(2);
            document.getElementById('median').textContent = median.toFixed(2);
            document.getElementById('mode').textContent = mode.join(', ');
            document.getElementById('range').textContent = range.toFixed(2);
            document.getElementById('stdDev').textContent = stdDev.toFixed(2);
            document.getElementById('variance').textContent = variance.toFixed(2);
        });
        
        clearBtn.addEventListener('click', function() {
            dataInput.value = '';
            document.getElementById('mean').textContent = '-';
            document.getElementById('median').textContent = '-';
            document.getElementById('mode').textContent = '-';
            document.getElementById('range').textContent = '-';
            document.getElementById('stdDev').textContent = '-';
            document.getElementById('variance').textContent = '-';
        });
    } else {
        console.error("Statistical calculator elements not found.");
    }

    // Statistical calculation functions
    function calculateMean(data) {
        return data.reduce((sum, value) => sum + value, 0) / data.length;
    }
    
    function calculateMedian(data) {
        const sortedData = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        
        if (sortedData.length % 2 === 0) {
            return (sortedData[mid - 1] + sortedData[mid]) / 2;
        } else {
            return sortedData[mid];
        }
    }
    
    function calculateMode(data) {
        const countMap = {};
        data.forEach(value => {
            countMap[value] = (countMap[value] || 0) + 1;
        });
        
        let maxCount = 0;
        let modes = [];
        
        for (const [value, count] of Object.entries(countMap)) {
            if (count > maxCount) {
                maxCount = count;
                modes = [parseFloat(value)];
            } else if (count === maxCount) {
                modes.push(parseFloat(value));
            }
        }
        
        return modes;
    }
    
    function calculateRange(data) {
        if (data.length === 0) return 0; // Handle empty data case for range
        return Math.max(...data) - Math.min(...data);
    }
    
    function calculateStdDev(data, mean) {
        if (data.length === 0) return 0; // Handle empty data case
        const squaredDifferences = data.map(value => Math.pow(value - mean, 2));
        const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / data.length;
        return Math.sqrt(variance);
    }
}

// Initialize Contact Form
// This function is not called in the provided index.html, so it's effectively unused.
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Perform basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Clear form
            contactForm.reset();
        });
    }
}