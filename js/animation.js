"use strict";document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".--animation");if(e.length>0){var n=function(){Array.from(e).forEach((function(e){var n,t,i=e.offsetHeight,o=(n=e.getBoundingClientRect(),t=window.pageYOffset||document.documentElement.scrollTop,n.top+t),a=window.innerHeight-i/4;i>window.innerHeight&&(a=window.innerHeight-window.innerHeight/4),pageYOffset>o-a&&pageYOffset<o+i?e.classList.add("--active"):e.classList.contains("--stop-anim")||e.classList.remove("--active")}))};window.addEventListener("scroll",n),n()}}));