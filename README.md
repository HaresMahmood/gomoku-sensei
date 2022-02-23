# Gomoku Sensei AI
#### Designing a dynamic game-playing AI.

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/HaresMahmood/gomoku-sensei)
![License Shield](https://img.shields.io/github/license/HaresMahmood/gomoku-sensei)
[![PWA Shields](https://www.pwa-shields.com/1.0.0/series/classic/white/purple.svg)](https://haresmahmood.github.io/gomoku-sensei/)
[![Figma](https://badgen.net/badge/icon/Figma%20Prototype/orange?icon=https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg&label)](https://www.figma.com/proto/uhH23aRZvGQsOViY0bnnVP/Gomoku?node-id=64%3A19)
[![Notion](https://badgen.net/badge/icon/Notion%20Workspace/black?icon=https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg&label)](https://opposite-brain-cb0.notion.site/CS408-1e5c4e3c9b0d4291b6a968855d9270e9)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/HaresMahmood/gomoku-sensei)

![Screenshot](./res/screenshot.png)

<details>
    <summary> Table of Contents </summary>
    <ol> 
        <li> <a href="#overview"> Overview </a> </li>
            <ol>
                <li> <a href="#aims--objectives"> Aims & objectives </a> </li>
                <li> <a href="#gomoku"> Gomoku </a> </li>
            </ol>
        <li> <a href="#development"> Development </a> </li>
            <ol>
                <li> <a href="#codebase-structure"> Codebase structure </a> </li>
                <li> <a href="#installation"> Installation </a> </li>
                <li> <a href="#compilation"> Compilation </a> </li>
            </ol>
        <li> <a href="#resources"> Resources </a> </li>
        <li> <a href="#acknowledgements"> Acknowledgements </a> </li>
            <ol>
                <li> <a href="#frameworks--technologies"> Frameworks & technologies </a> </li>
            </ol>
    </ol>
</details>

## Overview
This software was developed as a fourth-year dissertation project for the University of Strathclyde.

### Aims & objectives

The idea of what a game constitues is ever-evolving; from ancient board games to the modern-day video game, games have manifested as powerful tools in education, healthcare and even politics. Keeping this in mind, it is easy to forget why we play them in the first place: as an enjoying, engaging and fun pastime. With the vast majority of research historically going into creating the most powerful AI possible - a so-called "_Killer AI_", AI opponents are often the opposite of fun. Hence, there is a need for AI that scales its difficulty to match that of its opponent, no matter the opponent's skill-level.

The result of the research done as part of this project is the _Gomoku Sensei_ AI, which is based on the [Monte Carlo Tree Search](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search) algorithm. The goal was to adapt this algorithm in such a way that no additional domain-specific knowledge would be required by the AI to scale itself. The novel approach discovered during in this research, dubbed _<ins> Multi-dimensional Monte Carlo Search Tree </ins>_ (MD-MCTS), which <ins> biases </ins> the search towards game nodes with a higher average game length.

### Gomoku

In order to test the AI, a game with perfect information had to be chosen. _Gomoku_, also known as Five in a Row, was picked as the best candidate out of various board games. Details about this decision can be found [here](https://opposite-brain-cb0.notion.site/Game-choice-735efe566bef40b08ebfc9a0d75389ff).

The rules of the game are simple: two players take turns placing black and white tokens on a board whilst trying to chain these pieces five in a row, either horizontally, vertically or diagonally. Gomoku can be classified as an [_m, n, k_-game](https://en.wikipedia.org/wiki/M,n,k-game). During the process of development, it was found that "pure" Monte Carlo Tree Search performs poorly on a traditional 15 by 15 _Gomoku_-board. Instead, a 7 by 7 board was used for the purposes of this experiment.

## Development

### Codebase structure

```
.
├── dist                      · JavaScript compiled from TypeScript. Mirrors \src\ts\.
├── res                       · Resources, such as images and icons.
└── src                       · The website's source code.
    ├── css                      · Styling for all HTML pages, organized from high- to low-level.
    ├── html                     · All HTML pages, both high- and low-level.
    └── ts                       · Logic and back-end of the software.
        ├── controller              · Controllers connecting models and views, MVC design pattern.
        ├── factory                 · Classes following the factory method design pattern.
        ├── model                   · Part of the MVC. In practice, defines games as a Markov decision process.
        ├── player                  · Defines a hierarchy of player-classes, including various AI players.
        ├── script                  · Files referenced directly by HTML pages. Instantiate MVC classes.
        ├── utility                 · Common utility classes used extensively in other parts of the system.
        └── view                    · Part of the MVC. Utilises JQuery to manipulate the DOM.
```

### Installation
Please refer to [instructions on setting up a local test server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) if you wish to host and run the project locally. Alternatively, visit the [web application](https://haresmahmood.github.io/gomoku-sensei/) hosted on GitHub Pages to run the software on any modern browser, as well as to install it as a [Progressive Web App](https://web.dev/progressive-web-apps/) (PWA).

### Compilation
The code located in the `dist` directory is JavaScript, compiled from TypeScript located in `src/ts`. TypeScript is a strongly-typed language, also allowing for additional object oriented features to be used on top of what JavaScript already used. If making any changes to the TypeScript code, any changed files must be re-compiled. Please refer to the [official TypeScript page](https://www.typescriptlang.org/) for instructions on downloading, running and using TypeScript.

## Resources
For additional details, as well as the development process for this project, visit this [Notion Workspace](https://opposite-brain-cb0.notion.site/CS408-1e5c4e3c9b0d4291b6a968855d9270e9). The paper written as part of this project can be read [here](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/61ec2c18-660e-46ec-8590-3e2e8ce3d316/progress_report.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220222T001249Z&X-Amz-Expires=86400&X-Amz-Signature=0313cab7c63a706c3e7285a00cef6f1991de20f2b31157649f4a4721556398cd&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22progress%2520report.pdf%22&x-id=GetObject). The UI was designed in Figma; an interactive prorotype can be found at [this page](https://www.figma.com/proto/uhH23aRZvGQsOViY0bnnVP/Gomoku?node-id=64%3A19).

## Acknowledgements
I want to thank [Dr. John Levine](https://www.strath.ac.uk/staff/levinejohndr/) for supervising, and providing his invaluable support and guidance troughout this project.

### Frameworks & technologies
| Resource                                                | Usage                                                                                                                                          |
|---------------------------------------------------------|--------------------------------------|
| [Material Design 3](https://m3.material.io/)            | Guidelines for the design and creation of the UI.                                                                                              |
| [TypeScript](https://www.typescriptlang.org/)           | Back-end of system, particularly the model (the game) and the several AI agents.                                                               |
| [JQuery](https://jquery.com/)                           | UI animations, particularly navigating from page-to-page.                                                                                      |
| [PWA technology](https://web.dev/progressive-web-apps/) | Making the app installable on multiple platforms. The [PWA Builder](https://www.pwabuilder.com/) extension for VS Code was used in particular. |
| [GitHub Pages](https://pages.github.com/)               | Hosting the web app.                                                                                                                           |
| [Jest](https://jestjs.io/)                              | Unit testing.                                                                                                                                  |
| [Zapsplat](https://www.zapsplat.com/)                   | In-game sound-effects.                                                                                                                          |
