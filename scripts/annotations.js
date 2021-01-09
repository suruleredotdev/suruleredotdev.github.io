function zip(...rows) {
    return [...rows[0]].map(function (_,c) { return rows.map(row=>row[c]); });
}

window.addEventListener('DOMContentLoaded', function (e) {
    let annotations = document.querySelectorAll(".annotation");
    for (var i = 0; i < annotations.length; i++) {
    let el = annotations[i];
    el.addEventListener('click', function(event) {
        // TODO
    })
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

let currentSlideIndex = 1; /* 1-indexed */
let slideCount = document.querySelectorAll('.annotation-slide').length;
function advanceSlides(by) {
    let currentSlide = document.getElementById(`annotation-slide-${currentSlideIndex}`)
    let newSlideIndex = by <= slideCount ? currentSlideIndex+by : by % slideCount;
    let newSlide = document.getElementById(`annotation-slide-${newSlideIndex}`)
    console.log(currentSlide, newSlide, newSlideIndex, slideCount, currentSlideIndex, by, slideCount);
    if (!!newSlide) {
    currentSlide.classList.add = 'none';
    newSlide.style.display = 'block';
    }
    currentSlideIndex = newSlideIndex;
}