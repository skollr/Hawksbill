import { ReactNode } from "react";

// Basic interface for properties

export interface PropsInterface {
  children?: ReactNode;
}

// API

export enum APIKeys {
  TOKEN = "PEaenWxYddN6Q/NT1PiOYfz4EsZu7jRXRlpAsNpBU+A=",
  USER = "BPiZbadjt6lpsQKO4wB1aerzpjVIbdqyEdUSyFud+Ps=",
}

export enum APIPaths {
  BASE_URL = "http://127.0.0.1:8000/api",
  WS_URL = "ws://127.0.0.1:8000/api",
  MEDIA_URL = "http://127.0.0.1:8000/media",
}

export interface APIRequestInterface {
  id: number | string;
  registration_date: string;
  modification_date: string;
  client: string;
  client_image: string;
  request_type: string;
  description: string;
  applicant: { detail: string; check: boolean };
  technician: { detail: string; check: boolean };
  is_closed: boolean;
}

export interface APITeamInterface {
  id: number | string;
  user_image: string;
  names: string;
  surnames: string;
  position: string;
  openRequestNumber: number;
  closedRequestNumber: number;
}

export interface APISelectOptions {
  value: string;
  detail: string;
}

// HTTP request methods

export enum HTTPRequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface APIResponseInterface {
  response: boolean;
  data?: any;
  detail?: string;
  errors?: any;
  message?: string;
  redirect?: string;
  token?: string;
  token_is_expired?: boolean;
}

export interface APIUserDataResponseInterface extends APIResponseInterface {
  data?: UserDataInterface;
  username: string;
}

// Login

export enum LoginModes {
  SignIn = "sign__in__mode",
  SignUp = "sign__up__mode",
  Recovery = "recovery__mode",
}

export interface LoginFormInterface {
  document: string;
  email?: string;
  password?: string;
}

export interface LoginOptionInterface extends PropsInterface {
  mode: LoginModes;
  formContainerRef: React.RefObject<HTMLDivElement>;
  onModeChange: (mode: LoginModes) => void;
}

export interface LoginContext {
  login: (response: APIResponseInterface) => void;
  logout: () => void;
  auth?: UserDataInterface | null;
}

// Side menu

export interface UserDataInterface {
  user: string;
  position: string;
  profile_image: string;
}

export interface ToggleButtonInterface extends PropsInterface {
  openSideMenu: boolean;
  setOpenSideMenu: (value: React.SetStateAction<boolean>) => void;
}

export interface NavBarItemInterface extends ToggleButtonInterface {
  detail: string;
  destination?: AdminPaths | CustomerPaths | SharedPaths;
}

export interface NavBarCategoryInterface extends NavBarItemInterface {
  icon: ReactNode;
}

export interface LogoutButtonInterface {
  logout: () => void;
  icon: ReactNode;
}

// Dashboard

export interface PercentageInterface {
  percentage: number;
}

export interface ChartsInterface {
  category: string;
  value: number;
}

// Client requests

export interface RequestDetailInterface {
  cardImageUrl: string;
  position: string;
  openRequestNumber: number;
  closedRequestNumber: number;
  registrationDate: string;
  modificationDate: string;
  description: string;
  requestType?: string;
  applicant?: {
    detail: string;
    check: boolean;
  };
  technician?: {
    detail: string;
    check: boolean;
  };
  isClosed?: boolean;
}

export interface TeamFormInterface {
  startdate: string;
  enddate: string;
}

export interface OpenRequestFormInterface {
  client: string;
  requestType: string;
  description: string;
  applicant: string;
  technician: string;
}

export interface OpenRequestOptionsInterface {
  client: APISelectOptions[];
  requestTypes: APISelectOptions[];
  technicians: APISelectOptions[];
}

// Team

export interface TeamDetailInterface {
  cardImageUrl: string;
  position: string;
  description: string;
  openRequestNumber: number;
  closedRequestNumber: number;
  registrationDate: string;
  modificationDate: string;
  technician?:{detail: string; check: boolean};
}

// Reusable components

export interface ButtonInterface extends PropsInterface {
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  executeAction?: boolean;
}

export interface InputInterface extends PropsInterface {
  name: string;
  value: string;
  placeholder: string;
  type: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  label?: string;
  paddingIcon?: boolean;
  options?: { value: string; detail: string }[];
}

export interface CornerRadiusInputInterface extends InputInterface {
  corners: [boolean, boolean, boolean, boolean];
}

export interface SearchInterface {
  search: string;
}

export interface SearchBarInterface {
  placeholder: string;
  form: SearchInterface;
  handleChanges: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export interface PaginatorInterface {
  currentPage: number;
  displayedResults: number;
  totalResults: number;
  prevPage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  nextPage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ModalInterface extends PropsInterface {
  title?: string;
  modalIsOpen?: boolean;
  closeModal?: () => void;
  openModal?: () => void;
}

export interface OpenRequestModalInterface extends ModalInterface {
  closeRequest: boolean;
  applicant: boolean;
  technician: boolean;
  requestId: number | string;
}

export interface CardInterface extends PropsInterface {
  cardImageUrl: string;
  request?: TeamDetailInterface;
  info?: { detail: string; content: string }[];
  title?: string;
}

export interface OpenRequestCardInterface extends PropsInterface {
  cardImageUrl: string;
  info?: { detail: string; content: string }[];
  title?: string;
  request?: RequestDetailInterface;
  closeRequest: boolean;
  requestId: number | string;
}

export interface ItemCardInterface extends PropsInterface {
  data: {
    id: number | string;
    request?: TeamDetailInterface;
    card: CardInterface;
  }[];
}

export interface BothCardInterface extends PropsInterface {
  data: {
    id: number | string;
    request?: TeamDetailInterface | RequestDetailInterface;
    card: CardInterface;
  }[];
}

export interface OpenRequestItemCardInterface extends PropsInterface {
  data: {
    id: number | string;
    request?: RequestDetailInterface;
    card: CardInterface;
  }[];
  closeRequest: boolean;
}

// Navigation

export enum AdminPaths {
  Root = "/",
  Dashboard = "/dashboard",
  LicensingTables = "/licensingtables",
  Credentials = "/credentials",
  OpenRequest = "/openrequest",
  ClosedRequest = "/closedrequest",
  Team = "/team",
  Reports = "/reports",
  Settings = "/settings",
}

export enum CustomerPaths {
  Home = "/home",
}

export enum SharedPaths {
  Login = "/login",
  NotFound = "*",
  Settings = "Settings",
}

export interface RouteInterface {
  path: AdminPaths | CustomerPaths | SharedPaths;
  layout?: React.FC<PropsInterface>;
  component: React.FC<PropsInterface>;
}
