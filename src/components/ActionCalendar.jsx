import{useState}from"react";

var C={w:"#FFFFFF",s1h:"#F7F7F7",s2:"#F2F2F2",bL:"#FAF6F2",br:"#F3EBE2",bS:"#63574A",bD:"#423A31",p:"#212121",pH:"#2E2E2E",pL:"#F0F9F4",ps:"#337E53",nL:"#FFE6E6",n:"#CC0000",prL:"#FFF2CC",pr:"#8F6E00",iL:"#EFF3FF",i:"#2166DB",aL:"#F5F3FF",a:"#7C3AED",aS:"#8655F6",t1:"#212121",t2:"#636363",t3:"#B1B1B1",tb1:"#423A31",tb2:"#63574A",b1:"#D8D8D8",bs:"#F5F5F5",bBr:"#DBD1C6"};

var CATS={
  personal:{nm:"Personal & family",ic:"♥",hx:"#337E53",rg:"51,126,83"},
  fitness:{nm:"Fitness & sports",ic:"◆",hx:"#45A86E",rg:"69,168,110"},
  professional:{nm:"Professional & alumni",ic:"◼",hx:"#7C3AED",rg:"124,58,237"},
  hobby:{nm:"Hobby & interest",ic:"●",hx:"#2C6DE8",rg:"44,109,232"},
};

var TASKS=[
  {day:7,tx:"Write your \"Top 20\" list — 5 from each community most likely to travel",cat:null,ph:"plant",tm:"20 min",ty:"universal"},
  {day:7,tx:"Set a goal: how many new travel conversations this week?",cat:null,ph:"plant",tm:"3 min",ty:"universal"},
  {day:8,tx:"Text 3 PTA moms you'd grab coffee with — no travel mention",cat:"personal",ph:"plant",tm:"10 min",ty:"outreach"},
  {day:8,tx:"Write your elevator pitch for what you do as a travel advisor",cat:null,ph:"plant",tm:"10 min",ty:"universal"},
  {day:9,tx:"Post a running selfie with Westchester Running Club hashtag",cat:"fitness",ph:"plant",tm:"5 min",ty:"outreach"},
  {day:10,tx:"Comment on 2 Stanford alumni LinkedIn posts about travel",cat:"professional",ph:"plant",tm:"10 min",ty:"outreach"},
  {day:11,tx:"DM your book club group: 'Anyone reading anything set in Italy?'",cat:"hobby",ph:"plant",tm:"5 min",ty:"outreach"},
  {day:14,tx:"Follow up with anyone who responded to your Week 1 outreach",cat:null,ph:"plant",tm:"15 min",ty:"outreach"},
  {day:15,tx:"Mention a destination at PTA meeting — casual, no pitch",cat:"personal",ph:"plant",tm:"5 min",ty:"outreach"},
  {day:16,tx:"Share a travel tip in your running club group chat",cat:"fitness",ph:"grow",tm:"5 min",ty:"outreach"},
  {day:17,tx:"Post a short LinkedIn article: 'Why I became a travel advisor'",cat:"professional",ph:"grow",tm:"20 min",ty:"outreach"},
  {day:18,tx:"At book club: 'Anyone planning a trip? I have ideas.'",cat:"hobby",ph:"grow",tm:"5 min",ty:"outreach"},
];

var DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var MONTH_DAYS=30;

