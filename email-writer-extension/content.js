console.log("Email Writer Extension - Content Script Loaded.");

function createAIButton() {
  const button = document.createElement('div');
  button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
  button.style.marginRight = '8px';
  button.innerHTML = 'AI Reply';
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  return button;
}

function getSenderName() {
  const senderElement = document.querySelector('.gD span');
  if (senderElement) {
    return senderElement.innerText.split(" ")[0].trim();
  }
  return "User";
}

function getreceiverName() {
  const replierElement = document.querySelector("a[aria-label*='Google Account']");
  if (replierElement) {
    const ariaLabel = replierElement.getAttribute("aria-label");
    const match = ariaLabel.match(/: (.*?)\s*\(/);
    if (match && match[1]) {
      return match[1].trim(); 
    }
    return "User";
  }
  return "User";
}

function findComposeToolbar() {
  const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
  for(const selector of selectors) {
    const toolBar = document.querySelector(selector);
    if(toolBar)
      return toolBar;
    return null;
  }
}

function getEmailContent() {
  const selectors = ['.h7', 'a3s aiL', '.gamil_quote', '[role="presentation"]'];
  for(const selector of selectors) {
    const content = document.querySelector(selector);
    if(content)
      return content.innerText.trim();
    return '';
  }
}

function injectButton() {
  const existingButton = document.querySelector('.ai-reply-button');
  if(existingButton) existingButton.remove();

  const toolBar = findComposeToolbar();
  if(!toolBar) {
    console.log("Toolbar not found.");
    return;
  }
  console.log("Toolbar found.");

  const button = createAIButton();
  button.classList.add('ai-reply-button');
  button.addEventListener('click', async() => {
      try {
        button.innerHTML = "Generating...";
        button.disabled = true;

        const emailContent = getEmailContent();
        const senderName = getSenderName();
        const receiverName = getreceiverName();

        const response = await fetch('http://localhost:8080/api/email/generate-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailContent: emailContent,
            senderName: senderName,
            tone: "professional",
            receiverName: receiverName,
          }) 
        });
        if(! response.ok) {
          throw new Error('API Request Failed.');
        }
        const generatedReply = await response.text();
        const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

        if(composeBox) {
          composeBox.focus();
          document.execCommand('insertText', false, generatedReply);
        } else {
          console.error('Compose box was not found');
        }
      } catch(error) {
        console.error(error);
        alert('Failed to generate the reply.');
      } finally {
        button.innerHTML = 'AI Reply';
        button.disabled = false;
      }
  });

  toolBar.insertBefore(button, toolBar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for(const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node => 
      node.nodeType === Node.ELEMENT_NODE && 
      (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
    );

    if(hasComposeElements) {
      console.log("Compose Window Detected. ");
      setTimeout(injectButton, 500);
    }
  }
}); 

observer.observe(document.body, {
  childList: true,
  subtree: true
})