# 🟣 Fluxo Operacional Completo — Ponta a Ponta

> **A engrenagem real.** Como a Achamos opera do clique no anúncio até a escritura — quem faz o quê, em quanto tempo, com qual ferramenta.
> v1.0 · 2026-05-23 · Achamos Imóveis

![Achamos Imóveis](./assets/logo_achamos.svg)

---

## 🎯 O FLUXO EM UMA TELA

```
[LANDING]                    [CADASTRO COMPRADOR]
  Comprador                    Briefing 8 perguntas
  vê anúncio       ──►         KYC upload doc
  Insta/Google                 Pagamento R$ 2.500
                               Assina Mandato
                               ▼
                          [VALIDAÇÃO KYC]
                          Corretor valida em 24h
                               ▼
                          [PUBLICAÇÃO FPA]
                          Ficha vai ao ar nas redes
                          Anúncios pagos disparados
                               ▼
[VENDEDOR VÊ POST]          [VENDEDOR ENTRA PORTAL]
  Insta orgânico              Vê Painel Radar
  Insta pago        ──►       Vê fichas anonimizadas
  Indicação                   Clica "Candidatar"
                              Cadastra imóvel
                              Assina Termo Apresentação
                              ▼
                         [CURADORIA]
                         Match Score automático
                         Corretor revisa top 5-7
                         Descarta inadequados
                              ▼
                         [TOP 3 ENTREGUE]
                         Comprador recebe carrossel
                         Comprador escolhe 1-2 finalistas
                              ▼
                         [VISITA ACOMPANHADA]
                         Agenda + Corretor Achamos vai
                         Vistoria + perguntas
                              ▼
                         [OFERTA/CONTRAOFERTA]
                         Via portal Achamos
                         Negociação intermediada
                              ▼
                         [COMPROMISSO C&V]
                         Assinatura eletrônica
                         Comissão 6% paga
                         Mandato R$ 2.500 creditado
                              ▼
                         [ASSESSORIA DOCUMENTAL]
                         Matrícula, ITBI, certidões
                         Cartório
                              ▼
                         [ESCRITURA]
                         Cliente assina
                         NPS coletado
                         Cross-sell pós-venda
```

Vou destrinchar cada bloco abaixo.

---

## ETAPA 1 — AQUISIÇÃO DO COMPRADOR

### 1.1 Canal: Anúncios sociais pagos

| Canal | Conteúdo | CTA | Destino |
|---|---|---|---|
| **Meta Ads (Insta/FB)** | Carrossel "O Jogo Virou" + storyboard | "Quero achar meu imóvel" | Landing /comprador |
| **Google Ads** | Termos: "buyer's agent Rio", "imobiliária comprador" | "Saber mais" | Landing /comprador |
| **TikTok Ads** | Reels formato leilão (15s) | "Comece sua busca" | Landing /comprador |
| **LinkedIn Ads** | Texto profissional alto padrão | "Mandato premium" | Landing /hunt |

### 1.2 Landing Page

**Conteúdo:**
- Headline: "Pare de caçar imóvel. A gente leiloa compradores. Você é a estrela."
- Subtítulo: "Imobiliária que trabalha PELO comprador. Não pelo vendedor."
- Vídeo "O Jogo Virou" embedado (90s)
- Storyboard João + Maria (visual)
- 3 tiers (Light / Spotlight / Hunt)
- FAQ resumido (9 perguntas)
- Provas (KYC + SLA + Devolução)
- CTA grande: "Iniciar minha busca"

**Métricas a monitorar:**
- Taxa de scroll (% que rola até o fundo)
- Taxa de clique no CTA
- Taxa de início de cadastro
- Tempo médio na página

### 1.3 Chatbot do Mandato

**Fluxo:**
1. "Em qual cidade quer comprar?" → Cards: RJ / SP / BH / Outras
2. "Em qual bairro?" → Input texto com sugestões
3. "Que tipo de imóvel?" → Cards: Apto / Casa / Cobertura / etc
4. "Quantos quartos?" → Chips: 1 / 2 / 3 / 4+ / Tanto faz
5. "Faixa de preço?" → Cards: <500k / 500k-1M / 1M-2M / 2M-5M / 5M+
6. "Forma de pagamento?" → Chips: À vista / Financiamento / Misto
7. "Prazo?" → Cards: 30d / 60d / 90d / 6m / Sem pressa
8. "Características essenciais?" → Texto livre

