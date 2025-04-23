document.addEventListener("DOMContentLoaded", function () {
    function formatarMoeda(valor) {
        if (!Number.isFinite(valor)) {
            console.warn("Valor inválido para formatação:", valor);
            return "R$ 0,00";
        }
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2
        });
    }

    const form = document.getElementById("roiForm");

    const benchmarkPorSetor = {
       "varejo-ecommerce": {
        custoPorAtendimento: 2.8,  // Fonte: ABComm 2023
        custoMensal: 12500,        // Média empresas R$ 5-50mi faturamento
        atendentesMedios: 7,
        eficiencia: 230,           // Atendimentos/analista/mês
        automacao: "Média",
        tempoResposta: "12 min",   // Fonte: RD Station
        fontes: "ABComm 2023, RD Station 2022",
        custoMensalPorAtendente: 4235.50, // Salário + encargos (CLT)
        composicaoCusto: {
            salarioBase: 2850.00,
            encargos: 1385.50, // INSS, FGTS, etc.
            beneficios: 800.00 // VR, VT, etc.
        }
    },
        "educacao": {
          custoPorAtendimento: 3.2,
          custoMensal: 9500,
          atendentesMedios: 6,
          automacao: "Baixa",
          tempoResposta: "20 min",
          custoMensalPorAtendente: 3870.20,
          composicaoCusto: {
              salarioBase: 2600.00,
              encargos: 1270.20,
              beneficios: 700.00
          }
        },
       "saude": {
        custoPorAtendimento: 4.5,  // Fonte: McKinsey
        custoMensal: 14200,
        atendentesMedios: 9,
        eficiencia: 180,
        automacao: "Baixa",
        tempoResposta: "22 min",   // Fonte: Conselho Nacional de Saúde
        fontes: "McKinsey 2023, CNS 2022",
        custoMensalPorAtendente: 5120.75,
        composicaoCusto: {
            salarioBase: 3500.00,
            encargos: 1620.75,
            beneficios: 1000.00
        }
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
  
  contatoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Coletar dados
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const empresa = document.getElementById("empresa").value;

    const conteudo = document.getElementById("conteudo-exclusivo");
    conteudo.classList.remove("conteudo-oculto");
    conteudo.classList.add("conteudo-visivel");

    // Esconder formulário e mostrar resultados
    contatoForm.style.display = "none";
    conteudoExclusivo.style.display = "block";

    // Obter dados do setor
    const setorSelecionado = document.getElementById("segmento").value;
    const dadosSetor = benchmarkPorSetor[setorSelecionado];

    // Obter dados do usuário
    const dadosUsuario = {
        custoPorAtendimento: parseFloat(
            document.getElementById("result-custo-atendimento").textContent
                .replace(/[^\d,]/g, '')
                .replace(',', '.')
        ),
        custoMensal: parseFloat(
            document.getElementById("result-custo-geral-analistas").textContent
                .replace(/[^\d,]/g, '')
                .replace(',', '.')
        ),
        atendentesMedios: parseFloat(document.getElementById("atendentes").value)
    };

    // Atualizar textos do benchmark (sem recriar os canvas)
    const detalhesBenchmark = document.getElementById("detalhes-benchmark");
    detalhesBenchmark.insertAdjacentHTML("afterbegin", `
        <p><strong>Setor:</strong> ${document.getElementById("segmento").options[document.getElementById("segmento").selectedIndex].text}</p>
        <p><strong>Custo por Atendimento:</strong> ${formatarMoeda(dadosSetor.custoPorAtendimento)}</p>
        <p><strong>Custo Mensal Médio:</strong> ${formatarMoeda(dadosSetor.custoMensal)}</p>
        <p><strong>Atendentes Médios:</strong> ${dadosSetor.atendentesMedios}</p>
        <p><strong>Nível de Automação:</strong> ${dadosSetor.automacao}</p>
        <p><strong>Tempo Médio de Resposta:</strong> ${dadosSetor.tempoResposta}</p>
    `);

    // Agora cria os gráficos nos canvases que já existem
    setTimeout(() => {
        criarGraficosModal(dadosSetor, dadosUsuario);
        conteudo.style.opacity = 1;
    }, 100);
});

    form.addEventListener("submit", function (event) {
        event.preventDefault();
       
        // Pegando valores dos inputs
        const atendimentosMensais = parseFloat(document.getElementById("atendimentos").value) || 0;
        const numeroAtendentes = parseFloat(document.getElementById("atendentes").value) || 0;
        const setorSelecionado = document.getElementById("segmento").value;

        if (atendimentosMensais <= 0 || numeroAtendentes <= 0) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }


        // Obtendo o custo do setor selecionado
        const dadosSetor = benchmarkPorSetor[setorSelecionado];
        const custoAtendente = dadosSetor.custoMensalPorAtendente;

         // Mostra o custo utilizado nos cálculos
        document.getElementById("custo-utilizado").textContent = 
        `Custo utilizado (média do setor): ${formatarMoeda(custoAtendente)}`;

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

                // Calcule a capacidade e custo por atendimento
        const capacidadeAtual = numeroAtendentes === 0 ? 0 : atendimentosMensais / numeroAtendentes;
        const custoPorAtendimento = capacidadeAtual === 0 ? 0 : custoAtendente / capacidadeAtual;

        const capacidadeWOZ = capacidadeAtual * 1.8;
        const tmaReducao = 0.56; // WOZ reduz o TMA em 44%
        const numeroAtendentesWOZ = atendimentosMensais / capacidadeWOZ;
        const savingMensal = (numeroAtendentes - numeroAtendentesWOZ) * custoAtendente;
        const savingAnual = savingMensal * 12;

         // Cálculo do custo por atendimento
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
            return (analistasComWoz * custoAtendente) + investimentoEmResolucoesWoz;
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
        document.getElementById("result-custo-geral-analistas").textContent = `${formatarMoeda(custoGeralAnalistas)}`;
        document.getElementById("result-custo-atendimento").textContent = `${formatarMoeda(custoPorAtendimento)}`;
        document.getElementById("result-atendimento-analista").textContent = ` ${capacidadeAtual.toFixed(2)} atendimentos/analista`;
        document.getElementById("result-estimativa-atendimento-com-ia").textContent = `${estimativaAtendimentosComIA}`;
        document.getElementById("result-investimentos-resolucoes-woz").textContent = `${formatarMoeda(investimentoEmResolucoesWoz)}`
        document.getElementById("analistas-necessarios-com-woz").textContent = `${analistasComWoz}`;
        document.getElementById("custo-resolucoes-analistas-mais-woz").textContent = `${formatarMoeda(resolucoesWozMaisAnalistas)}`
        document.getElementById("valor-atendimento-com-woz").textContent = `${formatarMoeda(valorAtendimentoComWOZ)}`;
        document.getElementById("economia-com-analistas").textContent = `${formatarMoeda(resultEconomiaComAnalistas)}`;
        document.getElementById("economia-total").textContent = `${(economiaGeral * 100).toFixed(2)}%`;
    
       // Mostrar a seção de resultados com transição
        const resultsSection = document.getElementById("results-section");

        resultsSection.classList.remove("visivel");
        resultsSection.style.display = "flex";

        setTimeout(() => {
            resultsSection.classList.add("visivel");
          }, 50);

         // Preparar dados para comparação
         const dadosUsuario = {
            custoPorAtendimento: custoPorAtendimento,
            custoMensal: custoGeralAnalistas,
            atendentesMedios: numeroAtendentes
        };

        const dados = benchmarkPorSetor[setorSelecionado];

        if (dados) {
            document.getElementById("output-custo-atendimento").textContent = `R$ ${dados.custoPorAtendimento.toFixed(2)}`;
            document.getElementById("output-custo-mensal").textContent = `${formatarMoeda(dados.custoMensal)}`;
            document.getElementById("output-atendentes").textContent = `${dados.atendentesMedios} pessoas`;
            document.getElementById("output-automacao").textContent = `${dados.automacao}`;
            document.getElementById("output-tempo-resposta").textContent = `${dados.tempoResposta}`;
        }
    });

    function getDadosUsuario() {
        return {
            custoPorAtendimento: parseFloat(document.getElementById("result-custo-atendimento").textContent.replace(/[^\d,]/g, '').replace(',', '.')),
            custoMensal: parseFloat(document.getElementById("result-custo-geral-analistas").textContent.replace(/[^\d,]/g, '').replace(',', '.')),
            atendentesMedios: parseFloat(document.getElementById("atendentes").value)
        };
    }
    

    // Função auxiliar para esperar elementos
    function waitForElement(id, callback, attempts = 10, interval = 100) {
        const check = (remaining) => {
            const element = document.getElementById(id);
            if (element) {
                callback(element);
            } else if (remaining > 0) {
                setTimeout(() => check(remaining - 1), interval);
            } else {
                console.error(`Elemento ${id} não encontrado após ${attempts} tentativas`);
            }
        };
        check(attempts);
    }


    function criarGraficosModal(dadosSetor, dadosUsuario) {
        const chartConfigs = [
            { id: 'modalCustoAtendimentoChart', label: 'Custo por Atendimento', dataKey: 'custoPorAtendimento' },
            { id: 'modalCustoMensalChart', label: 'Custo Mensal', dataKey: 'custoMensal' },
            { id: 'modalAtendentesChart', label: 'Atendentes', dataKey: 'atendentesMedios' }
        ];
    
        chartConfigs.forEach(config => {
            waitForElement(config.id, (canvas) => {
                // Destruir gráfico existente
                const chartInstance = Chart.getChart(canvas);
                if (chartInstance) chartInstance.destroy();
    
                // Forçar redimensionamento
                canvas.style.display = 'block';
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = 400;
    
                // Criar novo gráfico
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: ['Sua Operação', 'Média do Setor'],
                        datasets: [{
                            label: config.label,
                            data: [dadosUsuario[config.dataKey], dadosSetor[config.dataKey]],
                            backgroundColor: ['#4e73df', '#1cc88a'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: { display: true, text: config.label },
                            legend: { display: false }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            });
        });
    }
    
    // Mantenha esta função auxiliar
    function getChartOptions(title) {
        return {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: { size: 16 }
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { 
                        display: true, 
                        text: title.includes('Atendentes') 
                            ? 'Número de colaboradores' 
                            : 'Valor em R$' 
                    }
                }
            }
        };
    }

});
