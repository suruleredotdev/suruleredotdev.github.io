
function advanceSlides(by) {
    let currentSlide = annotationEl.getElementById(`annotation-slide-${currentSlideIndex}`)
    let newSlideIndex = by <= slideCount ? currentSlideIndex+by : by % slideCount;
    let newSlide = document.getElementById(`annotation-slide-${newSlideIndex}`)
    console.log(currentSlide, newSlide, newSlideIndex, slideCount, currentSlideIndex, by, slideCount);
    if (!!newSlide) {
        currentSlide.classList.add = 'none';
        newSlide.style.display = 'block';
    }
    currentSlideIndex = newSlideIndex;
}

function buildAnnotationSlides(annotationEl) {
    let currentSlideIndex = 1; /* 1-indexed */
    let slideCount = annotationEl.querySelectorAll('.annotation-slide').length;
    for (var i = 0; i < annotations.length; i++) {
        buildAnnotationSlides(annotations[i]);
    };
}

window.addEventListener('DOMContentLoaded', function (e) {
    let annotations = document.querySelectorAll(".annotation");
    for (var i = 0; i < annotations.length; i++) {
        buildAnnotationSlides(annotations[i]);
    };
});

// TODO: setup itt.js-based custom annotations
// document.body.addEventListener('click', function (e) {
//   var selObj = window.getSelection(); 
//   alert(selObj);
//   var selRange = selObj.getRangeAt(0);
//   for (var i = 0; i < selRange.length; i++) {
//   }
// });
