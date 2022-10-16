import{Vector2 as p,WebGLRenderer as L,PerspectiveCamera as q,Scene as M,SplineCurve as R,Vector3 as C,Color as T,OrthographicCamera as D,PlaneGeometry as A,ShaderMaterial as _,Mesh as B}from"https://unpkg.com/three@0.140.0/build/three.module.js";function H(P){const{domElement:e,onClick:t=()=>{},onEnter:f=()=>{},onMove:d=()=>{},onLeave:l=()=>{},onDragStart:u=()=>{},onDragMove:h=()=>{},onDragStop:i=()=>{}}=P,n=new p,a=new p,m=new p,v=new p,r=new p,o={position:n,nPosition:a,hover:!1,down:!1,removeListeners:b};return z(),o;function g(s){m.distanceTo(n)<20&&(y(s),t({position:n,nPosition:a}))}function w(s){o.hover=s.pointerType==="mouse",y(s),f({position:n,nPosition:a})}function c(s){o.down=!0,y(s),m.copy(n),v.copy(n),u({position:n,nPosition:a})}function x(s){y(s),r.copy(n).sub(v),o.down?h({position:n,nPosition:a,startPosition:m,lastPosition:v,delta:r}):o.hover||(o.hover=!0),d({position:n,nPosition:a,startPosition:m,lastPosition:v,delta:r}),v.copy(n)}function k(s){o.down=!1,i()}function E(s){o.down&&(o.down=!1,i()),o.hover=!1,l()}function y(s){const S=e.getBoundingClientRect();n.x=s.clientX-S.left,n.y=s.clientY-S.top,a.x=n.x/S.width*2-1,a.y=-(n.y/S.height)*2+1}function z(){e.addEventListener("click",g),e.addEventListener("pointerenter",w),e.addEventListener("pointerdown",c),e.addEventListener("pointermove",x),e.addEventListener("pointerup",k),e.addEventListener("pointerleave",E)}function b(){e.removeEventListener("click",g),e.removeEventListener("pointerenter",w),e.removeEventListener("pointerdown",c),e.removeEventListener("pointermove",x),e.removeEventListener("pointerup",k),e.removeEventListener("pointerleave",E)}}function W(P){const e={antialias:!1,init(){},initCamera(){},initScene(){},afterResize(){},beforeRender(){},...P},t={renderer:null,camera:null,scene:null,pointer:null,width:0,height:0,wWidth:0,wHeight:0,clock:{startTime:0,time:0,elapsed:0}};return f(),t;function f(){var i,n,a,m;const v=document.createElement("canvas");e.el.appendChild(v),(i=e.init)==null||i.call(e,t),t.renderer=new L({canvas:v,antialias:e.antialias}),(n=e.initRenderer)==null||n.call(e,t),t.camera=new q,t.camera.position.z=50,(a=e.initCamera)==null||a.call(e,t),u(),window.addEventListener("resize",u),t.scene=new M,(m=e.initScene)==null||m.call(e,t),d(),t.clock.startTime=t.clock.lastTime=performance.now(),requestAnimationFrame(l)}function d(){const i={};e.onPointerEnter&&(i.onEnter=e.onPointerEnter),e.onPointerMove&&(i.onMove=e.onPointerMove),e.onPointerMove&&(i.onLeave=e.onPointerLeave),Object.keys(i).length>0&&(t.pointer=H({domElement:e.el,...i}))}function l(i){const{clock:n}=t;n.elapsed=n.timestamp-n.time,n.time=i,e.beforeRender(t),t.renderer.render(t.scene,t.camera),requestAnimationFrame(l)}function u(){var i;const n=t.renderer.domElement.parentElement;if(t.width=n.clientWidth,t.height=n.clientHeight,t.renderer.setSize(t.width,t.height),t.camera.aspect=t.width/t.height,t.camera.updateProjectionMatrix(),t.camera instanceof q){const a=h();t.wWidth=a[0],t.wHeight=a[1]}else t.wWidth=t.camera.top-t.camera.bottom,t.wHeight=t.camera.right-t.camera.left;(i=e.afterResize)==null||i.call(e,t)}function h(){const i=t.camera.fov*Math.PI/180,n=2*Math.tan(i/2)*Math.abs(t.camera.position.z);return[n*t.camera.aspect,n]}}const O={shaderPoints:8,curvePoints:80,curveLerp:.75,radius1:3,radius2:5,velocityTreshold:10,sleepRadiusX:150,sleepRadiusY:150,sleepTimeCoefX:.0025,sleepTimeCoefY:.0025};function X(P){const e={...O,...P},t=new Array(e.curvePoints).fill(0).map(()=>new p),f=new R(t),d=new C,l=new C,u={value:new p},h={value:new p},i={value:new Array(e.shaderPoints).fill(0).map(()=>new p)},n={value:new T(16711935)};let a,m,v=!1;return W({el:P.el,antialias:!1,initCamera(r){r.camera=new D},initScene({scene:r}){const o=new A(2,2);a=new _({uniforms:{uRatio:u,uSize:h,uPoints:i,uColor:n},defines:{SHADER_POINTS:e.shaderPoints},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,fragmentShader:`
          // https://www.shadertoy.com/view/wdy3DD
          // https://www.shadertoy.com/view/MlKcDD
          // Signed distance to a quadratic bezier
          float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {
            vec2 a = B - A;
            vec2 b = A - 2.0*B + C;
            vec2 c = a * 2.0;
            vec2 d = A - pos;
            float kk = 1.0 / dot(b,b);
            float kx = kk * dot(a,b);
            float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
            float kz = kk * dot(d,a);
            float res = 0.0;
            float p = ky - kx*kx;
            float p3 = p*p*p;
            float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
            float h = q*q + 4.0*p3;
            if(h >= 0.0){
              h = sqrt(h);
              vec2 x = (vec2(h, -h) - q) / 2.0;
              vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
              float t = uv.x + uv.y - kx;
              t = clamp( t, 0.0, 1.0 );
              // 1 root
              vec2 qos = d + (c + b*t)*t;
              res = length(qos);
            } else {
              float z = sqrt(-p);
              float v = acos( q/(p*z*2.0) ) / 3.0;
              float m = cos(v);
              float n = sin(v)*1.732050808;
              vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
              t = clamp( t, 0.0, 1.0 );
              // 3 roots
              vec2 qos = d + (c + b*t.x)*t.x;
              float dis = dot(qos,qos);
              res = dis;
              qos = d + (c + b*t.y)*t.y;
              dis = dot(qos,qos);
              res = min(res,dis);
              qos = d + (c + b*t.z)*t.z;
              dis = dot(qos,qos);
              res = min(res,dis);
              res = sqrt( res );
            }
            return res;
          }

          uniform vec2 uRatio;
          uniform vec2 uSize;
          uniform vec2 uPoints[SHADER_POINTS];
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float intensity = 1.0;
            float radius = 0.015;

            vec2 pos = (vUv - 0.5) * uRatio;

            vec2 c = (uPoints[0] + uPoints[1]) / 2.0;
            vec2 c_prev;
            float dist = 10000.0;
            for(int i = 0; i < SHADER_POINTS - 1; i++){
              c_prev = c;
              c = (uPoints[i] + uPoints[i + 1]) / 2.0;
              dist = min(dist, sdBezier(pos, c_prev, uPoints[i], c));
            }
            dist = max(0.0, dist);

            float glow = pow(uSize.y / dist, intensity);
            vec3 col = vec3(0.0);
            col += 10.0 * vec3(smoothstep(uSize.x, 0.0, dist));
            col += glow * uColor;

            // Tone mapping
            col = 1.0 - exp(-col);
            col = pow(col, vec3(0.4545));
  
            gl_FragColor = vec4(col, 1.0);
          }
        `}),m=new B(o,a),r.add(m)},afterResize({width:r,height:o}){h.value.set(e.radius1,e.radius2),r>=o?(u.value.set(1,o/r),h.value.multiplyScalar(1/r)):(u.value.set(r/o,1),h.value.multiplyScalar(1/o))},beforeRender({clock:r,width:o,height:g,wWidth:w}){for(let c=1;c<e.curvePoints;c++)t[c].lerp(t[c-1],e.curveLerp);for(let c=0;c<e.shaderPoints;c++)f.getPoint(c/(e.shaderPoints-1),i.value[c]);if(v)n.value.r=d.z,n.value.g=0,n.value.b=1-d.z,d.multiplyScalar(.95);else{const c=r.time*e.sleepTimeCoefX,x=r.time*e.sleepTimeCoefY,k=Math.cos(c),E=Math.sin(x),y=e.sleepRadiusX*w/o,z=e.sleepRadiusY*w/o,b=y*k,s=z*E;f.points[0].set(b,s),n.value.r=.5+.5*Math.cos(r.time*.0015),n.value.g=0,n.value.b=1-n.value.r}},onPointerMove({nPosition:r,delta:o}){v=!0;const g=.5*r.x*u.value.x,w=.5*r.y*u.value.y;f.points[0].set(g,w),l.x=Math.min(d.x+Math.abs(o.x)/e.velocityTreshold,1),l.y=Math.min(d.y+Math.abs(o.y)/e.velocityTreshold,1),l.z=Math.sqrt(l.x*l.x+l.y*l.y),d.lerp(l,.05)},onPointerLeave(){v=!1}}),{config:e}}export{X as neonCursor};
//# sourceMappingURL=threejs-toys.module.cdn.min.js.map
