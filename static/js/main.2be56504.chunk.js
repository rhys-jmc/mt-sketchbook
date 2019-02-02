(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(29)},19:function(e,t,a){},21:function(e,t,a){},23:function(e,t,a){},25:function(e,t,a){},27:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(10),i=a.n(c),r=a(8),s=a(12),l=a(7),u=a(6),f=a(1),p=a(2),d=a(4),g=a(3),h=a(5),m=500,v=500,b=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(c)))).state={drawing:!1},a.canvasRef=o.a.createRef(),a.getCanvasContext=function(){return a.canvasRef.current&&a.canvasRef.current.getContext("2d")},a.handleMouseDown=function(e){var t=e.pageX,n=e.pageY,o=a.currentCanvasRef,c=o.offsetLeft,i=o.offsetTop,r=a.getCanvasContext();r&&a.setState({drawing:!0},function(){r.beginPath(),r.moveTo(t-c,n-i)})},a.handleMouseMove=function(e){var t=e.pageX,n=e.pageY;if(a.state.drawing){var o=a.currentCanvasRef,c=o.offsetLeft,i=o.offsetTop,r=a.getCanvasContext();r&&(r.lineTo(t-c,n-i),r.stroke())}},a.handleMouseUp=function(){a.setState({drawing:!1},function(){var e=a.getCanvasContext();e&&(e.closePath(),a.props.onMouseUp(e.getImageData(0,0,m,v)))})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"shouldComponentUpdate",value:function(e){var t=e.imageData;return this.props.imageData!==t}},{key:"render",value:function(){var e=this.getCanvasContext();return e&&e.putImageData(this.props.imageData,0,0),o.a.createElement("canvas",{width:m,height:v,ref:this.canvasRef,onMouseDown:this.handleMouseDown,onMouseMove:this.handleMouseMove,onMouseUp:this.handleMouseUp})}},{key:"currentCanvasRef",get:function(){return this.canvasRef.current||{width:0,height:0,offsetLeft:0,offsetTop:0}}}]),t}(n.Component),C=(a(19),function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(o)))).state={open:!1},a.handleKeyUp=function(e){"Escape"===e.key&&a.closeModal()},a.closeModal=function(){a.setState({open:!1})},a.openModal=function(e){a.setState({open:!0},e)},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keyup",this.handleKeyUp)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.handleKeyUp)}},{key:"render",value:function(){var e=this,t=this.closeModal,a=this.openModal;return o.a.createElement(o.a.Fragment,null,this.props.render({closeModal:t,openModal:a}),this.state.open&&o.a.createElement("div",{className:"ModalBackground",style:open?{}:{display:"none"},onClick:function(){return e.closeModal()}},o.a.createElement("div",{className:"Modal",onClick:function(e){e.stopPropagation()}},this.props.children({closeModal:t,openModal:a}))))}}]),t}(n.Component)),w=(a(21),a(11)),k=a.n(w),y=(a(23),function(e){var t=e.isActive,a=e.label,n=e.onClick;return o.a.createElement("li",{className:"PageListItem"},o.a.createElement("button",{className:k()("ItemButton",t&&"ItemButtonActive"),onClick:n,disabled:t},a))}),M=(a(25),function(e){var t=e.activePageId,a=e.onPageClick,n=e.pages;return o.a.createElement("ul",{className:"PageList"},n.map(function(e){var n=e.id,c=e.label;return o.a.createElement(y,{key:n,isActive:n===t,label:c,onClick:a(n)})}))}),P=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(c)))).state={newPage:"",pages:[]},a.inputRef=o.a.createRef(),a.handleChange=function(e){return function(t){var n=t.target.value;a.setState(function(t){return Object(u.a)({},t,Object(l.a)({},e,n))})}},a.handleMouseUp=function(e){a.setState(function(t){var a=t.pages,n=Object(s.a)(t,["pages"]);if("undefined"!==typeof n.activePageId){var o=n.activePageId,c=Object(u.a)({},a[o],{imageData:e}),i=[].concat(Object(r.a)(a.slice(0,o)),[c],Object(r.a)(a.slice(o+1)));return Object(u.a)({},n,{pages:i})}return Object(u.a)({pages:a},n)})},a.handleNewPageClick=function(e){return function(){e(function(){a.inputRef.current&&a.inputRef.current.focus()})}},a.handlePageClick=function(e){return function(){a.setState({activePageId:e})}},a.handleSubmit=function(e){return function(t){t.preventDefault(),a.setState(function(e){var t=e.pages[e.pages.length-1],a={id:t?t.id+1:0,imageData:new ImageData(m,v),label:e.newPage};return{newPage:"",pages:[].concat(Object(r.a)(e.pages),[a])}},function(){e(),a.handlePageClick(a.state.pages.slice(-1)[0].id)()})}},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Sketchbook"),o.a.createElement("div",{className:"Container"},o.a.createElement("div",{className:"outline"},o.a.createElement("div",null,o.a.createElement(C,{render:function(t){var a=t.openModal;return o.a.createElement("button",{className:"btn large primary",onClick:e.handleNewPageClick(a)},"+ New Page")}},function(t){var a=t.closeModal,n=e.handleSubmit(a);return o.a.createElement("form",{className:"Form",onSubmit:n},o.a.createElement("label",{htmlFor:"page-name"},"Page Name:"),o.a.createElement("input",{autoComplete:"off",name:"page-name",id:"page-name",type:"text",value:e.state.newPage,onChange:e.handleChange("newPage"),ref:e.inputRef,pattern:e.state.pages.length?"^(?:(?!(^".concat(e.state.pages.map(function(e){return e.label}).join("$)|(^"),"$)).)*$"):void 0,required:!0}),o.a.createElement("button",{className:"large primary",type:"submit"},"Create New Page"))})),"undefined"!==typeof this.state.activePageId&&o.a.createElement("div",null,o.a.createElement(M,{pages:this.state.pages,activePageId:this.state.activePageId,onPageClick:this.handlePageClick}))),"undefined"!==typeof this.state.activePageId&&o.a.createElement(b,{imageData:this.state.pages[this.state.activePageId].imageData,onMouseUp:this.handleMouseUp})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(27);i.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,2,1]]]);
//# sourceMappingURL=main.2be56504.chunk.js.map