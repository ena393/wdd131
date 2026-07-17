const galleryItems = [
    {
        id: "highlight",
        title: "Sliding Highlight Text",
        category: "text",
        description: "A background highlight bar slides behind the text on hover.",
        canvasClass: "effect-highlight-wrapper",
        htmlSnippet: `<span class="effect-highlight">Hover to highlight</span>`,
        cssSnippet: `.effect-highlight-wrapper { display:flex; align-items:center; justify-content:center; }
.effect-highlight { position: relative; padding: 0.3rem 0.6rem; color: var(--text-color); z-index:1; }
.effect-highlight::before { content:""; position:absolute; inset:0; background:var(--accent2-color); transform:scaleX(0); transform-origin:left; transition:0.3s; z-index:-1; }
.effect-highlight:hover::before { transform:scaleX(1); }`
    },
    {
        id: "split",
        title: "Split Reveal Text",
        category: "text",
        description: "Text reveals in a smooth upward motion.",
        canvasClass: "effect-split",
        htmlSnippet: `<div class="effect-split"><span>Split reveal text</span></div>`,
        cssSnippet: `.effect-split { overflow:hidden; font-size:1.2rem; color: var(--text-color); }
.effect-split span { display:block; transform:translateY(100%); transition:0.4s; }
.effect-split:hover span { transform:translateY(0); }`
    },
    {
        id: "magnetic",
        title: "Magnetic Button",
        category: "hover",
        description: "Button subtly follows the cursor within its area.",
        canvasClass: "effect-magnetic",
        htmlSnippet: `<button class="effect-magnetic">Magnetic button</button>`,
        cssSnippet: `.effect-magnetic { padding:0.6rem 1rem; border:1px solid var(--border-color); background:var(--card-bg); transition:transform 0.08s; border-radius:4px; color: var(--text-color); }`
    },
    {
        id: "sweep",
        title: "Border Sweep Card",
        category: "hover",
        description: "A border animates around the card on hover.",
        canvasClass: "effect-sweep",
        htmlSnippet: `<div class="effect-sweep"><div class="sweep-inner">Hover to see border sweep</div></div>`,
        cssSnippet: `.effect-sweep { color: var(--text-color); }
.sweep-inner { position:relative; padding:0.75rem; }
.sweep-inner::after { content:""; position:absolute; inset:0; border:2px solid var(--border-color); transform:scaleX(0); transform-origin:left; transition:0.3s; }
.sweep-inner:hover::after { transform:scaleX(1); }`
    },
    {
        id: "zoom",
        title: "Image Zoom + Pan",
        category: "image",
        description: "Image zooms and pans based on cursor position.",
        canvasClass: "effect-zoom",
        htmlSnippet: `<div class="effect-zoom"><img src="images/zoom.jpg" alt="Zoom Example"></div>`,
        cssSnippet: `.effect-zoom { width:100%; height:100%; overflow:hidden; }
.effect-zoom img { width:100%; height:100%; object-fit:cover; transition:transform 0.2s; }`
    },
    {
        id: "duotone",
        title: "Duotone Filter",
        category: "image",
        description: "Image shifts from duotone to full color on hover.",
        canvasClass: "effect-duotone",
        htmlSnippet: `<div class="effect-duotone"><img src="images/duotone.jpg" alt="Duotone Example"></div>`,
        cssSnippet: `.effect-duotone { width:100%; height:100%; overflow:hidden; }
.effect-duotone img { width:100%; height:100%; object-fit:cover; filter:grayscale(1) contrast(1.2); transition:filter 0.3s; }
.effect-duotone:hover img { filter:grayscale(0) contrast(1); }`
    },
    {
        id: "divider",
        title: "Glass Divider",
        category: "layout",
        description: "A subtle divider between two pieces of text.",
        canvasClass: "effect-divider",
        htmlSnippet: `<div class="effect-divider">
    <div class="effect-divider-text">Section above</div>
    <div class="effect-divider-line"></div>
    <div class="effect-divider-text">Section below</div>
</div>`,
        cssSnippet: `.effect-divider { width:100%; }
.effect-divider-line { width:100%; border-top:2px solid var(--border-color); opacity:0.4; margin:0.5rem 0; }
.effect-divider-text { font-size:0.85rem; text-align:center; }`
    },
    {
        id: "grid",
        title: "Auto-Fit Grid",
        category: "layout",
        description: "Grid cells auto-fit based on available width.",
        canvasClass: "effect-grid",
        htmlSnippet: `<div class="effect-grid">
    <div></div><div></div><div></div><div></div><div></div><div></div>
</div>`,
        cssSnippet: `.effect-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(40px, 1fr)); gap:4px; width:100%; height:100%; }
.effect-grid div { height:40px; background:var(--border-color); }`
    },
    {
        id: "clamp",
        title: "Line Clamp",
        category: "layout",
        description: "Clamp long text to three lines with ellipsis.",
        canvasClass: "effect-clamp-wrapper",
        htmlSnippet: `<div class="effect-clamp-wrapper">
    <div class="effect-clamp-title">Clamped text example</div>
    <p class="effect-clamp">
        This is a long paragraph that demonstrates line clamping. It will be truncated after three lines,
        showing how you can keep layouts tidy without overflowing content. Add more text here to see the
        effect in action across multiple lines.
    </p>
</div>`,
        cssSnippet: `.effect-clamp-wrapper { width:100%; }
.effect-clamp-title { font-weight:bold; margin-bottom:0.3rem; }
.effect-clamp {
    display:-webkit-box;
    -webkit-box-orient:vertical;
    overflow:hidden;
    line-clamp:3;
    -webkit-line-clamp:3;
    font-size:0.9rem;
}`
    }
];

