'use client'

import { useState } from "react"
import { usePartners } from "@/contexts/Partners";
import Fuse from 'fuse.js';
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [inputPartners, setInputPartners] = useState<string>('');
  const [partnersCodes, setPartnerdsCodes] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<string[]>([]);

  const { partners } = usePartners();

  const handleParceirosInput = (input: string) => {
    const listaLimpa = input
      .split('\n')
      .map(item =>
        item
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase()
      )
      .filter(item => item.length > 0)

    return listaLimpa;
  }

  const extractPartnersCods = () => {
    const normalizedInput = handleParceirosInput(inputPartners);
    setNotFound([]);

    const fuse = new Fuse(partners, {
      keys: ['name'],
      threshold: 0.3,
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
    if (partnersCodes.length === 0) {
      toast.error("Nenhum código para copiar!");
      return;
    }

    navigator.clipboard.writeText(partnersCodes.join(','))
      .then(() => toast.success("Códigos copiados com sucesso!"))
      .catch(() => toast.error("Erro ao copiar códigos."));
  }

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-8 md:p-24">
      <Toaster position="top-center" reverseOrder={false} />
      
   

      <div className="flex flex-col gap-4 border-2 border-livelo-pink rounded-lg p-4 w-full max-w-3xl mx-auto">
      <h1 className="text-xl py-2 text-livelo-pink text-center md:text-left">
        Extrator de códigos de parceiros
      </h1>
        <textarea
          name="Parceiros"
          id="text-area-parceiros"
          placeholder="Cole os nomes dos parceiros aqui, um por linha..."
          className="w-full h-40 p-2 border border-gray-300 rounded resize-none text-sm"
          value={inputPartners}
          onChange={(e) => setInputPartners(e.target.value)}
        ></textarea>

        <button
          className="bg-livelo-pink text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          onClick={extractPartnersCods}
        >
          Gerar Códigos
        </button>

        <div className="bg-gray-100 p-3 rounded max-h-60 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
          {partnersCodes.length > 0 ? partnersCodes.join(",") : "Nenhum código gerado."}
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={copiarParaClipboard}
        >
          Copiar Códigos
        </button>
      </div>

      {notFound.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded mt-6 max-w-3xl mx-auto">
          <h2 className="font-bold text-black">Parceiros não encontrados:</h2>
          <p className="text-gray-700">
            Vá até a seção{" "}
            <Link className="text-livelo-pink underline" href="/add-partners">
              Parceiros
            </Link>{" "}
            e adicione-o(s) com o respectivo código, se necessário!
          </p>
          <ul className="list-disc pl-5 mt-2">
            {notFound.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
