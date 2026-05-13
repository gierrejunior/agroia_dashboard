# AgroIA - Agrointeligência Territorial

Demonstração interativa em HTML/CSS/JavaScript de uma plataforma de monitoramento agrícola por satélite. Pronta para publicar em GitHub Pages.

## 📋 Sobre o Projeto

AgroIA é uma solução de inteligência territorial que integra múltiplas fontes de dados de satélite (Sentinel-1/2, MapBiomas, PRODES, CAR, SIGEF, ZARC, IBGE) para fornecer:

- **Monitoramento contínuo** de lavouras em tempo quase real
- **Análise de risco** para crédito e seguro rural
- **Classificação de culturas** por talhão e safra
- **Alertas automáticos** de anomalias e desvios

## 🎯 Objetivo da Demonstração

Esta é uma apresentação visual interativa (não um relatório acadêmico) que demonstra como o AgroIA funciona como produto para instituições financeiras e seguradoras. O foco é na **usabilidade**, **interatividade** e na **integração entre mapa, gráficos e indicadores**.

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos e design
├── js/
│   └── app.js             # Lógica interativa (Leaflet, Charts.js)
├── data/
│   ├── predicoes_demo_light.geojson  # Dados completos simplificados para GitHub Pages
│   └── predicoes_demo.geojson        # Amostra/fallback dos talhões (Bahia)
├── assets/
│   ├── img/               # Imagens dos gráficos
│   └── charts/            # Gráficos e ilustrações
└── README.md              # Este arquivo
```

## 🚀 Como Usar Localmente

### Pré-requisitos

- Python 3 (para servir arquivos localmente)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/agroIA-demo.git
cd agroIA-demo
```

### 2. Rodar Servidor Local

Use Python para servir os arquivos:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Ou qualquer outro servidor HTTP (Node, Ruby, PHP, etc).

### 3. Acessar no Navegador

Abra em seu navegador:
```
http://localhost:8000
```

## 🌐 Publicar no GitHub Pages

### 1. Criar Repositório GitHub

```bash
git init
git add .
git commit -m "Initial commit: AgroIA demo"
git remote add origin https://github.com/seu-usuario/agroIA-demo.git
git branch -M main
git push -u origin main
```

### 2. Habilitar GitHub Pages

No repositório do GitHub:
1. Vá para **Settings**
2. Vá para **Pages**
3. Em "Source", selecione **main branch**
4. Clique **Save**

### 3. Acessar a Demonstração

Sua página estará disponível em:
```
https://seu-usuario.github.io/agroIA-demo
```

## 📊 Dados Geoespaciais

### Arquivo de Entrada: GPKG

O arquivo `predicoes_consolidadas_BA.gpkg` contém:
- **9.976 talhões** da Bahia
- **Geometrias em WGS84** (EPSG:4326)
- **Campos**: `cod_mun`, `municipio`, `inf_safra1`, `inf_safra2`, `mb_safra1`, `mb_safra2`

### Conversão GPKG → GeoJSON

Se precisar reconverter os dados originais:

```bash
ogr2ogr -f GeoJSON data/predicoes_completo.geojson predicoes_consolidadas_BA.gpkg
```

**Nota**: O arquivo completo (~173 MB) é pesado para GitHub Pages. A versão atual (`predicoes_demo.geojson`) contém uma amostra de ~5.000 talhões. Para usar dados completos, considere:

- **Hosting em servidor separado** (S3, CDN, etc)
- **Dividir dados por município** em múltiplos GeoJSON
- **Criar índice espacial** com serviço de tiles (Mapbox, GeoServer)

### Campos do GeoJSON Utilizados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `cod_mun` | String | Código IBGE do município |
| `municipio` | String | Nome do município |
| `inf_safra1` | Number | Inferência AgroIA - Safra 1 (0-3) |
| `inf_safra2` | Number | Inferência AgroIA - Safra 2 (0-3) |
| `mb_safra1` | Number | MapBiomas - Safra 1 (0-3) |
| `mb_safra2` | Number | MapBiomas - Safra 2 (0-3) |

**Classes de Culturas**:
- `0` = Soja
- `1` = Milho
- `2` = Algodão
- `3` = Outros

## 🎨 Personalização

### Alterar Cores das Classes

Edite `js/app.js`, seção `CONFIG`:

```javascript
const CONFIG = {
    classColors: {
        0: "#4a7c4a",    // Soja - Verde
        1: "#f0e5c3",    // Milho - Amarelo
        2: "#0d4a73",    // Algodão - Azul
        3: "#9b59b6"     // Outros - Roxo
    }
};
```

### Alterar Nomes de Classes

```javascript
const CONFIG = {
    classMap: {
        0: "Soja",
        1: "Milho",
        2: "Algodão",
        3: "Outros"
    }
};
```

### Mudar Paleta de Cores (Design)

Edite `css/style.css`, seção `--variáveis`:

```css
:root {
    --primary: #2d5a2d;           /* Verde escuro */
    --primary-light: #4a7c4a;     /* Verde claro */
    --secondary: #0d4a73;         /* Azul petróleo */
    --accent: #c8a021;            /* Dourado */
    /* ... mais cores ... */
}
```

### Adicionar Imagens dos Gráficos

