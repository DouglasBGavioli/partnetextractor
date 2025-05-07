'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { db } from "@/config/firebaseClient";
import {
    collection,
    getDocs,
    addDoc,
} from 'firebase/firestore';

type Partner = {
    code: string;
    name: string;
};

type PartnersContextType = {
    partners: Partner[];
    addPartner: (partner: Partner) => Promise<void>;
    loading: boolean;
};

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const PartnersProvider = ({ children }: { children: React.ReactNode }) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPartners = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'partners'));
            const data = snapshot.docs.map(doc => doc.data() as Partner);            
            setPartners(data);
        } catch (error) {
            console.error('Erro ao buscar parceiros:', error);
        } finally {
            setLoading(false);
        }
    };

    const addPartner = async (partner: Partner) => {
        try {
            await addDoc(collection(db, 'partners'), partner);
            setPartners(prev => [...prev, partner]);
        } catch (error) {
            console.error('Erro ao adicionar parceiro:', error);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    return (
        <PartnersContext.Provider value={{ partners, addPartner, loading }}>
            {children}
        </PartnersContext.Provider>
    );
};

export const usePartners = () => {
    const context = useContext(PartnersContext);
    if (!context) {
        throw new Error('usePartners deve ser usado dentro de PartnersProvider');
    }
    return context;
};
