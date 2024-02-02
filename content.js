function removeContentBasedOnTextAndImages() {

  const regex = /Tóth\s*Gabi|toth[_-]?gabi|Gabi\s*Tóth/i;
  // text content search
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
  textElements.forEach(element => {
    let textMatch: boolean = regex.test(element.textContent || ''); 
    let hrefMatch: boolean = element.tagName === 'A' && regex.test(element.getAttribute('href') || '');
    let titleMatch: boolean = regex.test(element.getAttribute('title') || '');
    if (textMatch || hrefMatch) { // titleMatch is talán...
      let closestDiv = element.closest('div');
      if (closestDiv) {
        closestDiv.style.display = 'none';
        // hide closest pictures
        const relatedImages = closestDiv.querySelectorAll('img');
        relatedImages.forEach(img => {
          img.style.display = 'none';
        });
      }
    }
  });  
}

chrome.storage.local.get('isTGExtensionActive', function(data) {
  if(data.isTGExtensionActive !== false) {
    removeContentBasedOnTextAndImages();

    // MutationObserver DOM change agent
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        removeContentBasedOnTextAndImages();
      });
    });

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });
  }
});
