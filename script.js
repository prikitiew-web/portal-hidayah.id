let c = localStorage.getItem('tasbihCount') ? parseInt(localStorage.getItem('tasbihCount')) : 0;
const zk = ["SUBHANALLAH", "ALHAMDULILLAH", "ALLAHU AKBAR", "ASTAGHFIRULLAH"];
let currentSura = 1, currentAya = 1;

document.getElementById('counter').innerText = c;

function showResetModal() { document.getElementById('reset-modal').style.display = 'flex'; }
function confirmReset(choice) {
    if(choice) {
        c = 0; document.getElementById('counter').innerText = 0;
        localStorage.setItem('tasbihCount', 0);
    }
    document.getElementById('reset-modal').style.display = 'none';
}

function countT() {
    c++;
    document.getElementById('counter').innerText = c;
    localStorage.setItem('tasbihCount', c);
    document.getElementById('zikir-name').innerText = zk[Math.floor(c/33) % 4];
    if(navigator.vibrate) navigator.vibrate(40);
}

async function searchAyat(s, a) {
    const sIn = s || document.getElementById('suraNum').value;
    const aIn = a || document.getElementById('ayaNum').value;
    const res = document.getElementById('quran-res');
    const nav = document.getElementById('q-nav');
    if(!sIn || !aIn) return;
    currentSura = parseInt(sIn); currentAya = parseInt(aIn);
    res.innerHTML = "<p style='font-size:11px; opacity:0.5;'>Memuat...</p>";
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
    } catch (e) { res.innerHTML = "<p>Gagal memuat data.</p>"; }
}

function nextAyat() {
    searchAyat(currentSura, currentAya + 1);
    document.getElementById('ayaNum').value = currentAya + 1;
}

function toggleN(el) {
    const content = el.nextElementSibling;
    const isOpen = content.classList.toggle('open');
    el.querySelector('span').innerText = isOpen ? '-' : '+';
}

function update() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const f = (off, id, sid) => {
        const d = new Date(utc + (3600000 * off));
        document.getElementById(id).innerText = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
        document.getElementById(sid).innerText = String(d.getSeconds()).padStart(2,'0');
    };
    f(7, 'wib', 'swib'); f(8, 'wita', 'swita'); f(9, 'wit', 'swit');

    const evs = [{ n: "Idul Adha 1447H", d: "May 27, 2026" }, { n: "1 Muharram 1448H", d: "July 16, 2026" }];
    let h = "";
    evs.forEach(e => {
        const diff = new Date(e.d) - now;
        if(diff > 0) {
            const d = Math.floor(diff/(1000*60*60*24)), hr = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
            h += `<div class="cd-item" style="background:rgba(16,185,129,0.1); padding:15px; border-radius:15px; display:flex; justify-content:space-between; margin-bottom:10px;"><div style="font-size:12px; color:#10b981; font-weight:700;">${e.n}</div><div style="font-size:12px; color:#f59e0b; font-weight:bold;">${d}H ${hr}J</div></div>`;
        }
    });
    document.getElementById('cd-list').innerHTML = h;
}

setInterval(update, 1000);
update();
