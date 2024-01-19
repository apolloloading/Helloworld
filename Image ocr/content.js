chrome.runtime.sendMessage({action: 'getAccessToken'}, function(response) {
  if (response.accessToken) {
    const firstImage = document.querySelector('img');

    // Check if a suitable image element is found
    if (!firstImage) {
      console.error('No image found on the page');
      return;
    }

    const imageUrl = firstImage.src;

    // Baidu OCR service request construction
    const apiUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis";

    // Send OCR request
    fetch(apiUrl + `?access_token=${response.accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: `url=${encodeURIComponent(imageUrl)}&line_probability=false&disp_line_poly=false&words_type=handprint_mix&layout_analysis=false`
    })
      .then(response => response.json())
      .then(data => {
        // Handle Baidu OCR service response
        const recognizedText = data.words_result.map(result => result.words).join('\n');
        console.log('Recognized Text:', recognizedText);
      })
      .catch(error => {
        console.error('Error during text recognition:', error);
      });
  } else {
    console.error('Access Token not available');
  }
});
