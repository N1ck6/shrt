body {
    margin: 0;
    min-height: 100vh;
    background: #F5E6D3;
    font-family: Arial, sans-serif;
    position: relative;
    user-select: none;
}

.input-container {
    position: relative;
    padding-top: 10%;
    width: 40vw;
    padding-left: 30%;
    display: flex;
    opacity: 0;
    animation: fadeIn 1.5s ease forwards;
    align-content: center;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

.url-input {
    width: 40vw;
    padding: 15px;
    border: 2px solid #5a381f;
    border-radius: 8px 0 0 8px;
    font-size: 16px;
}

.shorten-btn {
    background: #5a381f;
    border: none;
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 0 8px 8px 0;
    transition: background 0.3s;
}

.shorten-btn:hover {
    background: #5a381f;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(212, 176, 140, 0.9);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    display: none;
    text-align: center;
    animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

.delete {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 3%;
    cursor: pointer;
    transition: transform 0.3s;
}

.delete:hover {
    transform: scale(1.1);
}

.clear-text {
    color: #23160c;
    font-size: 18px;
    font-weight: bold;
    background: #FFE6E6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

svg {
    width: 100%;
    height: 100%;
}

.hidden { display: none; }

.codes-section {
    position: relative;
    width: 80%;
    margin: 5% auto 0;
    max-width: 1200px;
}

.codes-heading {
    color: #6B4F4F;
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 3%;
}

.codes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2%;
    width: 100%;
}

.code-item {
    background: #F5E6D3;
    border-radius: 8px;
    padding: 3% 4%;
    margin-bottom: 2%;
    transition: transform 0.2s;
    cursor: pointer;
    user-select: none;
}

.code-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    background-color: #e9dccd;
}

.code-title {
    font-weight: bold;
    color: #6B4F4F;
    margin-bottom: 2%;
}

.code-url {
    color: #4A3A3A;
    word-break: break-all;
    font-size: 0.9em;
}
