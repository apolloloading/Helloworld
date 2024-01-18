chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'recognizeText') {
    const firstImage = document.querySelector('img');
    const imageUrl = firstImage.src;

    // 替换为你在百度AI开放平台创建的应用的API Key和Secret Key
    const API_KEY = "ukeyHtSazMqYkZjGvLGF2gnv";
    const SECRET_KEY = "67FXIykT8EfLlTycu5Fd7GBidknGS0zB";

    // 构造百度文字识别服务的请求
    const apiUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis";
    const accessTokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;

    // 获取Access Token
    fetch(accessTokenUrl)
      .then(response => response.json())
      .then(data => {
        const accessToken = data.access_token;

        // 发送文字识别请求
        fetch(apiUrl + `?access_token=${accessToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: `url=${encodeURIComponent(imageUrl)}&line_probability=false&disp_line_poly=false&words_type=handprint_mix&layout_analysis=false`
        })
          .then(response => response.json())
          .then(data => {
            // 处理百度文字识别服务的响应
            const recognizedText = data.words_result.map(result => result.words).join('\n');
            sendResponse({text: recognizedText});
          })
          .catch(error => {
            console.error('Error during text recognition:', error);
            sendResponse({text: 'Error during text recognition'});
          });
      })
      .catch(error => {
        console.error('Error getting access token:', error);
        sendResponse({text: 'Error getting access token'});
      });

    // 必须返回true，以确保sendResponse在异步请求完成后仍然有效
    return true;
  }
});
