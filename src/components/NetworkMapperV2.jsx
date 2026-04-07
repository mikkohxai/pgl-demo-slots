/* title: ACT Network Mapper Prototype
   version: 2.0.0
   upom_tag: ACT-NM-01
   status: review
   aicopilot_chat_url: https://claude.ai/chat
   created_date: 2026-04-07
   last_modified: 2026-04-07 03:00:00 UTC */
import { useState, useEffect } from "react";
import { Heart, Briefcase, Activity, Building2, BookOpen, MapPin, ChevronRight, ChevronLeft, Plus, Check, X, Sparkles, Calendar, MessageCircle, Users, Clock, Info, Mail, AlertCircle, Globe, Trash2, User, Pen, Target, BookOpenCheck, Flag, ArrowUpRight } from "lucide-react";

/* ═══ TOKENS (pgl-brand-system-reference-v1.md v1.3.0) ═══ */
var T={bg:"#FFFFFF",bgH:"#F7F7F7",bgS2:"#F2F2F2",bgS3:"#E5E5E5",bgP:"#212121",bgPH:"#2E2E2E",bgBrand:"#F3EBE2",bgBL:"#FAF6F2",bgBS:"#63574A",bgBD:"#423A31",bgPos:"#F0F9F4",bgPosS:"#337E53",bgIP:"#FFF2CC",bgAI:"#F5F3FF",bgAIS:"#8655F6",tP:"#212121",tS:"#636363",tBP:"#423A31",tBS:"#63574A",tI:"#FFFFFF",tAI:"#7C3AED",tPos:"#337E53",tNeg:"#CC0000",tIP:"#664D00",tInfo:"#2166DB",bP:"#D8D8D8",bB:"#DBD1C6",bSel:"#212121"};
var F="'Lato',system-ui,sans-serif";
var R={card:8,btn:6,input:6,badge:9999,modal:12};
/* Font scale: 45/30/24/20/18/15/13/11/9 ONLY */

var CSS="@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');\n*:focus-visible{outline:2px solid #212121;outline-offset:2px}\n@supports not (backdrop-filter:blur(1px)){.glass-node{background:rgba(255,255,255,0.85) !important;backdrop-filter:none !important;-webkit-backdrop-filter:none !important}}\n@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms !important;transition-duration:0.01ms !important}}\n@keyframes fadeUp{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}\n@keyframes nodeReveal{0%{opacity:0;transform:translateY(11px) scale(0.92)}100%{opacity:1;transform:translateY(0) scale(1)}}\n@keyframes ghostPulse{0%,100%{opacity:0.15}50%{opacity:0.35}}\n@keyframes countPop{0%{transform:scale(0.85)}50%{transform:scale(1.04)}100%{transform:scale(1)}}\n@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}\n@media(max-width:1024px){.layout-main{gap:24px !important}.detail-panel{width:280px !important}}\n@media(max-width:768px){.layout-main{flex-direction:column !important}.detail-panel{width:100% !important}.quiz-sidebar{display:none !important}}\n@media(max-width:390px){.layout-main{padding:16px !important}.header-bar{padding:8px 16px !important}}";

var CATS=[{id:"personal",name:"Personal & Family",icon:Heart,color:"#337E53",light:"#F0F9F4"},{id:"professional",name:"Professional & Alumni",icon:Briefcase,color:"#7C3AED",light:"#F5F3FF"},{id:"fitness",name:"Fitness & Sports",icon:Activity,color:"#45A86E",light:"#E8F5E9"},{id:"religious",name:"Religious & Spiritual",icon:Building2,color:"#8F6E00",light:"#FFF8E1"},{id:"hobby",name:"Hobby & Interest",icon:BookOpen,color:"#2C6DE8",light:"#E3F2FD"},{id:"neighborhood",name:"Neighborhood & Local",icon:MapPin,color:"#D4820A",light:"#FFF3E0"}];
var INTERESTS=["Yoga & wellness","Wine & dining","Running & fitness","Book clubs","Volunteering","Interior design","Cooking","Photography"];
var SPECS=["Family luxury","Honeymoons & romance","Adventure & active","Destination weddings","Italy & Mediterranean","Caribbean & islands","Safari & wildlife","Wellness retreats"];
var ACTIONS=[{id:"a1",day:"Mon",text:"Text 3 PTA parents you\u2019d grab coffee with. No travel mention.",cc:"personal",t:11,ph:"Plant"},{id:"a2",day:"Tue",text:"Post a running selfie with your running club hashtag.",cc:"fitness",t:5,ph:"Plant"},{id:"a3",day:"Wed",text:"Comment on 2 alumni LinkedIn posts about travel.",cc:"professional",t:11,ph:"Plant"},{id:"a4",day:"Thu",text:"DM your book club group: \u201cAnyone reading anything set in Italy?\u201d",cc:"hobby",t:5,ph:"Plant"},{id:"a5",day:"Fri",text:"Write your Top 20 \u2014 5 from each community most likely to travel.",cc:null,t:20,ph:"Plant"},{id:"a6",day:"Mon",text:"Follow up on the coffee you had last week. Ask about their upcoming plans.",cc:"personal",t:11,ph:"Grow"},{id:"a7",day:"Wed",text:"Share a destination article in your alumni group with a personal note.",cc:"professional",t:9,ph:"Grow"},{id:"a8",day:"Fri",text:"Reach out to your top 3 prospects with a specific trip idea.",cc:null,t:15,ph:"Convert"}];
var DMS=[{tier:"Warm reconnect",tone:"Casual, no travel",text:"Hey Sarah! Been meaning to catch up \u2014 I saw Ella\u2019s science fair project on the school page, so cool! Coffee at Bean & Leaf this week?",why:"Opens with a specific personal detail. No travel mention. Re-establishing the relationship comes first."},{tier:"Soft bridge",tone:"Natural transition",text:"By the way, I just learned about this incredible family resort in Costa Rica \u2014 made me think of you guys. Want me to send the details?",why:"Bridges from personal to travel naturally. \u201CMade me think of you\u201D framing makes it feel like a gift, not a pitch."},{tier:"Direct value",tone:"Clear, non-pushy",text:"I\u2019m putting together a small group trip for school families this summer \u2014 Italy, kid-friendly, all logistics handled. Would you and Mark want in?",why:"Creates exclusivity (\u201Csmall group\u201D) and removes friction (\u201Call logistics handled\u201D). Easy to say yes to."}];
var USC_CONTENT=[{title:"The referral engine framework",desc:"How top advisors generate 3+ referrals per client without asking. Build referral triggers into your natural conversation flow.",source:"Union Square Consulting"},{title:"Outreach timing windows",desc:"When your contacts are most receptive to travel conversations \u2014 mapped to life events, seasons, and school calendars.",source:"Union Square Consulting"},{title:"The warm-to-hot messaging sequence",desc:"A 5-touch sequence that moves a cold contact to a booked client in 30 days. Templates included.",source:"Union Square Consulting"}];

