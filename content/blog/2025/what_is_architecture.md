---
title: "What is Software Architecture? Opinion"          # Name of the blog
description: |
  I believe everyone agrees with Ralph Johnson’s definition of software architecture: "Architecture is about the important stuff. Whatever that is". While I fully agree with this definition, I think adding more clarity would help better understand what it means.

date: "2025-02-09"          # Data post is published
image: ""          # Displayed when referenced in listing pages
tags:            # Used for SEO optimization and browsing across the site.
- "Software Architecture"
- "Fundamentals"
externalLink: ""      # Full URL to override listing links to an external page
authors:
- "ilya-hardzeenka.md"            # An array of authors of the post (filenames in content/authors).
draft: false
---

**This blog explores themes covered in *[Fundamentals -> Understanding Architecture]({{% relref "/guide/architecture/fundamentals/understanding-architecture/" %}})* in our Guide.**

## Construction vs Software Engineering

Many people compare software architecture to construction, and I am not the first to do so. I truly believe they have a lot in common. Learning from construction, which is like an "older brother" to software architecture, can help us understand it better.

Here are some simple definitions from Wikipedia:

* **Engineering** – *Engineering is the application of science and math to solve problems. It includes designing, building, and maintaining machines, structures, and systems. The main branches are chemical, civil, electrical, and mechanical engineering.*
* **Civil Engineering** – *Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewage systems, pipelines, structural components of buildings, and railways.*
* **Architecture** – *Architecture is the art and technique of designing and building, as distinguished from the skills associated with construction. It involves the process and product of sketching, conceiving, planning, designing, and constructing buildings or other structures. Architectural works are often perceived as cultural symbols and as works of art.*
* **Construction Engineering** - *Construction engineering is a professional subdiscipline of civil engineering that deals with the designing, planning, construction, and operations management of infrastructure such as roadways, tunnels, bridges, airports, railroads, facilities, buildings, dams, utilities, and other projects.*

From these definitions, I’ve learned two key things:

### Engineering, Design, and Architecture similarities

While engineering, design, and architecture are interconnected, they have distinct roles:

* **Design** is the process of conceptualizing and planning a structure, system, or product. It focuses on solving a problem creatively and defining the overall form, function, and experience of the final result.
* **Architecture** is a specialized form of design that deals with the structure and organization of complex systems. It establishes the fundamental principles, high-level structure, and key constraints that define the system.
* **Engineering** is the process of turning design and architecture into reality by applying scientific and mathematical principles. It involves detailed planning, calculations, and implementation to ensure the system is functional, efficient, and practical.

In construction, **architects** create the vision for a building, ensuring it meets aesthetic, functional, and spatial requirements. **Engineers** then make that vision physically possible by designing the structural, mechanical, electrical, and civil systems that allow for safe and efficient construction. The same relationship exists in software: **software architects** define the system's structure and principles, while **software engineers** translate that into working code, handling the technical details of performance, scalability, and reliability.

Good architecture must respect engineering constraints, and sound engineering must refine and optimize the architectural vision.

> **Without architecture, engineering lacks direction.**\
> **Without engineering, architecture remains theoretical.**

### Environmental differences

The key difference is the **nature of the environments** in which construction and software engineering operate:

* **Construction operates in a complicated but predictable environment.** The materials, forces, and structural requirements follow well-understood physical laws. While construction projects involve many moving parts, they can be planned in advance with a high degree of certainty. Once a building is constructed, it remains largely unchanged for decades, and modifications are costly.
* **Software operates in a complex, fast-changing environment.** Unlike construction, software is built in an environment where requirements, technologies, and user needs are constantly evolving. This means software designs must be adaptable, flexible, and capable of handling uncertainty. A software system that cannot evolve is likely to become obsolete quickly.

Because of these differences, construction engineering focuses on **precision, stability, and durability**, whereas software engineering prioritizes **adaptability, scalability, and resilience**. While construction seeks to avoid change after implementation, software must be designed expecting continuous change and iteration.

This fundamental contrast is why software architecture must be flexible and modular, allowing for ongoing adjustments without needing a complete rebuild — something rarely possible in physical construction.

## Story of one "software-like construction."

One of the key skills of a software architect is the ability to explain complex concepts using simple, real-life examples. Let me illustrate how software architecture and development can be visualized and explained through construction terms.

### Beginning

ABC company decides to construct a building to rent out commercial spaces. After conducting market research, they identify a suitable location. However, at this early stage, it is difficult to predict exactly how many tenants will occupy the space or what types of businesses will operate there.

To move forward, an architect must make some reasonable assumptions to create a practical design:

* The most common use for commercial spaces will be offices, so the design should primarily accommodate office layouts.
* The average company size in the area is about **100 employees**, so spaces should be designed to fit businesses of this scale.
* To maximize flexibility, the building will have **two office spaces per floor**, allowing for different tenant needs.
* As an initial plan, construction will start with **five floors**, with the potential to expand if demand grows.

