"use client";
import { useState } from "react";
import Link from "next/link";
var T={bg:"#FFFFFF",bg2:"#F2F2F2",bgP:"#212121",bgBL:"#FAF6F2",bgBD:"#423A31",bgPos:"#F0F9F4",bgProg:"#FFF2CC",bgAI:"#F5F3FF",t1:"#212121",t2:"#636363",tb1:"#423A31",tb2:"#63574A",tPos:"#337E53",tProg:"#664D00",tAI:"#7C3AED",tLink:"#2166DB",brd:"#D8D8D8",brdB:"#DBD1C6"};
var SLOTS=[{n:1,t:"Sign up and onboarding",d:"Login, 5-step quiz with progressive network map, animated insights reveal.",p:"Onboarding",pc:{bg:T.bgBL,c:T.tb2}},{n:2,t:"Home dashboard",d:"Navigation hub with profile completeness, community stats, social links, quick actions.",p:"Dashboard",pc:{bg:T.bgPos,c:T.tPos}},{n:3,t:"Network map",d:"Full-page glassmorphic bubble visualization with clickable community detail panels.",p:"Network",pc:{bg:T.bgAI,c:T.tAI}},{n:4,t:"Action calendar",d:"7-column weekly calendar grid with Plant, Grow, Convert phases plus GCal export.",p:"Calendar",pc:{bg:T.bgProg,c:T.tProg}},{n:5,t:"Advisor profile",d:"Ideal client, writing style, brand phrases, 8 social links, profile completeness gamification.",p:"Profile",pc:{bg:T.bg2,c:T.t2}}];
function IcoHome(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;}
function IcoMap(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;}
function IcoCal(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;}
function IcoUser(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;}
function IcoStar(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>;}
function SB({icon:I,label:l,href:h}){return <button onClick={function(){if(h)window.location.href=h;}} title={l} style={{width:36,height:36,borderRadius:8,border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2}}><I/></button>;}
export default function Hub(){var[hov,sH]=useState(null);return(
<div style={{display:"flex",minHeight:"100vh",fontFamily:"'Lato',system-ui,sans-serif",color:T.t1}}>
<style>{"@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{margin:0}a{text-decoration:none;color:inherit}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}"}</style>
<nav style={{width:48,background:T.bg,borderRight:"1px solid "+T.brd,display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:4,flexShrink:0,position:"sticky",top:0,height:"100vh"}}>
<div style={{width:28,height:28,borderRadius:"50%",background:T.bgBD,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><span style={{color:"#FFF",fontSize:12,fontWeight:700}}>F</span></div>
<SB icon={IcoHome} label="Home"/><SB icon={IcoMap} label="Network" href="/slot-3"/><SB icon={IcoCal} label="Calendar" href="/slot-4"/><SB icon={IcoUser} label="Profile" href="/slot-5"/>
<div style={{flex:1}}/><div style={{color:T.tAI}}><SB icon={IcoStar} label="AI"/></div>
</nav>
<div style={{flex:1,display:"flex",flexDirection:"column"}}>
<header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 32px",borderBottom:"1px solid "+T.brd,background:T.bg,position:"sticky",top:0,zIndex:10}}>
<span style={{fontSize:15,fontWeight:600}}>Welcome, Rachel!</span>
<div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:9,fontWeight:700,color:T.tProg,background:T.bgProg,padding:"2px 10px",borderRadius:9999}}>BETA</span><span style={{fontSize:11,color:T.t2}}>Pro Growth Lab</span></div>
</header>
<main style={{flex:1,padding:"32px 32px 48px",maxWidth:880}}>
<div style={{padding:"28px 32px",background:T.bgBL,border:"1px solid "+T.brdB,borderRadius:8,marginBottom:32}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
<div style={{width:44,height:44,borderRadius:"50%",background:T.tPos,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#FFF",fontSize:18,fontWeight:700}}>5</span></div>
<div><p style={{fontSize:11,fontWeight:600,color:T.tb2,letterSpacing:"0.04em"}}>PRO GROWTH LAB</p><h1 style={{fontSize:24,fontWeight:700,color:T.tb1}}>ACT Phase 1 prototypes</h1></div>
</div>
<p style={{fontSize:15,color:T.tb2,lineHeight:"24px"}}>5 interactive prototypes covering the complete advisor journey. Click any card to open.</p>
<div style={{display:"flex",gap:32,marginTop:20,paddingTop:16,borderTop:"1px solid "+T.brdB}}>
{[["5","prototypes"],["15","quiz questions"],["500","advisor seats"],["Apr 10","ship date"]].map(function(s,i){return <div key={i}><p style={{fontSize:24,fontWeight:700,color:T.tb1}}>{s[0]}</p><p style={{fontSize:11,color:T.tb2}}>{s[1]}</p></div>;})}
</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:12}}>
{SLOTS.map(function(s,i){var h=hov===s.n;return(
<Link key={s.n} href={"/slot-"+s.n}><div onMouseEnter={function(){sH(s.n);}} onMouseLeave={function(){sH(null);}} style={{display:"flex",alignItems:"center",gap:20,padding:"20px 24px",background:T.bg,border:"1px solid "+(h?T.t1:T.brd),borderRadius:8,cursor:"pointer",transition:"all 0.15s",animation:"fadeUp 0.4s ease both",animationDelay:(i*60)+"ms"}}>
<div style={{width:36,height:36,borderRadius:"50%",background:h?T.bgP:T.bg2,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s",flexShrink:0}}><span style={{fontSize:13,fontWeight:700,color:h?"#FFF":T.t1}}>{s.n}</span></div>
<div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><p style={{fontSize:15,fontWeight:600}}>{s.t}</p><span style={{fontSize:9,fontWeight:700,padding:"2px 10px",borderRadius:9999,background:s.pc.bg,color:s.pc.c}}>{s.p}</span></div><p style={{fontSize:13,color:T.t2,lineHeight:"20px"}}>{s.d}</p></div>
<div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}><span style={{fontSize:9,fontWeight:700,padding:"2px 10px",borderRadius:9999,background:T.bgPos,color:T.tPos}}>Live</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={h?T.t1:T.t2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transition:"transform 0.15s",transform:h?"translateX(3px)":"none"}}><polyline points="9 18 15 12 9 6"/></svg></div>
</div></Link>);})}
</div>
<div style={{marginTop:24,padding:20,background:T.bg2,borderRadius:8}}><p style={{fontSize:13,color:T.t2}}>Slots 6-10 available for future prototypes.</p></div>
</main>
<footer style={{padding:"16px 32px",borderTop:"1px solid "+T.brd,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,color:T.t2}}>Pro Growth Lab - Fora Travel - v1.0.0 - Apr 7, 2026</span><button onClick={function(){alert("Thank you! Your feedback has been submitted.");}} style={{fontSize:11,color:T.tLink,background:"none",border:"none",cursor:"pointer",fontFamily:"'Lato',system-ui,sans-serif"}}>Report a problem</button></footer>
</div></div>);}
