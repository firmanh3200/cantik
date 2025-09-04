document.addEventListener('DOMContentLoaded', () => {
    // Global error handler to capture otherwise vague "Script error." messages
    window.addEventListener('error', (event) => {
        const msgEl = document.getElementById('errorMsg');
        // Provide clearer diagnostics for the infamous "Script error." which is typically a cross-origin script issue
        let message = event.message || 'Unknown error';
        if (message === 'Script error.' && !event.error) {
            message = 'Script error (likely a cross-origin script blocked details). Ensure external scripts have CORS enabled (use crossorigin="anonymous") and that the CDN provides CORS headers.';
        } else if (event.error && event.error.stack) {
            message = `${event.error.message}\n${event.error.stack}`;
        }
        if (msgEl) msgEl.textContent = `Error: ${message} at ${event.filename || 'unknown'}:${event.lineno || '?'}:${event.colno || '?'}`;
    });

    const xValuesTextarea = document.getElementById('xValues');
    const yValuesTextarea = document.getElementById('yValues');
    const calculateBtn = document.getElementById('calculateBtn');
    const predictXInput = document.getElementById('predictX');
    const predictBtn = document.getElementById('predictBtn');

    const errorMsg = document.getElementById('errorMsg');
    const regressionEquationSpan = document.getElementById('regressionEquation');
    const rSquaredSpan = document.getElementById('rSquared');
    const predictedYSpan = document.getElementById('predictedY');

    const analysisDropdown = document.getElementById('analysisDropdown');
    const analysisOutput = document.getElementById('analysisOutput');

    let regressionModel = {
        m: null,
        b: null,
        rSquared: null
    };

    function parseValues(textarea) {
        return textarea.value.split(',')
                             .map(s => parseFloat(s.trim()))
                             .filter(n => !isNaN(n));
    }

    function displayError(message) {
        errorMsg.textContent = message;
        regressionEquationSpan.textContent = '';
        rSquaredSpan.textContent = '';
        predictedYSpan.textContent = '';
        analysisOutput.textContent = 'Pilih opsi di atas untuk melihat analisis.'; // Clear analysis on error
        analysisDropdown.value = ''; // Reset dropdown
        regressionModel.m = null;
        regressionModel.b = null;
        regressionModel.rSquared = null;
    }

    function calculateLinearRegression() {
        // Ensure mathjs is loaded before proceeding
        if (typeof window.math === 'undefined') {
            displayError('Error: math.js library not loaded. Please check your internet connection or the script tag.');
            return;
        }

        const x = parseValues(xValuesTextarea);
        const y = parseValues(yValuesTextarea);

        if (x.length === 0 || y.length === 0) {
            displayError('Please enter some X and Y values.');
            return;
        }

        if (x.length !== y.length) {
            displayError('The number of X values must match the number of Y values.');
            return;
        }

        if (x.length < 2) {
            displayError('At least two data points are required for regression.');
            return;
        }

        errorMsg.textContent = ''; // Clear previous errors

        const n = x.length;
        // Use native JS for numeric reductions to avoid math.js array/matrix differences
        const sumX = x.reduce((s,v)=>s+v,0), sumY = y.reduce((s,v)=>s+v,0);
        let sumXY = 0, sumX2 = 0;
        for (let i=0;i<n;i++){ sumXY += x[i]*y[i]; sumX2 += x[i]*x[i]; }

        // Calculate slope (m)
        const numeratorM = n * sumXY - sumX * sumY;
        const denominatorM = n * sumX2 - (sumX * sumX);

        if (denominatorM === 0) {
            displayError('Cannot calculate regression: X values are all the same.');
            return;
        }

        const m = numeratorM / denominatorM;

        // Calculate y-intercept (b)
        const b = (sumY - m * sumX) / n;

        // Calculate R-squared
        const meanY = sumY / n;
        let ssTotal = 0; // Total sum of squares
        let ssResidual = 0; // Residual sum of squares

        for (let i = 0; i < n; i++) {
            const predictedY = m * x[i] + b;
            ssTotal += Math.pow(y[i] - meanY, 2);
            ssResidual += Math.pow(y[i] - predictedY, 2);
        }

        let rSquared = 0;
        if (ssTotal > 0) {
            rSquared = 1 - (ssResidual / ssTotal);
        } else {
            rSquared = ssResidual === 0 ? 1 : 0;
        }

        regressionModel.m = m;
        regressionModel.b = b;
        regressionModel.rSquared = rSquared;

        regressionEquationSpan.textContent = `y = ${m.toFixed(4)}x + ${b.toFixed(4)}`;
        rSquaredSpan.textContent = rSquared.toFixed(4);
        predictedYSpan.textContent = 'Enter a value for X above to predict Y.';

        displayAnalysis(); // Update analysis output based on current selection
    }

    function predictY() {
        const xToPredict = parseFloat(predictXInput.value);

        if (isNaN(xToPredict)) {
            predictedYSpan.textContent = 'Please enter a valid number for X.';
            return;
        }

        if (regressionModel.m === null || regressionModel.b === null) {
            predictedYSpan.textContent = 'Please calculate regression first.';
            return;
        }

        const predictedVal = regressionModel.m * xToPredict + regressionModel.b;
        predictedYSpan.textContent = predictedVal.toFixed(4);
    }

    function displayAnalysis() {
        const selectedAnalysis = analysisDropdown.value;
        let analysisText = '';

        if (regressionModel.m === null || regressionModel.b === null || regressionModel.rSquared === null) {
            analysisOutput.textContent = 'Hitung regresi terlebih dahulu untuk melihat analisis.';
            return;
        }

        const m = regressionModel.m;
        const b = regressionModel.b;
        const rSquared = regressionModel.rSquared;

        switch (selectedAnalysis) {
            case 'correlation':
                let correlationStrength;
                let correlationDirection;

                // Absolute R-squared for strength
                // Note: R-squared is always non-negative. If you meant correlation coefficient (r),
                // that could be positive or negative. For interpretation here, we'll use R-squared.
                const r = Math.sqrt(rSquared) * (m > 0 ? 1 : -1); // Estimate 'r' based on R^2 and slope sign

                if (Math.abs(r) >= 0.8) {
                    correlationStrength = 'sangat kuat';
                } else if (Math.abs(r) >= 0.6) {
                    correlationStrength = 'kuat';
                } else if (Math.abs(r) >= 0.3) {
                    correlationStrength = 'sedang';
                } else if (Math.abs(r) > 0) {
                    correlationStrength = 'lemah';
                } else {
                    correlationStrength = 'tidak ada';
                }

                if (m > 0) {
                    correlationDirection = 'positif';
                    analysisText = `Ada hubungan ${correlationStrength} ${correlationDirection} antara X dan Y (r=${r.toFixed(4)}). Ketika X meningkat, Y cenderung meningkat.`;
                } else if (m < 0) {
                    correlationDirection = 'negatif';
                    analysisText = `Ada hubungan ${correlationStrength} ${correlationDirection} antara X dan Y (r=${r.toFixed(4)}). Ketika X meningkat, Y cenderung menurun.`;
                } else {
                    correlationDirection = 'tidak ada';
                    analysisText = `Tidak ada korelasi linier yang jelas antara X dan Y (slope mendekati nol, r=${r.toFixed(4)}).`;
                }
                break;
            case 'slope':
                analysisText = `Slope (m) = ${m.toFixed(4)}.\nIni berarti, rata-rata, untuk setiap peningkatan satu unit pada X, Y diperkirakan akan berubah sebesar ${m.toFixed(4)} unit.`;
                break;
            case 'intercept':
                analysisText = `Y-intercept (b) = ${b.toFixed(4)}.\nIni adalah nilai Y yang diperkirakan ketika X adalah 0. Namun, interpretasinya hanya valid jika X=0 masuk akal dalam konteks data Anda.`;
                break;
            case 'goodnessOfFit':
                analysisText = `R-squared (R²) = ${rSquared.toFixed(4)}.\nIni berarti ${
                    (rSquared * 100).toFixed(2)
                }% dari variasi dalam Y dapat dijelaskan oleh variasi dalam X melalui model regresi linier ini. Nilai R² yang lebih tinggi (mendekati 1) menunjukkan model yang lebih baik.`;
                break;
            default:
                analysisText = 'Pilih opsi di atas untuk melihat analisis.';
                break;
        }
        analysisOutput.textContent = analysisText;
    }

    calculateBtn.addEventListener('click', calculateLinearRegression);
    predictBtn.addEventListener('click', predictY);
    analysisDropdown.addEventListener('change', displayAnalysis);

    // Initial calculation if there's any default content
    try {
        calculateLinearRegression();
    } catch (err) {
        const msg = err && err.message ? err.message : String(err);
        document.getElementById('errorMsg').textContent = `Initialization error: ${msg}`;
        console.error(err);
    }
});