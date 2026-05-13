/* ============================================================================
   CONFIGURAÇÃO GLOBAL
   ============================================================================ */

const CONFIG = {
    classMap: {
        0: "Soja",
        1: "Milho",
        2: "Algodão",
        3: "Outros"
    },
    classColors: {
        0: "#4a7c4a",    // Soja - Verde
        1: "#f0e5c3",    // Milho - Amarelo
        2: "#0d4a73",    // Algodão - Azul
        3: "#9b59b6"     // Outros - Roxo
    },
    geojsonUrl: 'data/predicoes_demo.geojson'
};

let map, geoJsonLayer, chartInstances = {};
let currentData = null;
let selectedMunicipios = new Set();

/* ============================================================================
   INICIALIZAÇÃO DO MAPA
   ============================================================================ */

function initMap() {
    map = L.map('map').setView([-12.5, -43.5], 7);

    // Basemaps
    const basemaps = {
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri'
        }),
        terrain: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri'
        }),
        light: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '© CartoDB'
        }),
        dark: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
            attribution: '© CartoDB'
        })
    };

    basemaps.osm.addTo(map);

    // Controle de basemaps
    document.getElementById('basemapSelect').addEventListener('change', (e) => {
        Object.values(basemaps).forEach(bm => map.removeLayer(bm));
        basemaps[e.target.value].addTo(map);
    });

    // Carregar dados GeoJSON
    loadGeoJson();
}

/* ============================================================================
   CARREGAMENTO DE DADOS
   ============================================================================ */

function loadGeoJson() {
    fetch(CONFIG.geojsonUrl)
        .then(res => res.json())
        .then(data => {
            currentData = data;
            createGeoJsonLayer();
            updateCharts();
            updateLegend();
            updateStats();
        })
        .catch(err => console.error('Erro ao carregar GeoJSON:', err));
}

function createGeoJsonLayer() {
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }

    const currentLayer = document.getElementById('layerSelect').value;

    geoJsonLayer = L.geoJSON(currentData, {
        style: (feature) => getFeatureStyle(feature, currentLayer),
        onEachFeature: (feature, layer) => {
            layer.on('click', () => showPopup(feature, layer));
        }
    }).addTo(map);
}

function getFeatureStyle(feature, layer) {
    const props = feature.properties;
    const value = props[layer];
    const classNum = Math.floor(value);
    const color = CONFIG.classColors[classNum] || CONFIG.classColors[3];

    const risk = calculateRisk(props);

    let weight = 0.5;
    let fillOpacity = 0.6;
    let borderColor = '#555';

    if (risk === 'alto') {
        weight = 2;
        fillOpacity = 0.8;
        borderColor = '#e74c3c';
    } else if (risk === 'medio') {
        weight = 1;
        fillOpacity = 0.7;
        borderColor = '#f39c12';
    } else {
        weight = 0.5;
        fillOpacity = 0.6;
        borderColor = '#27ae60';
    }

    return {
        fillColor: color,
        weight: weight,
        opacity: 0.9,
        color: borderColor,
        fillOpacity: fillOpacity,
        dashArray: '3'
    };
}

/* ============================================================================
   POPUP DOS TALHÕES
   ============================================================================ */

function showPopup(feature, layer) {
    const props = feature.properties;
    const currentLayer = document.getElementById('layerSelect').value;

    const risk = calculateRisk(props);

    let html = `
        <div class="popup-content">
            <h3>${props.municipio || 'N/A'}</h3>
            <div class="popup-section">
                <span class="popup-subtitle">Classificações</span>
                <table class="popup-table">
                    <tr>
                        <td>AgroIA S1:</td>
                        <td><strong>${getClassName(props.inf_safra1)}</strong></td>
                    </tr>
                    <tr>
                        <td>AgroIA S2:</td>
                        <td><strong>${getClassName(props.inf_safra2)}</strong></td>
                    </tr>
                    <tr>
                        <td>MapBiomas S1:</td>
                        <td><strong>${getClassName(props.mb_safra1)}</strong></td>
                    </tr>
                    <tr>
                        <td>MapBiomas S2:</td>
                        <td><strong>${getClassName(props.mb_safra2)}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="popup-section" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
                <span class="popup-subtitle">Avaliação de Risco (Demonstrativa)</span>
                <div style="margin-top: 8px;">
                    <span class="risk-badge risk-${risk}">
                        ${this._getRiskIcon(risk)} ${risk.toUpperCase()}
                    </span>
                </div>
                <p style="font-size: 11px; color: #999; margin: 8px 0 0 0;">
                    Baseado em concordância entre AgroIA e MapBiomas
                </p>
            </div>

            <p class="popup-note">⚠️ Análise demonstrativa - não representa avaliação oficial de risco</p>
        </div>
    `;

    layer.bindPopup(html).openPopup();
}

