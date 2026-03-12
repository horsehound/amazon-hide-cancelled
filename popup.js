const toggle = document.getElementById("toggle");
const countEl = document.getElementById("count");
const statusText = document.getElementById("status-text");

function updateUI(isEnabled, hiddenCount) {
  toggle.checked = isEnabled;
  countEl.textContent = hiddenCount || 0;
  if (isEnabled) {
    statusText.textContent = "Enabled";
    statusText.className = "toggle-status on";
  } else {
    statusText.textContent = "Disabled";
    statusText.className = "toggle-status";
  }
}

// Load current state
chrome.storage.local.get(["isEnabled", "hiddenCount"], (result) => {
  const isEnabled = result.isEnabled !== false;
  updateUI(isEnabled, result.hiddenCount || 0);
});

// Toggle handler
toggle.addEventListener("change", () => {
  const isEnabled = toggle.checked;
  chrome.storage.local.set({ isEnabled });
  updateUI(isEnabled, 0);
});

// Live update hidden count
chrome.storage.onChanged.addListener((changes) => {
  if (changes.hiddenCount) {
    countEl.textContent = changes.hiddenCount.newValue || 0;
  }
});
