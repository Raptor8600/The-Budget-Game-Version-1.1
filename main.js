const state = {
    difficultyModalShown: false,
    month: 1,
    cash: 1000,
    savings: 0,
    sharesOwned: 0,
    avgPurchasePrice: 0,
    stockPrice: 100,
    lastPrice: 100,
    happiness: 80,
    familyHappiness: 80,
    income: 2500,
    upgrades: {
        course: false,
        car: false,
        vlog: false,
        bed: false,
        mansion: false,
        transition: false
    },
    expenses: {
        rent: 800,
        food: 400,
        fun: 0,
        vetBills: 0
    },
    goals: {
        emergencyFund: 1000,
        stability: 10000
    },
    priceHistory: [100, 100, 100, 100, 100, 100],
    sentiment: 50,
    valuation: 50,
    difficulty: 1,
    winGoal: 150000,
    baseGoal: 150000,
    loans: [],
    currentBank: 'alphatrust',
    bankData: {
        alphatrust: { name: "AlphaTrust", rate: 0.001, min: 0 },
        globallink: { name: "GlobalLink", rate: 0.0025, min: 0 },
        deltasecure: { name: "DeltaSecure", rate: 0.005, min: 1000 }
    },
    businesses: [],
    hasManager: false,
    petInsurance: false,
    immunityMonths: 0,
    history: [],
    jobMarket: 50,
    unemployedMonths: 0,
    jobHunting: false,
    previousIncome: 2500,
    jobHappinessMod: 0,
    lifestyle: 'balanced', // 'budget', 'balanced', 'lavish'
    stockVolume: 'Medium', // Low, Medium, High
    inflation: 0, // Track cumulative inflation
    // Narrative State
    friendLore: { stage: 0, debt: 0, name: "Fred" },
    pets: { count: 0, names: [] }, // Array of strings or objects {name, type}
    breakupCount: 0,
    partner: { status: 'single', name: null, trait: null, duration: 0, score: 0, finances: 'separate' },
    family: {
        children: [],
        childSupport: 0
    },
    divorceCount: 0,
    custodyMonth: true,
    lastJobOffers: [], // For bug fix
    barredFromAdoption: false,
    cheatsUsed: [],
    experiencesThisMonth: 0,
    healthStatus: 'Healthy', // Healthy, Sick, Injured
    sicknessSeverity: 0,
    metPartner: false,
    everDated: false,
    maxChildrenReached: false,
    maxPetsReached: false,
    totalPetsAdopted: 0,
    cheated: false,
    firedCount: 0,
    jobChangeCount: 0,
    hasWon: false,
    // Queer Edition State
    gender: 'Trans FTM', // Male, Female, Trans FTM, Trans MTF, Nonbinary
    sexuality: 'Gay', // Bi, Gay, Straight
    partnerPronouns: 'he/him', // she/her, they/them, he/him
    monthsSinceSexualityChange: 0,
    transitionStarted: false,

    // Expansion State
    economyHealth: 100, // 0-100
    socialLife: 50, // 0-100
    playTime: 0, // Seconds
    bonds: {
        holdings: [], // { id, type 'corp'/'gov', rating, faceValue, couponRate, purchaseMonth }
        available: [] // Generated monthly
    },
    // Neurodivergence
    hiddenADHD: false, // Set on init
    hiddenAutism: false, // Set on init
    diagnosedADHD: false,
    diagnosedAutism: false,
    medicated: false,
    medicationStatus: 'none', // 'working', 'failed', 'out_of_stock'
    lastWalkMonth: 0,
    walksThisMonth: 0,
    unlockedAchievements: []
};

// Achievement Data (Moved to top for safety)
const ACHIEVEMENTS = [
    { id: 'first-love', icon: '❤️', title: 'Your First Love', desc: 'Start a relationship.' },
    { id: 'bachelor', icon: '🤵', title: 'Bachelor/ette', desc: 'Win the game without ever dating.' },
    { id: 'happy-family', icon: '👨‍👩‍👧‍👦', title: 'Happy Family', desc: 'Have 3 children and at least 2 pets.' },
    { id: 'heartbreaker', icon: '💔', title: 'Heartbreaker', desc: 'Break up with 2 different partners.' },
    { id: 'co-parenting', icon: '🤝', title: 'Co-Parenting', desc: 'Divorce while having children.' },
    { id: 'single-parent', icon: '💪', title: 'Who needs a partner?', desc: 'Adopt a child while single.' },
    { id: 'bad-pet-owner', icon: '😢', title: 'How could you?', desc: 'Let a pet pass away.' },
    { id: 'legendary', icon: '🌟', title: 'Immortal Legend', desc: 'Reach age 99 (Month 924).' },
    { id: 'penny-pincher', icon: '🪙', title: 'Penny Pincher', desc: 'Save $10k in your first 12 months.' },
    { id: 'wolf', icon: '🐺', title: 'Wolf of AlphaBets', desc: 'Reach $1M in net worth.' },
    { id: 'entrepreneur', icon: '🏢', title: 'Serial Entrepreneur', desc: 'Own 3 businesses at once.' },
    { id: 'cheat-used', icon: '🎃', title: 'Cheater, Cheater...', desc: 'Use the cheat console at least once.' },
    { id: 'first-pet', icon: '🐕', title: 'First Best Friend', desc: 'Adopt your first pet.' },
    { id: 'pet-sanctuary', icon: '🏘️', title: 'Animal Sanctuary', desc: 'Adopt more than 10 pets cumulative.' },
    { id: 'noahs-ark', icon: '🚢', title: "Noah's Ark", desc: 'Adopt more than 50 pets cumulative.' },
    { id: 'intervention', icon: '🛋️', title: 'The Intervention', desc: 'Adopt 100 pets cumulative.' },
    { id: 'fired', icon: '🔥', title: 'You\'re Fired!', desc: 'Get terminated from your job for the first time.' },
    { id: 'risk-taker', icon: '🎲', title: 'Risk Taker', desc: 'Quit your job to find something better.' },
    { id: 'job-hopper', icon: '🏃', title: 'Job Hopper', desc: 'Change jobs more than 5 times in one life.' },
    { id: 'seanie-dew', icon: '👑', title: 'Who are you, Seanie Dew?', desc: 'Unlock All Achievements' },
    { id: 'tycoon', icon: '🏛️', title: 'The Monopolist', desc: 'Own every business and career upgrade.' },
    { id: 'delegator', icon: '👔', title: 'The Boss', desc: 'Hire a manager to automate business maintenance.' },
    { id: 'jackpot', icon: '🎰', title: 'Jackpot Winner', desc: 'Win the Mega Millions lottery.' },
    { id: 'divorce', icon: '⚖️', title: 'The Big D', desc: 'Get divorced 5 times.' },
    { id: 'diamond-hands', icon: '💎', title: 'Diamond Hands', desc: 'Realize over $1,000,000 profit in a single stock trade.' },
    { id: 'forever', icon: '🏚️', title: 'Forever?', desc: 'Go through your first divorce.' },
    // Expansion Achievements
    { id: 'neurospicy', icon: '🧠', title: 'Gotta Collect Them All', desc: 'Get diagnosed with both ADHD and Autism.' },
    { id: 'still-here', icon: '⌚', title: "You're still here?", desc: 'Play the game for over 8 hours in one session.' },
    { id: 'pride-star', icon: '🤩', title: 'Starstruck', desc: 'Meet a celebrity at a Pride Parade.' },
    { id: 'bond-tycoon', icon: '🤵', title: 'Bond Tycoon', desc: 'Hold over $50,000 in bonds.' },
    { id: 'victory-easy', icon: '🥉', title: 'Life is Easy', desc: 'Beat the game on Easy difficulty.' },
    { id: 'victory-medium', icon: '🥈', title: 'Middle of the Road', desc: 'Beat the game on Medium difficulty.' },
    { id: 'victory-hard', icon: '🥇', title: 'Budget Master', desc: 'Beat the game on Hard difficulty.' }
];

// Player Tips - Dynamic advice that rotates
const PLAYER_TIPS = [
    "Build an <strong>Emergency Fund</strong> of at least $1,000 in savings before making risky investments.",
    "The stock market's <strong>Sentiment</strong> indicator shows future potential, while <strong>Valuation</strong> shows current price levels.",
    "When <strong>Valuation</strong> is low (Oversold), it's often a good time to buy. When high (Overbought), consider selling.",
    "Avoid taking on too much debt! Interest compounds monthly and can quickly spiral out of control.",
    "Your <strong>Happiness</strong> affects your work performance. Keep it above 50% to avoid income penalties.",
    "The <strong>Lifestyle</strong> setting affects both your expenses and happiness decay. Budget saves money but increases stress.",
    "Career upgrades like <strong>Certification</strong> and <strong>MBA</strong> can significantly boost your income potential.",
    "Businesses generate passive income but require maintenance. Invest in them regularly to keep health high.",
    "Relationships require attention! Spend time with your partner to keep satisfaction high and avoid breakups.",
    "Children and pets increase monthly expenses substantially. Make sure you can afford them before adopting.",
    "Bank loans have better interest rates than loan sharks, but require 30% of your net worth in savings.",
    "The <strong>Job Market</strong> fluctuates monthly. Time your job changes when the market is hot (70+).",
    "Diversify your income! Combine salary, stock investments, and business revenue for financial stability.",
    "Watch your <strong>Net Worth</strong> carefully. Negative net worth caps your happiness at 20% until you're solvent.",
    "Stock <strong>Volume</strong> indicates market activity. High volume often means bigger price swings are coming.",
    "Don't forget about taxes! Every 12 months you'll face either a tax bill or a refund.",
    "The <strong>Smart Home</strong> upgrade reduces happiness decay significantly - a great long-term investment.",
    "If you're unemployed, having a <strong>Certification</strong> increases your chance of getting job offers by 20%.",
    "Loan shark debt has severe happiness penalties if overdue. Bank loans garnish your account instead.",
    "Your partner's trait affects your relationship. <strong>Rich</strong> partners contribute more, <strong>Gamblers</strong> are risky.",
    "Married partners who get sick will automatically cost you $300/month in medical care.",
    "Progressive interest rates mean each additional bank loan increases your interest rate by 0.5%.",
    "Reaching $30,000 net worth unlocks a passive income bonus of $200 per month!",
    "Health matters! Being sick reduces your work performance and happiness. Visit the doctor when needed.",
    "The <strong>Luxury Bed</strong> upgrade improves sleep quality and reduces happiness decay.",
    "Stock prices follow trends based on sentiment. Watch the 6-month sparkline to identify patterns.",
    "Breaking up multiple times makes it harder to find new partners. Your reputation matters!",
    "Infinite Mode removes the retirement goal - see how long you can survive and thrive!",
    "Pet Insurance ($15/pet) is much cheaper than a $450 emergency vet bill! 🐾",
    "Regular Doctor Checkups ($1.5k) boost your family's immunity for 6 months, preventing costly sickness. 🩺",
    "Different banks offer different interest rates. Switch to <strong>DeltaSecure</strong> when you have $1k+ in savings.",
    // New Tips
    "<strong>Bond Yields</strong> are inversely related to the Economy. When the economy tanks, bonds pay more!",
    "Corporate Bonds pay higher rates but carry a <strong>Default Risk</strong>. Government bonds are safe but pay less.",
    "Stocks and Bonds often move in opposite directions. Diversify your portfolio to hedge against crashes.",
    "<strong>Hyperfixation</strong> (ADHD) can trigger massive productivity boosts, but beware the burnout afterwards.",
    "Your <strong>Social Battery</strong> recharges when you hang out, but drains faster if you're neurodivergent.",
    "A healthy <strong>Economy</strong> keeps inflation low and your investments safe. Watch the meter!",
    "Don't ignore symptoms! Undiagnosed conditions come with penalties but can be managed with diagnosis."
];

let UI = {};
let timerInterval = null; // Move out of state to prevent persistence issues

document.addEventListener('DOMContentLoaded', () => {
    try {
        UI = {
            cash: document.getElementById('cash'),
            netWorth: document.getElementById('net-worth'),
            happiness: document.getElementById('happiness'),
            stockPrice: document.getElementById('stock-price'),
            month: document.getElementById('month'),
            budgetList: document.getElementById('budget-list'),
            savingsPotential: document.getElementById('savings-potential'),
            tipText: document.getElementById('tip-text'),
            btnSave: document.getElementById('btn-save'),
            btnWithdraw: document.getElementById('btn-withdraw'),
            btnBuyStock: document.getElementById('btn-buy-stock'),
            btnSellStock: document.getElementById('btn-sell-stock'),
            btnMaxBuy: document.getElementById('btn-max-buy'),
            btnMaxSell: document.getElementById('btn-max-sell'),
            btnDoctor: document.getElementById('btn-doctor'),
            btnSpend: document.getElementById('btn-spend'),
            btnNext: document.getElementById('next-month-btn'),
            eventContainer: document.getElementById('event-container'),
            progressBar: document.getElementById('progress-bar'),
            progressPercent: document.getElementById('progress-percent'),
            valuationNews: document.getElementById('valuation-news'),
            sentimentGauge: document.getElementById('sentiment-gauge'),
            marketNews: document.getElementById('market-news'),
            valuationGauge: document.getElementById('valuation-gauge'),
            victoryModal: document.getElementById('victory-modal'),
            victoryTitle: document.getElementById('victory-title'),
            victoryText: document.getElementById('victory-text'),
            sparkline: document.getElementById('price-sparkline'),
            savingsAccount: document.getElementById('savings-account'),
            sharesOwned: document.getElementById('shares-owned'),
            unrealizedPL: document.getElementById('unrealized-pl'),
            debtAmount: document.getElementById('debt-amount'),
            stockQty: document.getElementById('stock-qty'),
            goalLabel: document.querySelector('.progress-label'),
            retirementGoal: document.getElementById('retirement-goal'),
            diffModal: document.getElementById('difficulty-modal'),
            bankruptModal: document.getElementById('bankrupt-modal'),
            businessManager: document.getElementById('business-manager'),
            businessList: document.getElementById('business-list'),
            bankSelector: document.getElementById('bank-selector'),
            bankStatus: document.getElementById('bank-status'),
            btnScratcher: document.getElementById('btn-scratcher'),
            btnMega: document.getElementById('btn-mega'),
            btnLoanShark: document.getElementById('btn-loan-shark'),
            btnLoanBank: document.getElementById('btn-loan-bank'),
            bankLoanAmt: document.getElementById('bank-loan-amt'),
            bankLoanTerm: document.getElementById('bank-loan-term'),
            jobOffersList: document.getElementById('job-offers-list'),
            achievementsList: document.getElementById('achievements-list'),
            shop: {
                course: document.getElementById('buy-course'),
                car: document.getElementById('buy-car'),
                bed: document.getElementById('buy-bed'),
                mansion: document.getElementById('buy-mansion'),
                mba: document.getElementById('buy-mba'),
                remote: document.getElementById('buy-remote'),
                gig: document.getElementById('buy-biz-gig'),
                saas: document.getElementById('buy-biz-saas'),
                retail: document.getElementById('buy-biz-retail'),
                coffee: document.getElementById('buy-biz-coffee'),
                tech: document.getElementById('buy-biz-tech'),
                realestate: document.getElementById('buy-biz-realestate')
            },
            btnDiffEasy: document.getElementById('diff-easy'),
            btnDiffMedium: document.getElementById('diff-medium'),
            btnDiffHard: document.getElementById('diff-hard'),
            jobMarketGauge: document.getElementById('job-market-gauge'),
            jobMarketStatus: document.getElementById('job-market-status'),
            employmentStatus: document.getElementById('employment-status'),
            btnChangeJob: document.getElementById('btn-change-job'),
            jobOffersModal: document.getElementById('job-offers-modal'),
            jobOffersDesc: document.getElementById('job-offers-desc'),
            jobOffersList: document.getElementById('job-offers-list'),
            btnDeclineOffers: document.getElementById('decline-offers'),

            // Header job market elements
            jobMarketStatusHeader: document.getElementById('job-market-status-header'),
            jobMarketGaugeHeader: document.getElementById('job-market-gauge-header'),
            employmentStatusHeader: document.getElementById('employment-status-header'),
            btnChangeJobHeader: document.getElementById('btn-change-job-header'),

            lifestyleSelector: document.getElementById('lifestyle-selector'),
            stockVolume: document.getElementById('stock-volume'),
            modalOverlay: document.getElementById('modal-overlay'),
            themeToggle: document.getElementById('theme-toggle'),
            goalText: document.getElementById('goal-text'),
            cheatCode: document.getElementById('cheat-input'),
            playerStatus: document.getElementById('player-status'),
            vetModal: document.getElementById('vet-modal'),
            vetTitle: document.getElementById('vet-title'),
            vetDesc: document.getElementById('vet-desc'),
            btnAcceptVet: document.getElementById('accept-vet'),
            btnDeclineVet: document.getElementById('decline-vet'),
            btnAdoptChild: document.getElementById('btn-adopt-child'),
            btnAdoptChildRel: document.getElementById('btn-adopt-child-rel'),
            btnSpendTime: document.getElementById('btn-spend-time'),
            loanList: document.getElementById('loan-list'),
            genderSelector: document.getElementById('gender-selector'),
            sexualitySelector: document.getElementById('sexuality-selector'),
            famBar: document.getElementById('family-happiness-bar'),
            famScore: document.getElementById('family-happiness-score'),
            famContainer: document.getElementById('family-happiness-container'),
            charHappiness: document.getElementById('char-happiness'),
            charHealth: document.getElementById('char-health'),
            charGender: document.getElementById('char-gender'),
            charSexuality: document.getElementById('char-sexuality'),
            transitionStatus: document.getElementById('transition-status'),
            perksList: document.getElementById('perks-list'),
            // New Expansion Elements
            economyBar: document.getElementById('economy-health-bar'),
            playTimer: document.getElementById('play-timer'),
            socialBar: document.getElementById('social-bar'),
            socialVal: document.getElementById('social-val'),
            bondTotal: document.getElementById('bond-total-invested'),
            bondIncome: document.getElementById('bond-monthly-income'),
            availableBondsList: document.getElementById('available-bonds-list')
        };

        // Validate UI (Softened to prevent script-level crash)
        for (const key in UI) {
            if (!UI[key] && key !== 'shop' && key !== 'victoryModal' && key !== 'retirementGoal' && key !== 'goalText') {
                console.warn(`Missing non-critical UI element: ${key}`);
            }
        }

        // Init listeners
        if (UI.btnSave) UI.btnSave.onclick = () => window.handleAction('save');
        if (UI.btnWithdraw) UI.btnWithdraw.onclick = () => window.handleAction('withdraw');
        // UI.btnBuyStock.onclick = ... (Handled inline)
        // UI.btnSellStock.onclick = ... (Handled inline)
        // UI.btnBuyStock.onclick = ... (Handled inline)
        // UI.btnSellStock.onclick = ... (Handled inline)
        // UI.btnMaxBuy.onclick = ... (Handled via handleAction('buy-max'))
        // UI.btnMaxSell.onclick = ... (Handled via handleAction('sell-max'))
        // UI.btnMaxSell.onclick = ... (Handled via handleAction('sell-max'))

        if (UI.btnMaxBuy) {
            UI.btnMaxBuy.onclick = () => {
                const qty = Math.floor(state.cash / state.stockPrice);
                if (qty > 0) {
                    if (UI.stockQty) UI.stockQty.value = qty;
                    window.handleAction('buy');
                } else {
                    gameAlert("Broker Error", "You can't afford even 1 share!");
                }
            };
        }
        if (UI.btnMaxSell) {
            UI.btnMaxSell.onclick = () => {
                if (state.sharesOwned > 0) {
                    if (UI.stockQty) UI.stockQty.value = state.sharesOwned;
                    window.handleAction('sell');
                } else {
                    gameAlert("Broker Error", "You don't own any shares to sell!");
                }
            };
        }
        if (UI.btnDoctor) UI.btnDoctor.onclick = () => window.handleAction('doctor');
        if (UI.btnSpend) UI.btnSpend.onclick = () => window.handleAction('spend');
        if (UI.btnNext) UI.btnNext.onclick = nextMonth;
        // Multi-event close logic is handled dynamically now

        // Shop & Business Listeners
        if (UI.shop) {
            if (UI.shop.course) UI.shop.course.onclick = () => window.handleAction('buy-upgrade', 'course', 2000);
            if (UI.shop.car) UI.shop.car.onclick = () => window.handleAction('buy-car');
            if (UI.shop.bed) UI.shop.bed.onclick = () => window.handleAction('buy-upgrade', 'bed', 1200);
            if (UI.shop.mansion) UI.shop.mansion.onclick = () => window.handleAction('buy-upgrade', 'mansion', 15000);
            if (UI.shop.gig) UI.shop.gig.onclick = () => window.handleAction('buy-business', 'gig');
            if (UI.shop.saas) UI.shop.saas.onclick = () => window.handleAction('buy-business', 'saas');
            if (UI.shop.retail) UI.shop.retail.onclick = () => window.handleAction('buy-business', 'retail');
        }

        // Difficulty Listeners
        // Difficulty Listeners
        if (UI.btnDiffEasy) UI.btnDiffEasy.addEventListener('click', () => startGame(1));
        if (UI.btnDiffMedium) UI.btnDiffMedium.addEventListener('click', () => startGame(2));
        if (UI.btnDiffHard) UI.btnDiffHard.addEventListener('click', () => startGame(3));

        if (UI.bankSelector) {
            UI.bankSelector.onchange = (e) => {
                state.currentBank = e.target.value;
                updateUI();
            };
        }

        if (UI.btnScratcher) UI.btnScratcher.onclick = () => window.handleAction('buy-scratcher');
        if (UI.btnMega) UI.btnMega.onclick = () => window.handleAction('buy-mega');
        if (UI.btnLoanShark) UI.btnLoanShark.onclick = () => window.handleAction('loan-shark');
        if (UI.btnLoanBank) UI.btnLoanBank.onclick = () => window.handleAction('loan-bank');
        if (UI.btnChangeJob) UI.btnChangeJob.onclick = () => window.handleAction('change-job');
        if (UI.btnChangeJobHeader) UI.btnChangeJobHeader.onclick = () => window.handleAction('change-job');

        if (UI.btnDeclineOffers) {
            UI.btnDeclineOffers.onclick = () => {
                if (UI.jobOffersModal) UI.jobOffersModal.classList.add('hidden');
                if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');
            };
        }

        // Theme Toggle
        // Moved to global window.toggleTheme for robustness

        // SONNET-STYLE FORCED FIX: Move this to the top of the try block so it runs 
        // even if subsequent UI updates crash.
        setTimeout(() => {
            const isNewLife = state.month === 1 && state.cash === 1000 && state.sharesOwned === 0;
            const missingIdentity = !state.gender || !state.sexuality;

            if (!state.difficultyModalShown || isNewLife || missingIdentity) {
                console.log("Sonnet Fix: Forcing identity modal show...");
                const modal = document.getElementById('difficulty-modal');
                const overlay = document.getElementById('modal-overlay');

                if (modal) {
                    modal.classList.remove('hidden');
                    modal.style.setProperty('display', 'block', 'important');
                    modal.style.setProperty('opacity', '1', 'important');
                    modal.style.setProperty('visibility', 'visible', 'important');
                    modal.style.setProperty('z-index', '10000', 'important');
                }

                if (overlay) {
                    overlay.classList.add('active');
                    overlay.style.setProperty('display', 'block', 'important');
                    overlay.style.setProperty('opacity', '1', 'important');
                    overlay.style.setProperty('z-index', '9999', 'important');
                }
            }
        }, 500);

        // Load saved game
        loadGame();

        // Clear invalid timer ID if loaded into state (legacy support)
        if (state.timerInterval) delete state.timerInterval;

        updateUI();

        calculateExpenses(); // Init expenses based on default lifestyle
    } catch (e) {
        console.error("Game Init Failed:", e);
    }
});

