let c = localStorage.getItem('tasbihCount') ? parseInt(localStorage.getItem('tasbihCount')) : 0;
const zk = ["SUBHANALLAH", "ALHAMDULILLAH", "ALLAHU AKBAR", "ASTAGHFIRULLAH"];

// Hari Besar (Fix Logic)
const evs = [
    { n: "Idul Adha 1447H", d: "May 27, 2026" },
    { n: "Tahun Baru Islam 1448H", d: "July 16, 2026" },
    { n: "Maulid Nabi SAW", d: "September 24, 2026" },
    { n: "Isra Mi'raj 1448H", d: "February 5, 2027" }
];

document.getElementById('counter').innerText = c;

function toggleN(el) {
    const content = el.nextElementSibling;
    const isOpen = content.classList.toggle('open');
    el.querySelector('span').innerText = isOpen ? '-' : '+';
}

function countT() {
    c++;
    document.getElementById('counter').innerText = c;
    localStorage.setItem('tasbihCount', c);
    document.getElementById('zikir-name').innerText = zk[Math.floor(c/33) % 4];
    
    // Vibrasi iPhone Style (2x Getar pas 33)
    if(c % 33 === 0) {
        if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
    } else {
        if(navigator.vibrate) navigator.vibrate(40);
    }
}

function resT() { 
    if(confirm('Reset Zikir?')) { 
        c = 0; 
        document.getElementById('counter').innerText = 0; 
        localStorage.setItem('tasbihCount', 0);
    } 
}

// Fitur Cari Ayat (API Quran)
async function searchAyat() {
    const s = document.getElementById('suraNum').value;
    const a = document.getElementById('ayaNum').value;
    const resDiv = document.getElementById('quran-res');
    
    if(!s || !a) return alert("Isi Nomor Surat & Ayat!");
    
    resDiv.innerHTML = "<p class='q-hint'>Mencari...</p>";
    
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/ayah/${s}:${a}/id.indonesian`);
        const data = await response.json();
        
        if(data.code === 200) {
            const arab = data.data.text;
            const text = data.data.edition.name.includes("Indonesian") ? data.data.text : "";
            
            // Fetch Arab version separately if needed
            const arabRes = await fetch(`https://api.alquran.cloud/v1/ayah/${s}:${a}`);
            const arabData = await arabRes.json();
            
            resDiv.innerHTML = `
                <p class="q-arab">${arabData.data.text}</p>
                <p class="q-text">${data.data.text}</p>
            `;
        } else {
            resDiv.innerHTML = "<p class='q-hint' style='color:red;'>Ayat tidak ditemukan!</p>";
        }
    } catch (e) {
        resDiv.innerHTML = "<p class='q-hint'>Gagal mengambil data.</p>";
    }
}

function toggleM() {
    const a = document.getElementById('audio-src');
    const b = document.getElementById('music-btn');
    if(a.paused) { a.play(); b.classList.remove('muted'); } 
    else { a.pause(); b.classList.add('muted'); }
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

    let h = "";
    evs.forEach(e => {
        const diff = new Date(e.d) - now;
        if(diff > 0) {
            const d = Math.floor(diff/(1000*60*60*24));
            const hr = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
            h += `<div class="cd-item"><div class="cd-label">${e.n}</div><div class="cd-time">${d} Hari ${hr} Jam</div></div>`;
        }
    });
    document.getElementById('cd-list').innerHTML = h || "<div class='q-hint'>Memuat Agenda...</div>";
}

setInterval(update, 1000); 
update();
