const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const plane=document.querySelector('.flight');document.body.append(plane);
const flightPhone=document.querySelector('.phone-frame');let flightFrame=0,flightX=innerWidth*.76,flightY=110,flightRoll=-10,flightScale=1;
function flightTarget(){const story=document.querySelector('.journey'),rect=story.getBoundingClientRect(),phone=flightPhone.getBoundingClientRect(),w=plane.offsetWidth,h=plane.offsetHeight;const approach=Math.max(0,Math.min(1,(innerHeight-rect.top)/innerHeight));const progress=Math.max(0,Math.min(1,-rect.top/(story.offsetHeight-innerHeight)));const nearX=phone.left+phone.width*.55-w*.35,nearY=phone.top+phone.height*.12;let x=innerWidth-w-35,y=90,roll=-12,scale=1;
if(approach>0){x+=(nearX-x)*approach;y+=(nearY-y)*approach;roll=-12+20*approach;scale=1+.12*approach}
if(progress>0){if(progress<.40){const t=progress/.40;x=nearX-phone.width*.68*t;y=nearY+phone.height*.26*t;roll=8-20*t;scale=1.12-.38*t}else{const t=(progress-.40)/.34;x=nearX-phone.width*.68+(innerWidth+w)*t;y=nearY+phone.height*.26-innerHeight*.75*t;roll=-12-22*Math.min(t,1);scale=.74+.35*Math.min(t,1)}}
plane.style.opacity=progress>.78||scrollY>story.offsetTop+story.offsetHeight?'0':'1';return{x,y,roll,scale}}
function fly(){flightFrame=0;const t=flightTarget();const ease=reduced?1:.12;flightX+=(t.x-flightX)*ease;flightY+=(t.y-flightY)*ease;flightRoll+=(t.roll-flightRoll)*ease;flightScale+=(t.scale-flightScale)*ease;plane.style.transform=`translate3d(${flightX}px,${flightY}px,0) rotate(${flightRoll}deg) scale(${flightScale})`;if(Math.abs(t.x-flightX)+Math.abs(t.y-flightY)+Math.abs(t.roll-flightRoll)>.15)flightFrame=requestAnimationFrame(fly)}
function queueFlight(){if(!flightFrame)flightFrame=requestAnimationFrame(fly)}
if(reduced){plane.style.display='none'}else{addEventListener('scroll',queueFlight,{passive:true});addEventListener('resize',queueFlight);queueFlight()}
const band=document.querySelector('.destination-band'),track=band.querySelector('.postcards');let bandOffset=0,dragStart=null,paused=false,lastTime=0;function width(){return track.querySelector('.card-set').getBoundingClientRect().width}function paintBand(){const w=width();bandOffset=((bandOffset%w)+w)%w;track.style.transform=`translate3d(${-bandOffset}px,0,0)`}function drift(time){const dt=Math.min(time-lastTime||16,40);lastTime=time;if(!paused&&dragStart===null&&!reduced&&!document.hidden){bandOffset+=dt*.025;paintBand()}requestAnimationFrame(drift)}requestAnimationFrame(drift);band.addEventListener('pointerenter',()=>paused=true);band.addEventListener('pointerleave',()=>{if(dragStart===null)paused=false});band.addEventListener('focus',()=>paused=true);band.addEventListener('blur',()=>paused=false);band.addEventListener('pointerdown',e=>{dragStart={x:e.clientX,offset:bandOffset};band.setPointerCapture(e.pointerId)});band.addEventListener('pointermove',e=>{if(!dragStart)return;bandOffset=dragStart.offset+dragStart.x-e.clientX;paintBand()});function endDrag(){dragStart=null;paused=band.matches(':hover')||document.activeElement===band}band.addEventListener('pointerup',endDrag);band.addEventListener('pointercancel',endDrag);band.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();bandOffset+=e.key==='ArrowRight'?200:-200;paintBand()}});
const journey=document.querySelector('.journey'),frame=document.getElementById('journey-frame'),titles=['Make the trip happen.','Keep the good ones.','Your trip, together.'],copy=['Share when you’re free. Pick the days that work for your whole crew.','A Yes, Maybe, or No turns everyone’s favorites into your shared shortlist.','The dates are set. The favorites are in. It’s time to go.'];let previous=-1;let routeSegments=[];
const phoneAssetBase=new URL("../",frame.src).href;
function render(){const p=Math.max(0,Math.min(1,-journey.getBoundingClientRect().top/(journey.offsetHeight-innerHeight))),step=Math.min(2,Math.floor(p*3));document.querySelectorAll('.chat-note[data-at]').forEach(note=>{const at=Number(note.dataset.at);note.classList.toggle('shown',reduced||p>=at-.035);note.classList.toggle('is-typing',!reduced&&p<at&&p>=at-.035);note.classList.toggle('mobile-current',p>=at&&(at===.45||p<at+.20))});routeSegments.forEach(({node,at})=>node.setAttribute('stroke',p>=at?'#278bd2':'#aecfe6'));const routePath=document.getElementById('route-geometry'),routeLength=routePath.getTotalLength();document.querySelectorAll('.route-stop').forEach(pin=>{const stop=Number(pin.dataset.stop),pt=routePath.getPointAtLength(stop*routeLength);pin.setAttribute('transform',`translate(${pt.x} ${pt.y})`);pin.classList.toggle('visited',p>=stop)});const dot=routePath.getPointAtLength(p*routeLength);document.getElementById('route-dot').setAttribute('cx',dot.x);document.getElementById('route-dot').setAttribute('cy',dot.y);if(step!==previous){document.getElementById('step-title').innerHTML=titles[step];document.getElementById('step-copy').textContent=copy[step];document.querySelectorAll('[data-step]').forEach((b,i)=>b.setAttribute('aria-pressed',i===step));previous=step}const local=(p*3-step);let source=step===1?'swipes':'calendar',index=step===0?Math.round(local*64):step===1?Math.round(local*56):85+Math.round(local*34);if(reduced)index=step===0?64:step===1?0:108;const nextFrame=phoneAssetBase+source+'/'+String(index).padStart(3,'0')+'.webp';if(frame.src!==nextFrame)frame.src=nextFrame}let pending=false;addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{render();pending=false})}},{passive:true});document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>scrollTo({top:journey.offsetTop+(journey.offsetHeight-innerHeight)*(Number(b.dataset.step)/3+.02),behavior:reduced?'instant':'smooth'}));render();

