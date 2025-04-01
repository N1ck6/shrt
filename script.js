function showNotification() {
    notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 2000);
}

function shorten() {
    const input = document.querySelector('.url-input');
    const url = input.value.trim();
    
    if (!url) return;
    
    const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i;
    if (!urlPattern.test(url)) {
        alert('Введите корректную ссылку');
        return;
    }

    cookie_link(url);
    input.value = '';
}

function cookie_link(longUrl) {
    const existingCode = getCookieByValue(longUrl);
    if (existingCode) {
        copyToClipboard(existingCode);
        showNotification();
        return;
    }

    let code;
    do {
        code = generateCode(5);
    } while (getCookie(code));

    setCookie(code, JSON.stringify({
    url: longUrl,
    timestamp: new Date().toISOString()
    }));
    copyToClipboard(code);
    showNotification();
    loadCodes();
}

function generateCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = decodeURIComponent(parts.pop().split(';').shift());
        const parsed = JSON.parse(cookieValue);
        return parsed.url;
    }
    return undefined;
}

function getCookieByValue(value) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, val] = cookie.trim().split('=');
        if (val === value) return name;
    }
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

function copyToClipboard(code) {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = `https://n1ck6.github.io/shrt/?code=${code}`;
    dummy.select();
    dummy.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(dummy.value);
    document.body.removeChild(dummy);
}

function transport() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) return;
    const url = getCookie(code);
    if (url) window.location.href = url;
}

function deleteCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const name = cookie.trim().split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    loadCodes();
}

function loadCodes() {
    const codesGrid = document.getElementById('codesGrid');
    codesGrid.innerHTML = '';
    
    const cookies = document.cookie.split(';')
      .map(cookie => cookie.trim())
      .filter(cookie => cookie)
      .map(cookie => {
        const [name, value] = cookie.split('=');
        try {
          return {
            code: name,
            ...JSON.parse(decodeURIComponent(value)),
            timestamp: new Date(JSON.parse(decodeURIComponent(value)).timestamp)
          };
        } catch {
          return null;
        }
      })
      .filter(item => item && item.url)
      .sort((a, b) => b.timestamp - a.timestamp);
  
    cookies.forEach(item => {
      const codeItem = document.createElement('div');
      codeItem.className = 'code-item';
      codeItem.setAttribute('onclick', `window.location.href='${item.url}'`);
      codeItem.innerHTML = `
        <div class="code-title">${item.code}</div>
        <div class="code-url">${item.url}</div>
      `;
      codesGrid.appendChild(codeItem);
    });
}
transport();
loadCodes();