// --- New Expansion Helpers ---

function generateBonds() {
    const ratings = ['AAA', 'AA', 'A', 'BBB', 'CC'];
    const newBonds = [];
    for (let i = 0; i < 3; i++) {
        const type = Math.random() > 0.5 ? 'Corp' : 'Gov';
        const rating = type === 'Gov' ? 'AAA' : ratings[Math.floor(Math.random() * ratings.length)];
        let rateBase = type === 'Gov' ? 0.03 : 0.05;

        // Economy Impact
        if (state.economyHealth < 50) rateBase += 0.02; // Higher yield in bad economy

        // Rating Impact
        if (rating === 'AA') rateBase += 0.01;
        if (rating === 'A') rateBase += 0.02;
        if (rating === 'BBB') rateBase += 0.04;
        if (rating === 'CC') rateBase += 0.10; // Junk bond

        const rate = parseFloat((rateBase + (Math.random() * 0.01)).toFixed(4));

        const durations = [12, 24, 36, 60, 120];
        const duration = durations[Math.floor(Math.random() * durations.length)];

        newBonds.push({
            id: 'bond_' + Date.now() + '_' + i,
            type: type,
            rating: rating,
            faceValue: 1000,
            couponRate: rate,
            duration: duration,
            monthsRemaining: duration,
            name: `${type === 'Gov' ? 'Treasury' : 'Corp'} ${rating} Bond`
        });
    }
    return newBonds;
}

function renderBonds() {
    if (!UI.availableBondsList) return;

    // Holdings
    const invested = state.bonds.holdings.reduce((sum, b) => sum + b.faceValue, 0);
    const monthly = state.bonds.holdings.reduce((sum, b) => sum + (b.faceValue * b.couponRate / 12), 0);

    if (UI.bondTotal) UI.bondTotal.innerText = `$${invested.toLocaleString()}`;
    if (UI.bondIncome) UI.bondIncome.innerText = `$${Math.floor(monthly).toLocaleString()}`;

    if (invested >= 50000) unlockAchievement('bond-tycoon');

    // Available
    let html = '';
    state.bonds.available.forEach(bond => {
        const yieldPct = (bond.couponRate * 100).toFixed(2);
        const ratingClass = 'rating-' + bond.rating.toLowerCase();
        html += `
        <div class="bond-card">
            <div>
                <span class="bond-rating ${ratingClass}">${bond.rating}</span>
                <span style="font-size:0.8rem; font-weight:bold;">${bond.name} (${bond.duration}m)</span>
                <div style="font-size:0.7rem; color:#64748b;">Yield: ${yieldPct}% | Risk: ${bond.rating === 'CC' ? 'High' : 'Low'}</div>
            </div>
            <button class="shop-btn" style="padding:2px 8px; font-size:0.7rem;" onclick="window.handleAction('buy-bond', '${bond.id}')">Buy ($1k)</button>
        </div>`;
    });

    // Holdings Header
    html += `<hr style="margin:0.75rem 0; border:none; border-top:1px dashed var(--border);">`;
    html += `<h5 style="margin-bottom:0.5rem; font-size:0.75rem; color:var(--text-light);">My Holdings:</h5>`;

    if (state.bonds.holdings.length === 0) {
        html += `<div style="font-size:0.75rem; color:var(--text-light); font-style:italic;">No bonds held.</div>`;
    }

    state.bonds.holdings.forEach(bond => {
        const yieldPct = (bond.couponRate * 100).toFixed(2);
        html += `
        <div class="bond-card" style="border-left-color: #10b981; margin-bottom: 0.4rem;">
            <div style="flex:1;">
                <div style="font-size:0.75rem; font-weight:bold;">${bond.name}</div>
                <div style="font-size:0.65rem; color:#64748b;">Yield: ${yieldPct}% | Maturity: ${bond.monthsRemaining}m</div>
            </div>
            <button class="shop-btn" style="padding:2px 6px; font-size:0.65rem; background:#fee2e2; color:#b91c1c; border-color:#fecaca;" 
                onclick="window.handleAction('sell-bond', '${bond.id}')">Sell (-10%)</button>
        </div>`;
    });

    UI.availableBondsList.innerHTML = html;
}



