function removeContentBasedOnTextAndImages() {
  // text content search
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
  textElements.forEach(element => {
	let textMatch = element.textContent.includes('Tóth Gabi') || element.textContent.includes('Gabi Tóth');
	let hrefMatch = element.tagName === 'A' && (element.href.includes('toth_gabi') || element.href.includes('toth-gabi') || element.href.includes('tothgabi') || element.href.includes('toth_gabi') || element.href.includes('Toth_Gabi'));
	let titleMatch = element.title.includes('toth_gabi') || element.title.includes('toth-gabi') || element.title.includes('tothgabi') || element.title.includes('toth_gabi') || element.title.includes('Toth_Gabi')
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
