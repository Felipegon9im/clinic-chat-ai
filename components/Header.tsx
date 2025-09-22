
import React from 'react';

const VeheLogo = () => (
    <div className="text-center">
        <svg width="120" height="50" viewBox="0 0 169 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.833 39.0526L27.1664 16.5263H22.9164L11.2497 39.0526H16.083L19.4997 30.5789H28.583L31.9997 39.0526H38.833ZM20.9164 26.8421H27.1664L24.0414 19.5263L20.9164 26.8421Z" fill="#4A4A4A"/>
            <path d="M57.6983 39.0526V16.5263H51.4483V39.0526H57.6983Z" fill="#4A4A4A"/>
            <path d="M72.9691 39.0526L84.6358 16.5263H78.8024L72.9691 28.5263L67.1358 16.5263H61.3024L72.9691 39.0526Z" fill="#4A4A4A"/>
            <path d="M103.438 39.0526V16.5263H97.1875V39.0526H103.438Z" fill="#4A4A4A"/>
            <path d="M129.418 27.7895C129.418 34.0526 124.968 39.5789 117.835 39.5789C110.701 39.5789 106.251 34.0526 106.251 27.7895C106.251 21.5263 110.701 16 117.835 16C124.968 16 129.418 21.5263 129.418 27.7895ZM123.168 27.7895C123.168 24.2632 120.876 20.4737 117.835 20.4737C114.793 20.4737 112.501 24.2632 112.501 27.7895C112.501 31.3158 114.793 35.1053 117.835 35.1053C120.876 35.1053 123.168 31.3158 123.168 27.7895Z" fill="#4A4A4A"/>
            <path d="M153.911 39.0526C158.528 39.0526 162.228 36.6316 163.436 32.8421H157.603C156.936 33.7895 155.603 34.8421 153.828 34.8421C151.369 34.8421 150.128 33.1579 149.828 31.3684H164.228V29.5789C164.228 22.4211 159.978 16.5263 153.495 16.5263C147.886 16.5263 143.728 21.1053 143.728 27.7895C143.728 34.4737 148.019 39.0526 153.911 39.0526ZM153.495 20.7368C155.786 20.7368 157.328 22.4211 157.811 24.1053H149.645C150.253 22.0526 151.686 20.7368 153.495 20.7368Z" fill="#4A4A4A"/>
            <text x="5" y="60" fontFamily="sans-serif" fontSize="12" fill="#4A4A4A">odontologia e estética</text>
        </svg>
    </div>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; hasDropdown?: boolean }> = ({ href, children, hasDropdown }) => (
    <a href={href} className="flex items-center text-[#4A4A4A] hover:text-[#9F656A] transition-colors group">
        <span>{children}</span>
        {hasDropdown && (
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        )}
    </a>
);


const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#4A4A4A] hover:text-[#9F656A] transition-colors">
        {children}
    </a>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const Header: React.FC = () => {
    return (
        <header className="bg-[#FAF8F5] py-4 px-8 md:px-16 shadow-sm sticky top-0 z-40">
            <div className="container mx-auto flex justify-between items-center">
                <VeheLogo />
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase">
                    <NavLink href="#">Home</NavLink>
                    <NavLink href="#" hasDropdown>Nossos Serviços</NavLink>
                    <NavLink href="#">Sobre Nós</NavLink>
                    <NavLink href="#">Cursos</NavLink>
                    <NavLink href="#">Contato</NavLink>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <SocialIcon href="#"><InstagramIcon /></SocialIcon>
                    <SocialIcon href="#"><WhatsAppIcon /></SocialIcon>
                </div>
            </div>
        </header>
    );
};

export default Header;
