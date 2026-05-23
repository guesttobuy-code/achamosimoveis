# 🟣 Protocolo Anti-Pulo — Operacional + Tecnológico + Cultural

> **A guerra que ninguém fala — mas decide se a Achamos sobrevive.**
> Cada pulo (vendedor ou comprador fechar fora) é venda perdida + queda de moral + sinal pro mercado que dá pra burlar.
> Este protocolo define as 4 camadas de proteção em detalhe.
> v1.0 · 2026-05-23 · Achamos Imóveis

![Achamos Imóveis](./assets/logo_achamos.svg)

---

## 🎯 A REALIDADE

A Achamos é uma intermediária. Os contratos travam parte do risco. Mas o **comportamento humano** é onde o ataque acontece.

> **"Comissão devida = sim pelo contrato. Mas como você descobre o pulo? Como você prova? Como você impede ANTES?"**

Este protocolo responde essas 3 perguntas.

---

## 🛡️ AS 4 CAMADAS DE PROTEÇÃO

```
┌──────────────────────────────────────────────────────┐
│  CAMADA 1: CONTRATUAL                                │
│  → Mandato + Termo de Apresentação + Tail Clause     │
│  → Cláusulas penais + foro + honorários              │
├──────────────────────────────────────────────────────┤
│  CAMADA 2: OPERACIONAL                               │
│  → Comunicação 100% intermediada                     │
│  → Revelação progressiva (endereço/identidade)       │
│  → Visita SEMPRE acompanhada                         │
├──────────────────────────────────────────────────────┤
│  CAMADA 3: TECNOLÓGICA                               │
│  → Log imutável de apresentações                     │
│  → Watermark em fotos                                │
│  → Hash de identificação                             │
│  → Auditoria de acesso                               │
├──────────────────────────────────────────────────────┤
│  CAMADA 4: CULTURAL/EQUIPE                           │
│  → Não-aliciamento 24 meses                          │
│  → Treinamento equipe                                │
│  → Cultura "ninguém é maior que o sistema"           │
└──────────────────────────────────────────────────────┘
```

Cada camada vou destrinchar abaixo.

---

# CAMADA 1 — CONTRATUAL

### O que faz
Trava jurídica. Quando descoberto o pulo, há base legal pra cobrar.

### Componentes

| Documento | Função | Cláusula crítica |
|---|---|---|
| **Mandato de Busca (Comprador)** | Trava comprador contra fechar fora | Cláusula 5 (Exclusividade Reversa) + Cláusula 8 (Tail 12m) |
| **Termo de Apresentação (Vendedor)** | Trava vendedor contra pulo | Cláusula 5 (Tail 12m) + Cláusula 5.3 (Cláusula Penal 2% + R$ 50k) |
| **Termo de Captação Exclusiva (Vendedor Exclusive)** | Trava vendedor com exclusividade ampla | Exclusividade 90d + investimento Achamos no imóvel |

### Limitações
- Contrato sozinho não impede o pulo, só permite cobrar depois
- Provar quem foi a Achamos versus "ele descobriu sozinho" exige evidência (log da Camada 3)
- Custo de litígio pode superar a comissão se o caso for pequeno

### Estratégia
Contratos são **dissuasores**. Quem leu a cláusula 5.3 do Termo de Apresentação ("2% + R$ 50k + honorários 20% + IPCA + juros 1%/mês") pensa duas vezes antes de pular.

---

# CAMADA 2 — OPERACIONAL

### O que faz
Reduz a OPORTUNIDADE de pular. Mesmo se o vendedor quiser, não tem como.

### 2.1 — Comunicação 100% intermediada

**Princípio:** comprador e vendedor NUNCA trocam contato direto até o compromisso de compra e venda.

**Implementação:**
- Todo contato passa pelo portal achamosimoveis.com.br
- WhatsApp Business da Achamos no meio (não WhatsApp pessoal de ninguém)
- E-mail certificado com cópia obrigatória pro corretor
- Log automático no CRM Rendizy

