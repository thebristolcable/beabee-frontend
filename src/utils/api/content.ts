import axios from '../../axios';
import {
  ContactsContent,
  GeneralContent,
  JoinContent,
  JoinSetupContent,
  ProfileContent,
} from './api.interface';

type ContentId = 'join' | 'join/setup' | 'profile' | 'general' | 'contacts';

async function fetchContent<T>(id: ContentId): Promise<T> {
  return (await axios.get<T>('/content/' + id)).data;
}

export async function fetchContactsContent(): Promise<ContactsContent> {
  return await fetchContent('contacts');
}
export async function fetchGeneralContent(): Promise<GeneralContent> {
  return await fetchContent('general');
}
export async function fetchJoinContent(): Promise<JoinContent> {
  return await fetchContent('join');
}
export async function fetchJoinSetupContent(): Promise<JoinSetupContent> {
  return await fetchContent('join/setup');
}
export async function fetchProfileContent(): Promise<ProfileContent> {
  return await fetchContent('profile');
}