// Recolor interface accents at render time. Photo/map regions remain untouched.
const blueCanvas=document.createElement('canvas');blueCanvas.className='blue-phone';blueCanvas.setAttribute('aria-hidden','true');frame.after(blueCanvas);const blueCtx=blueCanvas.getContext('2d',{willReadFrequently:true});const blueCache=new Map();
function blueFrame(){if(!frame.naturalWidth)return;const key=frame.src;blueCanvas.width=frame.naturalWidth;blueCanvas.height=frame.naturalHeight;if(blueCache.has(key)){blueCtx.putImageData(blueCache.get(key),0,0);frame.classList.add('blue-ready');return}blueCtx.drawImage(frame,0,0);const pixels=blueCtx.getImageData(0,0,blueCanvas.width,blueCanvas.height),d=pixels.data,w=blueCanvas.width,h=blueCanvas.height;const swipe=key.includes('/swipes/'),index=Number(key.match(/(\d+)\.webp/)?.[1]||0);for(let i=0;i<d.length;i+=4){const x=(i/4%w)/w,y=Math.floor(i/4/w)/h;if(swipe&&y>.16&&y<.84)continue;if(!swipe&&index>=78&&x<.23&&y>.65&&y<.81)continue;const r=d[i],g=d[i+1],b=d[i+2];if(r>110&&r-g>4&&g-b>2&&r-b>9){const saturation=(r-b)/255;d[i]=Math.round(r*(1-saturation)+20*saturation);d[i+1]=Math.round(r*(1-saturation)+126*saturation);d[i+2]=Math.round(r*(1-saturation)+208*saturation)}}blueCtx.putImageData(pixels,0,0);if(blueCache.size<180)blueCache.set(key,pixels);frame.classList.add('blue-ready')}
frame.addEventListener('load',blueFrame);if(frame.complete)blueFrame();

const routeSvg=document.querySelector('.travel-line'),routeMain=document.getElementById('route-geometry');
function fitRoute(){
 const box=routeSvg.getBoundingClientRect(),phone=document.querySelector('.phone-frame').getBoundingClientRect();
 if(!box.width||!box.height)return;
 // Draw in viewport-sized units so the route responds to the actual phone bounds.
 const w=box.width,h=box.height,gap=innerWidth<=760?22:48;
 const left=Math.max(28,phone.left-box.left-gap),right=Math.min(w-28,phone.right-box.left+gap);
 const outerLeft=Math.max(22,left*.4),outerRight=Math.min(w-22,right+(w-right)*.6);
 const top=24,bottom=h-22;
 // A descending travel doodle: broad side loops joined behind the phone.
 const lx=outerLeft,rx=outerRight;
 const d=`M ${left*.86} ${top}
 C ${lx-45} ${top-40},${lx-65} ${h*.25},${left*.78} ${h*.30}
 C ${left+35} ${h*.38},${left-20} ${h*.13},${w*.49} ${h*.15}
 C ${right+45} ${h*.15},${rx+55} ${h*.23},${rx} ${h*.43}
 C ${rx-35} ${h*.60},${right-15} ${h*.53},${right+30} ${h*.42}
 C ${right+65} ${h*.35},${rx+65} ${h*.68},${right+15} ${h*.75}
 C ${w*.52} ${h*.90},${left+10} ${h*.58},${lx+25} ${h*.68}
 C ${lx-90} ${h*.81},${left-15} ${h*.88},${left-45} ${h*.65}
 C ${left-75} ${h*.45},${lx-70} ${h*.53},${lx+25} ${h*.83}
 C ${lx+65} ${h*1.02},${left-35} ${h*1.02},${left} ${bottom}`;
 routeSvg.setAttribute('viewBox',`0 0 ${w} ${h}`);routeSvg.querySelectorAll(':scope > path, #route-progress').forEach(path=>path.setAttribute('d',d));
 // Color each dash by its distance along the route; no shared reveal mask.
 routeSvg.querySelectorAll(':scope > path').forEach(path=>path.style.visibility='hidden');
 let dashes=routeSvg.querySelector('.route-dashes');
 if(!dashes){dashes=document.createElementNS('http://www.w3.org/2000/svg','g');dashes.setAttribute('class','route-dashes');routeSvg.insertBefore(dashes,routeSvg.querySelector('.route-stop'));}
 dashes.replaceChildren();routeSegments=[];const length=routeMain.getTotalLength();
 for(let start=0;start<length;start+=19){const end=Math.min(start+6,length);let points='';for(let dist=start;dist<=end;dist+=1){const point=routeMain.getPointAtLength(dist);points+=(dist===start?'M':'L')+point.x+' '+point.y+' ';}const node=document.createElementNS('http://www.w3.org/2000/svg','path');node.setAttribute('d',points);node.setAttribute('fill','none');node.setAttribute('stroke-width','3');node.setAttribute('stroke-linecap','round');dashes.append(node);routeSegments.push({node,at:end/length});}
 render();
}
addEventListener('resize',fitRoute);new ResizeObserver(fitRoute).observe(document.querySelector('.phone-frame'));fitRoute();
