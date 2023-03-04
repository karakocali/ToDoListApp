const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
yeniGorevEkleBtn.addEventListener('click', gorevEkle)
gorevListesi.addEventListener('click',gorevSilTamamla)
document.addEventListener('DOMContentLoaded',localStorageOku)
function gorevSilTamamla(e){
 const tiklanilanEleman = e.target;
 if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
    tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi')
 }
 else if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
    if(confirm('Eminmisiniz')){
         tiklanilanEleman.parentElement.classList.toggle('kaybol')
    const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
    localStorageSil(silinecekGorev)
    tiklanilanEleman.parentElement.addEventListener('transitionend', ()=>{
        tiklanilanEleman.parentElement.remove()
    })
    }}}


function gorevEkle(e){
    if(yeniGorev.value.length > 1 ){
        gorevItemOlustur(yeniGorev.value)
        localStorageKaydet(yeniGorev.value)
    }
    else{
        alert(" boş görev tanımı olmaz")
    }
  
    yeniGorev.value=""
}
function localStorageArrayeDonustur(){
    let gorevler;
    if(localStorage.getItem('gorevler')===null){
        gorevler=[];
    }
    else{
        gorevler= JSON.parse(localStorage.getItem('gorevler'))
    }
    return gorevler;
}
function localStorageKaydet(yeniGorev){
   let gorevler = localStorageArrayeDonustur()
    gorevler.push(yeniGorev)
    localStorage.setItem('gorevler',JSON.stringify(gorevler))
}
function localStorageOku(){
    let gorevler =localStorageArrayeDonustur()
   
    gorevler.forEach((gorev)=>{
         gorevItemOlustur(gorev)
    })
}

function gorevItemOlustur(gorev){
    const gorevDiv = document.createElement('div')
    gorevDiv.classList.add('gorev-item')
    const gorevLi = document.createElement('li')
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi)    
    //ul ye oluşturulan divi ekleme 
    gorevListesi.appendChild(gorevDiv)
    // tamamlandi butnu ekle
    const gorevTamamBtn = document.createElement('button')
    gorevTamamBtn.classList.add('gorev-btn')
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi')
    gorevTamamBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    gorevDiv.appendChild(gorevTamamBtn)
    const gorevSilBtn = document.createElement('button')
    gorevSilBtn.classList.add('gorev-btn')
    gorevSilBtn.classList.add('gorev-btn-sil')
    gorevSilBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    gorevDiv.appendChild(gorevSilBtn)
    
}
function localStorageSil(gorev){
    let gorevler = localStorageArrayeDonustur()
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanIndex,1)
    localStorage.setItem('gorevler',JSON.stringify(gorevler))
}