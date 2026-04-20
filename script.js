// ==========================
// GLOBAL STATE
// ==========================
const state = {
    theme: localStorage.getItem("theme") || "dark",
    metrics: {
        cpu: 45,
        memory: 30,
        network: 60,
        score: 98.5
    }
};

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMetrics();
    initTerminal();
    initSmoothScroll();
    initAnimations();
});

// ==========================
// THEME SYSTEM (Persistent)
// ==========================
function initTheme() {
    const toggle = document.querySelector(".theme-toggle");
    const icon = toggle.querySelector("i");

    document.body.dataset.theme = state.theme;
    updateThemeIcon(icon);

    toggle.addEventListener("click", () => {
        state.theme = state.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = state.theme;

        localStorage.setItem("theme", state.theme);
        updateThemeIcon(icon);
    });
}

function updateThemeIcon(icon) {
    icon.className =
        state.theme === "light" ? "fas fa-sun" : "fas fa-moon";
}

// ==========================
// METRICS ENGINE (Smoothed)
// ==========================
function initMetrics() {
    updateMetrics();
    setInterval(updateMetrics, 2000);
}

function smoothRandom(current, min, max, variance = 5) {
    const delta = (Math.random() - 0.5) * variance;
    return Math.min(max, Math.max(min, current + delta));
}

function updateMetrics() {
    const m = state.metrics;

    m.cpu = smoothRandom(m.cpu, 30, 90);
    m.memory = smoothRandom(m.memory, 20, 80);
    m.network = smoothRandom(m.network, 20, 100);
    m.score = smoothRandom(m.score, 90, 100, 1);

    updateUI(m);
}

function updateUI(m) {
    setValue("cpu", `${m.cpu.toFixed(1)}%`, m.cpu);
    setValue("memory", `${(m.memory / 10).toFixed(1)}/8GB`, m.memory);
    setValue("network", `${(m.network / 10).toFixed(2)} Mbps`, m.network);

    document.getElementById("score-val").textContent = m.score.toFixed(1);
    document.getElementById("score-circle")
        .style.strokeDasharray = `${m.score}, 100`;

    document.getElementById("uptime").textContent =
        `Uptime: ${(99.9 + Math.random() * 0.09).toFixed(2)}%`;
}

function setValue(type, text, percent) {
    document.getElementById(`${type}-val`).textContent = text;
    document.getElementById(`${type}-bar`).style.width = percent + "%";
}

// ==========================
// TERMINAL SYSTEM (Advanced)
// ==========================
function initTerminal() {
    const input = document.getElementById("terminal-cmd");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCommand(input);
    });
}

const commands = {
    status: () => `System stable. AI Score: ${state.metrics.score.toFixed(1)}`,
    scan: () => "Scanning neural nodes... ✓ No anomalies",
    optimize: () => "Optimization complete → +12% performance",
    clear: () => "CLEAR",
    help: () => Object.keys(commands).join(", "),
    time: () => new Date().toLocaleTimeString()
};

function handleCommand(input) {
    const output = document.getElementById("terminal-output");
    const cmd = input.value.trim().toLowerCase();

    if (!cmd) return;

    appendOutput(`> ${cmd}`);

    if (commands[cmd]) {
        const res = commands[cmd]();

        if (res === "CLEAR") {
            output.innerHTML = "";
        } else {
            appendOutput(res);
        }
    } else {
        appendOutput(`Unknown command: ${cmd}`);
    }

    input.value = "";
    scrollToBottom();
}

function appendOutput(text) {
    const output = document.getElementById("terminal-output");
    const div = document.createElement("div");
    div.textContent = text;
    output.appendChild(div);
}

function scrollToBottom() {
    const output = document.getElementById("terminal-output");
    output.scrollTop = output.scrollHeight;
}

// ==========================
// SMOOTH SCROLL (Optimized)
// ==========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

// ==========================
// INTERSECTION ANIMATIONS
// ==========================
function initAnimations() {
    const elements = document.querySelectorAll(
        ".metric-card, .project-card, .section-title"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
    });
}