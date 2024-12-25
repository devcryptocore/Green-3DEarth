let date = new Date();
let year = date.getFullYear();
let footer = document.querySelector("#brandFooter");
window.addEventListener("load",()=>{
    footer.innerHTML="<a href='https://devcryptocore.github.io' target='_blank'>© Cryptocore "+year+"</a>";
    setTimeout(()=>{
        document.querySelector("#content").style.zIndex = 3;
    },2000);

    document.querySelector("#mobileOp").addEventListener("click",()=>{
        document.querySelector("#mOptions").style.display = "flex";
    });
    document.querySelector(".closeButton").addEventListener("click",()=>{
        document.querySelector("#mOptions").style.display = "none";
    });
});

let cont = document.querySelector("#content");
let canv = document.querySelector("#canvas");
cont.addEventListener("mouseover",()=>{
    cont.style.zIndex = 1;
    canv.addEventListener("mouseleave",()=>{
        cont.style.zIndex = 3;
    });
});