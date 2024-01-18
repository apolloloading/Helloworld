document.getElementById('recognizeButton').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'recognizeText'}, function(response) {
      document.getElementById('result').textContent = response.text;
    });
  });
});