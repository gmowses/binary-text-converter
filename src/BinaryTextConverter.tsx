import { useState } from 'react'
import { Copy, Sun, Moon, Languages, Binary } from 'lucide-react'

const translations = {
  en: {
    title: 'Binary ↔ Text Converter',
    subtitle: 'Convert text to binary (8-bit per character) and binary back to text. ASCII table included.',
    textToBinary: 'Text to Binary',
    binaryToText: 'Binary to Text',
    inputText: 'Input text',
    inputBinary: 'Input binary (8-bit groups separated by spaces)',
    output: 'Output',
    textPlaceholder: 'Type your text here...',
    binaryPlaceholder: '01001000 01100101 01101100 01101100 01101111',
    convert: 'Convert',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    asciiTable: 'ASCII Table',
    ascii: 'ASCII',
    binary: 'Binary',
    hex: 'Hex',
    char: 'Char',
    builtBy: 'Built by',
  },
  pt: {
    title: 'Conversor Binario ↔ Texto',
    subtitle: 'Converta texto para binario (8 bits por caractere) e binario de volta para texto. Tabela ASCII inclusa.',
    textToBinary: 'Texto para Binario',
    binaryToText: 'Binario para Texto',
    inputText: 'Texto de entrada',
    inputBinary: 'Binario de entrada (grupos de 8 bits separados por espacos)',
    output: 'Saida',
    textPlaceholder: 'Digite seu texto aqui...',
    binaryPlaceholder: '01001000 01100101 01101100 01101100 01101111',
    convert: 'Converter',
    copy: 'Copiar',
    copied: 'Copiado!',
    clear: 'Limpar',
    asciiTable: 'Tabela ASCII',
    ascii: 'ASCII',
    binary: 'Binario',
    hex: 'Hex',
    char: 'Char',
    builtBy: 'Criado por',
  },
} as const

type Lang = keyof typeof translations

function textToBin(text: string): string {
  return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
}

function binToText(bin: string): string {
  const groups = bin.trim().split(/\s+/)
  return groups.map(g => {
    const n = parseInt(g, 2)
    if (isNaN(n) || g.length === 0) return '?'
    return String.fromCharCode(n)
  }).join('')
}

// Build printable ASCII table (32-126)
const ASCII_ROWS = Array.from({ length: 95 }, (_, i) => {
  const code = i + 32
  const char = code === 32 ? 'SPC' : String.fromCharCode(code)
  const binary = code.toString(2).padStart(8, '0')
  const hex = code.toString(16).toUpperCase().padStart(2, '0')
  return { code, char, binary, hex }
})

export default function BinaryTextConverter() {
  const [lang, setLang] = useState<Lang>(() => navigator.language.startsWith('pt') ? 'pt' : 'en')
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [mode, setMode] = useState<'text2bin' | 'bin2text'>('text2bin')
  const [input, setInput] = useState('Hello')
  const [copied, setCopied] = useState(false)

  const t = translations[lang]

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }

  const output = mode === 'text2bin' ? textToBin(input) : binToText(input)

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Binary size={18} className="text-white" />
            </div>
            <span className="font-semibold">Binary ↔ Text</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleDark} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/gmowses/binary-text-converter" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">{t.subtitle}</p>
          </div>

          <div className="flex gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 w-fit">
            {([['text2bin', t.textToBinary], ['bin2text', t.binaryToText]] as const).map(([m, label]) => (
              <button
                key={m}
                onClick={() => { setMode(m); setInput('') }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === m ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
              <label className="text-sm font-medium">{mode === 'text2bin' ? t.inputText : t.inputBinary}</label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={mode === 'text2bin' ? t.textPlaceholder : t.binaryPlaceholder}
                rows={8}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => setInput('')}
                className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {t.clear}
              </button>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{t.output}</label>
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
                >
                  <Copy size={12} />
                  {copied ? t.copied : t.copy}
                </button>
              </div>
              <div className="min-h-[200px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm break-all whitespace-pre-wrap select-all">
                {output || <span className="text-zinc-400 italic">...</span>}
              </div>
            </div>
          </div>

          {/* ASCII Table */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
            <h2 className="font-semibold">{t.asciiTable} (32–126)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.ascii}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.char}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.binary}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.hex}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.ascii}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.char}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.binary}</th>
                    <th className="text-left py-2 px-2 text-zinc-500 font-medium">{t.hex}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(ASCII_ROWS.length / 2) }, (_, i) => {
                    const left = ASCII_ROWS[i]
                    const right = ASCII_ROWS[i + Math.ceil(ASCII_ROWS.length / 2)]
                    return (
                      <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/20">
                        <td className="py-1 px-2 tabular-nums">{left?.code}</td>
                        <td className="py-1 px-2 font-mono font-bold text-green-600 dark:text-green-400">{left?.char}</td>
                        <td className="py-1 px-2 font-mono text-zinc-500">{left?.binary}</td>
                        <td className="py-1 px-2 font-mono">{left?.hex}</td>
                        {right ? (
                          <>
                            <td className="py-1 px-2 tabular-nums">{right.code}</td>
                            <td className="py-1 px-2 font-mono font-bold text-green-600 dark:text-green-400">{right.char}</td>
                            <td className="py-1 px-2 font-mono text-zinc-500">{right.binary}</td>
                            <td className="py-1 px-2 font-mono">{right.hex}</td>
                          </>
                        ) : <><td /><td /><td /><td /></>}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <span>{t.builtBy} <a href="https://github.com/gmowses" className="text-zinc-600 dark:text-zinc-300 hover:text-green-500 transition-colors">Gabriel Mowses</a></span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  )
}
