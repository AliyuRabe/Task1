async function translateText() {
  const text = document.getElementById("inputText").value;
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  const url = `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`;

  const data = {
    q: text,
    target: target,
    format: "text"
  };

  if (source !== "auto") {
    data.source = source;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (result.data && result.data.translations.length > 0) {
    document.getElementById("outputText").innerText = result.data.translations[0].translatedText;
  } else {
    document.getElementById("outputText").innerText = "Translation failed.";
  }
}

function copyTranslation() {
  const text = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Translation copied to clipboard!");
  });
}