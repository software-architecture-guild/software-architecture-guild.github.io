---
weight: 114
title: "Security"
description: "This article explains what is Security and how to achieve it."
icon: "article"
date: "2025-10-14T00:00:00+01:00"
lastmod: "2025-10-14T00:00:00+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Security is a core quality attribute concerned with protecting a system and its data from unauthorized access, use, disclosure, disruption, modification, or destruction. It is especially critical for systems handling sensitive information or operating in distributed environments, where exposure surfaces and failure modes increase.

## What Security Means

Security ensures that a system’s assets and services are protected against malicious attacks and accidental misuse while maintaining functionality. Practically, this means safeguarding information and operations while keeping legitimate workflows intact.

## Key Security Properties

These properties describe what “being secure” entails and give a shared language for requirements and evaluation:

- **Confidentiality**: Information is not disclosed to unauthorized entities.  
- **Integrity**: Data and system resources are protected from unauthorized modification.  
- **Availability**: Services and resources remain accessible to authorized users.  
- **Authentication**: The system verifies the identities of interacting entities.  
- **Authorization**: Authenticated entities can access only permitted resources or operations.  
- **Accountability**: Actions are tracked so responsible users and operations can be identified.

## Security General Scenario

A security scenario frames how the architecture should behave when confronted with threats:

- **Stimulus**: An attack or misuse attempt (for example, unauthorized access or data tampering).  
- **Source of stimulus**: Malicious actors or accidental misuse.  
- **Environment**: Operational context such as a distributed deployment or a high-security zone.  
- **Artifact**: Targeted assets such as data, services, or processes.  
- **Response**: Defensive action such as deny, log, alert, or isolate.  
- **Response measure**: Effectiveness indicators such as detection counts, mitigation speed, or damage extent.

## Architectural Tactics for Security

Security tactics shape how the system prevents, detects, and recovers from attacks. Grouping them clarifies intent and helps select combinations that fit the scenario.

- **Resistance**: Prevent attacks from succeeding.\
  Examples: authentication (passwords, biometrics, tokens); authorization (role-based access control); data encryption at rest and in transit; firewalls to restrict network access.  
- **Detection**: Identify attacks as they occur.\
  Examples: intrusion detection systems that monitor traffic and behavior; auditing and logging to trace actions; checksums and hashing to verify data integrity.  
- **Recovery**: Mitigate damage and restore service.\
  Examples: backups to enable data restoration; failover to redundant systems; reconfiguration to isolate compromised components and maintain functionality.

## A Practical Design Checklist

This checklist turns security intent into concrete design work and validation steps:

- **Identify threats**: Perform threat modeling to anticipate risks such as SQL injection, cross-site scripting, and denial-of-service.  
- **Define security requirements**: Specify expectations for confidentiality, integrity, availability, authentication, authorization, and accountability.  
- **Apply security best practices**: Use secure coding standards, avoid hardcoded credentials, and patch vulnerabilities regularly.  
- **Plan for incident response**: Establish how to detect, respond, and recover when an incident occurs.  
- **Ensure usability**: Keep mechanisms usable so legitimate users are not driven to circumvent controls.  
- **Test for security**: Exercise the design with penetration testing, fuzz testing, and vulnerability scans.

## Navigating Trade-offs

Security interacts with other attributes and constraints, so choices must be balanced:

- **Performance**: Encryption and repeated checks can add overhead.  
- **Usability**: Complex access flows can frustrate users and reduce adoption.  
- **Cost**: Stronger protections often require additional development, hardware, and maintenance.  
- **Modifiability**: Security constraints can make system changes more complex.

## Security in Practice

These contexts highlight how the properties, scenarios, and tactics come together:

- **E-commerce applications**: Secure payment processing, encryption of user data, and protection against fraud.  
- **Healthcare systems**: Safeguards that protect sensitive patient information and support required compliance measures.  
- **Banking systems**: Strong authentication (such as two-factor) and robust fraud detection.

## Conclusion

Security protects system assets and services from malicious attacks and accidental misuse while preserving essential functionality. Effective designs combine resistance, detection, and recovery tactics aligned to clear threat scenarios, supported by best practices, incident response planning, and targeted testing. Because security decisions affect performance, usability, cost, and modifiability, architects must balance protections with practical constraints and keep mechanisms usable so they are consistently applied.

## Recommended Reading

#### Books

- Bass, Len, Paul Clements, and Rick Kazman. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.  
  - **Chapter 9: Security**\
    Informed this article’s definition and key properties, general scenario structure (stimulus, source, environment, artifact, response, response measure), architectural tactics grouped as resistance, detection, and recovery, the design checklist, trade-offs, and practice examples.
