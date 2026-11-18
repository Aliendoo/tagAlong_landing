(() => {
 const votes=document.querySelector('.votes');
 if(!votes)return;
 const card=votes.previousElementSibling;
 const status=document.getElementById('vote-status');
 const items=[['Budapest, Hungary','Along the Danube','Riverside walk · 60 min · Free','swipe-budapest.webp'],['Rome, Italy','A day in Rome','Explore the city together','swipe-rome.webp'],['Osaka, Japan','Find your next favorite spot','Food, little streets, and good company','swipe-daikanyama.webp']];
 let index=0,busy=false;
 card.classList.add('swipe-card');
 const stage=document.createElement('div');stage.className='swipe-stage';card.before(stage);stage.append(card);
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function render(){const item=items[index];card.querySelector('.trip-art').innerHTML='<img src="'+item[3]+'" alt="'+item[0]+'" draggable="false">';card.querySelector('.tag').textContent=item[0];card.querySelector('h3').textContent=item[1];card.querySelector('.activity-copy .small').textContent=item[2];}
 render();
 votes.querySelectorAll('button').forEach(button=>{
  button.removeAttribute('aria-pressed');
  button.onclick=async()=>{
   if(busy)return;busy=true;
   const choice=button.getAttribute('aria-label').replace('Vote ','');
   const overlay=document.createElement('img');overlay.src='vote-'+choice+'.png';overlay.alt='';overlay.className='swipe-feedback';card.append(overlay);
   const x=choice==='no'?-430:choice==='yes'?430:0,y=choice==='maybe'?-360:40,rotation=choice==='no'?-18:choice==='yes'?18:0;
   status.textContent=(choice==='yes'?'Yes':choice==='no'?'No':'Maybe')+' · '+items[index][1];
   try {
    await card.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+x+'px,'+y+'px) rotate('+rotation+'deg)',opacity:0}],{duration:reduced()?80:350,easing:'cubic-bezier(.32,0,.67,0)',fill:'forwards'}).finished;
    overlay.remove();index=(index+1)%items.length;render();card.getAnimations().forEach(a=>a.cancel());
    await card.animate([{opacity:0,transform:'scale(.97)'},{opacity:1,transform:'scale(1)'}],{duration:reduced()?0:170,easing:'ease-out'}).finished;
   }finally{overlay.remove();busy=false;}
  };
 });
})();