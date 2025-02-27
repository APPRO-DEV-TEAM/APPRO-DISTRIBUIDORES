import { MailsIcon, Phone } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Whatsapp = () => <FontAwesomeIcon icon={faWhatsapp} />;

enum PlanEnum {
  starter = "starter",
  master = "master",
  pro = "pro",
}

interface CardProps {
  plan: "starter" | "master" | "pro";
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
      <div className="relative flex w-[90vw] flex-col items-center justify-center space-y-4 rounded-2xl bg-[#DEDEDE] px-2 py-10 shadow-2xl lg:h-[27rem] lg:w-[22rem] lg:shadow-none">
        {/* Seção do Plano */}
        <LabelPlan plan={plan!} />

        {/* Conteúdo Principal */}
        <div className="flex w-full flex-col gap-4 px-8 lg:items-start lg:justify-start">
          {/* Título */}
          <h1 className="text-center text-2xl font-bold">
            {title}
          </h1>

          {/* Dados de usuário */}
          <div className="flex flex-col items-center gap-2 lg:items-start lg:justify-start lg:text-start">
            <div className="image-wrapper mb-2 h-16 w-16 overflow-hidden rounded-full bg-zinc-400"></div>
            <p className="text-center text-lg font-semibold">{name}</p>
            <p className="text-center text-md text-gray-500 lg:text-start">
              {address}
            </p>
          </div>

          {/* Informações de contato */}
          <div className="flex flex-col items-center justify-center gap-4 lg:items-start lg:justify-start">
            <a href={`https://wa.me/${whatsapp}`} className="flex items-center gap-2">
              <Whatsapp />
              <span className="text-md text-gray-700">{whatsapp}</span>
            </a>
            <a href={`tel:+${phone}`} className="flex items-center gap-2">
              <Phone size={14} />
              <span className="text-md text-gray-700">{phone}</span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2">
              <MailsIcon size={14} />
              <span className="text-md text-gray-700">{email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabelPlanStarter({ plan }: { plan: "starter" | "master" | "pro" }) {
  return (
    <div className="absolute top-[-10px] left-4 rounded-full bg-[#C3C3C3] px-4 py-1 text-white">
      <span className="text-2xs font-bold text-nowrap text-[#373737]">
        DISTRIBUIDOR {plan.toUpperCase()}
      </span>
    </div>
  );
}

function LabelPlanMaster({ plan }: { plan: "starter" | "master" | "pro" }) {
  return (
    <div className="absolute top-[-10px] left-4 rounded-full bg-[#1E1E1E] px-4 py-1 text-white">
      <span className="text-2xs font-bold text-nowrap text-[#FFCF8B]">
        DISTRIBUIDOR {plan.toUpperCase()}
      </span>
    </div>
  );
}

function LabelPlanPro({ plan }: { plan: "starter" | "master" | "pro" }) {
  return (
    <div className="absolute top-[-10px] left-4 rounded-full bg-[#1E1E1E] px-4 py-1 text-white">
      <span className="text-2xs font-bold text-nowrap">
        DISTRIBUIDOR{" "}
        <span className="text-[#FFCF8B]">{plan.toUpperCase()}</span>
      </span>
    </div>
  );
}

export function LabelPlan({ plan }: { plan: "starter" | "master" | "pro" }) {
  switch (plan) {
    case PlanEnum.starter:
      return <LabelPlanStarter plan={plan} />;
    case PlanEnum.master:
      return <LabelPlanMaster plan={plan} />;
    case PlanEnum.pro:
      return <LabelPlanPro plan={plan} />;
    default:
      return null;
  }
}
