export interface IRootVacancyResponse {
  objects: IVacansy[];
  total: number;
  more: boolean;
  subscription_id: number;
  subscription_active: boolean;
}

export interface IVacansy {
  views_count?: number;
  resumes_all?: number;
  resumes_new?: number;
  contact?: string;
  email?: string;
  url?: string;
  phone?: string;
  fax?: string;
  already_sent_on_vacancy?: boolean;
  favorite?: boolean;
  code?: string;
  external_url?: string;
  refresh_vac?: boolean;
  extend_vac?: boolean;
  resumesubscription_status?: boolean;
  resumesubscription_keywords?: string;
  resumesubscription_kwc?: string;
  resumesubscription_rws?: number;
  moderation_orde?: string;
  canEdit: boolean;
  is_closed: boolean;
  id: number;
  id_client?: number;
  id_user?: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: string;
  profession: string;
  work?: string | null;
  compensation: string | null;
  candidat?: string | null;
  metro: unknown[];
  currency: string;
  vacancyRichText: string;
  covid_vaccination_requirement: CovidVaccinationRequirement;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  is_archive: boolean;
  is_storage: boolean;
  type_of_work: TypeOfWork;
  place_of_work: PlaceOfWork;
  education: Education;
  experience: Experience;
  maritalstatus: Maritalstatus;
  children: Children;
  client: Client;
  languages: ILanguages[];
  driving_licence: string[];
  catalogues: Catalogue[];
  agency: Agency;
  town: Town2;
  rejected: boolean;
  response_info: unknown[];
  phones: string | null;
  faxes: string | null;
  client_logo: string;
  highlight: boolean;
  age_from: number;
  age_to: number;
  gender: Gender;
  firm_name: string;
  firm_activity: string;
  link: string;
  latitude: number;
  longitude: number;
}

export interface ILanguages {
  id: number;
  title: string;
}
export interface CovidVaccinationRequirement {
  id: number;
  title: string;
}

export interface TypeOfWork {
  id: number;
  title: string;
}

export interface PlaceOfWork {
  id: number;
  title: string;
}

export interface Education {
  id: number;
  title: string;
}

export interface Experience {
  id: number;
  title: string;
}

export interface Maritalstatus {
  id: number;
  title: string;
}

export interface Children {
  id: number;
  title: string;
}

export interface Client {
  id: number;
  title: string;
  link: string;
  industry: unknown[];
  description: string;
  vacancy_count: number;
  staff_count: string;
  client_logo: string;
  address: string | null;
  addresses: string[];
  url: string;
  short_reg: boolean;
  is_blocked: boolean;
  registered_date: number;
  town: Town;
}

export interface Town {
  id: number;
  title: string;
  declension: string;
  hasMetro: boolean;
  genitive: string;
}

export interface Catalogue {
  id: number;
  title: string;
  key: number;
  positions: Position[];
}

export interface Position {
  id: number;
  title: string;
  key: number;
}

export interface Agency {
  id: number;
  title: string;
}

export interface Town2 {
  id: number;
  title: string;
  declension: string;
  hasMetro: boolean;
  genitive: string;
}

export interface Gender {
  id: number;
  title: string;
}
