# AgroIA Demo - Image Integration Plan

## Key Visualizations Identified (7 Priority Images)

### 1. **image1.png** - Geographic Classification Map
- **Size**: 2454×2024 (254KB)
- **Type**: Geospatial heatmap with color scale (0.2-0.9)
- **Shows**: Crop distribution across region with confidence levels
- **Integration**: Demo Interativa - Reference map or comparison baseline
- **Section**: Main Demo Area

### 2. **image8.png** - AgroIA Methodology Pipeline (CRITICAL)
- **Size**: 1774×887 (1.7MB)
- **Type**: 7-step process flowchart
- **Steps**: 
  1. DADOS DE ENTRADA (Sentinel-1 SAR imagery)
  2. SEGMENTAÇÃO DE TALHÕES (Field segmentation)
  3. EXTRAÇÃO DE PATCHES (30×30m patches)
  4. APRENDIZADO POR SIMILARIDADE (MSN neural nets)
  5. CRIAÇÃO DE PSEUDO-GRUPOS (MapBiomas rulesets)
  6. AGREGAÇÃO POR TALHÃO (Majority voting)
  7. SAÍDAS FINAIS (Final classification maps)
- **Integration**: Educational card explaining the full pipeline
- **Section**: Como Funciona / Explicação

### 3. **image9.png** - Model Validation (Confusion Matrices)
- **Size**: 2100×900 (85.5KB)
- **Type**: Two 4×4 confusion matrix heatmaps
- **Shows**: MapBiomas vs INPE AND AgroIA vs INPE accuracy comparison
- **Integration**: Métricas/Validação card showing model performance
- **Section**: Validação

### 4. **image10.png** - Regional Comparison (3-way Split)
- **Size**: 1920×1080 (856KB)
- **Type**: Three side-by-side classification maps
- **Shows**: INPE (official) vs Inferência (AgroIA) vs MapBiomas for same region
- **Colors**: Orange=Soja, Pink=Milho, Green=Algodão, Blue=Outros
- **Integration**: Interactive comparison for Demo
- **Section**: Demo Interativa - Comparison mode

### 5. **image13.png** - NDVI Time Series with Anomalies
- **Size**: 4141×2942 (1018KB)
- **Type**: Dual panel time series visualization
- **Top**: NDVI envelope (min-max, quantiles) showing seasonal patterns
- **Bottom**: Cycle analysis (SOS, POS, EOS) with anomaly detection
- **Integration**: Fenologia card
- **Section**: Análise Temporal / Fenologia

### 6. **image17.png** - Phenological Cycle Detection
- **Size**: 4146×1659 (317KB)
- **Type**: Annotated NDVI time series with cycle detection
- **Shows**: 3 crop cycles detected with dates (SOS, POS, EOS) and duration
- **Example**: C1 (Soja): 111 dias, C2 (Milho): 117 dias, C3 (Soja): 111 dias
- **Integration**: Safras/Fenologia card - demonstrates automatic cycle detection
- **Section**: Análise de Safras

### 7. **image18.png** - ZARC Compliance Analysis
- **Size**: 4146×2908 (529KB)
- **Type**: Circular distribution plots + compliance metrics
- **Shows**: SOS distribution for 3 crops vs official ZARC windows
- **Metrics**: 
  - Algodão: 7.6% in ZARC, avg deviation 24.6 days
  - Milho: 3.3% in ZARC, avg deviation 44.6 days
  - Soja: 65.5% in ZARC, avg deviation 22.3 days
- **Integration**: Risco Climático / ZARC card
- **Section**: Análise de Risco Climático

---

## Small Assets (Icons/logos - images 2-7, 11-12, 14-16, 19-20)
- 256×256 px images, ~3-5KB each
- Likely: Icons, logos, or small chart elements
- Use: UI elements, navigation, sidebar indicators
- **Action**: Review individually for repurposing in demo UI

---

## Integration Roadmap

### Phase 1: Add Large Chart Cards (IMMEDIATE)
1. Create `.chart-card` HTML components in demo sections
2. Embed images 1, 8, 9, 10, 13, 17, 18
3. Add titles and brief descriptions

### Phase 2: Add Interactive Features (NEXT)
1. Image zoom/lightbox on click
2. Layer switching for image8 (show different steps?)
3. Toggle between image10 comparison sources

### Phase 3: Add Explanatory Text (NICE-TO-HAVE)
1. Captions explaining each visualization
2. Links to source data/methodology papers
3. Key metrics/findings extracted from images

---

## Current Demo Sections & Where to Add
- **Demo Interativa**: Use images 1, 10 (comparison maps)
- **Análise de Culturas**: Use images 9 (validation), 18 (ZARC)
- **Fenologia**: Use images 13, 17 (temporal analysis)
- **Como Funciona**: Use image 8 (methodology pipeline)

