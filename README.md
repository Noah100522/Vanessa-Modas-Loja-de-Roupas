# Vanessa Modas — Landing Page

Landing page comercial responsiva para a Vanessa Modas, criada como apresentação premium da loja.

## Stack

Projeto estático sem dependências de build:

- HTML5 semântico
- CSS responsivo com animações e tratamento de `prefers-reduced-motion`
- JavaScript vanilla para menu, reveal on scroll e efeito 3D/tilt
- Google Fonts (DM Sans + Playfair Display)

O fashion film da landing é uma composição Remotion separada, em React, sem alterar a arquitetura estática do site.

## Fashion film (Remotion)

```bash
npm install
npm run remotion:studio
npm run remotion:render
```

O render final é gravado em `assets/vanessa-fashion-film.mp4` e carregado automaticamente pela seção “Vanessa Fashion Film”, com poster de fallback.

## Executar

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático.

## Conteúdo comercial aplicado

- Moda feminina, masculina e plus size
- Slogan: “A tendência é ser feliz”
- CTA para WhatsApp
- Link para `@vanessa_modas_fashion`
- Endereço em São José dos Pinhais/PR
- Prova social com nota e avaliações fornecidas no briefing

## Imagens

A primeira versão usa fotografias editoriais remotas do Unsplash como placeholders de apresentação. Elas **não são fotos oficiais da Vanessa Modas**.

Antes de apresentar como site definitivo da marca, o ideal é substituir as URLs das imagens no `index.html` por fotos autorizadas da própria loja/Instagram, mantendo as proporções atuais. A estrutura visual já está pronta para essa troca.

## Observação

Os links externos usam `target="_blank"` com `rel="noopener noreferrer"`. O projeto não coleta dados, não possui formulários e não expõe chaves ou segredos.
