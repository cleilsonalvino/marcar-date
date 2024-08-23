const pegarData = document.getElementById('pegarData')

pegarData.addEventListener('click', ()=>{
    const data = document.getElementById('data').value;
    if(data == ''){
        alert('escolha uma data')
    } else{
        localStorage.setItem('selectedDate', data);
        window.location.href = 'food.html'
    }
    
})


function storeSelections() {
    // Array para armazenar as seleções
    const selectedFoods = [];
    
    // Obtém todos os checkboxes
    const checkboxes = document.querySelectorAll('input[name="food"]:checked');
    
    // Adiciona os valores dos checkboxes selecionados ao array
    checkboxes.forEach((checkbox) => {
      selectedFoods.push(checkbox.value);
    });
    
    // Exibe no console o array de seleções
    console.log(selectedFoods);
 
    // Opcional: armazenar no localStorage para usar em outra página
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
    window.location.href = 'activities.html'
  }

  function storeActivities() {
    // Array para armazenar as atividades selecionadas
    const selectedActivities = [];

    // Obtém todos os checkboxes marcados
    const checkboxes = document.querySelectorAll('input[name="activities"]:checked');

    // Adiciona os valores dos checkboxes selecionados ao array
    checkboxes.forEach((checkbox) => {
        selectedActivities.push(checkbox.value);
    });

    // Exibe no console o array de atividades selecionadas
    console.log(selectedActivities);

    // Opcional: armazenar no localStorage para usar em outra página
    localStorage.setItem('selectedActivities', JSON.stringify(selectedActivities));

    // Redireciona para a próxima página
    window.location.href = 'lastpage.html';
    enviarDadosParaSheetDB();
}


// Função para enviar dados para a planilha via SheetDB
function enviarDadosParaSheetDB() {
    const date = localStorage.getItem('selectedDate');
    const foods = JSON.parse(localStorage.getItem('selectedFoods'));
    const activities = JSON.parse(localStorage.getItem('selectedActivities'));

    const data = {
        data: [
            {
                Date: date,
                "Food Selections": foods.join(", "),
                Activities: activities.join(", ")
            }
        ]
    };

    fetch('https://sheetdb.io/api/v1/m449pdmszcagi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Dados enviados com sucesso:', result);
        // Opcional: Redirecionar ou realizar outras ações
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
}
