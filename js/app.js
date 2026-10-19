(() => {
  "use strict";

  const data = window.FinanceData;
  const quizQuestions = [
    {
      question: "¿Qué busca principalmente Business Intelligence?",
      options: [
        "Guardar todos los datos sin organizarlos",
        "Convertir datos en información útil para tomar decisiones",
        "Reemplazar por completo el criterio de las personas",
        "Crear datos nuevos aunque no haya una fuente"
      ],
      answer: 1,
      explanation: "BI ayuda a analizar la información disponible para tomar decisiones mejor informadas."
    },
    {
      question: "¿Cuál es el orden correcto de los pasos ETL?",
      options: [
        "Transformar, cargar, extraer",
        "Cargar, extraer, transformar",
        "Extraer, transformar, cargar",
        "Extraer, cargar, transformar"
      ],
      answer: 2,
      explanation: "Primero se extraen los datos, luego se transforman y finalmente se cargan para analizarlos."
    },
    {
      question: "En un análisis de gastos, ¿qué sería un ejemplo de transformación?",
      options: [
        "Descargar movimientos de la cuenta bancaria",
        "Agrupar nombres como “super” y “supermercado” en una categoría",
        "Mostrar el total mensual en una gráfica",
        "Abrir la aplicación del banco"
      ],
      answer: 1,
      explanation: "Unificar nombres y clasificar transacciones prepara los datos para analizarlos."
    },
    {
      question: "¿Qué ventaja ofrece comparar gastos de varios meses?",
      options: [
        "Permite identificar tendencias y cambios",
        "Garantiza que los gastos futuros serán iguales",
        "Elimina la necesidad de revisar los datos",
        "Aumenta automáticamente los ingresos"
      ],
      answer: 0,
      explanation: "La comparación histórica permite observar patrones, aunque no predice ni garantiza el futuro."
    },
    {
      question: "¿Qué papel tienen los datos en una buena decisión?",
      options: [
        "Deciden automáticamente por la persona",
        "Sustituyen todos los objetivos personales",
        "Aportan evidencia y contexto para elegir con criterio",
        "Solo sirven si hay miles de registros"
      ],
      answer: 2,
      explanation: "Los datos aportan contexto; la persona combina esa evidencia con sus objetivos y criterio."
    }
  ];

  const currencyFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: data.currency,
    maximumFractionDigits: 0
  });
  const percentFormatter = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 });
  const formatCurrency = (amount) => currencyFormatter.format(amount);

  const quizArea = document.querySelector("#quiz-question-area");
  const quizCount = document.querySelector("#quiz-count");
  const quizScore = document.querySelector("#quiz-score");
  const quizFeedback = document.querySelector("#quiz-feedback");
  const quizNext = document.querySelector("#quiz-next");
  const quizHint = document.querySelector("#quiz-hint");
  const quizProgressBar = document.querySelector("#quiz-progress-bar");
  const quizProgress = document.querySelector(".quiz-progress");
  let questionIndex = 0;
  let score = 0;
  let answered = false;
  let selectedAnswer = null;

  function renderQuestion() {
    const item = quizQuestions[questionIndex];
    answered = false;
    selectedAnswer = null;
    quizCount.textContent = `Pregunta ${questionIndex + 1} de ${quizQuestions.length}`;
    quizScore.textContent = String(score);
    quizProgressBar.style.width = `${(questionIndex / quizQuestions.length) * 100}%`;
    quizProgress.setAttribute("aria-valuenow", String(questionIndex));
    quizFeedback.hidden = true;
    quizFeedback.className = "quiz-feedback";
    quizNext.disabled = true;
    quizNext.textContent = "Comprobar respuesta →";
    quizHint.textContent = "Selecciona una opción para continuar.";
    quizArea.innerHTML = `
      <h3 class="question-text">${item.question}</h3>
      <div class="answer-list">
        ${item.options.map((option, index) => `
          <label class="answer-option" data-answer="${index}">
            <input type="radio" name="quiz-answer" value="${index}">
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
    `;
    quizArea.querySelectorAll('input[name="quiz-answer"]').forEach((input) => {
      input.addEventListener("change", (event) => {
        if (answered) return;
        selectedAnswer = Number(event.target.value);
        quizArea.querySelectorAll(".answer-option").forEach((option) => option.classList.remove("selected"));
        event.target.closest(".answer-option").classList.add("selected");
        quizNext.disabled = false;
      });
    });
  }

  function showResult() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const message = score === quizQuestions.length
      ? "¡Excelente! Tienes claros los fundamentos de BI y ETL."
      : score >= 3
        ? "¡Buen trabajo! Ya tienes una base para seguir explorando."
        : "¡Vas empezando! Repasa los conceptos y vuelve a intentarlo.";
    quizCount.textContent = "Reto completado";
    quizProgressBar.style.width = "100%";
    quizProgress.setAttribute("aria-valuenow", String(quizQuestions.length));
    quizFeedback.hidden = true;
    quizArea.innerHTML = `
      <div class="result-panel">
        <div class="result-icon" aria-hidden="true">${score >= 3 ? "✦" : "↗"}</div>
        <h3>${message}</h3>
        <p>Terminaste el cuestionario. Cada respuesta es una oportunidad para aprender.</p>
        <div class="result-score">${score} / ${quizQuestions.length} <span class="quiz-hint">· ${percentage}%</span></div>
        <button class="btn btn-outline-primary" id="quiz-restart" type="button">Intentarlo de nuevo ↻</button>
      </div>
    `;
    quizNext.hidden = true;
    quizHint.textContent = "";
    document.querySelector("#quiz-restart").addEventListener("click", restartQuiz);
  }

  function restartQuiz() {
    questionIndex = 0;
    score = 0;
    quizNext.hidden = false;
    renderQuestion();
  }

  quizNext.addEventListener("click", () => {
    if (!answered) {
      if (selectedAnswer === null) return;
      answered = true;
      const item = quizQuestions[questionIndex];
      const isCorrect = selectedAnswer === item.answer;
      if (isCorrect) score += 1;
      quizScore.textContent = String(score);
      quizFeedback.hidden = false;
      quizFeedback.classList.add(isCorrect ? "is-correct" : "is-incorrect");
      quizFeedback.textContent = `${isCorrect ? "¡Correcto!" : "No exactamente."} ${item.explanation}`;
      quizArea.querySelectorAll(".answer-option").forEach((option) => {
        const answer = Number(option.dataset.answer);
        option.querySelector("input").disabled = true;
        if (answer === item.answer) option.classList.add("correct");
        else if (answer === selectedAnswer) option.classList.add("incorrect");
      });
      quizNext.textContent = questionIndex === quizQuestions.length - 1 ? "Ver resultados →" : "Siguiente pregunta →";
      quizHint.textContent = isCorrect ? "¡Sumaste un punto!" : "Revisa la explicación y sigue adelante.";
      quizProgressBar.style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
      quizProgress.setAttribute("aria-valuenow", String(questionIndex + 1));
      return;
    }
    if (questionIndex === quizQuestions.length - 1) {
      showResult();
      return;
    }
    questionIndex += 1;
    renderQuestion();
  });

  const monthSelect = document.querySelector("#month-select");
  const kpiCards = document.querySelector("#kpi-cards");
  const budgetLegend = document.querySelector("#budget-legend");
  const chartColors = {
    blue: "#246bfd",
    violet: "#9a83f4",
    mint: "#22b88a",
    gray: "#e9eef5"
  };
  const latestMonth = data.months[data.months.length - 1];
  let categoryChart;
  let budgetChart;

  data.months.forEach((month) => {
    const option = document.createElement("option");
    option.value = month.id;
    option.textContent = month.label;
    monthSelect.append(option);
  });
  monthSelect.value = latestMonth.id;

  function getMonthExpenses(month) {
    return Object.values(month.categories).reduce((total, amount) => total + amount, 0);
  }

  function renderKpis(month) {
    const expenses = getMonthExpenses(month);
    const balance = month.income - expenses;
    const goalProgress = Math.min((month.savings / data.goal) * 100, 100);
    const cards = [
      { label: "Ingresos del mes", value: month.income, icon: "↗", style: "blue", meta: "Entradas registradas", metaStyle: "" },
      { label: "Gastos del mes", value: expenses, icon: "↘", style: "coral", meta: "Salidas registradas", metaStyle: "" },
      { label: "Balance disponible", value: balance, icon: "◎", style: "green", meta: `${percentFormatter.format((balance / month.income) * 100)}% de tus ingresos`, metaStyle: "positive" },
      { label: "Meta de ahorro", value: month.savings, icon: "✦", style: "violet", meta: `${percentFormatter.format(goalProgress)}% de la meta · ${formatCurrency(data.goal)}`, metaStyle: "positive" }
    ];
    kpiCards.innerHTML = cards.map((card) => `
      <div class="col-6 col-xl-3">
        <article class="kpi-card">
          <div class="kpi-top"><span>${card.label}</span><span class="kpi-icon kpi-${card.style}" aria-hidden="true">${card.icon}</span></div>
          <div class="kpi-value">${formatCurrency(card.value)}</div>
          <div class="kpi-meta ${card.metaStyle}">${card.meta}</div>
        </article>
      </div>
    `).join("");
  }

  function renderCategoryChart(month) {
    const context = document.querySelector("#category-chart");
    if (categoryChart) categoryChart.destroy();
    categoryChart = new Chart(context, {
      type: "bar",
      data: {
        labels: Object.keys(month.categories),
        datasets: [{
          label: "Gastos",
          data: Object.values(month.categories),
          backgroundColor: ["#246bfd", "#79a5ff", "#9a83f4", "#b2a2fa", "#c8bcff"],
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 35
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (context) => ` ${formatCurrency(context.parsed.y)}` } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8290a3", font: { family: "DM Sans", size: 10 } }, border: { display: false } },
          y: {
            beginAtZero: true,
            grid: { color: "#edf1f6" },
            ticks: { color: "#99a5b3", font: { family: "DM Sans", size: 9 }, callback: (value) => `$${Number(value) / 1000}k` },
            border: { display: false }
          }
        }
      }
    });
  }

  function renderBudgetChart(month) {
    const context = document.querySelector("#budget-chart");
    const total = month.needs + month.wants + month.savings;
    const values = [month.needs, month.wants, month.savings];
    const labels = ["Necesidades", "Deseos", "Ahorro"];
    const colors = [chartColors.blue, chartColors.violet, chartColors.mint];
    if (budgetChart) budgetChart.destroy();
    budgetChart = new Chart(context, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: colors, borderWidth: 0, hoverOffset: 5 }]
      },
      options: {
        cutout: "72%",
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (context) => ` ${context.label}: ${formatCurrency(context.parsed)} (${percentFormatter.format((context.parsed / total) * 100)}%)` } }
        }
      },
      plugins: [{
        id: "centerText",
        afterDraw(chart) {
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          ctx.save();
          ctx.textAlign = "center";
          ctx.fillStyle = "#12243a";
          ctx.font = "800 18px Manrope, sans-serif";
          ctx.fillText(`${percentFormatter.format((month.savings / month.income) * 100)}%`, centerX, centerY + 1);
          ctx.fillStyle = "#91a0af";
          ctx.font = "10px 'DM Sans', sans-serif";
          ctx.fillText("ahorrado", centerX, centerY + 17);
          ctx.restore();
        }
      }]
    });
    budgetLegend.innerHTML = labels.map((label, index) => `
      <div class="budget-legend-item"><i style="background:${colors[index]}"></i>${label}<b>${percentFormatter.format((values[index] / total) * 100)}%</b></div>
    `).join("");
  }

  function renderHistoryChart() {
    new Chart(document.querySelector("#history-chart"), {
      type: "line",
      data: {
        labels: data.months.map((month) => month.shortLabel),
        datasets: [
          {
            label: "Ingresos",
            data: data.months.map((month) => month.income),
            borderColor: chartColors.blue,
            backgroundColor: "rgba(36, 107, 253, .08)",
            fill: true,
            tension: .35,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2
          },
          {
            label: "Gastos",
            data: data.months.map(getMonthExpenses),
            borderColor: chartColors.violet,
            backgroundColor: "rgba(154, 131, 244, .06)",
            fill: true,
            tension: .35,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (context) => ` ${context.dataset.label}: ${formatCurrency(context.parsed.y)}` } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8290a3", font: { family: "DM Sans", size: 10 } }, border: { display: false } },
          y: {
            beginAtZero: false,
            suggestedMin: 10000,
            suggestedMax: 40000,
            grid: { color: "#edf1f6" },
            ticks: { color: "#99a5b3", font: { family: "DM Sans", size: 9 }, callback: (value) => `$${Number(value) / 1000}k` },
            border: { display: false }
          }
        }
      }
    });
  }

  function renderDashboard(monthId) {
    const month = data.months.find((item) => item.id === monthId);
    if (!month) {
      throw new Error(`No se encontraron datos para el periodo ${monthId}.`);
    }
    renderKpis(month);
    renderCategoryChart(month);
    renderBudgetChart(month);
  }

  monthSelect.addEventListener("change", (event) => renderDashboard(event.target.value));
  renderQuestion();
  renderDashboard(latestMonth.id);
  renderHistoryChart();
})();
