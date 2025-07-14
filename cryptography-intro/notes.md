# Polkadot Academy Notes: Cryptography

## 🔐 Cryptography Overview

Encryption methods not only enable private communications, but also enable the creation of secure systems and decentralized, trust-free communication.

### 📌 Tools in Cryptography

- Public Key Encryption
- Zero Knowledge Proofs (ZKPs)
- Digital Signatures
- Anonymous Caching
- Secure Multi-Party Computation (SMPC)
- And more...

---

## 🎯 Goals of Secure Communication

- **Confidentiality**
- **Authenticity**
- **Integrity**
- **Non-repudiation**
- **Availability**
- **Verifiability**

---

## 🧠 Kerckhoffs’ Principle

> _"A system should remain secure even if everything about the system, except the key, is public knowledge."_

This means encryption algorithms should be publicly known, and **only the keys must remain secret**.

---

## 🔄 Symmetric vs Asymmetric Cryptography

| Type           | Description                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Symmetric**  | Uses the same secret key for both encryption and decryption. Fast but requires secure key sharing. |
| **Asymmetric** | Uses public and private key pairs. Slower, but supports more secure and flexible protocols.        |

---

## 📊 Key Concepts

- **Entropy**: Amount of non-redundant (informational) content.
- **Randomness**: Unpredictability of data. Low randomness = low entropy.
- **Key Size**: Upper limit of entropy in a key. More predictable keys = less secure.
- **One-Time Pad**: Perfect encryption using random, unrepeatable keys.

---

## 🔁 Hashing

> _A hash is a fixed-size output derived from arbitrary input._

### ✅ Hashing Properties

- Fixed output size (e.g., 32 bytes)
- Accepts unbounded input
- Fast to compute
- One-way (irreversible)
- Collision-resistant

### 📂 Hash Function Types

- **Cryptographic**
- **Non-Cryptographic** (faster, less secure)

> **Weak Collision Resistance** (Second Preimage Resistance): Hard to find two inputs that result in the same hash.

---

## 🔐 Encryption

### 🔸 Symmetric Encryption

- Shared secret key
- Same key for encrypt/decrypt
- Fast but needs secure key exchange

### 🔹 Asymmetric Encryption

- Public/private key pair
- Slower, but safer for public communication

### 🔁 Hybrid Encryption

- Send message using **asymmetric encryption**
- Decrypt using **symmetric encryption**

---

## 🔑 Account Keys

### 🧠 Mnemonics

- 12 or 24-word recovery phrases (e.g., BIP39)
- Easier to back up than raw binary

### 🔄 Mnemonic to Secret Key

- Use SHA-512 with 2048 rounds to derive 64-byte key
- Easier storage and recovery for users

### 🔐 Common Cryptographic Types

- **ed25519**
- **sr25519**
- **ECDSA**

### 🧮 SS58 Address Format
