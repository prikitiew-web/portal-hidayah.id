let c = 0;
const zk = ["SUBHANALLAH", "ALHAMDULILLAH", "ALLAHU AKBAR", "ASTAGHFIRULLAH"];
const evs = [
    { n: "Ramadhan 1447H", d: "Feb 18, 2026" }, 
    { n: "Idul Fitri 1447H", d: "Mar 20, 2026" }
];

function toggleN(el) {
    const content = el.nextElementSibling;
    const isOpen = content.classList.toggle('open');
    el.querySelector('span').innerText = isOpen ? '-' : '+';
}

function countT() {
    c++;
    document.getElementById('counter').innerText = c;
    document.getElementById('zikir-name').innerText = zk[Math.floor(c/33) % 4];
    if(navigator.vibrate) navigator.vibrate(45);
}

function resT() { 
    if(confirm('Reset Zikir?')) { 
        c = 0; 
        document.getElementById('counter').innerText = 0; 
    } 
}

function toggleM() {
    const a = document.getElementById('audio-src');
    const b = document.getElementById('music-btn');
    if(a.paused) { 
        a.play(); 
        b.classList.remove('muted'); 
    } else { 
        a.pause(); 
        b.classList.add('muted'); 
    }
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
            const d = Math.floor(diff/(1000*60*60*24)), hr = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
            h += `<div class="cd-item"><div class="cd-label">${e.n}</div><div class="cd-time">${d}d ${hr}h</div></div>`;
        }
    });
    document.getElementById('cd-list').innerHTML = h;
}

setInterval(update, 1000); 
update();
