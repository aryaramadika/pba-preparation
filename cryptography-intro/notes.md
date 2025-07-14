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

- First 2 bytes: chain/network identifier
- Last 2 bytes: checksum

---

## 🔧 Key Derivation

| Type     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| **Hard** | Cannot derive child public key without parent secret key.                    |
| **Soft** | Can derive public keys using only parent public key. Easier but less secure. |

---

## 📦 Key Encoding

- Common: Base64
- Error-handling: Base58

---

## ✍️ Digital Signatures

> Combines **asymmetric encryption** and **hashing** to prove authenticity.

### 3 Core Algorithms

1. Key Generation (public/private)
2. Signing
3. Verification

### ⚠️ Replay Attacks

- Re-sending a previously signed message.
- Prevention: use **nonces** and **timestamps** in payloads.

---

## 📈 Signature Schemes

| Scheme      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| **ECDSA**   | Used in Bitcoin, Ethereum. Requires high-quality randomness. |
| **ED25519** | Used in secure communications.                               |
| **SR25519** | Used in Substrate. More complex. Supports multi-signature.   |
| **Schnorr** | Efficient, supports aggregate signatures.                    |

---

## 🧾 Multisignature

- Multiple parties sign a single message.
- Used for joint account access or approvals.

---

## 🌳 Data Structures

### 🪵 Hash Chains

- Each block references the hash of the previous block.

### 🌲 Merkle Tree

- Binary tree with hashes as nodes
- Each value has only one valid preimage

### ✅ Security Properties

- Collision resistance
- Endurance (immutable)

### 📚 Types

- Trees
- Merkle Trees
- Tries
- Radix Tries
- Patricia Tries
- Merkle Mountain Ranges (MMR)

---

## ⚙️ Advanced Crypto Primitives

### 🔢 Shamir Secret Sharing

- Secret is split into shares
- A minimum number of shares is needed to reconstruct

### 🎲 VRF (Verifiable Random Function)

- Generates random outputs with cryptographic proof
- Output is pseudo-random and **verifiable**
- Used in leader election, random selection

#### Types:

- **Threshold VRF**: Multiple participants each provide partial proofs
- **Ring VRF**: Allows anonymous signing on behalf of a group

---

## 🕵️ Zero Knowledge Proof (ZKP)

### Types:

- **Interactive**
- **Non-Interactive**

### SNARKs:

- **Succinct Non-interactive Argument of Knowledge**
- Short and efficient ZKPs, useful in zk-rollups and privacy chains

---

## 📚 References

- Lecture Notes
- [Polkadot Documentation](https://wiki.polkadot.network/)
- Chainlink Docs (VRF)
- Wikipedia, Glossaries
- BIP39 Specification