function startGame(diff) {
    if (diff === 4) { // Infinite Mode
        state.difficulty = 3; // Hard settings
        state.cash = 200; // Hard start
        state.income = 1800; // Low pay
        state.winGoal = Infinity;
        state.baseGoal = 0; // Display "Infinite"
    } else {
        const settings = {
            1: { diff: 1, goal: 150000, cash: 5000, income: 4500 },
            2: { diff: 2, goal: 250000, cash: 1000, income: 2500 },
            3: { diff: 3, goal: 500000, cash: 500, income: 1800 }
        }[diff];
        state.difficulty = settings.diff;
        state.winGoal = settings.goal;
        state.baseGoal = settings.goal;
        state.cash = settings.cash;
        state.income = settings.income;
    }
    state.difficultyModalShown = true;
    recalculateWinGoal();

    // Use direct DOM access for reliability
    const modal = document.getElementById('difficulty-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = '';
        modal.style.opacity = '';
        modal.style.visibility = '';
        modal.style.zIndex = '';
    }
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = '';
        overlay.style.opacity = '';
        overlay.style.zIndex = '';
    }

    // Also update UI object state if possible
    if (UI.diffModal) {
        UI.diffModal.classList.add('hidden');
        UI.diffModal.style.display = '';
    }

    // Family Tracker Update
    const fanTracker = document.getElementById('family-tracker');
    const unitCounts = document.getElementById('unit-counts');
    if (fanTracker && unitCounts) {
        const kCount = state.family.children.length;
        const pCount = state.pets.count;
        if (kCount > 0 || pCount > 0) {
            fanTracker.style.display = 'block';
            unitCounts.innerText = `${kCount} Kid${kCount !== 1 ? 's' : ''}, ${pCount} Pet${pCount !== 1 ? 's' : ''}`;
        } else {
            fanTracker.style.display = 'none';
        }
    }

    if (UI.retirementGoal) {
        UI.retirementGoal.innerText = state.winGoal === Infinity ? "Keep Growing" : `$${state.winGoal.toLocaleString()}`;
    }
    if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');

    state.gender = document.getElementById('gender-selector').value;
    state.sexuality = document.getElementById('sexuality-selector').value;

    // Expansion Initialization: Neurodivergence Logic
    // If Straight AND (Male or Female) -> 10%
    // Else (Trans, NB, or Queer sexuality) -> 30%
    const isCisHet = state.sexuality === 'Straight' && (state.gender === 'Male' || state.gender === 'Female');
    const neuroChance = isCisHet ? 0.10 : 0.30;

    state.hiddenADHD = Math.random() < neuroChance;
    state.hiddenAutism = Math.random() < neuroChance;
    state.economyHealth = 100;
    state.socialLife = 50;
    state.socialMovesMax = 5; // Base (NT)
    state.socialMovesUsed = 0;

    // Neuro penalties to Max Moves (Applied dynamically in nextMonth usually, but init here too)
    if (state.hiddenADHD) state.socialMovesMax--;
    if (state.hiddenAutism) state.socialMovesMax--;
    state.socialMovesMax = Math.max(3, state.socialMovesMax); // Cap at 3 min? User said "adhd+autism = 3".

    // Correction: User said "adhd = 4 moves total, autism = 4 moves total; adhd+autism = 3"
    // So logic: Base 5. If ADHD -1. If Autism -1.
    // Init logic needs to apply if hidden? Or only diagnosed? 
    // User said "if you're neurodivergent (adhd or autistic) you permanently lose 1 move".
    // Usually hidden traits affect things subtly. Let's apply it immediately since it's "who you are".
    state.economyHealth = 100;
    state.socialLife = 50;

    // Initialize Market
    state.bonds.available = generateBonds();

    // Start Play Timer
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            state.playTime++;
            const hrs = Math.floor(state.playTime / 3600);
            const mins = Math.floor((state.playTime % 3600) / 60);
            const secs = state.playTime % 60;
            if (UI.playTimer) UI.playTimer.innerText = `Time: ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

            if (state.playTime >= 28800 && !state.unlockedAchievements.includes('still-here')) { // 8 hours
                unlockAchievement('still-here');
            }
        }, 1000);
    }

    updateUI();
}

function recalculateWinGoal() {
    const expenses = state.expenses.rent + state.expenses.food;
    const bizMaint = state.businesses.reduce((sum, b) => sum + b.maint, 0);
    const totalDebt = state.loans.reduce((sum, l) => sum + l.amount, 0);

    // Each $1,000 of debt adds $5,000 to the retirement requirement (Stress/Risk)
    const debtStress = (totalDebt / 1000) * 5000;
    const totalMonthlyDrain = expenses + bizMaint;

    if (state.winGoal === Infinity) return;
    state.winGoal = state.baseGoal + (totalMonthlyDrain * 50) + debtStress;
}

function closeModal() {
    if (UI.eventContainer) {
        UI.eventContainer.innerHTML = "";
        UI.eventContainer.classList.add('hidden');
    }
    if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');
}

window.checkEmptyEvents = () => {
    if (UI.eventContainer && UI.eventContainer.children.length === 0) {
        closeModal();
    }
};

function calculateExpenses() {
    // Base expenses
    let rent = 800;
    let food = 400;

    // Lifestyle Modifiers
    if (state.lifestyle === 'budget') {
        rent *= 0.7; // 30% cheaper
        food *= 0.7;
    } else if (state.lifestyle === 'lavish') {
        rent *= 1.5; // 50% more expensive
        food *= 1.5;
    }

    // Apply Inflation
    food += (state.inflation || 0);

    // Business costs
    state.expenses.manager = state.hasManager ? 500 : 0;
    state.expenses.bizMaint = state.hasManager ? state.businesses.reduce((sum, b) => sum + (b.maint || 0), 0) : 0;

    // Commute Logic
    let commuteCost = 0;
    if (state.job) {
        const mode = state.job.mode || 'onsite';
        if (mode === 'onsite') {
            commuteCost = state.upgrades.car ? 50 : 200;
        } else if (mode === 'hybrid') {
            commuteCost = state.upgrades.car ? 25 : 100;
        }
    }
    state.expenses.commute = commuteCost;

    // Pet Costs
    let petCost = 0;
    if (state.pets && state.pets.count > 0) {
        petCost += (state.pets.count * 40); // Food
        if (state.petInsurance) petCost += (state.pets.count * 15); // Insurance
    }
    state.expenses.pet = petCost;

    // Child Costs
    const activeChildren = state.family.children.filter(c => c.isWithPlayer !== false);
    state.expenses.children = activeChildren.length * 800;

    // Final assignment
    state.expenses.rent = Math.round(rent);
    state.expenses.food = Math.round(food);
    state.expenses.fun = 100; // Monthly fun budget
}


// Global handleAction wrapper for error safety and unfreezing
window.handleAction = function (type, upgradeId, cost) {
    try {
        _handleActionInternal(type, upgradeId, cost);
    } catch (e) {
        if (customModal) customModal.classList.add('hidden');

        // Use standard alert if gameAlert is broken
        alert("System Error: Action failed. The game has been unfrozen.");
    }
};

window.hardRestart = hardRestart;
window.continuePlaying = continuePlaying;
window.prestigeNewGame = prestigeNewGame;
window.calculateExpenses = calculateExpenses;
window.startGame = startGame;
window.nextMonth = function () {
    try {
        _proceedToNextMonth();
        saveGame();
    } catch (e) {
        console.error("Month Update Failed:", e);
        gameAlert("System Error ⚠️", `Failed to start next month.\n\nError: ${e.message}\n\nPlease report this or try refreshing.`);
    }
};
window.closeModal = closeModal;
window.updateUI = updateUI;
window.triggerEvent = triggerEvent;
window.generateJobOffers = generateJobOffers;
window.toggleTheme = function () {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
};

const gameAlert = (title, desc) => {
    if (!UI.eventContainer) return;

    UI.eventContainer.classList.remove('hidden');
    if (UI.modalOverlay) UI.modalOverlay.classList.add('active');

    const cardNode = document.createElement('div');
    cardNode.className = 'event-box';
    cardNode.innerHTML = `
        <h5 class="modal-origin">Game Alert</h5>
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="action-btn primary" style="width: 100%; border:none;" onclick="this.parentElement.remove(); window.checkEmptyEvents();">Got it</button>
    `;
    UI.eventContainer.appendChild(cardNode);
};

function updateUI() {
    // Safety initializers for legacy saves
    if (!state.loans) state.loans = [];
    if (!state.businesses) state.businesses = [];
    if (!state.upgrades) state.upgrades = {};
    if (!state.family) state.family = { children: [] };
    if (!state.pets) state.pets = { count: 0, names: [] };
    if (!state.unlockedAchievements) state.unlockedAchievements = [];
    if (state.totalPetsAdopted === undefined) state.totalPetsAdopted = 0;
    if (state.totalPetsAdopted === undefined) state.totalPetsAdopted = 0;
    if (state.divorceCount === undefined) state.divorceCount = 0;
    if (state.custodyMonth === undefined) state.custodyMonth = true;

    // Critical Legacy Fixes (Expansion State)
    if (!state.bonds) state.bonds = { holdings: [], available: [] };
    if (state.bonds.holdings === undefined) state.bonds.holdings = [];
    if (state.bonds.available === undefined) state.bonds.available = [];
    if (state.economyHealth === undefined) state.economyHealth = 100;
    if (state.socialLife === undefined) state.socialLife = 50;
    if (state.hiddenADHD === undefined) state.hiddenADHD = false;
    if (state.hiddenAutism === undefined) state.hiddenAutism = false;
    if (state.playTime === undefined) state.playTime = 0;

    recalculateWinGoal();
    if (UI.goalLabel) {
        UI.goalLabel.innerHTML = `Retirement Goal ($${Math.round(state.winGoal).toLocaleString()}): <span id="progress-percent">0%</span>`;
        UI.progressPercent = document.getElementById('progress-percent');
    }

    if (UI.cash) UI.cash.innerText = `$${(state.cash || 0).toLocaleString()}`;
    const stockAssets = (state.sharesOwned || 0) * (state.stockPrice || 0);
    const totalDebt = (state.loans || []).reduce((sum, l) => sum + (l.amount || 0), 0);
    const netWorth = ((state.cash || 0) + (state.savings || 0) + stockAssets) - totalDebt;
    if (UI.netWorth) UI.netWorth.innerText = `$${netWorth.toLocaleString()}`;
    if (UI.debtAmount) UI.debtAmount.innerText = `$${totalDebt.toLocaleString()}`;
    if (UI.month) UI.month.innerText = state.month || 1;

    // Character Sidebar Updates
    if (UI.charHappiness) UI.charHappiness.innerText = `${state.happiness || 0}%`;
    if (UI.charHealth) {
        UI.charHealth.innerText = state.healthStatus || 'Healthy';
        UI.charHealth.style.color = state.healthStatus === 'Healthy' ? '#10b981' : '#ef4444';
    }
    if (UI.charGender) UI.charGender.innerText = state.gender;
    if (UI.charSexuality) UI.charSexuality.innerText = state.sexuality;
    if (UI.transitionStatus) {
        if (state.transitionStarted) UI.transitionStatus.classList.remove('hidden');
        else UI.transitionStatus.classList.add('hidden');
    }

    // Family Happiness UI
    if (UI.famScore) {
        UI.famScore.innerText = `${state.familyHappiness || 0}%`;
        UI.famBar.style.width = `${state.familyHappiness || 0}%`;
        const hasFam = (state.family.children.length > 0 || state.pets.count > 0);
        UI.famContainer.style.display = hasFam ? 'block' : 'none';
    }

    // Update Identity UI (Legacy display removed from header, keeping variable for safety if used elsewhere)
    const statusText = `${state.healthStatus} | ${state.gender} | ${state.sexuality}`;
    // UI.playerStatus.innerText = statusText;

    // Calculate Perks/Badges for Sidebar
    let perkHTML = "";
    // Neuro Expansion Perks
    if (state.hiddenADHD && !state.diagnosedADHD) {
        perkHTML += `<div class="perk-badge negative">☁️ Brain Fog? (Undiagnosed)</div>`;
    }
    if (state.hiddenAutism && !state.diagnosedAutism) {
        perkHTML += `<div class="perk-badge negative">🔋 Socially Drained? (Undiagnosed)</div>`;
    }
    if (state.diagnosedADHD) perkHTML += `<div class="perk-badge" style="background:#fef08a; color:#854d0e;">⚡ Neuro: ADHD ${state.medicated ? '💊' : ''}</div>`;
    if (state.diagnosedAutism) perkHTML += `<div class="perk-badge" style="background:#bfdbfe; color:#1e3a8a;">🧩 Neuro: Autism ${state.medicated ? '💊' : ''}</div>`;

    if (netWorth >= 30000) perkHTML += `<div class="perk-badge positive">💎 Wealthy Tier (+$200 Passive)</div>`;
    else if (netWorth >= 15000) perkHTML += `<div class="perk-badge positive">⭐ Investor Tier (Luck Up)</div>`;
    else if (netWorth >= 5000) perkHTML += `<div class="perk-badge positive">🛡️ Security Tier (Stress protection)</div>`;

    if (state.upgrades.course) perkHTML += `<div class="perk-badge positive">🎓 Professional (Salary Boost)</div>`;
    if (state.upgrades.car) perkHTML += `<div class="perk-badge positive">🚗 Reliable (Expenses Down)</div>`;
    if (state.upgrades.mansion) perkHTML += `<div class="perk-badge positive">🏰 Estate (Low Decay)</div>`;
    if (totalDebt > 0) perkHTML += `<div class="perk-badge negative">🚩 Debt Burden (Interest Active)</div>`;

    if (UI.perksList) UI.perksList.innerHTML = perkHTML || '<div style="font-size: 0.75rem; color: var(--text-light); font-style: italic;">No active perks.</div>';

    // New Meters Updaters
    if (UI.economyBar) {
        UI.economyBar.style.width = `${state.economyHealth}%`;
        UI.economyBar.style.backgroundColor = state.economyHealth < 30 ? '#ef4444' : (state.economyHealth > 70 ? '#10b981' : '#3b82f6');
    }

    if (UI.socialBar) {
        UI.socialBar.style.width = `${state.socialLife}%`;
        UI.socialBar.style.backgroundColor = state.socialLife < 20 ? '#ef4444' : '#8b5cf6';
    }
    if (UI.socialVal) UI.socialVal.innerText = `${Math.round(state.socialLife)}%`;
    const movesDisplay = document.getElementById('social-moves-count');
    if (movesDisplay) movesDisplay.innerText = `${state.socialMovesMax - state.socialMovesUsed}/${state.socialMovesMax} Moves`;

    renderBonds();
    if (UI.stockPrice) UI.stockPrice.innerText = `$${Math.round(state.stockPrice)}`;
    if (UI.sharesOwned) UI.sharesOwned.innerText = state.sharesOwned;
    if (UI.stockVolume) UI.stockVolume.innerText = state.stockVolume;
    if (UI.savingsAccount) UI.savingsAccount.innerText = `$${state.savings.toLocaleString()}`;

    // Update Unrealized P/L
    if (UI.unrealizedPL) {
        if (state.sharesOwned > 0) {
            const pl = (state.stockPrice - state.avgPurchasePrice) * state.sharesOwned;
            UI.unrealizedPL.innerText = `${pl >= 0 ? '+' : ''}$${Math.round(pl).toLocaleString()}`;
            UI.unrealizedPL.className = pl >= 0 ? 'profit' : 'loss';
        } else {
            UI.unrealizedPL.innerText = "$0";
            UI.unrealizedPL.className = "";
        }
    }

    // Update Market Sentiment UI
    if (UI.sentimentGauge) UI.sentimentGauge.style.width = `${state.sentiment}%`;
    if (UI.marketNews) {
        if (state.sentiment > 70) UI.marketNews.innerText = "Bullish 🚀";
        else if (state.sentiment < 30) UI.marketNews.innerText = "Bearish 📉";
        else UI.marketNews.innerText = "Neutral ⚖️";
    }

    // Update Valuation UI
    if (UI.valuationGauge) UI.valuationGauge.style.width = `${state.valuation}%`;
    if (UI.valuationNews) {
        if (state.valuation > 80) UI.valuationNews.innerText = "Very Overbought ⚠️";
        else if (state.valuation > 65) UI.valuationNews.innerText = "Overbought 🚩";
        else if (state.valuation < 20) UI.valuationNews.innerText = "Deeply Oversold 💎";
        else if (state.valuation < 35) UI.valuationNews.innerText = "Oversold ✨";
        else UI.valuationNews.innerText = "Fair Value ⚖️";
    }

    // Update Bank UI
    if (UI.bankStatus) {
        const bank = state.bankData[state.currentBank];
        UI.bankStatus.innerText = `Current Bank: ${bank.name} (${(bank.rate * 100).toFixed(2)}% Int)`;
    }

    // Update Job Market UI (both old location and new header location)
    if (UI.jobMarketGauge) {
        UI.jobMarketGauge.style.width = `${state.jobMarket}%`;
        if (state.jobMarket > 70) UI.jobMarketStatus.innerText = "Hot 🔥";
        else if (state.jobMarket > 30) UI.jobMarketStatus.innerText = "Stable 📊";
        else UI.jobMarketStatus.innerText = "Cold ❄️";

        if (state.unemployedMonths > 0) {
            UI.employmentStatus.innerText = `Status: Unemployed (Month ${state.unemployedMonths})`;
            UI.btnChangeJob.disabled = true;
            UI.btnChangeJob.innerText = "Job Hunting...";
        } else {
            UI.employmentStatus.innerText = `Status: Employed ($${state.income.toLocaleString()}/mo)`;
            UI.btnChangeJob.disabled = false;
            UI.btnChangeJob.innerText = "Change Jobs";
        }
    }

    // Update header job market widget
    if (UI.jobMarketGaugeHeader) {
        UI.jobMarketGaugeHeader.style.width = `${state.jobMarket}%`;
        if (state.jobMarket > 70) UI.jobMarketStatusHeader.innerText = "Hot 🔥";
        else if (state.jobMarket > 30) UI.jobMarketStatusHeader.innerText = "Stable 📊";
        else UI.jobMarketStatusHeader.innerText = "Cold ❄️";

        if (state.unemployedMonths > 0) {
            UI.employmentStatusHeader.innerText = `Status: Unemployed (Month ${state.unemployedMonths})`;
            UI.btnChangeJobHeader.disabled = true;
            UI.btnChangeJobHeader.innerText = "Job Hunting...";
        } else {
            UI.employmentStatusHeader.innerText = `Status: Employed`;
            UI.btnChangeJobHeader.disabled = false;
            UI.btnChangeJobHeader.innerText = "Change Jobs";
        }
    }

    // Update Sparkline
    const minP = Math.min(...state.priceHistory) * 0.8;
    const maxP = Math.max(...state.priceHistory) * 1.2;
    const range = maxP - minP || 1;
    if (UI.sparkline) {
        UI.sparkline.innerHTML = state.priceHistory.map(p => {
            const height = ((p - minP) / range) * 100;
            return `<div class="spark-bar" style="height: ${height}%"></div>`;
        }).join('');
    }

    renderBonds();
    const goal = state.winGoal;
    if (UI.retirementGoal) {
        UI.retirementGoal.innerText = goal === Infinity ? "Infinity" : `$${goal.toLocaleString()}`;
    }
    const progress = goal === Infinity ? 0 : Math.min(100, Math.round((netWorth / goal) * 100));
    if (UI.progressBar) UI.progressBar.style.width = `${progress}%`;
    if (UI.progressPercent) UI.progressPercent.innerText = goal === Infinity ? "∞" : `${progress}%`;

    // Loans UI
    if (UI.loanList) {
        UI.loanList.innerHTML = state.loans.length === 0 ? "No active debt." : state.loans.map((l, i) => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
            <span>${l.type === 'shark' ? '🦈' : '🏦'} $${l.amount.toLocaleString()} (Due M${l.dueMonth})</span>
            <button onclick="window.handleAction('loan-pay', ${l.id})" style="font-size: 0.6rem; padding: 0 0.25rem;">Pay</button>
        </div>
    `).join('');

        const canBankLoan = state.savings >= (netWorth * 0.3) && netWorth > 0;
        UI.btnLoanBank.disabled = !canBankLoan;
        if (!canBankLoan) {
            UI.btnLoanBank.title = "Requires Savings >= 30% of Net Worth";
        } else {
            UI.btnLoanBank.title = "Bank Loan Available";
        }
    }

    // Tier Badges and Upgrades in Tip Text

    // Update Tips Logic (Priority based)
    let tip = "";
    const activeDebt = state.loans.reduce((sum, l) => sum + l.amount, 0);

    if (state.cash < -5000) {
        tip = "<strong>BANKRUPTCY WARNING:</strong> Your cash is dangerously low. Liquidate assets now or face a total crash!";
    } else if (activeDebt > state.savings * 3 && activeDebt > 0) {
        tip = "<strong>Loan Shark Warning:</strong> Your debt is spiraling! The 10% interest will crush your net worth. Pay it back!";
    } else if (state.sharesOwned > 0) {
        const pl = (state.stockPrice - state.avgPurchasePrice) * state.sharesOwned;
        if (pl < -2000) tip = "<strong>Portfolio Stress:</strong> Your massive losses are crushing your mood. Consider selling to reduce risk.";
        else if (pl > 5000) tip = "<strong>Wealth Euphoria:</strong> Your portfolio is soaring! Use these gains to secure your future.";
    }

    if (!tip && state.happiness < 40) {
        tip = "<strong>Burnout Warning:</strong> Your happiness is low! Treat yourself or visit the Private Doctor to avoid a crisis.";
    } else if (!tip && state.cash < 500) {
        const reqS = Math.max(0, netWorth * 0.3);
        if (state.savings < reqS) {
            tip = `<strong>Need Cash?</strong> The bank requires 30% of net worth in savings ($${Math.round(reqS).toLocaleString()}). Build your savings or use a <strong>Loan Shark</strong>.`;
        } else {
            tip = "<strong>Low Cash:</strong> You qualify for a <strong>Bank Loan</strong> or can use a <strong>Loan Shark</strong> for emergency liquidity.";
        }
    } else if (!tip && state.savings < state.goals.emergencyFund) {
        tip = "Focus on hitting your <strong>$1,000 Emergency Fund</strong> first!";
    } else if (!tip) {
        // Use the new PLAYER_TIPS array, rotating through tips based on month
        tip = PLAYER_TIPS[state.month % PLAYER_TIPS.length];
    }

    // Update tip text in UI
    if (UI.tipText) {
        UI.tipText.innerHTML = tip;
    }

    // Update Shop Buttons
    if (UI.shop) {
        if (UI.shop.course) {
            UI.shop.course.disabled = state.upgrades.course;
            if (state.upgrades.course) UI.shop.course.innerText = "🎓 Course Owned";
        }
        if (UI.shop.car) {
            UI.shop.car.disabled = state.upgrades.car;
            if (state.upgrades.car) UI.shop.car.innerText = "🚗 Car Owned";
        }
        if (UI.shop.bed) {
            UI.shop.bed.disabled = state.upgrades.bed;
            if (state.upgrades.bed) UI.shop.bed.innerText = "🛌 Luxury Bed Owned";
        }
        if (UI.shop.mansion) {
            UI.shop.mansion.disabled = state.upgrades.mansion;
            if (state.upgrades.mansion) UI.shop.mansion.innerText = "🏰 Smart Home Owned";
        }
        if (UI.shop.mba) {
            UI.shop.mba.disabled = state.upgrades.mba;
            if (state.upgrades.mba) UI.shop.mba.innerText = "📜 MBA Owned";
        }
        if (UI.shop.remote) {
            UI.shop.remote.disabled = state.upgrades.remote;
            if (state.upgrades.remote) UI.shop.remote.innerText = "🖥️ Remote Setup Owned";
        }

        // Shop Business Status
        if (UI.shop.gig) {
            const hasGig = state.businesses.some(b => b.id === 'gig');
            UI.shop.gig.disabled = hasGig;
            if (hasGig) UI.shop.gig.innerText = "🛠️ Agency Running";
        }
        if (UI.shop.saas) {
            const hasSaaS = state.businesses.some(b => b.id === 'saas');
            UI.shop.saas.disabled = hasSaaS;
            if (hasSaaS) UI.shop.saas.innerText = "💻 SaaS Running";
        }
        if (UI.shop.retail) {
            const hasRetail = state.businesses.some(b => b.id === 'retail');
            UI.shop.retail.disabled = hasRetail;
            if (hasRetail) UI.shop.retail.innerText = "🏪 Shop Running";
        }
        if (UI.shop.coffee) {
            const hasCoffee = state.businesses.some(b => b.id === 'coffee');
            UI.shop.coffee.disabled = hasCoffee;
            if (hasCoffee) UI.shop.coffee.innerText = "☕ Coffee Running";
        }
        if (UI.shop.tech) {
            const hasTech = state.businesses.some(b => b.id === 'tech');
            UI.shop.tech.disabled = hasTech;
            if (hasTech) UI.shop.tech.innerText = "🚀 Consultancy Running";
        }
        if (UI.shop.realestate) {
            const hasRE = state.businesses.some(b => b.id === 'realestate');
            UI.shop.realestate.disabled = hasRE;
            if (hasRE) UI.shop.realestate.innerText = "🏪 Portfolio Running";
        }
    }

    updateBusinessUI();
    updateAchievementsUI();

    // Check Victory
    const isInfinite = state.winGoal === Infinity;
    const stockAssetsValue = (state.sharesOwned || 0) * (state.stockPrice || 0);
    const totalLoanValue = (state.loans || []).reduce((sum, l) => sum + (l.amount || 0), 0);
    const currentNW = (state.cash + state.savings + stockAssetsValue) - totalLoanValue;

    // Legendary achievement should unlock at month 924 regardless of victory
    if (state.month >= 924) {
        unlockAchievement('legendary');
    }

    let won = false;
    if (isInfinite) {
        if (state.month >= 924) {
            console.log('Victory triggered: Infinite Mode, Month 924 reached');
            won = true;
        }
    } else {
        if (currentNW >= state.winGoal && state.happiness >= 75) {
            console.log('Victory triggered: Standard Mode, Goal reached');
            won = true;
        }
    }

    if (won && !state.hasWon) {
        state.hasWon = true; // Mark as won to prevent repeated victory modals

        if (!state.everDated) unlockAchievement('bachelor');

        if (UI.victoryModal) {
            if (isInfinite) {
                if (UI.victoryTitle) UI.victoryTitle.innerText = "🌟 THE IMMORTAL LEGEND";
                if (UI.victoryText) UI.victoryText.innerText = "You've reached Age 99 (Month 924) in Infinite Mode! You've officially conquered the AlphaBet Team's greatest challenge. \n\nNOW GO SCREENSHOT THIS AND BRAG TO THE ALPHABETS DISCORD!";
                UI.victoryModal.style.borderColor = "#8b5cf6";
                if (UI.victoryTitle) UI.victoryTitle.style.color = "#7c3aed";
            }
            UI.victoryModal.classList.remove('hidden');
            if (UI.modalOverlay) UI.modalOverlay.classList.add('active');
        } else {
            const winMsg = isInfinite ? "CONGRATS! You reached Age 99 in Infinite Mode! Brag on Discord!" : "VICTORY! 🏆 You've achieved financial freedom and true happiness. You win!";
            gameAlert("VICTORY! 🏆", winMsg);
        }
    }

    const totalExpenses = (state.expenses.rent + state.expenses.food + state.expenses.fun + (state.expenses.pet || 0) + (state.expenses.children || 0) + (state.expenses.commute || 0) + (state.expenses.manager || 0) + (state.expenses.bizMaint || 0));
    const netIncome = state.income - totalExpenses;
    const interestRate = (state.bankData && state.bankData[state.currentBank]) ? state.bankData[state.currentBank].rate : 0;
    const interest = Math.floor(state.savings * interestRate);
    const passiveBonus = currentNW >= 30000 ? 200 : 0;
    if (UI.savingsPotential) {
        UI.savingsPotential.innerText = `$${(netIncome + interest + passiveBonus).toLocaleString()}`;
    }

    const rows = [
        { label: "Salary", val: state.income, type: "income" },
        { label: "Passive Income", val: passiveBonus, type: "income", hide: passiveBonus <= 0 },
        { label: "Savings Interest", val: interest, type: "income" },
        { label: "Rent/Housing", val: -state.expenses.rent, type: "expense" },
        { label: "Groceries", val: -state.expenses.food, type: "expense" },
        { label: "Children Maintenance", val: -state.expenses.children, type: "expense", hide: !state.expenses.children },
        { label: "Pets (Food/Ins)", val: -state.expenses.pet, type: "expense", hide: !state.expenses.pet },
        { label: "Manager Salary", val: -state.expenses.manager, type: "expense", hide: !state.hasManager },
        { label: "Biz Maintenance", val: -state.expenses.bizMaint, type: "expense", hide: !state.hasManager },
        { label: "Commute", val: -state.expenses.commute || 0, type: "expense" },
        { label: "Fun/Personal", val: -state.expenses.fun, type: "expense" }
    ];

    const tableHtml = rows.filter(r => !r.hide).map(r => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 6px 0; color: var(--text-light); font-size: 0.85rem;">${r.label}</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 700; color: ${r.type === 'income' ? '#22c55e' : '#ef4444'};">
                ${r.type === 'income' ? '+' : ''}$${Math.abs(r.val).toLocaleString()}
            </td>
        </tr>
    `).join('');

    const budgetTable = document.getElementById('budget-table');
    if (budgetTable) {
        budgetTable.innerHTML = tableHtml;
    } else if (UI.budgetList) {
        UI.budgetList.innerHTML = tableHtml; // Fallback if HTML not updated yet
    }

    // Player Status UI
    if (UI.playerStatus) {
        UI.playerStatus.innerText = state.healthStatus;
        UI.playerStatus.style.color = state.healthStatus === 'Healthy' ? '#059669' : '#ef4444';
    }

    // Relationship Gauge Logic
    const relContainer = document.getElementById('rel-gauge-container');
    const relScore = document.getElementById('rel-score');
    const relBar = document.getElementById('rel-bar');

    if (state.partner.status !== 'single' && state.partner.status !== 'divorced') {
        if (relContainer) relContainer.classList.remove('hidden');
        if (relScore) relScore.innerText = `${state.partner.score}%`;
        if (relBar) relBar.style.width = `${state.partner.score}%`;
    } else {
        if (relContainer) relContainer.classList.add('hidden');
    }

    // Relationship Center & Buttons Visibility
    const relCard = document.getElementById('relationship-card');
    const relActions = document.getElementById('rel-actions-container');
    const btnPropose = document.getElementById('btn-propose');
    const btnWeddingEl = document.getElementById('wedding-planning');
    const btnWeddingLav = document.getElementById('wedding-planning-lavish');
    const btnBaby = document.getElementById('btn-have-baby');
    const btnBreak = document.getElementById('btn-break-up');
    const msgStatus = document.getElementById('rel-status-msg');

    if (relCard) {
        const hasChildren = state.family.children.length > 0;
        const hasPets = state.pets.count > 0;
        const isSingle = state.partner.status === 'single' || state.partner.status === 'divorced';

        // Show card if dating OR has family/pets
        if (!isSingle || hasChildren || hasPets) {
            relCard.classList.remove('hidden');
        } else {
            relCard.classList.add('hidden');
        }

        // Show/Hide Relationship specific actions
        if (!isSingle) {
            if (relActions) relActions.style.display = 'block';
            let statusText = `Status: ${state.partner.status.charAt(0).toUpperCase() + state.partner.status.slice(1)}`;
            if (state.partner.isSick) statusText += ` (Sick 🤒)`;
            if (msgStatus) msgStatus.innerText = statusText;

            const isMarried = state.partner.status === 'married';
            const childLimit = state.family.children.length < 3;

            // Propose Button
            if (btnPropose) btnPropose.style.display = (state.partner.status === 'dating' && state.partner.score >= 90) ? 'block' : 'none';

            // Wedding Buttons
            const isEngaged = state.partner.status === 'engaged';
            if (btnWeddingEl) btnWeddingEl.style.display = isEngaged ? 'block' : 'none';
            if (btnWeddingLav) btnWeddingLav.style.display = isEngaged ? 'block' : 'none';

            // Baby & Adoption
            if (btnBaby) btnBaby.style.display = (isMarried && childLimit) ? 'block' : 'none';
            if (UI.btnAdoptChildRel) UI.btnAdoptChildRel.style.display = (isMarried && childLimit) ? 'block' : 'none';

            // Divorce vs Breakup
            if (btnBreak) btnBreak.innerText = isMarried ? "⚖️ File for Divorce" : "💔 Break Up";

            // Spend Time Button Text
            if (UI.btnSpendTime) {
                UI.btnSpendTime.innerText = isMarried ? `🕰️ Spend Time with ${state.partner.name} ($100)` : `🕰️ Spend Time ($100)`;
            }
        } else {
            if (relActions) relActions.style.display = 'none';
            // Ensure top-level adopt button is visible if single (respect limit)
            if (UI.btnAdoptChild) {
                const childLimit = state.family.children.length < 3;
                UI.btnAdoptChild.style.display = childLimit ? 'block' : 'none';
            }
        }
    }

    // Family & Pets Rendering
    const familyContainer = document.getElementById('children-container'); // Reusing ID but content is generic
    const familyList = document.getElementById('children-list');
    if (familyContainer && familyList) {
        const hasChildren = state.family.children.length > 0;
        const hasPets = state.pets.count > 0;

        if (hasChildren || hasPets) {
            familyContainer.style.display = 'block';
            let html = "";

            // Children
            state.family.children.forEach(c => {
                const isAway = c.isWithPlayer === false;
                html += `
                <div class="family-unit-card ${isAway ? 'away' : ''} ${c.isInjured ? 'injured' : ''}">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${c.name} ${c.isInjured ? '<span class="status-badge alert">🩹 (Injured)</span>' : ''} (Age ${c.age}) ${isAway ? '<span class="status-badge">🏘️ (Away)</span>' : ''}</strong>
                        <span class="personality-tag">${c.personality}</span>
                    </div>
                    ${!isAway ? `
                    <div class="happiness-track">
                        <div class="happiness-bar" style="width: ${c.happiness}%; background: ${c.happiness < 30 ? '#ef4444' : '#ec4899'};"></div>
                    </div>` : ''}
                </div>`;
            });

            // Pets
            state.pets.names.forEach(p => {
                html += `
                <div class="family-unit-card pet ${p.isInjured ? 'injured' : ''}">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>🐾 ${p.name} ${p.isInjured ? '<span class="status-badge alert">🩹 (Injured/Sick)</span>' : ''} ${p.hasBandana ? '🧣' : ''}</strong>
                        <span class="personality-tag">Happy Pet</span>
                    </div>
                </div>`;
            });

            familyList.innerHTML = html;
        } else {
            familyContainer.style.display = 'none';
        }
    }

    const datingBtn = document.getElementById('btn-dating-app');
    if (datingBtn) {
        if (state.partner.status === 'dating') {
            datingBtn.innerText = `Have an experience with ${state.partner.name} 💕`;
            datingBtn.style.background = "#8b5cf6"; // Purple for managed
            datingBtn.onclick = () => window.handleAction('manage-rel');
        } else {
            datingBtn.innerText = "Dating App ($50)";
            datingBtn.style.background = "#ec4899"; // Pink
            datingBtn.onclick = () => window.handleAction('dating-app');
        }
    }

    const btnManager = document.getElementById('buy-manager');
    if (btnManager) {
        btnManager.innerText = state.hasManager ? "👔 Fire Manager" : "👔 Hire Manager ($2.5k + Manager Salary)";
        btnManager.style.backgroundColor = state.hasManager ? "#fee2e2" : "#f5f3ff";
        btnManager.style.borderColor = state.hasManager ? "#ef4444" : "#8b5cf6";
        btnManager.style.color = state.hasManager ? "#b91c1c" : "#7c3aed";
    }

    const btnPetIns = document.getElementById('btn-pet-insurance');
    if (btnPetIns) {
        if (state.petInsurance) {
            btnPetIns.innerText = "Cancel Pet Insurance";
            btnPetIns.style.background = "#ef4444"; // Red
        } else {
            btnPetIns.innerText = "Subscribe Pet Insurance";
            btnPetIns.style.background = "#3b82f6"; // Blue
        }
    }

    UI.tipText.innerHTML = (perkHTML ? `<div style='margin-bottom:10px; padding:10px; background:#f1f5f9; border-radius:8px; font-size:0.85rem'>${perkHTML}</div>` : "") + tip;

    // Auto-save game state
    saveGame();
}



function _handleActionInternal(type, upgradeId, cost) {
    // console.log("Action:", type, upgradeId);
    if (type === 'lifestyle') {
        state.lifestyle = upgradeId; // Value passed as second arg
        calculateExpenses();
        updateUI();
        return;
    }

    if (type === 'buy-upgrade') {
        if (state.cash < cost) {
            gameAlert("Insufficient Funds", `You need $${cost.toLocaleString()} to buy this upgrade! You only have $${state.cash.toLocaleString()}.`);
            return;
        }
        state.cash -= cost;
        state.upgrades[upgradeId] = true;

        if (upgradeId === 'course') state.income += 300;
        if (upgradeId === 'bed') state.happiness = Math.min(100, state.happiness + 10);
        if (upgradeId === 'mba') {
            state.income = Math.floor(state.income * 1.25);
            gameAlert("MBA Complete!", "Your income increased by 25%!");
        }
        if (upgradeId === 'remote') {
            state.income += 200; // Efficiency gains
            gameAlert("Remote Office Setup!", "You now save $200/mo on commuting and lunch!");
        }

        checkCompletionist();
        gameAlert("Upgrade Purchased!", `You spent $${cost.toLocaleString()} on ${upgradeId}. Your life just improved!`);
        updateUI();
        return;
    }

    if (type === 'buy-bond') {
        const bond = state.bonds.available.find(b => b.id === upgradeId);
        if (!bond) return;
        if (state.cash < 1000) {
            gameAlert("Broker Error", "You need $1,000 to buy a bond!");
            return;
        }
        state.cash -= 1000;
        state.bonds.holdings.push({ ...bond, purchasedMonth: state.month });
        gameAlert("Bond Purchased 📜", `You bought a ${bond.name}. It will mature in ${bond.duration} months.`);
        updateUI();
        return;
    }

    if (type === 'sell-bond') {
        const bondIdx = state.bonds.holdings.findIndex(b => b.id === upgradeId);
        if (bondIdx === -1) return;
        const bond = state.bonds.holdings[bondIdx];

        if (confirm(`Liquidate ${bond.name}? Early redemption fee is 10% ($100). You will receive $900.`)) {
            state.cash += 900;
            state.bonds.holdings.splice(bondIdx, 1);
            gameAlert("Bond Liquidated", `You sold ${bond.name} for $900 after penalty fees.`);
            updateUI();
        }
        return;
    }

    if (type === 'show-identity') {
        const modal = document.getElementById('difficulty-modal');
        const overlay = document.getElementById('modal-overlay');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.setProperty('display', 'block', 'important');
            modal.style.setProperty('opacity', '1', 'important');
            modal.style.setProperty('visibility', 'visible', 'important');
            modal.style.setProperty('z-index', '10000', 'important');
        }
        if (overlay) {
            overlay.classList.add('active');
            overlay.style.setProperty('display', 'block', 'important');
            overlay.style.setProperty('opacity', '1', 'important');
            overlay.style.setProperty('z-index', '9999', 'important');
        }
        return;
    }

    if (type === 'buy-business') {
        const bizData = {
            gig: { name: "Gig Agency", cost: 500, rev: 150, maint: 50 },
            saas: { name: "SaaS Startup", cost: 5000, rev: 800, maint: 200 },
            retail: { name: "Retail Store", cost: 20000, rev: 3500, maint: 1000 },
            coffee: { name: "Coffee Cart", cost: 2000, rev: 400, maint: 100 },
            tech: { name: "Tech Consultancy", cost: 10000, rev: 2500, maint: 500 },
            realestate: { name: "Real Estate Portfolio", cost: 100000, rev: 12000, maint: 3000 }
        }[upgradeId];

        if (state.cash < bizData.cost) {
            gameAlert("Funding Denied", `You need $${bizData.cost.toLocaleString()} to launch this business. You have $${state.cash.toLocaleString()}.`);
            return;
        }
        state.cash -= bizData.cost;
        state.businesses.push({
            id: upgradeId,
            name: bizData.name,
            health: 100,
            baseRev: bizData.rev,
            maint: bizData.maint
        });
        checkCompletionist();
        gameAlert("Business Launched!", `Congratulations! Your ${bizData.name} is now operational.`);
        calculateExpenses();
        updateUI();
        return;
    }

    if (type === 'buy-manager') {
        if (state.hasManager) {
            state.hasManager = false;
            gameAlert("Manager Fired 👔", "You've fired your manager. You are now responsible for manual business maintenance.");
        } else {
            if (state.cash < 2500) {
                gameAlert("Hiring Costs", "Recruiting a manager costs $2,500.");
                return;
            }
            state.cash -= 2500;
            state.hasManager = true;
            unlockAchievement('delegator');
            gameAlert("Manager Hired! 👔", "Your businesses will now be automatically maintained each month (Cost: $500 salary + maintenance fees).");
        }
        calculateExpenses();
        updateUI();
        return;
    }

    if (type === 'maintain-biz') {
        const biz = state.businesses.find(b => b.id === upgradeId);
        if (!biz) return;
        if (state.cash < biz.maint) {
            gameAlert("Bank Error", `Maintenance failed! You need $${biz.maint.toLocaleString()} (Cash: $${state.cash.toLocaleString()}).`);
            return;
        }
        state.cash -= biz.maint;
        biz.health = Math.min(100, biz.health + 20);
        gameAlert("Maintenance Done", `You performed maintenance on ${biz.name}. Health +20%.`);
        updateUI();
        return;
    }

    // --- Expansion Actions ---
    if (type === 'hang-out') {
        if (state.cash < 40) { gameAlert("Too Broke", "You need $40 to hang out."); return; }


        // Social Moves Check
        const isNeuro = state.hiddenADHD || state.hiddenAutism || state.diagnosedADHD || state.diagnosedAutism;
        if (state.socialMovesUsed >= state.socialMovesMax) {
            const msg = isNeuro ? "You're completely drained. It was fun, but you need to recharge alone for the rest of the month." : "Your friends are all busy recharging. You're too busy to hang out again this month anyway.";
            gameAlert("Social Battery Drained", msg);
            return;
        }

        // Neuro Check (ADHD/Autism Executive Dysfunction)
        if ((state.hiddenADHD || state.hiddenAutism) && !state.medicated && Math.random() < 0.2) {
            gameAlert("Executive Dysfunction", "You planned to go out, but you just... couldn't leave the house. You scrolled on your phone instead. (Neurodivergence Symptom)");
            state.happiness -= 5;
            updateUI();
            return;
        }

        state.cash -= 40;
        state.socialMovesUsed++; // Increment moves
        state.socialLife = Math.min(100, state.socialLife + 15);
        state.happiness = Math.min(100, state.happiness + 8);

        const successMsg = isNeuro ? "That was fun, but it was quite draining. You'll need to rest soon." : "You hung out with friends! It was recharging.";
        gameAlert("Socializing", `${successMsg} (Moves: ${state.socialMovesUsed}/${state.socialMovesMax})`);
        updateUI();
        return;
    }
    if (type === 'take-walk') {
        if (state.lastWalkMonth === state.month && state.walksThisMonth >= 2) {
            gameAlert("Tired", "You've walked enough this month.");
            return;
        }
        if (state.lastWalkMonth !== state.month) {
            state.lastWalkMonth = state.month;
            state.walksThisMonth = 0;
        }

        state.walksThisMonth++;
        state.happiness = Math.min(100, state.happiness + 5);
        state.healthStatus = 'Healthy'; // Small health boost
        gameAlert("Fresh Air", "You took a long walk. Cleared your head.");
        updateUI();
        return;
    }
    if (type === 'buy-bond') {
        const bond = state.bonds.available.find(b => b.id === upgradeId);
        if (!bond) return;
        if (state.cash < 1000) { gameAlert("Funds", "Investments require $1,000."); return; }

        state.cash -= 1000;
        state.bonds.holdings.push({ ...bond, purchaseMonth: state.month });
        // Remove from available
        state.bonds.available = state.bonds.available.filter(b => b.id !== upgradeId);
        gameAlert("Bond Purchased", `You bought a ${bond.name}. It will pay monthly coupons.`);
        updateUI();
        return;
    }
    if (type === 'doctor') {
        if (state.cash < 1500) { gameAlert("Medical Bill", "Checkups cost $1,500."); return; }
        state.cash -= 1500;
        state.immunityMonths = 6;
        let msg = "You are healthy! Immunity boosted for 6 months.";

        // Diagnosis Logic
        if ((state.hiddenADHD || state.hiddenAutism) && (!state.diagnosedADHD && !state.diagnosedAutism)) {
            state.diagnosedADHD = state.hiddenADHD;
            state.diagnosedAutism = state.hiddenAutism;
            msg += "\n\nHowever... The doctor noticed some patterns during your evaluation.";
            if (state.diagnosedADHD) msg += " You have been diagnosed with ADHD.";
            if (state.diagnosedAutism) msg += " You have been diagnosed with Autism.";
            msg += "\n(New Perks Unlocked!)";

            if (state.diagnosedADHD && state.diagnosedAutism) unlockAchievement('neurospicy');
        } else if (state.diagnosedADHD || state.diagnosedAutism) {
            // Meds check
            msg += "\n\nNeurodivergence Checkup: Options available.";
            // This could trigger a modal, but simple alert for now.
            if (!state.medicated) {
                // Auto-offer meds?
                if (confirm("Doctor suggests medication to manage symptoms. Cost: $300/mo. Accept?")) {
                    // Browser confirm doesn't work well in agent.
                    // I'll just auto-prescribe via a specialized action or prompt.
                    // Let's just say "Use the Shop/Health menu to buy meds" or auto-add subscription?
                }
            }
        }

        gameAlert("Doctor Visit", msg);
        updateUI();
        return;
    }

    const nonSpendingActions = ['next', 'sell', 'withdraw', 'accept-job', 'accept-vet', 'save-export', 'save-import', 'cheat', 'decline-vet', 'decline-offers'];
    if (state.cash <= 0 && !nonSpendingActions.includes(type)) {
        gameAlert("Out of Cash!", "You have no cash left! You must start the next month or sell stocks.");
        return;
    }

    if (type === 'spend') {
        if (state.cash < 200) {
            gameAlert("Budget Error", "Not enough cash to treat yourself!");
            return;
        }
        state.cash -= 200;
        state.expenses.fun += 200;
        state.happiness = Math.min(100, state.happiness + 20);
        gameAlert("Treat Yourself!", "You bought a new video game! Happiness +20, Cash -$200.");
    } else if (type === 'save') {
        if (state.cash < 500) {
            gameAlert("Budget Error", "Not enough cash to save $500 right now!");
            return;
        }
        state.cash -= 500;
        state.savings += 500;
        gameAlert("Savings Added", "Smart! You moved $500 into your savings account.");
    } else if (type === 'withdraw') {
        if (state.savings < 500) {
            gameAlert("Bank Error", "You need at least $500 in savings to withdraw!");
            return;
        }
        state.savings -= 500;
        state.cash += 500;
        gameAlert("Cash Withdrawn", "You moved $500 from savings to your checking account.");
    } else if (type === 'buy') {
        const qty = parseInt(UI.stockQty.value) || 1;
        const totalCost = state.stockPrice * qty;
        if (state.cash < totalCost) {
            gameAlert("Broker Error", `Insufficient funds! You need $${Math.round(totalCost).toLocaleString()} to buy ${qty} shares (Cash: $${state.cash.toLocaleString()}).`);
            return;
        }
        // Update Avg Purchase Price
        const prevValue = (state.sharesOwned * state.avgPurchasePrice);
        state.cash -= totalCost;
        state.sharesOwned += qty;
        state.avgPurchasePrice = (prevValue + totalCost) / state.sharesOwned;
        gameAlert("Stocks Purchased", `You bought ${qty} shares at $${Math.round(state.stockPrice)} each.`);
    } else if (type === 'sell') {
        const qty = parseInt(UI.stockQty.value) || 1;
        if (state.sharesOwned < qty) {
            gameAlert("Broker Error", `You don't own ${qty} shares to sell!`);
            return;
        }
        state.sharesOwned -= qty;
        state.cash += (state.stockPrice * qty);

        // Calculate realized profit for achievement
        const realizedProfit = (state.stockPrice - state.avgPurchasePrice) * qty;
        if (realizedProfit >= 1000000) {
            unlockAchievement('diamond-hands');
        }

        if (state.sharesOwned === 0) state.avgPurchasePrice = 0;
        gameAlert("Stocks Sold", `You sold ${qty} shares for $${Math.round(state.stockPrice)} each. Profit: $${Math.round(realizedProfit).toLocaleString()}`);
    } else if (type === 'dating-app') {
        if (state.cash < 50) { gameAlert("Fee Error", "Dating App subscription costs $50."); return; }
        if (state.partner && state.partner.status !== 'single' && state.partner.status !== 'divorced') {
            gameAlert("Already Taken", "You already have a partner! Break up first if you want to look elsewhere.");
            return;
        }

        state.cash -= 50;

        // Success chance based on breakups
        const penalty = state.breakupCount * 0.05;
        const chance = Math.max(0.1, 0.7 - penalty);

        if (Math.random() > chance) {
            gameAlert("No Matches", "You swiped for hours but didn't find anyone you clicked with. Maybe next month?");
            return;
        }

        const names = ["Alex", "Sam", "Jordan", "Taylor", "Casey", "Riley", "Jamie", "Morgan", "Quinn", "Avery", "Blake", "Charlie", "Dakota", "Reese", "Skyler"];
        const pronounsPool = ["she/her", "he/him", "they/them"];
        const traits = ["Creative", "Ambitious", "Kind", "Funny", "Nerdy", "Spontaneous"];

        const name = names[Math.floor(Math.random() * names.length)];
        const pronouns = pronounsPool[Math.floor(Math.random() * pronounsPool.length)];
        const trait = traits[Math.floor(Math.random() * traits.length)];

        state.partner = {
            name: name,
            pronouns: pronouns,
            status: 'dating',
            score: 50,
            finances: 'separate',
            isSick: false
        };

        gameAlert("It's a Match! 💕", `You met ${name} (${pronouns}). They are ${trait}. You are now dating!`);
        updateUI();
        return;
    } else if (type === 'buy-car') {
        if (state.cash < 5000) { gameAlert("Dealer", "You need $5,000 for a reliable used car."); return; }
        state.cash -= 5000;
        state.upgrades.car = true;
        // Recalculate expenses to show commute drop
        calculateExpenses();
        gameAlert("Vroom Vroom 🚗", "You bought a car! Commute costs will now be lower (unless you work remote).");
        updateUI();
        return;
    } else if (type === 'manage-rel') {
        const p = state.partner;
        const roll = Math.random();

        if (state.experiencesThisMonth >= 2) {
            gameAlert("Exhausted", "You've already had 2 major experiences this month. Give your partner some space (and your wallet a break)!");
            return;
        }

        // 1. Merge Finances Offer (Rare, High Score)
        if (p.finances === 'separate' && p.score > 85 && roll < 0.2) {
            state.partner.finances = 'merged';
            state.cash += 2000;
            state.savings += 2000;
            state.partner.score += 10;
            state.experiencesThisMonth++; // Milestone counts as experience
            gameAlert("Relationship Milestone 💍", `${p.name} suggests merging finances! You now share expenses and income. They contributed $2,000 to your savings.`);
            updateUI();
            return;
        }

        // 2. Partner Proposal (Rare, High Score)
        if (p.status === 'dating' && p.score > 90 && roll < 0.05) {
            state.partner.status = 'engaged';
            state.partner.score = 100;
            state.experiencesThisMonth++;
            gameAlert("Surprise Proposal! 💍", `During your time together, ${p.name} drops to one knee and proposes! You're engaged!`);
            updateUI();
            return;
        }

        state.experiencesThisMonth++;

        // 2. Random Experience Generator
        let msg = "";
        let happyChange = 0;
        let scoreChange = 0;

        // Content Expansion (Romance, Lore, Spookies)
        const romanceScenarios = isSapphic() ? [
            "You and ${name} spent the evening slow-dancing to girl-in-red in the kitchen.",
            "She surprised you with a picnic in a hidden wildflower meadow.",
            "You both spent hours talking about your future 'cottagecore' dream home.",
            "She braided your hair while you read poems about Sappho aloud.",
            "A spontaneous thrift store run where you both found matching vintage flannels.",
            "She left a sweet, queer-coded note on your bathroom mirror in lipstick."
        ] : [
            "They set up a candlelit picnic on your balcony.",
            "You spent the whole night dancing to old records in the living room.",
            "They wrote you a heartfelt letter and left it on your pillow.",
            "You drove to the outskirts of town just to watch the stars.",
            "They remember a small detail you mentioned months ago and surprised you.",
            "You shared a quiet moment watching the rain with a single umbrella."
        ];
        const spookyScenarios = [
            "The house felt strangely cold while you were talking. They didn't notice...",
            "They whispered something in their sleep about 'the basement' that they deny later.",
            "A shadow passed the window while you were eating. You were both home alone.",
            "They stare at a corner of the room for a long time, then claim they saw nothing.",
            "You found a bunch of old, scratched-out photos in their drawer. Lore?",
            "The radio turned itself on to a static channel while you were cuddling."
        ];

        // Bad Experience (Low Score or Random Bad Luck)
        if (p.score < 40 && roll < 0.3) {
            const badScenarios = [
                "You had a huge argument about the dishes.",
                "They gave you the silent treatment all day.",
                "They critiqued your career choices.",
                "You forgot a small anniversary. Ouch.",
                "They 'accidentally' deleted your favorite save file."
            ];
            msg = badScenarios[Math.floor(Math.random() * badScenarios.length)];
            happyChange = -15;
            scoreChange = -10;
        }
        // Spooky (5% Rare Chance)
        else if (roll < 0.05) {
            msg = spookyScenarios[Math.floor(Math.random() * spookyScenarios.length)];
            happyChange = -5; // Unsettling
            scoreChange = 2; // Shared trauma?
        }
        // Good/Romance (Default)
        else {
            const isRomance = Math.random() < 0.4;
            const scenarioPool = isRomance ? romanceScenarios : [
                "You two shared a hilarious inside joke.",
                "Cooked a messy but delicious delicious dinner together.",
                "Went for a long walk and talked about the future.",
                "Cuddled on the couch watching a movie.",
                "They texted you a sweet meme while you were working.",
                "You had a spontaneous 10-minute dance party."
            ];
            msg = scenarioPool[Math.floor(Math.random() * scenarioPool.length)]
                .replace(/\${name}/g, state.partner.name);
            happyChange = isRomance ? 15 : 10;
            scoreChange = isRomance ? 8 : 5;
        }

        state.happiness = Math.min(100, Math.max(0, state.happiness + happyChange));
        state.partner.score = Math.min(100, Math.max(0, state.partner.score + scoreChange));

        gameAlert(`Moment with ${p.name}`, `${msg} \n(Happiness ${happyChange > 0 ? '+' : ''}${happyChange}, Saturation ${scoreChange > 0 ? '+' : ''}${scoreChange})`);
        updateUI();
    } else if (type === 'date-varied') {
        const roll = Math.random();
        let cat = 'standard';
        let cost = 100;
        let happy = 10;
        let score = 5;

        if (state.partner.status === 'merged' || state.partner.finances === 'merged') {
            if (roll < 0.2) { cat = 'cheap'; cost = 20; happy = 5; score = 2; }
            else if (roll < 0.6) { cat = 'standard'; cost = 100; happy = 10; score = 5; }
            else { cat = 'expensive'; cost = 250; happy = 25; score = 12; }
        } else {
            if (roll < 0.25) { cat = 'partnerPays'; cost = 0; happy = 15; score = 5; }
            else if (roll < 0.5) { cat = 'cheap'; cost = 20; happy = 5; score = 2; }
            else if (roll < 0.8) { cat = 'standard'; cost = 100; happy = 10; score = 5; }
            else { cat = 'expensive'; cost = 250; happy = 25; score = 12; }
        }

        if (state.cash < cost) {
            gameAlert("Declined", "You can't afford this date plan right now.");
            return;
        }

        const pool = isSapphic() ? SAPPHIC_DATE_SCENARIOS[cat] : DATE_SCENARIOS[cat];
        const rawMsg = pool[Math.floor(Math.random() * pool.length)];
        let msg = rawMsg.replace(/\${name}/g, state.partner.name);

        // Gender-Neutral Date Impact or Variation
        if (state.gender.includes('Trans')) {
            msg += ` You felt especially affirmed being seen as your true ${state.gender === 'Trans MTF' ? 'self' : 'self'} today.`;
            happy += 5;
        } else if (state.gender === 'Nonbinary') {
            msg += " They were careful to use your correct pronouns all night, which meant a lot.";
            happy += 5;
        }

        state.cash -= cost;
        state.happiness = Math.min(200, state.happiness + happy);
        state.partner.score = Math.min(100, state.partner.score + score);
        gameAlert("Date Night", msg);
        updateUI();
    } else if (type === 'gift') {
        const isLarge = upgradeId === 'large';
        const cost = isLarge ? 500 : 50;
        if (state.cash < cost) {
            gameAlert("Too Broke", "You can't afford this gift.");
            return;
        }
        state.cash -= cost;
        state.partner.score = Math.min(100, state.partner.score + (isLarge ? 15 : 5));
        gameAlert("Gift Sent", `You gave ${state.partner.name} a ${isLarge ? "beautiful jewelry piece" : "nice thoughtful gift"}. Score +${isLarge ? 15 : 5}.`);
        updateUI();

    } else if (type === 'propose') {
        if (state.cash < 2000) { gameAlert("Jeweler", "You need $2,000 for the ring."); return; }
        state.cash -= 2000;
        state.partner.status = 'engaged';
        state.happiness += 20;
        gameAlert("She Said Yes! 💍", "You are now Engaged! Time to plan the wedding.");
        updateUI();

    } else if (type === 'wedding') {
        const isLavish = upgradeId === 'lavish';
        const cost = isLavish ? 5000 : 500;

        if (state.cash < cost) { gameAlert("Planner", "You can't afford this wedding plan."); return; }

        state.cash -= cost;
        state.partner.status = 'married';
        state.partner.finances = 'merged'; // Forced merge

        // Lavish wedding boosts happiness to 200% (Visual cap is usually 100, but logic supports >100?)
        // Let's cap visual at 100 usually, but state can go higher? Or just set to 100 max.
        // User asked: "impacts happiness to go to 200%".
        // I will override the clamp?

        if (isLavish) {
            state.happiness = 200; // Special Override
            gameAlert("Just Married! 💒", "An incredible, lavish wedding! Finance merged. Happiness SURGED to 200%.");
        } else {
            state.happiness = 100;
            gameAlert("Just Married! 💍", "A lovely, intimate ceremony. Finances merged. Happiness maxed.");
        }
        updateUI();

    } else if (type === 'have-baby') {
        if (state.partner.status !== 'married') { gameAlert("Wait", "You must be married to start a family!"); return; }
        if (state.family.children.length >= 3) { gameAlert("Family Full", "You already have 3 children! That's the limit for any one life."); return; }
        if (state.cash < 2000) { gameAlert("Hospital Bill", "You need $2,000 for hospital bills and baby gear."); return; }

        let childName = prompt("A new baby is born! Enter their name (or leave blank for a random one):");
        if (childName === null) return; // Cancel if ESC/Cancel
        if (!childName.trim()) childName = getRandomName('child');

        const childTraits = ["Active", "Studious", "Rambunctious", "Normal"];
        const trait = childTraits[Math.floor(Math.random() * childTraits.length)];

        state.cash -= 2000;
        state.family.children.push({
            name: childName,
            age: 0,
            months: 0,
            personality: trait,
            happiness: 80,
            parentName: state.partner.name,
            isWithPlayer: true
        });

        calculateExpenses();
        gameAlert("Congratulations! 🍼", `Welcome to the world, ${childName}! Monthly expenses increased.`);
        updateUI();

    } else if (type === 'adopt-child') {
        if (state.barredFromAdoption) {
            gameAlert("Application Denied", "Due to your previous financial instability, you are currently barred from adoption.");
            return;
        }
        if (state.family.children.length >= 3) {
            gameAlert("Family Full", "You already have 3 children!");
            return;
        }
        if (state.cash < 1000) {
            gameAlert("Adoption Fee", "The adoption agency requires a $1,000 processing fee.");
            return;
        }

        let childName = prompt("The adoption is approved! Enter the child's name (or leave blank for a random one):");
        if (childName === null) return;
        if (!childName.trim()) childName = getRandomName('child');

        const childTraits = ["Kind", "Creative", "Quiet", "Normal"];
        const trait = childTraits[Math.floor(Math.random() * childTraits.length)];

        state.cash -= 1000;
        state.family.children.push({
            name: childName,
            age: Math.floor(Math.random() * 5) + 1,
            months: 0,
            personality: trait,
            happiness: 70,
            parentName: state.partner.status === 'single' ? 'Single Adoption' : state.partner.name,
            isWithPlayer: true
        });

        calculateExpenses();
        gameAlert("Welcome Home! 🏠", `${childName} has joined your family! Monthly expenses increased.`);

        if (state.partner.status === 'single') unlockAchievement('single-parent');

        updateUI();

    } else if (type === 'adopt-pet') {
        if (state.cash < 300) {
            gameAlert("Adoption Center", "Adoption fee is $300. You need more cash.");
            return;
        }
        state.cash -= 300;

        let petName = prompt("Welcome your new pet! Enter their name (or leave blank for a random one):");
        if (petName === null) return;
        if (!petName.trim()) petName = getRandomName('pet');

        state.pets.count++;
        state.totalPetsAdopted++;
        state.pets.names.push({ name: petName, type: "Pet" });
        state.happiness = Math.min(100, state.happiness + 15);
        calculateExpenses(); // Update pet costs
        gameAlert("New Best Friend! 🐾", `You adopted ${petName}! Happiness +15. Monthly expenses increased by $40.`);
        updateUI();
    } else if (type === 'break-up') {
        if (state.partner.status === 'single') return;

        const isDivorce = state.partner.status === 'married';

        if (isDivorce) {
            // Divorce logic with rejection chance
            if (state.partner.score > 40 && Math.random() < 0.5) {
                state.family.divorceAttempts++;
                gameAlert("Divorce Denied ⚖️", `${state.partner.name} refuses to sign the papers. They want to work on things. (Try again another month)`);
                return;
            }

            // Asset split
            const cashSplit = Math.floor(state.cash * 0.5);
            const savingsSplit = Math.floor(state.savings * 0.5);
            state.cash -= cashSplit;
            state.savings -= savingsSplit;

            gameAlert("Divorce Finalized 🏛️", `The marriage is over. Legal fees and asset division cost you $${(cashSplit + savingsSplit).toLocaleString()}.`);
            state.partner.status = 'divorced';
            unlockAchievement('forever');
            if (state.family.children.length > 0) unlockAchievement('co-parenting');
        } else {
            state.breakupCount++;
            if (state.breakupCount >= 2) unlockAchievement('heartbreaker');
            gameAlert("It's Over 💔", `You broke up with ${state.partner.name}. The pool notices your pattern... Match chance decreased.`);
            state.partner.status = 'single';
        }

        const oldPartner = state.partner.name;
        // Keep name for child support context if divorced? No, we'll just set status.
        if (state.partner.status === 'single') {
            state.partner = { status: 'single', name: null, trait: null, duration: 0, score: 0, finances: 'separate' };
        }

        state.happiness = Math.max(0, state.happiness - 20); // Deep grief
        updateUI();

    } else if (type === 'parent-therapy') {
        if (state.cash < 500) { gameAlert("Finance Error", "Therapy costs $500."); return; }
        state.cash -= 500;
        state.happiness = Math.min(100, state.happiness + 15);
        state.family.children.forEach(c => c.happiness = Math.min(100, c.happiness + 10));
        gameAlert("Family Therapy 🛋️", "You worked through some issues. Everyone feels a bit better.");
        updateUI();


    } else if (type === 'spend-time-partner') {
        const cost = 100;
        if (state.cash < cost) { gameAlert("Cant Afford", "You can't afford to take time off right now."); return; }

        state.cash -= cost;

        if (state.partner.status === 'married') {
            const roll = Math.random();
            let cat = 'joy';
            if (roll < 0.15) cat = 'conflict';
            else if (roll < 0.30) cat = 'resolution';

            const pool = MARRIAGE_SCENARIOS[cat];
            const rawMsg = pool[Math.floor(Math.random() * pool.length)];
            const msg = rawMsg.replace(/\${name}/g, state.partner.name);

            let happyChange = 0;
            let scoreChange = 0;

            if (cat === 'joy') {
                happyChange = 10 + Math.floor(Math.random() * 6); // 10-15
                scoreChange = 5 + Math.floor(Math.random() * 6); // 5-10
            } else if (cat === 'conflict') {
                happyChange = -15 - Math.floor(Math.random() * 6); // -15 to -20
                scoreChange = -5 - Math.floor(Math.random() * 6); // -5 to -10
            } else { // resolution
                happyChange = 2 + Math.floor(Math.random() * 4); // +2 to +5 (relief)
                scoreChange = 8 + Math.floor(Math.random() * 5); // +8 to +12 (closer)
            }

            state.happiness = Math.min(200, Math.max(0, state.happiness + happyChange));
            state.partner.score = Math.min(100, Math.max(0, state.partner.score + scoreChange));
            state.familyHappiness = Math.min(100, state.familyHappiness + 5);

            gameAlert(`Marriage Moment with ${state.partner.name}`, `${msg}\n\n(Happiness ${happyChange > 0 ? '+' : ''}${happyChange}, Saturation ${scoreChange > 0 ? '+' : ''}${scoreChange}, Family +5)`);
        } else {
            // New Dating Variety
            const datingPool = [
                "You skipped a gig to hang out with ${name}. They showed you their favorite record store.",
                "You went to a karaoke bar with ${name}. They surprisingly can't sing at all.",
                "Coffee date with ${name}. You talked for 4 hours about nothing and everything.",
                "You and ${name} went thrift shopping. Found a weird porcelain clown.",
                "Casual walk in the city with ${name}. It started raining, cinematic moment ensues.",
                "Netflix and chill with ${name}. You actually watched the documentary.",
                "You helped ${name} fix their printer. True romance.",
                "Late night drive with ${name} to get fast food.",
                "You went to an arcade with ${name}. They destroyed you at Air Hockey."
            ];
            const text = datingPool[Math.floor(Math.random() * datingPool.length)].replace("${name}", state.partner.name);

            state.partner.score = Math.min(100, state.partner.score + 10);
            state.happiness = Math.min(100, state.happiness + 5);
            gameAlert("Quality Time 🕰️", `${text}\n(Cash -$100, Score +10)`);
        }
        updateUI();

    } else if (type === 'family-experience') {
        const cost = 50;
        if (state.cash < cost) { gameAlert("Budget Tight", "You need $50 for a family outing."); return; }

        state.cash -= cost;
        const scenario = generateFamilyScenario(); // Helper function

        state.happiness = Math.min(100, state.happiness + 10);
        state.familyHappiness = Math.min(100, state.familyHappiness + 15);
        // Bonus for everyone
        if (state.partner.status !== 'single') state.partner.score = Math.min(100, state.partner.score + 5);
        state.family.children.forEach(c => c.happiness = Math.min(100, c.happiness + 10));

        gameAlert("Family Memories 📸", `${scenario}\n(Happiness +10, Family Happiness +15)`);
        updateUI();
        return;

    } else if (type === 'doctor') {
        if (state.cash < 1500) {
            gameAlert("Bank Error", "Private check-ups aren't cheap! You need $1,500.");
            return;
        }
        state.cash -= 1500;
        state.immunityMonths = 6;
        gameAlert("Check-up Complete 🩺", "You and your family are healthy! Immunity boosted for 6 months.");
        state.happiness = Math.min(100, state.happiness + 30);
        state.healthStatus = 'Healthy';
        state.sicknessSeverity = 0;
        if (state.partner.status !== 'single') {
            state.partner.isSick = false;
            state.partner.sicknessMonths = 0;
        }
        gameAlert("Family Check-up", "You spent $1,500 on a top-tier medical exam for the household. Everyone is healthy! Happiness +30.");

        // Clear pending emergencies
        state.pendingVet = null;
        if (UI.vetModal) UI.vetModal.classList.add('hidden');
    } else if (type === 'buy-scratcher') {
        if (state.cash < 1) {
            gameAlert("Empty Pockets", "You can't even afford a $1 scratcher!");
            return;
        }
        state.cash -= 1;
        state.happiness = Math.min(100, state.happiness + 0.5);
        if (Math.random() < 0.2) { // 1 in 5
            state.cash += 5;
            gameAlert("Winner!", "You won $5 from the scratcher! Lucky you.");
        } else {
            gameAlert("Loser", "Better luck next time. It only cost $1 anyway.");
        }
    } else if (type === 'toggle-pet-insurance') {
        state.petInsurance = !state.petInsurance;
        calculateExpenses();
        gameAlert("Insurance Updated", state.petInsurance ? "You are now covered! Premium: $15/pet/mo." : "Coverage cancelled. You are at risk of high vet bills.");
        updateUI();
        return;

    } else if (type === 'buy-mega') {
        if (state.cash < 10) {
            gameAlert("Empty Pockets", "Mega Millions costs $10!");
            return;
        }
        state.cash -= 10;
        state.happiness = Math.min(100, state.happiness + 1);
        // Changed to 1 in 1 Million
        if (Math.floor(Math.random() * 1000000) === 777) {
            state.cash += 10000000;
            unlockAchievement('jackpot');
            gameAlert("IMPOSSIBLE LUCK!", "JACKPOT! You won $10,000,000!");
        } else {
            gameAlert("Loser", "The 1-in-a-million dream remains a dream.");
        }
    } else if (type === 'loan-shark') {
        state.cash += 10000;
        state.loans.push({ id: Date.now(), amount: 10000, rate: 0.15, dueMonth: state.month + 1, type: 'shark', term: 1 });
        gameAlert("Shady Deal", "You took $10,000 from a loan shark. 15% interest due NEXT month. Don't be late.");
        updateUI();
        return;
    } else if (type === 'loan-bank') {
        const stockAssetsLoan = state.sharesOwned * state.stockPrice;
        const totalDebtLoan = state.loans.reduce((sum, l) => sum + l.amount, 0);
        const nwLoan = (state.cash + state.savings + stockAssetsLoan) - totalDebtLoan;

        // 30% Net Worth in Savings Requirement
        const requiredSavings = Math.max(0, nwLoan * 0.3);
        if (state.savings < requiredSavings) {
            gameAlert("Loan Rejected", `The bank requires at least 30% of your Net Worth in Savings. You need $${Math.round(requiredSavings).toLocaleString()} in savings (Current: $${state.savings.toLocaleString()}).`);
            return;
        }

        const amt = parseInt(UI.bankLoanAmt.value);
        const term = parseInt(UI.bankLoanTerm.value);

        // Interest rates by term: 3mo=2%, 6mo=1.5%, 12mo=1%
        let rate = 0.02;
        if (term === 6) rate = 0.015;
        else if (term === 12) rate = 0.01;

        // Progressive interest: +0.5% per existing bank loan
        const activeBankLoans = state.loans.filter(l => l.type === 'bank').length;
        rate += (activeBankLoans * 0.005); // +0.5% per loan

        state.cash += amt;
        state.loans.push({ id: Date.now(), amount: amt, rate: rate, dueMonth: state.month + term, type: 'bank', term: term });
        gameAlert("Bank Credit", `Approved! You borrowed $${amt.toLocaleString()} at ${(rate * 100).toFixed(1)}% monthly interest. Term: ${term} months.${activeBankLoans > 0 ? ` (Rate increased due to ${activeBankLoans} existing loan${activeBankLoans > 1 ? 's' : ''})` : ''}`);
    } else if (type === 'loan-pay') {
        const loanIndex = state.loans.findIndex(l => l.id === upgradeId);
        if (loanIndex === -1) return;
        const loan = state.loans[loanIndex];
        if (state.cash < loan.amount) {
            gameAlert("Bank Error", "You don't have enough cash to pay off this specific loan principal.");
            return;
        }
        state.cash -= loan.amount;
        state.loans.splice(loanIndex, 1);
        gameAlert("Loan Repaid", "You cleared a debt! Your net worth requirement just dropped.");
    } else if (type === 'change-job') {
        if (state.unemployedMonths > 0) {
            gameAlert("Already Job Hunting", "You're already searching for a new job!");
            return;
        }
        state.previousIncome = state.income;
        state.income = 0;
        state.unemployedMonths = 1;
        state.jobHunting = true;
        state.jobChangeCount++;
        if (state.jobChangeCount === 1) unlockAchievement('risk-taker');
        if (state.jobChangeCount > 5) unlockAchievement('job-hopper');
        gameAlert("Job Change", `You've quit your $${state.previousIncome.toLocaleString()}/mo job. You're now unemployed and searching for new opportunities. Good luck!`);
    } else if (type === 'accept-job') {
        const idx = Number(upgradeId);
        const jobData = state.lastJobOffers[idx];
        if (!jobData) {
            console.error("Invalid job selection:", upgradeId);
            return;
        }

        state.income = jobData.salary;
        state.jobHappinessMod = jobData.happinessMod;
        state.job = jobData; // Store full job data (including mode)
        state.unemployedMonths = 0;
        state.jobHunting = false;

        // Cleanup modals
        if (UI.jobOffersModal) UI.jobOffersModal.classList.add('hidden');
        if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');

        const modText = jobData.happinessMod > 0 ? `+${jobData.happinessMod}` : jobData.happinessMod;
        gameAlert("New Job!", `Congratulations! You accepted the ${jobData.title} position at $${jobData.salary.toLocaleString()}/mo. Happiness modifier: ${modText}%/mo.`);

        updateUI();
        return; // Explicit return to avoid double updateUI if needed
    } else if (type === 'accept-vet') {
        const pet = state.pendingVet;
        if (!pet) return;
        const cost = 450;
        if (state.cash < cost) {
            gameAlert("Vet Refusal", "The vet won't see your pet without payment up front! You need $450.");
            return;
        }
        state.cash -= cost;
        pet.isInjured = false;
        pet.monthsInjured = 0;
        state.pendingVet = null;
        if (UI.vetModal) UI.vetModal.classList.add('hidden');
        if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');
        gameAlert("Pet Healed!", `${pet.name} is feeling much better. Crisis averted!`);
        updateUI();
        return;
    } else if (type === 'decline-vet') {
        const pet = state.pendingVet;
        if (!pet) return;

        // Pet dies
        const idx = state.pets.names.findIndex(p => p.name === pet.name);
        if (idx !== -1) state.pets.names.splice(idx, 1);
        state.pets.count = state.pets.names.length;

        state.happiness = -20;
        state.pendingVet = null;
        if (UI.vetModal) UI.vetModal.classList.add('hidden');
        if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');
        gameAlert("A Sad Farewell 🌈", `${pet.name} passed away after the medical care was declined. The house feels empty. Happiness is now -20%.`);

        unlockAchievement('bad-pet-owner');

        calculateExpenses();
        updateUI();
        return;
    } else if (type === 'cheat') {
        state.cheated = true;
        unlockAchievement('cheat-used');
        const code = String(upgradeId).trim();
        if (code === 'money200k') {
            state.cash += 200000;
            if (UI.cheatCode) UI.cheatCode.value = "";
            gameAlert("CHEAT ACTIVATED", "You just received $200,000 cash. You absolute legend.");
        } else if (code === 'AlphaBetsIsTheBest') {
            if (state.cheatsUsed.includes('AlphaBetsIsTheBest')) {
                gameAlert("ALREADY USED", "You can only use this specific code once per life!");
                return;
            }
            state.cash += 15000;
            state.cheatsUsed.push('AlphaBetsIsTheBest');
            if (UI.cheatCode) UI.cheatCode.value = "";
            gameAlert("CHEAT ACTIVATED", "AlphaBets truly is the best! You received $15,000.");
        } else {
            gameAlert("INVALID CODE", "Keep searching the forums...");
        }
    } else if (type === 'save-export') {
        try {
            const saveString = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
            const dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = saveString;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            gameAlert("Save Exported", "Your save code has been copied to the clipboard! Keep it safe.");
        } catch (e) {
            console.error("Export failed:", e);
            gameAlert("Export Error", "Something went wrong generating the save string.");
        }
    } else if (type === 'save-import') {
        const code = prompt("Paste your Base64 save code here:");
        if (!code) return;
        try {
            const decoded = JSON.parse(decodeURIComponent(escape(atob(code))));
            // Merge state safely
            Object.assign(state, decoded);
            gameAlert("Success!", "Save file loaded correctly. Welcome back!");
            updateUI();
        } catch (e) {
            console.error("Import failed:", e);
            gameAlert("Import Error", "Invalid save code. Please make sure you copied the whole thing!");
        }
    } else if (type === 'transition') {
        const cost = 5000;
        if (state.cash < cost) {
            gameAlert("Funding Denied", "Gender-affirming care is expensive. You need $5,000.");
            return;
        }

        const newGender = prompt("Enter your new gender identity (Male, Female, Trans FTM, Trans MTF, Nonbinary):");
        if (!newGender || !['Male', 'Female', 'Trans FTM', 'Trans MTF', 'Nonbinary'].includes(newGender)) {
            gameAlert("Invalid Choice", "Please choose a valid gender identity.");
            return;
        }

        state.cash -= cost;
        state.gender = newGender;
        state.upgrades.transition = true;
        state.transitionStarted = true;
        state.happiness = Math.min(100, state.happiness + 30);

        // Partner Reaction
        if (state.partner.status !== 'single' && state.partner.status !== 'divorced') {
            const reactionRoll = Math.random();
            const acceptanceThreshold = state.partner.score / 100; // Better relationship = higher chance of acceptance

            if (reactionRoll < acceptanceThreshold) {
                state.partner.score = Math.min(100, state.partner.score + 10);
                gameAlert("Deep Acceptance 🏳️⚧️", `${state.partner.name} holds your hand. 'I love you for who you are, not your gender.' Your relationship is stronger than ever. Happiness +30.`);
            } else {
                gameAlert("The End of Us 💔", `${state.partner.name} stands up, visibly shaken. 'I'm sorry, I... I can't do this. I'm not attracted to ${state.gender === 'Male' || state.gender === 'Trans FTM' ? 'men' : state.gender === 'Female' || state.gender === 'Trans MTF' ? 'women' : 'nonbinary people'}.'`);
                handleBreakup();
            }
        } else {
            gameAlert("A New Chapter 🏳️⚧️", `You've taken the first major step in your transition to ${state.gender}. You feel a profound sense of relief and joy. Happiness +30.`);
        }
    } else if (type === 'change-sexuality') {
        const cost = 500;
        if (state.cash < cost) {
            gameAlert("Insufficient Funds", "Self-discovery and reflection cost $500.");
            return;
        }

        const newSex = prompt("Enter your new sexuality (Straight, Gay, Bi):");
        if (!newSex || !['Straight', 'Gay', 'Bi'].includes(newSex)) {
            gameAlert("Invalid Choice", "Please choose Straight, Gay, or Bi.");
            return;
        }

        state.cash -= cost;
        state.sexuality = newSex;
        state.monthsSinceSexualityChange = 1;
        state.happiness = Math.max(0, state.happiness - 10); // Initial confusion/social stress

        // Parental acceptance/rift event
        if (Math.random() < 0.5) {
            state.happiness = Math.min(100, state.happiness + 20);
            gameAlert("Coming Out: Acceptance 🏳️🌈", "You told your family about your identity. They were surprisingly supportive! You feel a weight lifted. Happiness +20.");
        } else {
            state.happiness = Math.max(0, state.happiness - 30);
            gameAlert("Coming Out: Familial Rift 💔", "The conversation didn't go well. There's a lot of tension now. Happiness -30.");
        }
    }
    updateUI();
}

