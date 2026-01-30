# Blockchain Simulation (React + Vite)

An interactive **blockchain simulator** built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.  
This project is designed for **educational purposes** to visually demonstrate how hashing, blocks, mining, and blockchains work at a fundamental level.

---

## ✨ Features

### 1. SHA-256 Hash Playground
- Enter any text and instantly see its SHA-256 hash.
- Demonstrates how **small input changes produce completely different hashes**.

### 2. Single Block Simulator
- Manually edit:
  - Block number
  - Data
  - Nonce
  - Previous hash
- Mine the block using a **Proof-of-Work** algorithm.
- Shows how the nonce is adjusted until the hash meets the difficulty requirement.

### 3. Blockchain Simulator
- Create a chain of blocks starting from a **Genesis Block**.
- Edit block data or nonce and observe how it **breaks the chain**.
- Mine individual blocks and see how:
  - Hashes are recalculated
  - Changes propagate forward
- Full chain validation:
  - Hash correctness
  - Difficulty requirement
  - Previous-hash linkage

---

## 🧠 Concepts Demonstrated

- Cryptographic hashing (SHA-256)
- Proof of Work (PoW)
- Mining and nonce discovery
- Block immutability
- Chain validation
- Hash dependency between blocks

> ⚠️ This is **not** a real blockchain or consensus system.

---

## 🛠 Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Web Crypto API

---

## 📁 Project Structure

```
src
├── App.tsx
├── main.tsx
├── style.css
├── types.ts
│
├── components
│   ├── Navbar.tsx
│   ├── Home.tsx
│   ├── Hash.tsx
│   ├── Block.tsx
│   └── Blockchain.tsx
│
└── utils
    ├── hash.ts
    └── mineBlock.ts
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---
