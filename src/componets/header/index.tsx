import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-8 px-12 border-b-1 border-livelo-pink" >
            <Image alt="Logo Livelo" src="/logo-livelo.svg" width={100} height={100} />
            <nav>
                <ul className="flex gap-6 list-none m-0 p-0">
                    <li>
                        <Link href="/" className="text-livelo-pink hover:text-livelo-pink/60 font-bold font">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
