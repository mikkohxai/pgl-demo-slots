import{useState,useEffect,useRef}from"react";

/* ═══ TOKENS ═══ */
var C={w:"#FFFFFF",s1h:"#F7F7F7",s2:"#F2F2F2",bE:"#FEFAF5",bL:"#FAF6F2",br:"#F3EBE2",bS:"#63574A",bD:"#423A31",p:"#212121",pH:"#2E2E2E",pL:"#F0F9F4",ps:"#337E53",nL:"#FFE6E6",n:"#CC0000",prL:"#FFF2CC",pr:"#8F6E00",iL:"#EFF3FF",i:"#2166DB",iS:"#2C6DE8",aL:"#F5F3FF",a:"#7C3AED",aS:"#8655F6",t1:"#212121",t2:"#636363",t3:"#B1B1B1",tb1:"#423A31",tb2:"#63574A",b1:"#D8D8D8",bs:"#F5F5F5",bSel:"#212121",bBr:"#DBD1C6"};

var CATS=[
  {id:"personal",nm:"Personal & family",ic:"♥",hx:"#337E53",rg:"51,126,83"},
  {id:"professional",nm:"Professional & alumni",ic:"◼",hx:"#7C3AED",rg:"124,58,237"},
  {id:"fitness",nm:"Fitness & sports",ic:"◆",hx:"#45A86E",rg:"69,168,110"},
  {id:"religious",nm:"Religious & spiritual",ic:"▲",hx:"#8F6E00",rg:"143,110,0"},
  {id:"hobby",nm:"Hobby & interest",ic:"●",hx:"#2C6DE8",rg:"44,109,232"},
  {id:"neighborhood",nm:"Neighborhood & local",ic:"◎",hx:"#D4860A",rg:"212,134,10"},
];
function catOf(id){return CATS.find(function(c){return c.id===id})||CATS[0]}

var SEED=[
  {cat:"personal",nm:"Lakeside Elementary PTA",ct:45,freq:"Weekly",pot:9.2,web:"lakesidepta.org",details:"Co-chair of fundraising committee. 200+ families."},
  {cat:"fitness",nm:"Westchester Running Club",ct:25,freq:"3×/week",pot:7.8,web:"westchesterrc.com",details:"Saturday long runs, post-run brunch crew of ~12."},
  {cat:"professional",nm:"Stanford Alumni NYC",ct:200,freq:"Monthly",pot:6.1,web:"stanfordalumni.org/nyc",details:"Monthly mixers at The Yale Club. LinkedIn group has 4K members."},
  {cat:"hobby",nm:"Saturday Book Club",ct:12,freq:"Weekly",pot:8.4,web:"",details:"6 core members, meets at rotating homes. Travel-themed picks lately."},
];

var CSS=`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');
*{margin:0;box-sizing:border-box}body{font-family:'Lato',system-ui,sans-serif;color:#212121;background:#fff}
.ph{background:#FAF6F2;padding:5px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DBD1C6;font-size:11px;font-weight:600;color:#63574A;letter-spacing:.02em}
.b{font-size:9px;font-weight:600;padding:2px 8px;border-radius:9999px;display:inline-flex;align-items:center}
.b-ai{color:#fff;background:#8655F6}.b-beta{color:#664D00;background:#FFF2CC;border:1px solid #FFBF00}.b-pos{color:#337E53;background:#F0F9F4}
.b-plant{color:#337E53;background:#F0F9F4}.b-grow{color:#8F6E00;background:#FFF2CC}.b-convert{color:#2166DB;background:#EFF3FF}
.cd{background:#fff;border:1px solid #D8D8D8;border-radius:8px}.cb{background:#FAF6F2;border:1px solid #DBD1C6;border-radius:8px}
.bt{font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;cursor:pointer;transition:all .15s;border:none}
.bt-p{background:#212121;color:#fff;font-size:15px;padding:12px 24px}.bt-p:hover{background:#2E2E2E}
.bt-g{background:transparent;border:1px solid #D8D8D8;color:#212121}.bt-g:hover{background:#F7F7F7}
.bt:focus-visible,.gn:focus-visible{outline:2px solid #212121;outline-offset:2px}
.bt:disabled{opacity:.4;pointer-events:none}
.lk{color:#2166DB;text-decoration:none;font-weight:600;font-size:13px}.lk:hover{text-decoration:underline}
input:focus,textarea:focus{border-color:#212121;outline:none;box-shadow:0 0 0 2px rgba(33,33,33,.1)}
.inp{width:100%;padding:8px 10px;border:1px solid #D8D8D8;border-radius:6px;font-size:13px;font-family:inherit}
.gn{position:absolute;border-radius:50%;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(14px) saturate(130%);-webkit-backdrop-filter:blur(14px) saturate(130%);box-shadow:inset 0 1px 1px rgba(255,255,255,.35),0 2px 12px rgba(0,0,0,.07);transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;will-change:transform;z-index:3}
.gn:hover{transform:scale(1.14)!important;box-shadow:inset 0 1px 1px rgba(255,255,255,.5),0 8px 28px rgba(0,0,0,.12)}
@supports not(backdrop-filter:blur(1px)){.gn{backdrop-filter:none}}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
@keyframes fu{from{opacity:0;transform:translateY(14px) scale(.85)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes pls{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes shimIn{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
.footer{border-top:1px solid #F5F5F5;padding:12px 24px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#636363}
`;

