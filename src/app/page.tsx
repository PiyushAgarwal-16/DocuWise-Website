"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, Search, Folder, Check, X, Shield, Cpu, RefreshCw, 
  Layers, Database, ChevronDown, Download, Terminal, HardDrive, 
  AlertTriangle, Play, HelpCircle, ArrowRight, Star, ExternalLink, 
  Moon, Smartphone, Eye, Files, Trash2, CheckCircle2, Menu, Info,
  Sparkles, FileSpreadsheet, Scale, Activity, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data for CSS Screen Mockups ---
const MOCK_DOCUMENTS = [
  { name: "invoice_june_2026.pdf", cat: "Invoices", size: "1.2 MB", status: "completed", date: "2026-06-18" },
  { name: "deepmind_gemini_paper.pdf", cat: "Research Papers", size: "14.5 MB", status: "completed", date: "2026-06-12" },
  { name: "lease_agreement_v2.pdf", cat: "Contracts", size: "3.4 MB", status: "completed", date: "2026-06-19" },
  { name: "transcript_meeting_ceo.txt", cat: "Transcripts", size: "150 KB", status: "completed", date: "2026-06-10" },
  { name: "annual_report_2025.pdf", cat: "Reports", size: "8.7 MB", status: "completed", date: "2026-06-15" },
  { name: "draft_agreement_v1.pdf", cat: "Contracts", size: "3.4 MB", status: "duplicate", date: "2026-06-19" },
  { name: "scanned_receipt_gas.png", cat: "Invoices", size: "4.2 MB", status: "completed", date: "2026-06-05" },
];

const MOCK_DUPLICATES = [
  { fileA: "lease_agreement_v2.pdf", fileB: "lease_agreement_backup.pdf", score: "1.00", type: "Duplicate" },
  { fileA: "draft_agreement_v1.pdf", fileB: "draft_agreement_v2.pdf", score: "0.94", type: "Similar" },
  { fileA: "receipt_gas_copy.png", fileB: "scanned_receipt_gas.png", score: "1.00", type: "Duplicate" },
];

const MOCK_CATEGORIES = [
  { name: "Invoices", count: 32, color: "bg-blue-500" },
  { name: "Research Papers", count: 24, color: "bg-purple-500" },
  { name: "Contracts", count: 15, color: "bg-emerald-500" },
  { name: "Transcripts", count: 8, color: "bg-cyan-500" },
  { name: "Reports", count: 18, color: "bg-indigo-500" },
];

