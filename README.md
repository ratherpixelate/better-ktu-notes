# BetterKTUNotes (`better-ktu-notes`)

A syllabus-aligned, Swiss-minimalist academic revision studio for APJ Abdul Kalam Technological University (KTU) 2024 Scheme (Semester 3).

## Subjects & Syllabus Coverage

Each technical subject follows the 4-module curriculum of the KTU 2024 scheme:

1. **PCITT302: Computer Organisation and Architecture (COA)**
   - Module 1: Basic Structure of Computers & Machine Instructions *(Available)*
   - Module 2: Processor Organization, Datapaths & Pipelining *(Available)*
   - Module 3: Memory Hierarchy & Cache Architectures *(Drafting)*
   - Module 4: Parallel Processing & Multicore Architectures *(Drafting)*

2. **PCITT303: Data Structures (DS)**
   - Module 1: Introduction to Data Structures, Arrays & Stacks *(Available)*
   - Module 2: Linked Lists, Queues & Double-Ended Queues *(Drafting)*
   - Module 3: Trees, Binary Search Trees & Traversals *(Drafting)*
   - Module 4: Sorting, Searching & Hashing *(Drafting)*

3. **PBITT304: Database Management Systems (DBMS)**
   - Module 1: Database Design and Creation *(Available)*
   - Module 2: Relational Algebra & SQL Query Processing *(Drafting)*
   - Module 3: Database Normalization & Functional Dependencies *(Drafting)*
   - Module 4: Introduction to NoSQL Concepts & Architecture *(Drafting)*

## Key Features

- **Swiss Monochrome Design**: High-contrast, typography-first academic interface with zero AI-slop gradients or fuzzy glassmorphism.
- **Client-Side Revision Tracker**: Real-time progress tracker with `localStorage` persistence counting revision completion by module per subject.
- **Global Instant Search (`Ctrl+K`)**: Fuzzy keyword search covering all syllabus topics, formulas, algorithms, and PYQ classifications.
- **Touch-Optimized & Accessible**: Impeccable spatial rhythm, minimum 48px touch targets, full dark mode support, and screen-reader compliant ARIA landmarks.

## Project Structure

```
better-ktu-notes/
├── index.html                   # Revision dashboard & subject portal
├── COA Module 1 Notes.html      # Computer Organisation & Architecture M1
├── COA Module 2 Notes.html      # Computer Organisation & Architecture M2
├── DS Module 1 Notes.html       # Data Structures M1
├── DBMS Module 1 Notes.html     # Database Management Systems M1
├── assets/
│   ├── styles.css               # Design system tokens and layout
│   ├── app.js                   # Tracker logic & modal controller
│   └── search-index.js          # Topic search index
└── README.md
```