function h2r(hex){return parseInt(hex.slice(1,3),16)+","+parseInt(hex.slice(3,5),16)+","+parseInt(hex.slice(5,7),16);}
function bdg(bg,c){return{display:"inline-flex",alignItems:"center",gap:3,fontSize:9,fontWeight:700,padding:"2px 9px",borderRadius:R.badge,background:bg,color:c,fontFamily:F};}

/* ═══ COMMUNITY INPUT (§5.12: religious = tags only) ═══ */
function CommunityInput(props){var cat=props.cat,onAdd=props.onAdd,isReligious=cat.id==="religious";var[n,sN]=useState("");var[w,sW]=useState("");var[f,sF]=useState(false);
function add(){if(!n.trim())return;sF(true);setTimeout(function(){onAdd({name:n.trim(),website:isReligious?"":w.trim()});sN("");sW("");sF(false);},280);}
return(<div style={{padding:13,background:T.bg,borderRadius:R.card,border:"1px solid "+T.bP,opacity:f?0.18:1,transform:f?"scale(0.96)":"scale(1)",transition:"all 0.28s ease"}}><input value={n} onChange={function(e){sN(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&n.trim())add();}} placeholder={isReligious?"e.g., Faith community, Church group, Synagogue":"Community name"} style={{width:"100%",padding:"9px 13px",borderRadius:R.input,border:"1px solid "+T.bP,fontSize:13,fontFamily:F,boxSizing:"border-box",outline:"none",marginBottom:isReligious?0:9,color:T.tP}} tabIndex={0}/>{!isReligious&&<div style={{display:"flex",gap:9}}><div style={{flex:1,position:"relative"}}><Globe size={11} color={T.tS} style={{position:"absolute",left:11,top:11}}/><input value={w} onChange={function(e){sW(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&n.trim())add();}} placeholder="Website (optional)" style={{width:"100%",padding:"9px 13px 9px 29px",borderRadius:R.input,border:"1px solid "+T.bP,fontSize:11,fontFamily:F,boxSizing:"border-box",outline:"none",color:T.tS}} tabIndex={0}/></div><button onClick={add} disabled={!n.trim()} style={{padding:"9px 18px",borderRadius:R.btn,border:"none",background:n.trim()?T.bgP:T.bgS2,color:n.trim()?T.tI:T.tS,fontSize:11,fontWeight:600,cursor:n.trim()?"pointer":"default",fontFamily:F,minHeight:44,minWidth:44}} tabIndex={0}>Add</button></div>}{isReligious&&<button onClick={add} disabled={!n.trim()} style={{marginTop:9,padding:"9px 18px",borderRadius:R.btn,border:"none",background:n.trim()?T.bgP:T.bgS2,color:n.trim()?T.tI:T.tS,fontSize:11,fontWeight:600,cursor:n.trim()?"pointer":"default",fontFamily:F,width:"100%",minHeight:44}} tabIndex={0}>Add</button>}</div>);}

/* ═══ ANIMATED COUNTER ═══ */
function AnimCount(props){var tgt=props.value,dur=props.dur||1800;var[v,sV]=useState(0);useEffect(function(){if(tgt<=0){sV(0);return;}var s=Date.now();function tick(){var p=Math.min((Date.now()-s)/dur,1);sV(Math.round(p*tgt));if(p<1)requestAnimationFrame(tick);}tick();},[tgt]);return v;}

/* ═══ PROFILE COMPLETENESS BAR (§3.9 gamification) ═══ */
function ProfileBar(props){var entries=props.entries,icp=props.icp,style=props.style,phrases=props.phrases;
var items=[{label:"Communities",done:entries.length>0},{label:"Ideal client",done:!!icp},{label:"Writing style",done:!!style},{label:"Brand phrases",done:!!phrases}];
var pct=items.filter(function(i){return i.done;}).length/items.length*100;
return(<div style={{padding:13,background:T.bgBL,borderRadius:R.card,border:"1px solid "+T.bB}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}><span style={{fontSize:11,fontWeight:600,color:T.tBS}}>Profile completeness</span><span style={bdg(pct===100?T.bgPos:T.bgIP,pct===100?T.tPos:T.tIP)}>{Math.round(pct)}%</span></div><div style={{height:4,background:T.bB,borderRadius:2,marginBottom:9}}><div style={{height:4,background:pct===100?T.tPos:T.tBS,borderRadius:2,width:pct+"%",transition:"width 0.4s ease"}}/></div><div style={{display:"flex",gap:9,flexWrap:"wrap"}}>{items.map(function(it){return <span key={it.label} style={{fontSize:9,color:it.done?T.tPos:T.tBS,fontWeight:600,fontFamily:F}}>{it.done?"\u2713":"\u25CB"} {it.label}</span>;})}</div></div>);}