const galleryEl = document.getElementById("gallery");
const themeToggleEl = document.getElementById("theme-toggle");
const modalOverlayEl = document.getElementById("modal-overlay");
const modalCloseEl = document.getElementById("modal-close");
const modalTitleEl = document.getElementById("modal-title");
const modalCategoryEl = document.querySelector(".modal-category");
const modalDescriptionEl = document.querySelector(".modal-description");
const modalArtCanvasEl = document.getElementById("modal-art-canvas");
const htmlSnippetEl = document.getElementById("html-snippet");
const cssSnippetEl = document.getElementById("css-snippet");
const toastEl = document.getElementById("toast");

let activeFilter = "all";
let activeItem = null;

(function initTheme() {
    const stored = localStorage.getItem("effect-theme");
    const initial = stored === "dark" ? "dark" : "light";
    setTheme(initial);
})();

function setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("effect-theme", theme);
    const icon = theme === "dark" ? "🌑" : "☀️";
    const label = theme === "dark" ? "Dark" : "Light";
    themeToggleEl.querySelector(".theme-icon").textContent = icon;
    themeToggleEl.querySelector(".theme-label").textContent = label;
}

themeToggleEl.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "light";
    setTheme(current === "light" ? "dark" : "light");
});

function renderGallery() {
    galleryEl.innerHTML = "";

    galleryItems.forEach(item => {
        if (activeFilter !== "all" && item.category !== activeFilter) return;

        const card = document.createElement("article");
        card.className = "art-card";
        card.dataset.id = item.id;

        const canvas = document.createElement("div");
        canvas.className = `art-canvas ${item.canvasClass}`;
        canvas.innerHTML = item.htmlSnippet;

        const title = document.createElement("h2");
        title.textContent = item.title;

        card.appendChild(canvas);
        card.appendChild(title);

        card.addEventListener("click", () => openModal(item));

        galleryEl.appendChild(card);
    });

    attachInteractiveEffects(galleryEl);
}

document.querySelectorAll(".filter-button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeFilter = btn.dataset.filter || "all";
        renderGallery();
    });
});

function openModal(item) {
    activeItem = item;

    modalTitleEl.textContent = item.title;
    modalCategoryEl.textContent = item.category;
    modalDescriptionEl.textContent = item.description;

    modalArtCanvasEl.className = `modal-art-canvas ${item.canvasClass}`;
    modalArtCanvasEl.innerHTML = item.htmlSnippet;

    htmlSnippetEl.textContent = item.htmlSnippet;
    cssSnippetEl.textContent = item.cssSnippet;

    modalOverlayEl.classList.add("is-open");
    modalOverlayEl.setAttribute("aria-hidden", "false");

    attachInteractiveEffects(modalArtCanvasEl);
}

function closeModal() {
    activeItem = null;
    modalOverlayEl.classList.remove("is-open");
    modalOverlayEl.setAttribute("aria-hidden", "true");
}

modalCloseEl.addEventListener("click", closeModal);

modalOverlayEl.addEventListener("click", (event) => {
    if (event.target === modalOverlayEl) closeModal();
});

function attachInteractiveEffects(root) {
    root.querySelectorAll(".effect-magnetic").forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 0.08;
            btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0, 0)";
        });
    });

    root.querySelectorAll(".effect-zoom").forEach(container => {
        const img = container.querySelector("img");
        if (!img) return;

        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const zoom = 1.2;
            const move = 20;
            img.style.transform = `scale(${zoom}) translate(${x * move}px, ${y * move}px)`;
        });

        container.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1) translate(0, 0)";
        });
    });
}

document.querySelectorAll(".copy-button").forEach(btn => {
    btn.addEventListener("click", () => {
        if (!activeItem) return;
        const target = btn.dataset.target;
        const text = target === "html" ? activeItem.htmlSnippet : activeItem.cssSnippet;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => showToast(`${target.toUpperCase()} copied`));
        } else {
            showToast("Clipboard API unavailable");
        }
    });
});

let toastTimeout = null;

function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toastEl.classList.remove("is-visible");
    }, 1500);
}

renderGallery();
