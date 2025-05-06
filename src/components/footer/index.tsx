export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-2 p-6 bg-livelo-pink text-white text-center">
            <p className="text-sm font-semibold">© 2025 Extrator de Código de Parceiro</p>
            <p className="text-sm">
                Desenvolvido por{" "}
                <a
                    href="https://github.com/douglasgavioli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pink-200 font-semibold"
                >
                    Douglas Gavioli
                </a>
            </p>
        </footer>
    );
}
