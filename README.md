# 🌿 Ayursutra – Healthcare Management Platform

## 📌 Overview
Ayursutra is a centralized healthcare platform designed to streamline interaction between **Patients, Doctors, and Therapists**. It enables efficient management of medical records, therapy sessions, and treatment workflows.

The system ensures structured communication, transparency, and better healthcare outcomes through role-based access and automation.

---

## 🎯 Objectives
- Simplify patient treatment workflows  
- Provide centralized medical records  
- Enable seamless doctor–therapist collaboration  
- Track therapy sessions and progress  
- Improve patient experience through scheduling and automation  

---

## 🔐 Authentication System
Ayursutra supports multiple authentication methods:

- Google OAuth  
- GitHub OAuth  
- Username & Password  

### 👥 User Roles
- **Patient**
- **Doctor**
- **Therapist**

Each role has specific permissions and access control.

---

## 🔄 System Workflow

### 📍 Complete Flow Diagram  
👉 https://www.figma.com/board/zTx2OjZXjuc5Tr0cCW9XAW/ayursutra?node-id=0-1  

---

### 🧑‍⚕️ Patient Flow
1. User registers / logs in  
2. Navigates to home page  
3. Adds symptoms  
4. Selects doctor  
5. Creates new appointment  
6. Waits for doctor approval  
7. Schedules therapy sessions  
8. Attends sessions  
9. Views medical records  

---

### 👨‍⚕️ Doctor Flow
1. Logs into system  
2. Reviews patient symptoms  
3. Adds:
   - Medicines  
   - Therapy requirements  
4. Assigns therapist  
5. Approves treatment plan  
6. Provides:
   - Session count  
   - Therapy details  
7. Monitors patient progress  

---

### 🧑‍⚕️ Therapist Flow
1. Gets unlocked after doctor approval  
2. Accesses assigned patient  
3. Receives therapy plan  
4. Gets calendar access  
5. Manages sessions:
   - Schedule sessions  
   - Mark sessions complete  
6. Updates therapy progress  

---

## 📅 Appointment & Scheduling System
- Patients can schedule therapy sessions  
- Therapists manage availability via calendar  
- Doctors define total session count  
- System tracks:
  - Completed sessions  
  - Pending sessions  

---

## 📂 Medical Records
Medical records are shared across all roles:

### Includes:
- Patient history  
- Prescribed medicines  
- Therapy details  
- Session progress  
- Doctor approvals  

---

## 🔁 Treatment Lifecycle

### Step-by-Step Lifecycle:
1. Patient creates request  
2. Doctor reviews and approves  
3. Therapist assigned  
4. Sessions scheduled  
5. Sessions conducted  
6. Progress tracked  
7. All sessions completed  
8. Treatment marked **COMPLETED**

---

## 📊 Features

### ✅ Core Features
- Role-based authentication  
- Appointment booking system  
- Therapy session tracking  
- Real-time medical records  
- Doctor approval workflow  
- Therapist calendar system  

### ⚙️ Advanced Features (Planned / Extendable)
- Notifications & reminders  
- AI-based symptom analysis  
- Automated therapy suggestions  
- Analytics dashboard  

---

## 🧩 Tech Stack

### Frontend
- Vite  
- JavaScript (likely React)  
- Modern UI components  

### Backend (Assumed)
- REST APIs  
- Role-based authorization  
- Database for medical records  

---

