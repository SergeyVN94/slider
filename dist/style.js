!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=24)}({24:function(e,t,n){var r=n(25);"string"==typeof r&&(r=[[e.i,r,""]]);var o={insert:"head",singleton:!1};n(27)(r,o);r.locals&&(e.exports=r.locals)},25:function(e,t,n){(e.exports=n(26)(!1)).push([e.i,".slider__container{width:100%;height:100%;position:relative;border-radius:10px;background-color:#d4d4e1}.slider__point{display:block;width:25px;height:25px;border-radius:50%;background-color:#b44650;position:absolute;top:-6.5px;left:-12.5px;user-select:none;-moz-user-select:none;-webkit-user-select:none;z-index:2}.slider__bg-line{background-color:#16a085;height:100%;width:auto;border-radius:10px;position:absolute;left:0px;z-index:1}.slider__tooltip{display:block;width:auto;height:24px;background-color:#b44650;color:#fcfcfc;position:absolute;text-align:center;padding:2px 8px;font-size:12px;line-height:18px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;box-sizing:border-box;border-radius:6px;left:0;user-select:none;-moz-user-select:none;-webkit-user-select:none}.slider__tooltip::after{content:'';display:block;width:0px;height:0px;position:absolute;bottom:-15.66667px;left:0;right:0;margin:0 auto;border:8.33333px solid transparent;border-top:8.33333px solid #b44650}.slider__tooltip_hide{display:none}.slider__tooltips-container{position:relative;width:100%;height:24px;top:-53.83333px}.slider{display:block;box-sizing:border-box;width:100%;height:12px;min-width:100px}.slider_vertical{width:12px;height:100%;min-width:0}.slider_vertical .slider__bg-line{width:100%;bottom:0px;height:auto}.slider_vertical .slider__point{top:auto;bottom:-12.5px;left:-6.5px}.slider_vertical .slider__tooltips-container{height:100%;width:24px;top:-100%;left:-53.83333px}.slider_vertical .slider__tooltip{left:auto;right:0;padding:3px 8px}.slider_vertical .slider__tooltip::after{left:auto;right:-15.66667px;margin:0;top:3.66667px;border-top:8.33333px solid transparent;border-left:8.33333px solid #b44650}.demo-panel__slider-container{display:flex;align-items:center;justify-content:center;width:340px;height:190px;padding:20px}.demo-panel__setting{margin-left:35px;display:flex;flex-direction:column;padding:4px;box-sizing:border-box}.demo-panel{display:flex;flex-direction:row;max-width:700px;width:100%;max-width:700px;height:auto;justify-content:flex-start;align-items:center}input[type='number']{margin:3px;padding:3px;box-sizing:border-box}.demo-page__demo-panel{margin:10px 20px;border-bottom:1px solid #42070771}.demo-page{width:100%;margin:0;padding:50px 0px 0px 20px;display:flex;flex-direction:column}\n",""])},26:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot).concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,s,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var a=0;a<e.length;a++){var s=e[a];null!=s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),t.push(s))}},t}},27:function(e,t,n){"use strict";var r,o={},i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}();function s(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function l(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=o[r.id],a=0;if(i){for(i.refs++;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(x(r.parts[a],t))}else{for(var s=[];a<r.parts.length;a++)s.push(x(r.parts[a],t));o[r.id]={id:r.id,refs:1,parts:s}}}}function d(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var r=n.nc;r&&(e.attributes.nonce=r)}if(Object.keys(e.attributes).forEach((function(n){t.setAttribute(n,e.attributes[n])})),"function"==typeof e.insert)e.insert(t);else{var o=a(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}return t}var p,c=(p=[],function(e,t){return p[e]=t,p.filter(Boolean).join("\n")});function u(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=c(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function f(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o&&e.setAttribute("media",o),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var h=null,b=0;function x(e,t){var n,r,o;if(t.singleton){var i=b++;n=h||(h=d(t)),r=u.bind(null,n,i,!1),o=u.bind(null,n,i,!0)}else n=d(t),r=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=s(e,t);return l(n,t),function(e){for(var r=[],i=0;i<n.length;i++){var a=n[i],d=o[a.id];d&&(d.refs--,r.push(d))}e&&l(s(e,t),t);for(var p=0;p<r.length;p++){var c=r[p];if(0===c.refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete o[c.id]}}}}}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguc2Nzcz8zOGQzIiwid2VicGFjazovLy8uL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImNvbnRlbnQiLCJvcHRpb25zIiwibG9jYWxzIiwicHVzaCIsInVzZVNvdXJjZU1hcCIsImxpc3QiLCJ0b1N0cmluZyIsInRoaXMiLCJtYXAiLCJpdGVtIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJzb3VyY2VNYXBwaW5nIiwic291cmNlTWFwIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YSIsImNvbmNhdCIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlIiwic291cmNlUm9vdCIsImpvaW4iLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsIl9pIiwibWVtbyIsInN0eWxlc0luRG9tIiwiaXNPbGRJRSIsIkJvb2xlYW4iLCJ3aW5kb3ciLCJkb2N1bWVudCIsImFsbCIsImF0b2IiLCJnZXRUYXJnZXQiLCJ0YXJnZXQiLCJzdHlsZVRhcmdldCIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MSUZyYW1lRWxlbWVudCIsImNvbnRlbnREb2N1bWVudCIsImhlYWQiLCJlIiwibGlzdFRvU3R5bGVzIiwic3R5bGVzIiwibmV3U3R5bGVzIiwiYmFzZSIsInBhcnQiLCJjc3MiLCJtZWRpYSIsInBhcnRzIiwiYWRkU3R5bGVzVG9Eb20iLCJkb21TdHlsZSIsImoiLCJyZWZzIiwiYWRkU3R5bGUiLCJpbnNlcnRTdHlsZUVsZW1lbnQiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJhdHRyaWJ1dGVzIiwibm9uY2UiLCJrZXlzIiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZSIsImluc2VydCIsIkVycm9yIiwiYXBwZW5kQ2hpbGQiLCJ0ZXh0U3RvcmUiLCJyZXBsYWNlVGV4dCIsImluZGV4IiwicmVwbGFjZW1lbnQiLCJmaWx0ZXIiLCJhcHBseVRvU2luZ2xldG9uVGFnIiwicmVtb3ZlIiwib2JqIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJjc3NOb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBseVRvVGFnIiwiZmlyc3RDaGlsZCIsInNpbmdsZXRvbiIsInNpbmdsZXRvbkNvdW50ZXIiLCJ1cGRhdGUiLCJzdHlsZUluZGV4IiwicGFyZW50Tm9kZSIsInJlbW92ZVN0eWxlRWxlbWVudCIsIm5ld09iaiIsIm5ld0xpc3QiLCJtYXlSZW1vdmUiLCJfZG9tU3R5bGUiXSwibWFwcGluZ3MiOiJhQUNFLElBQUlBLEVBQW1CLEdBR3ZCLFNBQVNDLEVBQW9CQyxHQUc1QixHQUFHRixFQUFpQkUsR0FDbkIsT0FBT0YsRUFBaUJFLEdBQVVDLFFBR25DLElB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QUFja0UsRUFBSWxFLFVBQ25GLE9BR0Y4RSxFQUFPWixFQUFNZ0IsUUFFYmpCLEtBS04vRyxFQUFPRCxRQUFVLFNBQVV1QyxFQUFNSixJQUMvQkEsRUFBVUEsR0FBVyxJQUNiK0QsV0FBMkMsaUJBQXZCL0QsRUFBUStELFdBQTBCL0QsRUFBUStELFdBQWEsR0FHOUUvRCxFQUFRd0YsV0FBMEMsa0JBQXRCeEYsRUFBUXdGLFlBQ3ZDeEYsRUFBUXdGLFVBQVl2RCxLQUd0QixJQUFJZSxFQUFTRCxFQUFhM0MsRUFBTUosR0FFaEMsT0FEQXVELEVBQWVQLEVBQVFoRCxHQUNoQixTQUFnQitGLEdBR3JCLElBRkEsSUFBSUMsRUFBWSxHQUVQakksRUFBSSxFQUFHQSxFQUFJaUYsRUFBT3BCLE9BQVE3RCxJQUFLLENBQ3RDLElBQUl5QyxFQUFPd0MsRUFBT2pGLEdBQ2R5RixFQUFXeEIsRUFBWXhCLEVBQUtxQixJQUU1QjJCLElBQ0ZBLEVBQVNFLE9BQ1RzQyxFQUFVOUYsS0FBS3NELElBSWZ1QyxHQUVGeEMsRUFEZ0JSLEVBQWFnRCxFQUFTL0YsR0FDWkEsR0FHNUIsSUFBSyxJQUFJOEIsRUFBSyxFQUFHQSxFQUFLa0UsRUFBVXBFLE9BQVFFLElBQU0sQ0FDNUMsSUFBSW1FLEVBQVlELEVBQVVsRSxHQUUxQixHQUF1QixJQUFuQm1FLEVBQVV2QyxLQUFZLENBQ3hCLElBQUssSUFBSUQsRUFBSSxFQUFHQSxFQUFJd0MsRUFBVTNDLE1BQU0xQixPQUFRNkIsSUFDMUN3QyxFQUFVM0MsTUFBTUcsWUFHWHpCLEVBQVlpRSxFQUFVcEUiLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjQpO1xuIiwidmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5pZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbn1cblxudmFyIG9wdGlvbnMgPSB7fVxuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZiAoY29udGVudC5sb2NhbHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbn1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnNsaWRlcl9fY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyLXJhZGl1czoxMHB4O2JhY2tncm91bmQtY29sb3I6I2Q0ZDRlMX0uc2xpZGVyX19wb2ludHtkaXNwbGF5OmJsb2NrO3dpZHRoOjI1cHg7aGVpZ2h0OjI1cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojYjQ0NjUwO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotNi41cHg7bGVmdDotMTIuNXB4O3VzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTt6LWluZGV4OjJ9LnNsaWRlcl9fYmctbGluZXtiYWNrZ3JvdW5kLWNvbG9yOiMxNmEwODU7aGVpZ2h0OjEwMCU7d2lkdGg6YXV0bztib3JkZXItcmFkaXVzOjEwcHg7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowcHg7ei1pbmRleDoxfS5zbGlkZXJfX3Rvb2x0aXB7ZGlzcGxheTpibG9jazt3aWR0aDphdXRvO2hlaWdodDoyNHB4O2JhY2tncm91bmQtY29sb3I6I2I0NDY1MDtjb2xvcjojZmNmY2ZjO3Bvc2l0aW9uOmFic29sdXRlO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6MnB4IDhweDtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxOHB4O2ZvbnQtZmFtaWx5OidTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjZweDtsZWZ0OjA7dXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lfS5zbGlkZXJfX3Rvb2x0aXA6OmFmdGVye2NvbnRlbnQ6Jyc7ZGlzcGxheTpibG9jazt3aWR0aDowcHg7aGVpZ2h0OjBweDtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206LTE1LjY2NjY3cHg7bGVmdDowO3JpZ2h0OjA7bWFyZ2luOjAgYXV0bztib3JkZXI6OC4zMzMzM3B4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci10b3A6OC4zMzMzM3B4IHNvbGlkICNiNDQ2NTB9LnNsaWRlcl9fdG9vbHRpcF9oaWRle2Rpc3BsYXk6bm9uZX0uc2xpZGVyX190b29sdGlwcy1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MjRweDt0b3A6LTUzLjgzMzMzcHh9LnNsaWRlcntkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2hlaWdodDoxMnB4O21pbi13aWR0aDoxMDBweH0uc2xpZGVyX3ZlcnRpY2Fse3dpZHRoOjEycHg7aGVpZ2h0OjEwMCU7bWluLXdpZHRoOjB9LnNsaWRlcl92ZXJ0aWNhbCAuc2xpZGVyX19iZy1saW5le3dpZHRoOjEwMCU7Ym90dG9tOjBweDtoZWlnaHQ6YXV0b30uc2xpZGVyX3ZlcnRpY2FsIC5zbGlkZXJfX3BvaW50e3RvcDphdXRvO2JvdHRvbTotMTIuNXB4O2xlZnQ6LTYuNXB4fS5zbGlkZXJfdmVydGljYWwgLnNsaWRlcl9fdG9vbHRpcHMtY29udGFpbmVye2hlaWdodDoxMDAlO3dpZHRoOjI0cHg7dG9wOi0xMDAlO2xlZnQ6LTUzLjgzMzMzcHh9LnNsaWRlcl92ZXJ0aWNhbCAuc2xpZGVyX190b29sdGlwe2xlZnQ6YXV0bztyaWdodDowO3BhZGRpbmc6M3B4IDhweH0uc2xpZGVyX3ZlcnRpY2FsIC5zbGlkZXJfX3Rvb2x0aXA6OmFmdGVye2xlZnQ6YXV0bztyaWdodDotMTUuNjY2NjdweDttYXJnaW46MDt0b3A6My42NjY2N3B4O2JvcmRlci10b3A6OC4zMzMzM3B4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0OjguMzMzMzNweCBzb2xpZCAjYjQ0NjUwfS5kZW1vLXBhbmVsX19zbGlkZXItY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDozNDBweDtoZWlnaHQ6MTkwcHg7cGFkZGluZzoyMHB4fS5kZW1vLXBhbmVsX19zZXR0aW5ne21hcmdpbi1sZWZ0OjM1cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtwYWRkaW5nOjRweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmRlbW8tcGFuZWx7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzttYXgtd2lkdGg6NzAwcHg7d2lkdGg6MTAwJTttYXgtd2lkdGg6NzAwcHg7aGVpZ2h0OmF1dG87anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6Y2VudGVyfWlucHV0W3R5cGU9J251bWJlcidde21hcmdpbjozcHg7cGFkZGluZzozcHg7Ym94LXNpemluZzpib3JkZXItYm94fS5kZW1vLXBhZ2VfX2RlbW8tcGFuZWx7bWFyZ2luOjEwcHggMjBweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjNDIwNzA3NzF9LmRlbW8tcGFnZXt3aWR0aDoxMDAlO21hcmdpbjowO3BhZGRpbmc6NTBweCAwcHggMHB4IDIwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn1cXG5cIiwgXCJcIl0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCJ7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbX2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIihcIi5jb25jYXQoaXRlbVsyXSwgXCIpIGFuZCAoXCIpLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCkuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucykge1xuICB2YXIgc3R5bGVzID0gW107XG4gIHZhciBuZXdTdHlsZXMgPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNzcyA9IGl0ZW1bMV07XG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXTtcbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9O1xuXG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHBhcnRzOiBbcGFydF1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV07XG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG4gICAgdmFyIGogPSAwO1xuXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKys7XG5cbiAgICAgIGZvciAoOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW107XG5cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7XG4gICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICByZWZzOiAxLFxuICAgICAgICBwYXJ0czogcGFydHNcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMob3B0aW9ucy5hdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBvcHRpb25zLmF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgYnRvYSkge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5hdHRyaWJ1dGVzID0gdHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcyA9PT0gJ29iamVjdCcgPyBvcHRpb25zLmF0dHJpYnV0ZXMgOiB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV07XG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuICAgICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICAgIGRvbVN0eWxlLnJlZnMtLTtcbiAgICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICB2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgICAgYWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbWF5UmVtb3ZlLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9kb21TdHlsZSA9IG1heVJlbW92ZVtfaV07XG5cbiAgICAgIGlmIChfZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9kb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIF9kb21TdHlsZS5wYXJ0c1tqXSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW19kb21TdHlsZS5pZF07XG4gICAgICB9XG4gICAgfVxuICB9O1xufTsiXSwic291cmNlUm9vdCI6IiJ9