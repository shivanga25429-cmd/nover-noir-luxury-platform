import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "verifying" | "success" | "error";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Supabase appends tokens as a URL hash fragment, e.g.:
        // /auth/verify#access_token=...&type=signup
        // detectSessionInUrl:true in the client handles this automatically,
        // but we still need to explicitly exchange the token on this page.
        const hash = window.location.hash;

        if (!hash) {
          // No hash — could be a PKCE flow with ?code= query param
          const params = new URLSearchParams(window.location.search);
          const code = params.get("code");
          const errorParam = params.get("error");
          const errorDescription = params.get("error_description");

          if (errorParam) {
            setErrorMsg(errorDescription ?? errorParam);
            setStatus("error");
            return;
          }

          if (code) {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
              setErrorMsg(error.message);
              setStatus("error");
            } else {
              setStatus("success");
              setTimeout(() => navigate("/"), 2500);
            }
            return;
          }

          // No token at all — just redirect home
          navigate("/");
          return;
        }

        // Hash-based token (implicit flow)
        const hashParams = new URLSearchParams(hash.replace("#", ""));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const type = hashParams.get("type");
        const errorParam = hashParams.get("error");
        const errorDescription = hashParams.get("error_description");

        if (errorParam) {
          setErrorMsg(errorDescription ?? errorParam);
          setStatus("error");
          return;
        }

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setErrorMsg(error.message);
            setStatus("error");
          } else {
            setStatus("success");
            setTimeout(() => navigate("/"), 2500);
          }
          return;
        }

        // detectSessionInUrl already handled it — check if we have a session
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setStatus("success");
          setTimeout(() => navigate("/"), 2500);
        } else {
          setErrorMsg("Verification link is invalid or has expired.");
          setStatus("error");
        }
      } catch (err: any) {
        setErrorMsg(err?.message ?? "Something went wrong.");
        setStatus("error");
      }
    };

    handleVerification();
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Brand wordmark */}
        <p className="font-cinzel text-primary text-[10px] tracking-[0.5em] uppercase mb-8">
          Nover Noir
        </p>

        {/* Status card */}
        <div className="border border-border bg-card/60 backdrop-blur-sm p-10 rounded-sm">
          {status === "verifying" && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-5"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin" strokeWidth={1.5} />
              <div>
                <h1 className="font-cinzel text-xl tracking-[0.1em] mb-2">
                  Verifying your email
                </h1>
                <p className="font-cormorant text-base text-muted-foreground italic">
                  Please wait a moment…
                </p>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-150" />
                <CheckCircle2 className="relative w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-cinzel text-xl tracking-[0.1em] mb-2">
                  Email Verified
                </h1>
                <p className="font-cormorant text-base text-muted-foreground italic">
                  Welcome to Nover Noir. Redirecting you now…
                </p>
              </div>

              {/* Gold divider */}
              <div className="flex items-center gap-3 w-full">
                <span className="block h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
                <span className="text-primary text-xs">✦</span>
                <span className="block h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              <button
                onClick={() => navigate("/")}
                className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-primary hover:text-primary/70 transition-colors duration-300"
              >
                Continue to Site →
              </button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              <XCircle className="w-12 h-12 text-destructive" strokeWidth={1.5} />
              <div>
                <h1 className="font-cinzel text-xl tracking-[0.1em] mb-2">
                  Verification Failed
                </h1>
                <p className="font-cormorant text-base text-muted-foreground italic">
                  {errorMsg || "This link may have expired or already been used."}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full">
                <span className="block h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                <span className="text-muted-foreground text-xs">✦</span>
                <span className="block h-px flex-1 bg-gradient-to-l from-transparent to-border" />
              </div>

              <button
                onClick={() => navigate("/")}
                className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Return to Home →
              </button>
            </motion.div>
          )}
        </div>

        {/* Footnote */}
        <p className="font-cormorant text-xs text-muted-foreground/50 italic mt-6">
          If you did not request this, you can safely ignore it.
        </p>
      </motion.div>
    </main>
  );
};

export default EmailVerify;