**Tempo: 2-3 minutos pra completar.**

### 1.4 Escolha de Tier + Pagamento

- Modal exibe 3 tiers (Light/Spotlight/Hunt)
- Comprador escolhe
- Light: cadastra e fim
- Spotlight: paga R$ 2.500 via Pagar.me
- Hunt: paga R$ 7.500 via Pagar.me

### 1.5 Upload de Documentação (KYC)

- Comprador anexa: extrato bancário OU carta pré-aprovação OU declaração IR
- Sistema notifica corretor de plantão pra validação

### 1.6 Assinatura do Mandato

- Modal abre com Contrato de Mandato (resumo + link completo)
- Checkbox: "Li e concordo"
- Assinatura eletrônica via Rendizy/gov.br (decisão D11)
- Confirmação por e-mail

**SLA total da Etapa 1: 5-10 minutos.**

---

## ETAPA 2 — VALIDAÇÃO KYC

### 2.1 Responsável: Corretor de plantão (ou Coordenador de Operações)

### 2.2 Tempo SLA: até 24 horas

### 2.3 Checklist de validação

```
[ ] Documento anexado é válido?
[ ] Saldo/aprovação compatível com faixa declarada?
[ ] CPF não tem restrições graves?
[ ] Briefing tem sentido (faixa de preço razoável para região)?
[ ] Forma de pagamento compatível com saldo?
[ ] Prazo declarado é realista?
```

### 2.4 Decisão

| Decisão | Ação |
|---|---|
| ✅ Aprovado | Liberar FPA pra ir ao ar |
| 🟡 Aprovado com observação | Liberar mas anotar para acompanhamento |
| ❌ Reprovado | Notificar comprador + devolução de 100% |

### 2.5 Comunicação ao Comprador

- E-mail + WhatsApp: "Seu Mandato foi validado, FPA vai ao ar em até 48h"
- Sem prejuízo: confirmação por escrito + acompanhamento de status

**Ferramentas:** CRM Rendizy + WhatsApp Business via WAHA/Evolution

---

## ETAPA 3 — PUBLICAÇÃO DA FICHA PÚBLICA ANONIMIZADA (FPA)

### 3.1 Geração da FPA

