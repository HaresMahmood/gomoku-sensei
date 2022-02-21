# Gomoku Sensei AI
#### Designing a dynamic game-playing AI.

<details>
    <summary> Table of Contents </summary>
    <ol> 
        <li> <a href="#overview"> Overview </a> </li>
            <ol>
                <li> <a href="#aims--objectives"> Aims & objectives </a> </li>
            </ol>
        <li> <a href="#installation"> Installation </a> </li>
        <li> <a href="#resources"> Resources </a> </li>
        <li> <a href="#acknoledgements"> Acknowledgements </a> </li>
            <ol>
                <li> <a href="#frameworks--technologies"> Frameworks & technologies </a> </li>
            </ol>
    </ol>
</details>

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/HaresMahmood/gomoku-sensei)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/HaresMahmood/gomoku-sensei)
[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://opposite-brain-cb0.notion.site/CS408-1e5c4e3c9b0d4291b6a968855d9270e9)

![Screenshot](./res/screenshot.png)

## Overview
This software was developed as a fourth-year dissertation project for the University of Strathclyde.

### Aims & objectives

The idea of what a game constitues is ever-evolving; from ancient board games to modern-day video game, games have manifeested as powerful tools in education, healthcare and even politics. Keeping this in mind, it is easy to forget why we play in the first plac: as an enjoying, engaging and fun pastime. With the vast majority of research historically going into creating the most powerful AI possible - a so-called "_Killer AI_".

The result of the research done as part of this project is the _Gomoku Sensei_ AI. The AI based on the [Monte Carlo Tree Search](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search) algorithm. The goal was to adapt this algorithm in such a way that no additional domain-specific knowledge would be required by the AI to scale itself. The novel approach discovered during in this research, dubbed _<ins> Multi-dimensional Monte Carlo Search Tree </ins>_ (MD-MCTS), <ins> biases </ins> the search towards game nodes with a higher average game length. 

Another major component the project was is the design and implementaiton of a fluid, easy-to-use user interface (UI). The UI is the medium through which users will interact with the game during the evalutation-phase, which means it is vital for the game's UI to be simple and easy, yet at the same time fun to use.

## Installation
Please refer to [instructions on setting up a local test server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) if you wish to host and run the project locally. Alternatively, visit the [web application](https://haresmahmood.github.io/gomoku-sensei/) hosted on GitHub Pages to run the software on any modern browser, as well as to install it as a [Progressive Web App](https://web.dev/progressive-web-apps/) (PWA).

## Resources
For additional details, as well as the development process for this project, visit this [Notion Workspace](https://opposite-brain-cb0.notion.site/CS408-1e5c4e3c9b0d4291b6a968855d9270e9). The paper written as part of this project can be read [here](https://drive.google.com/file/d/1mnz7TNERF8jVEQjdcrgVpBM5L8kvzhrm/view?usp=sharing). The UI was designed in Figma; an interactive prorotype can be found on [this page](https://www.figma.com/proto/uhH23aRZvGQsOViY0bnnVP/Gomoku?node-id=64%3A19).

## Acknowledgements
I want to thank [Dr. John Levine](https://www.strath.ac.uk/staff/levinejohndr/) for supervising, and providing his invaluable support and guidance troughout this project.

### Frameworks & technologies
* [Material Design 3](https://m3.material.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [JQuery](https://jquery.com/)
* [PWA technology](https://web.dev/progressive-web-apps/)
* [GitHub Pages](https://pages.github.com/)
* [Jest](https://jestjs.io/)