The business team reviews these parameters, finds them reasonable, and gives approval. With these assumptions agreed upon, construction begins.

{{< image src="../../../images/blog/2025/fundamentals_architecture/stage-1.drawio.png" alt="Stage 1" >}}

### So far so good

Six months later, **three out of five floors** are built and fully operational. The first tenants are already moving in, and negotiations with potential new tenants are ongoing. Seeing the strong demand, the business decides to **increase the building’s height to 10 floors**.

While this expansion wasn’t originally planned, the architect confirms that the foundation is strong enough to support up to 10 floors. However, he warns the business that **12 floors is the absolute maximum** the current foundation can handle.

If the company anticipates needing more space beyond that, it should consider starting a new building immediately to avoid future bottlenecks. However, due to budget constraints, the business has decided to stick with 10 floors and revisit expansion plans if demand continues to grow.

{{< image src="../../../images/blog/2025/fundamentals_architecture/stage-2.drawio.png" alt="Stage 2" >}}

### We have to win this customer

With **six out of ten floors** already built, a sales representative rushes into the architect's office, holding a stack of papers.

**Sales Rep:** *"I just got off the phone with BCA. They want to rent space from us! However, they have specific requirements: they need to fit 500 employees on a single floor, and they want a food court on the ground floor. It’s not essential, but they’d also prefer to have a laundry service and a barbershop inside the building."*

**Architect:** *"But our floors are designed to handle 200 people max. We can’t just squeeze 500 people in there — it’s not safe."*

**Sales Rep:** *"Listen, this is a once-in-a-lifetime opportunity. We have to win this customer. Please, find a solution."*

**Architect:** *"Alright, let’s go through the other requirements. The food court — I get it. We overlooked that, and it makes sense. But laundry and a barbershop? Come on. There’s a mall just 100 meters down the street that has all of that."*

**Sales Rep:** *"Yeah, but that’s exactly what attracted them to us. Their current office also has a Mall nearby, and they want to consolidate everything in one building. They don’t want their employees walking between different locations for basic needs. If we can provide everything under one roof, it’ll be a huge competitive advantage for us!"*

**Architect (sighs):** *"Alright… Let me see what I can do."*

{{< image src="../../../images/blog/2025/fundamentals_architecture/stage-3.drawio.png" alt="Stage 3" >}}

### Security Requirements

The building is **complete and fully populated**, and the business now has money to invest. Suddenly, a high-priority request comes in from one of the tenants.

##### Phone call to the building manager

**Tenant:** *"Hey, we’re about to sign a contract with a government organization, but as part of the agreement, we must provide a separate office space with its own entrance, security card system, and other security controls. We need your confirmation ASAP — either it’s possible, or we’ll have to look for another location."*

**Building Manager:** *"Well, we don’t have that setup right now, but we can definitely propose a solution. However, rent will be higher for these modifications."*

**Tenant:** *"Absolutely, cost is not an issue. This contract is essential for us, and we’re ready to invest to make it happen."*

**Building Manager:** *"Great! Let me check with my team, and I’ll call you back in a few hours."*

**Tenant:** *"Awesome!"*

##### 5 Minutes Later – In the Architect’s Office

**Building Manager:** *"We need to create a new office space for 200 people, with a separate entrance and a security system that meets government standards."*

**Architect:** *"Do we have time to analyze this properly? I’m not even sure what ‘government security standards’ means in this case."*

**Building Manager:** *"I need to call them back in a few hours with a yes or no."*

**Architect:** *"Fine. Give me two hours, and I’ll figure something out."*

**Building Manager:** *"Thanks, man. You’re saving my day!"*

##### 2 Hours Later

**Architect:** *"Alright, it’s not as complicated as I thought. We already have available space above the 500-person office. We can build a separate elevator leading directly to that space and install a dedicated security system to meet the requirements. It’s doable — but it’s going to cost a lot of money."*

**Building Manager:** *"Money isn’t a problem — they’re willing to pay extra for security. This is great. Thanks, man!"*

{{< image src="../../../images/blog/2025/fundamentals_architecture/stage-4.drawio.png" alt="Stage 4" >}}

### New Day, New Challenges

The business is growing, and with that comes **new opportunities and challenges** for the architect.

1. The company has decided to enter a **new market** — storage spaces. Many of the current tenants have already expressed interest in renting storage units within the building. The goal is to upsell existing customers while attracting new ones.

2. What started as a single **secure office space** has now grown to occupy **five floors**. Given the increasing demand for high-security spaces, it's clear that the company will soon need to extend the security section further. However, this raises new questions:

    * Should they dedicate an entire section of the building to security customers?
    * Will the current foundation support further expansion, or is it time to consider building a separate secure facility?

