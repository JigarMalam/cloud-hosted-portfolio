# ⚡ Jigar Malam | DevOps & Cloud Engineering Portfolio

<div align="center">

[![AWS Certified](https://img.shields.io/badge/AWS-Certified%20Cloud%20Practitioner-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Jenkins%20%7C%20GitHub%20Actions-2496ED?style=for-the-badge&logo=jenkins&logoColor=white)](https://github.com/)
[![IaC](https://img.shields.io/badge/IaC-Terraform%20%7C%20Ansible-623CE4?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![Docker](https://img.shields.io/badge/Containers-Docker%20%7C%20K8s-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<br />

**A sleek, modern, interactive DevOps & Cloud Engineering portfolio featuring real-time terminal emulation, 3D interactive graphics, and animated CI/CD workflows.**

[Explore Live Demo](https://jigarmalam.github.io/) • [Report Bug](https://forms.gle/xYgzTjEwFk7v3YRc9) • [Request Feature](https://forms.gle/iebquFn8rvBctDfS7)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Interactive Terminal (Deploy Jigar)](#-interactive-terminal-deploy-jigar)
- [Featured Projects Highlighted](#-featured-projects-highlighted)
- [Project Structure](#-project-structure)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Deployment Guide](#-deployment-guide)
- [Connect & Contact](#-connect--contact)

---

## 🚀 Overview

This repository hosts the source code for **Jigar Malam's DevOps & Cloud Portfolio**. Designed with a **terminal-first, cyberpunk-meets-enterprise aesthetic**, this portfolio showcases hands-on competencies in cloud infrastructure, container orchestration, Infrastructure as Code (IaC), and automated CI/CD pipelines.

---

## ✨ Key Features

- **🚀 Interactive "Deploy Jigar" Modal**: Emulates a real-time Bash deployment script (`./deploy-jigar.sh`) simulating AWS connection, container spin-up, Terraform state validation, Prometheus/Grafana health checks, and a humorous recruitment call-to-action.
- **🌐 3D Interactive Canvas**: Built with **Three.js** featuring orbital particle fields, interactive wireframe icosahedrons, and dynamic lighting with pointer tracking (gracefully falls back to 2D canvas for offline/local environments).
- **⚡ Micro-Interactions & Physics**: 3D magnetic buttons, cursor glow, tilt cards on hover, and smooth scroll animations driven by **GSAP** and **AOS**.
- **🌗 Theme Toggle**: Dark and light mode toggle with state persistence via `localStorage`.
- **📱 Fully Responsive**: Custom CSS Grid/Flexbox architecture tested across mobile, tablet, and ultra-wide screens with accessibility considerations (`prefers-reduced-motion`).

---

## 🛠️ Tech Stack & Architecture

### **Frontend & UI Core**
- **HTML5 & Modern CSS3** (Custom Properties, Glassmorphism, CSS Grid, Flexbox)
- **JavaScript (ES6+)** (Modular IIFE architecture, Canvas API, DOM manipulation)
- **Three.js** (WebGL 3D dynamic scene & particle rendering)
- **GSAP & ScrollTrigger** (Smooth scroll-driven animations & magnetic effects)
- **AOS (Animate On Scroll)** (Viewport trigger animations)

### **DevOps Skills Showcased**
- **Cloud Providers**: AWS (EC2, VPC, ALB, ASG, IAM, S3, ECR, ECS)
- **IaC & Automation**: Terraform, Ansible, AWS Boto3 (Python)
- **CI/CD & Pipelines**: Jenkins, Groovy Pipelines, GitHub Actions, Webhooks
- **Containers & Orchestration**: Docker, Docker Compose, Kubernetes (K8s)
- **Monitoring & Observability**: Prometheus, Grafana, Nginx reverse proxy

---

## 💻 Interactive Terminal (`Deploy Jigar`)

The standout feature of this portfolio is the automated CLI emulator simulating a full-stack containerized cloud deployment:

```bash
$ ./deploy-jigar.sh
[INFO] Connecting to AWS...
[OK] AWS connection established ✓
[INFO] Starting Docker container...
[OK] Container started ✓
[INFO] Running CI/CD pipeline...
[OK] Pipeline completed ✓
[INFO] Checking infrastructure...
[OK] Terraform state verified ✓
[INFO] Checking monitoring...
[OK] Prometheus healthy ✓
[OK] Grafana healthy ✓

>> DEPLOYMENT SUCCESSFUL: Status ONLINE
