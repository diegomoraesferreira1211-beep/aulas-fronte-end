const titles = document.querySelectorAll('h1');

titles.forEach(title => {
    const text = title.textContent;
    title.innerHTML = text.split('').map(letter => {
        if (letter === ' ') return '<span>&nbsp;</span>';
    }).join('');

title.addEventListener('click', () => {
    if (title.classList.contains('exploded')) return;
    title.classList.add('exploded');

    const letters = title.querySelectorAll('.letter');

    letters.forEach(letter => {
        const randomX = (Math.random() - 0.5) * 500;
        const randomY = (Math.random() - 0.5) * 400;
        const randomRotate = (Math.random() - 0.5) * 360;

        letter.style.tranform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

        const som = document.getElementById('som-hover');
  
        /* 1. Mudamos aqui para buscar TODOS os botões de EDITAR */
        const botoesEditar = document.querySelectorAll('.link-editar');
      
        /* 2. Aplica o som ao passar o mouse em cada um deles */
        botoesEditar.forEach(botao => {
          botao.addEventListener('mouseenter', () => {
            som.currentTime = 0; 
            som.play().catch(error => {
              console.log("Áudio aguardando interação inicial.");
            });
          });
        });

       });
    });
});

