export default function Tutorial() {
    return (
        <div className="flex flex-col items-center min-h-screen p-4 sm:p-6">
            <h1 className="text-xl pt-2 text-livelo-pink text-center">Adicionar Parceiro</h1>
            <p className="text-sm sm:text-base text-gray-600 text-center">
                Como usar o Extrator de Código de Parceiro
            </p>

            <div className="w-full max-w-3xl pt-6 px-2">
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/Fy72gA8YqjA?si=Oi_n-TlM2puOgVnA"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
