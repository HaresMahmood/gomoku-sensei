if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let d={};const o=e=>i(e,c),b={module:{uri:c},exports:d,require:o};s[c]=Promise.all(r.map((e=>b[e]||o(e)))).then((e=>(a(...e),d)))}}define(["./workbox-5c4f35d9"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"dist/controller/gameController.js",revision:"3d5a7ab770d3c38c6121bc758162405e"},{url:"dist/factories/aiFactory.js",revision:"29dd28b3729a4b2864355d3a6ca75152"},{url:"dist/factories/factory.js",revision:"5c7f99e3d4eaae821996a487acc6a5e2"},{url:"dist/model/game.js",revision:"a62e098a8e829bb32a5cf2741c252544"},{url:"dist/model/oldGameModel.js",revision:"140c69123ee89f5b00faa99bd7e32766"},{url:"dist/player/ai/ai.js",revision:"314dcc26b9304a10ae5df4846cdceae7"},{url:"dist/player/ai/debug/simulationAI.js",revision:"2f8057e7d3d6b05a42a57597989befa3"},{url:"dist/player/ai/dynamicAI.js",revision:"81c7c0fcfc524792919dd14506ec73f7"},{url:"dist/player/ai/killerAI.js",revision:"90f116bb0f632828edbd8b52746271b9"},{url:"dist/player/ai/randomAI.js",revision:"c8ab8a4d28dbb8148d2a31bb615b0d30"},{url:"dist/player/ai/tree/dynamicNode.js",revision:"ddc43ac0f4c5289c96d8447d44f7a12f"},{url:"dist/player/ai/tree/node.js",revision:"49a416f134245d288635e32fa22e1dfd"},{url:"dist/player/ai/tree/state.js",revision:"d9ded523a10ae892e165a01e6b9a7e48"},{url:"dist/player/ai/tree/staticNode.js",revision:"1169caa2e719455c2d56476790b41e5d"},{url:"dist/player/human.js",revision:"ed35366699a9a5c2c3d5f10dcda10cd1"},{url:"dist/player/player.js",revision:"21ed181015b7a71ece05941268100b70"},{url:"dist/scripts/defaultScript.js",revision:"e053abd38804321a0f806bd1f2589e67"},{url:"dist/scripts/gameScript.js",revision:"4c6c89fd37a4f1f44f3d41d0c51a86b0"},{url:"dist/scripts/homeScript.js",revision:"e02b2d9b8b26bea639651e8b8574187a"},{url:"dist/scripts/settingsScript.js",revision:"1debb265b7dace2eada7f608b1d07e35"},{url:"dist/utility/event.js",revision:"052536cbd0261dd4b2467b1711bf1a4d"},{url:"dist/view/defaultView.js",revision:"59b7b60c99e34a509ddc3a7a650f3a64"},{url:"dist/view/gameView.js",revision:"3898b4248b45debfdc8bc1f92801ea15"},{url:"dist/view/homeView.js",revision:"bc9850c5ebb8a3e976e6c8b543b18278"},{url:"dist/view/pages/gamePage.js",revision:"74452464bed66434718e59c0aae343d3"},{url:"dist/view/pages/homePage.js",revision:"818bee5833edd037aed157967624ba22"},{url:"dist/view/pages/page.js",revision:"62d5066db506a307f71d8ed20d473f2b"},{url:"dist/view/pages/rulesPage.js",revision:"f30c3905cf1119486f62d5fbf3019683"},{url:"dist/view/pages/settingsPage.js",revision:"419b8510c1fac6968c53b79efa27ddff"},{url:"dist/view/settingsView.js",revision:"ade1f5596e53acd175a8dfcf0f1f4cb1"},{url:"index.html",revision:"b7902aad5eeb7b7bc07bc537e064f66a"},{url:"manifest.webmanifest",revision:"1513cbd9aa47de0a0deb93e231230a3d"},{url:"README.md",revision:"53cb597e81bd8474618fc795178b3663"},{url:"res/audio/gong.mp3",revision:"f62fd0eb3381ff4586e8a2a25bb7f2d4"},{url:"res/audio/token.mp3",revision:"c0473de6e59448cb5d13c16f7a9892d1"},{url:"res/icons/dropshadow/maskable_icon_x192.png",revision:"0355893eee859d131dea4760916886cc"},{url:"res/icons/dropshadow/maskable_icon_x512.png",revision:"dbad3d4fe9eb38643acb91c284bf639c"},{url:"res/icons/dropshadow/maskable_icon.png",revision:"2118fe9d8863c23ac69076472ba2d806"},{url:"res/icons/go/icon.png",revision:"b9263a89d68f5585524904f7b7560ce5"},{url:"res/icons/go/maskable_icon_x192.png",revision:"ed217a945838c5de58d717ad2abd21b2"},{url:"res/icons/go/maskable_icon_x512.png",revision:"75050a8d2b0b932de02d6e87039ad49d"},{url:"res/icons/go/maskable_icon.png",revision:"5ad6efc4608fcaa524dd1c5bc0572bfb"},{url:"res/icons/icon-192x192.png",revision:"83ec8f2b0ba8965ab787cc1b02c084cd"},{url:"res/icons/icon-256x256.png",revision:"3a6fcca1ab5e412e9a9381a01fed91ef"},{url:"res/icons/icon-384x384.png",revision:"ca9d160478c6b9f624cc4ac530ab70c0"},{url:"res/icons/icon-512x512.png",revision:"d77cb663ae6506175a64f879216aff7e"},{url:"res/icons/icon.png",revision:"5a15e657e89e9c6032257a6f80fb9f3e"},{url:"res/screenshot.png",revision:"9efa68e8d1c1ef02570e52cb3d794d49"},{url:"src/css/components/progress-components.css",revision:"cb7668a98f3406c99bb7094fac6ecb51"},{url:"src/css/components/select-component.css",revision:"95525231965d39c52fe66c86d2f7fd00"},{url:"src/css/components/slider-component.css",revision:"7b41b3e59f71d87868cb1ab32956b5ed"},{url:"src/css/components/switch-component.css",revision:"1ea43b686cce4c4f3454a3a42e56e3df"},{url:"src/css/pages/main.css",revision:"933e2bf16ccdf1d5211c0377c7eda02f"},{url:"src/css/pages/modal.css",revision:"5f7abc993c9d28f8045b8ec2cc1f8e3b"},{url:"src/css/pages/sub-pages/game.css",revision:"f8e1ed36b2ad2a1c5db78e826e8dcfc2"},{url:"src/css/pages/sub-pages/home.css",revision:"0ed9ffa9969d0f9864d102ed1a7b3898"},{url:"src/css/pages/sub-pages/settings.css",revision:"51ac965209186499a437de135e7cd224"},{url:"src/css/pages/subpage.css",revision:"4e246851fc36c9ba28e2f68cf6ea4fb9"},{url:"src/css/style.css",revision:"e2aebb4f503251c7c2fb22f161b6693a"},{url:"src/css/variables.css",revision:"5bf120d78aab58fb2b45bae86818bcc6"},{url:"src/html/game.html",revision:"ed8ef5ffd3e81bad987e8003655fc9d7"},{url:"src/html/home.html",revision:"d4a775f88e45b8d2518c0b2943f91657"},{url:"src/html/rules.html",revision:"00b8f727eae49a83701a15b1e99074da"},{url:"src/html/settings.html",revision:"13eb2ff08b3cb5a5b60630ecd080e4e6"},{url:"src/ts/controller/gameController.ts",revision:"8e7d8713db0f96a6830382fd050ff733"},{url:"src/ts/factories/aiFactory.ts",revision:"da967ba15bfbbfe6d77b5e5af46bc106"},{url:"src/ts/factories/factory.ts",revision:"1febd9842cdf309ba58e43134eee9cfe"},{url:"src/ts/model/game.ts",revision:"e86220b14c757872276cc09d74ec3464"},{url:"src/ts/model/oldGameModel.ts",revision:"6d739f7b21a49e9f171b5cfd9b578116"},{url:"src/ts/player/ai/ai.ts",revision:"59f069413649aea3ff53027c75a1e160"},{url:"src/ts/player/ai/debug/simulationAI.js",revision:"639fa963d56bde956e9cbae1756b7e73"},{url:"src/ts/player/ai/dynamicAI.ts",revision:"878e0a28b17abc88a4dbd1fe08d0685b"},{url:"src/ts/player/ai/killerAI.ts",revision:"69c37c3d13b114517a32fa4aad149e88"},{url:"src/ts/player/ai/randomAI.ts",revision:"ae96123f2ad87e3ec71b61f1501baf5f"},{url:"src/ts/player/ai/tree/dynamicNode.ts",revision:"5ff1a5b8304b444ed43538df637c6a4c"},{url:"src/ts/player/ai/tree/node.ts",revision:"bb9b97285e9cf8074d3523ce8a8238ba"},{url:"src/ts/player/ai/tree/state.ts",revision:"ef643121b44b03049db23a348de17832"},{url:"src/ts/player/ai/tree/staticNode.ts",revision:"343aaece6dfea5a213c54024bef62a0d"},{url:"src/ts/player/human.ts",revision:"7e62f70d66c190363208a8f6aa12817f"},{url:"src/ts/player/player.ts",revision:"aad836bbb15904b91a17205125385795"},{url:"src/ts/scripts/defaultScript.js",revision:"9b990adec9138fc5ca4212777b580154"},{url:"src/ts/scripts/gameScript.js",revision:"2d18f9037caf0a75a77abd393bdce28b"},{url:"src/ts/scripts/homeScript.js",revision:"d7b9c71e562540ce9d85961c25850dd0"},{url:"src/ts/scripts/settingsScript.js",revision:"3210af40e805f0f59e3a2eaedbed0623"},{url:"src/ts/utility/event.js",revision:"b4ca194487a0646f6dcb598422df45e4"},{url:"src/ts/view/defaultView.js",revision:"0b154628c65b35d4fc75c5289bd0c98c"},{url:"src/ts/view/gameView.js",revision:"d7f36237e9892820121674695b800acb"},{url:"src/ts/view/homeView.js",revision:"b7e43042f79e2562dd5c2a701e961623"},{url:"src/ts/view/pages/gamePage.ts",revision:"a5355974fe965bb9ce21e016a5f61d67"},{url:"src/ts/view/pages/homePage.ts",revision:"4f2f65111cba6dee85800d55f76a087c"},{url:"src/ts/view/pages/page.ts",revision:"5b43cb2db60248876de4d3c4c485c938"},{url:"src/ts/view/pages/rulesPage.ts",revision:"0c5b1c62975090ecf703fff0fd2fded9"},{url:"src/ts/view/pages/settingsPage.ts",revision:"4931e4bffb1d3dd6d9381f921ca3de47"},{url:"src/ts/view/settingsView.js",revision:"bce7f197458a427a8a58fc9e67e4fbf7"},{url:"tsconfig.json",revision:"aeda525958090ade1c9e2c35d976d294"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
