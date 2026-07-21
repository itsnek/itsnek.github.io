window.addEventListener('load', function () {

  let footer = document.getElementById("main_footer");
  let copyrightYear = document.getElementById("copyright-year");

  if (copyrightYear) {
    let startYear = 2021;
    let currentYear = new Date().getFullYear();
    copyrightYear.textContent = currentYear > startYear
      ? "Copyright " + startYear + "-" + currentYear
      : "Copyright " + startYear;
  }

  document.getElementById("gmail").addEventListener('click', () => copy_mail());

  let hideFooterTimeout;
  function showFooter() {
    clearTimeout(hideFooterTimeout);
    footer.style.visibility = "visible";
    footer.style.opacity = "1";
  }
  function scheduleHideFooter() {
    clearTimeout(hideFooterTimeout);
    hideFooterTimeout = setTimeout(function () {
      footer.style.opacity = "0";
    }, 5000);
  }

  window.addEventListener('scroll', showFooter, { passive: true });
  window.addEventListener('mousemove', showFooter);
  window.addEventListener('touchstart', showFooter, { passive: true });

  window.addEventListener("mouseout", scheduleHideFooter);
  window.addEventListener("touchend", scheduleHideFooter);

  // Click/tap-to-toggle subnav, in addition to the existing hover behaviour,
  // so the dropdown menus also work on touch devices and via keyboard.
  let folderToggles = document.querySelectorAll(".folder-toggle");

  function closeAllSubnavs() {
    folderToggles.forEach(function (button) {
      button.closest(".folder-collection").classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  }

  folderToggles.forEach(function (button) {
    button.addEventListener('click', function () {
      let collection = button.closest(".folder-collection");
      let isOpen = collection.classList.contains("open");
      closeAllSubnavs();
      if (!isOpen) {
        collection.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest(".folder-collection")) {
      closeAllSubnavs();
    }
  });

  // This is a single-page site: subnav links jump to an in-page section,
  // so close the dropdown once the user has picked a destination.
  document.querySelectorAll(".subnavigationlist a").forEach(function (link) {
    link.addEventListener('click', closeAllSubnavs);
  });

});

function copy_mail() {
  let email = document.getElementById("mail_text").textContent.trim();
  let gmailButton = document.getElementById("gmail");

  function showCopiedFeedback() {
    gmailButton.classList.add("copied");
    setTimeout(() => gmailButton.classList.remove("copied"), 1500);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showCopiedFeedback);
  } else {
    let temp = document.createElement("textarea");
    temp.value = email;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(temp);
    }
    showCopiedFeedback();
  }
}