function _proceedToNextMonth() {
    // Check Retirement (Infinite Mode Check)
    const nwCalculated = state.cash + state.savings + (state.sharesOwned * state.stockPrice);
    if (state.winGoal !== Infinity && nwCalculated >= state.winGoal) {
        if (state.difficulty === 1) unlockAchievement('victory-easy');
        if (state.difficulty === 2) unlockAchievement('victory-medium');
        if (state.difficulty === 3) unlockAchievement('victory-hard');

        gameAlert("Retirement! 🏖️", `Congratulations! You've reached your goal of $${state.winGoal.toLocaleString()} in net worth. You can finally retire and enjoy the good life.`);
        return;
    }

    // Process finances
    const interestRate = state.bankData[state.currentBank].rate;
    const minBalance = state.bankData[state.currentBank].min;

    let interest = 0;
    if (state.savings >= minBalance) {
        interest = Math.floor(state.savings * interestRate);
    } else if (state.currentBank === 'deltasecure') {
        gameAlert("Bank Update", "DeltaSecure requires $1,000 for interest. You earned $0.");
    }

    // Dynamic Interest Rates (Change every 36 months)
    if (state.month % 36 === 0) {
        gameAlert("Market Shift", "Global interest rates are shifting! Check your banking partners for the new best rates.");
        for (let b in state.bankData) {
            const change = (Math.random() * 0.005) - 0.002; // Significant shift +/- 0.3%
            state.bankData[b].rate = Math.max(0.0005, Math.min(0.015, state.bankData[b].rate + change));
        }
    }

    // Process Loans
    let totalLoanInt = 0;
    let bankGarnished = 0;

    state.loans.forEach(loan => {
        // Apply monthly interest
        const interest = Math.floor(loan.amount * loan.rate);
        totalLoanInt += interest;
        loan.amount += interest;

        // Check if overdue
        if (state.month >= loan.dueMonth) {
            if (loan.type === 'shark') {
                state.happiness = Math.max(0, state.happiness - 30); // Increased from -20
                gameAlert("Shark Collector", "The shark's thugs paid you a visit. You're terrified. Happiness -30.");
            } else {
                // Bank garnish scales with loan amount: 10% of original loan or min $500
                const garnish = Math.max(500, Math.floor(loan.amount * 0.1));
                bankGarnished += garnish;
                state.cash -= garnish;
                gameAlert("Bank Garnish", `AlphaTrust has marked your loan as delinquent. They just garnished $${garnish.toLocaleString()} from your account.`);
            }
        }
    });

    const stockAssets = state.sharesOwned * state.stockPrice;
    const totalDebt = state.loans.reduce((sum, l) => sum + l.amount, 0);
    const nwCurrent = (state.cash + state.savings + stockAssets) - totalDebt;
    const passiveBonus = nwCurrent >= 30000 ? 300 : 0;
    const netIncome = state.income - (state.expenses.rent + state.expenses.food + state.expenses.fun);

    // 0. Debt Check (Bankruptcy Consequences)
    if (nwCurrent < -20000) {
        state.debtMonths++;
        if (state.debtMonths >= 4) {
            gameAlert("The Consequences of Debt ⛓️", "Living in extreme debt has consequences. Your partner has left you, and social services have relocated your children and pets. You are barred from adoption for the foreseeable future.");
            state.partner = { status: 'single', name: null, trait: null, duration: 0, score: 0, finances: 'separate' };
            state.family.children = [];
            state.family.childSupport = 0;
            state.pets.count = 0;
            state.pets.names = [];
            state.barredFromAdoption = true;
            state.debtMonths = 0; // Reset after event
            state.happiness = 0;
        } else {
            gameAlert("DEBT WARNING ⚠️", `You are in deep debt ($${Math.abs(nwCurrent).toLocaleString()}). If this continues for ${4 - state.debtMonths} more months, you will lose everything.`);
        }
    } else {
        state.debtMonths = 0;
    }


    // Process Businesses
    // Manager Salary
    if (state.hasManager) {
        state.cash -= 500;
    }

    let totalBizRev = 0;
    state.businesses.forEach(biz => {
        if (state.hasManager) {
            // Manager keeps health at 100, but charges maintenance
            state.cash -= biz.maint;
            biz.health = 100;
        }

        const rev = Math.floor(biz.baseRev * (biz.health / 100));
        totalBizRev += rev;

        // Natural decay if no manager
        if (!state.hasManager) {
            biz.health = Math.max(0, biz.health - 10);
        }
    });

    state.cash += (netIncome + interest + passiveBonus + totalBizRev);
    state.savings += interest; // Interest compounds in savings
    state.month++;

    // Custody Schedule Toggle
    state.custodyMonth = !state.custodyMonth;
    state.family.children.forEach(c => {
        // Current partner's children are always with the player
        if (state.partner.status !== 'single' && state.partner.status !== 'divorced' && c.parentName === state.partner.name) {
            c.isWithPlayer = true;
        } else if (c.parentName === 'Single Adoption') {
            c.isWithPlayer = true;
        } else {
            // Ex-partner children follow the custody schedule
            c.isWithPlayer = state.custodyMonth;
        }
    });

    calculateExpenses(); // Recalculate based on current custody
    if (totalBizRev > 0) {
        gameAlert("Monthly Profits", `Your businesses generated $${totalBizRev.toLocaleString()} in net profit this month!`);
    }

    // Partner Satisfaction Decay
    if (state.partner.status !== 'single' && state.partner.status !== 'divorced') {
        // Married: -1, Not Married (Dating/Engaged): -5
        const decay = state.partner.status === 'married' ? 1 : 5;
        state.partner.score = Math.max(0, state.partner.score - decay);

        // Financial Stress (Negative NW impact)
        if (nwCurrent < 0) {
            const debtPenalty = Math.min(10, Math.floor(Math.abs(nwCurrent) / 2000));
            if (debtPenalty > 0) {
                state.partner.score = Math.max(0, state.partner.score - debtPenalty);
                // Subtle feedback? Maybe too many alerts if we do it here.
            }
        }

        // Rare Random Breakup (0.2% chance)
        if (Math.random() < 0.002) {
            gameAlert("It's Not You, It's Me", `${state.partner.name} has decided they need some space... forever. They've left.`);
            handleBreakup();
        } else if (state.partner.score <= 0) {
            gameAlert("Relationship Collapsed", `The financial strain and neglect were too much. ${state.partner.name} is leaving you.`);
            handleBreakup();
        }

        // Married Sexuality Penalty
        if (state.partner.status === 'married' && state.monthsSinceSexualityChange > 0) {
            state.partner.score = Math.max(0, state.partner.score - 35);
            state.monthsSinceSexualityChange++;
            if (state.monthsSinceSexualityChange > 5) {
                state.monthsSinceSexualityChange = 0; // Penalty expires
                gameAlert("Identity Acceptance", "After some difficult months, you and your partner have reached a new understanding regarding your identity.");
            }
        }
    }

    // Relationship events (Random monthly fluctuations)
    if (state.partner.status !== 'single' && state.partner.status !== 'divorced' && Math.random() < 0.3) {
        const scenarios = isSapphic() ? SAPPHIC_MARRIAGE_SCENARIOS : MARRIAGE_SCENARIOS;
        const typeRoll = Math.random();
        let eventMsg = "";

        if (typeRoll < 0.6) { // Joy
            eventMsg = scenarios.joy[Math.floor(Math.random() * scenarios.joy.length)];
            state.happiness = Math.min(100, state.happiness + 10);
            state.partner.score = Math.min(100, state.partner.score + 5);
        } else if (typeRoll < 0.85) { // Conflict
            eventMsg = scenarios.conflict[Math.floor(Math.random() * scenarios.conflict.length)];
            state.happiness = Math.max(0, state.happiness - 15);
            state.partner.score = Math.max(0, state.partner.score - 10);
        } else { // Resolution
            eventMsg = scenarios.resolution[Math.floor(Math.random() * scenarios.resolution.length)];
            state.happiness = Math.min(100, state.happiness + 5);
            state.partner.score = Math.min(100, state.partner.score + 10);
        }

        const finalMsg = eventMsg.replace(/\${name}/g, state.partner.name);
        gameAlert("Relationship Moment", finalMsg);
    }

    // Helper for breakup/divorce logic
    function handleBreakup() {
        if (state.partner.status === 'married') {
            const legalFees = Math.floor(state.cash * 0.4);
            state.cash -= legalFees;
            state.partner.status = 'divorced';

            state.divorceCount = (state.divorceCount || 0) + 1;
            unlockAchievement('forever'); // 1st divorce
            if (state.divorceCount >= 5) unlockAchievement('divorce'); // The Big D (5)

            if (state.family.children.length > 0) {
                unlockAchievement('co-parenting');
            }

            gameAlert("Divorce Finalized ⚖️", `The divorce cost you $${legalFees.toLocaleString()} in legal fees and settlements.`);
        } else {
            state.partner.status = 'single';
        }
        state.partner.score = 0;
        state.happiness = Math.max(0, state.happiness - 40);

        // Immediately update custody for ex-partner's children
        state.family.children.forEach(c => {
            if (c.parentName === state.partner.name) {
                c.isWithPlayer = state.custodyMonth;
            }
        });

        calculateExpenses();
        updateUI();
    }

    // Pet Aging & Mortality Logic
    state.pets.names.forEach((pet, index) => {
        pet.monthsOwned = (pet.monthsOwned || 0) + 1;

        // Mortality risk starts around 130 months (11 years)
        if (pet.monthsOwned >= 130) {
            const riskPool = 160 - 130; // 30 month window
            const monthsIntoRisk = pet.monthsOwned - 130;
            // Linear increase in risk as they hit 160
            const deathChance = 0.02 + (monthsIntoRisk / riskPool) * 0.15;

            if (Math.random() < deathChance) {
                gameAlert("A Heavy Heart 🌈", `Your beloved pet, ${pet.name}, has passed away of old age at ${Math.floor(pet.monthsOwned / 12)} years old. The house feels a lot quieter now.`);
                state.pets.names.splice(index, 1);
                state.pets.count = state.pets.names.length;
                state.happiness = Math.max(0, state.happiness - 30);
                unlockAchievement('bad-pet-owner'); // Reusing this for any pet loss
            }
        }
    });

    // Stock Market Logic (Tied to Economy)
    state.lastPrice = state.stockPrice;
    const econBias = (state.economyHealth - 50) / 4; // -12.5 to +12.5 drift
    const trend = ((state.sentiment - 50) / 2) + econBias;
    const fluctuation = trend + (Math.random() - 0.5) * 30;
    state.stockPrice = Math.max(10, state.stockPrice + fluctuation);

    // Job Market Drift (Follows Economy)
    const jobDrift = (state.economyHealth - (state.jobMarket || 50)) * 0.1;
    state.jobMarket = Math.max(0, Math.min(100, (state.jobMarket || 50) + jobDrift + (Math.random() * 2 - 1)));

    // Update History
    state.priceHistory.push(state.stockPrice);
    if (state.priceHistory.length > 6) state.priceHistory.shift();

    // Volume Logic
    const volumeChance = Math.random();
    if (volumeChance < 0.33) state.stockVolume = "Low";
    else if (volumeChance < 0.66) state.stockVolume = "Medium";
    else state.stockVolume = "High";

    // Generate Sentiment for NEXT month
    state.sentiment = Math.floor(Math.random() * 100);

    // Update Valuation (Current month state)
    const minP = Math.min(...state.priceHistory);
    const maxP = Math.max(...state.priceHistory);
    const range = maxP - minP || 1;
    state.valuation = ((state.stockPrice - minP) / range) * 100;

    // Impact of stocks on happiness (Merged Logic)
    if (state.sharesOwned > 0) {
        const totalPL = (state.stockPrice - state.avgPurchasePrice) * state.sharesOwned;
        const plImpact = Math.floor(totalPL / 500); // 1 point per $500
        state.happiness = Math.max(0, Math.min(100, state.happiness + plImpact));
    }

    // Happiness Synergies: Raises
    if (state.happiness >= 80 && Math.random() < 0.2) {
        state.income += 100;
        gameAlert("AlphaBet Team Bonus", "Your high happiness led to a $100 monthly raise!");
    }

    // Reset monthly variables
    state.expenses.fun = 0;
    state.experiencesThisMonth = 0;

    // Reset injuries eventually (2 month recovery)
    state.family.children.forEach(c => {
        if (c.isInjured) {
            c.monthsInjured = (c.monthsInjured || 0) + 1;
            if (c.monthsInjured >= 2) {
                c.isInjured = false;
                c.monthsInjured = 0;
            }
        }
    });
    state.pets.names.forEach(p => {
        if (p.isInjured) {
            p.monthsInjured = (p.monthsInjured || 0) + 1;
            if (p.monthsInjured >= 2) {
                // Force choice or die
                state.pendingVet = p;
                UI.vetTitle.innerText = `Medical Emergency: ${p.name} 🚑`;
                UI.vetDesc.innerText = `${p.name}'s condition has worsened significantly. You must take them to the vet immediately, or they won't make it. Cost: $450.`;
                UI.vetModal.classList.remove('hidden');
                if (UI.modalOverlay) UI.modalOverlay.classList.add('active');
            }
        }
    });

    // Reset Player/Partner Sickness eventually
    if (state.healthStatus === 'Sick') {
        state.sicknessSeverity = (state.sicknessSeverity || 0) + 1;
        if (state.sicknessSeverity >= 2) {
            state.healthStatus = 'Healthy';
            state.sicknessSeverity = 0;
        }
    }

    // Neurodivergence: Hyperfixation Event
    if (state.hiddenADHD || state.diagnosedADHD) {
        if (state.month > 1 && Math.random() < 0.2) {
            const boost = Math.floor(state.income * 0.3);
            state.cash += boost;
            state.socialLife = Math.max(0, state.socialLife - 25);
            gameAlert("Hyperfixation! 🌀", `You've become intensely focused on a new project. You made an extra $${boost.toLocaleString()} this month, but your social life suffered. (-25 Social)`);
        }
    }

    // Wacky Random Events (25% Chance)
    if (Math.random() < 0.25) {
        const events = [
            { title: "Lucky Find 🍀", desc: "You found a $20 bill in an old coat pocket.", effect: () => { state.cash += 20; } },
            { title: "Fender Bender 🚗", desc: "someone scratched your car in the parking lot. Insurance deductible: $200.", effect: () => { state.cash -= 200; state.happiness -= 5; } },
            { title: "Viral Moment 📱", desc: "Your witty reply went viral! You feel famous for 15 minutes.", effect: () => { state.happiness += 10; } },
            { title: "Broken Window 🏠", desc: "A stray baseball shattered your window. Repair cost: $150.", effect: () => { state.cash -= 150; } },
            { title: "Tax Refund Error 💸", desc: "The IRS sent you a check by mistake? Logic says keep it.", effect: () => { state.cash += 300; } },
            { title: "Stepped in Gum 👟", desc: "It's really stuck in there. Day ruined.", effect: () => { state.happiness -= 5; } },
            { title: "Local Hero 🦸", desc: "You helped a neighbor carry groceries. They baked you cookies!", effect: () => { state.happiness += 15; } },
            { title: "Spam Call 📞", desc: "You answered a spam call and wasted 20 minutes. Annoying.", effect: () => { state.happiness -= 2; } },
            { title: "Utility Rebate 💡", desc: "You used less power this month! Refund: $50.", effect: () => { state.cash += 50; } },
            { title: "Coffee Spill ☕", desc: "You spilled coffee on your favorite shirt. Dry cleaning: $30.", effect: () => { state.cash -= 30; } }
        ];
        const evt = events[Math.floor(Math.random() * events.length)];
        evt.effect();
        gameAlert(evt.title, evt.desc);
    }

    // LGBTQ+ Random Events (10% Chance) - IDENTITY FILTERED
    if (Math.random() < 0.10 && isQueer()) {
        const queerEvents = [
            { title: "Pride Parade 🏳️‍🌈", desc: "You spent the day at the local Pride Parade. The sense of community is overwhelming!", effect: () => { state.happiness = Math.min(100, state.happiness + 25); state.cash -= 50; } },
            { title: "Found Family 🫂", desc: "A group of queer friends reached out to support you during a tough week.", effect: () => { state.happiness = Math.min(100, state.happiness + 15); } },
            { title: "Misgendering 😵‍💫", desc: "A barista repeatedly misgendered you today. It was a small thing, but it stung.", effect: () => { state.happiness = Math.max(0, state.happiness - 10); } },
            { title: "New Queer Bookstore 📚", desc: "A local queer-owned bookstore opened up! You spent all afternoon browsing.", effect: () => { state.happiness = Math.min(100, state.happiness + 10); state.cash -= 40; } },
            // New Events
            { title: "Community Garden 🥕", desc: "You joined a local queer gardening group. You grew some tomatoes and made new friends.", effect: () => { state.happiness = Math.min(100, state.happiness + 12); } },
            { title: "Drag Brunch 🥞", desc: "You attended a fabulous drag brunch. The energy was infectious!", effect: () => { state.happiness = Math.min(100, state.happiness + 20); state.cash -= 60; } },
            { title: "Online Discourse 📱", desc: "You got dragged into a pointless argument on queer Twitter. Exhausting.", effect: () => { state.happiness = Math.max(0, state.happiness - 8); } },
            { title: "Art Exhibit 🎨", desc: "You visited a gallery showcasing local trans artists. deeply moving.", effect: () => { state.happiness = Math.min(100, state.happiness + 15); state.cash -= 20; } }
        ];

        // Specific Pet Event
        if (state.pets.count > 0 && Math.random() < 0.4) {
            queerEvents.push({
                title: "Pride Pup! 🐾",
                desc: "You bought a little rainbow bandana for your pet. They look absolutely dashing and ready to march!",
                effect: () => {
                    state.happiness = Math.min(100, state.happiness + 20);
                    state.cash -= 15;
                    const pet = state.pets.names[Math.floor(Math.random() * state.pets.names.length)];
                    pet.hasBandana = true; // Visual marker
                }
            });
        }

        const qEvt = queerEvents[Math.floor(Math.random() * queerEvents.length)];
        qEvt.effect();
        gameAlert(qEvt.title, qEvt.desc);
    }

    // Female Empowerment Events (5% Chance)
    if (Math.random() < 0.05) {
        const femEvents = [
            { title: "Mentorship Moment 👩‍💼", desc: "A senior woman in your field offered you some valuable career advice.", effect: () => { state.jobMarket = Math.min(100, state.jobMarket + 5); } },
            { title: "Girls' Night Out 🥂", desc: "You went out with your girlfriends for a night of no stress and pure vibes.", effect: () => { state.happiness = Math.min(100, state.happiness + 20); state.cash -= 80; } },
            { title: "Equal Pay Win ⚖️", desc: "Your company conducted a pay equity audit and you got a surprise adjustment bonus!", effect: () => { state.cash += 500; } },
            { title: "Empowerment Podcast 🎧", desc: "You listened to an inspiring podcast about women in leadership. You feel motivated.", effect: () => { state.happiness = Math.min(100, state.happiness + 5); } }
        ];
        const fEvt = femEvents[Math.floor(Math.random() * femEvents.length)];
        fEvt.effect();
        gameAlert(fEvt.title, fEvt.desc);
    }

    // === Expansion Logic (Economy, Social, Bonds) ===

    // 1. Social Decay
    let socialDecay = 5; // Base
    if (state.hiddenAutism || state.diagnosedAutism) socialDecay += 3; // Neuro impact
    state.socialLife = Math.max(0, state.socialLife - socialDecay);
    if (state.socialLife < 20) state.happiness = Math.max(0, state.happiness - 10);

    // Reset Social Moves
    state.socialMovesMax = 5;
    if (state.hiddenADHD || state.diagnosedADHD) state.socialMovesMax--;
    if (state.hiddenAutism || state.diagnosedAutism) state.socialMovesMax--;
    state.socialMovesMax = Math.max(3, state.socialMovesMax);
    state.socialMovesUsed = 0;

    // 2. Economy Fluctuation
    const econChange = (Math.random() * 6) - 3; // -3 to +3
    state.economyHealth = Math.min(100, Math.max(0, state.economyHealth + econChange));

    // Economy Impacts
    if (state.economyHealth < 30) {
        state.inflation += 10; // High inflation in bad economy
        if (Math.random() < 0.1) gameAlert("Recession", "The economy is struggling. Prices are rising.");
    } else if (state.economyHealth > 80) {
        state.inflation = Math.max(0, state.inflation - 10);
    }

    // 3. Bonds Processing
    let couponIncome = 0;
    state.bonds.holdings.forEach(bond => {
        // Calculate Interest
        couponIncome += Math.floor(bond.faceValue * (bond.couponRate / 12));

        // Maturity Check
        if (bond.monthsRemaining > 0) bond.monthsRemaining--;

        if (bond.monthsRemaining <= 0 && !bond.matured) {
            state.cash += bond.faceValue;
            bond.matured = true;
            gameAlert("Bond Matured 💰", `Your ${bond.name} has matured! $1,000 principal has been returned to your cash.`);
        }

        // Default Risk (Corp only, only if not matured)
        if (bond.type === 'Corp' && !bond.matured) {
            let defaultRisk = 0.001; // AAA base
            if (bond.rating === 'BBB') defaultRisk = 0.005;
            if (bond.rating === 'CC') defaultRisk = 0.02;

            // Economy Health Impact (Scales risk up to 10x in a crash)
            if (state.economyHealth < 50) {
                const multiplier = 1 + ((50 - state.economyHealth) / 5);
                defaultRisk *= multiplier;
            }

            if (Math.random() < defaultRisk) {
                gameAlert("Bond Default 📉", `A corporate bond issuer in your portfolio (${bond.name}) has defaulted! You lost your principal.`);
                bond.defaulted = true;
            }
        }
    });

    // Clean up matured/defaulted
    state.bonds.holdings = state.bonds.holdings.filter(b => !b.matured && !b.defaulted);

    // Add Interest Income
    if (couponIncome > 0) state.cash += couponIncome;

    // Refresh Available Bonds
    state.bonds.available = generateBonds();

    // === Hyperfixation Event (Neurodivergent) ===
    // 20% Chance if ADHD (Hidden or Diagnosed)
    if ((state.hiddenADHD || state.diagnosedADHD) && Math.random() < 0.2) {
        if (state.businesses.length > 0) {
            state.businesses.forEach(b => b.health = 100);
            gameAlert("Hyperfixation Mode! 🚀", "You got hyperfixated on your business! All businesses repaired to 100% Health.");
        } else {
            state.cash += 500;
            gameAlert("Hyperfixation Mode! 🚀", "You got hyperfixated on a side project and made an extra $500 this month!");
        }
        state.socialLife = Math.max(0, state.socialLife - 25);
    }

    // === Sickness & Health Logic ===
    let sickChance = 0.05; // Base 5%
    if (state.familyHappiness < 40) sickChance += 0.15;
    else if (state.familyHappiness < 70) sickChance += 0.05;

    if (state.lifestyle === 'budget') sickChance += 0.05;
    if (state.lifestyle === 'lavish') sickChance -= 0.02;

    // Family Happiness Decay
    let famDecay = 5;
    if (state.lifestyle === 'budget') famDecay += 3;
    if (state.lifestyle === 'lavish') famDecay -= 2;
    state.familyHappiness = Math.max(0, state.familyHappiness - famDecay);

    if (state.immunityMonths > 0) {
        sickChance = 0;
        state.immunityMonths--;
    }

    // Roll Sickness for Partner
    if (state.partner.status !== 'single' && !state.partner.isSick && Math.random() < sickChance) {
        state.partner.isSick = true;
        gameAlert("Partner Sick 🤒", `Your partner ${state.partner.name} has fallen ill.`);
    }

    // Roll Sickness for Children
    state.family.children.forEach(c => {
        if (!c.isWithPlayer) return;
        if (!c.isInjured && Math.random() < sickChance) {
            c.isInjured = true;
            c.monthsInjured = 0;
            gameAlert("Child Sick 🤒", `${c.name} has fallen ill!`);
        }
        if (c.isInjured) {
            state.cash -= 200; // Medical cost for children
            gameAlert("Medical Cost", `You spent $200 on medicine and care for ${c.name}.`);
        }
    });

    // Roll Sickness for Pets
    if (state.pets.names && state.pets.names.length > 0) {
        let survivingPets = [];
        state.pets.names.forEach(p => {
            // Roll new sickness
            if (!p.isInjured && Math.random() < sickChance) {
                p.isInjured = true;
                p.monthsInjured = 0;
                gameAlert("Pet Sick 🐾", `${p.name} has fallen ill!`);
            }

            // Process Sick
            if (p.isInjured) {
                if (state.petInsurance) {
                    p.isInjured = false;
                    p.monthsInjured = 0;
                    survivingPets.push(p);
                } else {
                    p.monthsInjured = (p.monthsInjured || 0) + 1;
                    state.cash -= 450;
                    gameAlert("Vet Bill 🩺", `${p.name} is sick. Vet bill: $450. (Uninsured)`);

                    // Death Check
                    if (p.monthsInjured >= 3 && Math.random() < 0.3) {
                        state.happiness = Math.max(0, state.happiness - 40);
                        gameAlert("Pet Passed Away 🌈", `${p.name} couldn't recover without proper care. RIP.`);
                        state.pets.count--;
                    } else {
                        survivingPets.push(p);
                    }
                }
            } else {
                survivingPets.push(p); // Healthy
            }
        });
        state.pets.names = survivingPets;
    }

    if (state.partner.isSick) {
        state.partner.sicknessMonths = (state.partner.sicknessMonths || 0) + 1;

        // Forced medical bills for married partner
        if (state.partner.status === 'married') {
            const spousalCare = 300;
            state.cash -= spousalCare;
            gameAlert("Spousal Care 🤒", `Your spouse ${state.partner.name} is sick. You spent $${spousalCare} on their medical needs this month.`);
        }

        if (state.partner.sicknessMonths >= 2) {
            state.partner.isSick = false;
            state.partner.sicknessMonths = 0;
        }
    }

    // Job Market Fluctuation
    const marketChange = (Math.random() * 30) - 15; // ±15
    state.jobMarket = Math.max(0, Math.min(100, state.jobMarket + marketChange));

    // Job Hunting Logic
    if (state.unemployedMonths > 0) {
        state.unemployedMonths++;
        state.happiness = Math.max(0, state.happiness - 10); // Unemployment stress

        // Education boost: Career upgrade increases success rate
        const educationBoost = state.upgrades.course ? 0.2 : 0; // +20% offer chance

        // Generate job offers based on market + education
        let offerChance = 0;
        if (state.jobMarket > 70) offerChance = 0.8;
        else if (state.jobMarket > 30) offerChance = 0.5;
        else offerChance = 0.25;

        offerChance = Math.min(0.95, offerChance + educationBoost); // Cap at 95%

        if (Math.random() < offerChance) {
            generateJobOffers();
        } else {
            gameAlert("Job Search Update", `No offers this month (Month ${state.unemployedMonths} unemployed). Keep searching!`);
        }

        // Forced employment after 6 months
        if (state.unemployedMonths >= 6) {
            state.income = Math.floor(state.previousIncome * 0.6);
            state.jobHappinessMod = 0;
            state.unemployedMonths = 0;
            state.jobHunting = false;
            gameAlert("Forced Employment", `After 6 months, you had to take a low-paying job at $${state.income.toLocaleString()}/mo.`);
        }
    }

    // Happiness decay over time with lifestyle modifiers
    let decay = 8 + (state.difficulty * 2) + state.jobHappinessMod; // Easy: 10, Med: 12, Hard: 14 + job modifier

    // Lifestyle impact on happiness decay
    // Lifestyle impact on happiness decay
    // Lavish = Money buys happiness (slower decay)
    // Budget = Miserable but cheap (faster decay)
    if (state.lifestyle === 'budget') decay += 5; // Faster decay (Sad)
    else if (state.lifestyle === 'lavish') decay -= 5; // Slower decay (Happy)

    if (state.upgrades.mansion) decay -= 4;
    if (state.upgrades.mansion) decay -= 4;

    // Sickness Impact on Happiness
    if (state.healthStatus === 'Sick') decay += 10;
    if (state.partner.isSick) decay += 5;
    const sickChildren = state.family.children.filter(c => c.isInjured).length;
    decay += sickChildren * 3;

    state.happiness = Math.max(0, state.happiness - decay);

    // Work Performance Penalty
    if (state.healthStatus === 'Sick') {
        const penalty = Math.min(state.income, 200 + (state.income * 0.1));
        state.cash -= penalty;
        gameAlert("Sick at Work 🤒", `You were sick this month and performed poorly. Your pay was docked by $${Math.round(penalty)}.`);
    }

    // Negative net worth happiness cap: max 20% happiness when in debt
    const endStockAssets = state.sharesOwned * state.stockPrice;
    const endTotalDebt = state.loans.reduce((sum, l) => sum + l.amount, 0);
    const endNetWorth = (state.cash + state.savings + endStockAssets) - endTotalDebt;

    if (endNetWorth < 0 && state.happiness > 20) {
        state.happiness = 20;
        gameAlert("Bankruptcy Blues", "Your negative net worth is dragging you down. Happiness is capped at 20% until you're solvent!");
    }

    // Annual Tax System (every 12 months)
    if (state.month % 12 === 0) {
        const taxRoll = Math.random();
        if (taxRoll < 0.6) {
            // Tax deduction (60% chance)
            const deduction = Math.floor(state.income * (2 + Math.random() * 2)); // 2-4 months of income
            state.cash -= deduction;
            gameAlert("Tax Season 💸", `Annual tax deduction: -$${deduction.toLocaleString()}. The IRS thanks you for your contribution.`);
        } else {
            // Tax refund (40% chance)
            const refund = Math.floor(state.income * (0.5 + Math.random() * 0.5)); // 0.5-1 month of income
            state.cash += refund;
            gameAlert("Tax Refund 💰", `You received a tax refund of $${refund.toLocaleString()}! Nice surprise.`);
        }
    }

    // 3. Family & Pet Dynamics
    const hasKids = state.family.children.length > 0;
    const hasPets = state.pets.count > 0;

    // Age children
    state.family.children.forEach(c => {
        c.months = (c.months || 0) + 1;
        if (c.months >= 12) {
            c.age++;
            c.months = 0;
            gameAlert("Happy Birthday! 🎂", `${c.name} is now ${c.age} years old!`);
        }
    });

    if ((hasKids || hasPets) && Math.random() < 0.25) {
        let pool = [];

        // Interaction: Pet + Child
        if (hasKids && hasPets) {
            const child = state.family.children[Math.floor(Math.random() * state.family.children.length)];
            const pet = state.pets.names[Math.floor(Math.random() * state.pets.names.length)];
            pool.push({
                msg: `${child.name} was caught feeding their broccoli to ${pet.name}. They both look guilty but happy.`,
                happy: 5, childHappy: 10
            });
            pool.push({
                msg: `${child.name} and ${pet.name} are napping together in a sunbeam. It's a peaceful afternoon.`,
                happy: 15, childHappy: 15
            });
            if (child.age < 5) {
                pool.push({
                    msg: `${child.name} tried to ride ${pet.name} like a horse. ${pet.name} looked very patient while you stepped in to stop it.`,
                    happy: 5, childHappy: 5
                });
            }
        }

        // Interaction: Multi-child (Siblings)
        if (state.family.children.length > 1) {
            const kids = state.family.children;
            const k1 = kids[0];
            const k2 = kids[1];

            if (k1.age >= 13 || k2.age >= 13) {
                const teen = k1.age >= 13 ? k1 : k2;
                const younger = teen === k1 ? k2 : k1;
                pool.push({
                    msg: `${teen.name} is annoyed because ${younger.name} went into their room without asking. Sibling bickering ensues...`,
                    happy: -10, childHappy: -10, famHappy: -5
                });
                pool.push({
                    msg: `You caught ${teen.name} actually helping ${younger.name} with their homework. A rare moment of sibling solidarity!`,
                    happy: 20, childHappy: 15, famHappy: 10
                });
            } else {
                pool.push({
                    msg: `${k1.name} and ${k2.name} are fighting over the red crayon. You have four other red crayons.`,
                    happy: -5, childHappy: -5
                });
            }
        }

        // Interaction: Multi-pet
        if (state.pets.count > 1) {
            const p1 = state.pets.names[0];
            const p2 = state.pets.names[1];
            pool.push({
                msg: `${p1.name} and ${p2.name} are having a massive wrestling match in the living room. They knocked over a lamp!`,
                cost: 50, happy: 5
            });
            pool.push({
                msg: `You found ${p1.name} grooming ${p2.name}. They really are best friends.`,
                happy: 10
            });
        }

        if (pool.length > 0) {
            const event = pool[Math.floor(Math.random() * pool.length)];
            gameAlert("Family Moment ❤️", event.msg);
            if (event.happy) state.happiness = Math.max(0, Math.min(200, state.happiness + event.happy));
            if (event.cost) state.cash -= event.cost;
            // Update child happiness if applicable
            state.family.children.forEach(c => {
                if (event.msg.includes(c.name) && event.childHappy) {
                    c.happiness = Math.max(0, Math.min(100, c.happiness + event.childHappy));
                }
            });
        }
    }

    // 4. Random Events - Now guaranteed to at least roll every month
    triggerEvent();

    updateUI();
}

