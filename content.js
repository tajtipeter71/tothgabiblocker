function removeContentBasedOnTextAndImages() {
  // text content search
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
  textElements.forEach(element => {
	let textMatch = element.textContent.includes('Tóth Gabi') || element.textContent.includes('Gabi Tóth');
	let hrefMatch = element.tagName === 'A' && (element.href.includes('toth_gabi') || element.href.includes('toth-gabi') || element.href.includes('tothgabi'));
    if (textMatch || hrefMatch) {
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

removeContentBasedOnTextAndImages();

// MutationObserver DOM change agent
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    removeContentBasedOnTextAndImages();
  });
});

// Start 
observer.observe(document.body, { childList: true, subtree: true });