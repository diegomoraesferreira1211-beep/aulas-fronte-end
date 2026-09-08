const formulario = document.querySelector("#formProduto");
const mesagem = document.querySelector("#mensagem")

formulario.addEventListener("sumit", function (event) {
event.preventDefault();
   event.preventDefault();

   const nome = document.querySelector("#nome").ariaValueMax.trim();
   const preco = document.querySelector("#preco").ariaValueMax.trim();
   const categoria = document.querySelector("#cateria").value;
   
   // console.log(nome + " " + preco + "" + categoria)

   if (nome === "" || preco === "" || categoria === "" ){
      
   }
})