3. The **enterprise customer on the top floor** has been a great tenant, and now they want to **expand to 500 employees** — similar to the large office already built earlier. However, there’s a catch:

    * They do not want to leave the top floor.
    * The current layout does not support an expansion of that size on the top floor alone.
    * The only way to add more space at the top might involve structural changes, a rooftop expansion, or redistributing office layouts below.

With these new challenges piling up, the architect’s job is becoming more complex and dynamic every day. Each decision must balance structural feasibility, cost, business needs, and future scalability — making the architect's role more crucial than ever.

{{< image src="../../../images/blog/2025/fundamentals_architecture/stage-5.drawio.png" alt="Stage 5" >}}

### A Game-Changing Day

The architect’s day started off great — a fresh cup of coffee, a smooth commute, and a clear sky, promising exciting opportunities ahead. But something told him that today would be even more interesting than usual — and he was right.

An hour into the morning, he received an **invitation to lunch** with the **VP of Exponential Growth**.

##### Over Lunch

**VP:** *"You know, growth is becoming a real challenge with our current setup. Every time we find a new opportunity, we have to wait for you guys to build another office floor or make adjustments. Is there any way to speed things up?"*

**Architect:** *"Well, I see two options here.*

*Option 1 is to build Ahead of Demand. We can start building office spaces in advance with minimal requirements so they can be adapted later based on customer needs. However, that would require a significant upfront capital investment.*

*Another challenge is that our current land does not have enough space for unlimited growth. With minimal investment, we can fit about five more 100-person offices.*

*But if we want to scale further, I would need to reinforce the load-bearing structures on all floors so we can build higher.*
*This is possible, but it will take a lot of time and money and won’t help us scale faster anytime soon."*

**VP:** *"That doesn’t sound like a great solution. I hope the second option is better."*

**Architect:** *"Yes, it is. I think we need to move to the Cloud."*

**VP:** *"What? How can a building be moved into the Cloud?"*

**Architect:** *"Well, it doesn’t mean we’ll have a flying building — though that would be cool. Instead, it means making our office spaces movable and flexible.*

*There are companies — Cloud Providers — who can supply all the infrastructure we need, like roads, transportation, power, and utilities. Instead of owning and managing everything ourselves, we would rent from them and focus purely on expanding our business.*\
*Hosting our offices in the Cloud will cost more, and we will need to break our current building into smaller, movable sections so it can be deployed anywhere."*

**VP:** *"Hmm… sounds interesting. What about our scaling problem?"*

**Architect:**
*"That’s the best part! Buildings in the Cloud are not physically attached to the ground — they can actually move and expand on demand.*

*So if we need to add more office spaces, we simply request additional capacity from the Cloud Provider, and they will make room for us. They also do capacity planning and often pre-scale their infrastructure, meaning there’s already space available before we even need it.*\
*Another huge benefit is that we can create a building template — a standard office design. Then, whenever we need a new office, we just deploy it in days instead of months."*

**VP:** *"That’s music to my ears! What’s the catch?"*

**Architect:**
*"As I said, moving and hosting will cost money. This is a big strategic decision, and we will need to overcome challenges during the transition. But once we’re there — believe me, you will love it."*

**VP:** *"I’m onboard. Can you put together a presentation for the board? I’ll start warming them up."*

**Architect (smiling):** *"Absolutely! Let’s make this happen."*

The architect walked out of the meeting feeling energized and inspired. Today wasn’t just another day — it was the **beginning of something huge.**

{{< md-lint "<!-- markdownlint-disable MD026 -->" >}}

### To be continued...

{{< md-lint "<!-- markdownlint-enable MD026 -->" >}}

## In Conclusion

I'm not sure about you, but I was laughing the entire time while writing this ridiculous story — and even more while drawing the pictures for it.

As funny as it is, this is actually a pretty typical "week" for a software architect. The reality is that it’s nearly impossible to predict what the business will need even five minutes from now. And blaming the business for not knowing either? Pointless. They don’t control market shifts, customer demands, or sudden opportunities — they just have to react.

Of course, I recognize that some foundational software can still be built using waterfall methodologies, which align well with the structured nature of construction. However, for most of us, agile isn’t just a buzzword — it’s a necessity. We have to design **agile architectures** that can evolve alongside the **ever-changing needs** of the business.

Here are a few more quotes to complete my thought:

> **Every system has an architecture, whether or not it is documented and understood.**\
> — *Rozanski & Woods, Software Systems Architecture*
\
\
> **"If you think good architecture is expensive, try bad architecture."**\
> — *Brian Foote & Joseph Yoder* (Referenced in *Clean Architecture* by Robert C. Martin)

Architecture is about **the important stuff** — and what’s important depends entirely on the business case. The real job of an architect is to **figure out what truly matters** and design a **structure that supports it.**

Hope this helped! 🚀