function _getRiskIcon(risk) {
    if (risk === 'alto') return '🔴';
    if (risk === 'medio') return '🟡';
    return '🟢';
}

Object.assign(window, { _getRiskIcon });

function getClassName(value) {
    const classNum = Math.floor(value);
    return CONFIG.classMap[classNum] || 'Desconhecido';
}

function calculateRisk(props) {
    // Lógica demonstrativa simples de risco
    const agro1 = Math.floor(props.inf_safra1);
    const agro2 = Math.floor(props.inf_safra2);
    const map1 = Math.floor(props.mb_safra1);
    const map2 = Math.floor(props.mb_safra2);

    const agree1 = agro1 === map1;
    const agree2 = agro2 === map2;

    if (agree1 && agree2) return 'baixo';
    if ((agree1 && !agree2) || (!agree1 && agree2)) return 'medio';
    return 'alto';
}

/* ============================================================================
   FILTROS E BUSCA
   ============================================================================ */

document.getElementById('layerSelect').addEventListener('change', () => {
    const layerSelect = document.getElementById('layerSelect');
    const originalLabel = layerSelect.parentElement.querySelector('.filter-label');

    createGeoJsonLayer();
    updateCharts();
    updateLegend();
    updateLayerReading();

    // Visual feedback
    layerSelect.style.borderColor = '#4a7c4a';
    setTimeout(() => {
        layerSelect.style.borderColor = '';
    }, 600);
});

document.getElementById('municipioSearch').addEventListener('keyup', (e) => {
    const search = e.target.value.toLowerCase();
    filterByMunicipio(search);
});

function filterByMunicipio(search) {
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }

    let filtered = currentData;

    if (search) {
        filtered = {
            type: 'FeatureCollection',
            features: currentData.features.filter(f =>
                f.properties.municipio.toLowerCase().includes(search)
            )
        };
    }

    const currentLayer = document.getElementById('layerSelect').value;
    geoJsonLayer = L.geoJSON(filtered, {
        style: (feature) => getFeatureStyle(feature, currentLayer),
        onEachFeature: (feature, layer) => {
            layer.on('click', () => showPopup(feature, layer));
        }
    }).addTo(map);

    updateCharts(filtered);
    updateStats(filtered);
}

document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    document.getElementById('municipioSearch').value = '';
    createGeoJsonLayer();
    updateCharts();
    updateLegend();
    updateStats();
});

document.getElementById('fitBoundsBtn').addEventListener('click', () => {
    if (geoJsonLayer) {
        map.fitBounds(geoJsonLayer.getBounds());
    }
});

/* ============================================================================
   GRÁFICOS
   ============================================================================ */

function updateCharts(data = null) {
    data = data || currentData;
    const currentLayer = document.getElementById('layerSelect').value;

    // Distribuição de Classes
    updateDistributionChart(data, currentLayer);

    // Comparação AgroIA vs MapBiomas
    updateComparisonChart(data);

    // Concordância
    updateConcordanceChart(data);
}

function updateDistributionChart(data, layer) {
    const counts = {};
    for (let i = 0; i < 4; i++) {
        counts[i] = 0;
    }

    data.features.forEach(f => {
        const value = Math.floor(f.properties[layer]);
        counts[value] = (counts[value] || 0) + 1;
    });

    const ctx = document.getElementById('distributionChart').getContext('2d');

    if (chartInstances.distribution) {
        chartInstances.distribution.destroy();
    }

    chartInstances.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Soja', 'Milho', 'Algodão', 'Outros'],
            datasets: [{
                data: [counts[0], counts[1], counts[2], counts[3]],
                backgroundColor: [
                    CONFIG.classColors[0],
                    CONFIG.classColors[1],
                    CONFIG.classColors[2],
                    CONFIG.classColors[3]
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { size: 12 } }
                }
            }
        }
    });
}

function updateComparisonChart(data) {
    const agro1 = {}, agro2 = {}, map1 = {}, map2 = {};

    for (let i = 0; i < 4; i++) {
        agro1[i] = agro2[i] = map1[i] = map2[i] = 0;
    }

    data.features.forEach(f => {
        const p = f.properties;
        agro1[Math.floor(p.inf_safra1)]++;
        agro2[Math.floor(p.inf_safra2)]++;
        map1[Math.floor(p.mb_safra1)]++;
        map2[Math.floor(p.mb_safra2)]++;
    });

    const ctx = document.getElementById('comparisonChart').getContext('2d');

    if (chartInstances.comparison) {
        chartInstances.comparison.destroy();
    }

    chartInstances.comparison = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Soja', 'Milho', 'Algodão', 'Outros'],
            datasets: [
                {
                    label: 'AgroIA S1',
                    data: [agro1[0], agro1[1], agro1[2], agro1[3]],
                    backgroundColor: '#4a7c4a',
                    borderRadius: 4
                },
                {
                    label: 'MapBiomas S1',
                    data: [map1[0], map1[1], map1[2], map1[3]],
                    backgroundColor: '#0d4a73',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { labels: { font: { size: 11 } } }
            },
            scales: {
                x: { stacked: false }
            }
        }
    });
}

