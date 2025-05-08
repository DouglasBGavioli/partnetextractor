export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 p-6 bg-livelo-pink text-white text-center md:text-left">
            <p className="text-sm font-semibold">
                © 2025 Extrator de Código de Parceiro
            </p>
            <p className="text-sm">
                Desenvolvido por{" "}
                <a
                    href="https://www.linkedin.com/in/douglasbgavioli/"
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
