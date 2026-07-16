"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const sizeChart = [
  { size: "S", waist: "28-30\"", hip: "34-36\"" },
  { size: "M", waist: "31-33\"", hip: "37-39\"" },
  { size: "L", waist: "34-36\"", hip: "40-42\"" },
  { size: "XL", waist: "37-39\"", hip: "43-45\"" },
  { size: "XXL", waist: "40-42\"", hip: "46-48\"" },
];

export default function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 z-[70]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-lg w-full bg-paper rounded-2xl z-[70] p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex items-center justify-between mb-6">
          <p className="font-display text-2xl">Size Guide</p>
          <button aria-label="Close" onClick={onClose} className="cursor-pointer p-2">
            <X size={20} />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-charcoal/50 text-xs tracking-wide">
              <th className="py-2">SIZE</th>
              <th className="py-2">WAIST</th>
              <th className="py-2">HIP</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((row) => (
              <tr key={row.size} className="border-b border-line/60">
                <td className="py-3 font-medium">{row.size}</td>
                <td className="py-3 text-charcoal/70">{row.waist}</td>
                <td className="py-3 text-charcoal/70">{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-charcoal/50 mt-5 leading-relaxed">
          Fit recommendation: if you&apos;re between sizes, we suggest sizing up for a more relaxed fit or down for
          a snugger, more supportive fit.
        </p>
      </motion.div>
    </>
  );
}
