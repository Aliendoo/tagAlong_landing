(() => {
 const votes=document.querySelector('.votes');
 if(!votes)return;
 const card=votes.previousElementSibling,status=document.getElementById('vote-status');
 const items=[['Budapest, Hungary','Along the Danube','Riverside walk · 60 min · Free','swipe-budapest.webp'],['Rome, Italy','A day in Rome','Explore the city together','swipe-rome.webp'],['Osaka, Japan','Find your next favorite spot','Food, little streets, and good company','swipe-daikanyama.webp']];
 let index=0,busy=false,drag=null,dx=0;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 card.classList.add('swipe-card');
 const stage=document.createElement('div');stage.className='swipe-stage';card.before(stage);
 const next=card.cloneNode(true);next.classList.add('swipe-under');next.setAttribute('aria-hidden','true');
 stage.append(next,card);
 const overlay=document.createElement('img');overlay.alt='';overlay.className='swipe-feedback';overlay.draggable=false;card.append(overlay);
 function render(target,i){const item=items[i%items.length];target.querySelector('.trip-art').innerHTML='<img src="'+item[3]+'" alt="'+item[0]+'" draggable="false">';target.querySelector('.tag').textContent=item[0];target.querySelector('h3').textContent=item[1];target.querySelector('.activity-copy .small').textContent=item[2];}
 function reset(){card.style.transform='';overlay.style.opacity='0';next.style.transform='';dx=0;}
 function stamp(choice,opacity=1){overlay.src='vote-'+choice+'.png';overlay.style.opacity=opacity;}
 function refresh(){render(card,index);render(next,index+1);reset();}
 refresh();
 async function vote(choice){
  if(busy)return;busy=true;drag=null;stamp(choice);
  const width=stage.getBoundingClientRect().width, distance=Math.max(450,width*1.6);
  const x=choice==='no'?-distance:choice==='yes'?distance:0,y=choice==='maybe'?-460:65,rotation=choice==='no'?-24:choice==='yes'?24:6;
  status.textContent=choice.charAt(0).toUpperCase()+choice.slice(1)+' · '+items[index][1];
  const start=card.style.transform||'translate(0,0) rotate(0)';
  const lift=next.animate([{transform:next.style.transform||'translateY(12px) scale(.95)'},{transform:'translateY(0) scale(1)'}],{duration:reduced()?80:360,fill:'forwards',easing:'ease-out'});
  const leave=card.animate([{transform:start,opacity:1},{offset:.65,opacity:1},{transform:'translate('+x+'px,'+y+'px) rotate('+rotation+'deg)',opacity:0}],{duration:reduced()?80:420,easing:'cubic-bezier(.3,.05,.65,1)',fill:'forwards'});
  try{await leave.finished;index=(index+1)%items.length;refresh();}finally{leave.cancel();lift.cancel();busy=false;}
 }
 votes.querySelectorAll('button').forEach(button=>{button.removeAttribute('aria-pressed');button.onclick=()=>vote(button.getAttribute('aria-label').replace('Vote ',''));});
 card.addEventListener('pointerdown',e=>{if(busy||e.button!==0)return;drag={x:e.clientX,id:e.pointerId};dx=0;card.setPointerCapture(e.pointerId);});
 card.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;dx=e.clientX-drag.x;const progress=Math.min(Math.abs(dx)/110,1);card.style.transform='translate('+dx+'px,0) rotate('+(reduced()?0:dx/16)+'deg)';stamp(dx<0?'no':'yes',progress);next.style.transform='translateY('+(12*(1-progress))+'px) scale('+(.95+.05*progress)+')';});
 async function release(e,cancel=false){if(!drag||e.pointerId!==drag.id)return;drag=null;if(!cancel&&Math.abs(dx)>80){vote(dx<0?'no':'yes');return;}busy=true;const back=card.animate([{transform:card.style.transform},{transform:'translate(0,0) rotate(0)'}],{duration:reduced()?0:220,easing:'cubic-bezier(.2,.8,.3,1)'});reset();try{await back.finished;}finally{busy=false;}}
 card.addEventListener('pointerup',e=>release(e));card.addEventListener('pointercancel',e=>release(e,true));
})();
