import { useState, useCallback } from "react";
import { Calculator, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BUTTONS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

export default function FloatingCalculator() {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(false); // next digit overwrites display

  const compute = useCallback((a: number, operator: string, b: number): number => {
    switch (operator) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? 0 : a / b;
      default: return b;
    }
  }, []);

  const fmt = (n: number) => {
    const s = String(parseFloat(n.toPrecision(10)));
    return s.length > 12 ? n.toExponential(4) : s;
  };

  const press = (btn: string) => {
    if (btn === "C") {
      setDisplay("0"); setStored(null); setOp(null); setFresh(false);
      return;
    }
    if (btn === "⌫") {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
      return;
    }
    if (btn === "±") {
      setDisplay((d) => fmt(-parseFloat(d)));
      return;
    }
    if (btn === "%") {
      setDisplay((d) => fmt(parseFloat(d) / 100));
      return;
    }
    if (["+", "−", "×", "÷"].includes(btn)) {
      const cur = parseFloat(display);
      if (stored !== null && op && !fresh) {
        const result = compute(stored, op, cur);
        setStored(result);
        setDisplay(fmt(result));
      } else {
        setStored(cur);
      }
      setOp(btn);
      setFresh(true);
      return;
    }
    if (btn === "=") {
      if (stored !== null && op) {
        const result = compute(stored, op, parseFloat(display));
        setDisplay(fmt(result));
        setStored(null); setOp(null); setFresh(false);
      }
      return;
    }
    // digit / dot
    if (btn === "." && display.includes(".") && !fresh) return;
    setDisplay((d) => {
      if (fresh || d === "0") return btn === "." ? "0." : btn;
      return d.length < 12 ? d + btn : d;
    });
    setFresh(false);
  };

  const isOp = (btn: string) => ["+", "−", "×", "÷"].includes(btn);
  const isEq = (btn: string) => btn === "=";

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle calculator"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
        style={{ width: 52, height: 52 }}
      >
        {open ? <X className="w-5 h-5" /> : <Calculator className="w-5 h-5" />}
      </button>

      {/* Calculator panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-64 rounded-2xl overflow-hidden shadow-2xl border border-border bg-background"
          >
            {/* Display */}
            <div className="bg-secondary px-4 py-4 text-right">
              <p className="text-xs text-muted-foreground h-4">
                {stored !== null && op ? `${fmt(stored)} ${op}` : ""}
              </p>
              <p className="text-3xl font-light text-foreground truncate">{display}</p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-px bg-border">
              {BUTTONS.flat().map((btn, i) => (
                <button
                  key={i}
                  onClick={() => press(btn)}
                  className={`
                    py-4 text-sm font-medium transition-colors
                    ${btn === "0" ? "" : ""}
                    ${isEq(btn)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : isOp(btn)
                        ? "bg-secondary text-primary hover:bg-secondary/70"
                        : btn === "C" || btn === "±" || btn === "%"
                          ? "bg-zinc-200 dark:bg-zinc-700 text-foreground hover:bg-zinc-300 dark:hover:bg-zinc-600"
                          : "bg-background text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  {btn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