function updateConcordanceChart(data) {
    let agree = 0, disagree = 0;

    data.features.forEach(f => {
        const p = f.properties;
        const a1 = Math.floor(p.inf_safra1);
        const m1 = Math.floor(p.mb_safra1);
        const a2 = Math.floor(p.inf_safra2);
        const m2 = Math.floor(p.mb_safra2);

        if ((a1 === m1) && (a2 === m2)) {
            agree++;
        } else {
            disagree++;
        }
    });

    const total = agree + disagree;
    const agreePercent = ((agree / total) * 100).toFixed(1);
    const disagreePercent = ((disagree / total) * 100).toFixed(1);

    const ctx = document.getElementById('concordanceChart').getContext('2d');

    if (chartInstances.concordance) {
        chartInstances.concordance.destroy();
    }

    chartInstances.concordance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [`Concordância (${agreePercent}%)`, `Discordância (${disagreePercent}%)`],
            datasets: [{
                data: [agree, disagree],
                backgroundColor: ['#27ae60', '#e74c3c'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom', labels: { font: { size: 11 } } }
            }
        }
    });
}

/* ============================================================================
   LEGENDA
   ============================================================================ */

function updateLegend() {
    const legendContent = document.getElementById('legendContent');
    legendContent.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <div class="legend-color" style="background-color: ${CONFIG.classColors[i]};"></div>
            <span>${CONFIG.classMap[i]}</span>
        `;
        legendContent.appendChild(item);
    }
}

/* ============================================================================
   ESTATÍSTICAS
   ============================================================================ */

function updateStats(data = null) {
    data = data || currentData;
    const statsContent = document.getElementById('statsContent');

    const totalFeatures = data.features.length;
    const municipios = new Set(data.features.map(f => f.properties.municipio)).size;

    statsContent.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Total de Talhões:</span>
            <strong>${totalFeatures.toLocaleString('pt-BR')}</strong>
        </div>
        <div class="stat-item">
            <span class="stat-label">Municípios:</span>
            <strong>${municipios}</strong>
        </div>
    `;
}

/* ============================================================================
   LEITURA DA CAMADA ATUAL
   ============================================================================ */

const layerReadings = {
    inf_safra1: "Classificação estimada pelo AgroIA para a primeira safra, permitindo avaliar cultura predominante por talhão.",
    inf_safra2: "Classificação estimada pelo AgroIA para a segunda safra, útil para identificar sucessão de culturas e dinâmica produtiva.",
    mb_safra1: "Referência pública usada para comparação espacial e validação cruzada.",
    mb_safra2: "Camada pública comparativa para observar divergências e concordâncias com a inferência AgroIA."
};

function updateLayerReading() {
    const currentLayer = document.getElementById('layerSelect').value;
    const readingText = document.getElementById('layerReading');
    readingText.textContent = layerReadings[currentLayer] || 'Camada selecionada.';
}

/* ============================================================================
   BACK TO TOP
   ============================================================================ */

window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTopBtn');
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

/* ============================================================================
   INICIALIZAÇÃO
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    updateLayerReading();
});

/* ============================================================================
   ESTILO PARA POPUP
   ============================================================================ */

const style = document.createElement('style');
style.textContent = `
    .popup-content {
        min-width: 320px;
        font-size: 13px;
    }

    .popup-content h3 {
        margin: 0 0 15px 0;
        color: #2d5a2d;
        font-size: 16px;
        font-weight: 600;
    }

    .popup-section {
        margin-bottom: 0;
    }

    .popup-subtitle {
        display: block;
        font-weight: 600;
        color: #2d5a2d;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
    }

    .popup-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 0;
    }

    .popup-table td {
        padding: 6px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 12px;
    }

    .popup-table td:first-child {
        font-weight: 500;
        color: #555;
        width: 45%;
    }

    .popup-table td:last-child {
        text-align: right;
    }

    .risk-badge {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
    }

    .risk-badge.risk-baixo {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .risk-badge.risk-medio {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeeba;
    }

    .risk-badge.risk-alto {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .risk-baixo { color: #27ae60; font-weight: 600; }
    .risk-medio { color: #f39c12; font-weight: 600; }
    .risk-alto { color: #e74c3c; font-weight: 600; }

    .popup-note {
        font-size: 11px;
        color: #e74c3c;
        margin: 12px 0 0 0;
        font-weight: 500;
    }
`;
document.head.appendChild(style);
