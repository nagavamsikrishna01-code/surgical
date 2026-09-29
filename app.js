
(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.querySelector('.progress');
const cursor=document.querySelector('.cursor');
const isFine=matchMedia('(pointer:fine)').matches;
if(isFine&&!reduce){cursor.style.display='block';window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,.btn,.lab-item,.product-copy').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hot'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hot'))})}
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+'%';document.querySelectorAll('[data-parallax]').forEach(el=>{const r=el.getBoundingClientRect();el.style.transform=`translateY(${Math.max(-26,Math.min(26,(r.top-innerHeight*.45)*-.025))}px)`});document.querySelectorAll('.product-visual').forEach(el=>{const r=el.getBoundingClientRect(),p=Math.max(-1,Math.min(1,(r.top+r.height/2-innerHeight/2)/innerHeight));const img=el.querySelector('img');if(img&&isFine)img.style.transform=`translate3d(0,${p*-24}px,0) scale(1.07)`});},{passive:true});

document.querySelectorAll('[data-tilt]').forEach(card=>{
 if(reduce) return;
 card.addEventListener('pointermove',e=>{if(!isFine)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1100px) rotateX(${(-y*7).toFixed(2)}deg) rotateY(${(x*9).toFixed(2)}deg) translateZ(0)`});
 card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('.magnetic').forEach(b=>{if(reduce)return;b.addEventListener('pointermove',e=>{if(!isFine)return;const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.15}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});

document.querySelectorAll('.tap-reveal').forEach(el=>{el.setAttribute('tabindex','0');const toggle=e=>{if((!isFine||e.type==='keydown')&&!e.target.closest('a')&&(e.type!=='keydown'||e.key==='Enter'||e.key===' ')){if(e.type==='keydown')e.preventDefault();el.classList.toggle('open')}};el.addEventListener('click',toggle);el.addEventListener('keydown',toggle)});
const rail=[...document.querySelectorAll('.scene-rail a')],targets=['top','products','bundle','lab'].map(id=>document.getElementById(id));const rio=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){const i=targets.indexOf(en.target);rail.forEach((a,j)=>a.classList.toggle('active',i===j))}}),{rootMargin:'-42% 0px -42% 0px',threshold:0});targets.forEach(t=>t&&rio.observe(t));

// Canvas field: intentionally dependency-free so the site remains light and free to host.
const c=document.getElementById('fx'),ctx=c.getContext('2d',{alpha:true});let W=0,H=0,dpr=Math.min(devicePixelRatio||1,2),pts=[];
function resize(){W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;c.style.width=W+'px';c.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const n=Math.min(90,Math.floor(W*H/17000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.25,v:(Math.random()*.14+.04),a:Math.random()*.5+.12}))}
function loop(){ctx.clearRect(0,0,W,H);for(const p of pts){p.y-=p.v;if(p.y<-3){p.y=H+3;p.x=Math.random()*W}ctx.beginPath();ctx.fillStyle=`rgba(210,215,255,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(loop)}
resize();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(resize,120)});if(!reduce)loop();

// Entrance sequencing
if(!reduce){const els=[...document.querySelectorAll('.hero-copy>*'),document.querySelector('.hero-orbit')];els.forEach((el,i)=>{el.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,delay:130+i*110,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'})});
const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.animate([{opacity:0,transform:'translateY(45px)'},{opacity:1,transform:'translateY(0)'}],{duration:780,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});io.unobserve(en.target)}}),{threshold:.12});document.querySelectorAll('.product-copy,.product-visual,.bundle-card,.lab-item').forEach(el=>io.observe(el));}
})();
