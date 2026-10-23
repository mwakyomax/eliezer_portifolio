import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  // @ts-ignore
  props: Props;
  // @ts-ignore
  state: State;

  constructor(props: Props) {
    // @ts-ignore
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBFB] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EAE3E5] shadow-lg space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-serif font-black text-[#18181B] tracking-tight">
                Something didn't load quite right
              </h1>
              <p className="text-xs text-[#71717A] leading-relaxed">
                We encountered an unexpected interface error. A simple refresh usually restores your session immediately.
              </p>
              {this.state.error?.message && (
                <div className="p-3 bg-[#FAF3F5]/60 rounded-xl border border-[#F4ECEE] text-left text-[11px] font-mono text-[#761A30] break-words">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#761A30] hover:bg-[#5E1426] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