function updateBusinessUI() {
    if (!UI.businessList || !UI.businessManager) return;
    if (state.businesses.length === 0) {
        UI.businessManager.classList.add('hidden');
        return;
    }
    UI.businessManager.classList.remove('hidden');
    UI.businessList.innerHTML = state.businesses.map(biz => `
        <div class="sub-card" style="border-left: 4px solid #3b82f6;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700;">${biz.name}</div>
                <div style="font-size: 0.75rem;">Health: ${biz.health}%</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <div style="font-size: 0.8rem; color: #059669;">Profit: +$${Math.floor(biz.baseRev * (biz.health / 100))}</div>
                <button onclick="window.handleAction('maintain-biz', '${biz.id}')" class="shop-btn" style="padding: 0.2rem 0.5rem; font-size: 0.7rem;">Maintain ($${biz.maint})</button>
            </div>
        </div>
    `).join('');
}

function generateJobOffers() {
    // Determine number of offers based on market
    let numOffers = 1;
    if (state.jobMarket > 70) numOffers = Math.random() < 0.5 ? 3 : 2;
    else if (state.jobMarket > 30) numOffers = Math.random() < 0.5 ? 2 : 1;

    const offers = [];
    const jobTitles = {
        low: ["Junior Analyst", "Entry-Level Coordinator", "Assistant Manager", "Support Specialist"],
        mid: ["Project Manager", "Senior Analyst", "Operations Lead", "Account Manager"],
        high: ["Director of Operations", "VP of Strategy", "Senior Manager", "Executive Consultant"]
    };

    for (let i = 0; i < numOffers; i++) {
        // Determine salary tier based on market
        let tier = 'low';
        const roll = Math.random();

        if (state.jobMarket > 70) {
            // Hot market: 60% high, 30% mid, 10% low
            if (roll < 0.6) tier = 'high';
            else if (roll < 0.9) tier = 'mid';
        } else if (state.jobMarket > 30) {
            // Stable: 20% high, 50% mid, 30% low
            if (roll < 0.2) tier = 'high';
            else if (roll < 0.7) tier = 'mid';
        } else {
            // Cold: 10% high, 30% mid, 60% low
            if (roll < 0.1) tier = 'high';
            else if (roll < 0.4) tier = 'mid';
        }

        // Calculate salary
        let salaryMultiplier = 0;
        if (tier === 'high') salaryMultiplier = 1.2 + (Math.random() * 0.2); // 1.2-1.4x
        else if (tier === 'mid') salaryMultiplier = 0.9 + (Math.random() * 0.2); // 0.9-1.1x
        else salaryMultiplier = 0.7 + (Math.random() * 0.15); // 0.7-0.85x

        // Education boost: +15% salary for educated players
        if (state.upgrades.course) salaryMultiplier *= 1.15;

        const salary = Math.floor(state.previousIncome * salaryMultiplier);

        // Happiness modifier based on tier
        let happinessMod = 0;
        if (tier === 'high') happinessMod = -2; // Stressful
        else if (tier === 'low') happinessMod = 2; // Relaxed

        const title = jobTitles[tier][Math.floor(Math.random() * jobTitles[tier].length)];
        // Job Mode (Remote, Hybrid, Onsite)
        const modes = ['onsite', 'hybrid', 'remote'];
        const mode = modes[Math.floor(Math.random() * modes.length)];

        offers.push({ title, salary, happinessMod, tier, mode });
    }
    state.lastJobOffers = offers;

    // Display offers
    UI.jobOffersDesc.innerText = `You have ${numOffers} job offer${numOffers > 1 ? 's' : ''}! (Previous salary: $${state.previousIncome.toLocaleString()}/mo)`;
    UI.jobOffersList.innerHTML = offers.map((job, idx) => {
        const modText = job.happinessMod > 0 ? `+${job.happinessMod}%/mo` : job.happinessMod < 0 ? `${job.happinessMod}%/mo` : '±0%/mo';
        const modColor = job.happinessMod > 0 ? '#059669' : job.happinessMod < 0 ? '#dc2626' : '#6b7280';
        return `
            <button class="shop-btn" style="width: 100%; margin-bottom: 0.5rem; text-align: left; background: white; color: #1e293b; border-left: 4px solid #7c3aed;" onclick="window.handleAction('accept-job', ${idx})">
                <div style="font-weight: 700;">${job.title}</div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                    <span style="color: #059669;">$${job.salary.toLocaleString()}/mo</span>
                    <span style="color: ${modColor};">Happiness: ${modText}</span>
                </div>
                <div style="font-size: 0.7rem; color: #6366f1; margin-top: 2px;"><strong>${job.mode.toUpperCase()}</strong></div>
            </button>
        `;
    }).join('');
    UI.jobOffersModal.classList.remove('hidden');
    if (UI.modalOverlay) UI.modalOverlay.classList.add('active');
}

