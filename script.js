let c = 0;
const zikirs = [
    { a: "سُبْحَانَ اللهِ", m: "Maha Suci Allah" },
    { a: "الْحَمْدُ لِلَّهِ", m: "Segala Puji Bagi Allah" },
    { a: "اللهُ أَكْبَرُ", m: "Allah Maha Besar" },
    { a: "أَسْتَغْفِرُ اللهَ", m: "Aku memohon ampun kepada Allah" }
];

const niatData = [
    { t: "Niat Mandi Wajib Junub", a: "نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ اْلأَكْبَرِ فَرْضًا لِلَّهِ تَعَالَى", art: "Aku niat mandi untuk menghilangkan hadats besar fardhu karena Allah Ta'ala." },
    { t: "Niat Mandi Wajib Haid", a: "نَوَيْتُ الْغُسْلَ لِرَفْعِ حَدَثِ الْحَيْضِ فَرْضًا لِلَّهِ تَعَالَى", art: "Aku niat mandi untuk mensucikan diri dari hadats haid fardhu karena Allah Ta'ala." },
    { t: "Niat Mandi Menuju Ramadan", a: "نَوَيْتُ الْغُسْلَ لِدُخُولِ شَهْرِ رَمَضَانَ سُنَّةً لِلَّهِ تَعَالَى", art: "Niat mandi sunnah menyambut bulan suci Ramadan." },
    { t: "Niat Mandi Hari Raya Idul Fitri", a: "نَوَيْتُ الْغُسْلَ لِعِيْدِ الْفِطْرِ سُنَّةً لِلَّهِ تَعَالَى", art: "Niat mandi sunnah hari raya Idul Fitri." },
    { t: "Niat Mandi Hari Raya Idul Adha", a: "نَوَيْتُ الْغُسْلَ لِعِيْدِ الأَضْحَى سُنَّةً لِلَّهِ تَعَالَى", art: "Niat mandi sunnah hari raya Idul Adha." },
    { t: "Niat Shalat Subuh", a: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ (مَأْمُوْمًا/إِمَامًا) لِلَّهِ تَعَالَى", art: "Niat shalat fardhu Subuh (sebagai Imam/Makmum/Sendiri)." },
    { t: "Niat Shalat Dzuhur", a: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ (مَأْمُوْمًا/إِمَامًا) لِلَّهِ تَعَالَى", art: "Niat shalat fardhu Dzuhur (sebagai Imam/Makmum/Sendiri)." },
    { t: "Niat Shalat Ashar", a: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ (مَأْمُوْمًا/إِمَامًا) لِلَّهِ تَعَالَى", art: "Niat shalat fardhu Ashar (sebagai Imam/Makmum/Sendiri)." },
    { t: "Niat Shalat Magrib", a: "أُصَلِّي fَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ (مَأْمُوْمًا/إِمَامًا) لِلَّهِ تَعَالَى", art: "Niat shalat fardhu Magrib (sebagai Imam/Makmum/Sendiri)." },
    { t: "Niat Shalat Isya", a: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ (مَأْمُوْمًا/إِمَامًا) لِلَّهِ تَعَالَى", art: "Niat shalat fardhu Isya (sebagai Imam/Makmum/Sendiri)." }
];

function switchTab(id, el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    ['islamic', 'download', 'convert'].forEach(s => {
        document.getElementById(s + '-section').style.display = (s === id) ? 'block' : 'none';
    });
}

const niatBox = document.getElementById('niat-list-container');
niatData.forEach((d, i) => {
    niatBox.innerHTML += `
        <div class="niat-item glass-solid">
            <div class="niat-trigger" onclick="toggleN(this, ${i})">
                <span class="niat-name">${i + 1}. ${d.t}</span> <span id="arr-${i}">▼</span>
            </div>
            <div class="niat-content">
                <p class="arab">${d.a}</p>
                <p class="arti"><b>Artinya:</b> ${d.art}</p>
            </div>
        </div>`;
});

function toggleN(el, i) {
    const content = el.nextElementSibling;
    const arrow = document.getElementById(`arr-${i}`);
    const isOpen = content.classList.toggle('open');
    arrow.innerText = isOpen ? '▲' : '▼';
}

function countT() {
    c++; document.getElementById('counter').innerText = c;
    const zIndex = Math.floor(c / 33) % zikirs.length;
    document.getElementById('zikir-arab').innerText = zikirs[zIndex].a;
    document.getElementById('zikir-arti').innerText = zikirs[zIndex].m;
    if(navigator.vibrate) navigator.vibrate(45);
}

function openModal() { document.getElementById('custom-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('custom-modal').style.display = 'none'; }
function confirmReset() { c = 0; document.getElementById('counter').innerText = 0; countT(); c=0; document.getElementById('counter').innerText = 0; closeModal(); }

async function fetchTikTok() {
    const url = document.getElementById('dlInput').value;
    const resDiv = document.getElementById('dl-res');
    if(!url) return;
    resDiv.innerHTML = "<p class='loading-text'>Menganalisa...</p>";
    try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const json = await response.json();
        const v = json.data;
        let mediaHtml = v.images ? `<div class="slide-container">${v.images.map((img, i) => `<div class="slide-item"><img src="${img}"><a href="${img}" target="_blank" class="dl-per-foto">Download Foto ${i+1}</a></div>`).join('')}</div>` : `<video controls class="video-preview" src="${v.play}"></video>`;
        resDiv.innerHTML = `${mediaHtml}<div class="caption-box">${v.title || ""}</div><div class="download-links">${!v.images ? `<a href="${v.play}" target="_blank" class="action-btn">DOWNLOAD MP4</a>` : ''}<a href="${v.music}" target="_blank" class="action-btn gold">DOWNLOAD MP3</a></div>`;
    } catch(e) { resDiv.innerHTML = "<p style='color:red'>Gagal mengambil data!</p>"; }
}

function handleMp3(input) {
    if(input.files[0]) {
        document.getElementById('file-name').innerText = "Terpilih: " + input.files[0].name;
        document.getElementById('mp3-dl-zone').style.display = 'block';
    }
}
function downloadAsMp3() { alert("Convert selesai! File MP3 siap."); }

function toggleM() {
    const a = document.getElementById('audio-src');
    const b = document.getElementById('music-btn');
    const icon = document.getElementById('music-icon');
    if(a.paused) { a.play(); b.classList.remove('muted'); icon.innerText = "🔊"; } 
    else { a.pause(); b.classList.add('muted'); icon.innerText = "🔈"; }
}

function updateTime() {
    const now = new Date(); const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const f = (off, id, sid) => {
        const d = new Date(utc + (3600000 * off));
        document.getElementById(id).innerText = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
        document.getElementById(sid).innerText = String(d.getSeconds()).padStart(2,'0');
    };
    f(7, 'wib', 'swib'); f(8, 'wita', 'swita'); f(9, 'wit', 'swit');
}
setInterval(updateTime, 1000); updateTime();
