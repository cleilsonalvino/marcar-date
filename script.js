
function MarcarData(){
    const data = document.getElementById('data').value;
    if(data == ''){
        alert('escolha uma data')
    } else{
        localStorage.setItem('selectedDate', data);
        setTimeout(()=>{
            window.location.href = 'food.html'
        },1000)
        
    }
}



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
    setTimeout(()=>{
        window.location.href = 'activities.html'
    }, 1000)
    
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
    
    enviarDadosParaSheetDB();

    setTimeout(()=>{
        window.location.href = 'lastpage.html';
    }, 1000)
    
}


// Função para enviar dados para a planilha via SheetDB
function enviarDadosParaSheetDB() {
    const date = localStorage.getItem('selectedDate');
let foods = JSON.parse(localStorage.getItem('selectedFoods'));
let activities = JSON.parse(localStorage.getItem('selectedActivities'));

const data = {
    data: [
        {
            Date: date,
            "Food": Array.isArray(foods) ? foods.join(", ") : "", // Default to empty string if not an array
            "Activities": Array.isArray(activities) ? activities.join(", ") : "" // Default to empty string if not an array
        }
    ]
};

    fetch('https://sheetdb.io/api/v1/kizb4bctpajr6', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Dados enviados com sucesso:', result);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        Alert('Erro ao enviar os dados:', error);
    });
}
