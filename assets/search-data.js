const SEARCH_INDEX = [
  {
    "id": "t-orgarch",
    "title": "Organization vs architecture",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-orgarch",
    "chips": [
      "Differentiate",
      "Define"
    ],
    "keywords": "Organization architecture revised Differentiate Define Computer architecture Computer organization Concerns Logical aspects seen programmer Physical, operational aspects system Examples Instruction set, instruction formats, data types, addressing modes Circuit design, control signals, memory types Question answers"
  },
  {
    "id": "t-units",
    "title": "Functional units of a computer",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-units",
    "chips": [
      "Draw",
      "Define"
    ],
    "keywords": "Functional units computer revised Draw Define Computer electronic calculating machine that accepts input, processes according list internally stored instructions, produces output. Functional units computer Input unit feeds processor, memory connects both ways processor, processor feeds"
  },
  {
    "id": "t-ops",
    "title": "Basic operational concepts",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-ops",
    "chips": [
      "Explain steps",
      "Draw",
      "Fixed"
    ],
    "keywords": "Basic operational concepts revised Explain steps Draw Fixed Registers involved Register Holds Connected Address next instruction fetch Address memory location being read written Address Data being read from written memory Data bus, ALU, instruction currently"
  },
  {
    "id": "t-interrupt",
    "title": "Interrupts",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-interrupt",
    "chips": [
      "Define",
      "List classes"
    ],
    "keywords": "Interrupts revised Define List classes Interrupt request that breaks normal program execution because device needs urgent servicing. Procedure device raises interrupt signal. processor saves state first: general registers some control information memory. executes matching interrupt-service"
  },
  {
    "id": "t-bus",
    "title": "Bus structures",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-bus",
    "chips": [
      "Draw",
      "Differentiate",
      "Fixed"
    ],
    "keywords": "structures revised Draw Differentiate Fixed group parallel wires that connects several devices. Each wire carries bit. Carries Width Data data being transferred Number data lines bits word (word length) Address Address main memory location access"
  },
  {
    "id": "t-software",
    "title": "System software",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-software",
    "chips": [
      "Short note"
    ],
    "keywords": "System software revised Short note computer must already hold some system software before user enter program. System software collection programs needed receive interpret user commands, standard application programs (word processors, games), manage storage retrieval files"
  },
  {
    "id": "t-memory",
    "title": "Memory locations and addresses",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-memory",
    "chips": [
      "Numerical",
      "Define",
      "Fixed"
    ],
    "keywords": "Memory locations addresses revised Numerical Define Fixed Memory millions cells, each holding bit. Bits handled fixed-size groups: group bits stored retrieved basic operation word word length (typically bits). 32-bit word hold 32-bit 2's-complement number, four"
  },
  {
    "id": "t-signed",
    "title": "Signed integer representations",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-signed",
    "chips": [
      "Numerical",
      "Compare",
      "Fixed"
    ],
    "keywords": "Signed integer representations revised Numerical Compare Fixed Three representations. them leftmost sign positive, negative) positive numbers look identical Only negatives differ. complement used modern computers. 4-bit pattern Sign-magnitude complement complement 0000 0001 0111 1000 1001"
  },
  {
    "id": "t-float",
    "title": "IEEE 754 floating point",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-float",
    "chips": [
      "Added",
      "Numerical"
    ],
    "keywords": "IEEE floating point revised Added Numerical Added Your notes only \"float: IEEE standard\". This section entirely mine, from standard format. Sign Exponent Fraction Bias Single (32-bit) Double (64-bit) 1023 value (\u22121)^s 2^(E bias) stored true"
  },
  {
    "id": "t-formats",
    "title": "Instruction types and formats",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-formats",
    "chips": [
      "Numerical",
      "Write programs",
      "Added"
    ],
    "keywords": "Instruction types formats revised Numerical Write programs Added computer needs instructions four kinds operation: Data transfer between main memory registers. Arithmetic logic operations data (ADD, SUB, MUL, DIV, AND, XOR, shifts). Program sequencing control (branch,"
  },
  {
    "id": "t-seq",
    "title": "Instruction sequencing and branching",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-seq",
    "chips": [
      "Explain",
      "Write programs"
    ],
    "keywords": "Instruction sequencing branching revised Explain Write programs Straight-line sequencing fetches executes instructions time increasing address order. start, address first instruction goes into Executing instruction phases: Instruction fetch: instruction address read into Instruction execute: examined, then"
  },
  {
    "id": "t-shifts",
    "title": "Logical and arithmetic shifts",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-shifts",
    "chips": [
      "Numerical",
      "Differentiate",
      "Check"
    ],
    "keywords": "Logical arithmetic shifts revised Numerical Differentiate Check Shift What enters What leaves Effect Logical left LShiftL #2,R0 right goes carry Bits move left Logical right LShiftR #2,R0 left goes carry Bits move right Arithmetic right"
  },
  {
    "id": "t-modes",
    "title": "Addressing modes",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-modes",
    "chips": [
      "Numerical",
      "Define",
      "Likely long answer"
    ],
    "keywords": "Addressing modes revised Numerical Define Likely long answer Addressing mode operand instruction specified. effective address (EA) memory address operand finally fetched from. Mode Example Operand effective address Register Move R1,R2 Operand contents register named instruction."
  },
  {
    "id": "t-isa",
    "title": "Instruction set architecture principles",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-isa",
    "chips": [
      "Define",
      "Classify",
      "Added"
    ],
    "keywords": "Instruction architecture principles revised Define Classify Added instructions processor understand execute. interface between hardware software, defines what processor matters both hardware designers software developers. Topics under ISA: classification, memory addressing, addressing modes, type size operands,"
  },
  {
    "id": "t-encoding",
    "title": "Encoding of instructions",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-encoding",
    "chips": [
      "Numerical",
      "Draw",
      "Added"
    ],
    "keywords": "Encoding instructions revised Numerical Draw Added assembly program must converted machine instructions opcode encoded binary pattern giving operation and, with mode bits, type operands. Three basic encodings: variable length, fixed length, hybrid One-word instruction, 32-bit"
  },
  {
    "id": "t-risc",
    "title": "RISC architecture",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-risc",
    "chips": [
      "Explain",
      "Short note",
      "Added"
    ],
    "keywords": "RISC architecture revised Explain Short note Added Core principles Simple, fixed-length instructions e.g. bits, which makes pipelining easy. Load-store architecture: only LOAD STORE touch memory. Everything else works registers. Limited addressing modes: immediate, register, displacement."
  },
  {
    "id": "t-riscvscisc",
    "title": "RISC vs CISC",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-riscvscisc",
    "chips": [
      "Differentiate",
      "Table answer"
    ],
    "keywords": "RISC CISC revised Differentiate Table answer RISC CISC Fixed-size instructions Variable-size instructions Arithmetic only register register Register-to-memory, register-to-register memory-to-memory Transistors spent more registers Transistors spent storing complex instructions Needs many registers least Fewer registers (around"
  },
  {
    "id": "t-sheet",
    "title": "One-page cheat sheet",
    "badge": "COA M1",
    "url": "COA Module 1 Notes.html#t-sheet",
    "chips": [
      "Added",
      "Revise the night before"
    ],
    "keywords": "One-page cheat sheet revised Added Revise night before Number ranges bits) Unsigned: Sign-mag, comp: \u22121), zeros comp: zero comp invert Addresses bits locations Byte addressable, 32-bit words: Data width word length Load leaves memory unchanged,"
  },
  {
    "id": "t-single",
    "title": "Single-cycle processor",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-single",
    "chips": [
      "Added",
      "Define",
      "Numerical"
    ],
    "keywords": "Single-cycle processor revised Added Define Numerical Added Your slides don't cover single-cycle multi-cycle processors. This section next from textbook. Single-cycle processor processor which every instruction fetched, executed completed clock cycle clock period must slowest instruction"
  },
  {
    "id": "t-multi",
    "title": "Multi-cycle processor",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-multi",
    "chips": [
      "Added",
      "Differentiate",
      "Numerical",
      "Check"
    ],
    "keywords": "Multi-cycle processor revised Added Differentiate Numerical Check Multi-cycle processor processor that breaks each instruction into steps does step clock cycle clock period fits longest step different instructions take different numbers cycles. Hardware reused across cycles:"
  },
  {
    "id": "t-intro",
    "title": "Introduction to pipelining",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-intro",
    "chips": [
      "Define",
      "Short note",
      "Numerical"
    ],
    "keywords": "Introduction pipelining revised Define Short note Numerical Pipelining implementation technique which execution several instructions overlapped work split into stages, each instruction different stage same time, like assembly line. Work starts soon possible instead waiting previous"
  },
  {
    "id": "t-stages",
    "title": "The five-stage RISC pipeline",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-stages",
    "chips": [
      "Draw",
      "Explain steps",
      "Likely long answer"
    ],
    "keywords": "five-stage RISC pipeline revised Draw Explain steps Likely long answer MIPS stands Microprocessor without Interlocked Pipelined Stages registers bits, uniform-length instructions load-store architecture. Each instruction takes most clock cycles stage. Stage Name What happens Instruction"
  },
  {
    "id": "t-perf",
    "title": "Pipeline performance",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-perf",
    "chips": [
      "Added",
      "Numerical",
      "Very likely"
    ],
    "keywords": "Pipeline performance revised Added Numerical Very likely Added Your slides speedup limited number stages give formulas. These ones numerical needs. Ideal pipeline pipeline stages with equal stage times runs instructions cycles. Without pipelining same work"
  },
  {
    "id": "t-struct",
    "title": "Pipeline hazards and structural hazards",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-struct",
    "chips": [
      "Define",
      "3 marks"
    ],
    "keywords": "Pipeline hazards structural hazards revised Define marks Hazard circumstance that would cause incorrect execution next instruction were fetched executed normal clock cycle. Hazards limit pipelining force stalls. Type Cause Structural Attempting same hardware different things"
  },
  {
    "id": "t-data",
    "title": "Data hazards",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-data",
    "chips": [
      "Numerical",
      "Define",
      "Likely long answer"
    ],
    "keywords": "Data hazards revised Numerical Define Likely long answer Data hazard Occurs when instruction depends result prior instruction that still pipeline, value would read before written. writes (cycle needs (cycle hazard needs (cycle hazard needs (cycle"
  },
  {
    "id": "t-control",
    "title": "Control hazards",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-control",
    "chips": [
      "Numerical",
      "Explain",
      "Check",
      "Very likely"
    ],
    "keywords": "Control hazards revised Numerical Explain Check Very likely Control hazard Caused delay between fetching branch knowing whether taken where goes. Until then pipeline does know which instruction fetch next. Conventional pipeline: branch decided stage branch"
  },
  {
    "id": "t-impl",
    "title": "Pipelining implementation",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-impl",
    "chips": [
      "Added",
      "Explain",
      "Likely long answer"
    ],
    "keywords": "Pipelining implementation revised Added Explain Likely long answer Added Your slides show pipelined datapath forwarding hardware only pictures. This section writes what inside them, using standard RISC-V textbook version. What each pipeline register holds Register"
  },
  {
    "id": "t-multicycle",
    "title": "RISC-V integer pipeline with multicycle operations",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-multicycle",
    "chips": [
      "Added",
      "Define",
      "Numerical",
      "Likely long answer"
    ],
    "keywords": "RISC-V integer pipeline with multicycle operations revised Added Define Numerical Likely long answer Added This syllabus line your slides. follows Hennessy Patterson, Appendix \"extending pipeline handle multicycle operations\". latency numbers textbook model, real chip. Floating-point"
  },
  {
    "id": "t-sheet",
    "title": "One-page cheat sheet",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-sheet",
    "chips": [
      "Added",
      "Revise the night before"
    ],
    "keywords": "One-page cheat sheet revised Added Revise night before Three designs Single-cycle: clock slowest instruction Multi-cycle: clock slowest step, units reused Pipelined: clock slowest stage, about Five stages fetch, update decode, read registers (fixed fields) address"
  },
  {
    "id": "t-qa",
    "title": "Likely questions with answer outlines",
    "badge": "COA M2",
    "url": "COA Module 2 Notes.html#t-qa",
    "chips": [
      "Added",
      "Covers every syllabus line"
    ],
    "keywords": "Likely questions with answer outlines revised Added Covers every syllabus line Added These guess typical KTU-style questions from syllabus. haven't seen your PYQs, match them against yours. Compare single-cycle multi-cycle processors. comparison table: CPI, clock"
  },
  {
    "id": "t-basics",
    "title": "Data, information and data structures",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-basics",
    "chips": [
      "Define",
      "Short note"
    ],
    "keywords": "Data, information data structures revised Define Short note Data collection facts, figures symbols that have meaning themselves. Data becomes useful only when processed. Information Processed, organised structured data that meaning used decisions. Data structure organising"
  },
  {
    "id": "t-classes",
    "title": "Classification of data structures",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-classes",
    "chips": [
      "Differentiate",
      "Define",
      "3 marks"
    ],
    "keywords": "Classification data structures revised Differentiate Define marks Abstract Data Type. logical description data viewed operations allowed without saying implemented. Users work through interface. Examples: stack, queue, list, tree, graph. Concrete Data Type. actual implementation using"
  },
  {
    "id": "t-space",
    "title": "Algorithm analysis: space complexity",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-space",
    "chips": [
      "Define",
      "Numerical",
      "Added",
      "Added"
    ],
    "keywords": "Algorithm analysis: space complexity revised Define Numerical Analysis algorithms process determining time space algorithm needs, function input size Space complexity amount memory algorithm needs, function input size. Total space input space auxiliary space Auxiliary space:"
  },
  {
    "id": "t-time",
    "title": "Time complexity and growth functions",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-time",
    "chips": [
      "Draw graph",
      "Table",
      "Define",
      "Added"
    ],
    "keywords": "Time complexity growth functions revised Draw graph Table Define Time complexity running time algorithm grows with input size. counts basic steps, does depend programming language machine. Function Name Meaning Examples O(1) Constant Added Time does"
  },
  {
    "id": "t-asym",
    "title": "Asymptotic notations: best, worst, average case",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-asym",
    "chips": [
      "Define",
      "Numerical",
      "Likely long answer",
      "Added"
    ],
    "keywords": "Asymptotic notations: best, worst, average case revised Define Numerical Likely long answer Asymptotic notation describes efficiency algorithm when input size becomes very large. gives mathematical expression time complexity without getting into machine language details. Notation"
  },
  {
    "id": "t-arrays",
    "title": "Arrays and address calculation",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-arrays",
    "chips": [
      "Numerical",
      "Define",
      "Likely long answer"
    ],
    "keywords": "Arrays address calculation revised Numerical Define Likely long answer Array collection elements same type, stored contiguous memory locations accessed index. Properties Fixed size. Homogeneous elements (all same type). Stored contiguously. Direct access using index. Static"
  },
  {
    "id": "t-sparse",
    "title": "Sparse matrix",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-sparse",
    "chips": [
      "Define",
      "Numerical",
      "Likely long answer"
    ],
    "keywords": "Sparse matrix revised Define Numerical Likely long answer Sparse matrix matrix which most elements zero, number zero values much greater than number non-zero values. Storing every zero wastes memory. Triplet representation Store only non-zero elements."
  },
  {
    "id": "t-poly",
    "title": "Polynomial representation and addition",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-poly",
    "chips": [
      "Algorithm",
      "Numerical",
      "Likely long answer"
    ],
    "keywords": "Polynomial representation addition revised Algorithm Numerical Likely long answer polynomial terms, each with coefficient exponent Store two-column array: column holds coefficient, column exponent. Keep terms descending order exponent A[i][0] coefficient term A[i][1] exponent. [i][0] coefficient"
  },
  {
    "id": "t-stack",
    "title": "Stack using an array",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-stack",
    "chips": [
      "Algorithm",
      "Define",
      "Likely long answer",
      "Added"
    ],
    "keywords": "Stack using array revised Algorithm Define Likely long answer Stack linear data structure stored contiguous memory which items added removed only called top. follows LIFO (last first out). Push: insertion. Pop: deletion. Overflow: push full"
  },
  {
    "id": "t-queue",
    "title": "Queue using an array",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-queue",
    "chips": [
      "Algorithm",
      "Define",
      "Differentiate"
    ],
    "keywords": "Queue using array revised Algorithm Define Differentiate Queue linear data structure that allows insertion rear deletion other front follows FIFO (first first out). queue uses pointers, FRONT REAR. stack uses only one, TOP. Insertion enqueue"
  },
  {
    "id": "t-cqueue",
    "title": "Circular queue",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-cqueue",
    "chips": [
      "Algorithm",
      "Differentiate",
      "Likely long answer"
    ],
    "keywords": "Circular queue revised Algorithm Differentiate Likely long answer Circular queue queue which last position connected back first position, forming circle. uses array positions efficiently. Need: prevents false overflow. indexes wrap around with modulo operator: REAR"
  },
  {
    "id": "t-deque",
    "title": "Other queues: deque and priority queue",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-deque",
    "chips": [
      "Define",
      "Concept only",
      "3 marks"
    ],
    "keywords": "Other queues: deque priority queue revised Define Concept only marks Deque (double-ended queue) Deque queue which insertion deletion both done either end, front rear. Four operations: insert front, insert rear, delete from front, delete from"
  },
  {
    "id": "t-postfix",
    "title": "Infix to postfix conversion using a stack",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-postfix",
    "chips": [
      "Numerical",
      "Algorithm",
      "Very likely",
      "Added"
    ],
    "keywords": "Infix postfix conversion using stack revised Numerical Algorithm Very likely Notation Operator position Example plus Infix Between operands Postfix After operands Prefix Added Before operands Precedence associativity Operator Precedence Associativity (power) Highest Right left Middle"
  },
  {
    "id": "t-eval",
    "title": "Postfix evaluation using a stack",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-eval",
    "chips": [
      "Numerical",
      "Algorithm",
      "Very likely"
    ],
    "keywords": "Postfix evaluation using stack revised Numerical Algorithm Very likely Start. Create empty stack operands. Scan postfix expression from left right, token time. Repeat steps each token. token operand, push onto stack. token operator, element into"
  },
  {
    "id": "t-sheet",
    "title": "One-page cheat sheet",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-sheet",
    "chips": [
      "Added",
      "Revise the night before"
    ],
    "keywords": "One-page cheat sheet revised Added Revise night before Growth order &lt; &lt; &lt; &lt; &lt; &lt; Drop constants lower-order terms Notations c\u00b7g, worst case, upper bound best case, lower bound c\u2081\u00b7g c\u2082\u00b7g, average case, tight"
  },
  {
    "id": "t-qa",
    "title": "Likely questions with answer outlines",
    "badge": "DS M1",
    "url": "DS Module 1 Notes.html#t-qa",
    "chips": [
      "Added",
      "Covers every syllabus line"
    ],
    "keywords": "Likely questions with answer outlines revised Added Covers every syllabus line Added These guess typical KTU-style questions from syllabus. haven't seen your PYQs, match them against yours. Differentiate CDT. Give examples each. logical description data"
  },
  {
    "id": "t-intro",
    "title": "Databases and DBMS",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-intro",
    "chips": [
      "Define",
      "Added"
    ],
    "keywords": "Databases and DBMS revised Define Added Database A collection of related data . Data is known facts that can be recorded and have an implicit meaning. Information is data with explicit meaning, that is, processed data. DBMS Database management system: software that lets users create"
  },
  {
    "id": "t-approach",
    "title": "Database approach: characteristics and advantages",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-approach",
    "chips": [
      "List",
      "Explain"
    ],
    "keywords": "Database approach: characteristics and advantages revised List Explain Main characteristics (file system vs database) Characteristic Meaning Self-describing The catalog stores a description of the database (structures, types, constraints). This description is meta-data , and it lets the same DBMS software work with any database. Program-data"
  },
  {
    "id": "t-users",
    "title": "Database users",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-users",
    "chips": [
      "List",
      "Differentiate"
    ],
    "keywords": "Database users revised List Differentiate Group Who Role Actors on the scene (use or manage the database) Database administrator (DBA) Authorises access, coordinates and monitors use, acquires hardware and software, monitors efficiency. Database designer Defines content, structure, constraints, and functions or transactions. Talks to end"
  },
  {
    "id": "t-models",
    "title": "Data models, schemas and the three-schema architecture",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-models",
    "chips": [
      "Define",
      "Draw",
      "Differentiate"
    ],
    "keywords": "Data models, schemas and the three-schema architecture revised Define Draw Differentiate Data model A set of concepts to describe the structure of a database, the operations for manipulating it, and the constraints it must obey. Category Close to Examples Conceptual (high-level, semantic) How users see"
  },
  {
    "id": "t-lang",
    "title": "DBMS languages, interfaces and system structure",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-lang",
    "chips": [
      "Differentiate",
      "Draw"
    ],
    "keywords": "DBMS languages, interfaces and system structure revised Differentiate Draw Languages DDL (data definition language): used by the DBA and designers to specify the conceptual schema. Some DBMSs also use it for internal and external schemas. Others have a separate SDL (storage definition) and VDL (view"
  },
  {
    "id": "t-process",
    "title": "Database design process",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-process",
    "chips": [
      "List",
      "Draw"
    ],
    "keywords": "Database design process revised List Draw Two activities: database design (the conceptual schema, our focus) and application design (programs and interfaces, which is software engineering). Phase Output 1. Requirements collection and analysis Data requirements and functional requirements for the mini-world 2. Conceptual design Conceptual schema"
  },
  {
    "id": "t-er",
    "title": "ER model: entities, attributes and keys",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-er",
    "chips": [
      "Define",
      "Draw"
    ],
    "keywords": "ER model: entities, attributes and keys revised Define Draw Entity A specific object or thing in the mini-world, for example the EMPLOYEE John Smith or the Research DEPARTMENT. An attribute is a property that describes it. A specific entity has a value for each attribute."
  },
  {
    "id": "t-relship",
    "title": "Relationships, constraints and weak entities",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-relship",
    "chips": [
      "Define",
      "Draw",
      "Differentiate"
    ],
    "keywords": "Relationships, constraints and weak entities revised Define Draw Differentiate Relationship Relates two or more distinct entities with a specific meaning, for example EMPLOYEE Franklin Wong manages the Research DEPARTMENT. Relationships of the same kind form a relationship type . Its degree is the number of"
  },
  {
    "id": "t-example",
    "title": "Building an ERD from requirements",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-example",
    "chips": [
      "Added",
      "Draw",
      "Design"
    ],
    "keywords": "Building an ERD from requirements revised Added Draw Design Added The method in steps 1 to 5 is the usual textbook approach and is not in your slides. The COMPANY diagram itself is from your slides. Entities: underline the nouns that have their own properties."
  },
  {
    "id": "t-relmodel",
    "title": "Relational model and its constraints",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-relmodel",
    "chips": [
      "Define",
      "Differentiate",
      "Numerical"
    ],
    "keywords": "Relational model and its constraints revised Define Differentiate Numerical Proposed by E. F. Codd (IBM) in 1970. A relation is a mathematical concept based on sets, and informally it looks like a table of values . Informal Formal Table Relation Column header Attribute All possible"
  },
  {
    "id": "t-mapping",
    "title": "ER to relational mapping",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-mapping",
    "chips": [
      "Algorithm",
      "Design",
      "Draw"
    ],
    "keywords": "ER to relational mapping revised Algorithm Design Draw Seven steps for a plain ER schema. Steps 8 and 9 in your slides (specialisation, generalisation and union types) are EER topics and are not in this module's syllabus, so they are left out. Step ER construct"
  },
  {
    "id": "t-ddl",
    "title": "Creating the database: tables in SQL",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-ddl",
    "chips": [
      "Added",
      "Write SQL"
    ],
    "keywords": "Creating the database: tables in SQL revised Added Write SQL Added Your slides stop at the relational schema. The syllabus asks you to implement a sample schema in a DBMS (MySQL, PostgreSQL or SQLite) and define tables with attributes and foreign keys, so this section"
  },
  {
    "id": "t-fk",
    "title": "Tables, relationships and foreign keys in action",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-fk",
    "chips": [
      "Added",
      "Write SQL",
      "Trace"
    ],
    "keywords": "Tables, relationships and foreign keys in action revised Added Write SQL Trace Relationships between tables exist only through matching key values, so you use them in queries with a join : SELECT E.Fname, P.Pname, W.Hours FROM EMPLOYEE E JOIN WORKS_ON W ON E.Ssn = W.Essn"
  },
  {
    "id": "t-sheet",
    "title": "One-page cheat sheet",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-sheet",
    "chips": [],
    "keywords": "One-page cheat sheet revised DBMS basics Define, construct, manipulate, share Self-describing catalog (meta-data) Program-data independence, views, abstraction Concurrency control and recovery Don't use for simple, real-time, single-user cases Users On the scene: DBA, designer, end users End users: casual, naive, sophisticated, stand-alone Behind the scene:"
  },
  {
    "id": "t-qa",
    "title": "Likely questions with answer outlines",
    "badge": "DBMS M1",
    "url": "DBMS Module 1 Notes.html#t-qa",
    "chips": [
      "Added",
      "Covers every syllabus line"
    ],
    "keywords": "Likely questions with answer outlines revised Added Covers every syllabus line Added These are my guess at typical KTU-style questions from the syllabus. I haven't seen your PYQs, so match them against yours. Explain the characteristics of the database approach and its advantages over file"
  }
];
