import { MailsIcon, Phone } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Whatsapp = () => <FontAwesomeIcon icon={faWhatsapp} />;

interface CardProps {
  plan?: string;
  title: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export function Card({
  plan,
  title,
  name,
  address,
  phone,
  whatsapp,
  email,
}: CardProps) {
  return (
    <section className="p-4">
      <div className="relative flex w-[90vw] flex-col items-center justify-center space-y-4 rounded-2xl bg-[#DEDEDE] px-2 py-10 lg:h-[27rem] lg:w-[22rem]">
        {/* Seção do Plano */}
        <div className="absolute top-[-10px] left-4 rounded-full bg-[#262626] px-4 py-1 text-white">
          <span className="text-2xs font-bold text-nowrap">
            {plan} DISTRIBUIDOR <span className="text-[#FFCF8B]">PRO</span>
          </span>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex w-full flex-col gap-4 px-8 lg:items-start lg:justify-start">
          {/* Título */}
          <h1 className="text-center text-2xl font-bold">{title}</h1>

          {/* Dados de usuário */}
          <div className="flex flex-col items-center gap-2 lg:items-start lg:justify-start">
            <div className="image-wrapper mb-2 h-16 w-16 overflow-hidden rounded-full bg-zinc-400"></div>
            <p className="text-center text-lg font-semibold">{name}</p>
            <p className="text-center text-lg text-gray-500">{address}</p>
          </div>

          {/* Informações de contato */}
          <div className="flex flex-col items-center justify-center gap-4 lg:items-start lg:justify-start">
            <div className="flex items-center gap-2">
              <Whatsapp />
              <span className="text-md text-gray-700">{whatsapp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span className="text-md text-gray-700">{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailsIcon size={14} />
              <span className="text-md text-gray-700">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
