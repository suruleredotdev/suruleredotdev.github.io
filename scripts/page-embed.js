function pageIsEmbed() {
  return (
    window.location.href !== window.parent.location.href || 
    (new URLSearchParams(window.location.search)).get("embed") === "true"
  );
}

function renderAsEmbed(previewElementId) {
    // not really rendering, just changing element visual precendence
    if (pageIsEmbed()) {
        // detach DOM node a specific element only, e.g. map / slides node
        var previewElement = document.getElementById(previewElementId);
        // previewElement.parentNode.removeChild(mapEl);
        previewElement.style.position = 'absolute';
        previewElement.style.width = '100%';
        previewElement.style.height = '100%';

        // hide all other elements on the page
        //for(var i = 0; i < document.body.childNodes.length; i++) {
        //    document.body.childNodes[i].style.display = 'none';
        //}

        //// re-insert map node into body as only element
        //document.body.appendChild(mapEl);
    }
}
