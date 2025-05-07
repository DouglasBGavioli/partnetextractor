"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    const linkClass = (href: string) =>
        `font-bold px-3 py-1 rounded transition ${
            isActive(href)
                ? "bg-livelo-pink text-white"
                : "text-livelo-pink hover:text-pink-700"
        }`;

    return (
        <header className="flex items-center justify-between p-8 px-12 border-b border-livelo-pink">
            <div className="flex flex-col items-center gap-1">
            <Image alt="Logo Livelo" src="/logo-livelo.svg" width={100} height={100} />
            <p className="text-2sm font-semibold text-livelo-pink">Partner Code</p>
            </div>
            <nav>
                <ul className="flex gap-6 m-0 p-0 list-none">
                    <li>    
                        <Link href="/" className={linkClass("/")}>Home</Link>
                    </li>
                    <li>
                        <Link href="/add-partners" className={linkClass("/add-partners")}>Parceiros</Link>
                    </li>
                    <li>
                        <Link href="/tutorial" className={linkClass("/tutorial")}>Tutorial</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
