"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[894],{7085:function(e,t,a){a.r(t),a.d(t,{Head:function(){return o},default:function(){return d}});var l=a(7294),n=a(1883);function r(e){let{children:t}=e;const{0:a,1:n}=(0,l.useState)(!0);return l.createElement("nav",{id:"sidebar",className:a?"":"active"},l.createElement("div",{className:"custom-menu"},l.createElement("button",{type:"button",id:"sidebarCollapse",className:"btn btn-primary",onClick:()=>{n(!a)}},l.createElement("i",{className:"fa fa-bars"}),l.createElement("span",{className:"sr-only"},"Toggle Menu"))),t)}function c(e){let{name:t,children:a}=e;return l.createElement("div",{className:"p-4 pt-5"},l.createElement("h1",null,l.createElement("a",{href:"/",className:"logo"},t)),l.createElement("ul",{className:"list-unstyled components mb-5"},a))}function s(e){let{id:t,title:a,children:n}=e;const{0:r,1:c}=(0,l.useState)(!0);return l.createElement("li",{className:"active"},l.createElement("a",{"data-toggle":"collapse","aria-expanded":!r,onClick:()=>{c(!r)},className:r?"dropdown-toggle":"dropdown-toggle collapsed"},a),l.createElement("ul",{className:r?"collapse list-unstyled":"collapse list-unstyled show",id:t},n))}function m(e){let{title:t,href:a,children:n}=e;return l.createElement("li",null,a?l.createElement("a",{href:a},t):l.createElement("a",null,n))}function i(e){let{title:t,date:a,html:n}=e;return l.createElement("div",{id:"content",className:"p-4 p-md-5 pt-5"},l.createElement("h1",null,t),a)}const o=()=>l.createElement("title",null,"Home Page");var d=e=>{let{data:t}=e;const a=t.markdownRemark;return l.createElement("main",null,l.createElement("div",{className:"wrapper d-flex align-items-stretch"},l.createElement(r,null,l.createElement(c,{name:"yeti's blog"},(()=>{let e=Array(),a=new Map;return t.allMarkdownRemark.nodes.map((e=>{var t;let l={id:e.id,title:e.frontmatter.title,changeTime:e.frontmatter.date,dir:e.frontmatter.menu,path:e.frontmatter.path};a.hasOwnProperty(l.dir)||a.set(l.dir,[]),null===(t=a.get(l.dir))||void 0===t||t.push(l)})),a.forEach(((t,a,r)=>{let c=Array();t.forEach(((e,t,a)=>{c.push(l.createElement(m,{key:e.id},l.createElement(n.Link,{to:e.path},e.title)))})),""===a?e=c.concat(e):e.push(l.createElement(s,{id:a,title:a,children:c,key:a}))})),e})())),l.createElement(i,{html:a.html,title:a.frontmatter.title,date:a.frontmatter.date,categories:a.frontmatter.categories})))}}}]);
//# sourceMappingURL=component---src-templates-md-contents-tsx-cfb4622beee20953ec65.js.map