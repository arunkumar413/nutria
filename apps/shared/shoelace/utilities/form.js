import{a as i}from"../chunks/chunk.PDTEEKIM.js";import"../chunks/chunk.I4CX4JT3.js";function m(e){let s=new FormData(e),o={};return s.forEach((r,t)=>{if(Reflect.has(o,t)){let n=o[t];Array.isArray(n)?n.push(r):o[t]=[o[t],r]}else o[t]=r}),o}function a(e){let o=[...e.getRootNode().querySelectorAll("*")],r=[...e.elements],t=i.get(e),n=t?Array.from(t):[];return[...r,...n].sort((c,l)=>o.indexOf(c)<o.indexOf(l)?-1:o.indexOf(c)>o.indexOf(l)?1:0)}export{a as getFormControls,m as serialize};
