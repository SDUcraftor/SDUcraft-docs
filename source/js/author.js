var authorCss = `
/* 触发器通用样式 */
.author-trigger { cursor: pointer; transition: opacity 0.2s; }

/* 行内 @xxx */
.author-inline {
    color: #42b983;
    font-weight: bold;
    background: rgba(66, 185, 131, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
.author-inline:hover { background: rgba(66, 185, 131, 0.2); }

/* 左上角 author@xxx */
.author-float-container {
    position: absolute;
    top: -10px;
    left: 14px;
    z-index: 90;
}

#main > div:nth-child(1) > span {
    top: -10px;
    position: ;
}

.author-float-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    padding: 6px 12px;
    border: 1px solid #eee;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    font-size: 14px;
    color: #555;
    text-decoration: none;
}
.author-float-btn img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
}

/* --- 全局弹窗样式 --- */
#author-global-tooltip {
    position: fixed;
    display: none;
    z-index: 999999;
    background: #fff;
    width: 250px; /* 稍微加宽一点 */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    border: 1px solid #f0f0f0;
    text-align: center;
    pointer-events: auto; /* 允许交互 */
    left: 0;
    top: 0;
    font-family: var(--theme-font, sans-serif);
    transition: opacity 0.2s;
}

/* 箭头 */
#author-global-tooltip::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
}
#author-global-tooltip.tooltip-top { transform: translateX(-50%) translateY(-100%); margin-top: -12px; }
#author-global-tooltip.tooltip-top::after { bottom: -6px; top: auto; border-width: 6px 6px 0; border-color: #fff transparent transparent transparent; }

#author-global-tooltip.tooltip-bottom { transform: translateX(-50%) translateY(0); margin-top: 12px; }
#author-global-tooltip.tooltip-bottom::after { top: -6px; bottom: auto; border-width: 0 6px 6px 6px; border-color: transparent transparent #fff transparent; }

/* 内容区域 */
#author-global-tooltip img.tooltip-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-bottom: 10px;
    padding: 2px;
}
#author-global-tooltip h4 { margin: 0 0 5px 0; color: #333; font-size: 18px; font-weight: 600; }
#author-global-tooltip p.tooltip-bio { margin: 0 0 12px 0; color: #666; font-size: 13px; line-height: 1.5; }

/* 主页链接 */
#author-global-tooltip a.tooltip-link {
    display: block; /* 独占一行 */
    margin-bottom: 10px;
    font-size: 12px;
    color: #42b983;
    text-decoration: none;
}
#author-global-tooltip a.tooltip-link:hover { text-decoration: underline; }

.tooltip-contacts {
    border-top: 1px solid #eee;
    padding-top: 12px;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    gap: 15px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #666;
    text-decoration: none;
    cursor: pointer;
    background: #f9f9f9;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
}
.contact-item:hover {
    background: #42b983;
    color: white;
}
.contact-item svg { width: 14px; height: 14px; fill: currentColor; }

@keyframes copyFade { 0% { opacity: 1; } 100% { opacity: 0; } }
.copy-toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    animation: copyFade 1s forwards;
}

/* --- Dark Mode 适配 --- */
body.docsify-dark-mode .author-inline {
    background: rgba(66, 185, 131, 0.2);
    color: #42b983;
}

body.docsify-dark-mode .author-float-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #bbc0c4;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

body.docsify-dark-mode #author-global-tooltip {
    background: #2d2d2d;
    border-color: #444;
    box-shadow: 0 8px 30px rgba(0,0,0,0.6);
}

body.docsify-dark-mode #author-global-tooltip h4 {
    color: #eee;
}

body.docsify-dark-mode #author-global-tooltip p.tooltip-bio {
    color: #aaa;
}

body.docsify-dark-mode #author-global-tooltip a.tooltip-link {
    color: #42b983;
}

body.docsify-dark-mode #author-global-tooltip.tooltip-top::after {
    border-top-color: #2d2d2d;
}

body.docsify-dark-mode #author-global-tooltip.tooltip-bottom::after {
    border-bottom-color: #2d2d2d;
}

body.docsify-dark-mode .tooltip-contacts {
    border-top-color: #444;
}

/* 贡献徽章样式 (新增) */
.author-contribution-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin: 8px 0;
}
.author-contribution-badge {
    font-size: 11px;
    background-color: #e0f2f1;
    color: #00695c;
    padding: 2px 8px;
    border-radius: 10px;
    border: 1px solid #b2dfdb;
}
body.docsify-dark-mode .author-contribution-badge {
    background-color: #1e3a35;
    color: #80cbc4;
    border-color: #2d4f48;
}

/* 贡献列表样式 (新增，用于一行一行显示) */
.author-contribution-list {
    list-style: none;
    padding: 0;
    margin: 5px 0 15px 0;
    color: #666;
    font-size: 13px;
    line-height: 1.6;
    text-align: center;
}
.author-contribution-list li {
    margin-bottom: 4px;
}
body.docsify-dark-mode .author-contribution-list {
    color: #aaa;
}

body.docsify-dark-mode .contact-item {
    background: #3e3e3e;
    color: #ccc;
}

body.docsify-dark-mode .contact-item:hover {
    background: #42b983;
    color: white;
}

/* --- 嵌入式卡片容器 (新增，用于横向排列) --- */
.author-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    margin: 2em 0;
}

/* --- 嵌入式卡片样式 (新增) --- */
.author-card-embedded {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 25px;
    margin: 1.5em auto; /* 默认垂直居中，适合单独使用 */
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 350px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.author-card-embedded:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* 在容器内时的样式调整 */
.author-cards-container .author-card-embedded {
    margin: 0;
    height: 100%; /* 等高 */
    flex: 0 1 300px; /* 弹性宽度 */
}

.author-card-embedded img.card-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    padding: 2px;
    margin-bottom: 15px;
    object-fit: cover;
}

.author-card-embedded h4 { 
    margin: 0 0 5px 0 !important; 
    font-size: 1.3rem !important; 
    font-weight: 700 !important;
    color: #333; 
}

.author-card-embedded p.card-bio { 
    margin: 0 0 15px 0 !important; 
    color: #666; 
    font-size: 14px !important; 
    line-height: 1.6; 
}

.author-card-embedded a.card-link { 
    color: #42b983; 
    font-size: 14px; 
    text-decoration: none; 
    margin-bottom: 20px; 
    display: inline-block; 
    font-weight: 500;
}
.author-card-embedded a.card-link:hover { text-decoration: underline; }

.author-card-embedded .card-contacts { 
    display: flex; 
    gap: 12px; 
    justify-content: center; 
    flex-wrap: wrap;
}

.author-card-embedded .card-articles a:hover {
    color: #42b983;
}

/* 查看详情按钮 */
.author-card-embedded .card-detail-btn {
    margin-top: 15px;
    padding: 6px 12px;
    background: #42b983;
    color: white !important;
    border-radius: 20px;
    font-size: 13px;
    text-decoration: none;
    transition: background 0.3s;
    border: 1px solid transparent;
    cursor: pointer;
}
.author-card-embedded .card-detail-btn:hover {
    background: #33a06f;
    text-decoration: none !important;
}
body.docsify-dark-mode .author-card-embedded .card-detail-btn {
    background: #3e3e3e;
    border-color: #444;
    color: #eee !important;
}
body.docsify-dark-mode .author-card-embedded .card-detail-btn:hover {
    background: #42b983;
    color: white !important;
}

/* --- Tooltip 文章列表 (新增) --- */
.tooltip-articles {
    margin-top: 10px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #eee;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.tooltip-articles h5 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #333;
    font-weight: 600;
}

.tooltip-articles a {
    display: block;
    margin: 0 0 8px 0;
    color: #42b983;
    text-decoration: none;
    font-size: 13px;
    transition: color 0.3s;
}
.tooltip-articles a:hover {
    color: #33a06f;
}

/* --- Dark Mode 适配 --- */
body.docsify-dark-mode .author-card-embedded {
    background: #2d2d2d;
    border-color: #444;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.docsify-dark-mode .author-card-embedded h4 { color: #eee; }
.docsify-dark-mode .author-card-embedded p.card-bio { color: #aaa; }

/* Highlighting for Modal (Details Page) */
.author-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    display: none;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
}
.author-modal-overlay.open { opacity: 1; }

.author-modal-content {
    background: #fff;
    width: 90%;
    max-width: 600px;
    max-height: 85vh;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateY(20px);
    transition: transform 0.3s;
    position: relative;
    font-family: var(--theme-font, sans-serif);
}
.author-modal-overlay.open .author-modal-content { transform: translateY(0); }

.author-modal-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.author-modal-header h3 { margin: 0; font-size: 1.2rem; color: #333; font-weight: 600; }
.author-modal-close {
    background: none; border: none; font-size: 28px; color: #999; cursor: pointer;
    line-height: 1; padding: 0; width: 30px; height: 30px; display:flex; align-items:center; justify-content:center;
}
.author-modal-close:hover { color: #333; }

.author-modal-body {
    padding: 20px;
    overflow-y: auto;
}

.author-modal-loading {
    text-align: center; color: #888; padding: 20px;
}
.author-article-list { list-style: none; padding: 0; margin: 0; }
.author-article-list li { margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 8px; }
.author-article-list li:last-child { border-bottom: none; }
.author-article-list a { color: #42b983; text-decoration: none; font-weight: 500; font-size: 15px; display: block; }
.author-article-list a:hover { text-decoration: underline; }

/* Dark mode for Modal */
body.docsify-dark-mode .author-modal-content { background: #2d2d2d; color: #eee; }
body.docsify-dark-mode .author-modal-header { border-bottom-color: #444; }
body.docsify-dark-mode .author-modal-header h3 { color: #eee; }
body.docsify-dark-mode .author-article-list li { border-bottom-color: #444; }
`;

