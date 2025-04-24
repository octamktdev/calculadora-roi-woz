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
    nome: "Varejo e E-commerce",
    custoPorAtendimento: 2.80,
    custoMensal: 12500,
    atendentesMedios: 7,
    eficiencia: 230,
    automacao: "Média",
    tempoRespostaMin: 12,
    fontes: ["ABComm 2023", "RD Station 2022"],
    custoMensalPorAtendente: 4235.50,
    composicaoCusto: {
      salarioBase: 2850,
      encargos: 1385.50,
      beneficios: 800
    }
  },
  "educacao": {
    nome: "Educação",
    custoPorAtendimento: 3.20,
    custoMensal: 9500,
    atendentesMedios: 6,
    automacao: "Baixa",
    tempoRespostaMin: 20,
    custoMensalPorAtendente: 3870.20,
    composicaoCusto: {
      salarioBase: 2600,
      encargos: 1270.20,
      beneficios: 700
    }
  },
  "saude": {
    nome: "Saúde",
    custoPorAtendimento: 4.50,
    custoMensal: 14200,
    atendentesMedios: 9,
    eficiencia: 180,
    automacao: "Baixa",
    tempoRespostaMin: 22,
    fontes: ["McKinsey 2023", "Conselho Nacional de Saúde 2022"],
    custoMensalPorAtendente: 5120.75,
    composicaoCusto: {
      salarioBase: 3500,
      encargos: 1620.75,
      beneficios: 1000
    }
  },
  "tecnologia-software": {
    nome: "Tecnologia e Software",
    custoPorAtendimento: 2.00,
    custoMensal: 11000,
    atendentesMedios: 5,
    automacao: "Alta",
    tempoRespostaMin: 10,
    custoMensalPorAtendente: 4000.00,
    composicaoCusto: {
      salarioBase: 2700,
      encargos: 1100,
      beneficios: 200
    }
  },
  "servicos-financeiros": {
    nome: "Serviços Financeiros",
    custoPorAtendimento: 3.50,
    custoMensal: 14000,
    atendentesMedios: 9,
    automacao: "Alta",
    tempoRespostaMin: 12,
    custoMensalPorAtendente: 4666.67,
    composicaoCusto: {
      salarioBase: 3000,
      encargos: 1300,
      beneficios: 366.67
    }
  },
  "logistica-transporte": {
    nome: "Logística e Transporte",
    custoPorAtendimento: 3.80,
    custoMensal: 12500,
    atendentesMedios: 7,
    automacao: "Média",
    tempoRespostaMin: 18,
    custoMensalPorAtendente: 4464.29,
    composicaoCusto: {
      salarioBase: 2900,
      encargos: 1200,
      beneficios: 364.29
    }
  },
  "industria": {
    nome: "Indústria",
    custoPorAtendimento: 3.00,
    custoMensal: 10500,
    atendentesMedios: 6,
    automacao: "Baixa",
    tempoRespostaMin: 22,
    custoMensalPorAtendente: 4375.00,
    composicaoCusto: {
      salarioBase: 2800,
      encargos: 1200,
      beneficios: 375
    }
  },
  "telecomunicacoes": {
    custoPorAtendimento: 3.6,
    custoMensal: 15000,
    atendentesMedios: 12,
    automacao: "Alta",
    tempoResposta: "8 min",
    fontes: "Brasscom 2023, Conexis Brasil Digital 2023",
    custoMensalPorAtendente: 3913.00,
    composicaoCusto: {
      salarioBase: 2800.00,
      encargos: 813.00,
      beneficios: 300.00
    }
  },
  "turismo-hotelaria": {
    custoPorAtendimento: 3.1,
    custoMensal: 11000,
    atendentesMedios: 6,
    automacao: "Média",
    tempoResposta: "20 min",
    fontes: "Ministério do Turismo 2023",
    custoMensalPorAtendente: 3500.00,
    composicaoCusto: {
      salarioBase: 2500.00,
      encargos: 700.00,
      beneficios: 300.00
    }
  },
  "imobiliario-construcao": {
    custoPorAtendimento: 4.2,
    custoMensal: 9800,
    atendentesMedios: 5,
    automacao: "Baixa",
    tempoResposta: "30 min",
    fontes: "Estimativas de mercado 2023",
    custoMensalPorAtendente: 3800.00,
    composicaoCusto: {
      salarioBase: 2600.00,
      encargos: 800.00,
      beneficios: 400.00
    }
  },
  "agencias-marketing": {
    custoPorAtendimento: 2.8,
    custoMensal: 10000,
    atendentesMedios: 4,
    automacao: "Média",
    tempoResposta: "14 min",
    fontes: "Estimativas de mercado 2023",
    custoMensalPorAtendente: 3500.00,
    composicaoCusto: {
      salarioBase: 2400.00,
      encargos: 700.00,
      beneficios: 400.00
    }
  },
    "outros": {
    nome: "Outros",
    custoPorAtendimento: 3.0,
    custoMensal: 10000,
    atendentesMedios: 6,
    automacao: "Média",
    tempoResposta: "20 min",
    custoMensalPorAtendente: 3500.00, // Adicionado valor padrão
    composicaoCusto: { // Adicionada estrutura de composição
      salarioBase: 2500.00,
      encargos: 700.00,
      beneficios: 300.00
        }
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

    // Captura os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const empresa = document.getElementById("empresa").value.trim();

     // Monta o payload para o Make
  const data = {
    nome: nome,
    telefone: telefone,
    email: email,
    empresa: empresa
  };

  // Substitua pela URL do seu webhook do Make
  const webhookUrl = "https://hook.us2.make.com/mu93lt625h5bfmq3us3cn29tfx3lxc3o";

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error("Erro no envio");
      console.log("Dados enviados com sucesso!");
      // Aqui você pode redirecionar, abrir uma seção, liberar acesso, etc.
    })
    .catch(error => {
      console.error("Erro ao enviar dados:", error);
    });

    const conteudo = document.getElementById("conteudo-exclusivo");
    conteudo.classList.remove("conteudo-oculto");
    conteudo.classList.add("conteudo-visivel");

    // Esconder formulário e mostrar resultados
    contatoForm.style.display = "none";
    conteudoExclusivo.style.display = "block";

    // Obter dados do setor
    const setorSelecionado = document.getElementById("segmento").value;
    const dadosSetor = benchmarkPorSetor[setorSelecionado];
    const custoAtendente = dadosSetor.custoMensalPorAtendente || 3500; // Valor padrão caso não exista

    document.getElementById("custo-utilizado").textContent = 
        `Custo utilizado (média do setor): ${formatarMoeda(custoAtendente)}`;

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
        const crescimentoMensal = document.getElementById("crescimento-mensal-empresa").value;
        const duvidasRepetidas = document.getElementById("porcentagem-de-duvidas-repetidas").value;

        const payload = {
            segmento: document.getElementById("segmento").value,
            atendentes: document.getElementById("atendentes").value,
            atendimentos: document.getElementById("atendimentos").value,
            crescimentoMensal: document.getElementById("crescimento-mensal-empresa").value,
            duvidasRepetidas: document.getElementById("porcentagem-de-duvidas-repetidas").value
          };
        
          fetch("https://hook.us2.make.com/pyrznbqqpp6361qqsc1pij0pcseb23xl", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(() => {
            console.log("Dados enviados com sucesso!");
          })
          .catch(error => {
            console.error("Erro ao enviar dados:", error);
          });

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
