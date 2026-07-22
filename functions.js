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

  // All content lives in one box; the tabs just switch which pane is shown.
  let tabButtons = document.querySelectorAll(".box-tabs .tablinks");

  function activateTab(tabName) {
    let button = document.querySelector(".box-tabs .tablinks[data-tab=\"" + tabName + "\"]");
    let pane = document.getElementById(tabName + "_tab");
    if (!button || !pane) return;

    tabButtons.forEach(function (btn) {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".box-content .tabcontent").forEach(function (content) {
      content.classList.remove("active");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    pane.classList.add("active");
  }

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activateTab(button.dataset.tab);
    });
  });

  let initialTab = window.location.hash.replace("#", "");
  if (initialTab && document.querySelector(".box-tabs .tablinks[data-tab=\"" + initialTab + "\"]")) {
    activateTab(initialTab);
  }

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
