document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("roiForm");

    const benchmarkPorSetor = {
        "varejo-ecommerce": {
          custoPorAtendimento: 2.5,
          custoMensal: 12000,
          atendentesMedios: 8,
          automacao: "Média",
          tempoResposta: "15 min"
        },
        "educacao": {
          custoPorAtendimento: 3.2,
          custoMensal: 9500,
          atendentesMedios: 6,
          automacao: "Baixa",
          tempoResposta: "20 min"
        },
        "saude": {
          custoPorAtendimento: 4.0,
          custoMensal: 13500,
          atendentesMedios: 10,
          automacao: "Média",
          tempoResposta: "25 min"
        },
        "tecnologia-software": {
          custoPorAtendimento: 2.0,
          custoMensal: 11000,
          atendentesMedios: 5,
          automacao: "Alta",
          tempoResposta: "10 min"
        },
        "servicos-financeiros": {
          custoPorAtendimento: 3.5,
          custoMensal: 14000,
          atendentesMedios: 9,
          automacao: "Alta",
          tempoResposta: "12 min"
        },
        "logistica-transporte": {
          custoPorAtendimento: 3.8,
          custoMensal: 12500,
          atendentesMedios: 7,
          automacao: "Média",
          tempoResposta: "18 min"
        },
        "industria": {
          custoPorAtendimento: 3.0,
          custoMensal: 10500,
          atendentesMedios: 6,
          automacao: "Baixa",
          tempoResposta: "22 min"
        },
        "imobiliario-construcao": {
          custoPorAtendimento: 4.2,
          custoMensal: 9800,
          atendentesMedios: 5,
          automacao: "Baixa",
          tempoResposta: "30 min"
        },
        "agencias-marketing": {
          custoPorAtendimento: 2.8,
          custoMensal: 10000,
          atendentesMedios: 4,
          automacao: "Média",
          tempoResposta: "14 min"
        },
        "telecomunicacoes": {
          custoPorAtendimento: 3.6,
          custoMensal: 15000,
          atendentesMedios: 12,
          automacao: "Alta",
          tempoResposta: "8 min"
        },
        "turismo-hotelaria": {
          custoPorAtendimento: 3.1,
          custoMensal: 11000,
          atendentesMedios: 6,
          automacao: "Média",
          tempoResposta: "20 min"
        },
        "outros": {
          custoPorAtendimento: 3.0,
          custoMensal: 10000,
          atendentesMedios: 6,
          automacao: "Média",
          tempoResposta: "20 min"
        }
      };

    const modal = document.getElementById("material-rico-modal");
    const closeBtn = document.querySelector(".close-modal");
    const contatoForm = document.getElementById("contatoForm");
    const conteudoExclusivo = document.getElementById("conteudo-exclusivo");
    
    // Abrir modal quando clicar na seção de benchmark
