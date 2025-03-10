export interface DistributorProps {
  DISTRIBUTOR_ID: string;
  AVATAR: string | null;
  PLAN_TYPE: "pro" | "starter" | "master";
  ADDRESS: string;
  LONGITUDE: number;
  LATITUDE: number;
  WHATSAPP_NUMBER: string;
  PHONE_NUMBER: string;
  EMAIL: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
}
