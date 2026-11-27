'use strict';
(async()=>{
  const select=document.getElementById('reader-language');
  try{
    const response=await fetch('/manifesto-data.json');
    if(!response.ok)throw new Error('Manifesto unavailable');
    const languages=await response.json();
    function render(code){
      const entry=languages[code]||languages.en;
      const article=document.getElementById('manifesto');
      const fragment=document.createDocumentFragment();
      for(const section of entry.sections){
        const block=document.createElement('section');
        if(section.callout)block.className='callout';
        for(const text of section.paragraphs){const p=document.createElement('p');p.textContent=text;block.append(p);}
        fragment.append(block);
      }
      const closing=document.createElement('p');closing.className='closing';closing.textContent=entry.enough;fragment.append(closing);
      article.replaceChildren(fragment);article.dir=code==='ar'?'rtl':'ltr';article.lang=code;
      document.getElementById('reader-title').textContent=entry.title;
      document.documentElement.lang=code;select.value=code;
      const url=new URL(location.href);url.searchParams.set('lang',code);history.replaceState(null,'',url);
    }
    const code=new URLSearchParams(location.search).get('lang');render(languages[code]?code:'en');
    select.addEventListener('change',()=>render(select.value));
  }catch{
    select.disabled=true;
    const message=document.createElement('p');message.setAttribute('role','status');message.textContent='Language selection is temporarily unavailable. The complete English text remains below.';select.after(message);
  }
})();
