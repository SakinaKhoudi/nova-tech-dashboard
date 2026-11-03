const COLORS = ['#c9a3f5', '#f6b0cf', '#fbb4a5', '#b9c4f7', '#fdd9a0'];
const fmtEUR = n => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const fmtInt = n => Math.round(n).toLocaleString('fr-FR') + ' €';
const sum = (arr, fn) => arr.reduce((acc, x) => acc + fn(x), 0);

let allSales = [];
let charts = {};

// Chargement des données (nécessite un serveur local, ex. Live Server)
fetch('sales.json')
  .then(r => r.json())
  .then(data => {
    allSales = data;
    document.getElementById('search-input').addEventListener('input', filterAndRender);
    document.getElementById('category-filter').addEventListener('change', filterAndRender);
    document.getElementById('sort-select').addEventListener('change', filterAndRender);
    document.getElementById('reset-btn').addEventListener('click', resetFilters);
    filterAndRender();
  })
  .catch(err => {
    console.error(err);
    document.getElementById('no-results-message').textContent =
      "Impossible de charger sales.json : ouvrez le site avec un serveur local (extension Live Server).";
    document.getElementById('no-results-message').classList.remove('hidden');
  });

// Missions 20, 21, 22 : recherche + catégorie + tri combinés
function filterAndRender() {
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  const cat = document.getElementById('category-filter').value;
  const sort = document.getElementById('sort-select').value;

  const result = allSales.filter(s =>
    s.product.toLowerCase().includes(term) && (cat === 'Toutes' || s.category === cat)
  );
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);

  renderTable(result);
  renderKPIs(result);
  renderCharts(result);
}

// Mission 24
function resetFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('category-filter').value = 'Toutes';
  document.getElementById('sort-select').value = 'initial';
  filterAndRender();
}

function renderTable(sales) {
  const body = document.getElementById('sales-table-body');
  // Mission 23 : message si aucun résultat
  document.getElementById('no-results-message').textContent = 'Aucune vente ne correspond à votre recherche.';
  document.getElementById('no-results-message').classList.toggle('hidden', sales.length > 0);
  body.innerHTML = sales.map(s => `
    <tr>
      <td>${new Date(s.date).toLocaleDateString('fr-FR')}</td>
      <td>${s.product}</td>
      <td><span class="tag">${s.category}</span></td>
      <td>${fmtEUR(s.price)}</td>
      <td>${s.quantity}</td>
    </tr>`).join('');
}

// Missions 11 à 15
function renderKPIs(sales) {
  const count = sales.length;
  document.getElementById('kpi-sales-count').textContent = count;
  document.getElementById('kpi-total-quantity').textContent = sum(sales, s => s.quantity);
  document.getElementById('kpi-total-revenue').textContent = fmtEUR(sum(sales, s => s.price * s.quantity));
  // moyenne des prix unitaires des lignes (et non CA / nombre de ventes)
  document.getElementById('kpi-avg-price').textContent = fmtEUR(count ? sum(sales, s => s.price) / count : 0);
}

function drawChart(id, config) {
  if (charts[id]) charts[id].destroy();
  charts[id] = new Chart(document.getElementById(id), config);
}

// Missions 17, 18, 19
function renderCharts(sales) {
  Chart.defaults.font.family = "'Inter', sans-serif";
  const cats = [...new Set(sales.map(s => s.category))];
  const revenue = cats.map(c => sum(sales.filter(s => s.category === c), s => s.price * s.quantity));
  const qty = cats.map(c => sum(sales.filter(s => s.category === c), s => s.quantity));

  // CA par catégorie (barres)
  drawChart('category-chart', {
    type: 'bar',
    data: { labels: cats, datasets: [{ data: revenue, backgroundColor: COLORS, borderRadius: 10, maxBarThickness: 64 }] },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => fmtEUR(c.parsed.y) } } },
      scales: { y: { beginAtZero: true, grid: { color: '#f1eef7' }, border: { display: false } }, x: { grid: { display: false } } }
    }
  });

  // Quantité par catégorie (anneau) + légende
  drawChart('quantity-chart', {
    type: 'doughnut',
    data: { labels: cats, datasets: [{ data: qty, backgroundColor: COLORS, borderWidth: 3, borderColor: '#fff' }] },
    options: { maintainAspectRatio: false, cutout: '68%', plugins: { legend: { display: false } } }
  });
  const totalQty = sum(qty, q => q);
  document.getElementById('quantity-legend').innerHTML = cats.length
    ? cats.map((c, i) => `<li><span class="dot" style="background:${COLORS[i % COLORS.length]}"></span>${c}
        <span class="val">${qty[i]} · ${Math.round(qty[i] / totalQty * 100)} %</span></li>`).join('')
    : '<li class="empty">Aucune donnée</li>';

  // CA par mois (courbe)
  const months = [...new Set(sales.map(s => s.date.slice(0, 7)))].sort();
  const monthRev = months.map(m => sum(sales.filter(s => s.date.startsWith(m)), s => s.price * s.quantity));
  const labels = months.map(m => new Date(m + '-01').toLocaleDateString('fr-FR', { month: 'short' }));
  document.getElementById('month-total').textContent = fmtInt(sum(monthRev, v => v));
  drawChart('month-chart', {
    type: 'line',
    data: { labels, datasets: [{ data: monthRev, borderColor: '#fff', backgroundColor: 'rgba(255,255,255,.25)',
      fill: true, tension: .4, pointBackgroundColor: '#fff', pointRadius: 4 }] },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => fmtEUR(c.parsed.y) } } },
      scales: {
        x: { ticks: { color: '#fff' }, grid: { display: false }, border: { display: false } },
        y: { beginAtZero: true, ticks: { color: 'rgba(255,255,255,.85)' }, grid: { color: 'rgba(255,255,255,.2)' }, border: { display: false } }
      }
    }
  });

  // Top produits
  const top = Object.entries(sales.reduce((o, s) => (o[s.product] = (o[s.product] || 0) + s.price * s.quantity, o), {}))
    .sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = top.length ? top[0][1] : 1;
  document.getElementById('top-products').innerHTML = top.length
    ? top.map(([name, v]) => `<li><div class="row"><span>${name}</span><span>${fmtInt(v)}</span></div>
        <div class="bar"><i style="width:${v / max * 100}%"></i></div></li>`).join('')
    : '<li class="empty">Aucune donnée</li>';
}
