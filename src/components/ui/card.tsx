import { MailsIcon, Phone } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Whatsapp = () => <FontAwesomeIcon icon={faWhatsapp} />;

interface CardProps {
  title: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export function Card({
  title,
  name,
  address,
  phone,
  whatsapp,
  email,
}: CardProps) {
  return (
    <section>
      <div className="flex h-[27rem] w-[22rem] flex-col items-center justify-center space-y-4 rounded-2xl bg-[#DEDEDE] px-8">
        <div className="absolute translate-x-[-70px] translate-y-[-200px] items-center justify-center rounded-xl bg-[#262626] px-2 py-2">
          <span className="font-bold text-white">
            DISTRIBUIDOR <span className="text-[#FFCF8B]">PRO</span>
          </span>
        </div>
        <div className="flex w-[95%] flex-col gap-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div>
            <div className="image-wrapper mb-2 h-14 w-14 overflow-hidden rounded-full bg-zinc-400"></div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-lg text-gray-500">{address}</p>
          </div>

          <div className="space-y-2">
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
