//profileApi.ts
import api from "./axios";

export interface UserProfile {
  id?: number;
  name: string;
  bio: string;
  location: string;
  nationality: string;
  availability: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  twitter: string;
  linkedin: string;
  expectedSalary: number;
  ownACar: boolean;
  haveDrivingLicense: boolean;
  noticePeriod: string;
  immigrationStatus: string;
  referees: string;
  willingToRelocate: boolean;
  languages: string;
  skills: string;
}


// GET /api/profiles/:id
export const fetchProfileById = async (id: number): Promise<UserProfile> => {
  const { data } = await api.get<UserProfile>(`/profiles/${id}`);
  return data;
};