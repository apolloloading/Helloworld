document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('recognizeButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'recognizeText'}, function(response) {
        if (chrome.runtime.lastError) {
          console.error('Error in sendMessage:', chrome.runtime.lastError);
          return;
        }

        console.log('Response:', response); // 输出响应对象到控制台

        if (response) {
          console.log('Response text:', response.text);
          document.getElementById('result').textContent = response.text || 'No text recognized';
        } else {
          console.error('Invalid response:', response);
        }
      });
    });
  });
});
