# AURA // Advanced Utility for Risk Awareness and Autonomous Safety

> **Next-Generation Digital Safety Suite for Privacy Protection, Biometric Immunization, and Cryptographic Evidence Logging.**

---

## 🛠️ Team Overview
* **Prerona Mukherjee** — Team Lead & Frontend Developer
* **Payel Das** — Backend & Telemetry Engineer

---

## 📌 Executive Summary
**AURA (Advanced Utility for Risk Awareness and Autonomous Safety)** is an all-in-one digital privacy and safety suite engineered to protect users against unauthorized AI model training, deepfake generation, covert metadata tracking, and digital identity theft. Built using a local-first architecture, AURA combines adversarial tensor noise generation, deep binary EXIF auditing, and cryptographic hash verification to empower users to reclaim control over their personal digital footprint.

---

## ✨ Core Key Features

### 1. 🛡️ Anti-AI Cloak (Adversarial Tensor Immunization)
* **Problem:** AI image scrapers and diffusion models mine public web photos to train deepfake algorithms and facial recognition models without consent.
* **Solution:** Injects high-frequency, localized adversarial noise arrays into raw image pixel matrices using standard deviation offsets ($\sigma = 8.0$). 
* **Impact:** To human eyes, the photograph remains completely unchanged. To AI models and neural feature extractors, the facial vector dimensions become completely scrambled and unusable.

### 2. 🔍 GPS Metadata Inspector & Telemetry Audit
* **Problem:** Standard camera photos contain embedded EXIF metadata vectors—including precise GPS coordinates, timestamps, and hardware details—that inadvertently expose personal locations.
* **Solution:** Performs deep binary inspection on uploaded media files, calculating perceptual hashing (`pHash`) and parsing raw EXIF structures.
* **Impact:** Identifies location vectors and assigns an immediate Vulnerability Index ($0 - 100$), warning users prior to sharing images publicly.

### 3. ⚖️ Legal Response & Takedown Reporter
* **Problem:** Victims of impersonation or image misuse face friction when generating structured, legally valid takedown complaints for platforms.
* **Solution:** Aggregates incident telemetry into an official legal notice (DMCA / Cybercrime format) and generates verifiable SHA-256 cryptographic hashes for every piece of uploaded evidence.
* **Impact:** Produces a tamper-proof chain of custody report ready for direct export as an official PDF document.

---

## 🏗️ System Architecture & Tech Stack

### Frontend Stack
* **Framework:** React.js + Vite
* **Styling:** Tailwind CSS (Cyberpunk/Dark Slate theme with glassmorphism)
* **Iconography:** Lucide React
* **Document Engine:** Native CSS Print Engine for PDF generation

### Backend Stack
* **Framework:** FastAPI (Python 3.10+)
* **Image & Tensor Processing:** PIL (Pillow), NumPy
* **Perceptual Hashing:** ImageHash library
* **Data Validation:** Pydantic (v2)

```
                       ┌─────────────────────────┐
                       │   React + Vite Frontend │
                       │    (AURA Client UI)     │
                       └────────────┬────────────┘
                                    │
                                    │ HTTPS / REST JSON
                                    ▼
                       ┌─────────────────────────┐
                       │     FastAPI Engine      │
                       └────────────┬────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
    ▼                               ▼                               ▼
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│  Adversarial Injection │  │     EXIF / Telemetry   │  │ Cryptographic Hashing  │
│   (NumPy Noise Matrix) │  │  (Pillow / ImageHash)  │  │   (SHA-256 Engine)     │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

---

## 🚀 API Endpoint Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v2/sentinel/immunize-tensors` | Injects adversarial noise into raw image arrays to block AI feature extraction. |
| `POST` | `/api/v2/sentinel/audit-binary` | Audits uploaded media for hidden EXIF metadata, GPS vectors, and calculates `pHash`. |
| `POST` | `/api/v2/sentinel/reports` | Validates incident details and evidence logs to produce signed legal reports. |
| `GET`  | `/api/v2/sentinel/health` | Health-check route returning engine status and active version. |

---

## ⚡ Installation & Local Setup

### Prerequisites
* Node.js (v18+) & npm
* Python (v3.10+)

### 1. Backend Setup
```bash
# Navigate to backend directory
cd src/aura_backend

# Install required Python packages
pip install fastapi uvicorn pillow numpy imagehash pydantic

# Start FastAPI server
uvicorn main:app --reload --port 8000
```
*Backend server will be operational at:* `http://localhost:8000`

### 2. Frontend Setup
```bash
# Navigate to project root
cd digital-security-app

# Install dependencies
npm install

# Create local environment configuration (.env)
echo "VITE_API_URL=http://localhost:8000" > .env

# Run Vite development server
npm run dev
```
*Frontend will be accessible at:* `http://localhost:5173`

---

## 🔐 Security & Privacy Commitments
* **Zero-Telemetry Guarantee:** No uploaded images or biometric vectors are permanently stored on server disks.
* **Client-Side Hashing:** Cryptographic evidence hashes are computed in memory using the Web Crypto API prior to transmission.
