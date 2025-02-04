export interface DistributorProps {
  DISTRIBUTOR_ID: string;
  PLAN_TYPE: "pro" | "starter" | "master";
  ADDRESS: string;
  REGION: "norte" | "nordeste" | "centrooeste" | "sudeste" | "sul";
  POSTAL_CODE: string;
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
