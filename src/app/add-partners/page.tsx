'use client';
import { usePartners } from "@/contexts/Partners";
import { useState } from "react";
// import { partners } from "@/data/partners";

export default function AddPartners() {
    const [partnerCode, setPartnerCode] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [addStatus, setAddStatus] = useState<{ success: boolean; message: string } | null>(null);

    const { addPartner } = usePartners();

    const handleAddPartner = () => {
        if (!partnerCode.trim() || !partnerName.trim()) {
            setAddStatus({ success: false, message: 'Preencha todos os campos.' });
            return;
        }
        //Adiciona todos parceiros da lista database caso de alguma merda kkk
        // partners.forEach(element => {
        //     addPartner({ code: element.code, name: element.name });
        // });

        addPartner({ code: partnerCode.toUpperCase(), name: partnerName });

        setAddStatus({ success: true, message: 'Parceiro adicionado com sucesso!' });
        setPartnerCode('');
        setPartnerName('');
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <h1 className="text-xl py-2 text-livelo-pink">Adicionar Parceiro</h1>

            <div className="flex flex-col gap-4 border-2 border-livelo-pink rounded-lg p-4 min-w-200 max-w-md">
                <p className="text-sm text-livelo-pink">Informe os dados nos dois campos obrigatórios.</p>
                <input
                    type="text"
                    placeholder="Código do parceiro"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={partnerCode}
                    maxLength={3}
                    minLength={3}
                    onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                />

                <input
                    type="text"
                    placeholder="Nome do parceiro"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                />

                <button
                    className={`px-4 py-2 rounded transition cursor-pointer 
    ${partnerCode.trim() && partnerName.trim()
                            ? 'bg-livelo-pink text-white hover:bg-pink-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    onClick={handleAddPartner}
                    disabled={!partnerCode.trim() || !partnerName.trim()}
                >
                    Adicionar Parceiro
                </button>

                {addStatus && (
                    <div
                        className={`p-2 rounded text-sm ${addStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {addStatus.message}
                    </div>
                )}
            </div>
        </div>

    );
}