export default function LandingPage() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Screenshot Lightbox State
  const [activeLightbox, setActiveLightbox] = useState<number | null>(null);

  // Demo Simulator States
  const [demoState, setDemoState] = useState<"idle" | "upload" | "ocr" | "ai" | "duplicates" | "organize" | "finished">("idle");
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoLog, setDemoLog] = useState<string[]>([]);
  const [demoFiles, setDemoFiles] = useState<typeof MOCK_DOCUMENTS>([]);
  const [demoDups, setDemoDups] = useState<typeof MOCK_DUPLICATES>([]);
  const [demoSavings, setDemoSavings] = useState(0);
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean intervals on unmount
  useEffect(() => {
    return () => {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    };
  }, []);

  const startDemoSimulation = () => {
    if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    setDemoState("upload");
    setDemoProgress(10);
    setDemoFiles([]);
    setDemoDups([]);
    setDemoSavings(0);
    setDemoLog(["[SYSTEM] Initiating document scan on folder: D:\\MyDocuments"]);

    let step = 1;
    demoIntervalRef.current = setInterval(() => {
      if (step === 1) {
        setDemoProgress(25);
        setDemoLog(prev => [
          ...prev,
          "[DISCOVERY] Discovered 7 documents in root folder.",
          "[DISCOVERY] File size scan: 34.6 MB total size.",
          "[EXTRACTOR] Starting OCR parsing for: scanned_receipt_gas.png..."
        ]);
        setDemoFiles([
          MOCK_DOCUMENTS[0],
          MOCK_DOCUMENTS[1],
          MOCK_DOCUMENTS[3],
        ]);
        step = 2;
      } else if (step === 2) {
        setDemoState("ocr");
        setDemoProgress(45);
        setDemoLog(prev => [
          ...prev,
          "[OCR] Text extracted successfully from: scanned_receipt_gas.png (480 words).",
          "[OCR] OCR Engine: Tesseract localized process active.",
          "[EMBEDDER] Generating vector embeddings for document similarity checks...",
          "[AI] Analyzing document semantics using local model..."
        ]);
        setDemoFiles(prev => [
          ...prev,
          MOCK_DOCUMENTS[2],
          MOCK_DOCUMENTS[4],
        ]);
        step = 3;
      } else if (step === 3) {
        setDemoState("ai");
        setDemoProgress(65);
        setDemoLog(prev => [
          ...prev,
          "[AI] Document 'invoice_june_2026.pdf' classified as INVOICE (Confidence: 98.4%).",
          "[AI] Document 'deepmind_gemini_paper.pdf' classified as RESEARCH PAPER (Confidence: 99.1%).",
          "[AI] Extracted Tags: [tax, finance, billing], [gemini, neural-networks, deepmind]",
          "[DUPLICATE] Checking content similarity models..."
        ]);
        step = 4;
      } else if (step === 4) {
        setDemoState("duplicates");
        setDemoProgress(85);
        setDemoLog(prev => [
          ...prev,
          "[DUPLICATE] High similarity detected between 'lease_agreement_v2.pdf' and 'lease_agreement_backup.pdf' (Score: 1.00)",
          "[DUPLICATE] Duplicate pair logged in SQLite DB. Potential storage savings: 3.4 MB",
          "[DUPLICATE] Near-duplicate detected: 'draft_agreement_v1.pdf' vs 'draft_agreement_v2.pdf' (Score: 0.94)",
          "[ORGANIZER] Ready to structure directories..."
        ]);
        setDemoDups([MOCK_DUPLICATES[0], MOCK_DUPLICATES[1]]);
        setDemoSavings(6.8);
        step = 5;
      } else if (step === 5) {
        setDemoState("organize");
        setDemoProgress(98);
        setDemoLog(prev => [
          ...prev,
          "[ORGANIZER] Creating directories: /Invoices, /Research Papers, /Contracts",
          "[ORGANIZER] Moving files to respective folders based on AI classification...",
          "[ORGANIZER] Re-linked: invoice_june_2026.pdf -> Invoices/invoice_june_2026.pdf",
          "[ORGANIZER] Re-linked: deepmind_gemini_paper.pdf -> Research Papers/deepmind_gemini_paper.pdf"
        ]);
        setDemoFiles(MOCK_DOCUMENTS);
        step = 6;
      } else if (step === 6) {
        setDemoState("finished");
        setDemoProgress(100);
        setDemoLog(prev => [
          ...prev,
          "[COMPLETED] Scanning and organization task finished.",
          "[COMPLETED] Organized: 7 files | Duplicates: 3 found | Space Saved: 6.8 MB",
          "[INFO] SQLite Database written successfully."
        ]);
        if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
      }
    }, 2000);
  };

  const resetDemoSimulation = () => {
    if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    setDemoState("idle");
    setDemoProgress(0);
    setDemoLog([]);
    setDemoFiles([]);
    setDemoDups([]);
    setDemoSavings(0);
  };

  // Screenshots data for Mockups
  const SCREENSHOTS = [
    {
      title: "Main Dashboard",
      description: "Get an overview of your entire collection with real-time statistics cards, category distribution charts, and quick-filter tags.",
      render: () => (
        <div className="flex flex-col h-full bg-[#0b1120] text-slate-100 rounded-lg overflow-hidden border border-[#223049] text-xs">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#151f32] border-b border-[#223049]">
            <div className="flex items-center gap-1.5 font-semibold text-blue-500">
              <span className="text-sm">📁</span> DocuWise — Dashboard
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="italic text-[10px]">📂 C:\Users\Admin\Documents\Library</span>
              <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Offline Mode
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-6 gap-2 p-3 bg-[#0d1527]">
            <div className="bg-[#131824] border border-[#223049] rounded p-2 text-center">
              <div className="text-lg font-bold text-blue-500">97</div>
              <div className="text-[10px] text-slate-400 font-medium">Total Docs</div>
            </div>
            <div className="bg-[#131824] border border-[#223049] rounded p-2 text-center">
              <div className="text-lg font-bold text-emerald-500">83</div>
              <div className="text-[10px] text-slate-400 font-medium">Embedded</div>
            </div>
            <div className="bg-[#131824] border border-[#223049] rounded p-2 text-center">
              <div className="text-lg font-bold text-blue-400">4</div>
              <div className="text-[10px] text-slate-400 font-medium">Image PDFs</div>
            </div>
            <div className="bg-[#131824] border border-[#223049] rounded p-2 text-center">
              <div className="text-lg font-bold text-cyan-300">35</div>
              <div className="text-[10px] text-slate-400 font-medium">Duplicates</div>
            </div>
            <div className="bg-[#131824] border border-[#223049] rounded p-2 text-center">
              <div className="text-lg font-bold text-slate-400">2</div>
              <div className="text-[10px] text-slate-400 font-medium">Missing</div>
            </div>
            <div className="bg-[#131824] border border-[#ef4444]/40 rounded p-2 text-center">
              <div className="text-lg font-bold text-red-400">0</div>
              <div className="text-[10px] text-slate-400 font-medium">Failed</div>
            </div>
          </div>

          {/* Main Layout Splitted */}
          <div className="flex flex-1 min-h-0">
            {/* Table Area */}
            <div className="flex-1 p-3 overflow-y-auto border-r border-[#223049]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-slate-300">All Files</span>
                <span className="text-[10px] text-slate-500">Showing 7 of 97 files</span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#223049] text-slate-400 font-bold bg-[#151f32]/50">
                    <th className="p-1.5">Filename</th>
                    <th className="p-1.5">Category</th>
                    <th className="p-1.5">Size</th>
                    <th className="p-1.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DOCUMENTS.map((doc, idx) => (
                    <tr key={idx} className="border-b border-[#1d2739] hover:bg-[#151f32]/30">
                      <td className="p-1.5 font-medium flex items-center gap-1">
                        <span className="text-blue-400 text-xs">📄</span> {doc.name}
                      </td>
                      <td className="p-1.5">
                        <span className="bg-[#1e293b] px-1.5 py-0.5 rounded border border-[#2d3a54] text-[10px]">
                          {doc.cat}
                        </span>
                      </td>
                      <td className="p-1.5 text-slate-400">{doc.size}</td>
                      <td className="p-1.5">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                          doc.status === "completed" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sidebar Area */}
            <div className="w-56 p-3 bg-[#0d1527] flex flex-col gap-3">
              {/* Category distribution */}
              <div className="bg-[#131824] border border-[#223049] rounded p-2">
                <div className="font-semibold text-slate-300 mb-2 border-b border-[#223049] pb-1">Categories</div>
                <div className="flex flex-col gap-1.5">
                  {MOCK_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex justify-between text-[9px] text-slate-400">
                        <span>{cat.name}</span>
                        <span>{cat.count} docs</span>
                      </div>
                      <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`${cat.color} h-full`} 
                          style={{ width: `${(cat.count / 97) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duplicates panel preview */}
              <div className="bg-[#131824] border border-[#223049] rounded p-2">
                <div className="font-semibold text-slate-300 mb-1.5 flex justify-between items-center">
                  <span>Duplicates</span>
                  <span className="text-[9px] bg-red-500/20 text-red-400 px-1 py-0.2 rounded border border-red-500/30">
                    35 Found
                  </span>
                </div>
                <div className="text-[10px] text-red-400 font-bold mb-1.5">Potential Savings: 142.4 MB</div>
                <button className="w-full bg-[#ef4444] text-white p-1 rounded font-semibold hover:bg-red-600 transition">
                  🧹 Resolve All
                </button>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#0b1120] border-t border-[#223049] px-3 py-1 flex items-center justify-between text-slate-500 text-[10px]">
            <span>✓ Complete. Ready for next action.</span>
            <span>v1.0.0</span>
          </div>
        </div>
      )
    },
    {
      title: "Smart Search",
      description: "Search instantly through OCR-extracted text, AI categories, custom metadata, and generated tags. Preview files before opening them.",
      render: () => (
        <div className="flex flex-col h-full bg-[#0b1120] text-slate-100 rounded-lg overflow-hidden border border-[#223049] text-xs">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#151f32] border-b border-[#223049]">
            <div className="flex items-center gap-1.5 font-semibold text-blue-500">
              <span className="text-sm">📁</span> DocuWise — Semantic Search
            </div>
            <div className="bg-[#1e293b] border border-[#223049] rounded-md px-2 py-0.5 flex items-center gap-1.5 w-60">
              <span className="text-slate-500">🔍</span>
              <input 
                type="text" 
                value="Gemini API lease agreement" 
                readOnly 
                className="bg-transparent text-white focus:outline-none w-full text-[10px]" 
              />
            </div>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Search list */}
            <div className="flex-1 p-3 overflow-y-auto border-r border-[#223049]">
              <div className="text-[10px] text-slate-400 font-bold mb-2">Search Results: 2 Matches</div>
              
              <div className="space-y-2">
                <div className="bg-[#151f32] border border-blue-500/30 p-2.5 rounded hover:border-blue-500/50 transition cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-400">lease_agreement_v2.pdf</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      Contracts (94% match)
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 italic">
                    "...hereby enters into a <span className="bg-yellow-500/20 text-yellow-200 border-b border-yellow-500">lease agreement</span>. Tenant agrees to pay the landlord..."
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] bg-[#1e293b] px-1 py-0.2 rounded text-slate-400">#legal</span>
                    <span className="text-[9px] bg-[#1e293b] px-1 py-0.2 rounded text-slate-400">#apartment</span>
                  </div>
                </div>

                <div className="bg-[#131824] border border-[#223049] p-2.5 rounded hover:border-blue-500/30 transition cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-400">deepmind_gemini_paper.pdf</span>
                    <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.2 rounded border border-purple-500/20">
                      Research Papers (85% match)
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 italic">
                    "...integrating multimodality using the <span className="bg-yellow-500/20 text-yellow-200 border-b border-yellow-500">Gemini API</span> pipelines. Performance in reasoning..."
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] bg-[#1e293b] px-1 py-0.2 rounded text-slate-400">#neural-networks</span>
                    <span className="text-[9px] bg-[#1e293b] px-1 py-0.2 rounded text-slate-400">#gemini</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Preview Pane */}
            <div className="w-64 p-3 bg-[#0d1527] flex flex-col gap-2 overflow-y-auto">
              <div className="font-semibold text-slate-300 border-b border-[#223049] pb-1 flex justify-between items-center">
                <span>Document Details</span>
                <span className="text-[9px] text-slate-500">ID: #4</span>
              </div>
              <div className="text-[10px] text-slate-400">
                <span className="block font-bold text-slate-300">File Name:</span> lease_agreement_v2.pdf
                <span className="block font-bold text-slate-300 mt-1">AI Generated Summary:</span>
                This is a residential lease contract between Owner LLC and John Doe for Apartment 4B. Rent is set to $1,800/month, starting July 1, 2026. Important clauses: Rent due date, damage deposit refund conditions.
              </div>
              <div className="text-[10px] text-slate-400">
                <span className="block font-bold text-slate-300 mt-1">Importance:</span> High (8.5/10)
                <span className="block font-bold text-slate-300 mt-1">MD5 Hash:</span> 9e107d9d372bb6826bd81d3542a419d6
              </div>
              <button className="w-full bg-[#2563eb] text-white p-1 rounded font-semibold text-[10px] hover:bg-blue-600 transition flex items-center justify-center gap-1 mt-2">
                <span>📂</span> Open File Location
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Classification",
      description: "DocuWise uses Gemini to parse content and accurately classify documents into appropriate categories: Invoices, Contracts, Transcripts, and Reports.",
      render: () => (
        <div className="flex flex-col h-full bg-[#0b1120] text-slate-100 rounded-lg overflow-hidden border border-[#223049] text-xs">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#151f32] border-b border-[#223049]">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-500">
              <span className="text-sm">🤖</span> AI Classification & Category Rules
            </div>
            <button className="bg-[#10b981] text-white px-2 py-0.5 rounded font-semibold text-[10px] hover:bg-emerald-600 transition">
              + Add Custom Category
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3 p-4 flex-1 items-center">
            {MOCK_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-[#131824] border border-[#223049] rounded-lg p-3 flex flex-col justify-between items-center text-center shadow-lg hover:border-emerald-500/40 transition">
                <div className="text-2xl mb-1.5">
                  {cat.name === "Invoices" && "🧾"}
                  {cat.name === "Research Papers" && "🎓"}
                  {cat.name === "Contracts" && "🤝"}
                  {cat.name === "Transcripts" && "🎙️"}
                  {cat.name === "Reports" && "📊"}
                </div>
                <div className="font-bold text-slate-200 text-[11px] truncate w-full">{cat.name}</div>
                <div className="text-lg font-bold text-emerald-400 mt-2">{cat.count}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Files Classified</div>
                <div className="w-full bg-[#223049] h-1 rounded-full overflow-hidden mt-3">
                  <div className={`${cat.color} h-full w-[80%]`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#151f32] p-3 border-t border-[#223049] text-[10px] text-slate-400">
            <span className="font-bold text-slate-200">System Rule:</span> Natural Language Rule active: <span className="text-yellow-400">"Highlight all legal files or documents containing lease covenants."</span> (Highlighted 3 documents)
          </div>
        </div>
      )
    },
    {
      title: "Duplicate & Near-Duplicate Detection",
      description: "Analyzes file contents using vector embeddings. Identify exact twins and similar revisions (like draft_v1 vs draft_v2) and delete them safely.",
      render: () => (
        <div className="flex flex-col h-full bg-[#0b1120] text-slate-100 rounded-lg overflow-hidden border border-[#223049] text-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-[#151f32] border-b border-[#223049]">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
              <span className="text-sm">🧹</span> Duplicate Detection Panel
            </div>
            <div className="text-[10px] text-slate-400 font-bold">
              Potential Savings: <span className="text-red-400">142.4 MB</span>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            <div className="text-slate-400 mb-2 font-medium">Found 3 duplicate relationships in collection:</div>
            
            <div className="space-y-2">
              {MOCK_DUPLICATES.map((dup, idx) => (
                <div key={idx} className="bg-[#131824] border border-[#223049] rounded p-2.5 flex items-center justify-between hover:bg-[#151f32]/50 transition">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-200">
                      <span className="text-red-400">📄</span> {dup.fileA}
                    </div>
                    <div className="text-[10px] text-slate-500 italic mt-0.5 ml-4">
                      matches target file: <span className="text-slate-400">{dup.fileB}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        dup.type === "Duplicate" 
                          ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                          : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      }`}>
                        {dup.type}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">Similarity: {dup.score}</div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button className="bg-red-500 text-white p-1 rounded font-semibold text-[9px] hover:bg-red-600 transition">
                        Keep A (Delete B)
                      </button>
                      <button className="bg-[#1e293b] border border-[#334155] text-slate-300 p-1 rounded font-semibold text-[9px] hover:bg-[#334155] transition">
                        Keep B (Delete A)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Folder Organization",
      description: "Auto-structures your workspace in one-click. Creates category folders and places files inside them without breaking metadata histories.",
      render: () => (
        <div className="flex flex-col h-full bg-[#0b1120] text-slate-100 rounded-lg overflow-hidden border border-[#223049] text-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-[#151f32] border-b border-[#223049]">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-500">
              <span className="text-sm">📁</span> Automatic File Restructuring
            </div>
            <button className="bg-[#10b981] text-white px-2 py-0.5 rounded font-semibold text-[10px] hover:bg-emerald-600 transition">
              Run Re-linking
            </button>
          </div>

          <div className="flex-1 p-4 grid grid-cols-2 gap-4 items-center">
            {/* Visual Folder Tree */}
            <div className="bg-[#131824] border border-[#223049] rounded p-3 h-48 overflow-y-auto">
              <div className="font-bold text-slate-200 border-b border-[#223049] pb-1 mb-2">📁 Organized_Library</div>
              
              <div className="space-y-2 pl-3">
                <div>
                  <div className="text-emerald-400 font-bold">📁 Invoices</div>
                  <div className="pl-3 text-slate-400 space-y-0.5 mt-0.5">
                    <div>📄 invoice_june_2026.pdf</div>
                    <div>📄 scanned_receipt_gas.png</div>
                  </div>
                </div>

                <div>
                  <div className="text-purple-400 font-bold">📁 Research Papers</div>
                  <div className="pl-3 text-slate-400 space-y-0.5 mt-0.5">
                    <div>📄 deepmind_gemini_paper.pdf</div>
                  </div>
                </div>

                <div>
                  <div className="text-blue-400 font-bold">📁 Contracts</div>
                  <div className="pl-3 text-slate-400 space-y-0.5 mt-0.5">
                    <div>📄 lease_agreement_v2.pdf</div>
                    <div>📄 draft_agreement_v1.pdf</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Folder Heuristic settings */}
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-slate-300 mb-1">Organization Rule Setup:</div>
              <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-[10px] text-slate-400">
                <span className="block font-bold text-slate-200">Rename Schema:</span>
                `[Category] / [Year-Month] _ [AI_Subject] . [ext]`
              </div>
              <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-[10px] text-slate-400">
                <span className="block font-bold text-slate-200">Move Rule:</span>
                Create category subfolders automatically if folder is missing. Relink database pathways.
              </div>
              <button className="bg-emerald-500 text-white py-1.5 rounded font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-1.5 mt-1">
                <span>✓</span> Apply Rename & Restructure Rules
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        {/* Glow Spots */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2563EB]/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/15 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[30%] w-[40%] h-[40%] bg-[#06B6D4]/10 rounded-full blur-[100px]"></div>
      </div>

      {/* --- Sticky Navbar --- */}
      <header className="sticky top-0 z-50 w-full border-b border-[#223049]/60 bg-[#0F172A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Docu<span className="text-blue-500">Wise</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#demo" className="hover:text-blue-400 transition-colors">Demo</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#technology" className="hover:text-blue-400 transition-colors">Technology</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          </nav>

          {/* Download CTA Navbar */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://github.com/PiyushAgarwal-16/DocuWise/archive/refs/tags/Application.zip" 
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center gap-1.5 border border-blue-400/20"
            >
              <Download className="w-4 h-4" /> Download Setup
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#223049] bg-[#0F172A] px-4 py-4 space-y-3"
            >
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white transition py-2 text-sm font-medium"
              >
                Features
              </a>
              <a 
                href="#demo" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white transition py-2 text-sm font-medium"
              >
                Demo
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white transition py-2 text-sm font-medium"
              >
                How It Works
              </a>
              <a 
                href="#technology" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white transition py-2 text-sm font-medium"
              >
                Technology
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white transition py-2 text-sm font-medium"
              >
                FAQ
              </a>
              <a 
                href="https://github.com/PiyushAgarwal-16/DocuWise/archive/refs/tags/Application.zip"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-center text-sm transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/25"
              >
                <Download className="w-4 h-4" /> Download for Windows
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- Main Contents --- */}
      <main className="relative z-10">

        {/* --- 1. Hero Section --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Introducing Local Intelligent PDF Management</span>
            </div>
            
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-white">
              Turn Document Chaos Into{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Organized Intelligence
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              DocuWise automatically classifies, organizes, searches, and deduplicates hundreds of PDFs using AI. 
              Keep your document collection cataloged locally and structured efficiently.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a 
                href="https://github.com/PiyushAgarwal-16/DocuWise/archive/refs/tags/Application.zip" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/35 border border-blue-400/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-5 h-5" /> Download for Windows
              </a>
              <a 
                href="#demo" 
                className="w-full sm:w-auto bg-[#1E293B] hover:bg-[#334155] border border-[#223049] text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 text-blue-400" /> Watch Demo
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Offline-first
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> No Account Required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Setup setup setup
              </span>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative border border-[#223049]/80 rounded-2xl bg-[#0b1120] shadow-2xl overflow-hidden shadow-blue-500/5 glow-blue h-[420px]">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#151f32] border-b border-[#223049]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block"></span>
                  </div>
                  <span className="font-semibold text-blue-500 text-[11px] font-sans ml-2">📁 DocuWise — Dashboard</span>
                </div>
                <span className="text-[10px] text-slate-500 italic bg-[#0f172a] px-2 py-0.5 rounded border border-[#223049]">
                  D:\Libraries\ResearchPapers
                </span>
              </div>

              {/* Layout components */}
              <div className="flex flex-col h-[calc(100%-36px)] justify-between text-xs">
                {/* Stats cards */}
                <div className="grid grid-cols-6 gap-2 p-3 bg-[#0d1527] border-b border-[#223049]/60">
                  <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-center">
                    <div className="text-base font-bold text-blue-500">97</div>
                    <div className="text-[9px] text-slate-400 font-medium">Processed</div>
                  </div>
                  <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-center">
                    <div className="text-base font-bold text-emerald-500">83</div>
                    <div className="text-[9px] text-slate-400 font-medium">Classified</div>
                  </div>
                  <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-center">
                    <div className="text-base font-bold text-blue-400">4</div>
                    <div className="text-[9px] text-slate-400 font-medium">Image PDFs</div>
                  </div>
                  <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-center">
                    <div className="text-base font-bold text-cyan-300">35</div>
                    <div className="text-[9px] text-slate-400 font-medium">Duplicates</div>
                  </div>
                  <div className="bg-[#151f32] border border-[#223049] rounded p-2 text-center">
                    <div className="text-base font-bold text-slate-400">2</div>
                    <div className="text-[9px] text-slate-400 font-medium">Missing</div>
                  </div>
                  <div className="bg-[#151f32] border border-[#ef4444]/40 rounded p-2 text-center">
                    <div className="text-base font-bold text-red-400">0</div>
                    <div className="text-[9px] text-slate-400 font-medium">Failed</div>
                  </div>
                </div>

                {/* Split layout inside mockup */}
                <div className="flex-1 flex min-h-0 bg-[#0b1120]">
                  {/* Table area */}
                  <div className="flex-1 p-3 overflow-y-auto border-r border-[#223049]/60">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#223049] text-slate-400 font-semibold text-[10px]">
                          <th className="pb-1.5">File Name</th>
                          <th className="pb-1.5">AI Category</th>
                          <th className="pb-1.5">Size</th>
                          <th className="pb-1.5">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#1d2739]/50 text-[10px]">
                          <td className="py-1.5 font-medium flex items-center gap-1">📄 neural_networks.pdf</td>
                          <td className="py-1.5"><span className="bg-[#151f32] px-1 py-0.2 rounded border border-[#223049]">Research Papers</span></td>
                          <td className="py-1.5 text-slate-400">8.4 MB</td>
                          <td className="py-1.5"><span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded text-[8px] font-bold border border-emerald-500/20">completed</span></td>
                        </tr>
                        <tr className="border-b border-[#1d2739]/50 text-[10px]">
                          <td className="py-1.5 font-medium flex items-center gap-1">📄 tax_invoice_june.pdf</td>
                          <td className="py-1.5"><span className="bg-[#151f32] px-1 py-0.2 rounded border border-[#223049]">Invoices</span></td>
                          <td className="py-1.5 text-slate-400">1.2 MB</td>
                          <td className="py-1.5"><span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded text-[8px] font-bold border border-emerald-500/20">completed</span></td>
                        </tr>
                        <tr className="border-b border-[#1d2739]/50 text-[10px]">
                          <td className="py-1.5 font-medium flex items-center gap-1">📄 lease_contract_draft.pdf</td>
                          <td className="py-1.5"><span className="bg-[#151f32] px-1 py-0.2 rounded border border-[#223049]">Contracts</span></td>
                          <td className="py-1.5 text-slate-400">3.4 MB</td>
                          <td className="py-1.5"><span className="bg-cyan-500/10 text-cyan-400 px-1 py-0.2 rounded text-[8px] font-bold border border-cyan-500/20">duplicate</span></td>
                        </tr>
                        <tr className="text-[10px]">
                          <td className="py-1.5 font-medium flex items-center gap-1">📄 transcript_client_call.txt</td>
                          <td className="py-1.5"><span className="bg-[#151f32] px-1 py-0.2 rounded border border-[#223049]">Transcripts</span></td>
                          <td className="py-1.5 text-slate-400">150 KB</td>
                          <td className="py-1.5"><span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded text-[8px] font-bold border border-emerald-500/20">completed</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Sidebar Area */}
                  <div className="w-48 bg-[#0d1527] p-2.5 flex flex-col gap-2.5 justify-between">
                    <div className="space-y-2">
                      <div className="font-bold text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#223049] pb-1">Duplicates</div>
                      <div className="bg-[#151f32] border border-[#223049] p-1.5 rounded text-[10px]">
                        <div className="text-red-400 font-bold mb-0.5">Potential Savings: 142.4 MB</div>
                        <div className="text-[9px] text-slate-400 truncate">12 exact twins found.</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-bold text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#223049] pb-1">Quick Actions</div>
                      <button className="w-full bg-blue-600 text-white font-semibold py-1 rounded text-[10px] hover:bg-blue-700 transition">
                        ▶ Scan Folder
                      </button>
                      <button className="w-full bg-emerald-500 text-white font-semibold py-1 rounded text-[10px] hover:bg-emerald-600 transition">
                        📁 Organize Library
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="bg-[#0b1120] border-t border-[#223049] px-3 py-1 flex items-center justify-between text-slate-500 text-[9px]">
                  <span>✓ 97 files processed. Saved 142.4 MB.</span>
                  <span>Active Rule: None</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. Problem Section --- */}
        <section className="bg-[#0b1120] py-24 border-y border-[#223049]/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Finding Documents Shouldn't Feel Like Archaeology
              </h2>
              <p className="text-slate-400 text-lg">
                Filing cabinets and digital folders get cluttered over time. docuwise solves the chaos:
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Messy Folder list */}
              <div className="lg:col-span-5 bg-[#131824] border border-red-500/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 font-bold flex items-center gap-1.5 text-sm uppercase tracking-wider">
                      <AlertTriangle className="w-4.5 h-4.5" /> Messy Folders
                    </span>
                    <span className="text-xs text-slate-500">Unorganized System</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs text-red-300">
                    <div className="bg-red-500/5 border border-red-500/10 p-2.5 rounded flex items-center justify-between">
                      <span>📄 scan_23849_v2_edit.pdf</span>
                      <span className="text-[10px] text-slate-500">Duplicate</span>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 p-2.5 rounded flex items-center justify-between">
                      <span>📄 doc_final_version3_last.docx</span>
                      <span className="text-[10px] text-slate-500">Poor Name</span>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 p-2.5 rounded flex items-center justify-between">
                      <span>📄 IMG_20251112.pdf (Scanned)</span>
                      <span className="text-[10px] text-slate-500">Unsearchable</span>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 p-2.5 rounded flex items-center justify-between">
                      <span>📄 receipt_draft_1.pdf</span>
                      <span className="text-[10px] text-slate-500">Near-Duplicate</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#223049] pt-4 mt-6 text-xs text-slate-400 space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">✗</span> Hundreds of PDFs scattered across nested folders.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">✗</span> Duplicate files wasting gigabytes of disk storage.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">✗</span> Scanned documents impossible to search semantically.
                  </p>
                </div>
              </div>

              {/* Arrow spacer */}
              <div className="lg:col-span-2 flex flex-col justify-center items-center gap-2 self-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg rotate-90 lg:rotate-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">DocuWise Run</span>
              </div>

              {/* Organized Library */}
              <div className="lg:col-span-5 bg-[#1E293B] border border-blue-500/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-blue-500/5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-sm uppercase tracking-wider">
                      <CheckCircle2 className="w-4.5 h-4.5" /> Organized Library
                    </span>
                    <span className="text-xs text-slate-500">Structured by Category</span>
                  </div>

                  <div className="space-y-2 font-mono text-xs text-emerald-300">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded">
                      <span className="text-blue-400 font-bold">📁 Invoices/</span>
                      <span className="pl-1">2026-06_ScannedGasReceipt.pdf</span>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded">
                      <span className="text-purple-400 font-bold">📁 Resumes/</span>
                      <span className="pl-1">CV_John_Doe_2026.docx</span>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded">
                      <span className="text-emerald-400 font-bold">📁 Contracts/</span>
                      <span className="pl-1">Residential_Lease_Agreement.pdf</span>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded flex justify-between items-center">
                      <span className="text-slate-400 line-through">📄 duplicate_backup.pdf</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-500/20">Resolved</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#223049] pt-4 mt-6 text-xs text-slate-300 space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span> Meaningful AI-generated filenames and folder paths.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span> Automated duplicate matching frees storage immediately.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span> OCR processing enables search inside scanned PDFs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. Features Section --- */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Built With Powerful Intelligence Engine
            </h2>
            <p className="text-slate-400 text-lg">
              DocuWise integrates state-of-the-art AI tooling and localized pipelines to structure your file collection safely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Classification */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 hover:border-blue-500/40 hover:glow-blue transition group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">AI Classification</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automatically identifies and labels invoices, contracts, research papers, transcripts, and reports based on their textual content.
              </p>
            </div>

            {/* OCR */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 hover:border-purple-500/40 hover:glow-purple transition group">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-purple-500/20">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">OCR Processing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Processes scanned documents and raw images locally using high-fidelity OCR, translating flat images into searchable text streams.
              </p>
            </div>

            {/* Duplicates */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 hover:border-cyan-500/40 hover:glow-cyan transition group">
              <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-cyan-500/20">
                <Files className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">Duplicate Detection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Flags identical files using MD5 signatures, and discovers near-duplicate revisions or drafts using localized semantic vector models.
              </p>
            </div>

            {/* Search */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 hover:border-blue-500/40 hover:glow-blue transition group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-blue-500/20">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">Smart Search</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Run immediate content-level queries. Search text contents, AI-generated summary records, metadata tags, and categorized pathways.
              </p>
            </div>

            {/* Renaming */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 hover:border-purple-500/40 hover:glow-purple transition group">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-purple-500/20">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">Smart Renaming</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ditch random scan tags. Instantly rename files based on generated schemas combining creation dates, classification tags, and subjects.
              </p>
            </div>

            {/* Organization */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 hover:border-cyan-500/40 hover:glow-cyan transition group">
              <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-cyan-500/20">
                <Folder className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">Folder Organization</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Let AI build your folders tree. DocuWise maps files to categories and restructures files automatically without changing DB indexing.
              </p>
            </div>
          </div>
        </section>

        {/* --- 4. Product Demo Simulator --- */}
        <section id="demo" className="bg-[#0b1120] py-24 border-y border-[#223049]/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Experience DocuWise in Action
              </h2>
              <p className="text-slate-400 text-lg">
                Click "Start Scan Simulation" to see how DocuWise imports documents, extracts texts, uses AI to classify, and deduplicates file clusters.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Simulation Sandbox Console */}
              <div className="lg:col-span-5 bg-[#131824] border border-[#223049] rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm tracking-wider text-blue-400 uppercase flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" /> Import Simulator Sandbox
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${demoState === "finished" ? "bg-emerald-500" : demoState !== "idle" ? "bg-blue-500 animate-pulse" : "bg-slate-600"}`}></span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{demoState}</span>
                    </div>
                  </div>

                  {/* Simulator logs window */}
                  <div className="bg-[#0b1120] border border-[#223049] rounded-lg p-3 h-64 overflow-y-auto font-mono text-[11px] text-blue-300 space-y-1.5">
                    {demoLog.length === 0 ? (
                      <div className="text-slate-500 italic flex flex-col items-center justify-center h-full gap-2">
                        <span>Simulator ready. Click below to run.</span>
                      </div>
                    ) : (
                      demoLog.map((log, idx) => (
                        <div key={idx} className="leading-relaxed">
                          {log}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Progress details */}
                  {demoState !== "idle" && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-400 font-bold">
                        <span>Processing progress...</span>
                        <span>{demoProgress}%</span>
                      </div>
                      <div className="w-full bg-[#0b1120] h-2 rounded-full overflow-hidden border border-[#223049]">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                          style={{ width: `${demoProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#223049] flex items-center gap-3 relative z-10 mt-6">
                  {demoState === "idle" || demoState === "finished" ? (
                    <button 
                      onClick={startDemoSimulation}
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-lg transition shadow-lg shadow-blue-500/20 border border-blue-400/20 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Start Scan Simulation
                    </button>
                  ) : (
                    <button 
                      onClick={resetDemoSimulation}
                      className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-lg transition flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Stop & Reset
                    </button>
                  )}
                  {demoState === "finished" && (
                    <button 
                      onClick={resetDemoSimulation}
                      className="bg-[#1e293b] hover:bg-[#334155] border border-[#223049] text-slate-300 font-bold text-sm px-5 py-3 rounded-lg transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic UI simulator window */}
              <div className="lg:col-span-7 border border-[#223049] rounded-2xl bg-[#0b1120] shadow-2xl overflow-hidden relative flex flex-col justify-between">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#151f32] border-b border-[#223049]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block"></span>
                    <span className="font-semibold text-slate-300 text-[10px] ml-2 font-mono">DocuWise Simulator v1.0.0</span>
                  </div>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.2 rounded font-bold">
                    ACTIVE ENVIRONMENT
                  </span>
                </div>

                <div className="flex-1 p-4 grid grid-cols-12 gap-4 min-h-[340px]">
                  {/* Table area in simulator */}
                  <div className="col-span-8 bg-[#090d18] border border-[#223049] rounded-lg p-3 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-slate-400">
                      <span>Imported Files Table</span>
                      <span>{demoFiles.length} files processed</span>
                    </div>

                    <table className="w-full text-left font-sans text-[10px]">
                      <thead>
                        <tr className="border-b border-[#223049] text-slate-400 font-bold">
                          <th className="pb-1">Filename</th>
                          <th className="pb-1">Category</th>
                          <th className="pb-1">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoFiles.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center py-12 text-slate-600 italic">
                              Queue empty. Run simulation to populate.
                            </td>
                          </tr>
                        ) : (
                          demoFiles.map((doc, idx) => (
                            <tr key={idx} className="border-b border-[#1d2739]/30 hover:bg-[#151f32]/20">
                              <td className="py-1 font-medium text-slate-200 truncate max-w-[120px]">
                                📄 {doc.name}
                              </td>
                              <td className="py-1">
                                <span className="bg-[#151f32] px-1 py-0.2 rounded border border-[#223049] text-[9px] text-blue-300">
                                  {doc.cat}
                                </span>
                              </td>
                              <td className="py-1 text-slate-400">{doc.size}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Sidebar area in simulator */}
                  <div className="col-span-4 flex flex-col gap-3">
                    {/* Duplicate alerts inside simulation */}
                    <div className="bg-[#090d18] border border-[#223049] rounded-lg p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-[9px] text-slate-400 border-b border-[#223049] pb-1 mb-1.5 uppercase font-bold tracking-wider">
                          Deduplication
                        </div>
                        {demoDups.length === 0 ? (
                          <div className="text-slate-600 italic text-[9px] py-6 text-center">
                            No duplicate models computed yet.
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <div className="text-[10px] text-red-400 font-bold">
                              Saved Space: {demoSavings.toFixed(1)} MB
                            </div>
                            {demoDups.map((dup, idx) => (
                              <div key={idx} className="bg-[#151f32] border border-[#223049] p-1 rounded text-[8px]">
                                <div className="text-slate-300 font-semibold truncate">{dup.fileA}</div>
                                <div className="text-slate-500 font-medium truncate">vs {dup.fileB}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {demoDups.length > 0 && (
                        <button className="w-full bg-[#ef4444] text-white p-1 rounded text-[9px] font-bold mt-2 hover:bg-red-600 transition">
                          🧹 Resolve All
                        </button>
                      )}
                    </div>

                    {/* Organized tree output in simulation */}
                    <div className="bg-[#090d18] border border-[#223049] rounded-lg p-2.5 h-36 overflow-y-auto">
                      <div className="font-mono text-[9px] text-slate-400 border-b border-[#223049] pb-1 mb-1.5 uppercase font-bold tracking-wider">
                        Virtual Directories
                      </div>
                      {demoState !== "organize" && demoState !== "finished" ? (
                        <div className="text-slate-600 italic text-[9px] py-4 text-center">
                          Waiting for categorize run...
                        </div>
                      ) : (
                        <div className="font-mono text-[9px] text-emerald-400 space-y-1">
                          <div>📁 Invoices/</div>
                          <div className="pl-3 text-slate-400 text-[8px]">📁 2026-06/</div>
                          <div>📁 Research Papers/</div>
                          <div>📁 Contracts/</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="bg-[#0b1120] border-t border-[#223049] px-3 py-1 flex items-center justify-between text-slate-500 text-[9px] font-mono">
                  <span>SQLite Transactions: OK</span>
                  <span>Active Model: Local Gemini-1.5-Flash</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. Screenshots Section --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Designed For High-Fidelity Local Processing
            </h2>
            <p className="text-slate-400 text-lg">
              Explore the interfaces of the DocuWise PyQt6 desktop application. Click any screenshot card to enlarge it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCREENSHOTS.map((screen, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveLightbox(idx)}
                className="bg-[#1E293B] border border-[#223049]/80 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500/40 hover:glow-blue transition group cursor-pointer flex flex-col h-[340px]"
              >
                {/* Visual rendering of mockup */}
                <div className="flex-1 p-2 bg-[#0F172A]/80 border-b border-[#223049]/60 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#0F172A]/40 group-hover:bg-transparent transition duration-300 z-10"></div>
                  <div className="scale-[0.80] origin-top h-[125%] transition duration-300 group-hover:scale-[0.82]">
                    {screen.render()}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-lg p-1.5 text-slate-400 text-[10px] flex items-center gap-1 z-20">
                    <Eye className="w-3.5 h-3.5" /> <span>Click to enlarge</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-slate-100 text-base">{screen.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed truncate">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Screenshot Lightbox Modal */}
          <AnimatePresence>
            {activeLightbox !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14]/90 p-4 sm:p-6 lg:p-8"
              >
                <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveLightbox(null)}></div>
                <motion.div 
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  className="relative w-full max-w-5xl bg-[#0b1120] border border-[#223049] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-[560px] md:h-[480px]"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveLightbox(null)}
                    className="absolute top-3 right-3 bg-slate-900/60 hover:bg-slate-900/90 text-slate-400 hover:text-white p-2 rounded-full border border-[#223049] transition z-30"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Rendered Mockup */}
                  <div className="flex-1 bg-[#090d18] p-3 overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full max-h-[420px]">
                      {SCREENSHOTS[activeLightbox].render()}
                    </div>
                  </div>

                  {/* Info sidebar */}
                  <div className="w-full md:w-80 p-6 bg-[#131824] border-t md:border-t-0 md:border-l border-[#223049] flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">Screenshot Details</span>
                      <h3 className="font-display font-extrabold text-white text-xl">{SCREENSHOTS[activeLightbox].title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {SCREENSHOTS[activeLightbox].description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-[#0b1120] border border-[#223049] p-3 rounded-lg text-xs text-slate-400 flex gap-2">
                        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>All processing steps demonstrated in this mockup occur entirely locally on the host CPU.</span>
                      </div>
                      <button 
                        onClick={() => setActiveLightbox(null)}
                        className="w-full bg-[#1e293b] hover:bg-[#334155] border border-[#223049] text-white py-2 rounded-lg font-bold text-xs transition"
                      >
                        Back to Screenshot Grid
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- 6. How It Works Section --- */}
        <section id="how-it-works" className="bg-[#0b1120] py-24 border-y border-[#223049]/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                How It Works
              </h2>
              <p className="text-slate-400 text-lg">
                DocuWise maps documents to clean indexes in 5 simple, robust stages.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-stretch relative">
              {/* Connector Line decoration */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 z-0"></div>

              {/* Step 1 */}
              <div className="bg-[#131824] border border-[#223049] rounded-xl p-5 relative z-10 flex flex-col justify-between hover:border-blue-500/40 transition">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 flex items-center justify-center font-mono">
                    01
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm font-display">Upload PDFs</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Select any storage volume, hard disk partition, or local folder to index documents instantly.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#131824] border border-[#223049] rounded-xl p-5 relative z-10 flex flex-col justify-between hover:border-purple-500/40 transition">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20 flex items-center justify-center font-mono">
                    02
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm font-display">OCR Content Extraction</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Local text extractors read raw document strings, extracting data from scanned receipts and flat images.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#131824] border border-[#223049] rounded-xl p-5 relative z-10 flex flex-col justify-between hover:border-cyan-500/40 transition">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 flex items-center justify-center font-mono">
                    03
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm font-display">AI Text Understanding</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Semantic models classify contents, generate summaries, tag metadata, and determine keeping score values.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#131824] border border-[#223049] rounded-xl p-5 relative z-10 flex flex-col justify-between hover:border-blue-500/40 transition">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 flex items-center justify-center font-mono">
                    04
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm font-display">Duplicate Matching</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Compares semantic indexes to flag identical clones and similar draft files instantly to save disk storage.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-[#131824] border border-[#223049] rounded-xl p-5 relative z-10 flex flex-col justify-between hover:border-emerald-500/40 transition">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center justify-center font-mono">
                    05
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm font-display">Auto Organization</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Writes files automatically to category directory trees (Invoices, Resumes, Legal, etc.) in one click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 7. Technology Section --- */}
        <section id="technology" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Built With Modern AI Infrastructure
            </h2>
            <p className="text-slate-400 text-lg">
              DocuWise pairs powerful frontend elements with specialized backend engines to run offline-first securely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend Card */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="text-blue-500 bg-blue-500/10 border border-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-slate-100 text-base">Desktop UI</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Electron & PyQt6 architecture enables native file interactions, custom context menus, dialog prompts, and background thread loops.
                </p>
              </div>
              <div className="border-t border-[#223049] pt-4 mt-6 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                <span>Frontend</span>
                <span className="text-blue-400">Electron / PyQt6</span>
              </div>
            </div>

            {/* Backend Card */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="text-purple-500 bg-purple-500/10 border border-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-slate-100 text-base">Python Engine</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Fast, scriptable processing logic. Harnesses SQLite metadata mapping, thread workers, and structured configuration variables.
                </p>
              </div>
              <div className="border-t border-[#223049] pt-4 mt-6 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                <span>Backend</span>
                <span className="text-purple-400">Python 3.12</span>
              </div>
            </div>

            {/* Database Card */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-slate-100 text-base">Local SQLite DB</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  All metadata tables, tags indexes, duplicate vectors relationship files, and rule instructions store securely inside SQLite WAL journal.
                </p>
              </div>
              <div className="border-t border-[#223049] pt-4 mt-6 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                <span>Database</span>
                <span className="text-cyan-400">SQLite3 (WAL)</span>
              </div>
            </div>

            {/* AI Infrastructure Card */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-slate-100 text-base">Local AI & OCR</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Leverages Gemini API logic alongside local Tesseract OCR binaries and PyMuPDF components to isolate data paths offline.
                </p>
              </div>
              <div className="border-t border-[#223049] pt-4 mt-6 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                <span>OCR & AI</span>
                <span className="text-emerald-400">Gemini / Tesseract</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 8. Metrics Section --- */}
        <section className="bg-[#0b1120] py-24 border-y border-[#223049]/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Tested On Real Document Collections
              </h2>
              <p className="text-slate-400 text-lg">
                DocuWise is built to process collections of PDFs locally. Experience real-world performance metrics.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#131824] border border-[#223049] rounded-2xl p-6 text-center shadow-lg hover:border-blue-500/30 transition">
                <div className="text-5xl font-extrabold font-display bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-2">
                  97+
                </div>
                <div className="text-sm font-semibold text-slate-200">Documents Processed</div>
                <p className="text-slate-500 text-xs mt-2">Parsed through metadata generators and content matchers.</p>
              </div>

              <div className="bg-[#131824] border border-[#223049] rounded-2xl p-6 text-center shadow-lg hover:border-purple-500/30 transition">
                <div className="text-5xl font-extrabold font-display bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-2">
                  35+
                </div>
                <div className="text-sm font-semibold text-slate-200">Duplicates Detected</div>
                <p className="text-slate-500 text-xs mt-2">Content-matched replicates flagged securely to save disk space.</p>
              </div>

              <div className="bg-[#131824] border border-[#223049] rounded-2xl p-6 text-center shadow-lg hover:border-cyan-500/30 transition">
                <div className="text-5xl font-extrabold font-display bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent mb-2">
                  83+
                </div>
                <div className="text-sm font-semibold text-slate-200">Documents Classified</div>
                <p className="text-slate-500 text-xs mt-2">Allocated categories automatically (Invoices, Resumes, etc.).</p>
              </div>

              <div className="bg-[#131824] border border-[#223049] rounded-2xl p-6 text-center shadow-lg hover:border-emerald-500/30 transition">
                <div className="text-5xl font-extrabold font-display bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-sm font-semibold text-slate-200">Local Processing</div>
                <p className="text-slate-500 text-xs mt-2">All OCR conversions, database files, and scripts run offline.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 9. Competitive Comparison --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              How DocuWise Compares
            </h2>
            <p className="text-slate-400 text-lg">
              Compare DocuWise against standard operating system tools and remote cloud repositories.
            </p>
          </div>

          <div className="bg-[#1E293B] border border-[#223049] rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#151f32] border-b border-[#223049] text-slate-300 font-bold">
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5">File Explorer</th>
                  <th className="p-4 sm:p-5">Google Drive</th>
                  <th className="p-4 sm:p-5 text-blue-400 bg-blue-500/5">DocuWise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#223049]/40 text-slate-300">
                <tr className="hover:bg-[#151f32]/25">
                  <td className="p-4 sm:p-5 font-semibold text-slate-200">OCR Extraction</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-emerald-400">Yes</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">Yes</td>
                </tr>
                <tr className="hover:bg-[#151f32]/25">
                  <td className="p-4 sm:p-5 font-semibold text-slate-200">AI Classification</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-orange-400">Limited</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">Yes</td>
                </tr>
                <tr className="hover:bg-[#151f32]/25">
                  <td className="p-4 sm:p-5 font-semibold text-slate-200">Duplicate Detection</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">Yes</td>
                </tr>
                <tr className="hover:bg-[#151f32]/25">
                  <td className="p-4 sm:p-5 font-semibold text-slate-200">Offline Mode</td>
                  <td className="p-4 sm:p-5 text-emerald-400">Yes</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">Yes</td>
                </tr>
                <tr className="hover:bg-[#151f32]/25">
                  <td className="p-4 sm:p-5 font-semibold text-slate-200">Smart Organization</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-slate-500">No</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- 10. Download Section --- */}
        <section className="bg-gradient-to-b from-[#0F172A] to-[#0b1120] py-24 border-t border-[#223049]/40 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              Ready to Organize Your Documents?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Ditch unorganized folder piles and duplicate files. Get DocuWise locally today. No accounts, no sign-ins, fully offline-first.
            </p>

            <div className="flex flex-col items-center gap-4 pt-2">
              <a 
                href="https://github.com/PiyushAgarwal-16/DocuWise/archive/refs/tags/Application.zip" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-extrabold text-lg transition flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/35 border border-blue-400/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-5.5 h-5.5" /> Download for Windows
              </a>
              <a 
                href="#features" 
                className="text-slate-400 hover:text-white transition text-sm font-semibold underline underline-offset-4"
              >
                View Documentation & Setup Guide
              </a>
            </div>

            <div className="pt-8 border-t border-[#223049]/60 max-w-xl mx-auto grid grid-cols-3 gap-6 text-xs text-slate-400 font-mono">
              <div className="text-center">
                <span className="block text-slate-300 font-bold">Version</span>
                <span>v1.0.0</span>
              </div>
              <div className="text-center">
                <span className="block text-slate-300 font-bold">Release Date</span>
                <span>June 2026</span>
              </div>
              <div className="text-center">
                <span className="block text-slate-300 font-bold">File Size</span>
                <span>~85 MB</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 11. FAQ Section --- */}
        <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to know about setting up and using DocuWise.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white transition font-display text-sm sm:text-base"
              >
                <span>What file formats are supported?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === 0 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 0 && (
                <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#223049]/40 pt-4">
                  DocuWise supports PDF documents, DOCX files, PPTX slideshows, raw TXT records, and flat image files (PNG, JPG, TIFF) via high-fidelity OCR scanning.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white transition font-display text-sm sm:text-base"
              >
                <span>Does DocuWise work offline?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === 1 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 1 && (
                <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#223049]/40 pt-4">
                  Yes, DocuWise is fully offline-first. Text extraction, SQLite query logging, and duplicate matching models operate completely locally on your CPU. Remote calls occur only if you configure active API endpoints for Gemini or NVIDIA.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white transition font-display text-sm sm:text-base"
              >
                <span>Is my data uploaded?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === 2 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 2 && (
                <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#223049]/40 pt-4">
                  No. All your document files stay strictly on your local computer. SQLite databases write metadata locally in the workspace storage directory. No document uploads are performed.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white transition font-display text-sm sm:text-base"
              >
                <span>How many PDFs can it process?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === 3 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 3 && (
                <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#223049]/40 pt-4">
                  DocuWise can index collections with thousands of documents. It uses a PyQt6 background worker thread alongside an SQLite connection to ensure large indexing tasks run smoothly without freezes.
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white transition font-display text-sm sm:text-base"
              >
                <span>What AI model is used?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === 4 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 4 && (
                <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#223049]/40 pt-4">
                  The semantic engine supports Google Gemini (Gemini-1.5-Flash) and NVIDIA NIM model payloads. A local fallback pipeline is also bundled if no API keys are available.
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="bg-[#1E293B] border border-[#223049] rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white transition font-display text-sm sm:text-base"
              >
                <span>Is it free?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === 5 ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === 5 && (
                <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-[#223049]/40 pt-4">
                  Yes. DocuWise is open-source and completely free to use. You only need your own API keys for Gemini or NVIDIA if you want to use the cloud analysis engines.
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-[#0b1120] border-t border-[#223049] py-12 relative z-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/20">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                Docu<span className="text-blue-500">Wise</span>
              </span>
            </div>
            <p className="leading-relaxed max-w-xs text-slate-500">
              Offline-first intelligent document organizer. Structure your files locally and securely.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-200 text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              <li><a href="#demo" className="hover:text-blue-400 transition">Demo</a></li>
              <li><a href="#technology" className="hover:text-blue-400 transition">Technology</a></li>
              <li><a href="https://github.com/PiyushAgarwal-16/DocuWise/archive/refs/tags/Application.zip" className="hover:text-blue-400 transition">Download Setup</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-200 text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-blue-400 transition">FAQ</a></li>
              <li><a href="https://github.com/Yuvansh598/DocuWise" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a></li>
              <li><span className="text-slate-600 cursor-not-allowed">Documentation</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Privacy Policy</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-200 text-sm mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">LinkedIn</a></li>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Twitter/X</a></li>
              <li><span className="text-slate-600 cursor-not-allowed">Contact Support</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#223049]/40 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <span>© 2026 DocuWise. All rights reserved.</span>
          <span className="font-mono">Offline Processing Certified</span>
        </div>
      </footer>
    </div>
  );
}
