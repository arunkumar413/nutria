import{a as i,b as o}from"./chunk.OAQCUA7X.js";function s(e,t,n){return new Promise(r=>{if((n==null?void 0:n.duration)===1/0)throw new Error("Promise-based animations must be finite.");let a=e.animate(t,o(i({},n),{duration:u()?0:n.duration}));a.addEventListener("cancel",r,{once:!0}),a.addEventListener("finish",r,{once:!0})})}function m(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?parseFloat(e)*1e3:parseFloat(e)}function u(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function c(e){return Promise.all(e.getAnimations().map(t=>new Promise(n=>{let r=requestAnimationFrame(n);t.addEventListener("cancel",()=>r,{once:!0}),t.addEventListener("finish",()=>r,{once:!0}),t.cancel()})))}function f(e,t){return e.map(n=>o(i({},n),{height:n.height==="auto"?`${t}px`:n.height}))}export{s as a,m as b,c,f as d};
