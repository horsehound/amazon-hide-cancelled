(function () {
  let hiddenCount = 0;
  let isEnabled = true;

  function hideCancelledOrders() {
    if (!isEnabled) return;

    hiddenCount = 0;

    // Selector targets for order cards
    const orderContainers = document.querySelectorAll(
      '.order, [class*="order-card"], .a-box-group, .shipment'
    );

    orderContainers.forEach((container) => {
      const text = container.innerText || container.textContent || "";

      const isCancelled =
        /cancelled/i.test(text) ||
        /order cancelled/i.test(text) ||
        /storniert/i.test(text) || // German
        /annulé/i.test(text);      // French

      if (isCancelled) {
        container.setAttribute("data-cancelled-hidden", "true");
        container.style.display = "none";
        hiddenCount++;
      }
    });

    // Also target the specific Amazon order status label approach
    const statusBadges = document.querySelectorAll(
      '.order-status, [class*="status"], .a-color-error'
    );

    statusBadges.forEach((badge) => {
      const text = badge.innerText || badge.textContent || "";
      if (/cancelled/i.test(text) || /storniert/i.test(text) || /annulé/i.test(text)) {
        // Walk up to find the order card container
        let parent = badge;
        for (let i = 0; i < 8; i++) {
          parent = parent.parentElement;
          if (!parent) break;
          if (
            parent.classList &&
            (parent.classList.contains("order") ||
              Array.from(parent.classList).some(
                (c) => c.includes("order-card") || c.includes("a-box-group")
              ))
          ) {
            if (!parent.getAttribute("data-cancelled-hidden")) {
              parent.setAttribute("data-cancelled-hidden", "true");
              parent.style.display = "none";
              hiddenCount++;
            }
            break;
          }
        }
      }
    });

    // Notify popup
    chrome.storage.local.set({ hiddenCount, isEnabled });
  }

  function showCancelledOrders() {
    document.querySelectorAll("[data-cancelled-hidden]").forEach((el) => {
      el.removeAttribute("data-cancelled-hidden");
      el.style.display = "";
    });
    hiddenCount = 0;
    chrome.storage.local.set({ hiddenCount, isEnabled });
  }

  // Load saved state
  chrome.storage.local.get(["isEnabled"], (result) => {
    isEnabled = result.isEnabled !== false; // default true
    if (isEnabled) hideCancelledOrders();
  });

  // Listen for toggle from popup
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.isEnabled) {
      isEnabled = changes.isEnabled.newValue;
      if (isEnabled) {
        hideCancelledOrders();
      } else {
        showCancelledOrders();
      }
    }
  });

  // Re-run on dynamic content (Amazon loads pages via AJAX)
  const observer = new MutationObserver(() => {
    if (isEnabled) hideCancelledOrders();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial run
  hideCancelledOrders();
})();
