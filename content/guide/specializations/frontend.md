---
weight: 700
title: "Front end"
description: "Describes architecture aspects relevant for Front end."
icon: "article"
date: "2024-11-25T10:59:20+02:00"
lastmod: "2024-11-25T10:59:20+02:00"
draft: false
toc: true
---
## Front-End Architecture overview

Front-end architecture is an important part of user-facing application development. It involves the choice of structure, components, and technologies used to build the user interface. Understanding the different types of front-end applications and their architectural patterns is essential to creating efficient, scalable, and maintainable applications.

### Types of Front-End Applications
Front-end applications can be broadly categorized into four types:
* **Web Applications** \
   These applications run in a web browser and are accessed via URLs. They range from static websites to more dynamic, interactive web apps.
  * MPA is a traditional web application model where each interaction or user request results in the loading of a new HTML page from the server.
  * SPA is a type of Web application that loads a single HTML document and then dynamically updates the page to provide a smooth, application-like user experience.
  * PWA is a Web application that mimics the functionality of native mobile apps (can work offline, send push notifications, etc.), but is built using common web technologies and works on any platform with a PWA-compatible browser.

* **Desktop Applications** \
  These applications run directly on a user's desktop or laptop. They offer a more native-like experience and can access local resources.

* **Mobile Applications** \
  These applications are designed to run on mobile devices, such as smartphones and tablets. They can be native apps built using platform-specific frameworks or hybrid apps that combine web technologies with native components.

* **Other Types**
  * Embedded Systems (smart TVs, cars, and IoT devices)
  * Game Development (web technologies (HTML5 games) or engines like Unity or Unreal Engine)
  * Virtual and Augmented Reality (Immersive experiences that blend the digital and physical worlds)

### Patterns of a Front-End Application
When building a front-end application, you need to decide on an architectural structure that suits the project’s goals and scale. Different structures influence how components interact, how the application is maintained, and how it can be scaled in the future. Common front-end architectural structures include:
* **Micro Front-End**: In this architecture, an application is split into smaller, independently deployable front-end modules. Each module (or micro front-end) can be built using different frameworks or technologies. This structure is ideal for large applications with distributed teams, as each micro front-end can be developed and maintained separately, improving scalability and team productivity.
* **Monolith**: A monolithic architecture involves building the entire application as a single unit. While simpler to implement, it can become difficult to maintain and scale as the application grows. On the other hand, Monolith can be an ideal solution for prototyping and small tools.
* **Micro Kernel**: Also known as plug-in architecture, this approach separates the core functionality of an application from the plugins or modules. The core manages common tasks, while individual plugins handle specific features. This architecture is flexible and allows new functionality to be added without modifying the core, making it a great fit for applications that require frequent updates or custom features.
* **Layered**: Layered architecture organizes an application into logical layers, with each layer having a distinct responsibility. Popular patterns include:
  * **MVC (Model-View-Controller)**: A classic pattern where data (Model), UI (View), and interaction (Controller) are decoupled.
  * **MVP (Model-View-Presenter)**: Separates the UI logic from business logic, improving maintainability.
  * **MVVM (Model-View-ViewModel)**: Similar to MVC but with better separation of the UI and business logic. Common in frameworks like Angular and React.

### Key Parts of a Front-End Application
A front-end application consists of various parts that work together to provide a cohesive user experience. Here are the main components:
* **Structure of the Application** \
The overall structure refers to how the codebase is organized. It includes directories, modules, and how different parts of the app interact. A well-structured application makes it easier to navigate the code, enforce consistency, and scale efficiently.

* **Frameworks** \
Front-end frameworks provide the backbone for building applications. Popular frameworks include React, Angular, and Vue.js, each offering different strengths in terms of component management, state handling, and tooling. The choice of framework influences the structure of your app and its development workflow.

* **Component Libraries** \
Component libraries help speed up development by providing reusable UI components. Popular examples include Material-UI, Bootstrap, and Ant Design. These libraries ensure consistent design and can be customized to fit the app's needs.

* **Communication with Back-End** \
Effective front-end communication with the back-end is critical for a responsive and functional app. This typically involves RESTful APIs or GraphQL for querying and manipulating data. Modern frameworks also facilitate state management and API interaction through libraries like Axios, Fetch API, or Apollo Client for GraphQL.

## Recommended Reading

#### Web Resources

* [Front-end Architecture: In-Depth Analysis, Best Practices, and Insights](https://elitex.systems/blog/front-end-architecture-in-depth-analysis/)
* [A Comprehensive Guide to Modern Frontend Architecture Patterns](https://medium.com/@johnadjanohoun/a-comprehensive-guide-to-modern-frontend-architecture-patterns-eb39debbd503)
* Mike Potel, [MVP: Model-View-Presenter The Taligent Programming Model for C++ and Java](https://www.wildcrest.com/Potel/Portfolio/mvp.pdf)
* [Modularizing React Applications with Established UI Patterns Juntao QIU](
https://martinfowler.com/articles/modularizing-react-apps.html)

#### Books
* Luca Mezzalira, [Building Micro-frontend](https://www.oreilly.com/library/view/building-micro-frontends/9781492082989/)
  * What's the answer to today's increasingly complex web applications? Micro-frontends. Inspired by the microservices model, this approach lets you break interfaces into separate features managed by different teams of developers. With this practical guide, Luca Mezzalira shows software architects, tech leads, and software developers how to build and deliver artifacts atomically rather than use a big bang deployment.
  You'll learn how micro-frontends enable your team to choose any library or framework. This gives your organization technical flexibility and allows you to hire and retain a broad spectrum of talent. Micro-frontends also support distributed or colocated teams more efficiently. Pick up this book and learn how to get started with this technological breakthrough right away.
* Lydia Hallie and Addy Osmani, [Learning Patterns](https://www.patterns.dev/book)
