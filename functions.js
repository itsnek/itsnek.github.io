window.addEventListener('load', function () {

  let tab1 = document.getElementById("BtnBio");
  let tab2 = document.getElementById("BtnFAQs");
  let tab3 = document.getElementById("BtnImplementations");
  let tab4 = document.getElementById("BtnAcademics");
  let footer = document.getElementById("main_footer");
  let copyrightYear = document.getElementById("copyright-year");

  onLoading();

  if (copyrightYear) {
    let startYear = 2021;
    let currentYear = new Date().getFullYear();
    copyrightYear.textContent = currentYear > startYear
      ? "Copyright " + startYear + "-" + currentYear
      : "Copyright " + startYear;
  }

  tab1.addEventListener('click', () => showContent("Bio"));

  tab2.addEventListener('click', () => showContent("FAQs"));

  tab3.addEventListener('click', () => showContent("Implementations"));

  tab4.addEventListener('click', () => showContent("Academics"));

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
  folderToggles.forEach(function (button) {
    button.addEventListener('click', function () {
      let collection = button.closest(".folder-collection");
      let isOpen = collection.classList.contains("open");

      folderToggles.forEach(function (otherButton) {
        otherButton.closest(".folder-collection").classList.remove("open");
        otherButton.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        collection.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest(".folder-collection")) {
      folderToggles.forEach(function (button) {
        button.closest(".folder-collection").classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      });
    }
  });

});

function showContent(tab) {

  let bio_tab = document.getElementById("Bio_tab");
  let FAQs_tab = document.getElementById("FAQs_tab");
  let Implementations_tab = document.getElementById("Implementations_tab");
  let Academics_tab = document.getElementById("Academics_tab");
  let btn1 = document.getElementById("BtnBio");
  let btn2 = document.getElementById("BtnFAQs");
  let btn3 = document.getElementById("BtnImplementations");
  let btn4 = document.getElementById("BtnAcademics");

  if (tab === "Bio" || tab === "FAQs") {

    bio_tab.style.display = tab === "Bio" ? "block" : "none";
    FAQs_tab.style.display = tab === "FAQs" ? "block" : "none";
    btn1.classList.toggle("active", tab === "Bio");
    btn2.classList.toggle("active", tab === "FAQs");

  } else {

    Implementations_tab.style.display = tab === "Implementations" ? "block" : "none";
    Academics_tab.style.display = tab === "Academics" ? "block" : "none";
    btn3.classList.toggle("active", tab === "Implementations");
    btn4.classList.toggle("active", tab === "Academics");

  }
}

function onLoading() {

  document.getElementById("Bio_tab").style.display = "block";
  document.getElementById("BtnBio").classList.add("active");

  document.getElementById("Implementations_tab").style.display = "block";
  document.getElementById("BtnImplementations").classList.add("active");

}

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
