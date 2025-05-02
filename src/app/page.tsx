'use client'

import { useState } from "react"

export default function Home() {
  const [partners, setPartners] = useState<string>('');
  const [partnersRefactored, setPartnersRefactored] = useState<string[]>([]);


  function processarParceiros(input: string): string[] {
    const parceiros = input.split(',');

    const parceirosProcessados = parceiros.map(parceiro =>
      parceiro.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase()
    );

    return parceirosProcessados;
  }

  function tratarLista() {
    if (partners) {
      const parceirosProcessados = processarParceiros(partners);
      setPartnersRefactored(parceirosProcessados);
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-24">
      <h1 className="text-xl py-2 text-livelo-pink">Extrator de código de parceiro</h1>
      <div className="flex flex-col gap-4 border-2 border-livelo-pink rounded-lg p-4 min-h-100 min-w-200">
        <textarea
          name="Parceiros"
          id="text-area-parceiros"
          placeholder="Cole os nomes dos parceiros aqui, um por linha..."
          className="w-full h-40 p-2 border border-gray-300 rounded resize-none"
          value={partners}
          onChange={(e) => setPartners(e.target.value)}
        ></textarea>

        <button
          className="bg-livelo-pink text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          onClick={tratarLista}
        >
          Gerar Códigos
        </button>

        <div className="bg-gray-100 p-3 rounded max-h-60 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
          <p className="text-red-600">Output fake falta tratativa</p>
          {partnersRefactored.join(', ')}
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Copiar Códigos
        </button>
      </div>
    </div>
  )
}
