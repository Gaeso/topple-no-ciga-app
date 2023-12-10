const fadeinEls = document.querySelectorAll('.help')

fadeinEls.forEach(function(textanimation,index){
  gsap.to(textanimation,2,{
    delay:(index + 1) * .6,
    opacity:1
  })
})