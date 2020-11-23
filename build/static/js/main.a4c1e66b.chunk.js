(this.webpackJsonpkirjapp=this.webpackJsonpkirjapp||[]).push([[0],{113:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),i=a.n(l),c=a(8),o=a(16),u=a.n(o),s=a(24),m=a(29),d=a.n(m),E=null,p=function(e){E="bearer ".concat(e)},v={getAll:function(e){return d.a.get("/api/books",{params:{q:"".concat(e),maxResults:12,projection:"full"}}).then((function(e){return e.data.data.items}))},getOne:function(e){return d.a.get("/api/book/"+e,{params:{projection:"full"}}).then((function(e){return e.data.data}))},create:function(e){var t={headers:{Authorization:E}};return d.a.post("/api/myBooks",e,t).then((function(e){return e.data}))},getReviews:function(e){return d.a.get("/api/myBooks/"+e).then((function(e){return e.data}))},getUserReviews:function(e){p(e.token);var t={headers:{Authorization:E}};return d.a.get("/api/userReviews",t).then((function(e){return e.data}))},createUser:function(){var e=Object(s.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/users",t);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),loginUser:function(){var e=Object(s.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/login",t);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setToken:p},g=a(66),b=a.n(g),f=a(148),h=a(150),j=a(163),A=a(152),O=a(11),w=a(67),k=a(153),y=a(154),x=a(166),I=a(164),C=a(165),S=a(155),N={.5:"Hy\xf6dyt\xf6n",1:"Hy\xf6dyt\xf6n+",1.5:"Huono",2:"Huono+",2.5:"Ok",3:"Ok+",3.5:"Hyv\xe4",4:"Hyv\xe4+",4.5:"Erinomainen",5:"Erinomainen+"},R=Object(f.a)((function(e){return{root:{flexGrow:1},inputRating:{width:200,height:50,display:"flex",alignItems:"center"},outputRating:{width:150,height:20,display:"flex",alignItems:"center"},message:{width:"70%","& > * + *":{marginTop:e.spacing(2)}},divider:{backgroundColor:"#E5E5E5"}}})),B=function(e){var t=Object(O.g)().id,a=Object(n.useState)(JSON.parse(window.localStorage.getItem("loggedUser"))||null),l=Object(c.a)(a,1)[0],i=Object(n.useState)(""),o=Object(c.a)(i,2),u=o[0],s=o[1],m=Object(n.useState)(""),d=Object(c.a)(m,2),E=d[0],p=d[1],g=Object(n.useState)([]),f=Object(c.a)(g,2),B=f[0],T=f[1],K=r.a.useState(0),W=Object(c.a)(K,2),z=W[0],L=W[1],U=r.a.useState(-1),J=Object(c.a)(U,2),G=J[0],P=J[1],H=Object(n.useState)(null),Z=Object(c.a)(H,2),F=Z[0],Y=Z[1],D=Object(n.useState)(""),M=Object(c.a)(D,2),Q=M[0],X=M[1],V=Object(n.useState)(!1),q=Object(c.a)(V,2),_=q[0],$=q[1],ee=Object(n.useState)(e.books),te=Object(c.a)(ee,2),ae=te[0],ne=te[1],re=R();Object(n.useEffect)((function(){var e=!0;return v.getOne(t).then((function(t){e&&ne(t),document.title="KirjApp: "+t.volumeInfo.title})),v.getReviews(t).then((function(t){e&&(t&&t.forEach((function(e){e.date=ie(e.date)})),T(t),_&&$(!1))})),function(){document.title="KirjApp",e=!1}}),[e.books,t,_]);var le,ie=function(e){return e.substr(11,5)+" GMT - "+e.substr(8,2)+"."+e.substr(5,2)+"."+e.substr(0,4)},ce=function(e){e.preventDefault();var a={book_title:ae.volumeInfo.title,book_id:t,writer:u,reviewtext:E,stars:z};s(""),p(""),L(0),v.create(a).catch((function(e){console.log(e),Y("Arvostelusi tallentamisessa tapahtui virhe"),X("error")})),Y("Arvostelusi on tallennettu"),X("success"),setTimeout((function(){$(!0)}),500)},oe=function(e){s(e.target.value)};return r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(h.a,{key:ae.id,item:!0},r.a.createElement("div",{className:re.root},r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0,padding:0},r.a.createElement(h.a,{item:!0,xs:5},r.a.createElement(w.Img,{src:"imageLinks"in Object(ae.volumeInfo)?"".concat(ae.volumeInfo.imageLinks.smallThumbnail):"".concat(b.a),alt:"Book",width:"170px",height:"250px"}),r.a.createElement("div",{className:re.outputRating},"averageRating"in Object(ae.volumeInfo)?r.a.createElement(x.a,{name:"read-only",value:ae.volumeInfo.averageRating,precision:.5,readOnly:!0,size:"medium"}):r.a.createElement(x.a,{name:"read-only",value:0,precision:.5,readOnly:!0,size:"medium"}),r.a.createElement(A.a,{variant:"subtitle1"},"averageRating"in Object(ae.volumeInfo)?r.a.createElement("div",null,"(",ae.volumeInfo.averageRating,")"):r.a.createElement("div",null,"(0)")))),r.a.createElement(h.a,{item:!0,xs:7},r.a.createElement(A.a,{variant:"subtitle2"},Object(ae.volumeInfo).title),r.a.createElement("br",null),r.a.createElement(A.a,{variant:"body2"},"Tekij\xe4(t): ",Object(ae.volumeInfo).authors?ae.volumeInfo.authors.join(", "):""),r.a.createElement("br",null),r.a.createElement(A.a,{variant:"caption"},"description"in Object(ae.volumeInfo)?r.a.createElement("div",null,r.a.createElement(j.a,{id:"description",inputProps:{style:{fontSize:14}},value:(le=ae.volumeInfo.description,le.replace(/(<([^>]+)>)|(&quot;){0,1}/gi,"").trim()),variant:"outlined",multiline:!0,size:"small",rows:"8",rowsMax:"8",fullWidth:!0,label:"Kuvaus:"})):r.a.createElement("div",null))))))),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"h6",color:"inherit"},"Kirjoita arvostelu"))),r.a.createElement(h.a,{container:!0,spacing:2},r.a.createElement("div",null,r.a.createElement(k.a,null,r.a.createElement("span",null,"\xa0"),r.a.createElement(j.a,{id:"writer",value:u,variant:"outlined",size:"small",onChange:oe,label:"Nimimerkki"}))),r.a.createElement("div",{style:{width:"100%"}},r.a.createElement(k.a,null,r.a.createElement("span",null,"\xa0"),r.a.createElement(j.a,{id:"review",value:E,variant:"outlined",multiline:!0,size:"small",rowsMax:"4",fullWidth:!0,onChange:function(e){p(e.target.value)},label:"Kirjoita arvostelu"}),r.a.createElement("div",{className:re.inputRating},r.a.createElement(x.a,{name:"hover-feedback",value:z,precision:.5,onChange:function(e,t){L(t)},onChangeActive:function(e,t){P(t)}}),r.a.createElement("div",null,r.a.createElement(A.a,{variant:"caption"},null!==z&&r.a.createElement(I.a,{ml:2,p:0},N[-1!==G?G:z]))))),r.a.createElement("br",null),r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0,padding:0},r.a.createElement(h.a,{item:!0,xs:4},r.a.createElement("div",null,(l?l.username:u)&&E&&z?r.a.createElement(y.a,{variant:"contained",id:"addButton",onClick:ce},"L\xe4het\xe4"):r.a.createElement(y.a,{variant:"contained",id:"addButton",disabled:!0,onClick:ce},"L\xe4het\xe4"))),r.a.createElement(h.a,{item:!0,xs:8},r.a.createElement("div",{className:re.message},F?r.a.createElement(C.a,{severity:Q},F):null)))))),r.a.createElement("br",null),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"h6",color:"inherit"},"KirjApp-k\xe4ytt\xe4jien antamat arvostelut:"),r.a.createElement("br",null))),B?B.map((function(e){return r.a.createElement("div",{key:e._id},r.a.createElement("div",{className:re.root},r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0,padding:0},r.a.createElement(h.a,{item:!0,xs:2},r.a.createElement(A.a,{variant:"caption"},"KirjApp t\xe4hdet:")),r.a.createElement(h.a,{item:!0,xs:4},r.a.createElement("div",{className:re.outputRating},r.a.createElement(x.a,{name:"read-only",value:e.stars,precision:.5,readOnly:!0,size:"small"}))),r.a.createElement(h.a,{item:!0,xs:6},r.a.createElement(A.a,{variant:"caption"},e.date))),r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0},r.a.createElement(h.a,{item:!0,xs:12},r.a.createElement(A.a,{variant:"caption"},'"',e.reviewtext,'" - ',e.writer))))),r.a.createElement(S.a,{className:re.divider}))})):r.a.createElement(A.a,{variant:"body1"},"Teokselle ei l\xf6ydy arvosteluja."))},T=Object(f.a)((function(e){return{message:{width:"70%","& > * + *":{marginTop:e.spacing(2)}}}})),K=function(){var e=Object(O.f)(),t=Object(n.useState)(""),a=Object(c.a)(t,2),l=a[0],i=a[1],o=Object(n.useState)(""),m=Object(c.a)(o,2),d=m[0],E=m[1],p=Object(n.useState)(null),g=Object(c.a)(p,2),b=g[0],f=g[1],w=Object(n.useState)(""),x=Object(c.a)(w,2),I=x[0],S=x[1],N=T(),R=function(){var t=Object(s.a)(u.a.mark((function t(a){var n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),n={username:l,password:d},i(""),E(""),t.next=6,v.createUser(n).catch((function(e){S("error"),f(e.response.data.error),setTimeout((function(){f(null)}),3e3)}));case 6:(r=t.sent)&&(S("success"),f("K\xe4ytt\xe4j\xe4 ".concat(r.username," on tallennettu")),setTimeout((function(){f(null),e.push("/")}),2e3));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"h6",color:"inherit"},"Profiilin luonti"))),r.a.createElement(h.a,{container:!0,spacing:2},r.a.createElement("div",null,r.a.createElement(k.a,null,r.a.createElement("span",null,"\xa0"),r.a.createElement(j.a,{id:"writer",value:l,variant:"outlined",size:"small",onChange:function(e){i(e.target.value)},label:"Nimimerkki"}),r.a.createElement("span",null,"\xa0"),r.a.createElement(j.a,{id:"password",value:d,variant:"outlined",size:"small",type:"password",onChange:function(e){E(e.target.value)},label:"Salasana"}))),r.a.createElement("div",{style:{width:"100%"}},r.a.createElement("br",null),r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0,padding:0},r.a.createElement(h.a,{item:!0,xs:4},r.a.createElement("div",null,l&&d?r.a.createElement(y.a,{variant:"contained",id:"createProfileButton",onClick:R,title:"Luo profiili"},"Luo profiili"):r.a.createElement(y.a,{variant:"contained",id:"createProfileButton",disabled:!0,onClick:R}," Luo profiili"))),r.a.createElement(h.a,{item:!0,xs:8},r.a.createElement("div",{className:N.message},b?r.a.createElement(C.a,{severity:I},b):null)))))))},W=Object(f.a)((function(e){return{message:{width:"70%","& > * + *":{marginTop:e.spacing(2)}}}})),z=function(e){var t=Object(O.f)(),a=Object(n.useState)(null),l=Object(c.a)(a,2)[1],i=Object(n.useState)(""),o=Object(c.a)(i,2),m=o[0],d=o[1],E=Object(n.useState)(""),p=Object(c.a)(E,2),g=p[0],b=p[1],f=Object(n.useState)(null),w=Object(c.a)(f,2),x=w[0],I=w[1],S=Object(n.useState)(""),N=Object(c.a)(S,2),R=N[0],B=N[1],T=W();Object(n.useEffect)((function(){var e=window.localStorage.getItem("loggedUser");if(e){var t=JSON.parse(e);l(t),v.setToken(t.token)}}),[]);var K=function(){var a=Object(s.a)(u.a.mark((function a(n){var r,i;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),r={username:m,password:g},d(""),b(""),a.next=6,v.loginUser(r).catch((function(e){B("error"),I(e.response.data.error),setTimeout((function(){I(null)}),3e3)}));case 6:if(!(i=a.sent)){a.next=16;break}return window.localStorage.setItem("loggedUser",JSON.stringify(i)),v.setToken(i.token),a.next=12,l(i);case 12:e.onLoggedUser(i),B("success"),I("K\xe4ytt\xe4j\xe4 ".concat(i.username," on kirjautunut")),setTimeout((function(){I(null),t.push("/")}),1e3);case 16:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"h6",color:"inherit"},"Kirjautuminen"))),r.a.createElement(h.a,{container:!0,spacing:2},r.a.createElement("div",null,r.a.createElement(k.a,null,r.a.createElement("span",null,"\xa0"),r.a.createElement(j.a,{id:"writer",value:m,variant:"outlined",size:"small",onChange:function(e){d(e.target.value)},label:"Nimimerkki"}),r.a.createElement("span",null,"\xa0"),r.a.createElement(j.a,{id:"password",value:g,variant:"outlined",size:"small",type:"password",onChange:function(e){b(e.target.value)},label:"Salasana"}))),r.a.createElement("div",{style:{width:"100%"}},r.a.createElement("br",null),r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0,padding:0},r.a.createElement(h.a,{item:!0,xs:4},r.a.createElement("div",null,m&&g?r.a.createElement(y.a,{variant:"contained",id:"loginButton",onClick:K,title:"Kirjaudu sis\xe4\xe4n"}," Kirjaudu sis\xe4\xe4n"):r.a.createElement(y.a,{variant:"contained",id:"loginButton",disabled:!0,onClick:K}," Kirjaudu sis\xe4\xe4n"))),r.a.createElement(h.a,{item:!0,xs:8},r.a.createElement("div",{className:T.message},x?r.a.createElement(C.a,{severity:R},x):null)))))))},L=Object(f.a)((function(e){return{root:{flexGrow:1},inputRating:{width:200,height:50,display:"flex",alignItems:"center"},outputRating:{width:150,height:20,display:"flex",alignItems:"center"},message:{width:"70%","& > * + *":{marginTop:e.spacing(2)}},divider:{backgroundColor:"#E5E5E5"}}})),U=function(){var e=Object(n.useState)(JSON.parse(window.localStorage.getItem("loggedUser"))),t=Object(c.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)([]),o=Object(c.a)(i,2),m=o[0],d=o[1],E=Object(n.useState)(!1),p=Object(c.a)(E,2),g=p[0],b=p[1],f=L();Object(n.useEffect)((function(){var e=window.localStorage.getItem("loggedUser");if(e){var t=JSON.parse(e);l(t),v.setToken(t.token)}}),[]);var j=function(){var e=Object(s.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.next=3,v.getUserReviews(a);case 3:(n=e.sent).forEach((function(e){var t;e.date=(t=e.date).substr(11,5)+" GMT - "+t.substr(8,2)+"."+t.substr(5,2)+"."+t.substr(0,4)})),d(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(A.a,{variant:"body1"},"Nimimerkki: ",a.username),r.a.createElement("div",null,r.a.createElement("br",null),g?r.a.createElement(y.a,{variant:"contained",id:"hideReviewsButton",onClick:function(e){b(!1),d([])}}," Piilota arvosteluni"):r.a.createElement(y.a,{variant:"contained",id:"showReviewsButton",onClick:j}," N\xe4yt\xe4 arvosteluni")),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"h6",color:"inherit"},g?"Kirjoittamani arvostelut: ":""),r.a.createElement("br",null))),m?m.map((function(e){return r.a.createElement("div",{key:e._id},r.a.createElement("div",{className:f.root},r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0},r.a.createElement(h.a,{item:!0,xs:12},r.a.createElement(A.a,{variant:"caption"},e.book_title?e.book_title:""))),r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0,padding:0},r.a.createElement(h.a,{item:!0,xs:2},r.a.createElement(A.a,{variant:"caption"},"KirjApp t\xe4hdet:")),r.a.createElement(h.a,{item:!0,xs:4},r.a.createElement("div",{className:f.outputRating},r.a.createElement(x.a,{name:"read-only",value:e.stars,precision:.5,readOnly:!0,size:"small"}))),r.a.createElement(h.a,{item:!0,xs:6},r.a.createElement(A.a,{variant:"caption"},e.date))),r.a.createElement(h.a,{container:!0,item:!0,xs:12,spacing:0},r.a.createElement(h.a,{item:!0,xs:12},r.a.createElement(A.a,{variant:"caption"},'"',e.reviewtext,'" - ',e.writer))))),r.a.createElement(S.a,{className:f.divider}))})):r.a.createElement("div",null,r.a.createElement(A.a,{variant:"body1"},g?"Et ole viel\xe4 kirjoittanut arvosteluja":"")))},J=a(70),G=a.n(J),P=a(156),H=a(74),Z=a(19),F=a(157),Y=a(158),D=a(160),M=a(159),Q=a(162),X=a(161),V=Object(f.a)((function(e){return{bookCard:{height:250,width:130,backgroundColor:"#E5E5E5",padding:e.spacing(0),flexWrap:"nowrap"},media:{height:120,width:130,alignItems:"center",justifyContent:"center"},filterTextField:{"& > *":{margin:e.spacing(1),width:"70ch"},backgroundColor:"#FFFFFF"},button:{display:"flex",flexWrap:"nowrap",minWidth:130,width:"100%"},appHeader:{flexGrow:1,width:"70ch"},typography:{fontSize:10},menuButton:{marginRight:e.spacing(1),color:"black"},link:{"& > * + *":{marginRight:e.spacing(2),textDecoration:"none"}},title:{flexGrow:1}}})),q=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)(""),o=Object(c.a)(i,2),u=o[0],s=o[1],m=Object(n.useState)(null),d=Object(c.a)(m,2),E=d[0],p=d[1],g=V();Object(n.useEffect)((function(){var e=window.localStorage.getItem("loggedUser");if(e){var t=JSON.parse(e);p(t),v.setToken(t.token)}}),[]),Object(n.useEffect)((function(){document.title="KirjApp";var e=!0;return""!==u.trim()&&u.trim().length>0&&v.getAll(u).then((function(t){e&&l(t)})),function(){return e=!1}}),[u]);var b={padding:5},f=Object(O.h)("/reviews/:id"),w=f?a.filter((function(e){return e.id===f.params.id})).map((function(e){return e})):null;return r.a.createElement("div",null,r.a.createElement(P.a,{maxWidth:"sm"},r.a.createElement("div",{className:g.appHeader},r.a.createElement(F.a,{position:"static"},r.a.createElement(Y.a,{variant:"dense"},r.a.createElement(A.a,{variant:"h6",color:"inherit",className:g.title},"KirjApp"),r.a.createElement(A.a,{variant:"subtitle2",color:"inherit"},E?"Kirjautunut: ".concat(E.username):""),E?r.a.createElement(y.a,{color:"inherit",className:g.menuButton,onClick:function(e){p(null),v.setToken(null),window.localStorage.clear()},title:"Kirjaudu ulos",component:Z.b,to:"/"},"Kirjaudu ulos"):""))),r.a.createElement(h.a,{justify:"space-between",container:!0,spacing:2},r.a.createElement(h.a,{item:!0,xs:6},r.a.createElement("div",null,r.a.createElement(A.a,{className:g.link,variant:"body1"},r.a.createElement(Z.b,{style:b,to:"/"},"Etusivu")))),r.a.createElement(h.a,{item:!0,xs:3},r.a.createElement("div",null,r.a.createElement(A.a,{className:g.link,variant:"body1"},E?"":r.a.createElement(Z.b,{style:b,to:"/profile"},"Luo profiili")))),r.a.createElement(h.a,{item:!0,xs:3},r.a.createElement("div",null,r.a.createElement(A.a,{className:g.link,variant:"body1"},E?r.a.createElement(Z.b,{style:b,to:"/user"},"Omat tiedot"):r.a.createElement(Z.b,{style:b,to:"/login"},"Kirjaudu sis\xe4\xe4n"))))),r.a.createElement(O.c,null,r.a.createElement(O.a,{path:"/profile"},r.a.createElement("br",null),r.a.createElement(K,null)),r.a.createElement(O.a,{path:"/login"},r.a.createElement("br",null),r.a.createElement(z,{onLoggedUser:function(e){p(e),window.localStorage.setItem("loggedUser",JSON.stringify(e))}})),r.a.createElement(O.a,{path:"/user"},r.a.createElement("br",null),r.a.createElement(U,null)),r.a.createElement(O.a,{path:"/reviews/:id"},r.a.createElement("br",null),r.a.createElement(B,{books:w})),r.a.createElement(O.a,{path:"/"},r.a.createElement("div",null,r.a.createElement(h.a,{container:!0,spacing:2},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("form",{className:g.filterTextField,noValidate:!0,autoComplete:"off"},r.a.createElement(j.a,{id:"searchText",type:"search",label:"Hae kirjoja kirjan nimell\xe4",variant:"outlined",size:"small",onChange:function(e){e.target.value?l(a.filter((function(t){return t.volumeInfo.title.toLowerCase().includes(e.target.value.toLowerCase())}))):(s(""),l([])),s(e.target.value)}})))),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"subtitle1",color:"inherit"},"Hakutuloksia: ",a?a.length:0))),r.a.createElement(h.a,{container:!0,item:!0,xs:12},r.a.createElement(h.a,{container:!0,spacing:1},a?a.map((function(e){return r.a.createElement(h.a,{key:e.id,item:!0},r.a.createElement("div",{className:g.button},r.a.createElement(H.a,null,r.a.createElement(M.a,{component:Z.b,to:"/reviews/".concat(e.id)},r.a.createElement(D.a,{className:g.bookCard},r.a.createElement(X.a,{className:g.media,image:"imageLinks"in e.volumeInfo?"".concat(e.volumeInfo.imageLinks.smallThumbnail):"".concat(G.a),alt:"Book",width:"80px",height:"100px"}),r.a.createElement(Q.a,null,"averageRating"in e.volumeInfo?r.a.createElement(x.a,{name:"read-only",value:e.volumeInfo.averageRating,precision:.5,readOnly:!0,size:"small"}):r.a.createElement(x.a,{name:"read-only",value:0,precision:.5,readOnly:!0,size:"small"}),r.a.createElement(A.a,{className:g.typography,variant:"caption",component:"h2"},e.volumeInfo.title),r.a.createElement(A.a,{className:g.typography,variant:"caption",color:"textSecondary",component:"p"},e.volumeInfo.authors?e.volumeInfo.authors.join(", "):"")))))))})):[])),r.a.createElement(h.a,{container:!0,spacing:0},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(A.a,{variant:"h6",color:"inherit"}))))))))};i.a.render(r.a.createElement(Z.a,null,r.a.createElement(q,null)),document.getElementById("root"))},66:function(e,t,a){e.exports=a.p+"static/media/KirjApp_logo2.8344431e.svg"},70:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAtiABQAAAFxJREFUWAnt0sENABAUBUH03zOihbk4rPsmP+PNfd/4+K2Pb3undaD+UIIJqoD2bTBBFdC+DSaoAtq3wQRVQPs2mKAKaN8GE1QB7dtggiqgfRtMUAW0b4MJqoD2Bz7qBEwOFkyKAAAAAElFTkSuQmCC"},83:function(e,t,a){e.exports=a(113)}},[[83,1,2]]]);
//# sourceMappingURL=main.a4c1e66b.chunk.js.map