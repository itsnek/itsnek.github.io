window.addEventListener('load',function(){

  let tab1 = document.getElementById("BtnBio");
  let tab2 = document.getElementById("BtnFAQs");
  let tab3 = document.getElementById("BtnIllustrations");
  let tab4 = document.getElementById("BtnUni Research");
  let footer = document.getElementById("main_footer");

  onLoading();

  tab1.addEventListener('click', () => showContent("Bio"));
  
  tab2.addEventListener('click', () => showContent("FAQs"));

  tab3.addEventListener('click', () => showContent("Illustrations"));

  tab4.addEventListener('click', () => showContent("Uni Research"));

  document.getElementById("gmail").addEventListener('click', () => copy_mail());

  window.addEventListener('scroll', () => scroller());

  window.addEventListener('mousemove', () => scroller());

  window.addEventListener("mouseout",() => {
      setTimeout(function(){
        footer.style.opacity = "0";
    }, 5000);
  });

});

function showContent(tab){

  let bio_tab = document.getElementById("Bio_tab");
  let FAQs_tab = document.getElementById("FAQs_tab");
  let Illustrations_tab = document.getElementById("Illustrations_tab");
  let Uni_Research_tab = document.getElementById("Uni_Research_tab"); 
  let btn1 = document.getElementById("BtnBio"); 
  let btn2 = document.getElementById("BtnFAQs"); 
  let btn3 = document.getElementById("BtnIllustrations"); 
  let btn4 = document.getElementById("BtnUni Research"); 

  if(tab==="Bio" || tab==="FAQs"){

    if(tab === "Bio"){
        bio_tab.style.display = "block";
        FAQs_tab.style.display = "none";
        if(!btn1.className.includes(" active")){
          btn1.className += " active";
          btn2.className = btn1.className.replace(" active", "");
        }
    }
    else if(tab === "FAQs"){
        FAQs_tab.style.display="block";
        bio_tab.style.display="none";
        btn1.className = btn1.className.replace(" active", "");
        btn2.className += " active";
    }

  }else{

    if(tab === "Illustrations"){
      Illustrations_tab.style.display = "block";
      Uni_Research_tab.style.display = "none";
      if(!btn3.className.includes(" active")){
        btn3.className += " active";
        btn4.className = btn1.className.replace(" active", "");
      }
    }
    else if(tab === "Uni Research"){
        Uni_Research_tab.style.display="block";
        Illustrations_tab.style.display="none";
        btn4.className += " active";
        btn3.className = btn1.className.replace(" active", "");
    }

  }
}

function onLoading(){

  document.getElementById("Bio_tab").style.display = "block";
  document.getElementById("BtnBio").className += " active";

  document.getElementById("Illustrations_tab").style.display = "block";
  document.getElementById("BtnIllustrations").className += " active";

}

function copy_mail(){
  document.getElementById("mail_text").select();
  document.execCommand("copy");
  console.log("copied!");
  alert("Mail copied succesfully.")
}

function scroller(){
  let footer = document.getElementById("main_footer");
  footer.style.visibility = "visible";
  footer.style.opacity = "1";
  
  // footer.style.bottom = "0";
  // footer.style.transition = "1s";
}