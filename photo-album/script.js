 var brightness=document.getElementById("brightness");
var resolution=document.getElementById("resolution");
var avatar=document.getElementById("avatar");
var grayscale=document.getElementById("grayscale");
var qrCode=document.getElementById("Qr");
var thumbnails=document.getElementById("thumbnails");



document.addEventListener("click",function (e){
    if(e.target.classList.contains("gallery-item")){
          const src = e.target.getAttribute("src");
          document.querySelector(".modal-img").src = src;
          const myModal = new bootstrap.Modal(document.getElementById('gallery-popup'));
          myModal.show();
    }
})


//generate qr code and making the button active
qrCode.addEventListener("click",function(){
    
    qrCode.classList.add("active");
    //generate qr code
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 200,
        height : 200
    });
    qrcode.makeCode("https://www.youtube.com/watch?v=QH2-TGUlwu4");
    //make the qr code visible
    document.getElementById("qrcode").style.display="block";
    //make the thumbnails invisible
    thumbnails.style.display="none";
})