(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const{visualViewport:s}=window,c=20;function p(){const r=document.querySelector("#output");if(!r)return;let i,n;s?(i=Math.round(s.width),n=Math.round(s.height),r.innerHTML="<p>Visual viewport size:</p>",r.innerHTML+=`
    <p>Width: ${i}</p>
    <p>Height: ${n}</p>
  `):(i=window.innerWidth,n=window.innerHeight,r.innerHTML="<p>Visual viewport API is not supported</p>"),r.innerHTML+=`
    <p>Window inner size:</p>
    <p>Width: ${window.innerWidth}</p>
    <p>Height: ${window.innerHeight}</p>
  `;const o=document.querySelector("#app");o&&(o.style.width=`${i-c*2}px`,o.style.height=`${n-c*2}px`),u()}function u(){scrollTo(0,0)}s?s.addEventListener("resize",p):window.addEventListener("resize",p);window.addEventListener("load",p);window.addEventListener("scroll",u);
