const notification = document.getElementById('notification');

        function showNotification() {
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

            setCookie(code, longUrl);
            copyToClipboard(code);
            showNotification();
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
            if (parts.length === 2) return parts.pop().split(';').shift();
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
            dummy.value = `${window.location.origin}/?code=${code}`;
            dummy.select();
            document.execCommand('copy');
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
            alert('Все ссылки удалены');
        }
        transport();