# EduSophia

<!-- PAM-CI-NOTA-INICIO -->
### Nota atual (automática) — Educa+ (matérias de estudo)

[![CI](https://github.com/biawtn/EduSophia/actions/workflows/pam-ci.yml/badge.svg)](https://github.com/biawtn/EduSophia/actions/workflows/pam-ci.yml) [![Nota](https://img.shields.io/badge/Nota%20PAM%20I-MB-green)](https://github.com/biawtn/EduSophia/actions/workflows/pam-ci.yml)

**MB** — Muito bom · **76%** (76/100 pontos) · atualizado em 2026-11-16 11:53

| Fase | Pontos |
|------|--------|
| Fase 1 — Estrutura | 10/10 |
| Fase 2 — AsyncStorage | 15/15 |
| Fase 3 — SQLite | 30/30 |
| Fase 4 — Versão Final (UX e Dispositivo) | 21/45 |

Checklist item a item em [NOTA.md](NOTA.md) · [ver a rodada mais recente no Actions](https://github.com/biawtn/EduSophia/actions/workflows/pam-ci.yml)
<!-- PAM-CI-NOTA-FIM -->

Educa+ — Projeto PAM I

---

> [!IMPORTANT]
> **Sua inscrição foi aceita!** Bem-vindos ao Trabalho em Grupo de PAM I.
> Abaixo estão as fichas de entrega e os links das aulas que vocês vão precisar.

## Integrantes

- Bianca Teixeira Noronha

## Tema

Bloco de notas voltado para organização dos estudos — anotações, contagem de dias, checklist com cores e calendário.

## Fichas de Entrega

| Fase | Descrição | Prazo | Link |
|------|-----------|-------|------|
| Fase 1 | Proposta do projeto + app com duas telas | Aula 20 + início do Bimestre 3 | [fase1.md](https://github.com/Etec-Bento-Quirino/Programacao-Aplicativos-Moveis-I/blob/main/modulo-08-projeto-final/fase1.md) |
| Fase 2 | Formulário + persistência com AsyncStorage | 14/09/2026 | [fase2.md](https://github.com/Etec-Bento-Quirino/Programacao-Aplicativos-Moveis-I/blob/main/modulo-08-projeto-final/fase2.md) |
| Fase 3 | SQLite + CRUD completo | 19/10/2026 | [fase3.md](https://github.com/Etec-Bento-Quirino/Programacao-Aplicativos-Moveis-I/blob/main/modulo-08-projeto-final/fase3.md) |
| Fase 4 | Versão final + apresentação | 16/11/2026 | [fase4.md](https://github.com/Etec-Bento-Quirino/Programacao-Aplicativos-Moveis-I/blob/main/modulo-08-projeto-final/fase4.md) |

## Aulas Relevantes

- [Aula 03 - Layouts e componentes](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-02-fundamentos-ui/aula-03-layouts-e-componentes/)
- [Aula 04 - Texto, botões e ícones](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-02-fundamentos-ui/aula-04-texto-botoes-e-icones/)
- [Aula 05 - Listas e ScrollView](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-02-fundamentos-ui/aula-05-listas-e-scrollview/)
- [Aula 06 - Navegação entre telas](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-03-navegacao-formularios/aula-06-navegacao-entre-telas/)
- [Aula 07 - Formulários](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-03-navegacao-formularios/aula-07-formularios/)
- [Aula 11 - Estado com hooks](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-04-estado-gerenciamento/aula-11-estado-com-hooks/)
- [Aula 13 - AsyncStorage](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-04-estado-gerenciamento/aula-13-asyncstorage/)
- [Aula 14 - SQLite introdução](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-05-banco-dados/aula-14-sqlite-introducao/)
- [Aula 15 - SQLite CRUD](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-05-banco-dados/aula-15-sqlite-crud/)
- [Aula 16 - SQLite + formulários](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-05-banco-dados/aula-16-sqlite-formularios/)
- [Aula 18 - Boas práticas de UX](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/modulo-07-boas-praticas-ux/aula-18-boas-praticas-de-ux/)

---

> [!TIP]
> Material completo do curso: [PAM I](https://etec-bento-quirino.github.io/Programacao-Aplicativos-Moveis-I/)


---

## Colaboração por integrante

> *Excluídos: commits do professor Jackson Sá (wendelmax), `github-actions[bot]` e `dependabot[bot]`. Contagem com base em `git log --no-merges`.*

| # | Integrante | Commits | Participação |
|---|------------|---------|--------------|
| 1 | Bianca Noronha | 4 | 100.0% ████████████████████ |

**Total de commits considerados:** 4

## Recurso do dispositivo

Justificativa de não uso: nesta versão o app não utiliza recurso nativo do dispositivo
(notificação, câmera ou localização). Priorizei consolidar o SQLite como única fonte de dados
e o CRUD completo (listar, filtrar, adicionar, editar e excluir), com loading, estado vazio e
tratamento de erros. Como melhoria futura, planejo lembretes de estudo com notificações locais
(expo-notifications).

## Como rodar e testar

1. Instalar as dependências: `npm install`
2. Iniciar o projeto: `npx expo start`
3. Abrir no Expo Go (escanear o QR code) ou no emulador Android.
4. Para gerar o APK: `eas build -p android --profile preview`

Os dados ficam salvos em SQLite (`expo-sqlite`), no arquivo `src/database/db.ts`.