document.getElementById("obter-resultados").addEventListener("click", function() {
    modal.style.display = "block";
  });
  
  // Fechar modal
  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });
  
  // Fechar ao clicar fora do modal
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  // Processar formulário de contato
  contatoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const empresa = document.getElementById("empresa").value;
    
    // Aqui você pode adicionar validação dos campos
    
    // Simular envio (substitua por sua lógica real)
    console.log("Dados capturados:", { nome, email, empresa });
    
    // Esconder formulário e mostrar conteúdo
    contatoForm.style.display = "none";
    conteudoExclusivo.style.display = "block";
    
    // Preencher os dados do benchmark
    const setorSelecionado = document.getElementById("segmento").value;
    const dados = benchmarkPorSetor[setorSelecionado];
    
    document.getElementById("detalhes-benchmark").innerHTML = `
      <p><strong>Setor:</strong> ${document.getElementById("segmento").options[document.getElementById("segmento").selectedIndex].text}</p>
      <p><strong>Custo por Atendimento:</strong> ${formatarMoeda(dados.custoPorAtendimento)}</p>
      <p><strong>Custo Mensal Médio:</strong> ${formatarMoeda(dados.custoMensal)}</p>
      <p><strong>Atendentes Médios:</strong> ${dados.atendentesMedios}</p>
      <p><strong>Nível de Automação:</strong> ${dados.automacao}</p>
      <p><strong>Tempo Médio de Resposta:</strong> ${dados.tempoResposta}</p>
    `;
  });
  
  // Botão de Download PDF (exemplo)
  document.getElementById("download-pdf").addEventListener("click", function() {
    alert("PDF gerado com sucesso! (simulação)");
    modal.style.display = "none";
  });

  function atualizarComparativo(dadosSetor, dadosUsuario) {
    // Dados formatados para os gráficos
    const labels = ['Sua Operação', 'Média do Setor'];
    const cores = ['#4e73df', '#1cc88a'];
    
    // Gráfico de Custo por Atendimento
    new Chart(
        document.getElementById('custoAtendimentoChart'),
        {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Custo por Atendimento (R$)',
                    data: [dadosUsuario.custoPorAtendimento, dadosSetor.custoPorAtendimento],
                    backgroundColor: cores,
                    borderColor: cores.map(c => c.replace('0.8', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Custo por Atendimento',
                        font: { size: 16 }
                    },
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Valor em R$' }
                    }
                }
            }
        }
    );

    // Gráfico de Custo Mensal
    new Chart(
        document.getElementById('custoMensalChart'),
        {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Custo Mensal (R$)',
                    data: [dadosUsuario.custoMensal, dadosSetor.custoMensal],
                    backgroundColor: cores,
                    borderColor: cores.map(c => c.replace('0.8', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Custo Mensal Total',
                        font: { size: 16 }
                    },
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Valor em R$' }
                    }
                }
            }
        }
    );

    // Gráfico de Número de Atendentes
    new Chart(
        document.getElementById('atendentesChart'),
        {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Atendentes',
                    data: [dadosUsuario.atendentesMedios, dadosSetor.atendentesMedios],
                    backgroundColor: cores,
                    borderColor: cores.map(c => c.replace('0.8', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Quantidade de Atendentes',
                        font: { size: 16 }
                    },
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Número de colaboradores' }
                    }
                }
            }
        }
    );
}
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Pegando valores dos inputs
        const atendimentosMensais = parseFloat(document.getElementById("atendimentos").value) || 0;
        const numeroAtendentes = parseFloat(document.getElementById("atendentes").value) || 0;
        const custoAtendente = parseFloat(document.getElementById("custo").value) || 0;

        // Validação básica
        if (atendimentosMensais <= 0 || numeroAtendentes <= 0 || custoAtendente <= 0) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Cálculos
        const custoGeralAnalistas = numeroAtendentes * custoAtendente;
        const estimativaAtendimentosComIA = atendimentosMensais * 0.4;

        const calcularBonusAtendimento = (estimativaAtendimentosComIA) => {
            return (estimativaAtendimentosComIA - 100) < 0 ? 0 : 5 * (estimativaAtendimentosComIA - 100);
        };

        const investimentoEmResolucoesWoz = calcularBonusAtendimento(estimativaAtendimentosComIA);

        const capacidadeAtual = numeroAtendentes === 0 ? 0 : atendimentosMensais / numeroAtendentes;
        const capacidadeWOZ = capacidadeAtual * 1.8;
        const tmaReducao = 0.56; // WOZ reduz o TMA em 44%
        const numeroAtendentesWOZ = atendimentosMensais / capacidadeWOZ;
        const savingMensal = (numeroAtendentes - numeroAtendentesWOZ) * custoAtendente;
        const savingAnual = savingMensal * 12;

         // Cálculo do custo por atendimento
         const custoPorAtendimento = custoAtendente / capacidadeAtual;
         const custoPorAtendimentoWOZ = custoAtendente / capacidadeWOZ;

        const calcularAnalistasNecessariosComWoz = 
        (atendimentosMensais, estimativaAtendimentosComIA, capacidadeAtual) => {
            return capacidadeAtual === 0 ? 0 : (atendimentosMensais - estimativaAtendimentosComIA) / capacidadeAtual;
        };

        const analistasComWoz = calcularAnalistasNecessariosComWoz(
            atendimentosMensais,
            estimativaAtendimentosComIA,
            capacidadeAtual
        );
        
        const calcularResolucoesWozMaisAnalistas = 
        (analistasComWoz, custoAtendente, investimentoEmResolucoesWoz) => {
            return (analistasComWoz-custoAtendente)+investimentoEmResolucoesWoz;
        }

        const resolucoesWozMaisAnalistas = calcularResolucoesWozMaisAnalistas
        (analistasComWoz, custoAtendente, investimentoEmResolucoesWoz);

        const calcularValorAtendimentoComWOZ = (resolucoesWozMaisAnalistas, atendimentosMensais) => 
        {
           return atendimentosMensais === 0 ? 0 : resolucoesWozMaisAnalistas / atendimentosMensais;
        }

        const valorAtendimentoComWOZ = calcularValorAtendimentoComWOZ (resolucoesWozMaisAnalistas, atendimentosMensais);

        const calcularEconomiaComAnalistas = (custoGeralAnalistas, analistasComWoz, capacidadeAtual) => {
            return custoGeralAnalistas - (analistasComWoz*capacidadeAtual)
        }

        const resultEconomiaComAnalistas = calcularEconomiaComAnalistas(custoGeralAnalistas, analistasComWoz, capacidadeAtual);

        const calculoEconomiaGeral = (valorAtendimentoComWOZ, custoPorAtendimento) => {
            if (custoPorAtendimento === 0) return ""; 
            return 1 - (valorAtendimentoComWOZ / custoPorAtendimento);
        };

        const economiaGeral = calculoEconomiaGeral(valorAtendimentoComWOZ, custoPorAtendimento);

        // Atualizar os blocos de resultado
        document.getElementById("result-custo-geral-analistas").textContent = `Custo geral de com analistas: R$ ${custoGeralAnalistas.toLocaleString("pt-BR", {minimumFractionDigits: 2})}`;
        document.getElementById("result-custo-atendimento").textContent = `Valor do atendimento atualmente: R$ ${custoPorAtendimento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
        document.getElementById("result-atendimento-analista").textContent = `Capacidade atual: ${capacidadeAtual.toFixed(2)} atendimentos/analista`;
        document.getElementById("result-estimativa-atendimento-com-ia").textContent = `Quantos atendimentos esperamos resolver diretamente com a IA: ${estimativaAtendimentosComIA}`;
        document.getElementById("result-investimentos-resolucoes-woz").textContent = `Investimento em Resoluções - Woz: R$ ${investimentoEmResolucoesWoz.toLocaleString("pt-BR", {minimumFractionDigits: 2})}`
        document.getElementById("analistas-necessarios-com-woz").textContent = `Analistas necessários com WOZ: ${analistasComWoz}`;
        document.getElementById("custo-resolucoes-analistas-mais-woz").textContent = `Resoluções Woz + Analistas: R$ ${resolucoesWozMaisAnalistas.toLocaleString("pt-BR", {minimumFractionDigits: 2})}`
        document.getElementById("valor-atendimento-com-woz").textContent = `Valor do atendimento com WOZ: R$ ${valorAtendimentoComWOZ.toLocaleString("pt-BR", {minimumFractionDigits: 2})}`;
        document.getElementById("economia-com-analistas").textContent = `Economia com analistas R$ ${resultEconomiaComAnalistas.toLocaleString("pt-BR", {minimumFractionDigits: 2})}`;
        document.getElementById("economia-total").textContent = `Economia total com WOZ ${economiaGeral.toFixed(2)}%`;
    
        // Preparar dados do usuário para comparação
        const dadosUsuario = {
            custoPorAtendimento: custoPorAtendimento,
            custoMensal: custoGeralAnalistas,
            atendentesMedios: numeroAtendentes
        };


        const setorSelecionado = document.getElementById("segmento").value;
        const dados = benchmarkPorSetor[setorSelecionado];

        if (dados && dadosUsuario) {
            atualizarComparativo(dados, dadosUsuario)
            document.getElementById("output-custo-atendimento").textContent = `Custo por atendimento: R$ ${dados.custoPorAtendimento.toFixed(2)}`;
            document.getElementById("output-custo-mensal").textContent = `Custo média mensal no setor: R$ ${dados.custoMensal.toLocaleString("pt-BR")}`;
            document.getElementById("output-atendentes").textContent = `Qtde média de atendentes: ${dados.atendentesMedios} pessoas`;
            document.getElementById("output-automacao").textContent = `Nível de automação no setor (estimado): ${dados.automacao}`;
            document.getElementById("output-tempo-resposta").textContent = `Tempo médio de resposta no setor: ${dados.tempoResposta}`;

            document.getElementById("resultados").style.display = "block";
        }
        else {
            document.getElementById("resultados").style.display = "none";
        }
    });
});
