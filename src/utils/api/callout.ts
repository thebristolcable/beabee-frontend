import { Paginated } from '@beabee/beabee-common';
import axios from '../../lib/axios';
import {
  GetCalloutsQuery,
  Serial,
  GetCalloutResponsesQuery,
  CreateCalloutResponseData,
  CreateCalloutData,
  GetCalloutWith,
  GetCalloutDataWith,
  GetCalloutData,
  GetCalloutResponseWith,
  GetCalloutResponseDataWith,
} from './api.interface';
import { deserializeDate } from '.';
import { deserializeCalloutResponse } from './callout-response';

// TODO: how to make this type safe?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deserializeCallout(callout: any): any {
  return {
    ...callout,
    starts: deserializeDate(callout.starts),
    expires: deserializeDate(callout.expires),
  };
}

export async function fetchCallouts<With extends GetCalloutWith = void>(
  query?: GetCalloutsQuery,
  _with?: readonly With[]
): Promise<Paginated<GetCalloutDataWith<With>>> {
  const { data } = await axios.get<Paginated<Serial<GetCalloutDataWith<With>>>>(
    '/callout',
    { params: { with: _with, ...query } }
  );
  return {
    ...data,
    items: data.items.map(deserializeCallout),
  };
}

export async function fetchCallout<With extends GetCalloutWith = void>(
  slug: string,
  _with?: readonly With[]
): Promise<GetCalloutDataWith<With>> {
  const { data } = await axios.get<Serial<GetCalloutDataWith<With>>>(
    '/callout/' + slug,
    { params: { with: _with } }
  );
  return deserializeCallout(data);
}

export async function createCallout(
  calloutData: CreateCalloutData
): Promise<GetCalloutData> {
  const { data } = await axios.post<Serial<GetCalloutData>>(
    '/callout',
    // TODO: passing calloutData directly is not safe, it could contain extra properties
    calloutData
  );
  return deserializeCallout(data);
}

export async function updateCallout(
  slug: string,
  calloutData: CreateCalloutData
): Promise<GetCalloutData> {
  const { data } = await axios.patch<Serial<GetCalloutData>>(
    '/callout/' + slug,
    calloutData
  );
  return deserializeCallout(data);
}

export async function deleteCallout(slug: string): Promise<void> {
  await axios.delete('/callout/' + slug);
}

export async function fetchResponse<With extends GetCalloutResponseWith = void>(
  slug: string,
  id: string,
  _with?: readonly With[]
): Promise<GetCalloutResponseDataWith<With>> {
  const { data } = await axios.get<Serial<GetCalloutResponseDataWith<With>>>(
    `/callout/${slug}/responses/${id}`,
    { params: { with: _with } }
  );
  return deserializeCalloutResponse(data);
}

export async function fetchResponses<
  With extends GetCalloutResponseWith = void
>(
  slug: string,
  query?: GetCalloutResponsesQuery,
  _with?: readonly With[]
): Promise<Paginated<GetCalloutResponseDataWith<With>>> {
  const { data } = await axios.get<
    Paginated<Serial<GetCalloutResponseDataWith<With>>>
  >(`/callout/${slug}/responses`, { params: { with: _with, ...query } });
  return {
    ...data,
    items: data.items.map(deserializeCalloutResponse),
  };
}

export async function createResponse(
  slug: string,
  data: CreateCalloutResponseData
): Promise<void> {
  await axios.post(`/callout/${slug}/responses`, {
    answers: data.answers,
    guestName: data.guestName,
    guestEmail: data.guestEmail,
  });
}
