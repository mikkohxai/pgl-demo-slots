import{useState,useEffect,useRef}from"react";

var C={w:"#FFFFFF",s2:"#F2F2F2",bL:"#FAF6F2",br:"#F3EBE2",bS:"#63574A",bD:"#423A31",p:"#212121",pL:"#F0F9F4",ps:"#337E53",prL:"#FFF2CC",pr:"#8F6E00",iL:"#EFF3FF",i:"#2166DB",aL:"#F5F3FF",a:"#7C3AED",aS:"#8655F6",t1:"#212121",t2:"#636363",t3:"#B1B1B1",tb1:"#423A31",tb2:"#63574A",b1:"#D8D8D8",bs:"#F5F5F5",bBr:"#DBD1C6"};

var CATS=[
  {id:"personal",nm:"Personal & family",ic:"♥",hx:"#337E53",rg:"51,126,83"},
  {id:"professional",nm:"Professional & alumni",ic:"◼",hx:"#7C3AED",rg:"124,58,237"},
  {id:"fitness",nm:"Fitness & sports",ic:"◆",hx:"#45A86E",rg:"69,168,110"},
  {id:"hobby",nm:"Hobby & interest",ic:"●",hx:"#2C6DE8",rg:"44,109,232"},
];

var COMMS=[
  {cat:CATS[0],nm:"Lakeside Elementary PTA",ct:45,freq:"Weekly",pot:9.2,detail:"Co-chair of fundraising. 200+ families. Soccer moms + school board network."},
  {cat:CATS[2],nm:"Westchester Running Club",ct:25,freq:"3×/week",pot:7.8,detail:"Saturday long runs, post-run brunch crew of ~12. Very social."},
  {cat:CATS[1],nm:"Stanford Alumni NYC",ct:200,freq:"Monthly",pot:6.1,detail:"Monthly mixers at The Yale Club. LinkedIn group 4K members."},
  {cat:CATS[3],nm:"Saturday Book Club",ct:12,freq:"Weekly",pot:8.4,detail:"6 core members, rotating homes. Travel-themed picks lately."},
];

var CSS=`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');
*{margin:0;box-sizing:border-box}body{font-family:'Lato',system-ui,sans-serif;color:#212121;background:#fff}
.b{font-size:9px;font-weight:600;padding:2px 8px;border-radius:9999px;display:inline-flex;align-items:center}
.gnode{border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(14px) saturate(130%);-webkit-backdrop-filter:blur(14px) saturate(130%);box-shadow:inset 0 1px 1px rgba(255,255,255,.35),0 2px 12px rgba(0,0,0,.07);cursor:pointer;transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;position:relative}
.gnode:hover{transform:scale(1.08);box-shadow:inset 0 1px 1px rgba(255,255,255,.5),0 8px 28px rgba(0,0,0,.12)}
@supports not(backdrop-filter:blur(1px)){.gnode{backdrop-filter:none}}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
@keyframes revealNode{from{opacity:0;transform:translateY(20px) scale(.8)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes drawLine{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
@keyframes countUp{from{opacity:0}to{opacity:1}}
@keyframes pls{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
`;

function AnimN(p){var ref=useRef(null);var v=parseInt(p.v);
  useEffect(function(){if(isNaN(v)||!ref.current)return;var s=0,t0=null;function step(ts){if(!t0)t0=ts;var pr=Math.min((ts-t0)/(p.dur||1200),1);var e=1-Math.pow(1-pr,3);if(ref.current)ref.current.textContent=Math.round(s+(v-s)*e);if(pr<1)requestAnimationFrame(step)};requestAnimationFrame(step)},[v]);
  if(isNaN(v))return <span>{p.v}</span>;return <span ref={ref}>0</span>}

