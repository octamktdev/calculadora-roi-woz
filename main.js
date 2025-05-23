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

    function exibirValorOuAviso(id, valor, formatador = v => v) {
      const el = document.getElementById(id);
      if (valor <= 0 || isNaN(valor)) {
          el.textContent = "❗Sua operação aparenta estar com problemas. Fale com nossos especialistas.";
      } else {
          el.textContent = formatador(valor);
      }
    }

    function gerarInsightOperacao(atendimentosMensais, numeroAtendentes) {
        const benchmarkPorAtendente = 350;
    
        if (numeroAtendentes === 0) return ""; // Evitar divisão por zero
    
        const capacidadeBenchmark = numeroAtendentes * benchmarkPorAtendente;
    
        if (atendimentosMensais === capacidadeBenchmark) {
            return ""; // Se bateu exatamente o benchmark, não mostra nada
        } else if (atendimentosMensais > capacidadeBenchmark) {
            const excedente = atendimentosMensais - capacidadeBenchmark;
            return `⚠️ Aproximadamente <strong>${excedente}</strong> atendimentos podem estar ficando sem resposta.`;
        } else {
            return `🎯 O benchmark é de <strong>${benchmarkPorAtendente} atendimentos/mês</strong> por atendente.`;
        }
    }
    
    function aplicarMascaraMilhar(input) {
      input.addEventListener("input", () => {
        //remove digitos que não são números
        let valor = input.value.replace(/\D/g, "");
    
        valor = Number(valor).toLocaleString("pt-BR");
    
        input.value = valor;
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
    const salarioBase = dadosSetor.composicaoCusto.salarioBase;
    const custoAtendente = salarioBase * 1.8;

    document.getElementById("custo-utilizado").textContent = 
        `${formatarMoeda(custoAtendente)}`;

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
      
        fetch("https://hook.us2.make.com/51c9p2ddonfyio5y6tlshmemou3lfiox", {
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
        `${formatarMoeda(custoAtendente)}`;

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

        const valorAtendimentoComWOZ = calcularValorAtendimentoComWOZ (
            resolucoesWozMaisAnalistas, 
            atendimentosMensais,
        );

        function calcularPorcentagemEconomia(custoAtual, valorAtendimentoComWOZ) {
          if (custoAtual <= 0 || valorAtendimentoComWOZ <= 0) return "0%";
          
          const economiaPercentualAtendimentos = ((custoAtual - valorAtendimentoComWOZ) / custoAtual) * 100;
          return economiaPercentualAtendimentos.toFixed(2) + "%";
        }

        const porcentagemEconomia = calcularPorcentagemEconomia(
          custoPorAtendimento, 
          valorAtendimentoComWOZ
        );

        const porcentagemEconomiaMensal = calcularPorcentagemEconomia(
          custoGeralAnalistas,
          resolucoesWozMaisAnalistas
        );

        console.log("Custo por atendimento:", custoPorAtendimento);
        console.log("Com WOZ:", valorAtendimentoComWOZ);
        console.log("Economia % por atendimento:", porcentagemEconomia);

        console.log("Custo mensal atual:", custoGeralAnalistas);
        console.log("Com WOZ:", resolucoesWozMaisAnalistas);
        console.log("Economia % mensal geral:", porcentagemEconomiaMensal);


        const calcularEconomiaAnalistas = (custoAtual, atendentesReduzidos, custoPorAtendente) => {
            return custoAtual - (Math.ceil(atendentesReduzidos) * custoPorAtendente);
        }

        const resultEconomiaComAnalistas = calcularEconomiaAnalistas(
            custoGeralAnalistas,
            analistasComWoz,
            custoAtendente
        );

        const calculoEconomiaGeral = (valorAtendimentoComWOZ, custoPorAtendimento) => {
            if (custoPorAtendimento === 0) return "";
        
            const economia = 1 - (valorAtendimentoComWOZ / custoPorAtendimento);
            const economiaSegura = Math.max(0, economia);
            const porcentagem = economiaSegura * 100;
            
            console.log("valorAtendimentoComWOZ:", valorAtendimentoComWOZ);
            console.log("custoPorAtendimento:", custoPorAtendimento);

            return Number.isInteger(porcentagem)
                ? `${porcentagem.toFixed(0)}%`
                : `${porcentagem.toFixed(2)}%`;
        };

        const economiaGeral = calculoEconomiaGeral(valorAtendimentoComWOZ, custoPorAtendimento);


        // Atualizar os blocos de resultado
        document.getElementById("result-custo-geral-analistas").textContent = `${formatarMoeda(custoGeralAnalistas)}`;

        document.getElementById("result-custo-atendimento").textContent = `${formatarMoeda(custoPorAtendimento)}`;
        document.getElementById("result-atendimento-analista").textContent = Math.trunc(capacidadeAtual).toLocaleString("pt-BR");
        
        document.getElementById("result-estimativa-atendimento-com-ia").textContent = estimativaAtendimentosComIA.toLocaleString("pt-BR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });        
        
        document.getElementById("result-investimentos-resolucoes-woz").textContent = `${formatarMoeda(investimentoEmResolucoesWoz)}`
        
        //document.getElementById("analistas-necessarios-com-woz").textContent = `${Math.trunc(analistasComWoz)}`;
        exibirValorOuAviso("analistas-necessarios-com-woz", analistasComWoz, v => Math.trunc(v));

        
        document.getElementById("custo-resolucoes-analistas-mais-woz").textContent = `${formatarMoeda(resolucoesWozMaisAnalistas)}`
        
        //document.getElementById("porcentagem-economia-atendimentos").textContent = porcentagemEconomia;
        //document.getElementById("porcentagem-economia-atendimentos").textContent = `${porcentagemEconomia}`;

        //document.getElementById("porcentagem-economia-mensal-geral").textContent = porcentagemEconomiaMensal;
        //document.getElementById("porcentagem-economia-mensal-geral").textContent = `${porcentagemEconomiaMensal}`
        

        const economiaAtendimentosEl = document.getElementById("economia-atendimentos-item");
            if (parseFloat(porcentagemEconomia.replace('%', '')) > 0) {
              document.getElementById("porcentagem-economia-atendimentos").textContent = porcentagemEconomia;
              economiaAtendimentosEl.style.display = "block";
            } else {
              economiaAtendimentosEl.style.display = "none";
            }

            // Economia mensal geral
            const economiaTotalEl = document.getElementById("economia-total-item");
            if (parseFloat(porcentagemEconomiaMensal.replace('%', '')) > 0) {
              document.getElementById("porcentagem-economia-mensal-geral").textContent = porcentagemEconomiaMensal;
              economiaTotalEl.style.display = "block";
            } else {
              economiaTotalEl.style.display = "none";
        }

        
        document.getElementById("valor-atendimento-com-woz").textContent = `${formatarMoeda(valorAtendimentoComWOZ)}`;
        
        //document.getElementById("economia-com-analistas").textContent = `${formatarMoeda(resultEconomiaComAnalistas)}`;
        exibirValorOuAviso("economia-com-analistas", resultEconomiaComAnalistas, formatarMoeda);

        const economiaTotalMonetaria = custoGeralAnalistas - resolucoesWozMaisAnalistas;
        
        exibirValorOuAviso("economia-total", economiaTotalMonetaria, formatarMoeda);

        //document.getElementById("economia-total").textContent = `${formatarMoeda(economiaTotalMonetaria)}`;
        //document.getElementById("economia-total").textContent = economiaGeral;
    
        const inputAtendimentos = document.getElementById("atendimentos");
        aplicarMascaraMilhar(inputAtendimentos);


        const insightOperacao = gerarInsightOperacao(atendimentosMensais, numeroAtendentes);
        const insightElemento = document.getElementById("dica-eficiencia");
        
        if (insightOperacao) {
            insightElemento.innerHTML = insightOperacao;
            insightElemento.style.display = "block";
        } else {
            insightElemento.style.display = "none";
        }

       // Mostrar a seção de resultados com transição
        const resultsSection = document.getElementById("results-section");

        resultsSection.classList.remove("visivel");
        resultsSection.style.display = "flex";

        setTimeout(() => {
            resultsSection.classList.add("visivel");
          }, 50);

          const dicaEficiencia = document.getElementById("dica-eficiencia");
          dicaEficiencia.innerHTML = gerarInsightOperacao(
              document.getElementById("atendimentos").value.replace(/\./g, ""),
              document.getElementById("atendentes").value
          );

          setTimeout(() => {
            dicaEficiencia.classList.add("visivel");
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

    function formatPercentageInput(input) {
        input.addEventListener('input', () => {
          let value = input.value.replace('%', '').trim();
          
          // Permite apenas números e ponto ou vírgula
          if (!isNaN(value) && value !== '') {
            input.value = value + '%';
          } else if (value === '') {
            input.value = '';
          }
        });
      }
      
      const campoCrescimento = document.getElementById('crescimento-mensal-empresa');
      const campoDuvidas = document.getElementById('porcentagem-de-duvidas-repetidas');
      
      formatPercentageInput(campoCrescimento);
      formatPercentageInput(campoDuvidas);

    const analiseMercado = gerarInsightOperacao(
        parseFloat(document.getElementById("atendimentos").value.replace(/\./g, "")),
        parseFloat(document.getElementById("atendentes").value)
    );

    document.getElementById("dica-eficiencia").innerHTML = analiseMercado;

    console.log("Debug - Valores recebidos:", {
        atendimentosInput: document.getElementById("atendimentos").value.replace(/\./g, ""),
        numAtendentes: document.getElementById("atendentes").value,
        tipoAtendimentos: typeof document.getElementById("atendimentos").value.replace(/\./g, ""),
        tipoAtendentes: typeof document.getElementById("atendentes").value
    });

});
