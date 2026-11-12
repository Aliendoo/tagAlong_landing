import React,{useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,useAnimation,useReducedMotion} from 'motion/react';
import {LiquidGlass} from './components/ui/liquid-glass';
import {CloudShader} from './components/ui/cloud-shader';
function GooeyPreview({initialOpen=false}){
 const uid=React.useId();
 const [state,setState]=useState(initialOpen?'idle':'collapsed');
 const shake=useAnimation(), reduce=useReducedMotion();const [reason,setReason]=useState('');
 const open=()=>{setState('idle');if(!reduce){requestAnimationFrame(()=>{field.current.closest('form').querySelectorAll('.goo-drop,.goo-send').forEach(el=>el.animate([{translate:'-12px 0',scale:'.94'},{translate:'5px 0',scale:'1.035',offset:.65},{translate:'-2px 0',scale:'.99',offset:.84},{translate:'0 0',scale:'1'}],{duration:620,easing:'cubic-bezier(.22,.8,.35,1)'}))})}};
 useEffect(()=>{if(state==='idle'){if(initialOpen)return;const timer=setTimeout(()=>field.current?.focus(),reduce?0:420);return()=>clearTimeout(timer)}},[state,reduce]);
 const [email,setEmail]=useState('');const [overflow,setOverflow]=useState(false);const field=useRef(null);
 useEffect(()=>{const input=field.current;if(!input)return;const measure=()=>{const style=getComputedStyle(input);const ctx=document.createElement('canvas').getContext('2d');ctx.font=style.font;setOverflow(ctx.measureText(email).width>input.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)-2)};const observer=new ResizeObserver(measure);observer.observe(input);measure();return()=>observer.disconnect()},[email]);
 return <div className="goo-wrap"><svg width="0" height="0" aria-hidden="true"><defs><filter id="tagalong-goo" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"/><feComposite in="SourceGraphic" operator="atop"/></filter></defs></svg>
 <motion.form animate={shake} noValidate className={'goo-form '+state} onSubmit={async e=>{e.preventDefault();if(state==='submitting'||state==='sent')return;if(!field.current.checkValidity()||!/^\S+@\S+\.\S+$/.test(email.trim())){setReason(!email.trim()?'Add your email so we know where to reach you.':'That email looks incomplete. Try name@example.com.');setState('error');if(!reduce)shake.start({x:[0,-5,4,-3,2,0],transition:{duration:.36}});field.current.focus();return}setState('submitting');try{const response=await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.trim(),website:''}),signal:AbortSignal.timeout(15000)});const result=await response.json();if(!response.ok||result.success!==true)throw new Error('not saved');setState('sent')}catch{setReason('We couldn’t save your email. Please try again.');setState('error');if(!reduce)shake.start({x:[0,-5,4,-3,2,0],transition:{duration:.36}})}}}>
 <div className="goo-shapes" aria-hidden="true"><span className="goo-body"/><span className="goo-drop"/></div>
 <div className="goo-lenses" aria-hidden="true"><LiquidGlass className="goo-body" radius={999} scale={12} aberration={0} bevelDepth={10} frost={2} tint={.32}/><LiquidGlass className="goo-drop" radius={999} scale={12} aberration={0} bevelDepth={10} frost={2} tint={.32}/></div>
 <svg className="goo-envelope" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
 <label className="sr-only" htmlFor={uid+"-email"}>Email address</label>
 <input ref={field} value={email} onChange={e=>{setEmail(e.target.value);if(state==='error')setState('idle')}} id={uid+"-email"} type="email" required placeholder="you@company.com" autoComplete="email" maxLength={254} aria-describedby={uid+"-note"} onFocus={()=>{}} onBlur={()=>{}} disabled={state==='sent'||state==='collapsed'||state==='submitting'} aria-invalid={state==='error'}/>
 <button type="submit" className="goo-send" aria-label="Join Beta List" disabled={state==='sent'||state==='collapsed'||state==='submitting'}>{state==='submitting'?'…':state==='sent'?'✓':<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</button>
 <button type="button" className="goo-open" onClick={open} disabled={state!=='collapsed'} aria-hidden={state!=='collapsed'} tabIndex={state==='collapsed'?0:-1}>Join Beta List</button><div className="goo-confirmation" aria-hidden={state!=='sent'}>✓ You’re on the list</div>
 </motion.form><div className="goo-email-slot">{overflow&&state!=='sent'&&state!=='collapsed'&&<p className="goo-full-email">{email}</p>}</div><p id={uid+"-note"} data-goo-note="true" className={state==='error'?'small goo-error':'small'} aria-live="polite">{state==='error'?reason:state==='sent'?'We’ll email you when it’s time.':state==='submitting'?'Joining…':''}</p><button className="chip goo-replay" type="button" style={{visibility:state==='sent'?'visible':'hidden'}} disabled={state!=='sent'} aria-hidden={state!=='sent'} onClick={()=>{setState(initialOpen?'idle':'collapsed');setEmail('')}}>Add another email</button></div>
}
const goo=document.getElementById('gooey-preview');if(goo)createRoot(goo).render(<GooeyPreview initialOpen/>);


createRoot(document.getElementById('hero-clouds')).render(<CloudShader count={6} speed={.22} skyTopColor='#159DE8' skyBottomColor='#DDF4FF'/>);

createRoot(document.getElementById('waitlist-clouds')).render(<CloudShader count={6} speed={.18} skyTopColor='#61B9F1' skyBottomColor='#2379CA'/>);

createRoot(document.getElementById('top-signup')).render(<GooeyPreview/>);
