import LogoCircle from '@recursos/RECURSOS/logo_circle.svg'
import ZanahoriasPuntos from '@recursos/RECURSOS/puntos_zanahorias.svg'
import FooterSVG from '@recursos/RECURSOS/footer2.svg'
import Header from '@src/components/Header'

const Footer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative">
            <div className="w-full">
                <FooterSVG />
            </div>
            <div className="bg-[#691F32] text-white pb-4">
                {children}
            </div>
        </div>
    );
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <Header/>

            {/* Overlays */ }
            <div className="absolute top-0 left-0 z-30">
                <LogoCircle className="m-10" />
            </div>

            <div className="absolute top-0 right-0 z-20 mt-[6rem]">
                <ZanahoriasPuntos />
            </div>

    {/* Main content */ }
            <main className="relative">
                {children}
            </main>

            <Footer>
                <p className="text-center text-sm">© 2025 Todos los derechos reservados</p>
                <p className="text-center text-xs">
                    Conoce los <a href="#" className="underline">Términos y condiciones</a> y la <a href="#" className="underline">Política de Tratamiento de Datos</a>
                </p>
            </Footer>
        </div >
    )
}