function triggerEvent() {
    const involvement = (state.partner.status !== 'single' ? 1 : 0) +
        state.family.children.length +
        (state.pets.count > 0 ? 1 : 0) +
        (state.businesses.length > 0 ? 1 : 0);

    // Base probability logic inside triggerEvent
    let eventChance = 0.2 * state.difficulty; // Easy: 0.2, Med: 0.4, Hard: 0.6
    if (state.happiness < 40) eventChance += 0.2;
    if (state.happiness < 20) eventChance += 0.4;

    // Roll for how many events (0 to 6)
    let numEvents = 0;
    if (Math.random() < eventChance) {
        const maxPossible = Math.min(6, 2 + involvement);
        numEvents = Math.floor(Math.random() * maxPossible) + 1;
    }

    // Sometimes 1 extra event just because life is messy
    if (involvement > 2 && Math.random() < 0.3) numEvents += 1;
    numEvents = Math.min(6, numEvents);

    if (numEvents === 0) return;

    // Build the Event Pool (outside the loop for uniqueness)
    const severity = 1 + ((state.difficulty - 1) * 0.5);
    let masterPool = [
        { title: "Flat Tire", desc: "Oh no! Your car needs a new tire. Cost: $150.", cost: Math.round(150 * severity) },
        { title: "Birthday Gift", desc: "A relative sent you $50! Happy Birthday.", cost: -50 },
        { title: "Streaming Hike", desc: "Your favorite sub went up. Monthly cost +$10 forever.", expenseAdd: Math.round(10 * severity) },
        { title: "Medical Bill", desc: "Unexpected dental work! You need to pay $800 immediately.", cost: Math.round(800 * severity) },
        { title: "Major Home Repair", desc: "A pipe burst! Total repair costs: $1,500.", cost: Math.round(1500 * severity) },
        { title: "Flu Season 🤒", desc: "You've caught the flu. You feel terrible and work is suffering.", extra: () => { state.healthStatus = 'Sick'; } },
        { title: "Old Inheritance", desc: "A distant relative left you a small sum. Gained $400.", cost: -400 },
        { title: "Game Winner", desc: "You guessed the right score in a local contest! Gained $540.", cost: -540 },
        { title: "Library Fine", desc: "You forgot to return books from 3 years ago. Cost: $30.", cost: 30 },
        { title: "Found Wallet", desc: "You found a wallet with $40. You tried to find the owner but failed.", cost: -40 },
        { title: "Coffee Habit", desc: "You spent way too much on artisanal coffee this month. Cost: $60.", cost: 60 },
        { title: "Parking Ticket", desc: "You parked in a 'no parking' zone for 5 minutes. Cost: $45.", cost: 45 },
        { title: "Subscribed!", desc: "You accidentally signed up for a service you don't need. Cost: $20.", cost: 20 },
        { title: "Gym Motivation", desc: "You actually went to the gym! Happiness +10.", happyBoost: 10 },
        { title: "Rainy Day", desc: "It rained all month. You stayed in and saved money. Gained $30.", cost: -30 },
        { title: "Gourmet Meal", desc: "You cooked a fancy meal at home. Happiness +5.", happyBoost: 5 },
        { title: "Lost Umbrella", desc: "It started pouring and you didn't have your umbrella. Cost: $25.", cost: 25 },
        { title: "Neighborhood Perk", desc: "The local bakery gave you free bread! Gained $10 in value.", cost: -10 },
        { title: "Yoga Session", desc: "You feel more flexible and calm. Happiness +8.", happyBoost: 8 },
        { title: "Book Sale", desc: "You found a rare book for cheap! Happiness +5.", happyBoost: 5 },
        { title: "Bird Watching", desc: "You saw a rare cardinal. It made your day. Happiness +3.", happyBoost: 3 },
        { title: "Drafty Window", desc: "Your heating bill was higher due to a draft. Cost: $40.", cost: 40 },
        { title: "Plant Growth", desc: "Your succulent finally grew a new leaf. Happiness +2.", happyBoost: 2 },
        { title: "Double Charge", desc: "A store charged you twice. Dealing with it was a headache. Cost: $50.", cost: 50 },
        { title: "Inflation Spike", desc: "Grocery prices soared! Your food budget increased by $50/mo.", extra: () => { state.inflation += 50; calculateExpenses(); } },
        { title: "Identity Theft", desc: "Someone used your credit card. Dealing with it cost you $300.", cost: 300 },
        { title: "Side Hustle Boom", desc: "You sold some old electronics. Gained $120.", cost: -120 },
        { title: "Utility Hike", desc: "Energy prices are up. Monthly rent/utilities +$30.", extra: () => { state.inflation += 30; calculateExpenses(); } },
        { title: "Freelance Gig", desc: "You did a one-off consulting gig. Income: +$400.", cost: -400 },
        { title: "Tax Audit", desc: "The tax man cometh. You owed back taxes of $600.", cost: 600 },
        { title: "Tech Breakdown", desc: "Your phone died. Replacement cost: $800.", cost: 800 },
        {
            title: "Outsourced! 📉",
            desc: "Your department was replaced by AI and overseas contractors. You've been fired.",
            extra: () => {
                if (state.income > 0) {
                    state.previousIncome = state.income;
                    state.income = 0;
                    state.unemployedMonths = 1;
                    state.jobHunting = true;
                    state.happiness = Math.max(0, state.happiness - 30);
                    state.firedCount++;
                    unlockAchievement('fired');
                }
            }
        }
    ];

    // Contextual Additions
    if (state.healthStatus === 'Sick' || (state.partner && state.partner.isSick)) {
        masterPool.push(
            { title: "Medicine Run 💊", desc: "Stocked up on cough syrup and vitamins. Cost: $40.", cost: 40 },
            { title: "Chicken Soup 🥣", desc: "Warm soup for the sick. It's expensive but comforting. Cost: $25.", cost: 25 }
        );
    }
    if (state.pets.count > 0) {
        masterPool.push(
            { title: "Flea Infestation! 🐜", desc: "Your pets brought in fleas. Treatment cost: $150.", cost: 150 },
            { title: "Destroyed Shoes 👟", desc: "A pet chewed up your favorite shoes. Cost: $80.", cost: 80 }
        );
    }
    if (state.partner.status === 'single') {
        masterPool.push({ title: "Family Pressure 👵", desc: "Mom wants to know when you'll settle down. Happiness -5.", happyBoost: -5 });
    } else if (state.family.children.length === 0) {
        masterPool.push({ title: "Grandchild Hints 👶", desc: "In-laws are hinting at grandchildren. Happiness -5.", happyBoost: -5 });
    }

    if (state.upgrades.car) {
        masterPool = masterPool.filter(e => e.title !== "Flat Tire");
        masterPool.push({ title: "Road Trip", desc: "A stress-free drive in your reliable car. Happiness +5!", cost: 50, happyBoost: 5 });
    }

    // Prepare Container
    UI.eventContainer.innerHTML = "";
    UI.eventContainer.classList.remove('hidden');
    if (UI.modalOverlay) UI.modalOverlay.classList.add('active');

    // Pick Unique Events
    for (let i = 0; i < numEvents; i++) {
        if (masterPool.length === 0) break;
        const idx = Math.floor(Math.random() * masterPool.length);
        const event = masterPool[idx];
        masterPool.splice(idx, 1); // Avoid duplicates

        // Render card
        const cardNode = document.createElement('div');
        cardNode.className = 'event-box';
        cardNode.innerHTML = `
            <h5 class="modal-origin">Life Update</h5>
            <h2>${event.title}</h2>
            <p>${event.desc}</p>
            <button class="action-btn primary" style="width: 100%; border:none;" onclick="this.parentElement.remove(); window.checkEmptyEvents();">Got it</button>
        `;
        UI.eventContainer.appendChild(cardNode);

        // Apply effects
        if (event.cost) state.cash -= event.cost;
        if (event.incomeMod) state.cash += event.incomeMod;
        if (event.happyBoost) state.happiness = Math.max(0, Math.min(100, state.happiness + event.happyBoost));
        if (event.expenseAdd) state.expenses.food += event.expenseAdd;
        if (event.extra) event.extra();
    }

    // Add "Got it (all)" if multiple
    if (numEvents > 1) {
        const allBtn = document.createElement('button');
        allBtn.className = 'action-btn';
        allBtn.style = "position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 10001; background: #1e293b; color: white; padding: 12px 24px; border-radius: 99px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); border: 2px solid #475569; font-weight: 700; cursor: pointer; pointer-events: auto;";
        allBtn.innerText = "Dismiss All Notifications";
        allBtn.onclick = () => closeModal();
        UI.eventContainer.appendChild(allBtn);
    }
}

