document.addEventListener('DOMContentLoaded', function() {
  var baiduButton = document.getElementById('baiduButton');
  baiduButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://www.baidu.com' });
  });
});
