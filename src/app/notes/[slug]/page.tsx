import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NoteShell } from '@/components/notes/NoteShell';
import curriculum from '@/../content/curriculum.json';
import tocData from '@/../content/toc-data.json';

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface NoteConfig {
  slug: string;
  moduleCode: string;
  title: string;
  desc: string;
  storageKey: string;
  totalTopics: number;
  tocKey: string;
}

const NOTES_CONFIG: Record<string, NoteConfig> = {
  'coa-module-1': {
    slug: 'coa-module-1',
    moduleCode: 'PCITT302 · Module 1',
    title: 'COA Module 1: Basic Structure & Machine Instructions',
    desc: 'Functional units, operational concepts, bus structures, memory locations, addressing modes, instruction sequencing, and RISC principles.',
    storageKey: 'coa-m1-revised',
    totalTopics: 18,
    tocKey: 'coa-m1',
  },
  'coa-module-2': {
    slug: 'coa-module-2',
    moduleCode: 'PCITT302 · Module 2',
    title: 'COA Module 2: Processor Organization, Datapaths & Pipelining',
    desc: 'Single-cycle vs multi-cycle processors, hardwired vs microprogrammed control, 5-stage RISC pipeline, and structural/data/control hazards.',
    storageKey: 'coa-m2-revised',
    totalTopics: 12,
    tocKey: 'coa-m2',
  },
  'ds-module-1': {
    slug: 'ds-module-1',
    moduleCode: 'PCITT303 · Module 1',
    title: 'DS Module 1: Introduction to Data Structures, Arrays & Stacks',
    desc: 'ADT vs CDT, asymptotic notations (Big O, Ω, Θ), sparse matrices, polynomial addition, stack operations, and infix-to-postfix conversion.',
    storageKey: 'ds-m1-revised',
    totalTopics: 16,
    tocKey: 'ds-m1',
  },
  'dbms-module-1': {
    slug: 'dbms-module-1',
    moduleCode: 'PBITT304 · Module 1',
    title: 'DBMS Module 1: Database Design and Creation',
    desc: 'Database approach vs file systems, three-schema architecture, conceptual ER modeling, ER-to-relational mapping, and table creation with SQL DDL constraints.',
    storageKey: 'dbms-m1-revised',
    totalTopics: 15,
    tocKey: 'dbms-m1',
  },
  'dbms-module-2': {
    slug: 'dbms-module-2',
    moduleCode: 'PBITT304 · Module 2',
    title: 'DBMS Module 2: Normalization and SQL Queries',
    desc: 'Functional dependencies, normal forms (1NF to 5NF), lossless join decomposition, SQL DDL/DML, joins, aggregates, and project milestones.',
    storageKey: 'dbms-m2-revised',
    totalTopics: 14,
    tocKey: 'dbms-m2',
  },
};

export async function generateStaticParams() {
  return Object.keys(NOTES_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = NOTES_CONFIG[slug];
  if (!config) return {};

  return {
    title: config.title,
    description: config.desc,
    alternates: {
      canonical: `https://ratherpixelate.github.io/better-ktu-notes/notes/${slug}/`,
    },
    openGraph: {
      title: `${config.title} · BetterKTUNotes`,
      description: config.desc,
      url: `https://ratherpixelate.github.io/better-ktu-notes/notes/${slug}/`,
      type: 'article',
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const config = NOTES_CONFIG[slug];
  if (!config) notFound();

  const filePath = path.join(process.cwd(), 'content', 'notes-html', `${slug}.html`);
  if (!fs.existsSync(filePath)) notFound();

  let htmlContent = fs.readFileSync(filePath, 'utf8');
  const items = (tocData as Record<string, any[]>)[config.tocKey] || [];

  // Prefix internal routes with basePath in production export
  const basePath = process.env.NODE_ENV === 'production' ? '/better-ktu-notes' : '';
  if (basePath) {
    htmlContent = htmlContent
      .replaceAll('href="/notes/', `href="${basePath}/notes/`)
      .replaceAll('href="/"', `href="${basePath}/"`);
  }

  return (
    <NoteShell
      moduleCode={config.moduleCode}
      tocItems={items}
      storageKey={config.storageKey}
      totalTopics={config.totalTopics}
    >
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </NoteShell>
  );
}
