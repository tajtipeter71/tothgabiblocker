document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.querySelector('input[type="checkbox"]');

  // Kezdeti állapot lekérdezése
  chrome.storage.local.get('isTGExtensionActive', function(data) {
    checkbox.checked = data.isTGExtensionActive !== false;
  });

  // Checkbox állapotának kezelése és oldal újratöltése
  checkbox.addEventListener('change', function() {
    chrome.storage.local.set({ isTGExtensionActive: checkbox.checked }, function() {
      // Küld egy üzenetet a content scriptnek
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
