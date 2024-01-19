document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('recognizeButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'recognizeText'}, function(response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        console.log('Full Response:', response); // 输出完整的响应对象到控制台

        if (response && response.text) {
          document.getElementById('result').textContent = response.text;
        } else {
          console.error('Invalid response:', response);
          document.getElementById('result').textContent = 'Invalid response';
        }
      });
    });
  });
});
