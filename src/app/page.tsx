'use client'

import { useState } from "react"
import { partners } from "@/data/partners";

export default function Home() {
  const [inputPartners, setInputPartners] = useState<string>('');
  const [normalizedInput, setNormalizedInput] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<string[]>([]);


  console.log("data partners", partners);
  console.log("input partners", inputPartners);
  console.log("input normalized", normalizedInput);

  const handleParceirosInput = (input: string) => {
    const listaLimpa = input
      .split('\n') // separa por linhas
      .map(item =>
        item
          .trim() // remove espaços extras
          .normalize('NFD') // normaliza caracteres acentuados
          .replace(/[\u0300-\u036f]/g, '') // remove acentos
          .replace(/[^a-zA-Z0-9\s]/g, '') // remove caracteres especiais
          .replace(/\s+/g, '-') // substitui espaços por hífens
          .toLowerCase() // deixa tudo em minúsculo
      )
      .filter(item => item.length > 0) // remove linhas vazias

    setNormalizedInput(listaLimpa)
  }

  function copiarParaClipboard() {
    navigator.clipboard.writeText(normalizedInput.join(','));
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
          value={inputPartners}
          onChange={(e) => setInputPartners(e.target.value)}
        ></textarea>

        <button
          className="bg-livelo-pink text-white px-4 py-2 rounded hover:bg-pink-700 transition cursor-pointer"
          onClick={() => handleParceirosInput(inputPartners)}
        >
          Gerar Códigos
        </button>

        <div className="bg-gray-100 p-3 rounded max-h-60 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
          {normalizedInput.length > 0 ? normalizedInput.join(",") : <p className="text-red-600">Nenhum código encontrado</p>}
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          onClick={copiarParaClipboard}
        >
          Copiar Códigos
        </button>
      </div>
    </div>
  )
}
