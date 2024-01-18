document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.querySelector('input[type="checkbox"]');
  var hState = document.getElementById("state");

  // Kezdeti állapot lekérdezése és beállítása
  chrome.storage.local.get('isTGExtensionActive', function(data) {
    checkbox.checked = data.isTGExtensionActive !== false;
    hState.textContent = checkbox.checked ? "Nincs Tóth Gabi :)" : "Van Tóth Gabi :)";
  });

  // Checkbox állapotának kezelése és oldal újratöltése
  checkbox.addEventListener('change', function() {
    chrome.storage.local.set({ isTGExtensionActive: checkbox.checked }, function() {
      hState.textContent = checkbox.checked ? "Nincs Tóth Gabi :)" : "Van Tóth Gabi :(";
      // Küld egy üzenetet a content scriptnek
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
