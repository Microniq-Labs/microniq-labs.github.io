const collapsedSymbol = "▸";
const expandedSymbol = "▾";

fetch('../navbar-inside.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
    });

fetch('../sidebar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('sidebar-container').innerHTML = html;

        // Collapse/expand group titles
        document.querySelectorAll('.list-group-title').forEach(title => {
            title.addEventListener('click', () => {
                const targetId = title.getAttribute('data-toggle-id');
                const target = document.getElementById(targetId);
                if (target) {
                    target.style.display = (target.style.display === 'none') ? 'block' : 'none';
                }
            });
        });

        // Toggle sublists
        document.querySelectorAll('[data-toggle-sub]').forEach(btn => {
            btn.addEventListener('click', () => {
                const subId = btn.getAttribute('data-toggle-sub');
                const sub = document.getElementById(subId);
                if (!sub) return;

                const isVisible = sub.style.display === 'block';
                sub.style.display = isVisible ? 'none' : 'block';

                const labelText = btn.textContent.replace(collapsedSymbol, '').replace(expandedSymbol, '').trim();
                btn.innerHTML = labelText + ' ' + (isVisible ? collapsedSymbol : expandedSymbol);
            });
        });

        // Active state
        document.querySelectorAll('.list-group-item-action').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.list-group-item-action').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // ✅ Now safe to apply initial active path
        setInitialByIdPath(initChapter);


        //Configure button href
        document.getElementById('overview-mikrokontroler').addEventListener('click', () => {
            url = homepage_url + '/docs/overview/mikrokontroler.html';
            window.location.href = url;
        });
        document.getElementById('overview-arduino').addEventListener('click', () => {
            url = homepage_url + '/docs/overview/arduino.html';
            window.location.href = url;
        });        document.getElementById('overview-stm32').addEventListener('click', () => {
            url = homepage_url + '/docs/overview/stm32.html';
            window.location.href = url;
        });
    });

// This stays outside to be reusable
function setInitialByIdPath(path) {
    const ids = path.split(">").map(p => p.trim());
    console.log(ids);
    ids.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (el.classList.contains('list-group') || el.classList.contains('sub-list-group')) {
            el.style.display = 'block';
        }

        if (index === ids.length - 1 && el.classList.contains('list-group-item-action')) {
            el.classList.add('active');
        }

        if (el.classList.contains('sub-list-group')) {
            const toggleBtn = document.querySelector(`[data-toggle-sub="${id}"]`);
            if (toggleBtn) {
                const labelText = toggleBtn.textContent.replace(collapsedSymbol, '').replace(expandedSymbol, '').trim();
                toggleBtn.innerHTML = labelText + ' ' + expandedSymbol;
            }
        }
    });
}