export default function VerticalNetworkReveal(){
  var [revealed,setRevealed]=useState([]);
  var [phase,setPhase]=useState("loading");
  var [selected,setSelected]=useState(null);

  useEffect(function(){
    if(phase==="loading"){
      setTimeout(function(){setPhase("reveal")},1500);
    }
    if(phase==="reveal"){
      var i=0;
      function next(){
        if(i<COMMS.length){setRevealed(function(p){return p.concat([i])});i++;setTimeout(next,600)}
        else{setTimeout(function(){setPhase("complete")},800)}
      }
      setTimeout(next,400);
    }
  },[phase]);

  var totalContacts=COMMS.reduce(function(a,c){return a+c.ct},0);

  return(
    <div style={{minHeight:"100vh",background:C.w,display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>
      {/* Proto header */}
      <div style={{background:C.bL,padding:"5px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid "+C.bBr,fontSize:11,fontWeight:600,color:C.tb2}}>
        <span>💠 ProGrowthLab — Network Map Reveal (Vertical) v1.0.0</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><span className="b" style={{color:"#fff",background:C.aS}}>Slot 3</span><span style={{fontSize:9}}>Apr 7 2026</span></div>
      </div>

      <div style={{flex:1,display:"flex",justifyContent:"center",padding:"40px 24px"}}>
        <div style={{maxWidth:640,width:"100%"}}>

          {/* Title */}
          <div style={{textAlign:"center",marginBottom:32}}>
            <span className="b" style={{color:"#fff",background:C.aS,marginBottom:8}}>AI generated</span>
            <h1 style={{fontSize:30,fontWeight:700,margin:"8px 0 4px"}}>Your Network Map</h1>
            <p style={{fontSize:15,color:C.t2}}>
              {phase==="loading"?"Mapping your communities...":
               phase==="reveal"?"Discovering your network...":
               "4 communities · "+totalContacts+" warm connections"}
            </p>
          </div>

          {/* Center "You" node */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#FAF6F2 0%,#F3EBE2 50%,#E5DBD0 100%)",border:"1px solid "+C.bBr,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"pls 3s ease-in-out infinite",boxShadow:"0 3px 16px rgba(0,0,0,.06)"}}>
              <span style={{fontSize:24,fontWeight:700,color:C.tb1}}>R</span>
              {phase==="complete"&&<span style={{fontSize:11,fontWeight:600,color:C.tb2}}><AnimN v={String(totalContacts)}/></span>}
            </div>
          </div>

          {/* Vertical community stack */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {COMMS.map(function(comm,i){
              var isRevealed=revealed.includes(i);
              var isSel=selected===i;
              if(!isRevealed)return <div key={i} style={{height:80,borderRadius:8,border:"1px dashed "+C.b1,opacity:.15}}/>;

              return(
                <div key={i} onClick={function(){setSelected(isSel?null:i)}}
                  style={{
                    background:C.w,border:isSel?"2px solid "+comm.cat.hx:"1px solid "+C.b1,
                    borderRadius:8,overflow:"hidden",cursor:"pointer",
                    animation:"revealNode .5s cubic-bezier(.34,1.56,.64,1) "+(i*.1)+"s both",
                    transition:"border-color .15s",
                  }}>
                  <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px"}}>
                    {/* Glass node circle */}
                    <div className="gnode" style={{width:52,height:52,flexShrink:0,background:"rgba("+comm.cat.rg+",.10)",border:"1px solid rgba("+comm.cat.rg+",.25)"}}>
                      <div style={{position:"absolute",top:"12%",left:"18%",width:"45%",height:"28%",borderRadius:"50%",background:"rgba(255,255,255,.3)",filter:"blur(2px)",pointerEvents:"none"}}/>
                      <span style={{fontSize:18,position:"relative",zIndex:1}}>{comm.cat.ic}</span>
                      <span style={{fontSize:9,fontWeight:700,color:comm.cat.hx,position:"relative",zIndex:1}}>{comm.ct}</span>
                    </div>

                    {/* Info */}
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{comm.nm}</div>
                      <div style={{fontSize:13,color:C.t2,marginTop:2}}>{comm.cat.nm} · {comm.freq}</div>
                    </div>

                    {/* Potential score */}
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:20,fontWeight:700,color:comm.cat.hx}}>{comm.pot.toFixed(1)}</div>
                      <div style={{fontSize:9,color:C.t2}}>potential</div>
                    </div>

                    <span style={{fontSize:13,color:C.t2,transform:isSel?"rotate(180deg)":"none",transition:"transform .2s",flexShrink:0}}>▾</span>
                  </div>

                  {/* Expanded detail */}
                  {isSel&&<div style={{padding:"0 16px 16px",borderTop:"1px solid "+C.bs,animation:"countUp .2s ease"}}>
                    <p style={{fontSize:13,color:C.t2,lineHeight:"20px",margin:"12px 0 0"}}>{comm.detail}</p>

                    {/* Enrichment fields */}
                    <div style={{background:C.bL,borderRadius:6,padding:12,border:"1px solid "+C.bBr,marginTop:12}}>
                      <div style={{fontSize:11,fontWeight:600,color:C.tb2,marginBottom:8}}>Enrich this community</div>
                      <div style={{marginBottom:8}}>
                        <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>Website <span style={{color:C.t3}}>(optional)</span></label>
                        <input defaultValue="" placeholder="https://..." style={{width:"100%",padding:"6px 10px",border:"1px solid "+C.b1,borderRadius:6,fontSize:13,fontFamily:"inherit",background:C.w,boxSizing:"border-box"}}/>
                      </div>
                      <div>
                        <label style={{fontSize:11,color:C.t2,display:"block",marginBottom:3}}>Key details <span style={{color:C.t3}}>(your role, who you know, travel connections)</span></label>
                        <textarea defaultValue={comm.detail} rows={2} style={{width:"100%",padding:"6px 10px",border:"1px solid "+C.b1,borderRadius:6,fontSize:13,fontFamily:"inherit",background:C.w,boxSizing:"border-box",resize:"vertical"}}/>
                      </div>
                    </div>

                    {/* AI prompt */}
                    <div style={{background:C.aL,borderRadius:6,padding:10,border:"1px solid rgba(124,58,237,.12)",marginTop:10,display:"flex",alignItems:"flex-start",gap:8}}>
                      <span className="b" style={{color:"#fff",background:C.aS,flexShrink:0,marginTop:1}}>AI</span>
                      <span style={{fontSize:11,color:C.a}}>Who are the 3 people here most likely to travel? Tell us and we'll build a personalized outreach plan.</span>
                    </div>
                  </div>}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          {phase==="complete"&&<div style={{textAlign:"center",marginTop:32,animation:"countUp .5s ease .3s both"}}>
            <button style={{fontFamily:"inherit",fontSize:15,fontWeight:600,padding:"12px 32px",borderRadius:6,border:"none",background:C.p,color:"#fff",cursor:"pointer"}}>See your dashboard →</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
