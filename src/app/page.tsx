'use client'

import {  useState } from "react"
import { usePartners } from "@/contexts/Partners";
import Fuse from 'fuse.js';

export default function Home() {
  const [inputPartners, setInputPartners] = useState<string>('');
  const [partnersCodes, setPartnerdsCodes] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<string[]>([]);

  const { partners } = usePartners();

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

    return listaLimpa;
  }

  const extractPartnersCods = () => {
    const normalizedInput = handleParceirosInput(inputPartners);
    setNotFound([]);
  
    const fuse = new Fuse(partners, {
      keys: ['name'],
      threshold: 0.3, // ajusta a sensibilidade (0 = exato, 1 = totalmente permissivo)
      includeScore: true,
    });
  
    const codigos: string[] = [];
    const naoEncontrados: string[] = [];
  
    normalizedInput.forEach((item) => {
      const result = fuse.search(item);
  
      if (result.length > 0 && result[0].score! < 0.4) {
        codigos.push(result[0].item.code);
      } else {
        naoEncontrados.push(item);
      }
    });
  
    setPartnerdsCodes(codigos);
    setNotFound(naoEncontrados);
  };
  
  function copiarParaClipboard() {
    navigator.clipboard.writeText(partnersCodes.join(','));
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
          onClick={extractPartnersCods}
        >
          Gerar Códigos
        </button>

        <div className="bg-gray-100 p-3 rounded max-h-60 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
          {partnersCodes.length > 0 ? partnersCodes.join(",") : "Nenhum código gerado."}
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          onClick={copiarParaClipboard}
        >
          Copiar Códigos
        </button>
      </div>
      <div>
        {notFound.length > 0 && (
          <div className="bg-red-100 text-red-700 p-4 rounded mt-4">
            <h2 className="font-bold text-black">Parceiros não encontrados:</h2>
            <p className="text-gray-700">Vá até a sessão parceiros e adicione-o com seu respectivo código!</p>
            <ul className="list-disc pl-5">
              {notFound.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
