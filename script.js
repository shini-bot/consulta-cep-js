const btnBuscar = document.getElementById('btnBuscar');
const cepInput = document.getElementById('cepInput');

btnBuscar.addEventListener('click', buscarCEP);

async function buscarCEP() {
  const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  const errorMsg = document.getElementById('erro');
  const resultCard = document.getElementById('resultado');

  errorMsg.innerText = '';
  
  if (cep.length !== 8) {
    errorMsg.innerText = 'Por favor, digite um CEP válido com 8 dígitos.';
    resultCard.classList.add('hidden');
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      errorMsg.innerText = 'CEP não encontrado.';
      resultCard.classList.add('hidden');
      return;
    }

    document.getElementById('logradouro').innerText = data.logradouro || 'N/A';
    document.getElementById('bairro').innerText = data.bairro || 'N/A';
    document.getElementById('localidade').innerText = data.localidade;
    document.getElementById('uf').innerText = data.uf;

    resultCard.classList.remove('hidden');
  } catch (error) {
    errorMsg.innerText = 'Erro ao consultar a API. Tente novamente mais tarde.';
    console.error('Erro na requisição:', error);
  }
}