**Sanção interna:**
- Corretor que facilita troca direta = afastamento imediato + ressarcimento por dano (Cláusula D20 do roadmap)
- Cliente que tenta contato direto = aviso formal + suspensão se reincidir

### 2.2 — Revelação progressiva (a "cortina")

A informação é revelada em **camadas**, conforme avança o relacionamento. Tabela:

| Fase | O que Vendedor vê do Comprador | O que Comprador vê do Vendedor |
|---|---|---|
| **Mandato publicado** | Ficha anonimizada (#4827, faixa, bairros, prazo) | — |
| **Candidatura enviada** | + Que ele é candidato | — |
| **Top 3 entregue** | + Que ele foi finalista | Fotos do imóvel + endereço aproximado (rua + faixa de número) |
| **Visita agendada** | Identidade real do Comprador (sob NDA do Termo de Apresentação) | Endereço completo do imóvel |
| **Oferta feita** | Pode contatar via portal pra negociação | — |
| **Compromisso assinado** | Contato direto liberado | Contato direto liberado |

**Resultado:** vendedor que receber fotos + endereço aproximado ainda não pode bater na porta. Comprador que ver perfil anonimizado não sabe quem é até a visita.

### 2.3 — Visita sempre acompanhada

**Princípio:** TODA visita aos imóveis Finalistas é com presença de corretor habilitado da Achamos.

**Por que:**
- Corretor da Achamos faz as perguntas certas (estado, ônus, herança não-resolvida)
- Evita troca de contato fora dos protocolos
- Documenta a visita (foto + ata interna)
- Mostra ao Comprador que a Achamos está do lado dele
- Mostra ao Vendedor que a Achamos é "presente"

**Sanção interna:**
- Comprador que faz visita sozinha (sem corretor) — aviso + suspensão de novos imóveis se reincidir
- Vendedor que aceita visita sem corretor — risco de descredenciamento + Tail Clause aplicável

### 2.4 — Negociação intermediada

**Princípio:** todas as ofertas, contraofertas, propostas e contraprops PASSAM pela plataforma.

**Vantagem operacional:**
- Negociação eficiente (corretor sugere movimentos)
- Histórico documentado (importante em caso de disputa pós-venda)
- Anti-fraude (ninguém combina por fora)

### 2.5 — Pós-fechamento monitorado

**Até a escritura definitiva** (que pode acontecer 30-60 dias após compromisso), a Achamos:
- Acompanha pagamento de sinais e parcelas
- Acompanha documentação cartorial
- Cobra comissão no compromisso, não na escritura
- Mantém canal aberto pra resolução de imprevistos

---

# CAMADA 3 — TECNOLÓGICA

### O que faz
Cria EVIDÊNCIA. Quando descoberto o pulo, prova judicial é blindada.

### 3.1 — Log imutável de apresentações

**Como funciona:**
- Cada apresentação de ficha de comprador ao vendedor candidato é registrada em log com:
  - Timestamp (data + hora exatas)
  - Hash criptográfico do conteúdo (impossível alterar sem detecção)
  - IP de acesso do vendedor
  - Identidade do comprador (#código)
  - Identidade do vendedor (CPF)
  - Conteúdo apresentado (texto, fotos, ficha)
- Log armazenado em **banco de dados separado**, com replicação em servidor secundário
- Acesso só pra time interno autorizado + via API auditada

**Uso em disputa:**
- Em ação judicial, log serve como evidência da apresentação
- Hash criptográfico defende contra alegações de "vocês fabricaram esse log"
- Timestamp serve como prova temporal (vendedor já tinha conhecimento na data X)

### 3.2 — Watermark em fotos enviadas

**Princípio:** cada foto compartilhada com o vendedor tem **watermark digital embutido** com:
- ID da apresentação (ex.: "M4827-V0012")
- Timestamp
- Aviso "PROPRIEDADE INTELECTUAL ACHAMOS — REPRODUÇÃO PROIBIDA"

**Por que importa:**
- Se foto da Achamos aparecer em outro portal/anúncio = prova de pulo
- Vendedor não consegue facilmente "limpar" watermark
- Inibe vendedor de capturar dados pra usar fora

### 3.3 — Hash de identificação anonimizada

**Princípio:** o código `#4827` do Comprador é gerado por algoritmo determinístico (hash criptográfico) que combina:
- CPF do comprador
- Timestamp do Mandato
- Salt secreto da Achamos

**Resultado:**
- Vendedor não consegue derivar CPF do código
- Achamos pode reverter o código pra identidade real (com chave privada)
- Mesma pessoa cadastrando novo Mandato gera novo código (anti-rastreamento cruzado)

### 3.4 — Auditoria de acesso

**Toda visualização de dados sensíveis é loggada:**
- Quem viu (corretor X, vendedor Y, comprador Z)
- O quê (ficha, foto, contato)
- Quando
- De onde (IP, device)

**Uso:**
- Detectar comportamento suspeito (ex.: corretor visualizando 50 fichas em 1 minuto = exfiltração de dados)
- Auditoria interna mensal
- Prova judicial em caso de aliciamento ou vazamento

### 3.5 — Cadeira de admin única

**Princípio:** apenas Rafael (founder) + 1 coordenador de operações têm acesso COMPLETO ao banco de dados.

**Razão:**
- Reduz superfície de risco
- Vazamento de credenciais não compromete operação inteira
- Decisões sensíveis (descredenciar vendedor, devolver mandato) passam por 2 pessoas

### 3.6 — Backup encriptado offsite

**Princípio:** todo log e dado sensível tem backup encriptado em provedor distinto do primário.

**Implementação:**
- Primário: Supabase (Rendizy stack atual)
- Backup: Cloudflare R2 ou AWS S3 com encriptação at-rest
- Frequência: diária
- Retenção: 7 anos (alinhado com tail clause 12m + processos prescricionais)

---

# CAMADA 4 — CULTURAL/EQUIPE

### O que faz
Evita o pior pulo de todos: **o de dentro de casa**.

### 4.1 — Cláusula de não-aliciamento

**Aplicação:**
- Todo corretor/ops/dev contratado assina cláusula de não-aliciamento por **24 meses pós-desligamento** (alinhado D20)
- Inclui:
  - Não levar carteira de clientes para outra imobiliária
  - Não contatar Compradores ou Vendedores da Achamos por 24m
  - Não usar dados ou processos da Achamos em projetos paralelos
  - Multa de 12x salário em caso de quebra + ressarcimento

### 4.2 — Treinamento contínuo

**Onboarding obrigatório (8h):**
- Tese da Achamos (leilão reverso, comprador como estrela)
- Os 3 contratos do produto
- Protocolo Anti-Pulo (este documento)
- LGPD prático (como tratar dados)
- Cultura "honestidade brutal" (princípios)

**Reciclagem semestral (4h):**
- Cases recentes (pulos identificados, lições)
- Atualizações de produto e processo
- Q&A jurídico com advogado parceiro

### 4.3 — Cultura "ninguém é maior que o sistema"

**Princípio:** mesmo Rafael (founder) cumpre os mesmos protocolos. Sem exceção.

**Mensagem interna:**
> *"Aqui ninguém pula a fila. Ninguém atende em paralelo. Ninguém faz favor pra amigo. O sistema protege todos nós — inclusive o founder."*

**Sinais visíveis:**
- Rafael publica métricas de cumprimento de SLA mensalmente
- Decisões de afastamento de funcionário por quebra de protocolo são comunicadas (sem nome, mas com fato)
- Recompensa interna por reportar tentativa de pulo (mesmo de cliente)

### 4.4 — Programa de afiliados controlado

**Quando corretor externo trouxer lead:**
- Contrato de afiliação assinado
- Comissão clara (1% sobre Spotlight + parte da comissão de venda)
- Não-aliciamento aplicado a afiliados também
- Termo de confidencialidade

---

## 🎯 OS 8 CENÁRIOS DE TENTATIVA DE PULO — E COMO MITIGAR

### Cenário 1 — Vendedor anota endereço, bate na porta do Comprador
**Probabilidade:** baixa (Comprador é anonimizado, vendedor não tem endereço)
**Mitigação:**
- Endereço NUNCA fornecido ao Vendedor (Camada 2.2)
- Vendedor não tem como localizar Comprador
**Status:** Bloqueado pela arquitetura.

### Cenário 2 — Vendedor anota dados das fotos (vendedor #2 viu foto da casa do candidato vendedor #1)
**Probabilidade:** N/A (Vendedor não vê outras candidaturas)
**Mitigação:**
- Vendedor só vê SEU próprio status
**Status:** Bloqueado pela arquitetura.

### Cenário 3 — Comprador anota endereço dos finalistas, vai sozinho, fecha direto
**Probabilidade:** média
**Mitigação:**
- Comprador só recebe endereço aproximado até visita agendada
- Visita SEMPRE acompanhada
- Tail Clause 12m no Mandato (qualquer fechamento com Finalista apresentado = comissão devida)
- Log imutável da apresentação
**Status:** Protegido juridicamente + reduzido operacionalmente.

### Cenário 4 — Comprador anota dados, indica primo pra comprar
**Probabilidade:** baixa-média
**Mitigação:**
- Cláusula 5.1 do Termo de Apresentação cobre "pessoa indicada pelo comprador"
- Cláusula 8 do Mandato cobre "interposta pessoa"
- Investigação documental pós-fechamento (Cartório + Receita Federal)
**Status:** Protegido juridicamente, risco operacional residual.

### Cenário 5 — Vendedor que NÃO se candidatou, vê post de Insta e bate na porta direto do Comprador
**Probabilidade:** muito baixa (Comprador é anonimizado em todos os anúncios)
**Mitigação:**
- Anonimização forte da Ficha Pública (Camada 2.2)
- Indicação clara que candidaturas são SOMENTE via plataforma
**Status:** Bloqueado pela arquitetura.

### Cenário 6 — Corretor da Achamos sai, leva carteira
**Probabilidade:** alta sem proteção
**Mitigação:**
- Cláusula não-aliciamento 24m (Camada 4.1)
- Treinamento + cultura (Camada 4.2 + 4.3)
- Auditoria de acesso (Camada 3.4)
**Status:** Protegido jurídico + cultural.

### Cenário 7 — Comprador e Vendedor combinam pelo WhatsApp pessoal fora da Achamos
**Probabilidade:** média (precisa que troquem contato direto)
**Mitigação:**
- Comunicação 100% intermediada (Camada 2.1)
- Visita acompanhada (corretor presente, dificulta troca direta de número)
- Termo do Vendedor (Cláusula 6.2) proíbe aceitar contato direto
- Sanção: descredenciamento + cláusula penal
**Status:** Protegido contratualmente + operacionalmente.

### Cenário 8 — Vendedor candidata, fecha DESPOIS de 12 meses (pós-Tail)
**Probabilidade:** baixa (Tail é longo)
**Mitigação:**
- Tail Clause de 12 meses é o equilíbrio entre proteção e defensibilidade legal
- Para casos de alto valor, considerar Tail de 18 meses no Termo (advogado avalia)
**Status:** Aceitável — após 12 meses, fim da proteção é razoável.

---

## 📊 DASHBOARD DE MONITORAMENTO ANTI-PULO

### Métricas que a Achamos rastreia mensalmente:

| Métrica | Como medir | Meta |
|---|---|---|
| **Mandatos com Tail Clause ativa** | # de mandatos cuja apresentação ocorreu nos últimos 12m | tracking contínuo |
| **Tentativas de troca de contato fora do canal** | Mensagens em WhatsApp Business com palavras-chave ("meu número direto", "vamos falar fora") | < 5% das comunicações |
| **Visitas sem corretor (não-conformidade)** | Visitas registradas pelo sistema sem corretor | < 1% |
| **Casos de pulo confirmado** | Investigação pós-fechamento que identificou pulo | < 2% das vendas potenciais |
| **Casos de pulo cobrado (judicial ou amigável)** | Cláusula penal aplicada e paga | tracking |
| **Tempo médio entre apresentação e fechamento** | Para detectar fechamentos pós-Tail "estranhamente próximos" | analítico |

### Sinais de alerta (red flags) pra investigar:

- Vendedor que candidata em 5+ mandatos e nunca fecha (provável "espião")
- Comprador que dá briefing muito específico (parece já saber o imóvel)
- Vendedor que cancela após ver finalistas e some
- Comprador que pede pra "ver mais informações antes de visitar"
- Imóvel candidatado que aparece vendido publicamente sem passar pelo portal

---

## 🚨 PLANO DE AÇÃO EM CASO DE PULO IDENTIFICADO

### Passo 1 — Investigação interna (7 dias)
- Recuperar log imutável da apresentação
- Verificar matrícula atualizada do imóvel pulado (cartório online)
- Identificar comprador final
- Cruzar dados (CPF, parentesco, empresa)

### Passo 2 — Notificação extrajudicial (15 dias)
- Carta registrada via advogado parceiro
- Apresentar evidências (log + matrícula + análise documental)
- Propor pagamento amigável (comissão + cláusula penal)
- Prazo de 10 dias para resposta

### Passo 3 — Negociação amigável (30 dias)
- Reunião com advogado da outra parte (se houver)
- Possível desconto na cláusula penal (não na comissão) se pagamento imediato
- Acordo extrajudicial formalizado

### Passo 4 — Ação judicial (caso amigável falhe)
- Ação de cobrança ordinária ou indenizatória
- Petição inicial com TODAS as evidências (log, contrato, matrícula)
- Pedido de bloqueio de valores (BACENJUD) se justificado
- Foro Rio de Janeiro - Capital (decisão D9)

### Passo 5 — Pós-ação
- Atualizar protocolo se gap identificado
- Comunicar internamente o aprendizado (sem nome do caso)
- Atualizar cláusulas se advogado recomendar

---

## 🟣 PRINCÍPIO DIRETOR

> **A Achamos NÃO é uma plataforma open. É um leilão controlado.**
> Cada apresentação é uma transação valiosa.
> Cada apresentação tem trava jurídica + operacional + tecnológica + cultural.
> Pular = caro. Pular = arriscado. Pular = improvável.

Esse é o sinal que o mercado precisa receber **nos primeiros 6 meses**. Quando 1-2 casos de pulo virarem processo público (com cobrança bem-sucedida), o ecossistema entende: **não dá pra burlar a Achamos**.

A partir daí, o protocolo se autossustenta. Vendedores e Compradores entram já sabendo que o jogo é limpo (pra ambos os lados).

---

## ⚙️ IMPLEMENTAÇÃO TÉCNICA (próximos passos)

### Sprint 1 (Camada 3 — Log e watermark)
- Implementar tabela `presentation_logs` no Supabase com hash criptográfico
- Implementar geração de watermark digital em fotos (server-side)
- Implementar audit log de acessos

### Sprint 2 (Camada 2 — Comunicação intermediada)
- Construir plataforma de mensagens interna (chat embed)
- Integrar WhatsApp Business via WAHA/Evolution (reaproveitar Rendizy)
- Implementar redação automática de "ofertas" via formulário, não chat livre

### Sprint 3 (Camada 4 — Cultural)
- Criar onboarding em vídeo (8h)
- Documentar protocolo em Notion público pra equipe
- Implementar dashboard de KPIs de protocolo

### Sprint 4 (Camada 1 — Contratual)
- Contratos finalizados pelo advogado
- Integração com Rendizy/gov.br pra assinatura eletrônica
- Fluxo de aceitação no portal (modal de leitura + check + assinatura)

---

*v1.0 · 2026-05-23 · Protocolo Anti-Pulo Achamos*
*Atualize a cada novo case identificado. Versão viva.*