/* ═══ HEADER BAR (§13 prototype identity) ═══ */
function Header(props){return(<div className="header-bar" style={{background:T.bg,borderBottom:"1px solid "+T.bP,padding:"11px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:11,fontWeight:600,color:T.tS,letterSpacing:"0.04em",fontFamily:F}}>Pro Growth Lab \u2014 Network Mapper</span><span style={bdg(T.bgIP,T.tIP)}>BETA</span><span style={{fontSize:9,fontWeight:600,color:T.tS,padding:"2px 7px",borderRadius:R.badge,border:"1px solid "+T.bP,fontFamily:F}}>ACT-NM-01 v2.0.0</span></div><div style={{display:"flex",alignItems:"center",gap:13}}>{props.right}<span style={{fontSize:9,color:T.tS,fontFamily:F}}>Apr 7, 2026</span></div></div>);}

/* ═══ FOOTER (§16.4 report a problem) ═══ */
function Footer(){return(<div style={{padding:"13px 24px",borderTop:"1px solid "+T.bP,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:9,color:T.tS,fontFamily:F}}>Pro Growth Lab \u00b7 Fora Travel</span><a href="#" onClick={function(e){e.preventDefault();alert("Thank you! Your feedback has been submitted.");}} style={{fontSize:9,color:T.tInfo,textDecoration:"none",fontFamily:F,fontWeight:600,minHeight:44,display:"flex",alignItems:"center"}} tabIndex={0}><Flag size={9} style={{marginRight:4}}/> Report a problem</a></div>);}

/* ═══ MAIN APP ═══ */
export default function App(){
var[view,sV]=useState("login");var[email,sE]=useState("");var[err,sErr]=useState("");
var[step,sSt]=useState(1);var[expCats,sEC]=useState([]);var[entries,sEn]=useState([]);
var[ints,sIn]=useState(["Yoga & wellness","Wine & dining"]);var[specs,sSp]=useState(["Family luxury","Italy & Mediterranean"]);
var[activeNode,sAN]=useState(null);var[tab,sTab]=useState("map");var[rp,sRP]=useState(0);
var[icp,sICP]=useState("");var[wStyle,sWS]=useState("");var[phrases,sPh]=useState("");
var[phFilter,sPF]=useState("all");

var EMAILS=["rachel.kim@fora.travel","david.torres@fora.travel","maria.santos@fora.travel","demo@fora.travel"];
var totalC=entries.reduce(function(s,e){return s+(e.count||0);},0);

function addE(catId,d){sEn(function(p){return p.concat([{id:"ce-"+Date.now()+"-"+Math.random().toString(36).slice(2,5),catId:catId,name:d.name,website:d.website,count:null,priority:p.filter(function(e){return e.catId===catId;}).length+1}]);});}
function rmE(id){sEn(function(p){return p.filter(function(e){return e.id!==id;});});}
function updC(id,v){var n=parseInt(v,11);sEn(function(p){return p.map(function(e){return e.id===id?Object.assign({},e,{count:isNaN(n)?null:n}):e;});});}
function catE(catId){return entries.filter(function(e){return e.catId===catId;});}

function login(){var e=email.trim().toLowerCase();if(!e){sErr("Please enter your Fora email.");return;}if(EMAILS.indexOf(e)===-1&&!e.endsWith("@fora.travel")){sErr("We couldn\u2019t find your email in our advisor list. If you\u2019re part of Pro Growth Lab, reach out to your program lead and we\u2019ll get you set up.");return;}sErr("");sV("quiz");}
function reveal(){sV("reveal");sRP(0);setTimeout(function(){sRP(1);},500);setTimeout(function(){sRP(2);},1400);setTimeout(function(){sRP(3);},2400);}
function next(){if(step<5)sSt(step+1);else reveal();}

var filteredActions=phFilter==="all"?ACTIONS:ACTIONS.filter(function(a){return a.ph===phFilter;});

/* ═══ LOGIN ═══ */
if(view==="login")return(
<div style={{fontFamily:F,color:T.tP,background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column"}}><style>{CSS}</style>
<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{width:380,padding:40}}>
<div style={{textAlign:"center",marginBottom:40}}><p style={{fontSize:11,fontWeight:600,color:T.tS,letterSpacing:"0.05em",marginBottom:9}}>PRO GROWTH LAB</p><h1 style={{fontSize:24,fontWeight:700,lineHeight:"32px",marginBottom:9}}>Welcome to your network</h1><p style={{fontSize:13,color:T.tS,lineHeight:"20px"}}>Sign in with your Fora advisor email to get started.</p></div>
<div style={{marginBottom:20}}><label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:9}}>Email address</label><div style={{position:"relative"}}><Mail size={15} color={T.tS} style={{position:"absolute",left:13,top:13}}/><input value={email} onChange={function(e){sE(e.target.value);sErr("");}} onKeyDown={function(e){if(e.key==="Enter")login();}} placeholder="you@fora.travel" style={{width:"100%",padding:"11px 15px 11px 38px",borderRadius:R.input,border:"1px solid "+(err?T.tNeg:T.bP),fontSize:15,fontFamily:F,boxSizing:"border-box",outline:"none"}} tabIndex={0}/></div>{err&&<div style={{display:"flex",gap:9,alignItems:"flex-start",marginTop:9,padding:"11px 13px",background:"#FFE6E6",borderRadius:R.card,border:"1px solid "+T.tNeg}}><AlertCircle size={15} color={T.tNeg} style={{flexShrink:0,marginTop:1}}/><p style={{fontSize:11,color:T.tNeg,lineHeight:"18px"}}>{err}</p></div>}</div>
<button onClick={login} style={{width:"100%",padding:"13px 20px",borderRadius:R.btn,border:"none",background:T.bgP,color:T.tI,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:F,marginBottom:18,minHeight:44}} tabIndex={0}>Sign in</button>
<p style={{fontSize:11,color:T.tS,textAlign:"center"}}>Available to invited Pro Growth Lab advisors only.</p>
<div style={{marginTop:32,padding:13,background:T.bgS2,borderRadius:R.card}}><p style={{fontSize:11,color:T.tS}}>Demo: try <span style={{fontWeight:600}}>demo@fora.travel</span></p></div>
</div></div><Footer/></div>);

/* ═══ REVEAL (§5.3 hero, §6.5 loading) ═══ */
if(view==="reveal")return(
<div style={{fontFamily:F,color:T.tP,background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column"}}><style>{CSS}</style>
<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
{rp<1&&<div style={{textAlign:"center"}}><div style={{width:40,height:40,border:"3px solid "+T.bP,borderTopColor:T.bgP,borderRadius:"50%",animation:"shimmer 0.8s linear infinite",margin:"0 auto 18px"}}/><p style={{fontSize:13,color:T.tS}}>Building your network map...</p></div>}
{rp>=1&&<div style={{textAlign:"center",marginBottom:48,animation:"fadeUp 0.8s ease both"}}>
<p style={{fontSize:11,fontWeight:600,color:T.tS,letterSpacing:"0.05em",marginBottom:20}}>Your network</p>
<div style={{fontSize:45,fontWeight:700,color:T.tP,lineHeight:1,marginBottom:13,animation:"countPop 0.6s ease both"}}><AnimCount value={entries.length} dur={1200}/></div>
<p style={{fontSize:20,color:T.tS}}>{entries.length===1?"community":"communities"}</p>
</div>}
{rp>=2&&<div style={{display:"flex",flexWrap:"wrap",gap:13,justifyContent:"center",maxWidth:640,marginBottom:48}}>
{entries.map(function(e,i){var cat=CATS.find(function(c){return c.id===e.catId;});return(
<div key={e.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 18px",background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,animation:"nodeReveal 0.5s ease both",animationDelay:(i*130)+"ms"}}>
<div style={{width:30,height:30,borderRadius:"50%",background:cat.light,display:"flex",alignItems:"center",justifyContent:"center"}}><cat.icon size={13} color={cat.color} strokeWidth={1.5}/></div>
<div><p style={{fontSize:13,fontWeight:600}}>{e.name}</p>{e.website&&<p style={{fontSize:11,color:T.tInfo}}>{e.website}</p>}</div>
</div>);})}
</div>}
{rp>=3&&<div style={{textAlign:"center",animation:"fadeUp 0.6s ease both"}}>
{totalC>0&&<p style={{fontSize:15,color:T.tS,marginBottom:18}}>That\u2019s roughly <span style={{fontWeight:700,color:T.tPos}}>{totalC}</span> people you already know.</p>}
<button onClick={function(){sV("dashboard");}} style={{display:"inline-flex",alignItems:"center",gap:9,padding:"15px 32px",borderRadius:R.btn,border:"none",background:T.bgP,color:T.tI,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:F,minHeight:44}} tabIndex={0}>Explore your outreach plan <ChevronRight size={15}/></button>
</div>}
</div><Footer/></div>);

/* ═══ QUIZ ═══ */
if(view==="quiz"){var STS=[{id:1,t:"Welcome",s:"Let\u2019s map your network"},{id:2,t:"Your communities",s:"Add the groups and communities you\u2019re part of"},{id:3,t:"Your world",s:"Tell us about your interests"},{id:4,t:"Your network size",s:"How many people are in each community?"},{id:5,t:"Your travel focus",s:"What do you want to be known for?"}];
return(
<div style={{fontFamily:F,color:T.tP,background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column"}}><style>{CSS}</style>
<Header right={null}/>
<div className="layout-main" style={{display:"flex",gap:40,padding:"32px 24px",flex:1}}>
<div style={{flex:1,maxWidth:500}}>
<div style={{display:"flex",gap:4,marginBottom:32}}>{STS.map(function(s){return <div key={s.id} style={{flex:1,height:2,borderRadius:1,background:step>s.id?T.tPos:step===s.id?T.bgP:T.bgS3,transition:"background 0.3s"}}/>;})}</div>
<p style={{fontSize:11,fontWeight:600,color:T.tS,letterSpacing:"0.04em",marginBottom:9}}>Step {step} of 5</p>
<h1 style={{fontSize:30,fontWeight:700,lineHeight:"48px",marginBottom:4}}>{STS[step-1].t}</h1>
<p style={{fontSize:15,color:T.tS,lineHeight:"24px",marginBottom:32}}>{STS[step-1].s}</p>

{step===1&&<div style={{background:T.bgBL,border:"1px solid "+T.bB,borderRadius:R.card,padding:24}}><div style={{display:"flex",alignItems:"center",gap:11,marginBottom:18}}><Sparkles size={18} color={T.tAI}/><span style={{fontSize:15,fontWeight:600,color:T.tBP}}>Welcome to Pro Growth Lab</span></div><p style={{fontSize:15,lineHeight:"24px",color:T.tBS,marginBottom:20}}>Every community you share helps us build your personalized outreach plan. Watch your network grow as you answer each question.</p><p style={{fontSize:13,color:T.tBS}}>Takes about 5 minutes</p></div>}

{step===2&&<div><p style={{fontSize:15,lineHeight:"24px",marginBottom:20}}>Select a category, then add as many communities as you like.</p><div style={{display:"flex",flexDirection:"column",gap:9}}>{CATS.map(function(cat){var exp=expCats.includes(cat.id);var ce=catE(cat.id);var Icon=cat.icon;return(<div key={cat.id} style={{borderRadius:R.card,border:"1px solid "+(exp?cat.color:T.bP),overflow:"hidden"}}><div onClick={function(){sEC(function(p){return p.includes(cat.id)?p.filter(function(c){return c!==cat.id;}):p.concat([cat.id]);});}} role="button" tabIndex={0} onKeyDown={function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();sEC(function(p){return p.includes(cat.id)?p.filter(function(c){return c!==cat.id;}):p.concat([cat.id]);});}}} style={{display:"flex",alignItems:"center",gap:13,padding:"15px 18px",background:exp?cat.light:T.bg,cursor:"pointer",minHeight:44}}><div style={{width:32,height:32,borderRadius:"50%",background:exp?"rgba("+h2r(cat.color)+",0.15)":T.bgS2,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={15} color={exp?cat.color:T.tS} strokeWidth={1.5}/></div><span style={{flex:1,fontSize:15,fontWeight:exp?600:400,color:exp?cat.color:T.tP}}>{cat.name}</span>{ce.length>0&&<span style={bdg(cat.light,cat.color)}>{ce.length}</span>}<ChevronRight size={13} color={T.tS} style={{transform:exp?"rotate(90deg)":"rotate(0)",transition:"transform 0.2s"}}/></div>{exp&&<div style={{padding:"11px 15px 15px",background:cat.light}}>{ce.map(function(entry,idx){return(<div key={entry.id} style={{display:"flex",alignItems:"center",gap:9,padding:"11px 13px",background:T.bg,borderRadius:R.card,marginBottom:9,border:"1px solid "+T.bP,animation:"nodeReveal 0.3s ease both"}}><span style={bdg(cat.light,cat.color)}>{idx+1}</span><Check size={13} color={cat.color} strokeWidth={2.5}/><div style={{flex:1,minWidth:0}}><p style={{fontSize:13,fontWeight:600}}>{entry.name}</p>{entry.website&&<p style={{fontSize:11,color:T.tInfo,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{entry.website}</p>}</div><button onClick={function(ev){ev.stopPropagation();rmE(entry.id);}} style={{background:"none",border:"none",cursor:"pointer",padding:9,opacity:0.35,minHeight:44,minWidth:44}} tabIndex={0}><Trash2 size={13} color={T.tS}/></button></div>);})}<CommunityInput cat={cat} onAdd={function(d){addE(cat.id,d);}}/></div>}</div>);})}</div>{entries.length===0&&<p style={{fontSize:13,color:T.tS,marginTop:18,lineHeight:"20px"}}>Where do you spend your time outside of work? School groups, fitness classes, neighborhood circles, faith communities \u2014 select any category above to start adding.</p>}{entries.length>0&&<ProfileBar entries={entries} icp={icp} style={wStyle} phrases={phrases}/>}</div>}

{step===3&&<div><p style={{fontSize:15,marginBottom:20}}>What are your interests and hobbies?</p><div style={{display:"flex",flexWrap:"wrap",gap:9,marginBottom:24}}>{INTERESTS.map(function(name){var sel=ints.includes(name);return <button key={name} onClick={function(){sIn(function(p){return sel?p.filter(function(x){return x!==name;}):p.concat([name]);});}} style={{padding:"9px 18px",borderRadius:R.badge,fontSize:13,fontWeight:sel?600:400,border:"1px solid "+(sel?T.bgP:T.bP),background:sel?T.bgP:T.bg,color:sel?T.tI:T.tP,cursor:"pointer",fontFamily:F,minHeight:44}} tabIndex={0}>{name}</button>;})}</div></div>}

{step===4&&<div><p style={{fontSize:15,marginBottom:20,lineHeight:"24px"}}>Estimate how many people are in each community. This helps us size your outreach plan.</p>{entries.map(function(e){var cat=CATS.find(function(c){return c.id===e.catId;});var Icon=cat.icon;return(<div key={e.id} style={{display:"flex",alignItems:"center",gap:13,padding:"15px 0",borderBottom:"1px solid "+T.bgS2}}><div style={{width:30,height:30,borderRadius:"50%",background:cat.light,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={13} color={cat.color} strokeWidth={1.5}/></div><span style={{flex:1,fontSize:13}}>{e.name}</span><input type="number" value={e.count||""} onChange={function(ev){updC(e.id,ev.target.value);}} placeholder="0" min="0" max="999" style={{width:64,padding:"9px 11px",borderRadius:R.input,border:"1px solid "+T.bP,fontSize:15,fontWeight:600,textAlign:"center",fontFamily:F,color:cat.color,outline:"none"}} tabIndex={0}/><span style={{fontSize:11,color:T.tS}}>people</span></div>);})}{totalC>0&&<div style={{background:T.bgBL,border:"1px solid "+T.bB,borderRadius:R.card,padding:20,marginTop:20,textAlign:"center"}}><p style={{fontSize:30,fontWeight:700,color:T.tBP,lineHeight:"48px"}}>{totalC}</p><p style={{fontSize:13,color:T.tBS}}>total estimated connections</p></div>}</div>}

{step===5&&<div><p style={{fontSize:15,marginBottom:20}}>What type of travel do you want to be known for?</p><div style={{display:"flex",flexWrap:"wrap",gap:9}}>{SPECS.map(function(name){var sel=specs.includes(name);return <button key={name} onClick={function(){sSp(function(p){return sel?p.filter(function(x){return x!==name;}):p.concat([name]);});}} style={{padding:"9px 18px",borderRadius:R.badge,fontSize:13,fontWeight:sel?600:400,border:"1px solid "+(sel?T.bgP:T.bP),background:sel?T.bgP:T.bg,color:sel?T.tI:T.tP,cursor:"pointer",fontFamily:F,minHeight:44}} tabIndex={0}>{name}</button>;})}</div></div>}

<div style={{display:"flex",justifyContent:"space-between",marginTop:32}}>{step>1?<button onClick={function(){sSt(step-1);}} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 20px",borderRadius:R.btn,border:"1px solid "+T.bP,background:"transparent",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:F,color:T.tP,minHeight:44}} tabIndex={0}><ChevronLeft size={15}/> Back</button>:<div/>}<button onClick={next} disabled={step===2&&entries.length===0} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 24px",borderRadius:R.btn,border:"none",background:T.bgP,color:T.tI,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:F,opacity:step===2&&entries.length===0?0.4:1,minHeight:44}} tabIndex={0}>{step===5?"See my network":"Continue"} <ChevronRight size={15}/></button></div>
</div>
{/* Sidebar preview */}
<div className="quiz-sidebar" style={{flex:1,position:"sticky",top:32,alignSelf:"flex-start"}}><div style={{padding:24,background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card}}><p style={{fontSize:11,fontWeight:600,color:T.tS,letterSpacing:"0.04em",marginBottom:18}}>Network preview</p>{entries.length===0?<div style={{padding:"40px 20px",textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",gap:13,marginBottom:18}}>{[1,2,3].map(function(i){return <div key={i} style={{width:40,height:40,borderRadius:"50%",border:"2px dashed "+T.bP,animation:"ghostPulse 2s ease-in-out infinite",animationDelay:(i*300)+"ms"}}/>;})}</div><p style={{fontSize:13,color:T.tS}}>Your communities will appear here as you add them.</p></div>:<div style={{display:"flex",flexDirection:"column",gap:9}}><div style={{display:"flex",alignItems:"center",gap:11,padding:"11px 15px",borderRadius:R.card,background:T.bgBL,border:"1px solid "+T.bB}}><Briefcase size={13} color={T.tBP} strokeWidth={1.5}/><span style={{fontSize:13,fontWeight:600,color:T.tBP,fontFamily:F}}>Fora Travel</span></div>{entries.map(function(e,i){var cat=CATS.find(function(c){return c.id===e.catId;});return(<div key={e.id} className="glass-node" style={{display:"flex",alignItems:"center",gap:11,padding:"11px 15px",borderRadius:R.card,background:"rgba("+h2r(cat.color)+",0.04)",backdropFilter:"blur(15px) saturate(130%)",WebkitBackdropFilter:"blur(15px) saturate(130%)",border:"1px solid rgba("+h2r(cat.color)+",0.12)",animation:"nodeReveal 0.4s ease both",animationDelay:(i*110)+"ms"}}><cat.icon size={13} color={cat.color} strokeWidth={1.5}/><span style={{fontSize:13,fontWeight:600,color:T.tP,fontFamily:F}}>{e.name}</span>{e.count>0&&<span style={{fontSize:9,color:cat.color,fontWeight:700,marginLeft:"auto"}}>{e.count}</span>}</div>);})}</div>}</div></div>
</div><Footer/></div>);}

/* ═══ DASHBOARD ═══ */
return(
<div style={{fontFamily:F,color:T.tP,background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column",maxWidth:1200,margin:"0 auto"}}><style>{CSS}</style>
<Header right={<span style={{fontSize:11,color:T.tPos,fontWeight:600}}>{entries.length} communities</span>}/>
<div style={{display:"flex",gap:0,borderBottom:"1px solid "+T.bP,padding:"0 24px",overflowX:"auto"}}>{[{id:"map",label:"Network map",icon:Users},{id:"calendar",label:"Outreach plan",icon:Calendar},{id:"scripts",label:"DM scripts",icon:MessageCircle},{id:"learn",label:"Insights & resources",icon:BookOpenCheck},{id:"profile",label:"Your profile",icon:User}].map(function(t){var a=tab===t.id;return <button key={t.id} onClick={function(){sTab(t.id);}} style={{display:"flex",alignItems:"center",gap:7,padding:"15px 20px",fontSize:13,fontWeight:a?600:400,color:a?T.tP:T.tS,background:"none",border:"none",borderBottom:a?"2px solid "+T.bgP:"2px solid transparent",cursor:"pointer",fontFamily:F,whiteSpace:"nowrap",minHeight:44}} tabIndex={0}><t.icon size={13} strokeWidth={1.5}/> {t.label}</button>;})}</div>

<div style={{padding:24,flex:1}}>

{/* ═══ MAP TAB (§5.3 hero 60%+ viewport) ═══ */}
{tab==="map"&&<div>
<h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Your network</h2>
<p style={{fontSize:13,color:T.tS,marginBottom:20,lineHeight:"20px"}}>Select any community to see details and personalized outreach strategies.</p>
{/* Network map — hero, full width */}
<div style={{padding:24,background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,marginBottom:18,minHeight:320}}>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:13}}>
<div style={{width:52,height:52,borderRadius:"50%",background:T.bgP,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:4}}><span style={{color:T.tI,fontSize:18,fontWeight:700,fontFamily:F}}>R</span></div>
{/* SVG bezier connections (§5.7) */}
<svg width="100%" height={Math.max(entries.length*60+20,80)} viewBox={"0 0 400 "+Math.max(entries.length*60+20,80)} style={{overflow:"visible"}}>
{entries.map(function(e,i){var cat=CATS.find(function(c){return c.id===e.catId;});var y=i*60+30;return <path key={"p"+e.id} d={"M 200 0 Q 200 "+y/2+" "+(i%2===0?140:260)+" "+y} fill="none" stroke={cat.color} strokeWidth="1" strokeDasharray="4 4" opacity="0.3"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/></path>;})}
{entries.map(function(e,i){var cat=CATS.find(function(c){return c.id===e.catId;});var isA=activeNode===e.id;var x=i%2===0?140:260;var y=i*60+30;return <g key={"g"+e.id} onClick={function(){sAN(isA?null:e.id);}} style={{cursor:"pointer"}} tabIndex={0} role="button"><rect x={x-90} y={y-18} width={180} height={36} rx={R.card} fill={isA?"rgba("+h2r(cat.color)+",0.08)":T.bg} stroke={isA?cat.color:T.bP} strokeWidth={isA?1.5:1} className="glass-node"/><circle cx={x-70} cy={y} r={11} fill={cat.light}/><text x={x-70} y={y} textAnchor="middle" dominantBaseline="central" fontSize="9" fill={cat.color} fontFamily={F}><cat.icon size={9}/></text><text x={x-50} y={y-4} fontSize="13" fontWeight="600" fill={T.tP} fontFamily={F}>{e.name.length>18?e.name.slice(0,18)+"\u2026":e.name}</text>{e.count>0&&<text x={x+70} y={y} textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="700" fill={cat.color} fontFamily={F}>{e.count}</text>}<text x={x-50} y={y+11} fontSize="9" fill={T.tS} fontFamily={F}>{cat.name}</text></g>;})}
{entries.length===0&&<g>{[0,1,2].map(function(i){return <circle key={i} cx={200} cy={30+i*50} r={20} fill="none" stroke={T.bP} strokeWidth="2" strokeDasharray="6 4" style={{animation:"ghostPulse 2s ease-in-out infinite",animationDelay:(i*300)+"ms"}}/>;})}<text x={200} y={180} textAnchor="middle" fontSize="13" fill={T.tS} fontFamily={F}>Select communities to start</text></g>}
</svg>
</div></div>
{/* Detail panel (overlay on click, not permanent sidebar) */}
{activeNode&&(function(){var e=entries.find(function(x){return x.id===activeNode;});if(!e)return null;var cat=CATS.find(function(c){return c.id===e.catId;});return(
<div style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20,marginBottom:18,animation:"fadeUp 0.3s ease both"}}>
<div style={{display:"flex",alignItems:"center",gap:11,marginBottom:18}}><div style={{width:36,height:36,borderRadius:"50%",background:cat.light,display:"flex",alignItems:"center",justifyContent:"center"}}><cat.icon size={18} color={cat.color} strokeWidth={1.5}/></div><div style={{flex:1}}><p style={{fontSize:15,fontWeight:600}}>{e.name}</p><span style={bdg(cat.light,cat.color)}>{cat.name}</span></div><button onClick={function(){sAN(null);}} style={{background:"none",border:"none",cursor:"pointer",padding:9,minHeight:44,minWidth:44}} tabIndex={0}><X size={15} color={T.tS}/></button></div>
{e.website&&<div style={{display:"flex",alignItems:"center",gap:7,padding:"9px 13px",background:T.bgS2,borderRadius:R.card,marginBottom:18}}><Globe size={11} color={T.tInfo}/><a href={"https://"+e.website.replace(/^https?:\/\//,"")} target="_blank" rel="noopener" style={{fontSize:11,color:T.tInfo,textDecoration:"none",fontFamily:F}}>{e.website}</a></div>}
<div style={{display:"flex",gap:24,marginBottom:20}}><div><p style={{fontSize:24,fontWeight:700,color:cat.color}}>{e.count||"\u2014"}</p><p style={{fontSize:11,color:T.tS}}>Estimated connections</p></div></div>
<div style={{background:T.bgAI,border:"1px solid rgba(124,58,237,0.15)",borderRadius:R.card,padding:18}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:11}}><Sparkles size={13} color={T.tAI}/><span style={{fontSize:13,fontWeight:600,color:T.tAI}}>Expand your network</span></div><p style={{fontSize:13,color:T.tS,lineHeight:"20px",marginBottom:13}}>Share a few more details about this community to unlock more personalized outreach strategies.</p><button style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"11px 18px",borderRadius:R.btn,border:"none",background:T.bgAIS,color:T.tI,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:F,minHeight:44}} tabIndex={0}><Sparkles size={11}/> Answer 3 more questions</button></div>
</div>);})()}
</div>}

{/* ═══ CALENDAR TAB ═══ */}
{tab==="calendar"&&<div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><div><h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Your outreach plan</h2><p style={{fontSize:13,color:T.tS,lineHeight:"20px"}}>Relationship building across Plant, Grow, and Convert phases.</p></div><div style={{display:"flex",gap:7}}>{["all","Plant","Grow","Convert"].map(function(f){var a=phFilter===f;return <button key={f} onClick={function(){sPF(f);}} style={{padding:"7px 15px",borderRadius:R.badge,fontSize:11,fontWeight:a?600:400,border:"1px solid "+(a?T.bgP:T.bP),background:a?T.bgP:T.bg,color:a?T.tI:T.tP,cursor:"pointer",fontFamily:F,minHeight:36}} tabIndex={0}>{f==="all"?"All":f}</button>;})}</div></div>
<div style={{display:"flex",flexDirection:"column",gap:9}}>{filteredActions.map(function(a){var cat=a.cc?CATS.find(function(c){return c.id===a.cc;}):null;var phColors={Plant:{bg:T.bgPos,fg:T.tPos},Grow:{bg:T.bgAI,fg:T.tAI},Convert:{bg:T.bgIP,fg:T.tIP}};var pc=phColors[a.ph];return(
<div key={a.id} style={{padding:"18px 20px",background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,borderLeft:"3px solid "+(cat?cat.color:T.tS)}}>
<div style={{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap"}}><span style={bdg(T.bgS2,T.tS)}>{a.day}</span>{cat&&<span style={bdg(cat.light,cat.color)}>{cat.name.split(" ")[0]}</span>}<span style={bdg(pc.bg,pc.fg)}>{a.ph}</span><span style={Object.assign({},bdg(T.bg,T.tS),{border:"1px solid "+T.bP})}><Clock size={9}/> {a.t} min</span></div>
<p style={{fontSize:13,lineHeight:"20px"}}>{a.text}</p>
</div>);})}</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24,padding:"18px 0",borderTop:"1px solid "+T.bgS2}}><p style={{fontSize:13,color:T.tS}}>Ready to start reaching out?</p><button onClick={function(){sTab("scripts");}} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 20px",borderRadius:R.btn,border:"none",background:T.bgP,color:T.tI,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:F,minHeight:44}} tabIndex={0}>View DM scripts <ChevronRight size={13}/></button></div>
</div>}

{/* ═══ DM SCRIPTS TAB ═══ */}
{tab==="scripts"&&<div>
<h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>DM scripts for your communities</h2>
<p style={{fontSize:13,color:T.tS,marginBottom:24,lineHeight:"20px"}}>Three tiers \u2014 pick the one that fits where you are in the relationship.</p>
<div style={{display:"flex",flexDirection:"column",gap:18}}>{DMS.map(function(s,i){var tc=[{bg:T.bgPos,fg:T.tPos},{bg:T.bgAI,fg:T.tAI},{bg:T.bgIP,fg:T.tIP}][i];return(
<div key={i} style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20}}>
<div style={{display:"flex",gap:9,alignItems:"center",marginBottom:13}}><span style={bdg(tc.bg,tc.fg)}>{s.tier}</span><span style={{fontSize:11,color:T.tS}}>{s.tone}</span></div>
<div style={{background:T.bgS2,borderRadius:R.card,padding:18,marginBottom:13}}><p style={{fontSize:13,lineHeight:"20px",fontStyle:"italic"}}>{"\u201C"}{s.text}{"\u201D"}</p></div>
<div style={{display:"flex",alignItems:"flex-start",gap:11,padding:"13px 15px",background:T.bgBL,borderRadius:R.card,border:"1px solid "+T.bB}}><Info size={13} color={T.tBS} style={{flexShrink:0,marginTop:2}}/><div><p style={{fontSize:11,fontWeight:600,color:T.tBP,marginBottom:4}}>Why it works</p><p style={{fontSize:11,color:T.tBS,lineHeight:"18px"}}>{s.why}</p></div></div>
<button style={{display:"inline-flex",alignItems:"center",gap:7,padding:"9px 18px",marginTop:13,borderRadius:R.btn,border:"1px solid "+T.bP,background:"transparent",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:F,color:T.tS,minHeight:44}} tabIndex={0}>Copy to clipboard</button>
</div>);})}</div></div>}

{/* ═══ INSIGHTS & RESOURCES TAB (§3.10 USC content) ═══ */}
{tab==="learn"&&<div>
<h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Insights & resources</h2>
<p style={{fontSize:13,color:T.tS,marginBottom:24,lineHeight:"20px"}}>Frameworks and strategies from leading advisor coaches to sharpen your outreach.</p>
<div style={{display:"flex",flexDirection:"column",gap:13}}>{USC_CONTENT.map(function(c,i){return(
<div key={i} style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}><h3 style={{fontSize:15,fontWeight:600,lineHeight:"24px"}}>{c.title}</h3><ArrowUpRight size={15} color={T.tInfo}/></div>
<p style={{fontSize:13,color:T.tS,lineHeight:"20px",marginBottom:13}}>{c.desc}</p>
<span style={{fontSize:9,fontWeight:600,color:T.tBS}}>{c.source}</span>
</div>);})}</div></div>}

{/* ═══ PROFILE TAB (§3.9 gamification, AP-001 through AP-004) ═══ */}
{tab==="profile"&&<div className="layout-main" style={{display:"flex",gap:24}}>
<div style={{flex:1}}>
<h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Your advisor profile</h2>
<p style={{fontSize:13,color:T.tS,marginBottom:24,lineHeight:"20px"}}>This powers your personalized outreach plan. Edit anything to refine your recommendations.</p>
<div style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20,marginBottom:18}}><p style={{fontSize:15,fontWeight:600,marginBottom:13}}>Travel specialties</p><div style={{display:"flex",flexWrap:"wrap",gap:7}}>{specs.map(function(s){return <span key={s} style={bdg(T.bgS2,T.tP)}>{s}</span>;})}</div></div>
<div style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20,marginBottom:18}}><p style={{fontSize:15,fontWeight:600,marginBottom:13}}>Interests & hobbies</p><div style={{display:"flex",flexWrap:"wrap",gap:7}}>{ints.map(function(s){return <span key={s} style={bdg(T.bgS2,T.tP)}>{s}</span>;})}</div></div>
<div style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20,marginBottom:18}}><p style={{fontSize:15,fontWeight:600,marginBottom:13}}>Communities ({entries.length})</p>{entries.map(function(e){var cat=CATS.find(function(c){return c.id===e.catId;});return <div key={e.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid "+T.bgS2}}><div style={{display:"flex",alignItems:"center",gap:9}}><cat.icon size={11} color={cat.color} strokeWidth={1.5}/><span style={{fontSize:13}}>{e.name}</span></div>{e.count>0&&<span style={{fontSize:11,color:T.tS}}>{e.count} people</span>}</div>;})}</div>
<div style={{background:T.bgBL,border:"1px solid "+T.bB,borderRadius:R.card,padding:20,marginBottom:18}}><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:13}}><Target size={15} color={T.tBP} strokeWidth={1.5}/><p style={{fontSize:15,fontWeight:600,color:T.tBP}}>Ideal client profile</p></div><p style={{fontSize:13,color:T.tBS,marginBottom:11,lineHeight:"20px"}}>Describe your ideal client. This helps us tailor your outreach strategies.</p><textarea value={icp} onChange={function(e){sICP(e.target.value);}} placeholder="e.g., High-net-worth families in Westchester who travel 3+ times per year, prefer luxury resorts, and have school-age children." rows={3} style={{width:"100%",padding:"11px 15px",borderRadius:R.input,border:"1px solid "+T.bB,fontSize:13,fontFamily:F,boxSizing:"border-box",outline:"none",resize:"vertical",lineHeight:"20px",background:T.bg}} tabIndex={0}/></div>
<div style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20,marginBottom:18}}><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:13}}><Pen size={15} color={T.tP} strokeWidth={1.5}/><p style={{fontSize:15,fontWeight:600}}>Writing style</p></div><p style={{fontSize:13,color:T.tS,marginBottom:11,lineHeight:"20px"}}>How do you naturally write to clients? This powers your DM scripts and email drafts.</p><textarea value={wStyle} onChange={function(e){sWS(e.target.value);}} placeholder="e.g., Warm and conversational. I use exclamation points sparingly. I call clients by first name." rows={3} style={{width:"100%",padding:"11px 15px",borderRadius:R.input,border:"1px solid "+T.bP,fontSize:13,fontFamily:F,boxSizing:"border-box",outline:"none",resize:"vertical",lineHeight:"20px"}} tabIndex={0}/></div>
<div style={{background:T.bg,border:"1px solid "+T.bP,borderRadius:R.card,padding:20}}><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:13}}><Sparkles size={15} color={T.tAI} strokeWidth={1.5}/><p style={{fontSize:15,fontWeight:600}}>Brand phrases & voice</p></div><p style={{fontSize:13,color:T.tS,marginBottom:11,lineHeight:"20px"}}>Words and phrases you always use (or never use) when talking to clients.</p><textarea value={phrases} onChange={function(e){sPh(e.target.value);}} placeholder={"e.g., Always say: \u201Clet me handle everything\u201D, \u201Ccurated for you\u201D\nNever say: \u201Ccheap\u201D, \u201Cdeal\u201D, \u201Cbudget\u201D"} rows={3} style={{width:"100%",padding:"11px 15px",borderRadius:R.input,border:"1px solid "+T.bP,fontSize:13,fontFamily:F,boxSizing:"border-box",outline:"none",resize:"vertical",lineHeight:"20px"}} tabIndex={0}/></div>
</div>
<div className="detail-panel" style={{width:320,flexShrink:0}}>
<div style={{background:T.bgBL,border:"1px solid "+T.bB,borderRadius:R.card,padding:20,position:"sticky",top:32}}>
<div style={{display:"flex",alignItems:"center",gap:11,marginBottom:20}}><div style={{width:44,height:44,borderRadius:"50%",background:T.bgP,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:T.tI,fontSize:18,fontWeight:700,fontFamily:F}}>R</span></div><div><p style={{fontSize:15,fontWeight:700,color:T.tBP}}>Rachel Kim</p><p style={{fontSize:11,color:T.tBS}}>Fora Travel Advisor</p></div></div>
<ProfileBar entries={entries} icp={icp} style={wStyle} phrases={phrases}/>
<div style={{borderTop:"1px solid "+T.bB,paddingTop:18,marginTop:18}}><p style={{fontSize:11,fontWeight:600,color:T.tBS,marginBottom:11}}>Your network</p><p style={{fontSize:24,fontWeight:700,color:T.tBP}}>{entries.length}</p><p style={{fontSize:11,color:T.tBS}}>communities</p>{totalC>0&&<div style={{marginTop:9}}><p style={{fontSize:20,fontWeight:700,color:T.tBP}}>{totalC}</p><p style={{fontSize:11,color:T.tBS}}>estimated connections</p></div>}</div>
</div></div>
</div>}
</div><Footer/></div>);
}