var CSS=`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');
*{margin:0;box-sizing:border-box}body{font-family:'Lato',system-ui,sans-serif;color:#212121;background:#fff}
.b{font-size:9px;font-weight:600;padding:2px 8px;border-radius:9999px;display:inline-flex;align-items:center}
.b-plant{color:#337E53;background:#F0F9F4}.b-grow{color:#8F6E00;background:#FFF2CC}.b-convert{color:#2166DB;background:#EFF3FF}
.bt{font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;cursor:pointer;transition:all .15s;border:none}
.bt-p{background:#212121;color:#fff}.bt-p:hover{background:#2E2E2E}
.bt-g{background:transparent;border:1px solid #D8D8D8;color:#212121}.bt-g:hover{background:#F7F7F7}
.bt:focus-visible{outline:2px solid #212121;outline-offset:2px}
.lk{color:#2166DB;text-decoration:none;font-weight:600;font-size:13px}.lk:hover{text-decoration:underline}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

export default function ActionCalendar(){
  var [view,setView]=useState("month");
  var [done,setDone]=useState({});
  var [selDay,setSelDay]=useState(null);
  var today=7;

  var tasksByDay={};
  TASKS.forEach(function(t){if(!tasksByDay[t.day])tasksByDay[t.day]=[];tasksByDay[t.day].push(t)});

  var doneCount=Object.keys(done).filter(function(k){return done[k]}).length;
  var totalTasks=TASKS.length;

  function dayTasks(d){return tasksByDay[d]||[]}

  return(
    <div style={{minHeight:"100vh",background:C.w,display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>

      {/* Proto header */}
      <div style={{background:C.bL,padding:"5px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid "+C.bBr,fontSize:11,fontWeight:600,color:C.tb2}}>
        <span>💠 ProGrowthLab — Action Calendar v1.0.0</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><span className="b" style={{color:"#fff",background:C.aS}}>Slot 4</span><span className="b" style={{color:C.pr,background:C.prL,border:"1px solid #FFBF00"}}>BETA</span><span style={{fontSize:9}}>Apr 7 2026</span></div>
      </div>

      <div style={{flex:1,maxWidth:920,margin:"0 auto",padding:"24px",width:"100%"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:24,fontWeight:700,margin:"0 0 4px"}}>Action calendar</h1>
            <p style={{fontSize:13,color:C.t2}}>1 outreach/day · 5 days/week · 12 weeks = 60 touchpoints → 3 clients</p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button className="bt bt-g" style={{padding:"6px 12px",fontSize:11,display:"flex",alignItems:"center",gap:4}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
              Sync to Google Calendar
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{background:C.w,border:"1px solid "+C.b1,borderRadius:8,padding:16,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:13,fontWeight:600}}>{doneCount} of {totalTasks} tasks completed</span>
            <span style={{fontSize:11,color:C.t2}}>{Math.round(doneCount/totalTasks*100)}%</span>
          </div>
          <div style={{height:6,borderRadius:9999,background:C.s2,overflow:"hidden"}}>
            <div style={{width:Math.round(doneCount/totalTasks*100)+"%",height:"100%",background:C.ps,borderRadius:9999,transition:"width .4s ease"}}/>
          </div>
          <div style={{display:"flex",gap:16,marginTop:10}}>
            <span style={{fontSize:11,color:C.t2}}>🌱 Plant phase: Weeks 1–2</span>
            <span style={{fontSize:11,color:C.t2}}>🌿 Grow phase: Weeks 3–8</span>
            <span style={{fontSize:11,color:C.t3}}>🎯 Convert phase: Weeks 9–14</span>
          </div>
        </div>

        {/* View switcher */}
        <div style={{display:"flex",gap:4,marginBottom:16}}>
          {["month","week","day"].map(function(v){return(
            <button key={v} onClick={function(){setView(v);if(v==="day"&&!selDay)setSelDay(today)}} className="bt" style={{
              background:view===v?C.p:"transparent",
              color:view===v?"#fff":C.t2,
              border:view===v?"none":"1px solid "+C.b1,
              padding:"6px 14px",fontSize:11,fontWeight:600,
            }}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>
          )})}
          <div style={{flex:1}}/>
          <span style={{fontSize:13,fontWeight:600,alignSelf:"center"}}>April 2026</span>
        </div>

        {/* MONTH VIEW */}
        {view==="month"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {DAYS.map(function(d){return <div key={d} style={{fontSize:11,fontWeight:600,color:C.t2,textAlign:"center",padding:"6px 0"}}>{d}</div>})}
            {Array.from({length:MONTH_DAYS},function(_,i){
              var day=i+1;
              var dt=dayTasks(day);
              var isToday=day===today;
              var hasTasks=dt.length>0;
              var allDone=hasTasks&&dt.every(function(_,ti){return done[day+"-"+ti]});
              return(
                <div key={day} onClick={function(){setSelDay(day);setView("day")}} style={{
                  aspectRatio:"1",borderRadius:6,
                  border:"1px solid "+(isToday?C.p:hasTasks?"rgba("+CATS[dt[0].cat?dt[0].cat:"personal"].rg+",.3)":C.bs),
                  background:allDone?C.pL:isToday?"rgba(33,33,33,.04)":C.w,
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  cursor:hasTasks?"pointer":"default",
                  transition:"all .1s",position:"relative",
                }}>
                  <span style={{fontSize:13,fontWeight:isToday?700:400,color:day<today?C.t2:C.t1}}>{day}</span>
                  {hasTasks&&<div style={{display:"flex",gap:2,marginTop:3}}>
                    {dt.map(function(t,ti){
                      var catColor=t.cat?CATS[t.cat].hx:C.t2;
                      var isDone=done[day+"-"+ti];
                      return <div key={ti} style={{width:5,height:5,borderRadius:"50%",background:isDone?C.ps:catColor,opacity:isDone?.5:1}}/>;
                    })}
                  </div>}
                </div>
              );
            })}
          </div>
        </div>}

        {/* WEEK VIEW */}
        {view==="week"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8}}>
            {[7,8,9,10,11,12,13].map(function(day){
              var dt=dayTasks(day);
              var isToday=day===today;
              return(
                <div key={day} style={{borderRadius:8,border:"1px solid "+(isToday?C.p:C.b1),padding:12,minHeight:200,background:isToday?"rgba(33,33,33,.02)":C.w}}>
                  <div style={{fontSize:11,fontWeight:600,color:isToday?C.t1:C.t2,marginBottom:8}}>{DAYS[(day-1)%7]} {day}</div>
                  {dt.length===0&&<div style={{fontSize:11,color:C.t3,fontStyle:"italic"}}>No tasks</div>}
                  {dt.map(function(t,ti){
                    var catObj=t.cat?CATS[t.cat]:null;
                    var isDone=done[day+"-"+ti];
                    return(
                      <div key={ti} style={{
                        borderLeft:"3px solid "+(catObj?catObj.hx:C.b1),
                        padding:"6px 8px",marginBottom:6,borderRadius:"0 4px 4px 0",
                        background:isDone?C.pL:C.w,
                        fontSize:11,lineHeight:"16px",color:isDone?C.t2:C.t1,
                        textDecoration:isDone?"line-through":"none",
                        cursor:"pointer",
                      }} onClick={function(){setDone(function(prev){var n=Object.assign({},prev);n[day+"-"+ti]=!n[day+"-"+ti];return n})}}>
                        {t.tx.length>50?t.tx.substring(0,48)+"…":t.tx}
                        <div style={{marginTop:3}}><span className={"b b-"+t.ph} style={{fontSize:8}}>{t.ph}</span></div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>}

        {/* DAY VIEW */}
        {view==="day"&&<div>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16}}>
            <button className="bt bt-g" style={{padding:"4px 10px"}} onClick={function(){setSelDay(function(d){return Math.max(1,d-1)})}}>←</button>
            <span style={{fontSize:15,fontWeight:600}}>{DAYS[((selDay||today)-1)%7]}, April {selDay||today}</span>
            <button className="bt bt-g" style={{padding:"4px 10px"}} onClick={function(){setSelDay(function(d){return Math.min(30,d+1)})}}>→</button>
            {selDay===today&&<span className="b" style={{color:C.ps,background:C.pL,marginLeft:4}}>Today</span>}
          </div>

          {dayTasks(selDay||today).length===0&&<div style={{background:C.w,border:"1px solid "+C.b1,borderRadius:8,padding:40,textAlign:"center"}}>
            <p style={{fontSize:15,color:C.t2}}>No tasks scheduled for this day</p>
            <button className="bt bt-g" style={{marginTop:12}}>+ Add a task</button>
          </div>}

          {dayTasks(selDay||today).map(function(t,ti){
            var catObj=t.cat?CATS[t.cat]:null;
            var isDone=done[(selDay||today)+"-"+ti];
            return(
              <div key={ti} style={{
                background:C.w,border:"1px solid "+C.b1,borderRadius:8,
                borderLeft:"4px solid "+(catObj?catObj.hx:C.b1),
                padding:16,marginBottom:10,
                display:"flex",alignItems:"flex-start",gap:14,
              }}>
                <button onClick={function(){var key=(selDay||today)+"-"+ti;setDone(function(prev){var n=Object.assign({},prev);n[key]=!n[key];return n})}} style={{
                  width:24,height:24,borderRadius:6,
                  border:"2px solid "+(isDone?C.ps:C.b1),
                  background:isDone?C.pL:C.w,
                  cursor:"pointer",flexShrink:0,marginTop:1,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:13,color:C.ps,padding:0,
                }}>{isDone?"✓":""}</button>

                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:isDone?400:600,lineHeight:"22px",textDecoration:isDone?"line-through":"none",color:isDone?C.t2:C.t1}}>{t.tx}</div>
                  <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap",alignItems:"center"}}>
                    <span className={"b b-"+t.ph}>{t.ph.charAt(0).toUpperCase()+t.ph.slice(1)} phase</span>
                    {catObj&&<span className="b" style={{color:catObj.hx,background:"rgba("+catObj.rg+",.08)"}}>{catObj.ic} {catObj.nm}</span>}
                    <span style={{fontSize:11,color:C.t2}}>⏱ {t.tm}</span>
                    <span className="b" style={{color:t.ty==="outreach"?C.ps:C.t2,background:t.ty==="outreach"?C.pL:C.s2}}>{t.ty}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <button className="bt bt-g" style={{width:"100%",marginTop:8}}>+ Add your own task</button>
        </div>}

        {/* Footer */}
        <div style={{borderTop:"1px solid "+C.bs,padding:"16px 0",marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:C.t2}}>
          <span>Pro Growth Lab · Fora Travel · Surge 2026</span>
          <a href="#" onClick={function(e){e.preventDefault()}} className="lk" style={{fontSize:11}}>Report a problem</a>
        </div>
      </div>
    </div>
  );
}