function PH(){return <div className="ph"><span>💠 ProGrowthLab — Network Mapper v4.0.0</span><div style={{display:"flex",gap:8,alignItems:"center"}}><span className="b b-ai">ACT-23</span><span className="b b-beta">BETA</span><span style={{fontSize:9}}>Apr 6 2026</span></div></div>}
function Footer(){return <div className="footer"><span>Pro Growth Lab · Fora Travel · Surge 2026</span><a href="#" onClick={function(e){e.preventDefault()}} className="lk" style={{fontSize:11}}>Report a problem</a></div>}

/* ═══════════════════════════════════════════════
   HERO NETWORK MAP — Full viewport, glassmorphic
   ═══════════════════════════════════════════════ */
function HeroMap(p){
  var comms=p.comms||[];var ref=useRef(null);
  var [dim,setDim]=useState({w:600,h:500});
  var [hov,setHov]=useState(null);

  useEffect(function(){function m(){if(ref.current){setDim({w:ref.current.offsetWidth,h:ref.current.offsetHeight})}};m();window.addEventListener("resize",m);return function(){window.removeEventListener("resize",m)}},[]);

  var cx=dim.w/2,cy=dim.h/2;
  var orbit=Math.min(dim.w,dim.h)*.32;
  var nr=Math.max(28,Math.min(dim.w*.055,42));
  var cr=Math.max(32,Math.min(dim.w*.06,48));

  var pos=comms.map(function(_,i){
    var a=(i/(comms.length||1))*Math.PI*2-Math.PI/2;
    return{x:cx+Math.cos(a)*orbit,y:cy+Math.sin(a)*orbit};
  });

  return(
    <div ref={ref} style={{width:"100%",height:"100%",position:"relative",minHeight:400}}>
      {/* SVG underlay: rings + curved connections */}
      <svg width={dim.w} height={dim.h} style={{position:"absolute",top:0,left:0}}>
        <defs>
          <filter id="gl"><feGaussianBlur stdDeviation="3"/><feFlood floodOpacity=".08"/><feComposite operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          {comms.map(function(c,i){return <linearGradient key={"gr"+i} id={"lg"+i} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={c.cat.hx} stopOpacity=".3"/><stop offset="100%" stopColor={c.cat.hx} stopOpacity=".05"/></linearGradient>})}
        </defs>
        {[.35,.6,.88].map(function(s,i){return <circle key={i} cx={cx} cy={cy} r={orbit*s} fill="none" stroke={C.b1} strokeWidth={.5} opacity={.18} strokeDasharray={i<2?"4 8":"none"}/>})}
        {pos.map(function(pt,i){
          var dx=pt.x-cx,dy=pt.y-cy;
          var mx=cx+dx*.5+(i%2===0?-25:25);
          var my=cy+dy*.5+(i%2===0?20:-20);
          return <path key={i} d={"M "+cx+" "+cy+" Q "+mx+" "+my+" "+pt.x+" "+pt.y} fill="none" stroke={"url(#lg"+i+")"} strokeWidth={hov===i?2.5:1.5} filter={hov===i?"url(#gl)":"none"} style={{transition:"all .3s"}} strokeLinecap="round"/>;
        })}
      </svg>

      {/* Center "You" node */}
      <div style={{position:"absolute",left:cx-cr,top:cy-cr,width:cr*2,height:cr*2,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#FAF6F2 0%,#F3EBE2 50%,#E5DBD0 100%)",border:"1px solid "+C.bBr,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"pls 3s ease-in-out infinite",zIndex:5,boxShadow:"0 3px 16px rgba(0,0,0,.06)"}}>
        <span style={{fontSize:Math.max(18,cr*.45),fontWeight:700,color:C.tb1}}>R</span>
        {comms.length>0&&<span style={{fontSize:9,color:C.tb2,fontWeight:600}}>{comms.reduce(function(a,c){return a+(c.ct||0)},0)}</span>}
      </div>

      {/* Glass community nodes */}
      {comms.map(function(c,i){
        var pt=pos[i];var isSel=p.selected===i;var isHov=hov===i;
        return <div key={i} className="gn" tabIndex={0}
          onClick={function(){p.onSelect(isSel?null:i)}}
          onMouseEnter={function(){setHov(i)}} onMouseLeave={function(){setHov(null)}}
          onKeyDown={function(e){if(e.key==="Enter")p.onSelect(isSel?null:i)}}
          style={{left:pt.x-nr,top:pt.y-nr,width:nr*2,height:nr*2,
            background:"rgba("+c.cat.rg+","+(isSel?.22:.10)+")",
            borderStyle:"solid",borderWidth:isSel?2.5:1,
            borderColor:"rgba("+c.cat.rg+","+(isSel?.6:.25)+")",
            transform:"scale("+(isSel?1.18:1)+")",
            animation:"shimIn .5s cubic-bezier(.34,1.56,.64,1) "+(i*.12)+"s both",
            zIndex:isSel?6:3}}>
          <div style={{position:"absolute",top:"12%",left:"18%",width:"50%",height:"30%",borderRadius:"50%",background:"rgba(255,255,255,.3)",filter:"blur(3px)",pointerEvents:"none"}}/>
          <span style={{fontSize:Math.max(14,nr*.4),lineHeight:1,position:"relative",zIndex:1}}>{c.cat.ic}</span>
          <span style={{fontSize:9,fontWeight:700,color:c.cat.hx,position:"relative",zIndex:1,marginTop:2}}>{c.ct||"?"}</span>
        </div>;
      })}

      {/* Labels below nodes */}
      {comms.map(function(c,i){
        var pt=pos[i];var isSel=p.selected===i;
        return <div key={"lb"+i} style={{position:"absolute",left:pt.x-60,top:pt.y+nr+10,width:120,textAlign:"center",pointerEvents:"none",animation:"fu .5s ease "+(i*.12+.2)+"s both",zIndex:2,opacity:isSel?1:.8}}>
          <div style={{fontSize:11,fontWeight:600,color:c.cat.hx,lineHeight:"14px"}}>{c.nm.length>22?c.nm.substring(0,20)+"…":c.nm}</div>
          <div style={{fontSize:9,color:C.t2}}>{c.ct} contacts · {c.pot.toFixed(1)} score</div>
        </div>;
      })}

      {/* Empty state */}
      {comms.length===0&&<div style={{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
        <div style={{width:cr*2,height:cr*2,borderRadius:"50%",background:C.br,border:"1px solid "+C.bBr,display:"flex",alignItems:"center",justifyContent:"center",animation:"pls 3s ease-in-out infinite"}}><span style={{fontSize:24,fontWeight:700,color:C.tb1}}>?</span></div>
        <span style={{fontSize:15,color:C.t2,fontWeight:600}}>Your network map starts here</span>
        <span style={{fontSize:13,color:C.t2}}>Select communities to watch your map grow</span>
      </div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COMMUNITY DETAIL PANEL (right sidebar)
   Enrichment fields + contacts + actions
   ═══════════════════════════════════════════════ */
function CommunityPanel(p){
  var comms=p.comms;var sel=p.selected;var onSelect=p.onSelect;
  var [editIdx,setEditIdx]=useState(null);

  return(
    <div style={{height:"100%",overflow:"auto",padding:"16px 16px 16px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,paddingRight:4}}>
        <h3 style={{fontSize:15,fontWeight:700,margin:0}}>Your communities</h3>
        <span style={{fontSize:11,color:C.t2}}>{comms.length} active · {comms.reduce(function(a,c){return a+(c.ct||0)},0)} contacts</span>
      </div>

      {comms.length===0&&<div style={{padding:20,textAlign:"center"}}><p style={{fontSize:13,color:C.t2}}>No communities added yet. Select categories to begin.</p></div>}

      {comms.map(function(c,i){
        var cat=c.cat;var isOpen=sel===i;var isEdit=editIdx===i;
        return(
          <div key={i} className="cd" style={{marginBottom:10,overflow:"hidden",borderColor:isOpen?cat.hx:C.b1,borderWidth:isOpen?2:1,transition:"border-color .15s"}}>
            {/* Header row — always visible */}
            <div onClick={function(){onSelect(isOpen?null:i)}} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
              <span style={{width:28,height:28,borderRadius:"50%",background:"rgba("+cat.rg+",.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{cat.ic}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.nm}</div>
                <div style={{fontSize:11,color:C.t2}}>{c.ct} contacts · {c.freq}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <span className="b" style={{color:c.pot>=8?C.ps:C.pr,background:c.pot>=8?C.pL:C.prL}}>{c.pot.toFixed(1)}</span>
                <span style={{fontSize:11,color:C.t2,transform:isOpen?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
              </div>
            </div>

            {/* Expanded detail — enrichment fields */}
            {isOpen&&<div style={{padding:"0 14px 14px",borderTop:"1px solid "+C.bs}}>
              {/* Quick stats */}
              <div style={{display:"flex",gap:12,padding:"12px 0 10px"}}>
                <div><span style={{fontSize:18,fontWeight:700}}>{c.ct}</span><span style={{fontSize:11,color:C.t2,marginLeft:3}}>contacts</span></div>
                <div><span style={{fontSize:18,fontWeight:700,color:cat.hx}}>{c.pot.toFixed(1)}</span><span style={{fontSize:11,color:C.t2,marginLeft:3}}>potential</span></div>
                <div><span style={{fontSize:13,color:C.t2}}>{c.freq}</span></div>
              </div>

              {/* Enrichment fields */}
              <div style={{background:C.bL,borderRadius:6,padding:12,border:"1px solid "+C.bBr,marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:600,color:C.tb2,marginBottom:8}}>Community details</div>
                <div style={{marginBottom:8}}>
                  <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>Organization name</label>
                  <input className="inp" defaultValue={c.nm} style={{background:C.w}}/>
                </div>
                <div style={{marginBottom:8}}>
                  <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>Website <span style={{color:C.t3}}>(optional)</span></label>
                  <input className="inp" defaultValue={c.web||""} placeholder="https://" style={{background:C.w}}/>
                </div>
                <div style={{display:"flex",gap:8,marginBottom:8}}>
                  <div style={{flex:1}}>
                    <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>Approx. contacts</label>
                    <input className="inp" type="number" defaultValue={c.ct} style={{background:C.w}}/>
                  </div>
                  <div style={{flex:1}}>
                    <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>How often?</label>
                    <select className="inp" defaultValue={c.freq} style={{background:C.w}}><option>Daily</option><option>3×/week</option><option>Weekly</option><option>Monthly</option><option>Rarely</option></select>
                  </div>
                </div>
                <div>
                  <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>Key details <span style={{color:C.t3}}>(helps us personalize your plan)</span></label>
                  <textarea className="inp" rows={2} defaultValue={c.details||""} placeholder="Your role, who you know, any travel connections..." style={{background:C.w,resize:"vertical"}}/>
                </div>
              </div>

              {/* AI enrichment prompt */}
              <div style={{background:C.aL,borderRadius:6,padding:10,border:"1px solid rgba(124,58,237,.12)",marginBottom:10,display:"flex",alignItems:"flex-start",gap:8}}>
                <span className="b b-ai" style={{flexShrink:0,marginTop:1}}>AI</span>
                <div>
                  <div style={{fontSize:11,fontWeight:600,color:C.a}}>Expand this community</div>
                  <div style={{fontSize:11,color:C.t2,marginTop:2}}>Tell us more and we'll find better outreach opportunities. Who are the 3 people most likely to travel?</div>
                </div>
              </div>

              {/* Actions */}
              <div style={{display:"flex",gap:8}}>
                <a href="#" onClick={function(e){e.preventDefault()}} className="lk" style={{fontSize:11}}>View outreach plan →</a>
                <span style={{fontSize:11,color:C.t2}}>·</span>
                <a href="#" onClick={function(e){e.preventDefault()}} className="lk" style={{fontSize:11}}>Add key contacts →</a>
              </div>
            </div>}
          </div>
        );
      })}

      {/* Add community */}
      {comms.length>0&&<button className="bt bt-g" style={{width:"100%",marginTop:4,fontSize:13}}>+ Add another community</button>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN: LOGIN
   ═══════════════════════════════════════════════ */
function Login(p){
  var [em,setEm]=useState("rachel.kim@fora.travel");var [err,setErr]=useState("");
  function go(){if(!em.endsWith("@fora.travel")&&!em.endsWith("@foratravel.com")){setErr("Only @fora.travel emails.");return};p.next()}
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:C.w}}><PH/>
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:380}}>
        <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:30,fontWeight:700}}>FORA</div><div style={{fontSize:13,color:C.t2,marginTop:4}}>Pro Growth Lab <span className="b b-beta">BETA</span></div></div>
        <div className="cd" style={{padding:24}}>
          <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 20px"}}>Sign in</h2>
          <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:5}}>Email</label>
          <input className="inp" value={em} onChange={function(e){setEm(e.target.value);setErr("")}} style={{marginBottom:14,fontSize:15}}/>
          <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:5}}>Password</label>
          <input className="inp" type="password" defaultValue="••••••••" style={{marginBottom:8,fontSize:15}}/>
          <div style={{textAlign:"right",marginBottom:18}}><a href="#" onClick={function(e){e.preventDefault()}} className="lk" style={{fontWeight:400}}>Forgot password?</a></div>
          {err&&<div style={{background:C.nL,border:"1px solid "+C.n,borderRadius:6,padding:"8px 12px",marginBottom:14,fontSize:13,color:C.n}}>{err}</div>}
          <button className="bt bt-p" style={{width:"100%"}} onClick={go}>Sign in</button>
        </div>
      </div>
    </div><Footer/></div>;
}

/* ═══════════════════════════════════════════════
   SCREEN: QUIZ — Map hero left, questions right
   ═══════════════════════════════════════════════ */
function Quiz(p){
  var [picked,setPicked]=useState([]);
  var [consent,setConsent]=useState(false);
  var [step,setStep]=useState(0); // 0=select categories, 1=consent

  function toggle(id){setPicked(function(s){return s.includes(id)?s.filter(function(x){return x!==id}):s.concat([id])})}
  var mappedComms=picked.map(function(id){var s=SEED.find(function(c){return c.cat===id});return{cat:catOf(id),nm:s?s.nm:catOf(id).nm,ct:s?s.ct:0,freq:s?s.freq:"",pot:s?s.pot:5,web:s?s.web:"",details:s?s.details:""}});

  if(step===0)return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:C.w}}><PH/>
    <div style={{flex:1,display:"flex",minHeight:0}}>
      {/* LEFT: Map hero — 60% */}
      <div style={{flex:"3 1 0",background:C.w,position:"relative",overflow:"hidden",minHeight:500}}>
        <HeroMap comms={mappedComms} selected={null} onSelect={function(){}}/>
        {/* Overlay progress */}
        <div style={{position:"absolute",top:16,left:16,right:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,height:4,borderRadius:9999,background:C.s2,overflow:"hidden"}}><div style={{width:(picked.length/6*100)+"%",height:"100%",background:C.p,borderRadius:9999,transition:"width .3s"}}/></div>
          <span style={{fontSize:11,fontWeight:600,color:C.t2}}>{picked.length}/6</span>
        </div>
      </div>

      {/* RIGHT: Category picker — 40% */}
      <div style={{flex:"2 1 0",borderLeft:"1px solid "+C.b1,padding:24,overflow:"auto",maxWidth:420}}>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px"}}>Map your communities</h2>
        <p style={{fontSize:13,color:C.t2,margin:"0 0 20px",lineHeight:"20px"}}>Select all that apply. Each one becomes a node in your network map — watch it grow in real time.</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {CATS.map(function(cat){var on=picked.includes(cat.id);
            return <button key={cat.id} onClick={function(){toggle(cat.id)}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:8,border:on?"2px solid "+cat.hx:"1px solid "+C.b1,background:on?"rgba("+cat.rg+",.05)":C.w,cursor:"pointer",textAlign:"left",transition:"all .12s",fontFamily:"inherit"}}>
              <span style={{width:32,height:32,borderRadius:"50%",background:"rgba("+cat.rg+",.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:cat.hx,fontWeight:700,flexShrink:0}}>{cat.ic}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:on?600:400}}>{cat.nm}</div></div>
              {on&&<span style={{fontSize:13,fontWeight:600,color:cat.hx}}>✓</span>}
            </button>})}
        </div>
        <div style={{marginTop:20}}><button className="bt bt-p" disabled={picked.length<1} onClick={function(){setStep(1)}}>Continue — add details →</button></div>
      </div>
    </div></div>;

  // Step 1: Consent → generate
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:C.w}}><PH/>
    <div style={{flex:1,display:"flex",minHeight:0}}>
      <div style={{flex:"3 1 0",position:"relative",overflow:"hidden",minHeight:500}}>
        <HeroMap comms={mappedComms} selected={null} onSelect={function(){}}/>
      </div>
      <div style={{flex:"2 1 0",borderLeft:"1px solid "+C.b1,padding:24,overflow:"auto",maxWidth:420}}>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px"}}>Almost there</h2>
        <p style={{fontSize:13,color:C.t2,margin:"0 0 16px"}}>{picked.length} communities · {mappedComms.reduce(function(a,c){return a+c.ct},0)} connections</p>
        <div className="cd" style={{padding:16,marginBottom:16}}>
          <h3 style={{fontSize:13,fontWeight:600,margin:"0 0 10px"}}>Data consent</h3>
          <ul style={{fontSize:13,color:C.t2,lineHeight:"22px",paddingLeft:18,margin:"0 0 14px"}}><li><strong>Quiz responses</strong> — community names, contacts, goals, preferences</li><li><strong>AI processing</strong> — analyzed by Claude (Anthropic) for strategy generation</li><li><strong>Storage</strong> — secured in Supabase with row-level access</li><li><strong>Fora access</strong> — aggregated data for Surge measurement</li></ul>
          <label style={{display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer"}}><input type="checkbox" checked={consent} onChange={function(){setConsent(!consent)}} style={{marginTop:3,width:18,height:18,accentColor:C.p,flexShrink:0}}/><span style={{fontSize:13,lineHeight:"20px"}}>I consent to the processing of my data as described above.</span></label>
        </div>
        <button className="bt bt-p" style={{width:"100%"}} disabled={!consent} onClick={p.next}>Generate my insights →</button>
      </div>
    </div></div>;
}

/* ═══════════════════════════════════════════════
   SCREEN: DASHBOARD — Map IS the dashboard (SF-09)
   ═══════════════════════════════════════════════ */
function Dashboard(){
  var [sel,setSel]=useState(null);
  var [tab,setTab]=useState("map");
  var comms=SEED.map(function(s){return Object.assign({},s,{cat:catOf(s.cat)})});
  var [done,setDone]=useState({});

  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:C.w}}><PH/>
    {/* Top nav */}
    <nav style={{background:C.w,borderBottom:"1px solid "+C.b1,padding:"0 20px",display:"flex",alignItems:"center",gap:20}}>
      <span style={{fontSize:18,fontWeight:700,padding:"10px 0",marginRight:12}}>FORA</span>
      {[{k:"map",l:"Network map"},{k:"calendar",l:"Calendar"},{k:"profile",l:"Profile"}].map(function(t){return <button key={t.k} onClick={function(){setTab(t.k)}} style={{padding:"10px 0",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:tab===t.k?600:400,color:tab===t.k?C.t1:C.t2,borderBottom:tab===t.k?"2px solid "+C.t1:"2px solid transparent",fontFamily:"inherit"}}>{t.l}</button>})}
      <div style={{flex:1}}/>
      {/* Compact KPI strip */}
      <div style={{display:"flex",gap:16,alignItems:"center"}}>
        {[{l:"Outreach",v:"11/15"},{l:"Clients",v:"1/3"},{l:"Progress",v:"38%"}].map(function(k){return <div key={k.l} style={{fontSize:11,color:C.t2}}><span style={{fontWeight:600,color:C.t1,marginRight:3}}>{k.v}</span>{k.l}</div>})}
      </div>
      <span className="b b-beta">BETA</span>
    </nav>

    {tab==="map"&&<div style={{flex:1,display:"flex",minHeight:0}}>
      {/* LEFT: Map hero — 60% */}
      <div style={{flex:"3 1 0",position:"relative",overflow:"hidden"}}>
        {/* Welcome strip */}
        <div style={{position:"absolute",top:0,left:0,right:0,zIndex:10,padding:"10px 20px",background:"rgba(255,255,255,.92)",borderBottom:"1px solid "+C.bs,display:"flex",justifyContent:"space-between",alignItems:"center",backdropFilter:"blur(8px)"}}>
          <div><span style={{fontSize:15,fontWeight:600}}>Welcome back, Rachel</span><span style={{fontSize:11,color:C.t2,marginLeft:8}}>Week 1 of Surge · {comms.reduce(function(a,c){return a+c.ct},0)} connections mapped</span></div>
          <span className="b b-pos">On track</span>
        </div>
        <HeroMap comms={comms} selected={sel} onSelect={setSel}/>
      </div>
      {/* RIGHT: Community detail panel — 40% */}
      <div style={{flex:"2 1 0",borderLeft:"1px solid "+C.b1,overflow:"auto",maxWidth:400,minWidth:280}}>
        <CommunityPanel comms={comms} selected={sel} onSelect={setSel}/>
      </div>
    </div>}

    {tab==="calendar"&&<div style={{flex:1,padding:24,maxWidth:720,margin:"0 auto",width:"100%"}}>
      <div className="cb" style={{padding:16,marginBottom:20}}>
        <h2 style={{fontSize:18,fontWeight:700,color:C.tb1,margin:"0 0 4px"}}>Action calendar</h2>
        <p style={{fontSize:13,color:C.tb2}}>1 outreach/day × 5 days × 12 weeks = 60 touchpoints → 3 clients (3× your goal)</p>
      </div>
      <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 12px"}}>Week 1 tasks</h3>
      {SEED.length>0&&R.tasks.map(function(t,i){
        var d=done[i];var cm=t.cm?SEED.find(function(s){return s.nm===t.cm}):null;var cat=cm?catOf(cm.cat):null;
        return <div key={i} className="cd" style={{padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"flex-start",gap:12,borderLeft:cat?"3px solid "+cat.hx:"3px solid "+C.b1}}>
          <button onClick={function(){setDone(function(prev){var n=Object.assign({},prev);n[i]=!n[i];return n})}} style={{width:22,height:22,borderRadius:4,border:"1.5px solid "+(d?C.ps:C.b1),background:d?C.pL:C.w,cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:C.ps,padding:0}}>{d?"✓":""}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:13,lineHeight:"20px",textDecoration:d?"line-through":"none",color:d?C.t2:C.t1}}>{t.tx}</div>
            <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
              <span className={"b b-"+t.ph}>{t.ph.charAt(0).toUpperCase()+t.ph.slice(1)}</span>
              {cat&&<span className="b" style={{color:cat.hx,background:"rgba("+cat.rg+",.08)"}}>{cat.nm}</span>}
              <span style={{fontSize:9,color:C.t2}}>{t.tm}</span>
            </div>
          </div>
        </div>})}
    </div>}

    {tab==="profile"&&<div style={{flex:1,padding:24,maxWidth:800,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <div className="cd" style={{padding:20}}><h3 style={{fontSize:15,fontWeight:600,margin:"0 0 12px"}}>Advisor profile</h3><p style={{fontSize:13,color:C.t2,lineHeight:"22px"}}>Intake results · Network map · Writing styles · Dictionary · Banned phrases</p></div>
      <div className="cd" style={{padding:20}}><h3 style={{fontSize:15,fontWeight:600,margin:"0 0 12px"}}>GTM profile</h3><p style={{fontSize:13,color:C.t2,lineHeight:"22px"}}>ICP · Client types · Travel preferences · Budget ranges</p></div>
    </div>}

    <Footer/>
  </div>;
}

/* ═══ MAIN ═══ */
export default function App(){
  var [s,setS]=useState("login");
  return <div><style>{CSS}</style>
    {s==="login"&&<Login next={function(){setS("quiz")}}/>}
    {s==="quiz"&&<Quiz next={function(){setS("dash")}}/>}
    {s==="dash"&&<Dashboard/>}
  </div>;
}