// 注入样式
var style = document.createElement('style');
style.textContent = authorCss;
document.head.appendChild(style);

// --- 3. 辅助功能 (SVG图标与复制逻辑) ---

const ICONS = {
    qq: `<svg viewBox="0 0 1024 1024"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" /></svg>`,
    email: `<svg viewBox="0 0 1024 1024"><path d="M128 224v576h768V224H128z m384 346.944L202.944 288h618.112L512 570.944zM192 736V356.544L512 645.696l320-289.152V736H192z"/></svg>`,
    github: `<svg viewBox="0 0 1024 1024"><path d="M512 12.672c-282.88 0-512 229.248-512 512 0 226.261 146.688 418.133 350.08 485.76 25.6 4.8 35.093-11.115 35.093-24.64 0-12.16-0.48-52.544-0.704-95.317-142.443 30.976-172.501-60.715-172.501-60.715-23.296-59.2-56.811-74.944-56.811-74.944-46.507-31.787 3.52-31.147 3.52-31.147 51.413 3.627 78.485 52.757 78.485 52.757 45.675 78.293 119.851 55.68 149.12 42.56 4.651-33.109 17.92-55.68 32.555-68.48-113.685-12.928-233.259-56.875-233.259-253.056 0-55.893 19.968-101.632 52.693-137.472-5.291-12.971-22.848-65.067 5.013-135.595 0 0 42.987-13.76 140.8 52.48 40.832-11.392 84.629-17.067 128.256-17.259 43.605 0.213 87.424 5.867 128.32 17.28 97.728-66.304 140.651-52.48 140.651-52.48 27.947 70.528 10.368 122.624 5.12 135.595 32.811 35.84 52.629 81.579 52.629 137.472 0 196.693-119.787 239.979-233.749 252.48 18.432 15.851 34.88 47.168 34.88 95.061 0 68.651-0.64 124.032-0.64 140.928 0 13.696 9.387 29.696 35.392 24.64 203.307-67.755 349.76-259.627 349.76-485.76 0-282.752-229.12-512-512-512z"/></svg>`
};