// Life Experience Data
const DATE_SCENARIOS = {
    partnerPays: [
        "${name} points at the bill and says 'I got this'. They're feeling generous! (Free for you).",
        "It's their treat tonight! ${name} picked up the tab at that new sushi place. (Free for you).",
        "${name} surprisingly won a small bet earlier and decided to treat you to dinner. (Free for you).",
        "They insisted on paying because 'you've been working so hard lately'. (Free for you).",
        "${name} had a coupon they've been saving just for tonight. 'My treat!' they say."
    ],
    cheap: [
        "You grabbed street food ($20). Messy, but memorable!",
        "A quick trip to the local diner for some late-night pancakes ($20).",
        "Grabbed some tacos from a truck and ate them on a park bench ($20).",
        "Shared a large pizza from the place down the street ($20).",
        "You both shared a giant milkshake at an old-fashioned soda shop ($20).",
        "Walked to the corner store for some ice cream pints and ate them on the way back ($20)."
    ],
    standard: [
        "A nice dinner out at a local bistro ($100).",
        "Movie night with the full popcorn and soda experience ($100).",
        "Took a pottery class together. Your bowl looks like a lump ($100).",
        "Bowling night! ${name} got three strikes in a row ($100).",
        "Attended a local jazz club. Very atmospheric! ($100)",
        "Visited a board game cafe and spent hours in friendly competition ($100).",
        "Took a long walk through a museum's special exhibit ($100).",
        "Went to a late-night comedy show and laughed until your sides ached ($100)."
    ],
    expensive: [
        "You splurged on VIP tickets to a play ($250). Front row seats!",
        "A five-course tasting menu at that place with the long waitlist ($250).",
        "Sunset cruise around the bay with drinks and music ($250).",
        "Rented a private karaoke room and sang your hearts out for three hours ($250).",
        "Booked a private chef to cook a gourmet meal in your own kitchen ($250).",
        "Attended an exclusive masquerade ball. Very mysterious! ($250)",
        "Took a helicopter tour of the city at night. The views were breathtaking! ($250)."
    ]
};

