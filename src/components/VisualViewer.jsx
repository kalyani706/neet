import React from 'react';
import { Image as ImageIcon, Video, Play, AlertCircle } from 'lucide-react';

export default function VisualViewer({ question }) {
  if (!question) return null;

  // Handle Video-Based Question
  if (question.questionType === 'Video' || question.video) {
    const videoData = question.video || {
      title: "Simulated Clinical Video Sequence",
      simulatedObservation: "Diagnostic clinical examination / endoscopy sequence."
    };

    return (
      <div className="mb-6 rounded-xl border border-slate-200 overflow-hidden bg-slate-900 text-white shadow-md">
        <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {videoData.title || "Clinical Video Examination"}
            </span>
          </div>
          <span className="bg-rose-500/20 text-rose-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-rose-500/30">
            VBQ Module
          </span>
        </div>

        {/* Video Player or Fallback Clinical Sequence Visualizer */}
        <div className="p-4 bg-slate-950 flex flex-col items-center justify-center min-h-[220px]">
          {videoData.videoUrl ? (
            <div className="w-full max-w-xl aspect-video bg-black rounded-lg relative flex items-center justify-center border border-slate-800">
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-brand-600/90 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/30 cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 ml-0.5 fill-current" />
                </div>
                <p className="text-xs font-semibold text-slate-300">Local Video Sequence: {videoData.videoUrl}</p>
                <p className="text-[11px] text-slate-500 mt-1">Place local MP4 file in /public/videos for direct rendering</p>
              </div>
            </div>
          ) : null}

          {/* Clinical Visual Observation Breakdown */}
          <div className="w-full mt-3 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-300 mb-1">Observed Semiology / Video Breakdown:</h5>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {videoData.simulatedObservation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Image-Based Educational Schematics & Stored Images
  if (question.imageType || question.image) {
    return (
      <div className="mb-6 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <div className="bg-slate-50 px-4 py-2 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold text-slate-700">
              Medical High-Yield Graphic / Diagnostic Finding
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {question.subject} • {question.topic}
          </span>
        </div>

        <div className="p-4 flex flex-col items-center justify-center bg-slate-100/50 min-h-[180px]">
          {/* Native High-Yield Educational SVG Schematics */}
          {question.imageType === 'ECG_INFERIOR_MI' && (
            <div className="w-full max-w-lg bg-red-50 p-4 rounded-lg border border-red-200 shadow-inner font-mono text-center">
              <div className="text-xs font-bold text-red-900 mb-2">12-Lead Rhythm Strip Lead II, III, aVF (25mm/s, 10mm/mV)</div>
              <svg viewBox="0 0 400 100" className="w-full h-24 stroke-red-600 fill-none stroke-[2]">
                <path d="M 0 50 L 40 50 L 45 42 L 50 62 L 55 10 L 65 50 L 75 30 L 100 30 L 110 50 L 140 50 L 145 42 L 150 62 L 155 10 L 165 50 L 175 30 L 200 30 L 210 50 L 240 50 L 245 42 L 250 62 L 255 10 L 265 50 L 275 30 L 300 30 L 310 50 L 400 50" />
              </svg>
              <div className="text-[11px] text-red-700 mt-2 font-semibold">
                ▲ >3mm ST-Elevation in Lead III with reciprocal ST depression in Lead I/aVL
              </div>
            </div>
          )}

          {question.imageType === 'RENAL_SPIKE_DOME' && (
            <div className="w-full max-w-md bg-slate-900 text-white p-4 rounded-lg border border-slate-800 text-center font-mono">
              <div className="text-xs font-bold text-cyan-400 mb-1">Silver Methenamine (Jones Stain) - Glomerular Basement Membrane</div>
              <svg viewBox="0 0 300 100" className="w-full h-20 fill-none stroke-cyan-400 stroke-2 mx-auto">
                <path d="M 10 70 Q 150 20 290 70" className="stroke-slate-500 stroke-[8]" />
                <path d="M 40 58 L 45 45 L 50 58 M 80 48 L 85 35 L 90 48 M 120 40 L 125 27 L 130 40 M 160 38 L 165 25 L 170 38 M 200 42 L 205 29 L 210 42 M 240 52 L 245 39 L 250 52" className="stroke-cyan-300 stroke-[3]" />
              </svg>
              <div className="text-[11px] text-cyan-200 mt-1">Black 'Spike & Dome' projections along outer subepithelial basement membrane</div>
            </div>
          )}

          {question.imageType === 'COFFEE_BEAN_XRAY' && (
            <div className="w-full max-w-xs bg-slate-900 text-slate-100 p-4 rounded-lg border border-slate-700 text-center font-mono">
              <div className="text-xs font-bold text-amber-400 mb-2">Plain Abdominal Radiograph (Erect)</div>
              <div className="w-28 h-40 border-4 border-slate-600 rounded-full mx-auto relative flex items-center justify-center bg-slate-800">
                <div className="w-1 h-full bg-slate-500"></div>
                <span className="absolute text-[10px] text-amber-300 font-bold bg-slate-900/80 px-1 rounded">Apex to RUQ</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-2">Inverted U-shaped ahaustral loop (Coffee Bean Sign)</div>
            </div>
          )}

          {question.imageType === 'BOOT_SHAPED_HEART' && (
            <div className="w-full max-w-xs bg-slate-900 text-slate-100 p-4 rounded-lg border border-slate-700 text-center font-mono">
              <div className="text-xs font-bold text-sky-400 mb-2">Chest X-Ray (AP View)</div>
              <div className="w-32 h-28 border-2 border-dashed border-sky-400 rounded-br-3xl mx-auto flex items-center justify-center bg-slate-800">
                <span className="text-[11px] text-sky-200 font-bold">Coeur en Sabot</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-2">RV hypertrophy elevating cardiac apex with concavity in pulmonary artery segment</div>
            </div>
          )}

          {question.imageType === 'MUCOR_VS_ASPERGILLUS' && (
            <div className="w-full max-w-md bg-emerald-950 text-emerald-100 p-4 rounded-lg border border-emerald-800 text-center font-mono">
              <div className="text-xs font-bold text-emerald-300 mb-2">GMS / KOH Direct Mount (100x)</div>
              <div className="flex justify-around items-center py-2">
                <div className="border border-emerald-600 p-2 rounded bg-emerald-900/50">
                  <div className="text-[11px] font-bold text-amber-300">Mucorales</div>
                  <div className="text-[10px] text-slate-300">Broad, Aseptate, 90° Branches</div>
                </div>
                <div className="border border-slate-700 p-2 rounded bg-slate-900/50">
                  <div className="text-[11px] font-bold text-slate-400">Aspergillus</div>
                  <div className="text-[10px] text-slate-400">Narrow, Septate, 45° Acute Branches</div>
                </div>
              </div>
            </div>
          )}

          {question.imageType === 'RADIAL_NERVE_GROOVE' && (
            <div className="w-full max-w-sm bg-blue-950 text-blue-100 p-3 rounded-lg border border-blue-800 text-center font-mono text-xs">
              <div className="font-bold text-blue-300">Posterior Humerus Mid-Shaft Anatomy</div>
              <div className="py-2 text-[11px] text-blue-200">
                Radial Nerve & Profunda Brachii traverse spiral groove posterior to deltoid tuberosity
              </div>
            </div>
          )}

          {question.image && !question.imageType && (
            <img 
              src={question.image} 
              alt="Clinical finding" 
              className="max-h-64 rounded-lg object-contain border border-slate-300"
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}