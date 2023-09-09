var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function heroanimation() {
  var tl = gsap.timeline();

  tl.from("#nav",{
    y : '-10px',
    opacity : 0,
    duration : 1.5,
    ease :Expo.easeInOut
  })
 .to(".boundingelem",{
    y : 0,
    duration : 1.7,
    ease :Expo.easeInOut,
    delay:-1,
    stagger:.2
  })
  .from("#herofooter",{
    y:-10,
    opacity:0,
    delay:-1.5,
    duration:2,
    ease:Expo.easeInOut
  });
}

function mousesmall() {
  var xscale = 1;
  var yscale = 1;

  var xpre = 0 ;
  var ypre = 0 ;
  addEventListener("mousemove",function(dets)
  { 
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xpre );
    yscale = gsap.utils.clamp(.8,1.2,dets.clientY - ypre );
      
      xpre = dets.clientX ;
      ypre = dets.clientY ;
      circleMouseFollower(xscale,yscale)
    timeout=  setTimeout(function () {
        document.querySelector('#cursor').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
      },100);         
  });
  
}
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)  scale(${xscale}, ${yscale})`;
  });
}

    

//mousesmall();
circleMouseFollower();
mousesmall();
heroanimation();


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
  opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      display : "block",
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});