const MARRIAGE_SCENARIOS = {
    joy: [
        "You and ${name} spent the morning gardening. The roses are finally blooming!",
        "${name} surprised you with your favorite breakfast in bed. A perfect start!",
        "You spent a quiet evening reading side-by-side in comfortable silence.",
        "A spontaneous dance party broke out in the kitchen while you were drying dishes.",
        "You finally organized that messy hall closet together. Teamwork!",
        "A long walk in the park turned into a deep talk about your dreams for the future.",
        "You shared a big bowl of popcorn and watched old movies until late.",
        "${name} left a tiny sweet note in your coat pocket for you to find.",
        "You spent the afternoon people-watching at a local cafe, making up silly backstories.",
        "A rainy day spent playing board games and laughing at each other's competitive streaks.",
        "You both tried a new, complicated recipe. It was a mess, but delicious!",
        "You spent an hour looking through old photo albums, reminiscing about the early days.",
        "${name} remembered a small detail from a conversation months ago and surprised you.",
        "You both sat on the porch watching the sunset with a cold drink.",
        "A surprise hug from behind while you were working made your day.",
        "You spent the evening planning a 'dream vacation' you hope to take someday.",
        "${name} told you a joke so bad it actually made you cry laughing.",
        "You both spent the morning at a local farmer's market, enjoying the vibes.",
        "A quiet moment of support during a stressful day meant the world to you.",
        "You found an old hobby you both enjoy and spent the afternoon pursuing it.",
        "You went window-shopping and laughed at the most ridiculous items you found.",
        "A spontaneous road trip to nowhere in particular led to a great new discovery.",
        "You both volunteered at a local animal shelter. Seeing ${name} with the pups was heart-melting.",
        "You spent a long time talking about everything and nothing at all.",
        "${name} defended you during a minor social awkwardness. Loyal as always.",
        "You both spent the evening stargazing from the backyard.",
        "A simple 'I'm proud of you' from ${name} gave you a huge boost.",
        "You spent the afternoon building a massive fort in the living room for no reason.",
        "You both attended a local trivia night and surprisingly won a small prize!",
        "A quiet evening of listening to your favorite records and just being together.",
        "You both spent the morning at a museum, pretending to be art critics.",
        "A spontaneous picnic in the backyard with some simple snacks.",
        "You and ${name} spent the evening learning a few words of a new language together.",
        "A funny misunderstanding led to a 10-minute laughing fit.",
        "You both spent the afternoon painting—it wasn't good, but it was fun!",
        "${name} brought home your favorite treat just because they were thinking of you.",
        "You spent a few hours playing video games together. ${name} actually won for once!",
        "A quiet walk through the neighborhood led to meeting some nice neighbors.",
        "You both spend the evening doing a massive jigsaw puzzle.",
        "A shared moment of triumph over a difficult household repair.",
        "You both spent the morning helping a neighbor, feeling like a real part of the community.",
        "A funny 'inside joke' made a boring situation hilarious.",
        "You both spent the afternoon at a local library, picking out books for each other.",
        "A sweet compliment from ${name} made you blush like a teenager.",
        "You both spend a long time just talking about your favorite childhood memories.",
        "A quiet evening of meditation or just breathing together.",
        "You both spent the morning brainstorming names for a potential future home.",
        "A shared interest in a new TV show led to a fun binge-watch session.",
        "You both spent the afternoon at a park, feeding the ducks and talking.",
        "A simple touch or holding hands while walking felt incredibly grounding.",
        "You both spent the evening listening to a podcast and discussing it.",
        "A funny face from ${name} when you were feeling down made you smile.",
        "You both spent the morning planning out your garden for the next season.",
        "A quiet moment of appreciation for how far you've both come.",
        "You both spent the afternoon at a local 'cat cafe'—pure bliss.",
        "A spontaneous compliment on your work ethic made you feel seen.",
        "You both spent the evening making a 'vision board' for your shared future.",
        "A funny story from ${name}'s childhood that you'd never heard before.",
        "You both spent the morning at a local charity walk, feeling energized.",
        "A simple 'thank you for everything' from ${name} meant so much.",
        "You both spent the afternoon at an arcade, playing all the retro games.",
        "A quiet moment of shared silence that wasn't awkward at all.",
        "You both spent the evening trying to learn a TikTok dance (and failing).",
        "A sweet 'I love you' out of nowhere truly brightened your day.",
        "You both spent the morning at a local plant nursery, picking out new greenery.",
        "A funny observation about a movie character led to a long debate.",
        "You both spent the afternoon at a local beach/lake, just soaking in the sun.",
        "A simple gesture of help with a chore you hate made you feel loved.",
        "You both spent the evening planning a surprise for a friend together.",
        "A long, meaningful hug that seemed to melt all your stress away."
    ],
    conflict: [
        "A heated debate about whose turn it was to do the laundry led to some tension.",
        "You and ${name} had a minor disagreement about a recent purchase.",
        "A misunderstanding about your weekend plans left you both feeling a bit off.",
        "${name} feels like you've been prioritising work over your time together.",
        "You had a tense conversation about the household budget.",
        "A disagreement on the 'correct' way to load the dishwasher caused some friction.",
        "You both felt a bit disconnected after a particularly busy and stressful week.",
        "A minor spat over a forgotten chore led to a quiet evening.",
        "You and ${name} had different ideas about how to spend the holiday.",
        "A misunderstanding about a text message led to some unnecessary drama.",
        "A tense debate about a political issue where you don't quite see eye-to-eye.",
        "You both felt a bit irritable after a long, tiring day, leading to a small argument.",
        "A disagreement on how to handle a family situation caused some temporary distance.",
        "You felt a bit ignored during a social gathering with ${name}'s friends.",
        "A minor conflict over the 'right' temperature for the thermostat."
    ],
    resolution: [
        "An argument about chores started, but ended with a hug and a new shared schedule.",
        "You disagreed on a purchase, but after talking it through, you feel even more aligned.",
        "A stressful morning was resolved with a sincere apology and a long, warm hug.",
        "A misunderstanding about plans was cleared up, leading to a much better evening.",
        "A tense talk about finances ended with a better plan and a sense of relief.",
        "You disagreed on parenting/family views, but found a beautiful middle ground.",
        "A small spat in the morning led to a sweet 'peace offering' note in the afternoon.",
        "A feeling of being disconnected was resolved by putting phones away and just talking.",
        "A different of opinion on a project was resolved with a creative compromise.",
        "A tense morning ended with ${name} bringing home your favorite dessert as an apology.",
        "You worked through a difficult emotional topic together and feel much stronger for it.",
        "A minor conflict led to a deep conversation that cleared up a long-standing issue.",
        "A stressful day was turned around when you both decided to just let the little things go.",
        "An argument about a misunderstanding ended with you both laughing at the absurdity of it.",
        "A feeling of distance was resolved with a spontaneous 'date night' in the living room."
    ]
};

function getRandomName(type) {
    const names = {
        child: ["Emma", "Liam", "Olivia", "Noah", "Ava", "Elijah", "Sophia", "Lucas", "Mia", "Mason", "Isabella", "Ethan", "Charlotte", "Logan", "Amelia", "Jackson", "Harper", "Aiden", "Evelyn", "James", "Oliver", "Benjamin", "Lucas", "Mason", "Ethan", "Alexander", "Henry", "Sebastian", "Jack", "Samuel", "Grace", "Chloe", "Daniel", "Leo", "Lily"],
        pet: ["Luna", "Cooper", "Milo", "Bella", "Daisy", "Charlie", "Max", "Lucy", "Buddy", "Rocky", "Duke", "Sadie", "Bear", "Sophie", "Zoe", "Bentley", "Harley", "Bailey", "Toby", "Gizmo", "Lola", "Rex", "Coco", "Buster", "Jasper", "Oscar", "Ruby", "Samson", "Simba", "Nala"]
    };
    const pool = names[type] || names.child;
    return pool[Math.floor(Math.random() * pool.length)];
}

// Achievement System
// Achievement functions...

function generateFamilyScenario() {
    const family = state.family.children;
    const partner = state.partner;
    const pets = state.pets.names;
    const hasKids = family.length > 0;
    const hasPartner = partner.status !== 'single' && partner.status !== 'divorced';
    const hasPets = pets.length > 0;
    const pName = partner.name || "your partner";

    let templates = [];

    // Solo (if nothing else applies, or rare chance)
    if (!hasKids && !hasPartner && !hasPets) {
        return "You sat alone in a park and watched the clouds. It was peaceful.";
    }

    // Context Detection
    const adultKids = family.filter(c => c.age >= 18);
    const youngKids = family.filter(c => c.age < 18);
    const stepKids = family.filter(c => hasPartner && c.parentName !== partner.name && c.parentName !== 'Single Adoption');
    const isStepParent = hasPartner && stepKids.length > 0;
    const manyPets = pets.length >= 5;

    if (hasPartner) {
        templates.push(
            `You and ${pName} tried a new recipe. It involved fire, but tasted okay.`,
            `${pName} challenged you to a dance-off in the living room. You lost.`,
            `Late night walk with ${pName}. The stars were actually visible for once.`,
            `You and ${pName} people-watched at the mall and made up backstories for strangers.`,
            `${pName} read a book aloud while you drove. A perfect road trip moment.`,
            `Reviewing old photos with ${pName}. You both laughed at your tragic haircuts.`,
            `${pName} surprised you with tickets to a local show. It was surprisingly good.`,
            `You both spent the evening planning a dream vacation you'll take one day.`
        );

        if (isSapphic()) {
            templates.push(
                `A cozy evening with ${pName} discussing your favorite queer authors.`,
                `You and ${pName} spent hours in a plant shop, adding to your jungle.`,
                `A spontaneous 'u-haul' joke made both you and ${pName} laugh.`,
                `Sharing a soft, domestic moment with ${pName} while the sun set.`,
                `You and ${pName} talked about your queer icons and their impact on your life.`
            );
        }

        if (isStepParent) {
            const sk = stepKids[Math.floor(Math.random() * stepKids.length)].name;
            templates.push(
                `${pName} spent the afternoon helping ${sk} with their homework. It's nice seeing them bond as a step-parent.`,
                `You, ${pName}, and ${sk} went to a movie. ${sk} is starting to really open up to ${pName}.`,
                `A small 'blended family' moment: ${pName} and ${sk} shared an inside joke that you didn't quite get.`,
                `${sk} asked ${pName} for advice on something. A real breakthrough for your step-family dynamic.`
            );
        }
    }

    if (hasKids) {
        const kidObj = family[Math.floor(Math.random() * family.length)];
        const kid = kidObj.name;
        const isAdult = kidObj.age >= 18;

        if (isAdult) {
            templates.push(
                `${kid}, now an adult, took YOU out for coffee today. How the tables have turned!`,
                `An adult conversation with ${kid} about their career goals. They've grown up so fast.`,
                `${kid} stopped by to visit and talked about their new apartment.`,
                `You and ${kid} shared a beer (or fancy soda) and reminisced about when they were tiny.`
            );
        } else {
            templates.push(
                `${kid} found a 'treasure' in the backyard. It was a rusty spoon.`,
                `You taught ${kid} how to skip stones at the lake.`,
                `${kid} asked 400 questions in 10 minutes. You answered 3 of them.`,
                `You built a blanket fort with ${kid}. It has structural integrity issues.`,
                `${kid} fell asleep on your shoulder during a movie.`,
                `${kid} drew a portrait of you. It focuses heavily on your nose.`,
                `Backyard camping with ${kid}. You lasted 2 hours before going inside for snacks.`,
                `${kid} tried to tell a knock-knock joke but forgot the punchline.`
            );
        }
    }

    if (hasPets) {
        const pet = pets[Math.floor(Math.random() * pets.length)].name;
        templates.push(
            `${pet} chased a laser pointer until they ran into a wall.`,
            `You took ${pet} to the park. Everyone wanted to pet them.`,
            `${pet} stole a sock and refused to give it back. Negotiating with terrorists.`,
            `${pet} fell asleep in a sunbeam. Most peaceful thing ever.`,
            `You had a serious conversation with ${pet} about economic policy.`,
            `${pet} decided 3 AM was the perfect time to sing the song of their people.`
        );

        if (manyPets) {
            templates.push(
                "You tried to sit on the couch, but it was occupied by 4 different pets. This is your life now.",
                "Pet chaos! A synchronized zoomies session broke out in the hallway.",
                "It took 30 minutes just to get everyone's dinner bowls filled. You're basically running a sanctuary.",
                "You woke up covered in fur and surrounded by snores. The 'pet pile' is getting out of hand."
            );
        }
    }

    if (hasPartner && hasKids) {
        const kid = family[Math.floor(Math.random() * family.length)].name;
        templates.push(
            `Family picnic! ${pName} forgot the forks, so you all ate salad with your hands.`,
            `${pName} and ${kid} teamed up against you in a water balloon fight.`,
            `Road trip! ${kid} asked 'Are we there yet?' before you left the driveway.`,
            `You all went to the zoo. ${kid} liked the pigeons better than the lions.`,
            `Family Board Game Night. ${pName} is winning and ${kid} is accusing them of cheating.`,
            `You, ${pName}, and ${kid} baked cookies. Flour is everywhere.`
        );
    }

    // Fallback
    if (templates.length === 0) return "You all dragged out a board game. It ended in a draw.";

    return templates[Math.floor(Math.random() * templates.length)];
}

function checkCompletionist() {
    // Check for "The Monopolist" Achievement
    const requiredUpgrades = ['course', 'car', 'bed', 'mansion', 'mba', 'remote'];
    const requiredBiz = ['gig', 'saas', 'retail', 'coffee', 'tech', 'realestate'];

    const hasAllUpgrades = requiredUpgrades.every(id => state.upgrades[id]);
    const hasAllBiz = requiredBiz.every(id => state.businesses.some(b => b.id === id));

    if (hasAllUpgrades && hasAllBiz) {
        unlockAchievement('tycoon');
    }
}

function unlockAchievement(id) {
    if (!state.unlockedAchievements) state.unlockedAchievements = [];
    if (state.unlockedAchievements.includes(id)) return;
    state.unlockedAchievements.push(id);
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) {
        // Log to console for debugging
        console.log("Achievement Unlocked:", id);
        gameAlert("ACHIEVEMENT UNLOCKED 🏆", `${ach.icon} ${ach.title}: ${ach.desc}`);
    }

    // Save to permanent meta-storage
    try {
        const meta = JSON.parse(localStorage.getItem('budgetGameMeta') || '{"achievements":[]}');
        if (!meta.achievements.includes(id)) {
            meta.achievements.push(id);
            localStorage.setItem('budgetGameMeta', JSON.stringify(meta));
        }
    } catch (e) {
        console.warn("Failed to save achievement meta:", e);
    }

    // We don't call updateAchievementsUI here anymore to prevent recursion
    // The next updateUI() call will handle the refresh.
}

function isQueer() {
    // Queer = Identity isn't cis (gender is Male or Female) OR sexuality isn't Straight.
    const isCis = state.gender === 'Male' || state.gender === 'Female';
    const isStraight = state.sexuality === 'Straight';
    return !isCis || !isStraight;
}

function isSapphic() {
    const femaleIdentities = ['Female', 'Trans MTF'];
    return femaleIdentities.includes(state.gender) && state.partner.pronouns === 'she/her';
}

function updateAchievementsUI() {
    try {
        checkCompletionist();
        // Find the achievements list element
        if (!UI.achievementsList) {
            UI.achievementsList = document.getElementById('achievements-list');
        }

        if (!UI.achievementsList) {
            console.warn('Achievements list element not found in DOM');
            return;
        }

        // Ensure state arrays exist
        if (!state.unlockedAchievements) state.unlockedAchievements = [];
        if (!state.loans) state.loans = [];
        if (!state.businesses) state.businesses = [];
        if (!state.family) state.family = { children: [] };
        if (!state.pets) state.pets = { count: 0, names: [] };

        // Dynamic Level Checks
        if (state.month <= 12 && state.savings >= 10000) unlockAchievement('penny-pincher');
        const netWorth = (state.cash + state.savings + (state.sharesOwned * (state.stockPrice || 0))) - state.loans.reduce((sum, l) => sum + (l.amount || 0), 0);
        if (netWorth >= 1000000) unlockAchievement('wolf');
        if (state.businesses.length >= 3) unlockAchievement('entrepreneur');
        if (state.family.children.length >= 3 && state.pets.count >= 2) unlockAchievement('happy-family');

        // Pet Counts
        if (state.totalPetsAdopted >= 1) unlockAchievement('first-pet');
        if (state.totalPetsAdopted > 10) unlockAchievement('pet-sanctuary');
        if (state.totalPetsAdopted > 50) unlockAchievement('noahs-ark');
        if (state.totalPetsAdopted >= 100) unlockAchievement('intervention');

        // Meta-Achievement Check
        const otherAchs = ACHIEVEMENTS.filter(a => a.id !== 'seanie-dew');
        if (otherAchs.length > 0) {
            const unlockedOtherCount = state.unlockedAchievements.filter(id => id !== 'seanie-dew').length;
            if (unlockedOtherCount === otherAchs.length) {
                unlockAchievement('seanie-dew');
            }
        }

        if (UI.achievementsList) {
            UI.achievementsList.innerHTML = ACHIEVEMENTS.map(ach => {
                const isUnlocked = state.unlockedAchievements.includes(ach.id);
                return `
                <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" style="opacity: ${isUnlocked ? '1' : '0.8'}; filter: grayscale(${isUnlocked ? '0' : '1'});">
                    <div class="achievement-icon">${ach.icon}</div>
                    <div class="achievement-title" style="font-size: 0.7rem; font-weight: 800;">${ach.title}</div>
                    <div class="achievement-desc" style="font-size: 0.6rem; color: var(--text-light); line-height: 1.1;">${ach.desc}</div>
                    ${isUnlocked ? '<div style="color: #22c55e; font-size: 0.6rem; font-weight: 900; margin-top: 4px; letter-spacing: 0.5px;">✓ UNLOCKED</div>' : '<div style="color: #94a3b8; font-size: 0.55rem; margin-top: 4px; font-weight: 600;">LOCKED</div>'}
                </div>
            `;
            }).join('');
        }
    } catch (e) {
        console.error("Achievements UI Failed:", e);
    }
}

const SAPPHIC_DATE_SCENARIOS = {
    partnerPays: [
        "${name} looks at you with a soft smile and slides the bill away. 'I got this, babe.' (Free for you).",
        "She insisted on paying for the thrift haul. 'Consider it an investment in our aesthetic.' (Free for you).",
        "She picked up the tab at the queer bookstore cafe. 'Your mind is worth it.' (Free for you).",
        "She surprised you by paying for the concert tickets. 'I just wanted to see you dance.' (Free for you)."
    ],
    cheap: [
        "You both spent hours browsing a thrift store and finding the perfect vintage flannels ($20).",
        "A quiet night in with herbal tea and a stack of poetry books ($20).",
        "Grabbed boba and walked through the botanical gardens ($20).",
        "Shared a plate of fries at a late-night diner while discussing your birth charts ($20).",
        "You both went to a local indie craft fair and bought matching handmade pins ($20)."
    ],
    standard: [
        "Attended a Tegan and Sara cover band set at a small queer bar ($100).",
        "A cozy evening at a cat cafe. She spent more time petting the cats than talking! ($100).",
        "You both took an introductory pottery class. Lots of Ghost jokes were made ($100).",
        "A scenic hike followed by a vegan picnic overlooking the valley ($100).",
        "Visited a modern art museum and spent the whole time making up sapphic subtext for every painting ($100)."
    ],
    expensive: [
        "Splurged on front-row seats for a traveling production of a queer play ($250).",
        "A private sunset wine tasting at a woman-owned vineyard ($250).",
        "Weekend spa day with matching robes and cucumber water ($250).",
        "A fancy five-course vegan tasting menu in a candlelit garden ($250).",
        "Rented a cabin for a 'cottagecore' weekend getaway. Pure bliss ($250)."
    ]
};

const SAPPHIC_MARRIAGE_SCENARIOS = {
    joy: [
        "You and ${name} spent the morning at a Pride parade, feeling deeply connected to your community.",
        "She surprised you with a bouquet of wild flowers and a handwritten note about your shared future.",
        "You spent the evening slow-dancing in the kitchen to your favorite queer anthems.",
        "She helped you pick out an outfit that makes you feel powerful and feminine.",
        "You both spent the afternoon volunteer-gardening at a local community center.",
        "A quiet morning sharing coffee and planning your dream 'forever home' together.",
        "She defended your relationship during a slightly awkward family gathering. Loyal as always.",
        "A spontaneous 'u-haul' joke made you both laugh until you couldn't breathe.",
        "You both spent the evening watching a documentary about queer history and feeling inspired.",
        "She braided your hair while you talked about your childhood memories."
    ],
    conflict: [
        "A minor disagreement about whose turn it was to water the dozen indoor plants.",
        "Tension arose after a long day of dealing with subtle microaggressions in public.",
        "A misunderstanding about 'space' and 'togetherness' led to a quiet evening.",
        "Disagreement on whether to host the next big queer dinner party at your place."
    ],
    resolution: [
        "You talked through your feelings for hours and ended up feeling closer than ever.",
        "A sincere apology and a shared face mask session cleared the air.",
        "You both agreed to set better boundaries with difficult relatives, feeling like a united front.",
        "A tense morning was resolved with a surprise delivery of her favorite pastries and a long hug."
    ]
};

// === Helper Functions ===

function hardRestart() {
    if (confirm("HARD RESTART: This will wipe ALL data, including achievements. Are you sure?")) {
        localStorage.clear();
        location.reload();
    }
}

function continuePlaying() {
    const modal = document.getElementById('victory-modal');
    if (modal) modal.classList.add('hidden');
    if (UI.modalOverlay) UI.modalOverlay.classList.remove('active');
}

function prestigeNewGame() {
    const ach = state.unlockedAchievements;
    localStorage.removeItem('budgetGameState');
    localStorage.setItem('budgetGameMeta', JSON.stringify({ achievements: ach }));
    location.reload();
}

function saveGame() {
    try {
        // Defensive: never save the timer interval id
        const saveState = { ...state };
        if (saveState.timerInterval) delete saveState.timerInterval;
        localStorage.setItem('budgetGameState', JSON.stringify(saveState));
    } catch (e) {
        console.warn("Auto-save failed:", e);
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('budgetGameState');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Deep merge saved state into current state to preserve new features
            Object.keys(parsed).forEach(key => {
                if (parsed[key] !== null && typeof parsed[key] === 'object' && !Array.isArray(parsed[key])) {
                    state[key] = { ...state[key], ...parsed[key] };
                } else {
                    state[key] = parsed[key];
                }
            });
            console.log("Game loaded successfully");
            return true;
        }
    } catch (e) {
        console.error("Failed to load game:", e);
    }
    return false;
}

window.resetLife = function () {
    if (confirm("RESET LIFE: Your current progress will be lost, but your achievements will stay. Continue?")) {
        localStorage.removeItem('budgetGameState');
        location.reload();
    }
};

// Meta Load (Run immediate)
(function () {
    const meta = localStorage.getItem('budgetGameMeta');
    if (meta && typeof state !== 'undefined') {
        try {
            const metaObj = JSON.parse(meta);
            if (metaObj.achievements) {
                if (!state.unlockedAchievements) state.unlockedAchievements = [];
                metaObj.achievements.forEach(a => {
                    if (!state.unlockedAchievements.includes(a)) state.unlockedAchievements.push(a);
                });
            }
        } catch (e) { }
    }
})();