Sistema automático:
- Cria código numérico (#XXXX)
- Compõe ficha com dados do briefing (sem identidade)
- Adiciona selo "KYC validado"
- Gera URL única (achamosimoveis.com.br/mandato/XXXX)

### 3.2 Disparo nas redes sociais

**Conteúdo:**

```
[Post Instagram — Carrossel 3 slides]

Slide 1 (Capa):
🟣 PROCURA-SE
[Briefing resumido]
Comprador #XXXX
KYC validado ✓

Slide 2 (Mecânica):
Como candidatar seu imóvel
[5 passos resumidos]
Sem custo até vender

Slide 3 (CTA):
N candidatos até agora
Prazo até [data]
🟣 Tem o imóvel certo?
Candidate em achamosimoveis.com.br/mandato/XXXX
```

**Plataformas:**
- Instagram feed (orgânico + boost)
- Instagram stories (com countdown sticker)
- Facebook feed
- TikTok reels (se Hunt)
- LinkedIn (se Hunt premium)

### 3.3 Anúncios pagos disparados

**Meta Ads:**
- Segmentação: bairros declarados (raio 1-3km), idade 45+, interesses imóveis/investimento
- Orçamento: R$ 800-1.500/30 dias (Spotlight) ou R$ 3-5k (Hunt)
- Criativos: 3-5 variações (carrossel, reel, foto única)

**Google Ads:**
- Palavras: "vender [bairro]", "imobiliária [bairro]", "comprador procurando [tipo]"
- Orçamento: R$ 300-500/30 dias por Mandato ativo

**SLA: FPA no ar em até 48h após validação KYC**

---

## ETAPA 4 — ATRAÇÃO E CADASTRO DE VENDEDOR

### 4.1 Vendedor descobre o anúncio

**Origens possíveis:**
- Insta/FB orgânico (compartilhado por amigo, filha, vizinho)
- Insta/FB pago (segmentação geográfica)
- Google search (compromisso)
- WhatsApp (indicação)
- Painel Radar acessado diretamente

### 4.2 Vendedor entra no Portal

**Tela inicial: Painel Radar**

- Lista por cidade > bairro > rua
- Cada rua mostra quantos compradores ativos
- Compatibilidade com o imóvel do vendedor (se ele cadastrou ou se há imóvel inferido)

### 4.3 Vendedor explora fichas anonimizadas

- Clica em rua > vê fichas
- Clica em ficha > vê detalhes anonimizados
- Pode comparar com outros mandatos

### 4.4 Vendedor cadastra imóvel

**Formulário:**
- Endereço
- Bairro / cidade / CEP
- Matrícula nº + cartório
- Área útil + área total
- Quartos / suítes / vagas
- Andar (se aplicável)
- Estado de conservação
- Valor pretendido + valor mínimo
- Características destacáveis (vista, varanda, lazer)
- Upload de mínimo 5 fotos
- Upload de matrícula + IPTU

### 4.5 Vendedor escolhe modalidade

- **Vendedor Padrão** (sem mensalidade, comissão 6% no fechamento)
- **Vendedor Exclusive** (sem mensalidade, exclusividade 90d, comissão 6%, investimento Achamos)

### 4.6 Vendedor assina Termo de Apresentação

- Modal abre com resumo + link pro contrato completo
- Checkbox de aceite
- Assinatura eletrônica via Rendizy/gov.br

### 4.7 Vendedor candidata-se a Mandato específico

- Volta ao Painel Radar
- Seleciona Mandato compatível
- Confirma candidatura (clique único)

**SLA total Etapa 4: 10-20 minutos.**

---

## ETAPA 5 — CURADORIA E MATCH SCORE

### 5.1 Match Score automático

**Algoritmo (6 critérios ponderados):**

| Critério | Peso | Como calcula |
|---|---|---|
| Match de briefing | 40% | Compatibilidade objetiva: tipo, dorms, faixa de preço, região |
| Estado de conservação | 15% | Score 0-100 baseado em fotos + declaração + idade do imóvel |
| Flexibilidade de preço | 15% | Vendedor declarou "negociável até X%"? |
| Documentação | 10% | Matrícula atualizada, sem ônus, IPTU em dia |
| Qualidade do anúncio | 10% | Quantidade e qualidade de fotos, descrição |
| Histórico vendedor | 10% | Já vendeu com Achamos antes? Score positivo? |

**Resultado:** score 0-100. Acima de 70 = top finalista. Abaixo de 40 = descartado.

### 5.2 Curadoria humana

**Responsável:** Corretor sênior responsável pelo Mandato

**Critérios de descarte (mesmo com score alto):**
- Documentação irregular (matrícula vencida, ônus impeditivos)
- Foto com watermark de outro site (suspeita de pulo)
- Vendedor com histórico problemático
- Preço muito acima do mercado (sinal de não-flexibilidade real)
- Imóvel claramente fora do briefing

**Critérios de promoção (mesmo com score médio):**
- Imóvel raro/único (vista, design)
- Vendedor com pressa demonstrada
- Documentação impecável (acelera fechamento)
- Vendedor Exclusive (prioridade contratual)

### 5.3 Montagem do Top 3

- Corretor seleciona 3 finalistas
- Adiciona "justificativa" pra cada (parágrafo curto explicando por que está no top)
- Adiciona fotos+vídeo (do cadastro do vendedor)
- Adiciona estimativa Achamos do "valor justo" (se houver avaliação)

**SLA Etapa 5: 5-10 dias úteis após primeira candidatura**

---

## ETAPA 6 — APRESENTAÇÃO AO COMPRADOR

### 6.1 Notificação ao Comprador

**Canais simultâneos:**
- E-mail formal: "Seu top 3 chegou"
- WhatsApp Business: link pra área logada
- SMS (opcional, alto valor)

### 6.2 Visualização no portal logado

**Carrossel "Top 3 Achamos":**

```
┌─────────────────────────────────────────┐
│  IMÓVEL #1                              │
│  [Fotos carrossel]                      │
│  Match Score: 87/100                    │
│  Justificativa: [parágrafo Achamos]     │
│  Rua/bairro aproximado: [info parcial]  │
│  Valor: R$ X (faixa Achamos: justo)    │
│                                         │
│  [Quero visitar este imóvel]           │
└─────────────────────────────────────────┘

(repete pra Imóvel #2 e #3)
```

### 6.3 Decisão do Comprador

- Comprador escolhe 1-3 imóveis para visitar (geralmente 2)
- Pode pedir mais fotos antes (Achamos coleta com Vendedor)
- Pode pedir vídeo tour adicional
- Pode pedir agendamento

**SLA Comprador decidir: 5 dias úteis (extensão possível)**

---

## ETAPA 7 — VISITA ACOMPANHADA

### 7.1 Agendamento

**Responsável:** Coordenador de Operações
**Ferramenta:** Calendário compartilhado (Google Calendar + portal)

**Fluxo:**
1. Coordenador pede 3 datas/horários ao Vendedor
2. Repassa ao Comprador, que escolhe 1
3. Confirma com ambos
4. Notifica corretor responsável

### 7.2 Pré-visita

**Corretor prepara:**
- Imprime ficha do imóvel
- Releitura do briefing do Comprador
- Lista de perguntas críticas (estado, ônus, motivo da venda)
- Identifica pontos a observar (rachaduras, umidade, fluxo de luz)

### 7.3 Durante a visita

**Presença obrigatória:**
- Corretor Achamos
- Vendedor (ou representante)
- Comprador

**Comportamento do corretor:**
- Inicia apresentação do imóvel (deixa Vendedor falar)
- Faz as perguntas críticas
- Anota observações técnicas
- Mantém comunicação fluida entre as partes
- NÃO permite troca direta de contato (telefone, WhatsApp pessoal)
- Foto da visita pra log interno (com autorização)

**Tempo: 30-60 minutos**

### 7.4 Pós-visita

**Corretor cria relatório no CRM Rendizy:**
- Observações técnicas
- Reação do Comprador
- Pontos positivos/negativos
- Próximos passos sugeridos

---

## ETAPA 8 — OFERTA / CONTRAOFERTA INTERMEDIADA

### 8.1 Comprador faz oferta

**Via portal:**
- Valor oferecido
- Condições especiais (prazo de pagamento, sinal, contingências)
- Mensagem pessoal (opcional)

**Achamos recebe e analisa:**
- Oferta é razoável?
- Vale repassar ao Vendedor com sugestão de negociação?

### 8.2 Achamos repassa ao Vendedor

- Notificação por e-mail + WhatsApp Business
- Apresentação clara: "Oferta de R$ X, condições Y, sugerimos contraproposta de R$ Z"

### 8.3 Vendedor responde

- Aceita
- Rejeita
- Contrapropõe (valor + condições)

### 8.4 Achamos intermedia rodadas

**Padrão típico:**
- 1-3 rodadas de contraproposta
- Achamos sugere meio termo quando empata
- Fecha negociação em geral em 3-7 dias

### 8.5 Documentação da negociação

Tudo loggado no CRM:
- Valores oferecidos
- Contrapropostas
- Datas
- Justificativas

**Importante:** se negociação travar, Achamos pode sugerir desistência amigável (raro mas acontece).

---

## ETAPA 9 — COMPROMISSO DE COMPRA E VENDA

### 9.1 Redação do compromisso

**Responsável:** Advogado parceiro Achamos + Coordenador

**Conteúdo:**
- Identificação completa das partes
- Descrição precisa do imóvel
- Valor e forma de pagamento
- Sinal (geralmente 10-20%)
- Prazo até escritura (30-60 dias)
- Condições suspensivas (financiamento aprovado, certidões limpas)
- Cláusula de comissão Achamos

### 9.2 Assinatura

- Eletrônica via Rendizy/gov.br
- Comprador, Vendedor e Achamos (representante CRECI)

### 9.3 Pagamento de sinal e comissão

- Sinal pago pelo Comprador (TED/PIX) ao Vendedor
- Comissão 6% paga pelo Vendedor à Achamos (no compromisso ou na escritura)
- Mandato R$ 2.500 do Comprador é CREDITADO no fechamento

### 9.4 Início da fase documental

- Achamos inicia coleta de certidões
- Vendedor providencia matrícula atualizada
- Comprador inicia processo bancário (se financiamento)

---

## ETAPA 10 — ASSESSORIA DOCUMENTAL

### 10.1 Documentos necessários

**Do imóvel:**
- Matrícula atualizada (ônus, certidão negativa)
- IPTU + nada-consta municipal
- Habite-se (casas) ou Certidão de Conclusão (apartamentos)
- Certidão negativa de débitos condominiais
- Planta (se necessário)

**Do Vendedor:**
- CPF / RG / Carteira de motorista
- Comprovante de estado civil (se casado, certidão de casamento + pacto se houver)
- Comprovante de residência
- Certidões negativas pessoais

**Do Comprador:**
- CPF / RG / etc
- Comprovante de capacidade financeira (já no KYC)
- Carta de financiamento (se aplicável)

### 10.2 Coleta e organização

**Responsável:** Coordenador de Operações + Advogado parceiro

**Ferramenta:** Pasta compartilhada (Google Drive ou Notion)

**SLA: 15-30 dias úteis**

### 10.3 Cálculo de ITBI

- Coordenador calcula ITBI (geralmente 2-3% sobre valor da venda)
- Comprador paga via guia municipal

---

## ETAPA 11 — ESCRITURA E REGISTRO

### 11.1 Agendamento de escritura

- Tabelionato escolhido (Comprador escolhe geralmente)
- Achamos agenda data

### 11.2 Comparecimento

- Comprador, Vendedor, representante Achamos (CRECI)
- Tabelião lê a escritura
- Assinaturas físicas (ou eletrônicas, se o cartório permitir)

### 11.3 Pagamento do saldo

- Comprador paga o saldo (TED/PIX) ao Vendedor
- Comissão Achamos é confirmada como paga (se não foi no compromisso)

### 11.4 Registro de Imóveis

- Achamos repassa a escritura ao Cartório de Registro de Imóveis
- Aguarda registro (~7-15 dias)

### 11.5 Entrega das chaves

- Vendedor entrega chaves ao Comprador
- Ato presencial ou assistido por corretor Achamos

---

## ETAPA 12 — PÓS-VENDA

### 12.1 Pesquisa NPS

**1 dia após escritura:**
- E-mail + WhatsApp: "Como foi sua experiência?"
- Score 0-10
- Comentário aberto

**Resultados:**
- 9-10 = Promotor (pedir indicação + depoimento + foto)
- 7-8 = Neutro (perguntar como melhorar)
- 0-6 = Detrator (entender em detalhe, propor solução)

### 12.2 Cross-sell

**Pra Comprador que fechou:**
- Programa de indicação (R$ 1.000 por amigo indicado que fechar)
- Convite pra escrever depoimento no site
- Newsletter mensal sobre mercado imobiliário

**Pra Vendedor que fechou:**
- Programa de afiliação (vire parceiro Achamos pra outros vendedores)
- Convite pra investir o capital recebido em outro imóvel via Achamos

### 12.3 Manutenção do relacionamento

- Newsletter mensal (mercado, casos, novidades)
- Aniversário (mensagem personalizada)
- Pesquisa anual ("tudo bem com o imóvel? Algo pra ajudar?")

---

## EQUIPE OPERACIONAL — RESPONSABILIDADES

### Founder/CEO (Rafael)
- Estratégia geral
- Aprovação de exceções
- Captação institucional
- Marketing institucional
- Aprovação de Mandatos Hunt (alto valor)

### Coordenador de Operações
- Pipeline geral (todos os mandatos ativos)
- SLA monitoring
- Agendamento de visitas
- Coordenação documental
- Comunicação com Comprador e Vendedor (operacional)
- Relatórios semanais

### Corretor Sênior (1-2 inicial)
- Validação KYC
- Curadoria humana de candidaturas
- Visitas acompanhadas
- Negociação intermediada
- Atendimento direto (Comprador + Vendedor)
- Apresentação do top 3

### Jurídico Parceiro
- Redação de compromisso de compra e venda
- Assessoria documental
- Suporte em disputas
- Atualização de minutas

### Marketing (agência interna Rafael)
- Criativos (Insta, FB, Google)
- Disparo de campanhas
- Análise de performance
- Conteúdo orgânico
- PR

---

## FERRAMENTAS USADAS

| Ferramenta | Uso |
|---|---|
| **Site achamosimoveis.com.br** | Portal cliente (Comprador + Vendedor) |
| **CRM Rendizy** | Pipeline interno + automação + logs |
| **WhatsApp Business via WAHA/Evolution** | Comunicação operacional |
| **Pagar.me** | Cobrança de Mandato + outros pagamentos |
| **Rendizy / gov.br** | Assinatura eletrônica de contratos |
| **Idwall / Manual (futuro)** | KYC documental |
| **Meta Ads + Google Ads** | Campanhas pagas |
| **Google Drive + Notion** | Documentos e Data Room |
| **Google Calendar** | Agendamentos |
| **Stripe ou Pagar.me** | Pagamentos recorrentes (se houver) |

---

## SLAs CONSOLIDADOS

| Etapa | SLA | Métrica |
|---|---|---|
| Validação KYC | 24h | % validados em 24h |
| Publicação FPA | 48h pós KYC | % publicados em 48h |
| Primeira candidatura | 7 dias | % com candidatura em 7d |
| Top 3 entregue | 15 dias | % com top 3 em 15d |
| Comprador decidir | 5 dias | tempo médio |
| Visita agendada | 7 dias após decisão | tempo médio |
| Negociação concluída | 7 dias após visita | tempo médio |
| Compromisso assinado | 14 dias após oferta aceita | tempo médio |
| Escritura | 30-60 dias após compromisso | depende de financiamento |
| Pesquisa NPS | 1 dia após escritura | % respondidos |

---

## EXCEÇÕES E CASOS DELICADOS

### Exceção 1: Comprador desiste durante o Mandato
- Acionar política de devolução
- Apresentar candidaturas que ele recebeu (tail clause de 12 meses sobre essas)
- Encerrar mandato amigavelmente

### Exceção 2: Vendedor desiste durante curadoria
- Remover candidatura
- Notificar Achamos pra atualizar painel
- Tail clause permanece se já houve apresentação

### Exceção 3: Disputa no compromisso de compra e venda
- Achamos não se posiciona como advogado de uma das partes
- Sugere mediação ou resolução amigável
- Em última instância, judicial

### Exceção 4: Imóvel com defeito descoberto pós-visita
- Achamos NÃO é responsável pela vistoria técnica
- Comprador deve contratar engenheiro/arquiteto pra inspeção
- Se vendedor escondeu vício: questão jurídica entre eles

### Exceção 5: Financiamento negado
- Compromisso de compra e venda tem cláusula suspensiva
- Sinal devolvido ao Comprador
- Vendedor pode buscar outro Comprador (sem Achamos, fica com o estoque na carteira)

---

## ESCALAÇÃO DE PROBLEMAS

```
NÍVEL 1: Suporte WhatsApp Business
  ↓ se não resolver em 1 dia
NÍVEL 2: Coordenador de Operações
  ↓ se não resolver em 2 dias
NÍVEL 3: Corretor Sênior responsável + Rafael
  ↓ se não resolver em 3 dias
NÍVEL 4: Advogado parceiro + reunião com cliente
```

---

## PRÓXIMOS PASSOS

1. **Você (Rafael) valida este fluxo** — alguma etapa precisa ser diferente?
2. **Documentar em Notion / Confluence** — material de treinamento da equipe
3. **Criar checklist por etapa** — uso operacional diário
4. **Definir métricas em dashboard** (Fase 9 do roadmap)
5. **Treinamento da equipe inicial** (Coordenador + Corretor)

---

> **🟣 O fluxo operacional é onde a promessa vira realidade.**
> **Cada etapa tem responsável, SLA e ferramenta.**
> **Sem isso documentado, escalar é caos.**

---

*v1.0 · 2026-05-23 · Fluxo Operacional Achamos Imóveis*
*Atualizar a cada novo aprendizado real.*
