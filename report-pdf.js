/* PDF rendering is shared by the browser and local verification. No user data is fetched or sent. */
(function(root){
  async function createServiceReport(data, lang, fontBytes, PDFLib, fontkit){
    const el=lang==='el';
    const t=el?{title:'Δελτίο τεχνικής εργασίας',reference:'Αριθμός αναφοράς',date:'Ημερομηνία',technician:'Τεχνικός',customer:'Πελάτης / χώρος',device:'Συσκευή / μοντέλο',serial:'Σειριακός αριθμός',issue:'Αναφερόμενο πρόβλημα',checks:'Έλεγχοι και ευρήματα',repair:'Εργασίες / ανταλλακτικά',outcome:'Αποτέλεσμα',notes:'Επαλήθευση και επόμενα βήματα',pending:'Σε εκκρεμότητα',resolved:'Αποκαταστάθηκε',monitor:'Χρειάζεται παρακολούθηση',parts:'Αναμονή ανταλλακτικών',escalated:'Παραπομπή για περαιτέρω έλεγχο',page:'Σελίδα',of:'από',continued:'συνέχεια',footer:'Δημιουργήθηκε με το εργαλείο tsakioan.com · Δεν αποτελεί τιμολόγιο.'}:{title:'Service report',reference:'Report reference',date:'Date',technician:'Technician',customer:'Customer / site',device:'Device / model',serial:'Serial number',issue:'Reported issue',checks:'Checks and findings',repair:'Work carried out / parts',outcome:'Outcome',notes:'Verification and next steps',pending:'Pending',resolved:'Resolved',monitor:'Monitor',parts:'Awaiting parts',escalated:'Escalated for further inspection',page:'Page',of:'of',continued:'continued',footer:'Created with the tsakioan.com tool · Not an invoice.'};
    const {PDFDocument,rgb}=PDFLib, doc=await PDFDocument.create();doc.registerFontkit(fontkit);
    const font=await doc.embedFont(fontBytes,{subset:true});
    const supported=new Set(font.getCharacterSet());
    const clean=value=>String(value||'').normalize('NFC').replace(/\r\n?/g,'\n').replace(/\t/g,'    ').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'');
    for(const value of Object.values(data)){for(const c of clean(value)){if(c!=='\n'&&!supported.has(c.codePointAt(0)))throw new Error('UNSUPPORTED_CHARACTER');}}
    const W=595.276,H=841.89,M=46,C=W-2*M,ink=rgb(.08,.12,.18),blue=rgb(.12,.29,.46),gray=rgb(.36,.40,.45);
    let page,y;
    function draw(text,x,yy,size=10,color=ink){page.drawText(text,{x,y:yy,size,font,color});}
    function addPage(){page=doc.addPage([W,H]);y=H-M;draw('TSAKIOAN / SERVICE NOTES',M,y,8,blue);y-=16;page.drawLine({start:{x:M,y},end:{x:W-M,y},thickness:.7,color:blue});y-=30;draw(t.title,M,y,23,ink);y-=28;}
    function wrap(value,size=10,width=C){
      const lines=[];
      for(const paragraph of clean(value).split('\n')){
        if(!paragraph.trim()){lines.push('');continue;}
        let line='';
        for(const word of paragraph.trim().split(/\s+/)){
          const candidate=line?line+' '+word:word;
          if(font.widthOfTextAtSize(candidate,size)<=width){line=candidate;continue;}
          if(line){lines.push(line);line='';}
          for(const char of word){if(line&&font.widthOfTextAtSize(line+char,size)>width){lines.push(line);line='';}line+=char;}
        }
        if(line)lines.push(line);
      }return lines;
    }
    function section(label,value){
      if(y<115)addPage();
      draw(label,M,y,11,blue);y-=19;
      const lines=wrap(value||'—');
      for(const line of lines){if(y<70){addPage();draw(label+' ('+t.continued+')',M,y,11,blue);y-=19;}if(line)draw(line,M,y);y-=15;}
      y-=14;
    }
    addPage();
    for(const key of ['reference','date','technician','customer','device','serial']){
      const value=key==='date'&&/^\d{4}-\d{2}-\d{2}$/.test(data.date)?data.date.split('-').reverse().join('/'):data[key];
      for(const line of wrap(t[key]+': '+(value||'—'),9)){if(y<75)addPage();draw(line,M,y,9);y-=14;}
    }
    y-=16;
    for(const key of ['issue','checks','repair'])section(t[key],data[key]);
    section(t.outcome,t[data.outcome]||t.pending);
    if(data.notes&&data.notes.trim())section(t.notes,data.notes);
    const pages=doc.getPages();pages.forEach((p,i)=>{page=p;page.drawLine({start:{x:M,y:48},end:{x:W-M,y:48},thickness:.4,color:rgb(.7,.75,.8)});draw(t.footer,M,34,7,gray);const n=`${t.page} ${i+1} ${t.of} ${pages.length}`;draw(n,W-M-font.widthOfTextAtSize(n,8),20,8,gray);});
    doc.setTitle(t.title);doc.setCreator('Tsakioan service report builder');doc.setLanguage(el?'el-GR':'en-GB');return doc.save();
  }
  if(typeof module==='object'&&module.exports)module.exports=createServiceReport;else root.createServiceReport=createServiceReport;
})(typeof window==='undefined'?globalThis:window);
