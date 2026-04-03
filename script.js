let c = localStorage.getItem('tasbihCount') ? parseInt(localStorage.getItem('tasbihCount')) : 0;
const zk = ["SUBHANALLAH", "ALHAMDULILLAH", "ALLAHU AKBAR", "ASTAGHFIRULLAH"];
let currentSura = 1, currentAya = 1;

document.getElementById('counter').innerText = c;

// BACKGROUND LOGIC
function updateTheme() {
    const hour = new Date().getHours();
    const body = document.getElementById('dynamic-bg');
    body.className = ''; 

    if (hour >= 4 && hour < 6) body.classList.add('bg-subuh');
    else if (hour >= 6 && hour < 11) body.classList.add('bg-pagi');
    else if (hour >= 11 && hour < 15) body.classList.add('bg-siang');
    else if (hour >= 15 && hour < 18) body.classList.add('bg-sore');
    else body.classList.add('bg-malam');
}

// RESET MODAL LOGIC
function showResetModal() { document.getElementById('reset-modal').style.display = 'flex'; }
function confirmReset(choice) {
    if(choice) {
        c = 0;
        document.getElementById('counter').innerText = 0;
        localStorage.setItem('tasbihCount', 0);
    }
    document.getElementById('reset-modal').style.display = 'none';
}

function countT() {
    c++;
    document.getElementById('counter').innerText = c;
    localStorage.setItem('tasbihCount', c);
    document.getElementById('zikir-name').innerText = zk[Math.floor(c/33) % 4];
    if(navigator.vibrate) navigator.vibrate(45);
}

async function searchAyat(s, a) {
    const sIn = s || document.getElementById('suraNum').value;
    const aIn = a || document.getElementById('ayaNum').value;
    const res = document.getElementById('quran-res');
    const nav = document.getElementById('q-nav');
    
    if(!sIn || !aIn) return;
    currentSura = parseInt(sIn); currentAya = parseInt(aIn);
    res.innerHTML = "<p class='q-hint'>Mencari...</p>";
    
    try {
        const [indo, arab] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/ayah/${currentSura}:${currentAya}/id.indonesian`),
            fetch(`https://api.alquran.cloud/v1/ayah/${currentSura}:${currentAya}`)
        ]);
        const dI = await indo.json(), dA = await arab.json();
        if(dI.code === 200) {
            res.innerHTML = `<p class="q-arab">${dA.data.text}</p><p class="q-text"><b>${currentSura}:${currentAya}</b> - ${dI.data.text}</p>`;
            nav.style.display = "block";
        }
    } catch (e) { res.innerHTML = "<p>Gagal memuat.</p>"; }
}

function nextAyat() {
    searchAyat(currentSura, currentAya + 1);
    document.getElementById('ayaNum').value = currentAya + 1;
}

function updateTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const f = (off, id, sid) => {
        const d = new Date(utc + (3600000 * off));
        document.getElementById(id).innerText = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
        document.getElementById(sid).innerText = String(d.getSeconds()).padStart(2,'0');
    };
    f(7, 'wib', 'swib'); f(8, 'wita', 'swita'); f(9, 'wit', 'swit');
}

setInterval(() => { updateTime(); updateTheme(); }, 1000);
updateTime(); updateTheme();