// 复制文本到剪贴板并提示
window.copyToClipboard = function(text, btnElement) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(btnElement, "已复制 QQ!");
        });
    } else {
        // 降级处理
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast(btnElement, "已复制 QQ!");
    }
};

function showToast(parent, msg) {
    // 避免重复创建
    if(parent.querySelector('.copy-toast')) return;

    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerText = msg;
    parent.style.position = 'relative'; // 确保定位准确
    parent.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1000);
}


/* --- Modal 逻辑 (新增) --- */
let authorArticleCache = null;

async function fetchAllArticles() {
    if (authorArticleCache) return authorArticleCache;

    try {
        const resp = await fetch('_sidebar.md');
        if (!resp.ok) return [];
        const text = await resp.text();

        // Match [Title](path.md)
        const regex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
        const matches = [...text.matchAll(regex)];

        // Limit concurrency if needed, but for small docs parallel is fine
        const tasks = matches.map(async m => {
            const title = m[1];
            const url = m[2];
            try {
                const cResp = await fetch(url);
                if (!cResp.ok) return null;
                const content = await cResp.text();
                // Docsify Hash URL construction
                const hashUrl = '#/' + url.replace(/^\//, '').replace(/\.md$/, '');
                return { title, url, content, hashUrl };
            } catch { return null; }
        });

        const results = await Promise.all(tasks);
        authorArticleCache = results.filter(r => r !== null);
        return authorArticleCache;
    } catch(e) {
        console.error("Error fetching articles", e);
        return [];
    }
}

window.openAuthorModal = async function(authorId) {
    const data = window.docsifyAuthorSource[authorId];
    if(!data) return;

    // Create Modal DOM if missing
    let modal = document.querySelector('.author-modal-overlay');
    if(!modal) {
        modal = document.createElement('div');
        modal.className = 'author-modal-overlay';
        modal.innerHTML = `
            <div class="author-modal-content">
                <div class="author-modal-header">
                    <h3>作者详情</h3>
                    <button class="author-modal-close" onclick="closeAuthorModal()">&times;</button>
                </div>
                <div class="author-modal-body" id="author-modal-content-area"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if(e.target === modal) closeAuthorModal();
        });
    }

    const contentArea = document.getElementById('author-modal-content-area');

    // 生成贡献内容 (Modal 中显示为列表)
    let contributionsHtml = '';
    if (data.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
        contributionsHtml = `<div style="margin-bottom:15px; text-align: center;">
            <strong style="display:block; margin-bottom: 5px; color:var(--theme-color, #42b983);">主要贡献</strong>
            <ul class="author-contribution-list" style="margin:0;">` +
            data.contributions.map(c => `<li>${c}</li>`).join('') +
            `</ul></div>`;
    }

    // Initial content
    contentArea.innerHTML = `
        <div style="text-align:center; padding-bottom: 20px;">
             <img src="${data.avatar}" style="width:80px;height:80px;border-radius:50%;margin-bottom:10px;object-fit:cover;padding:2px;border:1px solid #eee;" alt="${data.name}">
             <h2 style="margin:5px 0 10px 0; color:var(--theme-color, #42b983);">${data.name}</h2>
             ${contributionsHtml}
             <p style="color:#666; margin:0 0 15px 0; line-height:1.5;">${data.bio || '这位作者很懒，什么也没写。'}</p>
             <div style="display:flex; justify-content:center; gap:10px;">
                 ${data.qq ? `<span style="font-size:12px; background:#f5f5f5; padding:2px 8px; border-radius:4px;">QQ: ${data.qq}</span>` : ''}
                 ${data.github ? `<a href="${data.github}" target="_blank" style="font-size:12px; color:#42b983; text-decoration:none;">GitHub Page</a>` : ''}
             </div>
        </div>
        <div style="border-top:1px solid #eee; margin:10px -20px 20px -20px;"></div>
        <h4 style="margin:0 0 15px 0; color:var(--theme-color); font-weight:600;">参与贡献</h4>
        <div class="author-modal-loading">
            <div style="display:inline-block; width:20px; height:20px; border:3px solid rgba(66,185,131,0.3); border-radius:50%; border-top-color:#42b983; animation:spin 1s ease-in-out infinite;"></div>
            <span style="margin-left:10px; vertical-align:top;">正在搜索全站文章...</span>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        </div>
    `;

    modal.style.display = 'flex';
    modal.offsetHeight; // force reflow
    modal.classList.add('open');

    // Load articles
    setTimeout(async () => {
        const allArticles = await fetchAllArticles();
        const myArticles = allArticles.filter(a => new RegExp(`author@${authorId}\\b`).test(a.content));

        const listHtml = myArticles.length > 0
            ? `<ul class="author-article-list">
                 ${myArticles.map(a => `<li><a href="${a.hashUrl}" onclick="closeAuthorModal()">${a.title}</a></li>`).join('')}
               </ul>`
            : `<p style="text-align:center;color:#999;padding:20px;">暂无通过 'author@${authorId}' 标记的文章。</p>`;

        const loadingEl = contentArea.querySelector('.author-modal-loading');
        if(loadingEl) loadingEl.outerHTML = listHtml;
    }, 100); // slight delay for animation
}

window.closeAuthorModal = function() {
    const modal = document.querySelector('.author-modal-overlay');
    if(modal) {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}


// --- 4. 核心逻辑 ---

let authorTooltipTimer = null;

function initAuthorTooltip() {
    if (!document.getElementById('author-global-tooltip')) {
        const div = document.createElement('div');
        div.id = 'author-global-tooltip';
        div.onmouseenter = () => clearTimeout(authorTooltipTimer);
        div.onmouseleave = () => window.hideAuthorTooltip();
        document.body.appendChild(div);
    }
}

window.showAuthorTooltip = function(element, authorId) {
    const data = window.docsifyAuthorSource[authorId];
    if (!data) return;
    clearTimeout(authorTooltipTimer);

    const tooltip = document.getElementById('author-global-tooltip');

    // 生成联系方式 HTML
    let contactsHtml = '';
    let hasContacts = false;

    // QQ 按钮
    if (data.qq) {
        hasContacts = true;
        // onclick 触发复制
        contactsHtml += `
            <div class="contact-item" onclick="copyToClipboard('${data.qq}', this)" title="点击复制: ${data.qq}">
                ${ICONS.qq} <span>QQ</span>
            </div>
        `;
    }

    // Email 按钮
    if (data.email) {
        hasContacts = true;
        contactsHtml += `
            <a href="mailto:${data.email}" class="contact-item" title="${data.email}">
                ${ICONS.email} <span>Email</span>
            </a>
        `;
    }

    // GitHub 按钮
    if (data.github) {
        hasContacts = true;
        contactsHtml += `
            <a href="${data.github}" target="_blank" class="contact-item" title="GitHub">
                ${ICONS.github} <span>GitHub</span>
            </a>
        `;
    }

    // 贡献项生成逻辑
    let contributionsHtml = '';
    if (data.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
        contributionsHtml = `<div class="author-contribution-badges">` +
            data.contributions.map(c => `<span class="author-contribution-badge">${c}</span>`).join('') +
            `</div>`;
    }

    // 包装联系方式容器
    const contactsSection = hasContacts ? `<div class="tooltip-contacts">${contactsHtml}</div>` : '';

    // 填充内容
    tooltip.innerHTML = `
        <img src="${data.avatar}" class="tooltip-avatar" alt="${data.name}">
        <h4>${data.name}</h4>
        ${contributionsHtml}
        <p class="tooltip-bio">${data.bio}</p>
        ${data.link ? `<a href="${data.link}" target="_blank" class="tooltip-link">查看主页 →</a>` : ''}
        ${contactsSection}
    `;

    // 显示并定位
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';

    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const left = rect.left + (rect.width / 2);

    if (rect.top > tooltipHeight + 20) {
        tooltip.className = 'tooltip-top';
        tooltip.style.left = left + 'px';
        tooltip.style.top = rect.top + 'px';
    } else {
        tooltip.className = 'tooltip-bottom';
        tooltip.style.left = left + 'px';
        tooltip.style.top = rect.bottom + 'px';
    }
};

window.hideAuthorTooltip = function() {
    authorTooltipTimer = setTimeout(function() {
        const tooltip = document.getElementById('author-global-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if(tooltip.style.opacity === '0') tooltip.style.display = 'none';
            }, 200);
        }
    }, 200);
};


function authorPlugin(hook, vm) {
    let pageAuthorId = null;

    hook.init(() => initAuthorTooltip());

    // 辅助函数：生成联系方式 HTML
    const generateContactsHtml = (data) => {
        let contactsHtml = '';
        if (data.qq) {
            contactsHtml += `<div class="contact-item" onclick="copyToClipboard('${data.qq}', this)" title="点击复制: ${data.qq}">${ICONS.qq} <span>QQ</span></div>`;
        }
        if (data.email) {
            contactsHtml += `<a href="mailto:${data.email}" class="contact-item" title="${data.email}">${ICONS.email} <span>Email</span></a>`;
        }
        if (data.github) {
            contactsHtml += `<a href="${data.github}" target="_blank" class="contact-item" title="GitHub">${ICONS.github} <span>GitHub</span></a>`;
        }
        return contactsHtml;
    };

    // 辅助函数：生成贡献徽章 HTML (用于 Tooltip)
    const generateContributionsHtml = (data) => {
        if (data.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
            return `<div class="author-contribution-badges">` +
                data.contributions.map(c => `<span class="author-contribution-badge">${c}</span>`).join('') +
                `</div>`;
        }
        return '';
    };

    // 辅助函数：生成贡献列表 HTML (用于嵌入式卡片)
    const generateContributionsListHtml = (data) => {
        if (data.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
            return `<ul class="author-contribution-list">` +
                data.contributions.map(c => `<li>${c}</li>`).join('') +
                `</ul>`;
        }
        return '';
    };

    const createTrigger = (id, text, isFloat) => {
        const data = window.docsifyAuthorSource[id];
        if (!data) return isFloat ? '' : text;

        if (isFloat) {
            return `<div class="author-float-container"><div class="author-float-btn author-trigger" onmouseenter="showAuthorTooltip(this, '${id}')" onmouseleave="hideAuthorTooltip()"><img src="${data.avatar}" alt="${data.name}"> <span>文章作者: <strong>${data.name}</strong></span></div></div>`;
        } else {
            return `<span class="author-inline author-trigger" onmouseenter="showAuthorTooltip(this, '${id}')" onmouseleave="hideAuthorTooltip()">@${data.name}</span>`;
        }
    };

    hook.beforeEach(content => {
        // 1. Page Author Detection
        pageAuthorId = null;
        const regex = /^author@([a-zA-Z0-9_-]+)\s*/;
        const match = content.match(regex);
        if (match) {
            pageAuthorId = match[1];
            content = content.replace(regex, '');
        }

        // 2. Mask Code Blocks
        const codeBlocks = [];
        content = content.replace(/(`{3,})[\s\S]*?\1/gm, (match) => {
            codeBlocks.push(match);
            return `<!-- AUTHOR_CODE_BLOCK_${codeBlocks.length - 1} -->`;
        });

        // 3. Replace [author-card:...]
        content = content.replace(/\[author-card:([a-zA-Z0-9_-]+)\]/g, (match, id) => {
            const data = window.docsifyAuthorSource[id];
            if (!data) return `<p style="color:red;text-align:center;">Author '${id}' not found.</p>`;

            const contactsHtml = generateContactsHtml(data);
            // 使用列表形式而不是徽章
            const contributionsHtml = generateContributionsListHtml(data);

            return `<div class="author-card-embedded">
<img src="${data.avatar}" class="card-avatar" alt="${data.name}">
<h4>${data.name}</h4>
${contributionsHtml}
<p class="card-bio">${data.bio}</p>
${data.link ? `<a href="${data.link}" target="_blank" class="card-link">查看个人主页 &rarr;</a>` : ''}
<div class="card-contacts">${contactsHtml}</div>
<button class="card-detail-btn" onclick="openAuthorModal('${id}')">详细信息 </button>
</div>`;
        });

        // 4. Replace @... (Inline Mentions)
        content = content.replace(/@([a-zA-Z0-9_-]+)/g, (match, id) => {
            if (window.docsifyAuthorSource[id]) {
                return createTrigger(id, match, false);
            }
            return match;
        });

        // 5. Restore Code Blocks
        content = content.replace(/<!-- AUTHOR_CODE_BLOCK_(\d+) -->/gm, (match, id) => {
            return codeBlocks[parseInt(id)];
        });

        return content;
    });

    hook.afterEach(html => {
        if (pageAuthorId && window.docsifyAuthorSource[pageAuthorId]) {
            return createTrigger(pageAuthorId, null, true) + html;
        }
        return html;
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(authorPlugin, window.$docsify.plugins || []);