1. Coloque as imagens em `assets/img/`
2. Referencie no HTML ou crie sections extras

Exemplo:

```html
<section class="section bg-light">
    <div class="container">
        <h2>Exemplo de Série Temporal</h2>
        <img src="assets/img/ndvi_temporal.png" alt="NDVI Temporal" style="max-width: 100%; border-radius: 8px;">
        <button class="btn btn-primary">Ver Exemplo no Mapa</button>
    </div>
</section>
```

## 📈 Seções da Demonstração

### 1. Hero
- Título e subtítulo da solução
- Botão para explorar demonstração

### 2. Problema Operacional
- 4 cards descrevendo desafios de crédito/seguro rural

### 3. Solução AgroIA
- Grid mostrando fontes de dados integradas
- Cards com benefícios principais

### 4. Demonstração Interativa (Core)
- **Painel Esquerdo**: Filtros, busca, legenda, resumo
- **Mapa Central**: Leaflet com talhões, basemaps, popups
- **Painel Direito**: Gráficos Chart.js atualizados dinamicamente

**Funcionalidades**:
- Trocar camada temática (AgroIA S1/S2, MapBiomas S1/S2)
- Trocar basemap (OSM, Satélite, Terreno, Claro, Escuro)
- Buscar por município
- Clicar em talhão para ver detalhes
- Gráficos se atualizam conforme seleção

### 5. Métricas de Acurácia
- Comparação AgroIA vs MapBiomas
- Destaques de importância de acurácia/classe balanceada

### 6. Fenologia e ZARC
- Timeline dos ciclos vegetativos (SOS, POS, EOS, ZARC)
- Estatísticas: 439K ciclos, 691 municípios, 2.9 ciclos/talhão

### 7. Monitoramento e Alertas
- 3 cards de risco (Baixo, Médio, Alto)
- Exemplos de indicadores e situações

### 8. Footer
- Links e créditos

## 🔄 Fluxo de Interação

```
Usuário entra no site
    ↓
Vê apresentação visual (Hero → Problema → Solução)
    ↓
Navega para seção Demo
    ↓
Interage com mapa (trocar basemap, camada, buscar)
    ↓
Clica em talhão → Popup com detalhes
    ↓
Gráficos atualizam automaticamente
    ↓
Vê métricas, fenologia, alertas
```

## ⚙️ Configuração Avançada

### Adicionar Mais Dados

Edite `js/app.js`:

```javascript
const CONFIG = {
    geojsonUrl: 'data/seus-dados.geojson'
};
```

### Adicionar Basemap Customizado

Em `initMap()`:

```javascript
const basemaps = {
    custom: L.tileLayer('https://seu-servidor.com/{z}/{x}/{y}.png', {
        attribution: 'Seu Crédito'
    })
};
```

### Integrar com API

Substitua `fetch(CONFIG.geojsonUrl)` por chamada a sua API:

```javascript
fetch('https://sua-api.com/talhoes')
    .then(res => res.json())
    .then(data => {
        currentData = data;
        createGeoJsonLayer();
        updateCharts();
    });
```

## 🐛 Troubleshooting

### Mapa não carrega
- Verifique se `data/predicoes_demo_light.geojson` ou `data/predicoes_demo.geojson` existe
- Abra Console (F12) e procure erros

### Gráficos não aparecem
- Verifique CDN Chart.js
- Console pode mostrar erros de rendering

### Dados muito pesados
- Use a versão demo (5K features)
- Para dados completos, divida por município ou use servidor

### GitHub Pages mostra 404
- Certifique-se de que Settings > Pages está ativado
- Branch deve ser `main` ou `gh-pages`
- Aguarde alguns minutos após ativar

## 📚 Bibliotecas Utilizadas

| Biblioteca | Versão | Propósito |
|-----------|--------|----------|
| **Leaflet** | 1.9.4 | Mapas interativos |
| **Leaflet.MarkerCluster** | 1.5.1 | Agrupamento de markers |
| **Chart.js** | 3.9.1 | Gráficos |
| **Inter Font** | - | Tipografia |

Todas carregadas via CDN — sem dependências locais.

## 🎓 Métricas Demonstrativas

Os indicadores de risco exibidos são **apenas para demonstração visual**. Não representam avaliação oficial de risco.

Lógica demonstrativa:
```javascript
- Risco BAIXO: AgroIA e MapBiomas concordam
- Risco MÉDIO: Discordância em uma safra
- Risco ALTO: Discordância em ambas safras
```

Para um sistema real, integrate modelos de risco reais.

## 📝 Licença

MIT - Use livremente

## 👤 Autor

AgroIA — Agrointeligência Territorial  
2026

---

## 🤝 Contribuindo

Para melhorias:
1. Fork o repositório
2. Crie branch para sua feature (`git checkout -b feature/melhoria`)
3. Commit suas mudanças (`git commit -m 'Adicionar melhoria'`)
4. Push para o branch (`git push origin feature/melhoria`)
5. Abra Pull Request

## 📧 Suporte

Para dúvidas sobre a plataforma AgroIA real, visite: https://agroIA.com

Para dúvidas sobre esta demonstração, abra uma issue no repositório GitHub.

---

**Versão**: 1.0  
**Data**: Maio 2026  
**Status**: Pronto para produção (GitHub Pages)
