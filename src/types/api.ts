export interface Request {}

export interface ICharactersRequest extends Request {
  name?: string;
  nameStartsWith?: string;
  offset: number;
  limit: number;
}

export interface IComicsRequest extends Request {
  titleStartsWith?: string;
  offset: number;
  limit: number;
}

export interface IResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
}
