document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetPage = link.getAttribute('data-target');
            showPage(targetPage);
        });
    });

    // 处理直接访问带有锚点的URL
    if (window.location.hash) {
        const targetPage = window.location.hash.substring(1);
        const targetLink = document.querySelector(`[data-target="${targetPage}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }

    // 主题切换逻辑
    const toggleSwitches = document.querySelectorAll('.theme-checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitches.forEach(checkbox => checkbox.checked = true);
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleSwitches.forEach(checkbox => checkbox.checked = true);
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            toggleSwitches.forEach(checkbox => checkbox.checked = false);
        }    
    }

    toggleSwitches.forEach(toggleSwitch => {
        toggleSwitch.addEventListener('change', switchTheme, false);
    });

    // 添加代码复制功能
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', (e) => {
        const copyBtn = e.trigger;
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制！';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
        e.clearSelection();
    });

    clipboard.on('error', (e) => {
        console.error('复制失败:', e.action);
    });
});