## 1. O que é um SVA?
---

<br>

**SVA** é a sigla para **Serviço de Valor Adicionado**. De acordo com a Agência Nacional de Telecomunicações (Anatel), fundamentada no artigo 61 da Lei Geral de Telecomunicações (LGT - Lei nº 9.472/1997), o SVA é toda e qualquer atividade que acrescenta, a um serviço de telecomunicações que lhe dá suporte, novas utilidades relacionadas ao acesso, armazenamento, apresentação, movimentação ou recuperação de informações.

### Características Principais:

<br>

* **Não é Telecomunicação:** O SVA não se confunde com o Serviço de Comunicação Multimídia (SCM) ou outros serviços de telecomunicações. Ele utiliza a banda larga como infraestrutura de transporte.
* **Exemplos Comuns:** Serviços de streaming de vídeo (Netflix, Globoplay), streaming de áudio (Spotify, Deezer), aplicativos de leitura (Banca de Revistas digital), cursos online, antivírus e suporte técnico avançado.
* **Benefício Tributário:** No Brasil, os SVAs possuem uma carga tributária geralmente menor (incidência de ISS ou isenção, dependendo do serviço) em comparação com os serviços de telecomunicações, que sofrem pesada tributação de ICMS.
* **Diferencial Competitivo:** Permite que provedores de internet (ISPs) agreguem valor aos seus planos de banda larga, combatendo a guerra de preços e diminuindo o *churn* (cancelamento de clientes).

---

## 2. PlayHub

A **PlayHub** é uma plataforma e distribuidora hub de conteúdos digitais (SVAs) focada especialmente no mercado de ISPs (Provedores de Internet). Ela atua como um facilitador entre as grandes marcas de entretenimento/educação e os provedores de pequeno, médio e grande porte.

Em vez de um provedor negociar individualmente com cada plataforma de streaming ou aplicativo (o que exige alto volume mínimo de assinaturas e contratos complexos), a PlayHub unifica esse portfólio. Através de uma única integração tecnológica e comercial, o ISP passa a ter acesso a dezenas de conteúdos de relevância nacional e internacional para embutir ou vender junto aos seus planos de internet.

---

## 3. Serviços Ofertados

O portfólio distribuído pela PlayHub se divide em 4 categorias: 

### A. Entretenimento e Streaming de Vídeo (VOD)
* **Max (antiga HBO Max):** Filmes, séries de sucesso, conteúdos infantis e esportes ao vivo (Champions League).
* **Deezer:** Streaming de música premium e podcasts.
* **Looke:** Catálogo diversificado de filmes e séries por streaming.
* **Paramount+:** Grandes produções cinematográficas, séries exclusivas e realities.

### B. Conteúdo Infantil
* **Cartoon Network / Toonix:** Desenhos animados e jogos interativos de canais consagrados.
* **Noggin:** Desenhos educativos desenvolvidos pelo canal Nick Jr.

### C. Educação e Leitura digital
* **Bancah / Revistas:** Acesso a centenas de revistas e jornais de grande circulação nacional.
* **UOL Leia+:** Livros, audiolivros e revistas em uma única plataforma.
* **Estante Digital:** Plataforma voltada para leitura de e-books de temas variados.

### D. Utilitários, Segurança e Games
* **Antivírus e Segurança Digital:** Aplicativos de proteção para computadores e smartphones (como Bitdefender ou McAfee via parcerias).
* **Clube de Vantagens / Descontos:** Plataformas de cupons e descontos em e-commerces parceiros.

---

## 4. Como Adicionar no SGP

O **SGP** é um dos sistemas de ERP e CRM mais utilizados por provedores de internet para gerenciar redes, clientes e faturamento. A integração de um SVA da PlayHub no SGP permite a automação no envio de acessos ao cliente e a correta divisão fiscal na fatura.

Abaixo está o fluxo padronizado para adicionar e configurar a PlayHub dentro do SGP:

### Passo 1: Obter as credenciais da API da PlayHub
Antes de configurar o sistema, você deve solicitar à equipe comercial/técnica da PlayHub:
1. O **Endpoint da API** (URL de integração).
2. O **Token de Autenticação** (Chave de API / App Token).
3. O código de identificação de cada produto contratado.

### Passo 2: Configurar o Módulo de Integração (Gateway SVA) no SGP
1. Acesse o painel administrativo do seu SGP com perfil de Administrador.
2. Navegue até o menu de **Configurações** > **Integrações** (ou **Parceiros / SVAs** dependendo da versão da interface do seu SGP).
3. Busque pela opção **PlayHub** ou adicione uma nova integração do tipo "SVA Genérico via API" se não houver um módulo nativo explícito.
4. Insira as credenciais obtidas no Passo 1 (Token, URL e Credenciais).
5. Clique em **Salvar** e realize um teste de conexão para garantir que o SGP está conversando com os servidores da PlayHub.

### Passo 3: Cadastrar o Serviço Adicional (SVA) no SGP
1. Vá até o menu **Cadastros** > **Serviços** (ou **Produtos de SVA**).
2. Clique em **Novo Serviço**.
3. Preencha as informações:
   * **Nome do Serviço:** Ex: *PlayHub Max*, *PlayHub Deezer*.
   * **Tipo de Serviço:** Selecione **SVA**.
   * **Vínculo de Integração:** Selecione a integração **PlayHub** configurada no passo anterior.
   * **Código do Produto externo:** Digite o ID exato fornecido pela PlayHub para aquele produto específico.
4. Configure as regras fiscais do SVA (Item de Nota Fiscal de Serviço/ISS ou isenção, de acordo com a orientação da sua contabilidade).

### Passo 4: Vincular o SVA aos Planos de Internet (Composição do Combo)
Para que o SVA seja ativado automaticamente para o cliente, ele deve fazer parte da composição do plano:
1. Vá em **Cadastros** > **Planos de Acesso** (ou Planos de Internet).
2. Edite o plano desejado (Ex: *Plano Fibra 500 MEGA + Max*).
3. Na aba **Composição**, **Configurações de SVA** ou **Serviços Adicionais**, adicione o SVA cadastrado no Passo 3.
4. Defina a divisão do valor (Ex: R$ 70,00 alocados para o SCM/Internet e R$ 30,00 alocados para o SVA PlayHub, totalizando uma fatura de R$ 100,00).
5. Salve as alterações.

### Passo 5: Teste de Ativação
1. Acesse o cadastro de um cliente de testes.
2. Altere o plano dele para o novo plano contendo o SVA da PlayHub.
3. Verifique se o SGP disparou com sucesso o comando de criação de conta para a PlayHub (o cliente receberá um e-mail ou SMS de boas-vindas da PlayHub para criar a senha de acesso).