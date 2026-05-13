# 🚀 Quick Start - AgroIA Demo

## ⚡ 3 Passos para Rodar Localmente

### 1️⃣ Inicie servidor HTTP
```bash
python -m http.server 8000
```

### 2️⃣ Abra no navegador
```
http://localhost:8000
```

### 3️⃣ Explore! 🗺️
Clique em "Explorar Demonstração" e navegue pela demo interativa.

---

## 📤 Publicar no GitHub Pages

### 1️⃣ Crie repositório no GitHub
```bash
git init
git add .
git commit -m "Initial: AgroIA interactive demo"
git remote add origin https://github.com/SEU-USUARIO/agroIA-demo.git
git branch -M main
git push -u origin main
```

### 2️⃣ Ative Pages no GitHub
Settings → Pages → Source: **main** → Save

### 3️⃣ Acesse sua demo
```
https://seu-usuario.github.io/agroIA-demo
```

---

## 📁 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `index.html` | Página principal (estrutura) |
| `css/style.css` | Design e responsividade |
| `js/app.js` | Lógica de mapa, gráficos, filtros |
| `data/predicoes_demo.geojson` | Dados dos talhões (5K features) |
| `README.md` | Documentação completa |

---

## 🎮 Interatividade Principal

✓ **Mapa** - Leaflet com 5K talhões da Bahia  
✓ **Filtros** - Por camada temática, basemap, município  
✓ **Popups** - Clique em talhão para detalhes  
✓ **Gráficos** - Chart.js atualizados dinamicamente  
✓ **Legenda** - Cores por classe de cultura  
✓ **Responsivo** - Mobile, tablet, desktop  

---

## 🎨 Personalizações Rápidas

### Mudar cores das culturas
Edite `js/app.js`, linhas 10-16:
```javascript
classColors: {
    0: "#verde",    // Soja
    1: "#amarelo",  // Milho
    ...
}
```

### Mudar cores do design
Edite `css/style.css`, linhas 1-30 (`:root`)

### Adicionar imagens
Coloque em `assets/img/` e referencie no HTML

---

## ⚠️ Dados Geoespaciais

**Arquivo atual**: `predicoes_demo.geojson` (78 MB, 5K features)

Para usar dados **completos** (9.976 features, 173 MB):

```bash
# Converter GPKG original
ogr2ogr -f GeoJSON data/predicoes_completo.geojson predicoes_consolidadas_BA.gpkg

# Depois altere em js/app.js
CONFIG.geojsonUrl = 'data/predicoes_completo.geojson'
```

⚠️ Arquivo grande pode ser lento em GitHub Pages. Para dados completos, considere:
- Dividir por município
- Usar servidor separado (S3, CDN)
- Implementar lazy loading

---

## 🐛 Checklist de Funcionalidade

- [ ] Mapa carrega e exibe talhões
- [ ] Trocar basemap funciona
- [ ] Trocar camada temática funciona
- [ ] Buscar município funciona
- [ ] Clique em talhão abre popup
- [ ] Gráficos atualizam ao filtrar
- [ ] Navegação por menu funciona
- [ ] Responsivo em mobile
- [ ] Sem erros no Console (F12)

---

## 📊 Seções da Demo

1. **Hero** - Título e CTA
2. **Problema** - 4 cards com desafios
3. **Solução** - Grid de datasources + benefícios
4. **Demo Interativa** ⭐ - Mapa + gráficos (seção principal)
5. **Métricas** - Acurácia AgroIA vs MapBiomas
6. **Fenologia** - Timeline de ciclos vegetativos
7. **Monitoramento** - Cards de risco

---

## 💾 Estrutura de Pastas

```
agroIA-demo/
├── index.html              ← Abra isto no navegador
├── css/style.css           ← Design (não edite se não souber)
├── js/app.js               ← Lógica (aqui customiza cores/dados)
├── data/predicoes_demo.geojson   ← Dados do mapa
├── assets/
│   ├── img/                ← Suas imagens
│   └── charts/             ← Seus gráficos
├── .github/workflows/      ← Deploy automático
├── README.md               ← Documentação completa
└── QUICKSTART.md           ← Este arquivo
```

---

## 🌐 URLs Úteis

| Recurso | Link |
|---------|------|
| Leaflet Docs | https://leafletjs.com |
| Chart.js Docs | https://www.chartjs.org |
| GitHub Pages | https://pages.github.com |
| Ogr2ogr Manual | https://gdal.org/programs/ogr2ogr.html |

---

## ❓ Problemas Comuns

**Mapa não carrega?**
→ Verificar Console (F12) e confirmar GeoJSON existe

**GitHub Pages mostra 404?**
→ Confirmar Settings > Pages ativado e branch = main

**Dados muito pesados?**
→ Usar versão demo (5K features) ou dividir por município

**Gráficos não aparecem?**
→ Verificar CDN Chart.js ou erros no Console

---

## 🎉 Pronto!

Sua demonstração AgroIA está completa e pronta para publicar. 

**Próximos passos:**
1. Adicione imagens em `assets/img/`
2. Customize cores se desejar
3. Deploy no GitHub Pages
4. Compartilhe o link! 📊

---

*Versão: 1.0 | Mai 2026 | AgroIA Agrointeligência Territorial*
