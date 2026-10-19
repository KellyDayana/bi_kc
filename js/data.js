/* Mock data for the dashboard. Replace this object with a fetch/API response
   when connecting a real database or financial data provider. */
window.FinanceData = {
  currency: "MXN",
  goal: 6000,
  months: [
    {
      id: "2026-05",
      label: "Mayo 2026",
      shortLabel: "May",
      income: 32500,
      categories: { Vivienda: 9000, Alimentación: 4900, Transporte: 2100, Servicios: 1550, Ocio: 2450 },
      needs: 17550,
      wants: 2450,
      savings: 12500
    },
    {
      id: "2026-06",
      label: "Junio 2026",
      shortLabel: "Jun",
      income: 33800,
      categories: { Vivienda: 9000, Alimentación: 5200, Transporte: 1980, Servicios: 1600, Ocio: 2900 },
      needs: 17780,
      wants: 2900,
      savings: 13120
    },
    {
      id: "2026-07",
      label: "Julio 2026",
      shortLabel: "Jul",
      income: 32100,
      categories: { Vivienda: 9000, Alimentación: 4700, Transporte: 2300, Servicios: 1580, Ocio: 2200 },
      needs: 17580,
      wants: 2200,
      savings: 12320
    },
    {
      id: "2026-08",
      label: "Agosto 2026",
      shortLabel: "Ago",
      income: 34600,
      categories: { Vivienda: 9000, Alimentación: 5350, Transporte: 2150, Servicios: 1660, Ocio: 3100 },
      needs: 18160,
      wants: 3100,
      savings: 13340
    },
    {
      id: "2026-09",
      label: "Septiembre 2026",
      shortLabel: "Sep",
      income: 34100,
      categories: { Vivienda: 9000, Alimentación: 5100, Transporte: 2050, Servicios: 1620, Ocio: 2700 },
      needs: 17770,
      wants: 2700,
      savings: 13630
    },
    {
      id: "2026-10",
      label: "Octubre 2026",
      shortLabel: "Oct",
      income: 35200,
      categories: { Vivienda: 9000, Alimentación: 5350, Transporte: 2200, Servicios: 1680, Ocio: 3150 },
      needs: 18230,
      wants: 3150,
      savings: 13820
    }
  ]
};
