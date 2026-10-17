const C='nm-fotografi-v4',P='nm-fotografi-';
self.addEventListener('install',e=>self.skipWaiting());
// cancella solo le PROPRIE cache vecchie (mai quelle di altre app sullo stesso dominio)
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith(P)&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||!u.pathname.startsWith('/app-nunzio-mirenda/'))return;
if(u.pathname.endsWith('/cliente.html'))return;
e.respondWith(fetch(e.request,e.request.mode==='navigate'||u.pathname.endsWith('/sw.js')?{cache:'no-store'}:{}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{cacheName:C}).then(r=>r||(e.request.mode==='navigate'?caches.open(C).then(x=>x.match('./')):undefined))))});
