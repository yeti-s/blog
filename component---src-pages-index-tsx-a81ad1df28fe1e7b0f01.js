"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[691],{3362:function(e,t,a){a.r(t),a.d(t,{Head:function(){return s},default:function(){return u}});var n=a(7294);function l(e){let{children:t}=e;const{0:a,1:l}=(0,n.useState)(!0);return n.createElement("nav",{id:"sidebar",className:a?"":"active"},n.createElement("div",{className:"custom-menu"},n.createElement("button",{type:"button",id:"sidebarCollapse",className:"btn btn-primary",onClick:()=>{console.log("1123"),l(!a)}},n.createElement("i",{className:"fa fa-bars"}),n.createElement("span",{className:"sr-only"},"Toggle Menu"))),t)}function i(e){let{name:t,children:a}=e;return n.createElement("div",{className:"p-4 pt-5"},n.createElement("h1",null,n.createElement("a",{href:"/",className:"logo"},t)),n.createElement("ul",{className:"list-unstyled components mb-5"},a))}function r(e){let{id:t,name:a,children:l}=e;const{0:i,1:r}=(0,n.useState)(!0);return n.createElement("li",{className:"active"},n.createElement("a",{"data-toggle":"collapse","aria-expanded":!i,onClick:()=>{r(!i)},className:i?"dropdown-toggle":"dropdown-toggle collapsed"},a),n.createElement("ul",{className:i?"collapse list-unstyled":"collapse list-unstyled show",id:t},l))}function o(e){let{name:t,href:a}=e;return n.createElement("li",null,n.createElement("a",{href:a},t))}function c(e){let{contents:t}=e;return n.createElement("div",{id:"content",className:"p-4 p-md-5 pt-5"},n.createElement("h2",{className:"mb-4"},"Sidebar #04"),n.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),n.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."))}const s=()=>n.createElement("title",null,"Home Page");var u=e=>{let{data:t}=e;n.useState((()=>{console.log(t.allFile.nodes)}));return n.createElement("main",null,n.createElement("div",{className:"wrapper d-flex align-items-stretch"},n.createElement(l,null,n.createElement(i,{name:"yeti's blog"},(()=>{let e=Array(),a=new Map;return t.allFile.nodes.map((e=>{var t;let n={name:e.name,changeTime:e.changeTime,dir:e.relativeDirectory,id:e.id};a.hasOwnProperty(n.dir)||a.set(n.dir,[]),null===(t=a.get(n.dir))||void 0===t||t.push(n)})),a.forEach(((t,a,l)=>{let i=Array();t.forEach(((e,t,a)=>{i.push(n.createElement(o,{name:e.name,href:""+e.id,key:e.id}))})),""===a?e=e.concat(i):e.push(n.createElement(r,{id:a,name:a,children:i,key:a}))})),e})())),n.createElement(c,{contents:"1"})))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-a81ad1df28fe1e7b0f01.js.map